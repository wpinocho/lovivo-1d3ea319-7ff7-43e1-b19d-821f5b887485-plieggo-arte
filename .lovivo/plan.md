# Bundle Page — Fix Completo UX/UI por Tipo

## Estado: 🔧 PENDIENTE DE IMPLEMENTAR

## Diagnóstico del bug actual

### Por qué el botón está desactivado
El bundle "Paquete acordeon" es tipo `collection_fixed` con:
- `pick_quantity: 2`
- `variant_filter: {"option_values": ["50cm x 50cm"]}`
- `source_collection_id: "29c3654c-a90c-403c-9b54-de74140671be"`

El botón está desactivado porque `disabled={collectionLoading || collectionFixedItems.length === 0}`.
El array `collectionFixedItems` está vacío porque `filterProductsByVariant` retorna `[]` cuando los productos de la colección NO tienen variantes (o sus variantes no coinciden con "50cm x 50cm"). La función busca en `product.variants || []`, que devuelve `[]` si el producto no tiene variantes → nada pasa el filtro → botón desactivado.

### El problema de UX más profundo
Para `collection_fixed` con `pick_quantity: 2`, el UX actual:
- Muestra una lista estática de productos "incluidos" (toma los primeros N automáticamente)
- Tiene un botón de agregar directo
- **PERO el usuario no puede elegir cuáles 2 acordeones quiere**

Lo correcto: el cliente debe poder SELECCIONAR cuáles 2 productos quiere del bundle (como mix_match).

---

## UX ideal por tipo de bundle

### 1. `fixed` (paquete cerrado)
- Muestra lista estática de productos incluidos (de `bundle_items` table)
- No hay elección — el paquete viene definido
- Single CTA "Agregar paquete al carrito"
- **NO cambia** — ya funciona bien

### 2. `collection_fixed` (elige N de una colección — SE CORRIGE)
- **NUEVO**: Debe ser un PICKER, igual que mix_match
- El cliente elige exactamente `pick_quantity` productos de la colección
- DIFERENCIA con mix_match: permite seleccionar el mismo producto MÁS DE UNA VEZ (ej: 2 del mismo acordeón)
- Se muestra badge con cantidad "×2" en la tarjeta
- Progress bar con "Elegiste X de Y"
- CTA desactivado hasta completar la selección

### 3. `mix_match` y `mix_match_variant`
- PICKER inline con toggle (sin repetir mismo producto)
- Ya está implementado pero se unifica con collection_fixed en la lógica

---

## Cambios a implementar en `BundlePageUI.tsx`

### A) Nueva flag unificada
```typescript
const isPicker = isMixMatch || isCollectionFixed
```

### B) Nuevo estado para selección con cantidades (para collection_fixed permite repetir)
```typescript
// Reemplaza el array `selected` actual
// Map: productKey → { product, variant, quantity }
const [selectionMap, setSelectionMap] = useState<Map<string, { product: Product; variant?: ProductVariant; quantity: number }>>(new Map())

// Total de items seleccionados
const totalSelected = [...selectionMap.values()].reduce((s, e) => s + e.quantity, 0)
const isComplete = totalSelected === pickQuantity
const remaining = pickQuantity - totalSelected
const progress = (totalSelected / pickQuantity) * 100
```

### C) Fix del variant filter — fallback a todos los productos
```typescript
const pickerItems = useMemo<ProductEntry[]>(() => {
  if (!isPicker) return []
  
  if (bundle?.bundle_type === 'mix_match_variant' && bundle?.variant_filter) {
    return filterProductsByVariant(collectionProducts, bundle.variant_filter)
  }
  
  if (isCollectionFixed && bundle?.variant_filter) {
    const filtered = filterProductsByVariant(collectionProducts, bundle.variant_filter)
    // FALLBACK: si el filtro no encuentra nada, mostrar todos los productos
    return filtered.length > 0 ? filtered : collectionProducts.map(p => ({ product: p, variant: undefined }))
  }
  
  return collectionProducts.map(p => ({ product: p, variant: undefined }))
}, [collectionProducts, isPicker, isCollectionFixed, bundle])
```

### D) Nuevas funciones de toggle que soportan cantidades
```typescript
const getProductKey = (product: Product, variant?: ProductVariant) =>
  `${product.id}${variant ? `:${variant.id}` : ''}`

const addPickerItem = (product: Product, variant?: ProductVariant) => {
  if (totalSelected >= pickQuantity) return
  const key = getProductKey(product, variant)
  setSelectionMap(prev => {
    const next = new Map(prev)
    const existing = next.get(key)
    if (existing) {
      next.set(key, { ...existing, quantity: existing.quantity + 1 })
    } else {
      next.set(key, { product, variant, quantity: 1 })
    }
    return next
  })
}

const removePickerItem = (product: Product, variant?: ProductVariant) => {
  const key = getProductKey(product, variant)
  setSelectionMap(prev => {
    const next = new Map(prev)
    const existing = next.get(key)
    if (!existing) return prev
    if (existing.quantity <= 1) {
      next.delete(key)
    } else {
      next.set(key, { ...existing, quantity: existing.quantity - 1 })
    }
    return next
  })
}

// mix_match: toggle (sin repetir)
const toggleMixMatchItem = (product: Product, variant?: ProductVariant) => {
  const key = getProductKey(product, variant)
  const isSelected = selectionMap.has(key)
  if (isSelected) {
    setSelectionMap(prev => { const n = new Map(prev); n.delete(key); return n })
  } else if (totalSelected < pickQuantity) {
    setSelectionMap(prev => new Map(prev).set(key, { product, variant, quantity: 1 }))
  }
}

const onCardClick = (product: Product, variant?: ProductVariant) => {
  if (isCollectionFixed) {
    const key = getProductKey(product, variant)
    const entry = selectionMap.get(key)
    if (entry && entry.quantity > 0) {
      // Si ya tiene, aumentar cantidad (si hay espacio)
      addPickerItem(product, variant)
    } else {
      addPickerItem(product, variant)
    }
  } else {
    toggleMixMatchItem(product, variant)
  }
}
```

### E) Handler unificado para agregar al carrito
```typescript
const handleAddPicker = () => {
  if (!bundle || !isComplete) return
  const bundleItems = [...selectionMap.values()].map(({ product, variant, quantity }) => ({
    product, variant, quantity
  }))
  addBundle(bundle, bundleItems)
  setSelectionMap(new Map())
  setTimeout(() => openCart(), 300)
}
```

### F) Cards del picker — mostrar cantidad + botones +/-
Para `collection_fixed`, cada tarjeta muestra:
- Badge circular con quantity (si > 0): ×1, ×2
- Botón "-" si quantity > 0
- Botón "+" si total < pickQuantity (o siempre, pero desactivado si lleno)
- Si isDisabled (total lleno y este no está seleccionado): opacidad reducida

```jsx
// Inside the picker grid
{pickerItems.map(({ product, variant }) => {
  const key = getProductKey(product, variant)
  const entry = selectionMap.get(key)
  const qty = entry?.quantity ?? 0
  const isItemSelected = qty > 0
  const isDisabled = !isItemSelected && totalSelected >= pickQuantity
  const canAdd = totalSelected < pickQuantity
  
  return (
    <button
      key={key}
      onClick={() => onCardClick(product, variant)}
      disabled={isDisabled && !isCollectionFixed}
      className={cn(
        'relative text-left rounded-xl overflow-hidden border-2 transition-all duration-200 group',
        isItemSelected
          ? 'border-primary ring-2 ring-primary/25 shadow-md'
          : isDisabled
          ? 'border-border opacity-40 cursor-not-allowed'
          : 'border-border hover:border-primary/50 hover:shadow-md cursor-pointer'
      )}
    >
      {/* Image */}
      <div className="aspect-square bg-muted overflow-hidden">
        {image ? <img ... /> : <Package placeholder />}
      </div>
      
      {/* Badge de cantidad (collection_fixed) */}
      {isItemSelected && isCollectionFixed && (
        <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
          <span className="text-xs font-bold text-primary-foreground">×{qty}</span>
        </div>
      )}
      
      {/* Checkmark (mix_match) */}
      {isItemSelected && !isCollectionFixed && (
        <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      {/* +/- controls for collection_fixed */}
      {isCollectionFixed && isItemSelected && (
        <div className="absolute bottom-14 right-2 flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); removePickerItem(product, variant) }}
            className="w-6 h-6 bg-background border border-border rounded-full text-xs font-bold flex items-center justify-center hover:bg-muted">
            −
          </button>
          <button onClick={(e) => { e.stopPropagation(); addPickerItem(product, variant) }}
            disabled={!canAdd}
            className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center disabled:opacity-40">
            +
          </button>
        </div>
      )}
      
      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-1">{product.title}</p>
        <p className="text-sm font-semibold text-foreground">{formatMoney(price || 0)}</p>
      </div>
    </button>
  )
})}
```

### G) Secciones a cambiar

**Hero panel derecho:**
- `isFixed`: sin cambios (muestra lista estática de bundle_items)
- `isPicker` (antes solo isMixMatch): progress bar (igual que ahora pero con `totalSelected` en lugar de `selected.length`)

**Sección inferior:**
- `isFixed`: grid de products incluidos (sin cambios)
- `isCollectionFixed` estático ELIMINADO — ahora usa la sección picker
- `isPicker`: picker inline (igual que isMixMatch ahora, pero con cards que soportan +/-)

**Sticky mobile bar:**
- Cambia de `isMixMatch` a `isPicker`

**CTA Button:**
- `isFixed`: sin cambios
- `isPicker`: `disabled={!isComplete}`, onClick=`handleAddPicker`

### H) Limpiar código obsoleto
- Eliminar `handleAddCollectionFixed` (reemplazado por `handleAddPicker`)
- Eliminar `handleAddMixMatch` (reemplazado por `handleAddPicker`)
- Eliminar `collectionFixedItems` useMemo (reemplazado por `pickerItems`)
- Eliminar `availableItems` useMemo (reemplazado por `pickerItems`)
- Eliminar sección estática "includes" para collection_fixed
- Eliminar `selected` array state (reemplazado por `selectionMap`)

---

## Archivo a modificar
- `src/pages/ui/BundlePageUI.tsx` — cambio completo, reemplazar estado y toda la lógica del picker

## NO tocar
- `src/pages/Bundle.tsx`
- `src/contexts/CartContext.tsx`
- `src/hooks/useCollectionProducts.ts`
- `src/components/BundlePicker.tsx` (sigue usándose en MixMatchBundleCard en la home)
- `src/components/MixMatchBundleCard.tsx`