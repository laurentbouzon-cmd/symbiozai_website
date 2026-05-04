import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

const content = {
  fr: {
    subtitle: "Le 1er Revenue Brain agentique. MCP by design.",
    tagline: "L'intelligence ultime qui opere votre croissance.",
    badge: "Rejoignez la liste d'attente",
  },
  en: {
    subtitle: "The 1st agentic Revenue Brain. MCP by design.",
    tagline: "The ultimate intelligence driving your growth.",
    badge: "Join the waitlist",
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get("lang") === "en" ? "en" : "fr"
  const title = searchParams.get("title")
  const { subtitle, tagline, badge } = content[lang]

  // If a title is provided, render a blog article OG image
  if (title) {
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

          {/* Logo + name — cube SymbiozAI officiel (charte cos-data) */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="56" height="56" viewBox="40 40 120 130" fill="none">
              <defs>
                <linearGradient id="gradDarkBlogA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#0A0A0A" />
                </linearGradient>
                <linearGradient id="gradDarkBlogB" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0A0A0A" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="gradDarkBlogC" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#050505" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
              <g transform="translate(0, -10)">
                <path d="M 100 50 L 50 80 L 50 140 L 100 170 Z" fill="url(#gradDarkBlogA)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M 100 50 L 150 80 L 150 140 L 100 170 Z" fill="url(#gradDarkBlogB)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.6" />
                <path d="M 100 50 L 50 80 L 100 110 L 150 80 Z" fill="url(#gradDarkBlogC)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.7" />
                <circle cx="100" cy="110" r="11" fill="#0088C2" fillOpacity="0.9" />
                <circle cx="100" cy="110" r="6" fill="#00A8E8" />
              </g>
            </svg>

            <div
              style={{
                display: "flex",
                fontSize: "28px",
                fontWeight: 500,
                color: "#0a0a0a",
                letterSpacing: "-0.5px",
              }}
            >
              <span>Symbioz</span>
              <span style={{ color: "#0088C2" }}>AI</span>
            </div>

            <div
              style={{
                display: "flex",
                marginLeft: "16px",
                padding: "4px 16px",
                borderRadius: "100px",
                border: "1.5px solid rgba(13,71,161,0.3)",
                color: "#0d47a1",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Blog
            </div>
          </div>

          {/* Article title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                color: "#0a0a1e",
                maxWidth: "950px",
              }}
            >
              {title.length > 80 ? `${title.slice(0, 77)}...` : title}
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
              background: "linear-gradient(90deg, #0d47a1 0%, #00e5ff 100%)",
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

  // Default homepage OG image
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

        {/* Logo + name — cube SymbiozAI officiel (charte cos-data) */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Cube 3-facettes : reproduit logo_horizontal_color.svg
             (gradients foncés + arêtes cyan #0088C2 + centre cyan).
             viewBox cropped à la zone du cube (x:40-160, y:40-170). */}
          <svg width="64" height="64" viewBox="40 40 120 130" fill="none">
            <defs>
              <linearGradient id="gradDarkA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
              <linearGradient id="gradDarkB" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0A0A0A" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="gradDarkC" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#050505" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <g transform="translate(0, -10)">
              <path d="M 100 50 L 50 80 L 50 140 L 100 170 Z" fill="url(#gradDarkA)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.5" />
              <path d="M 100 50 L 150 80 L 150 140 L 100 170 Z" fill="url(#gradDarkB)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M 100 50 L 50 80 L 100 110 L 150 80 Z" fill="url(#gradDarkC)" stroke="#0088C2" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.7" />
              <circle cx="100" cy="110" r="11" fill="#0088C2" fillOpacity="0.9" />
              <circle cx="100" cy="110" r="6" fill="#00A8E8" />
            </g>
          </svg>

          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: 500,
              color: "#0a0a0a",
              letterSpacing: "-0.5px",
            }}
          >
            <span>Symbioz</span>
            <span style={{ color: "#0088C2" }}>AI</span>
          </div>
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
                  "linear-gradient(135deg, #0d47a1 0%, #00e5ff 100%)",
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
                color: "#0d47a1",
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
            background: "linear-gradient(90deg, #0d47a1 0%, #00e5ff 100%)",
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
