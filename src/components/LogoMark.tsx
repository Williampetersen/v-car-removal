import { site } from "@/lib/site";

// Paints the original logo shape with a theme colour via CSS mask, so the
// brand artwork is unchanged but always matches the palette. Uses a tightly
// cropped copy (no empty margin) so the lettering fills the height.
export function LogoMark({
  className = "h-6 sm:h-7",
  colorClassName = "bg-ink",
}: {
  className?: string;
  colorClassName?: string;
}) {
  const mask = "url(/images/logo/logo-trim.png) center / contain no-repeat";

  return (
    <span
      role="img"
      aria-label={site.name}
      className={`block aspect-[854/146] ${className} ${colorClassName}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
