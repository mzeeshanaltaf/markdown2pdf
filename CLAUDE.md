# CLAUDE.md — Markdown2PDF

## Project Overview

Free, privacy-first Markdown → PDF and HTML converter. Everything runs in the browser — no backend, no uploads, no accounts. Deployed on Vercel as a static Next.js app.

Routes:
- `/` — Landing page (dark, marketing)
- `/app` — Converter tool (client-only, dynamic import with `ssr: false`)

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui base-nova** (Base UI, NOT Radix)
- **CodeMirror 6** via `@uiw/react-codemirror` + `@codemirror/lang-markdown`
- **react-markdown** + remark-gfm, remark-math, rehype-katex, rehype-highlight, rehype-sanitize
- **Mermaid.js** — fenced ` ```mermaid ` blocks → inline SVG
- **KaTeX** — `$...$` and `$$...$$` LaTeX math
- **Paged.js** — client-side PDF pagination + `window.print()`
- **Motion** (`motion/react`) — landing page scroll animations
- **next-themes** — light/dark toggle on `/app`

## Critical: Paged.js alias (do not remove)

`next.config.ts` aliases `pagedjs` to `./node_modules/pagedjs/dist/paged.esm.js`. Without this, the package's `src` entry trips a CommonJS/ESM interop bug (`TypeError: contains.call is not a function`) under Turbopack. Turbopack needs a **project-root-relative** path — absolute Windows paths fail with "windows imports are not implemented yet".

## Critical: Base UI (shadcn base-nova) API differences

This project uses **Base UI** primitives, not Radix. Key differences:
- No `asChild` prop — use `render` prop: `<PopoverTrigger render={<Button />}>label</PopoverTrigger>`
- `TooltipProvider` takes `delay` (not `delayDuration`)
- `Select.onValueChange` receives `string | null` — always guard: `(v) => v && set(v)`
- `Accordion` has no `openMultiple` prop (use `multiple` boolean if needed)

## Critical: Hydration safety

`/app` uses browser-only APIs (CodeMirror, Mermaid, Paged.js). The converter is wrapped in `next/dynamic` with `ssr: false` in `app/app/page.tsx`. Do not remove this wrapper.

## Rendering pipeline

`MarkdownRenderer` (`components/converter/markdown-renderer.tsx`) drives both the live preview and PDF export — same component, same CSS. Changes to rendering must keep both in sync.

Single source of CSS: `lib/styles/markdown-css.ts` (`MARKDOWN_CSS`). This string is injected into:
1. Live preview via a `<style>` tag in `converter.tsx`
2. PDF via `generatePdf()` in `lib/pdf/generate.ts`
3. HTML export via `buildStandaloneHtml()` in `lib/html/export.ts`

No backticks inside `MARKDOWN_CSS` (TypeScript template literal). No `:has()` selectors (Paged.js css-tree chokes on them).

## Key file map

```
lib/
  styles/markdown-css.ts     # Single shared CSS for preview + PDF + HTML
  highlight-themes.ts        # 8 highlight.js themes; scopedThemeCss(id)
  markdown/source-line.ts    # rehype plugin: stamps data-source-line for scroll sync
  scroll-sync.ts             # createScrollSync(editorView, previewEl) → cleanup fn
  pdf/print-styles.ts        # PdfOptions, buildPrintCss() → @page CSS
  pdf/generate.ts            # generatePdf() — Paged.js orchestration
  html/export.ts             # exportHtml() — standalone Blob download
  storage.ts                 # localStorage autosave (draft + syntax theme)
  sample.ts                  # SAMPLE_MARKDOWN

components/converter/
  converter.tsx              # Main shell; wires editor + preview + scroll sync
  editor.tsx                 # CodeMirror wrapper
  markdown-renderer.tsx      # Shared react-markdown pipeline (forwardRef)
  mermaid-block.tsx          # Mermaid fenced block → inline SVG
  toolbar.tsx                # Upload, sample, theme picker, download split button
  pdf-options.tsx            # Page size / margins / page numbers / header-footer

components/landing/          # Hero, features, privacy, how-it-works, faq, cta, footer
components/ui/               # shadcn/Base UI components (do not hand-edit generated files)
```

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run lint      # ESLint
```

## Conventions

- No comments unless the WHY is non-obvious
- No default exports from lib files (named exports only)
- `rehypePlugins as any` cast in MarkdownRenderer is intentional (type incompatibility with rehype-sanitize)
- PDF debug: errors surface as `console.error("[pdf] Paged.js preview failed: ...")` — check browser console
- localStorage keys: `"md2pdf:draft"` (editor content), `"md2pdf:syntax-theme"` (chosen theme)
