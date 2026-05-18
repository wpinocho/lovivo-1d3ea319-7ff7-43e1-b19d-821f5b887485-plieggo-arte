import { Tag } from 'lucide-react'

interface AppliedRule {
  title?: string
  discount: number
  [key: string]: any
}

interface CartAppliedRulesProps {
  appliedRules: AppliedRule[]
  formatMoney: (value: number) => string
}

/**
 * Shows automatic discount rules (volume, bundles, etc.) applied to the order.
 * Used in checkout and cart summaries.
 */
export function CartAppliedRules({ appliedRules, formatMoney }: CartAppliedRulesProps) {
  if (!appliedRules || appliedRules.length === 0) return null

  return (
    <>
      {appliedRules.map((rule, i) => (
        <div key={i} className="flex justify-between text-sm text-green-700">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {rule.title || 'Descuento aplicado'}
          </span>
          <span>− {formatMoney(rule.discount)}</span>
        </div>
      ))}
    </>
  )
}