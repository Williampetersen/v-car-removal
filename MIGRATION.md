# WordPress to Next.js migration notes (V Car Removal Brisbane)

Source of truth for old content: `content/wp/` (raw REST JSON, rendered HTML, text) and `content/PHASE1-REPORT.md`.
Raw media (92 MB) is in `content/media/` locally and is intentionally not committed.

## 301 redirects (next.config.ts)
| Old URL | New URL |
|---|---|
| `/contact-us-jet-car-removal-brisbane/` | `/contact` |
| `/contact-us/` | `/contact` |
| `/qld-2/` | `/` |
| `/test/` | `/` |
| `/project/`, `/project/*`, `/category/*`, `/author/*`, `/feed/` | `/` |
| `/sitemap_index.xml`, `/page-sitemap.xml`, `/wp-sitemap.xml` | `/sitemap.xml` |
| `/locations/<city>` (development URL only) | `/cash-for-cars-<city>` |

Unchanged URLs (same slug as WordPress): `/`, `/cash-for-cars-{brisbane,ipswich,caboolture,gold-coast,logan,moreton-bay,redlands,sunshine-coast,toowoomba}`, `/locations`, `/get-a-quote`, `/thanks`.
New URLs: ten extended-region pages `/cash-for-cars-{scenic-rim,lockyer-valley,somerset,noosa,gympie,southern-downs,south-burnett,western-downs,fraser-coast,bundaberg}` (served by arrangement; confirm you can actually service them), `/llms-full.txt`, 20 further by-arrangement pages (northern NSW: tweed, byron, ballina, lismore, richmond-valley, kyogle, clarence-valley, tenterfield, glen-innes-severn, inverell, coffs-harbour, armidale; central/western QLD: north-burnett, goondiwindi, maranoa, balonne, gladstone, banana, rockhampton, livingstone), `/about`, `/faq`, `/contact`, `/services/*`, `/privacy-policy`, `/terms`, `/llms.txt`.
Trailing slashes (`/cash-for-cars-ipswich/`) redirect to the slash-less canonical URL.

## Not migrated / needs your input
- Contact Form 7 mail recipient: not readable through the REST API; quotes go to `CONTACT_TO_EMAIL` (info@vcarremoval.com.au).
- `RESEND_API_KEY` is not set: the quote form shows a "call us" message until it is added in Vercel.
- Google Ads conversion label (`NEXT_PUBLIC_GADS_CONVERSION_LABEL`).
- ABN and a verified Google review count/rating (not on the old site; nothing is invented).
- The old "4.8 Google reviews" badge image was dropped (unverifiable, no review count).
- Jet Car Removal leftovers (map embed, Facebook link, jetcarremoval email) were not carried over.
- Menus (REST needs auth that the host blocks); rebuilt from the old header.
- Decorative GIFs (`growth`, `crane`, `contact`, `truck-crane`) and unused media were not carried over.

## Pointing vcarremoval.com.au at Vercel (do this when ready)
1. Merge `wp-migration` into `master` (Vercel then builds Production).
2. In Vercel: project `v-car-removal` > Settings > Domains > add `vcarremoval.com.au` and `www.vcarremoval.com.au` (www redirects to the apex or vice versa).
3. At your DNS provider: set `A` record `@` to `76.76.21.21` and `CNAME` `www` to `cname.vercel-dns.com` (use the exact values Vercel shows). Lower the TTL a day earlier.
4. Keep the old WordPress hosting alive for 1-2 days, then verify with the redirect list above.
5. In Vercel add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (and verify the domain in Resend), plus `NEXT_PUBLIC_GADS_CONVERSION_LABEL`; redeploy.
6. In Google Search Console: submit `https://vcarremoval.com.au/sitemap.xml`, and use "Change of address" is not needed (same domain).
7. Email: if email for vcarremoval.com.au is hosted with the WordPress host, keep the MX records unchanged.
