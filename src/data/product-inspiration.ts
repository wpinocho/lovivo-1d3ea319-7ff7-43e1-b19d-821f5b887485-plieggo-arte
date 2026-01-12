/**
 * PRODUCT INSPIRATION - Imágenes de productos en contexto real
 * 
 * Mapea cada producto (por slug) a sus imágenes de inspiración mostrando
 * el cuadro colgado en casas, oficinas, etc.
 */

export interface InspirationImage {
  src: string
  alt: string
  context?: string // e.g., "Cuarto de bebé", "Sala de estar"
}

export const productInspirationImages: Record<string, InspirationImage[]> = {
  'acorden-rosa-sereno': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768260560314-rrzsybcuhei.png',
      alt: 'Cuadro Acordeón Rosa en cuarto de bebé con decoración minimalista',
      context: 'Cuarto de bebé'
    }
  ],
  
  // Otros productos se pueden agregar aquí con el mismo formato
  // 'slug-del-producto': [{ src: 'url', alt: 'descripción', context: 'contexto' }]
}

/**
 * Obtiene las imágenes de inspiración de un producto
 */
export const getProductInspiration = (productSlug: string): InspirationImage[] => {
  return productInspirationImages[productSlug] || []
}

/**
 * Verifica si un producto tiene imágenes de inspiración
 */
export const hasProductInspiration = (productSlug: string): boolean => {
  const images = productInspirationImages[productSlug]
  return images !== undefined && images.length > 0
}