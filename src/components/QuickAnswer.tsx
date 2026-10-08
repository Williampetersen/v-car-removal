import { ReactNode } from "react";

/** Short, factual opening answer: the first thing search and AI engines read on a page. */
export function QuickAnswer({
  title = "In short",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={title}
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-cream p-6 pl-8 sm:p-8 sm:pl-10"
    >
      <span className="absolute inset-y-0 left-0 w-2 bg-brand" aria-hidden />
      <p className="font-display text-sm uppercase tracking-[0.18em] text-link">
        {title}
      </p>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink">
        {children}
      </div>
    </aside>
  );
}
