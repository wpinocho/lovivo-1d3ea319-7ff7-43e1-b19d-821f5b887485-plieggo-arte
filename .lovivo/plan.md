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

## 3. Active Plan
### Hero Redesign — Layout editorial bottom-left

**Problema:** El CTA del hero tiene `shadow-[0_0_30px_rgba(193,102,72,0.4)]` (glow naranja), `py-7` (padding enorme), `text-xl font-bold` (demasiado heavy), y `hover:scale-105 hover:-translate-y-1` (movimiento exagerado). El layout centrado es genérico.

**Objetivo:** Hero refinado estilo Zara Home — texto anclado abajo-izquierda, CTA pequeño y limpio, gradiente que oscurece el rincón inferior-izquierdo.

**Archivo: `src/components/HeroCarousel.tsx`**

Cambios en el layout del content:
1. Cambiar `h-full flex items-center justify-center` → `h-full flex items-end justify-start`
2. Cambiar `text-center max-w-4xl` → `text-left max-w-lg` con `pb-16 md:pb-20`
3. Agregar `px-6 md:px-12 lg:px-16` al contenedor de texto

Cambios en el headline:
- `text-4xl md:text-7xl lg:text-8xl font-bold` → `text-3xl md:text-5xl lg:text-6xl font-semibold`
- Quitar `textShadow` inline o reducirlo: `0 1px 8px rgba(0,0,0,0.3)`
- `mb-4 md:mb-6` → `mb-3`

Cambios en el subheadline:
- `text-base md:text-2xl` → `text-sm md:text-base`
- `mb-6 md:mb-10` → `mb-5 md:mb-7`
- `max-w-2xl` → `max-w-sm`

Cambios en el CTA (eliminar glow, reducir tamaño):
```tsx
// Reemplazar ambas instancias del Button hero
<Button
  size="sm"
  className="btn-hero group bg-white/15 backdrop-blur-sm border border-white/50 hover:bg-white hover:text-[#1B2A41] text-white transition-all duration-300 px-6 py-2.5 text-sm tracking-widest uppercase font-medium h-auto rounded-none"
>
  <span className="flex items-center gap-2">
    {currentSlideData.cta.text}
    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  </span>
</Button>
```
**NO glow, NO shadow, NO scale, NO translate-y.**

Cambios en el gradiente:
- Cambiar `bg-gradient-to-b from-black/30 via-black/40 to-black/60` 
- → `bg-gradient-to-t from-black/60 via-black/20 to-black/10` (más oscuro abajo donde está el texto)

Cambios en el eyebrow:
- `text-white/90 mb-4 tracking-wider uppercase` → `text-white/70 mb-3 tracking-[0.2em] uppercase text-xs`

Dots indicator: mover a bottom-4 right-6 (alineado derecha, más discreto)
```tsx
// cambiar posición de dots
className="absolute bottom-5 right-6 z-20 flex gap-2"
// quitar left-1/2 -translate-x-1/2
```

Scroll indicator: quitar o mantener solo en desktop (ya tiene hidden md:block)

## 4. Recent Changes
- **2026-05-19 Hero redesign planeado** — Layout editorial bottom-left, CTA limpio sin glow, gradiente reposicionado
- **2026-05-19 Tipografía global** — fontFamily registrada en tailwind.config.ts: font-sans=DM Sans, font-serif=Crimson Pro, font-heading, font-body. Ahora consistente en todo el sitio.
- **2026-05-19 WhatsApp completo** — Número real 525531215386 en TopSellers; link inline terracota en PDP (después del trust strip, antes de Galería); botón WhatsApp en footer con ícono SVG oficial
- **2026-05-19 TopSellers REDISEÑO COMPLETO** — Hero editorial compacto 55vh, trust strip, grid 2-cols móvil, skeleton correcto (sin "0 productos"), mini social proof 2 reviews, editorial 3 bullets, CTA final dual (WhatsApp + colección)
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

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip