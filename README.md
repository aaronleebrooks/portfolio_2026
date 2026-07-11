# Aaron Brooks — Portfolio

[![CI](https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml/badge.svg)](https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml)

Personal portfolio for [Aaron Brooks](https://a-a-ron.party): a single-page React + TypeScript app with a Brittany Chiang–inspired sticky-left layout.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- CSS + Intersection Observer for scroll reveals / card hover
- Inter + JetBrains Mono (latin-only, self-hosted via Fontsource)
- Deployed to GitHub Pages (`a-a-ron.party`)

## Testing

Two complementary layers:

| Layer | Tool | What it proves |
|-------|------|----------------|
| **Unit / component** | Vitest + React Testing Library | **100%** coverage; queries use accessible roles/labels only (no `querySelector` / `getElementById` in tests) |
| **E2E** | Playwright + axe | Real browser flows (nav, mobile sheet, contact) and WCAG serious/critical checks |

| Resource | URL |
|----------|-----|
| Latest CI run | https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml |
| Unit coverage report | https://a-a-ron.party/tests/coverage/ |
| E2E report | https://a-a-ron.party/tests/e2e/ |

```bash
npm run test            # Vitest unit suite
npm run test:coverage   # unit + 100% coverage gate
npm run test:e2e        # Playwright against production build
npm run lint:test       # ESLint testing-library rules on *.test.*
npm run test:all        # typecheck + lint:test + coverage + e2e
```

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build → dist/
npm run preview   # preview production build
npm run typecheck
```

## Structure

- `src/data/` — profile, skills, experience, projects (typed content)
- `src/components/layout/` — sticky sidebar + mobile sheet nav
- `src/components/sections/` — About, Experience, Projects, Contact
- `src/components/ui/` — shadcn primitives
- `e2e/` — Playwright specs

## Deploy

Push to `main` triggers `.github/workflows/ci.yml`, which typechecks, lints tests,
runs unit coverage + Playwright, then builds and publishes `dist/` (including
`/tests/coverage` and `/tests/e2e` reports) to GitHub Pages. `public/CNAME`
keeps the custom domain `a-a-ron.party`.
