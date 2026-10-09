export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
            dark ? "text-brand" : "text-brand-dark"
          }`}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-balance mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            dark ? "text-zinc-300" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
