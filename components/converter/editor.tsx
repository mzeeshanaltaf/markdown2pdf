"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onViewReady?: (view: EditorView) => void;
  dark: boolean;
};

/**
 * CodeMirror 6 Markdown editor. Exposes the underlying EditorView so the
 * converter can wire up bi-directional scroll sync against the preview.
 */
export function Editor({ value, onChange, onViewReady, dark }: EditorProps) {
  const extensions = useMemo(
    () => [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      EditorView.lineWrapping,
    ],
    []
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={dark ? "dark" : "light"}
      extensions={extensions}
      height="100%"
      style={{ height: "100%", fontSize: "14px" }}
      onCreateEditor={(view) => onViewReady?.(view)}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: false,
      }}
      placeholder="# Start typing Markdown…&#10;&#10;Paste or upload a .md file. Your document never leaves your browser."
    />
  );
}
