import { localize, type Language } from "../data/mock";

type BrandMarkProps = {
  language: Language;
  compact?: boolean;
};

export function BrandMark({ language, compact = false }: BrandMarkProps) {
  return (
    <div className={`flex items-center ${compact ? "gap-3" : "gap-5"}`}>
      <div
        className={`relative overflow-hidden border border-white/10 bg-[#05091a] shadow-[0_0_0_1px_rgba(35,101,255,0.18),0_28px_60px_rgba(62,27,139,0.4)] ${
          compact ? "h-11 w-11 rounded-2xl" : "h-24 w-24 rounded-[1.9rem]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(61,226,255,0.95),transparent_24%),radial-gradient(circle_at_82%_82%,rgba(166,73,255,0.96),transparent_34%),linear-gradient(135deg,#0d6cff_0%,#081121_54%,#050912_100%)]" />
        <div className={`absolute inset-[15%] bg-[#050912] ${compact ? "rounded-[1rem]" : "rounded-[1.35rem]"}`} />
        <div className="absolute inset-[22%] rounded-[1.25rem] border border-white/8 bg-gradient-to-br from-transparent via-transparent to-white/[0.03]" />
        <div className="absolute left-[35%] top-[31%] h-[40%] w-[34%] rounded-r-[1rem] rounded-tl-[1.8rem] rounded-bl-[1.6rem] bg-[#050912]" />
        <div className="absolute left-[42%] top-[39%] h-0 w-0 border-b-[9px] border-b-transparent border-l-[16px] border-l-neon-cyan border-t-[9px] border-t-transparent drop-shadow-[0_0_12px_rgba(31,214,255,0.65)]" />
      </div>

      <div className="flex flex-col">
        <div className={`${compact ? "text-lg" : "text-[3.1rem]"} font-semibold leading-none tracking-tight text-white`}>
          Orzain
        </div>
        <div className={`${compact ? "text-sm" : "text-[2.25rem]"} font-medium leading-none text-white/95`}>
          Video Pro <span className="bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">26</span>
        </div>
        {!compact && (
          <>
            <div className="mt-2 text-sm font-medium text-white/78">
              {localize({ ar: "صناعة سعودية، تنافس العالمية", en: "Saudi Innovation, Global Impact" }, language)}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.36em] text-white/45">
              SAUDI INNOVATION, GLOBAL IMPACT
            </div>
          </>
        )}
      </div>
    </div>
  );
}
