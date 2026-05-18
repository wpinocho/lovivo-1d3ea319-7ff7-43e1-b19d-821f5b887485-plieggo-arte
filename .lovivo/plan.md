# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico

## 3. Active Plan — Migración Checkout Stripe ✅ COMPLETA
Todas las rondas completadas.

### Ronda 1 ✅
- `SettingsContext.tsx` — stripeAccountId, chargeType, paymentMethods, shippingCoverageV2
- `country-codes.ts` — countryNameToCode / countryCodeToName

### Ronda 2 ✅
- `StripePayment.tsx` — PaymentElement + LinkAuth + AddressElement + ExpressCheckoutElement
- `ProductExpressCheckout.tsx` — lazy-mount con IntersectionObserver
- `stripe-appearance.ts` — tokens CSS → Stripe Elements
- `phone-utils.ts` — isValidPhone
- `MissingPhoneDialog.tsx` — fallback cuando Google Pay no retorna teléfono

### Ronda 3 ✅
- `CheckoutUI.tsx` — integrado con nuevos props de StripePayment
- `ProductPageUI.tsx` — ProductExpressCheckout + SEO + ProductFAQ + InspirationCarousel + CrossSellSection

### Archivos de apoyo creados en Ronda 3
- `src/lib/subscription-utils.ts` — intervalLabel()
- `src/lib/seo/jsonld.ts` — productJsonLd, breadcrumbJsonLd, plainText
- `src/components/SEO.tsx` — meta/OG/canonical/JSON-LD dinámico
- `src/components/ui/CartAppliedRules.tsx` — descuentos automáticos en checkout
- `src/components/ui/VolumeBadge.tsx` — badge de descuento por volumen
- `src/components/ui/BOGOLabel.tsx` — badge BOGO/2×1

## 4. Recent Changes
- **Ronda 3 completa** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell), tiempos 10-15 días hábiles
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP
- **6 archivos de apoyo nuevos** — subscription-utils, seo/jsonld, SEO, CartAppliedRules, VolumeBadge, BOGOLabel
- **react-intersection-observer** — instalado para useInView en ProductPageUI
- **Ronda 2 completa** — 5 archivos creados/actualizados para migración Stripe
- **stripe-appearance.ts** — lee CSS variables en runtime
- **MissingPhoneDialog** — fallback Shopify-style cuando Google Pay no entrega teléfono
- **ProductExpressCheckout** — lazy-mount con IntersectionObserver
- **StripePayment** — ExpressCheckoutElement + LinkAuthElement + AddressElement modo deferred
- **Tiempos de envío actualizados a 10-15 días hábiles** — AnnouncementBar, ProductFAQ, StripePayment
- **Navbar scrolled gradient suavizado**
- **AnnouncementBar** — linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)
- **Footer** — linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- `react-intersection-observer` recién instalado — verificar que el build pase correctamente

## 7. Pending / Future Sessions
- Verificar que el build compile sin errores tras la migración completa
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Considerar añadir reseñas/reviews section en ProductPageUI si se requiere