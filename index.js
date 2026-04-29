/* =============================== */
/* ========= DOM REFERENCE ======= */
/* =============================== */
// DIVS
const solutionsCardWrapper = document.getElementById(
  "solutions__cards-wrapper",
);

// INPUT
const mainHeaderThemeToggle = document.getElementById(
  "main-header__theme-checkbox",
);

initialize();
/* =============================== */
/* =========== EVENT LISTENERS === */
/* =============================== */
mainHeaderThemeToggle.addEventListener("change", () => {
  if (mainHeaderThemeToggle.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

readmeModalClose.addEventListener("click", () => {
  readmeModal.close();
});

/* =============================== */
/* =========== FUNCTIONS ========= */
/* =============================== */
function initialize() {
  // SETTING THEME
  // 1. Check if the user is on dark mode via system settings
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    document.body.classList.add("dark-mode");
    mainHeaderThemeToggle.checked = true; // Make sure the UI switch matches!
  } else {
    document.body.classList.remove("dark-mode");
    mainHeaderThemeToggle.checked = false;
  }

  loadCards();
}

async function loadCards() {
  try {
    const response = await fetch("./content.json");
    const solutions = await response.json();

    // Clear the children content from the card wrapper.
    solutionsCardWrapper.innerHTML = "";

    // Loop through every solutions object and create an associated card element
    solutions.forEach((sol) => {
      solutionsCard = document.createElement("article");
      solutionsCard.classList.add("solutions__card");
      solutionsCard.innerHTML = `
        <div class="solutions__card-header">  
          <img
            class="solutions__card-img"
            src="${sol.thumbnail}"
            alt=""
          />

          <div class="solutions__card-text-wrapper">
              <h3 class="solutions__card-heading heading">${sol.title}</h3>
              <p class="solutions__card-desc">${sol.description}</p>
          </div>
        </div>

        <div class="solutions__card-actions">
          <div class="solutions__links">
            <a class="solutions__link button" href="${sol.live_url}">Live Site</a>
            <a class="solutions__link button" href="${sol.repo_url}">View Code</a>
            </div>
        </div>
        `;

      solutionsCardWrapper.appendChild(solutionsCard);
    });
  } catch (error) {
    console.log(error);
  }
}
