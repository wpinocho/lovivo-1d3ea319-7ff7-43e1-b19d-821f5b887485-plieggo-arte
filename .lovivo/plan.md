# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Precio Luna: por variantes (revisar en DB). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale
- Review photos: `aspect-[4/5]` (ReviewCard y GeneralReviewCard) — menos alto que 3/4
- AboutPage: editorial split-screen (no rounded corners, full-bleed images, pilares 3-col, dark proceso section)

## 3. Active Plan
**Estado:** 3 bugs activos — fix pendiente en Craft Mode (archivos buenos del usuario ya analizados)

### Bug 1: Nombre de variante con URLs (CheckoutUI.tsx)
**Problema:** `item.variant.name` llega en formato raw: `"30cm x 90cm / 6000 / ['url1', 'url2', ...]"`. Se muestra crudo sin limpiar.

**Fix en `src/pages/ui/CheckoutUI.tsx`:**
1. Agregar helper al inicio del archivo (fuera de los componentes, después de los imports):
```ts
function cleanVariantName(raw: string | undefined | null): string {
  if (!raw) return '';
  return raw.split(' / ')[0].trim();
}
```
2. Aplicar en resumen desktop (buscar `{item.variant && <p className="text-sm text-muted-foreground">{item.variant.name}</p>}`):
   → Cambiar a: `{item.variant && <p className="text-sm text-muted-foreground">{cleanVariantName(item.variant.name)}</p>}`
3. Aplicar en resumen mobile dentro de `MobileOrderSummary` (buscar `{item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}`):
   → Cambiar a: `{item.variant && <p className="text-xs text-muted-foreground">{cleanVariantName(item.variant.name)}</p>}`

### Bug 2: Express Checkout separador "o" siempre visible (StripePayment.tsx)
**Problema:** `ExpressCheckoutElement` no tiene `onReady` callback. Cuando Stripe detecta que no hay wallets disponibles, oculta los botones pero el separador "o" sigue visible (está fuera de condición).

**Fix en `src/components/StripePayment.tsx` → dentro de `PaymentForm`:**
1. Agregar estado al inicio de `PaymentForm` (junto a los otros useState):
```tsx
const [eceAvailable, setEceAvailable] = useState(false);
```
2. En el `ExpressCheckoutElement`, agregar prop `onReady`:
```tsx
onReady={(ev: any) => {
  const methods = ev?.availablePaymentMethods ?? {};
  const hasAny = Object.values(methods).some(Boolean);
  setEceAvailable(hasAny);
}}
```
3. Envolver el ECE con un div que lo oculte visualmente (NO desmontarlo — Stripe pierde el contexto del wallet):
```tsx
<div style={{ display: eceAvailable ? undefined : 'none' }}>
  <ExpressCheckoutElement ... />
</div>
```
4. Hacer el separador condicional:
```tsx
{eceAvailable && (
  <div className="flex items-center gap-3">
    <Separator className="flex-1" />
    <span className="text-xs text-muted-foreground uppercase tracking-wider">o</span>
    <Separator className="flex-1" />
  </div>
)}
```
⚠️ El bloque completo queda dentro de `{!linkAuthenticated && (...)}` igual que antes.

### Bug 3: Stripe 400 — `customer_balance` en Elements init (StripePayment.tsx)
**Problema:** La función `buildPaymentMethodTypes` incluye `customer_balance` cuando SPEI está activo. Esa misma función se usa para `elementsOptions.paymentMethodTypes`, pero Stripe Elements NO acepta `customer_balance` en su inicialización — solo en el payload del backend. Esto provoca un error 400.

**Fix en `src/components/StripePayment.tsx`:**
1. Dejar `buildPaymentMethodTypes` tal como está (para el backend payload, incluye `customer_balance`).
2. Agregar una segunda función solo para Elements init (sin `customer_balance`):
```ts
function buildElementsPaymentMethodTypes(pm?: PaymentMethods): string[] {
  const types: string[] = ['link']
  if (!pm || pm.card !== false) types.unshift('card')
  if (pm?.oxxo) types.push('oxxo')
  // customer_balance (SPEI) EXCLUDED — Stripe Elements 400 if included at init
  return types
}
```
3. En `elementsOptions` (dentro del componente `StripePayment`), usar la nueva función:
```tsx
paymentMethodTypes: buildElementsPaymentMethodTypes(props.paymentMethods),
```
   (era `buildPaymentMethodTypes(props.paymentMethods)` — cambiar solo este uso)

4. En `buildPayload` → `payment_method_types` → dejar usando `buildPaymentMethodTypes(paymentMethods)` (incluye SPEI para el backend).

## 4. Recent Changes
- **2026-05-25 PENDING FIX** — 3 bugs analizados (cleanVariantName + ECE onReady + buildElementsPaymentMethodTypes) — ver Active Plan
- **2026-05-25 Buy Now fix** — `useCheckout.ts` `checkout()` ahora acepta `directItems?: any[]` como segundo parámetro. Usa `directItems ?? cart.items`, con validación de array vacío. Fix para el error "El carrito está vacío" al presionar "Comprar ahora" desde PDP.
- **2026-05-25 BUY NOW BUG DETECTADO** — `useCheckout.ts` ignoraba segundo param `directItems` que pasa `HeadlessProduct.tsx`. Fix: aceptar `directItems?: any[]` y usar `directItems ?? cart.items`.
- **2026-05-25 Checkout restaurado (5 archivos)** — StripePayment.tsx, CheckoutUI.tsx, CheckoutAdapter.tsx, useCheckout.ts, checkout.ts reemplazados con versiones funcionales del repo de referencia. Clave: `buildElementsPaymentMethodTypes` excluye `customer_balance` (SPEI) del init de Elements para evitar 400, pero lo incluye en el payload del backend.
- **2026-05-25 ECE fix CORRECTO** — `link` devuelto a `buildElementsPaymentMethodTypes` (solo `customer_balance` excluido). El error anterior de quitar `link` de Elements impedía que Google Pay / Apple Pay se inicializaran. Se mantiene `onReady` para ocultar el separator cuando no hay wallets disponibles.
- **2026-05-25 Checkout fix Stripe 400** — `customer_balance` (SPEI) removido de `buildElementsPaymentMethodTypes` para la init de Stripe Elements. Se mantiene en `buildPaymentMethodTypes` para el backend payload.
- **2026-05-25 CrossSellSection precio corregido** — Ahora usa precio mínimo de variantes en lugar de `product.price` (base). También muestra precio tachado si hay compare_at_price.
- **2026-05-25 Precios Acordeón unificados** — Todas las variantes de los 8 acordeones activos actualizadas a $4,500 precio / $6,000 tachado.
- **2026-05-22 CheckoutAdapter.tsx reescrito con template corregido** — Eliminado state-resetter useEffect, simplificado validateCheckoutFields, shippingCoverageV2, passthrough backend.
- **2026-05-21 CheckoutAdapter shipping fix** — Pure passthrough: `country_name`/`state_name` → `country_code`/`state_code`.
- **2026-05-21 AboutPage rediseño editorial** — Split hero, visión invertida, 3 pilares tipográficos, sección proceso dark.
- **2026-05-21 PDP orden secciones** — Reviews → InspirationCarousel → FAQ → CrossSell.
- **2026-05-20 Review card photos aspect ratio** — `aspect-[3/4]` → `aspect-[4/5]`.
- **2026-05-20 Limpieza completa acorden-rosa-morado** — aliases en los 3 archivos data.
- **2026-05-20 Sección "Más experiencias" — cuadro actual excluido** — lógica de exclusión + priorización de colección.

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **About Studio 1**: `...1779325504866-5bg4llquutd.webp`
- **About Studio 2**: `...1779325504867-4wurhzmqhfg.webp`
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12)

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real). En producción debería aparecer en Chrome/Safari con tarjeta guardada.

## 7. Pending / Future Sessions
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar Buy Now + checkout normales
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar que sus variantes tienen el precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip