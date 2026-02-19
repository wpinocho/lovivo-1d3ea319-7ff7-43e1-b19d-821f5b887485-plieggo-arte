Store Plan — Plieggo
Current State
Tienda funcional con colecciones (Espacio, Estrellas, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)
User Preferences
No es programador — necesita guía paso a paso muy clara
Tiene acceso al GitHub del repo-template actualizado
Quiere ir en chunks testeables, no todo de golpe
Migración en Progreso: Bundles + Price Rules
Estado de cada paso:

✅ Paso 0 — Plan definido
🔄 Paso 1 — Tipos en supabase.ts
Agregar: AppliedRule, Bundle, BundleItem, PriceRule Agregar applied_rules al interface Order PENDIENTE: usuario enviará contenido del archivo

✅ Paso 2 — Archivos nuevos (creados)
src/lib/cart-utils.ts
src/hooks/useBundles.ts
src/hooks/usePriceRules.ts
src/components/ui/BundleCard.tsx  ⚠️ usa addBundle (disponible tras Paso 3)
src/components/ui/PriceRuleBadge.tsx
⬜ Paso 3 — CartContext.tsx (bundle support)
Union types + ADD_BUNDLE action + addBundle method + normalizeItem + getItemPrice

⬜ Paso 4 — checkout.ts
Import cartToApiItems + replace inline mapping + update CheckoutUpdateResponse

⬜ Paso 5 — useOrderItems.ts
Agregar mergeResponseIntoCache + usarlo en updateQuantity y removeItem

⬜ Paso 6 — useCheckout.ts
Cambiar prioridad de appliedRules: lastOrder ?? checkoutState

⬜ Paso 7 — UI Integration
IndexUI: sección de bundles ProductCard: PriceRuleBadge CartSidebar: render bundle items CartAdapter: exportar addBundle

Suggested Next Steps
Completar Paso 1 (tipos supabase.ts) y testear
Luego Paso 2 (5 archivos nuevos)