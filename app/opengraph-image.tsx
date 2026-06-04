import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Regex Shuttle — Free Online Regex Tester, Explainer & Cheat Sheet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
            marginBottom: 32,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M20 12 L44 52" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <circle cx="28" cy="32" r="3" fill="white" />
            <path d="M38 26 L38 38 M32 30 L44 34 M32 34 L44 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 22 C50 18 46 14 42 14 C38 14 34 18 34 22 C34 26 38 28 40 30 L40 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="40" cy="40" r="1.5" fill="white" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#14532d",
            letterSpacing: "-0.02em",
          }}
        >
          Regex Shuttle
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#166534",
            marginTop: 16,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          Test &amp; learn regex in your browser — 100% private
        </div>
      </div>
    ),
    { ...size },
  );
}
