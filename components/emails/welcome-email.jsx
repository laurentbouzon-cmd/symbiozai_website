export const WelcomeEmail = ({ email }) => {
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
      {/* Header avec dégradé */}
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
          Une nouvelle façon de construire. Ensemble.
        </p>
      </div>

      {/* Contenu principal */}
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
          Bienvenue dans l'aventure SymbiozAI !
        </h2>

        <p
          style={{
            color: "#555555",
            lineHeight: "1.6",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          Nous sommes ravis de vous accueillir dans notre communauté avec votre adresse{" "}
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
            <strong>SymbiozAI</strong> crée des employés IA conçus pour surpasser les meilleures équipes humaines. Notre
            mission est de transformer la façon dont les entreprises intègrent l'intelligence artificielle dans leur
            flux de travail.
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
          Vous faites désormais partie des premiers à être informés de nos avancées. Nous vous contacterons dès que
          notre plateforme sera prête pour le lancement.
        </p>

        {/* Bouton CTA */}
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
            En savoir plus
          </a>
        </div>

        {/* Caractéristiques */}
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
              Intégré
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Directement dans vos outils préférés
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
              Distribué
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Accessible partout, tout le temps
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
              Sans intégration complexe
            </h3>
            <p
              style={{
                color: "#555555",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Prêt à l'emploi en quelques secondes
            </p>
          </div>
        </div>

        {/* Message de fin */}
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
            Nous sommes impatients de vous montrer ce que nous construisons.
          </p>
          <p
            style={{
              color: "#777777",
              fontSize: "14px",
              margin: "10px 0 0 0",
            }}
          >
            L'équipe SymbiozAI
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
        <p style={{ margin: "0 0 10px 0" }}>&copy; {new Date().getFullYear()} SymbiozAI. Tous droits réservés.</p>
        <p style={{ margin: "10px 0 0 0", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
          Si vous n'avez pas demandé à rejoindre notre liste d'attente, vous pouvez ignorer cet email.
        </p>
      </div>
    </div>
  )
}
