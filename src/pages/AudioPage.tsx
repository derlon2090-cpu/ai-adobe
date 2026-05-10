import { Heart, MoreHorizontal, Plus, Play, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AudioWaveform } from "../components/AudioWaveform";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { RightInspector } from "../components/RightInspector";
import { audioLibrarySections, audioTracks } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const playlistCounts = [156, 89, 64, 112, 75, 38, 97];

export function AudioPage() {
  const language = useAppStore((state) => state.language);
  const selectedAudioTrackId = useAppStore((state) => state.selectedAudioTrackId);
  const selectAudioTrack = useAppStore((state) => state.selectAudioTrack);
  const addClipToTimeline = useAppStore((state) => state.addClipToTimeline);
  const pushToast = useAppStore((state) => state.pushToast);
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("All");
  const [genre, setGenre] = useState("All");
  const [instrument, setInstrument] = useState("All");

  const selectedTrack = audioTracks.find((track) => track.id === selectedAudioTrackId) ?? audioTracks[0];

  const filteredTracks = useMemo(() => {
    return audioTracks.filter((track) => {
      const matchesSearch = `${track.name} ${track.artist}`.toLowerCase().includes(search.toLowerCase());
      const matchesMood = mood === "All" || track.mood === mood;
      const matchesGenre = genre === "All" || track.genre === genre;
      const matchesInstrument = instrument === "All" || track.instrument === instrument;
      return matchesSearch && matchesMood && matchesGenre && matchesInstrument;
    });
  }, [genre, instrument, mood, search]);

  return (
    <div>
      <PageHeading
        eyebrow="Audio Studio"
        title={language === "ar" ? "مكتبة الصوت الاحترافية" : "Professional Music Library"}
        description={
          language === "ar"
            ? "استعرض الموسيقى والمؤثرات والأجواء الصوتية مع تفاصيل جاهزة للإضافة المباشرة إلى التايملاين."
            : "Browse tracks, sound effects, ambience, and vocals with instant timeline actions."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[240px,1fr,320px]">
        <NeonCard title={language === "ar" ? "الفئات" : "Library"}>
          <div className="space-y-2">
            {audioLibrarySections.map((section, index) => (
              <button key={section} type="button" className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${index === 0 ? "border border-neon-violet/25 bg-neon-violet/12 text-white" : "border border-transparent bg-white/[0.02] text-white/65 hover:border-white/8 hover:bg-white/[0.04] hover:text-white"}`}>
                <span>{section}</span>
                <span className="text-xs text-white/35">{2451 - index * 386}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold text-white">{language === "ar" ? "القوائم" : "Playlists"}</div>
            <div className="space-y-2">
              {["Cinematic", "Vlog", "Corporate", "Travel", "Sport", "Promo", "Relax"].map((item, index) => (
                <div key={item} className="glass-panel-soft flex items-center justify-between px-4 py-3 text-sm text-white/75">
                  <span>{item}</span>
                  <span className="text-xs text-white/35">{playlistCounts[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </NeonCard>

        <NeonCard title={language === "ar" ? "Music Library" : "Music Library"}>
          <div className="mb-4 flex flex-wrap gap-3">
            <label className="relative flex-1 min-w-[240px]">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="search-input w-full pl-11" placeholder={language === "ar" ? "ابحث عن موسيقى..." : "Search music..."} />
            </label>

            {[{ value: mood, set: setMood, items: ["All", "Cinematic", "Motivational", "Futuristic", "Dreamy"] }, { value: genre, set: setGenre, items: ["All", "Epic", "Orchestral", "Electronic", "Ambient", "Lo-Fi"] }, { value: instrument, set: setInstrument, items: ["All", "Strings", "Piano", "Synth", "Drums", "Choir"] }].map((group, index) => (
              <select key={index} value={group.value} onChange={(event) => group.set(event.target.value)} className="search-input min-w-[140px]">
                {group.items.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            ))}
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/8">
            <div className="grid grid-cols-[2.1fr,1.2fr,1fr,1fr,1fr,0.4fr] gap-3 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.16em] text-white/35">
              <div>{language === "ar" ? "اسم التراك" : "Track Name"}</div>
              <div>{language === "ar" ? "الفنان" : "Artist"}</div>
              <div>{language === "ar" ? "المزاج" : "Mood"}</div>
              <div>{language === "ar" ? "النوع" : "Genre"}</div>
              <div>{language === "ar" ? "المدة" : "Duration"}</div>
              <div />
            </div>

            {filteredTracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => selectAudioTrack(track.id)}
                className={`grid w-full grid-cols-[2.1fr,1.2fr,1fr,1fr,1fr,0.4fr] items-center gap-3 border-t border-white/[0.06] px-4 py-3 text-left transition ${track.id === selectedTrack.id ? "bg-neon-violet/12" : "hover:bg-white/[0.03]"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                    <Play size={14} className="text-neon-cyan" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">{track.name}</div>
                    <div className="mt-1">
                      <AudioWaveform bars={track.waveform} compact accent={track.genre === "Electronic" ? "cyan" : "purple"} />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-white/72">{track.artist}</div>
                <div>
                  <span className="rounded-full border border-neon-violet/20 bg-neon-violet/10 px-2 py-1 text-xs text-neon-cyan">{track.mood}</span>
                </div>
                <div className="text-sm text-white/62">{track.genre}</div>
                <div className="text-sm text-white/62">{track.duration}</div>
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-white/35" />
                  <MoreHorizontal size={14} className="text-white/35" />
                </div>
              </button>
            ))}
          </div>
        </NeonCard>

        <RightInspector
          title={selectedTrack.name}
          action={<button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0"><Heart size={15} /></button>}
        >
          <div className="glass-panel-soft p-4">
            <AudioWaveform bars={selectedTrack.waveform} accent={selectedTrack.genre === "Electronic" ? "cyan" : "purple"} />
          </div>

          <div className="mt-4 text-sm text-white/65">{selectedTrack.artist}</div>

          <div className="mt-4 space-y-4">
            {[
              { labelAr: "الأنواع", labelEn: "Genres", items: [selectedTrack.genre, "Epic", "Orchestral"] },
              { labelAr: "المزاج", labelEn: "Mood", items: [selectedTrack.mood, "Uplifting", "Hopeful"] },
              { labelAr: "الآلات", labelEn: "Instrument", items: [selectedTrack.instrument, "Piano", "Drums"] }
            ].map((group) => (
              <div key={group.labelEn}>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">{language === "ar" ? group.labelAr : group.labelEn}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/62">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="neon-button mt-5 w-full gap-2"
            onClick={() => {
              addClipToTimeline(`${selectedTrack.name}.mp3`, "Audio");
              pushToast(language === "ar" ? "تمت الإضافة" : "Added to Timeline", language === "ar" ? `${selectedTrack.name} أضيف إلى المسار الصوتي.` : `${selectedTrack.name} has been sent to the audio timeline.`);
            }}
          >
            <Plus size={15} />
            <span>{language === "ar" ? "أضف إلى التايملاين" : "Add to Timeline"}</span>
          </button>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-white">{language === "ar" ? "تراكات مشابهة" : "Similar Tracks"}</div>
              <button type="button" className="text-xs text-white/35 hover:text-white/70">See All</button>
            </div>
            <div className="space-y-2">
              {audioTracks.filter((track) => track.id !== selectedTrack.id).slice(0, 3).map((track) => (
                <div key={track.id} className="glass-panel-soft flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-white/75">{track.name}</span>
                  <span className="text-white/35">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </RightInspector>
      </div>
    </div>
  );
}
