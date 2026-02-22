import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine multiple class names with Tailwind CSS support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.fr", "yahoo.co.uk", "yahoo.es", "yahoo.de", "yahoo.it",
  "hotmail.com", "hotmail.fr", "hotmail.co.uk", "hotmail.es", "hotmail.de",
  "outlook.com", "outlook.fr",
  "live.com", "live.fr",
  "icloud.com", "me.com", "mac.com",
  "aol.com",
  "protonmail.com", "proton.me",
  "mail.com",
  "laposte.net", "free.fr", "orange.fr", "sfr.fr", "wanadoo.fr", "bbox.fr",
  "gmx.com", "gmx.fr", "gmx.de",
  "yandex.com", "yandex.ru",
  "tutanota.com",
])

/**
 * Returns true if the email is from a professional domain (not a free provider)
 */
export function isProEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase()
  if (!domain) return false
  return !FREE_EMAIL_DOMAINS.has(domain)
}

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate a random ID with optional prefix
 */
export function generateId(prefix = ""): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`
}
