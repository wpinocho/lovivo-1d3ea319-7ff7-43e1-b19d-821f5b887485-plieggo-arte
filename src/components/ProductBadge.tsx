import { Badge } from "@/components/ui/badge"
import { Award, Gem, Sparkles, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * EDITABLE UI COMPONENT - ProductBadge
 * 
 * Badges para destacar productos especiales
 */

export type BadgeType = 'best-seller' | 'limited-edition' | 'new' | 'popular'

interface ProductBadgeProps {
  type: BadgeType
  className?: string
}

const badgeConfig = {
  'best-seller': {
    icon: Award,
    label: 'MÁS VENDIDO',
    className: 'bg-accent text-white border-accent hover:bg-accent/90 shadow-lg shadow-accent/30'
  },
  'limited-edition': {
    icon: Gem,
    label: 'EDICIÓN LIMITADA',
    className: 'bg-secondary text-secondary-foreground border-secondary shadow-lg'
  },
  'new': {
    icon: Sparkles,
    label: 'NUEVO',
    className: 'bg-primary text-primary-foreground border-primary shadow-lg'
  },
  'popular': {
    icon: Flame,
    label: 'POPULAR',
    className: 'bg-secondary text-secondary-foreground border-secondary shadow-lg'
  }
}

export const ProductBadge = ({ type, className }: ProductBadgeProps) => {
  const config = badgeConfig[type]
  const Icon = config.icon

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-heading font-bold tracking-wider text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2 w-fit uppercase",
        config.className,
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />}
      {config.label}
    </Badge>
  )
}