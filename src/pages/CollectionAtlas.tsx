import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { BRAND_RATING, BRAND_REVIEW_COUNT } from '@/data/product-reviews'
import { Hand, Sparkles, Truck, RotateCcw, Star, MessageCircle, ArrowRight } from 'lucide-react'
import { plieggoGeneralReviews, getInitials } from '@/data/plieggo-general-reviews'

const HERO_IMAGE =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1787608310247-pv6fcq8p5a.webp'
const EDITORIAL_IMAGE =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1787608310247-bywbhrboiau.webp'

const WHATSAPP_URL =
  'https://wa.me/525531215386?text=%C2%A1Hola!%20Me%20interes%C3%B3%20la%20Colecci%C3%B3n%20Atlas'

const FEATURED_REVIEWS = plieggoGeneralReviews.filter((r) => r.photoUrl).slice(0, 2)

const CollectionAtlas = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    document.title = 'Colección Atlas | Cuadros de papel plegado a mano | Plieggo'
    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    setMeta(
      'description',
      'Colección Atlas: 4 composiciones geométricas de papel plegado a mano en 25×35 y 40×55 cm. Envío gratis en México y 30 días para enamorarte.',
    )

    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async () => {
    try {
      const { data: collection } = await supabase
        .from('collections')
        .select('id')
        .eq('handle', 'atlas')
        .eq('store_id', STORE_ID)
        .single()

      if (!collection) return

      const { data: collectionProducts } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collection.id)

      if (!collectionProducts || collectionProducts.length === 0) return

      const productIds = collectionProducts.map((cp) => cp.product_id)

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds)

      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <EcommerceTemplate>
      {/* ─── PRODUCTOS GRID ─── */}
      <section id="productos" className="py-8 md:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5">
            <p className="font-body text-xs uppercase tracking-widest text-primary mb-2">
              Nueva colección
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Colección Atlas
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
              Medios círculos plegados a mano que arman un mapa de color. Cuatro piezas, dos
              formatos: 25 × 35 cm y 40 × 55 cm.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Truck className="w-3 h-3 text-primary" /> Envío gratis en México
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Hand className="w-3 h-3 text-primary" /> Hecho a mano
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Star className="w-3 h-3 text-primary" /> {BRAND_RATING} · {BRAND_REVIEW_COUNT}{' '}
                reseñas
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <RotateCcw className="w-3 h-3 text-primary" /> 30 días para enamorarte
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="bg-muted rounded-sm aspect-[4/5] animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-5 bg-muted rounded animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  aspectRatio="square"
                  hoverImageIndex={1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-xl text-muted-foreground">
                No hay productos en esta colección.
              </p>
            </div>
          )}

          {/* ─── TRUST STRIP ─── */}
          <div className="mt-14 pt-10 border-t border-border/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center gap-2">
                <Hand className="w-6 h-6 text-primary" />
                <span className="font-body text-sm font-medium text-foreground">
                  Plegada a mano en México
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-body text-sm font-medium text-foreground">
                  Llega lista para colgar
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="font-body text-sm font-medium text-foreground">
                  Envío gratis · 5 a 7 días
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-primary" />
                <span className="font-body text-sm font-medium text-foreground">
                  30 días para enamorarte
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HERO EDITORIAL ─── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: 'clamp(300px, 50vh, 480px)' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Cuadro Atlas Astromelia de papel plegado a mano, formato 40 × 55 cm"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-10 md:pb-14">
          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-body text-xs text-white/90 ml-1">
              {BRAND_RATING} · {BRAND_REVIEW_COUNT} reseñas verificadas
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-2 max-w-lg">
            Un mapa de color
            <br className="hidden sm:block" /> hecho de pliegues
          </h2>

          <p className="font-body text-sm sm:text-base text-white/80 max-w-md">
            Cada medio círculo se dobla y se coloca a mano. Lo que ves no es una impresión: es
            relieve real y sombra real.
          </p>
        </div>
      </section>

      {/* ─── MINI SOCIAL PROOF ─── */}
      {FEATURED_REVIEWS.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-primary text-center mb-8">
              Clientes que ya colgaron su Plieggo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {FEATURED_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="bg-background rounded-sm border border-border/50 px-6 py-5 flex gap-4 items-start"
                >
                  {review.photoUrl ? (
                    <img
                      src={review.photoUrl}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-xs font-bold text-primary">
                        {getInitials(review.author)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="font-body text-sm text-foreground leading-snug mb-2">
                      "{review.comment}"
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {review.author} · {review.product}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── EDITORIAL SPLIT ─── */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-sm overflow-hidden aspect-[4/3]">
              <img
                src={EDITORIAL_IMAGE}
                alt="Detalle de los medios círculos plegados de la Colección Atlas"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-4">
                Colección Atlas
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
                Cuatro rutas, un mismo lenguaje
              </h2>

              <ul className="space-y-5">
                {[
                  {
                    title: 'Astromelia, Caleta, Mediterráneo y Secuoya',
                    desc: 'La misma geometría en cuatro paletas: floral, costera, sobria y de alto contraste. Elige la que hable con tu pared.',
                  },
                  {
                    title: 'Dos formatos que se complementan',
                    desc: 'El 25 × 35 cm cabe en una repisa o un pasillo. El 40 × 55 cm suma piezas y densidad para funcionar como cuadro central. Muchos clientes combinan ambos.',
                  },
                  {
                    title: 'Se cuelga en un minuto',
                    desc: 'Papel libre de ácidos, marco de madera y soporte ya montado atrás. Sin instalador, sin herrajes extra.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3 items-start">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-foreground text-base">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-14 border-t border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            ¿No sabes cuál va con tu pared?
          </h2>
          <p className="font-body text-muted-foreground mb-8 text-sm md:text-base">
            Mándanos una foto de tu espacio y te decimos qué pieza y qué medida quedan mejor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Escríbenos por WhatsApp
            </a>

            <Link
              to="/all-products"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-sm border border-border text-foreground hover:bg-muted/60 transition-colors w-full sm:w-auto justify-center"
            >
              Ver todos los cuadros
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INSPIRATION CAROUSEL ─── */}
      <InspirationCarousel />
    </EcommerceTemplate>
  )
}

export default CollectionAtlas