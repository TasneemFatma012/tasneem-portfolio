# Portfolio frontend

The React + Vite application for Tasneem's static developer portfolio. For the project overview and home-page preview, see the [root README](../README.md).

## Folder and file structure

```text
frontend/
├── public/                              # Static files served as-is
│   ├── project-images/                  # Portfolio project screenshots
│   │   ├── 1787063626205-484860233.png
│   │   ├── 1787127852181-845735343.png
│   │   ├── 1787127908411-674801360.png
│   │   ├── 1787382301599-154965434.png
│   │   └── student-performance-dashboard.png
│   ├── Tasneem-Fatma-CV.pdf             # Downloadable resume
│   └── TF logo.png                      # Portfolio logo
├── src/
│   ├── components/
│   │   ├── common/                      # Reusable UI building blocks
│   │   │   ├── Card.jsx
│   │   │   ├── Field.jsx
│   │   │   ├── Pill.jsx
│   │   │   ├── Rail.jsx
│   │   │   └── Section.jsx
│   │   └── public/                      # Sections of the public portfolio
│   │       ├── About.jsx
│   │       ├── Certificates.jsx
│   │       ├── ContactForm.jsx
│   │       ├── DsaPerformance.jsx
│   │       ├── Education.jsx
│   │       ├── Experience.jsx
│   │       ├── Footer.jsx
│   │       ├── GithubSection.jsx
│   │       ├── Hero.jsx
│   │       ├── LinkedInSection.jsx
│   │       ├── Navbar.jsx
│   │       ├── Projects.jsx
│   │       ├── ResumeContact.jsx
│   │       └── Skills.jsx
│   ├── pages/
│   │   └── PublicSite.jsx               # Assembles the portfolio sections
│   ├── utils/
│   │   └── constants.js                 # Profile, skills, and portfolio content
│   ├── App.jsx                          # Application root
│   ├── index.css                        # Global styles and responsive layout
│   └── main.jsx                         # React entry point
├── index.html                           # Vite HTML entry
├── package.json                         # Scripts and dependencies
├── package-lock.json                    # Locked npm dependency versions
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.js                   # Tailwind CSS configuration
└── vite.config.js                       # Vite configuration
```

## Run locally

**Requirements:** Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. Deploy that folder to Vercel,
Netlify, GitHub Pages, or another static host.

## Update portfolio content

Edit the `DEFAULTS` object in `src/utils/constants.js` to update the profile,
skills, projects, education, certificates, and experience. Replace or add
project screenshots in `public/project-images/`.

The gallery highlights major projects first and keeps mini projects in an
expandable archive. Skills are presented by category rather than subjective
percentage ratings. Keep each project's technology tags accurate and verify
live demo links before adding them.

The contact form opens a prefilled email in the visitor's email application.
Public GitHub repository information is fetched from GitHub's API and may be
subject to its rate limits. The portfolio does not require a custom backend,
database, or server-side environment variables.
