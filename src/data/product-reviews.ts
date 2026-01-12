/**
 * PRODUCT REVIEWS DATA
 * 
 * Ratings y cantidad de reseñas por producto.
 * Rating: 4.5-5.0 estrellas
 * Reviews: 0-24 reseñas
 * 
 * Distribución estratégica:
 * - Bestsellers: 20-24 reseñas
 * - Edición Limitada: 9-12 reseñas
 * - Featured: 4-18 reseñas
 * - Nuevos: 0-3 reseñas
 */

export interface ProductReview {
  rating: number        // 0-5
  reviewCount: number   // 0-24
}

export const productReviews: Record<string, ProductReview> = {
  // BESTSELLERS (20-24 reseñas, 4.8-4.9★)
  'acorden-beige-sutil': {
    rating: 4.9,
    reviewCount: 24
  },
  'acorden-rosa-sereno': {
    rating: 4.8,
    reviewCount: 22
  },
  'acorden-verde-salvia': {
    rating: 4.9,
    reviewCount: 20
  },
  
  // FEATURED PREMIUM (15-18 reseñas, 4.7-4.8★)
  'acorden-terracota-vibrante': {
    rating: 4.7,
    reviewCount: 18
  },
  'acorden-crema-rayas': {
    rating: 4.8,
    reviewCount: 15
  },
  
  // EDICIÓN LIMITADA (9-12 reseñas, 4.8-5.0★)
  'luna-llena': {
    rating: 5.0,
    reviewCount: 12
  },
  'luna-azul': {
    rating: 4.9,
    reviewCount: 10
  },
  'luna-negra': {
    rating: 4.8,
    reviewCount: 9
  },
  
  // FEATURED REGULAR (4-8 reseñas, 4.5-4.8★)
  'acorden-crema-natural': {
    rating: 4.6,
    reviewCount: 8
  },
  'acorden-morado-lavanda': {
    rating: 4.7,
    reviewCount: 7
  },
  'acorden-rayas-sobre-morado': {
    rating: 4.5,
    reviewCount: 6
  },
  'acorden-morado-blanco': {
    rating: 4.8,
    reviewCount: 5
  },
  'acorden-rosa-morado': {
    rating: 4.6,
    reviewCount: 4
  },
  
  // PRODUCTOS NUEVOS (0-3 reseñas, 4.7-5.0★)
  'acorden-blanco-puro': {
    rating: 4.9,
    reviewCount: 3
  },
  'acorden-burdeos-intenso': {
    rating: 5.0,
    reviewCount: 2
  },
  'acorden-morado-elegante': {
    rating: 4.7,
    reviewCount: 1
  },
  'estrellas': {
    rating: 0,
    reviewCount: 0
  }
}

/**
 * Obtiene el rating de un producto por su slug
 */
export const getProductReview = (slug: string): ProductReview => {
  return productReviews[slug] || { rating: 0, reviewCount: 0 }
}

/**
 * Verifica si un producto tiene reseñas
 */
export const hasReviews = (slug: string): boolean => {
  const review = getProductReview(slug)
  return review.reviewCount > 0
}