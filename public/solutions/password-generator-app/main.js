/* =============================== */
/* =========== DOM ELEMENTS ====== */
/* =============================== */
// Buttons
const generatorButton = document.querySelector(".generator__button");
const generatorCopy = document.querySelector(".generator__copy");

// Divs
const generatorStrengthBars = document.querySelectorAll(
  ".generator__strength-bar",
);
const generatorStrengthIndicator = document.querySelector(
  ".generator__strength-indicator",
);

// Inputs
const generatorCheckboxUpper = document.querySelector(
  "#generator__checkbox-upper",
);
const generatorCheckboxLower = document.querySelector(
  "#generator__checkbox-lower",
);
const generatorCheckboxNumber = document.querySelector(
  "#generator__checkbox-number",
);
const generatorCheckboxSymbol = document.querySelector(
  "#generator__checkbox-symbol",
);
const generatorSlider = document.querySelector(".generator__slider");

// Text
const generatorCopiedIndicator = document.querySelector(
  "#generator__copied-indicator",
);
const generatorDisplay = document.querySelector(".generator__display");
const generatorLengthValue = document.querySelector(".generator__length-value");
const generatorStrengthText = document.querySelector(
  ".generator__strength-text",
);

// Form
const generatorForm = document.querySelector("#generator__form");

/* =============================== */
/* =========== OBJECTS =========== */
/* =============================== */
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

/* =============================== */
/* =========== EVENT LISTENERS === */
/* =============================== */
// Update strength score whenever a checkbox is selected
[
  generatorCheckboxLower,
  generatorCheckboxUpper,
  generatorCheckboxNumber,
  generatorCheckboxSymbol,
].forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    calculateStrength();
  });
});

generatorCopy.addEventListener("click", async () => {
  const password = generatorDisplay.innerText;

  if (password === "" || password === "P4$5W0rD!") return;

  try {
    await navigator.clipboard.writeText(password);

    // Displayed copied text indicator
    generatorCopiedIndicator.classList.remove("hidden");

    setTimeout(() => {
      generatorCopiedIndicator.classList.add("hidden");
    }, 3000);
  } catch (error) {
    console.log(error.message);
  }
});

// Generate event listen
generatorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const passwordLength = +generatorSlider.value;
  const hasLower = generatorCheckboxLower.checked;
  const hasUpper = generatorCheckboxUpper.checked;
  const hasNumber = generatorCheckboxNumber.checked;
  const hasSymbol = generatorCheckboxSymbol.checked;

  generatorDisplay.innerText = generatePassword(
    passwordLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
  );
});

generatorSlider.addEventListener("input", () => {
  updateSliderProgress();
  calculateStrength();
});

/* =============================== */
/* =========== FUNCTIONS ========= */
/* =============================== */
function calculateStrength() {
  const passwordLength = +generatorSlider.value;
  const hasLower = generatorCheckboxLower.checked;
  const hasUpper = generatorCheckboxUpper.checked;
  const hasNumber = generatorCheckboxNumber.checked;
  const hasSymbol = generatorCheckboxSymbol.checked;

  let score = 0;
  const checkedCount = hasUpper + hasLower + hasNumber + hasSymbol;

  // Base Logic: Start with the number of types checked
  score = checkedCount;

  // Length Logic: If it's too short, it can't be strong
  if (passwordLength < 8) {
    // If it's very short, cap the score at "Weak" (2)
    score = Math.min(score, 2);
  } else if (passwordLength >= 12) {
    // If it's long and has variety, boost the score
    if (checkedCount >= 3) score = 4;
  }

  // Ensure we always return at least 1 if something is checked
  displayStrengthScore(score || 0);
}

function displayStrengthScore(score) {
  generatorStrengthIndicator.setAttribute("data-strength", score);

  generatorStrengthBars.forEach((bar) => {
    bar.classList.remove("generator__strength-bar--active");
  });

  for (let i = 0; i < score; i++) {
    generatorStrengthBars[i].classList.add("generator__strength-bar--active");
  }

  const levels = ["", "TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];
  generatorStrengthText.innerText = levels[score];
}

function generatePassword(passwordLength, lower, upper, number, symbol) {
  // 1. Initialize password var
  // 2. Filter out unchecked typed
  // 3. Loop over the length call generator function for each type
  // 4. Add final password to the password variable and return it

  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  if (typesCount === 0 || passwordLength < 1) {
    generatorDisplay.classList.add("generator__display--inactive");
    return "P4$5W0rD!";
  }

  const types = [{ lower }, { upper }, { number }, { symbol }].filter(
    (type) => Object.values(type)[0],
  );

  for (let i = 0; i < passwordLength; i += typesCount) {
    types.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, passwordLength);
  generatorDisplay.classList.remove("generator__display--inactive");
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateSliderProgress() {
  const min = generatorSlider.min || 0;
  const max = generatorSlider.max || 100;
  const value = generatorSlider.value;

  generatorLengthValue.innerText = generatorSlider.value;

  // Calculator percentage: (current - min) / (max - min) * 100
  const percentage = ((value - min) / (max - min)) * 100;

  // Update the CSS Variable directly on the element
  generatorSlider.style.setProperty("--progress", `${percentage}%`);
}

// Initialize slider on page load.
updateSliderProgress();
