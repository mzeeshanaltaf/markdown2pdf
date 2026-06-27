import { MARKDOWN_CSS } from "@/lib/styles/markdown-css";
import { scopedThemeCss } from "@/lib/highlight-themes";
import { buildPrintCss, type PdfOptions } from "./print-styles";

const PRINT_ROOT_ID = "pdf-print-root";

/** Remove anything left over from a previous PDF generation. */
function cleanup() {
  document.getElementById(PRINT_ROOT_ID)?.remove();
  document
    .querySelectorAll("style[data-pagedjs-inserted-styles], style[data-pagedjs-base-style]")
    .forEach((el) => el.remove());
}

/**
 * Generate a PDF entirely in the browser.
 *
 * Paged.js paginates the rendered Markdown into real page boxes (applying the
 * chosen size, margins, running header/footer and page numbers), then we hand
 * off to the browser's native "Save as PDF". Nothing is uploaded — the whole
 * pipeline runs on the user's device.
 *
 * @param sourceHtml innerHTML of the live `.markdown-body` preview (math + code
 *                   colours + Mermaid SVG already baked in).
 */
export async function generatePdf(
  sourceHtml: string,
  themeId: string,
  options: PdfOptions
): Promise<void> {
  cleanup();

  // The print root is a direct child of <body> so the print stylesheet can hide
  // everything else. It carries `.markdown-body` so the scoped Markdown + theme
  // CSS matches the paginated content. Kept off-screen during pagination (it
  // still needs real layout for Paged.js to measure), revealed only for print.
  const printRoot = document.createElement("div");
  printRoot.id = PRINT_ROOT_ID;
  printRoot.className = "markdown-body";
  document.body.appendChild(printRoot);

  const content = document.createElement("div");
  content.innerHTML = sourceHtml;

  const css = [MARKDOWN_CSS, scopedThemeCss(themeId), buildPrintCss(options)].join("\n");

  // `pagedjs` is aliased to its prebuilt ESM bundle in next.config.ts to avoid
  // a clear-cut interop bug in the package's `src` entry. See that file.
  const { Previewer } = await import("pagedjs");
  const previewer = new Previewer();

  try {
    await previewer.preview(content, [{ [window.location.href]: css }], printRoot);
  } catch (err) {
    console.error("[pdf] Paged.js preview failed:", err);
    cleanup();
    throw err instanceof Error ? err : new Error("PDF rendering failed");
  }

  // Print on the next frame so the paginated DOM is fully laid out, then tidy up.
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  const done = () => {
    window.removeEventListener("afterprint", done);
    cleanup();
  };
  window.addEventListener("afterprint", done);

  window.print();

  // Fallback cleanup if afterprint never fires (some browsers/headless).
  window.setTimeout(done, 60_000);
}
