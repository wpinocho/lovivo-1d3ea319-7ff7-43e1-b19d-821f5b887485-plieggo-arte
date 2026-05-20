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
**EN PROGRESO**: Sección "Más experiencias Plieggo" — solo 5 reviews con foto, priorizando misma colección.

### Cambios a realizar

#### `src/data/plieggo-general-reviews.ts`
1. Agregar campo `collectionSlug?: string` a la interfaz `GeneralReview`
2. Asignar `collectionSlug` a cada review:
   - g1, g2, g3, g6 (Acordeón Beige Sutil) → `"acordeon"`
   - g4 (Verde Salvia) → `"acordeon"`
   - g5, g7 (Luna Beige) → `"luna"`
   - g8 (Terracota Vibrante) → `"acordeon"`
   - g9 (Prisma Onyx Opal) → `"acordeon"`
   - g10 (Prisma Azul Coral) → `"acordeon"`
   - g11 (Burdeos Intenso) → `"acordeon"`
   - g12 (Luna Negra) → `"luna"`

#### `src/components/ProductReviews.tsx`
1. Agregar helper `getCollectionFromSlug(slug: string): string`:
   - si empieza con `"acorden"` o `"acordeon"` → `"acordeon"`
   - si empieza con `"luna"` → `"luna"`
   - else → `"other"`
2. Reemplazar `plieggoGeneralReviews.map(...)` por lógica de selección:
   ```ts
   const withPhotos = plieggoGeneralReviews.filter(r => r.photoUrl)
   const currentCollection = getCollectionFromSlug(productSlug)
   const sameCollection = withPhotos.filter(r => r.collectionSlug === currentCollection)
   const otherCollection = withPhotos.filter(r => r.collectionSlug !== currentCollection)
   const experiencesShown = [...sameCollection, ...otherCollection].slice(0, 5)
   ```
3. Usar `experiencesShown` en lugar de `plieggoGeneralReviews` en el `.map()`
4. Ajustar el grid: con 5 cards fijas, cambiar a `md:grid-cols-3 lg:grid-cols-5` para que se vean bien en desktop, mantener scroll horizontal en mobile.

### Notas
- Reviews actuales con foto: g4 (acordeon), g9 (acordeon), g10 (acordeon), g11 (acordeon), g12 (luna) — total 5
- En una PDP de acordeón se verán 4 de acordeón + 1 de luna
- En una PDP de luna se verá 1 de luna + 4 de acordeón (hay pocas luna con foto)
- Pendiente: agregar más fotos a g1-g3, g5-g8 para ampliar el pool

## 4. Recent Changes
- **2026-05-20 Sección "Más experiencias" con fotos + colección** — filtro a 5 reviews con foto, priorizando misma colección del producto actual.
- **2026-05-20 Fotos review Beige Sutil + Luna Llena** — `photoUrl` añadido a primera review de `acorden-beige-sutil` (María González) y `luna-llena` (Alejandra Romero).
- **2026-05-20 Reviews acordeon-prisma-beige-blanco** — 4 reseñas creadas en `product-reviews-content.ts`. Primera review (Lucía Fernández) con foto.
- **2026-05-20 Fix slug acordeon-prisma-azul-coral** — corregido en `product-reviews-content.ts` y `product-reviews.ts`.
- **2026-05-20 Fix slug Prisma Onyx Opal** — `prisma-onyx-opal` → `acorden-prisma-onyx-opal`.
- **2026-05-20 Foto review acorden-rosa-morado (Mariana León)** — `photoUrl` añadido.
- **2026-05-20 Fotos reviews: Verde Salvia, Luna Azul, Blanco Puro + nuevas entradas Prisma Onyx Opal, Prisma Azul Coral** — `product-reviews-content.ts` actualizado.
- **2026-05-20 Reviews PDP con foto** — `photoUrl` añadido a interfaz `Review`. `ReviewCard` con foto full-width aspect-[3/4]. `sortedReviews` ordena fotos primero.
- **2026-05-20 Fotos de reviews reales** — `photoUrl` añadido en g4 (Verde Salvia) + 4 nuevas reseñas g9-g12 en `plieggo-general-reviews.ts`
- **2026-05-20 Fix galería mobile solapamiento** — `rows` dinámico, `topBase` distribuido — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería mobile COMPLETO** — Grid 320×250%, cards 160px, máx 3 por fila — InteractiveGalleryModal.tsx

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **Review photos PDP (product-reviews-content.ts)**:
  - Beige Sutil (María González): `...1779316513173-t94ygqmypsh.webp` ✅
  - Luna Llena (Alejandra Romero): `...1779316513173-2bakbmoaanh.webp` ✅
  - Prisma Beige Blanco (Lucía Fernández): `...1779316065818-wtuxxi83zxr.webp` ✅
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
- **DB slug mismatch**: Producto activo titulado "Acordón Verde Salvia" tiene slug `acorden-rosa-morado` en DB
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales para reseñas g1-g3, g5-g8 (ampliar pool de "Más experiencias")
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP (Rosa Sereno, Terracota, Luna Beige, etc.)
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip