#!/usr/bin/env node
// Scaffold a new blog post with schema-correct frontmatter and `draft: true`.
//
//   npm run new:post -- "My Post Title" [--tags nuxt,ai] [--projects website]
//
// Frontmatter mirrors the `blog` collection in content.config.ts. Drafts are
// hidden from listings and 404 on their own URL until you flip `draft: false`
// (preview locally with NUXT_PUBLIC_SHOW_DRAFTS=true npm run dev).
import { existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

export const slugify = (title) =>
    title
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

const today = () => {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const yamlList = (key, items) =>
    items.length ? `${key}:\n${items.map((i) => `  - ${i}`).join('\n')}\n` : ''

// Titles/descriptions go in double quotes so colons and '#' can't break the YAML.
const yamlString = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

export const buildPost = ({ title, description = '', tags = [], projects = [], date = today() }) =>
    `---
title: ${yamlString(title)}
description: ${yamlString(description || 'TODO: one-sentence summary')}
author:
  name: Ryan Manzer
  description: He puts the Manzer in Supermanzer
  image: /img/supermanzer.jpeg
created_at: ${date}
${yamlList('tags', tags)}${yamlList('projects', projects)}draft: true
---

## Why I built this

## What I did

## What I learned
`

const list = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [])

if (import.meta.url === `file://${process.argv[1]}`) {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            tags: { type: 'string' },
            projects: { type: 'string' },
            description: { type: 'string' },
        },
    })

    const title = positionals.join(' ').trim()
    if (!title) {
        console.error('Usage: npm run new:post -- "Post title" [--tags a,b] [--projects x,y] [--description "..."]')
        process.exit(1)
    }

    const slug = slugify(title)
    if (!slug) {
        console.error('Title has no usable characters for a filename.')
        process.exit(1)
    }

    const file = join(ROOT, 'content', 'blog', `${slug}.md`)
    if (existsSync(file)) {
        console.error(`Refusing to overwrite existing post: content/blog/${slug}.md`)
        process.exit(1)
    }

    writeFileSync(
        file,
        buildPost({
            title,
            description: values.description,
            tags: list(values.tags),
            projects: list(values.projects),
        }),
        { flag: 'wx' },
    )
    console.log(`Created content/blog/${slug}.md (draft: true)`)
    console.log('Preview drafts: NUXT_PUBLIC_SHOW_DRAFTS=true npm run dev')
}
