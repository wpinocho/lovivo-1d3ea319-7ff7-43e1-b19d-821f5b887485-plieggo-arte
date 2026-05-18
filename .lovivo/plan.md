# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico

## 3. Active Plan — Migración Checkout Stripe ✅ COMPLETA

## 4. Recent Changes
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

## 7. Pending / Future Sessions
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Considerar añadir reseñas/reviews section en ProductPageUI si se requiere