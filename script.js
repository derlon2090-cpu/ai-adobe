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
const DEMO_DURATION = 64;

const projectTemplate = {
  duration: DEMO_DURATION,
  voiceOverText:
    "حوّل المادة الخام إلى فيديو جاهز للنشر خلال دقائق مع القص الذكي والكابشن والتصدير حسب المنصة.",
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
  },
  contentType: {
    tutorial: "Tutorial",
    vlog: "Vlog",
    commercial: "Commercial",
    podcast: "Podcast"
  },
  editTemplate: {
    tutorial: "Tutorial Flow",
    viral: "Viral Reel",
    podcast: "Podcast Focus",
    commercial: "Commercial Punch"
  },
  transition: {
    cut: "Hard Cut",
    fade: "Smooth Fade",
    zoom: "Zoom Punch",
    swipe: "Swipe Motion"
  },
  effect: {
    clean: "Clean FX",
    glow: "Neon Glow",
    focus: "Focus Frame",
    scan: "Scanlines"
  }
};

const state = {
  clips: [],
  transcript: [],
  activeClipIds: new Set(),
  selectedClipId: null,
  captionLanguage: "ar",
  captionStyle: "highlight",
  captionDensity: "balanced",
  captions: [],
  audioPreset: "balanced",
  colorPreset: "balanced",
  platformPreset: "youtube",
  contentType: "tutorial",
  contentLanguage: "ar",
  editTemplate: "tutorial",
  transition: "cut",
  effect: "clean",
  sfxEnabled: true,
  exportName: "smartcut-final-v1",
  assistantHistory: [],
  currentSourceName: "المشروع التجريبي",
  uploadedVideoUrl: null,
  uploadedFile: null,
  currentDuration: DEMO_DURATION,
  analysisFacts: null,
  analysisMode: "demo",
  audioAnalysis: null,
  styleProfile: loadStyleProfile(),
  voiceOver: {
    text: projectTemplate.voiceOverText,
    selectedVoice: "",
    rate: 1,
    pitch: 1,
    attached: false,
    lastPreviewAt: null
  },
  audioNodes: {
    context: null,
    source: null,
    highpass: null,
    lowpass: null,
    highshelf: null,
    compressor: null,
    gain: null
  },
  speaking: false
};

const refs = {
  rotatingPromptNode: document.querySelector("[data-rotating-prompt]"),
  consolePromptNode: document.querySelector("[data-console-text]"),
  revealNodes: document.querySelectorAll("[data-reveal]"),
  yearNode: document.getElementById("year"),
  videoUploadInput: document.getElementById("videoUpload"),
  loadSampleBtn: document.getElementById("loadSampleBtn"),
  analyzeMediaBtn: document.getElementById("analyzeMediaBtn"),
  studioCanvas: document.getElementById("studioCanvas"),
  studioVideo: document.getElementById("studioVideo"),
  studioImage: document.getElementById("studioImage"),
  analysisStatusNode: document.getElementById("analysisStatus"),
  analysisMetaNode: document.getElementById("analysisMeta"),
  clipLaneNode: document.getElementById("clipLane"),
  liveCaptionNode: document.getElementById("liveCaption"),
  platformChipNode: document.getElementById("platformChip"),
  audioChipNode: document.getElementById("audioChip"),
  colorChipNode: document.getElementById("colorChip"),
  templateChipNode: document.getElementById("templateChip"),
  effectChipNode: document.getElementById("effectChip"),
  selectedClipsCountNode: document.getElementById("selectedClipsCount"),
  savedSecondsNode: document.getElementById("savedSeconds"),
  exportPresetValueNode: document.getElementById("exportPresetValue"),
  captionStateValueNode: document.getElementById("captionStateValue"),
  voiceOverStateValueNode: document.getElementById("voiceOverStateValue"),
  fxStateValueNode: document.getElementById("fxStateValue"),
  smartCutNoteNode: document.getElementById("smartCutNote"),
  transcriptInput: document.getElementById("transcriptInput"),
  contentTypeSelect: document.getElementById("contentTypeSelect"),
  contentLanguageSelect: document.getElementById("contentLanguageSelect"),
  analysisFactsNode: document.getElementById("analysisFacts"),
  captionStyleSelect: document.getElementById("captionStyleSelect"),
  captionDensitySelect: document.getElementById("captionDensitySelect"),
  captionLanguageControl: document.getElementById("captionLanguageControl"),
  generateCaptionsBtn: document.getElementById("generateCaptionsBtn"),
  captionListNode: document.getElementById("captionList"),
  editTemplateSelect: document.getElementById("editTemplateSelect"),
  transitionSelect: document.getElementById("transitionSelect"),
  effectSelect: document.getElementById("effectSelect"),
  sfxToggle: document.getElementById("sfxToggle"),
  applyEditTemplateBtn: document.getElementById("applyEditTemplateBtn"),
  editSuggestionsNode: document.getElementById("editSuggestions"),
  audioPresetSelect: document.getElementById("audioPresetSelect"),
  colorPresetSelect: document.getElementById("colorPresetSelect"),
  platformPresetSelect: document.getElementById("platformPresetSelect"),
  exportNameInput: document.getElementById("exportNameInput"),
  applyPresetBtn: document.getElementById("applyPresetBtn"),
  voiceOverText: document.getElementById("voiceOverText"),
  voiceSelect: document.getElementById("voiceSelect"),
  voiceRateInput: document.getElementById("voiceRateInput"),
  voicePitchInput: document.getElementById("voicePitchInput"),
  previewVoiceOverBtn: document.getElementById("previewVoiceOverBtn"),
  stopVoiceOverBtn: document.getElementById("stopVoiceOverBtn"),
  useVoiceOverBtn: document.getElementById("useVoiceOverBtn"),
  voiceOverStatusNode: document.getElementById("voiceOverStatus"),
  assistantCommandInput: document.getElementById("assistantCommandInput"),
  runAssistantBtn: document.getElementById("runAssistantBtn"),
  assistantLogNode: document.getElementById("assistantLog"),
  transcriptSearchInput: document.getElementById("transcriptSearchInput"),
  searchResultsNode: document.getElementById("searchResults"),
  styleMemoryNode: document.getElementById("styleMemory"),
  applyLearnedStyleBtn: document.getElementById("applyLearnedStyleBtn"),
  exportPlanBtn: document.getElementById("exportPlanBtn"),
  coverageNodes: document.querySelectorAll("[data-coverage]"),
  fxQuickButtons: document.querySelectorAll("[data-effect-quick]")
};

init();

function init() {
  if (refs.yearNode) {
    refs.yearNode.textContent = String(new Date().getFullYear());
  }

  startPromptLoops();
  setupRevealObserver();
  populateVoiceList();
  resetWorkspace();
  wireEvents();
  updateStatus(
    "تم تحميل المشروع التجريبي",
    "يمكنك الآن تحليل المشروع، تجربة القص الذكي، توليد الكابشن، أو رفع فيديوك المحلي."
  );
}

function startPromptLoops() {
  if (refs.rotatingPromptNode) {
    let promptIndex = 0;
    window.setInterval(() => {
      promptIndex = (promptIndex + 1) % rotatingPrompts.length;
      refs.rotatingPromptNode.textContent = rotatingPrompts[promptIndex];
    }, 2600);
  }

  if (refs.consolePromptNode) {
    let consoleIndex = 0;
    window.setInterval(() => {
      consoleIndex = (consoleIndex + 1) % consolePrompts.length;
      refs.consolePromptNode.textContent = consolePrompts[consoleIndex];
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

    refs.revealNodes.forEach((node) => observer.observe(node));
    return;
  }

  refs.revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function wireEvents() {
  document.querySelectorAll("[data-smartcut]").forEach((button) => {
    button.addEventListener("click", () => applySmartCut(button.dataset.smartcut));
  });

  refs.captionLanguageControl?.querySelectorAll("[data-caption-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      state.captionLanguage = button.dataset.captionLang || "ar";
      syncCaptionLanguageControl();
      if (state.captions.length > 0) {
        generateCaptions({ silent: true, record: false });
      } else {
        syncCaptionToTime(getSelectedTime());
      }
    });
  });

  refs.captionStyleSelect?.addEventListener("change", () => {
    state.captionStyle = refs.captionStyleSelect.value;
    if (refs.liveCaptionNode) {
      refs.liveCaptionNode.dataset.style = state.captionStyle;
    }
    if (state.captions.length > 0) {
      generateCaptions({ silent: true, record: false });
    }
  });

  refs.captionDensitySelect?.addEventListener("change", () => {
    state.captionDensity = refs.captionDensitySelect.value;
    if (state.captions.length > 0) {
      generateCaptions({ silent: true, record: false });
    }
  });

  refs.generateCaptionsBtn?.addEventListener("click", () => generateCaptions());
  refs.applyPresetBtn?.addEventListener("click", () => applyPresetSelections());
  refs.applyEditTemplateBtn?.addEventListener("click", () => applyEditTemplate());
  refs.analyzeMediaBtn?.addEventListener("click", async () => analyzeCurrentMedia());
  refs.loadSampleBtn?.addEventListener("click", () => {
    resetWorkspace();
    updateStatus(
      "تمت إعادة تحميل المشروع التجريبي",
      "يمكنك بدء تجربة جديدة فورًا مع الاحتفاظ بذاكرة الأسلوب المتعلمة."
    );
  });

  refs.videoUploadInput?.addEventListener("change", handleVideoUpload);

  refs.audioPresetSelect?.addEventListener("change", () => {
    state.audioPreset = refs.audioPresetSelect.value;
    syncPreviewState();
  });

  refs.colorPresetSelect?.addEventListener("change", () => {
    state.colorPreset = refs.colorPresetSelect.value;
    syncPreviewState();
  });

  refs.platformPresetSelect?.addEventListener("change", () => {
    state.platformPreset = refs.platformPresetSelect.value;
    syncPreviewState();
  });

  refs.contentTypeSelect?.addEventListener("change", () => {
    state.contentType = refs.contentTypeSelect.value;
    renderAnalysisFacts();
    applyContentRecommendations({ silent: true, record: false });
  });

  refs.contentLanguageSelect?.addEventListener("change", () => {
    state.contentLanguage = refs.contentLanguageSelect.value;
  });

  refs.effectSelect?.addEventListener("change", () => {
    state.effect = refs.effectSelect.value;
    syncPreviewState();
    syncFxQuickButtons();
    renderCoverageStatus();
  });

  refs.editTemplateSelect?.addEventListener("change", () => {
    state.editTemplate = refs.editTemplateSelect.value;
    syncPreviewState();
  });

  refs.transitionSelect?.addEventListener("change", () => {
    state.transition = refs.transitionSelect.value;
  });

  refs.sfxToggle?.addEventListener("change", () => {
    state.sfxEnabled = refs.sfxToggle.checked;
  });

  refs.fxQuickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.effect = button.dataset.effectQuick || "clean";
      if (refs.effectSelect) {
        refs.effectSelect.value = state.effect;
      }
      syncPreviewState();
      syncFxQuickButtons();
      renderCoverageStatus();
      renderEditSuggestions();
      renderSummary();
    });
  });

  refs.exportNameInput?.addEventListener("input", () => {
    state.exportName = refs.exportNameInput.value.trim() || "smartcut-final-v1";
    renderSummary();
  });

  refs.runAssistantBtn?.addEventListener("click", async () => {
    await runAssistantCommand(refs.assistantCommandInput?.value || "");
  });

  refs.assistantCommandInput?.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await runAssistantCommand(refs.assistantCommandInput?.value || "");
    }
  });

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", async () => {
      const command = button.dataset.command || "";
      if (refs.assistantCommandInput) {
        refs.assistantCommandInput.value = command;
      }
      await runAssistantCommand(command);
    });
  });

  refs.transcriptSearchInput?.addEventListener("input", () => {
    renderSearchResults(refs.transcriptSearchInput?.value || "");
  });

  refs.applyLearnedStyleBtn?.addEventListener("click", () => {
    applyLearnedStyle();
  });

  refs.exportPlanBtn?.addEventListener("click", () => {
    exportProjectReport();
  });

  refs.previewVoiceOverBtn?.addEventListener("click", () => {
    previewVoiceOver();
  });

  refs.stopVoiceOverBtn?.addEventListener("click", () => {
    stopVoiceOver();
  });

  refs.useVoiceOverBtn?.addEventListener("click", () => {
    attachVoiceOverToProject();
  });

  refs.voiceSelect?.addEventListener("change", () => {
    state.voiceOver.selectedVoice = refs.voiceSelect.value;
  });

  refs.voiceRateInput?.addEventListener("input", () => {
    state.voiceOver.rate = Number(refs.voiceRateInput.value);
    renderVoiceOverStatus("تم تحديث سرعة القراءة", `${state.voiceOver.rate.toFixed(2)}x`);
  });

  refs.voicePitchInput?.addEventListener("input", () => {
    state.voiceOver.pitch = Number(refs.voicePitchInput.value);
    renderVoiceOverStatus("تم تحديث النبرة", `Pitch ${state.voiceOver.pitch.toFixed(2)}`);
  });

  refs.studioVideo?.addEventListener("loadedmetadata", async () => {
    state.currentDuration = refs.studioVideo?.duration || DEMO_DURATION;
    updateStatus(
      "تم تحميل الفيديو بنجاح",
      `المصدر الحالي: ${state.currentSourceName} • المدة ${formatTime(state.currentDuration)} • اضغط Analyze Media لبناء المقاطع.`
    );
  });

  refs.studioVideo?.addEventListener("timeupdate", () => {
    syncCaptionToTime(refs.studioVideo?.currentTime || 0);
  });

  refs.studioVideo?.addEventListener("play", async () => {
    await ensureAudioEngine();
    applyAudioPresetToEngine();
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
  }
}

function resetWorkspace() {
  stopVoiceOver();

  if (state.uploadedVideoUrl) {
    URL.revokeObjectURL(state.uploadedVideoUrl);
    state.uploadedVideoUrl = null;
  }

  state.uploadedFile = null;
  state.currentSourceName = "المشروع التجريبي";
  state.currentDuration = DEMO_DURATION;
  state.analysisMode = "demo";
  state.audioAnalysis = buildTemplateAudioAnalysis(DEMO_DURATION);
  state.analysisFacts = null;
  state.contentType = "tutorial";
  state.contentLanguage = "ar";
  state.captionLanguage = "ar";
  state.captionStyle = "highlight";
  state.captionDensity = "balanced";
  state.captions = [];
  state.audioPreset = "balanced";
  state.colorPreset = "balanced";
  state.platformPreset = "youtube";
  state.editTemplate = "tutorial";
  state.transition = "cut";
  state.effect = "clean";
  state.sfxEnabled = true;
  state.exportName = "smartcut-final-v1";
  state.assistantHistory = [];
  state.voiceOver = {
    text: projectTemplate.voiceOverText,
    selectedVoice: state.voiceOver.selectedVoice,
    rate: 1,
    pitch: 1,
    attached: false,
    lastPreviewAt: null
  };

  state.transcript = scaleTranscript(projectTemplate.transcript, projectTemplate.duration, DEMO_DURATION);
  state.clips = applyClipDecorators(
    projectTemplate.clips.map((clip) => ({ ...clip })),
    state.transition,
    state.effect
  );
  state.activeClipIds = new Set(state.clips.map((clip) => clip.id));
  state.selectedClipId = state.clips[0]?.id || null;

  if (refs.videoUploadInput) {
    refs.videoUploadInput.value = "";
  }

  if (refs.studioVideo) {
    refs.studioVideo.pause();
    refs.studioVideo.removeAttribute("src");
    refs.studioVideo.load();
    refs.studioVideo.hidden = true;
  }

  if (refs.studioImage) {
    refs.studioImage.hidden = false;
  }

  if (refs.transcriptInput) {
    refs.transcriptInput.value = state.transcript.map((item) => item.ar).join("\n");
  }

  syncControlsFromState();
  syncPreviewState();
  renderAnalysisFacts();
  renderClipLane();
  renderSummary();
  renderCaptionList();
  renderEditSuggestions();
  renderSearchResults("");
  renderAssistantLog();
  renderStyleMemory();
  renderVoiceOverStatus("جاهز للتعليق الصوتي", "يمكنك معاينة الصوت أو ربطه بالمشروع.");
  syncCaptionToTime(getSelectedTime());
  renderCoverageStatus();
}

function syncControlsFromState() {
  if (refs.contentTypeSelect) refs.contentTypeSelect.value = state.contentType;
  if (refs.contentLanguageSelect) refs.contentLanguageSelect.value = state.contentLanguage;
  if (refs.captionStyleSelect) refs.captionStyleSelect.value = state.captionStyle;
  if (refs.captionDensitySelect) refs.captionDensitySelect.value = state.captionDensity;
  if (refs.audioPresetSelect) refs.audioPresetSelect.value = state.audioPreset;
  if (refs.colorPresetSelect) refs.colorPresetSelect.value = state.colorPreset;
  if (refs.platformPresetSelect) refs.platformPresetSelect.value = state.platformPreset;
  if (refs.editTemplateSelect) refs.editTemplateSelect.value = state.editTemplate;
  if (refs.transitionSelect) refs.transitionSelect.value = state.transition;
  if (refs.effectSelect) refs.effectSelect.value = state.effect;
  if (refs.sfxToggle) refs.sfxToggle.checked = state.sfxEnabled;
  if (refs.exportNameInput) refs.exportNameInput.value = state.exportName;
  if (refs.voiceOverText) refs.voiceOverText.value = state.voiceOver.text;
  if (refs.voiceRateInput) refs.voiceRateInput.value = String(state.voiceOver.rate);
  if (refs.voicePitchInput) refs.voicePitchInput.value = String(state.voiceOver.pitch);
  syncCaptionLanguageControl();
  syncFxQuickButtons();
}

function syncCaptionLanguageControl() {
  refs.captionLanguageControl?.querySelectorAll("[data-caption-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.captionLang === state.captionLanguage);
  });
}

function syncPreviewState() {
  if (!refs.studioCanvas) {
    return;
  }

  refs.studioCanvas.dataset.ratio = state.platformPreset;
  refs.studioCanvas.dataset.look = state.colorPreset;
  refs.studioCanvas.dataset.effect = state.effect;

  if (refs.platformChipNode) refs.platformChipNode.textContent = labels.platform[state.platformPreset];
  if (refs.audioChipNode) refs.audioChipNode.textContent = labels.audio[state.audioPreset];
  if (refs.colorChipNode) refs.colorChipNode.textContent = labels.color[state.colorPreset];
  if (refs.templateChipNode) refs.templateChipNode.textContent = labels.editTemplate[state.editTemplate];
  if (refs.effectChipNode) refs.effectChipNode.textContent = labels.effect[state.effect];

  if (refs.liveCaptionNode) {
    refs.liveCaptionNode.dataset.style = state.captionStyle;
  }
}

async function handleVideoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  if (state.uploadedVideoUrl) {
    URL.revokeObjectURL(state.uploadedVideoUrl);
  }

  state.uploadedFile = file;
  state.currentSourceName = file.name;
  state.uploadedVideoUrl = URL.createObjectURL(file);

  if (refs.studioVideo) {
    refs.studioVideo.src = state.uploadedVideoUrl;
    refs.studioVideo.hidden = false;
  }

  if (refs.studioImage) {
    refs.studioImage.hidden = true;
  }

  updateStatus(
    "جارٍ تجهيز الفيديو المرفوع",
    `${file.name} • ${(file.size / (1024 * 1024)).toFixed(2)} MB • بعد اكتمال التحميل اضغط Analyze Media.`
  );
}

async function analyzeCurrentMedia() {
  updateStatus("جارٍ تحليل المشروع", "يتم الآن بناء المقاطع، قراءة الترانسكريبت، وتقدير مساحات الصمت والطاقة.");

  const duration = await resolveCurrentDuration();
  state.currentDuration = duration;
  state.contentType = refs.contentTypeSelect?.value || state.contentType;
  state.contentLanguage = refs.contentLanguageSelect?.value || state.contentLanguage;

  const transcript = buildTranscriptFromInput(duration);
  const audioAnalysis = state.uploadedFile
    ? await analyzeAudioFile(state.uploadedFile, duration)
    : buildTemplateAudioAnalysis(duration);

  state.audioAnalysis = audioAnalysis;
  state.analysisMode = audioAnalysis.mode;
  state.transcript = transcript;
  state.clips = applyClipDecorators(
    buildClipsFromAnalysis(duration, transcript, audioAnalysis),
    state.transition,
    state.effect
  );
  state.activeClipIds = new Set(state.clips.map((clip) => clip.id));
  state.selectedClipId = state.clips[0]?.id || null;
  state.captions = [];
  state.analysisFacts = {
    duration,
    transcriptCount: transcript.length,
    clipCount: state.clips.length,
    silenceRatio: audioAnalysis.silenceRatio,
    mode: audioAnalysis.mode,
    contentType: state.contentType
  };

  renderAnalysisFacts();
  renderClipLane();
  renderSummary();
  renderCaptionList();
  renderEditSuggestions();
  renderSearchResults(refs.transcriptSearchInput?.value || "");
  syncCaptionToTime(getSelectedTime());
  applyContentRecommendations({ silent: true, record: false });
  renderCoverageStatus();

  updateStatus(
    "اكتمل تحليل المشروع",
    `${state.clips.length} مقاطع • ${transcript.length} جمل قابلة للبحث • وضع التحليل: ${renderAnalysisMode(audioAnalysis.mode)}`
  );
}

async function resolveCurrentDuration() {
  if (!refs.studioVideo || refs.studioVideo.hidden) {
    return DEMO_DURATION;
  }

  if (Number.isFinite(refs.studioVideo.duration) && refs.studioVideo.duration > 0) {
    return refs.studioVideo.duration;
  }

  await new Promise((resolve) => {
    refs.studioVideo?.addEventListener("loadedmetadata", resolve, { once: true });
  });

  return refs.studioVideo?.duration || DEMO_DURATION;
}

function buildTranscriptFromInput(duration) {
  const rawValue = refs.transcriptInput?.value.trim() || "";
  if (!rawValue) {
    return scaleTranscript(projectTemplate.transcript, projectTemplate.duration, duration);
  }

  const lines = rawValue
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return scaleTranscript(projectTemplate.transcript, projectTemplate.duration, duration);
  }

  const slot = Math.max(1, duration / Math.max(lines.length, 1));

  return lines.map((line, index) => {
    let ar = line;
    let en = line;

    if (line.includes("||")) {
      const parts = line.split("||").map((part) => part.trim());
      ar = parts[0] || line;
      en = parts[1] || parts[0] || line;
    } else if (state.contentLanguage === "en") {
      en = line;
      ar = line;
    } else if (state.contentLanguage === "bi") {
      ar = line;
      en = line;
    }

    return {
      id: `user-${index + 1}`,
      time: Math.min(duration - 1, Math.max(0, Number((index * slot + 1).toFixed(1)))),
      ar,
      en
    };
  });
}

async function analyzeAudioFile(file, duration) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return buildFallbackAudioAnalysis(duration, "browser-fallback");
  }

  let analysisContext;

  try {
    const buffer = await file.arrayBuffer();
    analysisContext = new AudioContextCtor();
    const decoded = await analysisContext.decodeAudioData(buffer.slice(0));
    const channelCount = Math.max(1, decoded.numberOfChannels);
    const sampleRate = decoded.sampleRate;
    const samplesPerWindow = Math.max(1, Math.floor(sampleRate * 0.5));
    const windows = [];

    for (let start = 0; start < decoded.length; start += samplesPerWindow) {
      let sumSquares = 0;
      let count = 0;

      for (let channel = 0; channel < channelCount; channel += 1) {
        const channelData = decoded.getChannelData(channel);
        const end = Math.min(channelData.length, start + samplesPerWindow);

        for (let index = start; index < end; index += 1) {
          const sample = channelData[index];
          sumSquares += sample * sample;
          count += 1;
        }
      }

      const rms = count > 0 ? Math.sqrt(sumSquares / count) : 0;
      windows.push({
        time: Number((start / sampleRate).toFixed(2)),
        rms
      });
    }

    const averageRms = windows.reduce((total, windowItem) => total + windowItem.rms, 0) / Math.max(windows.length, 1);
    const peak = Math.max(...windows.map((item) => item.rms), 0.0001);
    const threshold = Math.max(0.01, averageRms * 0.62);
    const windowsWithFlags = windows.map((item) => ({
      ...item,
      isSilent: item.rms < threshold
    }));
    const silenceRatio =
      windowsWithFlags.filter((item) => item.isSilent).length / Math.max(windowsWithFlags.length, 1);

    return {
      mode: "audio",
      windows: windowsWithFlags,
      silenceRatio,
      averageRms,
      peak,
      duration
    };
  } catch {
    return buildFallbackAudioAnalysis(duration, "heuristic");
  } finally {
    if (analysisContext && typeof analysisContext.close === "function") {
      analysisContext.close().catch(() => {});
    }
  }
}

function buildFallbackAudioAnalysis(duration, mode = "heuristic") {
  const windows = [];
  const step = 0.5;
  const count = Math.max(1, Math.floor(duration / step));

  for (let index = 0; index < count; index += 1) {
    const time = Number((index * step).toFixed(2));
    const rhythmicValue = 0.03 + Math.abs(Math.sin(index * 0.73)) * 0.06;
    const isSilent = index % 11 === 0 || index % 17 === 0;
    windows.push({
      time,
      rms: isSilent ? 0.006 : rhythmicValue,
      isSilent
    });
  }

  return {
    mode,
    windows,
    silenceRatio: windows.filter((item) => item.isSilent).length / windows.length,
    averageRms: 0.045,
    peak: 0.09,
    duration
  };
}

function buildTemplateAudioAnalysis(duration) {
  const windows = [];
  const step = 0.5;
  const count = Math.max(1, Math.floor(duration / step));

  for (let index = 0; index < count; index += 1) {
    const time = Number((index * step).toFixed(2));
    const isSilent = time >= 28 && time <= 31.5;
    const rms = isSilent ? 0.004 : 0.038 + Math.abs(Math.sin(index * 0.5)) * 0.04;
    windows.push({ time, rms, isSilent });
  }

  return {
    mode: "demo",
    windows,
    silenceRatio: 0.14,
    averageRms: 0.052,
    peak: 0.094,
    duration
  };
}

function buildClipsFromAnalysis(duration, transcript, audioAnalysis) {
  const segmentCount = clamp(Math.round(duration / 8), 5, 10);
  const segmentSize = duration / segmentCount;
  const clips = [];

  for (let index = 0; index < segmentCount; index += 1) {
    const start = Number((index * segmentSize).toFixed(1));
    const end = Number((index === segmentCount - 1 ? duration : (index + 1) * segmentSize).toFixed(1));
    const relatedTranscript = transcript.filter((item) => item.time >= start && item.time < end);
    const segmentWindows = audioAnalysis.windows.filter((item) => item.time >= start && item.time < end);
    const averageRms =
      segmentWindows.reduce((total, item) => total + item.rms, 0) / Math.max(segmentWindows.length, 1);
    const segmentSilenceSeconds = segmentWindows.filter((item) => item.isSilent).length * 0.5;
    const peakWeight = audioAnalysis.peak ? averageRms / audioAnalysis.peak : 0.5;
    const transcriptBoost = Math.min(16, relatedTranscript.length * 4);
    const contentBoost = getContentBoost(index, segmentCount, state.contentType);
    const score = clamp(Math.round(58 + peakWeight * 28 + transcriptBoost + contentBoost - segmentSilenceSeconds * 7), 28, 98);

    clips.push({
      id: `clip-${index + 1}`,
      title: buildClipTitle(index, relatedTranscript),
      start,
      end,
      score,
      silence: Number(segmentSilenceSeconds.toFixed(1))
    });
  }

  return clips;
}

function getContentBoost(index, totalSegments, contentType) {
  if (contentType === "commercial") {
    return index === 0 ? 16 : index === totalSegments - 1 ? 12 : 6;
  }

  if (contentType === "podcast") {
    return index > 0 && index < totalSegments - 1 ? 10 : 5;
  }

  if (contentType === "vlog") {
    return index === 0 ? 12 : Math.max(0, 10 - index);
  }

  return index === 0 ? 14 : index === totalSegments - 1 ? 9 : 7;
}

function buildClipTitle(index, relatedTranscript) {
  if (relatedTranscript.length > 0) {
    const seed = relatedTranscript[0].ar || relatedTranscript[0].en || `Segment ${index + 1}`;
    return compressText(seed.replace(/[.،]/g, ""), "short");
  }

  const titlesByType = {
    tutorial: ["افتتاحية", "شرح سريع", "عرض الميزة", "تفصيل عملي", "خلاصة", "دعوة للإجراء"],
    vlog: ["هوك سريع", "دخول المشهد", "لقطة يومية", "رد فعل", "خلاصة", "ختام"],
    commercial: ["عرض جذاب", "المشكلة", "الحل", "قيمة المنتج", "عرض سريع", "CTA"],
    podcast: ["افتتاحية", "الفكرة الرئيسية", "توضيح", "نقطة محورية", "استنتاج", "ختام"]
  };

  const source = titlesByType[state.contentType] || titlesByType.tutorial;
  return source[index] || `Segment ${index + 1}`;
}

function applyClipDecorators(clips, transition, effect) {
  return clips.map((clip, index) => ({
    ...clip,
    transition,
    effect,
    order: index + 1
  }));
}

function renderClipLane() {
  if (!refs.clipLaneNode) {
    return;
  }

  refs.clipLaneNode.innerHTML = "";

  const maxDuration = Math.max(...state.clips.map((clip) => clip.end - clip.start), 1);

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
        <span class="clip-time">${formatTime(clip.start)} - ${formatTime(clip.end)} • ${labels.transition[clip.transition]} • ${labels.effect[clip.effect]}</span>
      </div>
      <div class="clip-meter" style="--clip-width: ${width}%"><span></span></div>
      <div class="clip-score">${clip.score}%</div>
    `;

    button.addEventListener("click", () => {
      state.selectedClipId = clip.id;
      renderClipLane();
      jumpToTime(clip.start);
    });

    refs.clipLaneNode.appendChild(button);
  });
}

function renderSummary() {
  const selectedClips = state.clips.filter((clip) => state.activeClipIds.has(clip.id));
  const removedSeconds = state.clips
    .filter((clip) => !state.activeClipIds.has(clip.id))
    .reduce((total, clip) => total + (clip.end - clip.start), 0);

  if (refs.selectedClipsCountNode) refs.selectedClipsCountNode.textContent = String(selectedClips.length);
  if (refs.savedSecondsNode) refs.savedSecondsNode.textContent = `${Math.round(removedSeconds)}s`;
  if (refs.exportPresetValueNode) refs.exportPresetValueNode.textContent = labels.platform[state.platformPreset];
  if (refs.captionStateValueNode) {
    refs.captionStateValueNode.textContent = state.captions.length > 0 ? `${state.captions.length} cues` : "غير مولدة";
  }
  if (refs.voiceOverStateValueNode) {
    refs.voiceOverStateValueNode.textContent = state.voiceOver.attached
      ? "جاهز"
      : state.speaking
        ? "Previewing"
        : "غير نشط";
  }
  if (refs.fxStateValueNode) {
    refs.fxStateValueNode.textContent = labels.effect[state.effect];
  }
}

function renderAnalysisFacts() {
  if (!refs.analysisFactsNode) {
    return;
  }

  const facts = state.analysisFacts || {
    duration: state.currentDuration,
    transcriptCount: state.transcript.length,
    clipCount: state.clips.length,
    silenceRatio: state.audioAnalysis?.silenceRatio ?? 0.14,
    mode: state.analysisMode,
    contentType: state.contentType
  };

  refs.analysisFactsNode.innerHTML = "";

  const cards = [
    {
      title: "مدة المشروع",
      description: "زمن المادة الحالية التي ستُبنى عليها المقاطع",
      value: formatTime(facts.duration)
    },
    {
      title: "وضع التحليل",
      description: "هل تم التحليل من صوت فعلي أو من fallback ذكي",
      value: renderAnalysisMode(facts.mode)
    },
    {
      title: "إشارات الصمت",
      description: "تقدير نسبة المناطق الهادئة داخل الملف",
      value: `${Math.round((facts.silenceRatio || 0) * 100)}%`
    },
    {
      title: "نوع الفيديو",
      description: "يؤثر على الاقتراحات والقوالب والهوك",
      value: labels.contentType[facts.contentType]
    },
    {
      title: "عدد الجمل",
      description: "مقاطع النص المتاحة للبحث والكابشن",
      value: `${facts.transcriptCount}`
    },
    {
      title: "عدد المقاطع",
      description: "المشاهد المقترحة في التايم لاين الحالي",
      value: `${facts.clipCount}`
    }
  ];

  cards.forEach((card) => {
    const item = document.createElement("article");
    item.className = "analysis-item";
    item.innerHTML = `
      <strong>${card.title}</strong>
      <p>${card.description}</p>
      <span>${card.value}</span>
    `;
    refs.analysisFactsNode.appendChild(item);
  });
}

function generateCaptions(options = {}) {
  const { silent = false, record = true } = options;
  const transcriptSource = getVisibleTranscript();

  state.captions = transcriptSource.map((item, index) => ({
    id: `caption-${item.id}-${index}`,
    time: item.time,
    label: `Cue ${index + 1}`,
    text: composeCaptionText(item)
  }));

  if (record) {
    incrementPreference("captionLanguage", state.captionLanguage);
    incrementPreference("captionStyle", state.captionStyle);
  }

  renderCaptionList();
  renderSummary();
  syncCaptionToTime(getSelectedTime());
  renderStyleMemory();
  renderCoverageStatus();

  if (!silent) {
    updateStatus(
      "تم توليد الترجمة",
      `${state.captions.length} سطرًا جاهزًا بأسلوب ${labels.captionStyle[state.captionStyle]} و${labels.captionLanguage[state.captionLanguage]}.`
    );
  }

  return `تم توليد ${state.captions.length} سطر ترجمة`;
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

function renderCaptionList() {
  if (!refs.captionListNode) {
    return;
  }

  refs.captionListNode.innerHTML = "";

  if (state.captions.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا توجد Captions بعد</strong>
        <span>استخدم زر Generate Captions أو اطلب من المساعد تجهيزها لك.</span>
      </div>
    `;
    refs.captionListNode.appendChild(empty);
    return;
  }

  state.captions.forEach((caption) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "caption-item";
    if (Math.abs(caption.time - getSelectedTime()) < 0.6) {
      button.classList.add("is-active");
    }
    button.innerHTML = `
      <strong>${formatTime(caption.time)} • ${caption.label}</strong>
      <p>${caption.text}</p>
    `;
    button.addEventListener("click", () => jumpToTime(caption.time));
    refs.captionListNode.appendChild(button);
  });
}

function applySmartCut(mode, options = {}) {
  const { silent = false, record = true } = options;
  const allIds = state.clips.map((clip) => clip.id);
  let keptClips = [...state.clips];
  let note = "تمت استعادة جميع المشاهد كما هي.";

  if (mode === "auto") {
    keptClips = state.clips.filter((clip) => clip.silence < (clip.end - clip.start) * 0.32 && clip.score >= 64);
    note = "Auto Cut حذف المشاهد الأضعف والصمت الطويل مع الحفاظ على التسلسل العام.";
  } else if (mode === "best") {
    keptClips = [...state.clips]
      .sort((left, right) => right.score - left.score)
      .slice(0, clamp(Math.round(state.clips.length * 0.55), 3, 5))
      .sort((left, right) => left.start - right.start);
    note = "Best Takes أبقى اللقطات الأعلى تقييمًا لنسخة أكثر كثافة وجذبًا.";
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

  if (refs.smartCutNoteNode) refs.smartCutNoteNode.textContent = note;

  renderClipLane();
  renderSummary();
  renderSearchResults(refs.transcriptSearchInput?.value || "");

  if (state.captions.length > 0) {
    generateCaptions({ silent: true, record: false });
  } else {
    syncCaptionToTime(getSelectedTime());
  }

  renderStyleMemory();
  renderCoverageStatus();

  if (!silent) {
    updateStatus("تم تنفيذ القص الذكي", note);
  }

  return `تم تطبيق ${labels.smartcut[mode]}`;
}

function applyPresetSelections(options = {}) {
  const { silent = false, record = true } = options;

  state.audioPreset = refs.audioPresetSelect?.value || state.audioPreset;
  state.colorPreset = refs.colorPresetSelect?.value || state.colorPreset;
  state.platformPreset = refs.platformPresetSelect?.value || state.platformPreset;
  state.exportName = refs.exportNameInput?.value.trim() || "smartcut-final-v1";

  syncPreviewState();
  renderSummary();

  ensureAudioEngine()
    .then(() => {
      applyAudioPresetToEngine();
    })
    .catch(() => {});

  if (record) {
    incrementPreference("audio", state.audioPreset);
    incrementPreference("color", state.colorPreset);
    incrementPreference("platform", state.platformPreset);
  }

  renderStyleMemory();
  renderCoverageStatus();

  if (!silent) {
    updateStatus(
      "تم تطبيق إعدادات الصوت واللون والمنصة",
      `${labels.platform[state.platformPreset]} • ${labels.audio[state.audioPreset]} • ${labels.color[state.colorPreset]}`
    );
  }

  return "تم تطبيق الإعدادات";
}

function applyEditTemplate(options = {}) {
  const { silent = false, record = true } = options;

  state.editTemplate = refs.editTemplateSelect?.value || state.editTemplate;
  state.transition = refs.transitionSelect?.value || state.transition;
  state.effect = refs.effectSelect?.value || state.effect;
  state.sfxEnabled = refs.sfxToggle?.checked ?? state.sfxEnabled;

  state.clips = reorderClipsByTemplate(state.clips, state.editTemplate).map((clip, index) => ({
    ...clip,
    transition: state.transition,
    effect: state.effect,
    order: index + 1
  }));

  if (record) {
    incrementPreference("editTemplate", state.editTemplate);
    incrementPreference("transition", state.transition);
    incrementPreference("effect", state.effect);
  }

  syncPreviewState();
  renderClipLane();
  renderEditSuggestions();
  renderSummary();
  renderStyleMemory();
  renderCoverageStatus();

  if (state.sfxEnabled) {
    playTransitionSound();
  }

  if (!silent) {
    updateStatus(
      "تم تطبيق خطة المونتاج",
      `${labels.editTemplate[state.editTemplate]} • ${labels.transition[state.transition]} • ${labels.effect[state.effect]}`
    );
  }

  return `تم تطبيق ${labels.editTemplate[state.editTemplate]}`;
}

function reorderClipsByTemplate(clips, template) {
  const source = [...clips];

  if (template === "viral") {
    const strongest = [...source].sort((left, right) => right.score - left.score);
    const head = strongest.slice(0, 2);
    const remaining = source.filter((clip) => !head.some((selected) => selected.id === clip.id));
    return [...head, ...remaining];
  }

  if (template === "commercial") {
    const strongest = [...source].sort((left, right) => right.score - left.score);
    const top = strongest[0];
    const cta = [...source].sort((left, right) => right.end - left.end)[0];
    const middle = source.filter((clip) => clip.id !== top.id && clip.id !== cta.id);
    return [top, ...middle, cta];
  }

  if (template === "podcast") {
    return [...source].sort((left, right) => (right.end - right.start) - (left.end - left.start));
  }

  return [...source].sort((left, right) => left.start - right.start);
}

function renderEditSuggestions() {
  if (!refs.editSuggestionsNode) {
    return;
  }

  refs.editSuggestionsNode.innerHTML = "";

  const selectedClips = state.clips.filter((clip) => state.activeClipIds.has(clip.id));
  const suggestionSets = {
    tutorial: [
      {
        title: "ابدأ بالهوك ثم نقطة المشكلة",
        body: "هذا القالب يحافظ على تسلسل الشرح مع إبراز أهم خطوة في البداية.",
        value: `Transition: ${labels.transition[state.transition]}`
      },
      {
        title: "إبراز اللحظة العملية",
        body: "أفضل مقطع للتوقف عليه هو المقطع الأعلى تقييمًا أثناء عرض الميزة.",
        value: `Top clip: ${getTopClip().title}`
      }
    ],
    viral: [
      {
        title: "إيقاع أسرع للمحتوى القصير",
        body: "تم تقديم أعلى اللقطات تقييمًا في البداية لرفع الاحتفاظ.",
        value: `Kept: ${selectedClips.length} clips`
      },
      {
        title: "Zoom Punch مناسب لهذا النمط",
        body: "يمكنك دمج انتقال سريع ومؤثر لامع مع كل مشهد قوي.",
        value: `FX: ${labels.effect[state.effect]}`
      }
    ],
    podcast: [
      {
        title: "أبقِ الانتقالات هادئة",
        body: "المحتوى الحواري يعمل أفضل مع Fade نظيف ومؤثرات محدودة.",
        value: `Audio: ${labels.audio[state.audioPreset]}`
      },
      {
        title: "ركز على الجمل القابلة للاقتباس",
        body: "ابحث داخل النص واختر أفضل المقاطع القابلة للنشر منفردة.",
        value: `Search-ready: ${state.transcript.length} cues`
      }
    ],
    commercial: [
      {
        title: "قدّم القيمة مبكرًا",
        body: "تم رفع أفضل لقطة إلى البداية ووضع CTA في النهاية تلقائيًا.",
        value: `Ending: ${state.clips[state.clips.length - 1]?.title || "CTA"}`
      },
      {
        title: "اربط FX مع العرض",
        body: "Glow أو Focus Frame يعطيان حسًا إعلانيًا أفضل على المعاينة.",
        value: `Current FX: ${labels.effect[state.effect]}`
      }
    ]
  };

  const items = suggestionSets[state.editTemplate] || suggestionSets.tutorial;

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "suggestion-item";
    card.innerHTML = `
      <strong>${item.title}</strong>
      <p>${item.body}</p>
      <span>${item.value}</span>
    `;
    refs.editSuggestionsNode.appendChild(card);
  });
}

async function ensureAudioEngine() {
  if (!refs.studioVideo || refs.studioVideo.hidden) {
    return false;
  }

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return false;
  }

  if (!state.audioNodes.context) {
    const context = new AudioContextCtor();
    const source = context.createMediaElementSource(refs.studioVideo);
    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    const lowpass = context.createBiquadFilter();
    lowpass.type = "lowpass";
    const highshelf = context.createBiquadFilter();
    highshelf.type = "highshelf";
    const compressor = context.createDynamicsCompressor();
    const gain = context.createGain();

    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(highshelf);
    highshelf.connect(compressor);
    compressor.connect(gain);
    gain.connect(context.destination);

    state.audioNodes = { context, source, highpass, lowpass, highshelf, compressor, gain };
  }

  if (state.audioNodes.context?.state === "suspended") {
    await state.audioNodes.context.resume();
  }

  return true;
}

function applyAudioPresetToEngine() {
  const { highpass, lowpass, highshelf, compressor, gain } = state.audioNodes;
  if (!highpass || !lowpass || !highshelf || !compressor || !gain) {
    return;
  }

  if (state.audioPreset === "podcast") {
    highpass.frequency.value = 110;
    lowpass.frequency.value = 14000;
    highshelf.frequency.value = 4800;
    highshelf.gain.value = 4;
    compressor.threshold.value = -24;
    compressor.ratio.value = 3.4;
    gain.gain.value = 1.12;
    return;
  }

  if (state.audioPreset === "cinematic") {
    highpass.frequency.value = 70;
    lowpass.frequency.value = 12000;
    highshelf.frequency.value = 3800;
    highshelf.gain.value = 2.2;
    compressor.threshold.value = -28;
    compressor.ratio.value = 4.4;
    gain.gain.value = 1.08;
    return;
  }

  highpass.frequency.value = 90;
  lowpass.frequency.value = 16000;
  highshelf.frequency.value = 5200;
  highshelf.gain.value = 2.6;
  compressor.threshold.value = -22;
  compressor.ratio.value = 3;
  gain.gain.value = 1;
}

function playTransitionSound() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return;
  }

  const context = state.audioNodes.context || new AudioContextCtor();
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(420, context.currentTime);
  oscillator.frequency.linearRampToValueAtTime(720, context.currentTime + 0.15);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.028, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.24);

  if (!state.audioNodes.context) {
    oscillator.addEventListener("ended", () => {
      context.close().catch(() => {});
    });
  }
}

function populateVoiceList() {
  if (!refs.voiceSelect || !window.speechSynthesis) {
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  refs.voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Voice loading...";
    refs.voiceSelect.appendChild(option);
    return;
  }

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} • ${voice.lang}`;
    refs.voiceSelect.appendChild(option);
  });

  const preferredVoice = voices.find((voice) => /ar|en/i.test(voice.lang)) || voices[0];
  if (!state.voiceOver.selectedVoice) {
    state.voiceOver.selectedVoice = preferredVoice?.voiceURI || voices[0]?.voiceURI || "";
  }
  refs.voiceSelect.value = state.voiceOver.selectedVoice;
}

function previewVoiceOver() {
  if (!window.speechSynthesis) {
    renderVoiceOverStatus("المتصفح لا يدعم SpeechSynthesis", "يمكنك حفظ النص داخل التقرير فقط.");
    return;
  }

  const text = (refs.voiceOverText?.value || "").trim() || generateSuggestedVoiceOver();
  if (!text) {
    renderVoiceOverStatus("لا يوجد نص للقراءة", "اكتب نصًا أو استخدم التوليد المقترح من المشروع.");
    return;
  }

  stopVoiceOver();

  state.voiceOver.text = text;
  state.voiceOver.selectedVoice = refs.voiceSelect?.value || state.voiceOver.selectedVoice;
  state.voiceOver.rate = Number(refs.voiceRateInput?.value || 1);
  state.voiceOver.pitch = Number(refs.voicePitchInput?.value || 1);
  state.voiceOver.lastPreviewAt = new Date().toISOString();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.voiceURI === state.voiceOver.selectedVoice);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  utterance.rate = state.voiceOver.rate;
  utterance.pitch = state.voiceOver.pitch;

  utterance.onstart = () => {
    state.speaking = true;
    renderSummary();
    renderVoiceOverStatus("جارٍ تشغيل Preview للصوت", `${utterance.voice?.name || "Default Voice"} • سرعة ${utterance.rate.toFixed(2)}`);
  };

  utterance.onend = () => {
    state.speaking = false;
    renderSummary();
    renderVoiceOverStatus("اكتملت المعاينة الصوتية", "يمكنك الآن ربط هذا الصوت بالمشروع أو تعديله.");
  };

  utterance.onerror = () => {
    state.speaking = false;
    renderSummary();
    renderVoiceOverStatus("تعذر تشغيل التعليق الصوتي", "جرّب صوتًا آخر أو أعد المحاولة.");
  };

  window.speechSynthesis.speak(utterance);
}

function stopVoiceOver() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  state.speaking = false;
  renderSummary();
}

function attachVoiceOverToProject() {
  const text = (refs.voiceOverText?.value || "").trim() || generateSuggestedVoiceOver();
  if (!text) {
    renderVoiceOverStatus("لا يوجد Voice Over جاهز", "اكتب النص أولًا ثم اضغط استخدامه في المشروع.");
    return;
  }

  state.voiceOver.text = text;
  state.voiceOver.attached = true;
  incrementPreference("voiceOver", "attached");
  renderSummary();
  renderStyleMemory();
  renderVoiceOverStatus("تم ربط Voice Over بالمشروع", "سيظهر داخل التقرير النهائي ويُعتبر جزءًا من الخطة.");
  renderCoverageStatus();
  updateStatus("تم تجهيز Voice Over", "أصبح التعليق الصوتي جزءًا من المشروع الحالي.");
}

function renderVoiceOverStatus(title, meta) {
  if (!refs.voiceOverStatusNode) {
    return;
  }

  refs.voiceOverStatusNode.innerHTML = `
    <strong>${title}</strong>
    <p>${meta}</p>
  `;
  renderCoverageStatus();
}

function generateSuggestedVoiceOver() {
  const source = getVisibleTranscript().slice(0, 3);
  return source.map((item) => item.ar).join(" ");
}

async function runAssistantCommand(command) {
  const rawCommand = (command || "").trim();
  if (!rawCommand) {
    updateStatus("لا يوجد أمر للتنفيذ", "اكتب طلبًا مثل: احذف الصمت أو جهّز نسخة TikTok مع Voice Over.");
    return;
  }

  const normalized = rawCommand.toLowerCase();
  const actions = [];
  let shouldApplyPresets = false;
  let shouldApplyEditPlan = false;
  let shouldGenerateCaptions = false;

  if (matches(normalized, ["analyze", "حلل", "تحليل"])) {
    await analyzeCurrentMedia();
    actions.push("تم تشغيل تحليل المشروع");
  }

  if (matches(normalized, ["صمت", "silence", "قص"])) {
    actions.push(applySmartCut("auto", { silent: true }));
  }

  if (matches(normalized, ["أفضل", "best", "لقطات"])) {
    actions.push(applySmartCut("best", { silent: true }));
  }

  if (matches(normalized, ["استعادة", "restore"])) {
    actions.push(applySmartCut("restore", { silent: true }));
  }

  if (matches(normalized, ["captions", "caption", "ترجمة", "كابشن"])) {
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
  } else if (matches(normalized, ["highlight", "هايلايت", "سريع"])) {
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

  if (matches(normalized, ["بودكاست", "podcast"])) {
    state.audioPreset = "podcast";
    state.contentType = "podcast";
    state.editTemplate = "podcast";
    shouldApplyPresets = true;
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["commercial", "إعلان", "اعلان"])) {
    state.contentType = "commercial";
    state.editTemplate = "commercial";
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["viral", "فيرال"])) {
    state.editTemplate = "viral";
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["tutorial", "شرح"])) {
    state.editTemplate = "tutorial";
    state.contentType = "tutorial";
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["zoom", "زوم"])) {
    state.transition = "zoom";
    shouldApplyEditPlan = true;
  } else if (matches(normalized, ["fade", "فيد", "تلاشي"])) {
    state.transition = "fade";
    shouldApplyEditPlan = true;
  } else if (matches(normalized, ["swipe", "سحب"])) {
    state.transition = "swipe";
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["glow", "لمعة", "نيون"])) {
    state.effect = "glow";
    shouldApplyEditPlan = true;
  } else if (matches(normalized, ["focus", "فريم"])) {
    state.effect = "focus";
    shouldApplyEditPlan = true;
  } else if (matches(normalized, ["scan", "scanlines"])) {
    state.effect = "scan";
    shouldApplyEditPlan = true;
  }

  if (matches(normalized, ["صوت", "audio", "voice", "بودكاست"])) {
    state.audioPreset = matches(normalized, ["cinematic", "سينمائي"]) ? "cinematic" : "podcast";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["cinematic", "سينمائي", "grading", "color", "ألوان", "الوان"])) {
    state.colorPreset = "cinematic";
    shouldApplyPresets = true;
  } else if (matches(normalized, ["vibrant", "حيوي", "social"])) {
    state.colorPreset = "vibrant";
    shouldApplyPresets = true;
  } else if (matches(normalized, ["balanced", "متوازن"])) {
    state.colorPreset = "balanced";
    state.audioPreset = "balanced";
    shouldApplyPresets = true;
  }

  if (matches(normalized, ["voice over", "voiceover", "تعليق صوتي", "فويس"])) {
    if (refs.voiceOverText && !refs.voiceOverText.value.trim()) {
      refs.voiceOverText.value = generateSuggestedVoiceOver();
    }
    attachVoiceOverToProject();
    actions.push("تم تجهيز Voice Over وربطه بالمشروع");
  }

  syncControlsFromState();
  syncPreviewState();

  if (shouldGenerateCaptions) {
    actions.push(generateCaptions({ silent: true }));
  }

  if (shouldApplyEditPlan) {
    actions.push(applyEditTemplate({ silent: true }));
  }

  if (shouldApplyPresets) {
    actions.push(applyPresetSelections({ silent: true }));
  }

  const quotedMatch = rawCommand.match(/"([^"]+)"/);
  if (quotedMatch?.[1] && refs.transcriptSearchInput) {
    refs.transcriptSearchInput.value = quotedMatch[1];
    renderSearchResults(quotedMatch[1]);
    actions.push(`تم البحث عن "${quotedMatch[1]}" داخل النص`);
  }

  if (actions.length === 0) {
    actions.push("تم حفظ الأمر كملاحظة، لكنه لم يحتو كلمات تشغيل كافية لتعديل المشروع.");
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
  state.assistantHistory = state.assistantHistory.slice(0, 6);

  renderAssistantLog();
  renderStyleMemory();
  updateStatus("نفّذ المساعد الذكي طلبك", actions[0]);
}

function renderAssistantLog() {
  if (!refs.assistantLogNode) {
    return;
  }

  refs.assistantLogNode.innerHTML = "";

  if (state.assistantHistory.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا يوجد سجل أوامر بعد</strong>
        <span>نفّذ أمرًا واحدًا على الأقل ليظهر سجل التنفيذ الذكي هنا.</span>
      </div>
    `;
    refs.assistantLogNode.appendChild(empty);
    return;
  }

  state.assistantHistory.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "assistant-entry";
    card.innerHTML = `
      <time>${entry.time}</time>
      <strong>${entry.command}</strong>
      <ul>${entry.actions.map((action) => `<li>${action}</li>`).join("")}</ul>
    `;
    refs.assistantLogNode.appendChild(card);
  });
}

function renderSearchResults(query) {
  if (!refs.searchResultsNode) {
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

  refs.searchResultsNode.innerHTML = "";

  if (source.length === 0) {
    const empty = document.createElement("div");
    empty.className = "memory-item";
    empty.innerHTML = `
      <div>
        <strong>لا توجد نتائج مطابقة</strong>
        <span>جرّب كلمة أخرى بالعربي أو بالإنجليزية للوصول إلى الجملة المطلوبة.</span>
      </div>
    `;
    refs.searchResultsNode.appendChild(empty);
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
    button.addEventListener("click", () => jumpToTime(item.time));
    refs.searchResultsNode.appendChild(button);
  });
}

function syncCaptionToTime(time) {
  const source = state.captions.length > 0 ? state.captions : buildCaptionPreviewSource();
  const caption = findClosestCue(source, time);

  if (refs.liveCaptionNode) {
    refs.liveCaptionNode.textContent = caption?.text || "النص التلقائي سيظهر هنا بعد تشغيل مولد الـ Captions";
  }

  if (refs.captionListNode && state.captions.length > 0) {
    refs.captionListNode.querySelectorAll(".caption-item").forEach((item, index) => {
      item.classList.toggle("is-active", state.captions[index]?.id === caption?.id);
    });
  }
}

function buildCaptionPreviewSource() {
  return getVisibleTranscript().map((item) => ({
    id: `preview-${item.id}`,
    time: item.time,
    text: composeCaptionText(item)
  }));
}

function jumpToTime(time) {
  if (refs.studioVideo && !refs.studioVideo.hidden && Number.isFinite(refs.studioVideo.duration)) {
    refs.studioVideo.currentTime = Math.min(time, refs.studioVideo.duration || time);
  }

  const matchingClip = state.clips.find((clip) => time >= clip.start && time <= clip.end);
  if (matchingClip) {
    state.selectedClipId = matchingClip.id;
    renderClipLane();
  }

  syncCaptionToTime(time);
}

function getVisibleTranscript() {
  return state.transcript.filter((item) => {
    const matchingClip = state.clips.find((clip) => item.time >= clip.start && item.time <= clip.end);
    return matchingClip ? state.activeClipIds.has(matchingClip.id) : true;
  });
}

function getSelectedTime() {
  const selectedClip = state.clips.find((clip) => clip.id === state.selectedClipId);
  return selectedClip?.start || 0;
}

function findClosestCue(cues, time) {
  if (!cues || cues.length === 0) {
    return null;
  }

  return [...cues]
    .sort((left, right) => left.time - right.time)
    .reduce((current, cue) => (cue.time <= time ? cue : current), cues[0]);
}

function renderStyleMemory() {
  if (!refs.styleMemoryNode) {
    return;
  }

  refs.styleMemoryNode.innerHTML = "";

  const learnedItems = [
    {
      title: "المنصة المفضلة",
      description: "أكثر إعداد منصة تكرر في الجلسات",
      value: getTopPreference("platform", "youtube", labels.platform)
    },
    {
      title: "بروفايل الصوت",
      description: "الخيار الصوتي الأكثر استخدامًا",
      value: getTopPreference("audio", "balanced", labels.audio)
    },
    {
      title: "ستايل اللون",
      description: "طريقة التصحيح الأكثر تكرارًا",
      value: getTopPreference("color", "balanced", labels.color)
    },
    {
      title: "قالب المونتاج",
      description: "أكثر Edit Template استخدمته",
      value: getTopPreference("editTemplate", "tutorial", labels.editTemplate)
    },
    {
      title: "المؤثر المفضل",
      description: "FX الأكثر طلبًا في المعاينة",
      value: getTopPreference("effect", "clean", labels.effect)
    },
    {
      title: "ستايل الكابشن",
      description: "النمط النصي الأعلى استخدامًا",
      value: getTopPreference("captionStyle", "highlight", labels.captionStyle)
    },
    {
      title: "وضع القص الذكي",
      description: "أكثر محرك قص استُخدم",
      value: getTopPreference("smartcut", "auto", labels.smartcut)
    },
    {
      title: "إجمالي أوامر المساعد",
      description: "عدد الطلبات المنفذة عبر Smart Assistant",
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
    refs.styleMemoryNode.appendChild(row);
  });
}

function applyLearnedStyle() {
  state.platformPreset = getTopPreferenceKey("platform", "youtube");
  state.audioPreset = getTopPreferenceKey("audio", "balanced");
  state.colorPreset = getTopPreferenceKey("color", "balanced");
  state.captionStyle = getTopPreferenceKey("captionStyle", "highlight");
  state.captionLanguage = getTopPreferenceKey("captionLanguage", "ar");
  state.editTemplate = getTopPreferenceKey("editTemplate", "tutorial");
  state.transition = getTopPreferenceKey("transition", "cut");
  state.effect = getTopPreferenceKey("effect", "clean");

  syncControlsFromState();
  syncPreviewState();
  applyEditTemplate({ silent: true, record: false });
  applyPresetSelections({ silent: true, record: false });

  if (state.captions.length > 0) {
    generateCaptions({ silent: true, record: false });
  }

  renderCoverageStatus();
  updateStatus("تم تطبيق الأسلوب المتعلم", "جرى تحميل أكثر تفضيلاتك استخدامًا على المشروع الحالي.");
}

function exportProjectReport() {
  const report = {
    product: "SmartCut AI Browser Prototype",
    generatedAt: new Date().toISOString(),
    source: state.currentSourceName,
    analysis: state.analysisFacts,
    clips: state.clips,
    activeClipIds: Array.from(state.activeClipIds),
    transcript: state.transcript,
    captions: state.captions,
    presets: {
      platform: state.platformPreset,
      audio: state.audioPreset,
      color: state.colorPreset,
      editTemplate: state.editTemplate,
      transition: state.transition,
      effect: state.effect,
      exportName: state.exportName
    },
    voiceOver: state.voiceOver,
    assistantHistory: state.assistantHistory,
    learnedStyle: state.styleProfile
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(state.exportName || "smartcut-project")}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);

  updateStatus("تم تصدير تقرير المشروع", `تم حفظ ملف JSON باسم ${link.download}.`);
}

function scaleTranscript(transcript, sourceDuration, targetDuration) {
  return transcript.map((item) => ({
    ...item,
    time: Number(((item.time / sourceDuration) * targetDuration).toFixed(1))
  }));
}

function renderAnalysisMode(mode) {
  const labelsByMode = {
    audio: "Audio Analysis",
    heuristic: "Heuristic Fallback",
    demo: "Demo Dataset",
    "browser-fallback": "Browser Fallback"
  };

  return labelsByMode[mode] || mode;
}

function applyContentRecommendations(options = {}) {
  const { silent = false, record = true } = options;
  const presetsByType = {
    tutorial: {
      editTemplate: "tutorial",
      transition: "cut",
      effect: "focus",
      audioPreset: "balanced",
      colorPreset: "balanced",
      platformPreset: "youtube"
    },
    vlog: {
      editTemplate: "viral",
      transition: "swipe",
      effect: "glow",
      audioPreset: "balanced",
      colorPreset: "vibrant",
      platformPreset: "tiktok"
    },
    commercial: {
      editTemplate: "commercial",
      transition: "zoom",
      effect: "glow",
      audioPreset: "cinematic",
      colorPreset: "cinematic",
      platformPreset: "instagram"
    },
    podcast: {
      editTemplate: "podcast",
      transition: "fade",
      effect: "clean",
      audioPreset: "podcast",
      colorPreset: "balanced",
      platformPreset: "youtube"
    }
  };

  const recommended = presetsByType[state.contentType] || presetsByType.tutorial;
  state.editTemplate = recommended.editTemplate;
  state.transition = recommended.transition;
  state.effect = recommended.effect;
  state.audioPreset = recommended.audioPreset;
  state.colorPreset = recommended.colorPreset;
  state.platformPreset = recommended.platformPreset;

  syncControlsFromState();
  syncPreviewState();
  renderEditSuggestions();
  renderSummary();
  renderCoverageStatus();

  if (record) {
    incrementPreference("editTemplate", state.editTemplate);
    incrementPreference("transition", state.transition);
    incrementPreference("effect", state.effect);
    incrementPreference("audio", state.audioPreset);
    incrementPreference("color", state.colorPreset);
    incrementPreference("platform", state.platformPreset);
  }

  if (!silent) {
    updateStatus(
      "تم اختيار إعدادات تلقائية حسب نوع الفيديو",
      `${labels.contentType[state.contentType]} • ${labels.editTemplate[state.editTemplate]} • ${labels.color[state.colorPreset]}`
    );
  }
}

function syncFxQuickButtons() {
  refs.fxQuickButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.effectQuick === state.effect);
  });
}

function renderCoverageStatus() {
  refs.coverageNodes.forEach((node) => {
    const key = node.dataset.coverage;
    let isLive = true;

    if (key === "captions") {
      isLive = state.captions.length > 0 || state.captionStyle !== "highlight" || state.captionLanguage !== "ar";
    } else if (key === "voice") {
      isLive = state.voiceOver.attached || state.speaking || Boolean(state.voiceOver.text?.trim());
    } else if (key === "learning") {
      isLive = state.styleProfile.commands > 0 || Object.keys(state.styleProfile.platform || {}).length > 0;
    } else if (key === "search") {
      isLive = state.transcript.length > 0;
    } else if (key === "audio") {
      isLive = Boolean(state.audioPreset);
    } else if (key === "fx") {
      isLive = Boolean(state.effect);
    } else if (key === "edit") {
      isLive = Boolean(state.editTemplate);
    } else if (key === "platform") {
      isLive = Boolean(state.platformPreset);
    }

    node.classList.toggle("is-live", isLive);
  });
}

function getTopClip() {
  return [...state.clips].sort((left, right) => right.score - left.score)[0] || state.clips[0];
}

function compressText(text, density) {
  const words = text.split(/\s+/).filter(Boolean);
  if (density === "detailed") {
    return text;
  }

  if (density === "short") {
    return `${words.slice(0, Math.min(7, words.length)).join(" ")}${words.length > 7 ? "..." : ""}`;
  }

  return `${words.slice(0, Math.min(12, words.length)).join(" ")}${words.length > 12 ? "..." : ""}`;
}

function updateStatus(title, meta) {
  if (refs.analysisStatusNode) refs.analysisStatusNode.textContent = title;
  if (refs.analysisMetaNode) refs.analysisMetaNode.textContent = meta;
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function sanitizeFileName(value) {
  return value.replace(/[<>:"/\\|?*]+/g, "-");
}

function createEmptyProfile() {
  return {
    platform: {},
    audio: {},
    color: {},
    captionStyle: {},
    captionLanguage: {},
    smartcut: {},
    editTemplate: {},
    transition: {},
    effect: {},
    voiceOver: {},
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
    // Ignore storage errors quietly.
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
