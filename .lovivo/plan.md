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
**Fix galería mobile: distribución por columnas** — `InteractiveGalleryModal.tsx`

### Problema
`generateChaosPositions` en mobile distribuye ítems en filas horizontales (3 cols × N filas). La fórmula reparte las filas entre 5%–85% del grid. Cuando hay muchos productos, la separación entre filas puede ser menor que la altura de cuadros portrait (160px × ~287px), causando encimes visuales.

### Solución: layout por columnas con stagger
Cambiar lógica mobile de "filas" a "columnas":

```typescript
if (mobile) {
  const COLS = 3
  // Pre-allocate result array indexed by item position
  const result: { top: number; left: number }[] = new Array(itemCount)

  // Distribute items column-first: item 0 → col 0, item 1 → col 1, item 2 → col 2, item 3 → col 0 ...
  // This gives each column ~itemCount/3 items, spread full grid height
  const colWidthPct = 100 / COLS  // ~33.3% of grid

  for (let col = 0; col < COLS; col++) {
    // Collect indices for this column
    const colIndices: number[] = []
    for (let i = col; i < itemCount; i += COLS) {
      colIndices.push(i)
    }
    if (colIndices.length === 0) continue

    // Spread this column's items from 3% to 88% of grid height
    const topSpan = 85  // 3% to 88%
    const topStart = 3
    const spacing = colIndices.length > 1 ? topSpan / (colIndices.length - 1) : 0

    // Horizontal: stay within column zone with padding + jitter
    const leftMin = col * colWidthPct + colWidthPct * 0.08
    const leftMax = (col + 1) * colWidthPct - colWidthPct * 0.08

    // Stagger offset: each column starts at a different vertical offset
    // col 0: +0%, col 1: +spacing*0.4, col 2: +spacing*0.2 (visual stagger)
    const staggerOffsets = [0, spacing * 0.4, spacing * 0.2]
    const stagger = colIndices.length > 1 ? staggerOffsets[col] : 0

    colIndices.forEach((itemIdx, posInCol) => {
      const topBase = topStart + stagger + posInCol * spacing
      // Jitter: ±30% of spacing to add chaos without overlap
      const maxJitter = Math.min(spacing * 0.3, 4)
      result[itemIdx] = {
        top: topBase + (Math.random() * maxJitter * 2 - maxJitter),
        left: leftMin + Math.random() * (leftMax - leftMin)
      }
    })
  }

  return result
}
```

**Por qué funciona:**
- 3 columnas independientes, cada una distribuye sus items de 3% a 88% del grid de 250% alto
- Con 5 items por columna en un grid de 2110px: separación = 422px → mucho más que la altura de cualquier cuadro
- El stagger vertical entre columnas (col 1 empieza 40% más abajo que col 0) da el aspecto caótico/asimétrico
- El jitter está limitado a `min(spacing*0.3, 4%)` → nunca causa encime
- Horizontal: cada item usa una posición aleatoria dentro de los ~80% del ancho de su columna

### Archivo a modificar
- `src/components/InteractiveGalleryModal.tsx`
  - Reemplazar el bloque `if (mobile)` en `generateChaosPositions` (líneas ~176–194)
  - Cambiar el return al final del bloque a `return result` para el path mobile
  - Mantener el bloque desktop sin cambios

## 4. Recent Changes
- **2026-05-20 Fix galería mobile: distribución columnas** — PENDIENTE Craft Mode
- **2026-05-20 Fix galería mobile: encimes** — `generateChaosPositions` ahora genera filas dinámicas para mobile (Math.ceil(itemCount/3) filas, no 5 fijas). Espaciado 5%→85% adaptativo. Se eliminó el `% chaosPositions.length` en línea 253 → cada item tiene su propia posición única — InteractiveGalleryModal.tsx
- **2026-05-20 Fix galería mobile COMPLETO** — Grid 320×250% (vs 280×380% desktop), cards 160px, máx 3 por fila, drag top:-150% left:-220% — InteractiveGalleryModal.tsx
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