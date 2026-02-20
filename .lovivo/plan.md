# Plieggo — Plan de Proyecto

## Estado Actual
Tienda de cuadros de papel plegado (origami/acordeón). React + Supabase.
Diseño: colores primario (terracota), secundario "Vino Burdeos", crema de fondo.

## Cambios Recientes

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
- **Fix crítico:** `filterProductsByVariant` ahora tiene fallback — si no hay variantes que coincidan, muestra todos los productos de la colección (soluciona el botón desactivado)

**`mix_match` / `mix_match_variant`** — El usuario elige N productos distintos
- Tarjetas toggle (seleccionar/deseleccionar)
- Máximo 1 de cada producto
- Checkmark cuando está seleccionado
- Progress bar en hero + sección picker
- Sticky mobile bar

**Cambios técnicos:**
- `filterProductsByVariant`: fallback a todos los productos si ninguna variante coincide
- Estado separado: `mmSelected[]` para mix_match, `cfCounts{}` para collection_fixed
- Botón CTA unificado con lógica condicional
- Sticky mobile bar compartida para ambos tipos picker
- `getItemKey(product, variant)` — función helper para keys consistentes

## Preferencias del Usuario
- Idioma: Español
- Diseño: crema, terracota (primary), vino burdeos (secondary)
- Componentes limpios, bien organizados
- Sin hardcode de datos — siempre desde DB

## Archivos Clave
- `src/pages/ui/BundlePageUI.tsx` — UI completa de página de bundle (recién reescrita)
- `src/pages/Bundle.tsx` — Route component (no tocar)
- `src/hooks/useBundles.ts` — Fetch bundle by slug
- `src/hooks/useCollectionProducts.ts` — Fetch products from collection
- `src/contexts/CartContext.tsx` — addBundle, CartItem types