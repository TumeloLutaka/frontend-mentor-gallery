/* =============================== */
/* ========= DOM REFERENCE ======= */
/* =============================== */
// Buttons
const menuButtons = document.querySelectorAll(".menu__button");
const scorePlayAgainButton = document.getElementById(
  "score__play-again-button",
);
const testSubmitButton = document.getElementById("test__submit-button");

// Divs / Containers
const mainHeaderTopic = document.getElementById("main-header__topic");
const scoreTopic = document.getElementById("score__topic");
const sections = document.querySelectorAll("section");
const testProgressBar = document.getElementById("test__progress-bar");

// Inputs
const themeToggle = document.getElementById("theme-toggle");

// Form
const testForm = document.getElementById("test__form");

// Text Elements
const scoreStatsNum = document.getElementById("score__stats-num");
const testErrorLabel = document.getElementById("test__error-label");
const testOptions = document.querySelectorAll(".test__option");
const testQuestionIndex = document.getElementById("test__question-index");
const testQuestionText = document.getElementById("test__question-text");

const themeSwitch = document.querySelector("#theme-switch"); // Your checkbox/toggle
const body = document.body;

initialize();

/* =============================== */
/* ========== VARIABLES ========== */
/* =============================== */
let activeQuiz = {};
let isAnswered = false;

/* =============================== */
/* ========== CONSTANTS ========== */
/* =============================== */

const Section = {
  MENU: 0,
  TEST: 1,
  SCORE: 2,
};

/* =============================== */
/* ======= EVENT LISTENERS ======= */
/* =============================== */
menuButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    handleSelectQuiz(index);
  });
});

scorePlayAgainButton.addEventListener("click", () => {
  isAnswered = false;

  mainHeaderTopic.classList.add("visibility-hidden");
  showSection(Section.MENU);
});

themeToggle.addEventListener("change", () => {
  console.log("Changing");
  if (themeToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
});

testForm.addEventListener("submit", (e) => {
  e.preventDefault();
  testErrorLabel.classList.add("hidden");

  // Get reference to checked input
  const selectedInput = testForm.querySelector(
    'input[name="test__option"]:checked',
  );

  if (!selectedInput) {
    testErrorLabel.classList.remove("hidden");
    return;
  }

  if (isAnswered) {
    goToNextQuestion();
    return;
  }

  const selectedIndex = selectedInput.dataset.index;
  const userResponse = selectedInput.value;

  isCorrect =
    userResponse == activeQuiz.questions[activeQuiz.currentQestionIndex].answer;

  console.log(isCorrect, userResponse);

  if (isCorrect) {
    activeQuiz.score++;
    testOptions[selectedIndex].classList.add("answer");
  } else {
    const answerIndex = getAnswerIndex();
    console.log(getAnswerIndex());
    testOptions[answerIndex].classList.add("reveal");
    testOptions[selectedIndex].classList.add("incorrect");
  }

  isAnswered = true;
  testSubmitButton.textContent =
    activeQuiz.currentQestionIndex == 9 ? "Get Score" : "Next";
});

/* =============================== */
/* ========== FUNCTIONS ========== */
/* =============================== */
function getAnswerIndex() {
  const question = activeQuiz.questions[activeQuiz.currentQestionIndex];
  const correctAnswer = question.answer;

  return question.options.findIndex((option) => option === correctAnswer);
}

function goToNextQuestion() {
  testSubmitButton.textContent = "Submit Answer";

  if (activeQuiz.currentQestionIndex == 9) {
    scoreStatsNum.textContent = activeQuiz.score;

    showSection(Section.SCORE);
    return;
  }

  activeQuiz.currentQestionIndex++;

  isAnswered = false;

  updateInterface();
}

async function handleSelectQuiz(index) {
  // Get quiz data and set active quiz
  await loadQuizzes(index);

  // Show selected quiz icon
  mainHeaderTopic.classList.remove("visibility-hidden");

  // Hide menu, show quiz
  updateInterface();
  showSection(Section.TEST);
}

function initialize() {
  // 1. Check if the user is on dark mode via system settings
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    body.classList.add("dark-mode");
    themeToggle.checked = true; // Make sure the UI switch matches!
  } else {
    body.classList.remove("dark-mode");
    themeSwitch.checked = false;
  }
}

async function loadQuizzes(index) {
  try {
    // 1. Fetch the file
    const response = await fetch("./data.json"); // Replace with your actual filename

    // 2. Check if the file was found
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Parse the JSON data
    const data = await response.json();

    activeQuiz = { ...data.quizzes[index], currentQestionIndex: 0, score: 0 };
    console.log(activeQuiz, index);

    [mainHeaderTopic, scoreTopic].forEach((topic) => {
      topic.querySelector("img").src = activeQuiz.icon;
      topic.querySelector("p").textContent = activeQuiz.title;
      topic.querySelector("div").classList = "";
      topic.querySelector("div").classList =
        `topic-icon__wrapper topic-icon__wrapper--${activeQuiz.title.toLowerCase()}`;
    });

    // 4. Use your data
  } catch (error) {
    console.error("Could not fetch the quiz data:", error);
  }
}

function showSection(section) {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  sections[section].classList.remove("hidden");
}

function updateInterface() {
  const questionIndex = activeQuiz.currentQestionIndex;

  testQuestionIndex.textContent = questionIndex + 1;
  testProgressBar.style.width = `${questionIndex + 1}0%`;

  testQuestionText.textContent = activeQuiz.questions[questionIndex].question;

  testOptions.forEach((item, index) => {
    item.classList.remove("answer");
    item.classList.remove("incorrect");
    item.classList.remove("reveal");

    optionInput = item.querySelector("input");
    optionText = item.querySelector(".test__option-text");

    optionInput.value = activeQuiz.questions[questionIndex].options[index];
    optionInput.dataset.index = index;
    optionInput.checked = false;

    optionText.textContent = activeQuiz.questions[questionIndex].options[index];
  });
}
