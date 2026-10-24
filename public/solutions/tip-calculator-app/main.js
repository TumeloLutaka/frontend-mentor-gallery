// ===== BUTTONS ===== \\
const calculatorButtonReset = document.querySelector(
  "#calculator__button-reset",
);
const calculatorFieldsetRadios = document.querySelectorAll('input[name="tip"]');

// ===== INPUTS ===== \\
const calculatorFieldsetNumber = document.querySelector(
  "#calculator__fieldset-number",
);
const calculatorInputBill = document.querySelector("#calculator__input-bill");
const calculatorInputPeople = document.querySelector(
  "#calculator__input-people",
);

// ===== DIVS ===== \\
const calculatorInputWrapper = document.querySelector(
  "#calculator__input-wrapper_1",
);

// ===== TEXT ELEMENTS ===== \\
const calculatorTextError = document.querySelector("#calculator__text-error");
const calculatorSpanTotal = document.querySelector("#calculator__span-total");
const calculatorSpanTip = document.querySelector("#calculator__span-tip");

// =========================== \\
// ===== EVENT LISTENERS ===== \\
// =========================== \\
calculatorButtonReset.addEventListener("click", resetInputs);

calculatorFieldsetRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    calculatorFieldsetNumber.value = "";

    updateDisplay();
  });
});

// ===== INPUTS ===== \\
// Unseleting the radio inputs and calling the update function on inptu
calculatorFieldsetNumber.addEventListener("input", () => {
  resetRadioInputs();
  updateDisplay();
});

// Update the tip and total amounts text whenever user enters input into the bill section.
calculatorInputBill.addEventListener("blur", (e) => {
  const value = Number(e.target.value);
  const min = Number(e.target.min);

  if (value < min) {
    e.target.value = min;

    updateDisplay();
  }
});

// ===== Bill and People Input listeners ===== \\
[calculatorInputPeople, calculatorFieldsetNumber, calculatorInputBill].forEach(
  (input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "-") e.preventDefault();
    });
  },
);

calculatorInputBill.addEventListener("input", () => {
  // Check if the people input is empty, set it to one.
  updateDisplay();
});

calculatorInputPeople.addEventListener("blur", (e) => {
  if (Number(e.target.value) == 0) {
    calculatorInputWrapper.classList.add("calculator__input-wrapper_error");
    calculatorTextError.classList.remove("hidden");
  }
});

calculatorInputPeople.addEventListener("input", (e) => {
  calculatorInputWrapper.classList.remove("calculator__input-wrapper_error");
  calculatorTextError.classList.add("hidden");

  if (calculatorInputPeople.value == 0) return;
  updateDisplay();
});

// ===================== \\
// ===== FUNCTIONS ===== \\
// ===================== \\
function resetInputs() {
  // Resetting all inputs
  calculatorFieldsetNumber.value = "";
  calculatorInputBill.value = "";
  calculatorInputPeople.value = "";
  resetRadioInputs();

  updateDisplay();
}

function resetRadioInputs() {
  calculatorFieldsetRadios.forEach((radio) => {
    radio.checked = false;
  });
}

function updateDisplay() {
  const bill = Number(calculatorInputBill.value);
  const noOfPeople = Number(calculatorInputPeople.value) || 1;

  //Check if radio input has been selected or custom tip has been entered
  let tipPercent = 0;

  // 1. Check for Custom Tip first
  const customValue = calculatorFieldsetNumber.value;

  if (customValue !== "") {
    // If user typed something, use it
    tipPercent = Number(customValue) / 100;
  } else {
    // 2. If no custom tip, look for a radio button
    const tipElement = document.querySelector('input[name="tip"]:checked');
    if (tipElement) {
      tipPercent = Number(tipElement.value);
    }
  }

  const totalTip = bill * tipPercent;

  const factor = Math.pow(10, 2);
  const tipPerPerson = Math.floor((totalTip / noOfPeople) * factor) / factor;

  const totalWithTip = bill + totalTip;
  const splitBill = totalWithTip / noOfPeople;

  calculatorSpanTip.innerHTML = tipPerPerson.toFixed(2);
  calculatorSpanTotal.innerHTML = splitBill.toFixed(2);
}
