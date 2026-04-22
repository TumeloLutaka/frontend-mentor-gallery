const ratingForm = document.getElementById("rating__form");
const thanks = document.getElementById("thanks");
const thanksHeading = document.getElementById("thanks__heading");
const thanksRatingNum = document.getElementById("thanks_rating-num");

ratingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(ratingForm));

  if (!data.rating) return;

  thanksRatingNum.textContent = data.rating;

  ratingForm.classList.add("hidden");
  thanks.classList.remove("hidden");

  thanksHeading.focus();
});
