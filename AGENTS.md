# AGENTS

This repository contains the source for my personal website built with **Next.js** and **TypeScript**. The following folders are important:

- `app/` – Next.js "app" directory. Chromed pages live in the `app/(site)/` route group and reusable pieces go in `app/components`.
- `app/(site)/blog/` and `app/(site)/projects/` – MDX content with YAML frontmatter, parsed at build time by `app/lib/posts.ts` and `app/lib/projects.ts`.
- `branding/` – logo and branding assets.
- `public/` – static assets served as-is.
- `cypress/` – end to end tests written with Cypress.
- `terraform/` – Terraform files for infrastructure.

## Style guide

- Use **npm** for all scripts and dependency changes.
- Code is formatted with two spaces and no semicolons. Follow `.editorconfig` and `eslint` rules.
- Keep imports sorted.
- New pages should be placed in `app/(site)` and components in `app/components`.

## Checks

- Run `npm run lint` and ensure it passes.
- Run `npm run build` to ensure the build passes.

