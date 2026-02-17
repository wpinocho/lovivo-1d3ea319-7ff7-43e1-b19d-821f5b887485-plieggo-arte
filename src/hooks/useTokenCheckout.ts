import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { callEdge } from '@/lib/edge'
import { STORE_ID } from '@/lib/config'
import { logger } from '@/lib/logger'

/**
 * Hook to handle checkout via payment link token (?token=xxx)
 * 
 * When a checkout URL contains ?token=<checkout_token>, this hook:
 * 1. Fetches the order data from the backend via order-get
 * 2. Saves it to checkout state (localStorage)
 * 3. Triggers a page reload to pick up the new checkout state
 */
export const useTokenCheckout = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoadingToken, setIsLoadingToken] = useState(false)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const processedRef = useRef(false)

  useEffect(() => {
    if (processedRef.current) return

    const token = searchParams.get('token')
    if (!token) return

    processedRef.current = true
    setIsLoadingToken(true)
    logger.debug('useTokenCheckout: Found token in URL:', token)

    const loadOrderByToken = async () => {
      try {
        // Call order-get edge function
        const response = await callEdge('order-get', {
          checkout_token: token,
        })

        if (!response || response.error) {
          setTokenError(response?.error || 'Order not found')
          setIsLoadingToken(false)
          return
        }

        logger.debug('useTokenCheckout: Order loaded:', response.order_id)

        // Save to checkout state in localStorage
        const checkoutState = {
          order_id: response.order_id,
          checkout_token: response.checkout_token,
          store_id: response.store_id || STORE_ID,
          updatedAt: Date.now(),
          discount_code: response.discount_code || undefined,
          order: response.order || {
            id: response.order_id,
            store_id: response.store_id || STORE_ID,
            order_number: response.order_number,
            subtotal: response.subtotal,
            tax_amount: response.tax_amount || 0,
            shipping_amount: response.shipping_amount || 0,
            discount_amount: response.discount_amount || 0,
            total_amount: response.total_amount,
            shipping_address: response.shipping_address,
            billing_address: response.billing_address,
            notes: response.notes,
            discount_code: response.discount_code,
            currency_code: response.currency_code,
            status: response.status,
            checkout_token: response.checkout_token,
            created_at: '',
            updated_at: '',
            order_items: response.order_items || [],
          },
        }

        const storageKey = `checkout:${STORE_ID}`
        localStorage.setItem(storageKey, JSON.stringify(checkoutState))
        logger.debug('useTokenCheckout: Checkout state saved to localStorage')

        // Clean the token from URL and reload to pick up new state
        setSearchParams({}, { replace: true })
        
        // Force reload to pick up the new checkout state
        window.location.reload()
      } catch (err) {
        console.error('useTokenCheckout: Error loading order:', err)
        setTokenError(err instanceof Error ? err.message : 'Failed to load order')
        setIsLoadingToken(false)
      }
    }

    loadOrderByToken()
  }, [searchParams, setSearchParams])

  return {
    isLoadingToken,
    tokenError,
    hasToken: !!searchParams.get('token'),
  }
}
