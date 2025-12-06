import { useEffect, useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

const CollectionEspacio = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollectionProducts()
  }, [])

  const fetchCollectionProducts = async () => {
    try {
      // Get collection ID
      const { data: collection } = await supabase
        .from('collections')
        .select('id')
        .eq('handle', 'coleccion-espacio')
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

      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <EcommerceTemplate>
      {/* Hero Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: Image */}
        <div className="relative bg-muted overflow-hidden">
          <img 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764997368709-im0m2rvtb7.png"
            alt="Colección Espacio - Proceso artesanal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text on solid color */}
        <div className="bg-accent flex items-center justify-center px-8 py-16 lg:px-16">
          <div className="max-w-lg">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-accent-foreground mb-6 tracking-tight">
              Colección Espacio
            </h1>
            <p className="font-body text-lg lg:text-xl text-accent-foreground/80 leading-relaxed">
              Profundidad tridimensional capturada en papel: pliegues que crean ilusiones ópticas 
              y juegan con la luz natural. Esta colección explora la arquitectura del vacío y el volumen, 
              perfecta para espacios minimalistas que buscan un punto focal escultural.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="font-body text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-muted rounded-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
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

      {/* Bottom CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-4">
            Espacio en tu hogar
          </h2>
          <p className="font-body text-lg text-secondary-foreground/90 mb-8">
            Piezas que dialogan con la luz y transforman ambientes.
          </p>
          <a 
            href="/#products" 
            className="inline-block px-8 py-3 bg-background text-foreground font-heading font-semibold rounded-sm hover:bg-background/90 transition-colors"
          >
            Explorar más colecciones
          </a>
        </div>
      </section>
    </EcommerceTemplate>
  )
}

export default CollectionEspacio