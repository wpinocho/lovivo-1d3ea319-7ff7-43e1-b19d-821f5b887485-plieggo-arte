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
**COMPLETADO**: Fix de slugs en archivos de reviews. `prisma-azul-coral` → `acordeon-prisma-azul-coral` en ambos archivos. Añadido `acordeon-prisma-beige-blanco` a product-reviews.ts.

## 4. Recent Changes
- **2026-05-20 Fix slug acordeon-prisma-azul-coral** — `prisma-azul-coral` → `acordeon-prisma-azul-coral` en `product-reviews-content.ts`. Añadida entrada `acordeon-prisma-azul-coral` (4.8★, 4 reviews) y `acordeon-prisma-beige-blanco` (0 reviews) en `product-reviews.ts`.
- **2026-05-20 Fix slug Prisma Onyx Opal** — `prisma-onyx-opal` → `acorden-prisma-onyx-opal` en `product-reviews-content.ts` y `product-reviews.ts`. Nueva foto de review (imagen del cliente con cuadro negro en empaque) asignada a Valentina Solano.
- **2026-05-20 Foto review acorden-rosa-morado (Mariana León)** — `photoUrl` añadido a primera review de `acorden-rosa-morado` en `product-reviews-content.ts`. URL: `...1779315294467-25x3snw8x7r.webp`
- **2026-05-20 Fotos reviews: Verde Salvia, Luna Azul, Blanco Puro + nuevas entradas Prisma Onyx Opal, Prisma Azul Coral** — `product-reviews-content.ts` actualizado. Verde Salvia (Mónica Aguilar id:17) → nueva foto. Luna Azul (Eduardo Silva id:1) → foto añadida. Blanco Puro (Victoria Núñez id:1) → foto añadida. Nuevas entradas `acorden-prisma-onyx-opal` (5 reviews, Valentina Solano con foto) y `acordeon-prisma-azul-coral` (4 reviews, Sebastián Mora con foto).
- **2026-05-20 Reviews PDP con foto** — `photoUrl` añadido a interfaz `Review` en `product-reviews-content.ts`. Fotos asignadas a reseñas específicas: Verde Salvia (Mónica Aguilar id:17 → primer lugar), Luna Negra (Camila Vargas id:1), Burdeos Intenso (Adriana Ríos id:1). `ReviewCard` actualizado con foto full-width aspect-[4/3]. `sortedReviews` ordena fotos primero.
- **2026-05-20 Fotos de reviews reales** — `photoUrl` añadido en g4 (Verde Salvia) + 4 nuevas reseñas g9-g12 (Prisma Onyx Opal, Prisma Azul Coral, Burdeos Intenso, Luna Negra) en `plieggo-general-reviews.ts`
- **2026-05-20 Fix galería mobile solapamiento** — `rows` dinámico (hasta 7 en mobile vs hardcoded 5), `topBase` distribuido uniformemente, eliminado `% chaosPositions.length` — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería mobile COMPLETO** — Grid 320×250% (vs 280×380% desktop), cards 160px, máx 3 por fila, drag top:-150% left:-220% — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería: grid 280×380%, filas re-espaciadas, drag/mouse ampliados** — InteractiveGalleryModal.tsx
- **2026-05-20 Galería: degradado + cuadros 2x** — bg-transparent en Galeria.tsx e InteractiveGalleryModal para mostrar radial-gradient del body. Card width 120→240px desktop, 100→200px mobile.

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **Review photos PDP (product-reviews-content.ts)**:
  - Verde Salvia (Mónica Aguilar): `...1779313645107-25fm4pmckj4.webp` ✅
  - Luna Negra (Camila Vargas): `...1779311693322-8vbqa3p7c55.webp`
  - Burdeos Intenso (Adriana Ríos): `...1779311693322-4f7n3rqv0pj.webp`
  - Luna Azul (Eduardo Silva): `...1779313645107-4vcyhpteg9.webp` ✅
  - Blanco Puro (Victoria Núñez): `...1779313645107-gwkhzbohi7.webp` ✅
  - Prisma Onyx Opal (Valentina Solano): `...1779315595739-cepimis2t5.webp` ✅
  - Prisma Azul Coral (Sebastián Mora): `...1779313645107-8wspbgkbhm7.webp` ✅
  - Rosa Morado (Mariana León): `...1779315294467-25x3snw8x7r.webp` ✅
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
- **DB slug mismatch**: Producto activo titulado "Acordón Verde Salvia" tiene slug `acorden-rosa-morado` en DB — el código usa `acorden-rosa-morado` correctamente para este producto activo, pero el nombre no coincide con el slug
- **`acordeon-prisma-beige-blanco`**: producto activo en DB sin reviews en el código (reviewCount: 0)
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas` — probablemente productos futuros o archivados

## 7. Pending / Future Sessions
- **[ALTA]** Agregar reviews para `acordeon-prisma-beige-blanco` (producto activo sin reseñas)
- **[ALTA]** Subir fotos reales para reseñas g1-g3, g5-g8 en sección general
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP (Rosa Sereno, Terracota, Luna Llena, etc.)
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip