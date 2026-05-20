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
**COMPLETADO** — Collection cards actualizadas con nuevas imágenes y orden correcto

## 4. Recent Changes
- **2026-05-20 Collection cards rediseño** — Nuevo orden Más Vendidos→Acordeón→Espacio→Todos. Nuevas imágenes editoriales lifestyle. Aspecto cambiado a `aspect-[3/4]` (más premium). Cards más angostas en móvil (65vw). Eyebrow text añadido.
- **2026-05-20 hoverImageIndex global** — AllProducts, TopSellers, IndexUI ahora pasan `hoverImageIndex={product.collectionType === 'espacio' ? 1 : 2}` a ProductCard. Espacio → imagen 2, todo lo demás → imagen 3, en TODAS las rutas.
- **2026-05-20 hoverImageIndex prop** — ProductCardUI/ProductCard aceptan `hoverImageIndex`. CollectionEspacio pasa `1` (imagen 2); default `2` (imagen 3) en todo lo demás.
- **2026-05-20 Fix CollectionAcordeon handle** — Corregido handle `coleccion-acordeon` → `coleccin-acorden` para que los productos aparezcan en /coleccion-acordeon
- **2026-05-20 ProductCard hover imagen 3** — Hover muestra images[2] (3ª imagen) con object-cover para llenar el alto completo. Condición actualizada a length > 2.
- **2026-05-20 Orden por colección COMPLETO** — AllProducts, TopSellers e IndexUI ordenan Espacio→Acordeón→Prisma. Fix bug handle `coleccin-acorden` (typo real en DB). Prisma usa aspectRatio='rectangle'.
- **2026-05-20 Galería por variante** — `getDisplayImages()` en HeadlessProduct.tsx ahora devuelve SOLO las imágenes de la variante activa. Fallback seguro a imágenes del producto si la variante no tiene fotos.
- **2026-05-19 Hero editorial redesign COMPLETO** — Layout bottom-left, headline sm/font-semibold, CTA limpio sin glow, gradiente reposicionado to-top, dots discretos bottom-right, scroll indicator eliminado
- **2026-05-19 Tipografía global** — fontFamily registrada en tailwind.config.ts: font-sans=DM Sans, font-serif=Crimson Pro, font-heading, font-body. Ahora consistente en todo el sitio.
- **2026-05-19 WhatsApp completo** — Número real 525531215386 en TopSellers; link inline terracota en PDP; botón WhatsApp en footer con ícono SVG oficial
- **2026-05-19 TopSellers REDISEÑO COMPLETO** — Hero editorial compacto 55vh, trust strip, grid 2-cols móvil, skeleton correcto, mini social proof 2 reviews, editorial 3 bullets, CTA final dual
- **2026-05-19 ProductCard cleanup** — Badge compacto móvil, quitadas reseñas, precio más chico, CTA "Ver más" discreto
- **2026-05-19 Homepage Redesign COMPLETO** — 6 cambios CRO en IndexUI.tsx, HeroCarousel.tsx, InspirationCarousel.tsx

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections hero (nuevas, 2026-05-20):
  - Más Vendidos: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069342-nd9nl70mgv.webp`
  - Colección Acordeón: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1i4gabj0it4.webp`
  - Colección Espacio: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1ra0u85wh3j.webp`
  - Todos los cuadros: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp`
- Top-sellers hero: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp`
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Gift banner: black-dining.webp ✅ (en uso)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` (no `coleccion-acordeon`) — corregido en CollectionAcordeon.tsx y en ordenamiento
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