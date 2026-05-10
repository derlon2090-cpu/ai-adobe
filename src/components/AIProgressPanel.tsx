import { localize, type AIToolItem, type Language } from "../data/mock";
import { SliderControl } from "./SliderControl";

type AIProgressPanelProps = {
  language: Language;
  tool: AIToolItem;
  steps: { id: string; label: string; done: boolean; percent: number }[];
  motionSensitivity: number;
  soundSensitivity: number;
  quality: number;
  onMotionChange: (value: number) => void;
  onSoundChange: (value: number) => void;
  onQualityChange: (value: number) => void;
  processing: boolean;
  onToggleProcessing: () => void;
};

export function AIProgressPanel({
  language,
  tool,
  steps,
  motionSensitivity,
  soundSensitivity,
  quality,
  onMotionChange,
  onSoundChange,
  onQualityChange,
  processing,
  onToggleProcessing
}: AIProgressPanelProps) {
  return (
    <div className="space-y-5" dir={language === "ar" ? "rtl" : "ltr"}>
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h4 className="text-lg font-semibold text-white">{localize(tool.title, language)}</h4>
          <span className="rounded-xl border border-neon-violet/25 px-2 py-1 text-xs text-neon-cyan">AI</span>
        </div>
        <p className="text-sm text-white/45">{localize(tool.description, language)}</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="glass-panel-soft p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-white/82">{step.label}</span>
              </div>
              <span className="text-xs text-white/45">{step.percent}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan"
                style={{ width: `${step.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <SliderControl
          label={language === "ar" ? "حساسية الحركة" : "Motion Sensitivity"}
          value={`${motionSensitivity}%`}
          onChange={onMotionChange}
        />
        <SliderControl
          label={language === "ar" ? "حساسية الصوت" : "Sound Sensitivity"}
          value={`${soundSensitivity}%`}
          onChange={onSoundChange}
        />
        <SliderControl label={language === "ar" ? "الجودة" : "Quality"} value={`${quality}%`} onChange={onQualityChange} />
      </div>

      <button type="button" onClick={onToggleProcessing} className="neon-button w-full">
        {processing ? (language === "ar" ? "إيقاف المعالجة" : "Stop Processing") : language === "ar" ? "تشغيل المعالجة" : "Start Processing"}
      </button>
    </div>
  );
}
