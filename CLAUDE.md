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
- `npm test` - Start the production server and open the interactive Cypress runner (run `npm run build` first)
- Tests are located in `cypress/e2e/`

#### Percy Visual Testing
- CI runs Cypress under `percy exec --` (`.github/workflows/cypress.yml`)
- Cypress has custom `waitForImagesLoaded` command with 60s timeout to avoid timeouts on the projects page with multiple images

### Contact Form Development
When working on the contact form, add an entry to `/etc/hosts` using a subdomain of allowed Formspree domains:
```
local.ryanrishi.com  127.0.0.1
```

## Architecture Overview

This is a Next.js personal website with the following key characteristics:

### Content Management
- **Blog Posts**: MDX files in `app/(site)/blog/` with frontmatter metadata
- **Projects**: MDX files in `app/(site)/projects/` with frontmatter metadata  
- **Content Loading**: `app/lib/posts.ts` and `app/lib/projects.ts` read MDX frontmatter from disk with `gray-matter` at build time
- **Sorting**: Posts sorted by `publishedAt` date (desc), Projects sorted by `date` (desc)

### MDX Configuration
- Uses `@next/mdx` with custom rehype/remark plugins
- **Rehype plugins**: slug generation, autolink headings, pretty code highlighting
- **Remark plugins**: GitHub Flavored Markdown, frontmatter processing
- **Custom components**: Defined in `mdx-components.tsx` including Blockquote, Callout, Link, dynamic imports for Logo, LoudnessWars, VideoContainer
- **Frontmatter handling**: Uses `gray-matter` to parse YAML frontmatter from MDX files at build time

### Styling & UI
- **CSS Framework**: Tailwind CSS v4, configured in `app/globals.css` via `@theme` (includes the custom `valencia` color palette)
- **Dark Mode**: Class-based dark mode via `next-themes`
- **Typography**: Uses `@tailwindcss/typography` plugin
- **Safelist**: `@source inline(...)` rules in `app/globals.css` for the dynamic callout component colors (green, blue, yellow, red, slate)

### Page Structure
- **App Router**: file-based routing in the `app/` directory
- **Route group**: Chromed pages live in an `app/(site)/` route group whose layout renders the shared `SiteChrome` (Header + container + Footer). The root layout holds only Providers + analytics, so `app/links/` renders chrome-free. `(site)` does not affect URLs.
- **Layout**: Root layout wraps everything in Providers + Google/Vercel Analytics; `app/(site)/layout.tsx` adds the visible chrome. The 404 (`app/not-found.tsx`) renders inside `SiteChrome` to keep the chrome.
- **Dynamic Routes**: `[slug]` patterns for blog posts and projects
- **Tags**: Tag-based filtering for both blog and projects
- **Route handlers**: `app/sitemap.ts`, `app/robots.ts`, `app/feed.xml/route.ts` (RSS), and `app/og/route.tsx` (OG images)

### Key Libraries
- **Animations**: Framer Motion
- **Dates**: date-fns for post sorting
- **Icons**: react-icons
- **Data Visualization**: D3.js (transpiled in next.config.mjs)
- **Analytics**: Google Analytics + Vercel Analytics/Speed Insights

### Data Flow
1. MDX files contain frontmatter with metadata (title, description, publishedAt/date, tags)
2. `app/lib/posts.ts` and `app/lib/projects.ts` parse and aggregate that frontmatter
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