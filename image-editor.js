(function () {
  const shell = document.getElementById("imageEditorShell");
  if (!shell) return;

  const refs = {
    previewImage: document.getElementById("editorPreviewImage"),
    uploadInput: document.getElementById("editorUploadInput"),
    uploadButton: document.getElementById("editorUploadButton"),
    sampleButton: document.getElementById("editorSampleButton"),
    compareButton: document.getElementById("editorCompareButton"),
    resetButton: document.getElementById("editorResetButton"),
    autoEnhanceButton: document.getElementById("editorAutoEnhanceButton"),
    downloadPngButton: document.getElementById("editorDownloadPngButton"),
    downloadJpgButton: document.getElementById("editorDownloadJpgButton"),
    presetStatus: document.getElementById("editorPresetStatus"),
    fileName: document.getElementById("editorFileName"),
    imageMeta: document.getElementById("editorImageMeta"),
    sizeMeta: document.getElementById("editorSizeMeta"),
    transformMeta: document.getElementById("editorTransformMeta"),
    statusText: document.getElementById("editorStatusText"),
    brightnessRange: document.getElementById("brightnessRange"),
    contrastRange: document.getElementById("contrastRange"),
    saturationRange: document.getElementById("saturationRange"),
    warmthRange: document.getElementById("warmthRange"),
    blurRange: document.getElementById("blurRange"),
    brightnessValue: document.getElementById("brightnessValue"),
    contrastValue: document.getElementById("contrastValue"),
    saturationValue: document.getElementById("saturationValue"),
    warmthValue: document.getElementById("warmthValue"),
    blurValue: document.getElementById("blurValue"),
    presetButtons: Array.from(document.querySelectorAll("[data-preset]")),
    transformButtons: Array.from(document.querySelectorAll("[data-transform]"))
  };

  if (!refs.previewImage) return;

  const sampleSrc = refs.previewImage.getAttribute("src") || "assets/orphex-logo.jpg";

  const presets = {
    custom: { label: "Custom Preset", brightness: 100, contrast: 100, saturation: 100, warmth: 0, blur: 0 },
    clean: { label: "Clean Preset", brightness: 106, contrast: 108, saturation: 102, warmth: 4, blur: 0 },
    portrait: { label: "Portrait Preset", brightness: 108, contrast: 110, saturation: 114, warmth: 10, blur: 0 },
    product: { label: "Product Preset", brightness: 112, contrast: 124, saturation: 108, warmth: 6, blur: 0 },
    noir: { label: "Noir Preset", brightness: 96, contrast: 138, saturation: 0, warmth: 0, blur: 0 },
    glow: { label: "Social Glow Preset", brightness: 112, contrast: 118, saturation: 136, warmth: 12, blur: 1 }
  };

  const state = {
    source: sampleSrc,
    fileName: "orphex-logo",
    extension: "png",
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 0,
    blur: 0,
    rotation: 0,
    flipX: 1,
    flipY: 1,
    compare: false,
    preset: "custom"
  };

  bindEvents();
  syncSliders();
  updatePreview();
  updateMeta();

  function bindEvents() {
    refs.uploadButton?.addEventListener("click", () => refs.uploadInput?.click());
    refs.sampleButton?.addEventListener("click", useSample);
    refs.compareButton?.addEventListener("click", toggleCompare);
    refs.resetButton?.addEventListener("click", resetEditor);
    refs.autoEnhanceButton?.addEventListener("click", () => applyPreset("product", true));
    refs.downloadPngButton?.addEventListener("click", () => exportImage("png"));
    refs.downloadJpgButton?.addEventListener("click", () => exportImage("jpeg"));

    refs.uploadInput?.addEventListener("change", handleUpload);
    refs.previewImage.addEventListener("load", updateMeta);

    [
      ["brightness", refs.brightnessRange],
      ["contrast", refs.contrastRange],
      ["saturation", refs.saturationRange],
      ["warmth", refs.warmthRange],
      ["blur", refs.blurRange]
    ].forEach(([key, input]) => {
      input?.addEventListener("input", () => {
        state[key] = Number(input.value);
        state.preset = "custom";
        syncPresetButtons();
        syncSliders();
        updatePreview();
        setStatus("Adjustments updated.", "The preview reflects your latest brightness, color, or clarity changes.");
      });
    });

    refs.presetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const preset = button.dataset.preset || "custom";
        applyPreset(preset, false);
      });
    });

    refs.transformButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.transform;
        if (!action) return;

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
        updatePreview();
        setStatus("Transform applied.", "Rotation and flip controls affect both the live preview and exported file.");
      });
    });
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const rawName = file.name.replace(/\.[^.]+$/, "") || "edited-image";
      const extension = (file.name.split(".").pop() || "png").toLowerCase();
      state.source = String(reader.result || sampleSrc);
      state.fileName = sanitizeName(rawName);
      state.extension = extension === "jpg" ? "jpeg" : extension;
      refs.previewImage.src = state.source;
      setStatus("Image uploaded.", "Your image is ready for live editing inside Orphex.");
    };
    reader.readAsDataURL(file);
  }

  function useSample() {
    state.source = sampleSrc;
    state.fileName = "orphex-logo";
    state.extension = "png";
    refs.previewImage.src = sampleSrc;
    setStatus("Sample restored.", "The default Orphex sample is active again for quick testing.");
  }

  function toggleCompare() {
    state.compare = !state.compare;
    refs.compareButton?.setAttribute("aria-pressed", state.compare ? "true" : "false");
    refs.compareButton && (refs.compareButton.textContent = state.compare ? "Show Edited" : "Before / After");
    updatePreview();
    setStatus(
      state.compare ? "Before view enabled." : "Edited view restored.",
      state.compare
        ? "Preview is temporarily showing the original image with the current transform only."
        : "Preview is back to the edited version."
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
    state.compare = false;
    state.preset = "custom";
    refs.compareButton?.setAttribute("aria-pressed", "false");
    refs.compareButton && (refs.compareButton.textContent = "Before / After");
    syncSliders();
    updatePreview();
    setStatus("Editor reset.", "All adjustments, transform changes, and compare mode were cleared.");
  }

  function applyPreset(presetName, markAsAuto) {
    const preset = presets[presetName];
    if (!preset) return;

    state.preset = presetName;
    state.brightness = preset.brightness;
    state.contrast = preset.contrast;
    state.saturation = preset.saturation;
    state.warmth = preset.warmth;
    state.blur = preset.blur;
    state.compare = false;
    refs.compareButton?.setAttribute("aria-pressed", "false");
    refs.compareButton && (refs.compareButton.textContent = "Before / After");
    syncSliders();
    updatePreview();
    setStatus(
      markAsAuto ? "Auto Enhance applied." : `${preset.label} applied.`,
      markAsAuto
        ? "Orphex boosted the image with a balanced, high-clarity preset."
        : "You can keep the preset as-is or fine-tune the sliders manually."
    );
  }

  function syncSliders() {
    if (refs.brightnessRange) refs.brightnessRange.value = String(state.brightness);
    if (refs.contrastRange) refs.contrastRange.value = String(state.contrast);
    if (refs.saturationRange) refs.saturationRange.value = String(state.saturation);
    if (refs.warmthRange) refs.warmthRange.value = String(state.warmth);
    if (refs.blurRange) refs.blurRange.value = String(state.blur);

    if (refs.brightnessValue) refs.brightnessValue.textContent = `${state.brightness}%`;
    if (refs.contrastValue) refs.contrastValue.textContent = `${state.contrast}%`;
    if (refs.saturationValue) refs.saturationValue.textContent = `${state.saturation}%`;
    if (refs.warmthValue) refs.warmthValue.textContent = `${state.warmth}%`;
    if (refs.blurValue) refs.blurValue.textContent = `${state.blur}px`;

    syncPresetButtons();
  }

  function syncPresetButtons() {
    refs.presetButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.preset === state.preset);
    });
  }

  function updatePreview() {
    const filter = state.compare ? "none" : buildFilter();
    refs.previewImage.style.filter = filter;
    refs.previewImage.style.transform = `rotate(${state.rotation}deg) scale(${state.flipX}, ${state.flipY})`;

    if (refs.presetStatus) {
      refs.presetStatus.textContent = presets[state.preset]?.label || "Custom Preset";
    }

    updateMeta();
  }

  function updateMeta() {
    const width = refs.previewImage.naturalWidth || 0;
    const height = refs.previewImage.naturalHeight || 0;
    const orientation = `${state.flipX === -1 ? "Flip X" : "Normal X"} • ${state.flipY === -1 ? "Flip Y" : "Normal Y"}`;

    if (refs.fileName) {
      refs.fileName.textContent = `${state.fileName}.${state.extension === "jpeg" ? "jpg" : state.extension}`;
    }
    if (refs.imageMeta) {
      refs.imageMeta.textContent = width && height ? `${width} × ${height} px` : "Preview image loaded";
    }
    if (refs.sizeMeta) {
      refs.sizeMeta.textContent = state.compare ? "Original preview mode" : "Edited preview mode";
    }
    if (refs.transformMeta) {
      refs.transformMeta.textContent = `Rotation ${normalizeDisplayRotation()}° • ${orientation}`;
    }
  }

  function setStatus(title, text) {
    const statusBox = document.getElementById("editorStatusBox");
    const strong = statusBox?.querySelector("strong");
    if (strong) strong.textContent = title;
    if (refs.statusText) refs.statusText.textContent = text;
  }

  function normalizeRotation() {
    const normalized = ((state.rotation % 360) + 360) % 360;
    state.rotation = normalized;
  }

  function normalizeDisplayRotation() {
    return ((state.rotation % 360) + 360) % 360;
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

  function exportImage(type) {
    const image = new Image();
    image.onload = () => {
      const rotation = normalizeDisplayRotation();
      const radians = (rotation * Math.PI) / 180;
      const swapSides = rotation === 90 || rotation === 270;
      const sourceWidth = image.naturalWidth || image.width;
      const sourceHeight = image.naturalHeight || image.height;
      const canvas = document.createElement("canvas");

      canvas.width = swapSides ? sourceHeight : sourceWidth;
      canvas.height = swapSides ? sourceWidth : sourceHeight;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.scale(state.flipX, state.flipY);
      context.rotate(radians);
      context.filter = state.compare ? "none" : buildFilter();
      context.drawImage(image, -sourceWidth / 2, -sourceHeight / 2, sourceWidth, sourceHeight);
      context.restore();

      const link = document.createElement("a");
      const extension = type === "jpeg" ? "jpg" : "png";
      link.href = canvas.toDataURL(type === "jpeg" ? "image/jpeg" : "image/png", 0.92);
      link.download = `${state.fileName}-edited.${extension}`;
      link.click();

      setStatus("Export complete.", `Your edited image was prepared as ${extension.toUpperCase()} and downloaded from the current Orphex preview.`);
    };

    image.src = state.source;
  }

  function sanitizeName(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "edited-image";
  }
})();
