// Shared output step for every "digest" script (notes, sessions).
//
// Contract: raw private text goes in, and ONLY redacted, verified text reaches
// disk. Drafting skills read these digests and never the original sources.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { redactAndVerify, summarizeHits } from './redact.mjs'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const DIGEST_DIR = join(ROOT, '.digests') // gitignored

export const today = () => {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * Redact, verify, and write a digest. Throws (writing nothing) if any
 * sensitive pattern survives redaction.
 * @returns {{ file: string, hits: Record<string, number>, chars: number }}
 */
export const writeDigest = (name, rawMarkdown, { dir = DIGEST_DIR } = {}) => {
    const { text, hits } = redactAndVerify(rawMarkdown, `digest "${name}"`)
    mkdirSync(dir, { recursive: true })
    const file = join(dir, `${name}-${today()}.md`)
    writeFileSync(file, text)
    return { file, hits, chars: text.length }
}

export const reportDigest = ({ file, hits, chars }) => {
    const rel = file.startsWith(ROOT) ? file.slice(ROOT.length + 1) : file
    console.log(`Wrote ${rel} (${chars} chars)`)
    console.log(`Redactions: ${summarizeHits(hits)}`)
    console.log('Review before publishing: redaction is pattern-based and cannot catch names or client details.')
}
