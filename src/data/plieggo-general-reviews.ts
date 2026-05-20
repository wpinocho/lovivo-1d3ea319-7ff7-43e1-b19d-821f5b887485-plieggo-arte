/**
 * REVIEWS GENERALES PLIEGGO
 *
 * Las mejores citas de toda la colección — aparecen en TODAS las PDPs
 * como sección "Más experiencias Plieggo" debajo de las reseñas específicas.
 *
 * Seleccionadas por impacto:
 *   - Mencionan el diferenciador de luz/sombra
 *   - Transmiten que transforma el espacio
 *   - Generan FOMO y prueba social fuerte
 *
 * Cuando el usuario suba fotos, llenar el campo `photoUrl`.
 * Sin foto → se muestra avatar con iniciales.
 */

export interface GeneralReview {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  product: string           // Nombre legible del cuadro
  productSlug?: string      // Slug del producto (para excluir el cuadro actual en sección "Más experiencias")
  collectionSlug?: string   // "acordeon" | "luna" | "espacio" — para priorizar misma colección
  variant?: string          // Tamaño o "Única"
  photoUrl?: string         // URL de foto real del cliente (subir desde Dashboard)
}

export const plieggoGeneralReviews: GeneralReview[] = [
  {
    id: "g1",
    author: "Fernando L.",
    rating: 5,
    comment:
      "Todas mis visitas preguntan dónde lo compré. Una verdadera obra de arte.",
    date: "2025-10-18",
    product: "Acordeón Beige Sutil",
    productSlug: "acorden-beige-sutil",
    collectionSlug: "acordeon",
    variant: "50x50cm",
  },
  {
    id: "g2",
    author: "Roberto D.",
    rating: 5,
    comment:
      "Es como tener una escultura viva en la pared. Los pliegues cambian con cada hora del día.",
    date: "2025-11-18",
    product: "Acordeón Beige Sutil",
    productSlug: "acorden-beige-sutil",
    collectionSlug: "acordeon",
    variant: "80x80cm",
  },
  {
    id: "g3",
    author: "Elena F.",
    rating: 5,
    comment:
      "Tercer cuadro de Plieggo en mi casa y cada uno es mejor que el anterior. La consistencia en calidad es admirable.",
    date: "2025-09-05",
    product: "Acordeón Beige Sutil",
    productSlug: "acorden-beige-sutil",
    collectionSlug: "acordeon",
    variant: "50x50cm",
  },
  {
    id: "g4",
    author: "Mónica A.",
    rating: 5,
    comment:
      "Arte vivo que cambia con la luz del día. En la mañana se ve diferente que en la tarde. Mi mejor compra del año.",
    date: "2025-08-22",
    product: "Acordeón Verde Salvia",
    productSlug: "acorden-rosa-morado",
    collectionSlug: "acordeon",
    variant: "80x80cm",
    photoUrl: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779311693322-9f4ruvw5mpq.webp",
  },
  {
    id: "g9",
    author: "Valentina S.",
    rating: 5,
    comment:
      "Llegó perfectamente empacado y superó todas mis expectativas. El Prisma Onyx Opal tiene una presencia increíble.",
    date: "2026-01-14",
    product: "Acordeón Prisma Onyx Opal",
    productSlug: "acorden-prisma-onyx-opal",
    collectionSlug: "acordeon",
    variant: "Única",
    photoUrl: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779311693322-f14snp6bxfa.webp",
  },
  {
    id: "g10",
    author: "Sebastián M.",
    rating: 5,
    comment:
      "Lo colgué en la sala y transformó por completo el ambiente. Los pliegues azules con coral son hipnóticos.",
    date: "2026-02-03",
    product: "Acordeón Prisma Azul Coral",
    productSlug: "acorden-prisma-azul-coral",
    collectionSlug: "acordeon",
    variant: "Única",
    photoUrl: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779311693322-kcwn5zoehb.webp",
  },
  {
    id: "g11",
    author: "Daniela R.",
    rating: 5,
    comment:
      "El color burdeos le da una elegancia impresionante. Cualquier pared donde lo pongas se convierte en el centro de atención.",
    date: "2026-03-08",
    product: "Acordeón Burdeos Intenso",
    productSlug: "acorden-burdeos-intenso",
    collectionSlug: "acordeon",
    variant: "80x80cm",
    photoUrl: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779311693322-4f7n3rqv0pj.webp",
  },
  {
    id: "g12",
    author: "Andrés V.",
    rating: 5,
    comment:
      "La Luna Negra es pura magia. Los detalles del papel con destellos dorados y azules son increíbles en persona.",
    date: "2026-04-21",
    product: "Luna Negra",
    productSlug: "luna-negra",
    collectionSlug: "luna",
    variant: "Única",
    photoUrl: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779311693322-8vbqa3p7c55.webp",
  },
  {
    id: "g5",
    author: "Claudia F.",
    rating: 5,
    comment:
      "Los pliegues crean un relieve increíble que cambia con la luz del día. Quedó perfecto en mi sala.",
    date: "2026-02-12",
    product: "Luna Beige",
    productSlug: "luna-beige",
    collectionSlug: "luna",
    variant: "Única",
  },
  {
    id: "g6",
    author: "Beatriz N.",
    rating: 5,
    comment:
      "Me fascinan los juegos de sombra que crean los pliegues. Cada momento del día se ve diferente. Único.",
    date: "2025-12-03",
    product: "Acordeón Beige Sutil",
    productSlug: "acorden-beige-sutil",
    collectionSlug: "acordeon",
    variant: "50x50cm",
  },
  {
    id: "g7",
    author: "Lucía N.",
    rating: 5,
    comment:
      "Mi favorita de toda la colección. Combina con cualquier decoración y siempre llama la atención.",
    date: "2025-12-05",
    product: "Luna Beige",
    productSlug: "luna-beige",
    collectionSlug: "luna",
    variant: "Única",
  },
  {
    id: "g8",
    author: "Ignacio R.",
    rating: 5,
    comment:
      "En la mañana se ve diferente que en la tarde. El cuadro nunca es el mismo. Mágico.",
    date: "2025-08-15",
    product: "Acordeón Terracota Vibrante",
    productSlug: "acorden-terracota-vibrante",
    collectionSlug: "acordeon",
    variant: "50x50cm",
  },
]

/** Genera iniciales del nombre (máx 2 caracteres) */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}