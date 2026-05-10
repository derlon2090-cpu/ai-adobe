import { Link2, Redo2, Scissors, SkipBack, SkipForward, Trash2, Undo2, Unlink, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";
import { AudioWaveform } from "./AudioWaveform";
import { useAppStore } from "../store/useAppStore";

const toneClassMap: Record<string, string> = {
  purple: "from-violet-500/45 to-fuchsia-500/15 border-violet-400/30",
  violet: "from-violet-500/35 to-indigo-500/10 border-violet-400/25",
  slate: "from-slate-400/25 to-slate-500/10 border-slate-300/20",
  emerald: "from-emerald-400/25 to-cyan-400/10 border-emerald-300/25",
  amber: "from-amber-300/25 to-orange-400/10 border-amber-200/25",
  magenta: "from-fuchsia-500/40 to-purple-500/15 border-fuchsia-300/25",
  blue: "from-cyan-400/35 to-blue-500/10 border-cyan-300/25",
  green: "from-emerald-400/30 to-teal-400/10 border-emerald-300/25",
  cyan: "from-cyan-400/30 to-blue-500/10 border-cyan-300/25"
};

const seconds = Array.from({ length: 14 }).map((_, index) => index * 5);
const waveformPurple = [20, 30, 40, 34, 26, 28, 36, 48, 54, 50, 42, 38, 30, 26, 22, 28, 34, 40];
const waveformGreen = [12, 14, 18, 16, 22, 28, 34, 30, 26, 20, 18, 14, 12, 16, 20, 22, 26, 30];

export function Timeline() {
  const language = useAppStore((state) => state.language);
  const timelineTracks = useAppStore((state) => state.timelineTracks);

  return (
    <section className="border-t border-white/8 bg-black/24 px-4 py-4 lg:px-5" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[Undo2, Redo2, Scissors, Trash2, Link2, Unlink, SkipBack, SkipForward].map((Icon, index) => (
            <button key={index} type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-white/55">
          <span>00:00:07:15</span>
          <span>16:9</span>
          <span>4K</span>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
            <ZoomOut size={14} />
          </button>
          <div className="h-2 w-24 rounded-full bg-white/[0.08]">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan" />
          </div>
          <button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      <div className="glass-panel-soft overflow-hidden">
        <div className="relative overflow-x-auto">
          <div className="min-w-[1260px]">
            <div className="grid grid-cols-[112px,1fr,70px] border-b border-white/8 bg-white/[0.02]">
              <div className="border-r border-white/8 px-4 py-3 text-xs uppercase tracking-[0.28em] text-white/35">
                {language === "ar" ? "المسارات" : "Tracks"}
              </div>
              <div className="flex items-center">
                {seconds.map((tick) => (
                  <div key={tick} className="flex-1 border-r border-white/[0.04] px-2 py-3 text-[11px] text-white/35">
                    00:00:{String(tick).padStart(2, "0")}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 text-xs text-white/35">{language === "ar" ? "المتر" : "Meter"}</div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute bottom-0 left-[18%] top-0 w-px bg-cyan-300/90 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
              {timelineTracks.map((track) => {
                const isAudio = track.kind === "Audio" || track.kind === "Music" || track.kind === "SFX";

                return (
                  <div key={track.id} className="grid grid-cols-[112px,1fr,70px] border-b border-white/[0.05] last:border-b-0">
                    <div className="border-r border-white/8 px-4 py-4">
                      <div className="text-sm font-semibold text-white">{track.label}</div>
                      <div className="mt-1 text-xs text-white/45">{track.kind}</div>
                    </div>

                    <div className="relative h-[72px] bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:90px_100%]">
                      {track.clips.map((clip) => {
                        const left = `${clip.start}%`;
                        const width = `${clip.length}%`;
                        const toneClass = toneClassMap[clip.tone] ?? toneClassMap.purple;

                        return (
                          <motion.div
                            key={clip.id}
                            layout
                            className={`absolute top-2 h-[56px] rounded-2xl border bg-gradient-to-r px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.24)] ${toneClass}`}
                            style={{ left, width }}
                          >
                            <div className="text-xs font-semibold text-white">{clip.name}</div>
                            {isAudio ? (
                              <div className="mt-2">
                                <AudioWaveform bars={track.kind === "Music" ? waveformPurple : waveformGreen} accent={track.kind === "Music" ? "purple" : "green"} compact />
                              </div>
                            ) : (
                              <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
                                <span>{clip.label ?? "Edit Layer"}</span>
                                {clip.owner ? <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-white/65">{clip.owner}</span> : null}
                              </div>
                            )}
                            {isAudio ? (
                              <div className="absolute bottom-2 right-2 text-[10px] text-white/45">Fade</div>
                            ) : null}
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="flex items-end justify-center gap-[3px] px-4 py-3">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <span
                          key={index}
                          className="w-1 rounded-full bg-gradient-to-t from-red-500 via-amber-300 to-emerald-300"
                          style={{ height: `${20 + ((index * 7) % 46)}px`, opacity: 0.85 }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
