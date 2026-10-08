import { Faq } from "@/lib/faqs";

// Native <details> accordion: no client JavaScript and the full answers stay in the HTML for search/AI crawlers.
export function FaqAccordion({
  items,
  openFirst = true,
  headingLevel = 3,
}: {
  items: Faq[];
  openFirst?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group rounded-xl border border-ink/10 bg-white open:border-ink open:shadow-[0_5px_0_0_var(--brand)]"
          open={openFirst && index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
            <Heading className="font-display text-xl leading-tight text-ink sm:text-2xl">
              {item.question}
            </Heading>
            <span
              aria-hidden
              className="relative h-8 w-8 shrink-0 rounded-full bg-ink text-brand transition-colors group-open:bg-brand group-open:text-ink"
            >
              <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-opacity group-open:opacity-0" />
            </span>
          </summary>
          <div className="px-5 pb-5 text-base leading-relaxed text-zinc-600 sm:px-6 sm:pb-6">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
