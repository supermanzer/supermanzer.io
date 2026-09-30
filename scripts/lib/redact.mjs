// Redaction for anything derived from private sources (Claude Code sessions,
// git history, the agent board, the command-failure log) before it can reach
// a draft post or a project page.
//
// Two layers, on purpose:
//   redact(text)   - replaces every match with a typed placeholder
//   residual(text) - re-scans the OUTPUT and reports rules that still match
// Callers must run assertClean() on the final text and refuse to write the
// file if it throws. Redaction is best-effort pattern matching, not a proof;
// the residual gate catches regressions and rule ordering bugs, and the draft
// flag + human review catches what patterns can't (names, client details).
//
// Add site-specific secrets without editing this file via scripts/redact.local.json
// (gitignored): { "literals": ["my-droplet-host"], "patterns": ["acme-\\w+"] }
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const tag = (name) => `[REDACTED:${name}]`
// Anything already redacted must not be re-matched (keeps residual() honest).
const NOT_REDACTED = '(?!\\[REDACTED)'

const luhn = (digits) => {
    let sum = 0
    let alt = false
    for (let i = digits.length - 1; i >= 0; i--) {
        let n = Number(digits[i])
        if (alt) {
            n *= 2
            if (n > 9) n -= 9
        }
        sum += n
        alt = !alt
    }
    return sum % 10 === 0
}

const entropy = (s) => {
    const freq = new Map()
    for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1)
    let h = 0
    for (const n of freq.values()) {
        const p = n / s.length
        h -= p * Math.log2(p)
    }
    return h
}

const isLoopback = (ip) => ip === '127.0.0.1' || ip === '0.0.0.0'

/**
 * Ordered rules. Specific token formats come first so the generic rules
 * (env assignments, entropy) don't swallow them into a less useful label.
 * `test` is an optional predicate on the match to cut false positives.
 */
const RULES = [
    {
        name: 'private-key',
        re: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?(?:-----END [A-Z ]*PRIVATE KEY-----|$)/g,
    },
    { name: 'jwt', re: /\beyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g },
    { name: 'anthropic-key', re: /\bsk-ant-[A-Za-z0-9_-]{8,}/g },
    { name: 'stripe-key', re: /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{8,}/g },
    { name: 'stripe-webhook-secret', re: /\bwhsec_[A-Za-z0-9]{8,}/g },
    { name: 'openai-key', re: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}/g },
    { name: 'github-token', re: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,})/g },
    { name: 'aws-access-key', re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g },
    { name: 'slack-token', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/g },
    { name: 'google-api-key', re: /\bAIza[0-9A-Za-z_-]{35}\b/g },
    { name: 'bearer-token', re: new RegExp(`\\bBearer\\s+${NOT_REDACTED}[A-Za-z0-9._~+/=-]{16,}`, 'gi') },
    // scheme://user:pass@host  -> keep scheme and host, drop the credentials
    {
        name: 'url-credentials',
        re: new RegExp(`(?<=://)${NOT_REDACTED}[^\\s/:@]+:[^\\s/@]+(?=@)`, 'g'),
    },
    // ?token=...&signature=... in URLs
    {
        name: 'url-secret-param',
        re: new RegExp(
            `(?<=[?&](?:token|access_token|refresh_token|api_key|apikey|key|secret|password|sig|signature|auth|code)=)${NOT_REDACTED}[^&\\s"'#]+`,
            'gi',
        ),
    },
    // FOO_API_KEY=abc / "client_secret": "abc" / password: abc
    {
        name: 'secret-assignment',
        re: new RegExp(
            `(?<=\\b[A-Za-z0-9_.-]*(?:KEY|SECRET|TOKEN|PASSWORD|PASSWD|PWD|CREDENTIAL|DSN|PRIVATE)[A-Za-z0-9_.-]*["']?\\s*[=:]\\s*)${NOT_REDACTED}(?:"[^"\\n]*"|'[^'\\n]*'|[^\\s,;"'}\\]]+)`,
            'gi',
        ),
    },
    {
        name: 'email',
        re: new RegExp(`${NOT_REDACTED}\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}\\b`, 'g'),
    },
    {
        name: 'ipv4',
        re: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,
        test: (m) => !isLoopback(m),
    },
    {
        name: 'ipv6',
        re: /\b(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}\b/g,
    },
    {
        name: 'card-number',
        re: /\b\d(?:[ -]?\d){12,18}\b/g,
        test: (m) => {
            const digits = m.replace(/\D/g, '')
            return digits.length >= 13 && digits.length <= 19 && luhn(digits)
        },
    },
    {
        name: 'uuid',
        re: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    },
    // Last-resort: long, mixed, high-entropy runs that look like credentials.
    {
        name: 'high-entropy',
        re: /(?<![\w/.-])[A-Za-z0-9+_-]{32,}(?![\w/.-])/g,
        test: (m) => /[A-Za-z]/.test(m) && /\d/.test(m) && entropy(m) >= 3.6 && !/^[0-9a-f]{40}$/i.test(m),
    },
]

// Home-directory paths are not secret, but they leak the OS username.
const PATH_RULES = [
    { name: 'home-path', re: /\/Users\/[^/\s"'`]+/g, to: '~' },
    { name: 'home-path', re: /\/home\/[^/\s"'`]+/g, to: '~' },
    { name: 'home-path', re: /[A-Za-z]:\\Users\\[^\\\s"'`]+/g, to: '~' },
    // Claude Code's dashed project dir names: -Users-ryan-Projects-...
    { name: 'home-path', re: /(?<![\w/])-Users-[^-\s"'`\/]+(?=-)/g, to: '-~' },
]

const HERE = dirname(fileURLToPath(import.meta.url))
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Optional per-machine additions (gitignored). Invalid config fails loudly. */
export const loadExtraRules = (file = join(HERE, '..', 'redact.local.json')) => {
    if (!existsSync(file)) return []
    const cfg = JSON.parse(readFileSync(file, 'utf8'))
    const rules = []
    for (const lit of cfg.literals ?? []) {
        rules.push({ name: 'custom', re: new RegExp(escapeRe(lit), 'gi') })
    }
    for (const pat of cfg.patterns ?? []) {
        rules.push({ name: 'custom', re: new RegExp(pat, 'gi') })
    }
    return rules
}

const allRules = (extra) => [...RULES, ...(extra ?? loadExtraRules())]

/**
 * Replace sensitive substrings with typed placeholders.
 * @returns {{ text: string, hits: Record<string, number> }}
 */
export const redact = (input, { extraRules } = {}) => {
    const hits = {}
    const count = (name) => {
        hits[name] = (hits[name] || 0) + 1
    }
    let text = String(input ?? '')

    for (const rule of allRules(extraRules)) {
        text = text.replace(rule.re, (m) => {
            if (rule.test && !rule.test(m)) return m
            count(rule.name)
            return tag(rule.name)
        })
    }
    for (const rule of PATH_RULES) {
        text = text.replace(rule.re, () => {
            count(rule.name)
            return rule.to
        })
    }
    return { text, hits }
}

/**
 * Re-scan already-redacted text. Returns the NAMES of rules that still match
 * (never the matched text, so the report itself can't leak a secret).
 */
export const residual = (text, { extraRules } = {}) => {
    const found = new Set()
    const s = String(text ?? '')
    for (const rule of allRules(extraRules)) {
        rule.re.lastIndex = 0
        for (const m of s.matchAll(rule.re)) {
            if (!rule.test || rule.test(m[0])) {
                found.add(rule.name)
                break
            }
        }
    }
    for (const rule of PATH_RULES) {
        rule.re.lastIndex = 0
        if (rule.re.test(s)) found.add(rule.name)
    }
    return [...found]
}

/** Throw if redacted text still trips any rule. Call before writing any file. */
export const assertClean = (text, label = 'output', opts) => {
    const left = residual(text, opts)
    if (left.length) {
        throw new Error(`Refusing to write ${label}: residual sensitive patterns after redaction (${left.join(', ')})`)
    }
}

/** redact + assertClean in one step. */
export const redactAndVerify = (input, label, opts) => {
    const result = redact(input, opts)
    assertClean(result.text, label, opts)
    return result
}

export const summarizeHits = (hits) =>
    Object.entries(hits)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}:${v}`)
        .join(', ') || 'none'
