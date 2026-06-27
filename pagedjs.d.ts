declare module "pagedjs" {
  /** Minimal typings for the bits of Paged.js we use in the browser. */
  export class Previewer {
    constructor();
    preview(
      content: HTMLElement | string,
      stylesheets: Array<string | Record<string, string>>,
      renderTo: HTMLElement
    ): Promise<{ total: number; pages: unknown[] }>;
  }
}
