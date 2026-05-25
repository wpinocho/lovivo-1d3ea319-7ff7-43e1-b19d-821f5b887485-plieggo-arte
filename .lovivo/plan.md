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
**Estable — checkout funcional tras fixes**

## 4. Recent Changes
- **2026-05-25 ECE fix — separator oculto + sessions 400** — `link` removido de `buildElementsPaymentMethodTypes` (Stripe Link no disponible en MXN → causaba 400 en /v1/elements/sessions bloqueando Google/Apple Pay). `onReady` añadido al `ExpressCheckoutElement` para mostrar el separador "o" solo cuando hay botones disponibles.
- **2026-05-25 Checkout fix Stripe 400** — `customer_balance` (SPEI) removido de `buildElementsPaymentMethodTypes` para la init de Stripe Elements. Se mantiene en `buildPaymentMethodTypes` para el backend payload.
- **2026-05-25 Checkout fix variante raw** — `cleanVariantName()` añadida en CheckoutUI.tsx para parsear el formato `"30cm x 90cm / 6000 / ['url']"` y mostrar solo `"30cm x 90cm"` en el resumen del pedido.
- **2026-05-25 CrossSellSection precio corregido** — Ahora usa precio mínimo de variantes en lugar de `product.price` (base). También muestra precio tachado si hay compare_at_price.
- **2026-05-25 Precios Acordeón unificados** — Todas las variantes de los 8 acordeones activos actualizadas a $4,500 precio / $6,000 tachado.
- **2026-05-22 CheckoutAdapter.tsx reescrito con template corregido** — Eliminado state-resetter useEffect, simplificado validateCheckoutFields, shippingCoverageV2, passthrough backend.
- **2026-05-21 CheckoutAdapter shipping fix** — Pure passthrough: `country_name`/`state_name` → `country_code`/`state_code`.
- **2026-05-21 AboutPage rediseño editorial** — Split hero, visión invertida, 3 pilares tipográficos, sección proceso dark.
- **2026-05-21 PDP orden secciones** — Reviews → InspirationCarousel → FAQ → CrossSell.
- **2026-05-20 Review card photos aspect ratio** — `aspect-[3/4]` → `aspect-[4/5]`.
- **2026-05-20 Limpieza completa acorden-rosa-morado** — aliases en los 3 archivos data.
- **2026-05-20 Sección "Más experiencias" — cuadro actual excluido** — lógica de exclusión + priorización de colección.
- **2026-05-20 GeneralReviewCard rediseñado** — foto full-width aspect-[4/5].

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
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real). En producción debería aparecer en Chrome/Safari con tarjeta guardada.

## 7. Pending / Future Sessions
- **[ALTA]** Probar Google Pay / Apple Pay en producción (plieggo.com) en Chrome/Safari
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar que sus variantes tienen el precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip