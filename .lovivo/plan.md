# Store Plan — Plieggo

## Current State
Tienda funcional con colecciones (Espacio, Acordeon, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)
Bundles implementados: BundleCard, MixMatchBundleCard, BundlePicker en IndexUI
Página de bundle implementada: `/bundles/:slug` con BundlePageUI

## User Preferences
No es programador — necesita guía paso a paso muy clara
Quiere ir en chunks testeables, no todo de golpe

---

## Feature: Bundle Card Redesign + Bundle Page — COMPLETADO ✅

### Cambios realizados:

#### Colores rojo → vino (secondary)
- `src/components/ui/BundleCard.tsx`: badges usan `bg-secondary text-secondary-foreground`
- `src/components/MixMatchBundleCard.tsx`: badges usan `bg-secondary text-secondary-foreground`
- `src/components/BundlePicker.tsx`: badge "Ahorras $X" → `bg-secondary/15 text-secondary`
- `src/components/ui/ProductCardUI.tsx`: badge `-X%` en hover overlay → `bg-secondary text-secondary-foreground`

#### BundleCard rediseñada (`src/components/ui/BundleCard.tsx`)
- Hover effects idénticos a ProductCardUI: border-primary, shadow-2xl, -translate-y-2, scale-105 en imagen
- Badges top-right (no top-left) igual que ProductCard
- Botón "Ver paquete →" que navega a `/bundles/${bundle.slug}` (ya no intenta addBundle desde la card)
- Tipografía font-heading/font-body como ProductCardUI

#### MixMatchBundleCard rediseñada (`src/components/MixMatchBundleCard.tsx`)
- Mismos hover effects
- Botón "Armar →" sigue abriendo BundlePicker (comportamiento intacto)

#### Bundle Page creada
- `src/hooks/useBundles.ts`: agregado `useBundle(slug)` hook
- `src/pages/Bundle.tsx`: route component (lazy loaded)
- `src/pages/ui/BundlePageUI.tsx`: página completa con:
  - Breadcrumb: Inicio / Paquetes / {título}
  - Hero 2 columnas: imagen grande + info
  - Precio, compare price, badge "Ahorras $X" en secondary
  - Para fixed: items preview + botón "Agregar paquete al carrito" 
  - Para mix_match: info box + botón "Armar mi paquete" → abre BundlePicker
  - Trust strip: Envío / Hecho a mano / Garantía
  - Sección "Qué incluye" (fixed) o "Cómo funciona" con 3 pasos (mix_match)
  - SEO: JSON-LD, document title, breadcrumb semántico, H1, aria-labels
- `src/App.tsx`: ruta `/bundles/:slug` registrada

### Known Issues
- Si el bundle tipo `fixed` tiene `bundle_items` vacío en DB → botón desactivado (DB issue, no código)
- El usuario debe agregar los items del bundle en el dashboard de Supabase tabla `bundle_items`

## Próximos pasos opcionales
- Página `/paquetes` listando todos los bundles (SEO)
- Tests end-to-end del flujo completo: picker → carrito → checkout → applied_rules