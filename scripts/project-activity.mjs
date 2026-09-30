#!/usr/bin/env node
// Tier 4: keep project pages current from local git history.
//
//   npm run activity:update -- [--dry-run] [--roots ~/Projects/*/*] [--recent 8] [--include-private]
//
// For each content/projects/<slug>.md that links a GitHub repo, find the local
// clone whose `origin` remote matches, and write generated facts to
// content/project-activity/<slug>.json. Hand-authored project frontmatter is
// never touched; the project page reads the JSON via the `activity` collection.
//
// Privacy: only repos that have a project page are scanned (opt-in by
// existence); only `hash, date, subject` are read (no author, no diffs); every
// subject is redacted and the final JSON must pass the residual gate.
// Repos GitHub reports as private are skipped unless --include-private.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, basename } from 'node:path'
import { parseArgs } from 'node:util'
import { ROOT, today } from './lib/digest.mjs'
import { redact, assertClean, summarizeHits } from './lib/redact.mjs'

const PROJECTS_DIR = join(ROOT, 'content', 'projects')
const OUT_DIR = join(ROOT, 'content', 'project-activity')

const { values } = parseArgs({
    options: {
        'dry-run': { type: 'boolean', default: false },
        roots: { type: 'string', default: '' },
        recent: { type: 'string', default: '8' },
        'include-private': { type: 'boolean', default: false },
    },
})

const git = (dir, args) => {
    try {
        return execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
        return ''
    }
}

// "https://github.com/Owner/Repo.git" | "git@github.com:Owner/Repo.git" -> "owner/repo"
export const repoKey = (url) => {
    const m = (url || '').match(/github\.com[/:]([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:[/#?\s"']|$)/i)
    return m ? `${m[1]}/${m[2]}`.toLowerCase() : null
}

// Only look inside the frontmatter block so links in prose don't count.
export const frontmatterRepo = (md) => repoKey(md.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '')

const expandRoots = () => {
    const specs = values.roots ? values.roots.split(',') : [join(homedir(), 'Projects', '*', '*')]
    const dirs = []
    for (const spec of specs) {
        const parts = spec.replace(/^~/, homedir()).split('/').filter(Boolean)
        let level = ['/']
        for (const part of parts) {
            const next = []
            for (const base of level) {
                if (part === '*') {
                    try {
                        for (const e of readdirSync(base, { withFileTypes: true })) if (e.isDirectory()) next.push(join(base, e.name))
                    } catch {
                        /* unreadable dir: skip */
                    }
                } else next.push(join(base, part))
            }
            level = next
        }
        dirs.push(...level)
    }
    return dirs.filter((d) => existsSync(join(d, '.git')))
}

const isPrivateRepo = (key) => {
    try {
        const out = execFileSync('gh', ['repo', 'view', key, '--json', 'isPrivate', '-q', '.isPrivate'], {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
            timeout: 10000,
        }).trim()
        return out === 'true' ? true : out === 'false' ? false : null
    } catch {
        return null // gh missing, offline, or no access: unknown
    }
}

const localRepos = new Map() // repoKey -> dir
for (const dir of expandRoots()) {
    const key = repoKey(git(dir, ['remote', 'get-url', 'origin']))
    if (key && !localRepos.has(key)) localRepos.set(key, dir)
}

const summarize = (dir, key) => {
    const nRecent = Math.max(1, Number.parseInt(values.recent, 10) || 8)
    const log = git(dir, ['log', '--no-merges', '--format=%h%x09%ad%x09%s', '--date=short', '-n', String(nRecent)])
    if (!log) return { data: null, hits: {} }

    const totalCommits = Number(git(dir, ['rev-list', '--count', '--no-merges', 'HEAD'])) || 0
    const since = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10)
    const last90 = Number(git(dir, ['rev-list', '--count', '--no-merges', `--since=${since}`, 'HEAD'])) || 0
    const tag = git(dir, ['describe', '--tags', '--abbrev=0'])

    const hits = {}
    const recent = log.split('\n').map((line) => {
        const [sha, date, ...rest] = line.split('\t')
        const r = redact(rest.join('\t'))
        for (const [k, v] of Object.entries(r.hits)) hits[k] = (hits[k] || 0) + v
        return { sha, date, subject: r.text }
    })

    return {
        data: {
            repo: key,
            lastCommit: recent[0].date,
            totalCommits,
            commitsLast90Days: last90,
            latestTag: tag || null,
            recent,
        },
        hits,
    }
}

const stable = (o) => JSON.stringify({ ...o, generatedAt: undefined })

let written = 0
let unchanged = 0
if (!values['dry-run']) mkdirSync(OUT_DIR, { recursive: true })

for (const file of readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md') && f !== 'index.md')) {
    const slug = basename(file, '.md')
    const key = frontmatterRepo(readFileSync(join(PROJECTS_DIR, file), 'utf8'))
    if (!key) {
        console.log(`- ${slug}: no GitHub link in frontmatter, skipped`)
        continue
    }
    const dir = localRepos.get(key)
    if (!dir) {
        console.log(`- ${slug}: no local clone with origin ${key}, skipped`)
        continue
    }
    if (!values['include-private']) {
        const priv = isPrivateRepo(key)
        if (priv === true) {
            console.log(`- ${slug}: ${key} is private, skipped (use --include-private to override)`)
            continue
        }
        if (priv === null) {
            // Fail closed: an unattended run without gh auth must not publish private commit subjects.
            console.log(`- ${slug}: could not verify ${key} is public (gh unavailable), skipped (use --include-private to override)`)
            continue
        }
    }

    const { data, hits } = summarize(dir, key)
    if (!data) {
        console.log(`- ${slug}: repo has no commits, skipped`)
        continue
    }
    const next = { slug, ...data, generatedAt: today() }
    const json = `${JSON.stringify(next, null, 2)}\n`
    assertClean(json, `project-activity/${slug}.json`) // refuses to write on any residual match

    const out = join(OUT_DIR, `${slug}.json`)
    let prev = null
    try {
        prev = JSON.parse(readFileSync(out, 'utf8'))
    } catch {
        /* no previous file */
    }
    if (prev && stable(prev) === stable(next)) {
        unchanged++
        console.log(`- ${slug}: up to date`)
        continue
    }
    if (!values['dry-run']) writeFileSync(out, json)
    written++
    console.log(`- ${slug}: ${values['dry-run'] ? 'would update' : 'updated'} (${data.totalCommits} commits, last ${data.lastCommit}; redactions: ${summarizeHits(hits)})`)
}

console.log(`Done: ${written} ${values['dry-run'] ? 'would change' : 'written'}, ${unchanged} unchanged.`)
