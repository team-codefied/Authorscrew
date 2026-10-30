# Authors Crew website

Next.js (App Router), TypeScript, Tailwind CSS v4. Forms post to a serverless route that validates, checks spam, and emails the submission through Resend.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values; all are optional in dev
npm run dev
```

In development with no keys set, form submissions are logged to the terminal and succeed. In production a missing Turnstile secret or Resend key makes submissions fail on purpose.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for sitemap, metadata and structured data |
| `RESEND_API_KEY` | Resend API key |
| `FORM_TO_EMAIL` | Comma-separated recipients for every form |
| `FORM_FROM_EMAIL` | Sender on a domain verified in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |

## Deploy to Vercel

1. Push the repository and import it in Vercel (framework preset: Next.js).
2. Add the variables above under Project Settings, Environment Variables (Production and Preview).
3. In Resend, verify the sending domain and use an address on it for `FORM_FROM_EMAIL`.
4. In Cloudflare Turnstile, create a widget for the production domain.
5. Deploy, then submit each form type once and confirm the email arrives and you land on `/thank-you`.
6. Point the domain at Vercel. Old landing-page URLs (`/book-cover-design-2`, `/childrens-book-publishing-illustration`, `/christian-book-publishing`) redirect permanently to the new `-lp` URLs.

## Where things live

- `src/app/(site)` main pages, `src/app/(landing)` landing pages (header without the main menu), `src/app/api/forms` form endpoint.
- `src/components/LeadForm.tsx` is the one form component (journey, contact, newsletter). The Independent Service disclaimer is built in, so every form includes it.
- `src/components/PopupProvider.tsx` is the shared quote popup used by every "Get A Quote" button.
- `src/content/*` page copy as data: `home.ts`, `services/*.json`, `landing/*.json`, `legal/*.json`, `blog/*.json`.
- `src/lib/schemas.ts` Zod schemas shared by client and server.
- Blog featured images: `public/images/blog/<slug>.<ext>`.

## Known open items

- Live Chat Now currently opens the quote popup; point it at the real chat tool when known.
- Social profile links in `src/lib/site.ts` need confirming.
- Some images used on the live service and landing pages were not in the supplied assets and are substituted.
