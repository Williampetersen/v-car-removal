import Image from "next/image";

/**
 * Hero backdrop: the static yard photo with a navy tint for legibility. On phones the hero is much taller
 * than a screen (text + form), so the photo covers the first screen only and fades into navy behind the
 * form instead of being blown up to the full section height.
 */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-900" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-svh md:inset-y-0 md:h-auto">
        <Image
          src="/images/hero/hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40 md:bg-gradient-to-r md:from-slate-950/60 md:via-slate-950/30 md:to-slate-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-slate-900 md:hidden" />
      </div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/50 to-transparent" />
    </div>
  );
}
