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
- **❌ BADGES DE PAGO EN PDP PROHIBIDOS (2026-08-31).** Los de checkout (`CheckoutTrustBadges`) SÍ se quedan.
- **❌ REPETIR "ENVÍO GRATIS" EN LA PDP PROHIBIDO (2026-08-31).** Una sola vez, en las 3 bullets de beneficios.
- **✅ MSI SÍ SE ANUNCIA EN LA PDP (2026-08-31).** Línea sobria junto al precio. Piso: `MSI_MIN_PRICE = 1500` MXN.
- **✅ URLs EN ESPAÑOL (2026-10-12, petición del dueño):** Checkout = `/pagar`, post-pago = `/gracias/:orderId`, devoluciones = `/politica-de-devolucion`.

### POLÍTICA DE DEVOLUCIÓN — DEFINIDA POR EL DUEÑO (2026-10-13)
- **30 días a partir de que llega el producto.** Solo piezas NO personalizadas. Reembolso del total, sin costo.
- **Personalizados: NO hay devolución.**
- **El cliente lleva la pieza a nuestro almacén** (dirección se comparte por WhatsApp; NO publicada). ⚠️ Este dato vive **SOLO** en `/politica-de-devolucion`. **PROHIBIDO decir "lo recogemos" / "pasamos por la pieza" en cualquier lugar.**
- Copy en el resto del sitio: "30 días para enamorarte" + "Si no te convence, lo devuelves". Sin letra chica.
- Página `/politica-de-devolucion` (`src/pages/PoliticaDevolucion.tsx`): linkeada SOLO desde el footer (columna Navegación). No enlazar desde PDP/checkout salvo que el dueño lo pida.
- Condición suave agregada por el agente: "en buen estado y, si puedes, en su empaque original" (confirmar con dueño).

### FICHA TÉCNICA CONFIRMADA POR EL DUEÑO (2026-08-17)
- **Medidas:** desde **20 × 20 cm** hasta piezas de **más de 1 metro**. Las del sitio son las estándar.
- **Material:** opalina libre de ácidos hasta ~100 × 70 cm; **lino** en formatos mayores.
- **Marco:** madera, color y acabado a elegir. Con o sin acrílico.
- **Montaje:** **llega con soporte ya montado atrás.** Se cuelga directo.
- **Peso:** varía con la medida; siempre ligera. NO publicar cifras.
- **Humedad:** **sí aguanta**, mejor con acrílico. **NO recomendar en baños.**
- **Capacidad de producción:** **SIN TOPE.** NO publicar número de piezas/mes.
- **B2B:** precio preferencial desde 5 piezas. Factura con IVA SÍ. Correo: julian.ruiz.loza@gmail.com.
- "3–5 días de fabricación" y "libre de ácidos, dura décadas": ciertos, pero ya no se publican en la PDP.

### PENDIENTES DE RESPUESTA DEL DUEÑO
- **¿Precios de Atlas?** 25×35 = $2,800 y 40×55 = $4,500, SIN tachado.
- ¿Proyecto B2B entregado como caso? ¿Kit físico de muestras de color?
- ¿Dirección del almacén se publica en la política o solo por WhatsApp? ¿Plazo del reembolso?
- Cómo se limpia/mantiene una pieza. Esquema de % de descuento por volumen.
- 3-5 fotos de clientes reales con permiso. Foto real del empaque.

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
- **🛒 RUTA CHECKOUT CANÓNICA: `/pagar`** (desde 2026-10-12). `/checkout` sigue existiendo SOLO como redirect (`LegacyCheckoutRedirect` en `App.tsx`) que conserva `?token=`, UTMs y hash. **NUNCA borrar ese redirect.**
- **NO existe ruta genérica `/collections/:handle`.** Cada colección con landing propia necesita página + ruta + entrada en `COLLECTION_LINKS`.
- **NAV — `COLLECTION_LINKS` / `PRIMARY_LINKS` / `SECONDARY_LINKS`** al inicio de `EcommerceTemplate.tsx`. Footer (columna "Navegación") también en ese archivo.
- **BADGES:** `src/lib/product-badges.ts`. Solo `limited-edition` y `best-seller`.
- **RATING DE MARCA — fuente única:** `BRAND_RATING` / `BRAND_REVIEW_COUNT` en `src/data/product-reviews.ts` (4.8 / 196).
- **Prueba social bajo el CTA:** `src/components/SocialProofAvatars.tsx`. NUNCA fotos de stock de personas.

### 🧭 ORDEN CANÓNICO DE LA COLUMNA DERECHA DE LA PDP (fijado 2026-08-31)
1. Breadcrumb / título / rating / precio / línea MSI / promo badges
2. Resumen de 3 beneficios: Relieve real · Hecho a mano · Envío gratis
3. Acordeón "Más información sobre esta pieza" (solo descripción HTML)
4. Selector de variante + `SizeGuide` + link "¿Otra medida?"
5. Cantidad
6. CTAs (Agregar al carrito → Comprar ahora → express)
7. `SocialProofAvatars`
8. Trust strip de 2 items: Entrega 5–7 días · **30 días para enamorarte / "Si no te convence, lo devuelves"**
9. Link WhatsApp "¿Dudas antes de comprar?"

**Regla dura: NADA de contenido editorial largo entre el precio y el selector.** **Cero duplicidad.**

### 🎛️ SELECTOR DE VARIANTE (2026-08-31)
- Solo `<Label>`; prohibido repetir valor a la derecha. Chips `rounded-full h-10 px-4 text-sm`; activo `bg-foreground text-background`. Un solo valor → chip estático.

### 💳 LÍNEA MSI EN LA PDP (2026-08-31)
- Debajo del precio. `o {N} pagos de {monto} sin intereses` + `CreditCard` terracota. Condiciones: installments activo + MXN + `currentPrice >= 1500`.

### 📌 BARRA STICKY (2026-08-31)
- `showStickyBar = ctaSeen && !ctaInView`. Nunca solo `!ctaInView`.

### 📊 ANALÍTICA — CONVENCIÓN DE EVENTOS (2026-08-25)
1. **Marketing** (`trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`) → Pixel + CAPI + PostHog.
2. **Diagnóstico** (`trackInternal`) → SOLO PostHog.
- Catálogo: `INTERNAL_EVENTS` en `src/lib/tracking-utils.ts`. Jamás PII.
- OXXO/SPEI NO son `purchase` → `checkout_payment_pending`. `trackPurchase` solo con `succeeded`/`COMPLETED`, guardia `sessionStorage['purchase_tracked_<orderId>']`.
- Eventos: `checkout_pay_clicked`, `checkout_payment_failed`, `checkout_payment_pending`, `checkout_payment_method_selected`, `checkout_validation_error`, `checkout_items_unavailable`, `cart_viewed`, `cart_item_removed`, `whatsapp_clicked`.

### 🔑 REGLA DURA DE `event_id` (2026-08-31) — NO ROMPER
`generateEventId(eventName, dedupeKey?)`. El `event_id` identifica UNA INSTANCIA. VC/ATC/Search/custom → UUID. InitiateCheckout → `order_id` si existe. Purchase → `order_id`. NUNCA `product.id`/`slug`/`search_string`. Tests: `npx vitest run src/lib/__tests__/tracking-utils.test.ts`.

### ⚠️ BUG DEL TOOL `ecommerce--create/update-product` (2026-08-24)
`variants_config.variants[]` solo respeta `price` + nombres de opción. Imagen y compare_at por variante: a mano en Dashboard.

---

## 3. Active Plan

# 🟡 VERIFICACIÓN — /pagar + event_id + INSTRUMENTACIÓN + PDP

## Checklist `/pagar` (2026-10-12)
1. Drawer → "Pagar" → `/pagar`. 2. `/cart` → `/pagar`. 3. "Comprar ahora" PDP → `/pagar`.
4. `/checkout?token=XXX&utm_source=test` → `/pagar?token=XXX&utm_source=test` con carrito del token.
5. Actualizar funnels PostHog / conversiones Meta filtradas por URL `/checkout` → `/pagar`.

## 🔴 Checklist `event_id` (2026-08-31)
1. PostHog: `count(distinct event_id)` ≈ `count()` para VC/ATC/search. 2. `purchase` distinct = órdenes. 3. Meta: bajan duplicados. 4. Pixel y CAPI mismo id.

## Checklist PDP (2026-08-31)
- MSI visible en $3,900 y Atlas 25×35. Sticky invisible al abrir. Vigilar ATC/VC (baseline 2.2%).

## Checklist de instrumentación en prod
- Tarjeta `4000000000000002`, OXXO, validación vacía, drawer, WhatsApp flotante. Nada al pixel.

## Baseline (PostHog, 30 días al 2026-08-25)
`$pageview` 6,371 · `viewcontent` 3,105 · `addtocart` 68 (2.2 %) · `initiatecheckout` 67 · `purchase` 10.

## Cobertura pendiente de instrumentar
- `ProductExpressCheckout.tsx`, Apple/Google Pay, CTAs `wa.me` sueltos (incluye el nuevo de `/politica-de-devolucion`).

### 🔴 PENDIENTE — ATLAS
1. Imagen por variante desde Dashboard. 2. Verificar que `ProductFAQ`/`SizeGuide` no hardcodeen 50x50/30x90. 3. Sin reseñas → sin estrellas. 4. Bundle "Díptico Atlas".

### 🟡 P2 PDP
- Escala visual. Macro del pliegue. Foto real del empaque.

### SLUGS REALES EN DB (16)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` · `luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` · `verde-salvia` · `acorden-morado-blanco` · `acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil` · `atlas-astromelia` · `atlas-caleta` · `atlas-mediterraneo` · `atlas-secuoya`

### PayPal Express
Post-pago: `/gracias/:orderId`. `localStorage 'completed_order'` → `trackPurchase()` con guardia → `clearCart()` → navigate → toast.

## 4. Recent Changes
- **2026-10-13** — 📄 **Nueva página `/politica-de-devolucion`** (`src/pages/PoliticaDevolucion.tsx`, ruta en `App.tsx`, link solo en footer). 30 días desde la entrega, no personalizados, cliente lleva la pieza al almacén, reembolso total. Copy del sitio sin "lo recogemos": PDP trust strip → "Si no te convence, lo devuelves"; `ProductFAQ` → "la devuelves y te regresamos tu dinero completo" + aclaración de que personalizados no tienen devolución.
- **2026-10-12** — 🛒 Ruta de checkout `/checkout` → `/pagar` con redirect legacy.
- **2026-09-26** — 🧪 Tests vitest de `event_id`.
- **2026-08-31 (tanda 4)** — 🔴 Fix crítico de `event_id` en Meta.
- **2026-08-31 (tanda 3)** — PDP: selector limpio + MSI ($1,500).
- **2026-08-31 (tanda 2)** — PDP: densidad + fix sticky.
- **2026-08-31** — PDP simplificada.
- **2026-08-25** — Instrumentación de checkout (`trackInternal`).
- **2026-08-25** — Auditoría de eventos de checkout.
- **2026-08-24** — Badge "Nuevo" eliminado + submenú "Colecciones".
- **2026-08-24** — Lanzada colección Atlas.
- **2026-08-19** — P0 + P1 auditoría PDP.
- **2026-08-19** — Auditoría completa de PDP.
- **2026-08-18** — Atribución Meta + `/gracias` en PayPal.
- **2026-08-18** — PayPal Express en checkout.

## 5. Image Inventory
- **COLECCIÓN ATLAS** (base `message-images/4458f31d-.../`), ~1004×1500:
  - Astromelia 25×35 `1787608310246-yonulit7mls.webp` · 40×55 `1787608310247-pv6fcq8p5a.webp`
  - Caleta 25×35 `1787608310247-qb9kaqtr7ti.webp` · 40×55 `1787608310247-w7vehtt9jeq.webp`
  - Mediterráneo 25×35 `1787608310247-vgmf7dq37vc.webp` · 40×55 `1787608310247-bywbhrboiau.webp`
  - Secuoya 25×35 `1787608310247-69bmg98aeun.webp` · 40×55 `1787608310247-14f6kzx7tuif.webp`
  - Hero `/coleccion-atlas` = Astromelia 40×55 · Editorial = Mediterráneo 40×55
- **Hero home** slide 1: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home. **Hero `/proyectos`**: `1786658786579-tv4ym4zokz.webp`.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` (macro del pliegue).
- **Galería B2B** (4:5): `1786658786579-ckqrb8e8t9o` · `...-6h8j8g0ewdc` · `...-7h75oomjxf` · `...-hqtofonof9o` · `1786659699632-3gh24xwrus4` · `...-nw9w0w6g6b`
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp`
- **Fotos de clientes** (5): `1783621985376-t2q2r43fz0h` Mónica A. · `1779311693322-f14snp6bxfa` Valentina S. · `1779311693322-kcwn5zoehb` Sebastián M. · `1779311693322-4f7n3rqv0pj` Daniela R. · `1779311693322-8vbqa3p7c55` Andrés V.
- Logo: /public/logo.svg · footer: `1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`. Faltan reseñas con foto: Beige Sutil, Luna Beige, Atlas.

## 6. Known Issues
- **[VIGILAR · 2026-10-13 · DEVOLUCIONES]** Páginas de colección (`AllProducts`, `CollectionAcordeon`, `CollectionEspacio`, `TopSellers`, `IndexUI`) dicen "Devolución garantizada" / "Devoluciones sin preguntas" sin aclarar que no aplica a personalizados. No contradicen la política, pero si el dueño quiere uniformar a "30 días para enamorarte", tocar esos 5 archivos.
- **[PENDIENTE VERIF · 2026-10-12 · /pagar]** Ruta sin validar en prod.
- **[PENDIENTE VERIF · 2026-08-31 · META]** Fix `event_id` sin validar (VC/ATC en Meta van a SUBIR — corrección).
- **[PENDIENTE VERIF · 2026-08-31 · PDP]** Layout sin validar en móvil real.
- **[VIGILAR · 2026-08-31]** Sin señal OXXO/SPEI antes del checkout. PDP sin mención de material salvo descripción.
- **[HUERFANO]** `src/components/ProductPaymentMethods.tsx` sin uso.
- **[PENDIENTE VERIF · 2026-08-25]** Instrumentación de checkout.
- **[HUECO]** `ProductExpressCheckout.tsx`, Apple/Google Pay, `wa.me` sueltos sin instrumentar.
- **[PENDIENTE · ATLAS]** Imagen por variante; sin estrellas.
- **[PENDIENTE VERIF · PAYPAL]** End-to-end + atribución.
- **[OPORTUNIDAD]** `checkout-create` (Stripe) no envía `attribution`. `addtocart` 2.2 %.
- **[FRÁGIL]** Badge "Edición Limitada" depende del título.
- **NOTA:** `vitest` en `dependencies`. Import `CheckoutSecurityBanner` sin uso en CheckoutUI.
- Ruido: Failed to fetch / pay.google.com / price rules → extensiones.
- **⚠️ Envío gratis en lotes B2B 20+ piezas:** revisar rentabilidad.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Validar `/pagar` + redirect en prod. Verificar fix `event_id`. PDP en móvil real + instrumentación.
- **[MEDIA]** Uniformar copy de devolución en páginas de colección/home (ver Known Issues).
- **[MEDIA]** Traducir otras rutas: `/cart` → `/carrito`, `/about`, `/my-orders`, `/all-products`, `/top-sellers`, `/thank-you` (con redirect legacy). `/products/` solo con 301 y decisión del dueño.
- **[ALTA]** Instrumentar express checkout, Apple/Google Pay y CTAs WhatsApp sueltos.
- **[ALTA]** A los 14 días: leer datos → `cro-log.md`.
- **[ALTA]** Atlas: imagen por variante + precios. P2.1 escala visual. PayPal end-to-end.
- **[MEDIA]** Señal OXXO/SPEI en PDP · material en FAQ · encuesta pago fallido · Díptico Atlas · P2.2 macro · caso B2B · avatares reales · `attribution` Stripe · SEO `/proyectos` · descuento por volumen.
- **[BAJA]** P3 cantidad compacta, tag real edición limitada, comparativo, scroll-depth.