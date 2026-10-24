// Retriving HTML element references.
const form = document.getElementById("form");
const formInputEmail = document.getElementById("form__input-email");
const formFieldError = document.getElementById("form__field-error");
const successSubmittedEmail = document.getElementById(
  "success__submitted-email",
);

const success = document.getElementById("success");
const successBtnDismiss = document.getElementById("success__btn-dismiss");

// ====== EVENT LISTENERS ===== \\
formInputEmail.addEventListener("input", () => {
  // Ass soon as user types, clear warning
  if (formInputEmail.getAttribute("aria-invalid") === "true") {
    formInputEmail.setAttribute("aria-invalid", "false");
    formFieldError.textContent = "";
  }
});

form.addEventListener("submit", handleSubmit);

successBtnDismiss.addEventListener("click", () => {
  form.hidden = false;
  success.hidden = true;
});

// ====== FUNCTIONS ===== \\
function handleSubmit(e) {
  e.preventDefault(e);

  // Simple email format validation
  if (!formInputEmail.checkValidity()) {
    showError();
  } else {
    clearError();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    form.hidden = true;
    success.hidden = false;

    successSubmittedEmail.textContent = data.email;
  }
}

function showError() {
  formInputEmail.setAttribute("aria-invalid", "true");
  formFieldError.textContent = "Valid email required";
}

function clearError() {
  formInputEmail.setAttribute("aria-invalid", "false");
  formFieldError.textContent = "";
}
