# Phase 1 report: vcarremoval.com.au extraction

Extracted 2026-10-08 with `scripts/wp-extract.mjs` (GET requests only; WordPress was not modified).

## What was extracted
| Item | Count | Where |
|---|---|---|
| Pages (all published) | 16 | `content/wp/pages.json`, `content/wp/html/*.html`, `content/wp/text/*.txt` |
| Posts / blog | 0 | |
| `project` CPT items | 0 (archive `/project/` exists, empty) | |
| Categories / tags | 1 ("Uncategorized", 0 posts) / 0 | |
| Media | 152 files, 92 MB, all downloaded | `content/media/`, `content/media-manifest.json` |
| Yoast data | every page (`yoast_head_json`) | inside `pages.json` |
| URLs (sitemap + REST) | 16 | `content/wp/urls.json` |

Not obtained: **menus and Contact Form 7 settings** (REST returns 401/403). Basic Auth with the application
password is rejected (`rest_not_logged_in`): the server is not passing the `Authorization` header to WordPress
(typical nginx/FastCGI setup). Menus were reconstructed from the rendered header; CF7 form fields were read
from the rendered HTML. The CF7 **mail recipient/subject/template** could not be read.

## Business details (from the live site)
- Name on site: **V Car Removal Brisbane** (footer, titles). Existing Next.js repo uses "V Car Removal".
- Phone: 0422 360 534 (tel:0422360534). Email: info@vcarremoval.com.au
- Address: 451 Sherwood Rd, Sherwood QLD 4075
- Hours: Mon-Fri 6:30-17:00, Sat 7:00-14:00, Sun closed
- Service areas: Brisbane, Ipswich, Caboolture, Gold Coast, Logan, Moreton Bay, Redlands, Sunshine Coast, Toowoomba
- Social: only a Facebook link, and it points to **Jetcarremoval** (see issues)
- ABN: not shown anywhere. Reviews: only a "google-reviews.webp" badge image, no review text or count.
- Tracking on old site: Google Ads `AW-17981015409`, gtag `GT-55B74RZ3`, GTM `GTM-KP3CWMSK`, Google site verification token, reCAPTCHA v3.
- Credit in footer: "Designed by: Nordic Wide".

## Full URL map (16 URLs, all indexable, all in `page-sitemap.xml`)
| Old URL | Page | Words | Yoast title | Meta description |
|---|---|---|---|---|
| `/` | Home | ~1,000 | Home - V Car Removal Brisbane | none |
| `/cash-for-cars-brisbane/` | Brisbane | ~625 | Cash For Cars Brisbane - ... | "Cash For Cars Brisbane" (placeholder) |
| `/cash-for-cars-ipswich/` | Ipswich | ~1,050 | same pattern | placeholder |
| `/cash-for-cars-caboolture/` | Caboolture | ~1,035 | same pattern | placeholder |
| `/cash-for-cars-gold-coast/` | Gold Coast | ~1,115 | same pattern | placeholder |
| `/cash-for-cars-logan/` | Logan | ~1,035 | same pattern | placeholder |
| `/cash-for-cars-moreton-bay/` | Moreton Bay | ~1,050 | same pattern | placeholder |
| `/cash-for-cars-redlands/` | Redlands | ~1,010 | same pattern | placeholder |
| `/cash-for-cars-sunshine-coast/` | Sunshine Coast | ~1,085 | same pattern | placeholder |
| `/cash-for-cars-toowoomba/` | Toowoomba | ~1,045 | same pattern | none |
| `/locations/` | Locations hub | ~530 | Locations - ... | none |
| `/get-a-quote/` | Quote form | ~950 | Get a quote - ... | none |
| `/contact-us-jet-car-removal-brisbane/` | Contact | ~330 | Contact Us - Jet Car Removal Brisbane | placeholder |
| `/thanks/` | Form thank-you | ~270 | Thanks - ... | none |
| `/qld-2/` | Orphan landing page | ~400 | QLD - ... | none |
| `/test/` | Test page, content is only `[nordic_invest_calc]` | ~170 | test - ... | none |

Other URLs that respond 200 on the old site: `/project/` (empty CPT archive), `/category/uncategorized/`, `/author/william/`, `/feed/`.
`/sitemap.xml` and `/wp-sitemap.xml` 301 to `/sitemap_index.xml`. `/contact/` 301s to an image, `/contact-us/` 301s to the contact page.

## Problems found on the old site (they affect what we migrate)
1. **Leftover "Jet Car Removal" branding** from the template this site was cloned from: contact page slug and title,
   Google Maps embed ("Jet Car Removal Brisbane"), a `mailto:info@jetcarremoval.com.au` link, the Facebook link,
   city H1s ending "| Jet Car Removal", image files `jetremove.png` and `jetcarremoval-*.jpg`, WP user "jetcarre".
2. **City pages are templated copy with errors**: the Ipswich page has a "Cash for Cars Caboolture" heading and
   lowercase "ipswich"; text is near-identical across the 8 cities. Several pages have 3-4 `<h1>`.
3. Meta descriptions are placeholders or missing; no per-page Open Graph images beyond a few random ones.
4. "Get up to $9,999" and "Largest car removal in Queensland" are unverified claims.
5. Images: only 5 of 152 have alt text. Some images are from stock/other sources (e.g. `chatarras-y-recambios-desguace.webp`, `valoracion-siniestros-vehiculos.webp` are Spanish-named).
6. No LocalBusiness schema in the live HTML (only WebPage/BreadcrumbList/WebSite from Yoast). No robots rules, no llms.txt.
7. `/project/` and the author archive are indexable but empty/useless.

## Contact Form 7 (form id 59, used on every page, reCAPTCHA v3)
Fields: your-name*, your-phone*, your-email*, suburb*, postal-code*, car-model*, car-year*, your-note (`*` = required).
Redirects to `/thanks/` on success. Mail destination unknown (needs WP admin to read; likely info@vcarremoval.com.au).

## Existing Next.js repo (review)
Already built and usable (Next 16.3, Tailwind v4, TS): header/footer, sticky call bar, hero, services (6), locations
(9 suburb pages from data), FAQ, about, contact, privacy, terms, quote API route (Resend), sitemap, robots, OG image, JSON-LD.
Gaps vs the brief: it does **not use WordPress content** (the copy was written fresh), changes slugs
(`/cash-for-cars-ipswich` becomes `/locations/ipswich`), has no `/llms.txt`, AI-crawler rules, `vercel.json`
region, rate limiting/honeypot, thank-you page, LocalBusiness geo/hours schema checks, or image optimisation of
the WP images. `site.ts` contains `googleRating: 4.8` which is **not** from the WordPress site and must go unless you can verify it.
**Recommendation: keep and build on it, no replacement needed.**
