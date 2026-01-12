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
    className: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/20'
  },
  'limited-edition': {
    icon: Gem,
    label: 'EDICIÓN LIMITADA',
    className: 'bg-purple-500/10 text-purple-700 border-purple-500/30 hover:bg-purple-500/20'
  },
  'new': {
    icon: Sparkles,
    label: 'NUEVO',
    className: 'bg-green-500/10 text-green-700 border-green-500/30 hover:bg-green-500/20'
  },
  'popular': {
    icon: Flame,
    label: 'POPULAR',
    className: 'bg-orange-500/10 text-orange-700 border-orange-500/30 hover:bg-orange-500/20'
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
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  )
}