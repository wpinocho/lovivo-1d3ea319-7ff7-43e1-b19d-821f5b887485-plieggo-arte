# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD (dueño lo prendió 2026-07-08).** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`. Lovivo ya resolvió el bug `available_plans` en el edge.
- **SPEI (customer_balance) y OXXO ACTIVOS.**

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx` (CheckoutSecurityBanner, CheckoutRating, CheckoutGuarantees, CheckoutPaymentLogos).
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement): leyenda sutil border-primary/20 bg-primary/5 text-primary, sin glow: "Paga hasta en {N} meses sin intereses con tarjetas participantes." (N = paymentMethods.installments_max_plan ?? 6).

## 3. Active Plan
**OBJETIVO: Checkout robusto (paridad con tienda hermana rodata.mx) + MSI sin romper nada.**

### 🔴 DIAGNÓSTICO DEFINITIVO (2026-07-08, 5ª ronda) — el enfoque hybrid-swap está roto de raíz

**Síntomas reportados por el dueño (con screenshots):**
1. Al escribir el email, DESAPARECE el Express Checkout (G Pay / Link) que sí salía al inicio.
2. Error en consola: `elements.submit() must be called before stripe.confirmPayment()`.
3. Comportamiento general "raro" vs. su tienda hermana rodata.mx (imagen 3) que funciona PERFECTO con el flujo limpio.

**CAUSA RAÍZ:** `StripePayment.tsx` monta DOS arquitecturas de Stripe y hace un SWAP entre ellas a media sesión:
- `InstallmentsElements` (MSI/MXN) arranca en modo **deferred** (`<DeferredElements>`), y en el `blur` del email crea el intent y REMONTA `<Elements>` en modo **client_secret** (`preCreatedIntent`).
- Ese remount + el paso de props `hideExpressCheckout` es lo que hace DESAPARECER el express checkout al escribir el email.
- El error `elements.submit()` viene del desajuste de modos: en client_secret NO se debe llamar `elements.submit()`, pero el path de confirmación (o el express) lo llama según el estado, y el swap deja a `elements` en un estado que no coincide con la rama de código.
- El 500 histórico de `customer_balance` (SPEI) venía de crear el intent TEMPRANO con email vacío (sin customer). **NO es un problema del modo deferred.**

**PRUEBA IRREFUTABLE:** el archivo `StripePayment.tsx` de la tienda hermana rodata.mx (que el dueño pegó) usa UN SOLO flujo **deferred**, incluye `customer_balance` en `paymentMethodTypes` de Elements init, crea el intent server-side en el click de pagar (con el customer/email ya presente), y **funciona perfecto: express checkout + Tarjeta + OXXO + Transferencia bancaria (SPEI), todo desde el inicio, sin desaparecer nada.** Confirma que:
- customer_balance en Elements init NO causa 400 (el comentario en `buildElementsPaymentMethodTypes` es incorrecto).
- SPEI funciona en deferred porque el edge crea el intent con customer al momento de pagar.
- El único motivo por el que Plieggo se rompe es la complejidad del swap MSI.

**Dato Stripe (docs oficiales) sobre MSI:** el selector de meses "solo se muestra DESPUÉS de que el cliente escribe el número de una tarjeta de crédito MEXICANA". Requiere `payment_method_options[card][installments][enabled]=true` en el PaymentIntent. En modo **deferred puro** el intent aún no existe cuando se renderiza el PaymentElement → el selector inline NO puede aparecer antes del cobro. Mostrar el selector inline exige modo **client_secret** (intent creado antes). Ese es el trade-off real.

### PLAN DE EJECUCIÓN (para Craft Mode)

**PASO 1 — REESCRIBIR `src/components/StripePayment.tsx` al flujo deferred limpio (paridad rodata). PRIORIDAD MÁXIMA.**
Esto arregla YA los 3 síntomas (express checkout desaparece, error submit, "raro"). Es exactamente lo que pide el dueño ("que quede como rodata").
Cambios concretos:
1. ELIMINAR por completo: `InstallmentsElements`, `DeferredElements` como wrapper de swap, `preCreatedIntent`, `hideExpressCheckout`, `buildElementsPaymentMethodTypes` (el que stripea customer_balance/oxxo), `shouldUseInstallmentsMode`, `isValidEmail`/`EMAIL_RE`, `onEmailBlur`, y toda la lógica de gating por email + recreación por monto en client_secret.
2. El default export vuelve a ser UN SOLO `<Elements>` en modo deferred:
   `elementsOptions = { mode:'payment', amount: max(amountCents,50)/... , currency, paymentMethodTypes: buildPaymentMethodTypes(paymentMethods), appearance: getStripeAppearance() }`
   → `paymentMethodTypes` DEBE incluir card + oxxo + customer_balance (como rodata). NO stripear nada.
3. `handlePayment`: SIEMPRE `await elements.submit()` primero → crear intent server-side (`payments-create-intent`) → `stripe.confirmPayment({ elements, clientSecret, redirect:'if_required' })`. Quitar la rama `preCreatedIntent`.
4. Express Checkout: mantener el bloque tal cual el patrón limpio; que NO se oculte por escribir email (revisar la condición `!linkAuthenticated` — replicar el comportamiento de rodata donde el express se mantiene). `handleExpressCheckoutConfirm` siempre llama `elements.submit()` (correcto en deferred).
5. CONSERVAR de Plieggo (NO tocar): branding (Plieggo Arte), `CheckoutSecurityBanner/CheckoutRating/CheckoutGuarantees/CheckoutPaymentLogos`, el badge marketing MSI ("Paga hasta en {N} meses sin intereses..."), `MissingPhoneDialog`/`isValidPhone`, `AddressElement`, `LinkAuthenticationElement`, manejo OXXO/SPEI en `next_action`, tracking `trackPurchase`, persistencia `completed_order`.
6. Mantener `elements.update({ amount })` en el `useEffect` de cambio de monto (ya sin la guarda `preCreatedIntent`).

**Resultado esperado del PASO 1:** checkout idéntico a rodata → express checkout + Tarjeta + OXXO + Transferencia bancaria visibles desde el inicio, sin desaparecer al escribir email, sin error submit, SPEI funcionando (customer presente al pagar).

**PASO 2 — MSI (selector de meses inline). Validar + decidir DESPUÉS del Paso 1.**
- El badge marketing "hasta {N} MSI" queda desde el Paso 1 (comunica el beneficio).
- El backend ya inyecta installments en el intent (creado al pagar). VALIDAR en prod si, en deferred, el PaymentElement muestra el selector de meses tras escribir una tarjeta de crédito MX. Según docs de Stripe probablemente NO lo muestre inline (el intent nace en el click).
- SI NO aparece inline y el dueño quiere selección de meses inline: implementar modo client_secret LIMPIO (UN SOLO modo, SIN swap): crear el intent server-side up-front al montar el checkout (orderId + amount listos) con installments habilitado, montar `<Elements options={{clientSecret}}>` una sola vez. Express Checkout Element funciona también en client_secret (mantenerlo visible). Para SPEI en client_secret up-front: el edge DEBE crear el intent con un Stripe Customer (aunque el email llegue después) — si el edge de Lovivo no soporta crear customer sin email, escalar a Lovivo. NO volver al patrón de swap deferred↔client_secret.

## 4. Recent Changes
- **2026-07-08** — 🔴 DIAGNÓSTICO 5ª ronda: el hybrid-swap (deferred↔client_secret) de `InstallmentsElements` es la causa de que el express checkout desaparezca al escribir email + del error `elements.submit()`. El dueño pegó el `StripePayment.tsx` de su tienda hermana rodata.mx (flujo deferred limpio) que funciona perfecto e incluye customer_balance en Elements init. PLAN: reescribir StripePayment.tsx al flujo deferred limpio (Paso 1) y validar MSI después (Paso 2). Confirmado por docs Stripe: el selector MSI solo sale tras escribir tarjeta MX y exige intent con installments (client_secret para verlo inline).
- **2026-07-08** — ✅ FIX MSI (timing) previo (gating por email + swap). RESULTÓ FRÁGIL → se revierte en favor del flujo deferred limpio.
- **2026-07-08** — 🟡 MSI: error cambió de `available_plans` a `customer_balance` (Lovivo arregló el edge; el 500 SPEI era por intent temprano sin customer).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5. Hover product.images[1].
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **🔴 CHECKOUT — hybrid-swap MSI roto (2026-07-08):** `StripePayment.tsx` hace swap deferred↔client_secret → express checkout desaparece al escribir email + error `elements.submit() must be called before stripe.confirmPayment()`. FIX definido (Paso 1: reescribir a deferred limpio tipo rodata). PENDIENTE ejecutar en Craft Mode.
- **MSI selector inline**: requiere modo client_secret (intent up-front) según Stripe. Deferred no lo muestra inline. Decidir tras validar Paso 2.
- **SPEI (customer_balance)** requiere Stripe Customer con email en el intent. En deferred se resuelve solo porque el intent se crea al pagar (email ya presente). En client_secret up-front, el edge debe crear customer aunque email llegue después.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[CRÍTICA · CRAFT]** PASO 1: reescribir `StripePayment.tsx` al flujo deferred limpio (paridad rodata). Elimina swap/InstallmentsElements/preCreatedIntent/hideExpressCheckout. Arregla express checkout + error submit + SPEI.
- **[ALTA · DUEÑO]** PASO 2: tras Paso 1, validar en prod si el selector MSI aparece al escribir tarjeta de crédito MX. Si no, decidir client_secret limpio (sin swap).
- **[ALTA]** Verificar que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).