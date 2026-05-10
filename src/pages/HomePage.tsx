import { ArrowRight, Bot, Clapperboard, Palette, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PreviewPlayer } from "../components/PreviewPlayer";
import { useAppStore } from "../store/useAppStore";
import { collaborateProjects, mediaClips } from "../data/mock";

export function HomePage() {
  const language = useAppStore((state) => state.language);
  const pushToast = useAppStore((state) => state.pushToast);

  const stats = [
    { icon: Clapperboard, value: "128", labelAr: "مشروعًا نشطًا", labelEn: "Active Projects" },
    { icon: Bot, value: "07", labelAr: "وحدات AI", labelEn: "AI Modules" },
    { icon: Palette, value: "42", labelAr: "حزمة ألوان", labelEn: "Color Looks" },
    { icon: Sparkles, value: "8600+", labelAr: "عنصر جاهز", labelEn: "Creative Assets" }
  ];

  return (
    <div>
      <PageHeading
        eyebrow="Orzain Workspace"
        title={language === "ar" ? "واجهة إنتاج كاملة بأسلوب Cyberpunk احترافي" : "A complete cyberpunk production workspace"}
        description={
          language === "ar"
            ? "Orzain Video Pro 26 يقدم لك استوديو موك تفاعلي غني بالتفاصيل، جاهز للتطوير إلى منصة تحرير متقدمة متعددة الأدوات."
            : "Orzain Video Pro 26 delivers a high-detail interactive mock studio, ready to evolve into a full production platform."
        }
        action={
          <Link to="/media" className="neon-button gap-2">
            <span>{language === "ar" ? "افتح المحرر" : "Open Editor"}</span>
            <ArrowRight size={16} />
          </Link>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.2fr,0.8fr]">
        <PreviewPlayer
          className="min-h-[540px]"
          variant="city"
          title={language === "ar" ? "المعاينة الرئيسية" : "Main Preview"}
          timecode="00:00:07:15"
          duration="00:00:45:18"
        />

        <div className="grid gap-5">
          <NeonCard
            title={language === "ar" ? "تشغيل سريع" : "Quick Launch"}
            subtitle={language === "ar" ? "ابدأ من أكثر المساحات استخدامًا." : "Start from the most used workspaces."}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { labelAr: "الميديا", labelEn: "Media", route: "/media" },
                { labelAr: "الصوت", labelEn: "Audio", route: "/audio" },
                { labelAr: "الألوان", labelEn: "Color", route: "/color" },
                { labelAr: "أدوات AI", labelEn: "AI Tools", route: "/ai-tools" }
              ].map((item) => (
                <Link key={item.route} to={item.route} className="glass-panel-soft p-4 transition hover:border-neon-violet/25 hover:bg-white/[0.05]">
                  <div className="text-sm font-semibold text-white">{language === "ar" ? item.labelAr : item.labelEn}</div>
                  <div className="mt-1 text-xs text-white/45">{language === "ar" ? "افتح اللوحة مباشرة" : "Open workspace directly"}</div>
                </Link>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "حالة المنصة" : "Platform Status"}>
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.value} className="glass-panel-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{stat.value}</span>
                    <stat.icon size={16} className="text-neon-cyan" />
                  </div>
                  <div className="mt-2 text-xs text-white/45">{language === "ar" ? stat.labelAr : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr,1.05fr]">
        <NeonCard title={language === "ar" ? "أحدث المشاريع" : "Recent Projects"}>
          <div className="grid gap-3">
            {collaborateProjects.slice(0, 4).map((project) => (
              <motion.div key={project.id} whileHover={{ y: -2 }} className="glass-panel-soft flex items-center gap-4 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-violet/25 to-neon-cyan/15 text-neon-cyan">
                  <Zap size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{project.name}</div>
                  <div className="mt-1 text-xs text-white/45">{project.updated}</div>
                </div>
                <div className="value-badge">{project.progress}%</div>
              </motion.div>
            ))}
          </div>
        </NeonCard>

        <NeonCard title={language === "ar" ? "مكتبة المشاهد" : "Scene Library"}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {mediaClips.map((clip) => (
              <button
                key={clip.id}
                type="button"
                className="glass-panel-soft p-4 text-left transition hover:border-neon-violet/20 hover:bg-white/[0.05]"
                onClick={() =>
                  pushToast(
                    language === "ar" ? "تم تجهيز اللقطة" : "Clip Prepared",
                    language === "ar" ? `${clip.name} جاهزة للمعاينة أو الإضافة للتايملاين.` : `${clip.name} is ready for preview or timeline insertion.`
                  )
                }
              >
                <div className="text-sm font-semibold text-white">{clip.name}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {clip.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/8 px-2 py-1 text-[10px] text-white/55">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/45">{clip.duration}</div>
              </button>
            ))}
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
