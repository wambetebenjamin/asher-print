# Asher Print

Print it. Brand it. Own it.

Printing and branding services website for Asher Print, Nairobi: business
cards, flyers and brochures, banners and signage, t-shirts and branded
apparel, branded mugs and gifts, packaging and labels, stickers and decals,
and event materials. Customers browse products, calculate prices, upload
artwork and request a quote online. Staff confirm the final price within 2
hours. WhatsApp: +254112272061.

This site is built on top of the supplied BizCraft template
(`bizcraft-master.zip`, kept at the repository root). The full template
audit, including fonts, colours and what the zip did and did not contain,
is in [AUDIT.md](AUDIT.md). Photo credits are in
[image-credits.md](image-credits.md).

## Run locally

Requires Node 24 (see `.nvmrc`). Copy `.env.example` to `.env.local` and
fill in what you have. Every integration degrades gracefully when its keys
are absent, so the site runs with only `NEXTAUTH_SECRET` set.

```bash
npm ci
npm run dev
```

Production:

```bash
npm run build
npm run start
```

## Environment variables

See `.env.example` for the full list. Highlights:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO and sitemap |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Pre-set to 254112272061 |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3, with v2 fallback below score 0.5. Without keys, checks are bypassed in preview only |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Auth.js session security |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Enable the Google sign in button |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Vercel KV storage for quotes and accounts. Falls back to memory for previews |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage for artwork uploads |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Quote and contact email delivery |
| `PEXELS_API_KEY` | Optional, for future live Pexels galleries |

## Pages

`/` home, `/products` catalogue with category filters,
`/products/[slug]` product detail with live price calculator and artwork
upload, `/quote` quote builder, `/quote-confirmation` confirmation slip
with QR code and PDF download, `/portfolio`, `/upload` artwork portal,
`/auth/signin` and `/auth/signup`, `/legal/privacy-policy`, `/legal/terms`,
`/legal/cookie-policy`, plus custom 404 and error pages.

## API routes

`GET /api/products` (filter with `?category=`), `GET /api/products/[slug]`,
`POST /api/quote/submit`, `GET /api/quote/[ref]`, `POST /api/upload/artwork`,
`POST /api/contact`, `POST /api/recaptcha/verify`, plus
`/api/auth/[...nextauth]` and `POST /api/auth/register` for accounts.

## Verification

```bash
npm ci
npx tsc --noEmit
npx next build
npm audit --audit-level=high
```

All four pass with zero vulnerabilities. Version deviations forced by
nonexistent or vulnerable pins in the original brief are documented in
AUDIT.md, point 8.

## Deploy

Import the repository into Vercel. `vercel.json` sets the build command,
the Paris (cdg1) region and security headers. Add the environment variables
above in the Vercel dashboard, connect Vercel KV and Blob stores, and set
`NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the production domain.
