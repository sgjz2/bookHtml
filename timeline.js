(function () {
  "use strict";

  var stages = Array.prototype.slice.call(document.querySelectorAll(".timeline-stage[data-stage]"));
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-stage-link]"));
  var number = document.getElementById("current-stage-number");

  function setActiveStage(stageNumber) {
    if (number) number.textContent = stageNumber;
    links.forEach(function (link) {
      var active = link.getAttribute("data-stage-link") === stageNumber;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var stageObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (left, right) {
        return Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top);
      });
      setActiveStage(visible[0].target.getAttribute("data-stage"));
    }, { rootMargin: "-30% 0px -56% 0px", threshold: 0 });
    stages.forEach(function (stage) { stageObserver.observe(stage); });
  } else {
    window.addEventListener("scroll", function () {
      var marker = window.innerHeight * 0.38;
      var active = stages[0];
      stages.forEach(function (stage) {
        if (stage.getBoundingClientRect().top <= marker) active = stage;
      });
      if (active) setActiveStage(active.getAttribute("data-stage"));
    }, { passive: true });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActiveStage(link.getAttribute("data-stage-link"));
    });
  });

  var lightbox = document.getElementById("timeline-lightbox");
  var lightboxImage = lightbox && lightbox.querySelector("img");
  var closeButton = lightbox && lightbox.querySelector(".timeline-lightbox__close");
  var lastTrigger = null;

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("timeline-lightbox-open");
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll(".timeline-figure__zoom").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;
      var image = button.querySelector("img");
      if (!image) return;
      lastTrigger = button;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      document.body.classList.add("timeline-lightbox-open");
      if (closeButton) closeButton.focus();
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target === closeButton) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
}());
