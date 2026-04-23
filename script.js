const libraries = {
  ai: [
    {
      id: "auto-editor",
      title: "AI Auto Editor",
      description: "يصنع فيديو كامل تلقائيًا مع ترتيب اللقطات والموسيقى والانتقالات المناسبة.",
      meta: "AI / Auto",
      tags: ["Auto Cut", "Music", "Transitions"]
    },
    {
      id: "smart-cut",
      title: "Smart Cut AI",
      description: "يحذف السكتات والأخطاء والمقاطع المتكررة بسرعة قبل التحرير اليدوي.",
      meta: "AI / Cleanup",
      tags: ["Silence", "Mistakes", "Fast"]
    },
    {
      id: "director",
      title: "AI Director Mode",
      description: "اقتراحات إخراج احترافية تشمل الزووم، التوقيت، والانفعال البصري للمشهد.",
      meta: "AI / Direction",
      tags: ["Zoom", "Timing", "Cinematic"]
    },
    {
      id: "subtitles",
      title: "AI Auto Subtitle",
      description: "ترجمة تلقائية مع تنسيق واضح للمحتوى القصير والطويل.",
      meta: "AI / Subtitle",
      tags: ["Arabic", "English", "Format"]
    },
    {
      id: "voice-cleaner",
      title: "AI Voice Cleaner",
      description: "تنقية الصوت وإزالة الضوضاء مع الحفاظ على وضوح الكلام.",
      meta: "AI / Audio",
      tags: ["Noise", "Clarity", "Clean"]
    },
    {
      id: "music-unmix",
      title: "AI Music Unmix",
      description: "يفصل الموسيقى عن الغناء داخل الأغنية أو يستخرج الصوت البشري بشكل مستقل.",
      meta: "AI / Rare",
      tags: ["Rare", "Vocals", "Instrumental"]
    }
  ],
  sounds: [
    { id: "whoosh", title: "Whoosh Transition", description: "مؤثر انتقال سريع ونظيف", meta: "Transition / 00:02", tags: ["Whoosh", "Clean"] },
    { id: "impact", title: "Impact Strong", description: "ضربة مناسبة للهوك أو المشهد الإعلاني", meta: "Impact / 00:01", tags: ["Impact", "Hook"] },
    { id: "swish", title: "Swish Movement", description: "مؤثر حركة خفيف للمشاهد القصيرة", meta: "Motion / 00:02", tags: ["Motion", "Fast"] },
    { id: "rise", title: "Energy Rise", description: "رفع تدريجي قبل الانتقال أو العنوان", meta: "Build / 00:03", tags: ["Rise", "Energy"] },
    { id: "clap", title: "Clap Crowd", description: "تصفيق داخلي جاهز للمشاهد التفاعلية", meta: "Crowd / 00:03", tags: ["Clap", "Crowd"] }
  ],
  memes: [
    { id: "laugh", title: "Cartoon Laugh", description: "ضحكة ميم سريعة للمحتوى الخفيف", meta: "Meme / Viral", tags: ["Laugh", "Funny"] },
    { id: "drama", title: "Dramatic No", description: "ردة فعل درامية ترند", meta: "Meme / Reaction", tags: ["Reaction", "Drama"] },
    { id: "pop", title: "Pop Meme Hit", description: "صوت ترند قصير للمونتاج السريع", meta: "Meme / Short", tags: ["Pop", "Trend"] },
    { id: "crowd", title: "Crowd Cheering", description: "تشجيع جماهيري لإبراز اللحظات القوية", meta: "Meme / Crowd", tags: ["Cheer", "Hype"] }
  ],
  voice: [
    { id: "voiceover", title: "AI Voice Over", description: "حوّل النص إلى تعليق صوتي طبيعي داخل المشروع.", meta: "Voice / AI", tags: ["Natural", "Narration"] },
    { id: "voice-clean", title: "AI Voice Cleaner", description: "نقّي الصوت البشري مباشرة من داخل Audio Studio.", meta: "Voice / Cleanup", tags: ["Noise Remove", "Studio"] }
  ],
  unmix: [
    { id: "keep-vocals", title: "Keep Vocals", description: "يحافظ على الغناء ويزيل الموسيقى الخلفية.", meta: "Rare / Vocal", tags: ["Vocals", "Acapella"] },
    { id: "keep-music", title: "Keep Instrumental", description: "يعزل الموسيقى الخلفية لإعادة استخدامها داخل التايم لاين.", meta: "Rare / Instrumental", tags: ["Music", "Background"] },
    { id: "split-export", title: "Split & Export", description: "يصدّر طبقتين منفصلتين للغناء والموسيقى داخل التطبيق.", meta: "Export / AI", tags: ["Split", "Export"] }
  ]
};

const templates = {
  tiktok: {
    title: "TikTok Fast Mode",
    ratio: "9:16 Social",
    headline: "DROP. CUT. PUBLISH.",
    subline: "Astrix AI يرتب اللقطات ويجهز النسخة الجاهزة للنشر",
    videoWidth: "86%",
    fxWidth: "58%",
    voiceWidth: "48%",
    musicWidth: "74%"
  },
  youtube: {
    title: "YouTube Creator Flow",
    ratio: "16:9 Creator",
    headline: "TELL IT BETTER.",
    subline: "قالب أطول للشرح، الترجمة، وتنظيف الصوت قبل التصدير",
    videoWidth: "92%",
    fxWidth: "46%",
    voiceWidth: "70%",
    musicWidth: "68%"
  },
  ads: {
    title: "Ad Burst Pack",
    ratio: "1:1 Social Ads",
    headline: "HOOK. OFFER. CLOSE.",
    subline: "قالب إعلاني سريع مع انتقالات أقوى ومؤثرات أكثر حدة",
    videoWidth: "80%",
    fxWidth: "64%",
    voiceWidth: "42%",
    musicWidth: "60%"
  },
  podcast: {
    title: "Podcast Focus Mode",
    ratio: "16:9 Podcast",
    headline: "VOICE FIRST.",
    subline: "يركز على الكلام الواضح، القص الذكي، وواجهة صوت أكثر هدوءًا",
    videoWidth: "88%",
    fxWidth: "30%",
    voiceWidth: "76%",
    musicWidth: "42%"
  }
};

const explainQueue = [
  {
    title: "AI Explain Button",
    text: "هذه الزر يشرح أي أداة بلغة بسيطة ومباشرة حتى لا يضيع المستخدم بين الخيارات."
  },
  {
    title: "One Screen Editing",
    text: "كل اللوحات المهمة موجودة في شاشة واحدة: الميديا، التايم لاين، الصوت، الميمز، وأدوات AI."
  },
  {
    title: "Free + AI Monthly",
    text: "التحرير الأساسي مجاني بالكامل، بينما أدوات الذكاء الاصطناعي تُفتح عبر اشتراك شهري فقط."
  }
];

const refs = {
  year: document.getElementById("year"),
  revealNodes: document.querySelectorAll("[data-reveal]"),
  editorShell: document.getElementById("editorShell"),
  modeSwitch: document.getElementById("modeSwitch"),
  templateGroup: document.getElementById("templateGroup"),
  currentTemplateTitle: document.getElementById("currentTemplateTitle"),
  modeLabel: document.getElementById("modeLabel"),
  ratioLabel: document.getElementById("ratioLabel"),
  previewHeadline: document.getElementById("previewHeadline"),
  previewSubline: document.getElementById("previewSubline"),
  videoTrackFill: document.getElementById("videoTrackFill"),
  fxTrackFill: document.getElementById("fxTrackFill"),
  voiceTrackFill: document.getElementById("voiceTrackFill"),
  musicTrackFill: document.getElementById("musicTrackFill"),
  libraryTabs: document.getElementById("libraryTabs"),
  librarySearch: document.getElementById("librarySearch"),
  libraryList: document.getElementById("libraryList"),
  detailTitle: document.getElementById("detailTitle"),
  detailText: document.getElementById("detailText"),
  detailTags: document.getElementById("detailTags"),
  explainToolBtn: document.getElementById("explainToolBtn"),
  syncSoundBtn: document.getElementById("syncSoundBtn"),
  systemStatus: document.getElementById("systemStatus"),
  smartExplainerTitle: document.getElementById("smartExplainerTitle"),
  smartExplainerText: document.getElementById("smartExplainerText"),
  vocalSlider: document.getElementById("vocalSlider"),
  musicSlider: document.getElementById("musicSlider"),
  vocalValue: document.getElementById("vocalValue"),
  musicValue: document.getElementById("musicValue"),
  vocalProgress: document.getElementById("vocalProgress"),
  musicProgress: document.getElementById("musicProgress"),
  removeMusicBtn: document.getElementById("removeMusicBtn"),
  keepVocalsBtn: document.getElementById("keepVocalsBtn")
};

const state = {
  mode: "easy",
  panel: "ai",
  template: "tiktok",
  selectedItemId: "auto-editor",
  explainIndex: 0
};

init();

function init() {
  if (refs.year) {
    refs.year.textContent = String(new Date().getFullYear());
  }

  setupRevealObserver();
  syncMode();
  syncTemplate();
  syncUnmix();
  renderLibrary();
  bindEvents();
}

function bindEvents() {
  refs.modeSwitch?.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode || "easy";
      syncMode();
    });
  });

  refs.templateGroup?.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      state.template = button.dataset.template || "tiktok";
      syncTemplate();
    });
  });

  refs.libraryTabs?.querySelectorAll("[data-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      state.panel = button.dataset.panel || "ai";
      state.selectedItemId = libraries[state.panel][0]?.id || "";
      renderLibrary();
    });
  });

  refs.librarySearch?.addEventListener("input", () => {
    renderLibrary();
  });

  refs.explainToolBtn?.addEventListener("click", () => {
    state.explainIndex = (state.explainIndex + 1) % explainQueue.length;
    const item = explainQueue[state.explainIndex];
    if (refs.smartExplainerTitle) {
      refs.smartExplainerTitle.textContent = item.title;
    }
    if (refs.smartExplainerText) {
      refs.smartExplainerText.textContent = item.text;
    }
  });

  refs.syncSoundBtn?.addEventListener("click", () => {
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تمت مزامنة المؤثرات الصوتية مع الحركة والانتقالات تلقائيًا داخل التايم لاين.";
    }
    refs.fxTrackFill?.style.setProperty("--sync-boost", "1");
  });

  refs.vocalSlider?.addEventListener("input", syncUnmix);
  refs.musicSlider?.addEventListener("input", syncUnmix);

  refs.removeMusicBtn?.addEventListener("click", () => {
    if (refs.vocalSlider) refs.vocalSlider.value = "96";
    if (refs.musicSlider) refs.musicSlider.value = "4";
    syncUnmix();
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تم تفعيل AI Music Unmix: الموسيقى انخفضت بشدة مع الحفاظ على الكلام أو الغناء في المقدمة.";
    }
  });

  refs.keepVocalsBtn?.addEventListener("click", () => {
    if (refs.vocalSlider) refs.vocalSlider.value = "88";
    if (refs.musicSlider) refs.musicSlider.value = "12";
    syncUnmix();
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تم تجهيز نسخة Keep Vocals لاستخدامها داخل التايم لاين أو لإعادة تسجيل Voice Over فوقها.";
    }
  });
}

function syncMode() {
  refs.editorShell?.setAttribute("data-mode", state.mode);

  refs.modeSwitch?.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });

  if (refs.modeLabel) {
    refs.modeLabel.textContent = state.mode === "easy" ? "Easy AI Mode" : "Pro Timeline Mode";
  }

  if (refs.systemStatus) {
    refs.systemStatus.textContent =
      state.mode === "easy"
        ? "الوضع الحالي: Easy Mode مناسب للمبتدئ مع تبسيط الأدوات وإبراز وظائف AI."
        : "الوضع الحالي: Pro Mode يعطي تحكمًا أقرب لبرامج المونتاج الاحترافية.";
  }
}

function syncTemplate() {
  const template = templates[state.template];
  refs.templateGroup?.querySelectorAll("[data-template]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.template === state.template);
  });

  refs.editorShell?.setAttribute("data-template", state.template);

  if (refs.currentTemplateTitle) refs.currentTemplateTitle.textContent = template.title;
  if (refs.ratioLabel) refs.ratioLabel.textContent = template.ratio;
  if (refs.previewHeadline) refs.previewHeadline.textContent = template.headline;
  if (refs.previewSubline) refs.previewSubline.textContent = template.subline;
  if (refs.videoTrackFill) refs.videoTrackFill.style.setProperty("--width", template.videoWidth);
  if (refs.fxTrackFill) refs.fxTrackFill.style.setProperty("--width", template.fxWidth);
  if (refs.voiceTrackFill) refs.voiceTrackFill.style.setProperty("--width", template.voiceWidth);
  if (refs.musicTrackFill) refs.musicTrackFill.style.setProperty("--width", template.musicWidth);

  updateTrackFill(refs.videoTrackFill, template.videoWidth);
  updateTrackFill(refs.fxTrackFill, template.fxWidth);
  updateTrackFill(refs.voiceTrackFill, template.voiceWidth);
  updateTrackFill(refs.musicTrackFill, template.musicWidth);
}

function updateTrackFill(node, width) {
  if (!node) return;
  node.style.setProperty("--track-width", width);
}

function renderLibrary() {
  refs.libraryTabs?.querySelectorAll("[data-panel]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panel === state.panel);
  });

  const query = (refs.librarySearch?.value || "").trim().toLowerCase();
  const items = libraries[state.panel].filter((item) => {
    const text = `${item.title} ${item.description} ${item.meta} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(query);
  });

  if (!state.selectedItemId || !items.some((item) => item.id === state.selectedItemId)) {
    state.selectedItemId = items[0]?.id || "";
  }

  refs.libraryList.innerHTML = "";

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "library-item";
    if (item.id === state.selectedItemId) {
      button.classList.add("is-selected");
    }
    button.innerHTML = `
      <strong>${item.title}</strong>
      <p>${item.description}</p>
      <div class="library-meta">
        <span>${item.meta}</span>
        <span>${item.tags[0]}</span>
      </div>
    `;

    button.addEventListener("click", () => {
      state.selectedItemId = item.id;
      renderLibrary();
    });

    refs.libraryList.appendChild(button);
  });

  const selected = libraries[state.panel].find((item) => item.id === state.selectedItemId);
  renderDetail(selected);
}

function renderDetail(item) {
  if (!item) {
    refs.detailTitle.textContent = "No item";
    refs.detailText.textContent = "لا توجد عناصر مطابقة للبحث الحالي.";
    refs.detailTags.innerHTML = "";
    return;
  }

  refs.detailTitle.textContent = item.title;
  refs.detailText.textContent = item.description;
  refs.detailTags.innerHTML = "";

  item.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    refs.detailTags.appendChild(span);
  });
}

function syncUnmix() {
  const vocals = Number(refs.vocalSlider?.value || 0);
  const music = Number(refs.musicSlider?.value || 0);

  if (refs.vocalValue) refs.vocalValue.textContent = `${vocals}%`;
  if (refs.musicValue) refs.musicValue.textContent = `${music}%`;
  if (refs.vocalProgress) refs.vocalProgress.style.setProperty("--mix-width", `${vocals}%`);
  if (refs.musicProgress) refs.musicProgress.style.setProperty("--mix-width", `${music}%`);
}

function setupRevealObserver() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    refs.revealNodes.forEach((node) => observer.observe(node));
    return;
  }

  refs.revealNodes.forEach((node) => node.classList.add("is-visible"));
}
