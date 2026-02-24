# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup and Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server at localhost:3000
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm test` - Run Cypress tests (opens interactive test runner)
- Tests are located in `cypress/e2e/`

#### Percy Visual Testing
- Requires `PERCY_PAGE_LOAD_TIMEOUT=60000` environment variable for CI
- This prevents timeout issues on the projects page with multiple images
- Cypress has custom `waitForImagesLoaded` command with 60s timeout

### Contact Form Development
When working on the contact form, add an entry to `/etc/hosts` using a subdomain of allowed Formspree domains:
```
local.ryanrishi.com  127.0.0.1
```

## Architecture Overview

This is a Next.js 14 personal website with the following key characteristics:

### Content Management
- **Blog Posts**: MDX files in `app/blog/` with frontmatter metadata
- **Projects**: MDX files in `app/projects/` with frontmatter metadata  
- **Content Loading**: Server-side dynamic imports read metadata from MDX files at build time
- **Sorting**: Posts sorted by `publishedAt` date (desc), Projects sorted by `date` (desc)

### MDX Configuration
- Uses `@next/mdx` with custom rehype/remark plugins
- **Rehype plugins**: slug generation, autolink headings, pretty code highlighting
- **Remark plugins**: frontmatter processing (note: remark-gfm currently disabled due to compatibility issues)
- **Custom components**: Defined in `mdx-components.tsx` including Blockquote, Callout, Link, dynamic imports for Logo, LoudnessWars, VideoContainer
- **Frontmatter handling**: Uses `gray-matter` to parse YAML frontmatter from MDX files at build time

### Styling & UI
- **CSS Framework**: Tailwind CSS with custom `valencia` color palette
- **Dark Mode**: Class-based dark mode via `next-themes`
- **Typography**: Uses `@tailwindcss/typography` plugin
- **Safelist**: Dynamically generated for callout component colors (green, blue, yellow, red, slate)

### Page Structure
- **App Router**: Next.js 13+ file-based routing in `app/` directory
- **Layout**: Global layout with Header/Footer, Google Analytics, Vercel Analytics
- **Dynamic Routes**: `[slug]` patterns for blog posts and projects
- **Tags**: Tag-based filtering for both blog and projects

### Key Libraries
- **Animations**: Framer Motion
- **Dates**: date-fns for post sorting
- **Icons**: react-icons
- **Data Visualization**: D3.js (transpiled in next.config.mjs)
- **Analytics**: Google Analytics + Vercel Analytics

### Data Flow
1. MDX files contain frontmatter with metadata (title, description, publishedAt/date, tags)
2. `lib/posts.ts` and `lib/projects.ts` dynamically import and aggregate metadata
3. Pages use these functions to render lists and individual content
4. All content is statically generated at build time

### Component Organization
- **Reusable UI**: `app/components/` (header, footer, links, callouts, etc.)
- **Project-specific**: `app/components/projects/` for specialized project components
- **Hooks**: Custom hooks in `app/hooks/` including body scroll management

### Environment Requirements
- Node.js environment with npm package manager
- Google Analytics tracking ID via `NEXT_PUBLIC_GOOGLE_ANALYTICS` env var
- Formspree integration for contact form