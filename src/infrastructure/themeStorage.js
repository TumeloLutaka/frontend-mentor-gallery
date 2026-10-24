// INFRASTRUCTURE: reads and writes the theme choice in the browser.

const STORAGE_KEY = "gallery-theme";

export const themeStorage = {
  // Returns "light", "dark", or null if the visitor has never chosen.
  getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  },

  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  },

  systemPrefersLight() {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  },
};
