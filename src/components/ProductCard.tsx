import { ProductCardUI } from "@/components/ui/ProductCardUI"
import type { Product } from "@/lib/supabase"
import { usePriceRules } from "@/hooks/usePriceRules"

/**
 * ROUTE COMPONENT - ProductCard
 * 
 * Llama usePriceRules y pasa las reglas aplicables a ProductCardUI.
 */

interface ProductCardProps {
  product: Product
  aspectRatio?: 'square' | 'rectangle' | 'auto'
  hoverImageIndex?: number
}

export const ProductCard = ({ product, aspectRatio = 'auto', hoverImageIndex }: ProductCardProps) => {
  const { getRulesForProduct } = usePriceRules()
  const priceRules = getRulesForProduct(product.id)
  return <ProductCardUI product={product} aspectRatio={aspectRatio} priceRules={priceRules} hoverImageIndex={hoverImageIndex} />
}