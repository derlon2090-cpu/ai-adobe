import { Bot, Cloud, Rocket, ScanSearch } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { topBadgeMetrics, localize } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const iconMap = {
  ai: Bot,
  "4k": ScanSearch,
  performance: Rocket,
  cloud: Cloud
};

export function TopHero() {
  const language = useAppStore((state) => state.language);

  return (
    <header className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="rounded-[2rem] border border-white/8 bg-black/26 px-5 py-5 shadow-neon backdrop-blur-xl">
        <BrandMark language={language} />
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 xl:max-w-[760px]">
        {topBadgeMetrics.map((metric) => {
          const Icon = iconMap[metric.id as keyof typeof iconMap] ?? Bot;

          return (
            <div
              key={metric.id}
              className="glass-panel-soft flex min-h-[118px] flex-col items-center justify-center gap-3 px-4 py-4 text-center"
            >
              <div className="metric-icon-box">
                <Icon className="text-neon-cyan" size={22} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{localize(metric.title, language)}</div>
                <div className="mt-1 text-xs text-white/42">{localize(metric.subtitle, language)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
