# Agent Guidelines: Frontend Mentor Technical Solutions Gallery

Welcome to the **Frontend Mentor Technical Solutions Gallery** repository (`frontend-mentor-gallery`), maintained by **Tumelo Lutaka**.

This document defines the architecture, coding standards, directory layout, and operational rules for AI coding agents working on this project. **Read it fully before making changes.**

---

## 1. Project Overview & Core Philosophy

This repository is a centralized portfolio and dashboard showcasing responsive UI components and web applications from the [Frontend Mentor](https://www.frontendmentor.io/) curriculum.

It operates as a **hybrid repository**:

1. **The Gallery Dashboard**: A single-page **React (Vite)** application structured using **EBI (Entity-Boundary-Interactor)** architecture.
2. **Vanilla Challenge Solutions**: Self-contained, standalone HTML/CSS/JS projects located in `public/solutions/` that run independently without any CSS or JavaScript bleeding over from the React host app.
3. **React Challenge Solutions**: Standalone React mini-apps located in `solutions-react/` and compiled as independent multi-page entry points via Vite so they share the root `node_modules` while remaining 100% isolated from the gallery's styles and state.

### Agent Behavior & Coding Philosophy (CRITICAL)

- **Junior-Friendly & Readable Code**: Write clean, straightforward code that a junior developer can easily read and reason about. Avoid clever one-liners, over-abstracted generics, or complex design patterns unless strictly necessary.
- **Stepwise Implementation**: Make incremental, logical changes. Do not refactor unrelated files or introduce unrequested third-party libraries.
- **Ask Before Getting Fancy**: Only introduce complex optimizations (e.g., heavy memoization, custom state engines, complex hooks) when a real bug or performance bottleneck is encountered. **Always explain the issue and ask the user for approval before implementing a complex workaround.**
- **Strict Isolation**: The React gallery must never leak styles or scripts into the individual challenge folders. Challenges are linked via standard `<a href="...">` tags (not client-side React Router links) so the browser loads each solution as a fresh document.
- **Challenges Are Read-Only**: Everything in `public/solutions/` is the user's own Frontend Mentor answer, mirrored from its original repository. **Never edit, reformat, or "fix" files inside a challenge folder** unless the user explicitly asks. The gallery only links to them.
- **Direct Links Must Keep Working**: Every challenge must open on its own at `/solutions/<slug>/` (no gallery header, no gallery CSS). This is the URL pasted into Frontend Mentor submissions. Do not add routing, redirects or rewrites that would break this.

---

## 2. Repository & EBI Architecture (`src/`, `public/`, and `solutions-react/`)

We use `src/` as the root for the React gallery application, organized strictly around **EBI (Entity-Boundary-Interactor)** principles, `public/` for static assets and vanilla challenges, and `solutions-react/` for future React-based challenges.

```text
frontend-mentor-gallery/
├── public/                             # Static files served directly at root (/)
│   ├── data/
│   │   └── content.json                # Challenge registry/database
│   ├── assets/
│   │   └── images/
│   │       └── thumbnails/             # <slug>.png preview shown on each card
│   └── solutions/                      # Vanilla HTML/CSS/JS challenges (Zero build needed)
│       ├── tip-calculator-app/
│       │   ├── images/                 # Challenge's own assets
│       │   ├── index.html              # Direct entry point for this challenge
│       │   ├── style.css
│       │   └── main.js
│       └── ...
├── solutions-react/                    # Future React-based challenges (Vite Multi-Page)
│   └── <react-challenge-name>/
│       ├── index.html                  # Standalone HTML entry for this React challenge
│       ├── main.jsx                    # Mounts this specific challenge's React root
│       ├── App.jsx
│       └── style.css                   # Isolated styles for this challenge only
├── src/                                # Main React Gallery Application (EBI Architecture)
│   ├── composition/                    # Host setup, app bootstrapping, dependency wiring
│   │   └── main.jsx                    # React DOM root and provider composition
│   ├── entities/                       # Domain models, data shapes, validation rules
│   │   └── Challenge.js                # Challenge entity definition & helper methods
│   ├── interactors/                    # Use cases & business logic (pure JS, no React UI)
│   │   ├── fetchChallenges.js          # Use case: Load and sort challenges
│   │   └── toggleTheme.js              # Use case: Manage light/dark mode preference
│   ├── infrastructure/                 # External boundaries (fetch APIs, localStorage)
│   │   ├── challengeRepository.js      # Fetches /data/content.json
│   │   └── themeStorage.js             # Reads/writes theme state to localStorage
│   └── presentation/                   # React UI layer (Components, Pages, CSS)
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── SolutionCard.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   └── Dashboard.jsx           # Single-page gallery home view
│       └── styles/
│           ├── reset.css               # Baseline modern CSS reset
│           └── gallery.css             # Gallery design system (BEM, tokens, themes)
├── scripts/                            # Automation utilities
│   └── generate-thumbnails.ps1         # Screenshots challenges that have no thumbnail yet
├── index.html                          # Vite entry HTML for the React Gallery
├── netlify.toml                        # Netlify build settings (npm run build -> dist)
├── package.json
├── vite.config.js
└── agent.md                            # Agent instructions and rules (this file)
```

### EBI dependency rules

Dependencies point **inward**. Keep these rules so the layers stay easy to follow:

| Layer | May import | Must NOT import |
| --- | --- | --- |
| `entities/` | nothing from `src/` | React, `fetch`, `localStorage` |
| `interactors/` | `entities/` | React, `infrastructure/` (it receives infrastructure as a function argument) |
| `infrastructure/` | nothing from `src/` | React, `presentation/` |
| `presentation/` | `entities/`, `interactors/` | `infrastructure/` directly |
| `composition/` | everything | (it is the only place that connects the layers) |

---

## 3. Workflow: Adding a New Challenge

### Vanilla challenge (default)

1. Copy the challenge's files into `public/solutions/<slug>/`, where `<slug>` is the kebab-case repo/challenge name (e.g. `tip-calculator-app`). It must contain an `index.html`. **Use relative asset paths** (`./style.css`, not `/style.css`), otherwise it breaks when hosted.
2. Remove the cloned `.git` folder if the files came from a `git clone`.
3. **Attribution & Back Link**: In the challenge's footer or attribution tag, include a return link back to the gallery: `| <a href="../../">Back to Gallery</a>.`.
4. Add one entry to `public/data/content.json` (see schema below). Use the next highest `id`: the gallery lists the highest `id` first.
5. Generate the card thumbnail (see "Thumbnails").
6. Verify (see "Verification checklist").

### `content.json` schema

```json
{
  "id": 18,
  "slug": "tip-calculator-app",
  "title": "Tip Calculator App",
  "description": "1-2 sentences on what it does and what it practises.",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "difficulty": "Newbie | Junior | Intermediate | Advanced | Guru",
  "status": "Completed | In Progress"
}
```

The live path (`/solutions/<slug>/`), thumbnail path (`/assets/images/thumbnails/<slug>.png`) and repo link are **derived from `slug`** in `entities/Challenge.js`. Do not add URL fields to the JSON.

### Thumbnails

- File: `public/assets/images/thumbnails/<slug>.png`, same name as the slug.
- Start `npm run dev`, then run `powershell -ExecutionPolicy Bypass -File scripts/generate-thumbnails.ps1`. It only creates missing thumbnails; add `-Force` to redo all, or `-Slug <slug> -Force` for a single one.
- A hand-made screenshot dropped into the same path is also fine.

### React challenge (future)

Place it in `solutions-react/<slug>/` with its own `index.html` + `main.jsx`, and register the entry in `vite.config.js` via `build.rollupOptions.input` so it is built as a separate page. It must not import anything from `src/`. Ask the user before setting this up for the first time.

---

## 4. Coding Conventions & Standards

### Gallery (React)

- **Components**: function components with hooks, one component per file, default export. Keep props simple and name them clearly.
- **State**: keep state as close to where it is used as possible. Use `useState` / `useEffect`. No state libraries.
- **No routing library**: the gallery is one page. Challenge links are plain `<a>` tags.
- **Comments**: short comments explaining the "why", in plain language. Preserve existing comments unrelated to your change.
- **No new dependencies** (UI kits, icon packs, CSS frameworks, routers) without asking the user first. Icons are small inline SVGs.

### CSS & Styling (gallery)

- **Tokens**: all colours, spacing, radii and fonts are CSS custom properties in `src/presentation/styles/gallery.css`. Never hard-code colour values inside component rules.
- **Palette**: a neutral base of three tones (`--clr-bg-dark` page, `--clr-bg` main surface, `--clr-bg-light` raised surface), one primary colour (`--clr-primary`, green), and four semantic colours: `--clr-success`, `--clr-warning`, `--clr-danger`, `--clr-info`. Use semantic colours only where they carry meaning (status, errors, notices).
- **Themes**: dark is the default. Light overrides the same tokens under `:root[data-theme="light"]`. Any new colour must be defined for both themes.
- **Colour functions**: `oklch()` for tokens; `color-mix()` for tints.
- **Naming**: BEM (`card`, `card__title`, `badge--success`).
- **Units**: `rem` for type and spacing, `clamp()` for fluid headings, `min()` for container widths. Mobile-first.
- **Interaction**: every interactive element needs `:hover` and `:focus-visible` states. Respect `prefers-reduced-motion`.

### Accessibility (a11y)

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`) and one `h1` per page.
- Every interactive element needs an accessible name (visible text, `aria-label` or a `<label>`). Icon-only buttons must have an `aria-label`.
- Images need meaningful `alt` text (decorative icons use `aria-hidden="true"`).
- Strong colour contrast in **both** themes (WCAG AA minimum).
- Everything must be usable with a keyboard alone.

### Challenge folders

Read-only (see section 1). Their own conventions (HTML/CSS/JS, BEM-ish names, `reset.css`, `style-guide.md`) belong to the original Frontend Mentor answers.

---

## 5. Local Development, Hosting & Verification

### Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (first time only). |
| `npm run dev` | Dev server at `http://localhost:5173`. |
| `npm run build` | Production build into `dist/` (includes everything in `public/`). |
| `npm run preview` | Serve the built `dist/` locally. |

> **Windows note**: if PowerShell blocks `npm` ("running scripts is disabled"), use `npm.cmd` instead (e.g. `npm.cmd run dev`).

### Hosting (Netlify)

`netlify.toml` already sets the build command and publish folder. No redirects are needed: each challenge is a real `index.html` inside `dist/solutions/<slug>/`, so Netlify serves it directly. `vite.config.js` also contains a small plugin that makes the local dev/preview servers behave the same way. The Vite `base` is `"./"`, so the site works from a domain root or a sub-folder.

### Verification checklist

Run after any change that touches data, links or layout:

- [ ] `npm run build` succeeds.
- [ ] `public/data/content.json` is valid JSON and every `slug` has a matching folder in `public/solutions/` **and** a thumbnail PNG.
- [ ] The home page shows every challenge, newest first.
- [ ] `/solutions/<slug>/` opens that challenge alone (no gallery header/styles), for at least one challenge.
- [ ] "Live Site", "View Code" and "Copy link" work on a card.
- [ ] The theme toggle works and the choice survives a refresh.
- [ ] Layout holds from 320px to 1440px+ in both themes.
