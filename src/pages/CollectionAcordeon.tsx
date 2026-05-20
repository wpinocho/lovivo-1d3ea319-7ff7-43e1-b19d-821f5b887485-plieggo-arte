import { useEffect, useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

type ProductWithCollection = Product & { collectionType?: 'acordeon' | 'prisma' }

const CollectionAcordeon = () => {
  const [products, setProducts] = useState<ProductWithCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async () => {
    try {
      // Get both Acordeón and Acordeón Prisma collection IDs
      const { data: collections } = await supabase
        .from('collections')
        .select('id, handle')
        .eq('store_id', STORE_ID)
        .in('handle', ['coleccin-acorden', 'acordeon-prisma'])

      const acordeonId = collections?.find(c => c.handle === 'coleccin-acorden')?.id
      const prismaId = collections?.find(c => c.handle === 'acordeon-prisma')?.id

      const collectionIds = [acordeonId, prismaId].filter(Boolean) as string[]
      if (collectionIds.length === 0) return

      // Get all product IDs from both collections
      const { data: collectionProducts } = await supabase
        .from('collection_products')
        .select('product_id, collection_id')
        .in('collection_id', collectionIds)

      if (!collectionProducts || collectionProducts.length === 0) return

      const productIds = [...new Set(collectionProducts.map(cp => cp.product_id))]

      // Get products
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds)

      if (!data) return

      // Tag each product with its collection type
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

      // Sort: Acordeón → Prisma
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
      {/* Products Grid Section - FIRST */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Colección Acordeón
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Armonía visual en cada pliegue
            </p>
            <p className="font-body text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-muted rounded-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} aspectRatio="rectangle" hoverImageIndex={2} />
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

      {/* Hero Split Section - AFTER PRODUCTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: Image */}
        <div className="relative bg-muted overflow-hidden">
          <img 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon.webp"
            alt="Colección Acordeón - Proceso artesanal"
            width={1720}
            height={1370}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text on solid color */}
        <div className="flex items-center justify-center px-8 py-16 lg:px-16">
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Diseño en movimiento
            </h2>
            <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Geometría en movimiento: pliegues que se expanden y contraen como un acordeón musical. 
              Esta colección celebra la repetición rítmica y la simetría arquitectónica del papel doblado. 
              Perfecta para espacios que buscan dinamismo visual y carácter contemporáneo.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            Acordeón en tu espacio
          </h2>
          <p className="font-body text-lg text-primary-foreground/90 mb-8">
            Cada pieza es única y hecha a mano. Personaliza tu orden.
          </p>
          <a 
            href="/#products" 
            className="inline-block px-8 py-3 bg-background text-foreground font-heading font-semibold rounded-sm hover:bg-background/90 transition-colors"
          >
            Explorar más colecciones
          </a>
        </div>
      </section>

      {/* Inspiration Section */}
      <InspirationCarousel />
    </EcommerceTemplate>
  )
}

export default CollectionAcordeon