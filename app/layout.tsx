import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Markdown to PDF — Free, Private, No Login",
    template: "%s · Markdown2PDF",
  },
  description:
    "Free, private Markdown to PDF & HTML converter with LaTeX math, Mermaid diagrams, and syntax highlighting — all in your browser, nothing uploaded.",
  keywords: [
    "markdown to pdf",
    "markdown to html",
    "free markdown converter",
    "latex math pdf",
    "mermaid diagram pdf",
    "privacy",
    "no login",
  ],
  openGraph: {
    title: "Markdown to PDF — Free, Private, No Login",
    description:
      "Convert Markdown to PDF or HTML in your browser. GFM, LaTeX math, Mermaid diagrams. Free, unlimited, nothing uploaded.",
    url: SITE_URL,
    siteName: "Markdown2PDF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF — Free, Private, No Login",
    description:
      "Convert Markdown to PDF or HTML in your browser. Nothing leaves your device.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
