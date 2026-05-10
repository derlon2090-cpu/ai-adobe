import { useState } from "react";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { ScopeChart } from "../components/ScopeChart";
import { SliderControl } from "../components/SliderControl";
import { useAppStore } from "../store/useAppStore";

const lutItems = ["None", "CinePunk", "Teal & Orange", "Moody Film", "Warm Film"];

export function ColorPage() {
  const language = useAppStore((state) => state.language);
  const [temperature, setTemperature] = useState(62);
  const [tint, setTint] = useState(44);
  const [exposure, setExposure] = useState(52);
  const [contrast, setContrast] = useState(58);
  const [highlights, setHighlights] = useState(28);
  const [shadows, setShadows] = useState(64);
  const [whites, setWhites] = useState(48);
  const [blacks, setBlacks] = useState(38);
  const [clarity, setClarity] = useState(44);
  const [dehaze, setDehaze] = useState(36);
  const [vibrance, setVibrance] = useState(66);
  const [saturation, setSaturation] = useState(55);
  const [lut, setLut] = useState("Teal & Orange");

  return (
    <div>
      <PageHeading
        eyebrow="Color Grading Pro"
        title={language === "ar" ? "تصحيح وتلوين احترافي" : "Professional color correction and grading"}
        description={
          language === "ar"
            ? "لوحة تلوين غنية تشمل توازن الأبيض، التحكم بالنغمات، العجلات اللونية، السكوبات، الـ LUTs، والمطابقة الذكية."
            : "A dense grading panel with white balance, tone shaping, color wheels, scopes, LUTs, and auto matching."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[320px,1fr,320px]">
        <NeonCard title={language === "ar" ? "Basic" : "Basic"}>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Basic", "Creative", "HSL", "Curves", "LUTs", "Scopes"].map((tab, index) => (
              <button key={tab} type="button" className={`rounded-2xl px-4 py-2 text-sm ${index === 0 ? "bg-neon-violet/18 text-white" : "bg-white/[0.03] text-white/55"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "توازن الأبيض" : "White Balance"}</div>
              <div className="space-y-4">
                <SliderControl label={language === "ar" ? "الحرارة" : "Temperature"} value={temperature} onChange={setTemperature} />
                <SliderControl label={language === "ar" ? "الصبغة" : "Tint"} value={tint} onChange={setTint} />
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "النغمات" : "Tone"}</div>
              <div className="space-y-4">
                <SliderControl label={language === "ar" ? "الإضاءة" : "Exposure"} value={exposure} onChange={setExposure} />
                <SliderControl label={language === "ar" ? "التباين" : "Contrast"} value={contrast} onChange={setContrast} />
                <SliderControl label={language === "ar" ? "الهايلايت" : "Highlights"} value={highlights} onChange={setHighlights} />
                <SliderControl label={language === "ar" ? "الظلال" : "Shadows"} value={shadows} onChange={setShadows} />
                <SliderControl label={language === "ar" ? "الأبيض" : "Whites"} value={whites} onChange={setWhites} />
                <SliderControl label={language === "ar" ? "الأسود" : "Blacks"} value={blacks} onChange={setBlacks} />
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "الحضور" : "Presence"}</div>
              <div className="space-y-4">
                <SliderControl label={language === "ar" ? "الوضوح" : "Clarity"} value={clarity} onChange={setClarity} />
                <SliderControl label={language === "ar" ? "إزالة الضباب" : "Dehaze"} value={dehaze} onChange={setDehaze} />
                <SliderControl label={language === "ar" ? "الزخم اللوني" : "Vibrance"} value={vibrance} onChange={setVibrance} />
                <SliderControl label={language === "ar" ? "التشبع" : "Saturation"} value={saturation} onChange={setSaturation} />
              </div>
            </div>
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <PreviewPlayer title="Color Preview" variant="mountain" ratio="16:9" resolution="4K" className="min-h-[460px]" />

          <NeonCard title={language === "ar" ? "عجلات الألوان" : "Color Wheels"}>
            <div className="grid gap-4 md:grid-cols-4">
              {["Lift", "Gamma", "Gain", "Offset"].map((item, index) => (
                <div key={item} className="glass-panel-soft p-4 text-center">
                  <div className="mb-3 text-sm font-semibold text-white">{item}</div>
                  <div className="mx-auto h-32 w-32 rounded-full bg-[conic-gradient(from_120deg,#ff3366,#f59e0b,#22c55e,#22d3ee,#8b5cf6,#ff3366)] p-[6px]">
                    <div className="relative h-full w-full rounded-full bg-surface-900">
                      <div
                        className="absolute h-4 w-4 rounded-full border border-white/40 bg-white"
                        style={{ left: `${46 + index * 7}%`, top: `${30 + index * 5}%`, transform: "translate(-50%, -50%)" }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/45">{index === 3 ? "25.00" : "1.08"}</div>
                </div>
              ))}
            </div>
          </NeonCard>

          <div className="grid gap-5 xl:grid-cols-[1fr,1fr,0.9fr]">
            <NeonCard title="Curves">
              <div className="h-56">
                <ScopeChart type="curve" />
              </div>
            </NeonCard>
            <NeonCard title="RGB Parade">
              <div className="h-56">
                <ScopeChart type="rgb" />
              </div>
            </NeonCard>
            <NeonCard title={language === "ar" ? "Split Toning" : "Split Toning"}>
              <div className="space-y-4">
                <SliderControl label={language === "ar" ? "الهايلايت" : "Highlights"} value="45" onChange={() => {}} />
                <SliderControl label={language === "ar" ? "التوازن" : "Balance"} value="28" onChange={() => {}} />
                <SliderControl label={language === "ar" ? "الظلال" : "Shadows"} value="22" onChange={() => {}} />
              </div>
            </NeonCard>
          </div>
        </div>

        <div className="grid gap-5">
          <NeonCard title="Scopes">
            <div className="h-56">
              <ScopeChart type="rgb" />
            </div>
            <div className="mt-5 h-56">
              <ScopeChart type="vector" />
            </div>
          </NeonCard>

          <NeonCard title="LUTs">
            <div className="grid grid-cols-2 gap-3">
              {lutItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLut(item)}
                  className={`glass-panel-soft overflow-hidden p-2 text-left ${lut === item ? "border-neon-violet/25" : ""}`}
                >
                  <div className="scene-card h-20">
                    <div className={`h-full w-full ${item === "Warm Film" ? "bg-[radial-gradient(circle_at_top,rgba(255,165,82,0.28),transparent_25%),linear-gradient(180deg,#11162a_0%,#3a241c_100%)]" : item === "Moody Film" ? "bg-[linear-gradient(180deg,#11172a_0%,#1c2238_35%,#16111d_100%)]" : "bg-[radial-gradient(circle_at_top,rgba(31,214,255,0.16),transparent_22%),linear-gradient(180deg,#12182d_0%,#25133e_100%)]"}`} />
                  </div>
                  <div className="mt-2 text-xs font-semibold text-white">{item}</div>
                </button>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "مطابقة الألوان" : "Color Match"}>
            <button type="button" className="neon-button w-full">
              {language === "ar" ? "مطابقة تلقائية" : "Auto Match"}
            </button>
            <div className="mt-4 scene-card h-32">
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.22),transparent_26%),linear-gradient(180deg,#0c1121_0%,#171437_100%)]" />
            </div>
            <div className="mt-4">
              <SliderControl label={language === "ar" ? "القوة" : "Strength"} value="80%" onChange={() => {}} />
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
