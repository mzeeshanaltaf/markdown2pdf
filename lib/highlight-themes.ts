/**
 * Curated highlight.js syntax-color themes.
 *
 * The raw CSS below is copied verbatim from the `highlight.js/styles/*` files.
 * It is used for the live preview, the PDF, and the exported HTML, so the
 * chosen colours travel with every output. `scopedThemeCss()` prefixes every
 * selector with `.markdown-body` so a theme only styles rendered code (and so
 * `.hljs` wins specificity over the generic `pre code` rule in markdown-css).
 */

export type HighlightTheme = {
  id: string;
  label: string;
  /** Whether the code block background is dark (used only for UI hints). */
  dark: boolean;
  css: string;
};

// Shared layout prefix present in every highlight.js theme file.
const P = `pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}`;

export const HIGHLIGHT_THEMES: HighlightTheme[] = [
  {
    id: "github",
    label: "GitHub Light",
    dark: false,
    css: `${P}.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}`,
  },
  {
    id: "github-dark",
    label: "GitHub Dark",
    dark: true,
    css: `${P}.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}`,
  },
  {
    id: "atom-one-dark",
    label: "Atom One Dark",
    dark: true,
    css: `${P}.hljs{color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}`,
  },
  {
    id: "atom-one-light",
    label: "Atom One Light",
    dark: false,
    css: `${P}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}`,
  },
  {
    id: "monokai",
    label: "Monokai",
    dark: true,
    css: `${P}.hljs{background:#272822;color:#ddd}.hljs-keyword,.hljs-literal,.hljs-name,.hljs-number,.hljs-selector-tag,.hljs-strong,.hljs-tag{color:#f92672}.hljs-code{color:#66d9ef}.hljs-attr,.hljs-attribute,.hljs-link,.hljs-regexp,.hljs-symbol{color:#bf79db}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-emphasis,.hljs-section,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-string,.hljs-subst,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#a6e22e}.hljs-class .hljs-title,.hljs-title.class_{color:#fff}.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote{color:#75715e}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-section,.hljs-selector-id,.hljs-selector-tag,.hljs-title,.hljs-type{font-weight:700}`,
  },
  {
    id: "nord",
    label: "Nord",
    dark: true,
    css: `${P}.hljs{background:#2e3440}.hljs,.hljs-subst{color:#d8dee9}.hljs-selector-tag{color:#81a1c1}.hljs-selector-id{color:#8fbcbb;font-weight:700}.hljs-selector-attr,.hljs-selector-class{color:#8fbcbb}.hljs-property,.hljs-selector-pseudo{color:#88c0d0}.hljs-addition{background-color:rgba(163,190,140,.5)}.hljs-deletion{background-color:rgba(191,97,106,.5)}.hljs-built_in,.hljs-class,.hljs-type{color:#8fbcbb}.hljs-function,.hljs-function>.hljs-title,.hljs-title.hljs-function{color:#88c0d0}.hljs-keyword,.hljs-literal,.hljs-symbol{color:#81a1c1}.hljs-number{color:#b48ead}.hljs-regexp{color:#ebcb8b}.hljs-string{color:#a3be8c}.hljs-title{color:#8fbcbb}.hljs-params{color:#d8dee9}.hljs-bullet{color:#81a1c1}.hljs-code{color:#8fbcbb}.hljs-emphasis{font-style:italic}.hljs-formula{color:#8fbcbb}.hljs-strong{font-weight:700}.hljs-comment,.hljs-quote{color:#4c566a}.hljs-doctag{color:#8fbcbb}.hljs-meta,.hljs-meta .hljs-keyword{color:#5e81ac}.hljs-meta .hljs-string{color:#a3be8c}.hljs-attr{color:#8fbcbb}.hljs-attribute{color:#d8dee9}.hljs-name{color:#81a1c1}.hljs-section{color:#88c0d0}.hljs-tag{color:#81a1c1}.hljs-template-variable,.hljs-variable{color:#d8dee9}.hljs-template-tag{color:#5e81ac}`,
  },
  {
    id: "tokyo-night-dark",
    label: "Tokyo Night",
    dark: true,
    css: `${P}.hljs-comment,.hljs-meta{color:#565f89}.hljs-deletion,.hljs-doctag,.hljs-regexp,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-tag,.hljs-template-tag,.hljs-variable.language_{color:#f7768e}.hljs-link,.hljs-literal,.hljs-number,.hljs-params,.hljs-template-variable,.hljs-type,.hljs-variable{color:#ff9e64}.hljs-attribute,.hljs-built_in{color:#e0af68}.hljs-keyword,.hljs-property,.hljs-subst,.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#7dcfff}.hljs-selector-tag{color:#73daca}.hljs-addition,.hljs-bullet,.hljs-quote,.hljs-string,.hljs-symbol{color:#9ece6a}.hljs-code,.hljs-formula,.hljs-section{color:#7aa2f7}.hljs-attr,.hljs-char.escape_,.hljs-keyword,.hljs-name,.hljs-operator{color:#bb9af7}.hljs-punctuation{color:#c0caf5}.hljs{background:#1a1b26;color:#9aa5ce}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`,
  },
  {
    id: "vs2015",
    label: "VS Dark",
    dark: true,
    css: `${P}.hljs{background:#1e1e1e;color:#dcdcdc}.hljs-keyword,.hljs-literal,.hljs-name,.hljs-symbol{color:#569cd6}.hljs-link{color:#569cd6;text-decoration:underline}.hljs-built_in,.hljs-type{color:#4ec9b0}.hljs-class,.hljs-number{color:#b8d7a3}.hljs-meta .hljs-string,.hljs-string{color:#d69d85}.hljs-regexp,.hljs-template-tag{color:#9a5334}.hljs-formula,.hljs-function,.hljs-params,.hljs-subst,.hljs-title{color:#dcdcdc}.hljs-comment,.hljs-quote{color:#57a64a;font-style:italic}.hljs-doctag{color:#608b4e}.hljs-meta,.hljs-meta .hljs-keyword,.hljs-tag{color:#9b9b9b}.hljs-template-variable,.hljs-variable{color:#bd63c5}.hljs-attr,.hljs-attribute{color:#9cdcfe}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-bullet,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag{color:#d7ba7d}.hljs-addition{background-color:#144212;display:inline-block;width:100%}.hljs-deletion{background-color:#600;display:inline-block;width:100%}`,
  },
];

export const DEFAULT_THEME_ID = "github-dark";

export function getTheme(id: string): HighlightTheme {
  return HIGHLIGHT_THEMES.find((t) => t.id === id) ?? HIGHLIGHT_THEMES[0];
}

/**
 * Prefix every selector in a flat (non-nested, no @media) stylesheet with
 * `scope `. highlight.js theme files are flat, so a brace-split parser is safe.
 */
export function scopeCss(css: string, scope = ".markdown-body"): string {
  return css
    .split("}")
    .filter((chunk) => chunk.includes("{"))
    .map((chunk) => {
      const [selectorPart, ...rest] = chunk.split("{");
      const body = rest.join("{");
      const scopedSelectors = selectorPart
        .split(",")
        .map((s) => `${scope} ${s.trim()}`)
        .join(",");
      return `${scopedSelectors}{${body}}`;
    })
    .join("");
}

export function scopedThemeCss(id: string): string {
  return scopeCss(getTheme(id).css);
}
