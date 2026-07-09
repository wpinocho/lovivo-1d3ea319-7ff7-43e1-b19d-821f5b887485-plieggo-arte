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
**✅ FIX 2 BUGS DE CHECKOUT EJECUTADO (2026-07-09). Pendiente validar en prod.**

### Qué se hizo (crear el intent up-front SOLO con el formulario completo)
Root cause de ambos bugs: el PaymentIntent up-front se creaba demasiado pronto (a mitad de escritura del correo, cuando `isCompleteEmail` pasaba en "gmail.co"), remontando `<Elements key={clientSecret}>` → borraba el correo (bug 1) y bloqueaba la orden server-side → `checkout-update` 400 → rollback de cantidad (bug 2).

**`src/components/StripePayment.tsx`:**
- Nueva prop `canCreateIntent?: boolean` en `StripePaymentProps`.
- Gate de `createIntent`: `if (!props.canCreateIntent || !isCompleteEmail(props.email)) { setIntentReady(true); return }`.
- `props.canCreateIntent` añadido a deps del `useCallback createIntent` → el mount-effect re-corre createIntent cuando pasa a true.
- (Ya existía) `defaultAddress` se aplica en `AddressElement.defaultValues`; email en `LinkAuthenticationElement.defaultValues` → repueblan tras remonte.

**`src/pages/ui/CheckoutUI.tsx`:**
- Nuevo estado `emailConfirmed`. Se pone true en `onEmailBlur` (si `logic.isValidEmail(logic.email)`) y en `onLinkAuthChange(authenticated===true)`.
- `canCreateIntent={emailConfirmed && (usePickup ? (!!phone && !!billingAddress.line1) : addressElementComplete)}`.
- Se pasa `defaultAddress` construido desde el estado React (para remonte no destructivo de la dirección).

### Resultado esperado
- Bug 1: intent ya no se crea a mitad de escritura → sin remonte que borre el correo.
- Bug 2: cantidad se edita en modo deferred (orden editable) → `checkout-update` OK → cantidad y monto se actualizan. Arregla de paso el 400 de dirección.
- MSI: badge marketing siempre visible; selector inline aparece al completar el formulario (paso de pago).

### Residual a validar en prod
- Si el usuario cambia cantidad DESPUÉS de que el intent ya se creó (form completo), `checkout-update` podría volver a 400 por el lock. Caso menos común. Si aparece, evaluar cancelar/recrear intent o ajuste backend.

## 4. Recent Changes
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate en createIntent (+dep). `CheckoutUI.tsx`: estado `emailConfirmed` (onEmailBlur/onLinkAuthChange), cálculo de `canCreateIntent` y `defaultAddress`. Intent up-front solo con form completo → correo no se borra + cantidad editable. PENDIENTE validar en prod.
- **2026-07-09** — 📋 PLAN 2 bugs checkout (correo se borra + cantidad no funciona). (Ya ejecutado.)
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4 "best of both worlds": quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline).
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
- **[VALIDAR EN PROD 2026-07-09] Fix 2 bugs checkout EJECUTADO** — confirmar en prod: (1) el correo NO se borra al salir del campo; (2) cambiar cantidad SÍ funciona y actualiza monto; (3) MSI sigue apareciendo al completar el form; (4) sin 400 de `checkout-update`; (5) SPEI/OXXO/express OK, sin 500s.
- **[VALIDAR EN PROD 2026-07-09] PagoPendiente**: compra SPEI y OXXO en prod; confirmar sin 404, datos correctos, copy funciona, fallback OK.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso (inofensivo). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar. (Los "Failed to fetch" de `frame_ant.js` en las capturas son de una extensión del navegador, NO del sitio.)
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** Validar en prod el fix de los 2 bugs (correo + cantidad).
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).