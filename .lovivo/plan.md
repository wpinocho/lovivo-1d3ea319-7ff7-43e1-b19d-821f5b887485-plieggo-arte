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
**✅ BUG 2 (cantidad se regresa a 1) — EJECUTADO. Pendiente validar en prod.**

Los dos bugs críticos del checkout quedaron resueltos en código. Bug 1 (correo se borra) confirmado por el dueño. Bug 2 (cantidad vuelve a 1) ejecutado en `useOrderItems.ts` este turno.

### Fix ejecutado (2026-07-09, en `src/hooks/useOrderItems.ts`)
Root cause: el listener `checkout:updated` pisaba la cantidad optimista con `order_items` viejos que emitía `updateOrderCache` (el cache solo mezcla campos financieros vía `mergeResponseIntoCache`, no cantidades).

Dos capas de protección aplicadas en el `useEffect` del listener (~línea 302):
1. `if (updatingItemsRef.current.size > 0) return` — ignora el evento auto-inducido mientras `updateQuantity` procesa (el key sigue en `updatingItems` hasta el `finally`, que corre DESPUÉS del dispatch).
2. `overlayPending(items)` — respeta la cantidad pendiente registrada en `pendingQuantitiesRef` si el evento se cuela.
3. `overlayPending` agregado a las deps del `useEffect`.

Extra: en el `finally` de `updateQuantity` ahora se hace `pendingQuantitiesRef.current.delete(key)` para no dejar cantidades "pegadas" con `Math.max` que bloqueen ajustes externos legítimos a la baja.

### Validación esperada (PENDIENTE EN PROD)
- Subir cantidad a 2 → se queda en 2, total = $10,000. ✅ esperado
- Bajar cantidad a 1 → funciona (updateQuantity setea pending=1). ✅ esperado
- Quitar item (qty 0) → sigue funcionando (`removeItem`). ✅ esperado
- Bug 1 (correo) sigue OK; MSI aparece; SPEI/OXXO/express OK.

## 4. Recent Changes
- **2026-07-09** — ✅ EJECUTADO FIX BUG 2 (cantidad vuelve a 1) en `useOrderItems.ts`: listener `checkout:updated` ahora hace guard `updatingItemsRef.current.size > 0` + `overlayPending()` (+ dep). Además el `finally` de `updateQuantity` limpia `pendingQuantitiesRef.delete(key)`. PENDIENTE validar en prod.
- **2026-07-09** — 🔧 DIAGNÓSTICO BUG 2: causa raíz = listener `checkout:updated` pisa la cantidad optimista con `order_items` viejos.
- **2026-07-09** — ✅ Bug 1 (correo se borra) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate en createIntent (+dep). `CheckoutUI.tsx`: estado `emailConfirmed` (onEmailBlur/onLinkAuthChange), cálculo de `canCreateIntent` y `defaultAddress`.
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
- **[VALIDAR EN PROD 2026-07-09] Bug 2 cantidad**: fix ejecutado en `useOrderItems.ts`. Probar en prod: subir a 2 se queda en 2 ($10,000), bajar a 1 funciona, quitar item funciona.
- **[VALIDAR EN PROD 2026-07-09] PagoPendiente**: compra SPEI y OXXO en prod; confirmar sin 404, datos correctos, copy funciona, fallback OK.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso (inofensivo). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** Validar Bug 2 (cantidad) en prod tras deploy.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).