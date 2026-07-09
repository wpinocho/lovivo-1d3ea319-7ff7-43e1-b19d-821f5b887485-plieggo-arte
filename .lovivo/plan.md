# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend (`payments-create-intent`) inyecta payment_method_options[card][installments] server-side leyendo `store_settings.payment_methods.installments`. El máximo de meses lo define `paymentMethods.installments_max_plan` (config del Dashboard). Stripe SOLO muestra los plazos DESPUÉS de que el cliente ingresa una tarjeta de crédito mexicana participante (docs: docs.stripe.com/payments/mx-installments).
- **SPEI (customer_balance) y OXXO ACTIVOS.** SPEI EXIGE un customer con EMAIL VÁLIDO al crear el intent.
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio que funciona). PRINCIPIO CLAVE: crear el PaymentIntent LO MÁS TARDE posible (con la orden aún editable).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx` (CheckoutSecurityBanner, CheckoutRating, CheckoutGuarantees, CheckoutPaymentLogos).
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement en `StripePayment.tsx` ~978-986). Este badge SIEMPRE se muestra; el selector inline de MSI aparece cuando existe el intent.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts` (es-MX, narrowSymbol, 0 decimales → "$10,000"). NUNCA construir montos a mano con `.toFixed(2)`.

## 3. Active Plan
**✅ Bug correo/cantidad CERRADOS por el dueño** (2026-07-09). El correo solo se "reponía" cuando había cuenta de Stripe Link guardada; sin cuenta guardada funciona bien. Dueño decidió DEJARLO ASÍ (no cambiar el campo de correo). Cantidad ya arreglada.

**🎯 NUEVO FOCO — Pulir checkout para conversión. 2 fixes concretos + evaluación.**

### FIX A — Formato del precio en el botón (BUG visible) 🔴
`src/components/StripePayment.tsx` líneas 294-298: `amountLabel` se arma a mano:
```
const amt = (amountCents || 0) / 100
const cur = (currency || "mxn").toUpperCase()
return `${cur} $${amt.toFixed(2)}`   // → "MXN $10000.00" (sin coma, con .00)
```
CAMBIAR a usar `formatMoney` de `src/lib/money.ts`:
```
import { formatMoney } from "@/lib/money"
...
const amountLabel = useMemo(() => {
  const amt = (amountCents || 0) / 100
  return `${formatMoney(amt, currency || "mxn")} MXN`  // → "$10,000 MXN"
}, [amountCents, currency])
```
- Resultado botón: "Completar Compra - $10,000 MXN" (con coma de miles, sin decimales).
- OPCIONAL (menor): cambiar el separador del botón (línea ~1034) de `Completar Compra - ${amountLabel}` a `Completar Compra · ${amountLabel}` (punto medio, más premium). No crítico.
- Verificar que no haya otros `.toFixed(2)` de montos user-facing en el checkout (miniaturas del resumen, subtotal, etc.). Si aparecen, migrar a `formatMoney`.

### FIX B — Copy del badge de meses sin intereses (claridad + conversión) 🟡
`src/components/StripePayment.tsx` líneas 978-986. Copy actual (poco claro):
> "Paga hasta en {N} meses sin intereses con tarjetas participantes."
Problemas: no comunica que hay que INGRESAR la tarjeta para ver los plazos, ni da un ancla de precio mensual.
NUEVO copy (benefit-led, 2 líneas, mobile-first, respetando design system: sin emojis, text-primary, sin glow):
- Línea 1 (bold, `font-semibold text-primary`): **"Págalo a meses sin intereses"**
- Línea 2 (`text-sm text-primary/90`): "Desde {monthly} al mes, hasta {N} meses. Ingresa tu tarjeta para ver los plazos de tu banco."
Donde:
  - `N = paymentMethods.installments_max_plan ?? 6`
  - `monthly = formatMoney((amountCents/100) / N, currency || "mxn")` → mensualidad mínima (a N meses). Usar "Desde" porque es el piso honesto; bancos que no den N meses tendrán mensualidad mayor.
- Mantener el icono de tarjeta y el contenedor `rounded-md border border-primary/20 bg-primary/5`.
- NOTA para el dueño: el número {N} de meses lo controla el Dashboard (installments_max_plan). Si quiere ofrecer hasta 12/18/24, ajustarlo en Dashboard > Configuración > Métodos de pago; el badge se actualiza solo. (Stripe soporta típicamente 3–18 meses según banco.)

### EVALUACIÓN — El checkout ya está muy sólido en confianza
Ya presentes y bien ubicados (NO tocar, solo confirmar):
- Resumen de pedido arriba, abierto, con envío GRATIS y "Llega en 5-7 días hábiles". ✓
- Banner seguridad "Pago 100% seguro · Cifrado SSL · Procesado por Stripe" junto al pago. ✓
- Express Checkout (Google Pay / Link) arriba del form. ✓
- Rating real 4.8 · +196 clientes felices encima del CTA. ✓
- Garantías (Envío gratis / Pago seguro / Garantía de satisfacción) + logos (Visa/MC/Amex/Apple Pay/G Pay/OXXO) bajo el CTA. ✓
- Condiciones | Privacidad. ✓
Mejora OPCIONAL (baja prioridad, requiere decisión del dueño): "Garantía de satisfacción" es vago. Si el dueño tiene política concreta (p.ej. "Devolución 30 días" o "Garantía de por vida contra defectos"), volverla concreta en `CheckoutGuarantees` (`CheckoutTrustBadges.tsx` ~69-72). NO inventar política; preguntar al dueño primero.

### Files to modify (Craft Mode)
- `src/components/StripePayment.tsx`: FIX A (amountLabel → formatMoney, import) + FIX B (copy MSI badge con monthly/N).
- (opcional) `src/components/CheckoutTrustBadges.tsx`: concretar garantía si el dueño define política.

### No romper
- Correo/cantidad ya OK — no tocar el campo de correo (LinkAuthenticationElement se queda).
- SPEI/OXXO/Express Checkout deben seguir funcionando.
- El badge MSI debe seguir apareciendo siempre que `paymentMethods.installments` y currency === 'mxn'.

## 4. Recent Changes
- **2026-07-09** — 🎯 Plan pulido de checkout: FIX A (precio del botón sin coma de miles → usar `formatMoney`, "$10,000 MXN") + FIX B (copy MSI más claro: "Desde {monthly}/mes, hasta {N} meses. Ingresa tu tarjeta para ver los plazos de tu banco"). Evaluación: trust signals ya completos. Falta ejecutar en Craft Mode.
- **2026-07-09** — ✅ Dueño CIERRA bug correo: solo se reponía con cuenta de Stripe Link guardada; sin ella funciona. Decide dejarlo así (no cambiar el campo de correo).
- **2026-07-09** — ✅ Bug 2 (cantidad) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ EJECUTADO FIX BUG 2 en `useOrderItems.ts`: listener `checkout:updated` con guard `updatingItemsRef.current.size > 0` + `overlayPending()` (+dep); `finally` de `updateQuantity` limpia `pendingQuantitiesRef.delete(key)`.
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate en createIntent. `CheckoutUI.tsx`: estado `emailConfirmed` (onEmailBlur/onLinkAuthChange), cálculo de `canCreateIntent` y `defaultAddress`.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4 "best of both worlds": quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline).
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona (checkout deferred como rodata).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx`).

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[ACTIVO 2026-07-09] Precio del botón sin formato de miles**: `amountLabel` en `StripePayment.tsx` usa `.toFixed(2)` a mano ("MXN $10000.00"). Fix: usar `formatMoney`. Ver Active Plan FIX A.
- **[CERRADO 2026-07-09] Bug correo**: solo pasaba con cuenta Stripe Link guardada; dueño lo deja así.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso directo (se usa dentro de StripePayment). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT MODE]** Ejecutar FIX A (formato precio botón con `formatMoney`) + FIX B (copy MSI badge).
- **[BAJA · DUEÑO]** Definir política de garantía concreta para reemplazar "Garantía de satisfacción" (¿devolución 30 días? ¿garantía contra defectos?). NO inventar.
- **[MEDIA · DUEÑO]** Si quiere más meses (12/18/24) ajustar `installments_max_plan` en Dashboard.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).