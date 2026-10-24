// PRESENTATION: one card in the gallery.
//
// "Live Site" and "View Code" are normal <a> tags on purpose. The browser loads
// the challenge as a brand new page, so none of the gallery's CSS or JS can
// touch it.

import { useState } from "react";
import { getPublicUrl } from "../../entities/Challenge.js";

function getStatusClass(status) {
  return status === "Completed" ? "badge--success" : "badge--warning";
}

function SolutionCard({ challenge }) {
  // "idle" | "copied" | "failed"
  const [copyState, setCopyState] = useState("idle");

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getPublicUrl(challenge));
      setCopyState("copied");
    } catch (error) {
      setCopyState("failed");
    }

    setTimeout(() => setCopyState("idle"), 2000);
  }

  const copyLabel = {
    idle: "Copy link",
    copied: "Link copied!",
    failed: "Copy failed",
  }[copyState];

  return (
    <article className="card">
      <img
        className="card__image"
        src={challenge.thumbnail}
        alt={`Preview of the ${challenge.title} solution`}
        loading="lazy"
        width="640"
        height="400"
      />

      <div className="card__body">
        <div className="card__badges">
          <span className={`badge ${getStatusClass(challenge.status)}`}>
            {challenge.status}
          </span>
          <span className="badge badge--info">{challenge.difficulty}</span>
        </div>

        <h3 className="card__title">{challenge.title}</h3>
        <p className="card__description">{challenge.description}</p>

        <ul className="card__tech-list" aria-label="Technologies used">
          {challenge.technologies.map((technology) => (
            <li key={technology} className="card__tech">
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <div className="card__actions">
        <a className="button button--primary" href={challenge.path}>
          Live Site
        </a>
        <a className="button button--secondary" href={challenge.repoUrl}>
          View Code
        </a>
        <button
          className={`button button--ghost ${copyState === "copied" ? "is-success" : ""} ${copyState === "failed" ? "is-danger" : ""}`}
          type="button"
          onClick={handleCopyLink}
          aria-live="polite"
        >
          {copyLabel}
        </button>
      </div>
    </article>
  );
}

export default SolutionCard;
