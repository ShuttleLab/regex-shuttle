# Regex Shuttle - AGENTS.md

## Project Overview

Regex Shuttle — a free, browser-based regex testing, explaining, and learning tool. Built with Next.js 16 + React 19, deployed to Cloudflare Pages as a static export.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |

- `npm run build` runs `next build` **then** `node scripts/postbuild.mjs`, outputting to `out/` for Cloudflare Pages deployment. The postbuild step is load-bearing — see Build Pipeline below.
- `npm run lint` runs `eslint` directly (config in `eslint.config.mjs`).
- There is **no test suite** configured.

## Build Pipeline

`scripts/postbuild.mjs` reconciles the static export with what the SEO metadata promises and generates the service worker. Without it, the default locale would live at `/en/` instead of `/`, breaking every canonical/hreflang/sitemap URL. It:

1. **Promotes `out/en/*` → `out/`** and removes `out/en`, so `/` serves English (matches `localePrefix: "as-needed"` expectations vs. static-export behavior).
2. **Patches `<html lang>`** from `en` to `zh-CN` across `out/zh/**/*.html`.
3. **Generates `out/sw.js`** — a service worker precaching every emitted HTML route + PWA assets, with cache-first for `/_next/static/`, network-first for navigations, and stale-while-revalidate for everything else.

If you change locale routing, the `out/` layout, or PWA assets, re-check this script.

## Architecture

- `app/` — Next.js App Router
  - `app/layout.tsx` — Root layout (metadata, JSON-LD, ThemeProvider)
  - `app/[locale]/` — i18n routes
    - `layout.tsx` — Locale layout (NextIntlClientProvider, Header, Footer)
    - `page.tsx` — Homepage with RegexTester tool (Layer 1)
    - `about/` — About page with FAQPage + HowTo schemas (Layer 3)
    - `privacy/` — Privacy policy (Layer 3)
    - `terms/` — Terms of service (Layer 3)
    - `tools/` — Layer 4 SEO landing pages
      - `regex-tester/` — "test regex online"
      - `regex-explainer/` — "regex explainer online"
      - `regex-cheat-sheet/` — "regex cheat sheet"
      - `email-regex/` — "email regex pattern"
      - `phone-regex/` — "phone number regex"
      - `url-regex/` — "URL regex pattern"
  - `app/sitemap.ts` — SEO sitemap with hreflang
  - `app/robots.ts` — SEO robots
  - `app/opengraph-image.tsx` — Dynamic OG image
  - `app/manifest.ts` — PWA manifest
  - `app/icon-192.png/` + `icon-512.png/` — PWA icons
  - `app/not-found.tsx` — Custom 404
- `components/` — React components
  - `regex-tester.tsx` — Main regex testing tool (composes all sub-components)
  - `regex-input.tsx` — Pattern input with flags
  - `test-string.tsx` — Test string textarea
  - `match-results.tsx` — Match highlighting and details
  - `substitution.tsx` — Find-and-replace
  - `regex-explainer.tsx` — Token-by-token explanation
  - `pattern-library.tsx` — Common patterns browser
  - `cheat-sheet.tsx` — Syntax reference
  - `AboutFaq.tsx` + `AboutFaqData.tsx` — FAQ data and rendering
  - `header.tsx` — Navigation bar
  - `footer.tsx` — Footer with links
  - `theme-sync.tsx` — System/Light/Dark theme
  - `layout-shell.tsx` — Header+main+Footer layout
  - `ui/` — shadcn components
- `lib/` — Shared utilities
  - `regex-engine.ts` — RegExp execution + match extraction
  - `regex-explainer.ts` — Regex tokenizer + natural language explanation
  - `patterns.ts` — Common regex pattern library data
  - `constants.ts` — App constants
  - `utils.ts` — `cn()` utility
- `i18n/` — next-intl configuration
  - `routing.ts` — Locale routing (`en`, `zh`, `as-needed`)
  - `request.ts` — Server-side translations
  - `navigation.ts` — Link, useRouter, etc.
- `messages/` — Translation files (en.json, zh.json)

## i18n

- URL-based with next-intl (`localePrefix: "as-needed"`)
- Default locale: `en` (served at `/`)
- Chinese: `zh` (served at `/zh`)
- Layer 4 pages: English only (`/tools/*`)
- Server components: `getTranslations({ locale, namespace })`
- Client components: `useTranslations("namespace")`
- **Always add both `en` and `zh` entries** when adding UI text

## Regex Processing

- All regex execution uses JavaScript native `RegExp` API
- Real-time matching with 150ms debounce
- Max 1000 matches before truncation (ReDoS protection)
- Regex explainer: custom tokenizer covering all common regex tokens

## UI Conventions

- Tailwind CSS v4 + shadcn/ui
- Geist + Geist Mono fonts
- ShuttleLab purple identity (oklch hue 264) — consistent across all sibling products
- Theme: System/Light/Dark (via `ThemeProvider`)
- Toast: sonner (top-center, richColors, 3s)
- Icons: lucide-react
- Path alias: `@/` maps to project root

## Cloudflare Deployment

- Static export (`output: "export"` in next.config.ts)
- `wrangler.toml` configures only `[assets]` directory
- No middleware (not supported with static export)
- No Edge Runtime
- `images.unoptimized: true` in next.config.ts
- `trailingSlash: true` — every route emits as a directory with `index.html`
- Build output: `out/` (post-processed by `scripts/postbuild.mjs`, see Build Pipeline)

## SEO

- Layer 1: Homepage (500+ words + embedded tool)
- Layer 3: About (FAQPage + HowTo schemas), Privacy, Terms
- Layer 4: 6 tool landing pages (800-1500 words each)
- All pages have proper metadata, canonical URLs, and hreflang
- See `SEO_OVERVIEW.md` for complete asset map

## License

AGPL-3.0-only
