import { site } from "@/lib/site";

// Paints the original logo shape with a theme colour via CSS mask, so the
// brand artwork is unchanged but always matches the palette.
export function LogoMark({
  className = "h-6 sm:h-8",
  colorClassName = "bg-ink",
}: {
  className?: string;
  colorClassName?: string;
}) {
  const mask = "url(/images/logo/logo.png) center / contain no-repeat";

  return (
    <span
      role="img"
      aria-label={site.name}
      className={`block aspect-[796/313] ${className} ${colorClassName}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
