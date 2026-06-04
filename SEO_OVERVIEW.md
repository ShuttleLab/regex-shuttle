# SEO Overview: regex-shuttle

> Strategy: shuttlelab-handbook/playbooks/01-saas-funnel-strategy.md
> Execution playbook: shuttlelab-handbook/playbooks/00-new-saas-project.md

## Project type
- [x] Free tool

## Audience target
- [x] Overseas (English-primary SEO, bilingual UI)

## Payment
- None (free tool)

## i18n strategy
- Implementation: URL-based + `localePrefix: "as-needed"` (next-intl)
- Default locale: `en` (served at `/`)
- Chinese: `zh` (served at `/zh`)
- Layer 4 language: English only

## Path A pages (internal navigation)
- Layer 1: `/[locale]/page.tsx` — Homepage with embedded RegexTester
- Layer 3: `/[locale]/about/page.tsx` — About with FAQPage + HowTo schemas
- Layer 3: `/[locale]/privacy/page.tsx` — Privacy Policy
- Layer 3: `/[locale]/terms/page.tsx` — Terms of Service

## Path B pages (SEO landing)
- Layer 4: `/[locale]/tools/regex-tester` — "test regex online"
- Layer 4: `/[locale]/tools/regex-explainer` — "regex explainer online"
- Layer 4: `/[locale]/tools/regex-cheat-sheet` — "regex cheat sheet"
- Layer 4: `/[locale]/tools/email-regex` — "email regex pattern"
- Layer 4: `/[locale]/tools/phone-regex` — "phone number regex"
- Layer 4: `/[locale]/tools/url-regex` — "URL regex pattern"

## SEO assets
- [x] `app/layout.tsx` — Root metadata, SoftwareApplication JSON-LD
- [x] `app/[locale]/layout.tsx` — hreflang alternates + x-default
- [x] `app/sitemap.ts` — All pages with alternates.languages
- [x] `app/robots.ts` — Allow /, disallow /api
- [x] `app/opengraph-image.tsx` — Dynamic OG image (force-static)
- [x] `app/manifest.ts` — PWA manifest
- [x] `app/icon-192.png/route.tsx` — PWA icon 192x192
- [x] `app/icon-512.png/route.tsx` — PWA icon 512x512
- [x] `app/not-found.tsx` — Custom 404 with cross-promotion

## Schemas applied
- [x] SoftwareApplication (root layout)
- [x] FAQPage (about page + each Layer 4 page)
- [x] HowTo (about page + each Layer 4 page)
- [x] TechArticle (Layer 4 pages)
- [x] BreadcrumbList (Layer 4 pages)

## Cross-promotion
- Footer: "Also from ShuttleLab: Image Shuttle" → https://image.shuttlelab.org
- 404 page: Link to Image Shuttle

## Domain
- `regex.shuttlelab.org`

## Last reviewed: 2026-06-04
