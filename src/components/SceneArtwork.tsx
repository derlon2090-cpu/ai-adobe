type SceneArtworkProps = {
  variant?: string;
  className?: string;
};

const variantMap: Record<string, string> = {
  city:
    "radial-gradient(circle at 50% 18%, rgba(152,92,255,0.35), transparent 25%), radial-gradient(circle at 80% 26%, rgba(31,214,255,0.18), transparent 18%), linear-gradient(180deg, #0a1020 0%, #0d1730 45%, #07111d 100%)",
  mountain:
    "radial-gradient(circle at 48% 12%, rgba(255,144,92,0.32), transparent 16%), linear-gradient(180deg, #19183f 0%, #20245e 30%, #0a1221 100%)",
  glitch:
    "radial-gradient(circle at 28% 20%, rgba(92,176,255,0.18), transparent 20%), linear-gradient(135deg, #060b18 0%, #291236 38%, #0e1633 100%)",
  brand:
    "radial-gradient(circle at 68% 18%, rgba(255,92,92,0.22), transparent 20%), linear-gradient(135deg, #0e1120 0%, #2d0f2f 45%, #111832 100%)",
  social:
    "radial-gradient(circle at 72% 16%, rgba(31,214,255,0.22), transparent 20%), linear-gradient(135deg, #11152a 0%, #261440 45%, #0f1735 100%)",
  ring:
    "radial-gradient(circle at center, rgba(31,214,255,0.16), transparent 22%), linear-gradient(180deg, #0b0f1f 0%, #101528 100%)",
  title:
    "radial-gradient(circle at 32% 16%, rgba(124,58,237,0.18), transparent 22%), linear-gradient(180deg, #0b0f1f 0%, #181733 100%)",
  portrait:
    "radial-gradient(circle at 48% 18%, rgba(124,58,237,0.22), transparent 16%), linear-gradient(180deg, #0e1120 0%, #171e36 100%)",
  audio:
    "radial-gradient(circle at 50% 50%, rgba(31,214,255,0.12), transparent 28%), linear-gradient(180deg, #09101f 0%, #10162b 100%)",
  control:
    "linear-gradient(180deg, #0b1020 0%, #0f1730 100%)",
  grid:
    "linear-gradient(180deg, #08101e 0%, #11162b 100%)"
};

function skylineColor(variant?: string) {
  if (variant === "mountain") return "bg-gradient-to-t from-[#241438] via-[#3d4a7a] to-[#f38b59]";
  if (variant === "brand") return "bg-gradient-to-t from-[#271441] via-[#5b1b5b] to-[#f04e5e]";
  return "bg-gradient-to-t from-[#25133e] via-[#354eff] to-[#1fd6ff]";
}

export function SceneArtwork({ variant = "city", className = "" }: SceneArtworkProps) {
  const background = variantMap[variant] ?? variantMap.city;

  return (
    <div className={`scene-card tiny-grid ${className}`} style={{ backgroundImage: background }}>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {variant === "mountain" ? (
        <>
          <div className="absolute bottom-0 left-[8%] h-[62%] w-[35%] skew-x-[-20deg] rounded-t-[6rem] bg-gradient-to-t from-slate-950 via-slate-700 to-[#f59d6d]/90" />
          <div className="absolute bottom-0 left-[36%] h-[78%] w-[31%] skew-x-[-8deg] rounded-t-[8rem] bg-gradient-to-t from-slate-950 via-slate-600 to-[#ffb47c]" />
          <div className="absolute bottom-0 right-[10%] h-[54%] w-[32%] skew-x-[16deg] rounded-t-[5rem] bg-gradient-to-t from-slate-950 via-slate-700 to-[#7fa2ff]" />
          <div className="absolute bottom-7 left-[18%] h-24 w-24 rounded-full border border-white/12 bg-white/[0.03] blur-xl" />
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 bottom-0 flex h-[74%] items-end justify-center gap-[2.5%] px-[6%]">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`relative rounded-t-2xl border border-white/8 ${skylineColor(variant)}`}
                style={{
                  width: `${7 + (index % 3) * 1.8}%`,
                  height: `${36 + (index % 5) * 10}%`
                }}
              >
                <div className="absolute inset-x-[18%] top-[10%] bottom-[10%] rounded-full bg-white/10 blur-sm" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-gradient-to-t from-[#06101e] via-[#0b1730] to-transparent" />
          <div className="absolute bottom-[6%] left-[44%] h-[30%] w-[12%] rounded-full bg-black/90 blur-md" />
          <div className="absolute bottom-[13%] left-[46%] h-[16%] w-[8%] rounded-full border border-white/8 bg-gradient-to-b from-white/30 to-transparent" />
        </>
      )}
      <div className="scene-overlay" />
    </div>
  );
}
