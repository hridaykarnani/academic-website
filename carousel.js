document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const selectors = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const pairCount = selectors.length;
  let current = 0;
  let timer;

  function showPair(index) {
    current = index;
    slides.forEach((slide) => {
      const active = Number(slide.dataset.slide) === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    selectors.forEach((selector, selectorIndex) => {
      selector.setAttribute("aria-pressed", String(selectorIndex === current));
    });
  }

  function stop() {
    window.clearInterval(timer);
  }

  function start() {
    stop();
    timer = window.setInterval(() => showPair((current + 1) % pairCount), 3000);
  }

  selectors.forEach((selector, index) => {
    selector.addEventListener("click", () => {
      showPair(index);
      start();
    });
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) start();
  });

  showPair(0);
  start();
});
