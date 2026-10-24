// PRESENTATION: the single page of the gallery.
// It owns the two pieces of state: the challenges list and the theme.
// Business logic lives in the interactors; the Dashboard just calls them.

import { useEffect, useState } from "react";
import { getInitialTheme, toggleTheme } from "../../interactors/toggleTheme.js";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import SolutionCard from "../components/SolutionCard.jsx";
import Footer from "../components/Footer.jsx";

function Dashboard({ loadChallenges, themeStorage }) {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [theme, setTheme] = useState(() => getInitialTheme(themeStorage));

  // Load the challenges once, when the page first opens.
  useEffect(() => {
    loadChallenges()
      .then((loadedChallenges) => {
        setChallenges(loadedChallenges);
        setStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [loadChallenges]);

  // Whenever the theme changes, update the page and remember the choice.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    themeStorage.saveTheme(theme);
  }, [theme, themeStorage]);

  function handleToggleTheme() {
    setTheme(toggleTheme(theme));
  }

  const completedCount = challenges.filter(
    (challenge) => challenge.status === "Completed",
  ).length;

  return (
    <>
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <main>
        <Hero challengeCount={completedCount} />

        <section className="solutions container" aria-labelledby="solutions-heading">
          <h2 id="solutions-heading" className="solutions__heading">
            Solutions
          </h2>

          {status === "loading" && (
            <p className="message">Loading challenges…</p>
          )}

          {status === "error" && (
            <p className="message message--danger" role="alert">
              Something went wrong while loading the challenges. Please refresh the
              page.
            </p>
          )}

          {status === "ready" && (
            <div className="solutions__grid">
              {challenges.map((challenge) => (
                <SolutionCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
