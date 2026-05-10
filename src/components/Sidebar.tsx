import {
  BadgeDollarSign,
  Blend,
  Bot,
  Clapperboard,
  FolderKanban,
  HelpCircle,
  Home,
  Layers3,
  LifeBuoy,
  Music4,
  Palette,
  Send,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Type,
  UserRound,
  UsersRound,
  Wand2
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { BrandMark } from "./BrandMark";
import { localize, navigationItems } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const iconMap = {
  home: Home,
  "folder-kanban": FolderKanban,
  clapperboard: Clapperboard,
  "music-4": Music4,
  type: Type,
  sparkles: Sparkles,
  blend: Blend,
  "wand-2": Wand2,
  "sliders-horizontal": SlidersHorizontal,
  "layers-3": Layers3,
  bot: Bot,
  palette: Palette,
  send: Send,
  "users-round": UsersRound,
  "user-round": UserRound,
  "settings-2": Settings2,
  "badge-dollar-sign": BadgeDollarSign,
  "life-buoy": LifeBuoy
} as const;

export function Sidebar() {
  const language = useAppStore((state) => state.language);

  return (
    <aside className="flex h-full min-h-[860px] flex-col border-r border-white/8 bg-black/28 px-3 py-4">
      <div className="mb-6 px-2">
        <BrandMark language={language} compact />
      </div>

      <nav className="flex-1 space-y-1.5">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? HelpCircle;

          return (
            <NavLink key={item.id} to={item.route}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${
                    isActive
                      ? "border border-neon-violet/30 bg-gradient-to-r from-neon-violet/20 to-neon-cyan/10 text-white shadow-[0_0_0_1px_rgba(124,58,237,0.18),0_18px_40px_rgba(59,24,121,0.25)]"
                      : "border border-transparent text-white/65 hover:border-white/8 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
                      isActive ? "bg-neon-violet/18 text-neon-cyan" : "bg-white/[0.03] text-white/65 group-hover:text-neon-cyan"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="truncate text-[13px] font-medium">{localize(item.label, language)}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-4 glass-panel-soft p-3">
        <div className="text-sm font-semibold text-white">Orzain Studio</div>
        <div className="mt-1 text-xs text-white/45">{language === "ar" ? "خطة Pro" : "Pro Plan"}</div>
        <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan" />
        </div>
      </div>
    </aside>
  );
}
