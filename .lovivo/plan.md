# Plieggo — Estado del Proyecto

## Current State
Tienda ecommerce de arte en papel (cuadros de origami) con diseño premium implementado. Layout: AnnouncementBar fijo en header, hero section 100dvh, diseño tipo Zara Home / Muji.

## User Preferences
- Diseño premium, sutil y profesional — nada genérico
- On-brand con arte en papel / origami
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones

## Active Plan — Migración Checkout Stripe (3 rondas)
**Estado:** Ronda 2 completada ✅ | Pendiente: Ronda 3

### Ronda 1 ✅ — Contextos y utilidades base
- `src/contexts/SettingsContext.tsx` — actualizado
- `src/lib/country-codes.ts` — actualizado

### Ronda 2 ✅ — Componentes Stripe
- `src/components/StripePayment.tsx` — reemplazado (PaymentElement + LinkAuth + AddressElement + ExpressCheckoutElement)
- `src/components/ProductExpressCheckout.tsx` — nuevo (PaymentRequestButton para PDP)
- `src/lib/stripe-appearance.ts` — nuevo (appearance tokens desde CSS vars)
- `src/lib/phone-utils.ts` — nuevo (isValidPhone)
- `src/components/MissingPhoneDialog.tsx` — nuevo (fallback dialog cuando Google Pay no retorna teléfono)

### Ronda 3 🔜 — UI pages
- `src/pages/ui/CheckoutUI.tsx` — integrar con nuevos props de StripePayment
- `src/pages/ui/ProductPageUI.tsx` — agregar ProductExpressCheckout en PDP

## Recent Changes
- **Ronda 2 completa** — 5 archivos creados/actualizados para migración Stripe
- **stripe-appearance.ts** — lee CSS variables en runtime para mantener sync con design system
- **MissingPhoneDialog** — fallback Shopify-style cuando Google Pay no entrega teléfono
- **ProductExpressCheckout** — lazy-mount con IntersectionObserver, solo botón si hay wallet real (no Link guest)
- **StripePayment** — ExpressCheckoutElement + LinkAuthElement + AddressElement modo deferred
- **Tiempos de envío actualizados a 10-15 días hábiles** — AnnouncementBar, ProductFAQ, StripePayment
- **Navbar scrolled gradient suavizado** — rgba(255,252,245,0.98) → rgba(242,239,228,0.95)
- **Secciones completamente transparentes** — Removidos todos los bg-muted/30
- **Bug fix: gradiente de body oculto** — PageTemplate tenía bg-background tapando el gradiente
- **AnnouncementBar** — linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)
- **Footer** — linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Ronda 3 pendiente: CheckoutUI.tsx y ProductPageUI.tsx necesitan integrarse con los nuevos componentes