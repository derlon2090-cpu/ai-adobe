import { Camera, Maximize2, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { SceneArtwork } from "./SceneArtwork";

type PreviewPlayerProps = {
  variant?: string;
  altVariant?: string;
  title?: string;
  ratio?: string;
  resolution?: string;
  timecode?: string;
  duration?: string;
  comparison?: boolean;
  className?: string;
  labels?: {
    before: string;
    after: string;
  };
};

export function PreviewPlayer({
  variant = "city",
  altVariant = "mountain",
  title,
  ratio = "16:9",
  resolution = "4K",
  timecode = "00:00:07:15",
  duration = "00:00:45:18",
  comparison = false,
  className = "",
  labels
}: PreviewPlayerProps) {
  return (
    <div className={`glass-panel overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div>
          {title ? <div className="text-sm font-semibold text-white">{title}</div> : null}
          <div className="mt-1 flex items-center gap-2 text-xs text-white/45">
            <span className="rounded-full border border-white/10 px-2 py-1">{ratio}</span>
            <span className="rounded-full border border-white/10 px-2 py-1">{resolution}</span>
            <span>{timecode}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
            <Camera size={15} />
          </button>
          <button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      <div className="relative p-4">
        <div className="scene-card h-[320px] rounded-[1.75rem] lg:h-[390px] xl:h-[420px]">
          {comparison ? (
            <>
              <SceneArtwork variant={altVariant} className="absolute inset-0 h-full w-full rounded-none" />
              <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                <SceneArtwork variant={variant} className="h-full w-[200%] rounded-none" />
              </div>
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.55)]" />
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white">
                <span className="text-lg">↔</span>
              </div>
              {labels ? (
                <>
                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs text-white/85">{labels.before}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-500/18 px-3 py-1 text-xs text-emerald-200">{labels.after}</span>
                </>
              ) : null}
            </>
          ) : (
            <SceneArtwork variant={variant} className="h-full w-full rounded-none" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/8 px-4 py-3">
        <div className="text-xs text-white/45">{timecode}</div>
        <div className="flex items-center gap-2">
          {[SkipBack, Play, Pause, SkipForward].map((Icon, index) => (
            <button key={index} type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
              <Icon size={15} />
            </button>
          ))}
        </div>
        <div className="text-xs text-white/45">{duration}</div>
      </div>
    </div>
  );
}
