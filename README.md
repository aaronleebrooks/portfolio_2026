# Aaron Brooks — Portfolio

[![CI](https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml/badge.svg)](https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml)

This is my interactive portfolio — a single-page React app for my work as a full-stack engineer. It’s built with modern tooling (React 19, Tailwind v4, shadcn/ui) and held to **100% unit test coverage**, because I care as much about accessible, well-tested software as about how it looks.

**[View live portfolio →](https://a-a-ron.party)** · [Coverage report](https://a-a-ron.party/tests/coverage/) · [E2E report](https://a-a-ron.party/tests/e2e/) · [CI](https://github.com/aaronleebrooks/portfolio_2026/actions/workflows/ci.yml)

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- CSS + Intersection Observer for scroll reveals / card hover
- Inter + JetBrains Mono (latin-only, self-hosted via Fontsource)
- Deployed to GitHub Pages (`a-a-ron.party`)

## Structure

- `src/data/` — profile, skills, experience, projects (typed content)
- `src/components/layout/` — sticky sidebar + mobile sheet nav
- `src/components/sections/` — About, Experience, Projects, Contact
- `src/components/ui/` — shadcn primitives
- `e2e/` — Playwright specs

## Local development

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build → dist/
npm run preview   # preview production build
npm run typecheck
npm run test            # Vitest unit suite
npm run test:coverage   # unit + 100% coverage gate
npm run test:e2e        # Playwright against production build
npm run lint:test       # ESLint testing-library rules on *.test.*
npm run test:all        # typecheck + lint:test + coverage + e2e
```