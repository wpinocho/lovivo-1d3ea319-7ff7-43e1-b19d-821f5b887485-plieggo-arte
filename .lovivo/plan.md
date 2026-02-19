Store Plan — Plieggo

## Current State
Tienda funcional con colecciones (Espacio, Estrellas, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)

## User Preferences
No es programador — necesita guía paso a paso muy clara
Tiene acceso al GitHub del repo-template actualizado
Quiere ir en chunks testeables, no todo de golpe

## Migración Bundles + Price Rules — Estado actual

### ✅ Paso 1 — Tipos en supabase.ts
AppliedRule, Bundle, BundleItem, PriceRule + applied_rules en Order — YA ESTABAN presentes

### ✅ Paso 2 — Archivos nuevos (creados)
- src/lib/cart-utils.ts
- src/hooks/useBundles.ts
- src/hooks/usePriceRules.ts
- src/components/ui/BundleCard.tsx
- src/components/ui/PriceRuleBadge.tsx

### ✅ Paso 3 — CartContext.tsx (bundle support)
Union types + ADD_BUNDLE action + addBundle method + normalizeItem + getItemPrice

### ✅ Paso 4 — checkout.ts
- Importa cartToApiItems de @/lib/cart-utils ✓
- Usa cartToApiItems(cartItems) en createCheckoutFromCart ✓
- CheckoutUpdateResponse tiene applied_rules y discount_amount ✓

### ✅ Paso 5 — useOrderItems.ts
- mergeResponseIntoCache definida como función standalone al inicio del archivo ✓
- Llamada en removeItem (rama order_items top-level) ✓
- Llamada en updateQuantity (rama order_items top-level) ✓

### ✅ Paso 6 — useCheckout.ts
- appliedRules usa prioridad correcta: lastOrder?.order?.applied_rules ?? checkoutState?.order?.applied_rules ?? [] ✓

### ✅ Paso 7 — UI Integration (COMPLETADO)

1. **IndexUI** — sección "Paquetes especiales" con BundleCard grid (solo visible si hay bundles activos)
2. **ProductCard** — llama usePriceRules() y pasa priceRules a ProductCardUI
3. **ProductCardUI** — acepta prop priceRules y renderiza PriceRuleBadge debajo del título
4. **CartSidebar** — renderizado diferenciado: bundle items con nombre de paquete + lista de productos internos; product items sin cambios
5. **CartAdapter** — addBundle exportado en useCartLogic()

## Suggested Next Steps
- Crear bundles y price rules desde el Dashboard para probar la UI
- Verificar que la sección de bundles aparece en Index cuando hay bundles activos
- Ajustar estilos si hace falta