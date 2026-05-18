/**
 * Subscription / Selling Plan utilities
 */

/**
 * Returns a human-readable interval label in Spanish.
 * e.g. intervalLabel('month', 1) → 'mes'
 *      intervalLabel('month', 2) → '2 meses'
 *      intervalLabel('week', 1)  → 'semana'
 */
export function intervalLabel(interval: string, count: number = 1): string {
  const n = count || 1
  switch (interval) {
    case 'day':
      return n === 1 ? 'día' : `${n} días`
    case 'week':
      return n === 1 ? 'semana' : `${n} semanas`
    case 'month':
      return n === 1 ? 'mes' : `${n} meses`
    case 'year':
      return n === 1 ? 'año' : `${n} años`
    default:
      return n === 1 ? interval : `${n} ${interval}s`
  }
}