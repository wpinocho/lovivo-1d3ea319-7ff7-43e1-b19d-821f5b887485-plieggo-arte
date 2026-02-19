import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { ProductBadge, type BadgeType } from "@/components/ProductBadge"
import { ProductRating } from "@/components/ProductRating"
import type { Product } from "@/lib/supabase"
import { getBadgeForProduct } from "@/lib/product-badges"
import { getProductReview } from "@/data/product-reviews"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
  aspectRatio?: 'square' | 'rectangle' | 'auto'
}

export const ProductCardUI = ({ product, aspectRatio = 'auto' }: ProductCardUIProps) => {
  const navigate = useNavigate()
  const badge = getBadgeForProduct(product)
  const review = getProductReview(product.slug)
  
  // Determine aspect ratio class - MOBILE: always square, DESKTOP: use real ratio
  const aspectRatioClass = aspectRatio === 'square' 
    ? 'aspect-square' 
    : aspectRatio === 'rectangle'
    ? 'aspect-square md:aspect-[1/2]'  // Mobile: square, Desktop: rectangle
    : 'aspect-square md:aspect-auto'   // Mobile: square, Desktop: auto
  
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card 
          className="bg-card border-2 border-transparent overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:-translate-y-2 group relative cursor-pointer"
          onClick={() => navigate(`/products/${logic.product.slug}`)}
        >
          <CardContent className="p-0 relative">
            {/* Badge arriba de la imagen - Posición top-right más prominente */}
            {badge && (
              <div className="absolute top-3 right-3 z-10 transition-transform duration-300 group-hover:scale-110">
                <ProductBadge type={badge as BadgeType} />
              </div>
            )}
            
            {/* Imagen del producto - con efecto hover para segunda imagen */}
            <div className={`bg-muted overflow-hidden relative ${aspectRatioClass}`}>
              {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                <>
                  {/* Imagen principal */}
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                  />
                  {/* Segunda imagen al hover (solo si existe) */}
                  {!logic.matchingVariant?.image && logic.product.images && logic.product.images.length > 1 && (
                    <img
                      src={logic.product.images[1]}
                      alt={`${logic.product.title} - vista alternativa`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No hay imagen
                </div>
              )}

              {/* Overlay con variantes - aparece en hover (solo para quick-add) */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 translate-y-4 group-hover:translate-y-0">
                {/* Top: Badges de descuento */}
                <div className="flex flex-col gap-2 items-start">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-sm font-medium">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-sm font-medium">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Middle: Variantes para quick-add */}
                <div className="flex-1 flex flex-col justify-center">
                  {logic.hasVariants && logic.options && (
                    <div className="space-y-3">
                      {logic.options.map((opt) => (
                        <div key={opt.id}>
                          <div className="font-body text-xs font-medium text-foreground mb-1">{opt.name}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                              const isSelected = logic.selected[opt.name] === val
                              const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                              if (swatch) {
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      logic.handleOptionChange(opt.name, val)
                                    }}
                                    title={`${opt.name}: ${val}`}
                                    className={`h-7 w-7 rounded-full border-2 transition-all ${
                                      isSelected ? 'border-foreground scale-110 ring-2 ring-primary' : 'border-border'
                                    } ${logic.selected[opt.name] && !isSelected ? 'opacity-70' : ''}`}
                                    style={{ 
                                      backgroundColor: swatch
                                    }}
                                    aria-label={`${opt.name}: ${val}`}
                                  />
                                )
                              }

                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    logic.handleOptionChange(opt.name, val)
                                  }}
                                  className={`border-2 rounded-sm px-2 py-1 text-xs font-medium transition-all ${
                                    isSelected 
                                      ? 'border-foreground bg-foreground text-background' 
                                      : logic.selected[opt.name] && !isSelected
                                        ? 'border-border bg-background text-muted-foreground opacity-70'
                                        : 'border-border bg-background text-foreground hover:border-foreground'
                                  }`}
                                  aria-pressed={isSelected}
                                  aria-label={`${opt.name}: ${val}`}
                                  title={`${opt.name}: ${val}`}
                                >
                                  {val}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom: Botón agregar al carrito en hover */}
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="btn-hero w-full"
                >
                  {logic.inStock ? 'Agregar al carrito' : 'Agotado'}
                </Button>
              </div>
            </div>

            {/* INFO SIEMPRE VISIBLE - Debajo de la imagen */}
            <div className="p-4 space-y-3">
              {/* Título y descripción */}
              <div>
                <h3 className="font-heading font-semibold text-foreground text-base md:text-lg mb-1 line-clamp-2 leading-tight">
                  {logic.product.title}
                </h3>
                {review && (
                  <div className="mb-2">
                    <ProductRating rating={review.rating} count={review.count} size="sm" />
                  </div>
                )}
              </div>

              {/* Precio y CTA - Siempre visible */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-heading text-foreground font-bold text-xl md:text-2xl">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="font-body text-muted-foreground text-xs line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 font-medium text-xs md:text-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/products/${logic.product.slug}`)
                  }}
                >
                  Ver detalle →
                </Button>
              </div>

              {/* Urgencia de stock */}
              {logic.product.inventory && logic.product.inventory < 5 && logic.product.inventory > 0 && (
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <span className="text-destructive font-medium">
                    ⚠️ ¡Solo quedan {logic.product.inventory}!
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}