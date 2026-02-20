import { useEffect, useState } from 'react'
import { supabase, type Product } from '@/lib/supabase'

export const useCollectionProducts = (collectionId: string | undefined | null) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!collectionId) {
      setProducts([])
      return
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('collection_products')
          .select('products (id, title, price, compare_at_price, images, image_metadata, status, variants, options, slug)')
          .eq('collection_id', collectionId)

        if (error) {
          console.error('Error fetching collection products:', error)
          return
        }

        const items: Product[] = (data || [])
          .map((cp: any) => cp.products)
          .filter(Boolean)
          .filter((p: Product) => p.status !== 'inactive' && p.status !== 'draft')

        setProducts(items)
      } catch (error) {
        console.error('Error fetching collection products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [collectionId])

  return { products, loading }
}