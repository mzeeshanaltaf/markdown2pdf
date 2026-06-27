"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// The converter relies on browser-only APIs (CodeMirror, Mermaid, Paged.js,
// localStorage). Rendering it on the server would cause a hydration mismatch
// and silently dead UI, so we skip SSR for this subtree entirely.
const Converter = dynamic(() => import("@/components/converter/converter"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100dvh] items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

export default function AppPage() {
  return <Converter />;
}
