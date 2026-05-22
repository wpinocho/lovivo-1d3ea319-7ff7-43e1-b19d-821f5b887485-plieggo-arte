/**
 * Validates that a phone value has enough digits to be a real phone number.
 * Google Pay / Apple Pay sometimes return empty strings or "+52" prefixes
 * with no actual number — this filter catches those cases.
 */
export function isValidPhone(phone: string | undefined | null): boolean {
  if (!phone) return false
  // Strip all non-digit characters and check we have at least 7 digits
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 7
}

/**
 * Normalizes a phone number by removing all non-digit characters.
 * Returns the normalized phone number if valid, or null if invalid.
 */
export function normalizePhoneNumber(phone: string | undefined | null): string | null {
  if (!phone) return null
  // Strip all non-digit characters
  const digits = phone.replace(/\D/g, '')
  // Return normalized phone if it has enough digits, otherwise null
  return digits.length >= 7 ? digits : null
}