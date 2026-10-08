import Image from "next/image";

const phrases = [
  "Free towing",
  "Cash for cars",
  "Quote before pickup",
  "Any make, any condition",
  "Paid when we collect",
  "Brisbane to Toowoomba",
];

const brands = ["toyota", "ford", "holden", "nissan", "honda", "hyundai", "kia", "volkswagen", "tesla"];

/** Moving strips under the hero: a text ticker and an all-makes logo marquee. */
export function Ticker() {
  const row = [...phrases, ...phrases];
  const logos = [...brands, ...brands, ...brands];
  return (
    <div aria-hidden>
      <div className="marquee overflow-hidden bg-brand py-3 text-ink">
        <div className="marquee-track" style={{ ["--speed" as string]: "34s" }}>
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center">
              {row.map((p, i) => (
                <li
                  key={`${k}-${i}`}
                  className="heading-xl flex items-center gap-6 pr-6 text-xl sm:text-2xl"
                >
                  {p}
                  <span className="text-ink/60">★</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="marquee overflow-hidden border-b border-ink/10 bg-white py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track items-center" style={{ ["--speed" as string]: "46s" }}>
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center gap-14 pr-14">
              {logos.map((b, i) => (
                <li key={`${k}-${i}`} className="relative h-9 w-9 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <Image
                    src={`/images/brands/${b}.png`}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
