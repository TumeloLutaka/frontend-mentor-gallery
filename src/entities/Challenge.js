// ENTITY: What a "Challenge" is in this app.
// This file knows nothing about React, fetch or the browser.

const REPO_URL =
  "https://github.com/TumeloLutaka/frontend-mentor-gallery/tree/main/public/solutions";

// BASE_URL is "./" in this project, so these links also work if the site is
// ever hosted from a sub-folder instead of the domain root.
const BASE_URL = import.meta.env.BASE_URL;

// Turns one raw item from content.json into a Challenge the UI can use.
export function createChallenge(rawChallenge) {
  return {
    id: rawChallenge.id,
    slug: rawChallenge.slug,
    title: rawChallenge.title,
    description: rawChallenge.description,
    technologies: rawChallenge.technologies,
    difficulty: rawChallenge.difficulty,
    status: rawChallenge.status,

    // Everything below is worked out from the slug.
    path: `${BASE_URL}solutions/${rawChallenge.slug}/`,
    thumbnail: `${BASE_URL}assets/images/thumbnails/${rawChallenge.slug}.png`,
    repoUrl: `${REPO_URL}/${rawChallenge.slug}`,
  };
}

// The full link you paste into a Frontend Mentor submission.
// Works on any host (localhost, Netlify, etc.) because it uses the current origin.
export function getPublicUrl(challenge) {
  return new URL(challenge.path, window.location.href).href;
}
