import React, { useMemo, useState, useCallback, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, LinkAuthenticationElement, AddressElement, ExpressCheckoutElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { callEdge } from "@/lib/edge"
import { STORE_ID, STRIPE_PUBLISHABLE_KEY } from "@/lib/config"
import { countryNameToCode } from "@/lib/country-codes"
import { getStripeAppearance } from "@/lib/stripe-appearance"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useCart } from "@/contexts/CartContext"
import { useCheckoutState } from "@/hooks/useCheckoutState"
import { useSettings } from "@/contexts/SettingsContext"
import { trackPurchase, tracking } from "@/lib/tracking-utils"
import type { PaymentMethods } from "@/lib/supabase"
import { formatMoney } from "@/lib/money"
import { isValidPhone } from "@/lib/phone-utils"
import { MissingPhoneDialog } from "@/components/MissingPhoneDialog"
import { CheckoutSecurityBanner, CheckoutRating, CheckoutGuarantees, CheckoutPaymentLogos } from "@/components/CheckoutTrustBadges"

/** Validación simple de correo completo (para gatear la creación del intent). */
export function isCompleteEmail(email?: string | null): boolean {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

/** Build Stripe payment_method_types array from store_settings.payment_methods */
function buildPaymentMethodTypes(pm?: PaymentMethods): string[] {
  const types: string[] = []
  if (!pm || pm.card !== false) types.push('card')
  if (pm?.oxxo) types.push('oxxo')
  if (pm?.spei) types.push('customer_balance')
  return types
}

/** Normalize + dedupe cart/order items into the shape the payments edge expects. */
function buildPaymentItemsFrom(items: any[], sourceOrder: any): any[] {
  const rawItems: any[] = (Array.isArray(items) && items.length > 0)
    ? items
    : (sourceOrder && Array.isArray(sourceOrder.order_items) ? sourceOrder.order_items : [])

  const normalizedItems = rawItems.map((it: any) => ({
    product_id: it.product_id || it.product?.id || '',
    variant_id: it.variant_id || it.variant?.id,
    quantity: Number(it.quantity ?? 0),
    price: Number(it.variant_price ?? it.variant?.price ?? it.price ?? it.unit_price ?? 0),
    selling_plan_id: it.selling_plan_id || undefined,
    product_name: it.product_name || it.product?.name || '',
  }))

  const seen = new Set<string>()
  return normalizedItems.filter((it: any) => it.product_id && it.quantity > 0).filter((it: any) => {
    const key = `${it.product_id}:${it.variant_id ?? ''}:${it.selling_plan_id ?? ''}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

interface BuildIntentPayloadArgs {
  orderId?: string
  checkoutToken?: string
  currency?: string
  expectedTotal?: number
  deliveryFee?: number
  description?: string
  metadata?: Record<string, string>
  email?: string
  name?: string
  phone?: string
  paymentMethods?: PaymentMethods
  shippingAddress?: any
  billingAddress?: any
  deliveryExpectations?: any[]
  pickupLocations?: any[]
}

/** Build the payments-create-intent payload. Shared between the click-time
 *  (deferred) flow and the early-creation (installments) flow. */
function buildCreateIntentPayload(paymentItems: any[], totalCents: number, a: BuildIntentPayloadArgs) {
  const { orderId, checkoutToken, currency, expectedTotal, deliveryFee = 0, description, metadata, email, name, phone, paymentMethods, shippingAddress, billingAddress, deliveryExpectations, pickupLocations } = a
  return {
    store_id: STORE_ID,
    order_id: orderId,
    checkout_token: checkoutToken,
    amount: totalCents,
    currency: currency || "mxn",
    expected_total: expectedTotal || totalCents,
    delivery_fee: deliveryFee,
    description: description || `Pedido #${orderId ?? "s/n"}`,
    metadata: { order_id: orderId ?? "", ...(metadata || {}) },
    receipt_email: email,
    customer: { email, name, phone },
    capture_method: "automatic",
    use_stripe_connect: true,
    payment_method_types: buildPaymentMethodTypes(paymentMethods),
    // MSI: el backend inyecta payment_method_options[card][installments] server-side
    // leyendo store_settings.payment_methods.installments (interruptor del Dashboard).
    validation_data: {
      shipping_address: shippingAddress ? {
        line1: shippingAddress.line1 || "",
        line2: shippingAddress.line2 || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        postal_code: shippingAddress.postal_code || "",
        country: shippingAddress.country || "",
        name: `${shippingAddress.first_name || ""} ${shippingAddress.last_name || ""}`.trim()
      } : null,
      billing_address: billingAddress ? {
        line1: billingAddress.line1 || "",
        line2: billingAddress.line2 || "",
        city: billingAddress.city || "",
        state: billingAddress.state || "",
        postal_code: billingAddress.postal_code || "",
        country: billingAddress.country || "",
        name: `${billingAddress.first_name || ""} ${billingAddress.last_name || ""}`.trim()
      } : null,
      items: paymentItems.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        ...(item.variant_id ? { variant_id: item.variant_id } : {}),
        price: Math.max(0, Math.round(Number(item.price) * 100))
      })),
      ...(metadata?.discount_code ? { discount_code: metadata.discount_code } : {})
    },
    ...(pickupLocations && pickupLocations.length === 1 ? {
      delivery_method: "pickup",
      pickup_locations: pickupLocations.map(loc => ({
        id: loc.id || loc.name,
        name: loc.name || "",
        address: `${loc.line1 || ""}, ${loc.city || ""}, ${loc.state || ""}, ${loc.country || ""}`,
        hours: loc.schedule || ""
      }))
    } : deliveryExpectations && deliveryExpectations.length > 0 && deliveryExpectations[0]?.type !== "pickup" ? {
      delivery_expectations: deliveryExpectations.map((exp: any) => ({
        type: exp.type || "standard_delivery",
        description: exp.description || "",
        ...(exp.price !== undefined ? { estimated_days: "3-5" } : {})
      }))
    } : {})
  }
}

interface StripeAddressValue {
  name: string
  address: {
    line1: string
    line2: string | null
    city: string
    state: string
    postal_code: string
    country: string // 2-letter ISO code
  }
  phone?: string
}

interface StripePaymentProps {
  amountCents: number
  currency?: string
  description?: string
  metadata?: Record<string, string>
  email?: string
  name?: string
  phone?: string
  orderId?: string
  checkoutToken?: string
  onValidationRequired?: () => boolean
  expectedTotal?: number
  deliveryFee?: number
  shippingAddress?: any
  billingAddress?: any
  items?: any[]
  deliveryExpectations?: any[]
  pickupLocations?: any[]
  billingSlot?: React.ReactNode
  deliveryMethodSlot?: React.ReactNode
  paymentMethods?: PaymentMethods
  stripeAccountId?: string | null
  chargeType?: string | null
  onEmailChange?: (email: string) => void
  onEmailBlur?: () => void
  onAddressChange?: (address: StripeAddressValue, complete: boolean) => void
  allowedCountries?: string[]
  defaultAddress?: Partial<StripeAddressValue>
  showAddressElement?: boolean
  /**
   * Whether the on-page AddressElement currently has a complete address.
   * - true  → Express Checkout wallet runs in silent mode (uses form address).
   * - false → wallet must request shipping address from user (form is empty/incomplete).
   */
  addressElementComplete?: boolean
  shippingError?: string | null
  onLinkAuthChange?: (authenticated: boolean) => void
  /** client_secret de un PaymentIntent creado UP-FRONT (modo requerido para mostrar
   *  el selector de meses sin intereses inline dentro del PaymentElement). */
  preClientSecret?: string
  /** Order devuelto junto con el intent pre-creado. */
  preIntentOrder?: any
  /** Solo crear el PaymentIntent up-front cuando el formulario esté completo
   *  (correo confirmado + dirección). Evita remontes destructivos de Elements
   *  mientras el usuario escribe (bug: correo se borra) y mantiene la orden
   *  editable para cambiar cantidad (bug: cantidad no funciona). */
  canCreateIntent?: boolean
}


function PaymentForm({
  amountCents,
  currency = "mxn",
  description,
  metadata,
  email,
  name,
  phone,
  orderId,
  checkoutToken,
  onValidationRequired,
  expectedTotal,
  deliveryFee = 0,
  shippingAddress,
  billingAddress,
  items = [],
  deliveryExpectations = [],
  pickupLocations = [],
  billingSlot,
  deliveryMethodSlot,
  paymentMethods,
  onEmailChange,
  onEmailBlur,
  onAddressChange,
  allowedCountries,
  defaultAddress,
  showAddressElement = false,
  addressElementComplete = false,
  shippingError,
  onLinkAuthChange,
  preClientSecret,
  preIntentOrder,
}: StripePaymentProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [eceAvailable, setEceAvailable] = useState(false)
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const { updateOrderCache, getFreshOrder, getOrderSnapshot } = useCheckoutState()
  const { currencyCode } = useSettings()

  // Diagnostic log: confirm whether AddressElement is mounted in this render.
  useEffect(() => {
    console.log('[StripePayment] mount/update', {
      showAddressElement,
      hasPickup: !showAddressElement,
      hasShippingAddress: !!shippingAddress?.line1,
      currentPhone: phone || '(empty)',
    })
  }, [showAddressElement, shippingAddress, phone])

  // Missing-phone fallback dialog (Shopify-style)
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false)
  const phoneResolverRef = React.useRef<{ resolve: (v: string) => void; reject: () => void } | null>(null)
  const requestMissingPhone = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      phoneResolverRef.current = { resolve, reject }
      setPhoneDialogOpen(true)
    })
  }, [])
  const handlePhoneDialogSubmit = (value: string) => {
    setPhoneDialogOpen(false)
    phoneResolverRef.current?.resolve(value)
    phoneResolverRef.current = null
  }
  const handlePhoneDialogCancel = () => {
    setPhoneDialogOpen(false)
    phoneResolverRef.current?.reject()
    phoneResolverRef.current = null
  }

  // Per Stripe deferred-mode docs: when the amount changes, update the Elements
  // amount in-place. Remounting <Elements> would kill open wallet sessions.
  useEffect(() => {
    if (!elements) return
    // En modo client_secret (up-front, MSI) NO se puede llamar elements.update({amount}).
    // El monto ya está fijado en el PaymentIntent. Solo aplica en modo deferred.
    if (preClientSecret) return
    try {
      elements.update({ amount: Math.max(amountCents || 50, 50) })
    } catch (err) {
      console.warn('elements.update(amount) failed:', err)
    }
  }, [elements, amountCents, preClientSecret])

  const amountLabel = useMemo(() => {
    const amt = (amountCents || 0) / 100
    const cur = (currency || "mxn").toUpperCase()
    return `${formatMoney(amt, currency || "mxn")} ${cur}`
  }, [amountCents, currency])

  const normalizeOrderFromResponse = (resp: any) => {
    if (resp?.order) return resp.order
    return {
      id: resp?.order_id ?? orderId,
      store_id: STORE_ID,
      checkout_token: resp?.checkout_token ?? checkoutToken,
      currency_code: resp?.currency_code,
      subtotal: resp?.subtotal,
      discount_amount: resp?.discount_amount,
      total_amount: resp?.total_amount,
      order_items: Array.isArray(resp?.order_items) ? resp.order_items : []
    }
  }

  const buildPaymentItems = () => {
    const sourceOrder = (typeof getFreshOrder === 'function' ? getFreshOrder() : null) || (typeof getOrderSnapshot === 'function' ? getOrderSnapshot() : null)
    return buildPaymentItemsFrom(items, sourceOrder)
  }

  const buildPayload = (paymentItems: any[], totalCents: number) => buildCreateIntentPayload(paymentItems, totalCents, {
    orderId, checkoutToken, currency, expectedTotal, deliveryFee, description, metadata,
    email, name, phone, paymentMethods, shippingAddress, billingAddress,
    deliveryExpectations, pickupLocations,
  })

  const handleUnavailableItems = (data: any) => {
    if (data?.unavailable_items && data.unavailable_items.length > 0) {
      const unavailableNames = data.unavailable_items.map((item: any) =>
        item.variant_name ? `${item.product_name} (${item.variant_name})` : item.product_name
      ).join(', ')
      toast({
        title: "Productos agotados",
        description: `Los siguientes productos ya no están disponibles: ${unavailableNames}. Retíralos de tu carrito para completar tu compra.`,
        variant: "destructive"
      })
      updateOrderCache(normalizeOrderFromResponse(data))
      return true
    }
    return false
  }

  const handlePayment = async () => {
    if (!stripe || !elements) {
      toast({ title: "Error", description: "Stripe no está listo", variant: "destructive" })
      return
    }

    if (onValidationRequired && !onValidationRequired()) return

    if (deliveryExpectations?.[0]?.type === "pickup" && (!pickupLocations || pickupLocations.length === 0)) {
      toast({ title: "Punto de recogida requerido", description: "Por favor selecciona un punto de recogida antes de continuar.", variant: "destructive" })
      return
    }

    try {
      setLoading(true)

      const paymentItems = buildPaymentItems()
      const totalCents = Math.max(0, Math.floor(amountCents || 0))
      const hasSubscription = paymentItems.some((it: any) => it.selling_plan_id)

      let client_secret: string | undefined
      let intentOrder: any = null

      const { error: submitError } = await elements.submit()
      if (submitError) {
        toast({ title: "Error", description: submitError.message || "Verifica los datos de pago", variant: "destructive" })
        return
      }

      if (preClientSecret) {
        // Modo up-front: el intent ya se creó al montar el checkout (para que Stripe
        // muestre el selector de meses sin intereses). No se recrea en el clic.
        client_secret = preClientSecret
        intentOrder = preIntentOrder ?? null
      } else if (hasSubscription) {
        const subscriptionItems = paymentItems.filter((it: any) => it.selling_plan_id)
        const oneTimeItems = paymentItems.filter((it: any) => !it.selling_plan_id)
        const mainItem = subscriptionItems[0]
        const subPayload = {
          store_id: STORE_ID,
          selling_plan_id: mainItem.selling_plan_id,
          recurring_items: subscriptionItems.map((i: any) => ({
            product_id: i.product_id, variant_id: i.variant_id, quantity: i.quantity,
          })),
          order_id: orderId,
          customer: { email, name },
          one_time_items: oneTimeItems.length > 0 ? oneTimeItems.map((i: any) => ({
            product_id: i.product_id, variant_id: i.variant_id, quantity: i.quantity, price: i.price, title: i.product_name || '',
          })) : undefined,
        }
        const data = await callEdge('subscription-create', subPayload)
        if (handleUnavailableItems(data)) return
        client_secret = data?.client_secret
        intentOrder = data?.order ?? null
      } else {
        const payload = buildPayload(paymentItems, totalCents)
        console.log('🔍 StripePayment payload:', JSON.stringify(payload, null, 2))
        const data = await callEdge("payments-create-intent", payload)
        if (handleUnavailableItems(data)) return
        client_secret = data?.client_secret
        intentOrder = data?.order ?? null
        }

      if (!client_secret) {
        throw new Error("No se recibió client_secret del servidor")
      }

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/gracias/${orderId}`,
          receipt_email: email || undefined,
          payment_method_data: {
            billing_details: {
              name: name || undefined,
              email: email || undefined,
              phone: phone || undefined,
              address: shippingAddress ? {
                line1: shippingAddress.line1 || '',
                line2: shippingAddress.line2 || '',
                city: shippingAddress.city || '',
                state: shippingAddress.state || '',
                postal_code: shippingAddress.postal_code || '',
                country: countryNameToCode(shippingAddress.country || ''),
              } : undefined,
            },
          },
        },
        redirect: 'if_required',
      })

      if (result.error) {
        toast({ title: "Error de pago", description: result.error.message || "No se pudo procesar el pago", variant: "destructive" })
        return
      }

      const pi = result.paymentIntent
      const nextAction = pi?.next_action as any

      if (pi?.status === 'succeeded') {
        const _ptKey1 = `purchase_tracked_${orderId}`;
        const _alreadyTracked1 = (() => { try { return sessionStorage.getItem(_ptKey1) === '1'; } catch { return false; } })();
        if (!_alreadyTracked1) {
          try { sessionStorage.setItem(_ptKey1, '1'); } catch {}
          trackPurchase({
            products: paymentItems.map((item: any) => tracking.createTrackingProduct({
              id: item.product_id, title: item.product_name || item.title,
              price: item.price / 100, category: 'product',
              variant: item.variant_id ? { id: item.variant_id } : undefined
            })),
            value: totalCents / 100, currency: tracking.getCurrencyFromSettings(currency),
            order_id: orderId,
            custom_parameters: { payment_method: 'stripe', checkout_token: checkoutToken }
          })
        }

        try {
          let toPersist: any = intentOrder
          if (!toPersist) {
            const checkoutData = localStorage.getItem(`checkout:${STORE_ID}`)
            if (checkoutData) {
              const parsed = JSON.parse(checkoutData)
              if (parsed?.order) toPersist = parsed.order
            }
          }
          if (!toPersist) {
            toPersist = {
              id: orderId,
              order_number: String(orderId || '').slice(0, 8),
              total_amount: totalCents / 100,
              currency_code: (currency || 'usd').toUpperCase(),
              status: 'paid',
              shipping_address: shippingAddress,
              billing_address: billingAddress || shippingAddress,
              order_items: paymentItems.map((i: any) => ({
                product_id: i.product_id,
                variant_id: i.variant_id,
                product_name: i.product_name || i.title,
                variant_name: i.variant_name,
                quantity: i.quantity,
                price: (i.price || 0) / 100,
                product_images: i.product_images || [],
              })),
              created_at: new Date().toISOString(),
            }
          }
          localStorage.setItem('completed_order', JSON.stringify(toPersist))
        } catch {}

        clearCart()
        navigate(`/gracias/${orderId}`)
        toast({ title: "¡Pago exitoso!", description: "Tu compra ha sido procesada correctamente." })
      } else if (pi?.status === 'requires_action') {
        if (nextAction?.oxxo_display_details) {
          const details = nextAction.oxxo_display_details
          sessionStorage.setItem('pending_payment', JSON.stringify({
            method: 'oxxo',
            orderId,
            voucherUrl: details.hosted_voucher_url,
            number: details.number,
            expiresAfter: details.expires_after,
            amount: (amountCents || 0) / 100,
            currency: (currency || 'mxn').toUpperCase(),
          }))
          clearCart()
          navigate(`/pago-pendiente/${orderId}`)
        } else if (nextAction?.display_bank_transfer_instructions) {
          const instructions = nextAction.display_bank_transfer_instructions
          const speiAddr = instructions.financial_addresses?.find((a: any) => a.type === 'spei')?.spei
          sessionStorage.setItem('pending_payment', JSON.stringify({
            method: 'spei',
            orderId,
            hostedUrl: instructions.hosted_instructions_url,
            clabe: speiAddr?.clabe || '',
            bankName: speiAddr?.bank_name || '',
            amount: (instructions.amount_remaining || amountCents || 0) / 100,
            currency: (currency || 'mxn').toUpperCase(),
          }))
          clearCart()
          navigate(`/pago-pendiente/${orderId}`)
        } else {
          toast({ title: "Acción requerida", description: "Por favor completa la verificación del pago." })
        }
      } else if (pi?.status === 'processing') {
        clearCart()
        navigate(`/pago-pendiente/${orderId}`)
      } else {
        toast({ title: "Estado del pago", description: `Estado: ${pi?.status ?? "desconocido"}` })
      }
    } catch (err: any) {
      console.error("Error en el proceso de pago:", err)
      handlePaymentError(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentError = (err: any) => {
    const message = err?.message || ""
    const jsonStart = message.indexOf("{")
    const jsonEnd = message.lastIndexOf("}")
    if (jsonStart !== -1 && jsonEnd !== -1) {
      try {
        const parsed = JSON.parse(message.slice(jsonStart, jsonEnd + 1))
        if (handleUnavailableItems(parsed)) return
      } catch {}
    }
    const lowered = (message || "").toLowerCase()
    if (lowered.includes("stripe_not_connected") || lowered.includes("stripe not connected")) {
      toast({
        title: "Pagos no configurados",
        description: "Esta tienda aún no ha configurado un método de pago. Ve al dashboard de Lovivo para conectar Stripe y empezar a recibir pagos.",
      })
      return
    }
    toast({ title: "Error de pago", description: "No se pudo procesar el pago. Intenta de nuevo.", variant: "destructive" })
  }

  const handleExpressCheckoutConfirm = useCallback(async (ev?: any) => {
    if (!stripe || !elements) return
    try {
      setLoading(true)
      const { error: submitError } = await elements.submit()
      if (submitError) {
        toast({ title: "Error", description: submitError.message || "Verifica los datos de pago", variant: "destructive" })
        return
      }

      const walletShipping = ev?.shippingAddress
      const walletBilling = ev?.billingDetails
      const walletEmail = walletBilling?.email || ev?.email || email
      let walletPhone = walletBilling?.phone || ev?.phone || phone

      if (!isValidPhone(walletPhone)) {
        try {
          console.log('[ExpressCheckout] phone missing from wallet — opening MissingPhoneDialog', {
            walletBillingPhone: walletBilling?.phone,
            evPhone: ev?.phone,
            statePhone: phone,
          })
          walletPhone = await requestMissingPhone()
        } catch {
          toast({
            title: 'Pago cancelado',
            description: 'Necesitamos tu teléfono para coordinar el envío.',
            variant: 'destructive',
          })
          return
        }
      }

      const walletName = walletBilling?.name || walletShipping?.name || name
      const walletShipRate = ev?.shippingRate

      const effectiveShippingAddress = walletShipping?.address ? {
        first_name: (walletShipping.name || walletName || '').split(' ')[0] || '',
        last_name: (walletShipping.name || walletName || '').split(' ').slice(1).join(' ') || '',
        line1: walletShipping.address.line1 || '',
        line2: walletShipping.address.line2 || '',
        city: walletShipping.address.city || '',
        state: walletShipping.address.state || '',
        postal_code: walletShipping.address.postal_code || '',
        country: walletShipping.address.country || '',
        phone: walletPhone || '',
      } : shippingAddress
      const effectiveBillingAddress = walletBilling?.address ? {
        first_name: (walletName || '').split(' ')[0] || '',
        last_name: (walletName || '').split(' ').slice(1).join(' ') || '',
        line1: walletBilling.address.line1 || '',
        line2: walletBilling.address.line2 || '',
        city: walletBilling.address.city || '',
        state: walletBilling.address.state || '',
        postal_code: walletBilling.address.postal_code || '',
        country: walletBilling.address.country || '',
        phone: walletPhone || '',
      } : (billingAddress || effectiveShippingAddress)

      if (showAddressElement && (!effectiveShippingAddress || !effectiveShippingAddress.line1)) {
        toast({
          title: "Falta dirección de envío",
          description: "Por favor completa tu dirección antes de pagar.",
          variant: "destructive",
        })
        return
      }

      const paymentItems = buildPaymentItems()
      const walletShipCents = typeof walletShipRate?.amount === 'number' ? walletShipRate.amount : (deliveryFee || 0)
      const totalCents = Math.max(0, Math.floor(amountCents || 0))

      const basePayload = buildPayload(paymentItems, totalCents)
      const payload = {
        ...basePayload,
        delivery_fee: walletShipCents,
        receipt_email: walletEmail,
        customer: { email: walletEmail, name: walletName, phone: walletPhone },
        validation_data: {
          ...basePayload.validation_data,
          shipping_address: effectiveShippingAddress ? {
            line1: effectiveShippingAddress.line1 || '',
            line2: effectiveShippingAddress.line2 || '',
            city: effectiveShippingAddress.city || '',
            state: effectiveShippingAddress.state || '',
            postal_code: effectiveShippingAddress.postal_code || '',
            country: effectiveShippingAddress.country || '',
            name: `${effectiveShippingAddress.first_name || ''} ${effectiveShippingAddress.last_name || ''}`.trim() || walletName || '',
          } : null,
          billing_address: effectiveBillingAddress ? {
            line1: effectiveBillingAddress.line1 || '',
            line2: effectiveBillingAddress.line2 || '',
            city: effectiveBillingAddress.city || '',
            state: effectiveBillingAddress.state || '',
            postal_code: effectiveBillingAddress.postal_code || '',
            country: effectiveBillingAddress.country || '',
            name: `${effectiveBillingAddress.first_name || ''} ${effectiveBillingAddress.last_name || ''}`.trim() || walletName || '',
          } : null,
        },
      }

      let client_secret: string | undefined
      let intentOrder: any = null
      if (preClientSecret) {
        client_secret = preClientSecret
        intentOrder = preIntentOrder ?? null
      } else {
        const data = await callEdge("payments-create-intent", payload)
        if (handleUnavailableItems(data)) return
        client_secret = data?.client_secret
        intentOrder = data?.order ?? null
      }
      if (!client_secret) throw new Error("No se recibió client_secret del servidor")

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/gracias/${orderId}`,
          payment_method_data: {
            billing_details: {
              name: walletName || undefined,
              email: walletEmail || undefined,
              phone: walletPhone || undefined,
              address: effectiveShippingAddress ? {
                line1: effectiveShippingAddress.line1 || '',
                line2: effectiveShippingAddress.line2 || '',
                city: effectiveShippingAddress.city || '',
                state: effectiveShippingAddress.state || '',
                postal_code: effectiveShippingAddress.postal_code || '',
                country: (effectiveShippingAddress.country || '').length === 2
                  ? effectiveShippingAddress.country
                  : countryNameToCode(effectiveShippingAddress.country || ''),
              } : undefined,
            },
          },
        },
        redirect: 'if_required',
      })
      if (result.error) {
        toast({ title: "Error de pago", description: result.error.message || "No se pudo procesar el pago", variant: "destructive" })
        return
      }

      const pi = result.paymentIntent
      if (pi?.status === 'succeeded') {
        const _ptKey2 = `purchase_tracked_${orderId}`;
        const _alreadyTracked2 = (() => { try { return sessionStorage.getItem(_ptKey2) === '1'; } catch { return false; } })();
        if (!_alreadyTracked2) {
          try { sessionStorage.setItem(_ptKey2, '1'); } catch {}
          trackPurchase({
            products: paymentItems.map((item: any) => tracking.createTrackingProduct({
              id: item.product_id, title: item.product_name || item.title,
              price: item.price / 100, category: 'product',
              variant: item.variant_id ? { id: item.variant_id } : undefined
            })),
            value: totalCents / 100, currency: tracking.getCurrencyFromSettings(currency),
            order_id: orderId,
            custom_parameters: { payment_method: 'express_checkout', checkout_token: checkoutToken }
          })
        }

        try {
          let toPersist: any = intentOrder
          if (!toPersist) {
            const checkoutData = localStorage.getItem(`checkout:${STORE_ID}`)
            if (checkoutData) {
              const parsed = JSON.parse(checkoutData)
              if (parsed?.order) toPersist = parsed.order
            }
          }
          if (!toPersist) {
            toPersist = {
              id: orderId,
              order_number: String(orderId || '').slice(0, 8),
              total_amount: totalCents / 100,
              currency_code: (currency || 'usd').toUpperCase(),
              status: 'paid',
              shipping_address: effectiveShippingAddress,
              billing_address: effectiveBillingAddress || effectiveShippingAddress,
              order_items: paymentItems.map((i: any) => ({
                product_id: i.product_id,
                variant_id: i.variant_id,
                product_name: i.product_name || i.title,
                variant_name: i.variant_name,
                quantity: i.quantity,
                price: (i.price || 0) / 100,
                product_images: i.product_images || [],
              })),
              created_at: new Date().toISOString(),
            }
          }
          localStorage.setItem('completed_order', JSON.stringify(toPersist))
        } catch {}
        clearCart()
        navigate(`/gracias/${orderId}`)
        toast({ title: "¡Pago exitoso!", description: "Tu compra ha sido procesada correctamente." })
      } else if (pi?.status === 'processing') {
        clearCart()
        navigate(`/pago-pendiente/${orderId}`)
      }
    } catch (err: any) {
      console.error("Express checkout error:", err)
      handlePaymentError(err)
    } finally {
      setLoading(false)
    }
  }, [stripe, elements, amountCents, orderId, email, name, phone, shippingAddress, billingAddress, deliveryFee, navigate, clearCart, requestMissingPhone, showAddressElement, toast])

  const handleExpressShippingAddressChange = useCallback(async (ev: any) => {
    try {
      const country = (ev?.address?.country || '').toUpperCase()
      if (allowedCountries && allowedCountries.length > 0 && country && !allowedCountries.includes(country)) {
        ev.reject()
        return
      }

      const paymentItems = buildPaymentItems()
      const data = await callEdge('shipping-rates', {
        store_id: STORE_ID,
        destination: {
          country_code: country,
          state_code: ev?.address?.state || '',
          postal_code: ev?.address?.postal_code || '',
        },
        items: paymentItems.map((i: any) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          ...(i.variant_id ? { variant_id: i.variant_id } : {}),
        })),
        currency_code: (currency || 'mxn').toUpperCase(),
      })

      if (!data?.coverage?.ok || !Array.isArray(data?.rates) || data.rates.length === 0) {
        ev.reject()
        return
      }

      const subtotalCents = Math.max(0, (amountCents || 0) - (deliveryFee || 0))
      const shippingRates = data.rates.map((r: any) => ({
        id: String(r.id),
        displayName: r.name || 'Envío',
        amount: Math.round(Number(r.amount || 0) * 100),
        deliveryEstimate: r.delivery_estimate ? String(r.delivery_estimate).slice(0, 22) : undefined,
      }))
      const firstShipCents = shippingRates[0].amount

      try { elements?.update({ amount: subtotalCents + firstShipCents }) } catch {}

      ev.resolve({
        shippingRates,
        lineItems: [
          { name: 'Subtotal', amount: subtotalCents },
        ],
      })
    } catch (err) {
      console.error('shippingaddresschange error:', err)
      try { ev.reject() } catch {}
    }
  }, [allowedCountries, currency, amountCents, deliveryFee, elements])

  const handleExpressShippingRateChange = useCallback(async (ev: any) => {
    try {
      const shipCents = Number(ev?.shippingRate?.amount || 0)
      const subtotalCents = Math.max(0, (amountCents || 0) - (deliveryFee || 0))
      try { elements?.update({ amount: subtotalCents + shipCents }) } catch {}
      ev.resolve({
        lineItems: [
          { name: 'Subtotal', amount: subtotalCents },
        ],
      })
    } catch {}
  }, [amountCents, deliveryFee, elements])

  return (
    <div className="space-y-6">
      <MissingPhoneDialog
        open={phoneDialogOpen}
        defaultValue={phone}
        onSubmit={handlePhoneDialogSubmit}
        onCancel={handlePhoneDialogCancel}
      />

      {/* Banner de seguridad */}
      <CheckoutSecurityBanner />

      {/* Express Checkout (Google Pay, Apple Pay) — visible desde el inicio, como rodata */}
      {(
        <>
          <div style={{ display: eceAvailable ? undefined : 'none' }}>
          <ExpressCheckoutElement
            onConfirm={handleExpressCheckoutConfirm}
            onReady={(ev: any) => {
              const methods = ev?.availablePaymentMethods ?? {}
              const hasAny = Object.values(methods).some(Boolean)
              setEceAvailable(hasAny)
            }}
            onShippingAddressChange={showAddressElement ? handleExpressShippingAddressChange : undefined}
            onShippingRateChange={showAddressElement ? handleExpressShippingRateChange : undefined}
            onCancel={() => {
              try { elements?.update({ amount: Math.max(amountCents || 50, 50) }) } catch {}
            }}
            options={(() => {
              const placeholderRates = [{ id: 'calculating', displayName: 'Calculando envío…', amount: 0 }]
              const orderHasShippingAddress = Boolean(
                shippingAddress && (shippingAddress.line1 || shippingAddress.address?.line1)
              )
              const formIsReady = addressElementComplete && orderHasShippingAddress
              const wantsShipping = showAddressElement && !formIsReady
              return {
                buttonHeight: 44,
                buttonType: {
                  googlePay: 'plain',
                  applePay: 'plain',
                },
                paymentMethodOrder: ['applePay', 'googlePay', 'link'],
                layout: {
                  overflow: 'auto',
                  maxColumns: 2,
                  maxRows: 1,
                },
                emailRequired: true,
                phoneNumberRequired: true,
                ...(allowedCountries && allowedCountries.length > 0 ? {
                  allowedShippingCountries: allowedCountries,
                } : {}),
                ...(wantsShipping ? {
                  shippingAddressRequired: true,
                  shippingRates: placeholderRates,
                } : {}),
              } as any
            })()}
          />
          </div>
          {eceAvailable && (
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">o</span>
              <Separator className="flex-1" />
            </div>
          )}
        </>
      )}

      {/* Link Authentication */}
      <LinkAuthenticationElement
        options={{
          defaultValues: {
            email: email || '',
          },
        }}
        onChange={(event) => {
          if (event.value?.email && onEmailChange) {
            onEmailChange(event.value.email)
          }
          const authenticated = !!(event as any).authenticated
          if (onLinkAuthChange) {
            onLinkAuthChange(authenticated)
          }
        }}
        onBlur={() => onEmailBlur?.()}
      />

      {/* Shipping Address Element */}
      {showAddressElement && (
        <>
          <AddressElement
            options={{
              mode: 'shipping',
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
              display: {
                name: 'split',
              },
              defaultValues: defaultAddress ? {
                firstName: defaultAddress.name?.split(' ')[0] || '',
                lastName: defaultAddress.name?.split(' ').slice(1).join(' ') || '',
                address: defaultAddress.address ? {
                  line1: defaultAddress.address.line1 || '',
                  line2: defaultAddress.address.line2 || '',
                  city: defaultAddress.address.city || '',
                  state: defaultAddress.address.state || '',
                  postal_code: defaultAddress.address.postal_code || '',
                  country: defaultAddress.address.country || 'MX',
                } : { country: 'MX', line1: '', line2: '', city: '', state: '', postal_code: '' },
                phone: defaultAddress.phone || '',
              } : {
                address: { country: 'MX', line1: '', line2: '', city: '', state: '', postal_code: '' },
              },
              ...(allowedCountries && allowedCountries.length > 0 ? {
                allowedCountries,
              } : {}),
            }}
            onChange={(event) => {
              if (onAddressChange) {
                const val = event.value as StripeAddressValue
                onAddressChange(val, event.complete)
              }
            }}
          />

          {shippingError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive mt-0.5 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <p className="text-sm text-destructive">{shippingError}</p>
            </div>
          )}

          {deliveryMethodSlot}
        </>
      )}

      {/* MSI marketing badge — solo si el Dashboard tiene MSI activo y la moneda es MXN */}
      {paymentMethods?.installments && (currency || 'mxn').toLowerCase() === 'mxn' && (
        <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-primary">Págalo a meses sin intereses</p>
            <p className="text-sm text-primary/90">
              Desde {formatMoney(((amountCents || 0) / 100) / (paymentMethods.installments_max_plan ?? 6), currency || "mxn")} al mes, hasta {paymentMethods.installments_max_plan ?? 6} meses. Ingresa tu tarjeta para ver los plazos de tu banco.
            </p>
          </div>
        </div>
      )}

      {/* Unified Payment Element */}
      <PaymentElement
        options={{
          layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
          },
          fields: {
            billingDetails: {
              name: 'never',
              email: 'never',
              phone: 'never',
              address: 'never',
            },
          },
          defaultValues: {
            billingDetails: {
              name: name || undefined,
              email: email || undefined,
              phone: phone || undefined,
            },
          },
          business: {
            name: 'Plieggo Arte',
          },
        }}
      />

      {billingSlot}

      {/* Prueba social real */}
      <CheckoutRating />

      <Button
        onClick={handlePayment}
        disabled={!stripe || loading || !amountCents || !!shippingError}
        className="w-full h-12 text-lg font-semibold"
        size="lg"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Procesando...</span>
          </div>
        ) : `Completar Compra · ${amountLabel}`}
      </Button>

      {/* Garantías + métodos de pago */}
      <div className="space-y-3 pt-1">
        <CheckoutGuarantees />
        <CheckoutPaymentLogos />
      </div>

      <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
        <a href="/terminos-y-condiciones" target="_blank" className="underline hover:text-foreground">Condiciones</a>
        <span>|</span>
        <a href="/aviso-de-privacidad" target="_blank" className="underline hover:text-foreground">Privacidad</a>
      </div>
    </div>
  )
}

/** Skeleton mientras se crea el intent up-front (evita montar Elements en deferred
 *  y luego remontarlo, lo que mataría el selector de meses). */
function PaymentBlockSkeleton() {
  return (
    <div className="space-y-6">
      <CheckoutSecurityBanner />
      <div className="space-y-3 animate-pulse">
        <div className="h-11 rounded-md bg-muted" />
        <div className="h-11 rounded-md bg-muted" />
        <div className="h-32 rounded-md bg-muted" />
        <div className="h-12 rounded-md bg-muted" />
      </div>
    </div>
  )
}

export default function StripePayment(props: StripePaymentProps) {
  const stripePromise = useMemo(() => {
    const opts = props.chargeType === 'direct' && props.stripeAccountId
      ? { stripeAccount: props.stripeAccountId }
      : {};
    return loadStripe(STRIPE_PUBLISHABLE_KEY, opts);
  }, [props.stripeAccountId, props.chargeType]);

  const { getFreshOrder, getOrderSnapshot } = useCheckoutState()

  // ── MSI: modo client_secret UP-FRONT ─────────────────────────────────────
  // Stripe SOLO muestra el selector de meses sin intereses INLINE si el intent se
  // crea ANTES de que el cliente escriba la tarjeta (con installments habilitado
  // server-side). En Plieggo es seguro porque el envío es gratis/fijo → el total
  // es estable desde el mount. Para suscripciones o si falla la creación, caemos
  // a modo deferred (el intent se crea en el clic).
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentOrder, setIntentOrder] = useState<any>(null)
  const [intentReady, setIntentReady] = useState(false)
  const creatingRef = React.useRef(false)
  const intentAmountRef = React.useRef<number | null>(null)

  // Las suscripciones tienen su propio flujo (subscription-create) → sin up-front.
  const hasSubscription = useMemo(() => {
    const src = (typeof getFreshOrder === 'function' ? getFreshOrder() : null)
      || (typeof getOrderSnapshot === 'function' ? getOrderSnapshot() : null)
    return buildPaymentItemsFrom(props.items || [], src).some((it: any) => it.selling_plan_id)
  }, [props.items, getFreshOrder, getOrderSnapshot])

  const createIntent = useCallback(async () => {
    if (creatingRef.current || !props.orderId || !props.amountCents) return
    // SPEI (customer_balance) exige un customer con email válido al crear el intent.
    // Sin email válido NO creamos intent up-front: dejamos que caiga a deferred sin 500s.
    // Además solo creamos el intent cuando el formulario está completo (canCreateIntent):
    // así la orden sigue editable (cantidad/dirección) y no remontamos Elements a mitad
    // de escritura del correo.
    if (!props.canCreateIntent || !isCompleteEmail(props.email)) { setIntentReady(true); return }
    creatingRef.current = true
    try {
      const src = (typeof getFreshOrder === 'function' ? getFreshOrder() : null)
        || (typeof getOrderSnapshot === 'function' ? getOrderSnapshot() : null)
      const paymentItems = buildPaymentItemsFrom(props.items || [], src)
      const totalCents = Math.max(0, Math.floor(props.amountCents || 0))
      const payload = buildCreateIntentPayload(paymentItems, totalCents, {
        orderId: props.orderId, checkoutToken: props.checkoutToken, currency: props.currency,
        expectedTotal: props.expectedTotal, deliveryFee: props.deliveryFee, description: props.description,
        metadata: props.metadata, email: props.email, name: props.name, phone: props.phone,
        paymentMethods: props.paymentMethods, shippingAddress: props.shippingAddress,
        billingAddress: props.billingAddress, deliveryExpectations: props.deliveryExpectations,
        pickupLocations: props.pickupLocations,
      })
      const data = await callEdge('payments-create-intent', payload)
      if (data?.client_secret) {
        intentAmountRef.current = totalCents
        setIntentOrder(data.order ?? null)
        setClientSecret(data.client_secret)
      }
    } catch (err) {
      console.error('[StripePayment] up-front create-intent failed, fallback to deferred', err)
    } finally {
      creatingRef.current = false
      setIntentReady(true)
    }
  }, [props.orderId, props.amountCents, props.checkoutToken, props.currency, props.expectedTotal,
      props.deliveryFee, props.description, props.metadata, props.email, props.name, props.phone,
      props.paymentMethods, props.shippingAddress, props.billingAddress, props.deliveryExpectations,
      props.pickupLocations, props.items, props.canCreateIntent, getFreshOrder, getOrderSnapshot])

  // Crear el intent una sola vez al montar (flujo one-time).
  useEffect(() => {
    if (hasSubscription) { setIntentReady(true); return }
    if (!clientSecret) createIntent()
  }, [hasSubscription, clientSecret, createIntent])

  // Si el total cambia (p. ej. cupón aplicado después de montar), recrear el intent
  // con el nuevo monto. Es un evento raro y NO es un swap de modo (sigue client_secret).
  useEffect(() => {
    if (hasSubscription || !clientSecret) return
    if (intentAmountRef.current != null && props.amountCents
        && Math.floor(props.amountCents) !== intentAmountRef.current) {
      createIntent()
    }
  }, [props.amountCents, clientSecret, hasSubscription, createIntent])

  const elementsOptions = useMemo(() => {
    if (clientSecret) {
      // Modo client_secret: los métodos de pago vienen del intent (card+oxxo+SPEI).
      return { clientSecret, appearance: getStripeAppearance() }
    }
    // Fallback deferred (suscripción o si falló la creación up-front).
    return {
      mode: 'payment' as const,
      amount: Math.max(props.amountCents || 50, 50),
      currency: (props.currency || 'mxn').toLowerCase(),
      paymentMethodTypes: buildPaymentMethodTypes(props.paymentMethods),
      appearance: getStripeAppearance(),
    }
  }, [clientSecret, props.amountCents, props.currency, props.paymentMethods])

  // Mostrar skeleton mientras se crea el intent up-front (evita el flash deferred).
  if (!hasSubscription && !clientSecret && !intentReady) {
    return <PaymentBlockSkeleton />
  }

  return (
    <Elements stripe={stripePromise} options={elementsOptions} key={clientSecret || 'deferred'}>
      <PaymentForm
        {...props}
        preClientSecret={clientSecret || undefined}
        preIntentOrder={intentOrder}
      />
    </Elements>
  )
}