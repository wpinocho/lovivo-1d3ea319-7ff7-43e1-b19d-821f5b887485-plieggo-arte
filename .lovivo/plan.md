# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Precio Luna: por variantes (revisar en DB). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale
- Review photos: `aspect-[4/5]` (ReviewCard y GeneralReviewCard) — menos alto que 3/4
- AboutPage: editorial split-screen (no rounded corners, full-bleed images, pilares 3-col, dark proceso section)

## 3. Active Plan
**Estado:** 🔧 Pendiente — Performance Fix (móvil /coleccion-acordeon)

### Score actual: 67/100 móvil (Lighthouse)
- FCP: 3.5s ❌ | LCP: 8.4s ❌ | TBT: 130ms ✅ | CLS: 0.001 ✅

### Problemas identificados (en orden de impacto):

#### FIX 1 — Google Fonts @import → `<link>` en HTML (render-blocking) ⚡ MAYOR IMPACTO
**Archivo:** `src/index.css` línea 1 + `index.html`

El `@import url('https://fonts.googleapis.com/css2?...')` dentro del CSS es RENDER-BLOCKING — el browser no puede pintar nada hasta que descargue y parsee ese CSS externo. Esto explica el FCP 3.5s.

**Fix:**
1. Eliminar la línea 1 de `src/index.css`:
   ```css
   /* ELIMINAR: */
   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Crimson+Pro:wght@400;500;600&display=swap');
   ```

2. Agregar en `index.html` dentro de `<head>`, ANTES del `<script>` de Vite:
   ```html
   <!-- Google Fonts — preconnect + stylesheet (no render-blocking) -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Crimson+Pro:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
   <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Crimson+Pro:wght@400;500;600&display=swap"></noscript>
   ```
   El truco `media="print" onload="this.media='all'"` carga la fuente de forma no bloqueante y luego la activa al terminar de cargar.

#### FIX 2 — InspirationCarousel: no renderizar todas las imágenes en el DOM ⚡ GRAN IMPACTO
**Archivo:** `src/components/InspirationCarousel.tsx`

Actualmente renderiza 6 imágenes como `position: absolute; opacity: 0`. El browser las descarga TODAS aunque no sean visibles — son imágenes grandes lifestyle (~400-700 KB cada una). Total: ~2-3 MB de imágenes innecesarias en carga inicial.

**Fix:** Solo renderizar la imagen actual + precargar la siguiente con `<link rel="preload">` dinámico. Las demás no se renderizan hasta que el usuario navegue.

```tsx
// Solo renderizar current y current+1 en el DOM:
{inspirationImages.map((img, idx) => {
  const isVisible = idx === current
  const isNext = idx === (current + 1) % total
  if (!isVisible && !isNext) return null  // ← NO renderizar las otras 4
  return (
    <div key={idx} className={cn('absolute inset-0 transition-opacity duration-700', isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
      <img src={img.src} alt={img.alt} loading={isVisible ? 'eager' : 'lazy'} ... />
    </div>
  )
})}
```

Para los thumbnails (6 imágenes pequeñas) se pueden mantener todos pero con `loading="lazy"` y tamaños pequeños.

#### FIX 3 — fetchpriority="high" en hero de /coleccion-acordeon
**Archivo:** `src/pages/CollectionAcordeon.tsx` línea 89-94

La imagen hero ya tiene `loading="eager"` pero le falta `fetchpriority="high"` para que el browser la priorice sobre otras requests:
```tsx
<img
  src={HERO_IMAGE}
  alt="Colección Acordeón Plieggo"
  className="absolute inset-0 w-full h-full object-cover object-center"
  loading="eager"
  fetchPriority="high"   // ← agregar esto
/>
```

#### FIX 4 — Actualizar preload en index.html al hero correcto
**Archivo:** `index.html` línea 25

El preload actual apunta a `1770920004212-qzo0zur4y1s.jpg` que es una imagen vieja/incorrecta. El hero del home (HeroCarousel) usa la imagen `1779301620051-88tz4z58bt7.webp`. Actualizar el href:
```html
<link rel="preload" as="image" href="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301620051-88tz4z58bt7.webp" fetchpriority="high">
```

#### FIX 5 — No cargar imagen hover en móvil (ProductCardUI)
**Archivo:** `src/components/ui/ProductCardUI.tsx` líneas 78-86

La imagen de hover (imagen índice 2 del producto) se carga en móvil aunque no haya hover. Se puede agregar una clase CSS para que no exista en móvil:
```tsx
{!logic.matchingVariant?.image && logic.product.images && logic.product.images.length > hoverImageIndex && (
  <img
    src={logic.product.images[hoverImageIndex]}
    alt={`${logic.product.title} - vista alternativa`}
    loading="lazy"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 hidden md:block"  // ← agregar hidden md:block
  />
)}
```

### Impacto esperado:
- Fix 1 (fonts): FCP 3.5s → ~1.5s, LCP mejora ~1-2s
- Fix 2 (carousel): -2.5 MB red, LCP mejora ~1-2s  
- Fix 3+4 (fetchpriority): LCP mejora adicional ~0.5s
- Fix 5 (hover img): -~150 KB por card en móvil

**Estimado post-fix: score 80-88/100** (de 67 actual)

## 4. Recent Changes
- **2026-06-01** — Diagnóstico performance móvil /coleccion-acordeon: score 67. Plan de 5 fixes identificado.
- **2026-05-29** — Fix carousel móvil (ProductPageUI.tsx): `setApi`, `carouselApi?.scrollTo(0)` en useEffect al cambiar variante
- **2026-05-29** — Identificado bug: carrusel móvil en PDP no resetea a imagen 1 al cambiar variante
- **2026-05-28** — Diagnóstico: nombre/apellido/teléfono llegan null en clients-upsert (stale state bug en onAddressChange)
- **2026-05-28** — Fix clients-upsert keystroke: blur pattern en CheckoutAdapter + CheckoutUI + StripePayment
- **2026-05-26** — AnnouncementBar.tsx + ProductFAQ.tsx: Entrega cambiada de 10-15 a 5-7 días hábiles
- **2026-05-26** — ProductFAQ.tsx: Eliminado "Protección de acrílico 3mm" de FAQ "¿El marco viene incluido?"
- **2026-05-25** — ThankYou.tsx: Fix 1 variant_name con URLs → cleanVariantName() aplicado
- **2026-05-25** — ThankYou.tsx: Fix 2 upsell → ahora usa colección top-sellers en lugar de productos genéricos
- **2026-05-25** — App.tsx: agregadas rutas `/gracias` y `/gracias/:orderId` → ThankYou (fix 404 post-pago)
- **2026-05-25** — `link` removido de `buildPaymentMethodTypes` en StripePayment.tsx. Payload ahora: `["card", "oxxo", "customer_balance"]` (sin link)
- **2026-05-25** — `cleanVariantName()` en CheckoutUI.tsx (desktop + mobile)
- **2026-05-25** — ECE `onReady` en StripePayment.tsx: `eceAvailable` state, separador "o" condicional
- **2026-05-25 Buy Now fix** — `useCheckout.ts` acepta `directItems?: any[]`
- **2026-05-25 Checkout restaurado (5 archivos)** — StripePayment.tsx, CheckoutUI.tsx, CheckoutAdapter.tsx, useCheckout.ts, checkout.ts

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- **CollectionAcordeon HERO_IMAGE**: `...1779296069343-1i4gabj0it4.webp`
- **CollectionAcordeon EDITORIAL_IMAGE**: `...product-images/.../acordeon.webp`
- Logo: `/public/logo.svg`
- **About Studio 1**: `...1779325504866-5bg4llquutd.webp`
- **About Studio 2**: `...1779325504867-4wurhzmqhfg.webp`
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12)

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente

## 7. Pending / Future Sessions
- **[ALTA]** Fix clients-upsert: nombre/apellido/teléfono no llegan (CheckoutAdapter + CheckoutUI)
- **[ALTA]** Performance móvil: 5 fixes identificados (ver Sección 3)
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip