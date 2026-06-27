import type { EditorView } from "@codemirror/view";

type Marker = { line: number; top: number };

/**
 * Bi-directional scroll sync between the CodeMirror editor and the preview.
 *
 * Mapping is anchored on the `data-source-line` attributes that
 * `rehypeSourceLine` stamps onto preview blocks: we interpolate a scroll
 * position between the two nearest anchors. Feedback loops are avoided by only
 * letting the pane the user is actively pointing at drive the other one.
 */
export function createScrollSync(view: EditorView, preview: HTMLElement) {
  let active: "editor" | "preview" | null = null;
  let ticking = false;
  const editorScroller = view.scrollDOM;

  function markers(): Marker[] {
    return Array.from(preview.querySelectorAll<HTMLElement>("[data-source-line]"))
      .map((el) => ({
        line: Number(el.getAttribute("data-source-line")),
        top: el.offsetTop,
      }))
      .filter((m) => Number.isFinite(m.line))
      .sort((a, b) => a.line - b.line);
  }

  function editorTopLine(): number {
    const scrollTop = editorScroller.scrollTop;
    const block = view.lineBlockAtHeight(scrollTop);
    const lineObj = view.state.doc.lineAt(block.from);
    const frac = block.height > 0 ? (scrollTop - block.top) / block.height : 0;
    return lineObj.number + Math.min(1, Math.max(0, frac));
  }

  function syncFromEditor() {
    const ms = markers();
    if (ms.length === 0) return;
    const line = editorTopLine();
    let lo = ms[0];
    let hi = ms[ms.length - 1];
    for (const m of ms) {
      if (m.line <= line) lo = m;
      if (m.line >= line) {
        hi = m;
        break;
      }
    }
    const t = hi.line === lo.line ? 0 : (line - lo.line) / (hi.line - lo.line);
    preview.scrollTop = lo.top + t * (hi.top - lo.top);
  }

  function syncFromPreview() {
    const ms = markers();
    if (ms.length === 0) return;
    const scrollTop = preview.scrollTop;
    let lo = ms[0];
    let hi = ms[ms.length - 1];
    for (const m of ms) {
      if (m.top <= scrollTop) lo = m;
      if (m.top >= scrollTop) {
        hi = m;
        break;
      }
    }
    const t = hi.top === lo.top ? 0 : (scrollTop - lo.top) / (hi.top - lo.top);
    const rawLine = lo.line + t * (hi.line - lo.line);
    const lineNum = Math.min(view.state.doc.lines, Math.max(1, Math.round(rawLine)));
    const pos = view.state.doc.line(lineNum).from;
    editorScroller.scrollTop = view.lineBlockAt(pos).top;
  }

  function schedule(fn: () => void) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      fn();
    });
  }

  const onEditorScroll = () => active === "editor" && schedule(syncFromEditor);
  const onPreviewScroll = () => active === "preview" && schedule(syncFromPreview);
  const setEditorActive = () => (active = "editor");
  const setPreviewActive = () => (active = "preview");

  editorScroller.addEventListener("scroll", onEditorScroll, { passive: true });
  preview.addEventListener("scroll", onPreviewScroll, { passive: true });

  // Mark the pane that initiated scrolling so it drives the other without a
  // feedback loop. Cover every input route, not just the mouse pointer:
  // `pointerenter`/`wheel` for mouse + touch, `focusin` for keyboard scrolling
  // inside the editor (PageDown etc.).
  const editorActivators = ["pointerenter", "wheel", "focusin"] as const;
  editorActivators.forEach((t) =>
    editorScroller.addEventListener(t, setEditorActive, { passive: true })
  );
  const previewActivators = ["pointerenter", "wheel"] as const;
  previewActivators.forEach((t) =>
    preview.addEventListener(t, setPreviewActive, { passive: true })
  );

  return () => {
    editorScroller.removeEventListener("scroll", onEditorScroll);
    preview.removeEventListener("scroll", onPreviewScroll);
    editorActivators.forEach((t) =>
      editorScroller.removeEventListener(t, setEditorActive)
    );
    previewActivators.forEach((t) =>
      preview.removeEventListener(t, setPreviewActive)
    );
  };
}
