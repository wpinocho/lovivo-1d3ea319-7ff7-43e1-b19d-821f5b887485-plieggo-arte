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
**Estado:** 🔧 Pendiente — Dos fixes paralelos

### Fix A: Carousel móvil no resetea al cambiar variante (2026-05-29)
**Archivo:** `src/pages/ui/ProductPageUI.tsx`

**Problema:** En móvil, el `<Carousel>` de Embla no regresa a la imagen 1 al cambiar variante. En desktop sí funciona porque simplemente limpia `selectedImage` → vuelve al index 0.

**Fix:**
1. Agregar import de `type CarouselApi` desde `@/components/ui/carousel`
2. Agregar estado: `const [carouselApi, setCarouselApi] = useState<CarouselApi>()`
3. Agregar `useEffect` que escuche `logic.matchingVariant` y llame `carouselApi?.scrollTo(0)`:
```tsx
useEffect(() => {
  carouselApi?.scrollTo(0)
}, [logic.matchingVariant, carouselApi])
```
4. En el `<Carousel>` del móvil (línea ~284), agregar `setApi={setCarouselApi}`

**Resultado:** Al cambiar de variante en móvil, el carrusel salta automáticamente a la imagen 1 de esa variante — igual que en desktop.

---

### Fix B: clients-upsert no manda nombre/apellido/teléfono (2026-05-28)
`saveClientData()` en CheckoutAdapter lee `firstName`/`lastName`/`phone` del estado de React.
Cuando se llama desde `onAddressChange` en CheckoutUI.tsx (línea 324-326), los `setFirstName`/`setLastName`/`setPhone` ya fueron llamados pero **React no ha actualizado el estado todavía** (batching asíncrono). Resultado: el upsert sale sin nombre, apellido ni teléfono.

#### 1. `src/adapters/CheckoutAdapter.tsx`
- Modificar `saveClientData` para aceptar overrides opcionales de `firstName`, `lastName` y `phone`:
```typescript
const saveClientData = async (
  immediate = false,
  emailOverride?: string,
  firstNameOverride?: string,
  lastNameOverride?: string,
  phoneOverride?: string
) => {
  if (!orderId) return;
  const trimmedEmail = (emailOverride ?? email).trim();
  const effectiveFirstName = firstNameOverride !== undefined ? firstNameOverride : firstName;
  const effectiveLastName = lastNameOverride !== undefined ? lastNameOverride : lastName;
  const effectivePhone = phoneOverride !== undefined ? phoneOverride : phone;
  const normalizedPhone = normalizePhoneNumber(effectivePhone);
  // ... resto igual, pero usando effectiveFirstName, effectiveLastName
  if (effectiveFirstName.trim().length >= 2) customerData.first_name = effectiveFirstName.trim();
  if (effectiveLastName.trim().length >= 2) customerData.last_name = effectiveLastName.trim();
  ...
}
```
- `saveClientDataOnBlur` sigue igual: `saveClientData(true)` — sin overrides (solo email).
- Exponer en el return del hook: `saveClientData` (para que CheckoutUI pueda llamarla con overrides desde onAddressChange).

#### 2. `src/pages/ui/CheckoutUI.tsx`
- En el handler `onAddressChange` (línea 324-326), cambiar:
```tsx
// ANTES:
if (complete && first) {
  logic.saveClientData(true);
}
// DESPUÉS:
if (complete && first) {
  logic.saveClientData(true, undefined, first, last, phone || undefined);
}
```

## 4. Recent Changes
- **2026-05-29** — Identificado bug: carrusel móvil en PDP no resetea a imagen 1 al cambiar variante
- **2026-05-28** — Diagnóstico: nombre/apellido/teléfono llegan null en clients-upsert (stale state bug en onAddressChange)
- **2026-05-28** — Fix clients-upsert keystroke: blur pattern en CheckoutAdapter + CheckoutUI + StripePayment
- **2026-05-26** — AnnouncementBar.tsx + ProductFAQ.tsx: Entrega cambiada de 10-15 a 5-7 días hábiles
- **2026-05-26** — ProductFAQ.tsx: Eliminado "Protección de acrílico 3mm" de FAQ "¿El marco viene incluido?"
- **2026-05-25** — ThankYou.tsx: Fix 1 variant_name con URLs → cleanVariantName() aplicado
- **2026-05-25** — ThankYou.tsx: Fix 2 upsell → ahora usa colección top-sellers en lugar de productos genéricos
- **2026-05-25** — App.tsx: agregadas rutas `/gracias` y `/gracias/:orderId` → ThankYou (fix 404 post-pago)
- **2026-05-25** — `link` removido de `buildPaymentMethodTypes` en StripePayment.tsx. Payload ahora: `["card", "oxxo", "customer_balance"]` (sin link)
- **2026-05-25** — `cleanVariantName()` en CheckoutUI.tsx (desktop + mobile)
- **2026-05-25** — ECE `onReady` en StripePayment.tsx: `eceAvailable` state, separador "o" condicional
- **2026-05-25 Buy Now fix** — `useCheckout.ts` acepta `directItems?: any[]`
- **2026-05-25 Checkout restaurado (5 archivos)** — StripePayment.tsx, CheckoutUI.tsx, CheckoutAdapter.tsx, useCheckout.ts, checkout.ts
- **2026-05-25 CrossSellSection precio corregido** — Precio mínimo de variantes en lugar de `product.price`
- **2026-05-25 Precios Acordeón unificados** — Todas las variantes a $4,500/$6,000

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
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente

## 7. Pending / Future Sessions
- **[ALTA]** Fix carousel móvil: resetear a imagen 1 al cambiar variante (ProductPageUI.tsx)
- **[ALTA]** Fix clients-upsert: nombre/apellido/teléfono no llegan (CheckoutAdapter + CheckoutUI)
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip