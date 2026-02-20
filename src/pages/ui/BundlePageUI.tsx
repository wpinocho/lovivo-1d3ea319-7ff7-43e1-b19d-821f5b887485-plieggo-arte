import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { useCart } from '@/contexts/CartContext'
import { useCartUI } from '@/components/CartProvider'
import { useSettings } from '@/contexts/SettingsContext'
import { useCollectionProducts } from '@/hooks/useCollectionProducts'
import {
  Package, Sparkles, ShoppingCart, ChevronRight,
  Tag, Truck, Award, Clock, Check,
} from 'lucide-react'
import type { Bundle, BundleItem, Product, ProductVariant } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface BundlePageUIProps {
  bundle: Bundle | null
  items: BundleItem[]
  loading: boolean
  notFound: boolean
}

// ─── variant_filter puede ser string o JSONB { option_values: ["50cm x 50cm"] } ───
const getFilterValues = (vf: any): string[] => {
  if (!vf) return []
  if (typeof vf === 'string') return [vf]
  if (vf.option_values && Array.isArray(vf.option_values)) return vf.option_values
  return []
}

interface ProductEntry {
  product: Product
  variant?: ProductVariant
}

const filterProductsByVariant = (products: Product[], variantFilter: any): ProductEntry[] => {
  const filters = getFilterValues(variantFilter)
  if (filters.length === 0) return products.map(p => ({ product: p, variant: undefined }))

  return products.flatMap(product => {
    const matchingVariants = (product.variants || []).filter(v =>
      filters.some(f =>
        v.title?.includes(f) ||
        Object.values(v.option_values || {}).some(val => String(val).includes(f))
      )
    )
    return matchingVariants.length > 0
      ? matchingVariants.map(variant => ({ product, variant }))
      : []
  })
}

export const BundlePageUI = ({ bundle, items, loading, notFound }: BundlePageUIProps) => {
  const { formatMoney } = useSettings()
  const { addBundle } = useCart()
  const { openCart } = useCartUI()

  // Image gallery state
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Mix & match inline selection state
  const [selected, setSelected] = useState<ProductEntry[]>([])

  const isMixMatch =
    bundle?.bundle_type === 'mix_match' || bundle?.bundle_type === 'mix_match_variant'
  const isFixed = bundle?.bundle_type === 'fixed' || !bundle?.bundle_type
  const isCollectionFixed = bundle?.bundle_type === 'collection_fixed'

  // Load collection products for collection_fixed, mix_match, mix_match_variant
  const needsCollection = isMixMatch || isCollectionFixed
  const { products: collectionProducts, loading: collectionLoading } = useCollectionProducts(
    needsCollection ? bundle?.source_collection_id : null
  )

  const pickQuantity = bundle?.pick_quantity ?? 2

  // Available items for mix_match (with variant filter)
  const availableItems = useMemo<ProductEntry[]>(() => {
    if (!isMixMatch) return []
    if (bundle?.bundle_type === 'mix_match_variant' && bundle?.variant_filter) {
      return filterProductsByVariant(collectionProducts, bundle.variant_filter)
    }
    return collectionProducts.map(p => ({ product: p, variant: undefined }))
  }, [collectionProducts, isMixMatch, bundle])

  // Collection fixed items (with variant filter)
  const collectionFixedItems = useMemo<ProductEntry[]>(() => {
    if (!isCollectionFixed) return []
    return filterProductsByVariant(collectionProducts, bundle?.variant_filter)
  }, [collectionProducts, isCollectionFixed, bundle])

  // Image gallery
  const allImages = bundle?.images || []
  const mainImage = selectedImage || allImages[0] || null
  const hasMultipleImages = allImages.length > 1

  const savings =
    bundle?.compare_at_price && bundle.compare_at_price > bundle.bundle_price
      ? bundle.compare_at_price - bundle.bundle_price
      : null

  // Mix & match progress
  const progress = isMixMatch ? (selected.length / pickQuantity) * 100 : 0
  const isComplete = selected.length === pickQuantity
  const remaining = pickQuantity - selected.length

  // SEO
  useEffect(() => {
    if (bundle) document.title = `${bundle.title} — Plieggo`
    return () => { document.title = 'Plieggo' }
  }, [bundle])

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const toggleItem = (product: Product, variant?: ProductVariant) => {
    const already = selected.some(s => s.product.id === product.id)
    if (already) {
      setSelected(prev => prev.filter(s => s.product.id !== product.id))
    } else if (selected.length < pickQuantity) {
      setSelected(prev => [...prev, { product, variant }])
    }
  }

  // Fixed bundle (bundle_items table)
  const handleAddFixed = () => {
    if (!bundle || items.length === 0) return
    const bundleItems = items
      .filter(i => i.products)
      .map(i => {
        const variant = i.variant_id
          ? i.products!.variants?.find(v => v.id === i.variant_id)
          : undefined
        return { product: i.products!, variant, quantity: i.quantity }
      })
    addBundle(bundle, bundleItems)
    setTimeout(() => openCart(), 300)
  }

  // Collection fixed (products from source_collection_id)
  const handleAddCollectionFixed = () => {
    if (!bundle) return
    const toAdd = collectionFixedItems.slice(0, bundle.pick_quantity ?? collectionFixedItems.length)
    addBundle(bundle, toAdd.map(({ product, variant }) => ({ product, variant, quantity: 1 })))
    setTimeout(() => openCart(), 300)
  }

  // Mix & match (inline selection)
  const handleAddMixMatch = () => {
    if (!bundle || !isComplete) return
    addBundle(bundle, selected.map(({ product, variant }) => ({ product, variant, quantity: 1 })))
    setSelected([])
    setTimeout(() => openCart(), 300)
  }

  // ─── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <EcommerceTemplate>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-muted rounded-2xl" />
            <div className="space-y-4 pt-4">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-10 bg-muted rounded w-4/5" />
              <div className="h-12 bg-muted rounded w-2/5" />
              <div className="h-24 bg-muted rounded" />
              <div className="h-14 bg-muted rounded" />
            </div>
          </div>
        </main>
      </EcommerceTemplate>
    )
  }

  // ─── Not found ───────────────────────────────────────────────────────────────
  if (notFound || !bundle) {
    return (
      <EcommerceTemplate>
        <main className="max-w-7xl mx-auto px-4 py-24 text-center">
          <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-30" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
            Paquete no encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            Este paquete no existe o ya no está disponible.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </main>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: bundle.title,
            description: bundle.description,
            image: mainImage,
            offers: {
              '@type': 'Offer',
              price: bundle.bundle_price,
              priceCurrency: 'MXN',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      <main className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12',
        isMixMatch && 'pb-28 lg:pb-12'
      )}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span>Paquetes</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-medium line-clamp-1">{bundle.title}</span>
        </nav>

        {/* ── HERO (2 columnas) ────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">

          {/* Left: Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-lg">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <Package className="w-24 h-24 opacity-20 text-muted-foreground" />
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all snap-center',
                      (selectedImage === img || (!selectedImage && i === 0))
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-secondary'
                    )}
                  >
                    <img src={img} alt={`${bundle.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info panel */}
          <div className="flex flex-col">

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                {isMixMatch
                  ? <><Sparkles className="w-3.5 h-3.5" />Arma tu paquete</>
                  : <><Package className="w-3.5 h-3.5" />Paquete especial</>}
              </span>
              {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                <span className="bg-secondary/15 text-secondary text-xs px-3 py-1.5 rounded-full font-semibold">
                  -{bundle.discount_percentage}% descuento
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              {bundle.title}
            </h1>

            {/* Price row */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <span className="font-heading text-4xl font-bold text-foreground">
                {formatMoney(bundle.bundle_price)}
              </span>
              {bundle.compare_at_price && bundle.compare_at_price > bundle.bundle_price && (
                <span className="text-muted-foreground text-xl line-through">
                  {formatMoney(bundle.compare_at_price)}
                </span>
              )}
              {savings && (
                <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Ahorras {formatMoney(savings)}
                </span>
              )}
            </div>

            {/* Description */}
            {bundle.description && (
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-6">
                {bundle.description}
              </p>
            )}

            {/* ─ FIXED: includes preview ─ */}
            {isFixed && items.length > 0 && (
              <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Incluye:</p>
                <div className="space-y-2.5">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.products?.images?.[0] && (
                        <img
                          src={item.products.images[0]}
                          alt={item.products.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <span className="text-sm text-foreground font-medium flex-1 leading-tight">
                        {item.quantity}× {item.products?.title}
                      </span>
                      <span className="text-sm text-muted-foreground shrink-0">
                        {item.products?.price ? formatMoney(item.products.price) : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─ COLLECTION FIXED: includes preview ─ */}
            {isCollectionFixed && collectionFixedItems.length > 0 && (
              <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Incluye:</p>
                <div className="space-y-2.5">
                  {collectionFixedItems
                    .slice(0, bundle.pick_quantity ?? collectionFixedItems.length)
                    .map(({ product, variant }) => (
                      <div key={product.id} className="flex items-center gap-3">
                        {(variant?.image || product.images?.[0]) && (
                          <img
                            src={variant?.image || product.images![0]}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        )}
                        <span className="text-sm text-foreground font-medium flex-1 leading-tight">
                          1× {product.title}
                          {variant?.title && (
                            <span className="text-muted-foreground font-normal"> · {variant.title}</span>
                          )}
                        </span>
                        <span className="text-sm text-muted-foreground shrink-0">
                          {formatMoney(variant?.price ?? product.price ?? 0)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ─ MIX & MATCH: progress bar in hero ─ */}
            {isMixMatch && (
              <div className="mb-6 space-y-2.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Elegiste{' '}
                    <span className="font-semibold text-foreground">{selected.length}</span>
                    {' '}de{' '}
                    <span className="font-semibold text-foreground">{pickQuantity}</span>
                    {' '}{pickQuantity === 1 ? 'producto' : 'productos'}
                  </span>
                  {isComplete && (
                    <span className="text-green-600 font-semibold flex items-center gap-1 text-xs">
                      <Check className="w-3 h-3" />¡Listo!
                    </span>
                  )}
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* CTA Button */}
            <div className="space-y-2 mb-8">
              {isFixed && (
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  onClick={handleAddFixed}
                  disabled={items.length === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {items.length === 0 ? 'Paquete no disponible' : 'Agregar paquete al carrito'}
                </Button>
              )}

              {isCollectionFixed && (
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  onClick={handleAddCollectionFixed}
                  disabled={collectionLoading || collectionFixedItems.length === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {collectionLoading ? 'Cargando...' : 'Agregar paquete al carrito'}
                </Button>
              )}

              {isMixMatch && (
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  onClick={handleAddMixMatch}
                  disabled={!isComplete}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isComplete
                    ? `Agregar al carrito — ${formatMoney(bundle.bundle_price)}`
                    : `Elige ${remaining} ${remaining === 1 ? 'producto' : 'productos'} más`}
                </Button>
              )}

              <p className="text-xs text-muted-foreground text-center pt-1">
                El descuento se aplica automáticamente al finalizar tu pedido
              </p>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-medium">Envío a todo México</p>
              </div>
              <div className="text-center">
                <Award className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-medium">Hecho a mano</p>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-medium">Entrega garantizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FIXED: What's included (grid) ───────────────────────────────────── */}
        {isFixed && items.length > 0 && (
          <section className="mb-20" aria-labelledby="bundle-includes-fixed">
            <h2
              id="bundle-includes-fixed"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            >
              Qué incluye este paquete
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item.id} className="text-center group">
                  <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    {item.products?.images?.[0] ? (
                      <img
                        src={item.products.images[0]}
                        alt={item.products.title || ''}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Package className="w-8 h-8 opacity-30" />
                      </div>
                    )}
                  </div>
                  <p className="font-heading font-semibold text-foreground text-sm mb-0.5">
                    {item.quantity}× {item.products?.title}
                  </p>
                  <p className="font-body text-muted-foreground text-xs">
                    {item.products?.price ? formatMoney(item.products.price) : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── COLLECTION FIXED: What's included (grid) ────────────────────────── */}
        {isCollectionFixed && collectionFixedItems.length > 0 && (
          <section className="mb-20" aria-labelledby="bundle-includes-coll">
            <h2
              id="bundle-includes-coll"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            >
              Qué incluye este paquete
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {collectionFixedItems
                .slice(0, bundle.pick_quantity ?? collectionFixedItems.length)
                .map(({ product, variant }) => (
                  <div key={product.id} className="text-center group">
                    <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                      {(variant?.image || product.images?.[0]) ? (
                        <img
                          src={variant?.image || product.images![0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="w-8 h-8 opacity-30" />
                        </div>
                      )}
                    </div>
                    <p className="font-heading font-semibold text-foreground text-sm mb-0.5">
                      1× {product.title}
                      {variant?.title && (
                        <span className="font-normal text-muted-foreground block text-xs">{variant.title}</span>
                      )}
                    </p>
                    <p className="font-body text-muted-foreground text-xs">
                      {formatMoney(variant?.price ?? product.price ?? 0)}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ── MIX & MATCH: INLINE PICKER ──────────────────────────────────────── */}
        {isMixMatch && (
          <section className="mb-20" aria-labelledby="bundle-picker">
            {/* Section header */}
            <div className="mb-8 text-center space-y-2">
              <h2
                id="bundle-picker"
                className="font-heading text-2xl md:text-3xl font-bold text-foreground"
              >
                Elige tus {pickQuantity} {pickQuantity === 1 ? 'producto' : 'productos'}
              </h2>
              <p className="text-muted-foreground font-body max-w-md mx-auto">
                {isComplete
                  ? '¡Perfecto! Ya puedes agregar tu paquete al carrito.'
                  : `Selecciona ${remaining} ${remaining === 1 ? 'producto más' : 'productos más'} para completar tu paquete.`}
              </p>
            </div>

            {/* Progress */}
            <div className="max-w-sm mx-auto mb-10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{selected.length} de {pickQuantity} seleccionados</span>
                {isComplete && (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />¡Listo!
                  </span>
                )}
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Product grid */}
            {collectionLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="bg-muted rounded-xl aspect-square" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : availableItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-body">No hay productos disponibles en este paquete.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {availableItems.map(({ product, variant }) => {
                  const isItemSelected = selected.some(s => s.product.id === product.id)
                  const isDisabled = !isItemSelected && selected.length >= pickQuantity
                  const price = variant?.price ?? product.price
                  const image = variant?.image || product.images?.[0]

                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleItem(product, variant)}
                      disabled={isDisabled}
                      className={cn(
                        'relative text-left rounded-xl overflow-hidden border-2 transition-all duration-200 group',
                        isItemSelected
                          ? 'border-primary ring-2 ring-primary/25 shadow-md scale-[0.98]'
                          : isDisabled
                          ? 'border-border opacity-40 cursor-not-allowed'
                          : 'border-border hover:border-primary/50 hover:shadow-md cursor-pointer'
                      )}
                    >
                      {/* Image */}
                      <div className="aspect-square bg-muted overflow-hidden">
                        {image ? (
                          <img
                            src={image}
                            alt={product.title}
                            className={cn(
                              'w-full h-full object-cover transition-transform duration-300',
                              !isDisabled && 'group-hover:scale-105'
                            )}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                      </div>

                      {/* Selected checkmark */}
                      {isItemSelected && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-1">
                          {product.title}
                          {variant?.title && (
                            <span className="text-muted-foreground font-normal"> · {variant.title}</span>
                          )}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatMoney(price || 0)}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Desktop bottom CTA (only when complete) */}
            {isComplete && (
              <div className="mt-10 text-center hidden lg:block">
                <Button
                  size="lg"
                  className="px-12 h-14 text-base font-semibold"
                  onClick={handleAddMixMatch}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito — {formatMoney(bundle.bundle_price)}
                </Button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ── STICKY MOBILE CTA (mix_match only) ──────────────────────────────── */}
      {isMixMatch && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border p-4 flex items-center gap-3 shadow-2xl">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-none">
              {selected.length} de {pickQuantity}
              <span className="text-muted-foreground font-normal ml-1">seleccionados</span>
            </p>
            {savings && (
              <p className="text-xs text-secondary font-medium mt-0.5">
                Ahorras {formatMoney(savings)}
              </p>
            )}
          </div>
          <Button
            disabled={!isComplete}
            onClick={handleAddMixMatch}
            size="lg"
            className="shrink-0 h-12 font-semibold"
          >
            {isComplete
              ? `Agregar — ${formatMoney(bundle.bundle_price)}`
              : `Elige ${remaining} más`}
          </Button>
        </div>
      )}
    </EcommerceTemplate>
  )
}