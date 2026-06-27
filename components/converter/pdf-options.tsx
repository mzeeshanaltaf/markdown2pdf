"use client";

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type PdfOptions,
  type PageSize,
  type Orientation,
  type MarginPreset,
  MAX_CUSTOM_MARGIN_MM,
} from "@/lib/pdf/print-styles";

export function PdfOptionsPopover({
  options,
  onChange,
}: {
  options: PdfOptions;
  onChange: (next: PdfOptions) => void;
}) {
  const set = <K extends keyof PdfOptions>(key: K, value: PdfOptions[K]) =>
    onChange({ ...options, [key]: value });

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" className="gap-2" />}>
        <Settings2 className="size-4" />
        <span className="hidden sm:inline">PDF options</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">PDF options</h4>
          <p className="text-xs text-muted-foreground">
            Applied when you download a PDF.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Page size</Label>
            <Select
              value={options.pageSize}
              onValueChange={(v) => v && set("pageSize", v as PageSize)}
            >
              <SelectTrigger size="sm" className="w-full" aria-label="Page size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="Letter">Letter</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Orientation</Label>
            <Select
              value={options.orientation}
              onValueChange={(v) => v && set("orientation", v as Orientation)}
            >
              <SelectTrigger size="sm" className="w-full" aria-label="Orientation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Margins</Label>
          <div className="flex gap-2">
            <Select
              value={options.marginPreset}
              onValueChange={(v) => v && set("marginPreset", v as MarginPreset)}
            >
              <SelectTrigger size="sm" className="w-full" aria-label="Margins">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="narrow">Narrow (12mm)</SelectItem>
                <SelectItem value="normal">Normal (20mm)</SelectItem>
                <SelectItem value="wide">Wide (30mm)</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {options.marginPreset === "custom" && (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  min={0}
                  max={MAX_CUSTOM_MARGIN_MM}
                  step={1}
                  value={options.customMarginMm}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    const clamped = Number.isFinite(n)
                      ? Math.min(MAX_CUSTOM_MARGIN_MM, Math.max(0, n))
                      : 0;
                    set("customMarginMm", clamped);
                  }}
                  aria-label="Custom margin in millimeters"
                  className="h-8 w-16"
                />
                <span className="text-xs text-muted-foreground">mm</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="page-numbers" className="text-xs">
            Page numbers
          </Label>
          <Switch
            id="page-numbers"
            checked={options.pageNumbers}
            onCheckedChange={(v) => set("pageNumbers", v)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="header-text" className="text-xs">
            Header text
          </Label>
          <Input
            id="header-text"
            placeholder="Optional — top of every page"
            value={options.headerText}
            onChange={(e) => set("headerText", e.target.value)}
            className="h-8"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="footer-text" className="text-xs">
            Footer text
          </Label>
          <Input
            id="footer-text"
            placeholder="Optional — bottom of every page"
            value={options.footerText}
            onChange={(e) => set("footerText", e.target.value)}
            className="h-8"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
