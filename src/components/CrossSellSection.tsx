import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { supabase } from "@/lib/supabase"
import { STORE_ID } from "@/lib/config"
import { useCart } from "@/contexts/CartContext"
import { formatMoney } from "@/lib/money"
import { useSettings } from "@/contexts/SettingsContext"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - CrossSellSection
 * Carrusel editorial de productos relacionados.
 * Mobile: scroll horizontal con snap. Desktop: 3 columnas visibles.
 */

interface CrossSellSectionProps {
  currentProduct: Product
}

export const CrossSellSection = ({ currentProduct }: CrossSellSectionProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { currencyCode } = useSettings()

  useEffect(() => {
    loadRelatedProducts()
  }, [currentProduct.id])

  const loadRelatedProducts = async () => {
    try {
      setLoading(true)
      let products: Product[] = []

      const { data: productCollections, error: collError } = await supabase
        .from("collection_products")
        .select("collection_id")
        .eq("product_id", currentProduct.id)

      if (!collError && productCollections && productCollections.length > 0) {
        const collectionId = productCollections[0].collection_id

        const { data: collectionProductIds, error: cpError } = await supabase
          .from("collection_products")
          .select("product_id")
          .eq("collection_id", collectionId)
          .neq("product_id", currentProduct.id)

        if (!cpError && collectionProductIds && collectionProductIds.length > 0) {
          const productIds = collectionProductIds.map((cp) => cp.product_id)

          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("status", "active")
            .eq("store_id", STORE_ID)
            .in("id", productIds)
            .limit(6)

          if (error) throw error
          products = data || []
        }
      }

      if (products.length < 3) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("status", "active")
          .eq("store_id", STORE_ID)
          .neq("id", currentProduct.id)
          .limit(6 - products.length)

        if (error) throw error
        products = [...products, ...(data || [])]
      }

      setRelatedProducts(products.slice(0, 6))
    } catch (error) {
      console.error("Error loading related products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || relatedProducts.length === 0) return null

  return (
    <section className="py-4">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
            Colección
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-light tracking-tight">
            Combina bien con
          </h2>
        </div>
        <Link
          to="/all-products"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          Ver todos
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Carrusel */}
      <Carousel
        opts={{ align: "start", loop: false, dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {relatedProducts.map((product) => {
            // Usar precio de variantes (igual que ProductCard)
            const variants = (product.variants as any[]) || []
            const variantPrices = variants.map((v) => Number(v.price)).filter((p) => p > 0)
            const displayPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (product.price || 0)
            const compareAtPrices = variants.map((v) => Number(v.compare_at_price)).filter((p) => p > 0)
            const displayCompareAt = compareAtPrices.length > 0 ? Math.min(...compareAtPrices) : ((product as any).compare_at_price || 0)
            const hasDiscount = displayCompareAt > displayPrice
            const img = product.images?.[0]

            return (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-[78%] sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group flex flex-col h-full">
                  {/* Image */}
                  <Link
                    to={`/products/${product.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block flex-1"
                  >
                    <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted/40 mb-3">
                      {img ? (
                        <img
                          src={img}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div className="space-y-0.5 mb-3">
                      <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary/80 transition-colors">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <p className="text-base font-semibold">
                          {formatMoney(displayPrice, currencyCode)}
                        </p>
                        {hasDiscount && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatMoney(displayCompareAt, currencyCode)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Quick add */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => addItem(product, undefined)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                    Agregar
                  </Button>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* Flechas solo en desktop */}
        <CarouselPrevious className="hidden lg:flex -left-5" />
        <CarouselNext className="hidden lg:flex -right-5" />
      </Carousel>

      {/* Ver todos — mobile */}
      <div className="sm:hidden mt-6 text-center">
        <Link
          to="/all-products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver toda la colección
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}