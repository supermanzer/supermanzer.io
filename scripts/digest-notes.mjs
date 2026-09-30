#!/usr/bin/env node
// Tier 3: turn the agent-board `learnings` topic and ~/.claude/command-failures.md
// into a redacted digest of candidate "TIL" posts.
//
//   npm run digest:notes -- [--since 2026-09-01] [--topic learnings] [--no-failures]
//
// The board is read over its HTTP API (not the MCP tool) so redaction happens
// BEFORE any model sees the text, and so scheduled runs work without Claude.
import { readFileSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { writeDigest, reportDigest } from './lib/digest.mjs'

const BOARD_URL = process.env.AGENT_BOARD_URL || 'http://127.0.0.1:8421'
const FAILURES_FILE = join(homedir(), '.claude', 'command-failures.md')

const { values } = parseArgs({
    options: {
        since: { type: 'string', default: '' },
        topic: { type: 'string', default: 'learnings' },
        'no-failures': { type: 'boolean', default: false },
    },
})

const isRecent = (dateStr) => !values.since || (dateStr || '').slice(0, 10) >= values.since

const fetchBoard = async (topic) => {
    try {
        const res = await fetch(`${BOARD_URL}/api/board/${encodeURIComponent(topic)}`, {
            signal: AbortSignal.timeout(5000),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
    } catch (err) {
        // The board is best-effort infrastructure; absence is not an error.
        console.warn(`Agent board unavailable (${err.message}); skipping board notes.`)
        return []
    }
}

// Entries in command-failures.md are "### title" sections with a **Date:** line.
const parseFailures = (md) =>
    md
        .split(/^### /m)
        .slice(1)
        .map((chunk) => {
            const [title, ...rest] = chunk.split('\n')
            const body = rest.join('\n').trim()
            const date = body.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/)?.[1] || ''
            return { title: title.trim(), body, date }
        })

const sections = []

const messages = (await fetchBoard(values.topic)).filter((m) => isRecent(m.timestamp))
if (messages.length) {
    sections.push(`## Agent board: ${values.topic} (${messages.length})\n`)
    for (const m of messages) {
        sections.push(`### ${m.timestamp} — ${m.agent_name}\n\n${m.message}\n`)
    }
}

if (!values['no-failures'] && existsSync(FAILURES_FILE)) {
    const failures = parseFailures(readFileSync(FAILURES_FILE, 'utf8')).filter((f) => isRecent(f.date))
    if (failures.length) {
        sections.push(`## Command failures (${failures.length})\n`)
        for (const f of failures) sections.push(`### ${f.title}\n\n${f.body}\n`)
    }
}

if (!sections.length) {
    console.log('Nothing new to digest.')
    process.exit(0)
}

const raw = `# Candidate TIL material\n\nSources: agent board (${values.topic}), command-failures log.\nEach item is a potential short post. Already redacted.\n\n${sections.join('\n')}`
reportDigest(writeDigest('notes', raw))
