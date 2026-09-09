import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kacha Creatives | Digital Marketing & Creative Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Amber accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#F5A623",
          }}
        />

        {/* Grid lines for texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,166,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#F5A623",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#0A0A0A", fontSize: 28, fontWeight: 900 }}>
              K
            </span>
          </div>
          <span
            style={{ color: "#F5F5F0", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}
          >
            Kacha Creatives
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#F5A623",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Digital Marketing &amp; Creative Solutions
        </div>

        {/* Sub-text */}
        <div
          style={{
            color: "rgba(245,245,240,0.45)",
            fontSize: 16,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Addis Ababa · Branding · Video Production · Social Media · Graphic Design
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "rgba(245,245,240,0.25)",
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          kachacreatives.com
        </div>
      </div>
    ),
    { ...size }
  );
}
