// COMPOSITION: the one place where the pieces get connected.
// Infrastructure (real fetch / localStorage) is handed to the interactors
// and the UI here, so nothing else needs to import it directly.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { challengeRepository } from "../infrastructure/challengeRepository.js";
import { themeStorage } from "../infrastructure/themeStorage.js";
import { fetchChallenges } from "../interactors/fetchChallenges.js";
import Dashboard from "../presentation/pages/Dashboard.jsx";

import "../presentation/styles/reset.css";
import "../presentation/styles/gallery.css";

function loadChallenges() {
  return fetchChallenges(challengeRepository);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dashboard loadChallenges={loadChallenges} themeStorage={themeStorage} />
  </StrictMode>,
);
