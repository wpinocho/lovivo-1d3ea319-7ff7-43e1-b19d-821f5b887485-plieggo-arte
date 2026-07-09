# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend (`payments-create-intent`) inyecta payment_method_options[card][installments] server-side leyendo `store_settings.payment_methods.installments`.
- **SPEI (customer_balance) y OXXO ACTIVOS.** SPEI EXIGE un customer con EMAIL VÁLIDO al crear el intent.
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio que funciona). PRINCIPIO CLAVE: crear el PaymentIntent LO MÁS TARDE posible (con la orden aún editable).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement): "Paga hasta en {N} meses sin intereses con tarjetas participantes." (N = paymentMethods.installments_max_plan ?? 6). Sin glow. Este badge SIEMPRE se muestra; el selector inline de MSI aparece cuando existe el intent.

## 3. Active Plan
**🔧 FIX 2 BUGS DE CHECKOUT (2026-07-09) — LISTO PARA CRAFT MODE. NO EJECUTADO AÚN.**

### Diagnóstico (root cause común)
Ambos bugs vienen de que el **PaymentIntent up-front se crea DEMASIADO PRONTO** (ver `StripePayment.tsx` L1092-1142 + L1160-1171):
- `createIntent()` se dispara EN CUANTO `isCompleteEmail(props.email)` es true. La regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` pasa a MITAD DE ESCRITURA (p. ej. al llegar a "gmail.co" antes de "gmail.com").
- Al crear el intent, `setClientSecret()` cambia `key={clientSecret || 'deferred'}` en `<Elements>` (L1165) → **REMONTA todo el árbol de Stripe Elements**.
- **BUG 1 (correo se borra):** el remonte ocurre mientras el usuario escribe → borra lo tecleado en `LinkAuthenticationElement`. La 2ª vez funciona porque `clientSecret` ya existe (no hay 2º remonte). Esto es el "se refreshea todo" que describe el dueño.
- **BUG 2 (cantidad no funciona):** una vez creado el intent, la orden queda BLOQUEADA server-side → `checkout-update` (que usan cantidad Y dirección) devuelve 400 "Order not found or cannot be updated" → en `useOrderItems.updateQuantity` el catch hace `setOrderItems(previousItems)` (rollback) → la cantidad vuelve a 1 y el monto no cambia. Es la MISMA causa que el 400 de dirección ya documentado en Known Issues.

### Solución unificada: crear el intent LO MÁS TARDE posible (form completo) + remontes no destructivos
Objetivo: mientras el usuario edita (correo/dirección/cantidad) mantener modo **deferred** (orden editable, sin remontes disruptivos); crear el intent up-front SOLO cuando el formulario está completo (correo confirmado + dirección completa) → ahí aparece el selector MSI, justo en el paso de pago. Esto replica el principio de rodata (intent al final) pero conserva MSI.

#### Cambios en `src/pages/ui/CheckoutUI.tsx`
1. Agregar estado `const [emailConfirmed, setEmailConfirmed] = useState(false)`.
   - En `onEmailBlur`: si `logic.isValidEmail(logic.email)` → `setEmailConfirmed(true)` (además de `saveClientDataOnBlur()`).
   - En `onLinkAuthChange`: si `authenticated === true` → `setEmailConfirmed(true)` (además de `setLinkAuthenticated`). (Usuario Link recurrente autofill.)
2. Calcular `const formReadyForIntent = emailConfirmed && (logic.usePickup ? (!!logic.phone && !!logic.billingAddress.line1) : addressElementComplete);`
3. Pasar nueva prop a `<StripePayment ... canCreateIntent={formReadyForIntent} />`.
4. **IMPORTANTE — pasar `defaultAddress` para que un remonte NO borre la dirección** (hoy NO se pasa → cualquier remonte vacía el AddressElement). Construir desde el estado React:
   ```
   defaultAddress={logic.usePickup ? undefined : {
     name: `${logic.firstName} ${logic.lastName}`.trim(),
     address: {
       line1: logic.address.line1, line2: logic.address.line2,
       city: logic.address.city, state: logic.address.state,
       postal_code: logic.address.postal_code,
       country: logic.address.countryCode || 'MX',
     },
     phone: logic.phone,
   }}
   ```
   (defaultValues de Stripe solo se leen al montar, así que esto NO interfiere mientras el usuario escribe; solo repuebla en un remonte.)

#### Cambios en `src/components/StripePayment.tsx`
1. Agregar prop `canCreateIntent?: boolean` a `StripePaymentProps`.
2. En `createIntent` (L1092): cambiar el gate. En vez de solo `if (!isCompleteEmail(props.email)) { setIntentReady(true); return }`, usar:
   `if (!props.canCreateIntent || !isCompleteEmail(props.email)) { setIntentReady(true); return }`
3. Añadir `props.canCreateIntent` a las deps de `createIntent` (useCallback) y por transitividad al effect de montaje (L1129) para que re-corra cuando pase a true.
4. Mantener el effect de recreación por cambio de monto (L1136-1142) para que, si cambian cantidad DESPUÉS de crear el intent, el monto del cobro se actualice.
5. El effect `elements.update({amount})` (L277-287) ya cubre el modo deferred → en deferred la cantidad/monto se refleja sin remonte. El botón "Completar Compra - {amountLabel}" usa `amountCents` (React) → siempre correcto.

### Resultado esperado
- **Bug 1:** el intent ya NO se crea a mitad de escritura → no hay remonte que borre el correo. Cuando por fin se crea (form completo), el correo se repuebla vía `defaultValues.email` (ya vive en `logic.email`).
- **Bug 2:** la cantidad se edita en modo deferred (orden editable) → `checkout-update` responde OK → la cantidad se queda y el monto se actualiza (elements.update + botón). También arregla de paso el 400 de dirección (se ingresa en deferred).
- **MSI:** el badge marketing sigue siempre visible; el selector inline aparece al completar el formulario (paso de pago). Comportamiento validado sigue vivo, solo se retrasa la creación del intent.

### Residual a validar en prod
- Si el usuario cambia cantidad DESPUÉS de que el intent ya se creó (form completo), `checkout-update` podría volver a 400 por el lock. Es un caso menos común (la mayoría ajusta cantidad antes de completar el pago). Validar; si aparece, evaluar cancelar/recrear intent o ajuste backend.

## 4. Recent Changes
- **2026-07-09** — 📋 PLAN 2 bugs checkout (correo se borra + cantidad no funciona). Root cause: intent up-front creado demasiado pronto (a mitad de escritura del correo) → remonte de Elements borra el correo (bug 1) y bloquea la orden → checkout-update 400 → rollback de cantidad (bug 2). Fix: crear intent solo con form completo (correo confirmado en blur + dirección completa) + pasar defaultAddress para remontes no destructivos. Detalle en Active Plan. NO EJECUTADO (chat mode).
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`: con variante seleccionada muestra `variant.image_urls` + imágenes globales (no asignadas a ninguna variante), sin duplicar; fallback a todas si no hay variante/imágenes.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: creado `src/pages/PagoPendiente.tsx` (instrucciones SPEI/OXXO, copy-to-clipboard CLABE) y ruta `/pago-pendiente/:orderId` (+ `/pago-pendiente`) en `App.tsx`.
- **2026-07-08** — ✅ PASO 4 ("best of both worlds"): quitado gate `paymentUnlocked` de `CheckoutUI.tsx`. Checkout monta completo; correo vía LinkAuthenticationElement; MSI al validar correo.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline). MSI FUNCIONA.
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona (checkout como rodata).
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
- **[2026-07-09] BUG correo se borra + cantidad no funciona en checkout** — diagnóstico y fix completos en Active Plan. Causa: intent up-front creado demasiado pronto.
- **[2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** — MISMA causa raíz que el bug de cantidad (orden bloqueada tras crear intent). El fix de Active Plan (crear intent al final) debería resolverlo también. VALIDAR en prod.
- **[VALIDAR EN PROD 2026-07-09] PagoPendiente**: compra SPEI y OXXO en prod; confirmar sin 404, datos correctos, copy funciona, fallback OK.
- **[VALIDAR EN PROD 2026-07-08] Checkout "best of both worlds"**: correo autollenado (Link) no se borra; MSI aparece; SPEI/OXXO/express OK; sin 500s.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso (inofensivo). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar. (Los "Failed to fetch" de `frame_ant.js` en las capturas son de una extensión del navegador, NO del sitio.)
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT]** Ejecutar fix 2 bugs checkout (Active Plan): `CheckoutUI.tsx` (emailConfirmed, formReadyForIntent, canCreateIntent, defaultAddress) + `StripePayment.tsx` (prop canCreateIntent en el gate de createIntent).
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[ALTA · DUEÑO/PROD]** Validar checkout "best of both worlds" en prod.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).