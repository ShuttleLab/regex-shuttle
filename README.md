# Regex Shuttle

<div align="center">
  <h1>Regex Shuttle</h1>
  <p>
    <strong>Free, Private & Browser-Based Regex Tester</strong>
  </p>
  <p>
    Build, test, and debug regular expressions with real-time match highlighting — entirely in your browser.
  </p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

</div>

## About

**Regex Shuttle** is a privacy-first regular expression testing tool. Patterns and test strings are evaluated entirely in your browser using the native JavaScript `RegExp` engine — nothing is uploaded to any server, making it safe for testing patterns against sensitive data like logs, emails, or source code.

## Key Features

- **Real-Time Matching**: Matches highlight as you type, with capture groups broken out per match.
- **JavaScript RegExp Engine**: Test exactly what your JS/TS code will run — flags `g`, `i`, `m`, `s`, `u` supported in the UI.
- **Pattern Explainer**: Plain-language breakdown of what each part of your pattern does.
- **Common Pattern Library**: Ready-made patterns for emails, URLs, dates, IP addresses, and more.
- **100% Private**: All evaluation happens client-side. No pattern or test data ever leaves your device.
- **Bilingual UI**: Native English and Chinese interfaces with full SEO localization.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, static export) + [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) primitives
- **i18n**: [next-intl](https://next-intl.dev/) with URL-based routing
- **Theming**: System / Light / Dark three-state theme
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) static assets (`output: "export"`)

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

```bash
git clone https://github.com/ShuttleLab/regex-shuttle.git
cd regex-shuttle
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Static-export build into `out/` (incl. locale post-processing) |
| `npm run lint` | Run ESLint |

## Deployment

Regex Shuttle deploys as static assets on Cloudflare Workers. The build emits to `out/`, which `wrangler.toml` points at; `scripts/postbuild.mjs` promotes the default-locale pages to the web root and fixes the `lang` attribute on Chinese pages.

## License

This project is licensed under the MIT License.

---

<div align="center">
  Built by <a href="https://github.com/ShuttleLab">ShuttleLab</a>
</div>
