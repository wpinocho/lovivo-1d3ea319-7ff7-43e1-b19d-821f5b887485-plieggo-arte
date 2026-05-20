import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  ChevronRight,
  Hand,
  Layers,
  Sparkles,
  Truck,
  Clock,
  RotateCcw,
  MessageCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

import type { SellingPlan } from "@/lib/supabase"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { intervalLabel } from "@/lib/subscription-utils"
import ProductExpressCheckout from "@/components/ProductExpressCheckout"
import { SEO } from "@/components/SEO"
import { useSettings } from "@/contexts/SettingsContext"
import { productJsonLd, breadcrumbJsonLd, plainText } from "@/lib/seo/jsonld"
import { ProductFAQ } from "@/components/ProductFAQ"
import { CrossSellSection } from "@/components/CrossSellSection"
import { InspirationCarousel } from "@/components/InspirationCarousel"
import { ProductReviews } from "@/components/ProductReviews"
import { getProductReview } from "@/data/product-reviews"
import { SizeGuide } from "@/components/SizeGuide"

/**
 * EDITABLE UI COMPONENT - ProductPageUI (Premium — Plieggo Arte)
 *
 * Layout asimétrico 7/5, galería con thumbnails horizontales (desktop),
 * tipografía editorial, secciones Plieggo (FAQ, inspiración, cross-sell).
 * Lógica intacta — solo presentación.
 */

interface ProductPageUIProps {
  logic: {
    product: any
    loading: boolean
    notFound: boolean
    selected: Record<string, string>
    quantity: number
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    [key: string]: any
  }
}

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [expressAvailable, setExpressAvailable] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })

  // ⚠️ Hooks must be called unconditionally — BEFORE any early returns
  const { storeName, currencyCode } = useSettings()

  const displayImage =
    selectedImage ||
    logic.displayImages?.[0] ||
    logic.currentImage ||
    "/placeholder.svg"

  useEffect(() => {
    setSelectedImage(null)
  }, [logic.matchingVariant])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <Skeleton className="aspect-[4/5] rounded-lg lg:col-span-7" />
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
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
          <p className="text-muted-foreground mb-8">
            El producto que buscas no existe o ha sido eliminado.
          </p>
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

  const product = logic.product

  const discountPct =
    logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice
      ? Math.round(
          ((logic.currentCompareAt - logic.currentPrice) /
            logic.currentCompareAt) *
            100,
        )
      : 0

  const vendor = product.vendor || product.product_type

  // Detect edición limitada
  const isEdicionLimitada =
    product.tags?.includes('edicion-limitada') ||
    product.product_type === 'Edición Limitada' ||
    product.title?.toLowerCase().includes('luna') ||
    product.title?.toLowerCase().includes('estrella')

  // Inline star rating data
  const productReview = getProductReview(product.slug)
  const seoTitle = product.title
  const seoDescription =
    plainText(product.description, 160) ||
    `Compra ${product.title} en ${storeName}.`
  const seoImage = product.images?.[0]
  const productSchema = productJsonLd(product, {
    storeName,
    currencyCode,
    inStock: !!logic.inStock,
    price: logic.currentPrice,
  })
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/" },
    { name: product.title, path: `/productos/${product.slug}` },
  ])

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/productos/${product.slug}`}
        ogImage={seoImage}
        ogType="product"
        storeName={storeName}
        jsonLd={[productSchema, breadcrumbs]}
      />
      <EcommerceTemplate hideFloatingCartOnMobile>
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumbs */}
          <nav
            aria-label="Migas de pan"
            className="mb-6 hidden md:flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/" className="hover:text-foreground transition-colors">
              Productos
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground/80 truncate max-w-[280px]">
              {logic.product.title}
            </span>
          </nav>

          {/* Back link — visible on all screens */}
          <button
            type="button"
            onClick={logic.handleNavigateBack}
            className="inline-flex mb-4 items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors
              text-[11px] tracking-wide md:text-sm
              bg-background/70 backdrop-blur-sm border border-border/50 rounded-full
              px-3 py-1 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none"
          >
            <ArrowLeft className="h-3 w-3 md:h-3.5 md:w-3.5" />
            Seguir comprando
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ── GALLERY (lg:col-span-7) ── */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)]">
              {/* Desktop */}
              <div className="hidden md:block">
                <div
                  className="relative w-full aspect-[4/5] lg:max-h-[75vh] rounded-lg overflow-hidden bg-muted/30 cursor-zoom-in group"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={displayImage}
                    alt={logic.product.title}
                    className={cn(
                      "w-full h-full object-contain transition-transform duration-500 ease-out",
                      isZoomed ? "scale-110" : "scale-100",
                    )}
                  />
                  {discountPct > 0 && (
                    <Badge className="absolute top-4 left-4 bg-foreground text-background hover:bg-foreground/90">
                      -{discountPct}%
                    </Badge>
                  )}
                </div>

                {/* Horizontal thumbnails */}
                {logic.displayImages && logic.displayImages.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {logic.displayImages.map((img: string, index: number) => {
                      const isActive =
                        selectedImage === img ||
                        (!selectedImage && logic.currentImage === img) ||
                        (!selectedImage && !logic.currentImage && index === 0)
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(img)}
                          className={cn(
                            "shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all bg-muted/30",
                            isActive
                              ? "border-foreground"
                              : "border-transparent hover:border-muted-foreground/40",
                          )}
                          aria-label={`Ver imagen ${index + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${logic.product.title} miniatura ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain"
                          />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Mobile: carousel */}
              {logic.displayImages && logic.displayImages.length > 1 ? (
                <div className="md:hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {logic.displayImages.map((img: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted/30">
                            <img
                              src={img}
                              alt={`${logic.product.title} ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain"
                            />
                            {discountPct > 0 && index === 0 && (
                              <Badge className="absolute top-3 left-3 bg-foreground text-background">
                                -{discountPct}%
                              </Badge>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              ) : (
                <div className="md:hidden relative aspect-[4/5] rounded-lg overflow-hidden bg-muted/30">
                  <img
                    src={displayImage}
                    alt={logic.product.title}
                    className="w-full h-full object-contain"
                  />
                  {discountPct > 0 && (
                    <Badge className="absolute top-3 left-3 bg-foreground text-background">
                      -{discountPct}%
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* ── INFO COLUMN (lg:col-span-5) ── */}
            <div className="lg:col-span-5 space-y-6">
              {/* Title block */}
              <div className="space-y-3">
                {vendor && (
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {vendor}
                  </p>
                )}
                {/* Urgency badge — Edición Limitada */}
                {isEdicionLimitada && (
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                      Edición Limitada · Pocas piezas disponibles
                    </span>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1]">
                  {logic.product.title}
                </h1>

                {/* Inline star rating → ARRIBA del precio para anclar confianza */}
                {productReview.reviewCount > 0 && (
                  <a
                    href="#reviews"
                    className="inline-flex items-center gap-2 group"
                  >
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg
                          key={s}
                          className={cn(
                            "h-4 w-4 transition-opacity",
                            s <= Math.round(productReview.rating)
                              ? "text-amber-500"
                              : "text-muted-foreground/25",
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {productReview.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      · {productReview.reviewCount} reseñas verificadas
                    </span>
                  </a>
                )}

                {/* Price block */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-semibold tracking-tight">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt &&
                    logic.currentCompareAt > logic.currentPrice && (
                      <>
                        <span className="text-base text-muted-foreground line-through">
                          {logic.formatMoney(logic.currentCompareAt)}
                        </span>
                        {discountPct > 0 && (
                          <span className="text-sm font-medium text-primary">
                            Ahorra {discountPct}%
                          </span>
                        )}
                      </>
                    )}
                </div>

                {/* Promo badges */}
                {logic.product?.id && (
                  <div className="flex flex-wrap gap-2">
                    <VolumeBadge productId={logic.product.id} />
                    <BOGOLabel productId={logic.product.id} />
                  </div>
                )}
              </div>

              {/* Descripción visible — posición editorial: después del precio, antes del craftsmanship */}
              {logic.product.description && (
                <div
                  className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: logic.product.description }}
                />
              )}

              {/* Craftsmanship story */}
              <div className="py-3 border-y border-border/60">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Hand className="h-5 w-5 text-[#C16648] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                        Hecho a mano
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Cada pieza tarda 3–5 días en crearse
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                    <Layers className="h-5 w-5 text-[#C16648] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                        Papel de calidad
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Libre de ácidos, dura décadas sin desvanecer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                    <Sparkles className="h-5 w-5 text-[#C16648] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                        Arte vivo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Los pliegues crean sombras que cambian con la luz del día
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selling Plan Selector */}
              {logic.sellingPlans && logic.sellingPlans.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium uppercase tracking-wider">
                    Tipo de compra
                  </Label>
                  <div className="space-y-2">
                    <label
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all",
                        !logic.selectedPlan
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-muted-foreground/40",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="selling-plan"
                          checked={!logic.selectedPlan}
                          onChange={() => logic.setSelectedPlan(null)}
                          className="w-4 h-4"
                        />
                        <span className="font-medium">Compra única</span>
                      </div>
                      <span className="font-semibold">
                        {logic.formatMoney(logic.currentPrice)}
                      </span>
                    </label>

                    {logic.sellingPlans.map((plan: SellingPlan) => {
                      const subPrice =
                        logic.subscriptionPrice &&
                        logic.selectedPlan?.id === plan.id
                          ? logic.subscriptionPrice
                          : plan.discount_type === "percentage" &&
                              plan.discount_value
                            ? logic.currentPrice * (1 - plan.discount_value / 100)
                            : plan.discount_type === "fixed" && plan.discount_value
                              ? Math.max(0, logic.currentPrice - plan.discount_value)
                              : logic.currentPrice

                      return (
                        <label
                          key={plan.id}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all",
                            logic.selectedPlan?.id === plan.id
                              ? "border-foreground bg-foreground/5"
                              : "border-border hover:border-muted-foreground/40",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="selling-plan"
                              checked={logic.selectedPlan?.id === plan.id}
                              onChange={() => logic.setSelectedPlan(plan)}
                              className="w-4 h-4"
                            />
                            <div>
                              <span className="font-medium">{plan.name}</span>
                              {plan.discount_value && plan.discount_value > 0 && (
                                <span className="ml-2 text-xs text-primary font-medium">
                                  -{plan.discount_value}
                                  {plan.discount_type === "percentage" ? "%" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="font-semibold">
                            {logic.formatMoney(subPrice)}/
                            {intervalLabel(plan.interval, plan.interval_count)}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Product Options */}
              {logic.product.options && logic.product.options.length > 0 && (
                <div className="space-y-5">
                  {logic.product.options.map((option: any) => (
                    <div key={option.name} className="space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <Label className="text-sm font-medium uppercase tracking-wider">
                          {option.name}
                        </Label>
                        {logic.selected[option.name] && (
                          <span className="text-sm text-muted-foreground">
                            {logic.selected[option.name]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value: string) => {
                          const isSelected = logic.selected[option.name] === value
                          const isAvailable = logic.isOptionValueAvailable(
                            option.name,
                            value,
                          )
                          return (
                            <button
                              key={value}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => logic.handleOptionSelect(option.name, value)}
                              className={cn(
                                "min-w-[3rem] px-4 h-11 rounded-md border text-sm font-medium transition-all",
                                isSelected
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border bg-background hover:border-foreground/60",
                                !isAvailable && "opacity-40 cursor-not-allowed line-through",
                              )}
                            >
                              {value}
                            </button>
                          )
                        })}
                      </div>
                      {/* Guía de tamaños — solo si los valores tienen formato de medida */}
                      <SizeGuide
                        optionValues={option.values}
                        selectedValue={logic.selected[option.name]}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity stepper */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium uppercase tracking-wider text-foreground/70">
                  Cantidad
                </span>
                <div className="flex items-center gap-0.5 border border-border/60 rounded-full p-0.5 bg-background">
                  <button
                    type="button"
                    onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                    disabled={logic.quantity <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-9 text-center text-sm font-semibold tabular-nums select-none">
                    {logic.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/70 transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* CTAs — justo después de cantidad */}
              <div ref={ctaRef} className="flex flex-col gap-3">
                {logic.inStock && logic.canAddToCart && !logic.selectedPlan && (
                  <>
                    <ProductExpressCheckout
                      product={logic.product}
                      variant={logic.matchingVariant}
                      sellingPlan={logic.selectedPlan}
                      quantity={logic.quantity}
                      unitPrice={logic.currentPrice}
                      onAvailabilityChange={setExpressAvailable}
                    />
                    {expressAvailable && (
                      <div className="flex items-center gap-3 py-1">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">
                          o
                        </span>
                        <Separator className="flex-1" />
                      </div>
                    )}
                  </>
                )}

                {logic.inStock && (
                  <Button
                    onClick={logic.handleBuyNow}
                    className="w-full h-14 text-base tracking-wide rounded-md"
                    size="lg"
                  >
                    Comprar ahora
                  </Button>
                )}

                <Button
                  onClick={logic.handleAddToCart}
                  disabled={!logic.inStock}
                  variant={logic.inStock ? "outline" : "default"}
                  className="w-full h-14 text-base tracking-wide rounded-md"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {logic.inStock
                    ? logic.selectedPlan
                      ? `Suscribirse — ${logic.formatMoney(
                          logic.subscriptionPrice || logic.currentPrice,
                        )}/${intervalLabel(
                          logic.selectedPlan.interval,
                          logic.selectedPlan.interval_count,
                        )}`
                      : "Agregar al carrito"
                    : "Agotado"}
                </Button>

                {!logic.inStock && (
                  <Badge variant="secondary" className="w-fit">
                    Agotado
                  </Badge>
                )}
              </div>

              {/* Trust strip — después de los CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 py-2 border-y border-border/40 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 flex-1">
                  <Truck className="h-4 w-4 text-[#C16648] shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground/80">Envío gratis CDMX</p>
                    <p>$200 MXN al resto de México</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Clock className="h-4 w-4 text-[#C16648] shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground/80">10–15 días hábiles</p>
                    <p>Hecha a mano para ti</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <RotateCcw className="h-4 w-4 text-[#C16648] shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground/80">Garantía 30 días</p>
                    <p>Si no te encanta, te devolvemos</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp inline link */}
              <a
                href="https://wa.me/525531215386?text=%C2%A1Hola!%20Tengo%20una%20pregunta%20sobre%20los%20cuadros%20de%20Plieggo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: '#C16648' }}
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                ¿Tienes dudas? Escríbenos por WhatsApp
              </a>
            </div>
          </div>

          {/* ── Plieggo sections ── */}
          {/* Orden: Inspiración (deseo) → Reviews (confianza) → FAQ (objeciones) → CrossSell (upsell) */}
          <div className="mt-16 space-y-16">
            <InspirationCarousel />
            <ProductReviews productSlug={product.slug} />
            <ProductFAQ />
            <CrossSellSection currentProduct={logic.product} />
          </div>
        </div>

        {/* Sticky Add-to-Cart Bar */}
        {logic.inStock && (
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
              ctaInView ? "translate-y-full" : "translate-y-0",
            )}
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              {/* Desktop */}
              <div className="hidden md:flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted/30 shrink-0">
                    <img src={displayImage} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium truncate text-sm">{logic.product.title}</h3>
                    <span className="font-semibold text-base">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Button onClick={logic.handleBuyNow} size="default">
                    Comprar ahora
                  </Button>
                  <Button onClick={logic.handleAddToCart} variant="outline" size="default">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Agregar al carrito
                  </Button>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-muted/30 shrink-0">
                    <img src={displayImage} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{logic.product.title}</h3>
                    <span className="font-semibold shrink-0 text-sm">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={logic.handleBuyNow} size="sm" className="flex-1">
                    Comprar ahora
                  </Button>
                  <Button onClick={logic.handleAddToCart} variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </EcommerceTemplate>
    </>
  )
}