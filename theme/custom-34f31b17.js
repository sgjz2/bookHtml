(function () {
  "use strict";

  var chapterSectionDescriptions = {
    "01": ["自然、多样性与原始造物", "器物、伦理与人的关系", "科学、文化与现代化", "从物质产品走向信息与关系"],
    "02": ["设计的定义与边界", "过程、任务与设计师", "产品造型的概念", "设计与文化", "判断设计品质"],
    "03": ["现代设计的发生", "理性、秩序与职业化", "设计与艺术的关系", "多样的设计道路"],
    "04": ["科学与艺术的交汇", "技术如何改变创造", "设计的边界与可能", "从工具到观念"],
    "05": ["人的需要与生活", "行为、感知与使用", "设计中的社会关系", "面向人的产品"],
    "06": ["从问题到方案", "方法、流程与决策", "研究、分析与综合", "设计实践的组织"],
    "07": ["思维方式的转变", "想象、推演与判断", "形式背后的逻辑", "从观念到实践"],
    "08": ["设计面对的变化", "系统、环境与责任", "未来生活的想象", "新的设计角色"],
    "09": ["现代性的形成", "现代观念与视觉经验", "当代实践的多种路径", "设计的开放结局"]
  };

  var chapterQuestions = {
    "01": "人为什么开始设计？",
    "02": "我们究竟应该怎样理解“设计”？",
    "03": "设计为什么会成为一种现代职业？",
    "04": "科学与艺术如何同时存在于设计中？",
    "05": "市场、企业与社会如何影响设计？",
    "06": "材料和技术如何改变我们能够创造的东西？",
    "07": "我们设计物，物又如何改变我们的生活？",
    "08": "产品为什么会从“有用”变成“有价值”？",
    "09": "我们最终希望设计怎样的生活和社会？"
  };

  var chapterKeywords = {
    "01": ["自然", "造物", "创新", "非物质社会"],
    "02": ["设计定义", "设计过程", "产品造型", "设计品质"],
    "03": ["职业化", "工艺美术", "理性主义", "多样道路"],
    "04": ["设计科学", "设计艺术", "工程", "叙事风格"],
    "05": ["市场经济", "企业管理", "消费主义", "持续发展"],
    "06": ["自然材料", "工业材料", "新材料", "材料文化"],
    "07": ["工具", "机器", "生活方式", "价值与意义"],
    "08": ["高设计", "富裕生活", "身份表达", "文化价值"],
    "09": ["广告与观念", "真实性", "环境", "社会理想"]
  };

  var chapterCoverData = {
    "01": {
      title: "历史的长河",
      family: "image-led",
      english: "NATURE · HUMAN · MAKING",
      question: "人为什么开始设计？",
      keywords: ["自然", "造物", "创新", "非物质社会"],
      imageAnchor: "gallery-fig-001",
      caption: "一片布满粗细叶脉的树叶"
    },
    "02": {
      title: "设计的意义",
      family: "type-led",
      english: "WHAT IS DESIGN?",
      question: "我们究竟应该怎样理解“设计”？",
      keywords: ["设计定义", "设计过程", "产品造型", "设计品质"],
      imageAnchor: "gallery-fig-017",
      caption: "由威廉·莫里斯设计公司出品的墙纸、椅子（1862年）"
    },
    "03": {
      title: "走向现代设计——职业化",
      family: "timeline-led",
      english: "FROM MAKING TO PROFESSION",
      question: "设计为什么会成为一种现代职业？",
      keywords: ["工艺美术", "职业化", "理性主义", "适应性"],
      years: ["1860", "1919", "1950", "1998"],
      imageAnchor: "gallery-fig-031",
      caption: "北极熊的白色皮毛"
    },
    "04": {
      title: "科学与艺术的“边缘”",
      family: "relational-split",
      english: "SCIENCE ↔ ART",
      question: "科学与艺术如何同时存在于设计中？",
      keywords: ["设计科学", "设计艺术", "式样", "工程"],
      imageSrc: "../images/b3de8ca01e5681eeab86780bb6d498342c9aa0fb0cf197e008581111f65715ae.jpg",
      imageAlt: "莫尔的作品《斜躺的人体》",
      caption: "莫尔(Moore)的作品《斜躺的人体》，1935年"
    },
    "05": {
      title: "现代设计与社会经济",
      family: "relational-split",
      variant: "system",
      coverVersion: "later",
      english: "DESIGN IN SOCIETY",
      question: "社会与经济如何塑造设计？",
      keywords: ["市场", "企业", "消费", "社会", "环境"],
      diagram: "system",
      imageAnchor: "gallery-fig-063",
      caption: "1947年美国贝尔电话实验室实验成功的第一个半导体材料晶体管",
      visualSize: "small"
    },
    "06": {
      title: "现代设计与材料",
      family: "image-led",
      variant: "material",
      coverVersion: "later",
      english: "MATERIAL CHANGES CULTURE",
      question: "材料改变时，我们设计的世界会怎样改变？",
      keywords: ["材料", "技术", "感知", "人体", "文化"],
      progression: ["NATURAL", "INDUSTRIAL", "ELECTRONIC", "BIOLOGICAL ?"],
      progressionLayout: "vertical",
      imageAnchor: "gallery-fig-077",
      caption: "美国亚特兰大Emory大学的科学家将一个小型电子装置植入人脑中，人类迈出了“数字人”的第一步",
      visualSize: "large"
    },
    "07": {
      title: "现代设计与人的生活方式",
      family: "relational-split",
      variant: "life",
      coverVersion: "later",
      english: "OBJECTS SHAPE LIFE",
      question: "我们设计物，物又如何塑造我们的生活？",
      keywords: ["工具", "机器", "情感", "生活", "价值"],
      diagram: "life",
      imageAnchor: "gallery-fig-090",
      caption: "丹麦 Fritz Hansen 公司出品，Arne Jacobsen 设计的“蚁椅”，是完美设计的典范",
      visualSize: "small"
    },
    "08": {
      title: "现代设计与富裕生活",
      family: "type-led",
      variant: "value",
      coverVersion: "later",
      english: "NEED → UTILITY → DESIRE → VALUE",
      question: "当功能已经满足，我们还在为什么而设计？",
      keywords: ["需求", "品质", "手工", "欲望", "价值"],
      progression: ["NEED", "UTILITY", "DESIRE", "VALUE"],
      progressionLayout: "horizontal",
      progressionAccentLast: true,
      imageAnchor: "gallery-fig-114",
      caption: "高设计是一种体现“文化价值”和“市场价值”的设计风格",
      visualSize: "small"
    },
    "09": {
      title: "现代设计与现代观念",
      family: "type-led",
      variant: "closing",
      coverVersion: "later",
      englishLines: ["WHAT KIND", "OF WORLD", "DO WE WANT", "TO DESIGN?"],
      question: "设计最终反映的是怎样的社会理想？",
      keywords: ["观念", "广告", "真实性", "价值", "理想"],
      imageAnchor: "gallery-fig-128",
      caption: "Saba公司的系列产品广告，表达设计的一种意境和文化气息，观念性高于商业性",
      visualSize: "small"
    }
  };

  var chapterCrossLinks = {
    "01": [
      ["chapter02/04.html", "设计文化"], ["chapter07/01.html", "工具——人体的延伸"], ["chapter09/03.html", "设计与社会理想"]
    ],
    "02": [
      ["chapter03/01.html", "从工艺美术到现代设计"], ["chapter04/01.html", "设计科学"], ["chapter07/01.html", "工具——人体的延伸"]
    ],
    "03": [
      ["chapter02/02.html", "设计的过程、任务与设计师"], ["chapter04/01.html", "设计科学"], ["chapter05/02.html", "设计与企业精神"]
    ],
    "04": [
      ["chapter03/02.html", "理性主义与设计职业化"], ["chapter05/01.html", "来自市场经济的动力"], ["chapter06/01.html", "塑料的“困惑”"]
    ],
    "05": [
      ["chapter03/04.html", "多样的设计道路"], ["chapter08/01.html", "高设计"], ["chapter09/03.html", "设计与社会理想"]
    ],
    "06": [
      ["chapter04/03.html", "式样与工程"], ["chapter07/01.html", "工具——人体的延伸"], ["chapter09/03.html", "设计与社会理想"]
    ],
    "07": [
      ["chapter02/03.html", "产品造型的概念"], ["chapter06/03.html", "人的限度"], ["chapter08/03.html", "高档产品"]
    ],
    "08": [
      ["chapter05/01.html", "来自市场经济的动力"], ["chapter07/03.html", "产品的情感"], ["chapter09/03.html", "设计与社会理想"]
    ],
    "09": [
      ["chapter01/01.html", "原始生命力"], ["chapter05/03.html", "西方的“反思”"], ["chapter07/04.html", "价值的异化"]
    ]
  };

  var designDefinitions = [
    {
      id: "archer", category: "问题求解", author: "Archer", authorCN: "阿切尔",
      source: "《设计者运用的系统方法》", anchor: "definition-archer",
      quote: "设计是围绕目标的问题求解活动。",
      keywords: ["目标", "问题", "过程", "方法"],
      focus: "设计过程的合理性与目的性",
      summary: "本书将这一观点解释为对设计过程的描述，重点在于如何识别问题，并以有目的的过程寻找解决办法。"
    },
    {
      id: "asimow", category: "决策", author: "Asimow", authorCN: "阿西莫夫",
      source: "《设计导论》", anchor: "definition-asimow",
      quote: "设计是高风险、高不确定条件下的决策过程。",
      keywords: ["决策", "多方案", "风险", "有限理性"],
      focus: "在多个备选方案之间进行选择与权衡",
      summary: "设计不是寻找唯一最佳答案，而是在有限理性和不确定条件下，构造并选择足够满意的方案。"
    },
    {
      id: "booker", category: "模拟", author: "Booker", authorCN: "鲍克",
      source: "《工程设计教学会议论文集》", anchor: "definition-booker",
      quote: "设计是获得足够把握前对未来产品尽可能多地模拟。",
      keywords: ["模拟", "未来产品", "概念", "模型"],
      focus: "通过模拟逐步逼近尚未存在的产品",
      summary: "本书以工程设计中的替代方法说明这一观点：在概念与实物之间反复作用，逐渐获得对理想产品的把握。"
    },
    {
      id: "gregory", category: "满足需求", author: "Gregory", authorCN: "葛雷佳利",
      source: "《设计方法》", anchor: "definition-gregory",
      quote: "设计是拿出使人满意的产品。",
      keywords: ["满意", "需求", "人本", "产品"],
      focus: "产品是否服务于人的需要",
      summary: "这一观点把“使人满意”作为设计的重要准则，并与本书所述的以人为本的设计观念相连。"
    },
    {
      id: "jones", category: "表达", author: "Jones", authorCN: "乔尼斯",
      source: "《设计方法纵览》", anchor: "definition-jones",
      quote: "设计是表达一种精粹信念的活动。",
      keywords: ["设计师", "表达", "思想", "艺术"],
      focus: "设计者的思想、情感与技艺",
      summary: "本书指出，设计分工与职业化并未消除设计者的个性；表达方式仍是设计活动的重要组成。"
    },
    {
      id: "lu", category: "社会需求", author: "路甬祥", authorCN: "",
      source: "《再论现代工程教育》", anchor: "definition-lu",
      quote: "设计是在一定约束条件下，最合理地满足社会的需求。",
      keywords: ["约束", "社会", "资源", "需求"],
      focus: "现实条件中的社会需求与资源分配",
      summary: "这一表述强调设计发生在约束条件之中，需求、资源与合理性需要共同考量。"
    },
    {
      id: "page", category: "创造", author: "Page", authorCN: "佩奇",
      source: "《给人用的建筑》", anchor: "definition-page",
      quote: "设计是从客观现实向未来可能富有想象力的跨越。",
      keywords: ["现实", "未来可能", "想象力", "灵感"],
      focus: "从现实分析走向未来可能",
      summary: "本书借此讨论设计中的灵感与顿悟，并指出设计教育可以传授知识和技法，而设计本身仍需实践与交流。"
    },
    {
      id: "reswick", category: "创造", author: "Reswick", authorCN: "李斯威克",
      source: "《工程设计中心简介》", anchor: "definition-reswick",
      quote: "设计是从无到有的创造，创造新的、有用的事物。",
      keywords: ["创造", "新事物", "有用", "未来"],
      focus: "创造尚不存在的新事物",
      summary: "本书将这一观点与科学研究已有事物、设计创造新事物的区别联系起来。"
    },
    {
      id: "dilworth", category: "社会文化", author: "Dilworth", authorCN: "迪尔若特",
      source: "《超越‘科学’和‘反科学’的设计哲理》", anchor: "definition-dilworth",
      quote: "设计是一种社会——文化活动。",
      keywords: ["社会", "文化", "行为", "环境"],
      focus: "人的社会身份、文化与行为环境",
      summary: "本书强调，人不仅是自然存在物，也是社会的人、文化的人，因此设计不能脱离社会文化环境。"
    }
  ];

  var artworkCases = [
    {
      id: "eiffel-leaf", number: "01", imageNames: ["be4090931bf01d55e9914e348b7307441318b1e0db25717873aa0ce115963224.jpg"],
      title: "艾菲尔铁塔与一片树叶", caption: "原书图注：艾菲尔铁塔与一片树叶。",
      context: "这一节从叶脉、森林与自然界的多样性谈起，继而把设计文化的地域性、民族性与自然规律联系起来。",
      concepts: ["自然", "多样性", "设计文化"], location: "第一章 · 第一节 原始生命力",
      href: "../chapter01/01.html", linkLabel: "返回第一章 · 第一节"
    },
    {
      id: "cave-art", number: "02", imageNames: ["622848673c9534f6e7878148a3a45ef90e48b68f827863148c4fb53dc94e19ea.jpg"],
      title: "公元前约 15000 年的洞穴画", caption: "原书图注：公元前15000年的洞穴画。",
      context: "原书借洞穴画讨论现代人与先民对设计艺术的感受在许多方面具有共通性，并将其放在跨时间、跨文化的视角中理解。",
      concepts: ["原始造型艺术", "共通性", "跨文化"], location: "第一章 · 第一节 原始生命力",
      href: "../chapter01/01.html", linkLabel: "返回第一章 · 第一节"
    },
    {
      id: "banpo-pottery", number: "03", imageNames: ["2676cfd10abbcf639c41d726e292868183b344e4fe34fcaa74371f8c70d6cf95.jpg", "5c643549d87dbd929204321b03321e9638157947fe8d23462de010eeb7fc3c99.jpg"],
      title: "半坡彩陶与鱼纹", caption: "原书图注：人面鱼纹、网纹彩陶盘；鱼纹彩陶盘。",
      context: "原书介绍半坡彩陶的造型与纹彩，并指出鱼纹是最具代表性的纹样；对于部分纹样的原始含义，作者明确表示现已无法确知。",
      concepts: ["半坡彩陶", "鱼纹", "纹样"], location: "第一章 · 第一节 原始生命力",
      href: "../chapter01/01.html", linkLabel: "返回第一章 · 第一节"
    },
    {
      id: "wegner-chair", number: "04", imageNames: ["24287ea93d8d73cdeb922762f1dae6e15500fc29dc4410c041039d03d9e3d085.jpg"],
      title: "Hans J. Wegner 圈椅", caption: "原书图注：Hans J Wegner 设计的“圈椅”——表现木材材质。",
      context: "本书在讨论设计任务与设计师时，以这把圈椅作为表现木材材质的图片案例。这里仅保留原书图注与章节语境，不补充原书未提供的作品背景。",
      concepts: ["圈椅", "木材材质", "产品造型"], location: "第二章 · 第二节 设计的过程、任务与设计师",
      href: "../chapter02/02.html", linkLabel: "返回第二章 · 第二节"
    },
    {
      id: "sony-walkman", number: "05", imageNames: ["42bdd546a021f44718164d9c3a1b730cc5c2160200ff1a83f2df9e7984e69eae.jpg"],
      title: "Sony 随身听（1978）", caption: "原书图注：日本 Sony 公司 1978 年出品的“随身听”。",
      context: "第一章图注记录了这件产品及年份；第六章又以 Sony 随身听讨论轻便概念和携带式设计。",
      concepts: ["Sony", "随身听", "轻便设计"], location: "第一章 · 第四节 非物质社会",
      href: "../chapter01/04.html", linkLabel: "返回图片所在正文",
      relatedLocation: "第六章 · 第五节 无形的基础设施", relatedHref: "../chapter06/05.html"
    }
  ];

  function getPageInfo() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var chapterMatch = path.match(/chapter(\d{2})\/(index|\d{2})\.html$/);
    var sectionMatch = chapterMatch && chapterMatch[2] !== "index" ? chapterMatch[2] : null;
    var isHome = /\/index\.html$/.test(path) && !/chapter\d{2}\/index\.html$/.test(path);
    var isPreface = /\/preface\.html$/.test(path);
    var isReferences = /\/references\.html$/.test(path);
    return {
      chapter: chapterMatch ? chapterMatch[1] : null,
      section: sectionMatch,
      isChapterIndex: !!chapterMatch && !sectionMatch,
      isHome: isHome,
      isPreface: isPreface,
      isReferences: isReferences
    };
  }

  function mainRoot() {
    return document.querySelector("#mdbook-content main") ||
      document.querySelector(".content main") ||
      document.querySelector("main") ||
      document.body;
  }

  function addText(parent, className, value) {
    var node = document.createElement("span");
    node.className = className;
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  function setBodyClass(info) {
    if (!info.isHome) return;
    document.body.classList.add("book-home-page");
    document.body.dataset.homeSidebarOpen = "false";

    var sidebarToggle = document.getElementById("mdbook-sidebar-toggle-anchor");
    var sidebarButton = document.getElementById("mdbook-sidebar-toggle");
    if (!sidebarToggle) return;

    function syncHomeSidebar() {
      var isOpen = sidebarToggle.checked;
      document.body.dataset.homeSidebarOpen = String(isOpen);
      document.documentElement.classList.toggle("sidebar-visible", isOpen);
      var sidebar = document.getElementById("mdbook-sidebar");
      if (sidebar) sidebar.setAttribute("aria-hidden", String(!isOpen));
      if (sidebarButton) sidebarButton.setAttribute("aria-expanded", String(isOpen));
    }

    sidebarToggle.checked = false;
    syncHomeSidebar();
    if (!sidebarToggle.dataset.homeSidebarSync) {
      sidebarToggle.dataset.homeSidebarSync = "true";
      sidebarToggle.addEventListener("change", syncHomeSidebar);
    }
  }

  function enhanceHeadings(info) {
    var main = mainRoot();
    var heading = main.querySelector("h1") || main.querySelector("h2");
    if (!heading) return;

    if (info.isHome) return;
    if (info.isPreface) {
      heading.dataset.kicker = "PREFACE";
      heading.classList.add("designbook-page-heading");
    } else if (info.isReferences) {
      heading.dataset.kicker = "REFERENCES";
      heading.classList.add("designbook-page-heading");
    } else if (info.isChapterIndex) {
      heading.dataset.kicker = "CHAPTER " + info.chapter;
      heading.classList.add("designbook-page-heading");
    } else if (info.chapter && info.section) {
      heading.dataset.kicker = "CHAPTER " + info.chapter + " · SECTION " + info.section;
      heading.classList.add("designbook-page-heading");
    }
  }

  function addChapterQuestion(info) {
    if (!info.isChapterIndex || !chapterQuestions[info.chapter] || chapterCoverData[info.chapter]) return;
    var main = mainRoot();
    if (main.querySelector(".chapter-question")) return;
    var heading = main.querySelector("h1");
    if (!heading) return;

    var card = document.createElement("section");
    card.className = "chapter-question book-motion-target";
    card.setAttribute("aria-label", "本章导读");
    card.innerHTML = '<p class="chapter-question__eyebrow">CHAPTER ' + info.chapter + ' · GUIDE</p><h2>这一章在问什么？</h2>';
    var question = document.createElement("p");
    question.className = "chapter-question__prompt";
    question.textContent = chapterQuestions[info.chapter];
    card.appendChild(question);

    var keywords = chapterKeywords[info.chapter] || [];
    if (keywords.length) {
      var keywordRow = document.createElement("div");
      keywordRow.className = "chapter-keywords";
      keywordRow.setAttribute("aria-label", "本章关键词");
      var keywordLabel = document.createElement("span");
      keywordLabel.className = "chapter-keywords__label";
      keywordLabel.textContent = "KEYWORDS";
      keywordRow.appendChild(keywordLabel);
      keywords.forEach(function (word) {
        var keyword = document.createElement("span");
        keyword.className = "chapter-keywords__item";
        keyword.textContent = word;
        keywordRow.appendChild(keyword);
      });
      card.appendChild(keywordRow);
    }

    var connections = chapterCrossLinks[info.chapter] || [];
    if (connections.length) {
      var related = document.createElement("div");
      related.className = "chapter-cross-links";
      var relatedLabel = document.createElement("span");
      relatedLabel.className = "chapter-cross-links__label";
      relatedLabel.textContent = "READ ACROSS · 跨章节关联";
      related.appendChild(relatedLabel);
      var linkList = document.createElement("div");
      linkList.className = "chapter-cross-links__list";
      connections.forEach(function (item) {
        var link = document.createElement("a");
        link.href = new URL("../" + item[0], window.location.href).href;
        link.textContent = item[1];
        linkList.appendChild(link);
      });
      related.appendChild(linkList);
      card.appendChild(related);
    }

    heading.insertAdjacentElement("afterend", card);
  }

  function findParagraphContainingText(root, phrase) {
    if (!root || !phrase) return null;
    var paragraphs = root.querySelectorAll("p");
    for (var index = 0; index < paragraphs.length; index += 1) {
      if (paragraphs[index].textContent.indexOf(phrase) >= 0) return paragraphs[index];
    }
    return null;
  }

  function getAdjacentFigureCaption(paragraph, expectedPrefix) {
    if (!paragraph) return null;
    var next = paragraph.nextElementSibling;
    if (!next || next.tagName !== "P" || next.querySelector("img, .gallery-source-anchor")) return null;
    var text = next.textContent.replace(/\s+/g, " ").trim();
    if (expectedPrefix && text.indexOf(expectedPrefix) !== 0) return null;
    return text ? next : null;
  }

  function getGalleryFigureParagraph(main, anchorId) {
    if (!main || !anchorId) return null;
    var anchor = main.querySelector('[id="' + anchorId + '"]');
    return anchor && anchor.closest("p");
  }

  function extractFigureCaption(paragraph) {
    if (!paragraph) return "";
    var media = paragraph.querySelector("label.checkbox-label");
    if (!media) return "";
    var parts = [];
    var node = media.nextSibling;
    while (node) {
      var next = node.nextSibling;
      if (node.nodeType === 3) parts.push(node.nodeValue);
      node.remove();
      node = next;
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  function createChapterCoverSource(data) {
    var source = document.createElement("p");
    var image = document.createElement("img");
    image.src = data.imageSrc;
    image.alt = data.imageAlt || "章节代表图像";
    source.appendChild(image);
    return source;
  }

  function createChapterCoverNode(className, text) {
    var node = document.createElement("span");
    node.className = className;
    node.textContent = text;
    return node;
  }

  function createChapterCoverSystemDiagram() {
    var diagram = document.createElement("div");
    diagram.className = "chapter-cover__diagram chapter-cover__diagram--system";
    diagram.setAttribute("role", "img");
    diagram.setAttribute("aria-label", "社会、企业、设计、市场、消费与环境之间的关系");
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--society", "社会"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--enterprise", "企业"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--design", "设计"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--market", "市场"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--consumption", "消费"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__diagram-node chapter-cover__diagram-node--environment", "环境"));
    return diagram;
  }

  function createChapterCoverLifeDiagram() {
    var diagram = document.createElement("div");
    diagram.className = "chapter-cover__diagram chapter-cover__diagram--life";
    diagram.setAttribute("role", "img");
    diagram.setAttribute("aria-label", "人、物与生活之间的关系");
    diagram.appendChild(createChapterCoverNode("chapter-cover__life-node", "HUMAN"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__life-link", "↕"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__life-node chapter-cover__life-node--accent", "OBJECT"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__life-link", "↕"));
    diagram.appendChild(createChapterCoverNode("chapter-cover__life-node", "LIFE"));
    return diagram;
  }

  function createChapterCoverProgression(data) {
    var progression = document.createElement("div");
    progression.className = "chapter-cover__progression chapter-cover__progression--" + (data.progressionLayout || "vertical");
    progression.setAttribute("aria-label", "概念递进：" + (data.progression || []).join("、"));
    (data.progression || []).forEach(function (label, index, labels) {
      var item = document.createElement("span");
      item.className = "chapter-cover__progression-item";
      if (index === labels.length - 1 && data.progressionAccentLast) {
        item.classList.add("chapter-cover__progression-item--accent");
      }
      item.textContent = label;
      progression.appendChild(item);
      if (index < labels.length - 1) {
        var arrow = document.createElement("span");
        arrow.className = "chapter-cover__progression-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = data.progressionLayout === "horizontal" ? "→" : "↓";
        progression.appendChild(arrow);
      }
    });
    return progression;
  }

  function appendChapterCoverSecondary(copy, data) {
    if (data.diagram === "system") copy.appendChild(createChapterCoverSystemDiagram());
    if (data.diagram === "life") copy.appendChild(createChapterCoverLifeDiagram());
    if (data.progression) copy.appendChild(createChapterCoverProgression(data));
  }

  function appendChapterCoverEnglish(copy, data) {
    var english = document.createElement("p");
    english.className = "chapter-cover__english";
    if (data.englishLines && data.englishLines.length) {
      english.classList.add("chapter-cover__english--closing");
      data.englishLines.forEach(function (line, index) {
        var lineNode = document.createElement("span");
        lineNode.className = "chapter-cover__english-line";
        if (index === data.englishLines.length - 1) lineNode.classList.add("chapter-cover__english-line--accent");
        lineNode.textContent = line;
        english.appendChild(lineNode);
      });
    } else {
      english.textContent = data.english || "";
    }
    copy.appendChild(english);
  }

  function addChapterCover(info) {
    if (!info || !info.isChapterIndex || !chapterCoverData[info.chapter]) return;
    var main = mainRoot();
    if (!main || main.querySelector(".chapter-cover")) return;

    var heading = main.querySelector("h1");
    var data = chapterCoverData[info.chapter];
    var source = data.imageAnchor ? getGalleryFigureParagraph(main, data.imageAnchor) : null;
    if (!source && data.imageSrc) source = createChapterCoverSource(data);
    if (!heading || !source) return;

    var caption = extractFigureCaption(source) || data.caption || "";
    var cover = document.createElement("section");
    cover.className = "chapter-cover chapter-cover--" + data.family;
    if (data.variant) cover.classList.add("chapter-cover--" + data.variant);
    if (data.coverVersion === "later") cover.classList.add("chapter-cover--later");
    cover.classList.add("book-motion-target");
    cover.setAttribute("aria-label", "第" + info.chapter + "章章节封面");

    var copy = document.createElement("div");
    copy.className = "chapter-cover__copy";
    main.insertBefore(cover, heading);

    var eyebrow = document.createElement("p");
    eyebrow.className = "chapter-cover__eyebrow";
    eyebrow.textContent = "CHAPTER " + info.chapter;
    copy.appendChild(eyebrow);

    heading.classList.remove("designbook-page-heading", "book-heading-motion");
    heading.removeAttribute("data-kicker");
    heading.classList.add("chapter-cover__title");
    var titleAnchor = heading.querySelector("a.header");
    if (titleAnchor) titleAnchor.textContent = data.title || titleAnchor.textContent.replace(/^第\S+章\s*/, "").trim();
    else heading.textContent = data.title || heading.textContent.replace(/^第\S+章\s*/, "").trim();
    copy.appendChild(heading);

    appendChapterCoverEnglish(copy, data);

    if (data.years && data.years.length) {
      var years = document.createElement("div");
      years.className = "chapter-cover__years";
      years.setAttribute("aria-label", "章节历史节点");
      data.years.forEach(function (year) {
        var yearNode = document.createElement("span");
        yearNode.textContent = year;
        years.appendChild(yearNode);
      });
      copy.appendChild(years);
    }

    appendChapterCoverSecondary(copy, data);

    var question = document.createElement("p");
    question.className = "chapter-cover__question";
    question.textContent = data.question || chapterQuestions[info.chapter];
    copy.appendChild(question);

    var keywordRow = document.createElement("div");
    keywordRow.className = "chapter-cover__keywords";
    (data.keywords || chapterKeywords[info.chapter] || []).slice(0, 5).forEach(function (word) {
      var keyword = document.createElement("span");
      keyword.textContent = word;
      keywordRow.appendChild(keyword);
    });
    copy.appendChild(keywordRow);

    var continueNote = document.createElement("span");
    continueNote.className = "chapter-cover__continue";
    continueNote.textContent = "开始本章 ↓";
    copy.appendChild(continueNote);

    var visual = document.createElement("figure");
    visual.className = "chapter-cover__visual";
    if (data.visualSize) visual.classList.add("chapter-cover__visual--" + data.visualSize);
    source.classList.add("chapter-cover__source");
    visual.appendChild(source);
    if (caption) {
      var captionNode = document.createElement("figcaption");
      captionNode.className = "chapter-cover__caption";
      captionNode.textContent = caption;
      visual.appendChild(captionNode);
    }

    cover.appendChild(copy);
    cover.appendChild(visual);
  }

  function appendEditorialCaption(figure, number, title, note) {
    var caption = document.createElement("figcaption");
    caption.className = "editorial-figure-caption";
    var label = document.createElement("span");
    label.className = "editorial-figure-caption__number";
    label.textContent = number;
    var heading = document.createElement("strong");
    heading.className = "editorial-figure-caption__title";
    heading.textContent = title;
    caption.appendChild(label);
    caption.appendChild(heading);
    if (note) {
      var description = document.createElement("span");
      description.className = "editorial-figure-caption__note";
      description.textContent = note;
      caption.appendChild(description);
    }
    figure.appendChild(caption);
  }

  function addChapterThreeHero(main) {
    if (!main || main.querySelector(".editorial-chapter-hero")) return;
    var heading = main.querySelector("h1");
    var source = getGalleryFigureParagraph(main, "gallery-fig-031");
    if (!heading || !source) return;

    var followingCaption = getAdjacentFigureCaption(source, "北极熊");
    var caption = extractFigureCaption(source) || (followingCaption && followingCaption.textContent.replace(/\s+/g, " ").trim()) || "北极熊的白色皮毛";
    if (followingCaption) followingCaption.remove();
    var hero = document.createElement("section");
    hero.className = "editorial-chapter-hero book-motion-target";
    hero.id = "chapter03-editorial-hero";
    hero.setAttribute("aria-labelledby", heading.id || "chapter03-editorial-title");

    var copy = document.createElement("div");
    copy.className = "editorial-chapter-hero__copy";
    main.insertBefore(hero, heading);
    var masthead = document.createElement("div");
    masthead.className = "editorial-chapter-hero__masthead";
    var eyebrow = document.createElement("span");
    eyebrow.textContent = "CHAPTER 03";
    var number = document.createElement("strong");
    number.textContent = "03";
    masthead.appendChild(eyebrow);
    masthead.appendChild(number);
    copy.appendChild(masthead);

    heading.classList.remove("designbook-page-heading", "book-heading-motion");
    heading.removeAttribute("data-kicker");
    heading.classList.add("editorial-chapter-hero__title");
    copy.appendChild(heading);

    var english = document.createElement("p");
    english.className = "editorial-chapter-hero__english";
    english.textContent = "WHEN DESIGN BECAME A PROFESSION";
    copy.appendChild(english);

    var lead = document.createElement("p");
    lead.className = "editorial-chapter-hero__lead";
    lead.textContent = "职业化并不是“养活”设计师的一个权宜之计，它从本质上说明设计是一种“适应性”系统。";
    copy.appendChild(lead);

    var visual = document.createElement("figure");
    visual.className = "editorial-chapter-hero__visual";
    source.classList.add("editorial-chapter-hero__source");
    visual.appendChild(source);
    appendEditorialCaption(visual, "FIG. 031", caption, "设计如何被环境塑造：从适应性进入职业化的讨论。");

    hero.appendChild(copy);
    hero.appendChild(visual);
  }

  function addChapterThreePullQuote(main) {
    if (!main || main.querySelector(".editorial-pull-quote")) return;
    var source = findParagraphContainingText(main, "设计与制造的分离是设计职业化的重要标志");
    if (!source) return;

    var quote = document.createElement("section");
    quote.className = "editorial-pull-quote book-motion-target";
    quote.setAttribute("aria-label", "第三章编辑引文");
    quote.innerHTML = '<p class="editorial-pull-quote__eyebrow">THE PROFESSIONAL TURN</p><blockquote>“设计与制造的分离，是设计职业化的重要标志。”</blockquote><p class="editorial-pull-quote__note">当意图需要被表达、传递并交给他人实现，设计便进入了新的协作关系。</p>';
    source.insertAdjacentElement("afterend", quote);
  }

  function addChapterThreeFeatureFigure(main) {
    if (!main || main.querySelector(".editorial-feature-figure")) return;
    var source = getGalleryFigureParagraph(main, "gallery-fig-034");
    if (!source) return;

    var followingCaption = getAdjacentFigureCaption(source, "雷蒙德");
    var caption = extractFigureCaption(source) || (followingCaption && followingCaption.textContent.replace(/\s+/g, " ").trim()) || "雷蒙德·罗维（Raymond Loewy 1893~1986）在纽约大都会博物馆他设计的办公室的模型里";
    if (followingCaption) followingCaption.remove();
    var figure = document.createElement("figure");
    figure.className = "editorial-feature-figure book-motion-target";
    figure.setAttribute("aria-label", "第三章特选图像");
    var sourceParent = source.parentNode;
    var media = document.createElement("div");
    media.className = "editorial-feature-figure__media";
    source.classList.add("editorial-feature-figure__source");
    sourceParent.insertBefore(figure, source);
    media.appendChild(source);
    figure.appendChild(media);
    var profile = document.createElement("div");
    profile.className = "editorial-feature-figure__profile";
    profile.innerHTML = '<p class="editorial-feature-figure__eyebrow">RAYMOND LOEWY</p><p class="editorial-feature-figure__dates">1893—1986</p><h3>DESIGNER<br>OR<br>DESIGN SYSTEM?</h3><p class="editorial-feature-figure__statement">他让销售曲线变成流线。</p><p class="editorial-feature-figure__note">个人风格、制造商、工程师与市场，在同一个职业系统中共同塑造产品。</p>';
    figure.appendChild(profile);
    appendEditorialCaption(figure, "FIG. 034", caption, "职业设计师不再只是制造者，而是进入企业、技术与生产之间的组织网络。");
  }

  function addChapterThreeCaseStudy(main) {
    if (!main || main.querySelector(".editorial-case-study")) return;
    var source = getGalleryFigureParagraph(main, "gallery-fig-037");
    var context = findParagraphContainingText(main, "克瓦尔（Kovar）的设计具有重要");
    if (!source || !context) return;

    var study = document.createElement("section");
    study.className = "editorial-case-study book-motion-target";
    study.setAttribute("aria-labelledby", "chapter03-kovar-title");
    study.innerHTML = '<div class="editorial-case-study__heading"><p class="editorial-case-study__eyebrow">CASE STUDY · 1952</p><h3 id="chapter03-kovar-title">Zdeněk Kovář</h3><p class="editorial-case-study__title">剪刀的再设计</p></div>';

    var grid = document.createElement("div");
    grid.className = "editorial-case-study__grid";
    var figure = document.createElement("figure");
    figure.className = "editorial-case-study__figure";
    source.classList.add("editorial-case-study__source");
    figure.appendChild(source);
    appendEditorialCaption(figure, "FIG. 037", "1952年 Zdenek Kovar 设计的剪刀把手", "造型表达了其使用动作。");

    var explanation = document.createElement("div");
    explanation.className = "editorial-case-study__explanation";
    explanation.innerHTML = '<p class="editorial-case-study__label">FORM / EXPERIMENT / USE</p><p>克瓦尔以软泥灰包裹工具把手，依据手留下的印痕设计新手柄，把使用动作转化为造型依据。</p><p>这是一种从实验出发的准科学设计：形式不再只是直觉的结果，也回应身体、材料与工作的实际条件。</p>';
    var read = document.createElement("a");
    read.className = "editorial-case-study__read";
    read.href = "#timeline-kovar";
    read.textContent = "阅读相关原文 →";
    explanation.appendChild(read);

    grid.appendChild(figure);
    grid.appendChild(explanation);
    study.appendChild(grid);
    context.insertAdjacentElement("afterend", study);
  }

  function addChapterThreeHistoryMarker(main) {
    if (!main || main.querySelector(".editorial-history-marker")) return;
    var source = findParagraphContainingText(main, "设计追求理性风格由来已久");
    if (!source) return;

    var marker = document.createElement("aside");
    marker.className = "editorial-history-marker book-motion-target";
    marker.setAttribute("aria-label", "包豪斯与理性设计历史标记");
    marker.innerHTML = '<span class="editorial-history-marker__line" aria-hidden="true"></span><div><p class="editorial-history-marker__period">1919—1933</p><p class="editorial-history-marker__name">BAUHAUS</p><p class="editorial-history-marker__note">RATIONAL DESIGN · 设计理性化的历史坐标</p></div>';
    source.insertAdjacentElement("afterend", marker);
  }

  function addChapterThreeSpread(main) {
    if (!main || main.querySelector(".editorial-spread")) return;
    var source = findParagraphContainingText(main, "设计师”和“艺术家”的不同");
    if (!source) source = findParagraphContainingText(main, "设计是“集体积累”");
    if (!source) return;

    var spread = document.createElement("section");
    spread.className = "editorial-spread book-motion-target";
    spread.setAttribute("aria-label", "设计是集体积累的编辑展开");
    spread.innerHTML = '<div class="editorial-spread__heading"><p class="editorial-spread__eyebrow">DESIGN IS COLLECTIVE</p><h3>设计不是单独完成的创作</h3><p>署名可以指向一个人，但产品成为现实，依赖的是一整套协作关系。</p></div>' +
      '<div class="editorial-spread__diagram" role="img" aria-label="设计师与工程、制造、市场和用户共同构成设计系统"><div class="editorial-spread__author"><span>DESIGNER</span><strong>设计师的署名</strong><small>个人判断 · 形式语言</small></div><div class="editorial-spread__axis" aria-hidden="true"><i></i><i></i><i></i></div><div class="editorial-spread__system"><span>ENGINEERING<br><b>工程技术</b></span><span>PRODUCTION<br><b>制造生产</b></span><span>MARKET<br><b>市场传播</b></span><span>USER<br><b>使用者</b></span></div></div>';
    source.insertAdjacentElement("afterend", spread);
  }

  function addChapterThreeClosing(main) {
    if (!main || main.querySelector(".editorial-closing")) return;
    var source = getGalleryFigureParagraph(main, "gallery-fig-046");
    if (!source) return;

    var followingCaption = getAdjacentFigureCaption(source, "1998年苹果电脑");
    if (followingCaption) followingCaption.remove();
    var closing = document.createElement("section");
    closing.className = "editorial-closing book-motion-target";
    closing.setAttribute("aria-label", "第三章编辑收束");
    closing.innerHTML = '<div class="editorial-closing__heading"><p class="editorial-closing__eyebrow">CHAPTER 03 · CLOSING NOTE</p><p class="editorial-closing__sequence">1945 <i aria-hidden="true">→</i> 1998</p><h3>合理，并不意味着只有一条道路</h3><p>职业化建立了方法、企业与协作网络；而设计的未来，仍然向多样的生活和观念开放。</p></div>';

    var figure = document.createElement("figure");
    figure.className = "editorial-closing__figure";
    source.classList.add("editorial-closing__source");
    source.parentNode.insertBefore(closing, source);
    figure.appendChild(source);
    appendEditorialCaption(figure, "FIG. 046", "1998 年苹果电脑以 iMac 和 G3 系列轰动世界", "当设计进入新的技术与生活环境，职业化也必须继续适应变化。");
    closing.appendChild(figure);

    var reflection = document.createElement("p");
    reflection.className = "editorial-closing__reflection";
    reflection.setAttribute("aria-label", "数字版编辑总结，非原书引句");
    reflection.textContent = "现代设计从来不只有一种答案。";
    closing.appendChild(reflection);
  }

  function addChapterThreeEditorials(info) {
    if (!info || info.chapter !== "03") return;
    var main = mainRoot();
    if (info.section === "01") {
      addChapterThreePullQuote(main);
      addChapterThreeFeatureFigure(main);
    }
    if (info.section === "02") {
      addChapterThreeCaseStudy(main);
      addChapterThreeHistoryMarker(main);
    }
    if (info.section === "03") {
      addChapterThreeSpread(main);
    }
    if (info.section === "04") {
      addChapterThreeClosing(main);
    }
  }

  function addChapterExperience(info) {
    var main = mainRoot();
    var markup = "";
    var placement = "guide";
    var placementAfterText = "";

    if (info.isChapterIndex && info.chapter === "01") {
      markup = '<p class="chapter-experience__eyebrow">CHAPTER 01 · A RELATIONSHIP</p>' +
        '<h3>自然 → 人 → 物</h3>' +
        '<div class="nature-flow__track" aria-label="自然启发人，人制器造物">' +
        '<button type="button" class="nature-flow__node" data-nature-node="nature" aria-expanded="false"><span>NATURE</span><strong>自然</strong><span class="nature-flow__hint">启发 · 材料 · 约束</span></button><i aria-hidden="true">↓</i>' +
        '<button type="button" class="nature-flow__node" data-nature-node="human" aria-expanded="false"><span>HUMAN</span><strong>人</strong><span class="nature-flow__hint">需要 · 创造</span></button><i aria-hidden="true">↓</i>' +
        '<button type="button" class="nature-flow__node" data-nature-node="object" aria-expanded="false"><span>OBJECT</span><strong>物</strong><span class="nature-flow__hint">工具 · 文化</span></button></div>';
    } else if (info.chapter === "03" && info.section === "01") {
      placementAfterText = "设计与制造的分离是设计职业化的重要标志";
      markup = '<p class="chapter-experience__eyebrow">INTERACTIVE READING · DESIGNER\'S ROLE</p>' +
        '<h3>设计师的角色变化</h3><p class="chapter-experience__intro">设计与制造分离之后，设计师如何把意图交给协作网络？</p>' +
        '<div class="designer-role-diagram" role="group" aria-label="选择传统工匠或现代设计师的工作关系"><div class="designer-role-diagram__selector"><span>ROLE SHIFT</span><button type="button" data-role-choice="craft" aria-pressed="true">传统工匠</button><button type="button" data-role-choice="modern" aria-pressed="false">现代设计师</button></div>' +
        '<div class="designer-role-diagram__panels" aria-live="polite"><div data-role-panel="craft"><div class="designer-role-diagram__flow designer-role-diagram__flow--single"><span>意图</span><i>↓</i><strong>设计与制作</strong><small>一人贯通</small></div><p>传统工匠在实践中把设计与制作结合在一起。</p></div>' +
        '<div data-role-panel="modern" hidden><div class="designer-role-diagram__flow designer-role-diagram__flow--network"><span>委托方</span><b>↔</b><strong>设计师</strong><b>↔</b><span>工程师</span><i>↓</i><span>企业</span><b>→</b><span>制造</span></div><p>现代设计师通过图纸、模型和沟通，与委托方、工程师及制造环节协作。</p></div></div></div>';
    } else if (info.chapter === "04" && info.section === "01") {
      placementAfterText = "设计不等于科学加艺术的简单";
      markup = '<p class="chapter-experience__eyebrow">SCIENCE ↔ ART</p><h3>设计在科学与艺术之间</h3>' +
        '<p class="chapter-experience__intro">移动 DESIGN，观察两种观察角度如何改变；设计并不归入其中一端。</p>' +
        '<div class="design-spectrum"><div class="design-spectrum__ends"><span>SCIENCE<br><b>科学</b></span><span>ART<br><b>艺术</b></span></div>' +
        '<input type="range" min="0" max="100" value="50" aria-label="在科学与艺术的观察角度之间移动 DESIGN" class="design-spectrum__range">' +
        '<div class="design-spectrum__terms"><span>ENGINEERING · FUNCTION · RATIONALITY<br>工程 · 性能 · 理性</span><span>FORM · EXPRESSION · CULTURE<br>式样 · 表达 · 文化</span></div>' +
        '<output class="design-spectrum__state" aria-live="polite">DESIGN · 在两种视角之间</output></div>' +
        '<p class="design-spectrum__note">设计并不是科学与艺术的简单相加。</p>';
    } else if (info.isChapterIndex && info.chapter === "05") {
      placementAfterText = "其中设计与社会经济的关系";
      markup = '<p class="chapter-experience__eyebrow">DESIGN IN CONTEXT</p><h3>一个产品，究竟是谁决定的？</h3>' +
        '<div class="economy-map"><div class="economy-map__system"><div class="economy-map__nodes">' +
        '<button type="button" data-economy="society" aria-pressed="false">社会</button>' +
        '<button type="button" data-economy="institution" aria-pressed="false">制度</button><span class="economy-map__center">DESIGN</span><button type="button" data-economy="enterprise" aria-pressed="false">企业</button>' +
        '<button type="button" data-economy="market" aria-pressed="true">市场</button><button type="button" data-economy="consumer" aria-pressed="false">消费者</button>' +
        '<button type="button" data-economy="ecology" aria-pressed="false">生态环境</button></div>' +
        '<p class="economy-map__flow">设计 → 产品 → 消费者 → 需求 <span>↺ 市场</span></p></div>' +
        '<div class="economy-map__detail" aria-live="polite"><strong>市场</strong><p>竞争、需求与消费共同推动设计，也影响产品如何进入生活。</p></div></div>';
    } else if (info.isChapterIndex && info.chapter === "06") {
      placementAfterText = "半导体时代有半导体文化";
      markup = '<p class="chapter-experience__eyebrow">MATERIAL SHIFT</p><h3>材料改变了什么？</h3>' +
        '<div class="material-explorer"><div class="material-timeline" role="group" aria-label="选择材料发展阶段">' +
        '<button type="button" data-material="natural" aria-pressed="true"><small>NATURE</small><strong>自然材料</strong><span>WOOD · STONE</span></button><i>↓</i>' +
        '<button type="button" data-material="industrial" aria-pressed="false"><small>INDUSTRY</small><strong>工业材料</strong><span>STEEL · PLASTIC</span></button><i>↓</i>' +
        '<button type="button" data-material="electronic" aria-pressed="false"><small>ELECTRONIC</small><strong>电子材料</strong><span>SEMICONDUCTOR</span></button><i>↓</i>' +
        '<button type="button" data-material="emerging" aria-pressed="false"><small>EMERGING</small><strong>新型材料</strong><span>BIO · NANO</span></button></div>' +
        '<div class="material-explorer__panel" aria-live="polite"><span>NATURE · 自然材料</span><p>木、石等自然材料与人的加工经验和情感关系密切。</p><ul class="material-explorer__effects"><li>加工方式</li><li>表面体验</li><li>重量感</li><li>造型语言</li><li>人与技术的关系</li></ul><a href="chapter06/index.html">阅读本章 →</a></div></div>';
    } else if (info.isChapterIndex && info.chapter === "07") {
      placementAfterText = "意味着一大堆产品和一个完整的生活系统";
      markup = '<p class="chapter-experience__eyebrow">HUMAN ↔ OBJECT ↔ LIFE</p><h3>我们设计物，物也设计我们</h3>' +
        '<div class="life-cycle"><div class="life-cycle__diagram" aria-label="人、物、家庭与机器构成循环关系">' +
        '<button type="button" class="life-cycle__node life-cycle__node--human" data-life="human" data-target="chapter07/01.html" aria-pressed="true">人<small>HUMAN</small></button>' +
        '<button type="button" class="life-cycle__node life-cycle__node--object" data-life="object" data-target="chapter07/03.html" aria-pressed="false">物<small>OBJECT</small></button>' +
        '<button type="button" class="life-cycle__node life-cycle__node--family" data-life="family" data-target="chapter07/01.html" aria-pressed="false">家庭<small>FAMILY</small></button>' +
        '<button type="button" class="life-cycle__node life-cycle__node--machine" data-life="machine" data-target="chapter07/02.html" aria-pressed="false">机器<small>MACHINE</small></button>' +
        '<i class="life-cycle__arrow life-cycle__arrow--one" aria-hidden="true">↘</i><i class="life-cycle__arrow life-cycle__arrow--two" aria-hidden="true">↙</i><i class="life-cycle__arrow life-cycle__arrow--three" aria-hidden="true">↖</i><i class="life-cycle__arrow life-cycle__arrow--four" aria-hidden="true">↗</i></div>' +
        '<div class="life-cycle__detail" aria-live="polite"><p>工具是人们想象世界与实际物质世界之间的桥梁。</p><a href="chapter07/01.html">读第一节 →</a></div></div>';
    } else if (info.chapter === "08" && info.section === "01") {
      placementAfterText = "高设计研究是对设计的价值和产品的价值的更加深入的研究";
      markup = '<p class="chapter-experience__eyebrow">NEED → VALUE</p><h3>为什么一个物会变得“有价值”？</h3>' +
        '<div class="value-path" role="group" aria-label="逐级探索产品价值">' +
        '<button type="button" data-value-step="need" aria-pressed="true"><span>NEED</span>需要</button><i>→</i>' +
        '<button type="button" data-value-step="utility" aria-pressed="false"><span>UTILITY</span>功能</button><i>→</i>' +
        '<button type="button" data-value-step="desire" aria-pressed="false"><span>DESIRE</span>欲望</button><i>→</i>' +
        '<button type="button" data-value-step="identity" aria-pressed="false"><span>IDENTITY</span>身份</button><i>→</i>' +
        '<button type="button" data-value-step="value" aria-pressed="false"><span>VALUE</span>文化价值</button></div>' +
        '<div class="value-path__detail" aria-live="polite">设计回应富裕生活和不断提高的生活需要。</div>';
    } else if (info.chapter === "09" && info.section === "03") {
      placement = "end";
      markup = '<p class="chapter-experience__eyebrow">DIGITAL EDITION · EDITORIAL EPILOGUE</p><h3>从设计回望社会理想</h3>' +
        '<div class="idea-cycle" aria-label="观念、生活、设计与世界形成循环">' +
        '<div class="idea-cycle__nodes"><span class="idea-cycle__node">IDEA<small>观念</small></span><i>↓</i>' +
        '<span class="idea-cycle__node">LIFE<small>生活方式</small></span><i>↓</i>' +
        '<span class="idea-cycle__node">DESIGN<small>设计与物</small></span><i>↓</i>' +
        '<span class="idea-cycle__node">WORLD<small>物与环境</small></span><i>↺</i></div>' +
        '<p class="idea-cycle__closing" aria-label="数字版编辑总结，非原书引句">我们设计什么，取决于我们相信什么。</p>' +
        '<p class="idea-cycle__end"><span>《设计艺术的含义》</span><strong>END</strong></p></div>';
    }

    if (!markup || main.querySelector(".chapter-experience" + (info.chapter ? "[data-chapter='" + info.chapter + "']" : ""))) return;
    var experience = document.createElement("section");
    experience.className = "chapter-experience book-motion-target";
    experience.dataset.chapter = info.chapter;
    experience.dataset.experience = info.chapter + (info.section || "-opening");
    experience.innerHTML = markup;

    if (placement === "end") {
      main.appendChild(experience);
    } else if (placementAfterText) {
      var paragraph = findParagraphContainingText(main, placementAfterText);
      if (paragraph) paragraph.insertAdjacentElement("afterend", experience);
      else {
        var fallbackHeading = main.querySelector("h1") || main.querySelector("h2");
        if (fallbackHeading) fallbackHeading.insertAdjacentElement("afterend", experience);
      }
    } else if (info.isChapterIndex) {
      var question = main.querySelector(".chapter-question");
      if (question) question.insertAdjacentElement("afterend", experience);
      else {
        var chapterCover = main.querySelector(".chapter-cover");
        var chapterGuide = main.querySelector(".chapter-guide, .chapter-map");
        if (chapterGuide) chapterGuide.insertAdjacentElement("afterend", experience);
        else if (chapterCover) chapterCover.insertAdjacentElement("afterend", experience);
        else {
          var chapterHeading = main.querySelector("h1");
          if (chapterHeading) chapterHeading.insertAdjacentElement("afterend", experience);
        }
      }
    } else {
      var heading = main.querySelector("h1") || main.querySelector("h2");
      if (heading) heading.insertAdjacentElement("afterend", experience);
    }
  }

  function setPressed(buttons, activeButton) {
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button === activeButton));
    });
  }

  function setupChapterExperiences() {
    document.querySelectorAll(".chapter-experience").forEach(function (experience) {
      if (experience.dataset.interactionReady) return;
      experience.dataset.interactionReady = "true";

      var natureNodes = Array.prototype.slice.call(experience.querySelectorAll("[data-nature-node]"));
      natureNodes.forEach(function (button) {
        button.addEventListener("click", function () {
          var wasExpanded = button.getAttribute("aria-expanded") === "true";
          natureNodes.forEach(function (node) { node.setAttribute("aria-expanded", "false"); });
          button.setAttribute("aria-expanded", String(!wasExpanded));
        });
      });

      var roleButtons = Array.prototype.slice.call(experience.querySelectorAll("[data-role-choice]"));
      if (roleButtons.length) {
        roleButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            setPressed(roleButtons, button);
            experience.querySelectorAll("[data-role-panel]").forEach(function (panel) {
              panel.hidden = panel.dataset.rolePanel !== button.dataset.roleChoice;
            });
          });
        });
      }

      var range = experience.querySelector(".design-spectrum__range");
      if (range) {
        var output = experience.querySelector(".design-spectrum__state");
        range.addEventListener("input", function () {
          var value = Number(range.value);
          experience.classList.toggle("leans-art", value > 57);
          experience.classList.toggle("leans-science", value < 43);
          var state = value < 43
            ? "ENGINEERING · FUNCTION · RATIONALITY"
            : value > 57
              ? "FORM · EXPRESSION · CULTURE"
              : "DESIGN · 科学与艺术的视角之间";
          range.setAttribute("aria-valuetext", state);
          if (output) output.textContent = state;
        });
      }

      var economyButtons = Array.prototype.slice.call(experience.querySelectorAll("[data-economy]"));
      var economyDetails = {
        market: ["市场", "竞争、需求与消费共同推动设计，也影响产品如何进入生活。"],
        enterprise: ["企业", "战略、品牌、组织与设计管理，把经营目标带入产品决策。"],
        society: ["社会", "文化与共同生活的变化，塑造产品的意义和设计面对的问题。"],
        institution: ["制度", "市场经济、计划经济与消费主义，构成不同的设计发展条件。"],
        consumer: ["消费者", "生活水平、购买能力与消费方式会改变需求。"],
        ecology: ["生态环境", "资源约束、环境保护与持续发展，要求重新判断设计价值。"]
      };
      function updateEconomy(button) {
        setPressed(economyButtons, button);
        var detail = economyDetails[button.dataset.economy];
        var host = experience.querySelector(".economy-map__detail");
        if (detail && host) {
          host.querySelector("strong").textContent = detail[0];
          host.querySelector("p").textContent = detail[1];
        }
      }
      economyButtons.forEach(function (button) {
        button.addEventListener("click", function () { updateEconomy(button); });
        button.addEventListener("mouseenter", function () { updateEconomy(button); });
        button.addEventListener("focus", function () { updateEconomy(button); });
      });

      var materialChoices = Array.prototype.slice.call(experience.querySelectorAll("[data-material]"));
      var materialDetails = {
        natural: ["NATURE · 自然材料", "木、石等自然材料与人的加工经验和情感关系密切。", ["手工加工", "触觉与温度", "材料肌理"], "chapter06/index.html"],
        industrial: ["INDUSTRY · 工业材料", "塑料改变加工方式，也带来新的表面体验和造型语言。", ["模具制造", "表面体验", "重量感", "造型语言"], "chapter06/01.html"],
        electronic: ["ELECTRONIC · 电子材料", "半导体文化把材料带入电子技术与新的视觉经验。", ["微观结构", "轻型化", "人与高技术"], "chapter06/02.html"],
        emerging: ["EMERGING · 新型材料", "基因材料与碳纳米管等设想，使材料认知走向微观和深入。", ["材料观念", "制造可能", "人与技术的关系"], "chapter06/04.html"]
      };
      materialChoices.forEach(function (button) {
        button.addEventListener("click", function () {
          setPressed(materialChoices, button);
          var detail = materialDetails[button.dataset.material];
          var host = experience.querySelector(".material-explorer__panel");
          if (detail && host) {
            host.querySelector("span").textContent = detail[0];
            host.querySelector("p").textContent = detail[1];
            var effectList = host.querySelector(".material-explorer__effects");
            if (effectList) {
              effectList.replaceChildren();
              detail[2].forEach(function (effect) {
                var item = document.createElement("li");
                item.textContent = effect;
                effectList.appendChild(item);
              });
            }
            host.querySelector("a").href = new URL("../" + detail[3], window.location.href).href;
          }
        });
      });

      var lifeChoices = Array.prototype.slice.call(experience.querySelectorAll("[data-life]"));
      var lifeDetails = {
        human: ["设计必须回应人的能力、需要与生活经验。", "chapter07/01.html"],
        object: ["产品进入生活后，会承载情感、思想与价值。", "chapter07/03.html"],
        family: ["家庭由大量产品组成，是一个完整的生活系统。", "chapter07/01.html"],
        machine: ["机器不只执行功能；人与机器的关系也可能带有生命感。", "chapter07/02.html"]
      };
      lifeChoices.forEach(function (button) {
        button.addEventListener("click", function () {
          setPressed(lifeChoices, button);
          var detail = lifeDetails[button.dataset.life];
          var host = experience.querySelector(".life-cycle__detail");
          if (detail && host) {
            host.querySelector("p").textContent = detail[0];
            host.querySelector("a").href = new URL("../" + detail[1], window.location.href).href;
            experience.querySelector(".life-cycle__diagram").dataset.focus = button.dataset.life;
          }
        });
      });

      var valueButtons = Array.prototype.slice.call(experience.querySelectorAll("[data-value-step]"));
      var valueDetails = {
        need: "富裕生活的讨论从不断提高的生活需要开始。",
        utility: "功能与使用仍是产品价值的基础。",
        desire: "高设计回应消费欲望，也让产品超出单一使用目的。",
        identity: "高档商品可以表达身份与个人爱好。",
        value: "高设计同时涉及文化价值与市场价值。"
      };
      valueButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          setPressed(valueButtons, button);
          var detail = experience.querySelector(".value-path__detail");
          if (detail) detail.textContent = valueDetails[button.dataset.valueStep] || "";
          experience.querySelectorAll(".value-path > i").forEach(function (arrow, index) {
            arrow.classList.toggle("is-passed", index < valueButtons.indexOf(button));
          });
        });
      });
    });
  }

  function setupPublicationMotion() {
    var main = mainRoot();
    var heading = main.querySelector(".designbook-page-heading");
    if (heading && !heading.dataset.motionReady) {
      heading.dataset.motionReady = "true";
      heading.classList.add("book-motion-target", "book-heading-motion");
    }

    var revealTargets = Array.prototype.slice.call(main.querySelectorAll(".book-motion-target, .chapter-map, .design-comparator"));
    main.querySelectorAll("p").forEach(function (paragraph) {
      if (paragraph.querySelector("img")) {
        paragraph.classList.add("book-image-reveal");
        revealTargets.push(paragraph);
      }
    });

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach(function (target) { target.classList.add("is-visible"); });
      return;
    }

    var observer = window.__designbookMotionObserver;
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      window.__designbookMotionObserver = observer;
    }
    revealTargets.forEach(function (target) {
      if (target.dataset.motionObserved) return;
      target.dataset.motionObserved = "true";
      target.classList.add("book-motion-target");
      observer.observe(target);
    });
  }

  function setupAnchorArrival() {
    function revealTarget(target, shouldScroll) {
      if (!target) return;
      var visibleTarget = target.closest("p, h1, h2, h3, blockquote, li") || target;
      if (shouldScroll) visibleTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      visibleTarget.classList.remove("book-anchor-arrival");
      void visibleTarget.offsetWidth;
      visibleTarget.classList.add("book-anchor-arrival");
      window.setTimeout(function () { visibleTarget.classList.remove("book-anchor-arrival"); }, 1500);
    }

    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href*='#']");
      if (!link) return;
      var url;
      try { url = new URL(link.href, document.baseURI); } catch (error) { return; }
      if (url.pathname !== window.location.pathname || !url.hash) return;
      var targetId;
      try { targetId = decodeURIComponent(url.hash.slice(1)); } catch (error) { targetId = url.hash.slice(1); }
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      if (window.history && window.history.pushState) {
        try { window.history.pushState(null, "", url.hash); } catch (error) { /* file:// may reject history updates */ }
      }
      revealTarget(target, true);
    });

    function revealInitialHash() {
      if (!window.location.hash) return;
      var targetId;
      try { targetId = decodeURIComponent(window.location.hash.slice(1)); } catch (error) { targetId = window.location.hash.slice(1); }
      var target = document.getElementById(targetId);
      if (target) window.setTimeout(function () { revealTarget(target, true); }, 90);
    }
    if (document.readyState === "complete") revealInitialHash();
    else window.addEventListener("load", revealInitialHash, { once: true });
  }

  function getAnchorLabel(anchor) {
    var clone = anchor.cloneNode(true);
    var number = clone.querySelector("strong");
    if (number) number.remove();
    return clone.textContent.replace(/\s+/g, " ").trim();
  }

  function addToolbarLabel(button, label) {
    if (!button || button.querySelector(".book-toolbar-label")) return;
    addText(button, "book-toolbar-label", label);
  }

  function setupToolbar() {
    var menu = document.getElementById("mdbook-menu-bar");
    if (!menu) return;

    var sidebarToggle = document.getElementById("mdbook-sidebar-toggle");
    var themeToggle = document.getElementById("mdbook-theme-toggle");
    var searchToggle = document.getElementById("mdbook-search-toggle");
    if (sidebarToggle) {
      sidebarToggle.title = "打开目录";
      sidebarToggle.setAttribute("aria-label", "打开目录");
    }
    if (themeToggle) {
      themeToggle.title = "切换主题";
      themeToggle.setAttribute("aria-label", "切换主题");
      addToolbarLabel(themeToggle, "Aa");
    }
    if (searchToggle) {
      searchToggle.title = "搜索全文（S 或 /）";
      searchToggle.setAttribute("aria-label", "搜索全文");
      addToolbarLabel(searchToggle, "搜索");
    }

    var left = menu.querySelector(".left-buttons");
    if (left && !left.querySelector(".book-gallery-link")) {
      var galleryButton = document.createElement("button");
      galleryButton.type = "button";
      galleryButton.className = "book-gallery-link";
      galleryButton.title = "打开图像档案";
      galleryButton.setAttribute("aria-label", "图库：图像档案");
      galleryButton.setAttribute("aria-haspopup", "true");
      galleryButton.setAttribute("aria-expanded", "false");
      galleryButton.setAttribute("aria-controls", "designbook-gallery-view");
      var galleryIcon = addText(galleryButton, "book-gallery-link__icon", "▦");
      galleryIcon.setAttribute("aria-hidden", "true");
      addText(galleryButton, "book-gallery-link__label", "图库");
      if (searchToggle && searchToggle.parentNode === left) searchToggle.insertAdjacentElement("afterend", galleryButton);
      else left.appendChild(galleryButton);
    }

    var right = menu.querySelector(".right-buttons");
    var print = right && right.querySelector('a[title="Print this book"], a[aria-label="Print this book"]');
    if (!right || !print || right.querySelector(".book-more")) return;

    var more = document.createElement("div");
    more.className = "book-more";
    var moreButton = document.createElement("button");
    moreButton.type = "button";
    moreButton.className = "book-more__button";
    moreButton.setAttribute("aria-label", "更多选项");
    moreButton.setAttribute("aria-expanded", "false");
    moreButton.textContent = "⋯";
    var moreMenu = document.createElement("div");
    moreMenu.className = "book-more__menu";
    moreMenu.hidden = true;
    print.textContent = "打印 / 导出";
    print.className = "book-more__print";
    moreMenu.appendChild(print);
    more.appendChild(moreButton);
    more.appendChild(moreMenu);
    right.appendChild(more);

    moreButton.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = !moreMenu.hidden;
      moreMenu.hidden = isOpen;
      moreButton.setAttribute("aria-expanded", String(!isOpen));
    });
    document.addEventListener("click", function () {
      moreMenu.hidden = true;
      moreButton.setAttribute("aria-expanded", "false");
    });
  }

  function setupGlobalViewLayers() {
    if (document.body.dataset.globalViewLayersReady) return;

    var searchToggle = document.getElementById("mdbook-search-toggle");
    var searchWrapper = document.getElementById("mdbook-search-wrapper");
    var searchInput = document.getElementById("mdbook-searchbar");
    var galleryButton = document.querySelector("#mdbook-menu-bar .book-gallery-link");
    var galleryApi = window.designbookGalleryView;
    if (!searchToggle || !searchWrapper || !galleryButton || !galleryApi) return;

    var state = window.designbookViewState || {};
    state.activeView = "reading";
    state.readingScrollPosition = window.scrollY || 0;
    if (typeof state.galleryScrollPosition !== "number") state.galleryScrollPosition = 0;
    window.designbookViewState = state;
    var pendingReadingPosition = null;
    document.body.dataset.globalViewLayersReady = "true";

    var searchPanel = searchWrapper.querySelector(".book-search-panel");
    if (!searchPanel) {
      searchPanel = document.createElement("section");
      searchPanel.className = "book-search-panel";
      searchPanel.setAttribute("role", "dialog");
      searchPanel.setAttribute("aria-modal", "true");
      searchPanel.setAttribute("aria-labelledby", "book-search-panel-title");

      var searchCloseButton = document.createElement("button");
      searchCloseButton.type = "button";
      searchCloseButton.className = "book-search-close";
      searchCloseButton.setAttribute("aria-label", "关闭搜索");
      searchCloseButton.textContent = "×";

      var searchHeading = document.createElement("div");
      searchHeading.className = "book-search-panel__heading";
      searchHeading.innerHTML = '<p class="book-search-panel__eyebrow">SEARCH · BOOK</p>' +
        '<h2 id="book-search-panel-title" class="book-search-panel__title">搜索全书</h2>' +
        '<p class="book-search-panel__hint">输入关键词，寻找章节、观点与图像说明。</p>' +
        '<p class="book-search-panel__examples">试试 <span>设计</span><span>自然</span><span>现代设计</span></p>';

      var searchEmpty = document.createElement("p");
      searchEmpty.className = "book-search-panel__empty";
      searchEmpty.textContent = "搜索结果会显示在这里，并保留章节、小节与匹配正文摘要。";

      var searchForm = searchWrapper.querySelector("#mdbook-searchbar-outer");
      var searchResults = searchWrapper.querySelector("#mdbook-searchresults-outer");
      searchPanel.appendChild(searchCloseButton);
      searchPanel.appendChild(searchHeading);
      if (searchForm) searchPanel.appendChild(searchForm);
      if (searchResults) searchPanel.appendChild(searchResults);
      searchPanel.appendChild(searchEmpty);
      searchWrapper.appendChild(searchPanel);
    }
    var searchClose = searchPanel.querySelector(".book-search-close");
    if (!searchClose) return;

    var galleryView = document.getElementById("designbook-gallery-view") || galleryApi.create();
    if (!galleryView.isConnected) document.body.appendChild(galleryView);
    var bookHeader = document.getElementById("mdbook-menu-bar");
    var bookHeaderParent = bookHeader && bookHeader.parentNode;
    var bookHeaderSlot = null;

    function placeHeaderAboveGallery() {
      if (!bookHeader || bookHeader.parentNode === document.body) return;
      bookHeaderSlot = document.createElement("div");
      bookHeaderSlot.className = "designbook-header-slot";
      bookHeaderSlot.setAttribute("aria-hidden", "true");
      bookHeaderParent.insertBefore(bookHeaderSlot, bookHeader);
      document.body.appendChild(bookHeader);
    }

    function restoreHeaderToBook() {
      if (!bookHeader || !bookHeaderParent || bookHeader.parentNode === bookHeaderParent) return;
      bookHeaderParent.insertBefore(bookHeader, bookHeaderSlot);
      if (bookHeaderSlot) bookHeaderSlot.remove();
      bookHeaderSlot = null;
    }

    function setHeaderState(view) {
      var searchActive = view === "search";
      var galleryActive = view === "gallery";
      searchToggle.classList.toggle("is-active", searchActive);
      searchToggle.setAttribute("aria-pressed", String(searchActive));
      galleryButton.classList.toggle("is-active", galleryActive);
      galleryButton.setAttribute("aria-expanded", String(galleryActive));
      galleryButton.setAttribute("aria-pressed", String(galleryActive));
      document.body.dataset.activeView = view;

      var status = document.querySelector("#mdbook-menu-bar .book-progress-label");
      if (!status) return;
      var statusChapter = status.querySelector(".book-progress-label__chapter");
      var statusDetail = status.querySelector(".book-progress-label__percent");
      if (!statusChapter || !statusDetail) return;
      if (searchActive) {
        statusChapter.textContent = "SEARCH";
        statusDetail.textContent = "";
      } else if (galleryActive) {
        statusChapter.textContent = "VISUAL ARCHIVE";
        statusDetail.textContent = "· " + (Array.isArray(window.designbookGalleryItems) ? window.designbookGalleryItems.length : 0);
      } else {
        statusChapter.textContent = getProgressLabel(getPageInfo());
        if (typeof window.designbookProgressUpdate === "function") window.designbookProgressUpdate();
      }
    }

    function enterLayer(view) {
      if (state.activeView === "reading") {
        state.readingScrollPosition = view === "search" && pendingReadingPosition !== null ?
          pendingReadingPosition : (window.scrollY || 0);
        pendingReadingPosition = null;
      }
      state.activeView = view;
      document.documentElement.classList.add("designbook-layer-open");
      setHeaderState(view);
    }

    function leaveLayer(restoreReadingPosition) {
      if (state.activeView === "reading") return;
      state.activeView = "reading";
      document.documentElement.classList.remove("designbook-layer-open");
      setHeaderState("reading");
      if (restoreReadingPosition !== false) {
        var position = state.readingScrollPosition || 0;
        window.requestAnimationFrame(function () { window.scrollTo(0, position); });
      }
    }

    function closeGallery(restoreReadingPosition, restoreFocus) {
      if (galleryView.hidden && state.activeView !== "gallery") return;
      galleryView.hidden = true;
      galleryView.setAttribute("aria-hidden", "true");
      document.body.classList.remove("designbook-gallery-open");
      restoreHeaderToBook();
      leaveLayer(restoreReadingPosition);
      if (restoreFocus !== false) galleryButton.focus();
    }

    function closeSearch(restoreReadingPosition, restoreFocus) {
      if (!searchWrapper.classList.contains("hidden")) searchToggle.click();
      syncSearchState(restoreReadingPosition);
      if (restoreFocus !== false && state.activeView === "reading") searchToggle.focus();
    }

    function updateSearchPanelState() {
      var hasQuery = !!(searchInput && searchInput.value.trim());
      searchPanel.classList.toggle("has-query", hasQuery);
      searchWrapper.setAttribute("aria-hidden", String(searchWrapper.classList.contains("hidden")));
    }

    function syncSearchState(restoreReadingPosition) {
      var searchOpen = !searchWrapper.classList.contains("hidden");
      updateSearchPanelState();
      if (searchOpen) {
        if (state.activeView === "gallery") closeGallery(false, false);
        if (state.activeView !== "search") enterLayer("search");
        if (window.scrollY !== state.readingScrollPosition) window.scrollTo(0, state.readingScrollPosition || 0);
        setHeaderState("search");
      } else if (state.activeView === "search") {
        leaveLayer(restoreReadingPosition);
      } else {
        setHeaderState(state.activeView || "reading");
      }
    }

    function openGallery() {
      if (state.activeView === "search") closeSearch(false, false);
      if (state.activeView === "gallery") return;
      galleryView.hidden = false;
      galleryView.setAttribute("aria-hidden", "false");
      galleryView.scrollTop = state.galleryScrollPosition || 0;
      galleryView.classList.toggle("is-scrolled", galleryView.scrollTop > 32);
      enterLayer("gallery");
      document.body.classList.add("designbook-gallery-open");
      placeHeaderAboveGallery();
      var returnButton = galleryView.querySelector(".book-gallery-view__return");
      if (returnButton) {
        try { returnButton.focus({ preventScroll: true }); }
        catch (error) { returnButton.focus(); }
      }
    }

    galleryApi.mount(galleryView, {
      resolveHref: resolveBookHref,
      onClose: function () { closeGallery(true, true); },
      onSourceNavigate: function () { closeGallery(false, false); }
    });

    galleryView.addEventListener("scroll", function () {
      state.galleryScrollPosition = galleryView.scrollTop;
      galleryView.classList.toggle("is-scrolled", galleryView.scrollTop > 32);
    }, { passive: true });

    galleryButton.addEventListener("click", function () {
      if (state.activeView === "gallery") {
        closeGallery(true, true);
        return;
      }
      if (state.activeView === "search") closeSearch(false, false);
      openGallery();
    });

    document.querySelectorAll("[data-book-gallery-entry]").forEach(function (entry) {
      entry.addEventListener("click", function () { galleryButton.click(); });
    });

    searchToggle.addEventListener("click", function () {
      if (state.activeView === "reading") pendingReadingPosition = window.scrollY || 0;
      else if (state.activeView === "gallery") pendingReadingPosition = state.readingScrollPosition || 0;
    }, true);
    searchToggle.addEventListener("click", function () {
      if (state.activeView === "gallery") closeGallery(false, false);
      window.setTimeout(function () { syncSearchState(true); }, 0);
    });
    searchClose.addEventListener("click", function () { closeSearch(true, true); });
    if (searchInput) searchInput.addEventListener("input", updateSearchPanelState);
    searchWrapper.addEventListener("click", function (event) {
      if (event.target === searchWrapper) closeSearch(true, true);
    });

    var searchObserver = new MutationObserver(function () { syncSearchState(true); });
    searchObserver.observe(searchWrapper, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("click", function (event) {
      var resultLink = event.target.closest && event.target.closest("#mdbook-searchresults a[href]");
      if (resultLink && state.activeView === "search") closeSearch(false, false);
    }, true);

    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var isSearchShortcut = (event.key.toLowerCase() === "s" || event.key === "/") &&
        !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
      if (isSearchShortcut) {
        if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
        var viewer = galleryView.querySelector("#archive-viewer");
        if (state.activeView === "gallery" && viewer && !viewer.hidden) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        if (state.activeView !== "search") searchToggle.click();
        window.setTimeout(function () { if (searchInput) searchInput.focus(); }, 0);
        return;
      }
      if (event.key !== "Escape") return;
      if (state.activeView === "gallery") {
        var viewer = galleryView.querySelector("#archive-viewer");
        if (viewer && !viewer.hidden) return;
        event.preventDefault();
        closeGallery(true, true);
      } else if (state.activeView === "search") {
        event.preventDefault();
        closeSearch(true, true);
      }
    }, true);

    galleryView.hidden = true;
    galleryView.setAttribute("aria-hidden", "true");
    if (searchInput) searchInput.setAttribute("aria-label", "搜索书中内容");
    syncSearchState(true);
  }

  function isBookHomeHref(href) {
    if (!href) return false;
    try {
      var path = new URL(href, document.baseURI).pathname.replace(/\\/g, "/");
      return /\/index\.html$/.test(path) && !/\/chapter\d{2}\/index\.html$/.test(path);
    } catch (error) {
      return /(?:^|\/)index\.html$/.test(href) && !/chapter\d{2}\/index\.html$/.test(href);
    }
  }

  function enhanceSidebar() {
    var sidebar = document.getElementById("mdbook-sidebar");
    if (!sidebar) return;
    var scrollbox = sidebar.querySelector(".sidebar-scrollbox");
    if (!scrollbox) return;

    // mdBook adds the current page's h2/h3 tree as a third level. Since every
    // section already has its own Summary entry, that tree only duplicates it.
    sidebar.querySelectorAll(".on-this-page").forEach(function (node) {
      node.remove();
    });

    var seenDestinations = Object.create(null);
    scrollbox.querySelectorAll("ol.chapter a:not(.header-in-summary)").forEach(function (link) {
      var destination = getBookPagePath(link.href) + (link.hash || "");
      if (!destination || !seenDestinations[destination]) {
        seenDestinations[destination] = true;
        return;
      }
      var item = link.closest("li");
      if (item) item.remove();
    });

    if (!scrollbox.querySelector(".designbook-sidebar-heading")) {
      var sidebarHeading = document.createElement("div");
      sidebarHeading.className = "designbook-sidebar-heading";
      sidebarHeading.innerHTML = "<span>CONTENTS</span><span>目录</span>";
      scrollbox.insertBefore(sidebarHeading, scrollbox.firstChild);
    }

    var topItems = scrollbox.querySelectorAll("ol.chapter > li");
    topItems.forEach(function (item) {
      var anchor = item.querySelector(":scope > .chapter-link-wrapper > a");
      if (!anchor) return;
      var href = anchor.getAttribute("href") || "";
      var label = getAnchorLabel(anchor);
      var chapterMatch = href.match(/chapter(\d{2})\/index\.html/);

      if (chapterMatch) {
        item.classList.add("designbook-chapter-item");
        if (!anchor.dataset.designbookChapter) {
          anchor.dataset.designbookChapter = chapterMatch[1];
          anchor.innerHTML = "";
          addText(anchor, "nav-chapter-number", chapterMatch[1]);
          addText(anchor, "nav-chapter-title", label.replace(/^第[一二三四五六七八九十]+章\s*/, ""));
        }

        item.querySelectorAll("ol.section > li").forEach(function (sectionItem) {
          var sectionAnchor = sectionItem.querySelector(":scope > .chapter-link-wrapper > a");
          if (!sectionAnchor) return;
          sectionItem.classList.add("designbook-section-item");
          if (!sectionAnchor.dataset.designbookSection) {
            var sectionLabel = getAnchorLabel(sectionAnchor);
            sectionAnchor.dataset.designbookSection = "true";
            sectionAnchor.innerHTML = "";
            addText(sectionAnchor, "nav-section-title", sectionLabel.replace(/^第[一二三四五六七八九十]+节\s*/, ""));
          }
        });
      } else {
        item.classList.add("designbook-meta-item");
        if (!anchor.dataset.designbookMeta) {
          anchor.dataset.designbookMeta = "true";
          anchor.innerHTML = "";
          addText(anchor, "nav-meta-title", label);
        }
      }
    });
  }

  function setupSidebarScrollSpy() {
    var sidebar = document.getElementById("mdbook-sidebar");
    if (!sidebar || sidebar.dataset.designbookScrollSpy) return;

    var links = Array.prototype.slice.call(
      sidebar.querySelectorAll(".designbook-section-item .chapter-link-wrapper > a")
    );
    var currentPath = getBookPagePath(window.location.href);
    var currentLinks = links.filter(function (link) {
      return getBookPagePath(link.href) === currentPath;
    });
    if (!currentLinks.length) return;

    sidebar.dataset.designbookScrollSpy = "true";
    var headings = Array.prototype.slice.call(mainRoot().querySelectorAll("h2, h3, h4"));

    function update() {
      var marker = window.scrollY + window.innerHeight * 0.28;
      var active = currentLinks[0];
      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top + window.scrollY > marker) return;
        var target = heading.id && links.find(function (link) {
          return getBookPagePath(link.href) === currentPath && link.hash === "#" + heading.id;
        });
        if (target) active = target;
      });
      links.forEach(function (link) { link.classList.remove("scrollspy-active"); });
      active.classList.add("scrollspy-active");
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function addChapterMap(info) {
    if (!info.isChapterIndex) return;
    var main = mainRoot();
    if (main.querySelector(".chapter-map, .chapter-guide")) return;

    var chapterItem = null;
    document.querySelectorAll("#mdbook-sidebar .designbook-chapter-item").forEach(function (item) {
      var anchor = item.querySelector(":scope > .chapter-link-wrapper > a");
      if (anchor && anchor.dataset.designbookChapter === info.chapter) chapterItem = item;
    });
    if (!chapterItem) return;

    var links = chapterItem.querySelectorAll("ol.section .designbook-section-item a");
    if (!links.length) return;

    var map = document.createElement("nav");
    var isChapterThree = info.chapter === "03";
    map.className = isChapterThree ? "chapter-guide book-motion-target" : "chapter-map";
    if (info.chapter === "02") map.id = "chapter02-guide";
    map.setAttribute("aria-label", "本章小节导航");
    var eyebrow = document.createElement("div");
    eyebrow.className = isChapterThree ? "chapter-guide__eyebrow" : "chapter-map__eyebrow";
    eyebrow.textContent = isChapterThree ? "IN THIS CHAPTER" : "CHAPTER " + info.chapter + " · MAP";
    var title = document.createElement("div");
    title.className = isChapterThree ? "chapter-guide__title" : "chapter-map__title";
    title.textContent = isChapterThree ? "本章导读" : "本章小节 · 选择一个入口开始阅读";
    var track = document.createElement("div");
    track.className = isChapterThree ? "chapter-guide__track" : "chapter-map__track";
    var descriptions = chapterSectionDescriptions[info.chapter] || [];

    links.forEach(function (link, index) {
      var item = document.createElement("a");
      item.className = isChapterThree ? "chapter-guide__item" : "chapter-map__item";
      item.href = link.href;
      var number = document.createElement("span");
      number.className = isChapterThree ? "chapter-guide__number" : "chapter-map__dot";
      number.textContent = String(index + 1).padStart(2, "0");
      var label = document.createElement("span");
      label.className = isChapterThree ? "chapter-guide__label" : "chapter-map__label";
      label.textContent = getAnchorLabel(link);
      var description = document.createElement("span");
      description.className = isChapterThree ? "chapter-guide__description" : "chapter-map__description";
      description.textContent = descriptions[index] || "沿着本章继续阅读";
      item.appendChild(number);
      item.appendChild(label);
      item.appendChild(description);
      track.appendChild(item);
    });

    map.appendChild(eyebrow);
    map.appendChild(title);
    map.appendChild(track);
    var heading = main.querySelector("h1") || main.querySelector("h2");
    if (heading) {
      var chapterCover = main.querySelector(".chapter-cover");
      if (chapterCover) {
        chapterCover.insertAdjacentElement("afterend", map);
      } else if (isChapterThree) {
        var directChildren = Array.prototype.slice.call(main.children);
        var intro = directChildren.filter(function (child) {
          return child.tagName === "P" && !child.querySelector("img") && !child.classList.contains("chapter-question");
        })[0];
        var hero = main.querySelector(".editorial-chapter-hero");
        if (intro) intro.insertAdjacentElement("afterend", map);
        else if (hero) hero.insertAdjacentElement("afterend", map);
        else heading.insertAdjacentElement("afterend", map);
      } else {
        heading.insertAdjacentElement("afterend", map);
      }
      var firstImage = main.querySelector("img");
      var hero = firstImage && firstImage.closest("p");
      if (hero && info.chapter !== "02") hero.classList.add("chapter-hero");
    }
  }

  function getNavigationLink(kind) {
    var link = document.querySelector('.nav-wide-wrapper a[rel~="' + kind + '"]') ||
      document.querySelector('.nav-wrapper a[rel~="' + kind + '"]');
    if (kind === "prev" && link && isBookHomeHref(link.href)) return null;
    return link;
  }

  function setupKeyboardPageNavigation() {
    if (document.body.dataset.designbookKeyboardNavigation) return;
    var info = getPageInfo();
    var previousHref = null;
    var nextHref = null;
    var sections = getReadingSections();
    var isReadingPage = !!(info.section || info.isChapterIndex || info.isPreface || info.isReferences);
    if (isReadingPage && sections.length) {
      var navigationData = getFooterNavigationData(info, sections);
      previousHref = navigationData.previous && navigationData.previous.href;
      nextHref = (navigationData.next && navigationData.next.href) || navigationData.completeHref;
    } else {
      var previous = getNavigationLink("prev");
      var next = getNavigationLink("next");
      previousHref = previous && previous.href;
      nextHref = next && next.href;
    }
    document.body.dataset.designbookKeyboardNavigation = "true";

    document.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (window.designbookViewState && window.designbookViewState.activeView !== "reading") return;
      if (window.search && typeof window.search.hasFocus === "function" && window.search.hasFocus()) return;
      var target = event.target;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName))) return;

      var isRight = event.key === "ArrowRight";
      var isLeft = event.key === "ArrowLeft";
      if (!isRight && !isLeft) return;
      var forward = document.documentElement.dir === "rtl" ? isLeft : isRight;
      var destination = forward ? nextHref : previousHref;
      if (!destination) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = destination;
    });
  }

  function removeDefaultPageNavigation() {
    document.querySelectorAll(".nav-wide-wrapper, .nav-wrapper").forEach(function (navigation) {
      navigation.remove();
    });
  }

  function getSidebarLabel(href) {
    if (!href) return "";
    var target;
    try {
      target = new URL(href, document.baseURI).href;
    } catch (error) {
      target = href;
    }
    var links = document.querySelectorAll("#mdbook-sidebar a");
    for (var index = 0; index < links.length; index += 1) {
      var link = links[index];
      var linkUrl;
      try {
        linkUrl = new URL(link.href, document.baseURI).href;
      } catch (error) {
        linkUrl = link.href;
      }
      if (linkUrl === target) {
        var chapterTitle = link.querySelector(".nav-chapter-title");
        var chapterNumber = link.querySelector(".nav-chapter-number");
        if (chapterTitle) {
          return (chapterNumber ? chapterNumber.textContent.trim() + " " : "") + chapterTitle.textContent.trim();
        }
        var sectionTitle = link.querySelector(".nav-section-title, .nav-meta-title");
        return sectionTitle ? sectionTitle.textContent.trim() : getAnchorLabel(link);
      }
    }
    return "";
  }

  function getBookPagePath(href) {
    try {
      return new URL(href, document.baseURI).pathname.replace(/\\/g, "/");
    } catch (error) {
      return String(href || "").split("#")[0].replace(/\\/g, "/");
    }
  }

  function getFooterEditorialNote(target) {
    if (!target) return null;
    if (target.type === "cover") {
      return {
        question: "从哪里开始阅读全书？",
        summary: "返回书籍首页，查看封面信息与全书章节入口。"
      };
    }
    var notes = window.designbookSectionNotes;
    if (!notes) return null;
    var path = getBookPagePath(target.href);
    var match = path.match(/(?:^|\/)((?:preface|chapter\d{2}\/(?:index|\d{2}))\.html)$/i);
    var key = match ? "/" + match[1] : path;
    return notes[key] || null;
  }

  function getBookPages() {
    var pages = [];
    var seen = {};
    document.querySelectorAll("#mdbook-sidebar a").forEach(function (link) {
      if (link.classList.contains("header-in-summary")) return;
      var path = getBookPagePath(link.href);
      if (!/\.html$/.test(path) || seen[path]) return;
      seen[path] = true;
      pages.push({ path: path, href: link.href, label: getSidebarLabel(link.href) });
    });
    return pages;
  }

  function getBookRootHref() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var relativeRoot = /\/chapter\d{2}\//.test(path) ? "../" : "./";
    return new URL(relativeRoot, window.location.href).href;
  }

  function resolveBookHref(path) {
    return new URL(String(path || "").replace(/^\/+/, ""), getBookRootHref()).href;
  }

  function getReadingSections() {
    var generated = window.designbookReadingSections;
    if (Array.isArray(generated) && generated.length) {
      return generated.map(function (section) {
        var href = resolveBookHref(section.href);
        return {
          type: "section",
          chapter: String(section.chapter).padStart(2, "0"),
          chapterTitle: section.chapterTitle || "",
          section: String(section.section).padStart(2, "0"),
          sectionTitle: section.sectionTitle || "",
          path: getBookPagePath(href),
          href: href
        };
      }).filter(function (section) { return section.path && section.chapterTitle && section.sectionTitle; });
    }

    // Fallback to the generated mdBook sidebar if the optional manifest is unavailable.
    return getBookPages().map(function (page) {
      var match = page.path.match(/(?:^|\/)chapter(\d{2})\/(\d{2})\.html$/i);
      if (!match) return null;
      return {
        type: "section",
        chapter: match[1],
        chapterTitle: getChapterTitle(match[1], []),
        section: match[2],
        sectionTitle: page.label.replace(/^第[一二三四五六七八九十]+节\s*/, ""),
        path: page.path,
        href: page.href
      };
    }).filter(function (section) { return section && section.chapterTitle && section.sectionTitle; });
  }

  function getChapterTitle(chapter, sections) {
    var chapterAnchor = document.querySelector(
      '#mdbook-sidebar .designbook-chapter-item a[data-designbook-chapter="' + chapter + '"]'
    );
    var sidebarTitle = chapterAnchor && chapterAnchor.querySelector(".nav-chapter-title");
    if (sidebarTitle && sidebarTitle.textContent.trim()) return sidebarTitle.textContent.trim();
    var firstSection = (sections || []).find(function (section) { return section.chapter === chapter; });
    return firstSection ? firstSection.chapterTitle : "";
  }

  function getPrefaceTarget() {
    var href = resolveBookHref("preface.html");
    return {
      type: "preface",
      chapterTitle: "前言",
      sectionTitle: "前言",
      path: getBookPagePath(href),
      href: href
    };
  }

  function getCoverTarget() {
    var href = resolveBookHref("index.html");
    return {
      type: "cover",
      chapterTitle: "设计艺术的含义",
      sectionTitle: "设计艺术的含义",
      path: getBookPagePath(href),
      href: href
    };
  }

  function getFooterNavigationData(info, sections) {
    var previous = null;
    var next = null;
    var currentSectionIndex = sections.findIndex(function (section) {
      return section.path === getBookPagePath(window.location.href);
    });

    if (info.section && currentSectionIndex >= 0) {
      previous = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : getPrefaceTarget();
      next = currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;
    } else if (info.isChapterIndex) {
      var firstInChapter = sections.findIndex(function (section) { return section.chapter === info.chapter; });
      if (firstInChapter >= 0) {
        previous = firstInChapter > 0 ? sections[firstInChapter - 1] : getPrefaceTarget();
        next = sections[firstInChapter];
      }
    } else if (info.isPreface) {
      previous = getCoverTarget();
      next = sections[0] || null;
    } else if (info.isReferences) {
      previous = sections.length ? sections[sections.length - 1] : null;
    }

    var chapterTitle = info.chapter ? getChapterTitle(info.chapter, sections) : "";
    var eyebrow = info.chapter ? "CHAPTER " + info.chapter : (info.isPreface ? "PREFACE" : "REFERENCES");
    var currentTitle = chapterTitle || (info.isPreface ? "前言" : (info.isReferences ? "参考文献" : ""));

    return {
      previous: previous,
      next: next,
      eyebrow: eyebrow,
      currentTitle: currentTitle,
      isReferences: !!info.isReferences,
      completeHref: !next && !info.isPreface ? resolveBookHref("index.html") : null
    };
  }

  function getProgressLabel(info) {
    if (info.isHome) return "全书";
    if (info.isPreface) return "PREFACE";
    if (info.isReferences) return "REFERENCES";
    if (info.chapter) {
      var chapterAnchor = document.querySelector(
        '#mdbook-sidebar .designbook-chapter-item a[data-designbook-chapter="' + info.chapter + '"]'
      );
      var title = chapterAnchor && chapterAnchor.querySelector(".nav-chapter-title");
      return info.chapter + " · " + (title ? title.textContent.trim() : "CHAPTER");
    }
    return "全书";
  }

  function renderFooterNavigation(data) {
    var navigation = document.createElement("nav");
    navigation.className = "book-footer-nav";
    navigation.setAttribute("aria-label", "上节回顾、当前位置和下节预告");

    function makeEmptySlot(className) {
      var empty = document.createElement("span");
      empty.className = className + " is-empty";
      empty.setAttribute("aria-hidden", "true");
      return empty;
    }

    function makeTargetCard(target, direction) {
      if (!target) return null;
      var isPrevious = direction === "previous";
      var card = document.createElement("a");
      card.className = isPrevious ? "footer-prev" : "footer-next";
      card.href = target.href;
      var directionText = isPrevious
        ? (target.type === "cover" ? "← 返回封面" : (target.type === "preface" ? "← 返回前言" : (target.type === "chapter" ? "← 上一章" : "← 上一节")))
        : (target.type === "chapter" ? "下一章 →" : "下一节 →");
      addText(card, "footer-nav-label", directionText);
      addText(card, "footer-nav-title", target.sectionTitle || target.chapterTitle || "继续阅读");

      var note = getFooterEditorialNote(target);
      if (note) {
        addText(card, "footer-card-kicker", target.type === "cover" ? "BOOK HOME" : (isPrevious ? "PREVIOUS RECAP" : "NEXT PREVIEW"));
        addText(card, "footer-preview-question", note.question);
        addText(card, "footer-preview-text", note.summary);
      }
      return card;
    }

    var previousCard = makeTargetCard(data.previous, "previous") || makeEmptySlot("footer-prev");
    var current = document.createElement("div");
    current.className = "footer-current";
    addText(current, "footer-chapter-eyebrow", data.eyebrow);
    addText(current, "footer-chapter-title", data.currentTitle);

    var nextCard = makeTargetCard(data.next, "next");
    if (!nextCard && data.completeHref) {
      nextCard = document.createElement("a");
      nextCard.className = "footer-next footer-next--complete";
      nextCard.href = data.completeHref;
      addText(nextCard, "footer-nav-label", "阅读完成");
      addText(nextCard, "footer-nav-title", "返回本书顶部 →");
      if (data.isReferences) {
        addText(nextCard, "footer-card-kicker", "BOOK NAVIGATION");
        addText(nextCard, "footer-preview-question", "还要从哪一章继续阅读？");
        addText(nextCard, "footer-preview-text", "返回书籍首页，从封面或章节目录重新选择阅读入口。");
      } else {
        var finalNote = getFooterEditorialNote(sections[sections.length - 1]);
        if (finalNote) {
          addText(nextCard, "footer-card-kicker", "FINAL REFLECTION");
          addText(nextCard, "footer-preview-question", finalNote.question);
          addText(nextCard, "footer-preview-text", finalNote.summary);
        }
      }
    }
    if (!nextCard) nextCard = makeEmptySlot("footer-next");

    navigation.appendChild(previousCard);
    navigation.appendChild(current);
    navigation.appendChild(nextCard);
    return navigation;
  }

  function addBottomNavigation(info) {
    var isReadingPage = !!(info.section || info.isChapterIndex || info.isPreface || info.isReferences);
    if (!isReadingPage || document.querySelector(".book-footer-nav")) return;
    var sections = getReadingSections();
    if (!sections.length) return;
    var data = getFooterNavigationData(info, sections);
    var navigation = renderFooterNavigation(data);
    var main = mainRoot();
    var wrapper = document.querySelector("#mdbook-content .nav-wrapper");
    if (wrapper) wrapper.parentNode.insertBefore(navigation, wrapper);
    else main.insertAdjacentElement("afterend", navigation);
  }

  function isCaptionText(value) {
    var text = (value || "").replace(/\s+/g, " ").trim();
    return text && text.length <= 60 && !/[。！？；!?;]/.test(text) && (text.match(/[，,]/g) || []).length < 2 && !/[：,.:]$/.test(text);
  }

  function normalizeFigureOrder() {
    var main = mainRoot();
    main.querySelectorAll("p").forEach(function (paragraph) {
      if (!paragraph.querySelector("img")) return;

      var directTextNodes = [];
      var directBreaks = [];
      var directText = "";
      Array.prototype.forEach.call(paragraph.childNodes, function (node) {
        if (node.nodeType === 3) {
          directTextNodes.push(node);
          directText += " " + node.nodeValue;
        } else if (node.nodeType === 1 && node.tagName === "BR") {
          directBreaks.push(node);
        }
      });

      if (isCaptionText(directText) && !paragraph.querySelector(".figure-caption-inline")) {
        var media = paragraph.querySelector("label.checkbox-label") || paragraph.querySelector("img");
        directTextNodes.forEach(function (node) { node.remove(); });
        directBreaks.forEach(function (node) { node.remove(); });
        var inlineCaption = document.createElement("span");
        inlineCaption.className = "figure-caption-inline";
        inlineCaption.textContent = directText.replace(/\s+/g, " ").trim();
        media.insertAdjacentElement("afterend", inlineCaption);
      }

      var previous = paragraph.previousElementSibling;
      if (!paragraph.querySelector(".figure-caption-inline") && previous && previous.tagName === "P" && !previous.querySelector("img") && !previous.classList.contains("figure-caption") &&
        isCaptionText(previous.textContent)) {
        paragraph.parentNode.insertBefore(paragraph, previous);
        previous.classList.add("figure-caption");
      }
    });

    var figureCaptions = Array.prototype.slice.call(main.querySelectorAll(".figure-caption-inline, p.figure-caption"));
    figureCaptions.forEach(function (caption, index) {
      if (caption.querySelector(".figure-caption__number")) return;
      var number = document.createElement("span");
      number.className = "figure-caption__number";
      number.textContent = "FIG. " + String(index + 1).padStart(2, "0");
      caption.insertBefore(number, caption.firstChild);
    });
  }

  function setupDesignComparator() {
    var root = document.getElementById("design-definitions");
    if (!root || root.dataset.ready) return;
    var definitionsSummary = findParagraphContainingText(mainRoot(), "趋向于对整个“人为世界”");
    if (definitionsSummary) {
      definitionsSummary.insertAdjacentElement("afterend", root);
      root.dataset.placement = "after-definitions";
    }
    root.dataset.ready = "true";

    var categoryHost = root.querySelector(".design-comparator__categories");
    var card = root.querySelector(".design-comparator__card");
    var compareToggle = root.querySelector(".design-comparator__compare-toggle");
    var tableWrap = root.querySelector(".design-comparator__table-wrap");
    if (!categoryHost || !card) return;

    var categories = [];
    designDefinitions.forEach(function (definition) {
      if (categories.indexOf(definition.category) < 0) categories.push(definition.category);
    });
    var categoryButtons = [];
    var renderTimer = 0;

    function makeText(tag, className, value) {
      var element = document.createElement(tag);
      element.className = className;
      element.textContent = value;
      return element;
    }

    function getCategoryDefinitions(category) {
      return designDefinitions.filter(function (item) { return item.category === category; });
    }

    function renderDefinition(definition, animate) {
      if (!definition) return;
      categoryButtons.forEach(function (button) {
        var selected = button.dataset.category === definition.category;
        button.setAttribute("aria-pressed", String(selected));
      });

      if (animate) {
        card.classList.add("is-changing");
        window.clearTimeout(renderTimer);
        renderTimer = window.setTimeout(function () {
          populateCard(definition);
          card.classList.remove("is-changing");
        }, 180);
      } else {
        populateCard(definition);
      }
    }

    function populateCard(definition) {
      card.replaceChildren();
      var group = getCategoryDefinitions(definition.category);
      if (group.length > 1) {
        var variants = document.createElement("div");
        variants.className = "design-comparator__variants";
        variants.setAttribute("aria-label", "此视角下的理论家");
        group.forEach(function (item) {
          var variant = document.createElement("button");
          variant.type = "button";
          variant.className = "design-comparator__variant" + (item.id === definition.id ? " is-active" : "");
          variant.textContent = item.author;
          variant.setAttribute("aria-pressed", String(item.id === definition.id));
          variant.addEventListener("click", function () { renderDefinition(item, true); });
          variants.appendChild(variant);
        });
        card.appendChild(variants);
      }

      var identity = document.createElement("div");
      identity.className = "design-comparator__identity";
      identity.appendChild(makeText("p", "design-comparator__author", definition.author));
      if (definition.authorCN) identity.appendChild(makeText("p", "design-comparator__author-cn", definition.authorCN));
      card.appendChild(identity);

      var quote = makeText("blockquote", "design-comparator__quote", "“" + definition.quote + "”");
      card.appendChild(quote);

      var focus = document.createElement("div");
      focus.className = "design-comparator__focus";
      focus.appendChild(makeText("span", "design-comparator__label", "核心视角"));
      focus.appendChild(makeText("p", "design-comparator__focus-text", definition.focus));
      card.appendChild(focus);

      var keywordBlock = document.createElement("div");
      keywordBlock.className = "design-comparator__keywords";
      keywordBlock.appendChild(makeText("span", "design-comparator__label", "KEYWORDS"));
      var keywordList = document.createElement("div");
      keywordList.className = "design-comparator__keyword-list";
      definition.keywords.forEach(function (keyword) {
        keywordList.appendChild(makeText("span", "design-comparator__keyword", keyword));
      });
      keywordBlock.appendChild(keywordList);
      card.appendChild(keywordBlock);

      var summary = document.createElement("div");
      summary.className = "design-comparator__summary";
      summary.appendChild(makeText("span", "design-comparator__label", "本书如何理解"));
      summary.appendChild(makeText("p", "design-comparator__summary-text", definition.summary));
      card.appendChild(summary);

      var footer = document.createElement("div");
      footer.className = "design-comparator__card-footer";
      footer.appendChild(makeText("span", "design-comparator__source", definition.source));
      var read = makeText("button", "design-comparator__read", "阅读原文 ↑");
      read.type = "button";
      read.addEventListener("click", function () {
        var anchor = document.getElementById(definition.anchor);
        if (!anchor) return;
        var anchorParagraph = anchor.closest("p");
        var target = anchorParagraph || anchor;
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.remove("definition-highlight");
        void target.offsetWidth;
        target.classList.add("definition-highlight");
        window.setTimeout(function () { target.classList.remove("definition-highlight"); }, 1500);
      });
      footer.appendChild(read);
      card.appendChild(footer);
    }

    categories.forEach(function (category) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "design-comparator__category";
      button.dataset.category = category;
      button.textContent = category;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", function () {
        renderDefinition(getCategoryDefinitions(category)[0], true);
      });
      categoryButtons.push(button);
      categoryHost.appendChild(button);
    });

    if (compareToggle && tableWrap) {
      compareToggle.addEventListener("click", function () {
        var expanded = compareToggle.getAttribute("aria-expanded") === "true";
        compareToggle.setAttribute("aria-expanded", String(!expanded));
        compareToggle.innerHTML = expanded ? '比较观点 <span aria-hidden="true">＋</span>' : '收起比较 <span aria-hidden="true">−</span>';
        tableWrap.hidden = expanded;
      });
    }

    renderDefinition(designDefinitions[0], false);
  }

  function setupCommandPalette() {
    var searchToggle = document.getElementById("mdbook-search-toggle");
    var searchInput = document.getElementById("mdbook-searchbar");
    if (!searchToggle) return;
    if (searchInput) searchInput.placeholder = "搜索书中内容…";
    if (document.body.dataset.commandPaletteReady) return;
    document.body.dataset.commandPaletteReady = "true";

    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (event.target.closest && event.target.closest("#designbook-gallery-view")) return;
        event.preventDefault();
        searchToggle.click();
        window.setTimeout(function () {
          var input = document.getElementById("mdbook-searchbar");
          if (input) input.focus();
        }, 0);
      }
    });
  }

  function setupReadingProgress(info) {
    var bar = document.getElementById("book-reading-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "book-reading-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
    }

    var right = document.querySelector("#mdbook-menu-bar .right-buttons");
    var label = right && right.querySelector(".book-progress-label");
    if (right && !label) {
      label = document.createElement("span");
      label.className = "book-progress-label";
      right.insertBefore(label, right.firstChild);
    }
    var chapterLabel = null;
    var percentLabel = null;
    if (label) {
      if (!label.querySelector(".book-progress-label__chapter")) {
        label.textContent = "";
        chapterLabel = document.createElement("span");
        chapterLabel.className = "book-progress-label__chapter";
        percentLabel = document.createElement("span");
        percentLabel.className = "book-progress-label__percent";
        label.appendChild(chapterLabel);
        label.appendChild(percentLabel);
      } else {
        chapterLabel = label.querySelector(".book-progress-label__chapter");
        percentLabel = label.querySelector(".book-progress-label__percent");
      }
      label.style.display = "inline-flex";
      label.title = "全书阅读进度";
      label.setAttribute("aria-label", "全书阅读进度");
    }

    var pageLabel = getProgressLabel(info);
    var previousPageLabel = "";
    try {
      previousPageLabel = window.sessionStorage.getItem("designbook-previous-page-label") || "";
      window.sessionStorage.setItem("designbook-previous-page-label", pageLabel);
    } catch (error) { /* file:// storage may be disabled; the reading UI still works. */ }
    if (chapterLabel && previousPageLabel && previousPageLabel !== pageLabel) {
      chapterLabel.textContent = previousPageLabel;
      chapterLabel.classList.add("is-visible");
      window.requestAnimationFrame(function () {
        chapterLabel.classList.add("is-leaving");
        window.setTimeout(function () {
          chapterLabel.textContent = pageLabel;
          chapterLabel.classList.remove("is-leaving");
          chapterLabel.classList.add("is-arriving");
          window.setTimeout(function () { chapterLabel.classList.remove("is-arriving"); }, 220);
        }, 120);
      });
    } else if (chapterLabel) {
      chapterLabel.textContent = pageLabel;
      chapterLabel.classList.add("is-visible");
    }

    function update() {
      var activeView = window.designbookViewState && window.designbookViewState.activeView;
      if (activeView === "search") {
        bar.style.transform = "scaleX(0)";
        if (chapterLabel) chapterLabel.textContent = "SEARCH";
        if (percentLabel) percentLabel.textContent = "";
        return;
      }
      if (activeView === "gallery") {
        bar.style.transform = "scaleX(0)";
        if (chapterLabel) chapterLabel.textContent = "VISUAL ARCHIVE";
        if (percentLabel) percentLabel.textContent = "· " + (Array.isArray(window.designbookGalleryItems) ? window.designbookGalleryItems.length : 0);
        return;
      }
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var localRatio = total > 0 ? window.scrollY / total : 0;
      localRatio = Math.max(0, Math.min(1, localRatio));
      var pages = getBookPages();
      var currentPath = getBookPagePath(window.location.href);
      var pageIndex = pages.findIndex(function (page) { return page.path === currentPath; });
      var overallRatio = localRatio;
      if (pages.length > 1 && pageIndex >= 0) {
        overallRatio = (pageIndex + localRatio) / (pages.length - 1);
      }
      var percent = Math.round(overallRatio * 100);
      percent = Math.max(0, Math.min(100, percent));
      bar.style.transform = "scaleX(" + (percent / 100) + ")";
      if (percentLabel) percentLabel.textContent = percent + "%";
    }

    window.designbookProgressUpdate = update;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function setupLightbox() {
    var overlay = document.getElementById("book-image-lightbox");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "book-image-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "图片预览");
      overlay.innerHTML = '<button type="button" aria-label="关闭图片预览">×</button><div class="book-lightbox__body"><div class="book-lightbox__hint">IMAGE PREVIEW</div><img alt=""><div class="book-lightbox__controls"><button type="button" data-zoom="-">−</button><span class="book-lightbox__zoom-value">100%</span><button type="button" data-zoom="+">＋</button></div><div class="book-lightbox__zoom">点击背景或按 Esc 关闭</div></div>';
      document.body.appendChild(overlay);
    }

    var preview = overlay.querySelector("img");
    var closeButton = overlay.querySelector("button");
    var zoomValue = overlay.querySelector(".book-lightbox__zoom-value");
    var zoomOut = overlay.querySelector('[data-zoom="-"]');
    var zoomIn = overlay.querySelector('[data-zoom="+"]');
    var zoom = 100;

    function updateZoom() {
      preview.style.transform = "scale(" + (zoom / 100) + ")";
      if (zoomValue) zoomValue.textContent = zoom + "%";
    }

    function close() {
      overlay.classList.remove("is-open");
      preview.removeAttribute("src");
      preview.style.transform = "";
      document.body.style.removeProperty("overflow");
    }

    function open(image) {
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || "图片预览";
      zoom = 100;
      updateZoom();
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    overlay.openImage = open;

    closeButton.addEventListener("click", close);
    if (zoomOut) {
      zoomOut.addEventListener("click", function (event) {
        event.stopPropagation();
        zoom = Math.max(50, zoom - 10);
        updateZoom();
      });
    }
    if (zoomIn) {
      zoomIn.addEventListener("click", function (event) {
        event.stopPropagation();
        zoom = Math.min(200, zoom + 10);
        updateZoom();
      });
    }
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target === preview) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) close();
    });

    var images = mainRoot().querySelectorAll("img");
    images.forEach(function (image) {
      if (image.closest(".img-wrapper")) return;
      if (image.dataset.lightboxBound) return;
      var zoomLabel = image.closest(".checkbox-label");
      if (zoomLabel) {
        var nativeZoom = zoomLabel.querySelector(".checkbox-img");
        if (nativeZoom) {
          nativeZoom.checked = false;
          nativeZoom.disabled = true;
        }
      }
      image.dataset.lightboxBound = "true";
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.addEventListener("click", function (event) {
        event.preventDefault();
        open(image);
      });
      image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open(image);
        }
      });

      if (image.closest(".book-home")) return;
      var paragraph = image.closest("p");
      if (paragraph) {
        paragraph.classList.add("figure-image");
        var next = paragraph.nextElementSibling;
        if (next && next.tagName === "P" && !next.querySelector("img")) {
          var caption = next.textContent.trim();
          if (isCaptionText(caption)) next.classList.add("figure-caption");
        }
      }
    });
  }

  function setupArtworkDrawer() {
    var imageCases = {};
    artworkCases.forEach(function (item) {
      item.imageNames.forEach(function (name) { imageCases[name] = item; });
    });

    var drawer = document.getElementById("book-artwork-drawer");
    if (!drawer) {
      drawer = document.createElement("div");
      drawer.id = "book-artwork-drawer";
      drawer.className = "artwork-drawer";
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-hidden", "true");
      drawer.setAttribute("aria-labelledby", "artwork-drawer-title");
      drawer.innerHTML = '<div class="artwork-drawer__backdrop" data-drawer-close></div><aside class="artwork-drawer__panel" tabindex="-1"><button type="button" class="artwork-drawer__close" aria-label="关闭作品探索">×</button><div class="artwork-drawer__content"><p class="artwork-drawer__eyebrow"></p><h2 id="artwork-drawer-title"></h2><figure class="artwork-drawer__figure"><img class="artwork-drawer__image" alt=""><figcaption class="artwork-drawer__caption"></figcaption><p class="artwork-drawer__zoom-hint">点击图片可放大预览</p></figure><section class="artwork-drawer__section"><p class="artwork-drawer__label">本书上下文</p><p class="artwork-drawer__context"></p></section><section class="artwork-drawer__section"><p class="artwork-drawer__label">相关概念</p><div class="artwork-drawer__concepts"></div></section><div class="artwork-drawer__footer"><p class="artwork-drawer__location"></p><a class="artwork-drawer__read-link"></a><a class="artwork-drawer__related-link" hidden></a></div></div></aside>';
      document.body.appendChild(drawer);
    }

    var closeButton = drawer.querySelector(".artwork-drawer__close");
    var drawerImage = drawer.querySelector(".artwork-drawer__image");
    var opener = null;

    function closeDrawer() {
      if (!drawer.classList.contains("is-open")) return;
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.removeProperty("overflow");
      if (opener && document.contains(opener)) opener.focus();
    }

    function openDrawer(item, image, trigger) {
      opener = trigger;
      drawer.querySelector(".artwork-drawer__eyebrow").textContent = "IMAGE EXPLORATION · " + item.number;
      drawer.querySelector("#artwork-drawer-title").textContent = item.title;
      drawerImage.src = image.currentSrc || image.src;
      drawerImage.alt = item.title;
      drawer.querySelector(".artwork-drawer__caption").textContent = item.caption;
      drawer.querySelector(".artwork-drawer__context").textContent = item.context;
      drawer.querySelector(".artwork-drawer__location").textContent = "图片位置 · " + item.location;

      var concepts = drawer.querySelector(".artwork-drawer__concepts");
      concepts.textContent = "";
      item.concepts.forEach(function (concept) {
        var chip = document.createElement("span");
        chip.className = "artwork-drawer__concept";
        chip.textContent = concept;
        concepts.appendChild(chip);
      });

      var readLink = drawer.querySelector(".artwork-drawer__read-link");
      readLink.href = item.href;
      readLink.textContent = item.linkLabel + " →";
      var relatedLink = drawer.querySelector(".artwork-drawer__related-link");
      if (item.relatedHref && item.relatedLocation) {
        relatedLink.href = item.relatedHref;
        relatedLink.textContent = "延伸阅读 · " + item.relatedLocation + " →";
        relatedLink.hidden = false;
      } else {
        relatedLink.hidden = true;
        relatedLink.removeAttribute("href");
        relatedLink.textContent = "";
      }

      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    function getImageName(image) {
      try {
        var url = new URL(image.currentSrc || image.src, document.baseURI);
        return decodeURIComponent(url.pathname.split("/").pop());
      } catch (error) {
        return String(image.getAttribute("src") || "").split("/").pop();
      }
    }

    mainRoot().querySelectorAll("img").forEach(function (image) {
      var item = imageCases[getImageName(image)];
      if (!item) return;
      var figure = image.closest("p") || image.parentElement;
      if (!figure || figure.dataset.artworkExplorerBound) return;
      figure.dataset.artworkExplorerBound = "true";
      figure.classList.add("artwork-explore-figure");
      var trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "artwork-explore-trigger";
      trigger.setAttribute("aria-label", "探索作品：" + item.title);
      trigger.innerHTML = '<span aria-hidden="true">＋</span> 探索作品';
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        openDrawer(item, image, trigger);
      });
      figure.appendChild(trigger);
    });

    closeButton.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", function (event) {
      if (event.target.classList.contains("artwork-drawer__backdrop")) closeDrawer();
    });
    drawerImage.addEventListener("click", function () {
      var lightbox = document.getElementById("book-image-lightbox");
      closeDrawer();
      if (lightbox && typeof lightbox.openImage === "function") lightbox.openImage(drawerImage);
    });
    drawerImage.tabIndex = 0;
    drawerImage.setAttribute("role", "button");
    drawerImage.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        drawerImage.click();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (!drawer.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = Array.prototype.slice.call(drawer.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupBackToTop() {
    var button = document.getElementById("back-to-top");
    if (!button) {
      button = document.createElement("button");
      button.id = "back-to-top";
      button.type = "button";
      button.title = "返回顶部";
      button.setAttribute("aria-label", "返回顶部");
      button.innerHTML = "↑";
      document.body.appendChild(button);
    }

    function update() {
      button.classList.toggle("is-visible", window.scrollY > 520);
    }

    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  }

  function refreshEnhancements(info) {
    setupToolbar();
    setupCommandPalette();
    enhanceSidebar();
    setupSidebarScrollSpy();
    addChapterCover(info);
    addChapterMap(info);
    addChapterQuestion(info);
    addChapterExperience(info);
    addChapterThreeEditorials(info);
    setupChapterExperiences();
    setupPublicationMotion();
    addBottomNavigation(info);
    setupKeyboardPageNavigation();
    removeDefaultPageNavigation();
  }

  function init() {
    var info = getPageInfo();
    setBodyClass(info);
    enhanceHeadings(info);
    refreshEnhancements(info);
    setupGlobalViewLayers();
    normalizeFigureOrder();
    setupPublicationMotion();
    setupAnchorArrival();
    setupDesignComparator();
    setupReadingProgress(info);
    setupLightbox();
    setupArtworkDrawer();
    setupBackToTop();

    var sidebar = document.getElementById("mdbook-sidebar");
    if (sidebar && window.MutationObserver) {
      var observer = new MutationObserver(function () {
        refreshEnhancements(info);
      });
      observer.observe(sidebar, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
