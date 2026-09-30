#!/usr/bin/env node
// Tier 2: build a redacted digest of a Claude Code session, as raw material
// for a "how I built X / what I learned" post.
//
//   npm run digest:sessions -- --list [--project fragrances] [--since 2026-09-01]
//   npm run digest:sessions -- --session <id-prefix>
//   npm run digest:sessions -- --project fragrances --since 2026-09-01   (all matching sessions)
//
// What is kept: plain user/assistant text, plus the names of files Claude edited.
// What is dropped BEFORE redaction even runs: tool calls/results, thinking,
// attachments, sidechain (subagent) turns, meta lines, and injected
// <system-reminder>/<command-*> blocks (those embed CLAUDE.md, email, etc.).
import { createReadStream, readdirSync, statSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { homedir } from 'node:os'
import { join, basename } from 'node:path'
import { parseArgs } from 'node:util'
import { writeDigest, reportDigest } from './lib/digest.mjs'

const PROJECTS_DIR = join(homedir(), '.claude', 'projects')
const MAX_USER_CHARS = 1200
const MAX_ASSISTANT_CHARS = 800
const MAX_DIGEST_CHARS = 80000

const { values } = parseArgs({
    options: {
        list: { type: 'boolean', default: false },
        session: { type: 'string', default: '' },
        project: { type: 'string', default: '' },
        since: { type: 'string', default: '' },
    },
})

// Strip injected harness blocks that ride along inside user text.
const INJECTED = /<(system-reminder|local-command-caveat|local-command-stdout|command-name|command-message|command-args|pasted_content)[^>]*>[\s\S]*?<\/\1>/g
const cleanText = (s) => s.replace(INJECTED, '').replace(/\n{3,}/g, '\n\n').trim()

const textOf = (content) => {
    if (typeof content === 'string') return cleanText(content)
    if (!Array.isArray(content)) return ''
    return cleanText(
        content
            .filter((b) => b?.type === 'text' && typeof b.text === 'string')
            .map((b) => b.text)
            .join('\n'),
    )
}

const clip = (s, n) => (s.length > n ? `${s.slice(0, n)}… [truncated]` : s)

const findSessions = () => {
    const out = []
    for (const dir of readdirSync(PROJECTS_DIR)) {
        const full = join(PROJECTS_DIR, dir)
        if (!statSync(full).isDirectory()) continue
        for (const f of readdirSync(full)) {
            if (!f.endsWith('.jsonl')) continue
            const file = join(full, f)
            const { mtime, size } = statSync(file)
            out.push({ file, id: basename(f, '.jsonl'), project: dir, mtime, size })
        }
    }
    return out
        .filter((s) => !values.project || s.project.toLowerCase().includes(values.project.toLowerCase()))
        .filter((s) => !values.since || s.mtime.toISOString().slice(0, 10) >= values.since)
        .sort((a, b) => b.mtime - a.mtime)
}

// "-Users-ryan-Projects-WebDev-supermanzer-io" -> "WebDev-supermanzer-io"
const prettyProject = (dir) => dir.replace(/^-Users-[^-]+-(Projects-)?/, '')

const readSession = async (session) => {
    const turns = []
    const files = new Set()
    let title = ''
    let first = ''
    let last = ''

    const rl = createInterface({ input: createReadStream(session.file), crlfDelay: Infinity })
    for await (const line of rl) {
        let d
        try {
            d = JSON.parse(line)
        } catch {
            continue
        }
        if (d.type === 'ai-title' && d.aiTitle) title = d.aiTitle
        if (d.isSidechain || d.isMeta) continue
        if (d.timestamp) {
            first ||= d.timestamp
            last = d.timestamp
        }
        if (d.type === 'user' || d.type === 'assistant') {
            const text = textOf(d.message?.content)
            if (text) turns.push({ role: d.type, text })
            if (d.type === 'assistant' && Array.isArray(d.message?.content)) {
                for (const b of d.message.content) {
                    const p = b?.type === 'tool_use' && (b.name === 'Edit' || b.name === 'Write') && b.input?.file_path
                    if (p) files.add(p)
                }
            }
        }
    }
    return { turns, files: [...files], title, first, last }
}

// Long sessions: keep the opening (intent) and the ending (outcome), drop the middle.
const fitTurns = (rendered, budget) => {
    const total = rendered.reduce((n, r) => n + r.length + 2, 0)
    if (total <= budget) return rendered
    const headBudget = budget * 0.3
    const tailBudget = budget * 0.7
    const head = []
    const tail = []
    let used = 0
    for (const r of rendered) {
        if (used + r.length > headBudget) break
        head.push(r)
        used += r.length + 2
    }
    used = 0
    for (let i = rendered.length - 1; i >= head.length; i--) {
        if (used + rendered[i].length > tailBudget) break
        tail.unshift(rendered[i])
        used += rendered[i].length + 2
    }
    const omitted = rendered.length - head.length - tail.length
    return [...head, `_[… ${omitted} turns omitted to fit the size cap …]_`, ...tail]
}

const renderSession = (session, data, budget) => {
    const cwd = prettyProject(session.project)
    const lines = [
        `## ${data.title || 'Untitled session'}`,
        '',
        `- Project: ${cwd}`,
        `- Span: ${data.first.slice(0, 10)} → ${data.last.slice(0, 10)}`,
        `- Turns: ${data.turns.length}`,
        '',
    ]
    if (data.files.length) {
        lines.push('### Files edited', '', ...data.files.slice(0, 40).map((f) => `- ${f}`), '')
    }
    lines.push('### Conversation', '')
    const rendered = data.turns.map((t) =>
        t.role === 'user'
            ? `**Me:** ${clip(t.text, MAX_USER_CHARS)}`
            : `**Claude:** ${clip(t.text, MAX_ASSISTANT_CHARS)}`,
    )
    const used = lines.join('\n').length
    lines.push(...fitTurns(rendered, Math.max(budget - used, 2000)).flatMap((r) => [r, '']))
    return lines.join('\n')
}

const sessions = findSessions()

if (values.list) {
    for (const s of sessions.slice(0, 40)) {
        const data = await readSession(s)
        console.log(
            `${s.id.slice(0, 8)}  ${s.mtime.toISOString().slice(0, 10)}  ${prettyProject(s.project).padEnd(40)}  ${data.turns.length} turns  ${data.title}`,
        )
    }
    process.exit(0)
}

let picked = sessions
if (values.session) picked = sessions.filter((s) => s.id.startsWith(values.session))
else if (!values.project) {
    console.error('Pass --list, --session <id-prefix>, or --project <name>.')
    process.exit(1)
}
if (!picked.length) {
    console.error('No matching sessions.')
    process.exit(1)
}

let raw = '# Session digest\n\nAlready redacted. Draft from THIS file only; do not open the raw session transcripts.\n\n'
for (const s of picked) {
    const data = await readSession(s)
    if (!data.turns.length) continue
    const remaining = MAX_DIGEST_CHARS - raw.length
    if (remaining < 4000) {
        raw += '\n_[Digest size cap reached; narrow with --session or --since]_\n'
        break
    }
    raw += `${renderSession(s, data, remaining)}\n\n---\n\n`
}

reportDigest(writeDigest(values.session ? `session-${values.session.slice(0, 8)}` : `sessions-${values.project}`, raw))
