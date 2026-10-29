import { HeroVideo } from "./HeroVideo";

/** Hero backdrop: the looping video, a navy tint for legibility and a soft fade into the next section. */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-900" aria-hidden>
      <HeroVideo />
      <div className="absolute inset-0 bg-slate-950/40 md:bg-gradient-to-r md:from-slate-950/60 md:via-slate-950/30 md:to-slate-950/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/50 to-transparent" />
    </div>
  );
}
