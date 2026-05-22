# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

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
**URGENTE — Fix 2 bugs en checkout que bloquean pagos**

### Bug 1: address.state se borra (causa: "estado" en error)
**Archivo:** `src/adapters/CheckoutAdapter.tsx` líneas ~569-582
**Problema:** Hay un `useEffect` que resetea `address.state` a `''` cuando el estado no está en `availableStates`. Stripe AddressElement emite ISO short codes (`CDMX`, `JAL`) pero `shippingCoverage.states` tiene nombres completos (`Ciudad de México`). No hace match → borra el estado → validación falla.

**Fix:** Eliminar o desactivar el efecto que limpia el estado:
```js
// ELIMINAR este useEffect completo (líneas ~574-582):
useEffect(() => {
    if (address.country && selectedCountryData && !availableStates.includes(address.state)) {
      setAddress(prev => ({
        ...prev,
        state: ''
      }));
    }
  }, [address.country, availableStates, selectedCountryData, address.state]);
```

También se puede mantener la lógica pero SOLO resetear cuando cambia el PAÍS (no cuando cambia el estado), para evitar el loop:
```js
// REEMPLAZAR por (solo resetea al cambiar country, no al cambiar state):
useEffect(() => {
  setAddress(prev => ({ ...prev, state: '' }));
}, [address.country]);
```

### Bug 2: logic.phone nunca se actualiza (causa: "teléfono" en error)
**Archivos:** `src/components/StripePayment.tsx` + `src/adapters/CheckoutAdapter.tsx`
**Problema:** StripePayment tiene un input de teléfono interno (CountryPhoneSelect local), pero NO tiene prop `onPhoneChange` que propague el valor al adaptador. `logic.phone` siempre es `''`. La validación en `validateCheckoutFields` falla aunque el usuario haya llenado el campo visualmente.

**Fix opción A (recomendada, más simple):** Quitar la validación de teléfono de `validateCheckoutFields` para el flujo normal (no pickup). El teléfono es recopilado por Stripe directamente — no necesita pasar por `logic.phone` para procesar el pago:
```js
// En validateCheckoutFields (~línea 495), cambiar:
if (!usePickup && (!phone.trim() || !isValidPhone(phone))) {
  missingFields.push('teléfono');
}
// POR (solo validar teléfono en modo pickup):
if (usePickup && !selectedPickupLocation && (!phone.trim() || !isValidPhone(phone))) {
  missingFields.push('teléfono');
}
```

**Fix opción B (más completo):** Agregar `onPhoneChange` a StripePayment y conectarlo con `logic.setPhone`. Requiere:
1. Agregar prop `onPhoneChange?: (phone: string) => void` a `StripePaymentProps`
2. Llamarlo cuando el usuario cambia el teléfono en el input interno
3. En CheckoutUI, pasar `onPhoneChange={logic.setPhone}`

### Archivos a modificar
- `src/adapters/CheckoutAdapter.tsx` — Bugs 1 y 2 (opción A)
- `src/components/StripePayment.tsx` — Bug 2 (opción B, opcional)
- `src/pages/ui/CheckoutUI.tsx` — Bug 2 (opción B, si se agrega onPhoneChange)

### Recomendación final
Aplicar Fix 1 (eliminar state-resetter) + Fix 2 opción A (quitar phone validation para no-pickup). Esto es lo mínimo para desbloquear el checkout sin riesgo de romper otras cosas.

## 4. Recent Changes
- **2026-05-22 Checkout bugs diagnosticados** — Bug 1: useEffect limpia address.state porque ISO code (CDMX) != nombre completo en shippingCoverage. Bug 2: logic.phone nunca se actualiza desde StripePayment (sin onPhoneChange). Ambos causan "Por favor completa: teléfono, estado".
- **2026-05-21 CheckoutAdapter shipping fix** — Pure passthrough: `country_name`/`state_name` → `country_code`/`state_code` usando `countryNameToCode()`. Handler nuevo para `response.shipping.ok === false`. `shippingError` state añadido. Billing address limpiada con `countryNameToCode`.
- **2026-05-21 AboutPage rediseño editorial** — Split hero (quote+image), visión invertida (image+text), 3 pilares tipográficos, sección proceso dark (#1B2A41), CTA limpio. Imágenes reales del taller.
- **2026-05-21 PDP orden secciones** — Reviews → InspirationCarousel → FAQ → CrossSell (antes era InspirationCarousel → Reviews → ...)
- **2026-05-20 Review card photos aspect ratio** — `aspect-[3/4]` → `aspect-[4/5]` en ReviewCard y GeneralReviewCard (ProductReviews.tsx)
- **2026-05-20 Limpieza completa acorden-rosa-morado** — aliases en los 3 archivos data, g4 productSlug corregido a `acorden-verde-salvia`, entradas de rosa-morado eliminadas.
- **2026-05-20 Fix slug g4 Verde Salvia en general reviews** — `acorden-verde-salvia` para exclusión correcta en PDP.
- **2026-05-20 Sección "Más experiencias" — cuadro actual excluido** — `productSlug` añadido a `GeneralReview`, lógica de exclusión + priorización de colección + solo con foto implementada en `ProductReviews.tsx`.
- **2026-05-20 GeneralReviewCard rediseñado** — foto full-width aspect-[3/4], sin avatar circular.
- **2026-05-20 Sección "Más experiencias" con fotos + colección** — filtro a 5 reviews con foto, priorizando misma colección del producto actual.
- **2026-05-20 Fotos review Beige Sutil + Luna Llena** — `photoUrl` añadido a primera review de `acorden-beige-sutil` y `luna-llena`.
- **2026-05-20 Reviews acordeon-prisma-beige-blanco** — 4 reseñas creadas. Primera con foto.
- **2026-05-20 Reviews PDP con foto** — `photoUrl` añadido a interfaz `Review`. `ReviewCard` con foto full-width aspect-[3/4].

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **About Studio 1**: `...1779325504866-5bg4llquutd.webp` (artesana con papel beige — hero split)
- **About Studio 2**: `...1779325504867-4wurhzmqhfg.webp` (manos plegando acordeón gris oscuro — visión)
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12)

## 6. Known Issues
- **[BLOQUEANTE] Checkout error "teléfono, estado"** — Ver sección 3 para el fix
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- En PDPs de luna: solo 1 review con foto es de luna (g12), se rellena con 4 de acordeón — aceptable por ahora

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8 (ampliar pool de "Más experiencias")
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP (Rosa Sereno, Terracota, Luna Beige, etc.)
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip