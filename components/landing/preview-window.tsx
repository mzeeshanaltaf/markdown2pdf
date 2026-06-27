import { MARKDOWN_CSS } from "@/lib/styles/markdown-css";
import { scopedThemeCss } from "@/lib/highlight-themes";

/**
 * The hero's product visual. This is a real component preview, not a fake
 * screenshot: the right pane is rendered with the app's actual `.markdown-body`
 * stylesheet and the real GitHub Dark highlight theme (same CSS the converter
 * and the exports use), so what you see is genuinely what the tool produces.
 * Authored as static HTML to keep the landing page light (no editor JS).
 */
const RENDERED = `
<h1>Release Notes</h1>
<p>Convert <strong>Markdown</strong> to a polished document in seconds.</p>
<ul class="contains-task-list">
  <li class="task-list-item"><input type="checkbox" checked disabled> GitHub Flavored Markdown</li>
  <li class="task-list-item"><input type="checkbox" checked disabled> LaTeX math &amp; Mermaid diagrams</li>
  <li class="task-list-item"><input type="checkbox" disabled> Your favourite syntax theme</li>
</ul>
<pre><code class="hljs language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">convert</span>(<span class="hljs-params">md: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> renderInBrowser(md); <span class="hljs-comment">// nothing uploaded</span>
}</code></pre>
`;

const SOURCE = `# Release Notes

Convert **Markdown** to a polished
document in seconds.

- [x] GitHub Flavored Markdown
- [x] LaTeX math & Mermaid diagrams
- [ ] Your favourite syntax theme

\`\`\`ts
export function convert(md: string) {
  return renderInBrowser(md);
}
\`\`\``;

export function PreviewWindow() {
  const css = MARKDOWN_CSS + "\n" + scopedThemeCss("github-dark");
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-emerald-500/5 ring-1 ring-white/5">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950/60 px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-yellow-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-zinc-500">release-notes.md</span>
        <span className="ml-auto rounded-md bg-emerald-500/15 px-2 py-1 font-mono text-[10px] font-medium text-emerald-300">
          Download PDF
        </span>
      </div>

      {/* Split editor / preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <pre className="hidden overflow-hidden border-r border-white/10 p-4 font-mono text-[12.5px] leading-relaxed text-zinc-400 sm:block">
          {SOURCE}
        </pre>
        <div className="bg-white">
          <div
            className="markdown-body p-5 text-[13px]"
            dangerouslySetInnerHTML={{ __html: RENDERED }}
          />
        </div>
      </div>
    </div>
  );
}
