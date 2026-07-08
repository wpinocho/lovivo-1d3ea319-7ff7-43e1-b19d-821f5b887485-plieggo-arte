# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.
- **MSI (meses sin intereses): Lovivo ya lo soporta en backend** (`payments-create-intent` lee `store_settings.payment_methods.installments` e inyecta `payment_method_options.card.installments`). Requiere que el dueño active MSI en el dashboard.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **PDP CTA**: "Agregar al carrito" PRIMARIO terracota (h-14); "Comprar ahora" SECUNDARIO outline (h-12); express TERCIARIO.
- **Sticky bar**: una fila, un botón terracota. Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm
- **ProductCard aspect-ratio: 4:5 SIEMPRE**. Hover: SIEMPRE `product.images[1]`.
- **PDP variant buttons**: h-8 px-3 text-xs rounded-sm
- **Galería móvil PDP**: carrusel con peek (basis-[86%]) + counter chip + dots (activo terracota). object-cover 4:5.
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350 / 1122×1402px).**
- **GALERÍA PDP — REGLA (fix 2026-07-08)**: `getDisplayImages()` en `HeadlessProduct.tsx` MERGEA `product.images` + extras de variante deduped.
- **"Arte vivo" (LightShadowFeature)**: variantes `triptych` (best-sellers) y `single` (resto).
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`. Iconos SVG line terracota, sin emojis, sin glow.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge (nuevo)**: leyenda "Hasta X meses sin intereses" con estilo sutil (border-primary/20, bg-primary/5, text-primary). NO glow.

## 3. Active Plan
**OBJETIVO: Subir conversión initiate_checkout → purchase (baseline ~30%).**

### FRENTE A — Meses sin intereses (MSI) — 🔧 CABLEAR BIEN (guía backend recibida 2026-07-08)

**Diagnóstico del código actual (verificado):**
- `StripePayment.tsx buildPayload` (línea 235) YA envía `payment_method_options: { card: { installments: { enabled: true } } }` — hardcodeado siempre ON.
- `PaymentMethods` type (`supabase.ts` L224) = `{ card, oxxo, spei }` → LE FALTAN `installments` e `installments_max_plan`.
- `PaymentElement` (L923) usa `layout: accordion, defaultCollapsed:false, radios:true` → NO bloquea MSI. ✅ Stripe montará el dropdown de meses solo.
- `business.name: 'Plieggo Arte'` ✅ ya corregido.
- `'card'` incluido en `buildPaymentMethodTypes` ✅.
- `ThankYou.tsx` hidrata la orden SOLO desde `localStorage('completed_order')` (construida en el cliente ANTES de confirmar el pago) → NO tiene `payment_method_details` del webhook. Interface `OrderDetails` no incluye ese campo.

**Confirmación técnica sobre direct charges (pregunta del dueño):** SÍ es correcto. El template usa Stripe Connect y en `StripePayment` (L988) pasa `{ stripeAccount: props.stripeAccountId }` a `loadStripe` cuando `chargeType === 'direct'`. MSI en México requiere que la cuenta conectada MX sea merchant of record → direct charges es exactamente el modo correcto. MSI aparece cuando el BIN de la tarjeta es elegible + PI trae `installments.enabled=true` + moneda MXN.

**Cambios concretos a implementar (Craft Mode):**

1. **`src/lib/supabase.ts` — extender tipos (OBLIGATORIO, tipado):**
```ts
export type PaymentMethods = {
  card: boolean
  oxxo: boolean
  spei: boolean
  installments?: boolean
  installments_max_plan?: 3 | 6 | 9 | 12
}

export type OrderPaymentMethodDetails = {
  type?: string
  card?: { brand?: string; last4?: string; country?: string; funding?: string }
  installments?: { count: number; interval: 'month'; type: 'fixed_count' }
}
```

2. **`src/components/StripePayment.tsx` — alinear con backend (RECOMENDADO):**
   - **Quitar** el `payment_method_options: { card: { installments: { enabled: true } } }` hardcodeado del `buildPayload` (L233-235). Motivo: la guía indica que el backend inyecta esto leyendo `store_settings.payment_methods.installments`. Dejarlo hardcodeado fuerza MSI siempre ON aunque el dueño lo apague en el dashboard. Que la config del dashboard sea la autoridad. (Si al probar en preview MSI deja de aparecer tras quitarlo, es señal de que el backend aún no inyecta → revertir y escalar a Lovivo.)
   - **Añadir badge de marketing** arriba del `<PaymentElement />` (~L922), sólo si MSI activo + MXN:
```tsx
{paymentMethods?.installments && (currency || 'mxn').toLowerCase() === 'mxn' && (
  <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
    Paga hasta en {paymentMethods.installments_max_plan ?? 6} meses sin intereses con tarjetas participantes.
  </div>
)}
```
   `paymentMethods` ya llega por props (L71).

3. **PDP — badge junto al precio (OPCIONAL, conversión):** en `ProductPageUI.tsx` leer de `useSettings()` → si `settings.payment_methods.installments`, mostrar micro-copy sutil bajo el precio: "o hasta {max} meses sin intereses" (o "{max} MSI de ${(price/max)}"). Estilo text-xs text-muted-foreground. Verificar cómo expone SettingsContext los payment_methods.

4. **`src/pages/ThankYou.tsx` — mostrar plan MSI elegido (RECOMENDADO, requiere trabajo extra):**
   - Problema: hoy la orden viene de localStorage y NO tiene `payment_method_details` (lo escribe el webhook en la DB DESPUÉS). Para mostrar "Pagado en 6 meses sin intereses con tarjeta terminada en 0004" hay que **fetch de la orden desde la DB** (supabase `.from('orders').select('*, payment_method_details, ...').eq('id', orderId)` o edge function `order-get`) y añadir `payment_method_details` a `OrderDetails`.
   - Render tras el bloque Total (L266):
```tsx
{order.payment_method_details?.installments && (
  <p className="text-sm text-muted-foreground">
    Pagado en {order.payment_method_details.installments.count} meses sin intereses
    {order.payment_method_details.card?.last4 && <> con tarjeta terminada en {order.payment_method_details.card.last4}</>}
  </p>
)}
```
   - Nota: puede haber un pequeño delay hasta que el webhook persista; considerar refetch o fallback silencioso.

**LO QUE NO HAY QUE HACER (de la guía):** NO añadir `installments` al array `payment_method_types`. NO montar UI custom de selección de meses (lo hace el PaymentElement). NO tocar la query de SettingsContext (payment_methods es jsonb, ya se selecciona).

**Archivos a tocar:** `src/lib/supabase.ts` (tipos, obligatorio), `src/components/StripePayment.tsx` (quitar hardcode + badge), `src/pages/ui/ProductPageUI.tsx` (badge opcional PDP), `src/pages/ThankYou.tsx` (mostrar plan, requiere fetch DB).

**PREREQUISITO (dueño):** activar MSI en el Dashboard (`store_settings.payment_methods.installments = true` + `installments_max_plan`). Sin eso el backend no inyecta nada.

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)

### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — 📋 Plan MSI validado contra código + guía backend. Confirmado: direct charges es el modo correcto. Backend inyecta payment_method_options; recomendado QUITAR el hardcode del frontend (respetar toggle dashboard), extender tipos PaymentMethods/OrderPaymentMethodDetails, badge en checkout + PDP, y fetch DB en ThankYou para mostrar plan MSI.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes. Trust strip PDP "10–15 días" → "Entrega 5–7 días hábiles".
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS" siempre.
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`. Integrado en `StripePayment.tsx`.
- **2026-07-08** — 🔎 Diagnóstico checkout CRO. MSI escalado a Lovivo.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5 en TODAS las páginas. Hover product.images[1].
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. `light-shadow-sets.ts`.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots.
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. CTA reorder.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%.
- **2026-06-24** — ✅ Order Tracking: OrderTrack.tsx + rutas /orders/track.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **DATO CLAVE**: varios productos tienen `variant.image_urls` que NO coinciden 1:1 con `product.images`. El fix de galería garantiza que product.images siempre lidere.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta). Fix verificado en preview (muestra 1/4 correcto).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **MSI**: frontend hardcodea `installments.enabled=true` (siempre ON). Al cablear bien, quitar y depender del toggle dashboard + backend. VERIFICAR en preview con tarjeta MX elegible tras el cambio.
- **ThankYou no hace fetch a la DB** (solo localStorage) → sin fetch no puede mostrar `payment_method_details` (plan MSI, últimos 4 dígitos). Requiere query/edge function.
- **Imágenes variant-only no-4:5** (ej. verde-salvia): con el fix ya no lideran, pero pueden aparecer recortadas en posiciones posteriores. Recomendar depurarlas en dashboard.
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** MSI: implementar los 4 cambios (tipos + quitar hardcode + badge checkout + ThankYou fetch). Prerequisito: dueño activa MSI en dashboard.
- **[ALTA]** VERIFICAR en preview con tarjeta MX elegible que aparece el selector de meses en el PaymentElement.
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Badge MSI en PDP junto al precio (conversión).
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.