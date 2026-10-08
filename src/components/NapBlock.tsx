import { site } from "@/lib/site";
import { PhoneCall, Mail, MapPin, Clock } from "./Icons";

/** Name, address and phone, identical everywhere and matching the schema. */
export function NapBlock() {
  return (
    <address className="not-italic">
      <p className="heading-xl text-3xl text-ink">{site.name}</p>
      <ul className="mt-5 space-y-4 text-base text-zinc-700">
        <li className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-link" aria-hidden />
          <span>
            {site.address.street}, {site.address.suburb} {site.address.state}{" "}
            {site.address.postcode}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <PhoneCall className="h-5 w-5 shrink-0 text-link" aria-hidden />
          <a href={site.phoneHref} className="font-bold text-ink hover:text-link">
            {site.phoneDisplay}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="h-5 w-5 shrink-0 text-link" aria-hidden />
          <a href={`mailto:${site.email}`} className="hover:text-link">
            {site.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-1 h-5 w-5 shrink-0 text-link" aria-hidden />
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
