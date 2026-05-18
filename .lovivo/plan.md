# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico

## 3. Active Plan — ✅ PDP CRO Upgrade IMPLEMENTADO

### Qué se construyó (2026-05-19)
1. **`src/components/ProductReviews.tsx`** — componente nuevo completo:
   - Rating hero (número grande + estrellas)
   - Barras de distribución 5★ → 1★
   - Grid de reviews (3 visibles, botón "Ver todas")
   - Cards con: autor, fecha, estrellas, texto en itálica, badge "Compra verificada", variante
   - Oculto automáticamente si reviewCount === 0

2. **`src/pages/ui/ProductPageUI.tsx`** — 4 mejoras:
   - **Badge urgencia** "🔴 Edición Limitada · Pocas piezas disponibles" (detección por título/tags/product_type)
   - **Star rating inline** bajo precio → link a #reviews
   - **Craftsmanship story** (3 columnas: 🤲 Hecho a mano / 📐 Papel de calidad / 📦 Empaque seguro) reemplazó el grid 2×2
   - **`<ProductReviews productSlug={product.slug} />`** agregado antes de FAQ en secciones Plieggo

### Pendiente / próxima sesión
- Más fotos de producto (Luna Beige tiene solo 1 imagen)
- Revisar layout mobile post-cambios

## 4. Recent Changes
- **2026-05-19 CRO PDP** — Implementadas 4 mejoras: badge urgencia, star rating inline, craftsmanship story, sección de reseñas completa (ProductReviews.tsx)
- **2026-05-18 ANÁLISIS** — PDP CRO audit completo. Reviews existen en data files pero NO se muestran. Plan guardado.
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI (antes de early returns); violaba Rules of Hooks → pantalla en blanco
- **2026-05-18 BUG FIX** — `CrossSellSection` recibía props incorrectos (`currentProductId`/`currentCollectionIds`); componente espera `currentProduct: Product` → error `Cannot read properties of undefined (reading 'id')`
- **2026-05-18 BUG FIX** — `ProductFAQ` e `InspirationCarousel` ya no reciben `productId` (no forma parte de su interfaz)
- **Ronda 3 completa** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell), tiempos 10-15 días hábiles
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP
- **6 archivos de apoyo nuevos** — subscription-utils, seo/jsonld, SEO, CartAppliedRules, VolumeBadge, BOGOLabel
- **react-intersection-observer** — instalado para useInView en ProductPageUI
- **Ronda 2 completa** — 5 archivos creados/actualizados para migración Stripe

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle para mejorar conversión

## 7. Pending / Future Sessions
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Evaluar A/B test del badge de urgencia vs. sin badge (cuando haya volumen suficiente)