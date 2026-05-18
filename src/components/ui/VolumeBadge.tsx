import { usePriceRules } from '@/hooks/usePriceRules'
import { Badge } from '@/components/ui/badge'
import { Layers } from 'lucide-react'

interface VolumeBadgeProps {
  productId: string
  collectionIds?: string[]
}

/**
 * Shows a badge when volume/tiered pricing rules apply to this product.
 * Renders nothing when no volume rules are found.
 */
export function VolumeBadge({ productId, collectionIds }: VolumeBadgeProps) {
  const { getRulesForProduct, loading } = usePriceRules()

  if (loading) return null

  const rules = getRulesForProduct(productId, collectionIds)
  const volumeRules = rules.filter(
    (r) => r.rule_type === 'volume' || r.rule_type === 'tiered',
  )

  if (volumeRules.length === 0) return null

  return (
    <Badge variant="secondary" className="text-xs gap-1 font-medium">
      <Layers className="h-3 w-3" />
      Descuento por volumen
    </Badge>
  )
}