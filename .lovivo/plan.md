# Bundle Page UX/UI Redesign — Plieggo

## Estado: ✅ IMPLEMENTADO

### Archivo modificado: `src/pages/ui/BundlePageUI.tsx`

## Qué se implementó

### Lógica por tipo de bundle (todos los 4 tipos correctos)
- `fixed` → items de `bundle_items` table (comportamiento anterior, correcto)
- `collection_fixed` → productos de `source_collection_id` con `variant_filter` JSONB (bug fix: botón ya no está desactivado)
- `mix_match` → picker INLINE en la página con todos los productos de la colección
- `mix_match_variant` → picker INLINE filtrado por `variant_filter`

### Nuevas features
- **Galería de imágenes con thumbnails** — mismo patrón que ProductPageUI
- **Picker INLINE** para mix_match — eliminado el popup Dialog en la página de bundle
- **Progress bar visible** en el hero para mix_match (elegiste X de Y)
- **Progress bar grande** en la sección picker (con estado "¡Listo!")
- **Sticky mobile CTA bar** para mix_match: "X de Y · Agregar — $800"
- **variant_filter JSONB** correctamente manejado: string o `{option_values: ["50cm x 50cm"]}`
- **handleAddCollectionFixed** — usa productos de la colección, no bundle_items
- **Trust strip** (Truck, Award, Clock) al pie del panel derecho
- **pb-28 lg:pb-12** en `<main>` para mix_match (space para sticky bar en móvil)

### Bugs corregidos
- `collection_fixed`: botón ya no está desactivado — ahora carga productos de `useCollectionProducts`
- `variant_filter` JSONB parsing correcto (era tratado como string, era JSONB)
- Eliminada sección "¿Cómo funciona? (3 pasos)" — no agrega valor UX en la página de destino
- Mix & match ahora usa `addBundle` en lugar de `addItem` por producto (precio correcto del bundle)

### No tocado (según plan)
- `BundlePicker.tsx` — sigue usándose en MixMatchBundleCard (las tarjetas de la home)
- `Bundle.tsx` — sin cambios
- `useBundles.ts` — sin cambios
- `useCollectionProducts.ts` — sin cambios

## Notas de arquitectura
- `useCollectionProducts` se llama dentro de `BundlePageUI` con `source_collection_id`
- La selección de mix_match es estado local (`useState` en BundlePageUI)
- `addBundle(bundle, bundleItems)` se usa para todos los tipos — precio del bundle se aplica correctamente en el carrito