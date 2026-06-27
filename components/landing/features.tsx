import {
  Columns2,
  GitBranch,
  Sigma,
  Workflow,
  Palette,
  PencilLine,
  FileOutput,
} from "lucide-react";
import { Reveal } from "./reveal";

const SWATCHES = ["#7ee787", "#79c0ff", "#ff7b72", "#d2a8ff", "#ffa657"];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
          Everything in the box
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          A full Markdown toolkit, not a stripped-down converter.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6">
        {/* Large feature */}
        <Reveal className="sm:col-span-4">
          <article className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-8 flex gap-1.5">
              <div className="h-16 flex-1 rounded-lg border border-white/10 bg-zinc-800/50" />
              <div className="h-16 flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06]" />
            </div>
            <div>
              <Columns2 className="size-5 text-emerald-400" />
              <h3 className="mt-3 text-lg font-medium text-zinc-100">
                Real-time preview with scroll sync
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Edit on the left, watch the rendered result on the right. Both
                panes stay locked together as you scroll.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Syntax colors with swatches */}
        <Reveal className="sm:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6">
            <div className="flex gap-1.5">
              {SWATCHES.map((c) => (
                <span
                  key={c}
                  className="size-6 rounded-full ring-1 ring-white/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="mt-8">
              <Palette className="size-5 text-emerald-400" />
              <h3 className="mt-3 text-lg font-medium text-zinc-100">
                Customizable syntax colors
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Eight code themes. The one you pick travels into your PDF and
                HTML.
              </p>
            </div>
          </article>
        </Reveal>

        <FeatureCard
          className="sm:col-span-2"
          icon={<GitBranch className="size-5 text-emerald-400" />}
          title="GitHub Flavored Markdown"
          body="Tables, task lists, strikethrough, footnotes, and autolinks, exactly as GitHub renders them."
        />

        {/* LaTeX with formula */}
        <Reveal className="sm:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <code className="font-mono text-sm text-zinc-300">
              e<sup className="text-emerald-400">iπ</sup> + 1 = 0
            </code>
            <div className="mt-8">
              <Sigma className="size-5 text-emerald-400" />
              <h3 className="mt-3 text-lg font-medium text-zinc-100">
                LaTeX math
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Inline and display equations rendered with KaTeX, crisp at any
                zoom.
              </p>
            </div>
          </article>
        </Reveal>

        <FeatureCard
          className="sm:col-span-2"
          icon={<Workflow className="size-5 text-emerald-400" />}
          title="Mermaid diagrams"
          body="Flowcharts, sequence and class diagrams, and UML, rendered as crisp vector graphics."
        />

        <FeatureCard
          className="sm:col-span-3"
          icon={<PencilLine className="size-5 text-emerald-400" />}
          title="Rich Markdown editor"
          body="A fast CodeMirror editor with Markdown-aware highlighting, line numbers, and soft wrapping."
        />

        <FeatureCard
          className="sm:col-span-3"
          icon={<FileOutput className="size-5 text-emerald-400" />}
          title="PDF and HTML export"
          body="Download a paginated PDF, or a single self-contained HTML file that works offline."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  className,
  icon,
  title,
  body,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Reveal className={className}>
      <article className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-6">
        {icon}
        <h3 className="mt-3 text-lg font-medium text-zinc-100">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{body}</p>
      </article>
    </Reveal>
  );
}
