/**
 * Optional draft autosave. Lives entirely in the browser's localStorage — it is
 * never sent anywhere, consistent with the app's "nothing leaves your device"
 * promise. The user can clear it at any time.
 */
const KEY = "md2pdf:draft";
const THEME_KEY = "md2pdf:syntax-theme";

export function loadDraft(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveDraft(value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage full or blocked — ignore, autosave is best-effort */
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function loadSyntaxTheme(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

export function saveSyntaxTheme(id: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, id);
  } catch {
    /* ignore */
  }
}
