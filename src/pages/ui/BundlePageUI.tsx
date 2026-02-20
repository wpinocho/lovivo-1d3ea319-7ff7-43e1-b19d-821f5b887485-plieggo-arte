import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { BundlePicker } from '@/components/BundlePicker'
import { useCart } from '@/contexts/CartContext'
import { useCartUI } from '@/components/CartProvider'
import { useSettings } from '@/contexts/SettingsContext'
import {
  Package,
  Sparkles,
  ShoppingCart,
  ChevronRight,
  Tag,
  Truck,
  Award,
  Clock,
} from 'lucide-react'
import type { Bundle, BundleItem } from '@/lib/supabase'

interface BundlePageUIProps {
  bundle: Bundle | null
  items: BundleItem[]
  loading: boolean
  notFound: boolean
}

export const BundlePageUI = ({ bundle, items, loading, notFound }: BundlePageUIProps) => {
  const { formatMoney } = useSettings()
  const { addBundle } = useCart()
  const { openCart } = useCartUI()
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const isMixMatch =
    bundle?.bundle_type === 'mix_match' || bundle?.bundle_type === 'mix_match_variant'
  const isFixed = bundle?.bundle_type === 'fixed' || !bundle?.bundle_type

  const savings =
    bundle?.compare_at_price && bundle.compare_at_price > bundle.bundle_price
      ? bundle.compare_at_price - bundle.bundle_price
      : null

  // SEO: update page title
  useEffect(() => {
    if (bundle) {
      document.title = `${bundle.title} — Plieggo`
    }
    return () => {
      document.title = 'Plieggo'
    }
  }, [bundle])

  const handleAddBundle = () => {
    if (!bundle || items.length === 0) return

    const bundleItems = items
      .filter(item => item.products)
      .map(item => {
        const variant = item.variant_id
          ? item.products!.variants?.find(v => v.id === item.variant_id)
          : undefined
        return { product: item.products!, variant, quantity: item.quantity }
      })

    addBundle(bundle, bundleItems)
    setTimeout(() => openCart(), 300)
  }

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <EcommerceTemplate>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-muted rounded-xl" />
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

  // ── Not found ───────────────────────────────────────────────────────────────
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

  const mainImage = bundle.images?.[0]
  const pickQuantity = bundle.pick_quantity ?? 2

  return (
    <EcommerceTemplate>
      {/* JSON-LD structured data */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span>Paquetes</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-medium line-clamp-1">{bundle.title}</span>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">

          {/* Left: Image */}
          <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-lg">
            {mainImage ? (
              <img
                src={mainImage}
                alt={bundle.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                <Package className="w-24 h-24 opacity-20" />
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                {isMixMatch ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Arma tu paquete
                  </>
                ) : (
                  <>
                    <Package className="w-3.5 h-3.5" />
                    Paquete especial
                  </>
                )}
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

            {/* Price */}
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

            {/* Fixed bundle items quick preview */}
            {isFixed && items.length > 0 && (
              <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Incluye:
                </p>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.products?.images?.[0] && (
                        <img
                          src={item.products.images[0]}
                          alt={item.products.title}
                          className="w-10 h-10 rounded-lg object-cover bg-muted shrink-0"
                        />
                      )}
                      <span className="text-sm text-foreground font-medium">
                        {item.quantity}× {item.products?.title}
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground shrink-0">
                        {item.products?.price ? formatMoney(item.products.price) : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mix & match info box */}
            {isMixMatch && (
              <div className="mb-6 p-4 bg-muted/40 rounded-xl border border-border">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Elige{' '}
                  {pickQuantity}{' '}
                  {bundle.variant_filter ? `(${bundle.variant_filter}) ` : ''}
                  productos
                </p>
                <p className="text-xs text-muted-foreground">
                  Selecciona cualquier {pickQuantity} piezas y el descuento se aplica
                  automáticamente al finalizar tu pedido.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-2 mb-8">
              {isMixMatch ? (
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  onClick={() => setIsPickerOpen(true)}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Armar mi paquete
                </Button>
              ) : isFixed ? (
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  onClick={handleAddBundle}
                  disabled={items.length === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {items.length === 0
                    ? 'Paquete no disponible'
                    : 'Agregar paquete al carrito'}
                </Button>
              ) : (
                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                  <p className="text-sm text-secondary font-medium">
                    El descuento se aplica automáticamente cuando agregues los productos al carrito.
                  </p>
                </div>
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

        {/* ── What's included (fixed bundles) ─────────────────────────────── */}
        {isFixed && items.length > 0 && (
          <section className="mb-20" aria-labelledby="bundle-includes">
            <h2
              id="bundle-includes"
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

        {/* ── How it works (mix & match) ───────────────────────────────────── */}
        {isMixMatch && (
          <section
            className="mb-20 bg-muted/30 rounded-2xl p-8 md:p-14"
            aria-labelledby="how-it-works"
          >
            <h2
              id="how-it-works"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center"
            >
              ¿Cómo funciona?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
              {[
                {
                  step: '1',
                  title: 'Elige tus piezas',
                  desc: `Selecciona ${pickQuantity}${bundle.variant_filter ? ` (${bundle.variant_filter})` : ''} cuadros de tu preferencia`,
                },
                {
                  step: '2',
                  title: 'Se aplica el descuento',
                  desc: 'El ahorro se aplica automáticamente al finalizar tu pedido, sin códigos',
                },
                {
                  step: '3',
                  title: 'Recíbelos juntos',
                  desc: 'Tus cuadros llegan juntos, listos para adornar tu espacio',
                },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <div className="w-14 h-14 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold font-heading shadow-md">
                    {step}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                size="lg"
                className="px-10 h-14 text-base font-semibold"
                onClick={() => setIsPickerOpen(true)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Empezar a armar mi paquete
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* BundlePicker Dialog */}
      {isMixMatch && (
        <BundlePicker
          bundle={bundle}
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </EcommerceTemplate>
  )
}