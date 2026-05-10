import { exportFormats, exportFrameRates, exportResolutions, type Language } from "../data/mock";
import { SliderControl } from "./SliderControl";

type ExportSettingsPanelProps = {
  language: Language;
  quality: number;
  setQuality: (value: number) => void;
  toggles: {
    alpha: boolean;
    hardware: boolean;
    normalize: boolean;
  };
  setToggle: (key: "alpha" | "hardware" | "normalize") => void;
};

export function ExportSettingsPanel({ language, quality, setQuality, toggles, setToggle }: ExportSettingsPanelProps) {
  const labels = {
    format: language === "ar" ? "الصيغة" : "Format",
    resolution: language === "ar" ? "الدقة" : "Resolution",
    frameRate: language === "ar" ? "معدل الإطارات" : "Frame Rate",
    quality: language === "ar" ? "الجودة" : "Quality",
    alpha: language === "ar" ? "قناة ألفا" : "Alpha Channel",
    hardware: language === "ar" ? "تسريع العتاد" : "Hardware Acceleration",
    normalize: language === "ar" ? "موازنة الصوت تلقائيًا" : "Auto Normalization"
  };

  return (
    <div className="space-y-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-3">
        <div className="text-sm font-medium text-white/78">{labels.format}</div>
        <div className="grid grid-cols-3 gap-2">
          {exportFormats.map((item) => (
            <button
              key={item}
              type="button"
              className={`ghost-button !py-2 ${item === "MP4" ? "!border-neon-violet/40 !bg-neon-violet/15" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-white/78">{labels.resolution}</div>
        <div className="grid grid-cols-3 gap-2">
          {exportResolutions.map((item) => (
            <button
              key={item}
              type="button"
              className={`ghost-button !py-2 ${item === "4K" ? "!border-neon-violet/40 !bg-neon-violet/15" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-white/78">{labels.frameRate}</div>
        <div className="grid grid-cols-3 gap-2">
          {exportFrameRates.map((item) => (
            <button
              key={item}
              type="button"
              className={`ghost-button !py-2 ${item === "60" ? "!border-neon-violet/40 !bg-neon-violet/15" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <SliderControl label={labels.quality} value={`${quality}%`} onChange={setQuality} />

      <div className="grid gap-3">
        {[
          { key: "alpha" as const, label: labels.alpha },
          { key: "hardware" as const, label: labels.hardware },
          { key: "normalize" as const, label: labels.normalize }
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setToggle(item.key)}
            className="glass-panel-soft flex items-center justify-between px-4 py-3"
          >
            <span className="text-sm text-white/80">{item.label}</span>
            <span
              className={`relative h-6 w-11 rounded-full transition ${
                toggles[item.key] ? "bg-gradient-to-r from-neon-violet to-neon-cyan" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${toggles[item.key] ? "right-1" : "left-1"}`}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
