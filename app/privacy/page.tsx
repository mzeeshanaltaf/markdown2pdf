import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Markdown2PDF handles your data: your documents never leave your browser, and we collect as little as possible.",
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "June 27, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 antialiased">
      <Nav />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-zinc-300">
          <section className="space-y-3">
            <p>
              Markdown2PDF is built privacy-first. The short version: the documents
              you convert never leave your device, we have no accounts, and we
              collect the bare minimum needed to keep the site running and improve
              it. This page explains exactly what that means.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">
              Your documents stay on your device
            </h2>
            <p>
              All Markdown parsing, rendering, and conversion to PDF or HTML happens
              entirely in your browser. Your content is never uploaded to a server,
              stored by us, or transmitted over the network. There is no backend
              that ever sees your document.
            </p>
            <p>
              To make the tool convenient, your current draft and your chosen syntax
              theme are saved in your browser&apos;s <strong>localStorage</strong> (under
              the keys <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">md2pdf:draft</code>{" "}
              and{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">md2pdf:syntax-theme</code>).
              This data lives only on your computer, is readable only by this site
              in your browser, and is never sent to us. You can clear it any time
              through your browser&apos;s site-data settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">
              No accounts, no tracking cookies
            </h2>
            <p>
              There is no sign-up, no login, and no advertising. We do not set
              tracking cookies and we do not build profiles of you across the web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">Analytics</h2>
            <p>
              We use Umami, a privacy-first, self-hosted analytics tool, to
              understand aggregate, anonymous usage of the site — for example, how
              many people visit a page. Umami is cookieless: it does not use
              cookies and does not collect personally identifiable information or
              track you across other sites. The data is stored on our own server,
              not shared with a third-party advertising network. It tells us page
              views and high-level visitor counts, nothing about the content you
              convert. You can read more in{" "}
              <a
                href="https://umami.is/docs/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                Umami&apos;s documentation
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">
              The contact form
            </h2>
            <p>
              If you choose to send us a message through the{" "}
              <a
                href="/contact"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                contact form
              </a>
              , we receive the name, email address, and message you submit. We use
              this solely to read and respond to your feedback, bug report, or
              question. To prevent abuse, the form uses a hidden anti-spam field and
              limits how often it can be submitted from a single network address;
              your IP address may be processed transiently for that rate-limiting
              purpose. We do not sell or share this information, and we keep it only
              as long as needed to address your message.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">Hosting</h2>
            <p>
              The site is hosted on our own server (a self-managed VPS). As with
              any web host, the server may process standard technical request data
              (such as IP address and browser type) to serve and secure the site.
              This is inherent to how the web works and is not used by us to
              identify you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">
              Children&apos;s privacy
            </h2>
            <p>
              Markdown2PDF is not directed at children under 13 and we do not
              knowingly collect personal information from them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. When we do, we&apos;ll
              revise the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-100">Contact</h2>
            <p>
              Questions about privacy? Reach out through the{" "}
              <a
                href="/contact"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
