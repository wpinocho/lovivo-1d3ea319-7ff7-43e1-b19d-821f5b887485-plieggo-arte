import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Hand, Sparkles, Truck, RotateCcw, Star, MessageCircle, ArrowRight } from 'lucide-react'
import { plieggoGeneralReviews, getInitials } from '@/data/plieggo-general-reviews'

type ProductWithCollection = Product & { collectionType?: 'acordeon' | 'prisma' }

const HERO_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1i4gabj0it4.webp'
const EDITORIAL_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon.webp'

const FEATURED_REVIEWS = [plieggoGeneralReviews[0], plieggoGeneralReviews[2]]

const CollectionAcordeon = () => {
  const [products, setProducts] = useState<ProductWithCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async () => {
    try {
      const { data: collections } = await supabase
        .from('collections')
        .select('id, handle')
        .eq('store_id', STORE_ID)
        .in('handle', ['coleccin-acorden', 'acordeon-prisma'])

      const acordeonId = collections?.find(c => c.handle === 'coleccin-acorden')?.id
      const prismaId = collections?.find(c => c.handle === 'acordeon-prisma')?.id

      const collectionIds = [acordeonId, prismaId].filter(Boolean) as string[]
      if (collectionIds.length === 0) return

      const { data: collectionProducts } = await supabase
        .from('collection_products')
        .select('product_id, collection_id')
        .in('collection_id', collectionIds)

      if (!collectionProducts || collectionProducts.length === 0) return

      const productIds = [...new Set(collectionProducts.map(cp => cp.product_id))]

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds)

      if (!data) return

      const productsWithCollection: ProductWithCollection[] = data.map(product => {
        const productCollections = collectionProducts
          .filter(cp => cp.product_id === product.id)
          .map(cp => cp.collection_id)
        const isAcordeon = productCollections.includes(acordeonId)
        const isPrisma = productCollections.includes(prismaId)
        return {
          ...product,
          collectionType: isAcordeon ? 'acordeon' as const : isPrisma ? 'prisma' as const : undefined
        }
      })

      const ORDER: Record<string, number> = { acordeon: 1, prisma: 2 }
      productsWithCollection.sort((a, b) => (ORDER[a.collectionType ?? ''] ?? 3) - (ORDER[b.collectionType ?? ''] ?? 3))

      setProducts(productsWithCollection)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <EcommerceTemplate>

      {/* ─── HERO EDITORIAL COMPACTO ─── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: 'clamp(340px, 55vh, 520px)' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Colección Acordeón Plieggo"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-10 md:pb-14">
          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-body text-xs text-white/90 ml-1">4.9 · +50 hogares transformados</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-2 max-w-lg">
            Pliegues que crean<br className="hidden sm:block" /> ritmo visual
          </h1>

          <p className="font-body text-sm sm:text-base text-white/80 mb-6 max-w-md">
            La Colección Acordeón explora la geometría del papel — ritmo, simetría y dinamismo en cada doblez.
          </p>

          <a
            href="#productos"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-5 py-2.5 rounded-sm bg-white text-foreground hover:bg-white/90 transition-colors"
          >
            Ver cuadros
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="py-10 border-b border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Hand className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Hecho a mano en México</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Arte que cambia con la luz</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Envío asegurado</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Devoluciones sin preguntas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTOS GRID ─── */}
      <section id="productos" className="py-14 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Colección Acordeón
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="bg-muted rounded-sm aspect-[24/43] animate-pulse" />
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
                  aspectRatio="rectangle"
                  hoverImageIndex={2}
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
        </div>
      </section>

      {/* ─── MINI SOCIAL PROOF ─── */}
      {FEATURED_REVIEWS.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-primary text-center mb-8">
              Lo que dicen nuestros clientes
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
                alt="Detalle de pliegues de la Colección Acordeón"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-4">
                Colección Acordeón
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
                Geometría en cada pliegue
              </h2>

              <ul className="space-y-5">
                {[
                  {
                    title: 'Patrón rítmico',
                    desc: 'Los pliegues se repiten como notas en una partitura. La regularidad crea calma visual sin aburrimiento.'
                  },
                  {
                    title: 'Sombras cambiantes',
                    desc: 'Con la luz del día las sombras se mueven y transforman la pieza. Cada hora la ves diferente.'
                  },
                  {
                    title: 'Hecho en México',
                    desc: 'Producción artesanal local, en papel de alta calidad. Ningún cuadro sale igual al anterior.'
                  }
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
            ¿Te gustó la colección Acordeón?
          </h2>
          <p className="font-body text-muted-foreground mb-8 text-sm md:text-base">
            Escríbenos para encontrar la pieza ideal para tu espacio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/525531215386?text=%C2%A1Hola!%20Me%20interes%C3%B3%20la%20Colecci%C3%B3n%20Acorde%C3%B3n"
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

export default CollectionAcordeon