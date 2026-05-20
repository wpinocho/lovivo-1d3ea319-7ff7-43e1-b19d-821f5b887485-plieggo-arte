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
**Ordenar productos por colección en 3 páginas** — Espacio → Acordeón → Acordeón Prisma

### Colecciones confirmadas (de DB):
- `coleccion-espacio` → ID: e10e78c6-13bd-4dc9-99e5-f17b69e815be
- `coleccin-acorden` → ID: 29c3654c-a90c-403c-9b54-de74140671be ⚠️ TYPO en handle (sin acento)
- `acordeon-prisma` → ID: bc12c1ec-9f88-461b-9198-bf40066b79d2

### Orden deseado: espacio (1) → acordeon (2) → prisma (3) → otros (4)

### Archivos a modificar:

#### 1. `src/pages/AllProducts.tsx`
- Actualmente: ordena por `created_at DESC`, no hay sort por colección
- Cambio: 
  1. Añadir `acordeon-prisma` a la consulta de colecciones (línea 37): `.in('handle', ['coleccion-espacio', 'coleccin-acorden', 'acordeon-prisma'])`
  2. Corregir handle de acordeon: `coleccin-acorden` (no `coleccion-acordeon`)
  3. Cambiar el type: `ProductWithCollection` para incluir `'prisma'`
  4. Mapear `prismaCollectionId`
  5. Añadir lógica de sorting después de mapear colecciones:
  ```
  const ORDER = { espacio: 1, acordeon: 2, prisma: 3 }
  productsWithCollection.sort((a, b) => (ORDER[a.collectionType] ?? 4) - (ORDER[b.collectionType] ?? 4))
  ```
  6. Pasar `aspectRatio` correcto para prisma (usar `'rectangle'` igual que acordeon)

#### 2. `src/pages/TopSellers.tsx`
- Actualmente: reconoce espacio/acordeon pero handle de acordeon es `coleccion-acordeon` (INCORRECTO)
- Cambio:
  1. Corregir handles: `coleccin-acorden` y añadir `acordeon-prisma`
  2. Extender type a incluir `'prisma'`
  3. Mapear los 3 collection IDs
  4. Sorting: espacio→1, acordeon→2, prisma→3, otros→4
  5. aspectRatio para prisma = `'rectangle'`

#### 3. `src/pages/ui/IndexUI.tsx`
- Actualmente: mapea espacio/acordeon pero handle de acordeon es `coleccion-acordeon` (INCORRECTO), y no hay sort
- Cambio:
  1. Corregir handle a `coleccin-acorden` y añadir `acordeon-prisma`
  2. Extender collectionType a incluir `'prisma'`
  3. Mapear prismaCollectionId
  4. Después del map, añadir `.sort((a,b) => ...)` con el mismo ORDER object
  5. `displayedProducts` ya usa `productsWithCollection` así que el sort se verá automáticamente
  6. aspectRatio para prisma = `'rectangle'`

### Notas:
- El handle `coleccin-acorden` (con typo) es el handle REAL en la DB — no cambiarlo, solo usarlo correctamente en el código
- Todos los cambios son frontend — no requieren cambios en la DB
- HeadlessIndex.tsx NO necesita cambios (solo fetcha productos sin colección info)

## 4. Recent Changes
- **2026-05-20 PLAN: Ordenar productos por colección** — Espacio→Acordeón→Prisma en AllProducts, TopSellers, IndexUI. Fix handle typo `coleccin-acorden`
- **2026-05-20 Galería por variante** — `getDisplayImages()` en HeadlessProduct.tsx ahora devuelve SOLO las imágenes de la variante activa (antes mezclaba variante + todas). Fallback seguro a imágenes del producto si la variante no tiene fotos.
- **2026-05-19 PLAN: Filtrar galería por variante** — Solo mostrar imágenes de la variante activa en PDP (HeadlessProduct.tsx getDisplayImages)
- **2026-05-19 Hero editorial redesign COMPLETO** — Layout bottom-left, headline sm/font-semibold, CTA limpio sin glow, gradiente reposicionado to-top, dots discretos bottom-right, scroll indicator eliminado
- **2026-05-19 Hero redesign planeado** — Layout editorial bottom-left, CTA limpio sin glow, gradiente reposicionado
- **2026-05-19 Tipografía global** — fontFamily registrada en tailwind.config.ts: font-sans=DM Sans, font-serif=Crimson Pro, font-heading, font-body. Ahora consistente en todo el sitio.
- **2026-05-19 WhatsApp completo** — Número real 525531215386 en TopSellers; link inline terracota en PDP (después del trust strip, antes de Galería); botón WhatsApp en footer con ícono SVG oficial
- **2026-05-19 TopSellers REDISEÑO COMPLETO** — Hero editorial compacto 55vh, trust strip, grid 2-cols móvil, skeleton correcto (sin "0 productos"), mini social proof 2 reviews, editorial 3 bullets, CTA final dual (WhatsApp + colección)
- **2026-05-19 TopSellers rediseño planeado** — Plan completo para tráfico FB, 8 problemas identificados
- **2026-05-19 ProductCard cleanup** — Badge compacto móvil, quitadas reseñas, precio más chico, CTA "Ver más" discreto
- **2026-05-19 Homepage Redesign COMPLETO** — 6 cambios CRO en IndexUI.tsx, HeroCarousel.tsx, InspirationCarousel.tsx
- **2026-05-19 AUDIT Homepage** — 6 issues identificados, plan de rediseño completo
- **2026-05-19 CRO Round 6** — SizeGuide proporcional, doble sección reviews (específicas + Plieggo general), Arte vivo en craftsmanship
- **2026-05-19 CRO Round 4** — PDP móvil UX: "Seguir comprando" oculto en móvil, qty pill, CTAs reposicionados, trust strip debajo de CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections: all-products-hero.webp, top-sellers-hero.webp, acordeon-hero.webp, espacio-hero.webp
- Top-sellers hero: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp`
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Gift banner: black-dining.webp ✅ (en uso)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` (no `coleccion-acordeon`) — el código debe usar el handle real
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip