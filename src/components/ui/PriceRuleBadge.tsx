import type { PriceRule } from '@/lib/supabase'

interface PriceRuleBadgeProps {
  rule: PriceRule
}

export const PriceRuleBadge = ({ rule }: PriceRuleBadgeProps) => {
  const label = getRuleLabel(rule)
  if (!label) return null

  return (
    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">
      {label}
    </span>
  )
}

function getRuleLabel(rule: PriceRule): string | null {
  const conditions = rule.conditions as any

  switch (rule.rule_type) {
    case 'volume': {
      const minQty = conditions?.min_quantity
      const pct = conditions?.discount_percentage
      if (minQty && pct) return `${minQty}+ → ${pct}% OFF`
      return rule.title || 'Desc. por volumen'
    }
    case 'bogo': {
      const buy = conditions?.buy_quantity
      const get = conditions?.get_quantity
      if (buy && get) return `Lleva ${buy + get}, paga ${buy}`
      return rule.title || '2x1'
    }
    case 'free_shipping':
      return '🚚 Envío gratis'
    case 'bundle':
      return rule.title || 'Paquete'
    default:
      return rule.title || null
  }
}