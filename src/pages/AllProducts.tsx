import { useEffect, useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { InspirationCarousel } from '@/components/InspirationCarousel'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

type ProductWithCollection = Product & { collectionType?: 'espacio' | 'acordeon' }

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

      // Get Espacio and Acordeon collection IDs
      const { data: collections } = await supabase
        .from('collections')
        .select('id, handle')
        .eq('store_id', STORE_ID)
        .in('handle', ['coleccion-espacio', 'coleccion-acordeon'])

      const espacioCollectionId = collections?.find(c => c.handle === 'coleccion-espacio')?.id
      const acordeonCollectionId = collections?.find(c => c.handle === 'coleccion-acordeon')?.id

      // Get all collection_products relationships
      const { data: allCollectionProducts } = await supabase
        .from('collection_products')
        .select('product_id, collection_id')
        .in('product_id', data.map(p => p.id))

      // Map products with their collection type
      const productsWithCollection: ProductWithCollection[] = data.map(product => {
        const productCollections = allCollectionProducts?.filter(cp => cp.product_id === product.id).map(cp => cp.collection_id) || []
        const isEspacio = productCollections.includes(espacioCollectionId)
        const isAcordeon = productCollections.includes(acordeonCollectionId)
        
        return {
          ...product,
          collectionType: isEspacio ? 'espacio' as const : isAcordeon ? 'acordeon' as const : undefined
        }
      })

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
              Todos los Cuadros
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora nuestra colección completa de arte textil artesanal
            </p>
            <p className="font-body text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
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
                No hay productos disponibles.
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
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/all-products.webp"
            alt="Todos los cuadros"
            width={1724}
            height={1388}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text on solid color */}
        <div className="bg-muted flex items-center justify-center px-8 py-16 lg:px-16">
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Arte hecho a mano
            </h2>
            <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Explora nuestra colección completa de arte en papel hecho a mano. Cada pieza es única, 
              creada con técnicas tradicionales de doblado y composición arquitectónica. 
              Desde formas geométricas hasta ilusiones espaciales, encuentra el pliegue perfecto 
              para transformar tu espacio.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            Piezas únicas
          </h2>
          <p className="font-body text-lg text-primary-foreground/90 mb-8">
            Cada cuadro es una pieza única. Envíos a toda la república.
          </p>
          <a 
            href="/about" 
            className="inline-block px-8 py-3 bg-background text-foreground font-heading font-semibold rounded-sm hover:bg-background/90 transition-colors"
          >
            Conoce nuestra historia
          </a>
        </div>
      </section>

      {/* Inspiration Section */}
      <InspirationCarousel />
    </EcommerceTemplate>
  )
}

export default AllProducts