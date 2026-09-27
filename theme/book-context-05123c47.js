(function (window, document) {
  "use strict";

  var CONTEXT_KEY = "designbook-reading-context-v1";
  var PENDING_KEY = "designbook-reading-context-pending-v1";
  var FALLBACK_PAGE = "index.html";

  function getStorage() {
    try {
      if (!window.sessionStorage) return null;
      var probeKey = "designbook-storage-probe";
      window.sessionStorage.setItem(probeKey, "1");
      window.sessionStorage.removeItem(probeKey);
      return window.sessionStorage;
    } catch (error) {
      return null;
    }
  }

  function normalizePageHref(value) {
    var url;
    try {
      url = new URL(value || window.location.href, document.baseURI || window.location.href);
    } catch (error) {
      return FALLBACK_PAGE;
    }

    var pathname = (url.pathname || "").replace(/\\/g, "/");
    pathname = pathname.replace(/^\/+/, "").replace(/^[A-Za-z]:\//, "");
    var chapterMatch = pathname.match(/(chapter\d{2}\/[^/]+\.html)$/i);
    if (chapterMatch) return chapterMatch[1];
    var fileMatch = pathname.match(/([^/]+\.html)$/i);
    return fileMatch ? fileMatch[1] : FALLBACK_PAGE;
  }

  function normalizeHash(value) {
    if (!value) return "";
    return value.charAt(0) === "#" ? value : "#" + value;
  }

  function getCurrentPageHref() {
    return normalizePageHref(window.location.href);
  }

  function getFocusTarget() {
    var active = document.activeElement;
    if (active && active !== document.body && active.id) return active.id;
    if (window.location.hash) return window.location.hash.slice(1);
    return "";
  }

  function writeContext(key, context) {
    var storage = getStorage();
    if (!storage) return false;
    try {
      storage.setItem(key, JSON.stringify(context));
      return true;
    } catch (error) {
      return false;
    }
  }

  function readContext(key) {
    var storage = getStorage();
    if (!storage) return null;
    try {
      var raw = storage.getItem(key);
      if (!raw) return null;
      var context = JSON.parse(raw);
      if (!context || typeof context !== "object" || !context.pageHref) return null;
      context.pageHref = normalizePageHref(context.pageHref);
      context.hash = normalizeHash(context.hash);
      context.scrollY = Number(context.scrollY);
      if (!isFinite(context.scrollY) || context.scrollY < 0) context.scrollY = 0;
      context.focusTarget = typeof context.focusTarget === "string" ? context.focusTarget : "";
      return context;
    } catch (error) {
      return null;
    }
  }

  function removeContext(key) {
    var storage = getStorage();
    if (!storage) return;
    try { storage.removeItem(key); } catch (error) { /* file:// storage may be unavailable */ }
  }

  function saveReadingContext(overrides) {
    overrides = overrides || {};
    var context = {
      pageHref: overrides.pageHref || getCurrentPageHref(),
      hash: typeof overrides.hash === "string" ? normalizeHash(overrides.hash) : (window.location.hash || ""),
      scrollY: typeof overrides.scrollY === "number" ? overrides.scrollY : (window.scrollY || 0),
      focusTarget: typeof overrides.focusTarget === "string" ? overrides.focusTarget : getFocusTarget()
    };
    writeContext(CONTEXT_KEY, context);
    return context;
  }

  function getReadingContext() {
    return readContext(CONTEXT_KEY);
  }

  function getPendingContext() {
    return readContext(PENDING_KEY);
  }

  function getTargetId(hash) {
    if (!hash) return "";
    var id = hash.charAt(0) === "#" ? hash.slice(1) : hash;
    try { return decodeURIComponent(id); } catch (error) { return id; }
  }

  function getRelativeTarget(context) {
    var target = context && context.pageHref ? context.pageHref : FALLBACK_PAGE;
    return target + (context && context.hash ? context.hash : "");
  }

  function focusRestoredTarget(context) {
    if (!context || !context.focusTarget) return;
    var target = document.getElementById(context.focusTarget);
    if (!target || typeof target.focus !== "function") return;
    try { target.focus({ preventScroll: true }); } catch (error) {
      try { target.focus(); } catch (focusError) { /* focus is best effort */ }
    }
  }

  function restorePendingContext() {
    var context = getPendingContext();
    if (!context || context.pageHref !== getCurrentPageHref()) return;

    removeContext(PENDING_KEY);
    var targetId = getTargetId(context.hash);
    var attempts = 0;
    var arrivalMarked = false;
    var restore = function () {
      attempts += 1;
      if (typeof window.history !== "undefined" && "scrollRestoration" in window.history) {
        try { window.history.scrollRestoration = "manual"; } catch (error) { /* optional browser API */ }
      }
      window.scrollTo(0, context.scrollY || 0);

      if (targetId && !arrivalMarked && document.getElementById(targetId)) {
        arrivalMarked = true;
        document.getElementById(targetId).classList.add("designbook-context-arrival");
        window.setTimeout(function () {
          var target = document.getElementById(targetId);
          if (target) target.classList.remove("designbook-context-arrival");
        }, 1200);
      }
      focusRestoredTarget(context);

      if (attempts < 8) {
        var frame = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 32); };
        frame(restore);
      }
    };

    var frame = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 32); };
    if (typeof window.addEventListener === "function" && document.readyState !== "complete") {
      window.addEventListener("load", function () {
        attempts = 0;
        frame(restore);
      }, { once: true });
    }
    frame(restore);
  }

  function returnToReading() {
    var context = getReadingContext();
    if (!context) {
      window.location.href = FALLBACK_PAGE;
      return false;
    }

    writeContext(PENDING_KEY, context);
    window.location.href = getRelativeTarget(context);
    return true;
  }

  function isModePageHref(href) {
    var url;
    try { url = new URL(href, document.baseURI || window.location.href); } catch (error) { return false; }
    var path = (url.pathname || "").replace(/\\/g, "/").toLowerCase();
    return /\/(concept|timeline)\.html$/.test(path) || /^(concept|timeline)\.html$/.test(path.replace(/^\/+/, ""));
  }

  function wireReadingContext() {
    var modeLinks = document.querySelectorAll("a[data-book-mode-entry], a[href*='concept.html'], a[href*='timeline.html']");
    Array.prototype.forEach.call(modeLinks, function (link) {
      if (link.dataset.bookContextWired === "true") return;
      var href = link.getAttribute("href");
      if (!href || !isModePageHref(href)) return;
      link.dataset.bookContextWired = "true";
      link.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        saveReadingContext();
      });
    });

    /* Keep a last-known position even when a reader leaves by typing or
       pasting a static concept/timeline URL instead of clicking a link. */
    if (document.getElementById("mdbook-content") && typeof window.addEventListener === "function") {
      window.addEventListener("pagehide", function () { saveReadingContext(); });
    }

    var returnLinks = document.querySelectorAll("[data-return-to-reading]");
    Array.prototype.forEach.call(returnLinks, function (link) {
      if (link.dataset.bookContextReturnWired === "true") return;
      link.dataset.bookContextReturnWired = "true";
      link.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        returnToReading();
      });
    });
  }

  window.bookContext = {
    saveReadingContext: saveReadingContext,
    getReadingContext: getReadingContext,
    returnToReading: returnToReading,
    openReadingTarget: function (target) {
      if (!target) return false;
      var context = {
        pageHref: normalizePageHref(target.pageHref || target.href || FALLBACK_PAGE),
        hash: normalizeHash(target.hash || ""),
        scrollY: typeof target.scrollY === "number" ? target.scrollY : 0,
        focusTarget: target.focusTarget || getTargetId(target.hash || "")
      };
      writeContext(PENDING_KEY, context);
      window.location.href = getRelativeTarget(context);
      return true;
    }
  };

  function init() {
    restorePendingContext();
    wireReadingContext();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}(window, document));
