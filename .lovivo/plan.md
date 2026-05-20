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
**Galería mobile: reemplazar chaos layout por CSS grid estructurado**

### Problema
El sistema de `position: absolute` con porcentajes aleatorios en mobile causa encimamientos inevitables. Los ítems portrait (verticales) invaden las filas siguientes sin importar cuánto se ajuste el algoritmo.

### Solución
En mobile, ABANDONAR el chaos layout y renderizar un **CSS grid de 3 columnas** con scroll natural de página. Desktop queda intacto.

### Implementación en `src/components/InteractiveGalleryModal.tsx`

**Cambio 1 — Outer container:** Cuando `isMobile`, el contenedor debe ser scrollable:
```
// isMobile:
className="relative w-full min-h-screen bg-transparent overflow-y-auto"
// desktop (sin cambio):
className="fixed inset-0 z-50 bg-transparent overflow-hidden"
```

**Cambio 2 — Inner grid motion.div:** Cuando `isMobile`, NO usar drag ni absolute positioning. Renderizar div normal:
```jsx
// MOBILE: div normal, no motion.div con drag
<div className="w-full pt-16 pb-24 px-3">
  <div className="grid grid-cols-3 gap-3">
    {galleryItems.map((item) => (
      <button
        key={item.id}
        onClick={() => handleProductClick(item.slug)}
        className="relative overflow-hidden bg-card shadow-sm active:scale-95 transition-transform duration-150 cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-auto object-contain"
        />
      </button>
    ))}
  </div>
</div>
```

**Cambio 3 — Lógica de posicionamiento:** El `generateChaosPositions` solo se llama en desktop. En mobile no se llama.

**Cambio 4 — Close button:** Asegurarse que el botón X sea `position: fixed` (no absolute) en mobile para que permanezca visible durante scroll.

**Cambio 5 — Instructions bar:** También `position: fixed` en mobile.

### Detalles de tamaño en mobile
- 3 columnas con `gap-3` (12px) y `px-3` (12px cada lado)
- En iPhone 390px: (390 - 24 - 24) / 3 ≈ 114px por card
- Imágenes portrait ≈ 150–170px alto (aspect ratio natural del artwork)
- 20 items = 7 filas (última con 2), alto total ≈ 7 × 170px + 6 × 12px ≈ 1262px — perfectamente scrollable

### Desktop: SIN NINGÚN CAMBIO
Todo el bloque de `!isMobile` queda exactamente igual.

### Archivos a modificar
- `src/components/InteractiveGalleryModal.tsx` — solo el bloque condicional mobile

## 4. Recent Changes
- **2026-05-20 Plan: galería mobile → CSS grid 3 cols (pendiente Craft Mode)** — reemplazar chaos layout por grid estructurado; desktop sin cambios
- **2026-05-20 Fix galería mobile: distribución por columnas (COMPLETO)** — `generateChaosPositions` en mobile ahora usa 3 columnas independientes con stagger vertical. Cada columna reparte sus items de 3% a 88% del grid con espaciado garantizado (`topSpan/n`). Jitter acotado a `min(spacing*0.25, 3%)`. Stagger por columna: col1 +40%, col2 +20% del spacing. Fix también: eliminado `chaosPositions[index % chaosPositions.length]` → guard `if (!position) return null` — InteractiveGalleryModal.tsx
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