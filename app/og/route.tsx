import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const content = {
  fr: {
    subtitle: "Le 1er CRM AI-Natif Européen.",
    tagline: "L'intelligence ultime qui opère votre croissance.",
    badge: "Rejoignez la liste d'attente",
  },
  en: {
    subtitle: "The 1st European AI-Native CRM.",
    tagline: "The ultimate intelligence driving your growth.",
    badge: "Join the waitlist",
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get("lang") === "en" ? "en" : "fr"
  const { subtitle, tagline, badge } = content[lang]

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(#cceeff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          padding: "64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient overlay top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "400px",
            background:
              "radial-gradient(ellipse at top right, rgba(0,229,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Cube icon */}
          <svg width="48" height="48" viewBox="0 0 180 180" fill="none">
            <rect width="180" height="180" rx="37" fill="#0a0a0a" />
            <path
              d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
              fill="white"
            />
            <path
              d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
              fill="white"
            />
          </svg>

          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-0.5px",
            }}
          >
            SymbiozAI
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          {/* Gradient headline */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "#0a0a1e",
              marginBottom: "20px",
              maxWidth: "860px",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              fontSize: "26px",
              fontWeight: 400,
              color: "#4a5568",
              maxWidth: "720px",
              lineHeight: 1.4,
              marginBottom: "40px",
            }}
          >
            {tagline}
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                borderRadius: "100px",
                background:
                  "linear-gradient(135deg, #1a237e 0%, #00e5ff 100%)",
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {badge}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                borderRadius: "100px",
                border: "1.5px solid rgba(0,229,255,0.5)",
                color: "#1a237e",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              symbioz.ai
            </div>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "linear-gradient(90deg, #1a237e 0%, #00e5ff 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
