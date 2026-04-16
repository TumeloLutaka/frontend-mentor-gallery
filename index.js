/* =============================== */
/* ========= DOM REFERENCE ======= */
/* =============================== */
// DIVS
const solutionsCardWrapper = document.getElementById(
  "solutions__cards-wrapper",
);

initialize();

async function initialize() {
  try {
    const response = await fetch("./content.json");
    const solutions = await response.json();

    console.log(solutions);
    loadCards(solutions);
  } catch (error) {
    console.log(error);
  }
}

function loadCards(solutions) {
  // Clear the children content from the card wrapper.
  solutionsCardWrapper.innerHTML = "";

  // Loop through every solutions object and create an associated card element
  solutions.forEach((sol) => {
    solutionsCard = document.createElement("article");
    solutionsCard.classList.add("solutions__card");
    solutionsCard.innerHTML = `
        <div class="solutions__card-text-wrapper">
            <h3 class="solutions__card-heading heading">${sol.title}</h3>
            <p class="solutions__card-desc">${sol.description}</p>
        </div>

        <div class="solutions__links">
            <a class="solutions__link" href="${sol.live_url}">Live Site</a>
            <a class="solutions__link" href="${sol.repo_url}">View Code</a>
        </div>
    `;

    solutionsCardWrapper.appendChild(solutionsCard);
  });
}
