# Bundle Page UX/UI Redesign — Plieggo

## Estado actual (problemas identificados)
- `collection_fixed`: Botón desactivado porque el hook solo carga `bundle_items` para tipo `fixed`. Los `collection_fixed` no tienen `bundle_items` — usan `source_collection_id`. Bug real.
- Mix & Match: el picker es un Dialog popup. La industria (Fast Bundle, MOD Bundles, Shopify top apps) lo hace INLINE en la página, no popup.
- Sin thumbnail gallery de imágenes (la página de producto sí tiene).
- Sin sticky CTA bar en móvil (la página de producto sí tiene).
- `variant_filter` se trata como string, pero en DB es JSONB: `{"option_values": ["50cm x 50cm"]}`.
- La sección "Cómo funciona" de 3 pasos no es útil — el usuario ya está en la página, quiere actuar, no leer pasos.

## Shopify Best Practices investigadas
- **Fixed bundles**: hero 2 columnas, lista inline de productos incluidos con checkmarks, 1 CTA claro.
- **Mix & Match**: picker INLINE en la página (no popup), progress bar visible, sticky bottom CTA en móvil que se habilita al completar selección.
- Claridad primero: "Elige 2 cuadros" visible siempre, no solo en un popup.
- Mostrar savings prominentemente: "$1,400 de ahorro" en badge color wine.
- Progress feedback: "1 de 2 seleccionados" con barra de progreso.

## Plan de implementación

### Archivo 1: `src/pages/ui/BundlePageUI.tsx` — Rediseño completo

**Lógica por tipo de bundle:**

```
bundle_type === 'fixed'          → items de bundle_items table
bundle_type === 'collection_fixed' → productos de source_collection_id (filtrados por variant_filter)  
bundle_type === 'mix_match'      → picker inline + productos de source_collection_id
bundle_type === 'mix_match_variant' → picker inline + productos filtrados por variant_filter
```

**Layout nuevo:**

```
┌─────────────────────────────────────────┐
│ HERO (2 columnas)                        │
│ Izq: Imagen grande + thumbnail strip     │
│ Der: Badge, H1, Precio, Descripción      │
│      Items preview (fixed/coll_fixed)    │
│      Progress bar (mix_match)            │
│      [CTA Button grande]                 │
│      Trust strip                         │
├─────────────────────────────────────────┤
│ PICKER SECTION (solo mix_match)          │
│ "Elige tus X productos"                  │
│ [████████░░] 1 de 2 seleccionados        │
│ Grid 2-3 cols con checkmarks             │
├─────────────────────────────────────────┤  
│ INCLUDES SECTION (fixed/coll_fixed)      │
│ "Qué incluye este paquete"               │
│ Grid de cards con imagen y precio        │
└─────────────────────────────────────────┘
│ STICKY BOTTOM BAR (móvil, mix_match)     │
│ "1 de 2 · [Agregar al carrito — $800]"  │
└─────────────────────────────────────────┘
```

**Hooks usados dentro de BundlePageUI:**
- `useCollectionProducts(bundle.source_collection_id)` — para `collection_fixed`, `mix_match`, `mix_match_variant`
- NO usar BundlePicker dialog en la página (mantenemos BundlePicker solo para las cards)
- Manejar selección de productos como estado local (useState en BundlePageUI)

**variant_filter handling:**
```ts
// variant_filter puede ser string o JSONB {option_values: ["50cm x 50cm"]}
const getFilterValues = (vf: any): string[] => {
  if (!vf) return []
  if (typeof vf === 'string') return [vf]
  if (vf.option_values) return vf.option_values
  return []
}
```

**Función filterProductsByVariant:**
```ts
const filterProductsByVariant = (products, variantFilter) => {
  const filters = getFilterValues(variantFilter)
  if (filters.length === 0) return products.map(p => ({product: p, variant: undefined}))
  
  return products.flatMap(product => {
    const matchingVariants = product.variants?.filter(v =>
      filters.some(f => 
        v.title?.includes(f) ||
        Object.values(v.option_values || {}).some(val => String(val).includes(f))
      )
    ) || []
    return matchingVariants.length > 0
      ? matchingVariants.map(variant => ({ product, variant }))
      : []
  })
}
```

**Add to cart para collection_fixed:**
```ts
// Para collection_fixed, agregar los primeros pick_quantity productos filtrados
const handleAddCollectionFixed = () => {
  const filtered = filterProductsByVariant(collectionProducts, bundle.variant_filter)
  const toAdd = filtered.slice(0, bundle.pick_quantity ?? filtered.length)
  const bundleItems = toAdd.map(({product, variant}) => ({
    product,
    variant,
    quantity: 1
  }))
  addBundle(bundle, bundleItems)
  setTimeout(() => openCart(), 300)
}
```

**Estado de selección para mix_match (inline, sin dialog):**
```ts
const [selected, setSelected] = useState<{product: Product; variant?: ProductVariant}[]>([])
const pickQuantity = bundle.pick_quantity ?? 2
const isComplete = selected.length === pickQuantity
const progress = (selected.length / pickQuantity) * 100

const toggleItem = (product, variant) => {
  const isSelected = selected.some(s => s.product.id === product.id)
  if (isSelected) {
    setSelected(prev => prev.filter(s => s.product.id !== product.id))
  } else if (selected.length < pickQuantity) {
    setSelected(prev => [...prev, { product, variant }])
  }
}
```

**CTA button text logic:**
```ts
const remaining = pickQuantity - selected.length
const ctaText = isMixMatch
  ? isComplete
    ? `Agregar al carrito — ${formatMoney(bundle.bundle_price)}`
    : `Elige ${remaining} ${remaining === 1 ? 'producto' : 'productos'} más`
  : 'Agregar paquete al carrito'
```

**Image gallery con thumbnails (como ProductPageUI):**
```tsx
const [selectedImage, setSelectedImage] = useState<string | null>(null)
const mainImage = selectedImage || bundle.images?.[0] || null
const hasMultipleImages = (bundle.images?.length ?? 0) > 1
```

**Trust strip (reutilizar los mismos iconos que ProductPageUI):**
- Truck: "Envío a todo México"
- Award: "Hecho a mano"  
- Clock: "Entrega garantizada"

**Sticky mobile CTA (solo mix_match, solo móvil):**
```tsx
// Solo en mix_match + móvil
{isMixMatch && (
  <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border p-4 flex items-center gap-3">
    <div className="flex-1 text-sm">
      <span className="font-semibold">{selected.length} de {pickQuantity}</span>
      <span className="text-muted-foreground ml-1">seleccionados</span>
    </div>
    <Button
      disabled={!isComplete}
      onClick={handleAddMixMatch}
      className="shrink-0"
    >
      {isComplete ? `Agregar — ${formatMoney(bundle.bundle_price)}` : `Elige ${remaining} más`}
    </Button>
  </div>
)}
```

### Archivo 2: `src/pages/Bundle.tsx` — Sin cambios (la lógica de carga de colección se mueve al UI)

Ya que `useCollectionProducts` se llamará dentro de `BundlePageUI` con el `source_collection_id` del bundle, no necesitamos cambiar Bundle.tsx.

### Archivo 3: `src/hooks/useBundles.ts` — Sin cambios necesarios

El hook `useBundle` ya carga los datos correctos del bundle. El problema era que solo hacía fetch de `bundle_items` para `fixed`. Esto ya está bien porque `collection_fixed` no tiene bundle_items — sus productos vienen de la colección (manejado en UI).

## Checklist de implementación
- [ ] BundlePageUI: Image gallery con thumbnails
- [ ] BundlePageUI: Detectar todos los 4 tipos correctamente
- [ ] BundlePageUI: `useCollectionProducts` para collection_fixed, mix_match, mix_match_variant
- [ ] BundlePageUI: `variant_filter` JSONB handling correcto
- [ ] BundlePageUI: Inline picker para mix_match (sin Dialog)
- [ ] BundlePageUI: Progress bar visible en hero para mix_match
- [ ] BundlePageUI: Sticky mobile CTA bar para mix_match
- [ ] BundlePageUI: handleAddCollectionFixed con productos de colección
- [ ] BundlePageUI: Eliminar dependencia de BundlePicker en la página (seguir usándolo en las cards)
- [ ] BundlePageUI: Trust strip igual al de ProductPageUI
- [ ] BundlePageUI: pb-24 en móvil para mix_match (space para sticky bar)

## Notas importantes
- BundlePicker.tsx: NO tocar — sigue usándose en MixMatchBundleCard (las tarjetas de la home)
- La página de bundle para mix_match tiene su propio estado de selección inline
- El diseño de Plieggo (colores, tipografías) se respeta exactamente
- Eliminar la sección "¿Cómo funciona? (3 pasos)" — no agrega valor UX en la página de destino