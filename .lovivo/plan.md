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
**TopSellers Page — Rediseño para tráfico de FB Ads**
Estado: PENDIENTE — listo para Craft Mode

### Objetivo
Esta es la página principal donde llega el tráfico pagado de Facebook/Instagram. Actualmente tiene serios problemas de conversión para tráfico frío. Necesita un rediseño completo.

### Problemas identificados
1. **Bug "0 productos"** — el contador muestra "0 productos" mientras carga porque products.length = 0 inicialmente. El skeleton existe pero el texto de conteo no está condicionado a `!loading`.
2. **Sin hero / hook emocional** — Tráfico frío de FB llega sin contexto de la marca. El header genérico "Más Vendidos / Los favoritos de nuestros clientes" no establece propuesta de valor ni hook.
3. **Grid 1 columna en móvil** — `grid-cols-1` en móvil hace los productos enormes. Debe ser `grid-cols-2` como la homepage.
4. **"6 productos"** — Texto que ocupa espacio, no agrega valor.
5. **Sin social proof arriba del fold** — Las reseñas están enterradas o inexistentes.
6. **Sin trust signals cerca de los productos** — La strip de confianza está en la homepage pero no aquí.
7. **CTA final débil** — "Únete a la comunidad" es genérico y lleva a `/#products` en lugar de WhatsApp o algo accionable.
8. **"Piezas que enamoran" desconectada** — La sección editorial está abajo, desconectada del flujo.

### Nueva estructura de página (para tráfico frío FB)

```
[ANNOUNCEMENT BAR] — ya existe

[HERO EDITORIAL COMPACTO] — nuevo
  - Fondo: imagen top-sellers.webp (ya en storage) con overlay oscuro sutil
  - Headline: "Arte hecho a mano que vive en tu espacio"
  - Subline: "Cada pliegue crea sombras únicas que cambian con la luz del día"
  - Badge: "★ 4.9 · +50 hogares transformados"
  - CTA: "Ver cuadros ↓" (scroll suave a productos)
  - Altura: 55vh móvil / 60vh desktop — NO full screen

[TRUST STRIP] — reutilizar de IndexUI
  - 4 iconos terracota: Hecho a mano / Arte vivo (luz dinámica) / Envío gratis CDMX / 30 días de garantía

[PRODUCTOS GRID] — corregido
  - grid-cols-2 en móvil (no grid-cols-1)
  - skeleton correcto mientras carga
  - SIN "X productos" counter
  - Skeleton: 6 cards pulse en grid-cols-2 / grid-cols-3 / grid-cols-4

[MINI SOCIAL PROOF] — nuevo, entre productos y editorial
  - 2 reviews destacadas (tarjetas horizontales con nombre, ciudad, estrellas, quote corto)
  - Usar data de src/data/plieggo-general-reviews.ts
  - Solo mostrar si reviews.length > 0

[EDITORIAL "¿Por qué son los favoritos?"] — rework de "Piezas que enamoran"
  - Imagen izq / texto der (desktop) | texto arriba / imagen abajo (móvil)
  - Headline: "¿Por qué estos son los más queridos?"
  - 3 razones concretas en bullets terracota (no párrafo genérico):
    · Pliegues hechos a mano — cada uno es único
    · Arte vivo — las sombras cambian con la hora del día
    · Pieza + marco incluido — llega lista para colgar
  - NO mencionar "galería" ni "geometría pura y elegancia arquitectónica"

[CTA FINAL] — reemplazar "Únete a la comunidad"
  - Sin fondo vino burdeos enorme
  - Sección ligera con 2 opciones:
    · "¿Tienes dudas? Escríbenos" → WhatsApp (pa.me link o número)
    · "Ver toda la colección →" → /all-products

[InspirationCarousel] — mantener al final
```

### Archivos a modificar
- `src/pages/TopSellers.tsx` — Rewrite completo (es el único archivo, no tiene UI separado)

### Datos disponibles para social proof
- `src/data/plieggo-general-reviews.ts` — usar los primeros 2 reviews con mejor copy

### Imagen disponible para hero
- `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp`

### WhatsApp CTA
- Usar `https://wa.me/521XXXXXXXXXX` — coordinar con el usuario el número exacto
- O simplemente `href="https://wa.me/"` para ahora y el usuario lo reemplaza

### Decisiones de diseño
- Hero NO full screen — los productos deben asomar por debajo del fold en móvil
- Trust strip reutilizada igual que homepage para consistencia
- Grid 2 columnas móvil igual que homepage (consistencia UX)
- Reviews: tarjetas horizontales simples, sin foto (avatares con iniciales están OK)
- CTA final: limpio, minimal, 2 opciones (no solo 1)

## 4. Recent Changes
- **2026-05-19 TopSellers rediseño planeado** — Plan completo para tráfico FB, 8 problemas identificados
- **2026-05-19 ProductCard cleanup** — Badge compacto móvil, quitadas reseñas, precio más chico, CTA "Ver más" discreto
- **2026-05-19 Homepage Redesign COMPLETO** — 6 cambios CRO en IndexUI.tsx, HeroCarousel.tsx, InspirationCarousel.tsx
- **2026-05-19 AUDIT Homepage** — 6 issues identificados, plan de rediseño completo
- **2026-05-19 CRO Round 6** — SizeGuide proporcional, doble sección reviews (específicas + Plieggo general), Arte vivo en craftsmanship
- **2026-05-19 AUDIT PDP Round 5** — 6 oportunidades identificadas
- **2026-05-19 CRO Round 4** — PDP móvil UX: "Seguir comprando" oculto en móvil, qty pill, CTAs reposicionados, trust strip debajo de CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections: all-products-hero.webp, top-sellers-hero.webp, acordeon-hero.webp, espacio-hero.webp
- Top-sellers hero: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp`
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Gift banner: black-dining.webp ✅ (en uso)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales
- TopSellers: "0 productos" flash durante carga (bug en contador, skeleton SÍ existe)

## 7. Pending / Future Sessions
- **[ALTA]** TopSellers rediseño — listo para Craft Mode (plan completo en sección 3)
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** WhatsApp link discreto cerca de CTAs (pa.me/ link) — número pendiente
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip