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
**OBJETIVO: PASO 4 — Quitar el "muro" de correo → "best of both worlds". PENDIENTE GREEN-LIGHT DEL DUEÑO.**

### 🟡 PROPUESTA (2026-07-08) — Formulario completo desde el inicio + upgrade a MSI on-email
El dueño reporta 2 problemas con el gate email-first actual:
1. Se siente como muro (baja conv) — hoy `CheckoutUI.tsx` esconde TODO hasta que hay correo válido (`paymentUnlocked`).
2. Se perdió el autollenado propio de Stripe Link (el `LinkAuthenticationElement` solo monta post-gate).

**Enfoque propuesto (confirmado técnicamente viable, PENDIENTE que el dueño diga "sí"):**
- Montar el checkout COMPLETO desde el inicio en modo *deferred* (correo, dirección, métodos de pago, express) — sin muro.
- Correo como PRIMER campo, arriba.
- Cuando el correo es válido → crear intent → remontar Elements en modo `client_secret` (aparecen los meses).
- El correo vive en estado React y se re-inyecta vía `defaultValues.email` tras el remonte → no se borra (soluciona el bug original de otra forma).
- Como el correo va PRIMERO, el remonte/parpadeo ocurre ANTES de que escriban dirección → no se pierde nada.
- **Costo aceptado:** un parpadeo único del bloque de pago al validar el correo (obligado por Stripe para pasar a modo MSI).
- **Ganancia:** sin muro + MSI + se recupera el autollenado de Stripe Link.

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` (`src/pages/ThankYou.tsx`), leer `payment_method_details.installments` del order y mostrar "Pagado en {count} meses sin intereses" + opcional last4. Verificar RLS sobre `orders`.

## 4. Recent Changes
- **2026-07-08** — 🟡 PROPUESTA PASO 4 (discusión): quitar muro email-first → formulario completo deferred desde inicio + upgrade a client_secret (MSI) al validar correo; correo re-inyectado vía defaultValues. Recupera autollenado de Stripe Link. PENDIENTE green-light del dueño.
- **2026-07-08** — ✅ PASO 3 FIX IMPLEMENTADO (email-first): campo de correo nativo con gate `paymentUnlocked` en `CheckoutUI.tsx` + `createIntent` gateado con `isCompleteEmail()` en `StripePayment.tsx`. Elements monta 1 vez en client_secret → sin wipe del correo, sin 500s de SPEI.
- **2026-07-08** — 🐛 DIAGNÓSTICO PASO 3: correo se borra por REMOUNT de `<Elements>` al hacer swap deferred→client_secret. 500s SPEI por crear intent sin email / con email parcial.
- **2026-07-08** — ✅ PASO 2 IMPLEMENTADO: `StripePayment.tsx` a modo client_secret UP-FRONT (activa selector MSI inline). MSI FUNCIONA.
- **2026-07-08** — ⚠️ Detectado error 400 `checkout-update` "Order not found or cannot be updated" al guardar dirección (preview).
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
- **[VALIDAR EN PROD 2026-07-08] Fix email-first**: Confirmar que (a) el correo NO se borra a la 1ª, (b) el selector MSI inline sigue apareciendo, (c) SPEI/OXXO/express siguen funcionando, (d) sin 500s en consola.
- **[NUEVO 2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección. Puede ser quirk de preview. VALIDAR en prod. Si afecta prod → escalar a Lovivo.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · ESPERANDO GREEN-LIGHT]** PASO 4: implementar el enfoque "best of both worlds" (ver Active Plan). Toca `CheckoutUI.tsx` (quitar gate `paymentUnlocked`, correo primer campo, mantener form visible) y `StripePayment.tsx` (deferred→client_secret upgrade al validar correo, re-inyectar email vía defaultValues, LinkAuthenticationElement montado desde inicio). Cargar skill `pages.checkout` antes de tocar.
- **[ALTA · DUEÑO/PROD]** Validar el fix email-first actual en prod (si no se implementa PASO 4).
- **[ALTA]** ThankYou muestra el plan MSI ("Pagado en {count} meses sin intereses" + last4). RLS sobre `orders`.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).