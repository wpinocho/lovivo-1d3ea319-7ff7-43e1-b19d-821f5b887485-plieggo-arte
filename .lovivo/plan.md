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
- **SPEI (customer_balance) y OXXO ACTIVOS.**
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio que funciona).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement): "Paga hasta en {N} meses sin intereses con tarjetas participantes." (N = paymentMethods.installments_max_plan ?? 6). Sin glow.

## 3. Active Plan
**OBJETIVO: PASO 2 — Mostrar el SELECTOR DE MESES (MSI) inline en el formulario de pago.**

### ✅ PASO 1 COMPLETADO (2026-07-08) — `StripePayment.tsx` reescrito a deferred limpio
El dueño confirmó que el checkout ya funciona como rodata: express checkout + Tarjeta + OXXO + Transferencia (SPEI) visibles desde el inicio, sin desaparecer al escribir email, sin error `elements.submit()`.

### PASO 2 — MSI selector inline (REQUIERE modo client_secret up-front)
**DIAGNÓSTICO CONFIRMADO CON DOCS DE STRIPE (2026-07-08):**
- Stripe SOLO muestra el selector de meses inline si el `<Elements>` se inicializa con un `client_secret` de un PaymentIntent creado **antes** de que el cliente escriba la tarjeta, con `payment_method_options[card][installments][enabled]=true`. Fuente: docs.stripe.com/payments/meses-sin-intereses/accept-a-payment (Payment Element) + issue stripe-js #454 (Automatic PM NO muestra installments).
- El flujo deferred actual crea el intent en el clic de "Completar compra" → Stripe NUNCA alcanza a mostrar el selector inline. No hay workaround en deferred. Es requisito duro.
- **Por qué en Plieggo es SEGURO hacer up-front:** envío GRATIS y FIJO en todo México ⇒ el total es estable desde el mount. No hay recálculo de monto que obligue a recrear el intent (el gran riesgo del modo client_secret en otras tiendas aquí NO aplica).
- **SPEI (customer_balance) NO es un problema en up-front server-side:** los docs solo prohíben customer_balance cuando el intent deferred se crea *client-side*. Aquí `payments-create-intent` lo crea *server-side* con Customer (`use_stripe_connect:true`), así que customer_balance sigue soportado. De hecho es MÁS limpio que deferred.

**ESTADO ACTUAL DEL CÓDIGO (`src/components/StripePayment.tsx`, ~800 líneas):**
- `<Elements>` se monta en modo deferred: `mode:'payment'`, `amount`, `currency`, `paymentMethodTypes: buildPaymentMethodTypes(paymentMethods)` (card+oxxo+customer_balance), `appearance: getStripeAppearance()`. SIN client_secret.
- Intent se crea en `handlePayment` vía `callEdge("payments-create-intent", buildPayload(...))` → devuelve `client_secret` + `order`. Backend inyecta installments.
- `handlePayment`: `elements.submit()` → crear intent → `confirmPayment({elements, clientSecret, confirmParams, redirect:'if_required'})`.
- `buildCreateIntentPayload` ya envía `customer:{email,name,phone}`, `payment_method_types`, `use_stripe_connect:true`, `capture_method:'automatic'`, y comentario de que el backend inyecta installments.

**IMPLEMENTACIÓN PASO 2 (UN SOLO modo client_secret, SIN swap — nunca volver al hybrid):**
1. **Crear el intent UP-FRONT al montar** (cuando `orderId` + `amount` ya existen — el order/checkout_token ya están creados al cargar `/pagar`): llamar `payments-create-intent` una vez con el payload actual (installments habilitado server-side, Customer creado server-side para SPEI). Guardar `client_secret` en estado + el `order` devuelto.
   - Usar un `useEffect` con guarda de "creado una sola vez" (ref booleano) para NO recrear en cada render. Idempotencia: pasar `order_id`/`checkout_token` para que el edge reutilice el intent existente si ya hay uno.
   - Manejar email posiblemente vacío en el mount: el Customer se puede crear sin email; el email/receipt_email definitivo se envía en `confirmPayment` (billing_details.email + receipt_email). Para SPEI, las instrucciones de transferencia salen con el email de confirm.
2. **Inicializar `<Elements options={{ clientSecret, appearance: getStripeAppearance() }}>` UNA SOLA VEZ** cuando `client_secret` esté listo. Mientras se crea, mostrar skeleton/spinner del bloque de pago (no bloquear el resto del form).
   - En modo client_secret NO se pasa `mode`/`amount`/`paymentMethodTypes` a `<Elements>` (los métodos vienen del intent). Asegurar que el intent se creó con `payment_method_types` = card+oxxo+customer_balance para que sigan apareciendo todos.
3. **`handlePayment` simplificado** (modo client_secret): `await elements.submit()` (validación) → `stripe.confirmPayment({ elements, clientSecret, confirmParams:{ return_url, receipt_email, payment_method_data:{ billing_details } }, redirect:'if_required' })`. YA NO se crea el intent en el clic (ya existe). Conservar toda la lógica post-pago (succeeded/processing, OXXO/SPEI next_action, trackPurchase, completed_order, MissingPhoneDialog).
4. **Express Checkout (ECE)**: sigue visible desde el inicio. Verificar que funciona con Elements en modo client_secret (ECE es compatible). Mantener handlers de shippingaddresschange/rate (aunque envío fijo, no estorban).
5. **Monto estable**: como el total no cambia (envío fijo/gratis), NO hace falta `elements.update({amount})`. Si en el futuro cambiara el total (cupón que reduce), habría que actualizar el intent server-side vía el edge y refrescar client_secret; por ahora los cupones ya vienen aplicados en `validation_data.discount_code` al crear el intent. VALIDAR: si el cliente aplica un cupón DESPUÉS de montar el intent, el monto del intent quedaría desfasado → o (a) crear el intent después de aplicar cupón, o (b) recrear intent al aplicar cupón. Decisión recomendada: crear el intent up-front pero recrearlo (nuevo client_secret) SOLO cuando cambie el total por cupón; como es evento raro y explícito, es aceptable y NO es un swap de modo (sigue siendo client_secret siempre).
6. Conservar: branding Plieggo, CheckoutTrustBadges, badge marketing MSI, AddressElement, LinkAuthenticationElement.

**VALIDACIÓN EN PROD tras deploy (dueño con tarjeta de crédito MX real):**
- Al escribir una tarjeta de CRÉDITO mexicana debe aparecer el selector 3/6/9/12 meses dentro del PaymentElement.
- Tarjeta de débito NO muestra meses (esperado).
- SPEI (Transferencia) sigue generando instrucciones (next_action) correctamente.
- OXXO sigue funcionando.
- Express checkout sigue visible.

**SI el edge `payments-create-intent` NO puede crear el intent up-front sin email / no crea Customer para SPEI up-front → ESCALAR A LOVIVO** para ajustar el edge (crear Customer con email placeholder y parchear en confirm, o aceptar email tardío). NUNCA volver al swap deferred↔client_secret.

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` (`src/pages/ThankYou.tsx`), leer `payment_method_details.installments` del order y mostrar "Pagado en {count} meses sin intereses" + opcional last4. Verificar RLS sobre `orders`.

## 4. Recent Changes
- **2026-07-08** — 🔎 DIAGNÓSTICO PASO 2 confirmado con docs Stripe: el selector MSI inline REQUIERE modo client_secret up-front (intent creado antes de teclear la tarjeta con installments.enabled). Deferred NO lo muestra. Plieggo es candidato SEGURO porque el envío es gratis/fijo (total estable). Plan de implementación client_secret limpio (sin swap) documentado en Active Plan.
- **2026-07-08** — ⚠️ Detectado en screenshots del checkout (preview) error 400 `checkout-update` "Order not found or cannot be updated" al guardar dirección de envío. Ver Known Issues — validar si es solo preview o afecta prod.
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona: checkout como rodata (express+tarjeta+OXXO+transferencia desde el inicio, sin desaparecer al escribir email).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx`).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5. Hover product.images[1].
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[NUEVO 2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección de envío (visto en screenshots del checkout en preview). Puede ser quirk de preview (orden de prueba) o bug real. VALIDAR en prod: ¿la dirección se persiste en el order? El pago igual lleva la dirección vía billing_details en confirmPayment, así que quizá no bloquea la compra, pero conviene confirmar. Si afecta prod → escalar a Lovivo.
- **MSI selector inline**: requiere modo client_secret up-front (ver Active Plan Paso 2). Deferred NO lo muestra.
- **SPEI (customer_balance)**: en up-front server-side sigue soportado (el edge crea Customer). Riesgo solo si el email llega tarde para las instrucciones de transferencia — validar.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- Stripe Link NO activado; ECE puede no aparecer en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA · CRAFT]** PASO 2: implementar modo client_secret up-front para mostrar el selector MSI inline (ver Active Plan). Un solo modo, sin swap.
- **[ALTA · DUEÑO/PROD]** Tras deploy Paso 2: validar con tarjeta de crédito MX real que aparece el selector 3/6/9/12, y que SPEI/OXXO/express siguen bien.
- **[ALTA]** ThankYou muestra el plan MSI ("Pagado en {count} meses sin intereses" + last4). RLS sobre `orders`.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).