# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- **OJO B2B:** el tráfico de `/proyectos` NO es el mismo perfil. Interioristas/compradores corporativos entran más desde desktop y en horario laboral.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE:** medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Flujo por WhatsApp. ALTA DEMANDA.
  - Solo estilos de colecciones existentes (Luna, Acordeón, Acordeón Prisma). Color limitado a paleta del proveedor de opalina.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** **ENTREGA: 5–7 días hábiles** (piezas estándar).
- **Best-sellers reales: `verde-salvia` y `acorden-beige-sutil`.** **Rating: 4.8★ · 196 reseñas.**
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS. **PayPal Express integrado (2026-08-18).** **PRECIO MÍNIMO PERSONALIZADOS: $3,500 MXN.**
- **✅ ANCLA DE PRECIO B2B AUTORIZADA (2026-08-17):** "desde $3,500 MXN por pieza" en `/proyectos`. Constante `PRICE_FROM` en `Proyectos.tsx`.

### GARANTÍA — CONFIRMADA POR EL DUEÑO (2026-08-19)
- **30 días en piezas NO personalizadas.** Si no le gusta al cliente, la devuelve y se le reembolsa.
- **Instrucción explícita del dueño: NO escribir letra chica defensiva** tipo "*solo aplica a cuadros no personalizados". El copy debe ir en positivo.
- Solución adoptada: en la PDP la garantía se enuncia como **"30 días para enamorarte · Si no, lo recogemos y te devolvemos"**, y la FAQ cierra el caso de personalizados en positivo ("la aprobamos contigo ANTES de plegarla"). Las piezas a medida no se compran desde la PDP (van por WhatsApp), así que no hay contradicción.
- **Sigue pendiente del dueño:** ¿quién paga el envío de retorno? ¿reembolso o reposición? Hoy el copy promete reembolso y recolección.

### FICHA TÉCNICA CONFIRMADA POR EL DUEÑO (2026-08-17) — datos publicables
- **Medidas:** desde **20 × 20 cm** hasta piezas de **más de 1 metro**. Las del sitio son las estándar.
- **Material:** opalina libre de ácidos hasta ~100 × 70 cm; **lino** en formatos mayores.
- **Marco:** madera, color y acabado a elegir. Con o sin acrílico.
- **Montaje:** **llega con soporte ya montado atrás.** Se cuelga directo, sin instalador ni herrajes extra.
- **Peso:** varía con la medida; siempre ligera. NO publicar cifras.
- **Humedad:** **sí aguanta**, mejor con acrílico. **NO recomendar en baños.**
- **Capacidad de producción:** **SIN TOPE.** NO publicar un número de piezas/mes.
- **B2B:** precio preferencial desde 5 piezas (% caso por caso). Factura con IVA SÍ. Correo: julian.ruiz.loza@gmail.com.

### PENDIENTES DE RESPUESTA DEL DUEÑO
- ¿Hay proyecto B2B entregado que se pueda mostrar como caso?
- ¿Kit físico de muestras de color para despachos?
- Detalle fino de la garantía: ¿quién paga el retorno? ¿reembolso o reposición si llega dañada?
- Cómo se limpia/mantiene una pieza (dato aún no dado → no publicado).
- Esquema concreto de % de descuento por rango de volumen.
- **¿Tiene 3-5 fotos de clientes reales (rostro) con permiso?** → upgrade del avatar strip (opción B).
- **Foto real del empaque** → hoy el copy de empaque está descrito pero no ilustrado.

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
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`.
- **Default variante PDP:** Prisma → 50x50; resto → 30x90. **Deep-link talla:** `?talla=30x90`.
- **RUTA PDP CANÓNICA: `/products/:slug`**. NO existe `/productos/`.
- **RATING DE MARCA — fuente única:** `BRAND_RATING` y `BRAND_REVIEW_COUNT` en `src/data/product-reviews.ts` (4.8 / 196). Cualquier punto que hable del rating GLOBAL debe consumirlas. El rating por producto vive en `productReviews`.
- **Prueba social bajo el CTA:** `src/components/SocialProofAvatars.tsx`. **Regla dura: NUNCA fotos de stock de personas.** Fuente actual = fotos reales de clientes con su pieza colgada (`plieggoGeneralReviews` con `photoUrl`). Cambiar la fuente = editar la constante `AVATAR_SOURCE`, no la PDP.
- **Métodos de pago en PDP:** `src/components/ProductPaymentMethods.tsx` (chips de texto, no logotipos de terceros).

---

## 3. Active Plan — POST-EJECUCIÓN AUDITORÍA PDP (2026-08-19)

**P0 y P1 EJECUTADOS.** Lo que sigue es P2 + medición.

### 🟡 P2 — PENDIENTE: "¿DE QUÉ TAMAÑO SE VE REALMENTE?"
- **P2.1 Referencia de escala visual.** `SizeGuide` es solo texto. Añadir un SVG con silueta de sofá/persona a escala y las medidas en cm, en la galería o bajo el selector de talla. Es la causa #1 de no-compra y de devolución en arte de pared.
- **P2.2 Macro del pliegue en cada PDP.** El diferenciador es que es relieve real, no impresión. `/proyectos` ya lo resuelve con `1787007863112-8rzvvao3e74.webp`. Revisar producto por producto que la posición 2 o 3 de la galería sea una macro con luz rasante.
- **P2.3 Empaque.** ✅ Ya hay FAQ ("¿Cómo llega empacada? Es papel…"). Falta la FOTO real del empaque (pendiente del dueño).

### 🟢 P3 — FRICCIÓN MENOR
- Selector de cantidad ocupa una fila entera; >95% compra 1. Comprimir.
- Badge "Edición Limitada" se dispara por `title.includes('luna')` — migrar a tag real.

### MEDICIÓN (arrancar ahora)
Comparar en PostHog el ratio `viewcontent → addtocart` en `/products/*` móvil, **14 días antes vs 14 días después del 2026-08-19**. Registrar en `.lovivo/cro-log.md`.
Vigilar aparte: clics al ancla `#reviews` (avatar strip) y clics al WhatsApp de dudas.

### SLUGS REALES EN DB (verificado 2026-08-19, 12 productos activos)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` ·
`luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` ·
**`verde-salvia`** (alias → `acorden-verde-salvia`) · `acorden-morado-blanco` ·
`acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil`
Los 12 resuelven a datos de reseñas. Si el dueño crea un producto nuevo, **verificar que su slug tenga entrada en `product-reviews.ts` Y en `product-reviews-content.ts`**, o la PDP saldrá sin estrellas y sin sección de reseñas.

### `/proyectos` B2B — pendiente (bloqueado por datos o imágenes)
- Prueba social B2B real · Cara y nombre del fundador · One-pager PDF · Bloque comparativo · CTA "prefiero que me llamen".
- SEO: añadir `Service`/`Organization` JSON-LD, og tags y `Offer` con `lowPrice: 3500`.

### PayPal Express — referencia técnica (implementado 2026-08-18)
Ruta post-pago canónica: **`/gracias/:orderId`**. Flujo obligatorio en cualquier método de pago nuevo:
1. `localStorage.setItem('completed_order', ...)` → 2. `trackPurchase()` con guardia `purchase_tracked_${orderId}` → 3. `clearCart()` → 4. `navigate('/gracias/'+orderId)` → 5. toast.
Atribución: `captureAttribution()` / `getAttributionPayload()` en `src/lib/tracking-utils.ts`.

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-19** — ✅ **EJECUTADOS P0 + P1 DE LA AUDITORÍA PDP.** (a) Alias `verde-salvia` → `acorden-verde-salvia` en `product-reviews.ts` y `product-reviews-content.ts`: el best-seller ya muestra estrellas y su sección de reseñas. (b) `ArrowLeft` importado en `ProductPageUI.tsx` — se eliminó el ReferenceError en slugs inválidos. (c) Canonical y breadcrumb JSON-LD `/productos/` → `/products/`; breadcrumb "Productos" → `/all-products`. (d) Constantes `BRAND_RATING`/`BRAND_REVIEW_COUNT` (4.8/196) consumidas en `ProductReviews.tsx`, se acabó el "4.9 · +100" hardcodeado. (e) Nuevo `SocialProofAvatars.tsx` bajo los CTAs con fotos reales de clientes. (f) Nuevo `ProductPaymentMethods.tsx` (Visa/MC/Amex/PayPal/OXXO/SPEI + nota de pago cifrado). (g) MSI convertido de letra chica gris a badge terracota con "$750 al mes" en negrita. (h) CTA "¿Dudas antes de comprar?" por WhatsApp con el nombre de la pieza pre-llenado. (i) Dos FAQs nuevas: garantía de 30 días en positivo y cómo llega empacada.
- **2026-08-19** — 📋 Auditoría completa de PDP (código + screenshot móvil + 12 productos reales).
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
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `.../message-images/.../1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique 16:9.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue, luz rasante. **Candidata a reutilizar en PDP (P2.2).**
- **Galería B2B `/proyectos`** (4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel · `1786658786579-6h8j8g0ewdc.webp` — recepción, Luna
  - `1786658786579-7h75oomjxf.webp` — sala de juntas · `1786658786579-hqtofonof9o.webp` — restaurante nocturno
  - `1786659699632-3gh24xwrus4.webp` — elevadores · `1786659699632-nw9w0w6g6b.webp` — lounge residencial
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp` — Luna en sala/dining con olivo.
- **Fotos de clientes con `photoUrl`** (5) — **fuente en vivo del avatar strip**:
  - `1783621985376-t2q2r43fz0h.webp` — Mónica A. / Verde Salvia
  - `1779311693322-f14snp6bxfa.webp` — Valentina S. / Prisma Onyx
  - `1779311693322-kcwn5zoehb.webp` — Sebastián M. / Prisma Azul Coral
  - `1779311693322-4f7n3rqv0pj.webp` — Daniela R. / Burdeos
  - `1779311693322-8vbqa3p7c55.webp` — Andrés V. / Luna Negra
- **Referencia del patrón de trust strip (dueño, 2026-08-19)**: `.../1787161413399-ojozzfal57o.webp` — "Jason R. ✓ and +1,000 riders". Se copió la ESTRUCTURA, no el estilo oscuro.
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige.

## 6. Known Issues
- **[PENDIENTE VERIF · 2026-08-19]** Confirmar en prod tras el deploy: estrellas visibles en `/products/verde-salvia`, avatar strip renderizando las 3 fotos, badge MSI visible con MSI activo, canonical apuntando a `/products/`.
- **[PENDIENTE DUEÑO · GARANTÍA]** El copy ya promete recolección + reembolso a 30 días. Falta definir quién paga el envío de retorno.
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod con carrito real: botón visible, MXN aceptado, orden en `paid`, aterrizaje en `/gracias/:orderId`, carrito vacío, Purchase no duplicado.
- **[PENDIENTE VERIF · ATRIBUCIÓN]** Confirmar en Events Manager que las órdenes PayPal lleguen con `fbp`/`fbc`/UTMs.
- **[OPORTUNIDAD]** `checkout-create` (flujo Stripe) todavía NO envía `attribution`.
- **[PENDIENTE DUEÑO]** Caso B2B mostrable; kit de muestras; instrucciones de limpieza; % de descuento por volumen; fotos de clientes con rostro; foto del empaque.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen de leads pero subir calidad. Revisar en 2-3 semanas.
- **[FRÁGIL]** Badge "Edición Limitada" depende de que el título contenga "luna"/"estrella". Migrar a tag real.
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[ALTA]** Medir en PostHog el efecto de los cambios del 2026-08-19 (14 días) y registrar en `cro-log.md`.
- **[ALTA]** Verificar PayPal end-to-end en prod incluyendo atribución.
- **[ALTA]** P2.1 referencia de escala visual (SVG con sofá/persona) — la objeción #1 sin resolver.
- **[ALTA]** P2.2 macro del pliegue en la galería de cada producto.
- **[ALTA]** Testimonio o caso B2B real para sustituir el fallback de prueba social.
- **[MEDIA]** Upgrade del avatar strip a retratos reales de clientes (opción B) cuando el dueño los mande.
- **[MEDIA]** Enviar `attribution: getAttributionPayload()` también en `checkout-create` (Stripe).
- **[MEDIA]** Imágenes pendientes: taller, serie grande, **empaque profesional**, retrato del fundador.
- **[MEDIA]** One-pager PDF de proyectos.
- **[MEDIA]** SEO `/proyectos`: Service/Organization JSON-LD + og tags + `Offer` lowPrice 3500.
- **[MEDIA]** Esquema concreto de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA]** P3: cantidad compacta, tag real de edición limitada.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).