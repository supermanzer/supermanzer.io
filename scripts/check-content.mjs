#!/usr/bin/env node
// Second gate: scan content for anything the redaction rules would flag.
//
//   npm run check:content           drafts (draft: true) + generated project-activity
//   npm run check:content -- --all  every file under content/ (informational for published posts)
//
// Exits 1 if anything matches. Reports file + rule NAMES only, never the match.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parseArgs } from 'node:util'
import { ROOT } from './lib/digest.mjs'
import { residual } from './lib/redact.mjs'

const { values } = parseArgs({ options: { all: { type: 'boolean', default: false } } })
const CONTENT = join(ROOT, 'content')

const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
        const full = join(dir, name)
        return statSync(full).isDirectory() ? walk(full) : [full]
    })

const isDraft = (text) => /^draft:\s*true\s*$/m.test(text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '')

// Blog `projects:` values are file names in content/projects; anything else links nowhere.
const projectSlugs = new Set(
    readdirSync(join(CONTENT, 'projects'))
        .filter((f) => f.endsWith('.md') && f !== 'index.md')
        .map((f) => f.replace(/\.md$/, '')),
)
const projectsOf = (text) => {
    const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    const block = fm.match(/^projects:\s*\n((?:[ \t]+-[^\n]*\n?)+)/m)?.[1] ?? ''
    return [...block.matchAll(/^[ \t]+-\s*(.+?)\s*$/gm)].map((m) => m[1].replace(/^["']|["']$/g, ''))
}

let failures = 0
let scanned = 0
for (const file of walk(CONTENT)) {
    if (!/\.(md|json)$/.test(file)) continue
    const text = readFileSync(file, 'utf8')
    const rel = relative(ROOT, file)
    const inScope = values.all || rel.startsWith('content/project-activity/') || (file.endsWith('.md') && isDraft(text))
    if (!inScope) continue
    scanned++
    const found = residual(text)
    if (found.length) {
        failures++
        console.error(`✖ ${rel}: ${found.join(', ')}`)
    }
}

// Unknown project slugs: an error for drafts (new work), a warning for published posts.
for (const file of walk(join(CONTENT, 'blog'))) {
    if (!file.endsWith('.md')) continue
    const text = readFileSync(file, 'utf8')
    const unknown = projectsOf(text).filter((slug) => !projectSlugs.has(slug))
    if (!unknown.length) continue
    const rel = relative(ROOT, file)
    const draft = isDraft(text)
    if (draft) failures++
    console[draft ? 'error' : 'warn'](`${draft ? '✖' : '⚠'} ${rel}: unknown project slug(s): ${unknown.join(', ')} (known: ${[...projectSlugs].join(', ')})`)
}

console.log(`Scanned ${scanned} file(s); ${failures} with sensitive patterns.`)
process.exit(failures ? 1 : 0)
