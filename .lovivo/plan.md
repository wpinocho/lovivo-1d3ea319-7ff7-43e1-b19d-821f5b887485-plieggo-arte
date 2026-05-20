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
**EN PROGRESO**: Fix galería mobile — grid dimensions + card size + items por fila

### Problema detectado (2026-05-20):
- Desktop: perfecto ✓
- Mobile: demasiado espacio vertical entre filas, insuficiente espacio horizontal entre cuadros
- Causa: grid de 280×380% está optimizado para desktop landscape, en mobile portrait queda desbalanceado

### Solución a implementar en `InteractiveGalleryModal.tsx`:

1. **Grid condicional** (línea ~237):
   - Desktop: `w-[280%] h-[380%]` (sin cambios, está perfecto)
   - Mobile: `w-[320%] h-[250%]` — más ancho, menos alto

2. **Card width** (línea ~263):
   - Desktop: `240px` (sin cambios)
   - Mobile: `160px` (bajar de 200px → 160px)

3. **Items por fila en mobile** en `generateChaosPositions`:
   - Añadir parámetro `mobile = false`
   - Mobile: forzar `itemsPerRow = 3` (en lugar de `Math.ceil(itemCount / rows)`)
   - Desktop: sin cambios

4. **Drag constraints** en `getDragConstraints`:
   - `top: -(1.5 * rect.height)` — antes era -2.8, pero el grid mobile es solo 250% alto
   - `left: -(2.2 * rect.width)` — antes era -1.8, pero el grid mobile es 320% ancho

5. **Posición inicial mobile** en useEffect:
   - `centerX = -(0.4 * rect.width)` — puede quedarse igual
   - `centerY = 0` — sin cambios

### Cálculos de validación mobile (pantalla 390×844px):
- Grid: 320% × 250% = 1248px × 2110px
- 3 cuadros de 160px por fila en 1248px:
  - leftBase = 8%, 36.3%, 64.7% → posiciones: 100px, 453px, 807px
  - Gap entre cuadros: 453-100-160 = 193px ✓ (suficiente aire)
- 5 filas en 250% × 844px = 2110px con topBase 5%, 25%, 45%, 65%, 85%:
  - Posiciones: 106px, 528px, 950px, 1372px, 1794px
  - Gap entre filas: 422px, cuadro ≈200px → 222px de aire ✓ (razonable)
- Drag top: -(1.5 × 844) = -1266px (alcanza última fila a 1794px... hmm)

⚠️ Revisión del drag top: La fila 5 está a 85% de 2110px = 1793px. El viewport es 844px. 
Para alcanzar la última fila: necesitas arrastrar 1793-844 = 949px hacia arriba.
`-(1.5 * 844) = -1266px` > 949px ✓ — sí alcanza con margen.

Para el izquierda: grid de 1248px, viewport 390px, necesitas 1248-390 = 858px.
`-(2.2 * 390) = -858px` — exacto ✓

## 4. Recent Changes
- **2026-05-20 Fix galería mobile: grid 320×250%, cards 160px, 3/fila, drag ajustado** — PENDIENTE
- **2026-05-20 Fix galería: grid 280×380%, filas re-espaciadas, drag/mouse ampliados** — InteractiveGalleryModal.tsx
- **2026-05-20 Galería: degradado + cuadros 2x** — bg-transparent en Galeria.tsx e InteractiveGalleryModal para mostrar radial-gradient del body. Card width 120→240px desktop, 100→200px mobile.
- **2026-05-20 Galería fullscreen + fix hero slide 3** — Galeria.tsx sin template, X → /, clic en cuadro → PDP real, "Seguir comprando" regresa a /galeria, fix CTA "Descubre regalos" → /galeria
- **2026-05-20 Galería como ruta /galeria** — Nueva página standalone con header/footer, ruta en App.tsx, link en menú desktop+mobile, botón Index → Link a /galeria. Fix: solo 1ª imagen por variante en galería.
- **2026-05-20 Hero slide 2 → /all-products** — Slide 2 del hero carousel ahora usa imagen HERO_IMAGE de AllProducts, copy "Toda la colección / Encuentra tu pieza perfecta", CTA → /all-products
- **2026-05-20 Hero slide 1 + TopSellers hero** — Nueva imagen lifestyle (7 cuadros en pared cálida) reemplaza slide 1 del hero carousel en Index. Copy actualizado a "Arte hecho a mano que transforma tu espacio" + CTA → /top-sellers. TopSellers HERO_IMAGE y EDITORIAL_IMAGE también actualizadas.
- **2026-05-20 Galería de ambientes actualizada** — InspirationCarousel ahora tiene 6 imágenes
- **2026-05-20 ProductCard botón mobile oculto** — Botón "Agregar al carrito" en hover solo visible en desktop (md:).
- **2026-05-20 Páginas colección editorial COMPLETO** — AllProducts, CollectionAcordeon, CollectionEspacio reescritas con esquema editorial igual a TopSellers
- **2026-05-20 Product card aspect-ratio** — Cambiado a `aspect-[24/43]` en ProductCardUI.tsx
- **2026-05-20 Collection cards rediseño** — Nuevo orden, nuevas imágenes editoriales, aspecto `aspect-[3/4]`
- **2026-05-20 hoverImageIndex global** — Espacio → imagen 2, todo lo demás → imagen 3
- **2026-05-20 Fix CollectionAcordeon handle** — Corregido handle typo en DB
- **2026-05-19 Hero editorial redesign COMPLETO** — Layout bottom-left, headline sm/font-semibold, CTA limpio

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Collections hero (2026-05-20):
  - Más Vendidos: `...1779296069342-nd9nl70mgv.webp`
  - Colección Acordeón: `...1779296069343-1i4gabj0it4.webp`
  - Colección Espacio: `...1779296069343-1ra0u85wh3j.webp`
  - Todos los cuadros: `...1779296069343-2ifge8n87sv.webp`
- Inspiration carousel (6 imágenes — ver plan anterior)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip