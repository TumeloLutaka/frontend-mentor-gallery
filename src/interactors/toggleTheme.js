// INTERACTOR (use case): decide which theme to show.

// Order of priority: saved choice, then the device setting, then dark.
export function getInitialTheme(themeStorage) {
  const savedTheme = themeStorage.getSavedTheme();

  if (savedTheme) {
    return savedTheme;
  }

  return themeStorage.systemPrefersLight() ? "light" : "dark";
}

export function toggleTheme(currentTheme) {
  return currentTheme === "dark" ? "light" : "dark";
}
