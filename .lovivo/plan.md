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
**COMPLETADO ✅**: Hero slide 2 actualizado → apunta a /all-products con imagen de esa página.

**Próximo objetivo**: Subir fotos reales de clientes / mejorar UX de producto individual

## 4. Recent Changes
- **2026-05-20 Hero slide 2 → /all-products** — Slide 2 del hero carousel ahora usa imagen HERO_IMAGE de AllProducts (1779296069343-2ifge8n87sv.webp), copy "Toda la colección / Encuentra tu pieza perfecta", CTA → /all-products
- **2026-05-20 Hero slide 1 + TopSellers hero** — Nueva imagen lifestyle (7 cuadros en pared cálida) reemplaza slide 1 del hero carousel en Index. Copy actualizado a "Arte hecho a mano que transforma tu espacio" + CTA → /top-sellers. TopSellers HERO_IMAGE y EDITORIAL_IMAGE también actualizadas con la misma imagen.
- **2026-05-20 Galería de ambientes actualizada** — InspirationCarousel ahora tiene 6 imágenes: Espacio 1 (estudio verde), Espacio 2 (comedor negro, igual), Espacio 3 (recámara escandinava), Espacio 4 (cocina burdeos, igual), Espacio 5 (comedor mediterráneo), Espacio 6 (oficina dark, nueva)
- **2026-05-20 ProductCard botón mobile oculto** — Botón "Agregar al carrito" en hover solo visible en desktop (md:). Móvil queda limpio.
- **2026-05-20 Páginas colección editorial COMPLETO** — AllProducts, CollectionAcordeon, CollectionEspacio reescritas con esquema editorial igual a TopSellers: hero compacto, trust strip, grid 2-cols móvil, social proof, editorial split bullets, CTA final WhatsApp
- **2026-05-20 Product card aspect-ratio** — Cambiado `aspect-square md:aspect-[1/2]` a `aspect-[24/43]` en ProductCardUI.tsx para que coincida exactamente con imágenes 768×1376 px de Acordeón. Aplica igual en móvil y desktop.
- **2026-05-20 Collection cards rediseño** — Nuevo orden Más Vendidos→Acordeón→Espacio→Todos. Nuevas imágenes editoriales lifestyle. Aspecto cambiado a `aspect-[3/4]` (más premium). Cards más angostas en móvil (65vw). Eyebrow text añadido.
- **2026-05-20 hoverImageIndex global** — AllProducts, TopSellers, IndexUI ahora pasan `hoverImageIndex={product.collectionType === 'espacio' ? 1 : 2}` a ProductCard. Espacio → imagen 2, todo lo demás → imagen 3, en TODAS las rutas.
- **2026-05-20 hoverImageIndex prop** — ProductCardUI/ProductCard aceptan `hoverImageIndex`. CollectionEspacio pasa `1` (imagen 2); default `2` (imagen 3) en todo lo demás.
- **2026-05-20 Fix CollectionAcordeon handle** — Corregido handle `coleccion-acordeon` → `coleccin-acorden` para que los productos aparezcan en /coleccion-acordeon
- **2026-05-20 ProductCard hover imagen 3** — Hover muestra images[2] (3ª imagen) con object-cover para llenar el alto completo. Condición actualizada a length > 2.
- **2026-05-20 Orden por colección COMPLETO** — AllProducts, TopSellers e IndexUI ordenan Espacio→Acordeón→Prisma. Fix bug handle `coleccin-acorden` (typo real en DB). Prisma usa aspectRatio='rectangle'.
- **2026-05-19 Hero editorial redesign COMPLETO** — Layout bottom-left, headline sm/font-semibold, CTA limpio sin glow, gradiente reposicionado to-top, dots discretos bottom-right, scroll indicator eliminado

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2 (nuevo)**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Collections hero (nuevas, 2026-05-20):
  - Más Vendidos: `...1779296069342-nd9nl70mgv.webp`
  - Colección Acordeón: `...1779296069343-1i4gabj0it4.webp`
  - Colección Espacio: `...1779296069343-1ra0u85wh3j.webp`
  - Todos los cuadros: `...1779296069343-2ifge8n87sv.webp`
- Inspiration carousel (2026-05-20):
  - Espacio 1: `...1779301248170-7zdmlt3v6x9.webp` (estudio verde)
  - Espacio 2: `...product-images/.../black-dining.webp` (comedor negro) — sin cambio
  - Espacio 3: `...1779301248171-1gyve5g10np.webp` (recámara escandinava)
  - Espacio 4: `...product-images/.../burgundy-kitchen.webp` (cocina) — sin cambio
  - Espacio 5: `...1779301248171-cor5cchqdk7.webp` (comedor mediterráneo)
  - Espacio 6: `...1779301248171-ckv1r5njeaa.webp` (oficina dark)
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