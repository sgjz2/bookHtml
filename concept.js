(function () {
  "use strict";

  var nodes = Array.prototype.slice.call(document.querySelectorAll(".concept-node[data-concept]"));
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-concept-link]"));

  function setActive(id) {
    links.forEach(function (link) {
      var active = link.getAttribute("data-concept-link") === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActiveNode() {
    if (!nodes.length) return;
    var marker = window.scrollY + window.innerHeight * 0.32;
    var active = nodes[0];
    nodes.forEach(function (node) {
      if (node.getBoundingClientRect().top + window.scrollY <= marker) active = node;
    });
    setActive(active.getAttribute("data-concept"));
  }

  function highlight(target) {
    target.classList.remove("is-arriving");
    void target.offsetWidth;
    target.classList.add("is-arriving");
    window.setTimeout(function () { target.classList.remove("is-arriving"); }, 1250);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href^='#concept-']");
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    try { history.replaceState(null, "", "#" + id); } catch (error) { /* file:// fallback */ }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    highlight(target);
    setActive(target.getAttribute("data-concept"));
  });

  var initialTarget = document.getElementById(window.location.hash.slice(1));
  if (initialTarget && initialTarget.matches(".concept-node")) {
    window.setTimeout(function () {
      initialTarget.scrollIntoView({ behavior: "auto", block: "start" });
      highlight(initialTarget);
    }, 60);
  }

  window.addEventListener("scroll", updateActiveNode, { passive: true });
  window.addEventListener("resize", updateActiveNode);
  updateActiveNode();
})();
