import { motion } from "framer-motion";
import type { AssetItem, EffectItem, FilterItem } from "../data/mock";
import { SceneArtwork } from "./SceneArtwork";

type Item = AssetItem | EffectItem | FilterItem;

type AssetGridProps = {
  items: Item[];
  activeId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
};

export function AssetGrid({ items, activeId, onSelect, compact = false }: AssetGridProps) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-2 xl:grid-cols-5"}`}>
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ y: -3 }}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`glass-panel-soft overflow-hidden p-2 text-left transition ${activeId === item.id ? "border-neon-violet/40 shadow-[0_0_0_1px_rgba(155,92,255,0.18),0_20px_48px_rgba(61,24,124,0.28)]" : ""}`}
        >
          <SceneArtwork variant={item.scene} className={`${compact ? "h-24" : "h-28"} rounded-2xl`} />
          <div className="mt-3 space-y-1">
            <div className="text-sm font-semibold text-white">{item.name}</div>
            <div className="text-[11px] text-white/40">{"type" in item ? item.type : item.category}</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
