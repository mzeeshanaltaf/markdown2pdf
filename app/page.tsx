import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Privacy } from "@/components/landing/privacy";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

// The landing page is locked to a single dark theme via explicit zinc classes,
// independent of the app's light/dark toggle on /app.
export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 antialiased">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Privacy />
        <HowItWorks />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
