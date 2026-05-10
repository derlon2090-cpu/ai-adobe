import { CheckCircle2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { ExportSettingsPanel } from "../components/ExportSettingsPanel";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { exportTargets } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function ExportPage() {
  const language = useAppStore((state) => state.language);
  const exportProgress = useAppStore((state) => state.exportProgress);
  const setExportProgress = useAppStore((state) => state.setExportProgress);
  const pushToast = useAppStore((state) => state.pushToast);
  const [target, setTarget] = useState(exportTargets[0]);
  const [quality, setQuality] = useState(80);
  const [toggles, setToggles] = useState({ alpha: false, hardware: true, normalize: true });

  useEffect(() => {
    if (exportProgress <= 0 || exportProgress >= 100) return;

    const timer = window.setInterval(() => {
      const next = Math.min(100, useAppStore.getState().exportProgress + 5);
      setExportProgress(next);
      if (next >= 100) {
        pushToast(language === "ar" ? "اكتمل التصدير" : "Export Complete", language === "ar" ? "تم تصدير الملف بنجاح." : "Your file has been exported successfully.");
      }
    }, 420);

    return () => window.clearInterval(timer);
  }, [exportProgress, language, pushToast, setExportProgress]);

  return (
    <div>
      <PageHeading
        eyebrow="Export Center"
        title={language === "ar" ? "جهّز الفيديو للتسليم" : "Prepare your final video export"}
        description={
          language === "ar"
            ? "اختر منصة الإخراج، اضبط الصيغة والدقة ومعدل الإطارات، ثم ابدأ تصديرًا وهميًا كامل التفاعل مع تقدم مرئي."
            : "Choose a delivery target, refine format settings, and launch a fully animated mock export flow."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[250px,1fr,360px]">
        <NeonCard title={language === "ar" ? "وجهات التصدير" : "Targets"}>
          <div className="space-y-2">
            {exportTargets.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTarget(item)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  item === target
                    ? "border-neon-violet/30 bg-neon-violet/12 text-white"
                    : "border-white/8 bg-white/[0.03] text-white/65 hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <div className="text-sm font-semibold">{item}</div>
                <div className="mt-1 text-xs text-white/40">{language === "ar" ? "إعداد جاهز" : "Optimized preset"}</div>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <PreviewPlayer title={language === "ar" ? "معاينة التصدير" : "Export Preview"} variant="city" className="min-h-[420px]" />

          <NeonCard title={language === "ar" ? "ملخص التصدير" : "Export Summary"}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { labelAr: "الصيغة", labelEn: "Format", value: "MP4" },
                { labelAr: "الدقة", labelEn: "Resolution", value: "3840 x 2160 (4K)" },
                { labelAr: "الإطارات", labelEn: "Frame Rate", value: "60 fps" },
                { labelAr: "المدة", labelEn: "Duration", value: "00:45:18" },
                { labelAr: "Video Bitrate", labelEn: "Video Bitrate", value: "35 Mbps" },
                { labelAr: "Audio Bitrate", labelEn: "Audio Bitrate", value: "320 kbps" },
                { labelAr: "الحجم", labelEn: "File Size", value: "~ 521 MB" },
                { labelAr: "الوجهة", labelEn: "Target", value: target }
              ].map((item) => (
                <div key={item.labelEn} className="glass-panel-soft p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-white/35">{language === "ar" ? item.labelAr : item.labelEn}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "Export Settings" : "Export Settings"}>
            <ExportSettingsPanel
              language={language}
              quality={quality}
              setQuality={setQuality}
              toggles={toggles}
              setToggle={(key) => setToggles((current) => ({ ...current, [key]: !current[key] }))}
            />

            <button
              type="button"
              className="neon-button mt-5 w-full gap-2"
              onClick={() => {
                setExportProgress(6);
                pushToast(language === "ar" ? "بدأ التصدير" : "Export Started", language === "ar" ? "بدأت محاكاة التصدير." : "Mock export has started.");
              }}
            >
              <Upload size={16} />
              <span>{language === "ar" ? "ابدأ التصدير الآن" : "Export Now"}</span>
            </button>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm text-white/55">
                <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                <span>{exportProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan" style={{ width: `${exportProgress}%` }} />
              </div>
              <div className="mt-3 text-xs text-white/45">
                {language === "ar" ? "الوقت المقدر: 00:01:42" : "Estimated Time: 00:01:42"}
              </div>
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "حالة الإخراج" : "Output State"}>
            <div className="grid gap-3">
              {[
                language === "ar" ? "Codec: H.264 (AVC)" : "Codec: H.264 (AVC)",
                language === "ar" ? "Audio: AAC Stereo" : "Audio: AAC Stereo",
                language === "ar" ? "After export: Do nothing" : "After export: Do nothing"
              ].map((item) => (
                <div key={item} className="glass-panel-soft flex items-center gap-3 px-4 py-3 text-sm text-white/72">
                  <CheckCircle2 size={15} className="text-neon-cyan" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
