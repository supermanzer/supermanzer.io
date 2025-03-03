import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        }),
        blog: defineCollection({
            type: 'page',
            source: {
                include: 'blog/**/*.md',
                exclude: ['blog/index.md'],
                prefix: '/blog'
            },
            schema: z.object({
                tags: z.array(z.string()),
                title: z.string(),
                decription: z.string(),
                created_at: z.date(),
                author: z.object({
                    name: z.string(),
                    description: z.string(),
                    image: z.string()
                })
            })
        }),
        photos: defineCollection({
            type: 'page',
            source: {
                include: 'photos/**/*.md',
                exclude: ['photos/index.md'],
                prefix: '/photos'
            },
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/**/*.md',
        }),
        about: defineCollection({
            type: 'page',
            source: 'about/**/*.md',
        }),
    }
})