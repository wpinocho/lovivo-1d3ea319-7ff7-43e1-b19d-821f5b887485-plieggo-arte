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

  // 3. NUEVO - Productos creados hace menos de 30 días
  if (product.created_at) {
    const createdDate = new Date(product.created_at)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    if (createdDate > thirtyDaysAgo && product.featured) {
      return 'new'
    }
  }

  // 4. POPULAR - Productos featured sin otro badge
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