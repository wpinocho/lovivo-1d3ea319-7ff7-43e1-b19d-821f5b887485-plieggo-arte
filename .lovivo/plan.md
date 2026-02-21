# Plieggo — Plan de Proyecto

## Estado Actual
Tienda de cuadros de papel plegado (origami/acordeón). React + Supabase.
Diseño: colores primario (terracota), secundario "Vino Burdeos", crema de fondo.

## Cambios Recientes

### Fix imágenes de variante en bundle picker ✅
**Bug:** En `BundlePageUI.tsx` y `BundlePicker.tsx`, la imagen del picker usaba `variant?.image || product.images?.[0]`. El campo `variant.image` suele estar vacío; las imágenes reales de la variante están en `variant.image_urls[]`.

**Fix:**
1. Agregados dos helpers en `BundlePageUI.tsx`:
   - `resolveImage(product, variant)` → prioridad: `image_urls[0]` → `image` → `product.images[0]`
   - `resolveBundleItemImage(item)` → para bundles `fixed`, busca el variant por `variant_id` y usa `resolveImage`
2. Aplicado `resolveImage` en: picker de `collection_fixed`, picker de `mix_match`, mini-lista "Incluye", grid "Qué incluye este paquete".
3. `BundlePicker.tsx` → actualizado a `variant?.image_urls?.[0] || variant?.image || product.images?.[0]`

### Fix descuento de bundle en checkout ✅
**Bug:** `CheckoutAdapter.tsx` no importaba `backendDiscountAmount` ni `appliedRules` de `useCheckout`, por lo que el `finalTotal` no descontaba los descuentos automáticos del backend.

**Fix:**
1. `CheckoutAdapter.tsx` → desestructura `appliedRules` y `backendDiscountAmount` de `useCheckout()`, los incluye en `finalTotal`.
2. `CheckoutUI.tsx` → muestra cada `appliedRule` como línea de descuento verde en el resumen.

### Fix `useCollectionProducts.ts` ✅
**Bug raíz:** El hook usaba un join PostgREST que fallaba con `PGRST200`.
**Fix:** Consulta en dos pasos: `collection_products` → `product_id[]`, luego `products.in('id', productIds)`.

### Fix WhatsApp en bundle page ✅
WhatsApp tapaba el sticky CTA de compra en móvil.
Fix: `hideOnMobile={isProductPage || isBundlePage}` en EcommerceTemplate.tsx

### Sistema de Bundles — BundlePageUI.tsx ✅ COMPLETADO
Rediseño completo de la página de bundle con UX correcto por tipo:
- **`fixed`** — Paquete cerrado con productos predefinidos
- **`collection_fixed`** — El usuario elige N productos de una colección (picker con contadores +/−)
- **`mix_match` / `mix_match_variant`** — Tarjetas toggle, máximo 1 de cada producto

## Preferencias del Usuario
- Idioma: Español
- Diseño: crema, terracota (primary), vino burdeos (secondary)
- Componentes limpios, bien organizados
- Sin hardcode de datos — siempre desde DB

## Archivos Clave
- `src/pages/ui/BundlePageUI.tsx` — UI completa de página de bundle (helpers resolveImage, resolveBundleItemImage)
- `src/components/BundlePicker.tsx` — Dialog alternativo de bundle picker
- `src/adapters/CheckoutAdapter.tsx` — Lógica del checkout (adapter/headless)
- `src/hooks/useCheckout.ts` — Hook de checkout; exporta `appliedRules` y `backendDiscountAmount`
- `src/hooks/useOrderItems.ts` — Items del orden + totales
- `src/pages/ui/CheckoutUI.tsx` — UI del checkout
- `src/hooks/useCollectionProducts.ts` — Fetch products from collection (fix: 2-step query)
- `src/templates/EcommerceTemplate.tsx` — Layout global con WhatsApp hide logic