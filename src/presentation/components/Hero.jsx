// PRESENTATION: the intro section at the top of the page.

function Hero({ challengeCount }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="hero__eyebrow">Frontend Mentor</p>
        <h1 id="hero-heading" className="hero__heading">
          Technical <span className="hero__heading-accent">Solutions</span> Gallery
        </h1>
        <p className="hero__text">
          An active collection of responsive UI components and logic-heavy web
          applications, built with a focus on clean code and vanilla patterns.
        </p>

        {challengeCount > 0 && (
          <p className="hero__count">
            <strong>{challengeCount}</strong> challenges completed
          </p>
        )}
      </div>
    </section>
  );
}

export default Hero;
