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
    className: 'bg-primary/20 text-primary border-primary/40 hover:bg-primary/30'
  },
  'limited-edition': {
    icon: null,
    label: 'EDICIÓN LIMITADA',
    className: 'bg-secondary text-secondary-foreground border-0'
  },
  'new': {
    icon: Sparkles,
    label: 'NUEVO',
    className: 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/25'
  },
  'popular': {
    icon: Flame,
    label: 'POPULAR',
    className: 'bg-secondary/15 text-secondary border-secondary/30 hover:bg-secondary/25'
  }
}

export const ProductBadge = ({ type, className }: ProductBadgeProps) => {
  const config = badgeConfig[type]
  const Icon = config.icon

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-heading font-semibold tracking-wide text-xs px-3 py-1 flex items-center gap-1.5 w-fit",
        config.className,
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {config.label}
    </Badge>
  )
}