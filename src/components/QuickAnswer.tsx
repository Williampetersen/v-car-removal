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
      className="rounded-3xl border border-brand/40 bg-brand/10 p-6 sm:p-8"
    >
      <p className="font-display text-sm font-bold uppercase tracking-wider text-ink-soft">
        {title}
      </p>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink">
        {children}
      </div>
    </aside>
  );
}
