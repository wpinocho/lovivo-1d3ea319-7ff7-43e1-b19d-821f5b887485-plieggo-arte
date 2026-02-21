# Plieggo — Plan de Proyecto

## Estado Actual
Tienda de cuadros de papel plegado (origami/acordeón). React + Supabase.
Diseño: colores primario (terracota), secundario "Vino Burdeos", crema de fondo.

## Cambios Recientes

### Fix `useCollectionProducts.ts` ✅
**Bug raíz:** El hook usaba un join PostgREST (`select('products (id, ...)')`) que fallaba con error `PGRST200` porque Supabase no encontraba la relación foreign key en el schema cache.

**Fix:** Cambio a consulta en dos pasos:
1. `collection_products` → obtiene `product_id[]`
2. `products.in('id', productIds)` → obtiene los productos

### Fix WhatsApp en bundle page ✅
WhatsApp tapaba el sticky CTA de compra en móvil en la página de bundle.
Fix: `hideOnMobile={isProductPage || isBundlePage}` en EcommerceTemplate.tsx
`isBundlePage = location.pathname.startsWith('/bundles/')`

### Sistema de Bundles — BundlePageUI.tsx ✅ COMPLETADO
Rediseño completo de la página de bundle con UX correcto por tipo:

**`fixed`** — Paquete cerrado con productos predefinidos
- Mini lista "Incluye" en el hero panel
- Grid "Qué incluye" debajo con imágenes
- Botón directo sin selección requerida

**`collection_fixed`** — El usuario elige N productos de una colección ✅ NUEVO
- Picker con tarjetas de producto + contador `[− | 0 | +]` por tarjeta
- Total seleccionado debe igualar `pick_quantity`
- Permite seleccionar múltiples unidades del mismo producto
- Progress bar en hero + sección picker con progreso repetido
- Sticky mobile bar

**`mix_match` / `mix_match_variant`** — El usuario elige N productos distintos
- Tarjetas toggle (seleccionar/deseleccionar)
- Máximo 1 de cada producto
- Checkmark cuando está seleccionado
- Progress bar en hero + sección picker
- Sticky mobile bar

**`filterProductsByVariant`**: fallback a todos los productos si ninguna variante coincide

## Preferencias del Usuario
- Idioma: Español
- Diseño: crema, terracota (primary), vino burdeos (secondary)
- Componentes limpios, bien organizados
- Sin hardcode de datos — siempre desde DB

## Archivos Clave
- `src/pages/ui/BundlePageUI.tsx` — UI completa de página de bundle
- `src/pages/Bundle.tsx` — Route component (no tocar)
- `src/hooks/useBundles.ts` — Fetch bundle by slug
- `src/hooks/useCollectionProducts.ts` — Fetch products from collection (fix: 2-step query)
- `src/contexts/CartContext.tsx` — addBundle, CartItem types
- `src/templates/EcommerceTemplate.tsx` — Layout global con WhatsApp hide logic