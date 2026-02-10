import { useCart } from "@/contexts/CartContext"
import { useCheckout } from "@/hooks/useCheckout"
import { useSettings } from "@/contexts/SettingsContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

/**
 * FORBIDDEN ADAPTER - CartAdapter
 * 
 * Este adaptador expone toda la lógica del carrito de forma controlada.
 * Los componentes de UI solo pueden consumir estos métodos, no modificar la lógica interna.
 */
export const useCartLogic = () => {
  const { state, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { checkout, isLoading: isCreatingOrder } = useCheckout()
  const { currencyCode } = useSettings()
  
  // Estado para "Buy Now" temporal
  const [isBuyNow, setIsBuyNow] = useState(false)
  const [tempCartState, setTempCartState] = useState<any>(null)
  
  // Detectar modo "Buy Now" y cargar carrito temporal
  useEffect(() => {
    const buyNowParam = searchParams.get('buy_now')
    if (buyNowParam === 'true') {
      try {
        const tempCart = sessionStorage.getItem('buy_now_temp_cart')
        if (tempCart) {
          const parsed = JSON.parse(tempCart)
          setIsBuyNow(true)
          setTempCartState(parsed)
        }
      } catch (error) {
        console.error('Error loading Buy Now cart:', error)
      }
    } else {
      setIsBuyNow(false)
      setTempCartState(null)
    }
  }, [searchParams])
  
  // Usar carrito temporal si es "Buy Now", de lo contrario el carrito normal
  const activeState = isBuyNow && tempCartState ? tempCartState : state

  const handleCreateCheckout = async () => {
    try {
      console.log('Starting checkout process...')
      const customerInfo = {
        email: 'cliente@demo.com', // Por ahora usando datos de demo
        first_name: 'Cliente',
        last_name: 'Demo'
      }

      // Usar carrito temporal si es "Buy Now", de lo contrario carrito normal
      const itemsToCheckout = activeState.items
      const totalToCheckout = activeState.total

      // Snapshot del carrito antes de crear la orden
      try {
        sessionStorage.setItem('checkout_cart', JSON.stringify({ 
          items: itemsToCheckout, 
          total: totalToCheckout,
          isBuyNow: isBuyNow 
        }))
      } catch {}

      console.log('Calling checkout function...')
      const order = await checkout({
        customerInfo,
        currencyCode: currencyCode,
        items: itemsToCheckout // Pasar items explícitamente (temporales o normales)
      })

      console.log('Order created:', order)
      console.log('About to save order to sessionStorage...')
      
      // Guardar orden en sessionStorage para la página de checkout
      try {
        sessionStorage.setItem('checkout_order', JSON.stringify(order))
        sessionStorage.setItem('checkout_order_id', String(order.order_id))
        console.log('Order saved to sessionStorage')
      } catch (e) {
        console.error('Error saving to sessionStorage:', e)
      }

      // Limpiar carrito temporal si es "Buy Now"
      if (isBuyNow) {
        try {
          sessionStorage.removeItem('buy_now_temp_cart')
        } catch {}
      }

      console.log('Navigating to /checkout...')
      navigate('/checkout')
      console.log('Navigation call completed')
    } catch (error) {
      // El error ya es manejado por el hook useCheckout
      console.error('Error in handleCreateCheckout:', error)
    }
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

  const handleNavigateBack = () => {
    navigate('/')
  }

  return {
    // Estado del carrito (temporal o normal)
    items: activeState.items,
    total: activeState.total,
    itemCount: activeState.items.length,
    isEmpty: activeState.items.length === 0,
    isBuyNow,
    
    // Acciones del carrito
    updateQuantity,
    removeItem,
    
    // Navegación y checkout
    handleCreateCheckout,
    handleNavigateHome,
    handleNavigateBack,
    
    // Estados de carga
    isCreatingOrder,
    
    // Configuración
    currencyCode,
    
    // Eventos para features adicionales (confetti, etc)
    onCheckoutStart: () => {
      // Hook para features adicionales como confetti
      console.log('Checkout started - ready for additional features')
    },
    onCheckoutComplete: () => {
      // Hook para tracking adicional, etc
      console.log('Checkout completed - ready for additional tracking')
    }
  }
}