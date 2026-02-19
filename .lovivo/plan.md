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

### ⬜ Paso 7 — UI Integration (SIGUIENTE PASO)
Pendiente de implementar. Adaptaciones específicas al diseño de Plieggo:

1. **IndexUI** (`src/pages/ui/IndexUI.tsx`)
   - Importar useBundles() y BundleCard
   - Agregar sección de bundles (después de productos destacados o donde encaje)

2. **ProductCard** (`src/components/ProductCard.tsx`)
   - Importar usePriceRules() y PriceRuleBadge
   - Llamar getRulesForProduct(product.id) y renderizar badges

3. **CartSidebar** (`src/components/CartSidebar.tsx`)
   - Detectar item.type === 'bundle' y renderizar bundleItems anidados
   - Usar formatMoney para todos los precios

4. **CartAdapter** (`src/adapters/CartAdapter.tsx`)
   - Exportar addBundle del contexto

## Suggested Next Steps
Paso 7 — UI Integration (en chunks: primero CartAdapter + CartSidebar, luego IndexUI, luego ProductCard)