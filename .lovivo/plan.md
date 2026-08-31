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
- **❌ BADGES DE PAGO EN PDP PROHIBIDOS (2026-08-31, decisión del dueño).** Visa/Mastercard/OXXO + "Pago cifrado" bajo el CTA: el dueño los considera ruido sin valor. Los de checkout (`CheckoutTrustBadges`) SÍ se quedan.
- **❌ REPETIR "ENVÍO GRATIS" EN LA PDP PROHIBIDO (2026-08-31).** El dato vive UNA sola vez, en las 3 bullets de beneficios arriba. Fuera del trust strip bajo el CTA.

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
- Datos "3–5 días de fabricación" y "libre de ácidos, dura décadas": siguen siendo ciertos, pero **ya no se publican en la PDP** (se quitaron por duplicidad 2026-08-31). Si se quieren recuperar, van en FAQ.

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
- **NAV — `COLLECTION_LINKS` / `PRIMARY_LINKS` / `SECONDARY_LINKS`** son constantes al inicio de `EcommerceTemplate.tsx`. Las colecciones viven en un **submenú "Colecciones"**. Para agregar una colección nueva: **basta con meterla en `COLLECTION_LINKS`**.
- **BADGES:** lógica en `src/lib/product-badges.ts`. Solo `limited-edition` y `best-seller`. El badge `'new'` está **desactivado a propósito**.
- **RATING DE MARCA — fuente única:** `BRAND_RATING` y `BRAND_REVIEW_COUNT` en `src/data/product-reviews.ts` (4.8 / 196).
- **Prueba social bajo el CTA:** `src/components/SocialProofAvatars.tsx`. **Regla dura: NUNCA fotos de stock de personas.**

### 🧭 ORDEN CANÓNICO DE LA COLUMNA DERECHA DE LA PDP (fijado 2026-08-31)
El dueño quiere la PDP **corta y clara antes de decidir**. Orden obligatorio en `ProductPageUI.tsx`:
1. Breadcrumb / título / rating / precio / MSI / promo badges — bloque compacto (`space-y-1.5`, h1 `text-2xl` en móvil)
2. **Resumen de 3 beneficios** (`<ul>` con iconos terracota): Relieve real · Hecho a mano · Envío gratis
3. **Acordeón "Más información sobre esta pieza"** (colapsado): **solo** la descripción larga HTML. Se renderiza únicamente si el producto tiene `description`.
4. Selector de variante + `SizeGuide` + link "¿Otra medida?"
5. Cantidad
6. CTAs (Agregar al carrito → Comprar ahora → express)
7. `SocialProofAvatars`
8. Trust strip de **2 items**: Entrega 5–7 días · 30 días para enamorarte
9. Link WhatsApp "¿Dudas antes de comprar?"

**Regla dura: NADA de contenido editorial largo entre el precio y el selector de variante.** Si hay que añadir información, va dentro del acordeón o en las secciones de abajo (reviews / inspiración / FAQ / cross-sell).
**Regla dura: cero duplicidad.** Un mismo dato (envío gratis, hecho a mano, materiales) aparece UNA sola vez en la columna derecha.

### 📌 BARRA STICKY DE ADD-TO-CART (fijado 2026-08-31)
Vive al final de `ProductPageUI.tsx`. Se controla con **dos** señales, no una:
- `ctaInView` (`useInView` sobre `ctaRef`, el contenedor de los CTAs reales)
- `ctaSeen` (state; se vuelve `true` la primera vez que `ctaInView` es `true`)
- **Visible solo si `showStickyBar = ctaSeen && !ctaInView`.**
⚠️ **Nunca volver a usar solo `!ctaInView`**: en móvil el CTA nace fuera del viewport, así que la barra aparecía desde el segundo cero, tapando la galería y quemando la urgencia.

### 📊 ANALÍTICA — CONVENCIÓN DE EVENTOS (establecida 2026-08-25)
Dos familias de eventos, NO mezclar:
1. **Eventos de marketing** (`trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`) → van a **Pixel + CAPI + PostHog**. Son los que alimentan el algoritmo de Meta.
2. **Eventos de diagnóstico** (`trackInternal`) → **SOLO PostHog**. Nunca a Meta: ensucian el pixel y consumen cuota de CAPI.

- Helper: `trackInternal(nombre, props)` en `src/lib/tracking-utils.ts`.
- **Catálogo de nombres: constante `INTERNAL_EVENTS`** en el mismo archivo. **Usar siempre la constante, nunca el string suelto.**
- **⚠️ REGLA DURA: jamás mandar PII en props** (email, teléfono, dirección, datos de tarjeta). Solo IDs internos, códigos de error y montos.
- **⚠️ REGLA DURA: OXXO y SPEI NO son `purchase`.** El dinero aún no entra. Emiten `checkout_payment_pending`. `trackPurchase` solo se dispara con `paymentIntent.status === 'succeeded'` (Stripe) o `COMPLETED` (PayPal), siempre con la guardia `sessionStorage['purchase_tracked_<orderId>']`.

| Evento | Cuándo | Props clave |
|---|---|---|
| `checkout_pay_clicked` | clic en Pagar, antes de validar | `payment_method`, `value`, `num_items`, `order_id`, `attempt_number` |
| `checkout_payment_failed` | cualquier fallo | `failure_stage`, `error_code`, `decline_code`, `error_message` |
| `checkout_payment_pending` | OXXO / SPEI / processing / 3DS | `payment_method` |
| `checkout_payment_method_selected` | cambia método en Payment Element | `payment_method`, `previous_method` |
| `checkout_validation_error` | falla validación del form | `fields[]`, `step` |
| `checkout_items_unavailable` | productos agotados al pagar | `product_ids[]` |
| `cart_viewed` | abre drawer o entra a `/cart` | `source` (`drawer`\|`page`) |
| `cart_item_removed` | quita un producto | `product_id`, `value` |
| `whatsapp_clicked` | CTA de WhatsApp | `source`, `page` |

`failure_stage` ∈ `stripe_not_ready` · `elements_submit` · `confirm_payment` · `unexpected_status` · `unexpected` · `paypal_capture` · `paypal_sdk` · `paypal_cancelled`.
Dedup de fallos: `failureReportedRef` en `StripePayment.tsx` — un fallo por intento, pero `attempt_number` sí sube para ver reintentos.

### ⚠️ BUG CONOCIDO DEL TOOL `ecommerce--create-product` / `update-product` (2026-08-24)
`variants_config.variants[]` SOLO respeta las llaves `price` + los nombres de opción declarados.
Cualquier otra llave (`title`, `compare_at_price`, `image_urls`, `inventory_quantity`, `options`)
se mete DENTRO de `variant.options` y corrompe el `title` de la variante.
→ **Forma correcta:** `variants: [{ "Tamaño": "25 x 35 cm", "price": 2800 }]` y nada más.
→ **Consecuencia:** imagen por variante y compare_at por variante se hacen a mano desde el Dashboard.

---

## 3. Active Plan

# 🟡 VERIFICACIÓN — INSTRUMENTACIÓN DE CHECKOUT + NUEVO LAYOUT DE PDP

Dos cosas desplegadas sin validar en prod: la instrumentación de checkout (2026-08-25) y el rediseño de la PDP (2026-08-31, dos tandas).

## Checklist PDP simplificada (2026-08-31, actualizado tras la tanda 2)
1. En móvil (375px): del precio al selector de variante no debe haber más que las 3 bullets + una línea de acordeón.
2. El acordeón "Más información sobre esta pieza" abre y muestra SOLO la descripción del producto (ya sin el bloque Hecho a mano / Papel de calidad / Arte vivo).
3. Verificar en productos con descripción larga (`verde-salvia`) y en Atlas (descripción más corta). Si algún producto no tiene descripción, el acordeón NO debe renderizarse.
4. Confirmar que ya NO aparecen los badges Visa/Mastercard/OXXO ni "Pago cifrado" bajo el CTA.
5. `SocialProofAvatars` sigue justo debajo del CTA.
6. **Trust strip ahora tiene 2 items** (Entrega 5–7 días · 30 días para enamorarte). "Envío gratis" ya no se repite ahí.
7. **Barra sticky:** al ABRIR la PDP no debe verse. Debe aparecer solo después de bajar más allá del botón "Agregar al carrito", y ocultarse otra vez al volver a subir hasta el CTA.
8. Verificar el primer pantallazo en 375px: se debe alcanzar a ver imagen + título + rating + precio sin scroll excesivo.
9. **Vigilar en PostHog:** `addtocart` sobre `viewcontent` (baseline 2.2%).

## Checklist de verificación de instrumentación en prod
1. Abrir el checkout y dar clic en Pagar con la tarjeta de prueba rechazada `4000000000000002`.
   → En PostHog Live Events deben aparecer `checkout_pay_clicked` y `checkout_payment_failed` con `failure_stage: 'confirm_payment'` y `error_code: 'card_declined'`.
2. Cambiar de tarjeta a OXXO en el Payment Element → debe llegar `checkout_payment_method_selected`.
3. Completar un OXXO → debe llegar `checkout_payment_pending` con `payment_method: 'oxxo'` y **NO** debe llegar `purchase`.
4. Intentar pagar con el formulario vacío → `checkout_validation_error` con el array `fields`.
5. Abrir el drawer del carrito → `cart_viewed` **una sola vez**; quitar un producto → `cart_item_removed`.
6. Clic en el botón flotante de WhatsApp → `whatsapp_clicked`.
7. **Meta Events Manager: confirmar que NINGUNO de los eventos nuevos llegó al pixel.**
8. Confirmar que un pago exitoso real dispara `purchase` **una sola vez**.

## Qué medir a los 14 días (≈ 2026-09-08)
- Tasa `initiatecheckout → checkout_pay_clicked`: ¿se atoran ANTES de pagar (formulario) o AL pagar (banco)?
- Top 5 `error_code` de `checkout_payment_failed`.
- Qué % de los 57 "perdidos" mensuales son en realidad `checkout_payment_pending` (OXXO/SPEI en tránsito).
- Split de `payment_method` y peso real de MSI.
- Campos más frecuentes en `checkout_validation_error`.
- Volumen de `whatsapp_clicked`.
- **Efecto de la barra sticky corregida sobre `addtocart`** (antes se mostraba siempre; ahora solo tras pasar el CTA).
Registrar el resultado en `.lovivo/cro-log.md`.

## Baseline ANTES de los cambios (PostHog, 30 días al 2026-08-25)
`$pageview` 6,371 · `viewcontent` 3,105 · `addtocart` 68 (2.2 %) · `initiatecheckout` 67 · `purchase` 10 (14.9 %).
`search_performed` 0 (existe en código, nadie busca).

## Cobertura pendiente de instrumentar (huecos conocidos)
- `src/components/ProductExpressCheckout.tsx` — el "Comprar ahora" de la PDP **no** emite `checkout_pay_clicked` ni fallos.
- `handleExpressCheckoutConfirm` dentro de `StripePayment.tsx` (Apple Pay / Google Pay) — sin instrumentar.
- CTAs de WhatsApp que son `<a href="wa.me/...">` sueltos en PDP, `/personalizados` y `/proyectos` — solo el `FloatingWhatsApp` está instrumentado.

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
- **2026-08-31 (tanda 2)** — ✅ **PDP: densidad + fix de barra sticky.** En `ProductPageUI.tsx`: (1) **eliminado el bloque duplicado "Hecho a mano / Papel de calidad / Arte vivo"** de dentro del acordeón (ya vivía arriba en las 3 bullets); el acordeón ahora solo muestra la descripción y **se oculta si el producto no tiene `description`**; (2) **padding reducido en el primer pantallazo**: gap del grid `gap-8 → gap-5` en móvil, title block `space-y-3 → space-y-1.5`, h1 móvil `text-3xl → text-2xl` con `leading-[1.15]`, bullets `py-3 → py-2.5`, dots del carrusel `mt-3 → mt-2.5`; (3) **fix real de la barra sticky**: se agregó el state `ctaSeen` — la barra ahora solo aparece con `ctaSeen && !ctaInView`, antes salía desde que cargaba la página porque en móvil el CTA nace fuera del viewport; (4) **quitado "Envío gratis / A todo México" del trust strip** bajo el CTA por duplicidad (queda en las 3 bullets). Import `Sparkles` eliminado.
- **2026-08-31** — ✅ **PDP SIMPLIFICADA (petición directa del dueño: "muy larga y confusa").** Resumen de 3 beneficios antes del selector, descripción larga movida a acordeón "Más información sobre esta pieza", y **eliminado `<ProductPaymentMethods />`** (badges Visa/Mastercard/OXXO + "Pago cifrado"). El componente `ProductPaymentMethods.tsx` sigue existiendo pero **ya no se usa en ningún lado**.
- **2026-08-25** — ✅ **INSTRUMENTACIÓN DE CHECKOUT IMPLEMENTADA.** Nuevo helper `trackInternal` + catálogo `INTERNAL_EVENTS` en `tracking-utils.ts` (solo PostHog, nunca Meta). `StripePayment.tsx`: clic en Pagar con `attempt_number`, 4 rutas de fallo con `error_code`/`decline_code`, OXXO/SPEI/processing/3DS como `checkout_payment_pending`, método elegido vía `onChange` del PaymentElement, productos agotados, y `purchase` ahora lleva el método real en vez de `'stripe'`. `PaypalExpressButton.tsx`: clic, cancelación y 2 tipos de error. `CheckoutAdapter.tsx`: `checkout_validation_error` con el array de campos exactos que faltan. `CartSidebar.tsx` + `Cart.tsx`: `cart_viewed` (dedup con `useRef`) y `cart_item_removed`. `FloatingWhatsApp.tsx`: `whatsapp_clicked` con prop `source`.
- **2026-08-25** — 📋 **Auditoría de eventos de checkout en PostHog.** Solo llegaban 5 eventos. Embudo: 3,105 vistas → 68 carrito (2.2%) → 67 checkout → 10 compras (14.9%). 57 abandonos/mes sin visibilidad.
- **2026-08-24** — ✅ **Badge "Nuevo" eliminado + submenú "Colecciones".** Se borró la regla `'new'` de `product-badges.ts`. Se extrajeron `COLLECTION_LINKS`, `PRIMARY_LINKS` y `SECONDARY_LINKS` como constantes.
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
- **[PENDIENTE VERIF · 2026-08-31 · PDP]** El layout nuevo (3 bullets + acordeón solo-descripción + trust strip de 2 items + sticky corregida + padding reducido) está desplegado sin validar en móvil real. Correr el checklist de 9 puntos de la sección 3.
- **[VIGILAR · 2026-08-31]** Al quitar `ProductPaymentMethods` de la PDP, **desaparece la única señal de que se puede pagar en OXXO/SPEI antes del checkout**. En México eso es una objeción real. Si `addtocart` o `initiatecheckout` bajan, considerar recuperar el dato como una línea de texto sobria o como FAQ (no como badges).
- **[VIGILAR · 2026-08-31]** Al quitar el bloque "Papel de calidad / libre de ácidos" del acordeón, la PDP ya no menciona el material en ningún lado visible salvo que el HTML de la descripción lo diga. Si aparecen preguntas de material por WhatsApp, meterlo en `ProductFAQ`.
- **[HUERFANO · 2026-08-31]** `src/components/ProductPaymentMethods.tsx` ya no se importa en ningún lado. Borrarlo si a los 30 días no se recupera.
- **[PENDIENTE VERIF · 2026-08-25 · ANALÍTICA]** La instrumentación de checkout está desplegada pero **sin validar en prod**.
- **[HUECO · 2026-08-25]** `ProductExpressCheckout.tsx` (el "Comprar ahora" de la PDP) y el express checkout de Apple/Google Pay dentro de `StripePayment.tsx` **no están instrumentados**.
- **[HUECO · 2026-08-25]** Los `<a href="wa.me/...">` sueltos de PDP, `/personalizados` y `/proyectos` no emiten `whatsapp_clicked`; solo el botón flotante.
- **[PENDIENTE VERIF · 2026-08-24 · NAV]** Confirmar en prod: el submenú "Colecciones" abre en desktop y el acordeón despliega en móvil; ningún producto muestra el badge "Nuevo".
- **[PENDIENTE VERIF · 2026-08-24 · ATLAS]** `/coleccion-atlas` carga los 4 productos; las PDP abren con `25 x 35 cm` preseleccionado.
- **[PENDIENTE · ATLAS]** Imagen por variante NO asignada (bug del tool). Hacerlo desde el Dashboard.
- **[PENDIENTE · ATLAS]** Las 4 PDP salen sin estrellas. Decisión consciente.
- **[PENDIENTE DUEÑO · GARANTÍA]** Falta definir quién paga el envío de retorno.
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod con carrito real end-to-end.
- **[PENDIENTE VERIF · ATRIBUCIÓN]** Confirmar en Events Manager que las órdenes PayPal lleguen con `fbp`/`fbc`/UTMs.
- **[OPORTUNIDAD]** `checkout-create` (flujo Stripe) todavía NO envía `attribution`.
- **[OPORTUNIDAD · 2026-08-25]** `addtocart` está en 2.2 % sobre `viewcontent` — bajísimo. Es el otro gran cuello de botella junto al checkout.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod (y `?talla=40x55` en Atlas).
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen de leads pero subir calidad.
- **[FRÁGIL]** Badge "Edición Limitada" depende de que el título contenga "luna"/"estrella".
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Verificar la PDP nueva en móvil real (sobre todo la barra sticky) + correr el checklist de instrumentación (sección 3).
- **[ALTA]** Instrumentar `ProductExpressCheckout.tsx` y el express checkout de Apple/Google Pay.
- **[ALTA]** Instrumentar los CTAs de WhatsApp sueltos (PDP, `/personalizados`, `/proyectos`).
- **[ALTA]** A los 14 días: leer los datos nuevos y registrar hallazgos en `cro-log.md`. Incluir el efecto de la PDP simplificada y del fix de sticky sobre `addtocart`.
- **[ALTA]** Asignar imagen por variante de Atlas desde el Dashboard.
- **[ALTA]** Confirmar precios de Atlas con el dueño y decidir si lleva precio tachado.
- **[ALTA]** P2.1 referencia de escala visual — más urgente por el formato 25 × 35 cm de Atlas.
- **[ALTA]** Verificar PayPal end-to-end en prod incluyendo atribución.
- **[MEDIA]** Decidir si se recupera la señal OXXO/SPEI en la PDP (ver Known Issues).
- **[MEDIA]** Meter el dato de material (opalina libre de ácidos) en `ProductFAQ` si empiezan a preguntarlo.
- **[MEDIA]** Con los datos nuevos: encuesta exit-intent para quienes dan clic en Pagar y fallan.
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