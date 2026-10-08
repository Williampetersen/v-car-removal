import { site } from "@/lib/site";
import { PhoneCall, Mail, MapPin, Clock } from "./Icons";

/** Name, address and phone, identical everywhere and matching the schema. */
export function NapBlock() {
  return (
    <address className="not-italic">
      <p className="font-display text-lg font-bold text-ink">{site.name}</p>
      <ul className="mt-4 space-y-3 text-base text-zinc-700">
        <li className="flex items-start gap-3">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-link" aria-hidden />
          <span>
            {site.address.street}, {site.address.suburb} {site.address.state}{" "}
            {site.address.postcode}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <PhoneCall className="h-4 w-4 shrink-0 text-link" aria-hidden />
          <a href={site.phoneHref} className="font-semibold hover:text-ink">
            {site.phoneDisplay}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="h-4 w-4 shrink-0 text-link" aria-hidden />
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-1 h-4 w-4 shrink-0 text-link" aria-hidden />
          <span>
            {site.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days}: {h.time}
              </span>
            ))}
          </span>
        </li>
      </ul>
    </address>
  );
}
