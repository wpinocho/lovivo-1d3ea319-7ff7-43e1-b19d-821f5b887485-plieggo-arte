# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis (Hand, Layers, Sparkles, Truck, Clock, RotateCcw de lucide-react)
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.

## 3. Active Plan
**Homepage CRO Redesign — COMPLETADO (2026-05-19)**

Todos los 6 issues implementados:
1. ✅ Gift Ideas section → editorial banner con imagen black-dining.webp, heading "Arte que nunca falla como regalo", 3 bullets + 2 CTAs limpios
2. ✅ Products grid → `grid-cols-2` desde móvil (`gap-4 sm:gap-8`)
3. ✅ Hero → `h-[80dvh] md:h-[100dvh]` — contenido visible en fold
4. ✅ Trust strip → 4 iconos (Hand, Sparkles, Truck, RotateCcw) entre colecciones y productos
5. ✅ Collections desktop → `flex md:grid md:grid-cols-4` (carousel en móvil, grid en desktop)
6. ✅ InspirationCarousel flechas → `opacity-100 md:opacity-0 md:group-hover:opacity-100` (siempre visibles en móvil)

## 4. Recent Changes
- **2026-05-19 Homepage Redesign COMPLETO** — 6 cambios CRO en IndexUI.tsx, HeroCarousel.tsx, InspirationCarousel.tsx
- **2026-05-19 AUDIT Homepage** — 6 issues identificados, plan de rediseño completo
- **2026-05-19 CRO Round 6** — SizeGuide proporcional, doble sección reviews (específicas + Plieggo general), Arte vivo en craftsmanship
- **2026-05-19 AUDIT PDP Round 5** — 6 oportunidades identificadas
- **2026-05-19 CRO Round 4** — PDP móvil UX: "Seguir comprando" oculto en móvil, qty pill, CTAs reposicionados, trust strip debajo de CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections: all-products-hero.webp, top-sellers-hero.webp, acordeon-hero.webp, espacio-hero.webp
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Gift banner: black-dining.webp ✅ (en uso)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** WhatsApp link discreto cerca de CTAs (pa.me/ link)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip