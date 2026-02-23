export const metadata = {
  title: "Contact - SymbiozAI",
  description: "Contactez l'équipe SymbiozAI pour toute question sur notre CRM IA-Native.",
  openGraph: {
    title: "Contact - SymbiozAI",
    description: "Contactez l'équipe SymbiozAI pour toute question sur notre CRM IA-Native.",
    url: "https://symbioz.ai/contact",
  },
  alternates: {
    canonical: "https://symbioz.ai/contact",
  },
}

export default function ContactPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
      <main className="flex-grow flex flex-col px-4 sm:px-6 text-center py-[8vh] sm:py-[10vh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Contact Us</h1>

          <p className="mb-8 text-lg">
            For inquiries, please email us at:{" "}
            <a href="mailto:contact@symbioz.ai" className="text-blue-600 hover:underline">
              contact@symbioz.ai
            </a>
          </p>

          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] text-white font-medium rounded-md hover:opacity-90 transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </main>

      <footer className="py-2 text-center text-gray-400 text-sm">
        <p>&copy; {currentYear} SymbiozAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
