import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          borderRadius: "24px",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
          {/* Forward slash */}
          <path d="M20 12 L44 52" stroke="white" strokeWidth="4" strokeLinecap="round" />
          {/* Dot */}
          <circle cx="28" cy="32" r="3" fill="white" />
          {/* Asterisk star */}
          <path d="M38 26 L38 38 M32 30 L44 34 M32 34 L44 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          {/* Question mark curve */}
          <path d="M50 22 C50 18 46 14 42 14 C38 14 34 18 34 22 C34 26 38 28 40 30 L40 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="40" r="1.5" fill="white" />
        </svg>
      </div>
    ),
    { width: 192, height: 192 },
  );
}
