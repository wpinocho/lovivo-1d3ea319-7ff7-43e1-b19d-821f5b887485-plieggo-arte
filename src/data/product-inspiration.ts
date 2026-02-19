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
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-beige-sutil.webp',
      alt: 'Tríptico de tres cuadros Acordeón Beige Sutil enmarcados en madera sobre sofá beige con respaldo de madera acanalada, mesa de centro redonda y decoración natural en sala elegante',
      context: 'Sala de estar'
    }
  ],

  'acorden-rosa-sereno': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-rosa-sereno.webp',
      alt: 'Cuadro Acordeón Rosa Sereno enmarcado en madera colgado en cuarto de bebé con cuna de madera natural, estante curvo con ositos de peluche, sillón crema con mantas tejidas, cómoda gris con lámpara de ratán, canasta de mimbre con peluches y decoración en tonos beige, crema y rosa pastel',
      context: 'Cuarto de bebé'
    }
  ],

  'acorden-verde-salvia': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-verde-salvia.webp',
      alt: 'Cuadro Acordeón Verde Salvia enmarcado en sala de estar moderna con sofá verde menta, mesa de madera y decoración minimalista',
      context: 'Sala'
    }
  ],

  'acorden-blanco-puro': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-blanco-puro.webp',
      alt: 'Cuadro Acordeón Blanco Puro vertical enmarcado en madera en rincón de lectura minimalista con tonos beige y cojines crema',
      context: 'Rincón de lectura'
    }
  ],

  'acorden-morado-blanco': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-morado-blanco.webp',
      alt: 'Cuadro Acordeón Morado Blanco enmarcado en madera sobre banco de almacenamiento gris con cojines naranjas a cuadros en entrada elegante con paredes ocre',
      context: 'Entrada / Recibidor'
    }
  ],

  'luna-azul': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1771519019932-4us27uu9kn6.webp',
      alt: 'Cuadro Luna Azul enmarcado en madera oscura sobre pared blanca, mujer de negro leyendo en sofá mostaza en sala minimalista con piso de madera',
      context: 'Sala de estar'
    }
  ],

  'luna-llena': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1771519019933-4qh4u3t5wg9.webp',
      alt: 'Cuadro Luna Llena en tonos crema enmarcado en madera, hombre sentado en sillón de cuero marrón en sala con luz natural y ventana',
      context: 'Sala de estar'
    }
  ],

  'acorden-crema-natural': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-crema-natural.webp',
      alt: 'Cuadro Acordeón Crema Natural vertical enmarcado en madera sobre fondo morado lavanda en sala minimalista con silla de ratán, planta ficus y piso de madera',
      context: 'Sala minimalista'
    }
  ],

  'acorden-crema-rayas': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-crema-rayas.webp',
      alt: 'Cuadro Acordeón Crema Rayas con fondo azul grisáceo a rayas enmarcado en madera en pasillo blanco luminoso con niño corriendo, lámpara de globo dorado y tapete vintage',
      context: 'Pasillo / Entrada'
    }
  ],

  'luna-negra': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1771519019933-yn3o6hairv.webp',
      alt: 'Cuadro Luna Negra enmarcado en madera oscura sobre pared blanca en comedor moderno con mesa y sillas de madera natural, plantas verdes y ventanales amplios con jardín',
      context: 'Comedor'
    }
  ],

  'acorden-rayas-sobre-morado': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-rayas-sobre-morado.webp',
      alt: 'Cuadro Acordeón Rayas sobre Morado enmarcado en madera clara sobre consola naranja de madera con plantas verdes, lámpara esférica crema y pared blanca minimalista',
      context: 'Sala / Consola'
    }
  ],

  'estrellas': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1771519019933-hn3s2yu15ng.webp',
      alt: 'Proceso artesanal del cuadro Estrellas: manos doblando papel oscuro en formas geométricas sobre mesa de trabajo con herramientas de origami',
      context: 'Proceso artesanal'
    }
  ],

  'acorden-terracota-vibrante': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-terracota-vibrante.webp',
      alt: 'Cuadro Acordeón Terracota Vibrante vertical con pliegues naranja sobre fondo morado azulado, enmarcado en madera clara, sala de estar con sofá beige moderno, perro blanco descansando, manta tejida gris, cojín plisado beige, mesa de centro negra con planta verde',
      context: 'Sala de estar'
    }
  ],

  'acorden-morado-elegante': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-morado-elegante.webp',
      alt: 'Cuadro Acordeón Morado Elegante enmarcado en marco gris sobre pared color mostaza, banco de almacenamiento gris-verde con cojines naranja a cuadros, jarrón con flores amarillas en entrada elegante',
      context: 'Entrada / Recibidor'
    }
  ],

  'acorden-morado-lavanda': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-morado-lavanda.webp',
      alt: 'Cuadro Acordeón Morado Lavanda vertical enmarcado en madera clara sobre pared blanca con repisas flotantes de madera, plantas verdes en macetas de mimbre, fotos familiares enmarcadas, libros coloridos y decoración personal hogareña',
      context: 'Pared con repisas / Galería personal'
    }
  ],

  'acorden-rosa-morado': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-rosa-morado.webp',
      alt: 'Cuadro Acordeón Rosa Morado con pliegues rosa sobre fondo morado enmarcado en madera, repisas flotantes con plantas verdes, fotos familiares, libros, macramé, mesa rústica de madera con lámpara de ratán, flores secas, taza y manta beige en rincón de trabajo bohemio',
      context: 'Oficina / Rincón de trabajo'
    }
  ],

  'acorden-burdeos-intenso': [
    {
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acorden-burdeos-intenso.webp',
      alt: 'Cuadro Acordeón Burdeos Intenso vertical con pliegues burdeos profundos enmarcado en madera colgado en comedor minimalista moderno con mesa de madera, banco tapizado gris, sillas crema, ventanales amplios con luz natural, cortinas beige, credenza de madera con plantas verdes, jarrón blanco escultural y decoración neutra',
      context: 'Comedor / Sala de estar'
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