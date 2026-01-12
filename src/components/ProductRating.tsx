import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * EDITABLE UI COMPONENT - ProductRating
 * 
 * Componente que muestra el rating de un producto con estrellas y cantidad de reseñas.
 * Fase 1: Solo visual, clickable para abrir modal (Fase 3)
 * 
 * PUEDES MODIFICAR:
 * - Colores y estilos
 * - Tamaño de estrellas
 * - Formato del texto
 * - Animaciones hover
 */

interface ProductRatingProps {
  rating: number          // 0-5 (ejemplo: 4.8)
  reviewCount: number     // Cantidad de reseñas (ejemplo: 24)
  onClick?: () => void    // Función para abrir modal (Fase 3)
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ProductRating = ({ 
  rating, 
  reviewCount, 
  onClick,
  size = 'md',
  className 
}: ProductRatingProps) => {
  // Configuración de tamaños
  const sizeConfig = {
    sm: {
      star: 'h-3.5 w-3.5',
      text: 'text-sm',
      gap: 'gap-1'
    },
    md: {
      star: 'h-4 w-4',
      text: 'text-base',
      gap: 'gap-1.5'
    },
    lg: {
      star: 'h-5 w-5',
      text: 'text-lg',
      gap: 'gap-2'
    }
  }

  const config = sizeConfig[size]

  // Generar array de estrellas (5 estrellas)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1
    const isFilled = starValue <= Math.round(rating)
    return { id: i, filled: isFilled }
  })

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center group transition-all",
        config.gap,
        onClick && "cursor-pointer hover:opacity-80",
        !onClick && "cursor-default",
        className
      )}
      aria-label={`${rating} de 5 estrellas, ${reviewCount} reseñas`}
    >
      {/* Estrellas */}
      <div className={cn("flex items-center", config.gap)}>
        {stars.map((star) => (
          <Star
            key={star.id}
            className={cn(
              config.star,
              "transition-colors",
              star.filled 
                ? "fill-primary text-primary" 
                : "fill-none text-border"
            )}
          />
        ))}
      </div>

      {/* Rating numérico */}
      <span className={cn(
        "font-semibold text-foreground",
        config.text
      )}>
        {rating.toFixed(1)}
      </span>

      {/* Cantidad de reseñas */}
      <span className={cn(
        "text-muted-foreground",
        config.text,
        onClick && "group-hover:underline underline-offset-2"
      )}>
        ({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})
      </span>
    </button>
  )
}