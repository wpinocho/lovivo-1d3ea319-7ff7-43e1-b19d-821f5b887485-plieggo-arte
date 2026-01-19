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
  'acorden-beige-sutil': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768863755362-2rp5dp6xb8.png',
      alt: 'Tríptico de tres cuadros Acordeón Beige Sutil enmarcados en madera sobre sofá beige con respaldo de madera acanalada, mesa de centro redonda y decoración natural en sala elegante',
      context: 'Sala de estar'
    }
  ],

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

  'luna-negra': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768860244179-abxxjni5ffb.png',
      alt: 'Cuadro Luna Negra con pliegues acordeón negros enmarcado en madera sobre pared de hormigón crema con cortinas de lino natural moviéndose con luz natural y ventana de marco negro arquitectónico',
      context: 'Sala de estar'
    }
  ],

  'acorden-rayas-sobre-morado': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768863362883-ktas6zyfn7i.png',
      alt: 'Cuadro Acordeón Rayas sobre Morado enmarcado en madera clara sobre consola naranja de madera con plantas verdes, lámpara esférica crema y pared blanca minimalista',
      context: 'Sala / Consola'
    }
  ],

  'estrellas': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768864130263-scnm9sjwc4q.jpg',
      alt: 'Cuadro Estrellas con pliegues origami en negro y gris formando estrellas geométricas, enmarcado en madera sobre pared crema, sala de estar con sofá beige, madre e hijo abrazándose, lámpara de papel tipo abanico, cortinas crema y piso de madera',
      context: 'Sala de estar / Hogar'
    }
  ],

  'acorden-terracota-vibrante': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768864289040-zgs6nbndct.png',
      alt: 'Cuadro Acordeón Terracota Vibrante vertical con pliegues naranja sobre fondo morado azulado, enmarcado en madera clara, sala de estar con sofá beige moderno, perro blanco descansando, manta tejida gris, cojín plisado beige, mesa de centro negra con planta verde',
      context: 'Sala de estar'
    }
  ],

  'acorden-morado-elegante': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768864465174-k2q4qtmnp5e.png',
      alt: 'Cuadro Acordeón Morado Elegante enmarcado en marco gris sobre pared color mostaza, banco de almacenamiento gris-verde con cojines naranja a cuadros, jarrón con flores amarillas en entrada elegante',
      context: 'Entrada / Recibidor'
    }
  ],

  'acorden-morado-lavanda': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768864647510-dn58ya9g1u7.jpg',
      alt: 'Cuadro Acordeón Morado Lavanda vertical enmarcado en madera clara sobre pared blanca con repisas flotantes de madera, plantas verdes en macetas de mimbre, fotos familiares enmarcadas, libros coloridos y decoración personal hogareña',
      context: 'Pared con repisas / Galería personal'
    }
  ],

  'acorden-rosa-morado': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768865061204-msohs3kp00o.png',
      alt: 'Cuadro Acordeón Rosa Morado con pliegues rosa sobre fondo morado enmarcado en madera, repisas flotantes con plantas verdes, fotos familiares, libros, macramé, mesa rústica de madera con lámpara de ratán, flores secas, taza y manta beige en rincón de trabajo bohemio',
      context: 'Oficina / Rincón de trabajo'
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