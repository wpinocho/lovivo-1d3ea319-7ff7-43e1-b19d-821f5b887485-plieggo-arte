# Plan - Tienda Acordeones de Papel

## Current State
Tienda ecommerce con productos de acordeones de papel, bundles, variantes y múltiples colecciones.

## Recent Changes
- **Fix "Comprar ahora" → "El carrito está vacío"**:
  - **Root cause**: `handleBuyNow` en `HeadlessProduct.tsx` llamaba `checkout(options, itemsForCheckout)` pero `useCheckout.ts` solo aceptaba un parámetro e ignoraba el segundo, siempre leyendo `cart.items` del contexto (que no se actualiza síncronamente con `addItem`).
  - **Fix en `useCheckout.ts`**: `checkout()` ahora acepta `overrideItems?: CartItem[]` como segundo parámetro. Si se pasa, usa esos items; si no, usa `cart.items`.
  - **Fix en `HeadlessProduct.tsx`**: `handleBuyNow` ya no llama `addItem()` antes del checkout (evita el race condition). Construye `itemsForCheckout` con `type: 'product' as const` y lo pasa directo a `checkout()`.

- **ProductCardUI hover redesign** (`src/components/ui/ProductCardUI.tsx`):
  - Overlay anclado al fondo (`absolute inset-x-0 bottom-0`)
  - Gradiente `from-black/70 via-black/30 to-transparent`
  - Pills de variante con glassmorphism: `bg-white/15 text-white border-white/30 backdrop-blur-sm`
  - Badges de descuento/agotado siempre visibles (top-left)

## User Preferences
- Diseño premium/minimalista
- Dos tipos de tarjetas: cuadradas (Espacio) y rectangulares (Acordeón)
- Idioma: Español

## Known Issues
- Ninguno activo