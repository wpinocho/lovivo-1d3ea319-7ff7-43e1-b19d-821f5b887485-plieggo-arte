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