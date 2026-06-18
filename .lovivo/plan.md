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
- **PDP variant buttons**: `h-8 px-3 text-xs tracking-wide rounded-sm` — compactos, estilo editorial
- **Sticky bar**: una sola fila compacta, un solo botón terracota. Left: solo thumbnail. Botón: icono carrito + "Agregar al carrito" + precio actual + precio tachado. Fondo crema #F2EFE4/95
- **ProductCard CTA**: botón terracota sólido `w-full h-8 px-3 text-xs tracking-wide uppercase rounded-sm bg-[#C16648]` — full width, debajo de los precios
- **ProductCard price layout**: precio y precio tachado en la MISMA fila horizontal (`flex-row items-center gap-2`), botón en línea separada abajo ✅ APLICADO
- **FloatingWhatsApp**: solo en home (`/`) — eliminado de colecciones y demás páginas
- **Collection page layout**: Grid primero (h1 + badges) → Trust strip (dentro del mismo section) → Hero editorial → Reviews → Editorial split → CTA → Carousel ✅ APLICADO EN TODAS

## 3. Active Plan
**Estado:** ✅ COMPLETADO — Fix deduplicación Meta (2026-06-18)

## 4. Recent Changes
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico + sessionStorage guard en los 3 call sites de trackPurchase
- **2026-06-18** — ✅ CheckoutUI.tsx: línea "Descuento" en desktop para descuentos de link de pago (sin cupón)
- **2026-06-18** — 🔧 Diagnóstico: checkout token muestra total correcto ($8,100) pero falta línea "Descuento" — fix en CheckoutUI.tsx condición de descuento manual
- **2026-06-18** — 🔧 Diagnóstico: token checkout no muestra discount_amount porque res.order tapa el fallback
- **2026-06-18** — ✅ Fix checkout descuento manual: manualDiscountAmount en useCheckout + fallback cascada en CheckoutAdapter
- **2026-06-09** — PixelContext.tsx: fix fbc timestamp `Date.now()` → `Math.floor(Date.now() / 1000)` (milisegundos → segundos para Meta)
- **2026-06-03** — AllProducts.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — TopSellers.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — CollectionEspacio.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — EcommerceTemplate.tsx: FloatingWhatsApp solo en home (`/`) — quitado de colecciones y otras páginas
- **2026-06-03** — CollectionAcordeon.tsx: h1 ahora es "Colección Acordeón" (encabezado del grid), hero usa h2
- **2026-06-03** — ProductCardUI.tsx: layout precio+CTA → flex-col (precios en misma fila, botón full-width abajo)
- **2026-06-03** — CollectionAcordeon.tsx: padding reducido `py-14 md:py-20` → `py-8 md:py-12`, `mb-10` → `mb-5`
- **2026-06-03** — CollectionAcordeon.tsx: subtítulo genérico → 4 badges
- **2026-06-03** — ProductCardUI.tsx: "Ver más" → "Ver cuadro" (botón terracota sólido)

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- **CollectionAcordeon HERO_IMAGE**: `...1779296069343-1i4gabj0it4.webp`
- **CollectionAcordeon EDITORIAL_IMAGE**: `...1780499559157-3zjpthekjcj.webp`
- **AllProducts HERO_IMAGE**: `...1779296069343-2ifge8n87sv.webp`
- **CollectionEspacio HERO_IMAGE**: `...1779296069343-1ra0u85wh3j.webp`
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
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente

## 7. Pending / Future Sessions
- **[ALTA]** Performance móvil: 3 fixes pendientes (mover fuentes Google a HTML, lazy-load InspirationCarousel, fetchpriority en hero image)
- **[ALTA]** Fix clients-upsert: nombre/apellido/teléfono no llegan (CheckoutAdapter + CheckoutUI)
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Medir impacto en PostHog de los cambios del 2026-06-03
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip