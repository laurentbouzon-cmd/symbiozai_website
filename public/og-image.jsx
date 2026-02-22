export default function OgImage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "1200px",
        height: "630px",
        backgroundColor: "white",
        backgroundImage: "radial-gradient(#cceeff 1px, transparent 1px)",
        backgroundSize: "10px 10px",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "600",
            margin: "0 0 20px 0",
          }}
        >
          Symbioz
          <span
            style={{
              background: "linear-gradient(90deg, #1a237e 0%, #0d47a1 50%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
        </h1>
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "400",
            margin: "0 0 40px 0",
          }}
        >
          Une nouvelle façon de construire. Ensemble.
        </h2>
        <p
          style={{
            fontSize: "24px",
            color: "#555",
            maxWidth: "700px",
            lineHeight: "1.5",
          }}
        >
          SymbiozAI crée des agents IA de classe mondiale conçus pour surpasser les meilleures équipes humaines.
        </p>
      </div>
    </div>
  )
}
