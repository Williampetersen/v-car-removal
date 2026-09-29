import { Container } from "../Container";
import { Star, ArrowRight } from "../Icons";
import { site } from "@/lib/site";

export function GoogleReviews() {
  const hasRating = site.googleRating !== null;

  return (
    <section className="bg-zinc-50 pb-12">
      <Container className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/10 via-white to-white px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex gap-0.5 text-brand" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <div>
            <p className="font-display text-base font-bold text-ink sm:text-lg">
              {hasRating
                ? site.googleReviewCount
                  ? `${site.googleRating} / 5 from ${site.googleReviewCount}+ Google reviews`
                  : `${site.googleRating} / 5 on Google reviews`
                : "Rated by real customers on Google"}
            </p>
            <p className="text-xs text-zinc-500">
              See what locals say about our service.
            </p>
          </div>
        </div>
        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-brand/30 px-4 py-2 text-sm font-bold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-ink"
        >
          Read our Google reviews
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </a>
      </Container>
    </section>
  );
}
