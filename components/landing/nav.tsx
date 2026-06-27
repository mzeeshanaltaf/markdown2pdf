import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-100">
          <span className="flex size-7 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-sm text-emerald-400">
            M
          </span>
          Markdown2PDF
        </Link>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-zinc-100">
            Features
          </a>
          <a href="#privacy" className="transition-colors hover:text-zinc-100">
            Privacy
          </a>
          <a href="#how" className="transition-colors hover:text-zinc-100">
            How it works
          </a>
          <a href="#faq" className="transition-colors hover:text-zinc-100">
            FAQ
          </a>
        </div>

        <Link
          href="/app"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
        >
          Open the app
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}
