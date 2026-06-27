import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-zinc-500 sm:flex-row">
        <div className="flex items-center gap-2 font-medium text-zinc-300">
          <span className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-xs text-emerald-400">
            M
          </span>
          Markdown2PDF
        </div>

        <nav className="flex items-center gap-6">
          <a href="#features" className="transition-colors hover:text-zinc-200">
            Features
          </a>
          <a href="#privacy" className="transition-colors hover:text-zinc-200">
            Privacy
          </a>
          <a href="#faq" className="transition-colors hover:text-zinc-200">
            FAQ
          </a>
          <Link href="/contact" className="transition-colors hover:text-zinc-200">
            Contact
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-zinc-200">
            Privacy Policy
          </Link>
          <Link href="/app" className="transition-colors hover:text-zinc-200">
            Open the app
          </Link>
        </nav>

        <p>Built for people who care about privacy.</p>
      </div>
    </footer>
  );
}
