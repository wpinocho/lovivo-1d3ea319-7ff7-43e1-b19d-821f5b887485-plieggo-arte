import { ProductCardUI } from "@/components/ui/ProductCardUI"
import type { Product } from "@/lib/supabase"

/**
 * ROUTE COMPONENT - ProductCard
 * 
 * Este componente solo importa y usa ProductCardUI.
 * Toda la lógica está en HeadlessProductCard y la presentación en ProductCardUI.
 */

interface ProductCardProps {
  product: Product
  aspectRatio?: 'square' | 'rectangle' | 'auto'
}

export const ProductCard = ({ product, aspectRatio = 'auto' }: ProductCardProps) => {
  return <ProductCardUI product={product} aspectRatio={aspectRatio} />
}