# Store Plan — Plieggo

## Current State
Tienda funcional con colecciones (Espacio, Estrellas, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)

## User Preferences
No es programador — necesita guía paso a paso muy clara
Quiere ir en chunks testeables, no todo de golpe

## Migración Bundles + Price Rules — COMPLETADO ✅
Todo el Paso 7 (UI Integration) está implementado:
- BundleCard, PriceRuleBadge, CartSidebar, IndexUI, CartAdapter — funcionando

---

## Feature: Mix & Match Bundles (Tipos 3 y 4) — COMPLETADO ✅

### Lo implementado:
1. ✅ `src/lib/supabase.ts` — Bundle type actualizado con: `bundle_type`, `source_collection_id`, `pick_quantity`, `variant_filter`
2. ✅ `src/hooks/useBundles.ts` — SELECT actualizado para traer los 4 campos nuevos
3. ✅ `src/hooks/useCollectionProducts.ts` — NUEVO hook: fetch de productos de una colección por collectionId
4. ✅ `src/components/BundlePicker.tsx` — NUEVO componente principal: grid de productos seleccionables con progreso y CTA
5. ✅ `src/components/MixMatchBundleCard.tsx` — NUEVA tarjeta con botón "Armar" que abre el BundlePicker
6. ✅ `src/pages/ui/IndexUI.tsx` — Render condicional por bundle_type: mix_match→MixMatchBundleCard, fixed→BundleCard

### Flujo de mix_match:
- Backend detecta automáticamente los ítems del carrito que coinciden con el bundle
- El descuento aparece en `applied_rules` en el resumen del checkout (ya funciona)
- `CartContext.addItem` se llama una vez por cada producto seleccionado (items individuales normales)

### Notas técnicas:
- `bundle_type = 'mix_match'`: elige cualquier producto de la colección
- `bundle_type = 'mix_match_variant'`: filtra por `variant_filter` (ej. "30x90"), agrega con la variante específica
- `pick_quantity`: número exacto de productos que el cliente debe elegir (default: 2)
- Tipo `'collection_fixed'`: el backend lo maneja solo, no requiere UI nueva

## Known Issues
- Ninguno conocido actualmente

## Próximos pasos opcionales
- Página dedicada `/paquetes` con todos los bundles (SEO)
- Tests end-to-end del flujo completo: picker → carrito → checkout → applied_rules