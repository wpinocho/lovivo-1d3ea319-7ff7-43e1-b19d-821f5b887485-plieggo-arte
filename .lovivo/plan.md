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
**FIX PENDIENTE**: Galería mobile — cuadros encimados por bug matemático en `generateChaosPositions`

### El bug
En `src/components/InteractiveGalleryModal.tsx`, línea 253:
```js
const position = chaosPositions[index % chaosPositions.length]
```

`generateChaosPositions` en mobile genera máximo `5 filas × 3 items/fila = 15 posiciones`.
Si hay más de 15 items (o si `rawItemsPerRow` resulta en menos de 3), el `% chaosPositions.length`
hace que items extras reutilicen las mismas coordenadas → encimados.

### Fix en `generateChaosPositions` (solo mobile path):

```typescript
const generateChaosPositions = (itemCount: number, mobile = false) => {
  const positions: { top: number; left: number }[] = []
  
  if (mobile) {
    // Mobile: filas dinámicas según itemCount, máx 3 por fila
    const itemsPerRow = 3
    const rows = Math.ceil(itemCount / itemsPerRow)
    
    for (let row = 0; row < rows; row++) {
      const remainingItems = itemCount - positions.length
      const itemsInThisRow = Math.min(itemsPerRow, remainingItems)
      
      // Espaciado dinámico: siempre de 5% a 85% del grid
      const topBase = rows <= 1 ? 45 : 5 + row * (80 / (rows - 1))
      
      for (let col = 0; col < itemsInThisRow; col++) {
        const leftBase = (col / itemsPerRow) * 84 + 8
        positions.push({
          top: topBase + (Math.random() * 4 - 2),
          left: leftBase + (Math.random() * 3 - 1.5)
        })
      }
    }
  } else {
    // Desktop: lógica original sin cambios
    const rows = 5
    const itemsPerRow = Math.ceil(itemCount / rows)
    
    for (let row = 0; row < rows; row++) {
      const remainingItems = itemCount - positions.length
      const itemsInThisRow = Math.min(itemsPerRow, remainingItems)
      const topBase = 5 + (row * 20)
      
      for (let col = 0; col < itemsInThisRow; col++) {
        const leftBase = (col / itemsInThisRow) * 84 + 8
        positions.push({
          top: topBase + (Math.random() * 4 - 2),
          left: leftBase + (Math.random() * 3 - 1.5)
        })
      }
    }
  }
  
  return positions
}
```

### Fix en el render (línea 253):
Cambiar:
```js
const position = chaosPositions[index % chaosPositions.length]
```
Por:
```js
const position = chaosPositions[index] ?? chaosPositions[index % chaosPositions.length]
```
(el fallback `??` es seguridad extra, pero con el fix de arriba nunca debería usarse)

### Archivos a modificar
- `src/components/InteractiveGalleryModal.tsx` — solo la función `generateChaosPositions` y la línea 253 del render

### Notas adicionales
- Desktop: NO tocar nada del desktop path. Ya está perfecto.
- La grid mobile sigue siendo `w-[320%] h-[250%]`
- Cards mobile siguen siendo `160px`
- Drag constraints sin cambios: top -150%, left -220%
- El espaciado dinámico (5% a 85%) garantiza que siempre caben en el grid de 250% con el constraint actual de -150%

## 4. Recent Changes
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