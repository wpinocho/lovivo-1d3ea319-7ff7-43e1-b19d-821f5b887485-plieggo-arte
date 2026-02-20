# Store Plan — Plieggo

## Current State
Tienda funcional con colecciones (Espacio, Estrellas, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)

## User Preferences
No es programador — necesita guía paso a paso muy clara
Tiene acceso al GitHub del repo-template actualizado
Quiere ir en chunks testeables, no todo de golpe

## Migración Bundles + Price Rules — COMPLETADO ✅
Todo el Paso 7 (UI Integration) está implementado:
- BundleCard, PriceRuleBadge, CartSidebar, IndexUI, CartAdapter — funcionando

---

## Feature: Mix & Match Bundles (Tipos 3 y 4)

### Contexto técnico (recomendación del backend)
- Tipo 2 (Collection Fixed): el backend ya lo maneja solo, NO requiere cambios en el front
- Tipos 3 y 4 (mix_match / mix_match_variant): necesitan UI nueva en el storefront
- Clave importante: los items de mix_match van al carrito como productos NORMALES individuales (NO como bundle). El backend auto-detecta el patrón y aplica el descuento en checkout-create.

### Campos nuevos en tabla bundles (ya existen en backend):
- bundle_type: 'fixed' | 'collection_fixed' | 'mix_match' | 'mix_match_variant'
- source_collection_id: UUID de la colección de origen
- pick_quantity: número de productos que el cliente debe elegir
- variant_filter: string opcional (e.g. "30x90") para filtrar variantes específicas

---

## Plan de Implementación

### Paso 1 — Actualizar tipo Bundle en supabase.ts
Añadir los campos nuevos al type Bundle:
```
bundle_type?: 'fixed' | 'collection_fixed' | 'mix_match' | 'mix_match_variant'
source_collection_id?: string
pick_quantity?: number
variant_filter?: string
```

### Paso 2 — Actualizar useBundles.ts
- Añadir campos nuevos al SELECT: bundle_type, source_collection_id, pick_quantity, variant_filter
- Añadir hook useMixMatchBundles() que filtra bundle_type IN ('mix_match', 'mix_match_variant')
- El hook useBundles() existente puede seguir igual (filtra solo fixed para la sección de paquetes fijos)
- O alternativamente: useBundles devuelve todos y el componente filtra por tipo

### Paso 3 — Crear hook useCollectionProducts(collectionId)
En src/hooks/useCollectionProducts.ts:
- Fetch de collection_products WHERE collection_id = collectionId JOIN products
- Retorna: products[], loading
- Si hay variant_filter, exponer también función filterByVariant(products, variantFilter)

### Paso 4 — Crear componente BundlePicker (el componente principal)
En src/components/BundlePicker.tsx:
- Props: bundle (con pick_quantity, source_collection_id, variant_filter, bundle_price, compare_at_price, title)
- Internamente usa useCollectionProducts(bundle.source_collection_id)
- Si variant_filter existe, filtra los productos que tengan esa variante disponible
- UI: Modal/Sheet con grid de productos seleccionables
  - Cada producto muestra imagen, título, precio original
  - Click selecciona/deselecciona (con highlight visual)
  - Contador: "Has elegido X de Y" con barra de progreso
  - Botón "Agregar al carrito" disabled hasta que se elijan exactamente pick_quantity productos
  - Header: muestra precio del bundle vs precio normal (ahorro)
- Al confirmar: llama addItem() por cada producto seleccionado (items INDIVIDUALES normales, no bundle)
- Luego abre el carrito (openCart)

### Paso 5 — Crear componente MixMatchBundleCard
En src/components/MixMatchBundleCard.tsx:
- Props: bundle
- Muestra: imagen del bundle (o placeholder con ícono Package), título, descripción
- Badge "Armar paquete" o "Mix & Match"
- Precio del bundle vs precio normal con ahorro
- Texto descriptivo: "Elige 2 acordeones (30x90) y ahorra X%"
- Botón "Armar mi paquete" → abre BundlePicker en un Dialog/Sheet
- Internamente maneja estado isPickerOpen

### Paso 6 — Actualizar IndexUI
- En la sección "Paquetes especiales" actual, separar en dos subsecciones:
  a) Bundles fijos (tipo fixed): usa BundleCard existente
  b) Mix & Match: usa MixMatchBundleCard
- O mostrar todos juntos con useBundles() que devuelva todos los tipos
- Renderizar condicionalmente: si bundle.bundle_type es mix_match → MixMatchBundleCard, si no → BundleCard

### Paso 7 — Opcionalmente: página dedicada /paquetes
En src/pages/Bundles.tsx (nuevo):
- Muestra todos los bundles activos (fijos + mix_match)
- Útil para SEO y para dar más espacio visual
- Agregar link en navegación

---

## Archivos a modificar/crear
- src/lib/supabase.ts → añadir campos al type Bundle
- src/hooks/useBundles.ts → añadir campos al SELECT y hook useMixMatchBundles
- src/hooks/useCollectionProducts.ts → NUEVO
- src/components/BundlePicker.tsx → NUEVO (componente principal)
- src/components/MixMatchBundleCard.tsx → NUEVO
- src/pages/ui/IndexUI.tsx → renderizado condicional por bundle_type

## Notas importantes
- El carrito NO necesita lógica especial para mix_match (addItem normal por cada producto)
- El descuento aparece solo en el resumen del checkout (applied_rules) — ya funciona
- El BundlePicker es el 80% del trabajo, el resto es trivial
- Priorizar: supabase.ts → useBundles → useCollectionProducts → BundlePicker → MixMatchBundleCard → IndexUI