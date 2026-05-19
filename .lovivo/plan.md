# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis (Hand, Layers, Package, Truck, Clock, RotateCcw de lucide-react)

## 3. Active Plan
CRO Round 4 completado. Sin tareas activas.

## 4. Recent Changes
- **2026-05-19 CRO Round 4** — PDP móvil UX:
  1. "Seguir comprando" ocultado en móvil (solo desktop)
  2. Selector de cantidad rediseñado — pill/rounded compacto, menos prominente
  3. CTAs (Comprar ahora + Agregar al carrito) movidos justo después de cantidad
  4. Trust strip reposicionada debajo de los CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos:
  1. ProductPageUI: rating arriba del precio (confianza antes del precio)
  2. ProductPageUI: descripción movida encima del craftsmanship story
  3. ProductPageUI: emojis 🤲📐📦 → Hand/Layers/Package SVG terracota (#C16648)
  4. ProductPageUI: emojis 🚚📅↩️ → Truck/Clock/RotateCcw SVG terracota (#C16648)
  5. ProductFAQ: reducido de 9 → 5 FAQs (marco, colgar, envío, personalización, cuidados)
  6. CrossSellSection: object-cover → object-contain (cuadros no recortados)
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI
- **Ronda 3 checkout** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell)
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`
- Inspiration images: supabase storage (green-office, black-dining, purple-office, burgundy-kitchen, large-dining)

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- Descripción del producto (copy) se edita desde Dashboard, no desde código

## 7. Pending / Future Sessions
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[ALTA]** Mejorar copy de descripción de productos desde Dashboard
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Evaluar A/B test del badge de urgencia vs. sin badge (cuando haya volumen suficiente)
- Contador de visitas "👁 127 personas vieron esto"