import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite's dev and preview servers answer unknown folder URLs with the gallery's
// own index.html. Real hosts like Netlify don't do that: they serve the folder's
// index.html. This small plugin makes the local servers behave like a real host,
// so /solutions/<slug>/ opens that challenge on its own.
function serveChallengeFolders() {
  function middleware(request, response, next) {
    const isChallengeFolder = /^\/solutions\/[^/]+\/$/.test(request.url.split("?")[0]);

    if (isChallengeFolder) {
      request.url = request.url.split("?")[0] + "index.html";
    }

    next();
  }

  return {
    name: "serve-challenge-folders",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), serveChallengeFolders()],

  // "./" keeps every link relative, so the site works at a domain root
  // (Netlify) and also from a sub-folder (e.g. GitHub Pages).
  base: "./",
});
