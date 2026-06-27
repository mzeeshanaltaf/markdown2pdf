import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * rehype plugin: stamp `data-source-line` (1-based) onto every top-level block
 * element, taken from the original Markdown position that remark preserves on
 * the hast nodes. The scroll-sync utility reads these to map editor lines to
 * preview offsets. Only top-level blocks are tagged to keep the map small and
 * the sync smooth.
 */
export function rehypeSourceLine() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, _index, parent) => {
      if (!parent || (parent as { type?: string }).type !== "root") return;
      const line = node.position?.start?.line;
      if (typeof line === "number") {
        node.properties = node.properties ?? {};
        node.properties["dataSourceLine"] = line;
      }
    });
  };
}
