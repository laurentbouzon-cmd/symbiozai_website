export const metadata = {
  title: "Privacy Policy - SymbiozAI",
  description: "Politique de confidentialité de SymbiozAI. Découvrez comment nous collectons et utilisons vos données.",
  openGraph: {
    title: "Privacy Policy - SymbiozAI",
    description: "Politique de confidentialité de SymbiozAI.",
    url: "https://symbioz.ai/privacy",
  },
  alternates: {
    canonical: "https://symbioz.ai/privacy",
  },
  robots: {
    index: false,
  },
}

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* En-tête */}
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <a href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "28px", margin: 0 }}>
            Symbioz<span style={{ color: "#1a237e" }}>AI</span>
          </h1>
        </a>
      </header>

      {/* Section principale */}
      <main>
        <section
          style={{
            padding: "40px 20px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              marginBottom: "30px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Privacy Policy
          </h2>

          <div
            style={{
              color: "#333",
              lineHeight: "1.6",
              fontSize: "16px",
            }}
          >
            <p style={{ marginBottom: "20px" }}>Last updated: {currentYear}</p>

            <h3 style={{ fontSize: "22px", marginTop: "30px", marginBottom: "15px" }}>1. Introduction</h3>
            <p style={{ marginBottom: "20px" }}>
              SymbiozAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, and share information about you when you use our website and services.
            </p>

            <h3 style={{ fontSize: "22px", marginTop: "30px", marginBottom: "15px" }}>2. Information We Collect</h3>
            <p style={{ marginBottom: "20px" }}>
              We collect information you provide directly to us, such as when you create an account, subscribe to our
              newsletter, or contact us for support. This information may include your name, email address, and any
              other information you choose to provide.
            </p>

            <h3 style={{ fontSize: "22px", marginTop: "30px", marginBottom: "15px" }}>
              3. How We Use Your Information
            </h3>
            <p style={{ marginBottom: "20px" }}>
              We use the information we collect to provide, maintain, and improve our services, to communicate with you,
              and to comply with legal obligations.
            </p>

            <h3 style={{ fontSize: "22px", marginTop: "30px", marginBottom: "15px" }}>4. Contact Us</h3>
            <p style={{ marginBottom: "20px" }}>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:privacy@symbioz.ai"
                style={{
                  color: "#1a237e",
                  textDecoration: "none",
                  borderBottom: "1px solid #1a237e",
                }}
              >
                privacy@symbioz.ai
              </a>
              .
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#1a237e",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>

      {/* Pied de page */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #eaeaea",
          marginTop: "40px",
          color: "#888",
          fontSize: "14px",
        }}
      >
        <p>&copy; {currentYear} SymbiozAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
