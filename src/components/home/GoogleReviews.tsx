import { Container } from "../Container";
import { ArrowRight } from "../Icons";
import { RatingStars } from "../RatingStars";
import { FadeIn } from "../motion/FadeIn";
import { site } from "@/lib/site";

function GoogleG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function GoogleReviews() {
  const rating = site.googleRating;

  return (
    <section className="bg-cream pb-10 sm:pb-12">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center gap-5 rounded-xl bg-white p-5 text-center shadow-lg shadow-ink/10 ring-1 ring-ink/5 sm:flex-row sm:justify-between sm:p-6 sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-ink/10">
                <GoogleG className="h-8 w-8" />
              </span>
              <div className="flex flex-col items-center gap-1.5 sm:items-start">
                <div className="flex items-center gap-3">
                  {rating !== null && (
                    <span className="font-display text-4xl font-extrabold leading-none text-ink">
                      {rating.toFixed(1)}
                    </span>
                  )}
                  {rating !== null && <RatingStars rating={rating} className="h-6 w-6" />}
                </div>
                <p className="text-sm font-semibold text-ink/70">
                  {rating !== null
                    ? `Rated ${rating.toFixed(1)} out of 5 by customers on Google`
                    : "Rated by real customers on Google"}
                </p>
              </div>
            </div>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-ink-soft"
            >
              <GoogleG className="h-5 w-5" />
              Read our Google reviews
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
