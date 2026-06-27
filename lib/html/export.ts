import { MARKDOWN_CSS } from "@/lib/styles/markdown-css";
import { scopedThemeCss } from "@/lib/highlight-themes";

/**
 * Math in the exported file renders via the MathML twin that rehype-katex
 * emits, so it needs no KaTeX fonts or stylesheet — the document stays fully
 * self-contained and offline. We hide the visual KaTeX-HTML span (which would
 * be an unstyled jumble without katex.css) and reveal the native MathML.
 */
const MATHML_REVEAL_CSS = `
.katex-html { display: none !important; }
.katex .katex-mathml {
  position: static !important;
  clip: auto !important;
  clip-path: none !important;
  width: auto !important;
  height: auto !important;
  overflow: visible !important;
  padding: 0 !important;
  display: inline-block;
}
.katex { font-size: 1.05em; }
.katex-display { display: block; text-align: center; margin: 0.5em 0; }
math { font-family: math; }
`;

const PAGE_CSS = `
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: #fff; }
.markdown-body { max-width: 820px; margin: 0 auto; padding: 48px 24px 96px; }
@media (max-width: 720px) { .markdown-body { padding: 32px 18px 64px; } }
`;

/** Escape a string for safe interpolation into HTML text or an attribute. */
function escapeHtmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Build a complete, dependency-free HTML document string. */
export function buildStandaloneHtml(
  bodyHtml: string,
  themeId: string,
  title: string
): string {
  const css = [PAGE_CSS, MARKDOWN_CSS, scopedThemeCss(themeId), MATHML_REVEAL_CSS].join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="Markdown2PDF — converted locally in the browser">
<title>${escapeHtmlText(title)}</title>
<style>${css}</style>
</head>
<body>
<article class="markdown-body">
${bodyHtml}
</article>
</body>
</html>`;
}

function safeFileName(name: string): string {
  const base = name.trim().replace(/[^a-z0-9-_ ]/gi, "").replace(/\s+/g, "-");
  return (base || "document").slice(0, 80);
}

/**
 * Export the rendered Markdown as a standalone .html file via a one-click Blob
 * download. No print dialog, no network — the file opens correctly offline.
 */
export function exportHtml(bodyHtml: string, themeId: string, title: string): void {
  const html = buildStandaloneHtml(bodyHtml, themeId, title || "Document");
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeFileName(title)}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke after the download has had a chance to start.
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
