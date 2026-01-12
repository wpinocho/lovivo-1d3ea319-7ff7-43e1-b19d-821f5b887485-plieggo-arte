import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { formatMoney } from "@/lib/money"
import { useSettings } from "@/contexts/SettingsContext"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - CrossSellSection
 * 
 * Sección de productos relacionados (cross-sell)
 * Muestra productos de la misma colección
 */

interface CrossSellSectionProps {
  currentProduct: Product
}

export const CrossSellSection = ({ currentProduct }: CrossSellSectionProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()
  const { currencyCode } = useSettings()

  useEffect(() => {
    loadRelatedProducts()
  }, [currentProduct.id])

  const loadRelatedProducts = async () => {
    try {
      setLoading(true)
      
      // 1. Intentar obtener productos de la misma colección
      let products: Product[] = []
      
      if (currentProduct.collection_ids && currentProduct.collection_ids.length > 0) {
        const collectionId = currentProduct.collection_ids[0]
        
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            variants:product_variants(*)
          `)
          .eq('status', 'active')
          .contains('collection_ids', [collectionId])
          .neq('id', currentProduct.id)
          .limit(3)
        
        if (error) throw error
        products = data || []
      }
      
      // 2. Si no hay suficientes productos de la colección, completar con aleatorios
      if (products.length < 3) {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            variants:product_variants(*)
          `)
          .eq('status', 'active')
          .neq('id', currentProduct.id)
          .limit(3 - products.length)
        
        if (error) throw error
        products = [...products, ...(data || [])]
      }
      
      setRelatedProducts(products.slice(0, 3))
    } catch (error) {
      console.error('Error loading related products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAdd = (product: Product) => {
    // Si tiene variantes, agregar la primera variante
    // Si no tiene variantes, agregar el producto base
    const variant = product.variants && product.variants.length > 0 
      ? product.variants[0] 
      : undefined
    
    addItem(product, variant)
    
    toast({
      title: "Agregado al carrito",
      description: `${product.title} agregado exitosamente`,
      duration: 2000,
    })
  }

  if (loading) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl font-semibold flex items-center gap-2">
            Combina Bien Con...
          </h3>
          <Link 
            to="/all-products"
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => {
            const displayPrice = product.variants && product.variants.length > 0
              ? product.variants[0].price
              : product.price || 0

            return (
              <div 
                key={product.id} 
                className="group relative"
              >
                <Link 
                  to={`/products/${product.slug}`}
                  className="block"
                >
                  {/* Image */}
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-3 group-hover:ring-2 group-hover:ring-primary/20 transition-all">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h4 className="font-heading font-semibold text-base group-hover:text-primary transition-colors line-clamp-2">
                      {product.title}
                    </h4>
                    <p className="font-heading text-lg font-bold">
                      {formatMoney(displayPrice, currencyCode)}
                    </p>
                  </div>
                </Link>

                {/* Quick Add Button */}
                <Button
                  size="sm"
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.preventDefault()
                    handleQuickAdd(product)
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}