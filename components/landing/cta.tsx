import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(16,185,129,0.15), transparent 70%)",
            }}
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Convert your first document right now.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            No sign-up screen, no upload bar. Just open the editor and start
            writing.
          </p>
          <Link
            href="/app"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
          >
            Open the app
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
