import { useEffect, useState } from 'react'
import { supabase, type Bundle, type BundleItem } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

export const useBundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const { data, error } = await supabase
          .from('bundles')
          .select('id, title, description, images, slug, bundle_price, discount_percentage, compare_at_price, status, bundle_type, source_collection_id, pick_quantity, variant_filter')
          .eq('store_id', STORE_ID)
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching bundles:', error)
          return
        }

        setBundles(data || [])
      } catch (error) {
        console.error('Error fetching bundles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBundles()
  }, [])

  return { bundles, loading }
}

export const useBundleItems = (bundleId: string | null) => {
  const [items, setItems] = useState<BundleItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!bundleId) return

    const fetchItems = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('bundle_items')
          .select('id, bundle_id, product_id, variant_id, quantity, sort_order, products (id, title, price, images, variants, status)')
          .eq('bundle_id', bundleId)
          .order('sort_order')

        if (error) {
          console.error('Error fetching bundle items:', error)
          return
        }

        setItems((data as any) || [])
      } catch (error) {
        console.error('Error fetching bundle items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [bundleId])

  return { items, loading }
}

// ─── Fetch a single bundle by slug (for the Bundle detail page) ───────────────
export const useBundle = (slug: string | undefined) => {
  const [bundle, setBundle] = useState<Bundle | null>(null)
  const [items, setItems] = useState<BundleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchBundle = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('bundles')
          .select('id, title, description, images, slug, bundle_price, discount_percentage, compare_at_price, status, bundle_type, source_collection_id, pick_quantity, variant_filter')
          .eq('store_id', STORE_ID)
          .eq('slug', slug)
          .single()

        if (error || !data) {
          setNotFound(true)
          return
        }

        setBundle(data)

        // Fetch bundle_items only for fixed bundles (mix_match uses source_collection_id)
        if (data.bundle_type === 'fixed' || !data.bundle_type) {
          const { data: itemsData } = await supabase
            .from('bundle_items')
            .select('id, bundle_id, product_id, variant_id, quantity, sort_order, products (id, title, price, images, variants, status)')
            .eq('bundle_id', data.id)
            .order('sort_order')

          setItems((itemsData as any) || [])
        }
      } catch (err) {
        console.error('Error fetching bundle:', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBundle()
  }, [slug])

  return { bundle, items, loading, notFound }
}