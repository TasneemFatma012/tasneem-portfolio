# My Portfolio

Static React + Vite + Tailwind portfolio. It requires no backend, database, or
environment variables.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output goes to `dist/` — deploy that folder to Vercel, Netlify,
GitHub Pages, or any static host.

## Updating content

Edit the `DEFAULTS` object in `src/utils/constants.js` to update profile,
skills, projects, education, certificates, and experience.

The project gallery highlights the major projects first; mini projects are
available in the expandable archive. Skills are shown as categories with
project examples rather than subjective percentage ratings. Keep technology
tags aligned with each project's repository and only add live links that have
been checked.

The contact form opens a prefilled email in the visitor's email app. GitHub
repositories and profile stats are fetched directly from GitHub's public API.
