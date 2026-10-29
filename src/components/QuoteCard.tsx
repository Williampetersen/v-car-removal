import { ContactForm } from "./ContactForm";

/**
 * The one-step "Get Cash Offer Now" white card. In the hero it floats over the video; everywhere
 * else pass `backdrop` to sit it on the same blue photo so it looks the same.
 */
export function QuoteCard({
  backdrop = false,
  className = "",
}: {
  backdrop?: boolean;
  className?: string;
}) {
  const card = (
    <div
      className={`rounded-3xl bg-white p-5 shadow-2xl shadow-slate-950/30 sm:p-6 ${className}`}
    >
      <h2 className="heading-xl mb-4 text-center text-2xl font-extrabold text-slate-900">Get Cash Offer Now</h2>
      <ContactForm />
    </div>
  );

  if (!backdrop) return card;

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] p-3 sm:p-6">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/video/hero-mobile-poster.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-600/60 to-slate-900/70" aria-hidden />
      {card}
    </div>
  );
}
