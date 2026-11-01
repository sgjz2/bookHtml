(function () {
  'use strict';
  var root = new URL('../', document.currentScript.src);
  var works = [
    {
      title: 'LIVIS & Rokid', subtitle: 'AI Eyewear Product Research',
      file: '4739cd18-7ae8-49fb-86f9-e1eefc53be52.pdf', cover: 'work-cover.png'
    },
    {
      title: '设计批评', subtitle: 'iPhone Air & Apple Pencil (USB -C)',
      file: '6e2a1a06-7d97-42d0-84ba-589eb51bf658.pdf', cover: 'work-cover-02.png'
    }
  ];
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (character) {
      return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character];
    });
  }
  function init() {
    if (!/\/chapter02\/works\.html$/.test(location.pathname)) return;
    var main = document.querySelector('#mdbook-content main');
    if (!main || !document.querySelector('#course-archive-page')) return;
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = new URL('theme/course-practice.css', root).href;
    document.head.appendChild(css);
    var archive = document.createElement('div');
    archive.className = 'course-content course-content--page';
    archive.innerHTML = `
      <header class="course-archive-heading">
        <p class="course-kicker">CHAPTER 02 <span>/</span> COURSE WORK</p>
        <h1 id="course-title">课程作品与小论文</h1>
        <p class="course-intro">从书中的设计观念，走向具体的观察与研究。</p>
      </header>
      ${works.map(function (work, index) {
        var number = String(index + 1).padStart(2, '0');
        var previewId = index === 0 ? 'course-pdf-preview' : 'course-pdf-preview-' + number;
        var titleId = 'course-work-' + number;
        var file = new URL('course-assets/' + work.file, root).href;
        var cover = new URL('course-assets/' + work.cover, root).href;
        return `
          <article class="course-file" aria-labelledby="${titleId}">
            <figure class="course-file-figure">
              <div class="course-cover-mat"><img class="course-file-cover" src="${cover}" alt="${escapeHtml(work.subtitle)} · ${escapeHtml(work.title)}原始作品封面" ${index ? 'loading="lazy"' : ''}></div>
              <figcaption>${escapeHtml(work.title)} · 原始作品封面</figcaption>
            </figure>
            <div class="course-file-details">
              <div class="course-work-index"><span class="course-work-number" aria-hidden="true">${number}</span></div>
              <div class="course-work-copy">
                <h2 id="${titleId}">${escapeHtml(work.title)}</h2>
                <p class="course-work-subtitle">${escapeHtml(work.subtitle)}</p>
                <div class="course-work-bottom">
                  <div class="course-file-actions">
                    <button class="course-action course-action-primary" type="button" data-preview aria-expanded="false" aria-controls="${previewId}">预览作品</button>
                    <a class="course-action course-action-secondary" href="${file}" data-download download>下载作品</a>
                  </div>
                </div>
              </div>
            </div>
            <section id="${previewId}" class="course-pdf-preview" hidden>
              <div class="course-preview-heading"><h3>作品预览</h3><a href="${file}" data-open target="_blank" rel="noopener">在新窗口打开</a></div>
              <object type="application/pdf" aria-label="${escapeHtml(work.title)}原始文件"><p>浏览器不支持嵌入预览，请使用“在新窗口打开”或“下载作品”。</p></object>
            </section>
          </article>`;
      }).join('')}
      <p class="course-afterword">本地展示样本 · 章节归属、学年与署名待确认。</p>`;
    main.replaceChildren(archive);
    archive.querySelectorAll('[data-preview]').forEach(function (button) {
      button.addEventListener('click', function () {
        var article = button.closest('.course-file');
        var preview = article.querySelector('.course-pdf-preview');
        var viewer = preview.querySelector('object');
        preview.hidden = !preview.hidden;
        if (preview.hidden) viewer.removeAttribute('data');
        else viewer.data = article.querySelector('[data-open]').href;
        button.setAttribute('aria-expanded', String(!preview.hidden));
        button.textContent = preview.hidden ? '预览作品' : '收起预览';
        if (!preview.hidden) preview.scrollIntoView({
          block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
