import {
  Bell,
  ChevronDown,
  Cloud,
  LayoutGrid,
  Menu,
  Minus,
  Search,
  Settings,
  Square,
  Upload,
  X
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { navigationItems, localize } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export function TopHeader() {
  const location = useLocation();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const projectName = useAppStore((state) => state.projectName);
  const pushToast = useAppStore((state) => state.pushToast);

  const active = navigationItems.find((item) => item.route === location.pathname) ?? navigationItems[0];

  return (
    <div className="border-b border-white/8 px-4 py-3 lg:px-5" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0">
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <LayoutGrid size={16} className="text-neon-cyan" />
            <div>
              <div className="text-sm font-semibold text-white">Orzain Video Pro 26</div>
              <div className="text-[11px] text-white/40">{localize(active.label, language)}</div>
            </div>
          </div>

          <button type="button" className="ghost-button gap-2">
            <span>{language === "ar" ? "مشروع جديد" : "New Project"}</span>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3 xl:max-w-[42rem]">
          <label className="relative flex-1">
            <Search
              size={16}
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-white/35 ${language === "ar" ? "right-4" : "left-4"}`}
            />
            <input
              className={`search-input w-full ${language === "ar" ? "pr-11 pl-4 text-right" : "pl-11 pr-4"}`}
              placeholder={language === "ar" ? "ابحث عن أدوات أو ملفات أو مشاريع..." : "Search tools, assets, and projects..."}
            />
          </label>

          <div className="hidden rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 xl:block">
            {projectName}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Search, label: language === "ar" ? "بحث سريع" : "Quick Search" },
            { icon: Bell, label: language === "ar" ? "الإشعارات" : "Notifications" },
            { icon: Cloud, label: language === "ar" ? "المزامنة" : "Sync" },
            { icon: Settings, label: language === "ar" ? "الإعدادات" : "Settings" }
          ].map((item) => (
            <button key={item.label} type="button" className="ghost-button !h-10 !w-10 !rounded-2xl !px-0" aria-label={item.label}>
              <item.icon size={16} />
            </button>
          ))}

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${language === "ar" ? "bg-neon-violet/20 text-white" : "text-white/45"}`}
              >
                AR
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${language === "en" ? "bg-neon-violet/20 text-white" : "text-white/45"}`}
              >
                EN
              </button>
            </div>
          </div>

          <button
            type="button"
            className="neon-button gap-2"
            onClick={() => pushToast(language === "ar" ? "جاهز للتصدير" : "Export Ready", language === "ar" ? "يمكنك بدء التصدير من الصفحة المخصصة." : "You can start the export from the export page.")}
          >
            <Upload size={16} />
            <span>{language === "ar" ? "تصدير" : "Export"}</span>
            <ChevronDown size={14} />
          </button>

          <div className="ml-2 hidden items-center gap-1 xl:flex">
            {[Minus, Square, X].map((Icon, index) => (
              <button key={index} type="button" className="flex h-8 w-8 items-center justify-center rounded-xl text-white/45 transition hover:bg-white/[0.04] hover:text-white/80">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
