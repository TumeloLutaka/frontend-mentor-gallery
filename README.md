# Frontend Mentor: Technical Solutions Gallery

A centralized gallery of my [Frontend Mentor](https://www.frontendmentor.io/profile/TumeloLutaka) solutions: responsive UI components and logic-heavy web apps built with vanilla HTML, CSS and JavaScript.

## How it works

The gallery itself is a small **React (Vite)** app. Each challenge is a **standalone static page** that the gallery only links to, so the two never share styles or scripts.

- **Gallery:** `src/`, organised with EBI (Entity-Boundary-Interactor) layers.
- **Challenges:** `public/solutions/<slug>/`, each one opens on its own at `/solutions/<slug>/`. That is the URL used in Frontend Mentor submissions.
- **Registry:** `public/data/content.json` lists every challenge. Adding a challenge needs one JSON entry plus a thumbnail.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Hosting

Deploys to Netlify as-is (`netlify.toml` is included): build command `npm run build`, publish directory `dist`.

## Stack

- **UI:** React + Vite
- **Styles:** Modern CSS (custom properties, `oklch()`, Grid, Flexbox), dark and light themes
- **Typography:** Inter via Google Fonts
- **Challenges:** Vanilla HTML, CSS and JavaScript

For contributor and AI-agent conventions, see [agent.md](./agent.md).

---

Created with 🌿 by Tumelo Lutaka
