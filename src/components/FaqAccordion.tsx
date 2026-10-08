import { Faq } from "@/lib/faqs";
import { ChevronRight } from "./Icons";

// Native <details> accordion: no client JavaScript and the full answers stay in the HTML for search/AI crawlers.
export function FaqAccordion({
  items,
  openFirst = true,
}: {
  items: Faq[];
  openFirst?: boolean;
}) {
  return (
    <div className="divide-y divide-ink/8 rounded-3xl border border-ink/8 bg-white">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group"
          open={openFirst && index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-base font-bold text-ink sm:text-lg">
              {item.question}
            </h3>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-open:rotate-90 group-open:text-brand-dark"
              aria-hidden
            />
          </summary>
          <div className="px-6 pb-6 text-sm leading-relaxed text-zinc-600 sm:text-base">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
