import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://markdown2pdf.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Markdown to PDF — Free, Private, No Login",
    template: "%s · Markdown2PDF",
  },
  description:
    "Convert Markdown to PDF or HTML right in your browser. GitHub Flavored Markdown, LaTeX math, Mermaid diagrams, and syntax highlighting. Free, unlimited, no sign-up — your document never leaves your device.",
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
    url: siteUrl,
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
      </body>
    </html>
  );
}
