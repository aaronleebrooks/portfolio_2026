# Aaron Brooks — Portfolio

Personal portfolio for [Aaron Brooks](https://a-a-ron.party): a single-page React + TypeScript app with a Brittany Chiang–inspired sticky-left layout.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- Motion (`motion/react`) for scroll reveals and card hover
- Inter + JetBrains Mono (self-hosted via Fontsource)
- Deployed to GitHub Pages (`a-a-ron.party`)

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

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite and publishes `dist/` to GitHub Pages. `public/CNAME` keeps the custom domain `a-a-ron.party`.
