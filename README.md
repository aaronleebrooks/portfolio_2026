# portfolio_2026

A Windows XP desktop–themed portfolio for **Aaron Brooks**, Full Stack Software
Engineer.

Live: https://aaronleebrooks.github.io/portfolio_2026/ (custom domain
`a-a-ron.party` coming soon).

## Stack

- React 19 + TypeScript
- Webpack 5 (SWC transform via `swc-loader`)
- Redux Toolkit
- Tailwind CSS v4 + [XP.css](https://botoxparty.github.io/XP.css/)
- Jest + React Testing Library
- Deployed to GitHub Pages via GitHub Actions

## Scripts

```bash
npm run dev        # local dev server (requires Node 22+)
npm run build      # production build to dist/
npm test           # unit tests
npm run typecheck  # tsc --noEmit
```

Node 22+ recommended (see `.nvmrc`).
