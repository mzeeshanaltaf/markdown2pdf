import { defaultSchema, type Options } from "rehype-sanitize";

/**
 * Sanitize schema for the Markdown render pipeline.
 *
 * The base `defaultSchema` (GitHub's) strips `<script>`, event handlers
 * (`onerror`, `onclick`, …) and `javascript:`/`vbscript:` URLs — that is the
 * security value and we keep it. We only widen it enough to NOT mangle the
 * trusted markup our own plugins emit downstream:
 *
 * - rehype-katex: HTML twin (inline `style`d spans, the live preview relies on
 *   these), the native MathML twin, plus stretchy-glyph `<svg>`.
 * - rehype-highlight: `hljs-*` class names on `<span>`/`<code>`.
 * - rehypeSourceLine: the `data-source-line` attribute scroll-sync reads.
 *
 * Sanitization runs AFTER those plugins, so the schema must permit their output
 * or it would erase math, syntax colours and scroll anchors.
 *
 * `clobberPrefix` is set to "" so we don't double-prefix the `user-content-`
 * footnote ids/hrefs that remark-rehype already emits (a second prefix would
 * break in-page footnote links).
 */
const MATHML_TAGS = [
  "math", "maction", "maligngroup", "malignmark", "menclose", "merror",
  "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mlongdiv",
  "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mprescripts",
  "mroot", "mrow", "ms", "mscarries", "mscarry", "msgroup", "msline", "mspace",
  "msqrt", "msrow", "mstack", "mstyle", "msub", "msup", "msubsup", "mtable",
  "mtd", "mtext", "mtr", "munder", "munderover", "none", "semantics",
  "annotation", "annotation-xml",
];

const SVG_TAGS = ["svg", "path", "line", "g", "rect"];

// Presentational MathML/SVG attributes plus our scroll anchor. None of these
// can carry script — they are layout/typesetting hints — so allowing them
// globally is safe while keeping the script/handler/URL filters intact.
const EXTRA_GLOBAL_ATTRS = [
  "className", "style", "ariaHidden", "role", "dataSourceLine",
  // MathML
  "mathvariant", "encoding", "display", "displaystyle", "scriptlevel",
  "accent", "accentunder", "stretchy", "fence", "separator", "lspace",
  "rspace", "columnalign", "rowalign", "columnspacing", "rowspacing", "open",
  "close", "linethickness", "depth", "voffset", "xmlns",
  // SVG
  "viewBox", "preserveAspectRatio", "d", "fill", "stroke", "points",
  "transform", "x", "y", "x1", "x2", "y1", "y2", "width", "height",
];

const baseAttributes = defaultSchema.attributes ?? {};

export const markdownSanitizeSchema: Options = {
  ...defaultSchema,
  clobberPrefix: "",
  tagNames: [...(defaultSchema.tagNames ?? []), ...MATHML_TAGS, ...SVG_TAGS],
  attributes: {
    ...baseAttributes,
    "*": [...(baseAttributes["*"] ?? []), ...EXTRA_GLOBAL_ATTRS],
  },
};
