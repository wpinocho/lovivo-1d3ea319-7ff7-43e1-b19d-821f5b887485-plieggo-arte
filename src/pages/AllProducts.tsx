import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Hand, Sparkles, Truck, RotateCcw, Star, MessageCircle, ArrowRight } from 'lucide-react'
import { plieggoGeneralReviews, getInitials } from '@/data/plieggo-general-reviews'

type ProductWithCollection = Product & { collectionType?: 'espacio' | 'acordeon' | 'prisma' }

const HERO_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp'
const EDITORIAL_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/all-products.webp'

const FEATURED_REVIEWS = [plieggoGeneralReviews[0], plieggoGeneralReviews[2]]

const AllProducts = () => {
  const [products, setProducts] = useState<ProductWithCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (!data) return

      const { data: collections } = await supabase
        .from('collections')
        .select('id, handle')
        .eq('store_id', STORE_ID)
        .in('handle', ['coleccion-espacio', 'coleccin-acorden', 'acordeon-prisma'])

      const espacioCollectionId = collections?.find(c => c.handle === 'coleccion-espacio')?.id
      const acordeonCollectionId = collections?.find(c => c.handle === 'coleccin-acorden')?.id
      const prismaCollectionId = collections?.find(c => c.handle === 'acordeon-prisma')?.id

      const { data: allCollectionProducts } = await supabase
        .from('collection_products')
        .select('product_id, collection_id')
        .in('product_id', data.map(p => p.id))

      const productsWithCollection: ProductWithCollection[] = data.map(product => {
        const productCollections = allCollectionProducts?.filter(cp => cp.product_id === product.id).map(cp => cp.collection_id) || []
        const isEspacio = productCollections.includes(espacioCollectionId)
        const isAcordeon = productCollections.includes(acordeonCollectionId)
        const isPrisma = productCollections.includes(prismaCollectionId)
        return {
          ...product,
          collectionType: isEspacio ? 'espacio' as const : isAcordeon ? 'acordeon' as const : isPrisma ? 'prisma' as const : undefined
        }
      })

      const ORDER: Record<string, number> = { espacio: 1, acordeon: 2, prisma: 3 }
      productsWithCollection.sort((a, b) => (ORDER[a.collectionType ?? ''] ?? 4) - (ORDER[b.collectionType ?? ''] ?? 4))

      setProducts(productsWithCollection)
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
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Todos los cuadros
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Truck className="w-3 h-3 text-[#C16648]" /> Envío gratis
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Hand className="w-3 h-3 text-[#C16648]" /> Hecho a mano
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <Star className="w-3 h-3 text-[#C16648]" /> 4.9 · +50 reseñas
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground border border-border/60">
                <RotateCcw className="w-3 h-3 text-[#C16648]" /> Devolución garantizada
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(6)].map((_, i) => (
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
                  aspectRatio={
                    product.collectionType === 'espacio'
                      ? 'square'
                      : product.collectionType === 'acordeon' || product.collectionType === 'prisma'
                      ? 'rectangle'
                      : 'auto'
                  }
                  hoverImageIndex={product.collectionType === 'espacio' ? 1 : 2}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-xl text-muted-foreground">
                No hay productos disponibles.
              </p>
            </div>
          )}

          {/* ─── TRUST STRIP ─── */}
          <div className="mt-14 pt-10 border-t border-border/40">
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
        </div>
      </section>

      {/* ─── HERO EDITORIAL ─── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: 'clamp(300px, 50vh, 480px)' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Todos los cuadros Plieggo"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-10 md:pb-14">
          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-body text-xs text-white/90 ml-1">4.9 · +50 hogares transformados</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-2 max-w-lg">
            Arte hecho a mano<br className="hidden sm:block" /> que transforma tu espacio
          </h2>

          <p className="font-body text-sm sm:text-base text-white/80 max-w-md">
            Explora toda la colección — piezas únicas en papel con técnica de pliegue artesanal.
          </p>
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
                alt="Detalle artesanal de pliegues Plieggo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-4">
                Arte artesanal mexicano
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
                ¿Qué hace único a cada cuadro?
              </h2>

              <ul className="space-y-5">
                {[
                  {
                    title: 'Sin producción en serie',
                    desc: 'Ningún cuadro es igual a otro. Cada pieza se dobla a mano, una por una, desde cero.'
                  },
                  {
                    title: 'Vivos con la luz',
                    desc: 'Las sombras cambian según la hora del día. El cuadro que ves en la mañana es diferente al de la tarde.'
                  },
                  {
                    title: 'Listo para colgar',
                    desc: 'Llega enmarcado y listo para instalar. Sin compras adicionales ni sorpresas.'
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
            ¿Tienes alguna pregunta?
          </h2>
          <p className="font-body text-muted-foreground mb-8 text-sm md:text-base">
            Estamos aquí para ayudarte a encontrar la pieza perfecta.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/525531215386?text=%C2%A1Hola!%20Tengo%20una%20pregunta%20sobre%20los%20cuadros%20de%20Plieggo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Escríbenos por WhatsApp
            </a>

            <Link
              to="/top-sellers"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-sm border border-border text-foreground hover:bg-muted/60 transition-colors w-full sm:w-auto justify-center"
            >
              Ver los más vendidos
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

export default AllProducts