import { usePriceRules } from '@/hooks/usePriceRules'
import { Badge } from '@/components/ui/badge'
import { Gift } from 'lucide-react'

interface BOGOLabelProps {
  productId: string
  collectionIds?: string[]
}

/**
 * Shows a BOGO (Buy One Get One) label when applicable rules exist for this product.
 * Renders nothing when no BOGO rules are found.
 */
export function BOGOLabel({ productId, collectionIds }: BOGOLabelProps) {
  const { getRulesForProduct, loading } = usePriceRules()

  if (loading) return null

  const rules = getRulesForProduct(productId, collectionIds)
  const bogoRules = rules.filter(
    (r) => r.rule_type === 'bogo' || r.rule_type === 'buy_x_get_y',
  )

  if (bogoRules.length === 0) return null

  const label = bogoRules[0]?.title ?? '2×1 disponible'

  return (
    <Badge variant="outline" className="text-xs gap-1 font-medium border-primary text-primary">
      <Gift className="h-3 w-3" />
      {label}
    </Badge>
  )
}