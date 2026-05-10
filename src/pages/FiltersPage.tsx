import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AssetGrid } from "../components/AssetGrid";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { RightInspector } from "../components/RightInspector";
import { SliderControl } from "../components/SliderControl";
import { filterCategories, filterItems } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function FiltersPage() {
  const language = useAppStore((state) => state.language);
  const selectedFilterId = useAppStore((state) => state.selectedFilterId);
  const selectFilter = useAppStore((state) => state.selectFilter);
  const pushToast = useAppStore((state) => state.pushToast);
  const [category, setCategory] = useState("All Filters");
  const [search, setSearch] = useState("");
  const [intensity, setIntensity] = useState(80);
  const [exposure, setExposure] = useState(15);
  const [contrast, setContrast] = useState(20);
  const [highlights, setHighlights] = useState(-10);
  const [shadows, setShadows] = useState(25);
  const [saturation, setSaturation] = useState(30);
  const [temperature, setTemperature] = useState(-5);
  const [tint, setTint] = useState(0);

  const selectedFilter = filterItems.find((item) => item.id === selectedFilterId) ?? filterItems[0];
  const filtered = useMemo(() => {
    return filterItems.filter((item) => {
      const matchesCategory = category === "All Filters" || item.category === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div>
      <PageHeading
        eyebrow="Filter Studio"
        title={language === "ar" ? "الفلاتر الجاهزة" : "Curated cinematic filters"}
        description={
          language === "ar"
            ? "استعرض فلاتر Night وCinematic وFilm مع تعديلات جانبية، Presets جاهزة، وحفظ إعداداتك الخاصة."
            : "Explore Night, Cinematic, and Film looks with detailed controls and reusable presets."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[220px,1fr,360px]">
        <NeonCard title={language === "ar" ? "التصنيفات" : "Categories"}>
          <div className="space-y-2">
            {["All Filters", ...filterCategories].map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  category === item
                    ? "border border-neon-violet/30 bg-neon-violet/12 text-white"
                    : "border border-transparent bg-white/[0.02] text-white/65 hover:border-white/8 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{item}</span>
                <span className="text-xs text-white/35">{236 - index * 14}</span>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard
            title={language === "ar" ? "Featured Filters" : "Featured Filters"}
            action={
              <label className="relative w-full max-w-[280px]">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} className="search-input w-full pl-11" placeholder={language === "ar" ? "ابحث عن الفلاتر..." : "Search filters..."} />
              </label>
            }
          >
            <AssetGrid items={filterItems.slice(0, 5)} activeId={selectedFilter.id} onSelect={selectFilter} compact />
          </NeonCard>

          <NeonCard title={language === "ar" ? "Filter Categories" : "Filter Categories"}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {filterCategories.slice(0, 8).map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className="glass-panel-soft flex min-h-[78px] items-center justify-center text-sm text-white/75 transition hover:border-neon-violet/20">
                  {item}
                </button>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "All Filters" : "All Filters"}>
            <AssetGrid items={filtered} activeId={selectedFilter.id} onSelect={selectFilter} />
          </NeonCard>
        </div>

        <div className="grid gap-5">
          <PreviewPlayer title={selectedFilter.name} variant={selectedFilter.scene} className="min-h-[360px]" />

          <RightInspector title={language === "ar" ? "Filter Adjustments" : "Filter Adjustments"}>
            <div className="space-y-4">
              <SliderControl label={language === "ar" ? "القوة" : "Intensity"} value={intensity.toFixed(2)} onChange={setIntensity} />
              <SliderControl label={language === "ar" ? "الإضاءة" : "Exposure"} value={exposure.toFixed(2)} onChange={setExposure} />
              <SliderControl label={language === "ar" ? "التباين" : "Contrast"} value={contrast.toFixed(2)} onChange={setContrast} />
              <SliderControl label={language === "ar" ? "الهايلايت" : "Highlights"} value={highlights.toFixed(2)} onChange={setHighlights} />
              <SliderControl label={language === "ar" ? "الظلال" : "Shadows"} value={shadows.toFixed(2)} onChange={setShadows} />
              <SliderControl label={language === "ar" ? "التشبع" : "Saturation"} value={saturation.toFixed(2)} onChange={setSaturation} />
              <SliderControl label={language === "ar" ? "الحرارة" : "Temperature"} value={temperature.toFixed(2)} onChange={setTemperature} />
              <SliderControl label={language === "ar" ? "الصبغة" : "Tint"} value={tint.toFixed(2)} onChange={setTint} />
            </div>

            <div className="mt-5">
              <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "Filter Presets" : "Filter Presets"}</div>
              <div className="grid grid-cols-2 gap-3">
                {["Cyberpunk", "Neon City", "Blade Runner", "Tokyo Night", "Miami Glow", "Synthwave"].map((item) => (
                  <button key={item} type="button" className="glass-panel-soft overflow-hidden p-2 text-left transition hover:border-neon-violet/20">
                    <div className="scene-card h-20 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.22),transparent_25%),linear-gradient(180deg,#0a1120_0%,#24133e_100%)]" />
                    <div className="mt-2 text-xs text-white">{item}</div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="neon-button mt-4 w-full"
                onClick={() =>
                  pushToast(language === "ar" ? "تم الحفظ" : "Preset Saved", language === "ar" ? `تم حفظ ${selectedFilter.name} كإعداد جديد.` : `${selectedFilter.name} has been saved as a preset.`)
                }
              >
                {language === "ar" ? "حفظ كإعداد" : "Save as Preset"}
              </button>
            </div>
          </RightInspector>
        </div>
      </div>
    </div>
  );
}
