import { useEffect, useMemo, useState } from "react";
import { AIProgressPanel } from "../components/AIProgressPanel";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { aiTools, localize } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function AIToolsPage() {
  const language = useAppStore((state) => state.language);
  const selectedAiToolId = useAppStore((state) => state.selectedAiToolId);
  const selectAiTool = useAppStore((state) => state.selectAiTool);
  const processing = useAppStore((state) => state.processing);
  const setProcessing = useAppStore((state) => state.setProcessing);
  const aiProgress = useAppStore((state) => state.aiProgress);
  const setAiProgress = useAppStore((state) => state.setAiProgress);
  const pushToast = useAppStore((state) => state.pushToast);
  const [motionSensitivity, setMotionSensitivity] = useState(70);
  const [soundSensitivity, setSoundSensitivity] = useState(60);
  const [quality, setQuality] = useState(82);
  const [editStyle, setEditStyle] = useState("Dynamic");

  const selectedTool = aiTools.find((tool) => tool.id === selectedAiToolId) ?? aiTools[0];

  useEffect(() => {
    if (!processing) return;

    const timer = window.setInterval(() => {
      const next = Math.min(100, useAppStore.getState().aiProgress + 4);
      setAiProgress(next);
      if (next >= 100) {
        setProcessing(false);
        pushToast(language === "ar" ? "اكتملت المعالجة" : "Processing Complete", language === "ar" ? "تم إنهاء المعالجة الذكية بنجاح." : "AI processing completed successfully.");
      }
    }, 650);

    return () => window.clearInterval(timer);
  }, [language, processing, pushToast, setAiProgress, setProcessing]);

  const steps = useMemo(
    () => [
      { id: "analyze", label: language === "ar" ? "تحليل الفيديو" : "Analyze Video", done: aiProgress >= 25, percent: Math.min(aiProgress, 25) },
      { id: "select", label: language === "ar" ? "اختيار أفضل اللقطات" : "Select Best Takes", done: aiProgress >= 50, percent: Math.max(0, Math.min(aiProgress - 10, 50)) },
      { id: "assemble", label: language === "ar" ? "قص وتجميع تلقائي" : "Auto Cut & Assemble", done: aiProgress >= 75, percent: Math.max(0, Math.min(aiProgress - 20, 75)) },
      { id: "finish", label: language === "ar" ? "تحسين نهائي" : "Final Enhancement", done: aiProgress >= 100, percent: aiProgress }
    ],
    [aiProgress, language]
  );

  return (
    <div>
      <PageHeading
        eyebrow="AI Tools"
        title={language === "ar" ? "أدوات الذكاء الاصطناعي" : "AI-powered editing tools"}
        description={
          language === "ar"
            ? "واجهة عربية متكاملة تقريبًا للقص الذكي، كشف المشاهد، إزالة الضوضاء، التحسين، والتلوين الذكي مع مقارنة قبل/بعد."
            : "A rich AI control room for auto cut, scene detection, denoise, face enhancement, and before/after comparison."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.05fr,1.15fr,0.85fr]">
        <NeonCard title={language === "ar" ? "الوحدات الذكية" : "AI Modules"}>
          <div className="grid gap-3 md:grid-cols-2">
            {aiTools.map((tool, index) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => selectAiTool(tool.id)}
                className={`rounded-3xl border p-4 text-left transition ${
                  tool.id === selectedTool.id
                    ? "border-neon-violet/30 bg-gradient-to-r from-neon-violet/18 to-neon-cyan/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]"
                } ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{localize(tool.title, language)}</div>
                    <div className="mt-2 text-xs leading-6 text-white/48">{localize(tool.description, language)}</div>
                  </div>
                  {tool.badge ? <span className="rounded-full border border-neon-cyan/25 px-2 py-1 text-[10px] text-neon-cyan">{tool.badge}</span> : null}
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan" style={{ width: `${tool.progress}%` }} />
                </div>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <PreviewPlayer
            title={language === "ar" ? "مقارنة قبل وبعد" : "Before / After Comparison"}
            variant="city"
            altVariant="grid"
            comparison
            labels={{
              before: language === "ar" ? "قبل المعالجة" : "Before",
              after: language === "ar" ? "بعد المعالجة" : "After"
            }}
            className="min-h-[520px]"
          />

          <NeonCard title={language === "ar" ? "إعدادات التحرير" : "Processing Settings"}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-panel-soft px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">{language === "ar" ? "نمط التحرير" : "Edit Style"}</div>
                <select value={editStyle} onChange={(event) => setEditStyle(event.target.value)} className="search-input mt-3 w-full">
                  <option>Dynamic</option>
                  <option>Clean</option>
                  <option>Cinematic</option>
                  <option>Fast Social</option>
                </select>
              </div>
              <div className="glass-panel-soft px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">{language === "ar" ? "نسبة التقدم" : "Progress"}</div>
                <div className="mt-4 text-3xl font-semibold text-white">{aiProgress}%</div>
              </div>
            </div>
          </NeonCard>
        </div>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "AI Auto Cut" : "AI Auto Cut"}>
            <AIProgressPanel
              language={language}
              tool={selectedTool}
              steps={steps}
              motionSensitivity={motionSensitivity}
              soundSensitivity={soundSensitivity}
              quality={quality}
              onMotionChange={setMotionSensitivity}
              onSoundChange={setSoundSensitivity}
              onQualityChange={setQuality}
              processing={processing}
              onToggleProcessing={() => {
                if (!processing && aiProgress >= 100) setAiProgress(0);
                setProcessing(!processing);
              }}
            />
          </NeonCard>

          <NeonCard title={language === "ar" ? "خيارات إضافية" : "Extra Options"}>
            <div className="space-y-3">
              {[
                language === "ar" ? "قص السكتات" : "Trim silence",
                language === "ar" ? "تحديد أفضل اللقطات" : "Pick best takes",
                language === "ar" ? "تحسين الألوان والإضاءة" : "Refine light and color",
                language === "ar" ? "تنسيق الكابشن تلقائيًا" : "Auto style captions"
              ].map((item) => (
                <div key={item} className="glass-panel-soft flex items-center justify-between px-4 py-3 text-sm text-white/75">
                  <span>{item}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan" />
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
