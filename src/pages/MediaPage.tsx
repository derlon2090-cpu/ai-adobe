import { Play, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { RightInspector } from "../components/RightInspector";
import { SceneArtwork } from "../components/SceneArtwork";
import { localize, mediaClips } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function MediaPage() {
  const language = useAppStore((state) => state.language);
  const selectedMediaClipId = useAppStore((state) => state.selectedMediaClipId);
  const selectMediaClip = useAppStore((state) => state.selectMediaClip);
  const addClipToTimeline = useAppStore((state) => state.addClipToTimeline);
  const pushToast = useAppStore((state) => state.pushToast);
  const [search, setSearch] = useState("");

  const visibleClips = useMemo(() => {
    const term = search.toLowerCase();
    return mediaClips.filter((clip) => clip.name.toLowerCase().includes(term) || clip.tags.some((tag) => tag.toLowerCase().includes(term)));
  }, [search]);

  const selectedClip = mediaClips.find((clip) => clip.id === selectedMediaClipId) ?? mediaClips[0];

  return (
    <div>
      <PageHeading
        eyebrow="Media Editor"
        title={language === "ar" ? "المحرر الرئيسي والوسائط" : "Main Editor & Media"}
        description={
          language === "ar"
            ? "عاين اللقطات، اختر المقاطع الأساسية، وأرسلها مباشرة إلى التايملاين مع بنية تحرير غنية ومظهر سينمائي داكن."
            : "Preview your scenes, inspect clip details, and add selected shots straight into the timeline."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[280px,1fr,330px]">
        <NeonCard title={language === "ar" ? "مكتبة المقاطع" : "Clip Library"}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={`search-input w-full ${language === "ar" ? "text-right" : ""}`}
            placeholder={language === "ar" ? "ابحث عن المقاطع..." : "Search clips..."}
          />
          <div className="mt-4 space-y-3">
            {visibleClips.map((clip) => (
              <button
                key={clip.id}
                type="button"
                onClick={() => selectMediaClip(clip.id)}
                className={`w-full rounded-2xl border p-3 text-left transition ${
                  clip.id === selectedClip.id
                    ? "border-neon-violet/35 bg-neon-violet/12 shadow-[0_0_0_1px_rgba(124,58,237,0.16),0_16px_36px_rgba(72,32,128,0.22)]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]"
                }`}
              >
                <div className="text-sm font-semibold text-white">{clip.name}</div>
                <div className="mt-1 text-xs text-white/45">
                  {clip.duration} • {clip.style}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {clip.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/8 px-2 py-1 text-[10px] text-white/55">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <PreviewPlayer
            title={language === "ar" ? "معاينة المشروع" : "Project Preview"}
            variant={selectedClip.id === "nature-01" ? "mountain" : selectedClip.id === "product-shot" ? "brand" : "city"}
            ratio={selectedClip.ratio}
            resolution={selectedClip.resolution.includes("x") ? "4K" : selectedClip.resolution}
            timecode="00:00:07:15"
            duration={selectedClip.duration}
            className="min-h-[560px]"
          />

          <NeonCard
            title={language === "ar" ? "Clips جاهزة للتحرير" : "Edit-ready Clips"}
            subtitle={language === "ar" ? "حدد لقطة ثم أضفها للتايملاين أو راجع بياناتها." : "Select a clip and send it to the timeline or inspect its data."}
          >
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {mediaClips.map((clip) => (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => selectMediaClip(clip.id)}
                  className={`glass-panel-soft overflow-hidden text-left transition ${clip.id === selectedClip.id ? "border-neon-violet/25" : ""}`}
                >
                  <SceneArtwork
                    variant={clip.id === "nature-01" ? "mountain" : clip.id === "product-shot" ? "brand" : "city"}
                    className="h-28 rounded-none"
                  />
                  <div className="p-3">
                    <div className="text-sm font-semibold text-white">{clip.name}</div>
                    <div className="mt-1 text-xs text-white/45">{clip.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          </NeonCard>
        </div>

        <RightInspector
          title={language === "ar" ? "تفاصيل اللقطة" : "Clip Details"}
          action={
            <button
              type="button"
              className="neon-button gap-2"
              onClick={() => {
                addClipToTimeline(selectedClip.name, "Overlay");
                pushToast(
                  language === "ar" ? "أضيفت إلى التايملاين" : "Added to Timeline",
                  language === "ar" ? `${selectedClip.name} أصبحت ضمن المسار.` : `${selectedClip.name} has been inserted into the timeline.`
                );
              }}
            >
              <Plus size={15} />
              <span>{language === "ar" ? "أضف" : "Add"}</span>
            </button>
          }
        >
          <div className="scene-card h-44">
            <SceneArtwork
              variant={selectedClip.id === "nature-01" ? "mountain" : selectedClip.id === "product-shot" ? "brand" : "city"}
              className="h-full w-full rounded-none"
            />
          </div>

          <div className="mt-4 grid gap-3 text-sm">
            {[
              { labelAr: "الاسم", labelEn: "Name", value: selectedClip.name },
              { labelAr: "المدة", labelEn: "Duration", value: selectedClip.duration },
              { labelAr: "النسبة", labelEn: "Ratio", value: selectedClip.ratio },
              { labelAr: "الدقة", labelEn: "Resolution", value: selectedClip.resolution },
              { labelAr: "الأسلوب", labelEn: "Style", value: selectedClip.style }
            ].map((item) => (
              <div key={item.labelEn} className="glass-panel-soft flex items-center justify-between px-4 py-3">
                <span className="text-white/45">{language === "ar" ? item.labelAr : item.labelEn}</span>
                <span className="text-white/85">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="mb-2 text-sm font-semibold text-white">{language === "ar" ? "الوصف" : "Description"}</div>
            <p className="text-sm leading-6 text-white/55">{localize(selectedClip.description, language)}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedClip.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/55">
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="ghost-button mt-5 w-full gap-2"
            onClick={() =>
              pushToast(
                language === "ar" ? "تشغيل المعاينة" : "Preview Started",
                language === "ar" ? `بدأت معاينة ${selectedClip.name}.` : `Preview started for ${selectedClip.name}.`
              )
            }
          >
            <Play size={15} />
            <span>{language === "ar" ? "تشغيل المعاينة" : "Play Preview"}</span>
          </button>
        </RightInspector>
      </div>
    </div>
  );
}
