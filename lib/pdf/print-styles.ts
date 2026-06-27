/**
 * PDF output options and the `@page` CSS they compile to. Paged.js polyfills
 * these margin boxes (running header/footer and `counter(page)`/`counter(pages)`
 * page numbers) that browsers cannot render natively.
 */

export type PageSize = "A4" | "Letter" | "Legal";
export type Orientation = "portrait" | "landscape";
export type MarginPreset = "narrow" | "normal" | "wide" | "custom";

export interface PdfOptions {
  pageSize: PageSize;
  orientation: Orientation;
  marginPreset: MarginPreset;
  /** Used only when marginPreset === "custom" (millimetres, all sides). */
  customMarginMm: number;
  pageNumbers: boolean;
  headerText: string;
  footerText: string;
}

export const DEFAULT_PDF_OPTIONS: PdfOptions = {
  pageSize: "A4",
  orientation: "portrait",
  marginPreset: "normal",
  customMarginMm: 20,
  pageNumbers: true,
  headerText: "",
  footerText: "",
};

const MARGIN_MM: Record<Exclude<MarginPreset, "custom">, number> = {
  narrow: 12,
  normal: 20,
  wide: 30,
};

/** Upper bound on a custom margin; beyond this the content box collapses. */
export const MAX_CUSTOM_MARGIN_MM = 60;

export function marginMm(o: PdfOptions): number {
  if (o.marginPreset !== "custom") return MARGIN_MM[o.marginPreset];
  const mm = Number.isFinite(o.customMarginMm) ? o.customMarginMm : 0;
  return Math.min(MAX_CUSTOM_MARGIN_MM, Math.max(0, mm));
}

/** Escape a string for safe use inside a CSS `content: "…"` value. */
function cssString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

export function buildPrintCss(o: PdfOptions): string {
  const m = marginMm(o);
  const boxes: string[] = [];
  if (o.headerText.trim()) {
    boxes.push(`@top-center { content: "${cssString(o.headerText)}"; font-size: 9pt; color: #666; }`);
  }
  if (o.footerText.trim()) {
    boxes.push(`@bottom-left { content: "${cssString(o.footerText)}"; font-size: 9pt; color: #666; }`);
  }
  if (o.pageNumbers) {
    boxes.push(
      `@bottom-right { content: "Page " counter(page) " of " counter(pages); font-size: 9pt; color: #666; }`
    );
  }

  return `
@page {
  size: ${o.pageSize} ${o.orientation};
  margin: ${m}mm;
  ${boxes.join("\n  ")}
}
`;
}
