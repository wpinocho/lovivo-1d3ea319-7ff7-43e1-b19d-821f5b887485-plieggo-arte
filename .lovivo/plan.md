# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico

## 3. Active Plan — ✅ PDP CRO Round 2 IMPLEMENTADO

### Qué se construyó (2026-05-19 Round 2)
1. **InspirationCarousel.tsx** — renombrado a "Así luce en tu espacio", manual nav con flechas+thumbnails, object-cover (cinematic), sin autoplay
2. **CrossSellSection.tsx** — carrusel horizontal con Embla (basis-[78%] mobile, 1/3 desktop), hasta 6 productos
3. **ProductFAQ.tsx** — agregado FAQ "¿Cómo cuido mi obra?" con los tips de cuidado
4. **ProductPageUI.tsx** — 3 acordeones eliminados, descripción visible siempre, trust strip con 3 íconos (envío/días/garantía), secciones reordenadas: Inspiración → Reviews → FAQ → CrossSell

### Orden final de secciones PDP (de arriba a abajo)
1. Gallery + Info column (existente)
2. Trust strip (Envío / Días / Garantía) — NUEVO, bajo CTA
3. Descripción visible (prose block)
4. Craftsmanship story
5. Selling plans / opciones / CTAs
6. --- Secciones completas ---
7. Inspiración "Así luce en tu espacio" (object-cover, thumbnails)
8. Reviews
9. FAQ (incluyendo Cuidado de tu obra)
10. CrossSell (carrusel)

### Pendiente / próxima sesión
- Más fotos de producto (Luna Beige tiene solo 1 imagen)
- Revisar layout mobile post-cambios

## 4. Recent Changes
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI: 5 mejoras CRO
- **2026-05-19 BUG FIX** — `const product = logic.product` declarada ANTES de usarse. ReferenceError corregido
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx
- **2026-05-18 ANÁLISIS** — PDP CRO audit completo. Reviews existen en data files pero NO se muestran.
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI (antes de early returns)
- **2026-05-18 BUG FIX** — CrossSellSection recibía props incorrectos
- **Ronda 3 completa** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell), tiempos 10-15 días hábiles
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`
- Inspiration images: supabase storage (green-office, black-dining, purple-office, burgundy-kitchen, large-dining)

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle

## 7. Pending / Future Sessions
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Evaluar A/B test del badge de urgencia vs. sin badge (cuando haya volumen suficiente)
- Contador de visitas "👁 127 personas vieron esto" (mencionado en conversación anterior)