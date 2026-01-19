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
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768261239411-r8fph4k62i.png',
      alt: 'Cuadro Acordeón Rosa Sereno en cuarto de bebé con decoración minimalista en tonos crema y madera natural',
      context: 'Cuarto de bebé'
    }
  ],

  'acorden-verde-salvia': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768261609059-e6isjx6l8g4.jpg',
      alt: 'Cuadro Acordeón Verde Salvia enmarcado en sala de estar moderna con sofá verde menta, mesa de madera y decoración minimalista',
      context: 'Sala'
    }
  ],

  'acorden-blanco-puro': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768261757909-23adqmkabx2.png',
      alt: 'Cuadro Acordeón Blanco Puro vertical enmarcado en madera en rincón de lectura minimalista con tonos beige y cojines crema',
      context: 'Rincón de lectura'
    }
  ],

  'acorden-morado-blanco': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768853818482-c456sasz69f.png',
      alt: 'Cuadro Acordeón Morado Blanco enmarcado en madera sobre banco de almacenamiento gris con cojines naranjas a cuadros en entrada elegante con paredes ocre',
      context: 'Entrada / Recibidor'
    }
  ],

  'luna-azul': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768262127623-rdstk26b0tf.png',
      alt: 'Cuadro Luna Azul enmarcado en madera sobre sofá beige modular, mujer leyendo libro en sala minimalista con mesa auxiliar de madera',
      context: 'Sala de estar'
    }
  ],

  'luna-llena': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768262277837-j8smxnzmt7n.png',
      alt: 'Cuadro Luna Llena en tonos crema enmarcado en madera sobre pared blanca, hombre relajado en sillón beige en sala minimalista',
      context: 'Sala de estar'
    }
  ],

  'acorden-crema-natural': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768857662388-m405gfc399n.png',
      alt: 'Cuadro Acordeón Crema Natural vertical enmarcado en madera sobre fondo morado lavanda en sala minimalista con silla de ratán, planta ficus y piso de madera',
      context: 'Sala minimalista'
    }
  ],

  'acorden-crema-rayas': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768858602183-nfd1q0dwone.jpg',
      alt: 'Cuadro Acordeón Crema Rayas con fondo azul grisáceo a rayas enmarcado en madera en pasillo blanco luminoso con niño corriendo, lámpara de globo dorado y tapete vintage',
      context: 'Pasillo / Entrada'
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