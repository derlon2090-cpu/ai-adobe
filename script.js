const rotatingPrompts = [
  "احذف الصمت ورتب أفضل اللقطات",
  "أنشئ Captions عربي وإنجليزي بنمط سريع",
  "جهّز نسخة عمودية لـ TikTok مع هوك في البداية",
  "حسّن الصوت وأضف انتقالات خفيفة للمشاهد"
];

const consolePrompts = [
  "أنشئ نسخة يوتيوب كاملة مع Captions وتصحيح ألوان سينمائي",
  "اختصر الفيديو إلى 45 ثانية مع إبراز أقوى 3 لقطات",
  "ابحث عن كلمة العرض الخاص وأنشئ مقطع إعلاني سريع"
];

const STYLE_PROFILE_KEY = "smartcut-style-profile";

const projectTemplate = {
  clips: [
    { id: "hook", title: "Opening Hook", start: 0, end: 7, score: 96, silence: 0.2 },
    { id: "intro", title: "Fast Intro", start: 7, end: 14, score: 88, silence: 0.6 },
    { id: "demo", title: "Feature Demo", start: 14, end: 28, score: 91, silence: 0.3 },
    { id: "pause", title: "Long Pause", start: 28, end: 35, score: 44, silence: 3.1 },
    { id: "audio", title: "Audio Upgrade", start: 35, end: 45, score: 83, silence: 0.7 },
    { id: "platform", title: "Platform Export", start: 45, end: 56, score: 89, silence: 0.2 },
    { id: "cta", title: "CTA Finish", start: 56, end: 64, score: 94, silence: 0.1 }
  ],
  transcript: [
    {
      id: "t1",
      time: 2,
      ar: "اليوم سنحوّل اللقطات الخام إلى فيديو جاهز في دقائق.",
      en: "Today we will turn raw footage into a polished edit in minutes."
    },
    {
      id: "t2",
      time: 9,
      ar: "SmartCut AI يلتقط الهوك الأقوى ويقص الأجزاء الضعيفة تلقائيًا.",
      en: "SmartCut AI finds the strongest hook and trims weak sections automatically."
    },
    {
      id: "t3",
      time: 17,
      ar: "هنا يبدأ توليد الكابشن بالعربي والإنجليزي حسب الستايل الذي تختاره.",
      en: "This is where bilingual captions are generated based on your selected style."
    },
    {
      id: "t4",
      time: 24,
      ar: "يمكنك البحث عن أي كلمة منطوقة للوصول السريع للمشهد المناسب.",
      en: "You can search spoken words to jump directly to the right scene."
    },
    {
      id: "t5",
      time: 31,
      ar: "هذا الجزء يحتوي على صمت طويل وسيتم استبعاده في القص الذكي.",
      en: "This section contains a long pause and will be removed by smart cut."
    },
    {
      id: "t6",
      time: 39,
      ar: "بعدها نقوم بتحسين الصوت وإضافة معالجة أنظف للصوت البشري.",
      en: "Then we clean the voice track and improve the audio profile."
    },
    {
      id: "t7",
      time: 49,
      ar: "وأخيرًا نجهز نسخة TikTok أو YouTube أو Instagram من نفس المشروع.",
      en: "Finally we prepare TikTok, YouTube, or Instagram versions from the same project."
    },
    {
      id: "t8",
      time: 60,
      ar: "التقرير النهائي يحفظ تفضيلاتك ويقترح أسلوبك المفضل للمونتاج.",
      en: "The final report remembers your preferences and suggests your editing style."
    }
  ]
};

const labels = {
  platform: {
    youtube: "YouTube 16:9",
    tiktok: "TikTok / Shorts 9:16",
    instagram: "Instagram 1:1"
  },
  audio: {
    balanced: "Balanced Audio",
    podcast: "Podcast Clean",
    cinematic: "Cinematic FX"
  },
  color: {
    balanced: "Balanced Color",
    cinematic: "Cinematic Look",
    vibrant: "Vibrant Social"
  },
  captionLanguage: {
    ar: "عربي",
    en: "English",
    bi: "ثنائي اللغة"
  },
  captionStyle: {
    highlight: "Highlight",
    minimal: "Minimal",
    karaoke: "Karaoke"
  },
  smartcut: {
    auto: "Auto Cut",
    best: "Best Takes",
    restore: "Restore"
  }
};

const state = {
  clips: [],
  transcript: projectTemplate.transcript.map((item) => ({ ...item })),
  activeClipIds: new Set(),
  selectedClipId: null,
  captionLanguage: "ar",
  captionStyle: "highlight",
  captionDensity: "balanced",
  captions: [],
  audioPreset: "balanced",
  colorPreset: "balanced",
  platformPreset: "youtube",
  exportName: "smartcut-final-v1",
  assistantHistory: [],
  currentSourceName: "المشروع التجريبي",
  uploadedVideoUrl: null,
  styleProfile: loadStyleProfile()
};

const rotatingPromptNode = document.querySelector("[data-rotating-prompt]");
const consolePromptNode = document.querySelector("[data-console-text]");
const revealNodes = document.querySelectorAll("[data-reveal]");
const yearNode = document.getElementById("year");

const videoUploadInput = document.getElementById("videoUpload");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const studioCanvas = document.getElementById("studioCanvas");
const studioVideo = document.getElementById("studioVideo");
const studioImage = document.getElementById("studioImage");
const analysisStatusNode = document.getElementById("analysisStatus");
const analysisMetaNode = document.getElementById("analysisMeta");
const clipLaneNode = document.getElementById("clipLane");
const liveCaptionNode = document.getElementById("liveCaption");
const platformChipNode = document.getElementById("platformChip");
const audioChipNode = document.getElementById("audioChip");
const colorChipNode = document.getElementById("colorChip");
const selectedClipsCountNode = document.getElementById("selectedClipsCount");
const savedSecondsNode = document.getElementById("savedSeconds");
const exportPresetValueNode = document.getElementById("exportPresetValue");
const captionStateValueNode = document.getElementById("captionStateValue");
const smartCutNoteNode = document.getElementById("smartCutNote");
const captionStyleSelect = document.getElementById("captionStyleSelect");
const captionDensitySelect = document.getElementById("captionDensitySelect");
const captionLanguageControl = document.getElementById("captionLanguageControl");
const generateCaptionsBtn = document.getElementById("generateCaptionsBtn");
const captionListNode = document.getElementById("captionList");
const audioPresetSelect = document.getElementById("audioPresetSelect");
const colorPresetSelect = document.getElementById("colorPresetSelect");
const platformPresetSelect = document.getElementById("platformPresetSelect");
const exportNameInput = document.getElementById("exportNameInput");
const applyPresetBtn = document.getElementById("applyPresetBtn");
const assistantCommandInput = document.getElementById("assistantCommandInput");
const runAssistantBtn = document.getElementById("runAssistantBtn");
const assistantLogNode = document.getElementById("assistantLog");
const transcriptSearchInput = document.getElementById("transcriptSearchInput");
const searchResultsNode = document.getElementById("searchResults");
const styleMemoryNode = document.getElementById("styleMemory");
const applyLearnedStyleBtn = document.getElementById("applyLearnedStyleBtn");
const exportPlanBtn = document.getElementById("exportPlanBtn");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString();
}

startPromptLoops();
setupRevealObserver();
resetWorkspace();
wireEvents();
syncPreviewState();
renderClipLane();
renderSummary();
renderSearchResults("");
renderAssistantLog();
renderStyleMemory();
updateStatus("تم تحميل المشروع التجريبي", "يمكنك الآن تجربة القص الذكي أو أوامر المساعد أو رفع فيديو فعلي.");

function startPromptLoops() {
  if (rotatingPromptNode) {
    let promptIndex = 0;
    window.setInterval(() => {
      promptIndex = (promptIndex + 1) % rotatingPrompts.length;
      rotatingPromptNode.textContent = rotatingPrompts[promptIndex];
    }, 2600);
  }

  if (consolePromptNode) {
    let consoleIndex = 0;
    window.setInterval(() => {
      consoleIndex = (consoleIndex + 1) % consolePrompts.length;
      consolePromptNode.textContent = consolePrompts[consoleIndex];
    }, 3200);
  }
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
      { threshold: 0.18 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return;
  }

  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function wireEvents() {
  document.querySelectorAll("[data-smartcut]").forEach((button) => {
    button.addEventListener("click", () => {
      applySmartCut(button.dataset.smartcut);
    });
  });

  captionLanguageControl?.querySelectorAll("[data-caption-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      state.captionLanguage = button.dataset.captionLang;
      syncCaptionLanguageControl();
      if (state.captions.length > 0) {
        generateCaptions({ silent: true, record: false });
      } else {
        syncCaptionToTime(getSelectedTime());
      }
    });
  });

  captionStyleSelect?.addEventListener("change", () => {
    state.captionStyle = captionStyleSelect.value;
    liveCaptionNode.dataset.style = state.captionStyle;
    if (state.captions.length > 0) {
      generateCaptions({ silent: true, record: false });
    }
  });

  captionDensitySelect?.addEventListener("change", () => {
    state.captionDensity = captionDensitySelect.value;
    if (state.captions.length > 0) {
      generateCaptions({ silent: true, record: false });
    }
  });

  generateCaptionsBtn?.addEventListener("click", () => {
    generateCaptions();
  });

  applyPresetBtn?.addEventListener("click", () => {
    applyPresetSelections();
  });

  runAssistantBtn?.addEventListener("click", () => {
    runAssistantCommand(assistantCommandInput?.value || "");
  });

  assistantCommandInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runAssistantCommand(assistantCommandInput.value);
    }
  });

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      const command = button.dataset.command || "";
      if (assistantCommandInput) {
        assistantCommandInput.value = command;
      }
      runAssistantCommand(command);
    });
  });

  transcriptSearchInput?.addEventListener("input", () => {
    renderSearchResults(transcriptSearchInput.value);
  });

  applyLearnedStyleBtn?.addEventListener("click", () => {
    applyLearnedStyle();
  });

  exportPlanBtn?.addEventListener("click", () => {
    exportProjectReport();
  });

  loadSampleBtn?.addEventListener("click", () => {
    resetWorkspace();
    updateStatus("تمت إعادة تحميل المشروع التجريبي", "يمكنك تجربة أي سيناريو جديد بدون فقدان التفضيلات المتعلمة.");
  });

  videoUploadInput?.addEventListener("change", handleVideoUpload);

  studioVideo?.addEventListener("timeupdate", () => {
    syncCaptionToTime(studioVideo.currentTime);
  });

  studioVideo?.addEventListener("loadedmetadata", () => {
    updateStatus(
      "تم تحميل الفيديو بنجاح",
      `المصدر الحالي: ${state.currentSourceName} • المدة التقريبية ${formatTime(studioVideo.duration || 0)}`
    );
  });
}

function resetWorkspace() {
  state.clips = projectTemplate.clips.map((clip) => ({ ...clip }));
  state.activeClipIds = new Set(state.clips.map((clip) => clip.id));
  state.selectedClipId = state.clips[0]?.id || null;
  state.captionLanguage = "ar";
  state.captionStyle = "highlight";
  state.captionDensity = "balanced";
  state.captions = [];
  state.audioPreset = "balanced";
  state.colorPreset = "balanced";
  state.platformPreset = "youtube";
  state.exportName = "smartcut-final-v1";
  state.assistantHistory = [];
  state.currentSourceName = "المشروع التجريبي";

  if (state.uploadedVideoUrl) {
    URL.revokeObjectURL(state.uploadedVideoUrl);
    state.uploadedVideoUrl = null;
  }

  if (studioVideo) {
    studioVideo.pause();
    studioVideo.removeAttribute("src");
    studioVideo.load();
    studioVideo.hidden = true;
  }

  if (studioImage) {
    studioImage.hidden = false;
  }

  if (videoUploadInput) {
    videoUploadInput.value = "";
  }

  if (assistantCommandInput) {
    assistantCommandInput.value = "";
  }

  if (transcriptSearchInput) {
    transcriptSearchInput.value = "";
  }

  if (captionStyleSelect) {
    captionStyleSelect.value = state.captionStyle;
  }

  if (captionDensitySelect) {
    captionDensitySelect.value = state.captionDensity;
  }

  if (audioPresetSelect) {
    audioPresetSelect.value = state.audioPreset;
  }

  if (colorPresetSelect) {
    colorPresetSelect.value = state.colorPreset;
  }

  if (platformPresetSelect) {
    platformPresetSelect.value = state.platformPreset;
  }

  if (exportNameInput) {
    exportNameInput.value = state.exportName;
  }

  syncCaptionLanguageControl();
  syncPreviewState();
  renderClipLane();
  renderSummary();
  renderCaptionList();
  renderSearchResults("");
  renderAssistantLog();
  renderStyleMemory();
  syncCaptionToTime(getSelectedTime());
}

function syncCaptionLanguageControl() {
  captionLanguageControl?.querySelectorAll("[data-caption-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.captionLang === state.captionLanguage);
  });
}

function renderClipLane() {
  if (!clipLaneNode) {
    return;
  }

  const maxDuration = Math.max(...state.clips.map((clip) => clip.end - clip.start), 1);
  clipLaneNode.innerHTML = "";

  state.clips.forEach((clip) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "clip-bar";

    if (!state.activeClipIds.has(clip.id)) {
      button.classList.add("is-muted");
    }

    if (state.selectedClipId === clip.id) {
      button.classList.add("is-active");
    }

    const width = Math.max(18, Math.round(((clip.end - clip.start) / maxDuration) * 100));
    button.innerHTML = `
      <div class="clip-meta">
        <span class="clip-title">${clip.title}</span>
        <span class="clip-time">${formatTime(clip.start)} - ${formatTime(clip.end)}</span>
      </div>
      <div class="clip-meter" style="--clip-width: ${width}%"><span></span></div>
      <div class="clip-score">${clip.score}%</div>
    `;

    button.addEventListener("click", () => {
      state.selectedClipId = clip.id;
      renderClipLane();
      syncCaptionToTime(clip.start);
      if (studioVideo && !studioVideo.hidden && Number.isFinite(studioVideo.duration)) {
        studioVideo.currentTime = Math.min(clip.start, studioVideo.duration || clip.start);
      }
    });

    clipLaneNode.appendChild(button);
  });
}

function renderSummary() {
  const selectedCount = Array.from(state.activeClipIds).length;
  const removedSeconds = state.clips
    .filter((clip) => !state.activeClipIds.has(clip.id))
    .reduce((total, clip) => total + (clip.end - clip.start), 0);

  if (selectedClipsCountNode) {
    selectedClipsCountNode.textContent = String(selectedCount);
  }

  if (savedSecondsNode) {
    savedSecondsNode.textContent = `${removedSeconds}s`;
  }

  if (exportPresetValueNode) {
    exportPresetValueNode.textContent = labels.platform[state.platformPreset];
  }

  if (captionStateValueNode) {
    captionStateValueNode.textContent = state.captions.length > 0 ? `${state.captions.length} cues` : "غير مولدة";
  }
}

function generateCaptions(options = {}) {
  const { silent = false, record = true } = options;
  const visibleTranscript = getVisibleTranscript();

  state.captions = visibleTranscript.map((item, index) => ({
    id: `caption-${item.id}`,
    time: item.time,
    text: composeCaptionText(item),
    label: `Cue ${index + 1}`
  }));

  if (record) {
    incrementPreference("captionLanguage", state.captionLanguage);
    incrementPreference("captionStyle", state.captionStyle);
  }

  liveCaptionNode.dataset.style = state.captionStyle;
  renderCaptionList();
  renderSummary();
  syncCaptionToTime(getSelectedTime());

  if (!silent) {
    updateStatus(
      "تم توليد الترجمة",
      `${state.captions.length} سطرًا جاهزًا بأسلوب ${labels.captionStyle[state.captionStyle]} و${labels.captionLanguage[state.captionLanguage]}.`
    );
  }

  renderStyleMemory();
  return `تم توليد ${state.captions.length} سطر ترجمة`;
}

function renderCaptionList() {
  if (!captionListNode) {
    return;
  }

  captionListNode.innerHTML = "";

  if (state.captions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا توجد Captions بعد</strong>
        <span>استخدم زر Generate Captions أو اطلب من المساعد الذكي تجهيزها لك.</span>
      </div>
    `;
    captionListNode.appendChild(empty);
    return;
  }

  state.captions.forEach((caption) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "caption-item";
    if (Math.abs(caption.time - getSelectedTime()) < 0.5) {
      button.classList.add("is-active");
    }

    button.innerHTML = `
      <strong>${formatTime(caption.time)} • ${caption.label}</strong>
      <p>${caption.text}</p>
    `;

    button.addEventListener("click", () => {
      jumpToTime(caption.time);
    });

    captionListNode.appendChild(button);
  });
}

function renderSearchResults(query) {
  if (!searchResultsNode) {
    return;
  }

  const normalizedQuery = (query || "").trim().toLowerCase();
  const source = normalizedQuery
    ? state.transcript.filter((item) => {
        const ar = item.ar.toLowerCase();
        const en = item.en.toLowerCase();
        return ar.includes(normalizedQuery) || en.includes(normalizedQuery);
      })
    : getVisibleTranscript().slice(0, 6);

  searchResultsNode.innerHTML = "";

  if (source.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا توجد نتائج مطابقة</strong>
        <span>جرّب كلمة أخرى بالعربي أو بالإنجليزية للوصول إلى الجملة المطلوبة.</span>
      </div>
    `;
    searchResultsNode.appendChild(empty);
    return;
  }

  source.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-item";
    button.innerHTML = `
      <strong>${item.ar}</strong>
      <p>${item.en}</p>
      <span class="search-time">${formatTime(item.time)}</span>
    `;
    button.addEventListener("click", () => {
      jumpToTime(item.time);
    });
    searchResultsNode.appendChild(button);
  });
}

function syncPreviewState() {
  if (!studioCanvas) {
    return;
  }

  studioCanvas.dataset.ratio = state.platformPreset;
  studioCanvas.dataset.look = state.colorPreset;

  if (platformChipNode) {
    platformChipNode.textContent = labels.platform[state.platformPreset];
  }

  if (audioChipNode) {
    audioChipNode.textContent = labels.audio[state.audioPreset];
  }

  if (colorChipNode) {
    colorChipNode.textContent = labels.color[state.colorPreset];
  }

  if (exportNameInput) {
    state.exportName = exportNameInput.value.trim() || "smartcut-final-v1";
  }
}

function applyPresetSelections(options = {}) {
  const { silent = false, record = true } = options;

  state.audioPreset = audioPresetSelect?.value || state.audioPreset;
  state.colorPreset = colorPresetSelect?.value || state.colorPreset;
  state.platformPreset = platformPresetSelect?.value || state.platformPreset;
  state.exportName = exportNameInput?.value.trim() || "smartcut-final-v1";

  syncPreviewState();
  renderSummary();

  if (record) {
    incrementPreference("audio", state.audioPreset);
    incrementPreference("color", state.colorPreset);
    incrementPreference("platform", state.platformPreset);
  }

  renderStyleMemory();

  if (!silent) {
    updateStatus(
      "تم تطبيق الإعدادات",
      `${labels.platform[state.platformPreset]} • ${labels.audio[state.audioPreset]} • ${labels.color[state.colorPreset]}`
    );
  }

  return "تم تطبيق إعدادات المنصة والصوت والألوان";
}

function applySmartCut(mode, options = {}) {
  const { silent = false, record = true } = options;
  const allIds = state.clips.map((clip) => clip.id);
  let keptClips = [...state.clips];
  let note = "تمت استعادة جميع المشاهد كما هي.";

  if (mode === "auto") {
    keptClips = state.clips.filter((clip) => clip.silence < 1.2 && clip.score >= 70);
    note = "Auto Cut حذف المقاطع ذات الصمت الطويل أو التقييم الأضعف مع الحفاظ على تسلسل القصة.";
  } else if (mode === "best") {
    keptClips = [...state.clips]
      .sort((left, right) => right.score - left.score)
      .slice(0, 4)
      .sort((left, right) => left.start - right.start);
    note = "Best Takes أبقى أعلى اللقطات تقييمًا لنسخة أسرع وأكثر كثافة.";
  } else if (mode === "restore") {
    keptClips = state.clips.filter((clip) => allIds.includes(clip.id));
  }

  if (keptClips.length === 0) {
    keptClips = [state.clips[0]];
  }

  state.activeClipIds = new Set(keptClips.map((clip) => clip.id));
  state.selectedClipId = keptClips[0]?.id || state.selectedClipId;

  if (record) {
    incrementPreference("smartcut", mode);
  }

  if (smartCutNoteNode) {
    smartCutNoteNode.textContent = note;
  }

  renderClipLane();
  renderSummary();
  renderSearchResults(transcriptSearchInput?.value || "");

  if (state.captions.length > 0) {
    generateCaptions({ silent: true, record: false });
  } else {
    syncCaptionToTime(getSelectedTime());
  }

  renderStyleMemory();

  if (!silent) {
    updateStatus("تم تنفيذ القص الذكي", note);
  }

  return `تم تطبيق ${labels.smartcut[mode]}`;
}

function runAssistantCommand(command) {
  const rawCommand = (command || "").trim();
  if (!rawCommand) {
    updateStatus("لا يوجد أمر للتنفيذ", "اكتب طلبًا واضحًا مثل: احذف الصمت أو جهز نسخة TikTok.");
    return;
  }

  const normalized = rawCommand.toLowerCase();
  const actions = [];
  let shouldApplyPresets = false;
  let shouldGenerateCaptions = false;

  if (matches(normalized, ["صمت", "silence", "قص"])) {
    actions.push(applySmartCut("auto", { silent: true }));
  }

  if (matches(normalized, ["أفضل", "best", "strongest", "لقطات"])) {
    actions.push(applySmartCut("best", { silent: true }));
  }

  if (matches(normalized, ["restore", "رجّع", "استعادة"])) {
    actions.push(applySmartCut("restore", { silent: true }));
  }

  if (matches(normalized, ["caption", "captions", "ترجمة", "كابشن"])) {
    shouldGenerateCaptions = true;
  }

  if (matches(normalized, ["ثنائي", "bilingual"])) {
    state.captionLanguage = "bi";
  } else if (matches(normalized, ["english", "انجليزي"])) {
    state.captionLanguage = "en";
  } else if (matches(normalized, ["عربي", "arabic"])) {
    state.captionLanguage = "ar";
  }

  if (matches(normalized, ["karaoke", "كاريوكي"])) {
    state.captionStyle = "karaoke";
  } else if (matches(normalized, ["minimal", "مينيمال"])) {
    state.captionStyle = "minimal";
  } else if (matches(normalized, ["highlight", "هايلايت"])) {
    state.captionStyle = "highlight";
  }

  if (matches(normalized, ["tiktok", "تيك", "shorts", "ريل", "ريلز"])) {
    state.platformPreset = "tiktok";
    shouldApplyPresets = true;
  } else if (matches(normalized, ["instagram", "انستا", "ads", "اعلان", "إعلان"])) {
    state.platformPreset = "instagram";
    shouldApplyPresets = true;
  } else if (matches(normalized, ["youtube", "يوتيوب"])) {
    state.platformPreset = "youtube";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["صوت", "audio", "voice", "podcast"])) {
    state.audioPreset = "podcast";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["cinematic", "سينمائي", "grading", "color", "ألوان", "الوان"])) {
    state.colorPreset = "cinematic";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["vibrant", "حيوي", "social"])) {
    state.colorPreset = "vibrant";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["balanced", "متوازن"])) {
    state.colorPreset = "balanced";
    state.audioPreset = "balanced";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["تعليق صوتي", "voice over", "voiceover", "فويس"])) {
    actions.push("تم تجهيز ملاحظة Voice Over داخل التقرير النهائي");
  }

  if (captionStyleSelect) {
    captionStyleSelect.value = state.captionStyle;
  }

  if (liveCaptionNode) {
    liveCaptionNode.dataset.style = state.captionStyle;
  }

  syncCaptionLanguageControl();

  if (audioPresetSelect) {
    audioPresetSelect.value = state.audioPreset;
  }

  if (colorPresetSelect) {
    colorPresetSelect.value = state.colorPreset;
  }

  if (platformPresetSelect) {
    platformPresetSelect.value = state.platformPreset;
  }

  if (shouldGenerateCaptions) {
    actions.push(generateCaptions({ silent: true }));
  }

  if (shouldApplyPresets) {
    actions.push(applyPresetSelections({ silent: true }));
  }

  if (actions.length === 0) {
    actions.push("تم تسجيل الأمر كملاحظة، لكنه لم يحتو كلمات تشغيل كافية لتغيير الإعدادات.");
  }

  state.styleProfile.commands += 1;
  saveStyleProfile();

  state.assistantHistory.unshift({
    command: rawCommand,
    actions,
    time: new Date().toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  state.assistantHistory = state.assistantHistory.slice(0, 5);

  renderAssistantLog();
  renderStyleMemory();
  updateStatus("نفّذ المساعد الذكي طلبك", actions[0]);
}

function renderAssistantLog() {
  if (!assistantLogNode) {
    return;
  }

  assistantLogNode.innerHTML = "";

  if (state.assistantHistory.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا يوجد سجل أوامر بعد</strong>
        <span>نفّذ أمرًا واحدًا على الأقل ليظهر سجل التنفيذ الذكي هنا.</span>
      </div>
    `;
    assistantLogNode.appendChild(empty);
    return;
  }

  state.assistantHistory.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "assistant-entry";
    const actionItems = entry.actions.map((action) => `<li>${action}</li>`).join("");
    card.innerHTML = `
      <time>${entry.time}</time>
      <strong>${entry.command}</strong>
      <ul>${actionItems}</ul>
    `;
    assistantLogNode.appendChild(card);
  });
}

function renderStyleMemory() {
  if (!styleMemoryNode) {
    return;
  }

  styleMemoryNode.innerHTML = "";

  const learnedItems = [
    {
      title: "المنصة المفضلة",
      description: "أكثر منصة تطبقها في الجلسات الحالية",
      value: getTopPreference("platform", "youtube", labels.platform)
    },
    {
      title: "بروفايل الصوت",
      description: "خيار المعالجة الصوتية الأكثر تكرارًا",
      value: getTopPreference("audio", "balanced", labels.audio)
    },
    {
      title: "ستايل الألوان",
      description: "الشكل اللوني الذي تميل إليه أكثر",
      value: getTopPreference("color", "balanced", labels.color)
    },
    {
      title: "ستايل الكابشن",
      description: "النمط النصي الأكثر استخدامًا",
      value: getTopPreference("captionStyle", "highlight", labels.captionStyle)
    },
    {
      title: "وضع القص الذكي",
      description: "أكثر محرك قص استخدمته حتى الآن",
      value: getTopPreference("smartcut", "auto", labels.smartcut)
    },
    {
      title: "إجمالي أوامر المساعد",
      description: "عدد الطلبات التي نفذها المساعد الذكي",
      value: `${state.styleProfile.commands} أمر`
    }
  ];

  learnedItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <span>${item.description}</span>
      </div>
      <span class="memory-pill">${item.value}</span>
    `;
    styleMemoryNode.appendChild(row);
  });
}

function applyLearnedStyle() {
  state.platformPreset = getTopPreferenceKey("platform", "youtube");
  state.audioPreset = getTopPreferenceKey("audio", "balanced");
  state.colorPreset = getTopPreferenceKey("color", "balanced");
  state.captionStyle = getTopPreferenceKey("captionStyle", "highlight");
  state.captionLanguage = getTopPreferenceKey("captionLanguage", "ar");

  if (platformPresetSelect) {
    platformPresetSelect.value = state.platformPreset;
  }

  if (audioPresetSelect) {
    audioPresetSelect.value = state.audioPreset;
  }

  if (colorPresetSelect) {
    colorPresetSelect.value = state.colorPreset;
  }

  if (captionStyleSelect) {
    captionStyleSelect.value = state.captionStyle;
  }

  syncCaptionLanguageControl();
  applyPresetSelections({ silent: true, record: false });

  if (state.captions.length > 0) {
    generateCaptions({ silent: true, record: false });
  } else {
    liveCaptionNode.dataset.style = state.captionStyle;
  }

  updateStatus("تم تطبيق الأسلوب المتعلم", "جرى تحميل أكثر تفضيلاتك استخدامًا داخل الجلسات السابقة.");
}

function exportProjectReport() {
  const report = {
    product: "SmartCut AI Browser Prototype",
    generatedAt: new Date().toISOString(),
    source: state.currentSourceName,
    selectedClips: state.clips.filter((clip) => state.activeClipIds.has(clip.id)),
    removedClips: state.clips.filter((clip) => !state.activeClipIds.has(clip.id)),
    presets: {
      platform: state.platformPreset,
      audio: state.audioPreset,
      color: state.colorPreset,
      exportName: state.exportName
    },
    captions: state.captions,
    assistantHistory: state.assistantHistory,
    learnedStyle: state.styleProfile
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.exportName || "smartcut-project"}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);

  updateStatus("تم تصدير تقرير المشروع", `تم حفظ ملف JSON يحتوي القصات، الترجمة، والإعدادات باسم ${link.download}.`);
}

function handleVideoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  if (state.uploadedVideoUrl) {
    URL.revokeObjectURL(state.uploadedVideoUrl);
  }

  state.uploadedVideoUrl = URL.createObjectURL(file);
  state.currentSourceName = file.name;

  if (studioVideo) {
    studioVideo.src = state.uploadedVideoUrl;
    studioVideo.hidden = false;
  }

  if (studioImage) {
    studioImage.hidden = true;
  }

  updateStatus(
    "جارٍ تجهيز الفيديو المرفوع",
    `${file.name} • ${(file.size / (1024 * 1024)).toFixed(2)} MB • يمكنك الآن اختبار القص والبحث والتصدير على نفس الواجهة.`
  );
}

function syncCaptionToTime(time) {
  const source = state.captions.length > 0 ? state.captions : buildCaptionPreviewSource();
  const caption = findClosestCue(source, time);

  if (liveCaptionNode) {
    liveCaptionNode.dataset.style = state.captionStyle;
    liveCaptionNode.textContent = caption?.text || "النص التلقائي سيظهر هنا بعد تشغيل مولد الـ Captions";
  }

  if (captionListNode && state.captions.length > 0) {
    captionListNode.querySelectorAll(".caption-item").forEach((item, index) => {
      const currentCue = state.captions[index];
      item.classList.toggle("is-active", currentCue ? currentCue.id === caption?.id : false);
    });
  }
}

function jumpToTime(time) {
  const safeTime = Number.isFinite(time) ? time : 0;

  if (studioVideo && !studioVideo.hidden && Number.isFinite(studioVideo.duration)) {
    studioVideo.currentTime = Math.min(safeTime, studioVideo.duration || safeTime);
  }

  const matchingClip = state.clips.find((clip) => safeTime >= clip.start && safeTime <= clip.end);
  if (matchingClip) {
    state.selectedClipId = matchingClip.id;
    renderClipLane();
  }

  syncCaptionToTime(safeTime);
}

function composeCaptionText(item) {
  const arText = compressText(item.ar, state.captionDensity);
  const enText = compressText(item.en, state.captionDensity);

  if (state.captionLanguage === "ar") {
    return arText;
  }

  if (state.captionLanguage === "en") {
    return enText;
  }

  return `${arText}\n${enText}`;
}

function buildCaptionPreviewSource() {
  return getVisibleTranscript().map((item) => ({
    id: `preview-${item.id}`,
    time: item.time,
    text: composeCaptionText(item)
  }));
}

function getVisibleTranscript() {
  return state.transcript.filter((item) => {
    const clip = state.clips.find((candidate) => item.time >= candidate.start && item.time <= candidate.end);
    return clip ? state.activeClipIds.has(clip.id) : true;
  });
}

function getSelectedTime() {
  const selectedClip = state.clips.find((clip) => clip.id === state.selectedClipId);
  return selectedClip?.start || 0;
}

function findClosestCue(cues, time) {
  if (!Array.isArray(cues) || cues.length === 0) {
    return null;
  }

  const ordered = [...cues].sort((left, right) => left.time - right.time);
  let current = ordered[0];

  ordered.forEach((cue) => {
    if (cue.time <= time) {
      current = cue;
    }
  });

  return current;
}

function compressText(text, density) {
  if (density === "detailed") {
    return text;
  }

  const words = text.split(" ");
  if (density === "short") {
    return `${words.slice(0, Math.min(7, words.length)).join(" ")}${words.length > 7 ? "..." : ""}`;
  }

  return `${words.slice(0, Math.min(12, words.length)).join(" ")}${words.length > 12 ? "..." : ""}`;
}

function updateStatus(title, meta) {
  if (analysisStatusNode) {
    analysisStatusNode.textContent = title;
  }

  if (analysisMetaNode) {
    analysisMetaNode.textContent = meta;
  }
}

function matches(source, tokens) {
  return tokens.some((token) => source.includes(token.toLowerCase()));
}

function formatTime(value) {
  const totalSeconds = Math.max(0, Math.round(value || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function createEmptyProfile() {
  return {
    platform: {},
    audio: {},
    color: {},
    captionStyle: {},
    captionLanguage: {},
    smartcut: {},
    commands: 0
  };
}

function loadStyleProfile() {
  try {
    const rawValue = window.localStorage.getItem(STYLE_PROFILE_KEY);
    return rawValue ? { ...createEmptyProfile(), ...JSON.parse(rawValue) } : createEmptyProfile();
  } catch {
    return createEmptyProfile();
  }
}

function saveStyleProfile() {
  try {
    window.localStorage.setItem(STYLE_PROFILE_KEY, JSON.stringify(state.styleProfile));
  } catch {
    // Ignore storage failures quietly.
  }
}

function incrementPreference(bucket, key) {
  if (!state.styleProfile[bucket]) {
    state.styleProfile[bucket] = {};
  }

  state.styleProfile[bucket][key] = (state.styleProfile[bucket][key] || 0) + 1;
  saveStyleProfile();
}

function getTopPreference(bucket, fallbackKey, labelMap) {
  const key = getTopPreferenceKey(bucket, fallbackKey);
  return labelMap[key] || labelMap[fallbackKey] || fallbackKey;
}

function getTopPreferenceKey(bucket, fallbackKey) {
  const entries = Object.entries(state.styleProfile[bucket] || {});
  if (entries.length === 0) {
    return fallbackKey;
  }

  entries.sort((left, right) => right[1] - left[1]);
  return entries[0][0];
}
