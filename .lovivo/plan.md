# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`.
- **SPEI (customer_balance) y OXXO ACTIVOS.**
- **Tienda hermana de referencia: rodata.mx** (mismo template Lovivo, checkout deferred limpio que funciona perfecto).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx` (CheckoutSecurityBanner, CheckoutRating, CheckoutGuarantees, CheckoutPaymentLogos).
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement): leyenda sutil border-primary/20 bg-primary/5 text-primary, sin glow: "Paga hasta en {N} meses sin intereses con tarjetas participantes." (N = paymentMethods.installments_max_plan ?? 6).

## 3. Active Plan
**OBJETIVO: Checkout robusto (paridad rodata.mx) + MSI sin romper nada.**

### ✅ PASO 1 COMPLETADO (2026-07-08, 6ª ronda) — `StripePayment.tsx` reescrito a flujo deferred limpio
Se ejecutó el fix definitivo. El archivo pasó de 1243 → 1045 líneas. Cambios aplicados:
1. ELIMINADOS: `InstallmentsElements`, `DeferredElements` (wrapper de swap), `preCreatedIntent`, `hideExpressCheckout`, `buildElementsPaymentMethodTypes`, `shouldUseInstallmentsMode`, `isValidEmail`/`EMAIL_RE`, estado `linkAuthenticated`, y toda la lógica de gating por email + recreación por monto en client_secret.
2. Export = UN SOLO `<Elements>` deferred: `paymentMethodTypes: buildPaymentMethodTypes(paymentMethods)` (INCLUYE card + oxxo + customer_balance), `appearance: getStripeAppearance()`.
3. `handlePayment`: SIEMPRE `await elements.submit()` → crear intent server-side → `confirmPayment({elements, clientSecret, redirect:'if_required'})`. Sin rama preCreatedIntent.
4. Express Checkout: ahora `{( <>...</> )}` SIEMPRE visible (gate solo por `eceAvailable` display:none). Ya NO se oculta al escribir email ni por Link auth (era `!hideExpressCheckout && !linkAuthenticated`, causa de la desaparición).
5. CONSERVADO: branding Plieggo, trust badges, badge marketing MSI, MissingPhoneDialog/isValidPhone, AddressElement, LinkAuthenticationElement, OXXO/SPEI next_action, trackPurchase, completed_order, `elements.update({amount})` (ya sin guarda preCreatedIntent), onEmailChange/onEmailBlur passthrough (inofensivo).

**Resultado esperado:** express checkout + Tarjeta + OXXO + Transferencia (SPEI) visibles desde el inicio, sin desaparecer al escribir email, sin error `elements.submit()`.

### PASO 2 — MSI (selector de meses inline). VALIDAR EN PROD tras deploy del Paso 1.
- El badge marketing "hasta {N} MSI" ya comunica el beneficio.
- El backend inyecta installments en el intent (creado al pagar). VALIDAR en prod si, en deferred, el PaymentElement muestra el selector de meses tras escribir una tarjeta de crédito MX. Según docs de Stripe probablemente NO lo muestre inline (el intent nace en el click de pagar).
- SI NO aparece inline y el dueño quiere selección de meses inline: implementar modo client_secret LIMPIO (UN SOLO modo, SIN swap): crear el intent up-front al montar (orderId+amount listos) con installments habilitado; `<Elements options={{clientSecret}}>` una sola vez. Para SPEI up-front el edge debe crear Stripe Customer aunque el email llegue después — si no lo soporta, escalar a Lovivo. NUNCA volver al swap deferred↔client_secret.

## 4. Recent Changes
- **2026-07-08** — ✅ PASO 1 EJECUTADO: `StripePayment.tsx` reescrito a flujo deferred limpio (paridad rodata). Eliminado el hybrid-swap MSI que hacía desaparecer el express checkout al escribir email y disparaba `elements.submit() must be called before stripe.confirmPayment()`. Un solo `<Elements>` deferred con card+oxxo+customer_balance; handlePayment siempre submit(); ECE siempre visible. Pendiente validar MSI inline en prod (Paso 2).
- **2026-07-08** — 🔴 DIAGNÓSTICO 5ª ronda: hybrid-swap identificado como causa raíz. Dueño pegó StripePayment.tsx de rodata.mx (deferred limpio funcionando).
- **2026-07-08** — 🟡 MSI: error cambió de `available_plans` a `customer_balance` (Lovivo arregló el edge).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5. Hover product.images[1].
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **MSI selector inline**: requiere modo client_secret (intent up-front) según Stripe. Deferred NO lo muestra inline (el intent nace al pagar). Validar en prod tras Paso 1; decidir client_secret limpio si el dueño lo quiere.
- **SPEI (customer_balance)**: en deferred se resuelve solo porque el intent se crea al pagar (email/customer ya presente). En client_secret up-front, el edge debe crear customer aunque el email llegue después.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- Stripe Link NO activado; ECE puede no aparecer en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** PASO 2: tras deploy del Paso 1, validar en prod que el checkout se ve como rodata (express + tarjeta + OXXO + transferencia desde el inicio, sin desaparecer al escribir email, sin error submit). Luego validar si el selector MSI aparece al escribir tarjeta de crédito MX. Si no, decidir client_secret limpio (sin swap).
- **[ALTA]** Verificar que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).