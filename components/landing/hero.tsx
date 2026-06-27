import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { PreviewWindow } from "./preview-window";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Tinted radial glow (accent-locked emerald, not an AI-purple blob) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 0%, rgba(16,185,129,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-20 pb-16 lg:grid-cols-[1.05fr_1.1fr] lg:pt-24 lg:pb-24">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <ShieldCheck className="size-3.5" />
            100% on-device. Nothing uploaded.
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Markdown to PDF,
            <br />
            right in your browser.
          </h1>

          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-zinc-400">
            Free, unlimited, and private. Math, diagrams, and code, converted to
            PDF or HTML on your device and never uploaded.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
            >
              Open the app
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
            >
              How it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <PreviewWindow />
        </Reveal>
      </div>
    </section>
  );
}
