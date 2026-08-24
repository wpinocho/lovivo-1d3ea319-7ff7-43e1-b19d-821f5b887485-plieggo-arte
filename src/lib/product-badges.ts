import type { Product } from './supabase'
import type { BadgeType } from '@/components/ProductBadge'

/**
 * UTILITY - Product Badge Logic
 * 
 * Asigna badges a productos basándose en tags, featured y otros criterios
 */

export const getBadgeForProduct = (product: Product): BadgeType | null => {
  // Si el producto tiene badge explícito, usarlo
  if (product.badge) {
    return product.badge as BadgeType
  }

  // 1. EDICIÓN LIMITADA - Productos premium con tags específicos
  if (product.tags?.includes('Edición Limitada')) {
    return 'limited-edition'
  }

  // 2. MÁS VENDIDO - Productos con tag bestseller
  if (product.tags?.includes('bestseller')) {
    return 'best-seller'
  }

  // NOTA: el badge "Nuevo" está desactivado a propósito (decisión de marca, 2026-08-24).
  // No queremos etiquetar piezas por antigüedad; solo por bestseller o edición limitada.

  // 3. POPULAR - Productos featured sin otro badge
  if (product.featured) {
    // Productos destacados específicos que queremos marcar como populares
    const popularSlugs = ['acordeon-terracota-vibrante', 'acordeon-crema-rayas']
    if (popularSlugs.includes(product.slug)) {
      return 'popular'
    }
  }

  return null
}

/**
 * Asigna badges a una lista de productos
 */
export const assignBadgesToProducts = (products: Product[]): Product[] => {
  return products.map(product => ({
    ...product,
    badge: getBadgeForProduct(product) || undefined
  }))
}