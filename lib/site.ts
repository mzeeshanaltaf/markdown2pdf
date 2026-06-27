const FALLBACK_SITE_URL = "https://markdown2pdf.zeeshanai.cloud";

// Canonical origin for the site, used by metadata, canonical tags, the sitemap,
// robots.txt, and JSON-LD. Override per-environment with NEXT_PUBLIC_SITE_URL
// (no trailing slash). Falls back to the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");
