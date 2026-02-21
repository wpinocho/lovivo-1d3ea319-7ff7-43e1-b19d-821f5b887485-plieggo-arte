import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { useCart } from '@/contexts/CartContext'
import type { BundleItemEntry } from '@/contexts/CartContext'
import { useCartUI } from '@/components/CartProvider'
import { useSettings } from '@/contexts/SettingsContext'
import { useCollectionProducts } from '@/hooks/useCollectionProducts'
import {
  Package, Sparkles, ShoppingCart, ChevronRight,
  Tag, Truck, Award, Clock, Check, Plus, Minus,
} from 'lucide-react'
import type { Bundle, BundleItem, Product, ProductVariant } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface BundlePageUIProps {
  bundle: Bundle | null
  items: BundleItem[]
  loading: boolean
  notFound: boolean
}

// ─── Image helpers ───────────────────────────────────────────────────────────
/**
 * Resolve the best image for a variant+product combo.
 * Priority: variant.image_urls[0] → variant.image → product.images[0]
 */
const resolveImage = (product?: Product, variant?: ProductVariant): string | undefined => {
  if (variant) {
    if (variant.image_urls && variant.image_urls.length > 0) return variant.image_urls[0]
    if (variant.image) return variant.image
  }
  return product?.images?.[0]
}

/**
 * Resolve the best image for a BundleItem (fixed type).
 * Looks up the variant by variant_id and uses its image first.
 */
const resolveBundleItemImage = (item: BundleItem): string | undefined => {
  const variant = item.variant_id
    ? item.products?.variants?.find(v => v.id === item.variant_id)
    : undefined
  return resolveImage(item.products, variant)
}

// ─── variant_filter helpers ───────────────────────────────────────────────────
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

/**
 * Filter products by variant_filter JSONB field.
 * Falls back to all products (no variant) when nothing matches —
 * this fixes the bug where products have no configured variants.
 */
const filterProductsByVariant = (products: Product[], variantFilter: any): ProductEntry[] => {
  const filters = getFilterValues(variantFilter)
  if (filters.length === 0) return products.map(p => ({ product: p, variant: undefined }))

  const filtered = products.flatMap(product => {
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

  // ✅ Fallback: if no variants match, show all products without variant filter
  return filtered.length > 0 ? filtered : products.map(p => ({ product: p, variant: undefined }))
}

const getItemKey = (product: Product, variant?: ProductVariant) =>
  `${product.id}${variant ? `:${variant.id}` : ''}`

// ─── Main Component ───────────────────────────────────────────────────────────
export const BundlePageUI = ({ bundle, items, loading, notFound }: BundlePageUIProps) => {
  const { formatMoney } = useSettings()
  const { addBundle } = useCart()
  const { openCart } = useCartUI()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // mix_match: array of selected product entries
  const [mmSelected, setMmSelected] = useState<ProductEntry[]>([])

  // collection_fixed: quantity counter per product key
  const [cfCounts, setCfCounts] = useState<Record<string, number>>({})

  // ─── Bundle type flags ───────────────────────────────────────────────────
  const isMixMatch = bundle?.bundle_type === 'mix_match' || bundle?.bundle_type === 'mix_match_variant'
  const isFixed = bundle?.bundle_type === 'fixed' || !bundle?.bundle_type
  const isCollectionFixed = bundle?.bundle_type === 'collection_fixed'
  const showPicker = isMixMatch || isCollectionFixed

  const { products: collectionProducts, loading: collectionLoading } = useCollectionProducts(
    showPicker ? bundle?.source_collection_id : null
  )

  const pickQuantity = bundle?.pick_quantity ?? 2

  // Available items for mix_match
  const mmItems = useMemo<ProductEntry[]>(() => {
    if (!isMixMatch) return []
    if (bundle?.bundle_type === 'mix_match_variant' && bundle?.variant_filter) {
      return filterProductsByVariant(collectionProducts, bundle.variant_filter)
    }
    return collectionProducts.map(p => ({ product: p, variant: undefined }))
  }, [collectionProducts, isMixMatch, bundle])

  // Available items for collection_fixed (with fallback)
  const cfItems = useMemo<ProductEntry[]>(() => {
    if (!isCollectionFixed) return []
    return filterProductsByVariant(collectionProducts, bundle?.variant_filter)
  }, [collectionProducts, isCollectionFixed, bundle])

  // ─── Computed state ──────────────────────────────────────────────────────

  // Mix & match
  const mmTotal = mmSelected.length
  const mmComplete = mmTotal === pickQuantity
  const mmRemaining = pickQuantity - mmTotal
  const mmProgress = pickQuantity > 0 ? (mmTotal / pickQuantity) * 100 : 0

  // Collection fixed
  const cfTotal = Object.values(cfCounts).reduce((a, b) => a + b, 0)
  const cfComplete = cfTotal === pickQuantity
  const cfRemaining = pickQuantity - cfTotal
  const cfProgress = pickQuantity > 0 ? (cfTotal / pickQuantity) * 100 : 0

  // Unified (used for hero + sticky bar)
  const pickerTotal = isCollectionFixed ? cfTotal : mmTotal
  const isComplete = isCollectionFixed ? cfComplete : mmComplete
  const remaining = isCollectionFixed ? cfRemaining : mmRemaining
  const progress = isCollectionFixed ? cfProgress : mmProgress

  // Image gallery
  const allImages = bundle?.images || []
  const mainImage = selectedImage || allImages[0] || null

  const savings =
    bundle?.compare_at_price && bundle.compare_at_price > bundle.bundle_price
      ? bundle.compare_at_price - bundle.bundle_price
      : null

  useEffect(() => {
    if (bundle) document.title = `${bundle.title} — Plieggo`
    return () => { document.title = 'Plieggo' }
  }, [bundle])

  // ─── Handlers ────────────────────────────────────────────────────────────

  /** Fixed bundle: add all bundle_items directly */
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

  /** Collection fixed: build cart items from cfCounts */
  const handleAddCollectionFixed = () => {
    if (!bundle || !cfComplete) return
    const bundleItems: BundleItemEntry[] = []
    Object.entries(cfCounts).forEach(([key, count]) => {
      if (count === 0) return
      const [productId, variantId] = key.split(':')
      const product = collectionProducts.find(p => p.id === productId)
      if (!product) return
      const variant = variantId ? product.variants?.find(v => v.id === variantId) : undefined
      bundleItems.push({ product, variant, quantity: count })
    })
    addBundle(bundle, bundleItems)
    setCfCounts({})
    setTimeout(() => openCart(), 300)
  }

  /** Mix & match: add selected products */
  const handleAddMixMatch = () => {
    if (!bundle || !mmComplete) return
    addBundle(bundle, mmSelected.map(({ product, variant }) => ({ product, variant, quantity: 1 })))
    setMmSelected([])
    setTimeout(() => openCart(), 300)
  }

  const handleAddToCart = () => {
    if (isFixed) handleAddFixed()
    else if (isCollectionFixed) handleAddCollectionFixed()
    else if (isMixMatch) handleAddMixMatch()
  }

  /** Toggle mix_match selection */
  const toggleMM = (product: Product, variant?: ProductVariant) => {
    const key = getItemKey(product, variant)
    const already = mmSelected.some(s => getItemKey(s.product, s.variant) === key)
    if (already) {
      setMmSelected(prev => prev.filter(s => getItemKey(s.product, s.variant) !== key))
    } else if (mmSelected.length < pickQuantity) {
      setMmSelected(prev => [...prev, { product, variant }])
    }
  }

  /** Increment collection_fixed quantity */
  const incrementCF = (product: Product, variant?: ProductVariant) => {
    if (cfTotal >= pickQuantity) return
    const key = getItemKey(product, variant)
    setCfCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  /** Decrement collection_fixed quantity */
  const decrementCF = (product: Product, variant?: ProductVariant) => {
    const key = getItemKey(product, variant)
    setCfCounts(prev => {
      const current = prev[key] || 0
      if (current <= 0) return prev
      if (current === 1) {
        const { [key]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [key]: current - 1 }
    })
  }

  // ─── Loading skeleton ─────────────────────────────────────────────────────
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

  // ─── Not found ────────────────────────────────────────────────────────────
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

  const productWord = pickQuantity === 1 ? 'producto' : 'productos'

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

      <main className={cn('max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12', showPicker && 'pb-28 lg:pb-12')}>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span>Paquetes</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-medium line-clamp-1">{bundle.title}</span>
        </nav>

        {/* ══════════════════════════════════════════════════════════════════
            HERO — 2 columns
        ══════════════════════════════════════════════════════════════════ */}
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

            {allImages.length > 1 && (
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
                  : isCollectionFixed
                  ? <><Sparkles className="w-3.5 h-3.5" />Elige y ahorra</>
                  : <><Package className="w-3.5 h-3.5" />Paquete especial</>}
              </span>
              {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                <span className="bg-secondary/15 text-secondary text-xs px-3 py-1.5 rounded-full font-semibold">
                  -{bundle.discount_percentage}% descuento
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {bundle.title}
            </h1>

            {/* Price row */}
            <div className="flex items-center flex-wrap gap-3 mb-5">
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

            {/* ── FIXED: mini "Incluye" list ── */}
            {isFixed && items.length > 0 && (
              <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Incluye:</p>
                <div className="space-y-2.5">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      {resolveBundleItemImage(item) && (
                        <img
                          src={resolveBundleItemImage(item)!}
                          alt={item.products?.title || ''}
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

            {/* ── PICKER TYPES: progress bar + hint ── */}
            {showPicker && (
              <div className="mb-6 space-y-2.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{pickerTotal}</span>
                    {' '}de{' '}
                    <span className="font-semibold text-foreground">{pickQuantity}</span>
                    {' '}{productWord} seleccionados
                  </span>
                  {isComplete && (
                    <span className="text-green-600 font-semibold flex items-center gap-1 text-xs">
                      <Check className="w-3 h-3" />¡Listo!
                    </span>
                  )}
                </div>
                <Progress value={progress} className="h-2" />
                {!isComplete && (
                  <p className="text-xs text-muted-foreground">
                    ↓ Selecciona {remaining} {remaining === 1 ? 'producto más' : 'productos más'} abajo para continuar
                  </p>
                )}
              </div>
            )}

            {/* ── Unified CTA Button ── */}
            <div className="space-y-2 mb-8">
              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold"
                onClick={handleAddToCart}
                disabled={
                  collectionLoading ||
                  (isFixed && items.length === 0) ||
                  (showPicker && !isComplete)
                }
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {collectionLoading
                  ? 'Cargando...'
                  : isFixed && items.length === 0
                  ? 'Paquete no disponible'
                  : showPicker && !isComplete
                  ? `Elige ${remaining} ${remaining === 1 ? 'producto' : 'productos'} más`
                  : `Agregar al carrito — ${formatMoney(bundle.bundle_price)}`}
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-1">
                El descuento se aplica automáticamente al finalizar tu pedido
              </p>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
              {[
                { icon: Truck, label: 'Envío a todo México' },
                { icon: Award, label: 'Hecho a mano' },
                { icon: Clock, label: 'Entrega garantizada' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            FIXED — "Qué incluye" product grid
        ══════════════════════════════════════════════════════════════════ */}
        {isFixed && items.length > 0 && (
          <section className="mb-20" aria-labelledby="bundle-includes-fixed">
            <h2 id="bundle-includes-fixed" className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Qué incluye este paquete
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item.id} className="text-center group">
                  <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    {resolveBundleItemImage(item) ? (
                      <img
                        src={resolveBundleItemImage(item)!}
                        alt={item.products?.title || ''}
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

        {/* ══════════════════════════════════════════════════════════════════
            COLLECTION FIXED — Quantity picker
            Each product card has +/− counters. Total must equal pick_quantity.
        ══════════════════════════════════════════════════════════════════ */}
        {isCollectionFixed && (
          <section className="mb-20" aria-labelledby="bundle-cf-picker">

            {/* Section header */}
            <div className="mb-8 text-center space-y-2">
              <h2 id="bundle-cf-picker" className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Elige {pickQuantity} {productWord}
              </h2>
              <p className="text-muted-foreground font-body max-w-md mx-auto">
                {cfComplete
                  ? '¡Perfecto! Ya puedes agregar tu paquete al carrito.'
                  : `Selecciona ${cfRemaining} ${cfRemaining === 1 ? 'producto más' : 'productos más'} para completar tu paquete.`}
              </p>
            </div>

            {/* Progress */}
            <div className="max-w-sm mx-auto mb-10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{cfTotal} de {pickQuantity} seleccionados</span>
                {cfComplete && (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />¡Listo!
                  </span>
                )}
              </div>
              <Progress value={cfProgress} className="h-3" />
            </div>

            {/* Product grid */}
            {collectionLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="bg-muted rounded-xl aspect-square" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-8 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : cfItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-body">No hay productos disponibles en este paquete.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {cfItems.map(({ product, variant }) => {
                  const key = getItemKey(product, variant)
                  const count = cfCounts[key] || 0
                  const price = variant?.price ?? product.price
                  const image = resolveImage(product, variant)
                  const canAdd = cfTotal < pickQuantity

                  return (
                    <div
                      key={key}
                      className={cn(
                        'relative rounded-xl overflow-hidden border-2 transition-all duration-200 bg-card',
                        count > 0
                          ? 'border-primary ring-2 ring-primary/25 shadow-md'
                          : 'border-border hover:border-primary/40 hover:shadow-sm'
                      )}
                    >
                      {/* Image */}
                      <div className="aspect-square bg-muted overflow-hidden">
                        {image ? (
                          <img
                            src={image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Package className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                      </div>

                      {/* Count badge */}
                      {count > 0 && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                          <span className="text-primary-foreground text-xs font-bold leading-none">{count}</span>
                        </div>
                      )}

                      {/* Info + Counter */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-0.5">
                          {product.title}
                          {variant?.title && (
                            <span className="text-muted-foreground font-normal"> · {variant.title}</span>
                          )}
                        </p>
                        <p className="text-sm font-semibold text-foreground mb-3">
                          {formatMoney(price || 0)}
                        </p>

                        {/* +/− counter */}
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => decrementCF(product, variant)}
                            disabled={count === 0}
                            aria-label="Quitar uno"
                            className={cn(
                              'flex-1 h-9 flex items-center justify-center transition-colors',
                              count === 0
                                ? 'text-muted-foreground/30 cursor-not-allowed'
                                : 'hover:bg-muted text-foreground'
                            )}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-foreground border-x border-border">
                            {count}
                          </span>
                          <button
                            onClick={() => incrementCF(product, variant)}
                            disabled={!canAdd}
                            aria-label="Agregar uno"
                            className={cn(
                              'flex-1 h-9 flex items-center justify-center transition-colors',
                              !canAdd
                                ? 'text-muted-foreground/30 cursor-not-allowed'
                                : 'hover:bg-primary/10 text-primary'
                            )}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Desktop bottom CTA */}
            {cfComplete && (
              <div className="mt-10 text-center hidden lg:block">
                <Button size="lg" className="px-12 h-14 text-base font-semibold" onClick={handleAddCollectionFixed}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito — {formatMoney(bundle.bundle_price)}
                </Button>
              </div>
            )}
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            MIX & MATCH — Toggle picker
            Each product card toggles selected/deselected.
        ══════════════════════════════════════════════════════════════════ */}
        {isMixMatch && (
          <section className="mb-20" aria-labelledby="bundle-mm-picker">

            <div className="mb-8 text-center space-y-2">
              <h2 id="bundle-mm-picker" className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Elige tus {pickQuantity} {productWord}
              </h2>
              <p className="text-muted-foreground font-body max-w-md mx-auto">
                {mmComplete
                  ? '¡Perfecto! Ya puedes agregar tu paquete al carrito.'
                  : `Selecciona ${mmRemaining} ${mmRemaining === 1 ? 'producto más' : 'productos más'} para completar tu paquete.`}
              </p>
            </div>

            <div className="max-w-sm mx-auto mb-10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{mmTotal} de {pickQuantity} seleccionados</span>
                {mmComplete && (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />¡Listo!
                  </span>
                )}
              </div>
              <Progress value={mmProgress} className="h-3" />
            </div>

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
            ) : mmItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-body">No hay productos disponibles en este paquete.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mmItems.map(({ product, variant }) => {
                  const key = getItemKey(product, variant)
                  const isItemSelected = mmSelected.some(s => getItemKey(s.product, s.variant) === key)
                  const isDisabled = !isItemSelected && mmSelected.length >= pickQuantity
                  const price = variant?.price ?? product.price
                  const image = resolveImage(product, variant)

                  return (
                    <button
                      key={key}
                      onClick={() => toggleMM(product, variant)}
                      disabled={isDisabled}
                      className={cn(
                        'relative text-left rounded-xl overflow-hidden border-2 transition-all duration-200 group bg-card',
                        isItemSelected
                          ? 'border-primary ring-2 ring-primary/25 shadow-md scale-[0.98]'
                          : isDisabled
                          ? 'border-border opacity-40 cursor-not-allowed'
                          : 'border-border hover:border-primary/50 hover:shadow-md cursor-pointer'
                      )}
                    >
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

                      {isItemSelected && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}

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

            {mmComplete && (
              <div className="mt-10 text-center hidden lg:block">
                <Button size="lg" className="px-12 h-14 text-base font-semibold" onClick={handleAddMixMatch}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito — {formatMoney(bundle.bundle_price)}
                </Button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          STICKY MOBILE CTA — shown for collection_fixed and mix_match
      ══════════════════════════════════════════════════════════════════════ */}
      {showPicker && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border p-4 flex items-center gap-3 shadow-2xl">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-none">
              {pickerTotal} de {pickQuantity}
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
            onClick={handleAddToCart}
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