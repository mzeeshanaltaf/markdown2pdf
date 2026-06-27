import { Reveal } from "./reveal";

const STEPS = [
  {
    label: "Write",
    body: "Paste Markdown, upload a .md file, or start typing. The live preview updates as you go.",
  },
  {
    label: "Style",
    body: "Pick a syntax theme and set page size, margins, headers, and page numbers for your PDF.",
  },
  {
    label: "Download",
    body: "Export a paginated PDF or a self-contained HTML file. Everything happens on your device.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          From Markdown to document in three moves.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.label} delay={i * 0.1}>
            <div className="border-t border-white/15 pt-5">
              <span className="font-mono text-sm text-emerald-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-medium text-zinc-100">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
