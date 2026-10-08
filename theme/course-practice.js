(function () {
  'use strict';
  var script = document.currentScript;
  var root = new URL('../', script.src);
  function init() {
    if (!/\/chapter02\/(?:index|\d{2})\.html$/.test(location.pathname)) return;
    var main = document.querySelector('#mdbook-content main');
    if (!main || document.querySelector('.course-entry')) return;
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = new URL('theme/course-practice.css', root).href;
    document.head.appendChild(css);
    var entry = document.createElement('section');
    entry.className = 'course-entry';
    entry.innerHTML = '<p class="course-kicker">CHAPTER 02 · COURSE PRACTICE</p><h2>学生如何理解“设计”？</h2><p>从一次日常观察、一份使用分析到一篇短论文，看看章节问题如何进入课程实践。</p><button type="button" aria-haspopup="dialog">查看本章学习档案 · 演示样板 →</button>';
    var footer = document.querySelector('.book-footer-nav');
    if (footer) footer.before(entry); else main.appendChild(entry);
    var dialog = document.createElement('dialog');
    dialog.className = 'course-dialog';
    dialog.setAttribute('aria-labelledby', 'course-title');
    dialog.innerHTML = '<div class="course-toolbar"><button class="course-text-button" type="button" data-close>← 返回阅读</button><strong>设计艺术的含义</strong><span>CHAPTER 02 · COURSE PRACTICE</span></div><div class="course-content"><p class="course-kicker">LEARNING ARCHIVE · DEMO</p><h2 id="course-title">设计的意义 · 课程实践</h2><p class="course-intro">同一个章节问题，可以通向不同的实践。这里把阅读、观察与写作放在一起，展示未来学生成果档案的组织方式。</p><div class="course-notice">演示样板：下列作品、论文及编辑评阅均为本次原型编写，不是真实学生成果。未使用真实学生姓名、课程年份或教师评价。正式收录后可按学年择优更新。</div><div class="course-filters" role="group" aria-label="按成果类型筛选"><button class="course-filter" aria-pressed="true" data-filter="all">全部 · 3</button><button class="course-filter" aria-pressed="false" data-filter="assignment">设计作业 · 2</button><button class="course-filter" aria-pressed="false" data-filter="essay">课程小论文 · 1</button></div>' +
    '<details class="course-item" data-type="assignment" open><summary><span class="course-number">01</span><div><h3>从“加一个把手”到重新理解取物</h3><div class="course-meta">设计作业 · 日常观察与问题界定 · 对应：第一节 设计的定义<br>署名：演示案例 A · 学年：样板，待正式收录</div></div><span class="course-toggle">查看成果 ＋</span></summary><div class="course-detail"><h4>课程题目</h4><p>选取一件日常用品，先观察使用中的困难，再提出设计问题。区分“我想做什么造型”和“使用者需要完成什么”。</p><h4>示例成果：高处收纳盒的取放</h4><div class="course-diagram" aria-label="从观察到问题再到方案的三个步骤"><div><strong>01 观察</strong><span>盒子放在高处时，使用者难以判断盒内物品，也不容易握住边缘。</span></div><div><strong>02 问题</strong><span>如何让使用者在不完全取下盒子的情况下识别内容，并稳定取放？</span></div><div><strong>03 方案</strong><span>可见标签、便于握持的开口与取放空间共同考虑，而不是只加一个把手。</span></div></div><h4>编辑评阅示范</h4><p>这个案例把设计对象从“盒子的外形”扩展到“取放过程”。后续需要补充实际观察记录与操作测试，验证方案是否真正改善使用。</p><a class="course-reading-link" href="chapter02/01.html">阅读对应原文：设计的定义 →</a></div></details>' +
    '<details class="course-item" data-type="assignment"><summary><span class="course-number">02</span><div><h3>同一把椅子，三种使用情境</h3><div class="course-meta">设计作业 · 情境分析 · 对应：第三节 产品造型的概念<br>署名：演示案例 B · 学年：样板，待正式收录</div></div><span class="course-toggle">查看成果 ＋</span></summary><div class="course-detail"><h4>课程题目</h4><p>比较一把椅子在教室、餐厅与等候区的使用。说明同一个产品如何因场景变化而产生不同设计要求。</p><div class="course-diagram"><div><strong>教室</strong><span>久坐与书写：关注支撑、桌椅关系及移动方式。</span></div><div><strong>餐厅</strong><span>进餐与清洁：关注起身空间、材料及维护。</span></div><div><strong>等候区</strong><span>短时停留与公共使用：关注耐用性、可达性及秩序。</span></div></div><h4>示例结论</h4><p>造型判断需要回到使用情境。同一形式的优缺点，不能脱离人体、空间与维护条件单独评价。</p><h4>编辑评阅示范</h4><p>比较维度清晰，但还应记录实际尺寸、使用姿态与观察证据。课程正式成果可以在这里补充学生实拍照片与分析图。</p><a class="course-reading-link" href="chapter02/03.html">阅读对应原文：产品造型的概念 →</a></div></details>' +
    '<details class="course-item" data-type="essay"><summary><span class="course-number">03</span><div><h3>“有用”是否足以判断一个好设计？</h3><div class="course-meta">课程小论文 · 示范短文全文 · 对应：第五节 设计品质的判断<br>署名：演示短文 · 关键词：功能、情境、品质、价值</div></div><span class="course-toggle">阅读全文 ＋</span></summary><div class="course-detail"><h4>摘要</h4><p>本文以日常用品为例，讨论功能满足与设计品质之间的关系。功能可以作为评价起点，但还需要考虑具体使用情境、长期维护及社会文化意义。</p><h4>一、功能是起点</h4><p>一件产品首先需要帮助人完成某种活动。杯子能够盛水、椅子能够承坐，是讨论设计品质的基本前提。然而，把“能够完成任务”作为唯一标准，仍不足以解释不同产品的品质差异。</p><h4>二、判断需要具体情境</h4><p>相同的功能在不同场景中有不同要求。易于移动的椅子可能适合需要重新布置的教室，却未必适合所有公共等候空间。设计判断需要说明由谁使用、在哪里使用，以及使用中有哪些限制。</p><h4>三、品质还包含长期关系</h4><p>产品进入生活后，还涉及清洁、维修、材料消耗与人的感受。因此，品质评价应把一次使用扩展为长期关系，同时避免以个人偏好替代论证。</p><h4>结语</h4><p>“有用”是重要的评价维度。进一步的判断需要明确情境、提出标准，并用观察与比较支持结论。设计品质由多种条件共同形成。</p><h4>编辑评阅示范</h4><p>短文提出了清晰问题，也区分了功能与情境。正式提交还需加入具体案例、原书引用页码及参考文献。本篇是结构示范，不作为学术引用来源。</p><a class="course-reading-link" href="chapter02/05.html">阅读对应原文：设计品质的判断 →</a></div></details>' +
    '<p class="course-afterword">未来收录字段：学年、作者授权署名、课程题目、对应章节、作品图／论文文件与教师点评。本轮仅展示第二章样板。</p></div>';
    document.body.appendChild(dialog);
    var savedY = 0, savedOverflow = '', opener;
    function close() { if (dialog.open) dialog.close(); }
    entry.querySelector('button').addEventListener('click', function () {
      savedY = window.scrollY; savedOverflow = document.body.style.overflow;
      opener = document.activeElement;
      dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
      dialog.querySelector('[data-close]').focus({preventScroll:true});
    });
    dialog.querySelector('[data-close]').addEventListener('click', close);
    dialog.addEventListener('close', function () {
      document.body.style.overflow = savedOverflow;
      window.scrollTo({top:savedY,behavior:'instant'});
      if (opener) opener.focus({preventScroll:true});
    });
    dialog.querySelectorAll('[data-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        dialog.querySelectorAll('[data-filter]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        dialog.querySelectorAll('[data-type]').forEach(function (item) { item.hidden = button.dataset.filter !== 'all' && item.dataset.type !== button.dataset.filter; });
      });
    });
    dialog.querySelectorAll('.course-reading-link').forEach(function (link) { link.href = new URL(link.getAttribute('href'), root).href; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
