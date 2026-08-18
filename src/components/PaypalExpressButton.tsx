import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useSettings } from '@/contexts/SettingsContext'
import { callEdge } from '@/lib/edge'
import { STORE_ID } from '@/lib/config'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { trackPurchase, tracking, getAttributionPayload } from '@/lib/tracking-utils'

interface PaypalExpressButtonProps {
  orderId: string
  checkoutToken: string
  /** Total final en unidades de moneda (ej. 4500.00) */
  amount: number
  /** Código de moneda en minúsculas (ej. 'mxn') */
  currency: string
  items: any[]
  shippingCost: number
  /** className del contenedor exterior */
  className?: string
  /** Muestra el separador "o paga con" arriba del botón (default true) */
  showDivider?: boolean
}

/**
 * PayPal Express Checkout.
 *
 * PayPal recolecta la dirección de envío del comprador dentro de su propio
 * popup, así que NO se valida el formulario del checkout antes de abrirlo.
 * Si la tienda no tiene PayPal conectado, el componente no renderiza nada.
 */
export function PaypalExpressButton({
  orderId,
  checkoutToken,
  amount,
  currency,
  items,
  shippingCost,
  className,
  showDivider = true,
}: PaypalExpressButtonProps) {
  const { paypalEnabled, paypalClientId } = useSettings()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { clearCart } = useCart()

  if (!paypalEnabled || !paypalClientId || !checkoutToken) return null

  const currencyUpper = currency.toUpperCase()

  return (
    <div className={className}>
      {showDivider && (
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">o paga con</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      )}

      <PayPalScriptProvider
        key={`${paypalClientId}-${currencyUpper}`}
        options={{
          clientId: paypalClientId,
          currency: currencyUpper,
          intent: 'capture',
        }}
      >
        <PayPalButtons
          style={{ layout: 'horizontal', height: 45, tagline: false, color: 'gold' }}
          fundingSource="paypal"
          createOrder={async () => {
            const result = await callEdge('paypal-create-order', {
              store_id: STORE_ID,
              checkout_token: checkoutToken,
              amount,
              currency: currencyUpper,
              items,
              shipping: shippingCost,
              attribution: getAttributionPayload(),
            })
            if (!result?.id) throw new Error('No se recibió el ID de la orden de PayPal')
            return result.id
          }}
          onApprove={async (data) => {
            try {
              const res = await callEdge('paypal-capture-order', {
                store_id: STORE_ID,
                paypal_order_id: data.orderID,
                checkout_token: checkoutToken,
                attribution: getAttributionPayload(),
              })
              if (!res?.ok || res?.status !== 'COMPLETED') {
                throw new Error(res?.error || 'El pago no se completó')
              }

              // Orden de respaldo por si el backend no devuelve res.order,
              // para que /gracias siempre tenga algo que mostrar.
              const internalOrderId = res.order?.id || res.order_id
              const fallbackOrder = {
                id: internalOrderId || data.orderID,
                order_number: (internalOrderId || data.orderID).slice(0, 8).toUpperCase(),
                total_amount: amount,
                currency_code: currencyUpper,
                status: 'paid',
                checkout_token: checkoutToken,
                payment_method: 'paypal',
                order_items: items.map((it: any) => ({
                  product_name: it.title || it.product_name || 'Producto',
                  quantity: it.quantity,
                  price: it.unit_price || it.price || 0,
                  product_images: it.images || it.product_images || [],
                  variant_name: it.variant_title || it.variant_name || null,
                })),
                created_at: new Date().toISOString(),
              }

              // Se fusiona: lo que devuelva el backend manda, pero nunca perdemos
              // checkout_token ni payment_method (los usa /gracias).
              const orderForThankYou = { ...fallbackOrder, ...(res.order ?? {}) }
              try {
                localStorage.setItem('completed_order', JSON.stringify(orderForThankYou))
              } catch { /* modo privado */ }
              const ordId = internalOrderId || data.orderID

              // Purchase (Pixel + CAPI + PostHog) con guardia en sessionStorage
              // para que no se dispare dos veces con la misma orden.
              const ptKey = `purchase_tracked_${ordId}`
              const alreadyTracked = (() => {
                try { return sessionStorage.getItem(ptKey) === '1' } catch { return false }
              })()
              if (!alreadyTracked) {
                try { sessionStorage.setItem(ptKey, '1') } catch { /* modo privado */ }
                trackPurchase({
                  products: items
                    .filter((it: any) => (it.quantity ?? 0) > 0)
                    .map((it: any) => tracking.createTrackingProduct({
                      id: it.product_id || it.id,
                      title: it.title || it.product_name,
                      price: it.unit_price || it.price || 0,
                      category: 'product',
                      variant: it.variant_id ? { id: it.variant_id } : undefined,
                    })),
                  value: amount,
                  currency,
                  order_id: ordId,
                  custom_parameters: { payment_method: 'paypal', checkout_token: checkoutToken },
                })
              }

              clearCart()
              navigate(`/gracias/${ordId}`)
              toast({
                title: '¡Pago exitoso!',
                description: 'Tu compra ha sido procesada correctamente.',
              })
            } catch (err: unknown) {
              toast({
                title: 'No se pudo completar el pago con PayPal',
                description: err instanceof Error
                  ? err.message
                  : 'Intenta de nuevo o paga con tarjeta más abajo.',
                variant: 'destructive',
              })
            }
          }}
          onError={(err: unknown) => {
            toast({
              title: 'Error con PayPal',
              description: err instanceof Error
                ? err.message
                : 'Algo salió mal. Intenta de nuevo o paga con tarjeta más abajo.',
              variant: 'destructive',
            })
          }}
          onCancel={() => { /* el usuario cerró el popup — no hay nada que hacer */ }}
        />
      </PayPalScriptProvider>
    </div>
  )
}