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
        // Step 1: get product IDs from the join table
        const { data: cpData, error: cpError } = await supabase
          .from('collection_products')
          .select('product_id')
          .eq('collection_id', collectionId)

        if (cpError) {
          console.error('Error fetching collection products:', cpError)
          return
        }

        const productIds = (cpData || [])
          .map((cp: any) => cp.product_id)
          .filter(Boolean)

        if (productIds.length === 0) {
          setProducts([])
          return
        }

        // Step 2: fetch the actual products by IDs
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('id, title, price, compare_at_price, images, image_metadata, status, variants, options, slug')
          .in('id', productIds)

        if (productsError) {
          console.error('Error fetching products:', productsError)
          return
        }

        const items: Product[] = (productsData || [])
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