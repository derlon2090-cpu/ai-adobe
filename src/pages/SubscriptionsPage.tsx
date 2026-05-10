import { ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { NeonCard } from "../components/NeonCard";
import { PageHeading } from "../components/PageHeading";
import { PricingCard } from "../components/PricingCard";
import { SceneArtwork } from "../components/SceneArtwork";
import { paymentMethods, plans } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const aiFeatureCards = [
  { title: "تحسين الفيديو بالذكاء الاصطناعي", subtitle: "رفع الجودة وإزالة التشويش تلقائيًا", scene: "city" },
  { title: "قص المشاهد الذكي", subtitle: "اكتشاف أفضل اللقطات وتسريع الإخراج", scene: "grid" },
  { title: "تثبيت الفيديو الذكي", subtitle: "تقليل الاهتزازات وتثبيت الحركة", scene: "portrait" },
  { title: "إزالة الخلفية الذكية", subtitle: "عزل الأشخاص والعناصر بدقة ناعمة", scene: "control" },
  { title: "توليد الترجمة بالذكاء الاصطناعي", subtitle: "ترجمة تلقائية وتنسيق جذاب", scene: "audio" },
  { title: "تحويل النص إلى صوت", subtitle: "أصوات متعددة وواضحة للمحتوى", scene: "audio" },
  { title: "تحديد أفضل اللقطات", subtitle: "أفضل لحظات الفيديو في مسار واحد", scene: "mountain" },
  { title: "مطابقة الألوان الذكية", subtitle: "مطابقة جمالية المشهد بمرجع خارجي", scene: "mountain" }
];

export function SubscriptionsPage() {
  const language = useAppStore((state) => state.language);
  const selectedPlanId = useAppStore((state) => state.selectedPlanId);
  const selectPlan = useAppStore((state) => state.selectPlan);
  const yearlyBilling = useAppStore((state) => state.yearlyBilling);
  const toggleBilling = useAppStore((state) => state.toggleBilling);
  const pushToast = useAppStore((state) => state.pushToast);

  return (
    <div>
      <PageHeading
        eyebrow="Subscriptions"
        title={language === "ar" ? "اختر الخطة المناسبة لك" : "Choose the plan that fits your workflow"}
        description={
          language === "ar"
            ? "باقات مرنة لمستخدمي Orzain Video Pro 26 مع مقارنة واضحة للمزايا، طرق دفع متعددة، ولوحة عربية خاصة بمزايا الذكاء الاصطناعي."
            : "Flexible plans for Orzain Video Pro 26 with clear comparison, multiple payment methods, and an AI-focused feature panel."
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="grid gap-5">
          <NeonCard
            title={language === "ar" ? "الاشتراكات" : "Subscriptions"}
            subtitle={language === "ar" ? "اختر الخطة وفعّل جميع الميزات الاحترافية" : "Pick a plan and unlock the full professional toolkit"}
            action={
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-1">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={!yearlyBilling ? undefined : toggleBilling} className={`rounded-xl px-4 py-2 text-sm ${!yearlyBilling ? "bg-neon-violet/18 text-white" : "text-white/45"}`}>
                    {language === "ar" ? "شهري" : "Monthly"}
                  </button>
                  <button type="button" onClick={yearlyBilling ? undefined : toggleBilling} className={`rounded-xl px-4 py-2 text-sm ${yearlyBilling ? "bg-neon-violet/18 text-white" : "text-white/45"}`}>
                    {language === "ar" ? "سنوي -20%" : "Yearly -20%"}
                  </button>
                </div>
              </div>
            }
          >
            <div className="grid gap-4 xl:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  language={language}
                  plan={plan}
                  yearly={yearlyBilling}
                  selected={plan.id === selectedPlanId}
                  onSelect={(id) => {
                    selectPlan(id);
                    pushToast(language === "ar" ? "تم اختيار الخطة" : "Plan Selected", language === "ar" ? `تم تحديد ${id.toUpperCase()}.` : `${id.toUpperCase()} has been selected.`);
                  }}
                />
              ))}
            </div>
          </NeonCard>

          <div className="grid gap-5 xl:grid-cols-[1fr,0.72fr]">
            <NeonCard title={language === "ar" ? "مقارنة المميزات" : "Feature Comparison"}>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/8">
                <div className="grid grid-cols-[1.2fr,0.8fr,0.8fr,0.8fr] bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/35">
                  <div>{language === "ar" ? "الميزة" : "Feature"}</div>
                  <div>Basic</div>
                  <div>Pro</div>
                  <div>Studio</div>
                </div>
                {[
                  ["Export Quality", "1080p", "4K", "8K"],
                  ["AI Tools", "Limited", "Full", "Full + Studio"],
                  ["Elements Library", "Basic", "Premium", "Studio"],
                  ["Cloud Storage", "5GB", "100GB", "1TB"],
                  ["Technical Support", "Email", "Priority", "24/7"],
                  ["Collaboration", "-", "Yes", "Advanced"]
                ].map((row) => (
                  <div key={row[0]} className="grid grid-cols-[1.2fr,0.8fr,0.8fr,0.8fr] border-t border-white/[0.06] px-4 py-3 text-sm text-white/72">
                    {row.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </NeonCard>

            <NeonCard title={language === "ar" ? "طرق الدفع" : "Payment Methods"}>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div key={method} className="glass-panel-soft flex h-16 items-center justify-center text-sm font-semibold text-white/82">
                    {method}
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3 text-sm text-white/65">
                {[
                  language === "ar" ? "تشفير آمن SSL 256-bit" : "256-bit SSL security",
                  language === "ar" ? "إلغاء في أي وقت" : "Cancel any time",
                  language === "ar" ? "ضمان استرجاع خلال 14 يوم" : "14-day refund window"
                ].map((item) => (
                  <div key={item} className="glass-panel-soft flex items-center gap-3 px-4 py-3">
                    <ShieldCheck size={16} className="text-neon-cyan" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </NeonCard>
          </div>
        </div>

        <div className="grid gap-5">
          <NeonCard
            title={language === "ar" ? "ميزات الذكاء الاصطناعي" : "AI Features"}
            subtitle={language === "ar" ? "استفد من أقوى تقنيات Orzain Video Pro 26" : "Explore the premium AI layer of Orzain Video Pro 26"}
          >
            <div className="mb-4 grid grid-cols-4 gap-2">
              {["الكل", "الفيديو", "الصوت", "الصورة"].map((tab, index) => (
                <button key={tab} type="button" className={`rounded-2xl px-4 py-2 text-sm ${index === 0 ? "bg-neon-violet/18 text-white" : "bg-white/[0.03] text-white/55"}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {aiFeatureCards.map((item) => (
                <motion.div key={item.title} whileHover={{ y: -3 }} className="glass-panel-soft overflow-hidden">
                  <div className="scene-card h-24 rounded-none">
                    <SceneArtwork variant={item.scene} className="h-full w-full rounded-none" />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <span className="rounded-full border border-neon-violet/20 px-2 py-1 text-[10px] text-neon-cyan">Pro</span>
                    </div>
                    <div className="text-xs leading-6 text-white/45">{item.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </NeonCard>

          <NeonCard title={language === "ar" ? "ارتقِ باحترافيتك" : "Upgrade Your Workflow"}>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, textAr: "تحديثات مستمرة", textEn: "Continuous updates" },
                { icon: WandSparkles, textAr: "أدوات AI متقدمة", textEn: "Advanced AI tools" },
                { icon: ShieldCheck, textAr: "أمان وخصوصية", textEn: "Privacy and protection" }
              ].map((item) => (
                <div key={item.textEn} className="glass-panel-soft p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-neon-cyan">
                    <item.icon size={18} />
                  </div>
                  <div className="text-sm text-white/75">{language === "ar" ? item.textAr : item.textEn}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="neon-button mt-5 w-full"
              onClick={() =>
                pushToast(language === "ar" ? "تم تفعيل الدعوة" : "Upgrade Prompt Ready", language === "ar" ? "واجهة الدفع جاهزة للربط لاحقًا." : "Payment flow is ready to be connected later.")
              }
            >
              {language === "ar" ? "ابدأ الآن" : "Start Now"}
            </button>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
