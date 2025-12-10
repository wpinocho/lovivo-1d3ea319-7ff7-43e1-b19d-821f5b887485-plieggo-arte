import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

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
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-card border-border overflow-hidden transition-all hover:shadow-lg group relative">
          <CardContent className="p-0 relative">
            {/* Imagen del producto - siempre visible */}
            <div className="bg-muted overflow-hidden relative">
              {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                <img
                  src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                  alt={logic.product.title}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No hay imagen
                </div>
              )}

              {/* Overlay con detalles - aparece en hover */}
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                {/* Top: Badges */}
                <div className="flex flex-col gap-2 items-start">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-sm font-medium">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm font-medium">
                      Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-sm font-medium">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Middle: Título y descripción */}
                <div className="flex-1 flex flex-col justify-center">
                  <Link to={`/products/${logic.product.slug}`} className="block mb-3">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2 line-clamp-2">
                      {logic.product.title}
                    </h3>
                    {logic.product.description && (
                      <p className="font-body text-muted-foreground text-sm line-clamp-2">
                        {logic.product.description.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                  </Link>

                  {/* Variantes */}
                  {logic.hasVariants && logic.options && (
                    <div className="mb-3 space-y-2">
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
                                    onClick={() => logic.handleOptionChange(opt.name, val)}
                                    title={`${opt.name}: ${val}`}
                                    className={`h-6 w-6 rounded-full border-2 transition-all ${
                                      isSelected ? 'border-foreground scale-110' : 'border-border'
                                    } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
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
                                  onClick={() => logic.handleOptionChange(opt.name, val)}
                                  className={`border-2 rounded-sm px-2 py-0.5 text-xs font-medium transition-all ${
                                    isSelected 
                                      ? 'border-foreground bg-foreground text-background' 
                                      : logic.selected[opt.name] && !isSelected
                                        ? 'border-border bg-background text-muted-foreground opacity-40'
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

                {/* Bottom: Precio y botón */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-heading text-foreground font-bold text-xl">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                    {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                      <span className="font-body text-muted-foreground text-sm line-through">
                        {logic.formatMoney(logic.currentCompareAt)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      logic.onAddToCartSuccess()
                      logic.handleAddToCart()
                    }}
                    disabled={!logic.canAddToCart}
                    className="btn-hero"
                  >
                    {logic.inStock ? 'Agregar' : 'Agotado'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}