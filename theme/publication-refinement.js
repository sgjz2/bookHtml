/* Keep the original reading links and titles; trim duplicated editorial chrome. */
(function () {
  'use strict';
  var refinementScriptUrl = document.currentScript ? document.currentScript.src : '';
  function addKnowledgeEntrance() {
    var pathways = document.querySelector('.book-explore-by');
    var menu = document.querySelector('.book-more__menu');
    var gallery = document.querySelector('.book-gallery-link');
    if (!pathways && !menu && !gallery) return;
    var href = refinementScriptUrl ? new URL('../knowledge.html', refinementScriptUrl).href : 'knowledge.html';
    if (gallery && !document.querySelector('.book-knowledge-toolbar')) {
      var toolbarLink = document.createElement('a');
      toolbarLink.className = 'book-knowledge-toolbar'; toolbarLink.href = href;
      toolbarLink.setAttribute('aria-label', '知识星空');
      var toolbarIcon = document.createElement('span'); toolbarIcon.className = 'book-knowledge-toolbar__icon'; toolbarIcon.textContent = '✧'; toolbarIcon.setAttribute('aria-hidden', 'true');
      var toolbarLabel = document.createElement('span'); toolbarLabel.className = 'book-knowledge-toolbar__label'; toolbarLabel.textContent = '知识星空';
      toolbarLink.appendChild(toolbarIcon); toolbarLink.appendChild(toolbarLabel);
      gallery.insertAdjacentElement('afterend', toolbarLink);
    }
    var grid = pathways && pathways.querySelector('.book-explore-by__grid');
    if (grid && !grid.querySelector('.book-knowledge-card')) {
      function span(className, text) {
        var node = document.createElement('span');
        node.className = className;
        if (text) node.textContent = text;
        return node;
      }
      var card = document.createElement('a');
      card.className = 'book-explore-by__item book-knowledge-card';
      card.href = href;
      card.appendChild(span('book-explore-by__number', '04'));
      var copy = span('book-explore-by__copy');
      copy.appendChild(span('book-explore-by__label', 'KNOWLEDGE CONSTELLATION'));
      copy.appendChild(span('book-explore-by__title', '知识星空'));
      copy.appendChild(span('book-explore-by__description', '探索概念、人物与作品，沿原文证据回到书中。'));
      card.appendChild(copy);
      var preview = span('book-explore-by__preview book-knowledge-preview');
      preview.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < 9; i++) preview.appendChild(span('book-knowledge-preview__star'));
      card.appendChild(preview);
      var link = span('book-explore-by__link', '进入星空 ');
      var arrow = span('', '→'); arrow.setAttribute('aria-hidden', 'true');
      link.appendChild(arrow); card.appendChild(link);
      grid.appendChild(card);
      grid.classList.add('book-explore-by__grid--four');
    }
    document.querySelectorAll('.book-star-entry').forEach(function (node) { node.remove(); });
    if (gallery && menu) menu.querySelectorAll('.book-knowledge-link').forEach(function (node) { node.remove(); });
    if (!gallery && menu && !menu.querySelector('.book-knowledge-link')) {
      var item = document.createElement('a'); item.className = 'book-knowledge-link'; item.href = href; item.textContent = '知识星空'; menu.appendChild(item);
    }
  }
  function setupHomeMotion() {
    var home = document.querySelector('.book-home');
    if (!home || home.dataset.publicationMotion === 'ready') return;
    home.dataset.publicationMotion = 'ready';
    var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !window.IntersectionObserver) return;
    var animations = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches || !entry.target.animate) return;
        var index = Number(entry.target.dataset.homeMotionOrder || 0);
        var animation = entry.target.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], { duration: 420, delay: (index % 3) * 45, easing: 'ease-out', fill: 'backwards' });
        animations.add(animation);
        animation.finished.then(function () { animations.delete(animation); }, function () { animations.delete(animation); });
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.hero-actions, .book-explore__item').forEach(function (node, index) {
      node.dataset.homeMotionOrder = String(node.classList.contains('book-explore__item') ? index - 1 : 0);
      observer.observe(node);
    });
    preference.addEventListener('change', function () {
      if (!preference.matches) return;
      observer.disconnect();
      animations.forEach(function (animation) { animation.cancel(); });
      animations.clear();
    });
  }
  function refine() {
    document.documentElement.classList.add('publication-refined');
    document.querySelectorAll('.book-explore__item').forEach(function (item) {
      if (item.querySelector('.book-explore__label')) return;
      var number = item.querySelector('.book-explore__number');
      var title = item.querySelector('.book-explore__title');
      if (!number || !title) return;
      var label = document.createElement('span');
      label.className = 'book-explore__label';
      item.insertBefore(label, number);
      label.appendChild(number);
      label.appendChild(title);
    });
    document.querySelectorAll('.book-footer-nav').forEach(function (nav) {
      nav.setAttribute('aria-label', '阅读导航');
      nav.querySelectorAll('.footer-current, .footer-card-kicker, .footer-preview-question, .footer-preview-text').forEach(function (node) { node.remove(); });
    });
    document.querySelectorAll('.chapter-map, .chapter-guide').forEach(function (nav) {
      nav.querySelectorAll('.chapter-map__description, .chapter-guide__description, .chapter-map__eyebrow, .chapter-guide__eyebrow').forEach(function (node) { node.remove(); });
      var label = nav.querySelector('.chapter-map__title');
      if (label) label.textContent = '本章小节';
    });
    // Older source editions have no orbit. Keep their overview as the entry point.
    if (document.querySelector('.concept-orbit')) {
      document.querySelectorAll('.concept-overview').forEach(function (node) { node.remove(); });
    }
    addKnowledgeEntrance();
    setupHomeMotion();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refine);
  else refine();
})();
