# Copilot Instructions for Supermanzer.io

## Project Overview
Supermanzer.io is a personal portfolio/blog site built with **Nuxt 4** (SSR mode), showcasing projects, blog posts, and photography with metadata. The site leverages **Nuxt Content** for markdown-driven content and **Vuetify 3** for UI components. Deployment is on **Netlify** with image CDN support.

## Architecture Essentials

### Content-First Design
- **Markdown as Database**: All content (blog posts, photos, projects) lives in `/content/` as `.md` files with frontmatter YAML
- **Content Collections**: Defined in [content.config.ts](content.config.ts) - each collection (blog, photos, projects) has its own schema and routing prefix
- **Key Collections**:
  - `blog/` → `/blog/:slug` with required fields: `tags`, `title`, `description`, `created_at`, `author` (object), `projects` (array)
  - `photos/` → `/photos/:slug` with EXIF metadata: `DateTimeOriginal`, `Make`, `Model`, `FocalLength`, `FNumber`, `ISO`, etc.
  - `projects/` → `/projects/:slug` for project portfolios

### Component Organization
```
app/components/
├── core/           # Reusable UI building blocks (IconBottomSheet, etc.)
├── content/        # Content-specific components (AuthorCard, PageHeader, ComingSoon)
├── blog/           # Blog collection (PostCard, LatestPosts, TableOfContents)
├── photos/         # Photo grid/display components
└── projects/       # Project showcase components
```

### Styling Architecture
- **SCSS Modules**: Located in `app/assets/styles/`
- **Vuetify Theme**: Configured via Vuetify plugin in [app/plugins/vuetify.ts](app/plugins/vuetify.ts)
- **Global Variables**: [_variables.scss](.app/assets/styles/_variables.scss) for colors/spacing
- **Font Stack**: Montserrat & Raleway (Google Fonts), Material Design Icons (@mdi/font)

### State Management
- **Pinia Store**: Single store in [app/stores/nav.ts](app/stores/nav.ts) manages navigation active state
- **Pattern**: `useNavStore()` in components to access/mutate nav links
- **No API State**: Content is static (Nuxt Content handles queries), minimal stateful logic needed

## Key Workflows

### Development
```bash
npm run dev          # Start dev server (port 3333)
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix linting issues
```

### Content Creation

**General Flow**
1. Create `.md` file in appropriate `/content/` subdirectory
2. Add frontmatter matching schema from [content.config.ts](content.config.ts)
3. For blog: include `author` (object) and `tags` (array)
4. Use `ContentRenderer :value="content"` component to render markdown with prose styling

**Photo Workflow (Automated)**
- Use custom CLI tool: `photo-info process` - scans `public/img/photos` for image files without corresponding markdown files
- Tool extracts all photo EXIF data and creates frontmatter with `details` object and `src` (image filename)
- After generation: manually replace `placeholder` values in `title` and `description` frontmatter fields
- Generated markdown files placed in `/content/photos/` and automatically routed to `/photos/:slug`

### Production
```bash
npm run generate      # Static site generation (required for Netlify)
npm run build         # Build for SSR
npm run preview       # Preview built site locally
```

## Project-Specific Patterns

### Content Querying
- Use `queryCollection("collectionName").path(path).first()` in `<script setup>`
- Always pair with `useAsyncData()` for SSR safety: `await useAsyncData('key', () => queryCollection('blog').path(path).first())`
- Example: [app/pages/blog/[...slug].vue](app/pages/blog/[...slug].vue#L18-L20)

### Routing
- **File-based routing** with catch-all: `[...slug].vue` handles dynamic segments
- **Content-driven routes**: Routes auto-generated from content collections (not route configs)
- Blog posts at `content/blog/*.md` automatically route to `/blog/post-name`

### Markdown Rendering
- **Remark Plugins**: emoji support enabled ([nuxt.config.ts](nuxt.config.ts#L89))
- **Prose Components**: Auto-wrapped code blocks, headings, links (Vuetify style)
- **TOC Generation**: Depth 3, searchDepth 2 configured in [nuxt.config.ts](nuxt.config.ts#L84-L87)

### Utility Functions
- Keep text utilities in [app/utils/index.js](app/utils/index.js): `dateFormat()`, `lowerSnake()`
- Auto-imported by Nuxt - no explicit imports needed

## Critical Configuration Files

| File | Purpose |
|------|---------|
| [nuxt.config.ts](nuxt.config.ts) | Nuxt runtime config, modules, dev server (port 3333), content TOC depth, robots/SEO |
| [content.config.ts](content.config.ts) | Content collections schema, markdown processing, remark plugins |
| [eslint.config.mjs](eslint.config.mjs) | ESLint rules (@nuxt/eslint) |
| [app/plugins/vuetify.ts](app/plugins/vuetify.ts) | Vuetify theme customization |
| [tsconfig.json](tsconfig.json) | TypeScript paths: `~` = `app/` |

## Integration Points & Environment

### External Services
- **Netlify**: Deployment platform + Image CDN (configured via `@nuxt/image`)
- **Google Analytics**: Configured in `head.script` of [nuxt.config.ts](nuxt.config.ts#L14-L24
### Node.js Version
- Requires **Node 24.12.0+** ([package.json](package.json) engines field)

## Development Notes

### CSS Approach
- Vuetify provides spacing utilities (v-col, px, py, mb, etc.)
- Scoped SCSS for component-specific styles
- Global styles in `main.scss` with imported variables/content modules

### Image Handling
- `@nuxt/image` optimizes images automatically
- Photo metadata stored in frontmatter (EXIF extracted separately)
- Images sourced from `/public/img/` or external CDN (Netlify)

### Linting
- Uses `@nuxt/eslint` config - strict TypeScript checking enabled
- Auto-fix common issues: `npm run lint:fix`

## Before Contributing Code
1. Check [content.config.ts](content.config.ts) for collection schemas when adding/modifying content
2. Use `await useAsyncData()` with `queryCollection()` for SSR-safe data fetching
3. Import Vuetify components without explicit imports (auto-imported)
4. Run `npm run lint:fix` before committing to maintain code style
5. Leverage existing components in `app/components/` before creating new ones
