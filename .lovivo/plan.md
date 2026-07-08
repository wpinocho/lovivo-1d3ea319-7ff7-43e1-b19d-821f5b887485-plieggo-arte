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
**OBJETIVO: PASO 3 — Arreglar bug del correo que se borra + errores 500 SPEI en el checkout MSI up-front.**

### 🐛 DIAGNÓSTICO (2026-07-08) — CONFIRMADO leyendo código
Bug reportado por el dueño: al escribir el correo la 1ª vez, se borra; a la 2ª se queda y aparece el selector MSI. Además consola llena de 500 de `payments-create-intent`.

**Causa raíz (una sola, con 3 síntomas):** El correo se captura con `<LinkAuthenticationElement>` que vive DENTRO de `<Elements>`. El wrapper `StripePayment` (default export, `src/components/StripePayment.tsx`) arranca en modo **deferred** (`key={clientSecret || 'deferred'}`) porque al montar NO hay email → el `createIntent()` up-front falla (SPEI/`customer_balance` exige customer con email válido → 500 "You must provide a customer...").
- Al escribir un email válido, `createIntent` (useCallback con dep en `props.email`) + el `useEffect` de montaje (dep en `createIntent`) provocan que `createIntent()` se dispare EN CADA TECLA → 500s con emails parciales (`julian.ruiz.loza@gmailc` → "Invalid email address").
- Cuando el email queda válido, `createIntent` triunfa → `setClientSecret()` → el `key` de `<Elements>` pasa de `'deferred'` a `clientSecret` → **`<Elements>` SE REMONTA por completo** → el `LinkAuthenticationElement` se resetea a su estado colapsado de Link → el correo recién escrito "se borra".
- 2º intento: `clientSecret` ya existe → guard `if (!clientSecret)` evita re-swap → sin remount → el correo persiste y el selector MSI aparece. ← coincide 100% con el reporte.

**Conclusión:** El swap deferred→client_secret (remount de `<Elements>`) es incompatible con capturar el email dentro de Elements. NO se puede cambiar el modo de un `<Elements>` montado sin remontarlo. La solución limpia es capturar un email VÁLIDO ANTES de montar Elements, para que Elements se monte UNA sola vez directamente en modo client_secret (sin fase deferred, sin swap, sin wipe).

### ✅ FIX RECOMENDADO (Opción A — email-first, arquitectura limpia)
Localizado en `src/pages/ui/CheckoutUI.tsx` + `src/components/StripePayment.tsx`.

1. **Campo de correo NATIVO fuera de Stripe Elements** en `CheckoutUI.tsx`, ARRIBA del `<StripePayment>`:
   - Input controlado por `logic.email` / `logic.setEmail` (ya existen; ver props `onEmailChange`/`onEmailBlur` líneas 332-335). En blur llamar `logic.saveClientDataOnBlur()`.
   - `type="email"`, `inputMode="email"`, `autoComplete="email"`, validación inline de email completo.
   - Copy/label: "Correo electrónico" + microcopy "Para enviarte la confirmación y el comprobante".
2. **Gatear el render de `<StripePayment>` hasta tener email válido y completo.** Mientras no haya email válido, mostrar un placeholder/skeleton bajo el campo de correo (no montar Elements todavía). Regex simple de email completo antes de permitir montar.
3. **En `StripePayment.tsx` (wrapper default export):**
   - `createIntent()` SOLO se dispara cuando `props.email` es un email válido y completo. Añadir `hasCreatedRef` para que se cree UNA sola vez por email válido (evitar spam por tecla). Quitar/neutralizar el disparo en cada cambio de `props.email` en el `useEffect` de montaje.
   - Con email válido desde el inicio → `createIntent()` triunfa a la primera → `clientSecret` listo → `<Elements>` se monta UNA vez en modo client_secret. NO más fase `'deferred'` para one-time. `key={clientSecret}` estable (no cambia).
   - Mantener el `PaymentBlockSkeleton` mientras se crea el intent.
   - `LinkAuthenticationElement` se mantiene DENTRO de Elements SOLO pre-sembrado (`defaultValues.email = props.email`) para conservar Link/tarjetas guardadas de clientes recurrentes; ya NO es la captura primaria, y como Elements no se remonta, no hay wipe.
   - Fallback deferred se conserva SOLO para suscripciones (`hasSubscription`) o si `createIntent` falla pese a email válido.
4. **SPEI:** con el intent creado ya CON email válido, desaparece el error "You must provide a customer...". Validar que Transferencia sigue generando instrucciones.

### Opción B (fallback si Opción A da problemas con Link/SPEI en prod)
Revertir a flujo deferred limpio (Paso 1, paridad rodata) SIN up-front. Se pierde el selector MSI inline (solo queda el badge marketing). Cero wipe, cero 500s. Usar solo si Opción A no se puede estabilizar.

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` (`src/pages/ThankYou.tsx`), leer `payment_method_details.installments` del order y mostrar "Pagado en {count} meses sin intereses" + opcional last4. Verificar RLS sobre `orders`.

## 4. Recent Changes
- **2026-07-08** — 🐛 DIAGNÓSTICO PASO 3: correo se borra en 1er intento por REMOUNT de `<Elements>` al hacer swap deferred→client_secret (email vive en LinkAuthenticationElement dentro de Elements). Errores 500 SPEI por crear intent sin email / con email parcial (createIntent en cada tecla). Fix recomendado: capturar email NATIVO fuera de Elements + gatear StripePayment hasta email válido → Elements monta 1 vez en client_secret. PENDIENTE implementar en Craft.
- **2026-07-08** — ✅ PASO 2 IMPLEMENTADO: `StripePayment.tsx` wrapper reescrito a modo client_secret UP-FRONT (intent creado al montar → activa selector MSI inline). MSI FUNCIONA (confirmado por dueño en 2º intento de correo), pero con bug de wipe + 500s → ver Paso 3.
- **2026-07-08** — 🔎 DIAGNÓSTICO PASO 2 confirmado con docs Stripe: selector MSI inline REQUIERE modo client_secret up-front.
- **2026-07-08** — ⚠️ Detectado error 400 `checkout-update` "Order not found or cannot be updated" al guardar dirección (preview). Ver Known Issues.
- **2026-07-08** — ✅ Dueño CONFIRMA que PASO 1 funciona (checkout como rodata).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx`).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5. Hover product.images[1].

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[EN CURSO 2026-07-08] Correo se borra en 1er intento (Paso 3)**: causa = remount de `<Elements>` en swap deferred→client_secret. Fix diseñado (email-first). Implementar en Craft.
- **[EN CURSO 2026-07-08] Errores 500 `payments-create-intent`**: "You must provide a customer... customer_balance" (email vacío al mount) y "Invalid email address" (email parcial por createIntent en cada tecla). Se resuelven con el fix email-first (crear intent solo con email válido, una vez).
- **[VALIDAR EN PROD 2026-07-08] Selector MSI inline**: FUNCIONA (confirmado). Validar que sigue funcionando tras el fix email-first.
- **[NUEVO 2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección. Puede ser quirk de preview. VALIDAR en prod. Si afecta prod → escalar a Lovivo.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT]** Implementar fix email-first (Paso 3): campo de correo nativo fuera de Elements + gatear StripePayment + createIntent solo con email válido (una vez). Elimina wipe y 500s.
- **[ALTA · DUEÑO/PROD]** Tras el fix, validar: correo NO se borra a la 1ª, selector MSI sigue apareciendo, SPEI/OXXO/express siguen bien, sin 500s en consola.
- **[ALTA]** ThankYou muestra el plan MSI ("Pagado en {count} meses sin intereses" + last4). RLS sobre `orders`.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).