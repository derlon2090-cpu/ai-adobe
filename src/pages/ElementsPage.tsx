import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { AssetGrid } from "../components/AssetGrid";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { RightInspector } from "../components/RightInspector";
import { SceneArtwork } from "../components/SceneArtwork";
import { elementTabs, elementsCategories, elementsItems } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function ElementsPage() {
  const language = useAppStore((state) => state.language);
  const selectedElementId = useAppStore((state) => state.selectedElementId);
  const selectElement = useAppStore((state) => state.selectElement);
  const addClipToTimeline = useAppStore((state) => state.addClipToTimeline);
  const pushToast = useAppStore((state) => state.pushToast);
  const [activeTab, setActiveTab] = useState(elementTabs[0]);
  const [activeCategory, setActiveCategory] = useState(elementsCategories[0]);
  const [search, setSearch] = useState("");

  const selectedItem = elementsItems.find((item) => item.id === selectedElementId) ?? elementsItems[0];
  const filtered = useMemo(() => {
    return elementsItems.filter((item) => {
      const matchesSearch = `${item.name} ${item.category} ${item.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "All Elements" || item.category.includes(activeTab.replace("Lower Thirds", "Lower Thirds"));
      const matchesCategory = activeCategory === "Trending" || item.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]));
      return matchesSearch && (matchesTab || activeTab === "All Elements") && (matchesCategory || activeCategory === "Trending");
    });
  }, [activeCategory, activeTab, search]);

  return (
    <div>
      <PageHeading
        eyebrow="Elements"
        title={language === "ar" ? "مكتبة العناصر والرسومات" : "Elements and motion graphics library"}
        description={
          language === "ar"
            ? "استعرض إطارات النيون، العناوين، الـ lower thirds، والملصقات الجاهزة مع معاينة جانبية مباشرة."
            : "Browse neon frames, glitch titles, callouts, lower thirds, and packs with instant preview."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[220px,1fr,320px]">
        <NeonCard title={language === "ar" ? "التصنيفات" : "Categories"}>
          <div className="space-y-2">
            {elementsCategories.map((category, index) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  category === activeCategory
                    ? "border border-neon-violet/30 bg-neon-violet/12 text-white"
                    : "border border-transparent bg-white/[0.02] text-white/65 hover:border-white/8 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{category}</span>
                <span className="text-xs text-white/35">{248 - index * 8}</span>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard
            title={language === "ar" ? "Trending Elements" : "Trending Elements"}
            action={
              <label className="relative w-full max-w-[280px]">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} className="search-input w-full pl-11" placeholder={language === "ar" ? "ابحث عن العناصر..." : "Search elements..."} />
              </label>
            }
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {elementTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-2xl px-4 py-2 text-sm ${tab === activeTab ? "bg-neon-violet/18 text-white" : "bg-white/[0.03] text-white/55"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <AssetGrid items={filtered} activeId={selectedItem.id} onSelect={selectElement} />
          </NeonCard>

          <div className="grid gap-5 xl:grid-cols-[1fr,0.75fr]">
            <NeonCard title={language === "ar" ? "Shape Library" : "Shape Library"}>
              <div className="grid grid-cols-4 gap-3">
                {["Rectangle", "Circle", "Triangle", "Line", "Arrow", "Star", "Hexagon", "Heart"].map((shape) => (
                  <button key={shape} type="button" className="glass-panel-soft flex h-20 items-center justify-center text-xs text-white/72 transition hover:border-neon-violet/20">
                    {shape}
                  </button>
                ))}
              </div>
            </NeonCard>

            <NeonCard title={language === "ar" ? "Sticker Library" : "Sticker Library"}>
              <div className="grid grid-cols-5 gap-3">
                {["🔥", "💯", "👑", "💜", "⚡"].map((sticker) => (
                  <button key={sticker} type="button" className="glass-panel-soft flex h-20 items-center justify-center text-2xl transition hover:border-neon-violet/20">
                    {sticker}
                  </button>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>

        <RightInspector
          title={language === "ar" ? "Element Details" : "Element Details"}
          action={<button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0"><Star size={15} /></button>}
        >
          <div className="scene-card h-44">
            <SceneArtwork variant={selectedItem.scene} className="h-full w-full rounded-none" />
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              { labelAr: "النوع", labelEn: "Type", value: selectedItem.category },
              { labelAr: "الدقة", labelEn: "Resolution", value: selectedItem.resolution ?? "4K" },
              { labelAr: "المدة", labelEn: "Duration", value: selectedItem.duration ?? "Loop" },
              { labelAr: "الحجم", labelEn: "File Size", value: selectedItem.fileSize ?? "1.2 MB" }
            ].map((item) => (
              <div key={item.labelEn} className="glass-panel-soft flex items-center justify-between px-4 py-3">
                <span className="text-white/45">{language === "ar" ? item.labelAr : item.labelEn}</span>
                <span className="text-white/85">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedItem.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/55">
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="neon-button mt-5 w-full"
            onClick={() => {
              addClipToTimeline(selectedItem.name, "Overlay");
              pushToast(language === "ar" ? "تمت الإضافة" : "Added to Timeline", language === "ar" ? `${selectedItem.name} أضيف إلى المسار.` : `${selectedItem.name} has been inserted into the timeline.`);
            }}
          >
            {language === "ar" ? "أضف إلى التايملاين" : "Add to Timeline"}
          </button>
        </RightInspector>
      </div>
    </div>
  );
}
