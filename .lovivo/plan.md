# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis (Hand, Layers, Sparkles, Truck, Clock, RotateCcw de lucide-react)
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.

## 3. Active Plan
**Homepage CRO Redesign — PENDIENTE (2026-05-19)**

### Auditoría completa realizada — Issues encontrados:

#### 🔴 CRÍTICO
1. **Sección "Explora ideas de regalo"** (IndexUI.tsx líneas 341–360) — DISASTER:
   - Solo tiene un título enorme (text-5xl/6xl) + botón naranja con glow HORRIBLE
   - Cero imágenes, cero contexto visual, vacío total
   - El glow/sombra del botón se ve muy genérico y barato — inconsistente con marca premium
   - Debe rediseñarse completamente como banner editorial con imagen lifestyle

#### 🟠 ALTA PRIORIDAD
2. **Grid de productos en móvil** — actualmente `grid-cols-1` en móvil (empieza a 2 col en sm:640px)
   - En iPhone (390px) solo 1 producto por fila = scroll interminable
   - Cambiar a `grid-cols-2` desde el inicio para mostrar más cuadros

3. **Hero 100dvh en móvil** — ocupa toda la pantalla, los productos no son visibles en el fold
   - Reducir a `h-[80dvh] md:h-[100dvh]` — mantener impacto en desktop

#### 🟡 MEDIA PRIORIDAD
4. **Collections section en desktop** — el swipe carousel no llena bien el desktop
   - Móvil: mantener swipe carousel (buen UX)
   - Desktop (md+): cambiar a grid estático 4 columnas

5. **Trust strip** — No existe ninguna sección de "por qué Plieggo" en la homepage
   - Añadir barra de 4 pilares entre colecciones y productos:
     - Hand: "Hecho a mano en México"
     - Sparkles: "Arte que cambia con la luz"
     - Truck: "Envío asegurado"
     - RotateCcw: "Devoluciones sin preguntas"

6. **InspirationCarousel flechas** — opacity-0 en mobile (group-hover invisible en touch)
   - Hacer flechas siempre visibles en móvil (md:opacity-0 md:group-hover:opacity-100)

### Implementación por archivo:

#### `src/pages/ui/IndexUI.tsx`
- **Hero:** `<HeroCarousel>` envuelto en div con `h-[80dvh] md:h-[100dvh]`, o pasar prop height
- **Collections desktop:** En el contenedor de las cards, agregar `md:grid md:grid-cols-4 md:gap-6` y quitar el overflow-x-auto en desktop
- **Products grid:** Cambiar `grid-cols-1 sm:grid-cols-2` → `grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- **Trust strip:** Nueva sección entre collections y products (4 iconos + texto)
- **Gift Ideas section:** Reemplazar sección actual con editorial banner:
  - Layout: `grid grid-cols-1 md:grid-cols-2` — imagen izquierda, texto derecha
  - Imagen: usar `green-office.webp` o `black-dining.webp` de Supabase storage
  - Heading: "Arte que nunca falla como regalo" (font-heading text-4xl)
  - Sub: "Cada pieza llega lista para entregar, con empaque premium y dedicatoria personalizada."
  - CTA 1 (primary): "Explorar cuadros →" → /all-products
  - CTA 2 (secondary/ghost): "Ver galería de espacios" → abre InteractiveGalleryModal
  - 3 bullets debajo con checkmark: "✓ Empaque premium · ✓ Dedicatoria incluida · ✓ Envío en 5-7 días"
  - Sin glow, sin sombra naranja. CTA secundario con `variant="outline"` simple.

#### `src/components/HeroCarousel.tsx`
- Cambiar `h-[100dvh]` → `h-[80dvh] md:h-[100dvh]`

#### `src/components/InspirationCarousel.tsx`
- Cambiar flechas: `opacity-0 group-hover:opacity-100` → agregar `md:opacity-0 md:group-hover:opacity-100 opacity-100` (siempre visibles en móvil)
- En móvil: reducir tamaño de flechas para que no bloqueen imagen (ya son w-10 h-10, ok)

### Orden de implementación recomendado:
1. Gift Ideas section redesign (mayor impacto visual)
2. Products grid cols-2 en móvil
3. Hero height reducción
4. Trust strip
5. Collections desktop grid
6. InspirationCarousel flechas móvil

## 4. Recent Changes
- **2026-05-19 AUDIT Homepage** — 6 issues identificados, plan de rediseño completo
- **2026-05-19 CRO Round 6** — SizeGuide proporcional, doble sección reviews (específicas + Plieggo general), Arte vivo en craftsmanship
- **2026-05-19 AUDIT PDP Round 5** — 6 oportunidades identificadas
- **2026-05-19 CRO Round 4** — PDP móvil UX: "Seguir comprando" oculto en móvil, qty pill, CTAs reposicionados, trust strip debajo de CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections: all-products-hero.webp, top-sellers-hero.webp, acordeon-hero.webp, espacio-hero.webp
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`
- Gift banner image: usar `black-dining.webp` (comedor elegante, funciona para regalo) o `green-office.webp`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales
- HeroCarousel usa `h-[100dvh]` en móvil — el contenido debajo del fold no se ve

## 7. Pending / Future Sessions
- **[ALTA]** Homepage redesign — 6 cambios identificados (ver Active Plan)
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** WhatsApp link discreto cerca de CTAs (pa.me/ link)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip