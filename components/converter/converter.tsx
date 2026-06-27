"use client";

import "katex/dist/katex.min.css";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EditorView } from "@codemirror/view";
import { toast } from "sonner";

import { Editor } from "./editor";
import { MarkdownRenderer } from "./markdown-renderer";
import { Toolbar } from "./toolbar";
import { MARKDOWN_CSS } from "@/lib/styles/markdown-css";
import { scopedThemeCss, DEFAULT_THEME_ID } from "@/lib/highlight-themes";
import { createScrollSync } from "@/lib/scroll-sync";
import { generatePdf } from "@/lib/pdf/generate";
import { exportHtml } from "@/lib/html/export";
import { DEFAULT_PDF_OPTIONS, type PdfOptions } from "@/lib/pdf/print-styles";
import { SAMPLE_MARKDOWN } from "@/lib/sample";
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadSyntaxTheme,
  saveSyntaxTheme,
} from "@/lib/storage";

function deriveTitle(source: string, fallback: string): string {
  const m = source.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

export default function Converter() {
  const [source, setSource] = useState<string>(() => loadDraft() ?? SAMPLE_MARKDOWN);
  const [syntaxTheme, setSyntaxTheme] = useState<string>(
    () => loadSyntaxTheme() ?? DEFAULT_THEME_ID
  );
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(DEFAULT_PDF_OPTIONS);
  const [exporting, setExporting] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [fileTitle, setFileTitle] = useState<string>("document");

  const scrollRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Persist the scoped Markdown + syntax-theme CSS into the page so the live
  // preview matches the PDF and HTML exports exactly.
  const previewCss = MARKDOWN_CSS + "\n" + scopedThemeCss(syntaxTheme);

  // Debounced local-only autosave.
  useEffect(() => {
    const id = window.setTimeout(() => saveDraft(source), 500);
    return () => window.clearTimeout(id);
  }, [source]);

  useEffect(() => saveSyntaxTheme(syntaxTheme), [syntaxTheme]);

  // Wire up bi-directional scroll sync once the editor view exists.
  const [viewReady, setViewReady] = useState(false);
  useEffect(() => {
    if (!viewReady || !viewRef.current || !scrollRef.current) return;
    return createScrollSync(viewRef.current, scrollRef.current);
  }, [viewReady]);

  const onViewReady = useCallback((view: EditorView) => {
    viewRef.current = view;
    setViewReady(true);
  }, []);

  const handleUpload = useCallback((file: File) => {
    file
      .text()
      .then((text) => {
        setSource(text);
        setFileTitle(file.name.replace(/\.(md|markdown|mdx|txt)$/i, ""));
        toast.success(`Loaded ${file.name}`);
      })
      .catch(() => toast.error("Could not read that file"));
  }, []);

  const handleLoadSample = useCallback(() => {
    setSource(SAMPLE_MARKDOWN);
    setFileTitle("markdown-to-pdf-demo");
  }, []);

  const handleClear = useCallback(() => {
    setSource("");
    setFileTitle("document");
    clearDraft();
  }, []);

  const title = deriveTitle(source, fileTitle);

  const handleDownloadPdf = useCallback(async () => {
    if (!bodyRef.current || !source.trim()) {
      toast.error("Nothing to export yet");
      return;
    }
    setExporting(true);
    try {
      await generatePdf(bodyRef.current.innerHTML, syntaxTheme, pdfOptions);
    } catch {
      toast.error("PDF generation failed. Please try again.");
    } finally {
      setExporting(false);
    }
  }, [source, syntaxTheme, pdfOptions]);

  const handleDownloadHtml = useCallback(() => {
    if (!bodyRef.current || !source.trim()) {
      toast.error("Nothing to export yet");
      return;
    }
    try {
      exportHtml(bodyRef.current.innerHTML, syntaxTheme, title);
      toast.success("HTML downloaded");
    } catch {
      toast.error("HTML export failed. Please try again.");
    }
  }, [source, syntaxTheme, title]);

  return (
    <div className="flex h-[100dvh] flex-col">
      <style dangerouslySetInnerHTML={{ __html: previewCss }} />

      <Toolbar
        syntaxTheme={syntaxTheme}
        onSyntaxThemeChange={setSyntaxTheme}
        pdfOptions={pdfOptions}
        onPdfOptionsChange={setPdfOptions}
        onUpload={handleUpload}
        onLoadSample={handleLoadSample}
        onClear={handleClear}
        onDownloadPdf={handleDownloadPdf}
        onDownloadHtml={handleDownloadHtml}
        exporting={exporting}
      />

      {/* Mobile pane switcher */}
      <div className="flex border-b md:hidden">
        {(["editor", "preview"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
              mobileTab === tab
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 md:grid-cols-2">
        {/* Editor */}
        <section
          className={`min-h-0 overflow-hidden border-r ${
            mobileTab === "editor" ? "flex" : "hidden"
          } flex-col md:flex`}
        >
          <Editor
            value={source}
            onChange={setSource}
            onViewReady={onViewReady}
            dark
          />
        </section>

        {/* Preview */}
        <section
          ref={scrollRef}
          className={`relative min-h-0 overflow-auto bg-white ${
            mobileTab === "preview" ? "block" : "hidden"
          } md:block`}
        >
          <div className="mx-auto max-w-[820px] px-6 py-8 md:px-10 md:py-12">
            {source.trim() ? (
              <MarkdownRenderer ref={bodyRef} source={source} />
            ) : (
              <div className="markdown-body" ref={bodyRef}>
                <p className="text-neutral-400">
                  Your preview will appear here. Start typing, paste Markdown, or
                  upload a <code>.md</code> file.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
