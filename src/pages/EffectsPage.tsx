import { useMemo, useState } from "react";
import { AssetGrid } from "../components/AssetGrid";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { RightInspector } from "../components/RightInspector";
import { SliderControl } from "../components/SliderControl";
import { effectsCategories, effectsItems } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function EffectsPage() {
  const language = useAppStore((state) => state.language);
  const selectedEffectId = useAppStore((state) => state.selectedEffectId);
  const selectEffect = useAppStore((state) => state.selectEffect);
  const pushToast = useAppStore((state) => state.pushToast);
  const [category, setCategory] = useState(effectsCategories[0]);
  const [intensity, setIntensity] = useState(68);
  const [speed, setSpeed] = useState(45);
  const [distortion, setDistortion] = useState(72);
  const [rgbSplit, setRgbSplit] = useState(35);
  const [scanLines, setScanLines] = useState(25);

  const selectedEffect = effectsItems.find((item) => item.id === selectedEffectId) ?? effectsItems[0];
  const filtered = useMemo(() => (category === "All Effects" ? effectsItems : effectsItems.filter((item) => item.category === category)), [category]);

  return (
    <div>
      <PageHeading
        eyebrow="Effects Lab"
        title={language === "ar" ? "مختبر المؤثرات" : "Effects laboratory"}
        description={
          language === "ar"
            ? "مجموعة كثيفة من مؤثرات الفيديو والصوت مع تحكم مباشر بالقيم والـ presets داخل لوحة يمين غنية."
            : "A dense catalog of video and audio effects with direct parameter control and visual presets."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[230px,1fr,360px]">
        <NeonCard title={language === "ar" ? "التصنيفات" : "Categories"}>
          <div className="space-y-2">
            {effectsCategories.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  item === category
                    ? "border border-neon-violet/30 bg-neon-violet/12 text-white"
                    : "border border-transparent bg-white/[0.02] text-white/65 hover:border-white/8 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{item}</span>
                <span className="text-xs text-white/35">{1248 - index * 58}</span>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "Featured Effects" : "Featured Effects"}>
            <AssetGrid items={effectsItems.slice(0, 5)} activeId={selectedEffect.id} onSelect={selectEffect} compact />
          </NeonCard>

          <div className="grid gap-5 xl:grid-cols-[1fr,1fr]">
            <NeonCard title={language === "ar" ? "Video Effects" : "Video Effects"}>
              <div className="grid grid-cols-3 gap-3">
                {filtered.filter((item) => item.type !== "Audio").map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectEffect(item.id)}
                    className={`glass-panel-soft flex min-h-[92px] flex-col items-center justify-center px-2 text-center text-sm text-white/78 transition ${item.id === selectedEffect.id ? "border-neon-violet/25" : ""}`}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </NeonCard>

            <NeonCard title={language === "ar" ? "Audio Effects" : "Audio Effects"}>
              <div className="grid grid-cols-2 gap-3">
                {effectsItems.filter((item) => item.type === "Audio").map((item) => (
                  <button key={item.id} type="button" onClick={() => selectEffect(item.id)} className="glass-panel-soft flex min-h-[92px] items-center justify-center px-2 text-center text-sm text-white/78 transition hover:border-neon-violet/20">
                    {item.name}
                  </button>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>

        <div className="grid gap-5">
          <PreviewPlayer title={selectedEffect.name} variant={selectedEffect.scene} className="min-h-[360px]" />

          <RightInspector title={language === "ar" ? "Effect Controls" : "Effect Controls"}>
            <div className="space-y-4">
              <SliderControl label={language === "ar" ? "القوة" : "Intensity"} value={intensity.toFixed(2)} onChange={setIntensity} />
              <SliderControl label={language === "ar" ? "السرعة" : "Speed"} value={speed.toFixed(2)} onChange={setSpeed} />
              <SliderControl label={language === "ar" ? "التشوه" : "Distortion"} value={distortion.toFixed(2)} onChange={setDistortion} />
              <SliderControl label="RGB Split" value={rgbSplit.toFixed(2)} onChange={setRgbSplit} />
              <SliderControl label={language === "ar" ? "خطوط المسح" : "Scan Lines"} value={scanLines.toFixed(2)} onChange={setScanLines} />
            </div>

            <div className="mt-5">
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "Presets" : "Presets"}</div>
              <div className="grid grid-cols-3 gap-3">
                {["Default", "Extreme", "Cyberpunk", "Digital", "Analog", "TV Noise"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="glass-panel-soft overflow-hidden p-2 text-left transition hover:border-neon-violet/20"
                    onClick={() =>
                      pushToast(
                        language === "ar" ? "تم تطبيق preset" : "Preset Applied",
                        language === "ar" ? `تم تطبيق ${preset}.` : `${preset} has been applied.`
                      )
                    }
                  >
                    <div className="scene-card h-20 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_24%),linear-gradient(180deg,#0e1428_0%,#1e1232_100%)]" />
                    <div className="mt-2 text-xs text-white">{preset}</div>
                  </button>
                ))}
              </div>
            </div>
          </RightInspector>
        </div>
      </div>
    </div>
  );
}
