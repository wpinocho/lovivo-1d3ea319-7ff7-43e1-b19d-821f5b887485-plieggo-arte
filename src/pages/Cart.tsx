import { useEffect, useRef } from "react"
import { HeadlessCart } from "@/components/headless/HeadlessCart"
import { CartUI } from "@/pages/ui/CartUI"
import { useCart } from "@/contexts/CartContext"
import { trackInternal, INTERNAL_EVENTS } from "@/lib/tracking-utils"

/**
 * ROUTE COMPONENT - Cart
 * 
 * Este componente conecta HeadlessCart con CartUI.
 * Toda la lógica está en HeadlessCart y la presentación en CartUI.
 */

export default function Cart() {
  const { state } = useCart()

  // `cart_viewed` una sola vez por visita a la página, no en cada re-render
  // (el total cambia cuando el usuario ajusta cantidades).
  const trackedRef = useRef(false)
  useEffect(() => {
    if (trackedRef.current) return
    trackedRef.current = true
    trackInternal(INTERNAL_EVENTS.CART_VIEWED, {
      source: 'page',
      value: state.total,
      num_items: state.items.length,
    })
  }, [state.total, state.items.length])

  return (
    <HeadlessCart>
      {(logic) => <CartUI logic={logic} />}
    </HeadlessCart>
  )
}