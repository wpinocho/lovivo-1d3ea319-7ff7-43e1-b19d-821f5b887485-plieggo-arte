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
- **❌ BADGE "NUEVO" PROHIBIDO (2026-08-24, decisión del dueño).** Solo `best-seller` y `limited-edition`.
- **❌ BADGES DE PAGO EN PDP PROHIBIDOS (2026-08-31).** Visa/Mastercard/OXXO + "Pago cifrado" bajo el CTA: ruido sin valor. Los de checkout (`CheckoutTrustBadges`) SÍ se quedan.
- **❌ REPETIR "ENVÍO GRATIS" EN LA PDP PROHIBIDO (2026-08-31).** El dato vive UNA sola vez, en las 3 bullets de beneficios arriba.
- **✅ MSI SÍ SE ANUNCIA EN LA PDP (2026-08-31).** Como línea de texto sobria junto al precio, NO como badge/caja de color. Piso: `MSI_MIN_PRICE = 1500` MXN.
- **✅ URLs EN ESPAÑOL (2026-10-12, petición del dueño):** el dueño quiere todo en español. Checkout = `/pagar`, post-pago = `/gracias/:orderId`.

### GARANTÍA — CONFIRMADA POR EL DUEÑO (2026-08-19)
- **30 días en piezas NO personalizadas.** Si no le gusta al cliente, la devuelve y se le reembolsa.
- **Instrucción explícita: NO escribir letra chica defensiva.** Copy en positivo: **"30 días para enamorarte · Si no, lo recogemos y te devolvemos"**.
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
- Datos "3–5 días de fabricación" y "libre de ácidos, dura décadas": ciertos, pero **ya no se publican en la PDP** (quitados 2026-08-31). Si se recuperan, van en FAQ.

### PENDIENTES DE RESPUESTA DEL DUEÑO
- **¿Los precios de Atlas están bien?** 25×35 = **$2,800** y 40×55 = **$4,500**, SIN precio tachado. ¿Lleva compare_at_price?
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
- **🛒 RUTA CHECKOUT CANÓNICA: `/pagar`** (desde 2026-10-12). `/checkout` sigue existiendo SOLO como redirect (`LegacyCheckoutRedirect` en `App.tsx`) que conserva `?token=`, UTMs y hash — lo usan correos de carrito abandonado / links de la plataforma. **NUNCA borrar ese redirect.** Toda navegación nueva → `navigate('/pagar')`.
- **NO existe ruta genérica `/collections/:handle`.** Cada colección con landing propia necesita página en `src/pages/` + ruta en `App.tsx` + entrada en `COLLECTION_LINKS`.
- **NAV — `COLLECTION_LINKS` / `PRIMARY_LINKS` / `SECONDARY_LINKS`** son constantes al inicio de `EcommerceTemplate.tsx`. Colecciones viven en submenú "Colecciones".
- **BADGES:** lógica en `src/lib/product-badges.ts`. Solo `limited-edition` y `best-seller`. `'new'` desactivado a propósito.
- **RATING DE MARCA — fuente única:** `BRAND_RATING` y `BRAND_REVIEW_COUNT` en `src/data/product-reviews.ts` (4.8 / 196).
- **Prueba social bajo el CTA:** `src/components/SocialProofAvatars.tsx`. **Regla dura: NUNCA fotos de stock de personas.**

### 🧭 ORDEN CANÓNICO DE LA COLUMNA DERECHA DE LA PDP (fijado 2026-08-31)
1. Breadcrumb / título / rating / precio / **línea MSI** / promo badges — bloque compacto (`space-y-1.5`, h1 `text-2xl` en móvil)
2. **Resumen de 3 beneficios** (`<ul>` iconos terracota): Relieve real · Hecho a mano · Envío gratis
3. **Acordeón "Más información sobre esta pieza"** (colapsado): **solo** la descripción larga HTML. Se renderiza únicamente si hay `description`.
4. Selector de variante + `SizeGuide` + link "¿Otra medida?"
5. Cantidad
6. CTAs (Agregar al carrito → Comprar ahora → express)
7. `SocialProofAvatars`
8. Trust strip de **2 items**: Entrega 5–7 días · 30 días para enamorarte
9. Link WhatsApp "¿Dudas antes de comprar?"

**Regla dura: NADA de contenido editorial largo entre el precio y el selector de variante.**
**Regla dura: cero duplicidad.** Un mismo dato aparece UNA sola vez en la columna derecha.

### 🎛️ SELECTOR DE VARIANTE — REGLAS (fijado 2026-08-31)
- Solo el `<Label>` con el nombre de la opción. **Prohibido repetir el valor seleccionado a la derecha del label**.
- Chips: `rounded-full`, `h-10`, `px-4`, `text-sm`. Activo = `bg-foreground text-background`.
- **Si la opción tiene un solo valor** se renderiza como chip ESTÁTICO (`bg-muted/40`, sin `<button>`).

### 💳 LÍNEA MSI EN LA PDP (fijado 2026-08-31)
- Va inmediatamente debajo del precio, dentro del bloque compacto.
- Copy: `o {N} pagos de {monto} sin intereses` con icono `CreditCard` terracota.
- Condiciones: `paymentMethods.installments` activo + MXN + `currentPrice >= MSI_MIN_PRICE` (hoy **1500**).

### 📌 BARRA STICKY DE ADD-TO-CART (fijado 2026-08-31)
- Visible solo si `showStickyBar = ctaSeen && !ctaInView`. ⚠️ Nunca volver a usar solo `!ctaInView`.

### 📊 ANALÍTICA — CONVENCIÓN DE EVENTOS (establecida 2026-08-25)
1. **Marketing** (`trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`) → Pixel + CAPI + PostHog.
2. **Diagnóstico** (`trackInternal`) → **SOLO PostHog**. Nunca a Meta.

- Helper: `trackInternal(nombre, props)` en `src/lib/tracking-utils.ts`. Catálogo: constante `INTERNAL_EVENTS`.
- **⚠️ jamás mandar PII en props.**
- **⚠️ OXXO y SPEI NO son `purchase`.** Emiten `checkout_payment_pending`. `trackPurchase` solo con `succeeded` (Stripe) o `COMPLETED` (PayPal), con guardia `sessionStorage['purchase_tracked_<orderId>']`.

| Evento | Cuándo | Props clave |
|---|---|---|
| `checkout_pay_clicked` | clic en Pagar | `payment_method`, `value`, `num_items`, `order_id`, `attempt_number` |
| `checkout_payment_failed` | cualquier fallo | `failure_stage`, `error_code`, `decline_code`, `error_message` |
| `checkout_payment_pending` | OXXO / SPEI / processing / 3DS | `payment_method` |
| `checkout_payment_method_selected` | cambia método | `payment_method`, `previous_method` |
| `checkout_validation_error` | falla validación | `fields[]`, `step` |
| `checkout_items_unavailable` | productos agotados | `product_ids[]` |
| `cart_viewed` | abre drawer o `/cart` | `source` |
| `cart_item_removed` | quita producto | `product_id`, `value` |
| `whatsapp_clicked` | CTA de WhatsApp | `source`, `page` |

### 🔑 REGLA DURA DE `event_id` (fijada 2026-08-31) — NO ROMPER
`generateEventId(eventName, dedupeKey?)` en `src/lib/tracking-utils.ts`. **El `event_id` identifica UNA INSTANCIA del evento, NO el objeto.**
| Evento | `dedupeKey` |
|---|---|
| `ViewContent` / `AddToCart` / `Search` / custom | ninguno → UUID |
| `InitiateCheckout` | `params.order_id` si existe, si no UUID |
| `Purchase` | `order_id` (obligatorio) |
- **🚫 NUNCA pasar `product.id`, `slug`, `search_string` como `dedupeKey`.**
- Tests: `npx vitest run src/lib/__tests__/tracking-utils.test.ts`.

### ⚠️ BUG CONOCIDO DEL TOOL `ecommerce--create-product` / `update-product` (2026-08-24)
`variants_config.variants[]` SOLO respeta `price` + los nombres de opción. → `variants: [{ "Tamaño": "25 x 35 cm", "price": 2800 }]` y nada más. Imagen y compare_at por variante: a mano desde el Dashboard.

---

## 3. Active Plan

# 🟡 VERIFICACIÓN — /pagar + event_id + INSTRUMENTACIÓN + PDP

## Checklist `/pagar` (2026-10-12)
1. Drawer del carrito → "Pagar" lleva a `/pagar`.
2. `/cart` → botón de checkout lleva a `/pagar`.
3. "Comprar ahora" de la PDP (HeadlessProduct) → `/pagar`.
4. Abrir `/checkout?token=XXX&utm_source=test` → debe terminar en `/pagar?token=XXX&utm_source=test` y cargar el carrito del token.
5. Si hay funnels de PostHog o conversiones personalizadas de Meta filtradas por URL que contenga `/checkout`, actualizarlas a `/pagar` (los eventos `initiatecheckout`, etc. NO cambian de nombre).

## 🔴 Checklist `event_id` (2026-08-31) — verificar en prod
1. PostHog: `count(distinct event_id)` ≈ `count()` para `viewcontent`, `addtocart`, `search_performed`.
2. `purchase`: `count(distinct event_id)` = número de órdenes.
3. Meta Events Manager: bajan los descartados por duplicado; sube el volumen de VC/ATC.
4. Pixel y CAPI mandan el MISMO id por instancia.

## Checklist PDP (2026-08-31)
- Línea MSI visible en piezas de $3,900 y Atlas 25×35. Sticky invisible al abrir. Selector limpio. Trust strip de 2. Sin badges de pago.
- Vigilar `addtocart` / `viewcontent` (baseline 2.2%).

## Checklist de instrumentación en prod
- Tarjeta `4000000000000002` → `checkout_pay_clicked` + `checkout_payment_failed`. OXXO → `checkout_payment_pending` y NO `purchase`. Validación vacía → `checkout_validation_error`. Drawer → `cart_viewed`. WhatsApp flotante → `whatsapp_clicked`. Nada de esto llega al pixel.

## Baseline ANTES de los cambios (PostHog, 30 días al 2026-08-25)
`$pageview` 6,371 · `viewcontent` 3,105 · `addtocart` 68 (2.2 %) · `initiatecheckout` 67 · `purchase` 10 (14.9 %).

## Cobertura pendiente de instrumentar
- `ProductExpressCheckout.tsx`, `handleExpressCheckoutConfirm` (Apple/Google Pay), CTAs `wa.me` sueltos.

### 🔴 PENDIENTE INMEDIATO — ATLAS
1. Asignar imagen por variante desde el Dashboard (ver Image Inventory).
2. Verificar que `ProductFAQ`, `SizeGuide` y badge no hardcodeen 50x50 / 30x90 contra Atlas.
3. Atlas sin reseñas → PDP sin estrellas (decisión consciente).
4. Considerar bundle "Díptico Atlas".

### 🟡 P2 PDP — PENDIENTE
- P2.1 Referencia de escala visual. P2.2 Macro del pliegue en galería. P2.3 Foto real del empaque.

### 🟢 P3
- Selector de cantidad compacto. Badge "Edición Limitada" por tag real.

### SLUGS REALES EN DB (16 productos activos)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` ·
`luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` ·
`verde-salvia` (alias → `acorden-verde-salvia`) · `acorden-morado-blanco` ·
`acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil` ·
`atlas-astromelia` · `atlas-caleta` · `atlas-mediterraneo` · `atlas-secuoya`

### PayPal Express — referencia técnica
Ruta post-pago canónica: **`/gracias/:orderId`**. Flujo: `localStorage 'completed_order'` → `trackPurchase()` con guardia → `clearCart()` → `navigate('/gracias/'+orderId)` → toast.

## 4. Recent Changes
- **2026-10-12** — 🛒 **Ruta de checkout renombrada `/checkout` → `/pagar`** (petición del dueño: todo en español). Cambiado `App.tsx` (nueva ruta `/pagar` + `LegacyCheckoutRedirect` en `/checkout` que conserva search/hash), `CartAdapter.tsx`, `CartSidebar.tsx`, `headless/HeadlessProduct.tsx`. Stripe `return_url` ya apuntaba a `/gracias/` → sin cambios.
- **2026-09-26** — 🧪 Auditoría de `event_id` + tests vitest (`src/lib/__tests__/tracking-utils.test.ts`, casos A–H). Sin cambios en producción.
- **2026-08-31 (tanda 4)** — 🔴 FIX CRÍTICO DE `event_id` EN META (VC/ATC/Search → UUID por instancia).
- **2026-08-31 (tanda 3)** — ✅ PDP: selector de tamaño limpio + MSI recuperado ($1,500).
- **2026-08-31 (tanda 2)** — ✅ PDP: densidad + fix de barra sticky.
- **2026-08-31** — ✅ PDP simplificada.
- **2026-08-25** — ✅ Instrumentación de checkout (`trackInternal`).
- **2026-08-25** — 📋 Auditoría de eventos de checkout en PostHog.
- **2026-08-24** — ✅ Badge "Nuevo" eliminado + submenú "Colecciones".
- **2026-08-24** — ✅ Lanzada colección Atlas.
- **2026-08-19** — ✅ P0 + P1 de la auditoría PDP.
- **2026-08-19** — 📋 Auditoría completa de PDP.
- **2026-08-18** — ✅ Atribución Meta + flujo `/gracias` en PayPal.
- **2026-08-18** — ✅ PayPal Express en checkout.
- **2026-08-17** — ✅ Ancla de precio B2B en `/proyectos`.

## 5. Image Inventory
- **COLECCIÓN ATLAS** (base `message-images/4458f31d-.../`), 2026-08-24, ~1004×1500:
  - Astromelia 25×35 `1787608310246-yonulit7mls.webp` · 40×55 `1787608310247-pv6fcq8p5a.webp`
  - Caleta 25×35 `1787608310247-qb9kaqtr7ti.webp` · 40×55 `1787608310247-w7vehtt9jeq.webp`
  - Mediterráneo 25×35 `1787608310247-vgmf7dq37vc.webp` · 40×55 `1787608310247-bywbhrboiau.webp`
  - Secuoya 25×35 `1787608310247-69bmg98aeun.webp` · 40×55 `1787608310247-14f6kzx7tuif.webp`
  - Hero `/coleccion-atlas` = Astromelia 40×55 · Editorial = Mediterráneo 40×55
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `1786658786579-tv4ym4zokz.webp`.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue. Candidata para P2.2.
- **Galería B2B `/proyectos`** (4:5): `1786658786579-ckqrb8e8t9o` · `...-6h8j8g0ewdc` · `...-7h75oomjxf` · `...-hqtofonof9o` · `1786659699632-3gh24xwrus4` · `...-nw9w0w6g6b`
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp`
- **Fotos de clientes con `photoUrl`** (5): `1783621985376-t2q2r43fz0h` Mónica A. · `1779311693322-f14snp6bxfa` Valentina S. · `1779311693322-kcwn5zoehb` Sebastián M. · `1779311693322-4f7n3rqv0pj` Daniela R. · `1779311693322-8vbqa3p7c55` Andrés V.
- Logo: /public/logo.svg · logo footer: `1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil, Luna Beige y las 4 de Atlas.

## 6. Known Issues
- **[PENDIENTE VERIF · 2026-10-12 · /pagar]** Ruta nueva sin validar en prod. Correr checklist de 5 puntos (sección 3). Funnels/conversiones por URL `/checkout` en PostHog/Meta deben actualizarse a `/pagar`; el histórico anterior queda bajo `/checkout`.
- **[PENDIENTE VERIF · 2026-08-31 · META]** Fix de `event_id` sin validar. El volumen de VC/ATC en Meta va a SUBIR — es la corrección, no un bug.
- **[PENDIENTE VERIF · 2026-08-31 · PDP]** Layout nuevo sin validar en móvil real.
- **[VIGILAR · 2026-08-31]** Sin `ProductPaymentMethods` no hay señal OXXO/SPEI antes del checkout.
- **[VIGILAR · 2026-08-31]** La PDP ya no menciona el material salvo en la descripción.
- **[HUERFANO · 2026-08-31]** `src/components/ProductPaymentMethods.tsx` sin uso.
- **[PENDIENTE VERIF · 2026-08-25]** Instrumentación de checkout sin validar en prod.
- **[HUECO · 2026-08-25]** `ProductExpressCheckout.tsx`, Apple/Google Pay y `wa.me` sueltos sin instrumentar.
- **[PENDIENTE · ATLAS]** Imagen por variante NO asignada; PDPs sin estrellas.
- **[PENDIENTE DUEÑO · GARANTÍA]** Quién paga el envío de retorno.
- **[PENDIENTE VERIF · PAYPAL]** End-to-end en prod + atribución.
- **[OPORTUNIDAD]** `checkout-create` (Stripe) no envía `attribution`.
- **[OPORTUNIDAD · 2026-08-25]** `addtocart` en 2.2 %.
- **[FRÁGIL]** Badge "Edición Limitada" depende del título.
- **NOTA:** `vitest` quedó en `dependencies` (no dev). Import `CheckoutSecurityBanner` sin uso en CheckoutUI.
- **Failed to fetch / manifest pay.google.com / price rules**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad 20+ piezas.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Validar `/pagar` + redirect `/checkout?token=` en prod.
- **[CRÍTICA]** Verificar fix de `event_id` en PostHog + Meta Events Manager.
- **[CRÍTICA]** Verificar PDP nueva en móvil real + checklist de instrumentación.
- **[MEDIA]** Considerar traducir otras rutas en inglés: `/cart` → `/carrito`, `/products/:slug` → `/productos/:slug`, `/my-orders`, `/about`, `/all-products`, `/top-sellers`, `/thank-you` (siempre con redirect legacy). **`/products/` impacta SEO y anuncios → solo con redirect 301 y decisión del dueño.**
- **[ALTA]** Instrumentar `ProductExpressCheckout.tsx`, Apple/Google Pay y CTAs WhatsApp sueltos.
- **[ALTA]** A los 14 días: leer datos y registrar en `cro-log.md`.
- **[ALTA]** Atlas: imagen por variante + confirmar precios/tachado.
- **[ALTA]** P2.1 referencia de escala visual.
- **[ALTA]** PayPal end-to-end en prod con atribución.
- **[MEDIA]** Señal OXXO/SPEI en PDP · material en `ProductFAQ` · encuesta exit-intent en pago fallido · bundle "Díptico Atlas" · Atlas en home/filtros · P2.2 macro · caso B2B · avatares reales · `attribution` en Stripe · imágenes pendientes · one-pager/SEO `/proyectos` · descuento por volumen · más meses MSI.
- **[BAJA]** P3 cantidad compacta, tag real edición limitada, bloque comparativo, scroll-depth.