/**
 * Single source of truth for how rendered Markdown looks.
 *
 * This exact CSS is used in three places so that the live preview, the printed
 * PDF, and the exported standalone HTML are pixel-identical (true WYSIWYG):
 *   1. injected into the app once (preview pane)            -> markdown-renderer.tsx
 *   2. embedded into the print container                   -> lib/pdf/generate.ts
 *   3. inlined into the exported .html document             -> lib/html/export.ts
 *
 * It is intentionally scoped to `.markdown-body` and uses explicit colours that
 * look good on white "paper" (the preview pane and the PDF page share that
 * background), so it does not depend on Tailwind utilities or app theme tokens.
 */
export const MARKDOWN_CSS = `
.markdown-body {
  color: #1f2328;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  word-wrap: break-word;
}
.markdown-body > *:first-child { margin-top: 0 !important; }
.markdown-body > *:last-child { margin-bottom: 0 !important; }

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin: 1.6em 0 0.6em;
  font-weight: 600;
  line-height: 1.25;
}
.markdown-body h1 { font-size: 2em; padding-bottom: 0.3em; border-bottom: 1px solid #d1d9e0; }
.markdown-body h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #d1d9e0; }
.markdown-body h3 { font-size: 1.25em; }
.markdown-body h4 { font-size: 1em; }
.markdown-body h5 { font-size: 0.875em; }
.markdown-body h6 { font-size: 0.85em; color: #59636e; }

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre,
.markdown-body details { margin: 0 0 1em; }

.markdown-body a { color: #0969da; text-decoration: none; }
.markdown-body a:hover { text-decoration: underline; }

.markdown-body strong { font-weight: 600; }

.markdown-body ul, .markdown-body ol { padding-left: 2em; }
.markdown-body li + li { margin-top: 0.25em; }
.markdown-body li > p { margin-top: 1em; }
.markdown-body ul ul, .markdown-body ul ol,
.markdown-body ol ol, .markdown-body ol ul { margin: 0; }

.markdown-body input[type="checkbox"] {
  margin: 0 0.35em 0.15em -1.4em;
  vertical-align: middle;
}
.markdown-body li.task-list-item { list-style: none; }
.markdown-body ul.contains-task-list { padding-left: 1.4em; }

.markdown-body blockquote {
  padding: 0 1em;
  color: #59636e;
  border-left: 0.25em solid #d1d9e0;
}
.markdown-body blockquote > :first-child { margin-top: 0; }
.markdown-body blockquote > :last-child { margin-bottom: 0; }

.markdown-body hr {
  height: 0.25em;
  margin: 1.6em 0;
  background-color: #d1d9e0;
  border: 0;
}

.markdown-body table {
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  border-collapse: collapse;
}
.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #d1d9e0;
}
.markdown-body table th { font-weight: 600; background: #f6f8fa; }
.markdown-body table tr:nth-child(2n) { background: #f6f8fa; }

.markdown-body img { max-width: 100%; height: auto; box-sizing: border-box; }

/* Inline code */
.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 0.86em;
  padding: 0.2em 0.4em;
  background: #eff1f3;
  border-radius: 6px;
}
/* Code blocks. The active highlight.js theme paints .hljs (the inner code);
   pre only provides the rounded frame. overflow:hidden keeps the theme
   background flush with the rounded corners even for dark themes. */
.markdown-body pre {
  margin: 0 0 1em;
  padding: 0;
  background: #f6f8fa;
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.86em;
  line-height: 1.5;
}
.markdown-body pre code {
  display: block;
  padding: 14px 16px;
  overflow-x: auto;
  border-radius: 0;
  font-size: inherit;
  white-space: pre;
  overflow-wrap: normal;
}

/* Mermaid diagrams render as inline SVG inside a centered figure */
.markdown-body .mermaid-figure {
  margin: 0 0 1em;
  text-align: center;
}
.markdown-body .mermaid-figure svg { max-width: 100%; height: auto; }
.markdown-body .mermaid-error {
  text-align: left;
  color: #b35900;
  background: #fff8e1;
  border: 1px solid #f0d48a;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 0.85em;
}

/* KaTeX math: keep block math from overflowing the page */
.markdown-body .katex-display { overflow-x: auto; overflow-y: hidden; padding: 0.2em 0; }
`;
