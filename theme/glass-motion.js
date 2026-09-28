/* Progressive visual enhancements. No navigation or storage interception. */
(function () {
  'use strict';
  function init() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var topbar = document.getElementById('mdbook-menu-bar');
    var queued = false;
    function paint() {
      document.body.classList.toggle('glass-scrolled', window.scrollY > 12);
      queued = false;
    }
    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; window.requestAnimationFrame(paint); }
    }, {passive:true});
    paint();
    if (reduce.matches) return;
    document.querySelectorAll('.book-home__art, .book-home__copy, .concept-hero, .timeline-hero').forEach(function(el,i) {
      el.classList.add('glass-enter');
      el.style.animationDelay = Math.min(i * 110, 220) + 'ms';
    });
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('glass-reveal');
            entry.target.addEventListener('animationend', function () { this.classList.remove('glass-reveal'); }, {once:true});
            observer.unobserve(entry.target);
          }
        });
      }, {threshold:.08});
      document.querySelectorAll('.book-explore-by__item, .concept-node, .timeline-stage__body').forEach(function(el) { observer.observe(el); });
      reduce.addEventListener('change', function(event) { if (event.matches) observer.disconnect(); });
    }
    document.addEventListener('click', function(event) {
      if (reduce.matches || !(event.target instanceof Element)) return;
      var button = event.target.closest('.archive-filter, .archive-mode, .design-comparator button, .chapter-experience button');
      if (!button) return;
      button.classList.remove('glass-press');
      void button.offsetWidth;
      button.classList.add('glass-press');
      button.addEventListener('animationend', function() { button.classList.remove('glass-press'); }, {once:true});
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
