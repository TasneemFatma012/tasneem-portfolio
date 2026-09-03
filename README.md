# Portfolio — Full Project

```
full-project/
├── frontend/   React + Vite + Tailwind portfolio (public site + admin UI)
└── backend/    Express + MongoDB API (auth, CRUD, contact form, GitHub proxy)
```

## Quick start

**Backend**
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev             # http://localhost:5000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Frontend runs standalone with browser `localStorage` out of the box — no
backend required to preview it. To wire it to the real API instead, edit
`frontend/src/App.jsx`: replace the `loadAll()` / `save()` functions with
`fetch()` calls to the backend endpoints listed in `backend/README.md`,
and send the JWT from `POST /api/auth/login` on admin writes.

See `frontend/README.md` and `backend/README.md` for full details on each side.
