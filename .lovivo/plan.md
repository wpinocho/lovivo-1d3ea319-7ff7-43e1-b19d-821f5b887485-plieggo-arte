# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Precio Luna: por variantes (revisar en DB). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale
- Review photos: `aspect-[4/5]` (ReviewCard y GeneralReviewCard) — menos alto que 3/4
- AboutPage: editorial split-screen (no rounded corners, full-bleed images, pilares 3-col, dark proceso section)

## 3. Active Plan
**Estado:** 🔧 Pendiente — 2 fixes en ThankYou.tsx

### Fix 1 — Nombre de variante con URLs (ThankYou.tsx)
**Problema:** `item.variant_name` muestra el string crudo: `"30cm x 90cm / 6000 / ['url1', 'url2', ...]"`
**Fix:** Agregar `cleanVariantName()` helper (igual al de CheckoutUI.tsx) en ThankYou.tsx y aplicarlo en línea 207 donde se renderiza `{item.variant_name}`.

```ts
/** Strips raw variant name format "30cm x 90cm / 6000 / ['url1', ...]" → "30cm x 90cm" */
function cleanVariantName(raw: string | undefined | null): string {
  if (!raw) return '';
  return raw.split(' / ')[0].trim();
}
```

Aplicar en: `{cleanVariantName(item.variant_name)}`

### Fix 2 — Upsell desde colección "Más vendidos" (ThankYou.tsx)
**Problema:** La sección "Otras piezas que te podrían interesar" hace query directa a `products` (cualquier producto activo), en lugar de traer los de la colección `top-sellers`.
**Fix:** Reemplazar el `loadUpsell` para:
1. Buscar la colección con handle `'top-sellers'` en Supabase
2. Traer los `collection_products` de esa colección
3. Filtrar los que no son el producto comprado
4. Traer máx 4 de esos product_ids
5. Fallback: si no hay colección o <4 productos, completar con activos genéricos (opcional — mantener upsell vacío es más limpio)

```ts
const loadUpsell = async () => {
  try {
    const purchasedIds = order.order_items.map(item => item.product_id).filter(Boolean)

    // 1. Get top-sellers collection
    const { data: collection } = await supabase
      .from('collections')
      .select('id')
      .eq('handle', 'top-sellers')
      .eq('store_id', STORE_ID)
      .single()

    if (!collection) return

    // 2. Get product IDs from collection
    const { data: collectionProducts } = await supabase
      .from('collection_products')
      .select('product_id')
      .eq('collection_id', collection.id)

    if (!collectionProducts || collectionProducts.length === 0) return

    const collectionProductIds = collectionProducts
      .map(cp => cp.product_id)
      .filter(id => !purchasedIds.includes(id))

    if (collectionProductIds.length === 0) return

    // 3. Fetch up to 4 products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', STORE_ID)
      .eq('status', 'active')
      .in('id', collectionProductIds)
      .limit(4)

    if (!error && data) {
      setUpsellProducts(data)
    }
  } catch (e) {
    // Silent fail
  }
}
```

## 4. Recent Changes
- **2026-05-25** — ThankYou.tsx: 2 bugs identificados — variant_name con URLs + upsell genérico (pendiente fix)
- **2026-05-25** — App.tsx: agregadas rutas `/gracias` y `/gracias/:orderId` → ThankYou (fix 404 post-pago)
- **2026-05-25** — Bug confirmado: `/gracias/:orderId` no tenía ruta en App.tsx → 404 post-pago
- **2026-05-25** — `link` removido de `buildPaymentMethodTypes` en StripePayment.tsx. Payload ahora: `["card", "oxxo", "customer_balance"]` (sin link)
- **2026-05-25** — `cleanVariantName()` en CheckoutUI.tsx (desktop + mobile)
- **2026-05-25** — ECE `onReady` en StripePayment.tsx: `eceAvailable` state, separador "o" condicional
- **2026-05-25 Buy Now fix** — `useCheckout.ts` acepta `directItems?: any[]`
- **2026-05-25 Checkout restaurado (5 archivos)** — StripePayment.tsx, CheckoutUI.tsx, CheckoutAdapter.tsx, useCheckout.ts, checkout.ts
- **2026-05-25 ECE fix CORRECTO** — `link` devuelto a `buildElementsPaymentMethodTypes` (solo `customer_balance` excluido)
- **2026-05-25 Checkout fix Stripe 400** — `customer_balance` (SPEI) removido del init de Stripe Elements
- **2026-05-25 CrossSellSection precio corregido** — Precio mínimo de variantes en lugar de `product.price`
- **2026-05-25 Precios Acordeón unificados** — Todas las variantes a $4,500/$6,000
- **2026-05-22 CheckoutAdapter.tsx reescrito** — Eliminado state-resetter useEffect
- **2026-05-21 CheckoutAdapter shipping fix** — Pure passthrough: country_name/state_name → codes
- **2026-05-21 AboutPage rediseño editorial** — Split hero, pilares, sección proceso dark

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **About Studio 1**: `...1779325504866-5bg4llquutd.webp`
- **About Studio 2**: `...1779325504867-4wurhzmqhfg.webp`
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12)

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente

## 7. Pending / Future Sessions
- **[ALTA]** ThankYou.tsx: Fix variant_name con URLs (aplicar cleanVariantName)
- **[ALTA]** ThankYou.tsx: Fix upsell — usar colección top-sellers en vez de productos genéricos
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip