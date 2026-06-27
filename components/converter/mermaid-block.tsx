"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;
function ensureMermaid() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "strict",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
  });
  initialized = true;
}

/**
 * Renders a single ```mermaid code block to inline SVG. The SVG lives directly
 * in the DOM, so the live preview, the PDF print container, and the exported
 * HTML all capture the same vector diagram with no extra work. Invalid syntax
 * degrades to a readable error box instead of breaking the whole document.
 */
export function MermaidBlock({ chart }: { chart: string }) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    ensureMermaid();
    const code = chart.trim();
    if (!code) return;

    mermaid
      .render(`mmd-${reactId}`, code)
      .then(({ svg, bindFunctions }) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Invalid Mermaid diagram");
      });

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <div className="mermaid-error">
        <strong>Mermaid diagram error</strong>
        <br />
        {error}
      </div>
    );
  }

  return <div className="mermaid-figure" ref={containerRef} aria-label="Mermaid diagram" />;
}
