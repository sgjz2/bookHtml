(function () {
  "use strict";

  function createView() {
    var view = document.createElement("section");
    view.id = "designbook-gallery-view";
    view.className = "book-gallery-view";
    view.setAttribute("role", "region");
    view.setAttribute("aria-label", "图像档案");
    view.setAttribute("aria-hidden", "true");
    view.hidden = true;
    view.innerHTML =
      '<main class="archive-main">' +
        '<div class="archive-return-row">' +
          '<button type="button" class="book-gallery-view__return" aria-label="返回阅读"><span aria-hidden="true">←</span> 返回阅读</button>' +
        '</div>' +
        '<section class="archive-intro" aria-labelledby="archive-title">' +
          '<div class="archive-intro__copy">' +
            '<p class="archive-eyebrow">VISUAL ARCHIVE</p>' +
            '<h1 id="archive-title">图像档案</h1>' +
            '<p class="archive-intro__subtitle">以图像重新阅读《设计艺术的含义》</p>' +
            '<p class="archive-intro__description">从自然形态、历史造物到现代产品、材料、广告与生活方式，循着书中的视觉案例，重新发现设计的线索。</p>' +
          '</div>' +
          '<div class="archive-intro__count" aria-live="polite"><span id="gallery-total">—</span><span>IMAGES</span></div>' +
        '</section>' +
        '<section class="archive-controls" aria-label="筛选图像">' +
          '<div class="archive-controls__top">' +
            '<div class="archive-modes" role="tablist" aria-label="浏览方式">' +
              '<button type="button" class="archive-mode is-active" role="tab" aria-selected="true" data-mode="all">全部图像</button>' +
              '<button type="button" class="archive-mode" role="tab" aria-selected="false" data-mode="chapters">按章节浏览</button>' +
            '</div>' +
            '<label class="archive-search"><span class="archive-search__icon" aria-hidden="true">⌕</span>' +
              '<span class="visually-hidden">搜索图像、设计师或图注</span>' +
              '<input id="gallery-search" type="search" placeholder="搜索图像、设计师或图注……" autocomplete="off">' +
              '<kbd>⌘ / Ctrl K</kbd></label>' +
          '</div>' +
          '<div id="chapter-filters" class="archive-filters" aria-label="按章节筛选"></div>' +
          '<p id="gallery-result-count" class="archive-result-count" aria-live="polite"></p>' +
        '</section>' +
        '<section id="gallery-content" class="archive-content" aria-live="polite" aria-busy="false"></section>' +
        '<footer class="archive-footer"><span>DESIGN · CULTURE · HUMANITY</span></footer>' +
      '</main>' +
      '<div id="archive-viewer" class="archive-viewer" role="dialog" aria-modal="true" aria-labelledby="viewer-caption" hidden>' +
        '<div class="archive-viewer__shell">' +
          '<header class="viewer-header">' +
            '<button id="viewer-back" class="viewer-back" type="button"><span aria-hidden="true">←</span> 返回图像档案</button>' +
            '<p id="viewer-counter" class="viewer-counter"></p>' +
            '<button id="viewer-close" class="viewer-close" type="button" aria-label="关闭图像查看器">×</button>' +
          '</header>' +
          '<div class="viewer-stage"><button id="viewer-previous" class="viewer-arrow" type="button" aria-label="上一张">‹</button>' +
            '<div class="viewer-image-wrap"><img id="viewer-image" alt=""></div>' +
            '<button id="viewer-next" class="viewer-arrow" type="button" aria-label="下一张">›</button></div>' +
          '<footer class="viewer-information"><div class="viewer-information__caption">' +
            '<p id="viewer-number" class="viewer-number"></p><h2 id="viewer-caption"></h2>' +
            '<p id="viewer-location" class="viewer-location"></p></div>' +
            '<a id="viewer-source" class="viewer-source" href="#">阅读原文 <span aria-hidden="true">→</span></a>' +
          '</footer>' +
        '</div>' +
      '</div>';
    return view;
  }

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function mount(view, options) {
    if (!view || view.dataset.galleryMounted) return;
    view.dataset.galleryMounted = "true";
    options = options || {};

    var allItems = Array.isArray(window.designbookGalleryItems) ? window.designbookGalleryItems : [];
    var chapterFilters = view.querySelector("#chapter-filters");
    var content = view.querySelector("#gallery-content");
    var searchInput = view.querySelector("#gallery-search");
    var resultCount = view.querySelector("#gallery-result-count");
    var totalCount = view.querySelector("#gallery-total");
    var viewer = view.querySelector("#archive-viewer");
    var viewerImage = view.querySelector("#viewer-image");
    var viewerCounter = view.querySelector("#viewer-counter");
    var viewerNumber = view.querySelector("#viewer-number");
    var viewerCaption = view.querySelector("#viewer-caption");
    var viewerLocation = view.querySelector("#viewer-location");
    var viewerSource = view.querySelector("#viewer-source");
    var previousButton = view.querySelector("#viewer-previous");
    var nextButton = view.querySelector("#viewer-next");
    var closeButton = view.querySelector("#viewer-close");
    var viewCloseButton = view.querySelector(".book-gallery-view__return");
    var currentMode = "all";
    var currentChapter = "ALL";
    var currentQuery = "";
    var visibleItems = [];
    var viewerPosition = -1;
    var lastTrigger = null;

    function resolveHref(path) {
      if (typeof options.resolveHref === "function") return options.resolveHref(path);
      return new URL(path, document.baseURI).href;
    }

    function chapterLabel(item) {
      if (item.chapter === "REF") return "附录 · " + item.chapterTitle;
      return item.chapter + " · " + item.chapterTitle;
    }

    function itemLocation(item) {
      var section = item.section && item.section !== "章首页" ? " · " + item.section : "";
      return chapterLabel(item) + section;
    }

    function uniqueChapters() {
      var seen = Object.create(null);
      return allItems.filter(function (item) {
        if (seen[item.chapter]) return false;
        seen[item.chapter] = true;
        return true;
      }).map(function (item) {
        return { id: item.chapter, title: item.chapterTitle };
      });
    }

    function addFilter(label, id) {
      var button = makeElement("button", "archive-filter", label);
      button.type = "button";
      button.dataset.chapter = id;
      button.classList.toggle("is-active", currentChapter === id);
      button.setAttribute("aria-pressed", String(currentChapter === id));
      button.addEventListener("click", function () {
        currentChapter = id;
        renderFilters();
        renderGallery();
      });
      chapterFilters.appendChild(button);
    }

    function renderFilters() {
      chapterFilters.textContent = "";
      addFilter("全部", "ALL");
      uniqueChapters().forEach(function (chapter) {
        var label = chapter.id === "REF" ? "附录 · " + chapter.title : chapter.id + "  " + chapter.title;
        addFilter(label, chapter.id);
      });
    }

    function getVisibleItems() {
      var query = currentQuery.trim().toLocaleLowerCase();
      return allItems.map(function (item, index) {
        return { item: item, sourceIndex: index };
      }).filter(function (entry) {
        var item = entry.item;
        if (currentChapter !== "ALL" && item.chapter !== currentChapter) return false;
        if (!query) return true;
        var searchable = [item.number, item.caption, item.chapterTitle, item.section, item.src].join(" ").toLocaleLowerCase();
        return searchable.indexOf(query) >= 0;
      });
    }

    function createCard(entry) {
      var item = entry.item;
      var article = makeElement("article", "archive-card");
      var imageButton = makeElement("button", "archive-card__image");
      imageButton.type = "button";
      imageButton.dataset.sourceIndex = String(entry.sourceIndex);
      imageButton.setAttribute("aria-label", "查看 " + item.number + "：" + item.caption);

      var image = document.createElement("img");
      image.src = resolveHref(item.src);
      image.alt = item.caption === "未标注图像" ? "书中插图" : item.caption;
      image.loading = "lazy";
      image.decoding = "async";
      imageButton.appendChild(image);
      imageButton.appendChild(makeElement("span", "archive-card__view", "查看图像 ↗"));

      var meta = makeElement("div", "archive-card__meta");
      meta.appendChild(makeElement("span", "archive-card__number", item.number));
      meta.appendChild(makeElement("p", "archive-card__caption", item.caption));
      meta.appendChild(makeElement("p", "archive-card__location", itemLocation(item)));
      article.appendChild(imageButton);
      article.appendChild(meta);
      return article;
    }

    function createMasonry(entries) {
      var masonry = makeElement("div", "archive-masonry");
      entries.forEach(function (entry) { masonry.appendChild(createCard(entry)); });
      return masonry;
    }

    function renderGallery() {
      visibleItems = getVisibleItems();
      content.textContent = "";
      content.setAttribute("aria-busy", "true");
      resultCount.textContent = visibleItems.length + " / " + allItems.length + " IMAGES";

      if (!visibleItems.length) {
        content.appendChild(makeElement("p", "archive-empty", "沒有找到相符的图像。"));
        content.setAttribute("aria-busy", "false");
        return;
      }

      if (currentMode === "all") {
        content.appendChild(createMasonry(visibleItems));
      } else {
        var groups = [];
        var groupMap = Object.create(null);
        visibleItems.forEach(function (entry) {
          var id = entry.item.chapter;
          if (!groupMap[id]) {
            groupMap[id] = { id: id, title: entry.item.chapterTitle, entries: [] };
            groups.push(groupMap[id]);
          }
          groupMap[id].entries.push(entry);
        });
        groups.forEach(function (group) {
          var section = makeElement("section", "archive-chapter");
          var heading = makeElement("header", "archive-chapter__heading");
          heading.appendChild(makeElement("span", "archive-chapter__number", group.id === "REF" ? "APPENDIX" : group.id));
          heading.appendChild(makeElement("h2", "archive-chapter__title", group.title));
          heading.appendChild(makeElement("span", "archive-chapter__sub", group.entries.length + " IMAGES"));
          section.appendChild(heading);
          section.appendChild(createMasonry(group.entries));
          content.appendChild(section);
        });
      }
      content.setAttribute("aria-busy", "false");
    }

    function showViewerPosition(position) {
      if (!visibleItems.length) return;
      viewerPosition = Math.max(0, Math.min(visibleItems.length - 1, position));
      var entry = visibleItems[viewerPosition];
      var item = entry.item;
      viewerImage.src = resolveHref(item.src);
      viewerImage.alt = item.caption === "未标注图像" ? "书中插图" : item.caption;
      viewerCounter.textContent = (viewerPosition + 1) + " / " + visibleItems.length;
      viewerNumber.textContent = item.number;
      viewerCaption.textContent = item.caption;
      viewerLocation.textContent = itemLocation(item);
      viewerSource.href = resolveHref(item.href);
      previousButton.disabled = viewerPosition === 0;
      nextButton.disabled = viewerPosition === visibleItems.length - 1;
    }

    function openViewer(sourceIndex, trigger) {
      var position = visibleItems.findIndex(function (entry) { return entry.sourceIndex === sourceIndex; });
      if (position < 0) return;
      lastTrigger = trigger;
      showViewerPosition(position);
      viewer.hidden = false;
      closeButton.focus();
    }

    function closeViewer() {
      if (viewer.hidden) return;
      viewer.hidden = true;
      viewerImage.removeAttribute("src");
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    }

    function changeViewer(delta) {
      var nextPosition = viewerPosition + delta;
      if (nextPosition < 0 || nextPosition >= visibleItems.length) return;
      showViewerPosition(nextPosition);
    }

    view.querySelectorAll(".archive-mode").forEach(function (button) {
      button.addEventListener("click", function () {
        currentMode = button.dataset.mode;
        view.querySelectorAll(".archive-mode").forEach(function (tab) {
          var active = tab === button;
          tab.classList.toggle("is-active", active);
          tab.setAttribute("aria-selected", String(active));
        });
        renderGallery();
      });
    });

    searchInput.addEventListener("input", function () {
      currentQuery = searchInput.value;
      renderGallery();
    });

    content.addEventListener("click", function (event) {
      var trigger = event.target.closest(".archive-card__image");
      if (trigger) openViewer(Number(trigger.dataset.sourceIndex), trigger);
    });

    viewCloseButton.addEventListener("click", function () {
      if (typeof options.onClose === "function") options.onClose();
    });
    view.querySelector("#viewer-back").addEventListener("click", closeViewer);
    closeButton.addEventListener("click", closeViewer);
    previousButton.addEventListener("click", function () { changeViewer(-1); });
    nextButton.addEventListener("click", function () { changeViewer(1); });
    viewer.addEventListener("click", function (event) {
      if (event.target === viewer) closeViewer();
    });
    viewerSource.addEventListener("click", function () {
      closeViewer();
      if (typeof options.onSourceNavigate === "function") options.onSourceNavigate(viewerSource.href);
    });

    document.addEventListener("keydown", function (event) {
      if (viewer.hidden) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !view.hidden) {
          event.preventDefault();
          searchInput.focus();
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeViewer();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeViewer(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        changeViewer(1);
      }
    });

    totalCount.textContent = String(allItems.length).padStart(3, "0");
    if (!allItems.length) {
      content.appendChild(makeElement("p", "archive-empty", "图库数据尚未生成。请运行 build.bat 重新构建。"));
      resultCount.textContent = "0 IMAGES";
      return;
    }
    renderFilters();
    renderGallery();
  }

  window.designbookGalleryView = { create: createView, mount: mount };
})();
