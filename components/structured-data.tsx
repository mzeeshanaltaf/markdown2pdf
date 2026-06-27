import { FAQS } from "@/components/landing/faq";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Markdown2PDF",
  url: siteUrl,
  description:
    "Convert Markdown to PDF or HTML right in your browser. GitHub Flavored Markdown, LaTeX math, Mermaid diagrams, and syntax highlighting. Free, unlimited, no sign-up — your document never leaves your device.",
  applicationCategory: "Utility",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires a modern web browser with JavaScript enabled.",
  inLanguage: "en",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "GitHub Flavored Markdown",
    "LaTeX math via KaTeX",
    "Mermaid diagrams",
    "Syntax highlighting",
    "PDF export",
    "Standalone HTML export",
    "Runs entirely in the browser",
  ],
  publisher: {
    "@type": "Person",
    name: "Zeeshan Altaf",
    url: "https://www.zeeshanai.cloud",
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Markdown2PDF",
  url: siteUrl,
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [webApplication, website, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
