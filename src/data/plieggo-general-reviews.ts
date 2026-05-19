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
  product: string       // Nombre legible del cuadro
  variant?: string      // Tamaño o "Única"
  photoUrl?: string     // URL de foto real del cliente (subir desde Dashboard)
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
    variant: "80x80cm",
  },
  {
    id: "g5",
    author: "Claudia F.",
    rating: 5,
    comment:
      "Los pliegues crean un relieve increíble que cambia con la luz del día. Quedó perfecto en mi sala.",
    date: "2026-02-12",
    product: "Luna Beige",
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
    variant: "50x50cm",
  },
]

/** Genera iniciales del nombre (máx 2 caracteres) */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}