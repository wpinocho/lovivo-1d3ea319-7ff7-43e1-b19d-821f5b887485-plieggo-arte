import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ShoppingCart, ArrowLeft, Plus, Minus, Package, Shield, Award, MapPin, Sparkles, Ruler, Palette, Frame, Zap, Clock, HeartHandshake } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ProductBadge, type BadgeType } from "@/components/ProductBadge"
import { ProductFAQ } from "@/components/ProductFAQ"
import { CrossSellSection } from "@/components/CrossSellSection"
import { ProductRating } from "@/components/ProductRating"
import { getProductReview } from "@/data/product-reviews"
import { ReviewsModal } from "@/components/ReviewsModal"
import { ProductInspirationGallery } from "@/components/ProductInspirationGallery"

import type { Product, ProductVariant } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductPageUI
 * 
 * Este componente solo maneja la presentación de la página de producto.
 * Recibe toda la lógica como props del HeadlessProduct.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Header y navegación
 * - Animaciones y efectos
 * - Agregar features visuales (zoom de imagen, etc.)
 */

interface ProductPageUIProps {
  logic: {
    // Product data
    product: any
    loading: boolean
    notFound: boolean
    
    // Selection state
    selected: Record<string, string>
    quantity: number
    
    // Calculated values
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    displayImages: string[]
    
    // Handlers
    setSelectedImage: (image: string) => void
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleBuyNow: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    
    // Any other properties that might come from HeadlessProduct
    [key: string]: any
  }
  // Modal mode: No renderizar EcommerceTemplate (sin header/navegación)
  noTemplate?: boolean
}

export const ProductPageUI = ({ logic, noTemplate = false }: ProductPageUIProps) => {
  // Estado del modal de reviews
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false)
  
  // Scroll to top when component mounts (solo si no es modal)
  useEffect(() => {
    if (!noTemplate) {
      window.scrollTo(0, 0);
    }
  }, [noTemplate]);

  // Reset selected image when variant changes
  useEffect(() => {
    if (logic.displayImages && logic.displayImages.length > 0) {
      logic.setSelectedImage(logic.displayImages[0]);
    }
  }, [logic.matchingVariant]);

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-8">El producto que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  // Main product content
  const productContent = (
    <>
      {/* Add padding-bottom on mobile for sticky CTA bar */}
      <div className="space-y-8 pb-24 lg:pb-0">
        {/* Mobile-optimized flex layout with order control */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* 1. IMAGEN PRINCIPAL - Order 1 mobile, left column desktop */}
          <div className="order-1 lg:order-none aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={logic.currentImage || "/placeholder.svg"}
              alt={logic.product.title}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-contain"
            />
          </div>

          {/* 2. PRODUCT INFO (Title, Price, Options, CTAs) - Order 2 mobile, right column desktop */}
          <div className="order-2 lg:order-none space-y-6">
            {/* Badge */}
            {logic.product.badge && (
              <ProductBadge type={logic.product.badge as BadgeType} />
            )}
            
            <div>
              <h1 className="text-3xl font-bold">{logic.product.title}</h1>
              
              {/* Rating Summary - Dinámico por producto */}
              {(() => {
                const review = getProductReview(logic.product.slug)
                return review.reviewCount > 0 ? (
                  <div className="mt-3">
                    <ProductRating 
                      rating={review.rating} 
                      reviewCount={review.reviewCount}
                      onClick={() => setIsReviewsModalOpen(true)}
                    />
                  </div>
                ) : null
              })()}
            
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl font-bold">
                {logic.formatMoney(logic.currentPrice)}
              </span>
              {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {logic.formatMoney(logic.currentCompareAt)}
                </span>
              )}
            </div>
          </div>

          {/* Product Options - Moved below price */}
          {logic.product.options && logic.product.options.length > 0 && (
            <div className="space-y-4">
              {logic.product.options.map((option) => (
                <div key={option.name}>
                  <Label className="text-base font-medium">{option.name}</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {option.values.map((value) => {
                      const isSelected = logic.selected[option.name] === value
                      const isAvailable = logic.isOptionValueAvailable(option.name, value)
                      
                      // Get inventory info for urgency/scarcity
                      const variant = logic.product.variants?.find((v: any) => 
                        v.title === value || Object.values(v.option_values || {}).includes(value)
                      )
                      const inventory = variant?.inventory_quantity || 0
                      const trackInventory = variant?.track_inventory !== false
                      const showUrgency = isAvailable && trackInventory && inventory > 0 && inventory <= 5
                      const showBackorder = isAvailable && (!trackInventory || inventory === 0)
                      
                      return (
                        <div key={value} className="flex flex-col gap-1.5">
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => logic.handleOptionSelect(option.name, value)}
                            className={!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            {value}
                            {!isAvailable && (
                              <span className="ml-1 text-xs">(Agotado)</span>
                            )}
                          </Button>
                          {isSelected && showUrgency && (
                            <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {inventory === 1 ? '¡Solo 1 disponible!' : `Últimas ${inventory} unidades`}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart - Moved below price */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="quantity" className="text-base font-medium">
                Cantidad
              </Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                  disabled={logic.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={logic.quantity}
                  onChange={(e) => logic.handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Comprar ahora - Botón primario */}
              <Button
                onClick={logic.handleBuyNow}
                disabled={!logic.inStock || logic.isCheckingOut}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {logic.isCheckingOut ? 'Procesando...' : (logic.inStock ? 'Comprar ahora' : 'Agotado')}
              </Button>

              {/* Agregar al carrito - Botón secundario */}
              <Button
                onClick={logic.handleAddToCart}
                disabled={!logic.inStock}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {logic.inStock ? 'Agregar al carrito' : 'Agotado'}
              </Button>
              
              {/* Trust Badges */}
              <Card className="border-secondary/20 bg-secondary/5">
                <CardContent className="pt-4 pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Package className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground"><span className="font-medium">Envío gratis</span> en CDMX</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <HeartHandshake className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground"><span className="font-medium">Pieza única</span> hecha a mano</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground"><span className="font-medium">Garantía</span> de satisfacción 30 días</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground"><span className="font-medium">Diseño 100% mexicano</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          </div>

          {/* 3. THUMBNAILS - Order 3 mobile (after CTAs), stays in left column desktop */}
          {logic.displayImages && logic.displayImages.length > 1 && (
            <div className="order-3 lg:order-none lg:col-start-1 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {logic.displayImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => logic.setSelectedImage(img)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all snap-center",
                    logic.selectedImage === img || (index === 0 && !logic.selectedImage)
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-secondary"
                  )}
                >
                  <img
                    src={img}
                    alt={`${logic.product.title} - imagen ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* 4-13. REMAINING SECTIONS - Order 4+ mobile, span full width */}
          <div className="order-4 lg:order-none lg:col-span-2 space-y-8">
            
            {/* Description Section */}
            {logic.product.description && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Descripción de la Pieza
                  </h3>
                  <div 
                    className="text-muted-foreground prose prose-sm max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: logic.product.description }}
                  />
                </div>
              </div>
            )}

            {/* Storytelling Section - Historia de Inspiración */}
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  La Historia Detrás de Esta Pieza
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Inspirada en el arte milenario del origami japonés y la elegancia de los abanicos plegables, 
                  esta pieza celebra la geometría orgánica y el movimiento contenido. Cada pliegue es una expresión 
                  de simetría perfecta, relieve táctil y delicadeza visual. La técnica de doblado arquitectónico 
                  busca traer balance y sofisticación contemporánea, donde la luz y la sombra danzan entre los pliegues 
                  para crear profundidad escultural. Es un homenaje a la paciencia artesanal y la belleza de lo simple.
                </p>
                
                {/* Creation Details */}
                <div className="flex flex-wrap gap-4 text-sm mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>8-12 horas de creación</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Palette className="h-4 w-4 text-primary" />
                    <span>Origami arquitectónico</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Cada pliegue hecho a mano</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  Especificaciones
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium block">Dimensiones</span>
                      <span className="text-muted-foreground">
                        {logic.matchingVariant?.title?.split('/')[0]?.trim() || 'Variable'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium block">Material</span>
                      <span className="text-muted-foreground">Papel Canson 300g</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Frame className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium block">Marco</span>
                      <span className="text-muted-foreground">Madera natural</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-medium block">Protección</span>
                      <span className="text-muted-foreground">Acrílico 3mm</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Plieggo */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-heading text-lg font-semibold mb-4 text-primary">Por Qué Elegir Plieggo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <HeartHandshake className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block text-sm">Único</span>
                      <span className="text-xs text-muted-foreground">Cada pieza es única</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block text-sm">Premium</span>
                      <span className="text-xs text-muted-foreground">Materiales de alta calidad</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block text-sm">Mexicano</span>
                      <span className="text-xs text-muted-foreground">100% diseño nacional</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Frame className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block text-sm">Listo para colgar</span>
                      <span className="text-xs text-muted-foreground">Marco incluido</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspiration Gallery - Muestra el producto en contextos reales */}
            <ProductInspirationGallery productSlug={logic.product.slug} />

            {/* Size Guide - Visual */}
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted/30 p-6">
                  <h3 className="font-heading text-lg font-semibold mb-2 flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-primary" />
                    Guía de Tamaños
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Encuentra el tamaño perfecto para tu espacio
                  </p>
                </div>
                <img
                  src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1768866178168-84itdh4fyv.png"
                  alt="Guía de tamaños - 20x20cm, 50x50cm, 30x90cm con persona de referencia"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={logic.handleNavigateBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir comprando
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <ProductFAQ />

        {/* Cross-sell Section */}
        <CrossSellSection currentProduct={logic.product} />
      </div>

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        productSlug={logic.product.slug}
        productTitle={logic.product.title}
      />

      {/* Sticky CTA Bar - Mobile Only (Best Practice for Conversion) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg z-40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Precio</p>
            <p className="text-xl font-bold">{logic.formatMoney(logic.currentPrice)}</p>
          </div>
          <Button
            onClick={logic.handleBuyNow}
            disabled={!logic.inStock || logic.isCheckingOut}
            size="lg"
            className="flex-1"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {logic.isCheckingOut ? 'Procesando...' : (logic.inStock ? 'Comprar' : 'Agotado')}
          </Button>
        </div>
      </div>
    </>
  )

  // Render con o sin template según el modo
  return noTemplate ? productContent : <EcommerceTemplate>{productContent}</EcommerceTemplate>
}