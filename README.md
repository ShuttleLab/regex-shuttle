# Regex Shuttle

A small web app to test, explain, and learn regular expressions. Everything runs on the browser's native JavaScript RegExp engine; no data is sent to any server.

**🔗 Try it live: [Free online regex tester & debugger](https://regex.shuttlelab.org)** — test and explain patterns in real time, right in your browser.

## Features

- **Real-time tester** – matches highlight as you type, with per-match groups, named groups, and indices
- **Flags** – g, i, m, s, u toggles with plain-language tooltips
- **Explainer** – break any pattern down token by token in plain English
- **Pattern library** – ready-to-use patterns for emails, URLs, phones, IPs and more, with one-click copy
- **Substitution** – preview find-and-replace with capture-group references
- **Cheat sheet** – quick reference for characters, quantifiers, anchors, groups, and flags
- **Bilingual** – English and Chinese UI

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static export to `out/`.

## License

Licensed under the GNU Affero General Public License v3.0 — see [LICENSE](./LICENSE).

Free to use, modify, and self-host. If you run a modified version as a network service, you must open-source your modifications (AGPL §13). For commercial licensing without copyleft obligations, contact support@shuttlelab.org.
