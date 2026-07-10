# Aaron Brooks — Portfolio

Personal portfolio for [Aaron Brooks](https://a-a-ron.party): a single-page React + TypeScript app with a Brittany Chiang–inspired sticky-left layout.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- CSS + Intersection Observer for scroll reveals / card hover
- Inter + JetBrains Mono (latin-only, self-hosted via Fontsource)
- Deployed to GitHub Pages (`a-a-ron.party`)

## Caching note

GitHub Pages hard-caps `Cache-Control` at `max-age=600` for all assets, including
hashed `/assets/*` files. To get long-lived caching (and clear Lighthouse’s
cache-lifetime audit), put Cloudflare in front of `a-a-ron.party` and add a
Cache Rule for `/assets/*` → Cache Everything, Edge TTL 1 year
(`immutable` is safe because Vite hashes filenames). Keep `index.html` short-TTL
or bypass so deploys take effect immediately.

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
