import type { Metadata } from "next";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact & Feedback",
  description:
    "Share feedback, report a bug, or suggest a feature for Markdown2PDF.",
};

const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please fill in all fields.",
  email: "Please enter a valid email address.",
  length: "Message must be 5000 characters or fewer.",
  rate: "Too many submissions. Please try again later.",
  server: "Service is temporarily unavailable. Please try again later.",
  parse: "Invalid submission. Please try again.",
};

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const initialError = error
    ? ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."
    : undefined;

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 antialiased">
      <Nav />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact & Feedback
          </h1>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Found a bug, have an idea, or just want to say hi? Send us a message — we
            read everything.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <ContactForm initialSuccess={!!sent} initialError={initialError} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
