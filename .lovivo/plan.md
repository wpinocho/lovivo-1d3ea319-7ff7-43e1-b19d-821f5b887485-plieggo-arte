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
**OBJETIVO: PASO 2 — Selector MSI inline. ✅ IMPLEMENTADO (2026-07-08) — PENDIENTE VALIDAR EN PROD.**

### ✅ PASO 2 IMPLEMENTADO (2026-07-08) — modo client_secret up-front en `StripePayment.tsx`
Reescrito el wrapper `StripePayment` (export default) para crear el PaymentIntent UP-FRONT al montar (único modo que hace que Stripe muestre el selector de meses inline). Detalles del código:
- Nuevos props en `PaymentForm`: `preClientSecret`, `preIntentOrder`.
- El wrapper crea el intent con `createIntent()` (useCallback + `creatingRef` guard) en un `useEffect` al montar cuando hay `orderId + amountCents`. Guarda `client_secret` + `order`.
- `<Elements>` se monta en modo `{ clientSecret, appearance }` cuando hay secret; si no (suscripción o fallo), cae a modo deferred `{ mode, amount, paymentMethodTypes, appearance }`. `key={clientSecret||'deferred'}`.
- Mientras se crea el intent: `<PaymentBlockSkeleton>` (evita flash deferred→client_secret).
- `handlePayment` y `handleExpressCheckoutConfirm`: si hay `preClientSecret`, lo usan directo (NO recrean intent en el clic). Si no, mantienen el flujo deferred / subscription-create.
- `elements.update({amount})` se SALTA cuando hay `preClientSecret` (no permitido en modo client_secret).
- Recreación de intent si el total cambia (cupón post-mount): `useEffect` que compara `intentAmountRef` vs `amountCents` → `createIntent()` de nuevo. Raro y NO es swap de modo.
- Suscripciones: `hasSubscription` detectado desde items → se mantiene modo deferred (fallback), no rompe.

**VALIDACIÓN EN PROD tras deploy (dueño con tarjeta de crédito MX real):**
- Al escribir tarjeta de CRÉDITO mexicana debe aparecer el selector 3/6/9/12 meses dentro del PaymentElement.
- Tarjeta de débito NO muestra meses (esperado).
- SPEI (Transferencia) sigue generando instrucciones (next_action) — VALIDAR que el email llega para las instrucciones (se envía en confirmPayment vía receipt_email).
- OXXO sigue funcionando. Express checkout sigue visible.
- Si el edge NO crea el intent up-front sin email o rompe SPEI → ESCALAR A LOVIVO (no volver a deferred).

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` (`src/pages/ThankYou.tsx`), leer `payment_method_details.installments` del order y mostrar "Pagado en {count} meses sin intereses" + opcional last4. Verificar RLS sobre `orders`.

## 4. Recent Changes
- **2026-07-08** — ✅ PASO 2 IMPLEMENTADO: `StripePayment.tsx` wrapper reescrito a modo client_secret UP-FRONT (intent creado al montar → activa selector MSI inline). Props `preClientSecret`/`preIntentOrder`, skeleton, fallback deferred para suscripción/fallo, recreación de intent al cambiar total. PENDIENTE validar en prod con tarjeta crédito MX real.
- **2026-07-08** — 🔎 DIAGNÓSTICO PASO 2 confirmado con docs Stripe: selector MSI inline REQUIERE modo client_secret up-front. Plieggo seguro (envío gratis/fijo → total estable).
- **2026-07-08** — ⚠️ Detectado error 400 `checkout-update` "Order not found or cannot be updated" al guardar dirección (preview). Ver Known Issues.
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona (checkout como rodata).
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
- **[VALIDAR EN PROD 2026-07-08] Selector MSI inline**: implementado modo client_secret up-front. Requiere validación del dueño con tarjeta de crédito MX real. Riesgos a vigilar: (a) email vacío al mount para SPEI (se envía en confirm), (b) cupón post-mount recrea intent.
- **[NUEVO 2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección de envío (visto en screenshots preview). Puede ser quirk de preview o bug real. VALIDAR en prod. Si afecta prod → escalar a Lovivo.
- **SPEI (customer_balance)**: en up-front server-side sigue soportado (el edge crea Customer). Riesgo solo si el email llega tarde para instrucciones — validar.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- Stripe Link NO activado; ECE puede no aparecer en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** Validar Paso 2 con tarjeta de crédito MX real: aparece selector 3/6/9/12, SPEI/OXXO/express siguen bien, dirección persiste.
- **[ALTA]** ThankYou muestra el plan MSI ("Pagado en {count} meses sin intereses" + last4). RLS sobre `orders`.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).