import { ServerOff, UserX, Infinity as InfinityIcon } from "lucide-react";
import { Reveal } from "./reveal";

const POINTS = [
  {
    icon: ServerOff,
    title: "No servers touch your text",
    body: "Rendering and PDF generation run in your browser with Paged.js. There is no upload step and no backend that sees your document.",
  },
  {
    icon: UserX,
    title: "No account, no tracking",
    body: "There is no login and no analytics watching what you write. Optional autosave stays in your own browser storage.",
  },
  {
    icon: InfinityIcon,
    title: "Free and unlimited",
    body: "Convert as many documents as you like, as often as you like. No paywalls, no daily caps, no watermarks.",
  },
];

export function Privacy() {
  return (
    <section id="privacy" className="border-y border-emerald-500/15 bg-emerald-500/[0.04]">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Privacy is the whole point.
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            Most converters ask you to upload your file or sign in first. This
            one never asks, because it never needs to.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full bg-zinc-950 p-6">
                <Icon className="size-6 text-emerald-400" />
                <h3 className="mt-4 font-medium text-zinc-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
