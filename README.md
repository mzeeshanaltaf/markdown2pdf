# Markdown2PDF

> Free, privacy-first Markdown → PDF and HTML converter. Runs entirely in the browser — no login, no limits, your document never leaves your device.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mzeeshanaltaf/markdown2pdf)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Why

Most Markdown-to-PDF tools make you sign in or cap how many files you can convert. This one doesn't, because all conversion happens on your device. There is no backend that handles your content.

## Features

| Feature | Detail |
|---|---|
| **GitHub Flavored Markdown** | Tables, task lists, strikethrough, autolinks |
| **LaTeX Math** | Inline `$...$` and block `$$...$$` via KaTeX |
| **Mermaid Diagrams** | Flowcharts, sequence, class/UML → inline vector SVG |
| **Syntax Highlighting** | 8 themes: GitHub, Atom One Dark, Nord, Tokyo Night, and more |
| **Real-Time Preview** | Bi-directional scroll sync between editor and preview |
| **Rich Editor** | CodeMirror 6 with Markdown-aware highlighting and line wrapping |
| **PDF Export** | Paginated via Paged.js + browser engine; vector, selectable text |
| **HTML Export** | Self-contained single `.html` file — works offline, no CDN links |
| **PDF Options** | Page size, orientation, margins, page numbers, header/footer |
| **Contact / Feedback** | `/contact` form → n8n webhook, with honeypot + Upstash rate limiting |

## Privacy Guarantee

Open DevTools → Network while you convert and download. You will see zero requests carrying your document. There is no upload endpoint.

- **PDF** — [Paged.js](https://pagedjs.org/) paginates your document in the browser, then `window.print()` hands it to the browser's own Save-as-PDF. Vector output, selectable text, crisp math and diagrams — all on-device.
- **HTML** — All CSS (typography, syntax theme, KaTeX via MathML), and pre-rendered Mermaid SVGs are inlined into a single `Blob`. One-click download, no print dialog, fully offline.

## Getting Started

```bash
git clone https://github.com/mzeeshanaltaf/markdown2pdf.git
cd markdown2pdf
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or go to [http://localhost:3000/app](http://localhost:3000/app) directly for the converter.

## Usage

1. Paste or upload a `.md` file (drag-and-drop supported)
2. Edit in the left pane — preview updates live
3. Switch syntax theme from the toolbar
4. Click the settings icon to configure page size, margins, and headers
5. **Download PDF** → browser print dialog → Save as PDF
6. **Download HTML** → one-click self-contained `.html` file

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI / base-nova)
- **Editor:** CodeMirror 6 via `@uiw/react-codemirror`
- **Markdown:** `react-markdown` + `remark-gfm` + `remark-math` / `rehype-katex` + `rehype-highlight`
- **Diagrams:** Mermaid.js
- **PDF:** Paged.js + `window.print()`
- **Animations:** Motion (`motion/react`)
- **Contact form:** Next.js route handler → n8n webhook, rate-limited with Upstash Redis (`@upstash/ratelimit`)
- **Deploy:** Vercel

## Project Structure

```
app/
  page.tsx          # Landing page
  app/page.tsx      # Converter route (ssr: false wrapper)
  contact/page.tsx  # Contact / feedback page (server component)
  api/contact/      # Route handler: validate → honeypot → rate limit → n8n webhook
  globals.css       # Tailwind base + print isolation CSS

components/
  converter/        # Editor, preview, toolbar, PDF options
  landing/          # Hero, features, privacy, how-it-works, FAQ, footer
  contact/          # Progressive-enhancement contact form
  ui/               # shadcn/Base UI primitives

lib/
  styles/           # Shared Markdown CSS (preview + PDF + HTML export)
  pdf/              # Paged.js orchestration + @page CSS builder
  html/             # Standalone HTML export (Blob download)
  markdown/         # Custom rehype source-line plugin (scroll sync)
  highlight-themes.ts   # 8 bundled syntax themes
  scroll-sync.ts        # Bi-directional editor ↔ preview sync
  storage.ts            # localStorage autosave
  rate-limit.ts         # Upstash Redis sliding-window limiter (contact form)
  sample.ts             # Sample Markdown document
```

## Deploying

The converter itself is fully static/client-side — your document never touches a server. Connect this repo to [Vercel](https://vercel.com) and it deploys with near-zero configuration.

The only server-side feature is the **contact / feedback form**, which needs these environment variables (set them in the Vercel project settings, or a local `.env`):

```bash
N8N_CONTACT_WEBHOOK_URL=   # n8n webhook the form posts to
N8N_API_KEY=               # sent as the x-api-key header
UPSTASH_REDIS_REST_URL=    # Upstash Redis REST URL (rate limiting)
UPSTASH_REDIS_REST_TOKEN=  # Upstash Redis REST token
```

If the Upstash variables are absent, rate limiting fails open (submissions are still allowed); if the n8n variables are absent, the form returns a configuration error.

## Architecture Notes

- The converter is loaded via `next/dynamic({ ssr: false })` because it uses browser-only APIs (CodeMirror, Mermaid, Paged.js). This prevents a silent hydration mismatch that would break the UI.
- One shared `MarkdownRenderer` component and one `MARKDOWN_CSS` string drive the live preview, the PDF, and the HTML export — all three are visually identical by construction.
- Paged.js is patched via [`patch-package`](https://www.npmjs.com/package/patch-package) (`patches/pagedjs+0.4.3.patch`) to add null guards in its page-break logic, which otherwise crashes on certain documents (large tables, code blocks, or content ending at a page boundary). The patch re-applies automatically through the `postinstall` script — including on Vercel.

## License

MIT
