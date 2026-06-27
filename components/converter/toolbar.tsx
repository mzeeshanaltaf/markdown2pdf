"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  FileDown,
  FileCode2,
  Palette,
  Sun,
  Moon,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { HIGHLIGHT_THEMES } from "@/lib/highlight-themes";
import { PdfOptionsPopover } from "./pdf-options";
import type { PdfOptions } from "@/lib/pdf/print-styles";

type ToolbarProps = {
  syntaxTheme: string;
  onSyntaxThemeChange: (id: string) => void;
  pdfOptions: PdfOptions;
  onPdfOptionsChange: (next: PdfOptions) => void;
  onUpload: (file: File) => void;
  onLoadSample: () => void;
  onClear: () => void;
  onDownloadPdf: () => void;
  onDownloadHtml: () => void;
  exporting: boolean;
};

export function Toolbar(props: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-background/80 px-3 py-2 backdrop-blur">
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/"
              aria-label="Markdown2PDF home"
              className="flex items-center gap-2 rounded-md font-semibold text-foreground transition-opacity hover:opacity-80"
            />
          }
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-sm text-emerald-500">
            M
          </span>
          <span className="hidden sm:inline">Markdown2PDF</span>
        </TooltipTrigger>
        <TooltipContent>Back to home</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.mdx,.txt,text/markdown"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) props.onUpload(file);
          e.target.value = "";
        }}
      />

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="size-4" />
        <span className="hidden sm:inline">Upload</span>
      </Button>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={props.onLoadSample}
            />
          }
        >
          <FileText className="size-4" />
          <span className="hidden sm:inline">Sample</span>
        </TooltipTrigger>
        <TooltipContent>
          Load a sample document showcasing the supported Markdown features
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={props.onClear}
              aria-label="Clear document"
            />
          }
        >
          <Trash2 className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Clear document</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />

      <Tooltip>
        <TooltipTrigger
          render={<div className="hidden items-center gap-2 md:flex" />}
        >
          <Palette className="size-4 text-muted-foreground" />
          <Select
            value={props.syntaxTheme}
            onValueChange={(v) => v && props.onSyntaxThemeChange(v)}
          >
            <SelectTrigger size="sm" className="w-[150px]" aria-label="Code syntax highlighting theme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HIGHLIGHT_THEMES.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TooltipTrigger>
        <TooltipContent>
          Syntax-highlighting theme for fenced code blocks (no effect if the
          document has no code)
        </TooltipContent>
      </Tooltip>

      <div className="ml-auto flex items-center gap-2">
        <PdfOptionsPopover options={props.pdfOptions} onChange={props.onPdfOptionsChange} />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button size="sm" className="gap-2" disabled={props.exporting} />}
          >
            {props.exporting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Download
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={props.onDownloadPdf} className="gap-2">
              <FileDown className="size-4" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={props.onDownloadHtml} className="gap-2">
              <FileCode2 className="size-4" />
              Download HTML
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Contact & feedback"
                nativeButton={false}
                render={<Link href="/contact" />}
              />
            }
          >
            <MessageSquare className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Contact &amp; feedback</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              />
            }
          >
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
          </TooltipTrigger>
          <TooltipContent>Toggle light / dark</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
