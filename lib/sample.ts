export const SAMPLE_MARKDOWN = `# Markdown to PDF — Live Demo

A privacy-first converter. **Everything here renders in your browser** — your
document is never uploaded.

## GitHub Flavored Markdown

- [x] Task lists
- [ ] Tables, ~~strikethrough~~, and autolinks → https://example.com
- Footnotes, emoji, and nested lists

| Feature | Supported |
| ------- | :-------: |
| GFM     | ✅ |
| Math    | ✅ |
| Diagrams| ✅ |

> Tip: pick a syntax theme from the toolbar — it travels into your PDF and HTML.

## LaTeX Math

Inline math like $E = mc^2$ and the Euler identity $e^{i\\pi} + 1 = 0$.

A display equation:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}
$$

## Code with Syntax Highlighting

\`\`\`typescript
function greet(name: string): string {
  // Rendered entirely on your device
  return \`Hello, \${name}!\`;
}
console.log(greet("world"));
\`\`\`

## Mermaid Diagram

\`\`\`mermaid
flowchart LR
  A[Write Markdown] --> B{Preview}
  B -->|Looks good| C[Download PDF]
  B -->|Looks good| D[Download HTML]
  C --> E((Done))
  D --> E
\`\`\`

## Sequence Diagram

\`\`\`mermaid
sequenceDiagram
  participant You
  participant Browser
  You->>Browser: Paste Markdown
  Browser-->>You: Live preview
  You->>Browser: Click Download
  Browser-->>You: PDF / HTML (no upload)
\`\`\`

---

Made with privacy in mind. No login. No limits.
`;
