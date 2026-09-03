# Portfolio Backend API

Express + MongoDB API powering the admin dashboard and public portfolio site
(profile, skills, projects, education, certificates, experience, contact
messages, live GitHub proxy).

## Setup

```bash
npm install
cp .env.example .env   
npm run dev
```

On first boot, if no admin user exists, one is created automatically from
`ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

## Docker

```bash
docker compose up --build
```

Runs the API alongside a local MongoDB container.

## Auth

- `POST /api/auth/login` `{ email, password }` → `{ token }`
- Send `Authorization: Bearer <token>` on admin-only routes.

## Endpoints

| Resource      | Public                          | Admin (Bearer token)                     |
|---------------|----------------------------------|-------------------------------------------|
| Profile       | `GET /api/profile`               | `PUT /api/profile`                        |
| Skills        | `GET /api/skills`                | `POST/PUT/DELETE /api/skills/:id`         |
| Projects      | `GET /api/projects`              | `POST/PUT/DELETE /api/projects/:id`       |
| Education     | `GET /api/education`             | `POST/PUT/DELETE /api/education/:id`      |
| Certificates  | `GET /api/certificates`          | `POST/PUT/DELETE /api/certificates/:id`   |
| Experience    | `GET /api/experience`            | `POST/PUT/DELETE /api/experience/:id`     |
| Messages      | `POST /api/messages` (contact)   | `GET/PATCH/DELETE /api/messages`          |
| GitHub        | `GET /api/github/stats?username=` `GET /api/github/repos?username=` | — |

## Deployment

- **API** → Render (Docker or native Node runtime)
- **Database** → MongoDB Atlas
- **Frontend** → Vercel, pointed at this API's URL via an env var
- **CI/CD** → `.github/workflows/ci.yml` builds/tests on every push to
  `main` and triggers a Render deploy hook

## Connecting the React frontend

In the frontend, replace the local `window.storage` calls with `fetch`
calls to these endpoints, e.g.:

```js
const res = await fetch(`${API_URL}/api/projects`);
const projects = await res.json();
```

For admin writes, attach the JWT from `/api/auth/login`:

```js
await fetch(`${API_URL}/api/projects`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify(newProject),
});
```
