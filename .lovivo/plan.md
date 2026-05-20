# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale

## 3. Active Plan
**COMPLETADO**: Reviews con foto en PDP — 5 productos con foto en primera review de "Lo que dicen de este cuadro".

## 4. Recent Changes
- **2026-05-20 Fotos reviews: Verde Salvia, Luna Azul, Blanco Puro + nuevas entradas Prisma Onyx Opal, Prisma Azul Coral** — `product-reviews-content.ts` actualizado. Verde Salvia (Mónica Aguilar id:17) → nueva foto. Luna Azul (Eduardo Silva id:1) → foto añadida. Blanco Puro (Victoria Núñez id:1) → foto añadida. Nuevas entradas `prisma-onyx-opal` (5 reviews, Valentina Solano con foto) y `prisma-azul-coral` (4 reviews, Sebastián Mora con foto).
- **2026-05-20 Reviews PDP con foto** — `photoUrl` añadido a interfaz `Review` en `product-reviews-content.ts`. Fotos asignadas a reseñas específicas: Verde Salvia (Mónica Aguilar id:17 → primer lugar), Luna Negra (Camila Vargas id:1), Burdeos Intenso (Adriana Ríos id:1). `ReviewCard` actualizado con foto full-width aspect-[4/3]. `sortedReviews` ordena fotos primero.
- **2026-05-20 Fotos de reviews reales** — `photoUrl` añadido en g4 (Verde Salvia) + 4 nuevas reseñas g9-g12 (Prisma Onyx Opal, Prisma Azul Coral, Burdeos Intenso, Luna Negra) en `plieggo-general-reviews.ts`
- **2026-05-20 Fix galería mobile solapamiento** — `rows` dinámico (hasta 7 en mobile vs hardcoded 5), `topBase` distribuido uniformemente, eliminado `% chaosPositions.length` — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería mobile COMPLETO** — Grid 320×250% (vs 280×380% desktop), cards 160px, máx 3 por fila, drag top:-150% left:-220% — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería: grid 280×380%, filas re-espaciadas, drag/mouse ampliados** — InteractiveGalleryModal.tsx
- **2026-05-20 Galería: degradado + cuadros 2x** — bg-transparent en Galeria.tsx e InteractiveGalleryModal para mostrar radial-gradient del body. Card width 120→240px desktop, 100→200px mobile.
- **2026-05-20 Galería fullscreen + fix hero slide 3** — Galeria.tsx sin template, X → /, clic en cuadro → PDP real, "Seguir comprando" regresa a /galeria, fix CTA "Descubre regalos" → /galeria
- **2026-05-20 Galería como ruta /galeria** — Nueva página standalone con header/footer, ruta en App.tsx, link en menú desktop+mobile, botón Index → Link a /galeria. Fix: solo 1ª imagen por variante en galería.
- **2026-05-20 Hero slide 2 → /all-products** — Slide 2 del hero carousel ahora usa imagen HERO_IMAGE de AllProducts, copy "Toda la colección / Encuentra tu pieza perfecta", CTA → /all-products
- **2026-05-20 Hero slide 1 + TopSellers hero** — Nueva imagen lifestyle (7 cuadros en pared cálida) reemplaza slide 1 del hero carousel en Index. Copy actualizado a "Arte hecho a mano que transforma tu espacio" + CTA → /top-sellers. TopSellers HERO_IMAGE y EDITORIAL_IMAGE también actualizadas.

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **Review photos PDP (product-reviews-content.ts)**:
  - Verde Salvia (Mónica Aguilar): `...1779313645107-25fm4pmckj4.webp` ✅ nuevo
  - Luna Negra (Camila Vargas): `...1779311693322-8vbqa3p7c55.webp`
  - Burdeos Intenso (Adriana Ríos): `...1779311693322-4f7n3rqv0pj.webp`
  - Luna Azul (Eduardo Silva): `...1779313645107-4vcyhpteg9.webp` ✅ nuevo
  - Blanco Puro (Victoria Núñez): `...1779313645107-gwkhzbohi7.webp` ✅ nuevo
  - Prisma Onyx Opal (Valentina Solano): `...1779313645107-b119dzv8c9i.webp` ✅ nuevo
  - Prisma Azul Coral (Sebastián Mora): `...1779313645107-8wspbgkbhm7.webp` ✅ nuevo
- **Review photos generales (plieggo-general-reviews.ts)**:
  - g4 Mónica A. (Verde Salvia): `...1779311693322-9f4ruvw5mpq.webp`
  - g9 Valentina S. (Prisma Onyx Opal): `...1779311693322-f14snp6bxfa.webp`
  - g10 Sebastián M. (Prisma Azul Coral): `...1779311693322-kcwn5zoehb.webp`
  - g11 Daniela R. (Burdeos Intenso): `...1779311693322-4f7n3rqv0pj.webp`
  - g12 Andrés V. (Luna Negra): `...1779311693322-8vbqa3p7c55.webp`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs `prisma-onyx-opal` y `prisma-azul-coral` en product-reviews-content.ts — verificar que coincidan con slugs reales en DB

## 7. Pending / Future Sessions
- **[ALTA]** Verificar que slugs `prisma-onyx-opal` y `prisma-azul-coral` coincidan con los handles reales en la DB
- **[ALTA]** Subir fotos reales para reseñas g1-g3, g5-g8 (Beige Sutil, Luna Beige) en sección general
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP (Rosa Sereno, Terracota, Luna Llena, etc.)
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip