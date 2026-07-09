# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend (`payments-create-intent`) inyecta payment_method_options[card][installments] server-side leyendo `store_settings.payment_methods.installments`.
- **SPEI (customer_balance) y OXXO ACTIVOS.** SPEI EXIGE un customer con EMAIL VÁLIDO al crear el intent.
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio que funciona). PRINCIPIO CLAVE: crear el PaymentIntent LO MÁS TARDE posible (con la orden aún editable).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement): "Paga hasta en {N} meses sin intereses con tarjetas participantes." (N = paymentMethods.installments_max_plan ?? 6). Sin glow. Este badge SIEMPRE se muestra; el selector inline de MSI aparece cuando existe el intent.

## 3. Active Plan
**🔧 BUG 2 (cantidad se regresa a 1) — CAUSA RAÍZ IDENTIFICADA. Pendiente ejecutar en Craft Mode.**

Bug 1 (correo se borra) YA quedó resuelto (confirmado por el dueño 2026-07-09). Bug 2 sigue: al subir la cantidad, la UI vuelve sola a 1 aunque el backend SÍ la guarda.

### Diagnóstico confirmado con la consola de prod
La consola muestra: `checkout-update succeeded {subtotal: 10000}` (= 2 uds × $5,000 → el backend SÍ acepta la cantidad 2), pero la UI muestra 1 y total $5,000. Justo después aparecen 3× `Checkout updated from external component` + un segundo `Variant debug` → el evento `checkout:updated` re-renderiza la lista y REVIERTE la cantidad.

**Cadena exacta del bug:**
1. Usuario da "+": `updateQuantity` (en `src/hooks/useOrderItems.ts`) hace update optimista a qty 2, registra `pendingQuantitiesRef.set(key, 2)` y tras 300ms llama `updateCheckoutItems`.
2. `checkout-update` responde OK con `order_items` (respuesta ligera). En `updateQuantity` corre la rama `else if ('order_items' in response)` (línea ~405) → llama `mergeResponseIntoCache(...)`.
3. `mergeResponseIntoCache` (top de `useOrderItems.ts`) hace `getOrderSnapshot()` (la orden CACHEADA, cuyos `order_items` TODAVÍA tienen qty 1) y solo mezcla campos financieros (subtotal, etc.). Llama `updateOrderCache(...)`.
4. `updateOrderCache` (en `src/hooks/useCheckoutState.ts`, línea 98) **dispara `window.dispatchEvent(new CustomEvent('checkout:updated', { detail: orderData }))`** con order_items qty 1.
5. El listener `checkout:updated` en `useOrderItems.ts` (líneas ~302-320) hace `transformOrderItems(updatedOrder.order_items, ...)` + `setOrderItems(reconciled)` **SIN respetar la cantidad optimista/pendiente** → PISA la UI de qty 2 a qty 1.

Root cause en una frase: el listener `checkout:updated` confía ciegamente en un evento que carga `order_items` con la cantidad vieja (porque `mergeResponseIntoCache` solo actualiza campos financieros del cache, no las cantidades).

### Fix a ejecutar (quirúrgico, en `src/hooks/useOrderItems.ts`)
Modificar SOLO el listener `checkout:updated` (el `useEffect` con `handler`, líneas ~301-320) para que NO pise las cantidades del usuario:

```ts
const handler = (e: Event) => {
  const ce = e as CustomEvent<any>
  const updatedOrder = ce.detail
  // NUEVO: si hay una actualización de cantidad en vuelo, updateQuantity es el
  // dueño del estado y pondrá la cantidad final correcta. Ignorar el evento aquí
  // evita revertir la cantidad optimista, porque updateOrderCache emite este
  // evento con order_items que aún tienen la cantidad VIEJA (mergeResponseIntoCache
  // solo mezcla campos financieros, no cantidades).
  if (updatingItemsRef.current.size > 0) return
  if (updatedOrder?.order_items) {
    const items = transformOrderItems(updatedOrder.order_items, orderItems)
    const seen = new Set<string>()
    // NUEVO: overlayPending protege cualquier cantidad solicitada que aún no
    // se refleje en el cache.
    const reconciled = overlayPending(items)
      .filter(it => it.quantity > 0)
      .filter(it => { if (seen.has(it.key)) return false; seen.add(it.key); return true })
    setOrderItems(reconciled)
  }
}
```

Dos capas de protección:
1. `if (updatingItemsRef.current.size > 0) return` — mientras `updateQuantity` procesa (el key sigue en `updatingItems` hasta el `finally`, que corre DESPUÉS del dispatch), ignora el evento auto-inducido.
2. `overlayPending(items)` — si el evento se cuela igual, respeta la cantidad pendiente registrada en `pendingQuantitiesRef`.

Nota: `overlayPending` ya está definido en el hook y usa `Math.max`. Depende de `overlayPending` → agregarlo al array de deps del `useEffect` (junto a `transformOrderItems`, `orderItems`).

El caso legítimo de este listener (ajustes externos de inventario) NO se rompe: esos ocurren cuando NO hay update en vuelo (`updatingItems.size === 0`).

### Validación esperada tras el fix
- Subir cantidad a 2 → se queda en 2, total = $10,000, subtotal correcto.
- Bajar cantidad a 1 → funciona (updateQuantity setea pending=1, Math.max deja 1).
- Quitar item (qty 0) → sigue funcionando (`removeItem`).
- Bug 1 (correo) sigue OK; MSI sigue apareciendo; SPEI/OXXO/express OK.

### Files to modify
- `src/hooks/useOrderItems.ts`: SOLO el `useEffect` del listener `checkout:updated` (~líneas 301-320): agregar guard `updatingItemsRef.current.size > 0` y `overlayPending()`; añadir `overlayPending` a deps.

## 4. Recent Changes
- **2026-07-09** — 🔧 DIAGNÓSTICO BUG 2 (cantidad vuelve a 1): causa raíz = listener `checkout:updated` en `useOrderItems.ts` pisa la cantidad optimista con `order_items` viejos que trae el evento (emitido por `updateOrderCache` en `useCheckoutState.ts` línea 98; el cache solo mezcla campos financieros vía `mergeResponseIntoCache`). Fix planeado: guard `updatingItemsRef.size>0` + `overlayPending` en el listener. PENDIENTE ejecutar en Craft Mode.
- **2026-07-09** — ✅ Bug 1 (correo se borra) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate en createIntent (+dep). `CheckoutUI.tsx`: estado `emailConfirmed` (onEmailBlur/onLinkAuthChange), cálculo de `canCreateIntent` y `defaultAddress`. Intent up-front solo con form completo → correo no se borra + cantidad editable.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4 "best of both worlds": quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline).
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona (checkout como rodata).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx`).

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[EJECUTAR 2026-07-09] Bug 2 cantidad vuelve a 1** — causa raíz identificada (listener `checkout:updated` pisa cantidad optimista). Fix quirúrgico planeado en `useOrderItems.ts`. Ejecutar en Craft Mode y validar en prod.
- **[VALIDAR EN PROD 2026-07-09] PagoPendiente**: compra SPEI y OXXO en prod; confirmar sin 404, datos correctos, copy funciona, fallback OK.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso (inofensivo). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT MODE]** Ejecutar fix Bug 2 (cantidad) en `useOrderItems.ts` y validar en prod.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).