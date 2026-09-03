# My Portfolio

React + Vite + Tailwind portfolio with a public site and a hidden `/admin`-style
dashboard (toggle via the floating button, bottom-right). Data is saved to
the browser's `localStorage`, so admin edits persist on reload on the same
device/browser.

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

## Notes

- Admin password (demo only, not real security): `admin123`
- GitHub Repos/Stats sections fetch live from the public GitHub API using
  the username set in Admin → Profile → "GitHub username".
- To connect this to the real backend (Express + MongoDB) instead of
  localStorage, replace `loadAll()` / `save()` in `src/App.jsx` with
  `fetch()` calls to your API — see the backend project's README for the
  exact endpoints and example code.
