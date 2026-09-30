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

console.log(`Scanned ${scanned} file(s); ${failures} with sensitive patterns.`)
process.exit(failures ? 1 : 0)
