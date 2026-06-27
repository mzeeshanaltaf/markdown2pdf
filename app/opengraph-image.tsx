import { ImageResponse } from "next/og";

export const alt = "Markdown2PDF — Convert Markdown to PDF, free and private";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#09090b",
          backgroundImage:
            "radial-gradient(60% 60% at 75% 0%, rgba(16,185,129,0.18), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 700,
              color: "#022c22",
            }}
          >
            M
          </div>
          <div style={{ fontSize: "30px", color: "#a1a1aa", fontWeight: 600 }}>
            Markdown2PDF
          </div>
        </div>

        <div
          style={{
            marginTop: "44px",
            fontSize: "78px",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#fafafa",
            letterSpacing: "-0.03em",
          }}
        >
          Markdown to PDF,
        </div>
        <div
          style={{
            fontSize: "78px",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#34d399",
            letterSpacing: "-0.03em",
          }}
        >
          right in your browser.
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "32px",
            color: "#a1a1aa",
            maxWidth: "900px",
          }}
        >
          Free, unlimited, and private. Math, diagrams, and code — converted on
          your device and never uploaded.
        </div>

        <div style={{ display: "flex", marginTop: "48px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#10b981",
              color: "#022c22",
              fontSize: "30px",
              fontWeight: 600,
              padding: "16px 36px",
              borderRadius: "12px",
            }}
          >
            Convert your Markdown free →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
