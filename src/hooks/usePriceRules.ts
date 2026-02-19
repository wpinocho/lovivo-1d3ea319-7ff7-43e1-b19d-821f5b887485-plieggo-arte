import { useEffect, useState } from 'react'
import { supabase, type PriceRule } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

export const usePriceRules = () => {
  const [priceRules, setPriceRules] = useState<PriceRule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const { data, error } = await supabase
          .from('price_rules')
          .select('id, title, description, rule_type, conditions, applies_to, product_ids, collection_ids, starts_at, ends_at')
          .eq('store_id', STORE_ID)
          .eq('active', true)

        if (error) {
          console.error('Error fetching price rules:', error)
          return
        }

        // Filter by date validity on client side
        const validRules = (data || []).filter(rule => {
          if (rule.starts_at && new Date(rule.starts_at) > new Date()) return false
          if (rule.ends_at && new Date(rule.ends_at) < new Date()) return false
          return true
        })

        setPriceRules(validRules)
      } catch (error) {
        console.error('Error fetching price rules:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRules()
  }, [])

  const getRulesForProduct = (productId: string, collectionIds?: string[]): PriceRule[] => {
    return priceRules.filter(rule => {
      if (rule.applies_to === 'all') return true
      if (rule.applies_to === 'specific_products' && rule.product_ids?.includes(productId)) return true
      if (rule.applies_to === 'specific_collections' && collectionIds && rule.collection_ids?.some(cid => collectionIds.includes(cid))) return true
      return false
    })
  }

  return { priceRules, loading, getRulesForProduct }
}