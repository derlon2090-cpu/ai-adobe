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
    {
      id: "ad-sting",
      title: "صوت إعلان خاطف",
      description: "نبضة قصيرة لافتتاح خصم أو ظهور منتج أو لقطة Call To Action.",
      meta: "Commercial / Promo",
      tags: ["إعلان", "تجاري", "قصير"],
      audioSrc: "assets/sound-effects/library/commercial/ad-sting-pop.mp3"
    },
    {
      id: "commercial-soft",
      title: "صوت تجاري ناعم",
      description: "نغمة ناعمة مناسبة لعرض سعر أو كرت منتج أو انتقال متجر إلكتروني.",
      meta: "Commercial / Soft",
      tags: ["تجاري", "عرض", "ناعم"],
      audioSrc: "assets/sound-effects/library/commercial/commercial-soft-tone.mp3"
    },
    {
      id: "sale-alert",
      title: "تنبيه عرض سريع",
      description: "تنبيه قصير يلفت الانتباه للعروض والخصومات ورسائل الإعلان السريعة.",
      meta: "Promo / Alert",
      tags: ["عرض", "تنبيه", "سريع"],
      audioSrc: "assets/sound-effects/library/commercial/sale-alert-notification.mp3"
    },
    {
      id: "whoosh-air",
      title: "هووش انتقال قصير",
      description: "انتقال هوائي سريع ومناسب لقصات الريلز واللقطات السريعة.",
      meta: "Transition / Air",
      tags: ["انتقال", "هواء", "ريلز"],
      audioSrc: "assets/sound-effects/library/transitions/whoosh-air-short.mp3"
    },
    {
      id: "whoosh-clean",
      title: "هووش سينمائي نظيف",
      description: "سوش سلس يركب على حركة كاميرا أو دخول نص أو تحريك منتج.",
      meta: "Transition / Clean",
      tags: ["انتقال", "نظيف", "موشن"],
      audioSrc: "assets/sound-effects/library/transitions/whoosh-clean-short.mp3"
    },
    {
      id: "cinematic-hit",
      title: "ضربة سينمائية",
      description: "ضربة قوية للهوك أو كشف عنوان أو لحظة إبراز مشهد مهم.",
      meta: "Cinematic / Hit",
      tags: ["سينمائي", "ضربة", "هوك"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-hit-sharp.wav"
    },
    {
      id: "cinematic-braam",
      title: "براام تشويقي",
      description: "صوت Trailer داكن يعطي ثقلًا للحظة الانتقال أو النهاية الدرامية.",
      meta: "Trailer / Dark",
      tags: ["براام", "تشويق", "داكن"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-braam-dark.wav"
    },
    {
      id: "cinematic-riser",
      title: "رايزر تشويق للإعلان",
      description: "تصاعد قصير قبل الكشف عن المنتج أو السعر أو الكادر النهائي.",
      meta: "Trailer / Build",
      tags: ["رايزر", "إعلان", "بناء"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-riser-build.mp3"
    },
    {
      id: "suspense-boom",
      title: "بوم تشويقي",
      description: "ضربة تشويق مركزة تناسب المشاهد الداكنة أو الإعلان الدرامي.",
      meta: "Impact / Dark",
      tags: ["بوم", "تشويق", "درامي"],
      audioSrc: "assets/sound-effects/library/cinematic/suspense-boom-dark.mp3"
    },
    {
      id: "camera-click",
      title: "التقاط كاميرا",
      description: "كليك واضح لإظهار التصوير، المنتج، أو الانتقال بين الصور.",
      meta: "Camera / Click",
      tags: ["كاميرا", "تصوير", "كليك"],
      audioSrc: "assets/sound-effects/library/camera/camera-click.mp3"
    },
    {
      id: "camera-soft",
      title: "كاميرا ناعمة",
      description: "نسخة أنعم من كليك الكاميرا للمحتوى الراقي أو البراندات الهادئة.",
      meta: "Camera / Soft",
      tags: ["كاميرا", "ناعم", "براند"],
      audioSrc: "assets/sound-effects/library/camera/camera-soft-click.wav"
    },
    {
      id: "page-turn",
      title: "تقليب صفحة",
      description: "مناسب لشرح، قصة، أو انتقال بين لقطات يقدم فيها النص خطوة جديدة.",
      meta: "Utility / Page",
      tags: ["صفحة", "تعليمي", "شرح"],
      audioSrc: "assets/sound-effects/library/utility/page-turn.wav"
    },
    {
      id: "clock-tick",
      title: "عد تنازلي",
      description: "إيقاع توتر خفيف مناسب للعروض المحدودة أو التشويق قبل النتيجة.",
      meta: "Utility / Timing",
      tags: ["عداد", "توتر", "وقت"],
      audioSrc: "assets/sound-effects/library/utility/clock-ticking.mp3"
    },
    {
      id: "impact-punch",
      title: "ضربة إعلان قوية",
      description: "Punch قصير ومباشر لربط النص أو السعر أو عنصر البيع الرئيسي.",
      meta: "Interface / Punch",
      tags: ["ضربة", "إعلان", "بيع"],
      audioSrc: "assets/sound-effects/library/interface/impact-punch.mp3"
    },
    {
      id: "product-shine",
      title: "لمعة منتج",
      description: "صوت لمعة خفيف لظهور شعار أو منتج أو سلايد فاخر.",
      meta: "Brand / Shine",
      tags: ["لمعة", "منتج", "فاخر"],
      audioSrc: "assets/sound-effects/library/interface/product-shine.mp3"
    },
    {
      id: "ui-success",
      title: "نجاح ناعم",
      description: "تأكيد إيجابي بسيط لخطوات التطبيق أو التفاعل أو الإرسال الناجح.",
      meta: "UI / Success",
      tags: ["نجاح", "واجهة", "تأكيد"],
      audioSrc: "assets/sound-effects/library/interface/ui-success-soft.mp3"
    },
    {
      id: "ui-error",
      title: "خطأ تنبيهي",
      description: "تنبيه واضح للأخطاء أو الإلغاء أو الأحداث التي تحتاج انتباهًا فوريًا.",
      meta: "UI / Error",
      tags: ["خطأ", "تنبيه", "واجهة"],
      audioSrc: "assets/sound-effects/library/interface/ui-error-alert.mp3"
    },
    {
      id: "alarm-urgent",
      title: "منبه عاجل",
      description: "تنبيه أطول للمشاهد الطارئة أو المحتوى الذي يحتاج إحساس استعجال.",
      meta: "Alert / Strong",
      tags: ["منبه", "عاجل", "قوي"],
      audioSrc: "assets/sound-effects/library/interface/alarm-urgent.mp3"
    }
  ],
  memes: [
    {
      id: "meme-win",
      title: "فوز سريع",
      description: "ردة فعل خفيفة للحظة النجاح أو الإنجاز أو الجواب الصح.",
      meta: "Meme / Win",
      tags: ["فوز", "نجاح", "ردة فعل"],
      audioSrc: "assets/sound-effects/library/meme/victory-win.wav"
    },
    {
      id: "meme-xp",
      title: "XP Ping",
      description: "صوت قصير مناسب لنقطة مكتسبة أو ترقية أو إنجاز سريع.",
      meta: "Meme / XP",
      tags: ["XP", "ترقية", "قصير"],
      audioSrc: "assets/sound-effects/library/meme/xp-ping.mp3"
    },
    {
      id: "meme-tension",
      title: "ترقب متسارع",
      description: "إيقاع متكرر لرفع التوتر قبل كشف النتيجة أو المفاجأة.",
      meta: "Meme / Tension",
      tags: ["ترقب", "توتر", "كشف"],
      audioSrc: "assets/sound-effects/library/meme/tension-tick.mp3"
    },
    {
      id: "meme-glitch-out",
      title: "قلتش خروج",
      description: "خروج سريع بنكهة Glitch للمحتوى التقني أو المزاح السريع.",
      meta: "Meme / Glitch",
      tags: ["قلتش", "خروج", "تقني"],
      audioSrc: "assets/sound-effects/library/meme/glitch-out.mp3"
    },
    {
      id: "meme-glitch-in",
      title: "قلتش دخول",
      description: "دخول Glitch أو Reveal مفاجئ للنص أو الصورة أو الميم.",
      meta: "Meme / Reveal",
      tags: ["قلتش", "دخول", "Reveal"],
      audioSrc: "assets/sound-effects/library/meme/glitch-in.wav"
    }
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
  detailLabel: document.getElementById("detailLabel"),
  detailTitle: document.getElementById("detailTitle"),
  detailText: document.getElementById("detailText"),
  detailTags: document.getElementById("detailTags"),
  detailAudioBox: document.getElementById("detailAudioBox"),
  detailAudioMeta: document.getElementById("detailAudioMeta"),
  detailAudio: document.getElementById("detailAudio"),
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
        <span>${item.audioSrc ? "معاينة مباشرة" : item.tags[0]}</span>
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
    refs.detailLabel.textContent = "Library Detail";
    refs.detailTitle.textContent = "No item";
    refs.detailText.textContent = "لا توجد عناصر مطابقة للبحث الحالي.";
    refs.detailTags.innerHTML = "";
    hideDetailAudio();
    return;
  }

  refs.detailLabel.textContent = item.audioSrc ? "Sound Preview" : "AI Explain";
  refs.detailTitle.textContent = item.title;
  refs.detailText.textContent = item.description;
  refs.detailTags.innerHTML = "";

  item.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    refs.detailTags.appendChild(span);
  });

  if (item.audioSrc) {
    if (refs.detailAudioMeta) {
      refs.detailAudioMeta.textContent = `${item.meta} • ${item.tags.slice(0, 2).join(" • ")}`;
    }

    if (refs.detailAudioBox) {
      refs.detailAudioBox.hidden = false;
    }

    if (refs.detailAudio) {
      const currentSrc = refs.detailAudio.getAttribute("src");
      if (currentSrc !== item.audioSrc) {
        refs.detailAudio.pause();
        refs.detailAudio.setAttribute("src", item.audioSrc);
        refs.detailAudio.load();
      }
    }
  } else {
    hideDetailAudio();
  }
}

function hideDetailAudio() {
  if (refs.detailAudioBox) {
    refs.detailAudioBox.hidden = true;
  }

  if (refs.detailAudioMeta) {
    refs.detailAudioMeta.textContent = "جاهز للتشغيل من مكتبتك الخاصة";
  }

  if (refs.detailAudio) {
    refs.detailAudio.pause();
    refs.detailAudio.removeAttribute("src");
    refs.detailAudio.load();
  }
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
