type AudioWaveformProps = {
  bars: number[];
  accent?: "purple" | "green" | "cyan";
  compact?: boolean;
};

const accentMap = {
  purple: "from-fuchsia-500 via-violet-500 to-indigo-500",
  green: "from-emerald-400 via-teal-400 to-cyan-400",
  cyan: "from-cyan-400 via-sky-400 to-indigo-500"
};

export function AudioWaveform({ bars, accent = "purple", compact = false }: AudioWaveformProps) {
  return (
    <div className={`flex items-end gap-[2px] ${compact ? "h-10" : "h-14"} w-full`}>
      {bars.map((bar, index) => (
        <span
          key={`${accent}-${index}`}
          className={`block flex-1 rounded-full bg-gradient-to-t ${accentMap[accent]} opacity-90`}
          style={{ height: `${Math.max(12, bar)}%` }}
        />
      ))}
    </div>
  );
}
