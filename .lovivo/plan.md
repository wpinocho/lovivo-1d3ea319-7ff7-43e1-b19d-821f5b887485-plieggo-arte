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
**🔴 BUG 1 REAPARECIÓ (correo se borra al completar la dirección) — CAUSA RAÍZ CONFIRMADA. Falta EJECUTAR en Craft Mode.**
**✅ BUG 2 (cantidad) confirmado resuelto por el dueño este turno.**

### Causa raíz confirmada (evidencia en las 2 capturas del dueño)
Flujo actual "best of both worlds" en `StripePayment.tsx`:
1. Elements monta en modo **deferred** (`<Elements key={clientSecret || 'deferred'}>`, línea ~1173).
2. El usuario escribe el correo en "Usar otro correo electrónico" (julian.ruiz.loza@gmail.com) → `logic.email`.
3. Al completar la dirección, `canCreateIntent` = true → `createIntent()` (línea ~1097) crea el PaymentIntent up-front para mostrar el selector MSI inline.
4. Al llegar el `clientSecret`, **cambia el `key` de `<Elements>`** de `'deferred'` al valor del clientSecret → **REMONTE COMPLETO de todo el árbol de Elements**, incluido `LinkAuthenticationElement`.
5. En el remonte, Stripe Link **detecta la sesión guardada** (VISA 3831, 2 direcciones) y muestra la cuenta guardada (`jul••••••@gmail.com`), reseteando el toggle "usar otro correo". Peor aún: `LinkAuthenticationElement.onChange` dispara con el correo guardado → `onEmailChange` → `logic.setEmail(correoGuardado)` **PISA** el correo que el usuario escribió. Se pierde visual Y en estado.

Es el choque inherente: **mostrar MSI inline exige crear el intent up-front → exige swap de modo deferred→client_secret → exige cambiar el `key` de `<Elements>` → remonte destructivo que Stripe Link secuestra.** No se puede "actualizar in-place" de deferred a client_secret; Stripe obliga a remontar.

### Solución — DOS opciones (decisión del dueño)

**OPCIÓN D (RECOMENDADA — mantiene MSI y arregla el correo):**
Reemplazar `LinkAuthenticationElement` por un **campo de correo normal controlado por React** (fuera del comportamiento de auto-cuenta de Stripe Link). Como el valor vive en `logic.email` (estado React), **sobrevive el remonte** de Elements sin que Stripe Link lo pise.
Pasos en `src/components/StripePayment.tsx`:
1. Quitar `<LinkAuthenticationElement>` (líneas ~904-921) y su import.
2. En su lugar, un bloque de correo: `<Label>Correo electrónico</Label>` + `<Input type="email" inputMode="email" autoComplete="email" value={email} onChange={e => onEmailChange?.(e.target.value)} onBlur={() => onEmailBlur?.()} />`. Estilizar acorde al design system.
3. `onLinkAuthChange` deja de usarse para el correo; `emailConfirmed` se activa solo vía `onEmailBlur` con correo válido (ya existe esa rama en `CheckoutUI.tsx` línea ~366-369). Se puede eliminar el estado `linkAuthenticated` en `CheckoutUI.tsx` (o dejarlo en false, inofensivo).
4. Verificar que `confirmPayment` sigue usando `email` (prop) para `receipt_email` y `billing_details.email` — ya lo hace (líneas ~413, ~417).
5. El botón/express de Stripe Link (`ExpressCheckoutElement`, línea ~850) NO se toca: Link sigue disponible como wallet arriba.
- PRO: se conserva el selector de meses sin intereses inline (feature clave para tickets de $4,500–5,000). Correo a prueba de remonte. Cantidad ya arreglada.
- CONTRA: se pierde el autocompletado del correo por Stripe Link EN EL CAMPO (no en el botón express). Bajo costo: 96% tráfico móvil frío, Link casi no aplica.

**OPCIÓN A (FALLBACK simple — probada, revierte a deferred puro estilo rodata):**
Eliminar la creación up-front del intent → sin swap de modo → sin remonte → correo nunca se pisa.
Pasos en `src/components/StripePayment.tsx`:
1. En el wrapper `StripePayment` (líneas ~1068-1181): no llamar `createIntent()` up-front; dejar `clientSecret` siempre null (modo deferred). El intent se crea en el clic de "Completar Compra" (rama `else` de `handlePayment`, ya existe, línea ~395-402).
2. Mantener `LinkAuthenticationElement` (en deferred no hay remonte, el correo se conserva).
3. Se puede quitar `PaymentBlockSkeleton` y toda la lógica de up-front (createIntent, intentReady, intentAmountRef, useEffects ~1137-1150).
- PRO: config PROBADA (dueño confirmó funcionando el 2026-07-08, PASO 1). Riesgo mínimo (es un revert). Alineado con PRINCIPIO CLAVE del plan.
- CONTRA: se pierde el **selector inline de MSI** dentro del PaymentElement (el cliente no elige plan de meses en el checkout). SÍ se conserva el badge "Paga hasta en N meses sin intereses". MSI del backend queda sin selección up-front → efectivamente el cliente paga el total sin elegir plan de meses en la caja.

### Recomendación
Ir con **OPCIÓN D**: es la única que arregla el correo definitivamente Y conserva los meses sin intereses (feature de alto valor para el precio de Plieggo). Es más código nuevo que A pero el riesgo es acotado (solo se cambia el campo de correo). Si el dueño prefiere lo más simple/probado aunque pierda el selector MSI inline, ir con OPCIÓN A.

### No romper
- Cantidad (bug 2) ✅ ya arreglado en `useOrderItems.ts`.
- SPEI/OXXO/Express Checkout deben seguir funcionando.
- SPEI exige email válido en el intent → con Opción D el email controlado ya está en `logic.email` antes de crear el intent (gate `canCreateIntent` + `isCompleteEmail`).

## 4. Recent Changes
- **2026-07-09** — 🔴 BUG 1 REAPARECIÓ (correo se borra al completar dirección). CAUSA RAÍZ CONFIRMADA: crear el intent up-front (para MSI) cambia el `key` de `<Elements>` → remonte → Stripe Link reinyecta el correo guardado y pisa `logic.email`. Plan con Opción D (campo de correo normal, RECOMENDADA) y Opción A (deferred puro, fallback). Falta ejecutar en Craft Mode.
- **2026-07-09** — ✅ Bug 2 (cantidad) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ EJECUTADO FIX BUG 2 en `useOrderItems.ts`: listener `checkout:updated` con guard `updatingItemsRef.current.size > 0` + `overlayPending()` (+dep); `finally` de `updateQuantity` limpia `pendingQuantitiesRef.delete(key)`.
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate en createIntent. `CheckoutUI.tsx`: estado `emailConfirmed` (onEmailBlur/onLinkAuthChange), cálculo de `canCreateIntent` y `defaultAddress`.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4 "best of both worlds": quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline). ⚠️ Este paso introdujo el remonte que causa el bug del correo.
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
- **[ACTIVO 2026-07-09] Bug 1 correo se borra al completar dirección**: causado por remonte de `<Elements>` (swap deferred→client_secret para MSI) que deja a Stripe Link reinyectar el correo guardado. Falta ejecutar Opción D o A.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso directo (se usa dentro de StripePayment). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT MODE]** Ejecutar fix Bug 1 (Opción D recomendada: campo de correo normal en `StripePayment.tsx`). Confirmar decisión del dueño D vs A antes de ejecutar.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).