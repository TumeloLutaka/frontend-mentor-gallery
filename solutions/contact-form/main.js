const contactForm = document.getElementById("contact-form");
const contactFormSuccessWapper = document.getElementById(
  "contact-form__success-wrapper",
);

/* =============================== */
/* ======= EVENT LISTENERS ======= */
/* =============================== */
// FORMS
contactForm.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  const fields = contactForm.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  });

  if (isValid) {
    console.log("Submitting");
    triggerToast();

    contactForm.reset();
  } else {
    contactForm.querySelector(":invalid").focus();
  }
});

/* =============================== */
/* ========== FUNCTIONS ========== */
/* =============================== */
function triggerToast() {
  contactFormSuccessWapper.classList.add("show");

  setTimeout(() => {
    contactFormSuccessWapper.classList.remove("show");
  }, 6000);
}

function validateField(field) {
  const contactFormErrorLabel =
    field.type === "radio" || field.type === "checkbox"
      ? field.closest(".error-holder").querySelector(".form-group__error-label")
      : field.parentElement.querySelector(".form-group__error-label");

  if (!field.validity.valid) {
    contactFormErrorLabel.textContent =
      field.dataset.error || "This field is required";
    return false;
  }

  contactFormErrorLabel.textContent = "";
  return true;
}
