(function () {
  const shell = document.getElementById("imageEditorShell");
  if (!shell) return;

  const refs = {
    previewFrame: document.getElementById("editorPreviewFrame"),
    previewCanvas: document.getElementById("editorPreviewCanvas"),
    sourceImage: document.getElementById("editorSourceImage"),
    overlayImage: document.getElementById("editorOverlayImage"),
    uploadInput: document.getElementById("editorUploadInput"),
    overlayUploadInput: document.getElementById("editorOverlayUploadInput"),
    uploadButton: document.getElementById("editorUploadButton"),
    insertImageButton: document.getElementById("editorInsertImageButton"),
    sampleButton: document.getElementById("editorSampleButton"),
    compareButton: document.getElementById("editorCompareButton"),
    resetButton: document.getElementById("editorResetButton"),
    autoEnhanceButton: document.getElementById("editorAutoEnhanceButton"),
    downloadPngButton: document.getElementById("editorDownloadPngButton"),
    downloadJpgButton: document.getElementById("editorDownloadJpgButton"),
    removeOverlayButton: document.getElementById("editorRemoveOverlayButton"),
    proxyButtons: Array.from(document.querySelectorAll("[data-editor-proxy]")),
    previewState: document.getElementById("editorPreviewState"),
    imageState: document.getElementById("editorImageState"),
    presetStatus: document.getElementById("editorPresetStatus"),
    frameStatus: document.getElementById("editorFrameStatus"),
    fileName: document.getElementById("editorFileName"),
    imageMeta: document.getElementById("editorImageMeta"),
    sizeMeta: document.getElementById("editorSizeMeta"),
    transformMeta: document.getElementById("editorTransformMeta"),
    featureMeta: document.getElementById("editorFeatureMeta"),
    cutoutMeta: document.getElementById("editorCutoutMeta"),
    textMeta: document.getElementById("editorTextMeta"),
    overlayMeta: document.getElementById("editorOverlayMeta"),
    overlayInfo: document.getElementById("editorOverlayInfo"),
    frameMeta: document.getElementById("editorFrameMeta"),
    statusBox: document.getElementById("editorStatusBox"),
    statusText: document.getElementById("editorStatusText"),
    brightnessRange: document.getElementById("brightnessRange"),
    contrastRange: document.getElementById("contrastRange"),
    saturationRange: document.getElementById("saturationRange"),
    warmthRange: document.getElementById("warmthRange"),
    blurRange: document.getElementById("blurRange"),
    zoomRange: document.getElementById("zoomRange"),
    panXRange: document.getElementById("panXRange"),
    panYRange: document.getElementById("panYRange"),
    cutoutRange: document.getElementById("cutoutRange"),
    textInput: document.getElementById("editorTextInput"),
    textSizeRange: document.getElementById("textSizeRange"),
    textXRange: document.getElementById("textXRange"),
    textYRange: document.getElementById("textYRange"),
    overlayScaleRange: document.getElementById("overlayScaleRange"),
    overlayXRange: document.getElementById("overlayXRange"),
    overlayYRange: document.getElementById("overlayYRange"),
    overlayOpacityRange: document.getElementById("overlayOpacityRange"),
    textColorInput: document.getElementById("editorTextColor"),
    exportSizeSelect: document.getElementById("exportSizeSelect"),
    cutoutButton: document.getElementById("editorCutoutButton"),
    restoreBgButton: document.getElementById("editorRestoreBgButton"),
    clearTextButton: document.getElementById("editorClearTextButton"),
    brightnessValue: document.getElementById("brightnessValue"),
    contrastValue: document.getElementById("contrastValue"),
    saturationValue: document.getElementById("saturationValue"),
    warmthValue: document.getElementById("warmthValue"),
    blurValue: document.getElementById("blurValue"),
    zoomValue: document.getElementById("zoomValue"),
    panXValue: document.getElementById("panXValue"),
    panYValue: document.getElementById("panYValue"),
    cutoutValue: document.getElementById("cutoutValue"),
    textSizeValue: document.getElementById("textSizeValue"),
    textXValue: document.getElementById("textXValue"),
    textYValue: document.getElementById("textYValue"),
    overlayScaleValue: document.getElementById("overlayScaleValue"),
    overlayXValue: document.getElementById("overlayXValue"),
    overlayYValue: document.getElementById("overlayYValue"),
    overlayOpacityValue: document.getElementById("overlayOpacityValue"),
    textColorValue: document.getElementById("textColorValue"),
    textLengthValue: document.getElementById("textLengthValue"),
    exportSizeValue: document.getElementById("exportSizeValue"),
    presetButtons: Array.from(document.querySelectorAll("[data-preset]")),
    frameButtons: Array.from(document.querySelectorAll("[data-frame]")),
    transformButtons: Array.from(document.querySelectorAll("[data-transform]"))
  };

  if (!refs.previewCanvas || !refs.sourceImage || !refs.previewFrame) return;

  const previewContext = refs.previewCanvas.getContext("2d");
  if (!previewContext) return;

  const sampleSrc = "assets/orphex-logo.jpg";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const editorLocaleStrings = {
    ar: {
      "Custom Preset": "نمط مخصص",
      "Clean Preset": "نمط نظيف",
      "Portrait Preset": "نمط بورتريه",
      "Product Preset": "نمط المنتج",
      "Noir Preset": "نمط نوار",
      "Social Glow Preset": "نمط توهج اجتماعي",
      "Original Frame": "الإطار الأصلي",
      "Square Frame": "إطار مربع",
      "4:5 Frame": "إطار 4:5",
      "9:16 Frame": "إطار 9:16",
      "16:9 Frame": "إطار 16:9",
      "Source Fit": "بحجم المصدر",
      "Show Edited": "اعرض التعديل",
      "Before / After": "قبل / بعد",
      "Cutout Active": "الإزالة مفعلة",
      "Remove Background": "إزالة الخلفية",
      "Before View": "عرض قبل التعديل",
      "Preview Ready": "المعاينة جاهزة",
      "Image Loaded": "تم تحميل الصورة",
      "Fresh Canvas": "مساحة جديدة",
      "Cutout On": "الإزالة مفعلة",
      "Cutout Off": "الإزالة متوقفة",
      "Text On": "النص مفعّل",
      "Text Off": "النص متوقف",
      "Layer On": "الطبقة مفعلة",
      "Layer Off": "الطبقة متوقفة",
      "No overlay text yet.": "لا يوجد نص مضاف بعد.",
      "No image selected": "لا توجد صورة محددة",
      "No base image loaded yet": "لم يتم تحميل صورة أساسية بعد",
      "Ready after upload": "جاهز بعد الرفع",
      "Inserted layer": "طبقة مدرجة",
      "Upload an image or use the sample to begin.": "ارفع صورة أو استخدم العينة للبدء.",
      "Workspace ready.": "المساحة جاهزة.",
      "Start with a fresh canvas. Upload your main image, insert another image layer if needed, then adjust, crop, and export.": "ابدأ بمساحة جديدة. ارفع الصورة الأساسية، وأدرج طبقة صورة إضافية عند الحاجة، ثم عدّل واقصص وصدّر مباشرة.",
      "Image uploaded.": "تم رفع الصورة.",
      "Your image is ready for live editing inside Orphex.": "صورتك جاهزة الآن للتحرير المباشر داخل Orphex.",
      "Inserted image added.": "تمت إضافة الصورة المدرجة.",
      "The new image layer is now sitting above the main canvas and can be moved, scaled, or faded.": "طبقة الصورة الجديدة أصبحت فوق المساحة الرئيسية ويمكن تحريكها وتكبيرها أو تغيير شفافيتها.",
      "Sample restored.": "تمت استعادة العينة.",
      "The default Orphex sample is active again for quick testing.": "عينة Orphex الافتراضية فعالة من جديد للاختبار السريع.",
      "Upload a base image first.": "ارفع صورة أساسية أولًا.",
      "Before / After becomes useful after you add a main image to the canvas.": "ميزة قبل / بعد تصبح مفيدة بعد إضافة صورة رئيسية إلى مساحة العمل.",
      "Before view enabled.": "تم تفعيل عرض ما قبل التعديل.",
      "Edited view restored.": "تمت استعادة عرض التعديل.",
      "Preview is temporarily showing the source image without color, cutout, or text changes.": "المعاينة تعرض الآن الصورة الأصلية مؤقتًا بدون تغييرات اللون أو الإزالة أو النص.",
      "Preview is back to the full edited result.": "عادت المعاينة إلى النتيجة المعدلة الكاملة.",
      "Editor reset.": "تمت إعادة ضبط المحرر.",
      "All adjustments, crop settings, cutout changes, inserted layers, text, and transforms were cleared.": "تم مسح جميع التعديلات والقص والإزالة والطبقات المدرجة والنص والتحويلات.",
      "Presets are applied to the main image after you load one into the workspace.": "يتم تطبيق الأنماط على الصورة الأساسية بعد تحميلها داخل مساحة العمل.",
      "Auto Enhance applied.": "تم تطبيق التحسين التلقائي.",
      "Orphex boosted the image with a balanced, high-clarity preset.": "قام Orphex بتحسين الصورة بنمط متوازن وعالي الوضوح.",
      "You can keep the preset as-is or fine-tune every slider manually.": "يمكنك إبقاء النمط كما هو أو ضبط كل شريط يدويًا.",
      "Background removal works on the main image after you load it.": "إزالة الخلفية تعمل على الصورة الأساسية بعد تحميلها.",
      "Quick cutout enabled.": "تم تفعيل الإزالة السريعة.",
      "Background cleanup works best on clean backdrops. PNG export preserves transparency.": "تنظيف الخلفية يعمل أفضل مع الخلفيات النظيفة، وتصدير PNG يحافظ على الشفافية.",
      "Background restored.": "تمت استعادة الخلفية.",
      "The original background is visible again.": "الخلفية الأصلية أصبحت ظاهرة من جديد.",
      "Text removed.": "تم حذف النص.",
      "The overlay text was cleared from the current design.": "تمت إزالة النص المضاف من التصميم الحالي.",
      "Inserted image removed.": "تم حذف الصورة المدرجة.",
      "The extra image layer was removed and the canvas is back to the base artwork only.": "تمت إزالة طبقة الصورة الإضافية وعادت المساحة إلى العمل الأساسي فقط.",
      "Export size updated.": "تم تحديث حجم التصدير.",
      "The new download size will be used the next time you export the image.": "سيتم استخدام حجم التنزيل الجديد في المرة القادمة عند تصدير الصورة.",
      "Nothing to export yet.": "لا يوجد ما يمكن تصديره بعد.",
      "Upload a main image or insert an image layer first, then export the result.": "ارفع صورة أساسية أو أدرج طبقة صورة أولًا، ثم صدّر النتيجة.",
      "Export complete.": "اكتمل التصدير.",
      "Frame updated.": "تم تحديث الإطار.",
      "The live preview and exported result now use the selected crop format.": "المعاينة المباشرة والنتيجة المصدرة تستخدمان الآن تنسيق القص المحدد.",
      "Transform applied.": "تم تطبيق التحويل.",
      "Rotation and flip controls affect both the live preview and exported file.": "أدوات التدوير والعكس تؤثر على المعاينة المباشرة والملف المصدّر معًا.",
      "Normal X": "X طبيعي",
      "Flip X": "عكس X",
      "Normal Y": "Y طبيعي",
      "Flip Y": "عكس Y"
    }
  };

  const getEditorLocale = () => {
    const lang = (document.documentElement.lang || "").toLowerCase();
    return lang.startsWith("en") ? "en" : "ar";
  };

  const translateEditorText = (text) => {
    if (getEditorLocale() !== "ar") return text;
    if (typeof text === "string" && text.endsWith(" applied.")) {
      const presetLabel = text.slice(0, -9);
      return `تم تطبيق ${translateEditorText(presetLabel)}.`;
    }
    if (typeof text === "string" && text.startsWith("The edited image was prepared as ")) {
      const suffix = text.replace("The edited image was prepared as ", "");
      return `تم تجهيز الصورة المعدلة بصيغة ${suffix}`;
    }
    return editorLocaleStrings.ar[text] || text;
  };

  const presets = {
    custom: { label: "Custom Preset", brightness: 100, contrast: 100, saturation: 100, warmth: 0, blur: 0 },
    clean: { label: "Clean Preset", brightness: 106, contrast: 108, saturation: 102, warmth: 4, blur: 0 },
    portrait: { label: "Portrait Preset", brightness: 108, contrast: 110, saturation: 114, warmth: 10, blur: 0 },
    product: { label: "Product Preset", brightness: 112, contrast: 124, saturation: 108, warmth: 6, blur: 0 },
    noir: { label: "Noir Preset", brightness: 96, contrast: 138, saturation: 0, warmth: 0, blur: 0 },
    glow: { label: "Social Glow Preset", brightness: 112, contrast: 118, saturation: 136, warmth: 12, blur: 1 }
  };

  const frameModes = {
    original: { label: "Original Frame", aspect: null },
    square: { label: "Square Frame", aspect: 1 },
    portrait: { label: "4:5 Frame", aspect: 4 / 5 },
    story: { label: "9:16 Frame", aspect: 9 / 16 },
    landscape: { label: "16:9 Frame", aspect: 16 / 9 }
  };

  const exportSizes = {
    source: { label: "Source Fit", longSide: null },
    "1080": { label: "1080 px", longSide: 1080 },
    "1600": { label: "1600 px", longSide: 1600 },
    "2048": { label: "2048 px", longSide: 2048 }
  };

  const state = {
    locale: getEditorLocale(),
    source: "",
    fileName: "untitled-image",
    extension: "png",
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 0,
    blur: 0,
    rotation: 0,
    flipX: 1,
    flipY: 1,
    frame: "original",
    zoom: 100,
    panX: 0,
    panY: 0,
    exportSize: "source",
    compare: false,
    preset: "custom",
    cutoutEnabled: false,
    cutoutThreshold: 44,
    text: "",
    textSize: 72,
    textX: 0,
    textY: 28,
    textColor: "#ffffff",
    overlaySource: "",
    overlayFileName: "",
    overlayScale: 36,
    overlayX: 0,
    overlayY: 0,
    overlayOpacity: 100,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragOriginX: 0,
    dragOriginY: 0,
    cutoutCacheKey: "",
    cutoutCanvas: null,
    statusTitle: "Workspace ready.",
    statusText: "Start with a fresh canvas. Upload your main image, insert another image layer if needed, then adjust, crop, and export."
  };

  bindEvents();
  syncControls();

  refs.sourceImage.addEventListener("load", () => {
    invalidateCutoutCache();
    renderPreview();
    updateMeta();
  });

  refs.overlayImage?.addEventListener("load", () => {
    renderPreview();
    updateMeta();
  });

  renderPreview();
  updateMeta();
  renderStatus();

  window.addEventListener("orphex:localechange", (event) => {
    state.locale = event.detail?.locale === "en" ? "en" : "ar";
    syncControls();
    updateMeta();
    renderStatus();
  });

  function bindEvents() {
    refs.uploadButton?.addEventListener("click", () => refs.uploadInput?.click());
    refs.sampleButton?.addEventListener("click", useSample);
    refs.compareButton?.addEventListener("click", toggleCompare);
    refs.resetButton?.addEventListener("click", resetEditor);
    refs.autoEnhanceButton?.addEventListener("click", () => applyPreset("product", true));
    refs.downloadPngButton?.addEventListener("click", () => exportImage("png"));
    refs.downloadJpgButton?.addEventListener("click", () => exportImage("jpeg"));
    refs.cutoutButton?.addEventListener("click", enableCutout);
    refs.restoreBgButton?.addEventListener("click", disableCutout);
    refs.clearTextButton?.addEventListener("click", clearTextOverlay);
    refs.insertImageButton?.addEventListener("click", () => refs.overlayUploadInput?.click());
    refs.removeOverlayButton?.addEventListener("click", clearOverlayLayer);

    refs.proxyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.editorProxy;
        if (action === "download-png") {
          refs.downloadPngButton?.click();
        } else if (action === "download-jpg") {
          refs.downloadJpgButton?.click();
        } else if (action === "auto-enhance") {
          refs.autoEnhanceButton?.click();
        } else if (action === "insert-image") {
          refs.overlayUploadInput?.click();
        }
      });
    });

    refs.uploadInput?.addEventListener("change", handleUpload);
    refs.overlayUploadInput?.addEventListener("change", handleOverlayUpload);

    [
      ["brightness", refs.brightnessRange],
      ["contrast", refs.contrastRange],
      ["saturation", refs.saturationRange],
      ["warmth", refs.warmthRange],
      ["blur", refs.blurRange],
      ["zoom", refs.zoomRange],
      ["panX", refs.panXRange],
      ["panY", refs.panYRange],
      ["cutoutThreshold", refs.cutoutRange],
      ["textSize", refs.textSizeRange],
      ["textX", refs.textXRange],
      ["textY", refs.textYRange],
      ["overlayScale", refs.overlayScaleRange],
      ["overlayX", refs.overlayXRange],
      ["overlayY", refs.overlayYRange],
      ["overlayOpacity", refs.overlayOpacityRange]
    ].forEach(([key, input]) => {
      input?.addEventListener("input", () => {
        ensureEditedView();
        state[key] = Number(input.value);
        if (key === "cutoutThreshold") {
          invalidateCutoutCache();
        }
        if (key === "brightness" || key === "contrast" || key === "saturation" || key === "warmth" || key === "blur") {
          state.preset = "custom";
        }
        syncControls();
        renderPreview();
        updateMeta();
      });
    });

    refs.textInput?.addEventListener("input", () => {
      ensureEditedView();
      state.text = refs.textInput?.value || "";
      syncControls();
      renderPreview();
      updateMeta();
    });

    refs.textColorInput?.addEventListener("input", () => {
      ensureEditedView();
      state.textColor = refs.textColorInput?.value || "#ffffff";
      syncControls();
      renderPreview();
      updateMeta();
    });

    refs.exportSizeSelect?.addEventListener("change", () => {
      state.exportSize = refs.exportSizeSelect?.value || "source";
      syncControls();
      updateMeta();
      setStatus("Export size updated.", "The new download size will be used the next time you export the image.");
    });

    refs.presetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const preset = button.dataset.preset || "custom";
        applyPreset(preset, false);
      });
    });

    refs.frameButtons.forEach((button) => {
      button.addEventListener("click", () => {
        ensureEditedView();
        state.frame = button.dataset.frame || "original";
        syncControls();
        renderPreview();
        updateMeta();
        setStatus("Frame updated.", "The live preview and exported result now use the selected crop format.");
      });
    });

    refs.transformButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.transform;
        if (!action) return;

        ensureEditedView();
        if (action === "rotate-left") {
          state.rotation -= 90;
        } else if (action === "rotate-right") {
          state.rotation += 90;
        } else if (action === "flip-x") {
          state.flipX *= -1;
        } else if (action === "flip-y") {
          state.flipY *= -1;
        }

        normalizeRotation();
        renderPreview();
        updateMeta();
        setStatus("Transform applied.", "Rotation and flip controls affect both the live preview and exported file.");
      });
    });

    refs.previewCanvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const rawName = file.name.replace(/\.[^.]+$/, "") || "edited-image";
      const extension = (file.name.split(".").pop() || "png").toLowerCase();
      ensureEditedView();
      state.source = String(reader.result || sampleSrc);
      state.fileName = sanitizeName(rawName);
      state.extension = extension === "jpg" ? "jpeg" : extension;
      refs.sourceImage.src = state.source;
      invalidateCutoutCache();
      refs.uploadInput.value = "";
      setStatus("Image uploaded.", "Your image is ready for live editing inside Orphex.");
    };
    reader.readAsDataURL(file);
  }

  function handleOverlayUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      ensureEditedView();
      state.overlaySource = String(reader.result || "");
      state.overlayFileName = file.name.replace(/\.[^.]+$/, "") || "inserted-layer";
      refs.overlayImage.src = state.overlaySource;
      refs.overlayUploadInput.value = "";
      renderPreview();
      updateMeta();
      setStatus("Inserted image added.", "The new image layer is now sitting above the main canvas and can be moved, scaled, or faded.");
    };
    reader.readAsDataURL(file);
  }

  function useSample() {
    ensureEditedView();
    state.source = sampleSrc;
    state.fileName = "orphex-logo";
    state.extension = "png";
    refs.sourceImage.src = sampleSrc;
    invalidateCutoutCache();
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Sample restored.", "The default Orphex sample is active again for quick testing.");
  }

  function toggleCompare() {
    if (!hasBaseImage()) {
      setStatus("Upload a base image first.", "Before / After becomes useful after you add a main image to the canvas.");
      return;
    }

    state.compare = !state.compare;
    refs.compareButton?.setAttribute("aria-pressed", state.compare ? "true" : "false");
    if (refs.compareButton) {
      refs.compareButton.textContent = translateEditorText(state.compare ? "Show Edited" : "Before / After");
    }
    renderPreview();
    updateMeta();
    setStatus(
      state.compare ? "Before view enabled." : "Edited view restored.",
      state.compare
        ? "Preview is temporarily showing the source image without color, cutout, or text changes."
        : "Preview is back to the full edited result."
    );
  }

  function resetEditor() {
    state.brightness = 100;
    state.contrast = 100;
    state.saturation = 100;
    state.warmth = 0;
    state.blur = 0;
    state.rotation = 0;
    state.flipX = 1;
    state.flipY = 1;
    state.frame = "original";
    state.zoom = 100;
    state.panX = 0;
    state.panY = 0;
    state.exportSize = "source";
    state.compare = false;
    state.preset = "custom";
    state.cutoutEnabled = false;
    state.cutoutThreshold = 44;
    state.text = "";
    state.textSize = 72;
    state.textX = 0;
    state.textY = 28;
    state.textColor = "#ffffff";
    state.overlaySource = "";
    state.overlayFileName = "";
    state.overlayScale = 36;
    state.overlayX = 0;
    state.overlayY = 0;
    state.overlayOpacity = 100;
    refs.overlayImage.removeAttribute("src");
    invalidateCutoutCache();
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Editor reset.", "All adjustments, crop settings, cutout changes, inserted layers, text, and transforms were cleared.");
  }

  function applyPreset(presetName, markAsAuto) {
    const preset = presets[presetName];
    if (!preset) return;
    if (!hasBaseImage()) {
      setStatus("Upload a base image first.", "Presets are applied to the main image after you load one into the workspace.");
      return;
    }

    state.preset = presetName;
    state.brightness = preset.brightness;
    state.contrast = preset.contrast;
    state.saturation = preset.saturation;
    state.warmth = preset.warmth;
    state.blur = preset.blur;
    state.compare = false;
    syncControls();
    renderPreview();
    updateMeta();
    setStatus(
      markAsAuto ? "Auto Enhance applied." : `${preset.label} applied.`,
      markAsAuto
        ? "Orphex boosted the image with a balanced, high-clarity preset."
        : "You can keep the preset as-is or fine-tune every slider manually."
    );
  }

  function enableCutout() {
    if (!hasBaseImage()) {
      setStatus("Upload a base image first.", "Background removal works on the main image after you load it.");
      return;
    }

    ensureEditedView();
    state.cutoutEnabled = true;
    invalidateCutoutCache();
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Quick cutout enabled.", "Background cleanup works best on clean backdrops. PNG export preserves transparency.");
  }

  function disableCutout() {
    ensureEditedView();
    state.cutoutEnabled = false;
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Background restored.", "The original background is visible again.");
  }

  function clearTextOverlay() {
    ensureEditedView();
    state.text = "";
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Text removed.", "The overlay text was cleared from the current design.");
  }

  function clearOverlayLayer() {
    ensureEditedView();
    state.overlaySource = "";
    state.overlayFileName = "";
    state.overlayScale = 36;
    state.overlayX = 0;
    state.overlayY = 0;
    state.overlayOpacity = 100;
    refs.overlayImage.removeAttribute("src");
    syncControls();
    renderPreview();
    updateMeta();
    setStatus("Inserted image removed.", "The extra image layer was removed and the canvas is back to the base artwork only.");
  }

  function handlePointerDown(event) {
    if (!refs.previewFrame.contains(event.target)) return;
    state.dragging = true;
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
    state.dragOriginX = state.panX;
    state.dragOriginY = state.panY;
    refs.previewCanvas.setPointerCapture?.(event.pointerId);
    refs.previewCanvas.style.cursor = "grabbing";
  }

  function handlePointerMove(event) {
    if (!state.dragging) return;

    const rect = refs.previewFrame.getBoundingClientRect();
    const deltaX = event.clientX - state.dragStartX;
    const deltaY = event.clientY - state.dragStartY;
    const panX = state.dragOriginX + (deltaX / Math.max(1, rect.width)) * 120;
    const panY = state.dragOriginY + (deltaY / Math.max(1, rect.height)) * 120;

    ensureEditedView();
    state.panX = clamp(panX, -60, 60);
    state.panY = clamp(panY, -60, 60);
    syncControls();
    renderPreview();
    updateMeta();
  }

  function handlePointerUp(event) {
    if (!state.dragging) return;
    state.dragging = false;
    refs.previewCanvas.releasePointerCapture?.(event.pointerId);
    refs.previewCanvas.style.cursor = "grab";
  }

  function syncControls() {
    setInputValue(refs.brightnessRange, state.brightness);
    setInputValue(refs.contrastRange, state.contrast);
    setInputValue(refs.saturationRange, state.saturation);
    setInputValue(refs.warmthRange, state.warmth);
    setInputValue(refs.blurRange, state.blur);
    setInputValue(refs.zoomRange, state.zoom);
    setInputValue(refs.panXRange, state.panX);
    setInputValue(refs.panYRange, state.panY);
    setInputValue(refs.cutoutRange, state.cutoutThreshold);
    setInputValue(refs.textInput, state.text);
    setInputValue(refs.textSizeRange, state.textSize);
    setInputValue(refs.textXRange, state.textX);
    setInputValue(refs.textYRange, state.textY);
    setInputValue(refs.overlayScaleRange, state.overlayScale);
    setInputValue(refs.overlayXRange, state.overlayX);
    setInputValue(refs.overlayYRange, state.overlayY);
    setInputValue(refs.overlayOpacityRange, state.overlayOpacity);
    setInputValue(refs.textColorInput, state.textColor);
    setInputValue(refs.exportSizeSelect, state.exportSize);

    setText(refs.brightnessValue, `${state.brightness}%`);
    setText(refs.contrastValue, `${state.contrast}%`);
    setText(refs.saturationValue, `${state.saturation}%`);
    setText(refs.warmthValue, `${state.warmth}%`);
    setText(refs.blurValue, `${state.blur}px`);
    setText(refs.zoomValue, `${state.zoom}%`);
    setText(refs.panXValue, `${state.panX}%`);
    setText(refs.panYValue, `${state.panY}%`);
    setText(refs.cutoutValue, String(state.cutoutThreshold));
    setText(refs.textSizeValue, `${state.textSize}px`);
    setText(refs.textXValue, `${state.textX}%`);
    setText(refs.textYValue, `${state.textY}%`);
    setText(refs.overlayScaleValue, `${state.overlayScale}%`);
    setText(refs.overlayXValue, `${state.overlayX}%`);
    setText(refs.overlayYValue, `${state.overlayY}%`);
    setText(refs.overlayOpacityValue, `${state.overlayOpacity}%`);
    setText(refs.textColorValue, state.textColor.toLowerCase());
    setText(refs.textLengthValue, state.locale === "ar" ? `${state.text.trim().length} حرف` : `${state.text.trim().length} chars`);
    setText(refs.exportSizeValue, translateEditorText(exportSizes[state.exportSize]?.label || "Source Fit"));

    refs.compareButton?.setAttribute("aria-pressed", state.compare ? "true" : "false");
    if (refs.compareButton) {
      refs.compareButton.textContent = translateEditorText(state.compare ? "Show Edited" : "Before / After");
    }

    refs.presetButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.preset === state.preset);
    });

    refs.frameButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.frame === state.frame);
    });

    if (refs.presetStatus) {
      refs.presetStatus.textContent = translateEditorText(presets[state.preset]?.label || "Custom Preset");
    }
    if (refs.frameStatus) {
      refs.frameStatus.textContent = translateEditorText(frameModes[state.frame]?.label || "Original Frame");
    }
    if (refs.cutoutButton) {
      refs.cutoutButton.classList.toggle("is-active", state.cutoutEnabled);
      refs.cutoutButton.textContent = translateEditorText(state.cutoutEnabled ? "Cutout Active" : "Remove Background");
    }
    if (refs.removeOverlayButton) {
      refs.removeOverlayButton.classList.toggle("is-active", hasOverlayImage());
    }
    if (refs.previewCanvas) {
      refs.previewCanvas.style.cursor = state.dragging ? "grabbing" : "grab";
    }
  }

  function renderPreview() {
    const dimensions = getRenderDimensions("preview");
    refs.previewCanvas.width = dimensions.width;
    refs.previewCanvas.height = dimensions.height;
    refs.previewFrame.style.setProperty("--editor-aspect", `${dimensions.width} / ${dimensions.height}`);
    drawScene(previewContext, dimensions.width, dimensions.height, false, "png");
  }

  function drawScene(context, width, height, isExport, exportType) {
    context.clearRect(0, 0, width, height);

    if (isExport && exportType === "jpeg") {
      context.fillStyle = "#0b0f1a";
      context.fillRect(0, 0, width, height);
    }

    if (hasBaseImage()) {
      const source = getRenderableSource();
      const sourceWidth = getSourceWidth(source);
      const sourceHeight = getSourceHeight(source);

      if (sourceWidth && sourceHeight) {
        const rotation = normalizeDisplayRotation();
        const radians = (rotation * Math.PI) / 180;
        const rotatedBaseWidth = rotation === 90 || rotation === 270 ? sourceHeight : sourceWidth;
        const rotatedBaseHeight = rotation === 90 || rotation === 270 ? sourceWidth : sourceHeight;
        const coverScale = Math.max(width / rotatedBaseWidth, height / rotatedBaseHeight) * (state.zoom / 100);
        const offsetX = (state.panX / 100) * width * 0.55;
        const offsetY = (state.panY / 100) * height * 0.55;

        context.save();
        context.translate(width / 2 + offsetX, height / 2 + offsetY);
        context.scale(state.flipX * coverScale, state.flipY * coverScale);
        context.rotate(radians);
        context.filter = state.compare ? "none" : buildFilter();
        context.drawImage(source, -sourceWidth / 2, -sourceHeight / 2, sourceWidth, sourceHeight);
        context.restore();
        context.filter = "none";
      }
    } else {
      drawEmptyState(context, width, height);
    }

    if (!state.compare && hasOverlayImage()) {
      drawOverlayImage(context, width, height);
    }

    if (!state.compare && state.text.trim()) {
      drawTextOverlay(context, width, height);
    }
  }

  function drawTextOverlay(context, width, height) {
    const lines = splitText(state.text.trim(), 26);
    if (!lines.length) return;

    const fontSize = clamp(state.textSize, 24, 180);
    const x = width / 2 + (state.textX / 100) * width * 0.45;
    const y = height / 2 + (state.textY / 100) * height * 0.45;
    const lineHeight = fontSize * 1.12;

    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
    context.lineJoin = "round";
    context.lineWidth = Math.max(2, fontSize * 0.08);
    context.strokeStyle = "rgba(11, 15, 26, 0.58)";
    context.fillStyle = state.textColor;
    context.shadowColor = "rgba(0, 0, 0, 0.28)";
    context.shadowBlur = fontSize * 0.22;
    context.shadowOffsetY = Math.max(2, fontSize * 0.04);

    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      const lineY = startY + index * lineHeight;
      context.strokeText(line, x, lineY);
      context.fillText(line, x, lineY);
    });
    context.restore();
  }

  function exportImage(type) {
    if (!hasBaseImage() && !hasOverlayImage()) {
      setStatus("Nothing to export yet.", "Upload a main image or insert an image layer first, then export the result.");
      return;
    }

    const dimensions = getRenderDimensions("export");
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const context = canvas.getContext("2d");
    if (!context) return;

    drawScene(context, dimensions.width, dimensions.height, true, type);

    const link = document.createElement("a");
    const extension = type === "jpeg" ? "jpg" : "png";
    link.href = canvas.toDataURL(type === "jpeg" ? "image/jpeg" : "image/png", 0.92);
    link.download = `${state.fileName}-edited.${extension}`;
    link.click();

    setStatus(
      "Export complete.",
      state.locale === "ar"
        ? `تم تجهيز الصورة المعدلة بصيغة ${extension.toUpperCase()} اعتمادًا على الإطار الحالي والإزالة والنص والتعديلات.`
        : `The edited image was prepared as ${extension.toUpperCase()} using the current frame, cutout, text, and adjustments.`
    );
  }

  function getRenderDimensions(mode) {
    const source = hasBaseImage() ? getRenderableSource() : hasOverlayImage() ? refs.overlayImage : null;
    const sourceWidth = (source && getSourceWidth(source)) || refs.sourceImage.naturalWidth || refs.overlayImage?.naturalWidth || 1200;
    const sourceHeight = (source && getSourceHeight(source)) || refs.sourceImage.naturalHeight || refs.overlayImage?.naturalHeight || 1200;
    const rotation = normalizeDisplayRotation();
    const rotatedWidth = rotation === 90 || rotation === 270 ? sourceHeight : sourceWidth;
    const rotatedHeight = rotation === 90 || rotation === 270 ? sourceWidth : sourceHeight;
    const aspect = getFrameAspect(rotatedWidth, rotatedHeight);

    if (mode === "preview") {
      const longSide = 1280;
      if (aspect >= 1) {
        return { width: longSide, height: Math.round(longSide / aspect) };
      }
      return { width: Math.round(longSide * aspect), height: longSide };
    }

    const exportConfig = exportSizes[state.exportSize] || exportSizes.source;
    if (!exportConfig.longSide) {
      if (aspect >= rotatedWidth / rotatedHeight) {
        return { width: rotatedWidth, height: Math.round(rotatedWidth / aspect) };
      }
      return { width: Math.round(rotatedHeight * aspect), height: rotatedHeight };
    }

    if (aspect >= 1) {
      return { width: exportConfig.longSide, height: Math.round(exportConfig.longSide / aspect) };
    }
    return { width: Math.round(exportConfig.longSide * aspect), height: exportConfig.longSide };
  }

  function getFrameAspect(width, height) {
    const frame = frameModes[state.frame];
    if (!frame || !frame.aspect) {
      return width / Math.max(1, height);
    }
    return frame.aspect;
  }

  function getRenderableSource() {
    if (!hasBaseImage()) {
      return null;
    }

    if (!state.cutoutEnabled || state.compare) {
      return refs.sourceImage;
    }

    const cacheKey = `${state.source}|${state.cutoutThreshold}|${refs.sourceImage.naturalWidth}x${refs.sourceImage.naturalHeight}`;
    if (state.cutoutCanvas && state.cutoutCacheKey === cacheKey) {
      return state.cutoutCanvas;
    }

    const canvas = document.createElement("canvas");
    const width = refs.sourceImage.naturalWidth || refs.sourceImage.width;
    const height = refs.sourceImage.naturalHeight || refs.sourceImage.height;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return refs.sourceImage;

    context.drawImage(refs.sourceImage, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const cornerSamples = getCornerSamples(pixels, width, height);

    for (let index = 0; index < pixels.length; index += 4) {
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const alpha = pixels[index + 3];

      const minDistance = Math.min(
        colorDistance(r, g, b, cornerSamples.topLeft),
        colorDistance(r, g, b, cornerSamples.topRight),
        colorDistance(r, g, b, cornerSamples.bottomLeft),
        colorDistance(r, g, b, cornerSamples.bottomRight)
      );

      if (minDistance < state.cutoutThreshold) {
        const strength = minDistance / Math.max(1, state.cutoutThreshold);
        pixels[index + 3] = Math.max(0, Math.round(alpha * strength * strength));
      }
    }

    context.putImageData(imageData, 0, 0);
    state.cutoutCanvas = canvas;
    state.cutoutCacheKey = cacheKey;
    return canvas;
  }

  function getCornerSamples(pixels, width, height) {
    const sampleSize = clamp(Math.round(Math.min(width, height) * 0.08), 8, 40);
    return {
      topLeft: averageCorner(pixels, width, 0, 0, sampleSize, sampleSize),
      topRight: averageCorner(pixels, width, width - sampleSize, 0, width, sampleSize),
      bottomLeft: averageCorner(pixels, width, 0, height - sampleSize, sampleSize, height),
      bottomRight: averageCorner(pixels, width, width - sampleSize, height - sampleSize, width, height)
    };
  }

  function averageCorner(pixels, width, startX, startY, endX, endY) {
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let count = 0;

    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        const index = (y * width + x) * 4;
        totalR += pixels[index];
        totalG += pixels[index + 1];
        totalB += pixels[index + 2];
        count += 1;
      }
    }

    return {
      r: totalR / Math.max(1, count),
      g: totalG / Math.max(1, count),
      b: totalB / Math.max(1, count)
    };
  }

  function colorDistance(r, g, b, target) {
    return Math.sqrt((r - target.r) ** 2 + (g - target.g) ** 2 + (b - target.b) ** 2);
  }

  function buildFilter() {
    return [
      `brightness(${state.brightness}%)`,
      `contrast(${state.contrast}%)`,
      `saturate(${state.saturation}%)`,
      `sepia(${state.warmth}%)`,
      `blur(${state.blur}px)`
    ].join(" ");
  }

  function updateMeta() {
    const width = refs.sourceImage.naturalWidth || 0;
    const height = refs.sourceImage.naturalHeight || 0;
    const exportDimensions = getRenderDimensions("export");
    const previewState = translateEditorText(state.compare ? "Before View" : "Preview Ready");
    const imageState = translateEditorText(width && height ? "Image Loaded" : "Fresh Canvas");
    const cutoutState = translateEditorText(state.cutoutEnabled ? "Cutout On" : "Cutout Off");
    const textState = translateEditorText(state.text.trim() ? "Text On" : "Text Off");
    const overlayState = translateEditorText(hasOverlayImage() ? "Layer On" : "Layer Off");
    const featureSummary = state.text.trim()
      ? state.locale === "ar"
        ? `${state.text.trim().length} حرف فوق الصورة`
        : `${state.text.trim().length} chars overlay`
      : translateEditorText("No overlay text yet.");
    const orientation = `${translateEditorText(state.flipX === -1 ? "Flip X" : "Normal X")} | ${translateEditorText(state.flipY === -1 ? "Flip Y" : "Normal Y")}`;

    setText(refs.fileName, hasBaseImage() ? `${state.fileName}.${state.extension === "jpeg" ? "jpg" : state.extension}` : translateEditorText("No image selected"));
    setText(refs.previewState, previewState);
    setText(refs.imageState, imageState);
    setText(refs.imageMeta, width && height ? (state.locale === "ar" ? `${width} × ${height} بكسل أصلي` : `${width} x ${height} px source`) : translateEditorText("No base image loaded yet"));
    setText(refs.sizeMeta, hasBaseImage() || hasOverlayImage() ? (state.locale === "ar" ? `${exportDimensions.width} × ${exportDimensions.height} تصدير` : `${exportDimensions.width} x ${exportDimensions.height} export`) : translateEditorText("Ready after upload"));
    setText(refs.transformMeta, state.locale === "ar" ? `دوران ${normalizeDisplayRotation()}° | ${orientation}` : `Rotation ${normalizeDisplayRotation()} deg | ${orientation}`);
    setText(refs.cutoutMeta, cutoutState);
    setText(refs.textMeta, textState);
    setText(refs.featureMeta, featureSummary);
    setText(refs.overlayMeta, overlayState);
    setText(
      refs.overlayInfo,
      hasOverlayImage()
        ? state.locale === "ar"
          ? `${state.overlayFileName || translateEditorText("Inserted layer")} | شفافية ${state.overlayOpacity}%`
          : `${state.overlayFileName || "Inserted layer"} | ${state.overlayOpacity}% opacity`
        : translateEditorText("No inserted image layer yet.")
    );
    setText(
      refs.frameMeta,
      hasBaseImage() || hasOverlayImage()
        ? `${translateEditorText(frameModes[state.frame]?.label || "Original Frame")} | ${translateEditorText(exportSizes[state.exportSize]?.label || "Source Fit")}`
        : translateEditorText("Upload an image or use the sample to begin.")
    );
  }

  function setStatus(title, text) {
    state.statusTitle = title;
    state.statusText = text;
    renderStatus();
  }

  function renderStatus() {
    const strong = refs.statusBox?.querySelector("strong");
    if (strong) {
      strong.textContent = translateEditorText(state.statusTitle);
    }
    setText(refs.statusText, translateEditorText(state.statusText));
  }

  function invalidateCutoutCache() {
    state.cutoutCacheKey = "";
    state.cutoutCanvas = null;
  }

  function ensureEditedView() {
    if (!state.compare) return;
    state.compare = false;
  }

  function normalizeRotation() {
    state.rotation = normalizeDisplayRotation();
  }

  function normalizeDisplayRotation() {
    return ((state.rotation % 360) + 360) % 360;
  }

  function splitText(value, maxChars) {
    const words = value.split(/\s+/).filter(Boolean);
    if (!words.length) return [];

    const lines = [];
    let current = words[0];

    for (let index = 1; index < words.length; index += 1) {
      const next = words[index];
      if (`${current} ${next}`.length <= maxChars) {
        current = `${current} ${next}`;
      } else {
        lines.push(current);
        current = next;
      }
    }

    lines.push(current);
    return lines.slice(0, 3);
  }

  function setInputValue(node, value) {
    if (!node) return;
    node.value = String(value);
  }

  function setText(node, value) {
    if (!node) return;
    node.textContent = value;
  }

  function getSourceWidth(source) {
    return source instanceof HTMLCanvasElement ? source.width : source.naturalWidth || source.width;
  }

  function getSourceHeight(source) {
    return source instanceof HTMLCanvasElement ? source.height : source.naturalHeight || source.height;
  }

  function sanitizeName(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "edited-image";
  }

  function hasBaseImage() {
    return Boolean(state.source) && Boolean(refs.sourceImage?.naturalWidth);
  }

  function hasOverlayImage() {
    return Boolean(state.overlaySource) && Boolean(refs.overlayImage?.naturalWidth);
  }

  function drawEmptyState(context, width, height) {
    context.save();
    context.fillStyle = "rgba(255,255,255,0.02)";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(124, 58, 237, 0.22)";
    context.lineWidth = Math.max(2, width * 0.004);
    context.setLineDash([18, 18]);
    context.strokeRect(width * 0.08, height * 0.08, width * 0.84, height * 0.84);
    context.setLineDash([]);

    context.fillStyle = "rgba(255,255,255,0.92)";
    context.font = `700 ${Math.max(28, width * 0.04)}px Inter, Arial, sans-serif`;
    context.textAlign = "center";
    context.fillText("Fresh Orphex Canvas", width / 2, height / 2 - 20);

    context.fillStyle = "rgba(157, 169, 188, 0.92)";
    context.font = `500 ${Math.max(16, width * 0.018)}px Inter, Arial, sans-serif`;
    context.fillText("Upload a main image or insert a new image layer to begin editing.", width / 2, height / 2 + 26);
    context.restore();
  }

  function drawOverlayImage(context, width, height) {
    const sourceWidth = refs.overlayImage.naturalWidth || 0;
    const sourceHeight = refs.overlayImage.naturalHeight || 0;
    if (!sourceWidth || !sourceHeight) return;

    const scale = Math.min(width, height) * (state.overlayScale / 100) / Math.max(sourceWidth, sourceHeight);
    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;
    const offsetX = (state.overlayX / 100) * width * 0.45;
    const offsetY = (state.overlayY / 100) * height * 0.45;

    context.save();
    context.globalAlpha = clamp(state.overlayOpacity / 100, 0.1, 1);
    context.drawImage(refs.overlayImage, width / 2 - drawWidth / 2 + offsetX, height / 2 - drawHeight / 2 + offsetY, drawWidth, drawHeight);
    context.restore();
  }
})();
