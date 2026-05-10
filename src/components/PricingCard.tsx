import type { Language, Plan } from "../data/mock";

type PricingCardProps = {
  language: Language;
  plan: Plan;
  yearly: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function PricingCard({ language, plan, yearly, selected, onSelect }: PricingCardProps) {
  const price = yearly ? plan.yearly : plan.monthly;
  const popularLabel = language === "ar" ? "الأكثر اختيارًا" : "Most Popular";
  const cycleLabel = yearly ? (language === "ar" ? "سنوي" : "Yearly") : language === "ar" ? "شهري" : "Monthly";
  const perMonth = language === "ar" ? `يعادل ${(price / 12).toFixed(2)}$ شهريًا` : `${(price / 12).toFixed(2)}/month`;

  return (
    <div className={`glass-panel relative p-5 ${plan.highlight ? "shadow-cyan" : ""} ${selected ? "border-neon-violet/40" : ""}`}>
      {plan.highlight && (
        <div className="absolute right-4 top-4 rounded-full bg-neon-violet/15 px-3 py-1 text-xs font-semibold text-neon-cyan">
          {popularLabel}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-semibold text-white">{plan.name}</h4>
          <span className="text-sm text-white/45">{cycleLabel}</span>
        </div>
        <div className="text-4xl font-semibold text-white">${price.toFixed(2)}</div>
        <div className="text-sm text-white/45">{yearly ? perMonth : language === "ar" ? "لكل شهر" : "per month"}</div>
      </div>

      <div className="mt-5 space-y-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-white/75">
            <span className="mt-0.5 text-neon-cyan">+</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => onSelect(plan.id)} className={`mt-6 w-full ${plan.highlight ? "neon-button" : "ghost-button"}`}>
        {language === "ar" ? "اختر الخطة" : "Choose Plan"}
      </button>
    </div>
  );
}
