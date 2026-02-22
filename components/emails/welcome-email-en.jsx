export const WelcomeEmailEn = ({ email }) => {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        color: "#333333",
      }}
    >
      {/* Header with gradient */}
      <div
        style={{
          background: "linear-gradient(90deg, #1a237e 0%, #0d47a1 50%, #00e5ff 100%)",
          padding: "40px 20px",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          Symbioz
          <span
            style={{
              background: "linear-gradient(90deg, #1a237e 0%, #0d47a1 50%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
              display: "inline-block",
            }}
          >
            AI
          </span>
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "300",
          }}
        >
          A new way to build. Together.
        </p>
      </div>

      {/* Main content */}
      <div style={{ padding: "40px 30px", backgroundColor: "#ffffff" }}>
        <h2
          style={{
            color: "#1a237e",
            marginTop: 0,
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "25px",
          }}
        >
          Welcome to the SymbiozAI journey!
        </h2>

        <p
          style={{
            color: "#555555",
            lineHeight: "1.6",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          We're thrilled to welcome you to our community with your email{" "}
          <strong style={{ color: "#1a237e" }}>{email}</strong>.
        </p>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderLeft: "4px solid #00e5ff",
            padding: "20px",
            borderRadius: "0 8px 8px 0",
            margin: "30px 0",
          }}
        >
          <p
            style={{
              color: "#333333",
              lineHeight: "1.6",
              fontSize: "16px",
              margin: 0,
            }}
          >
            <strong>SymbiozAI</strong> creates best-in-class AI employees built to outperform the best human teams. Our
            mission is to transform how businesses integrate artificial intelligence into their workflow.
          </p>
        </div>

        <p
          style={{
            color: "#555555",
            lineHeight: "1.6",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          You're now among the first to be informed about our progress. We'll reach out as soon as our platform is ready
          for launch.
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <a
            href="https://symbioz.ai"
            style={{
              backgroundColor: "#1a237e",
              color: "white",
              padding: "14px 28px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "16px",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(26, 35, 126, 0.2)",
            }}
          >
            Learn More
          </a>
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px 0",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#1a237e",
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Integrated
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Directly into your favorite tools
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#1a237e",
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Distributed
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Accessible anywhere, anytime
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#1a237e",
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              No Onboarding
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Ready to use in seconds
            </p>
          </div>
        </div>

        {/* Closing message */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              color: "#777777",
              fontSize: "14px",
              margin: 0,
            }}
          >
            We can't wait to show you what we're building.
          </p>
          <p
            style={{
              color: "#777777",
              fontSize: "14px",
              margin: "10px 0 0 0",
            }}
          >
            The SymbiozAI Team
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#1a237e",
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.8)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>&copy; {new Date().getFullYear()} SymbiozAI. All rights reserved.</p>
        <p style={{ margin: "10px 0 0 0", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
          If you didn't request to join our waitlist, you can safely ignore this email.
        </p>
      </div>
    </div>
  )
}
