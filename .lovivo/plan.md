# Plieggo — Plan de Proyecto

## Estado Actual
Tienda de cuadros de papel plegado (origami/acordeón). React + Supabase.
Diseño: colores primario (terracota), secundario "Vino Burdeos", crema de fondo.

## Cambios Recientes

### Fix descuento de bundle en checkout ✅
**Bug:** `CheckoutAdapter.tsx` no importaba `backendDiscountAmount` ni `appliedRules` de `useCheckout`, por lo que el `finalTotal` no descontaba los descuentos automáticos del backend (bundles, volumen, etc.). El checkout mostraba $7,000 en lugar de $5,600.

**Fix:**
1. `CheckoutAdapter.tsx` → desestructura `appliedRules` y `backendDiscountAmount` de `useCheckout()`, los incluye en el `finalTotal` y en el objeto retornado.
   - `finalTotal = summaryTotal - discountAmount - backendDiscountAmount + shippingCost`
2. `CheckoutUI.tsx` → muestra cada `appliedRule` como línea de descuento verde en el resumen de totales.

### Fix `useCollectionProducts.ts` ✅
**Bug raíz:** El hook usaba un join PostgREST que fallaba con `PGRST200`.
**Fix:** Consulta en dos pasos: `collection_products` → `product_id[]`, luego `products.in('id', productIds)`.

### Fix WhatsApp en bundle page ✅
WhatsApp tapaba el sticky CTA de compra en móvil en la página de bundle.
Fix: `hideOnMobile={isProductPage || isBundlePage}` en EcommerceTemplate.tsx

### Sistema de Bundles — BundlePageUI.tsx ✅ COMPLETADO
Rediseño completo de la página de bundle con UX correcto por tipo:

**`fixed`** — Paquete cerrado con productos predefinidos
**`collection_fixed`** — El usuario elige N productos de una colección (picker con contadores +/−)
**`mix_match` / `mix_match_variant`** — Tarjetas toggle, máximo 1 de cada producto

## Preferencias del Usuario
- Idioma: Español
- Diseño: crema, terracota (primary), vino burdeos (secondary)
- Componentes limpios, bien organizados
- Sin hardcode de datos — siempre desde DB

## Archivos Clave
- `src/adapters/CheckoutAdapter.tsx` — Lógica del checkout (adapter/headless)
- `src/hooks/useCheckout.ts` — Hook de checkout; exporta `appliedRules` y `backendDiscountAmount`
- `src/hooks/useOrderItems.ts` — Items del orden + totales
- `src/pages/ui/CheckoutUI.tsx` — UI del checkout
- `src/pages/ui/BundlePageUI.tsx` — UI completa de página de bundle
- `src/hooks/useCollectionProducts.ts` — Fetch products from collection (fix: 2-step query)
- `src/templates/EcommerceTemplate.tsx` — Layout global con WhatsApp hide logic