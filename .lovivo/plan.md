# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- **OJO B2B:** el tráfico de `/proyectos` NO es el mismo perfil. Interioristas/compradores corporativos entran más desde desktop y en horario laboral.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE:** medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Flujo por WhatsApp. ALTA DEMANDA.
  - Solo estilos de colecciones existentes (Luna, Acordeón, Acordeón Prisma, **Atlas**). Color limitado a paleta del proveedor de opalina.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** **ENTREGA: 5–7 días hábiles** (piezas estándar).
- **Best-sellers reales: `verde-salvia` y `acorden-beige-sutil`.** **Rating: 4.8★ · 196 reseñas.**
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS. **PayPal Express integrado (2026-08-18).** **PRECIO MÍNIMO PERSONALIZADOS: $3,500 MXN.**
- **✅ ANCLA DE PRECIO B2B AUTORIZADA (2026-08-17):** "desde $3,500 MXN por pieza" en `/proyectos`. Constante `PRICE_FROM` en `Proyectos.tsx`.
- **❌ BADGE "NUEVO" PROHIBIDO (2026-08-24, decisión del dueño).** No etiquetar piezas por antigüedad. Solo `best-seller` y `limited-edition`.

### GARANTÍA — CONFIRMADA POR EL DUEÑO (2026-08-19)
- **30 días en piezas NO personalizadas.** Si no le gusta al cliente, la devuelve y se le reembolsa.
- **Instrucción explícita del dueño: NO escribir letra chica defensiva.** El copy va en positivo: **"30 días para enamorarte · Si no, lo recogemos y te devolvemos"**.
- **Sigue pendiente del dueño:** ¿quién paga el envío de retorno? ¿reembolso o reposición?

### FICHA TÉCNICA CONFIRMADA POR EL DUEÑO (2026-08-17)
- **Medidas:** desde **20 × 20 cm** hasta piezas de **más de 1 metro**. Las del sitio son las estándar.
- **Material:** opalina libre de ácidos hasta ~100 × 70 cm; **lino** en formatos mayores.
- **Marco:** madera, color y acabado a elegir. Con o sin acrílico.
- **Montaje:** **llega con soporte ya montado atrás.** Se cuelga directo.
- **Peso:** varía con la medida; siempre ligera. NO publicar cifras.
- **Humedad:** **sí aguanta**, mejor con acrílico. **NO recomendar en baños.**
- **Capacidad de producción:** **SIN TOPE.** NO publicar número de piezas/mes.
- **B2B:** precio preferencial desde 5 piezas. Factura con IVA SÍ. Correo: julian.ruiz.loza@gmail.com.

### PENDIENTES DE RESPUESTA DEL DUEÑO
- **¿Los precios de Atlas están bien?** 25×35 = **$2,800** y 40×55 = **$4,500**, SIN precio tachado.
- **¿Atlas lleva compare_at_price (precio tachado)?**
- ¿Hay proyecto B2B entregado que se pueda mostrar como caso?
- ¿Kit físico de muestras de color para despachos?
- Detalle fino de la garantía: ¿quién paga el retorno?
- Cómo se limpia/mantiene una pieza (dato aún no dado → no publicado).
- Esquema concreto de % de descuento por rango de volumen.
- **¿Tiene 3-5 fotos de clientes reales (rostro) con permiso?**
- **Foto real del empaque.**

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens, nunca text-white/bg-white.
- **Formato de dinero**: `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts`.
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.
- **Base URL imágenes subidas por el dueño**: `.../message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/<file>.webp`.
- **Galería PDP usa `aspect-[4/5]` + `object-contain`** → NO recorta.
- **Default variante PDP:** Prisma → 50x50; resto → 30x90; si ninguna aplica → primera disponible. **Deep-link talla:** `?talla=30x90`.
- **RUTA PDP CANÓNICA: `/products/:slug`**. NO existe `/productos/`.
- **NO existe ruta genérica `/collections/:handle`.** Cada colección con landing propia necesita su página en `src/pages/` + ruta en `App.tsx` + entrada en `COLLECTION_LINKS` de `EcommerceTemplate.tsx`.
- **NAV — `COLLECTION_LINKS` / `PRIMARY_LINKS` / `SECONDARY_LINKS`** son constantes al inicio de `EcommerceTemplate.tsx`. Las colecciones viven en un **submenú "Colecciones"** (DropdownMenu en desktop, acordeón con ChevronDown en móvil). Para agregar una colección nueva: **basta con meterla en `COLLECTION_LINKS`**.
- **BADGES:** lógica en `src/lib/product-badges.ts`. Solo `limited-edition` y `best-seller`. El badge `'new'` está **desactivado a propósito**.
- **RATING DE MARCA — fuente única:** `BRAND_RATING` y `BRAND_REVIEW_COUNT` en `src/data/product-reviews.ts` (4.8 / 196).
- **Prueba social bajo el CTA:** `src/components/SocialProofAvatars.tsx`. **Regla dura: NUNCA fotos de stock de personas.**
- **Métodos de pago en PDP:** `src/components/ProductPaymentMethods.tsx`.

### ⚠️ BUG CONOCIDO DEL TOOL `ecommerce--create-product` / `update-product` (2026-08-24)
`variants_config.variants[]` SOLO respeta las llaves `price` + los nombres de opción declarados.
Cualquier otra llave (`title`, `compare_at_price`, `image_urls`, `inventory_quantity`, `options`)
se mete DENTRO de `variant.options` y corrompe el `title` de la variante.
→ **Forma correcta:** `variants: [{ "Tamaño": "25 x 35 cm", "price": 2800 }]` y nada más.
→ **Consecuencia:** imagen por variante y compare_at por variante se hacen a mano desde el Dashboard.

---

## 3. Active Plan

# 🔴 PLAN ACTIVO — INSTRUMENTACIÓN DE EVENTOS DE CHECKOUT (2026-08-25)

## Lo que pidió el dueño
"¿Puedes checar que estemos enviando a PostHog los eventos de clic en pagar, pago fallido, método de pago, pago exitoso, etc. — los importantes para optimizar y ver si hay fallos?"

## AUDITORÍA — Estado real (verificado en PostHog, últimos 30 días)

Eventos que SÍ llegan a PostHog:
| Evento | Volumen 30d |
|---|---|
| `$pageview` | 6,371 |
| `viewcontent` | 3,105 |
| `addtocart` | 68 |
| `initiatecheckout` | 67 (41 móvil / 26 desktop) |
| `purchase` | 10 |
| `search_performed` | 0 (existe en código, nadie busca) |

**Embudo real:** viewcontent 3,105 → addtocart 68 (**2.2 %**) → initiatecheckout 67 (98.5 %) → purchase 10 (**14.9 %**).
**⇒ 57 personas al mes llegan al checkout y NO compran, y hoy tenemos CERO visibilidad de por qué.** Ese es el hueco crítico.

### ❌ Eventos que NO existen (confirmado leyendo el código)
`src/lib/tracking-utils.ts` solo expone `trackPageView / trackViewContent / trackAddToCart / trackInitiateCheckout / trackPurchase / trackSearch / trackCustomEvent`. NO hay nada de:
1. Clic en el botón "Pagar" (`handlePayment` en `StripePayment.tsx:342` no emite nada).
2. Pago fallido — hay **4 rutas de error distintas** y ninguna se registra:
   - `elements.submit()` error → línea 365-369
   - `stripe.confirmPayment()` `result.error` → línea 434-437
   - `catch` general / `handlePaymentError` → línea 532-559
   - Productos agotados (`handleUnavailableItems`) → línea ~330
3. Método de pago elegido (tarjeta / MSI / OXXO / SPEI / PayPal).
4. Pagos pendientes: OXXO (línea 496) y SPEI (línea 509) hacen `clearCart()` + `navigate('/pago-pendiente')` **sin emitir nada** → se ven idénticos a un abandono. Muy probable que parte de los "57 perdidos" en realidad sean OXXO/SPEI en camino.
5. Errores de validación del formulario de envío.
6. PayPal: `PaypalExpressButton.tsx` solo trackea el éxito, no el clic ni el error/cancelación.
7. Vista de carrito / apertura del drawer / eliminar del carrito.
8. Clics a WhatsApp (canal de venta paralelo, hoy invisible).
9. Faltan props de segmentación (`$device_type` está pero no `payment_method`, `is_msi`, `step`).

## OBJETIVO
Poder responder en PostHog: *¿cuánta gente da clic en Pagar? ¿cuántos fallan y con qué mensaje de error? ¿qué método eligen? ¿cuántos de los "perdidos" son en realidad OXXO/SPEI pendientes?*

---

## IMPLEMENTACIÓN

### PASO 1 — Ampliar `src/lib/tracking-utils.ts`
Agregar un helper **solo-PostHog** (NO mandar estos a Meta CAPI: son eventos de diagnóstico, ensucian el pixel y consumen cuota):

```ts
/** Evento de diagnóstico interno: SOLO PostHog, no Meta. */
trackInternal(eventName: string, props: Record<string, any> = {}): void {
  try {
    if (this.isPostHogLoaded()) {
      posthog.capture(eventName, {
        ...props,
        store_id: STORE_ID,
        path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });
    }
    this.log(`Internal: ${eventName}`, props);
  } catch (error) {
    this.logError(`Internal: ${eventName}`, error);
  }
}
```
Exportar `export const trackInternal = (n, p) => tracking.trackInternal(n, p)`.

**Convención de nombres** (snake_case, minúsculas, consistente con los existentes):
| Evento | Cuándo | Props obligatorias |
|---|---|---|
| `checkout_pay_clicked` | clic en Pagar, ANTES de cualquier validación | `payment_method`, `value`, `currency`, `num_items`, `order_id`, `is_msi` |
| `checkout_payment_failed` | cualquier fallo de pago | `failure_stage`, `error_code`, `error_message`, `payment_method`, `value`, `order_id` |
| `checkout_payment_pending` | OXXO / SPEI generado | `payment_method` (`oxxo`\|`spei`), `value`, `order_id` |
| `checkout_payment_method_selected` | cambia el método en el Payment Element | `payment_method`, `previous_method` |
| `checkout_validation_error` | falla la validación del form | `fields` (array), `step` |
| `checkout_items_unavailable` | productos agotados al pagar | `product_ids`, `order_id` |
| `cart_viewed` | abre carrito/drawer o entra a `/cart` | `value`, `num_items`, `source` (`drawer`\|`page`) |
| `cart_item_removed` | quita un producto | `product_id`, `value` |
| `whatsapp_clicked` | cualquier CTA de WhatsApp | `source` (`pdp`\|`floating`\|`personalizados`\|`proyectos`), `product_id?` |

`failure_stage` ∈ `elements_submit` \| `create_intent` \| `confirm_payment` \| `unexpected` \| `paypal`.
⚠️ **Nunca** meter en props: email, teléfono, dirección, ni datos de tarjeta. Solo IDs y códigos.

### PASO 2 — `src/components/StripePayment.tsx`
1. Al inicio de `handlePayment()` (línea ~342), **antes** del guard de `!stripe || !elements`:
   `trackInternal('checkout_pay_clicked', { payment_method: selectedPaymentMethod ?? 'unknown', value: (amountCents||0)/100, currency, num_items: paymentItems.length, order_id: orderId, is_msi: <si hay plan de meses> })`
2. `elements.submit()` error (línea 365) → `checkout_payment_failed` con `failure_stage: 'elements_submit'`, `error_message: submitError.message`, `error_code: submitError.code`.
3. `result.error` de `confirmPayment` (línea 434) → `checkout_payment_failed` con `failure_stage: 'confirm_payment'`, `error_code: result.error.code`, `decline_code: result.error.decline_code`, `error_type: result.error.type`. **Este es el evento más valioso de todo el plan** — nos dice si son tarjetas rechazadas, 3DS fallido o fondos insuficientes.
4. `handleUnavailableItems` (línea ~330) → `checkout_items_unavailable` con los product_ids.
5. Rama OXXO (línea ~496) → `checkout_payment_pending` con `payment_method:'oxxo'`.
6. Rama SPEI (línea ~509) → `checkout_payment_pending` con `payment_method:'spei'`.
7. Rama `processing` (línea ~526) → `checkout_payment_pending` con `payment_method:'processing'`.
8. Rama `else` estado desconocido (línea ~529) → `checkout_payment_failed` con `failure_stage:'unexpected'`, `error_message: pi?.status`.
9. `catch (err)` / `handlePaymentError` (línea 532) → `checkout_payment_failed` con `failure_stage:'unexpected'`. Cuidado: NO duplicar si ya se emitió arriba (usar un flag local `failureReported`).
10. Suscribirse al Payment Element de Stripe para saber qué método eligen:
    `paymentElement.on('change', (e) => { if (e.value?.type !== prev) trackInternal('checkout_payment_method_selected', { payment_method: e.value?.type, previous_method: prev }) })`.
    Guardar el último método en un `useRef` para reusarlo en `checkout_pay_clicked` y en los fallos.

### PASO 3 — `src/components/PaypalExpressButton.tsx`
- `onClick` del botón → `checkout_pay_clicked` con `payment_method: 'paypal'`.
- `onCancel` de PayPal → `checkout_payment_failed` con `failure_stage:'paypal'`, `error_code:'cancelled'`.
- `onError` → `checkout_payment_failed` con `failure_stage:'paypal'` + mensaje.
- Mantener intacto el `trackPurchase` existente y la guardia `purchase_tracked_${orderId}`.

### PASO 4 — `src/components/ProductExpressCheckout.tsx`
Mismo tratamiento: clic → `checkout_pay_clicked` con `payment_method:'express'`; errores → `checkout_payment_failed`.

### PASO 5 — Validación del formulario
En `src/adapters/CheckoutAdapter.tsx` / `useCheckoutState.ts`, donde se resuelve la validación que alimenta `onValidationRequired` (usado en `StripePayment.tsx:348`): cuando devuelva `false`, emitir `checkout_validation_error` con el array de campos que fallaron. Esto revela si la gente se atora en CP, teléfono o dirección.

### PASO 6 — Carrito y WhatsApp
- `src/components/CartSidebar.tsx` + `src/pages/Cart.tsx` → `cart_viewed` (una sola vez por apertura, con `useRef`) y `cart_item_removed`.
- `src/components/FloatingWhatsApp.tsx` y todos los `wa.me/525531215386` (PDP, `/personalizados`, `/proyectos`) → `whatsapp_clicked` con su `source`. Hoy este canal es 100 % invisible.

### PASO 7 — Anti-duplicados
Todos los eventos de un solo disparo por intento (`checkout_pay_clicked`) usan un `useRef` booleano que se resetea al terminar `handlePayment` (en el `finally`). Los de fallo NO se deduplican (queremos ver reintentos), pero sí llevan `attempt_number`.

## Archivos a modificar
- `src/lib/tracking-utils.ts` — agregar `trackInternal` + export.
- `src/components/StripePayment.tsx` — 10 puntos de instrumentación (ver Paso 2).
- `src/components/PaypalExpressButton.tsx` — clic, cancel, error.
- `src/components/ProductExpressCheckout.tsx` — clic + error.
- `src/adapters/CheckoutAdapter.tsx` (y/o `src/hooks/useCheckoutState.ts`) — `checkout_validation_error`.
- `src/components/CartSidebar.tsx`, `src/pages/Cart.tsx` — `cart_viewed`, `cart_item_removed`.
- `src/components/FloatingWhatsApp.tsx` + CTAs de WhatsApp — `whatsapp_clicked`.

## Verificación post-build
1. Abrir el preview, ir al checkout, dar clic en Pagar con una tarjeta de prueba rechazada (`4000000000000002`) → confirmar en PostHog Live Events que llegan `checkout_pay_clicked` y `checkout_payment_failed` con `error_code: 'card_declined'`.
2. Probar OXXO → confirmar `checkout_payment_pending`.
3. Confirmar que `purchase` sigue disparando UNA sola vez.
4. Confirmar que NINGUNO de los eventos nuevos llega a Meta (revisar Events Manager).

## Qué mediremos después (a los 14 días)
- Tasa `initiatecheckout → checkout_pay_clicked` = ¿se atoran ANTES de pagar (formulario) o AL pagar?
- Top 5 `error_code` de `checkout_payment_failed`.
- Qué % de los 57 "perdidos" son en realidad `checkout_payment_pending` (OXXO/SPEI).
- Split de `payment_method` y peso real de MSI.
Registrar el resultado en `.lovivo/cro-log.md`.

---

### 🔴 PENDIENTE INMEDIATO — ATLAS
1. **Asignar imagen por variante desde el Dashboard** (el tool no puede, ver bug arriba).
   - `atlas-astromelia`: 25x35 → `1787608310246-yonulit7mls.webp` · 40x55 → `1787608310247-pv6fcq8p5a.webp`
   - `atlas-caleta`: 25x35 → `...-qb9kaqtr7ti.webp` · 40x55 → `...-w7vehtt9jeq.webp`
   - `atlas-mediterraneo`: 25x35 → `...-vgmf7dq37vc.webp` · 40x55 → `...-bywbhrboiau.webp`
   - `atlas-secuoya`: 25x35 → `...-69bmg98aeun.webp` · 40x55 → `...-14f6kzx7tuif.webp`
2. **VERIFICAR EN PROD:** que `ProductFAQ`, `SizeGuide` y el badge "Edición Limitada" no hardcodeen medidas 50x50 / 30x90 que contradigan a Atlas.
3. **Reseñas:** los 4 slugs de Atlas NO tienen entrada en `product-reviews.ts` → PDP sin estrellas. Decisión consciente.
4. Considerar bundle "Díptico Atlas" (2 piezas 25×35) para subir AOV.

### 🟡 P2 PDP — PENDIENTE
- **P2.1 Referencia de escala visual** (SVG silueta sofá/persona). Objeción #1 sin resolver. Más urgente con Atlas (25 × 35 cm es chico).
- **P2.2 Macro del pliegue** en posición 2-3 de la galería de cada PDP.
- **P2.3 Foto real del empaque** (pendiente del dueño).

### 🟢 P3 — FRICCIÓN MENOR
- Selector de cantidad ocupa una fila entera; >95% compra 1.
- Badge "Edición Limitada" se dispara por `title.includes('luna')` — migrar a tag real.

### MEDICIÓN
Comparar en PostHog `viewcontent → addtocart` en `/products/*` móvil, 14 días antes vs después del 2026-08-19. Registrar en `.lovivo/cro-log.md`.
Atlas: medir aparte el split 25×35 vs 40×55 para validar precios.
**2026-08-24:** vigilar si el submenú "Colecciones" baja los clics a colecciones.

### SLUGS REALES EN DB (16 productos activos)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` ·
`luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` ·
`verde-salvia` (alias → `acorden-verde-salvia`) · `acorden-morado-blanco` ·
`acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil` ·
`atlas-astromelia` · `atlas-caleta` · `atlas-mediterraneo` · `atlas-secuoya` (sin reseñas aún)

### PayPal Express — referencia técnica
Ruta post-pago canónica: **`/gracias/:orderId`**. Flujo obligatorio en cualquier método de pago nuevo:
1. `localStorage.setItem('completed_order', ...)` → 2. `trackPurchase()` con guardia `purchase_tracked_${orderId}` → 3. `clearCart()` → 4. `navigate('/gracias/'+orderId)` → 5. toast.
Atribución: `captureAttribution()` / `getAttributionPayload()` en `src/lib/tracking-utils.ts`.

## 4. Recent Changes
- **2026-08-25** — 📋 **Auditoría de eventos de checkout en PostHog.** Verificado: solo llegan 5 eventos reales (`$pageview`, `viewcontent`, `addtocart`, `initiatecheckout`, `purchase`). NO existe ningún evento de clic en Pagar, pago fallido, método de pago, ni pagos pendientes OXXO/SPEI. Embudo: 3,105 vistas → 68 carrito (2.2%) → 67 checkout → 10 compras (14.9%). **57 abandonos/mes en checkout sin ninguna visibilidad.** Plan de instrumentación completo guardado arriba.
- **2026-08-24** — ✅ **Badge "Nuevo" eliminado + submenú "Colecciones".** Se borró la regla `'new'` de `product-badges.ts`. El nav se reorganizó: Acordeón, Espacio y Atlas cuelgan de un submenú "Colecciones". Se extrajeron `COLLECTION_LINKS`, `PRIMARY_LINKS` y `SECONDARY_LINKS` como constantes.
- **2026-08-24** — ✅ **LANZADA COLECCIÓN ATLAS.** Colección `atlas` + 4 productos, variantes 25×35 ($2,800) y 40×55 ($4,500), 8 fotos del dueño. Landing `/coleccion-atlas` (+ alias `/atlas`). Detectado el bug de `variants_config`.
- **2026-08-19** — ✅ Ejecutados P0 + P1 de la auditoría PDP (alias `verde-salvia`, fix `ArrowLeft`, canonical `/products/`, `BRAND_RATING`, `SocialProofAvatars`, `ProductPaymentMethods`, badge MSI, CTA WhatsApp, 2 FAQs nuevas).
- **2026-08-19** — 📋 Auditoría completa de PDP.
- **2026-08-18** — ✅ Atribución Meta + flujo `/gracias` en PayPal.
- **2026-08-18** — ✅ PayPal Express en checkout (`PaypalExpressButton.tsx`).
- **2026-08-17** — ✅ Ancla de precio B2B publicada en `/proyectos`.
- **2026-08-17** — ✅ Tanda 1+2 B2B en `/proyectos`.
- **2026-08-13** — 📋 Auditoría completa de `/proyectos`.
- **2026-08-13** — ✅ Landing B2B `/proyectos` construida (alias `/b2b`).
- **2026-08-05** — ✅ GIFT_IMAGE de `/personalizados` reemplazada por foto real.
- **2026-07-17** — ✅ Deep-link de talla en `HeadlessProduct.tsx`.
- **2026-07-10** — ✅ `/personalizados`: sticky CTA, ancla $3,500, FAQ, sección regalo.
- **2026-07-09** — ✅ `lead()` en `FacebookPixelService`; fixes StripePayment y galería.

## 5. Image Inventory
- **COLECCIÓN ATLAS** (base `message-images/4458f31d-.../`), subidas 2026-08-24, ~1004×1500:
  - Astromelia 25×35 `1787608310246-yonulit7mls.webp` · 40×55 `1787608310247-pv6fcq8p5a.webp`
  - Caleta 25×35 `1787608310247-qb9kaqtr7ti.webp` · 40×55 `1787608310247-w7vehtt9jeq.webp`
  - Mediterráneo 25×35 `1787608310247-vgmf7dq37vc.webp` · 40×55 `1787608310247-bywbhrboiau.webp`
  - Secuoya 25×35 `1787608310247-69bmg98aeun.webp` · 40×55 `1787608310247-14f6kzx7tuif.webp`
  - Hero de `/coleccion-atlas` = Astromelia 40×55 · Editorial = Mediterráneo 40×55
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique 16:9.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue. **Candidata a reutilizar en PDP (P2.2).**
- **Galería B2B `/proyectos`** (4:5): `1786658786579-ckqrb8e8t9o` · `...-6h8j8g0ewdc` · `...-7h75oomjxf` · `...-hqtofonof9o` · `1786659699632-3gh24xwrus4` · `...-nw9w0w6g6b`
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp`
- **Fotos de clientes con `photoUrl`** (5):
  `1783621985376-t2q2r43fz0h` Mónica A./Verde Salvia · `1779311693322-f14snp6bxfa` Valentina S./Prisma Onyx · `1779311693322-kcwn5zoehb` Sebastián M./Prisma Azul Coral · `1779311693322-4f7n3rqv0pj` Daniela R./Burdeos · `1779311693322-8vbqa3p7c55` Andrés V./Luna Negra
- Logo: /public/logo.svg · logo footer: `1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil, Luna Beige y las 4 de Atlas.

## 6. Known Issues
- **[CRÍTICO · 2026-08-25 · ANALÍTICA]** Cero visibilidad dentro del checkout. 57 abandonos/mes entre `initiatecheckout` y `purchase` sin poder distinguir fallo técnico, tarjeta rechazada, abandono voluntario o pago OXXO/SPEI en tránsito. Plan de instrumentación listo en la sección 3.
- **[SOSPECHA · 2026-08-25]** Los pagos OXXO y SPEI hacen `clearCart()` + redirect a `/pago-pendiente` sin emitir evento → hoy se contabilizan como abandono. La conversión real podría ser mejor que el 14.9 % que muestra PostHog.
- **[PENDIENTE VERIF · 2026-08-24 · NAV]** Confirmar en prod: el submenú "Colecciones" abre en desktop y el acordeón despliega en móvil; ningún producto muestra el badge "Nuevo".
- **[PENDIENTE VERIF · 2026-08-24 · ATLAS]** `/coleccion-atlas` carga los 4 productos; las PDP abren con `25 x 35 cm` preseleccionado.
- **[PENDIENTE · ATLAS]** Imagen por variante NO asignada (bug del tool). Hacerlo desde el Dashboard.
- **[PENDIENTE · ATLAS]** Las 4 PDP salen sin estrellas. Decisión consciente.
- **[PENDIENTE VERIF · 2026-08-19]** Confirmar en prod: estrellas en `/products/verde-salvia`, avatar strip, badge MSI, canonical `/products/`.
- **[PENDIENTE DUEÑO · GARANTÍA]** Falta definir quién paga el envío de retorno.
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod con carrito real end-to-end.
- **[PENDIENTE VERIF · ATRIBUCIÓN]** Confirmar en Events Manager que las órdenes PayPal lleguen con `fbp`/`fbc`/UTMs.
- **[OPORTUNIDAD]** `checkout-create` (flujo Stripe) todavía NO envía `attribution`.
- **[OPORTUNIDAD · 2026-08-25]** `addtocart` está en 2.2 % sobre `viewcontent` — bajísimo. Es el otro gran cuello de botella junto al checkout.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod (y `?talla=40x55` en Atlas).
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen de leads pero subir calidad.
- **[VIGILAR]** El submenú añade un clic para llegar a una colección.
- **[FRÁGIL]** Badge "Edición Limitada" depende de que el título contenga "luna"/"estrella".
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Ejecutar el plan de instrumentación de eventos de checkout (sección 3).
- **[ALTA]** Asignar imagen por variante de Atlas desde el Dashboard.
- **[ALTA]** Confirmar precios de Atlas con el dueño y decidir si lleva precio tachado.
- **[ALTA]** P2.1 referencia de escala visual — más urgente por el formato 25 × 35 cm de Atlas.
- **[ALTA]** Medir en PostHog el efecto de los cambios del 2026-08-19 y registrar en `cro-log.md`.
- **[ALTA]** Verificar PayPal end-to-end en prod incluyendo atribución.
- **[MEDIA]** Con los datos nuevos: encuesta exit-intent en el checkout para los que dan clic en Pagar y fallan.
- **[MEDIA]** Bundle "Díptico Atlas" (2 × 25×35) para subir AOV.
- **[MEDIA]** Meter Atlas en el home (`IndexUI.tsx`) y en `/all-products` como filtro de colección.
- **[MEDIA]** P2.2 macro del pliegue en la galería de cada producto.
- **[MEDIA]** Testimonio o caso B2B real.
- **[MEDIA]** Upgrade del avatar strip a retratos reales de clientes.
- **[MEDIA]** Enviar `attribution: getAttributionPayload()` también en `checkout-create` (Stripe).
- **[MEDIA]** Imágenes pendientes: taller, serie grande, empaque profesional, retrato del fundador.
- **[MEDIA]** One-pager PDF de proyectos · SEO `/proyectos` (Service/Organization JSON-LD, og tags, `Offer` lowPrice 3500).
- **[MEDIA]** Esquema concreto de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[BAJA]** P3: cantidad compacta, tag real de edición limitada.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.