export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-2 text-center text-gray-400 text-sm">
      <p>&copy; {currentYear} SymbiozAI. All rights reserved.</p>
    </footer>
  )
}
