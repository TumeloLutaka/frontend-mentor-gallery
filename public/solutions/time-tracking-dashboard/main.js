fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const buttons = document.querySelectorAll(".dashboard__header-btn");

    function updateStats(timeframe) {
      data.forEach((item) => {
        const cat = item.title.toLowerCase();
        const { current, previous } = item.timeframes[timeframe];

        document.querySelector(
          `.dashboard__stat--current[data-category="${cat}"]`,
        ).innerHTML = current;
        document.querySelector(
          `.dashboard__stat--previous[data-category="${cat}"]`,
        ).innerHTML = previous;
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        updateStats(btn.innerHTML.trim().toLowerCase());
      });
    });

    // Run on load with daily as default
    updateStats("daily");
  });
