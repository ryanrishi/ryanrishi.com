# AGENTS

This repository contains the source for my personal website built with **Next.js** and **TypeScript**. The following folders are important:

- `app/` – Next.js "app" directory. Pages live directly under this folder and reusable pieces go in `app/components`.
- `branding/` – logo and branding assets.
- `content/` – Markdown/MDX files processed by Contentlayer (blog posts in `content/blog`, projects in `content/projects`, etc.).
- `public/` – static assets served as-is.
- `cypress/` – end to end tests written with Cypress.
- `terraform/` – Terraform files for infrastructure.

## Style guide

- Use **npm** for all scripts and dependency changes.
- Code is formatted with two spaces and no semicolons. Follow `.editorconfig` and `eslint` rules.
- Keep imports sorted via `eslint-plugin-simple-import-sort`.
- New pages should be placed in `app` and components in `app/components`.

## Checks

- Run `npm run lint` and ensure it passes.
- Run `npm run build` to ensure the build passes.

