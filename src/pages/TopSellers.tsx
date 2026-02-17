import { useEffect, useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

type ProductWithCollection = Product & { collectionType?: 'espacio' | 'acordeon' }

const TopSellers = () => {
  const [products, setProducts] = useState<ProductWithCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async () => {
    try {
      // Get collection ID
      const { data: collection } = await supabase
        .from('collections')
        .select('id')
        .eq('handle', 'top-sellers')
        .eq('store_id', STORE_ID)
        .single()

      if (!collection) return

      // Get product IDs from collection
      const { data: collectionProducts } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collection.id)

      if (!collectionProducts || collectionProducts.length === 0) return

      const productIds = collectionProducts.map(cp => cp.product_id)

      // Get products
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds)

      if (!data) return

      // Get Espacio and Acordeon collection IDs
      const { data: collections } = await supabase
        .from('collections')
        .select('id, handle')
        .eq('store_id', STORE_ID)
        .in('handle', ['coleccion-espacio', 'coleccion-acordeon'])

      const espacioCollectionId = collections?.find(c => c.handle === 'coleccion-espacio')?.id
      const acordeonCollectionId = collections?.find(c => c.handle === 'coleccion-acordeon')?.id

      // Get all collection_products relationships for these products
      const { data: allCollectionProducts } = await supabase
        .from('collection_products')
        .select('product_id, collection_id')
        .in('product_id', productIds)

      // Map products to their collections and add collectionType, then sort: Espacio first, then Acordeon
      const productsWithCollection: ProductWithCollection[] = data.map(product => {
        const productCollections = allCollectionProducts?.filter(cp => cp.product_id === product.id).map(cp => cp.collection_id) || []
        const isEspacio = productCollections.includes(espacioCollectionId)
        const isAcordeon = productCollections.includes(acordeonCollectionId)
        
        return {
          ...product,
          collectionType: isEspacio ? 'espacio' as const : isAcordeon ? 'acordeon' as const : undefined
        }
      })

      const sortedProducts = productsWithCollection.sort((a, b) => {
        if (a.collectionType === 'espacio' && b.collectionType !== 'espacio') return -1
        if (a.collectionType !== 'espacio' && b.collectionType === 'espacio') return 1
        return 0
      })

      setProducts(sortedProducts)
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
              Más Vendidos
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Los favoritos de nuestros clientes
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
                <ProductCard 
                  key={product.id} 
                  product={product}
                  aspectRatio={
                    product.collectionType === 'espacio' 
                      ? 'square' 
                      : product.collectionType === 'acordeon'
                      ? 'rectangle'
                      : 'auto'
                  }
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

      {/* Hero Split Section - AFTER PRODUCTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: Image */}
        <div className="relative bg-muted overflow-hidden">
          <img 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp"
            alt="Más Vendidos"
            width={1708}
            height={1368}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text on solid color */}
        <div className="bg-primary flex items-center justify-center px-8 py-16 lg:px-16">
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 tracking-tight">
              Piezas que enamoran
            </h2>
            <p className="font-body text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
              Nuestras piezas más queridas por los amantes del arte en papel. 
              Estos cuadros han conquistado espacios en hogares, oficinas y galerías por su 
              capacidad única de transformar ambientes con geometría pura y elegancia arquitectónica. 
              Las favoritas de nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-4">
            Únete a la comunidad
          </h2>
          <p className="font-body text-lg text-secondary-foreground/90 mb-8">
            Únete a nuestra comunidad de coleccionistas de arte en papel.
          </p>
          <a 
            href="/#products" 
            className="inline-block px-8 py-3 bg-background text-foreground font-heading font-semibold rounded-sm hover:bg-background/90 transition-colors"
          >
            Ver toda la colección
          </a>
        </div>
      </section>

      {/* Inspiration Section */}
      <InspirationCarousel />
    </EcommerceTemplate>
  )
}

export default TopSellers