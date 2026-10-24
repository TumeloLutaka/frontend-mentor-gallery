// PRESENTATION: the top bar with logo, links and the theme switch.

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="header__icon">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="header__icon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function Header({ theme, onToggleTheme }) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__logo" href="./">
          Tumelo<span className="header__logo-dot">.dev</span>
        </a>

        <nav className="header__nav" aria-label="Main">
          <ul className="header__nav-list">
            <li>
              <a className="header__link" href="https://github.com/TumeloLutaka">
                GitHub
              </a>
            </li>
            <li>
              <a
                className="header__link"
                href="https://www.frontendmentor.io/profile/TumeloLutaka"
              >
                Frontend Mentor
              </a>
            </li>
          </ul>
        </nav>

        <button
          id="theme-toggle"
          className="header__theme-button"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextTheme} theme`}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

export default Header;
