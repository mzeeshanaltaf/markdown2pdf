"use client";

import { forwardRef, isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { rehypeSourceLine } from "@/lib/markdown/source-line";
import { MermaidBlock } from "./mermaid-block";

const remarkPlugins = [remarkGfm, remarkMath];
// rehype-katex keeps its default `htmlAndMathml` output: the HTML powers the
// pretty preview/PDF (KaTeX CSS is loaded in the app), and the MathML twin lets
// the exported standalone HTML render math natively with no fonts.
const rehypePlugins = [
  rehypeKatex,
  [rehypeHighlight, { ignoreMissing: true, detect: false }],
  rehypeSourceLine,
] as const;

/** Flatten React children of a code block down to its raw text. */
function toText(children: ReactNode): string {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(toText).join("");
  if (isValidElement(children)) {
    return toText((children.props as { children?: ReactNode }).children);
  }
  return "";
}

export const MarkdownRenderer = forwardRef<HTMLDivElement, { source: string }>(
  function MarkdownRenderer({ source }, ref) {
    return (
      <div ref={ref} className="markdown-body">
        <Markdown
          remarkPlugins={remarkPlugins}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rehypePlugins={rehypePlugins as any}
          components={{
            // Intercept ```mermaid blocks and render them as inline SVG instead
            // of a normal highlighted code block.
            pre({ children, ...rest }) {
              const codeEl = Array.isArray(children) ? children[0] : children;
              const className =
                (isValidElement(codeEl) &&
                  (codeEl.props as { className?: string }).className) ||
                "";
              if (/\blanguage-mermaid\b/.test(className)) {
                const chart = isValidElement(codeEl)
                  ? toText((codeEl.props as { children?: ReactNode }).children)
                  : "";
                return <MermaidBlock chart={chart} />;
              }
              return <pre {...rest}>{children}</pre>;
            },
          }}
        >
          {source}
        </Markdown>
      </div>
    );
  }
);
