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
      className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`font-display inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] ${
            dark ? "text-brand" : "text-link"
          }`}
        >
          <span aria-hidden className="h-0.5 w-8 bg-brand" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`heading-xl mt-3 text-4xl sm:text-5xl lg:text-6xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            dark ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
