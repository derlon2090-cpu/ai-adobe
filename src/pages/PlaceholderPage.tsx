import { BellRing, Bot, CircleHelp, FolderOpen, Layers3, Settings2, Sparkles, Type } from "lucide-react";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { SceneArtwork } from "../components/SceneArtwork";
import { useAppStore } from "../store/useAppStore";

type PlaceholderMode = "text" | "transitions" | "overlays" | "account" | "settings" | "help";

const modeMap: Record<
  PlaceholderMode,
  {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: typeof Type;
    scene: string;
  }
> = {
  text: {
    titleAr: "استوديو النصوص",
    titleEn: "Text Studio",
    descAr: "إدارة العناوين، الترجمة، الخطوط، والأنماط الحركية داخل مساحة موحدة.",
    descEn: "Manage titles, captions, fonts, and kinetic text styles in one workspace.",
    icon: Type,
    scene: "title"
  },
  transitions: {
    titleAr: "مركز الانتقالات",
    titleEn: "Transitions Center",
    descAr: "أضف انتقالات سينمائية، إيقاعية، وسريعة مع تحكم كامل في التوقيت.",
    descEn: "Apply cinematic, rhythmic, and fast-paced transitions with timing control.",
    icon: Sparkles,
    scene: "glitch"
  },
  overlays: {
    titleAr: "طبقات وإضافات",
    titleEn: "Overlays Library",
    descAr: "استعرض الطبقات، المؤثرات الضوئية، والإضافات الجاهزة للمشاهد.",
    descEn: "Browse overlays, light leaks, and scene-ready visual layers.",
    icon: Layers3,
    scene: "social"
  },
  account: {
    titleAr: "الحساب",
    titleEn: "Account",
    descAr: "عرض بيانات المستخدم، الباقة الحالية، وسجل العمل والتخزين السحابي.",
    descEn: "View profile data, current plan, project history, and cloud storage.",
    icon: FolderOpen,
    scene: "portrait"
  },
  settings: {
    titleAr: "الإعدادات",
    titleEn: "Settings",
    descAr: "خصص الأداء، الواجهة، الحفظ التلقائي، والاختصارات الخاصة بك.",
    descEn: "Tune performance, interface, auto-save, and your keyboard shortcuts.",
    icon: Settings2,
    scene: "control"
  },
  help: {
    titleAr: "الدعم والمساعدة",
    titleEn: "Help & Support",
    descAr: "احصل على التذاكر، مركز المساعدة، ودليل الاستخدام السريع.",
    descEn: "Access support tickets, help center, and the fast-start guide.",
    icon: CircleHelp,
    scene: "grid"
  }
};

export function PlaceholderPage({ mode }: { mode: PlaceholderMode }) {
  const language = useAppStore((state) => state.language);
  const pushToast = useAppStore((state) => state.pushToast);
  const config = modeMap[mode];
  const Icon = config.icon;

  return (
    <div>
      <PageHeading
        eyebrow="Workspace"
        title={language === "ar" ? config.titleAr : config.titleEn}
        description={language === "ar" ? config.descAr : config.descEn}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr,0.9fr]">
        <NeonCard
          title={language === "ar" ? "واجهة قيد التوسعة" : "Expanding Workspace"}
          subtitle={
            language === "ar"
              ? "هذه الصفحة مهيأة بنفس هوية Orzain الجديدة وجاهزة لإضافة أدوات متقدمة لاحقًا."
              : "This page already follows the new Orzain visual system and is ready for deeper tools."
          }
          action={
            <button
              type="button"
              className="neon-button"
              onClick={() =>
                pushToast(
                  language === "ar" ? "تم تجهيز المساحة" : "Workspace Prepared",
                  language === "ar" ? "يمكن توسيع هذه الصفحة بأدوات إضافية لاحقًا." : "This workspace is ready for deeper tools later."
                )
              }
            >
              {language === "ar" ? "تجهيز" : "Prepare"}
            </button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="scene-card h-[340px]">
              <SceneArtwork variant={config.scene} className="h-full w-full rounded-none" />
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: Icon,
                  title: language === "ar" ? "لوحة مخصصة" : "Dedicated Panel",
                  text: language === "ar" ? "تصميم غني ومهيأ لنفس أسلوب التطبيق." : "Rich panel layout aligned with the rest of the app."
                },
                {
                  icon: Bot,
                  title: language === "ar" ? "جاهزة للذكاء الاصطناعي" : "AI Ready",
                  text: language === "ar" ? "يمكن توسيعها لاحقًا بمحركات ذكاء اصطناعي أو بيانات حقيقية." : "Ready to be upgraded with real AI modules later."
                },
                {
                  icon: BellRing,
                  title: language === "ar" ? "تنبيهات وتفاعلات" : "Interactive Controls",
                  text: language === "ar" ? "الأزرار الحالية تجهز الهيكل السلوكي للتوسعة القادمة." : "Current actions already provide interaction patterns for future expansion."
                }
              ].map((item) => (
                <div key={item.title} className="glass-panel-soft flex gap-3 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-neon-cyan">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-xs text-white/45">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard title={language === "ar" ? "عناصر جاهزة" : "Ready Modules"}>
            <div className="space-y-3">
              {(language === "ar"
                ? ["بطاقات معلومات", "لوحات جانبية", "أزرار زجاجية", "مخططات وبيانات", "واجهة ثنائية اللغة"]
                : ["Info cards", "Side inspectors", "Glass buttons", "Charts and data", "Bilingual interface"]
              ).map((item) => (
                <div key={item} className="glass-panel-soft px-4 py-3 text-sm text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "حالة الصفحة" : "Page Status"}>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                language === "ar" ? "بنية التصميم مكتملة" : "Layout complete",
                language === "ar" ? "التنقل مرتبط" : "Navigation linked",
                language === "ar" ? "جاهزة للربط بالبيانات" : "Ready for data binding",
                language === "ar" ? "قابلة للتطوير" : "Expandable"
              ].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/75">
                  <div className="mb-2 text-xs text-neon-cyan">0{index + 1}</div>
                  {item}
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
