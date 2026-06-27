import type { Metadata } from "next";
import { ConverterShell } from "@/components/converter/converter-shell";

export const metadata: Metadata = {
  title: "Markdown to PDF Converter",
  description:
    "Open the free Markdown to PDF & HTML converter. Write or paste Markdown with GitHub Flavored Markdown, LaTeX math, Mermaid diagrams, and syntax highlighting — everything runs in your browser, nothing is uploaded.",
  alternates: {
    canonical: "/app",
  },
};

export default function AppPage() {
  return <ConverterShell />;
}
