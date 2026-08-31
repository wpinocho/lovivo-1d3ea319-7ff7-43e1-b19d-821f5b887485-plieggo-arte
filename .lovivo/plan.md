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
- Solo el `<Label>` con el nombre de la opción. **Prohibido repetir el valor seleccionado a la derecha del label** (era duplicidad con el chip activo).
- Chips: `rounded-full`, `h-10`, `px-4`, `text-sm`. Activo = `bg-foreground text-background`.
- **Si la opción tiene un solo valor** se renderiza como chip ESTÁTICO (`bg-muted/40`, sin `<button>`): es dato de ficha, no una elección.

### 💳 LÍNEA MSI EN LA PDP (fijado 2026-08-31)
- Va inmediatamente debajo del precio, dentro del bloque compacto.
- Copy: `o {N} pagos de {monto} sin intereses` con icono `CreditCard` terracota. Texto muted, monto en semibold.
- Condiciones: `paymentMethods.installments` activo + moneda MXN + `currentPrice >= MSI_MIN_PRICE` (constante al inicio de `ProductPageUI.tsx`, hoy **1500**).
- **Antes estaba en $4,500 y por eso NO se veía en piezas de $3,900.** No volver a subir el piso sin razón.

### 📌 BARRA STICKY DE ADD-TO-CART (fijado 2026-08-31)
Al final de `ProductPageUI.tsx`. Dos señales, no una:
- `ctaInView` (`useInView` sobre `ctaRef`) + `ctaSeen` (state, true la primera vez que `ctaInView`).
- **Visible solo si `showStickyBar = ctaSeen && !ctaInView`.**
⚠️ **Nunca volver a usar solo `!ctaInView`**: en móvil el CTA nace fuera del viewport y la barra salía desde el segundo cero.

### 📊 ANALÍTICA — CONVENCIÓN DE EVENTOS (establecida 2026-08-25)
1. **Marketing** (`trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`) → Pixel + CAPI + PostHog.
2. **Diagnóstico** (`trackInternal`) → **SOLO PostHog**. Nunca a Meta.

- Helper: `trackInternal(nombre, props)` en `src/lib/tracking-utils.ts`. Catálogo: constante `INTERNAL_EVENTS`. **Usar siempre la constante.**
- **⚠️ jamás mandar PII en props.** Solo IDs internos, códigos de error y montos.
- **⚠️ OXXO y SPEI NO son `purchase`.** Emiten `checkout_payment_pending`. `trackPurchase` solo con `succeeded` (Stripe) o `COMPLETED` (PayPal), con guardia `sessionStorage['purchase_tracked_<orderId>']`.

| Evento | Cuándo | Props clave |
|---|---|---|
| `checkout_pay_clicked` | clic en Pagar, antes de validar | `payment_method`, `value`, `num_items`, `order_id`, `attempt_number` |
| `checkout_payment_failed` | cualquier fallo | `failure_stage`, `error_code`, `decline_code`, `error_message` |
| `checkout_payment_pending` | OXXO / SPEI / processing / 3DS | `payment_method` |
| `checkout_payment_method_selected` | cambia método | `payment_method`, `previous_method` |
| `checkout_validation_error` | falla validación | `fields[]`, `step` |
| `checkout_items_unavailable` | productos agotados | `product_ids[]` |
| `cart_viewed` | abre drawer o `/cart` | `source` (`drawer`\|`page`) |
| `cart_item_removed` | quita producto | `product_id`, `value` |
| `whatsapp_clicked` | CTA de WhatsApp | `source`, `page` |

`failure_stage` ∈ `stripe_not_ready` · `elements_submit` · `confirm_payment` · `unexpected_status` · `unexpected` · `paypal_capture` · `paypal_sdk` · `paypal_cancelled`.
Dedup: `failureReportedRef` en `StripePayment.tsx`.

### 🔑 REGLA DURA DE `event_id` (fijada 2026-08-31) — NO ROMPER
`generateEventId(eventName, dedupeKey?)` en `src/lib/tracking-utils.ts`.
**El `event_id` identifica UNA INSTANCIA del evento, NO el objeto involucrado.**
Meta lo usa para deduplicar la copia del Pixel contra la de CAPI. Si dos instancias reales
comparten `event_id`, Meta tira una y se pierde medición y atribución.

| Evento | `dedupeKey` | Razón |
|---|---|---|
| `ViewContent` | **ninguno → UUID** | cada vista es única |
| `AddToCart` | **ninguno → UUID** | cada add es único |
| `Search` | **ninguno → UUID** | dos personas buscando lo mismo son 2 instancias |
| `InitiateCheckout` | `params.order_id` si existe, si no UUID | el checkout sí es una transacción |
| `Purchase` | `order_id` (**obligatorio**) | la orden sí es única e irrepetible |
| custom events | ninguno → UUID | |

- **🚫 NUNCA pasar `product.id`, `slug`, `search_string` ni nada derivado del catálogo como `dedupeKey`.**
- `randomId()` tiene fallback (`Date.now`+`Math.random`) para contextos sin `crypto.randomUUID`.
- **Síntoma del bug si reaparece:** en PostHog, `count()` alto y `count(distinct event_id)` = 1 para un mismo producto.
  Query de control: `SELECT properties.$current_url, count(), count(distinct properties.event_id) FROM events WHERE event='viewcontent' GROUP BY 1`.

### ⚠️ BUG CONOCIDO DEL TOOL `ecommerce--create-product` / `update-product` (2026-08-24)
`variants_config.variants[]` SOLO respeta `price` + los nombres de opción. Cualquier otra llave se mete DENTRO de `variant.options` y corrompe el `title`.
→ **Correcto:** `variants: [{ "Tamaño": "25 x 35 cm", "price": 2800 }]` y nada más.
→ Imagen por variante y compare_at por variante: a mano desde el Dashboard.

---

## 3. Active Plan

# 🟡 VERIFICACIÓN — event_id + INSTRUMENTACIÓN DE CHECKOUT + NUEVO LAYOUT DE PDP

## 🔴 Checklist `event_id` (2026-08-31) — verificar a las 24-48 h en prod
1. En PostHog, para `viewcontent` de un mismo producto: `count(distinct event_id)` debe crecer casi 1:1 con `count()`. Antes era **1**.
2. Igual para `addtocart` y `search_performed`.
3. `purchase`: `count(distinct event_id)` = número de órdenes distintas (ahí SÍ debe haber colisión si se reintenta la misma orden).
4. **Meta Events Manager → Overlapping/Deduplicated events:** debe caer el número de eventos descartados por duplicado.
5. Vigilar que el volumen reportado de ViewContent/AddToCart en Meta **SUBA** (antes se estaban tirando).
6. Confirmar que Pixel y CAPI siguen mandando el MISMO id por instancia (una vista = un id en ambas copias). En el log de consola: `CAPI: ViewContent {eventId}` debe coincidir con el del pixel.

## Checklist PDP (2026-08-31, tras la tanda 3)
1. En móvil (375px): del precio al selector no debe haber más que la línea MSI + 3 bullets + una línea de acordeón.
2. **Línea MSI visible en piezas de $3,900**. Verificar en `acorden-beige-sutil` y en Atlas 25×35 ($2,800).
3. Acordeón abre y muestra SOLO la descripción. Si no hay descripción, NO se renderiza.
4. **Selector de tamaño:** sin valor repetido a la derecha del label. Chips redondeados grandes. Producto de una sola medida = chip estático gris.
5. Confirmar que NO aparecen badges Visa/Mastercard/OXXO ni "Pago cifrado".
6. Trust strip de 2 items (sin "Envío gratis").
7. **Barra sticky:** invisible al abrir; aparece solo tras pasar el CTA.
8. **Vigilar en PostHog:** `addtocart` sobre `viewcontent` (baseline 2.2%).

## Checklist de instrumentación en prod
1. Pagar con `4000000000000002` → `checkout_pay_clicked` + `checkout_payment_failed` (`confirm_payment`, `card_declined`).
2. Cambiar a OXXO en el Payment Element → `checkout_payment_method_selected`.
3. Completar OXXO → `checkout_payment_pending` y **NO** `purchase`.
4. Formulario vacío → `checkout_validation_error` con `fields`.
5. Drawer del carrito → `cart_viewed` una sola vez; quitar producto → `cart_item_removed`.
6. Botón flotante WhatsApp → `whatsapp_clicked`.
7. **Meta Events Manager: ninguno de estos eventos debe llegar al pixel.**
8. Un pago exitoso real dispara `purchase` una sola vez.

## Qué medir a los 14 días (≈ 2026-09-08)
- `initiatecheckout → checkout_pay_clicked`: ¿se atoran en el formulario o en el banco?
- Top 5 `error_code`. % de los 57 "perdidos" que son `checkout_payment_pending`.
- Split de `payment_method` y peso real de MSI. Campos frecuentes en `checkout_validation_error`. Volumen de `whatsapp_clicked`.
- **Efecto sobre `addtocart`** de: sticky corregida, PDP simplificada y línea MSI recuperada.
- **Efecto del fix de `event_id`** sobre el volumen y el ROAS reportado por Meta.
Registrar en `.lovivo/cro-log.md`.

## Baseline ANTES de los cambios (PostHog, 30 días al 2026-08-25)
`$pageview` 6,371 · `viewcontent` 3,105 · `addtocart` 68 (2.2 %) · `initiatecheckout` 67 · `purchase` 10 (14.9 %). `search_performed` 0.

## Cobertura pendiente de instrumentar
- `src/components/ProductExpressCheckout.tsx` — "Comprar ahora" de la PDP sin eventos.
- `handleExpressCheckoutConfirm` en `StripePayment.tsx` (Apple/Google Pay).
- CTAs `<a href="wa.me/...">` sueltos en PDP, `/personalizados` y `/proyectos`.

---

### 🔴 PENDIENTE INMEDIATO — ATLAS
1. **Asignar imagen por variante desde el Dashboard** (bug del tool):
   - `atlas-astromelia`: 25x35 → `1787608310246-yonulit7mls.webp` · 40x55 → `1787608310247-pv6fcq8p5a.webp`
   - `atlas-caleta`: 25x35 → `...-qb9kaqtr7ti.webp` · 40x55 → `...-w7vehtt9jeq.webp`
   - `atlas-mediterraneo`: 25x35 → `...-vgmf7dq37vc.webp` · 40x55 → `...-bywbhrboiau.webp`
   - `atlas-secuoya`: 25x35 → `...-69bmg98aeun.webp` · 40x55 → `...-14f6kzx7tuif.webp`
2. **VERIFICAR EN PROD:** que `ProductFAQ`, `SizeGuide` y el badge "Edición Limitada" no hardcodeen 50x50 / 30x90 contra Atlas.
3. Los 4 slugs de Atlas no tienen reseñas → PDP sin estrellas. Decisión consciente.
4. Considerar bundle "Díptico Atlas" (2 piezas 25×35) para subir AOV.

### 🟡 P2 PDP — PENDIENTE
- **P2.1 Referencia de escala visual** (SVG silueta sofá/persona). Objeción #1 sin resolver. Más urgente con Atlas.
- **P2.2 Macro del pliegue** en posición 2-3 de la galería.
- **P2.3 Foto real del empaque** (pendiente del dueño).

### 🟢 P3 — FRICCIÓN MENOR
- Selector de cantidad ocupa una fila entera; >95% compra 1.
- Badge "Edición Limitada" se dispara por `title.includes('luna')` — migrar a tag real.

### SLUGS REALES EN DB (16 productos activos)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` ·
`luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` ·
`verde-salvia` (alias → `acorden-verde-salvia`) · `acorden-morado-blanco` ·
`acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil` ·
`atlas-astromelia` · `atlas-caleta` · `atlas-mediterraneo` · `atlas-secuoya`

### PayPal Express — referencia técnica
Ruta post-pago canónica: **`/gracias/:orderId`**. Flujo obligatorio en cualquier método nuevo:
1. `localStorage.setItem('completed_order', ...)` → 2. `trackPurchase()` con guardia `purchase_tracked_${orderId}` → 3. `clearCart()` → 4. `navigate('/gracias/'+orderId)` → 5. toast.
Atribución: `captureAttribution()` / `getAttributionPayload()` en `src/lib/tracking-utils.ts`.

## 4. Recent Changes
- **2026-08-31 (tanda 4)** — 🔴 **FIX CRÍTICO DE `event_id` EN META.** Diagnóstico externo confirmado en PostHog: `ViewContent` de Prisma Azul Coral tenía **1,209 eventos con UN SOLO `event_id`** (`viewcontent_<product_id>`); igual Beige Sutil (692), Verde Salvia (610), y los `AddToCart`. Meta estaba deduplicando y **tirando casi todas las instancias**. En `src/lib/tracking-utils.ts`: renombrado `stableId` → `dedupeKey`; **`ViewContent`, `AddToCart` y `Search` ya NO pasan clave** → UUID nuevo por instancia; `InitiateCheckout` solo usa `order_id` si existe (hoy no se le pasa → UUID por checkout); `Purchase` conserva `order_id`. Añadido `randomId()` con fallback para navegadores sin `crypto.randomUUID`. Documentada la regla dura en el docblock del método y en este plan.
- **2026-08-31 (tanda 3)** — ✅ **PDP: selector de tamaño limpio + MSI recuperado.** Eliminado el valor duplicado a la derecha del label; chips `rounded-full h-10 px-4 text-sm`; opción de un solo valor = chip estático gris; línea MSI sobria bajo el precio y piso bajado de $4,500 a `MSI_MIN_PRICE = 1500`.
- **2026-08-31 (tanda 2)** — ✅ **PDP: densidad + fix de barra sticky.** Acordeón solo con descripción, padding reducido, fix real de la sticky con `ctaSeen`, quitado "Envío gratis" del trust strip.
- **2026-08-31** — ✅ **PDP SIMPLIFICADA (petición del dueño: "muy larga y confusa").** 3 beneficios antes del selector, descripción a acordeón, eliminado `<ProductPaymentMethods />`.
- **2026-08-25** — ✅ **INSTRUMENTACIÓN DE CHECKOUT IMPLEMENTADA.** `trackInternal` + `INTERNAL_EVENTS`.
- **2026-08-25** — 📋 **Auditoría de eventos de checkout en PostHog.** 3,105 vistas → 68 carrito → 67 checkout → 10 compras.
- **2026-08-24** — ✅ **Badge "Nuevo" eliminado + submenú "Colecciones".**
- **2026-08-24** — ✅ **LANZADA COLECCIÓN ATLAS.** 4 productos, variantes 25×35 ($2,800) y 40×55 ($4,500), landing `/coleccion-atlas`.
- **2026-08-19** — ✅ P0 + P1 de la auditoría PDP.
- **2026-08-19** — 📋 Auditoría completa de PDP.
- **2026-08-18** — ✅ Atribución Meta + flujo `/gracias` en PayPal.
- **2026-08-18** — ✅ PayPal Express en checkout.
- **2026-08-17** — ✅ Ancla de precio B2B en `/proyectos`.
- **2026-08-13** — ✅ Landing B2B `/proyectos` (alias `/b2b`).
- **2026-08-05** — ✅ GIFT_IMAGE de `/personalizados` reemplazada por foto real.

## 5. Image Inventory
- **COLECCIÓN ATLAS** (base `message-images/4458f31d-.../`), 2026-08-24, ~1004×1500:
  - Astromelia 25×35 `1787608310246-yonulit7mls.webp` · 40×55 `1787608310247-pv6fcq8p5a.webp`
  - Caleta 25×35 `1787608310247-qb9kaqtr7ti.webp` · 40×55 `1787608310247-w7vehtt9jeq.webp`
  - Mediterráneo 25×35 `1787608310247-vgmf7dq37vc.webp` · 40×55 `1787608310247-bywbhrboiau.webp`
  - Secuoya 25×35 `1787608310247-69bmg98aeun.webp` · 40×55 `1787608310247-14f6kzx7tuif.webp`
  - Hero `/coleccion-atlas` = Astromelia 40×55 · Editorial = Mediterráneo 40×55
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique 16:9.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue. **Candidata para P2.2.**
- **Galería B2B `/proyectos`** (4:5): `1786658786579-ckqrb8e8t9o` · `...-6h8j8g0ewdc` · `...-7h75oomjxf` · `...-hqtofonof9o` · `1786659699632-3gh24xwrus4` · `...-nw9w0w6g6b`
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp`
- **Fotos de clientes con `photoUrl`** (5): `1783621985376-t2q2r43fz0h` Mónica A./Verde Salvia · `1779311693322-f14snp6bxfa` Valentina S./Prisma Onyx · `1779311693322-kcwn5zoehb` Sebastián M./Prisma Azul Coral · `1779311693322-4f7n3rqv0pj` Daniela R./Burdeos · `1779311693322-8vbqa3p7c55` Andrés V./Luna Negra
- Logo: /public/logo.svg · logo footer: `1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil, Luna Beige y las 4 de Atlas.

## 6. Known Issues
- **[PENDIENTE VERIF · 2026-08-31 · META]** Fix de `event_id` desplegado sin validar. Correr el checklist de 6 puntos de la sección 3 a las 24-48 h. **Ojo:** al dejar de tirar duplicados, el volumen de ViewContent/AddToCart en Meta va a SUBIR de golpe — no es un bug, es la corrección. El histórico previo al 2026-08-31 está subcontado y NO es comparable.
- **[PENDIENTE VERIF · 2026-08-31 · PDP]** Layout nuevo (3 bullets + acordeón + trust strip de 2 + sticky corregida + selector limpio + línea MSI) desplegado sin validar en móvil real.
- **[VIGILAR · 2026-08-31]** Al quitar `ProductPaymentMethods`, desaparece la señal de OXXO/SPEI antes del checkout. Si `addtocart` o `initiatecheckout` bajan, recuperar el dato como texto sobrio o FAQ (no badges).
- **[VIGILAR · 2026-08-31]** La PDP ya no menciona el material salvo en el HTML de la descripción. Si preguntan por WhatsApp, meterlo en `ProductFAQ`.
- **[HUERFANO · 2026-08-31]** `src/components/ProductPaymentMethods.tsx` sin importar en ningún lado. Borrar si a los 30 días no se recupera.
- **[PENDIENTE VERIF · 2026-08-25 · ANALÍTICA]** Instrumentación de checkout desplegada sin validar en prod.
- **[HUECO · 2026-08-25]** `ProductExpressCheckout.tsx` y el express de Apple/Google Pay sin instrumentar.
- **[HUECO · 2026-08-25]** Los `<a href="wa.me/...">` sueltos no emiten `whatsapp_clicked`.
- **[PENDIENTE VERIF · 2026-08-24 · NAV]** Submenú "Colecciones" en desktop y móvil; ningún producto con badge "Nuevo".
- **[PENDIENTE VERIF · 2026-08-24 · ATLAS]** `/coleccion-atlas` carga los 4 productos; PDP abre con `25 x 35 cm`.
- **[PENDIENTE · ATLAS]** Imagen por variante NO asignada (bug del tool).
- **[PENDIENTE · ATLAS]** Las 4 PDP salen sin estrellas.
- **[PENDIENTE DUEÑO · GARANTÍA]** Falta definir quién paga el envío de retorno.
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod end-to-end.
- **[PENDIENTE VERIF · ATRIBUCIÓN]** Confirmar `fbp`/`fbc`/UTMs en órdenes PayPal.
- **[OPORTUNIDAD]** `checkout-create` (Stripe) todavía NO envía `attribution`.
- **[OPORTUNIDAD · 2026-08-25]** `addtocart` en 2.2 % sobre `viewcontent` — bajísimo.
- **[PENDIENTE VERIF]** Validar que `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Deep-link `?talla=30x90` (y `?talla=40x55` en Atlas).
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen pero subir calidad de leads.
- **[FRÁGIL]** Badge "Edición Limitada" depende de que el título contenga "luna"/"estrella".
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Verificar en PostHog + Meta Events Manager que el fix de `event_id` funcionó (checklist de 6 puntos).
- **[CRÍTICA]** Verificar la PDP nueva en móvil real (sticky + selector + línea MSI) y correr el checklist de instrumentación.
- **[ALTA]** Instrumentar `ProductExpressCheckout.tsx` y el express de Apple/Google Pay.
- **[ALTA]** Instrumentar los CTAs de WhatsApp sueltos.
- **[ALTA]** A los 14 días: leer datos y registrar hallazgos en `cro-log.md`.
- **[ALTA]** Asignar imagen por variante de Atlas desde el Dashboard.
- **[ALTA]** Confirmar precios de Atlas y si lleva precio tachado.
- **[ALTA]** P2.1 referencia de escala visual — urgente por el formato 25 × 35 cm.
- **[ALTA]** Verificar PayPal end-to-end en prod incluyendo atribución.
- **[MEDIA]** Decidir si se recupera la señal OXXO/SPEI en la PDP.
- **[MEDIA]** Meter el material (opalina libre de ácidos) en `ProductFAQ` si lo preguntan.
- **[MEDIA]** Encuesta exit-intent para quienes dan clic en Pagar y fallan.
- **[MEDIA]** Bundle "Díptico Atlas" (2 × 25×35) para subir AOV.
- **[MEDIA]** Meter Atlas en el home y en `/all-products` como filtro.
- **[MEDIA]** P2.2 macro del pliegue en la galería.
- **[MEDIA]** Testimonio o caso B2B real.
- **[MEDIA]** Upgrade del avatar strip a retratos reales.
- **[MEDIA]** Enviar `attribution` también en `checkout-create` (Stripe).
- **[MEDIA]** Imágenes pendientes: taller, serie grande, empaque profesional, retrato del fundador.
- **[MEDIA]** One-pager PDF de proyectos · SEO `/proyectos`.
- **[MEDIA]** Esquema de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[BAJA]** P3: cantidad compacta, tag real de edición limitada.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.