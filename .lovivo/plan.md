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
**✅ PASO 4 IMPLEMENTADO (2026-07-08): "Best of both worlds" — sin muro + MSI + autollenado de Link recuperado. PENDIENTE VALIDAR EN PROD.**

### Cómo quedó el flujo del checkout (arquitectura vigente)
- `CheckoutUI.tsx`: se ELIMINÓ el gate `paymentUnlocked` (ya no hay campo de correo nativo/muro). `StripePayment` monta COMPLETO desde el inicio cuando `isStripeReady`.
- El correo lo captura el `LinkAuthenticationElement` DENTRO de StripePayment → recupera el autollenado de Stripe Link. Cableado: `email={logic.email}`, `onEmailChange→logic.setEmail`, `onEmailBlur→logic.saveClientDataOnBlur`.
- `StripePayment.tsx` (SIN cambios en este paso): monta en modo deferred (correo vacío → `createIntent` retorna temprano). Al volverse el correo válido (`isCompleteEmail`), crea el intent up-front → `clientSecret` → `<Elements key={clientSecret}>` REMONTA a modo client_secret → aparece selector MSI inline. Parpadeo ÚNICO aceptado.
- El correo sobrevive el remonte porque `LinkAuthenticationElement` usa `defaultValues.email = email` (vive en estado React logic.email).
- Seguridad SPEI: pagar sin correo válido queda bloqueado por `validateCheckoutFields` (CheckoutAdapter L473-476 exige `isValidEmail`), y `createIntent` no crea intent up-front sin correo válido → NO regresan los 500 de SPEI.

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` (`src/pages/ThankYou.tsx`), leer `payment_method_details.installments` del order y mostrar "Pagado en {count} meses sin intereses" + opcional last4. Verificar RLS sobre `orders`.

## 4. Recent Changes
- **2026-07-08** — ✅ PASO 4 IMPLEMENTADO ("best of both worlds"): quitado el gate `paymentUnlocked` de `CheckoutUI.tsx` (removidos state, useEffect y bloque de campo de correo nativo + import `isCompleteEmail`). Checkout monta completo desde el inicio; correo vía LinkAuthenticationElement (autollenado de Link recuperado); MSI aparece al validar correo (deferred→client_secret ya existente en StripePayment, sin tocar). Sin muro, sin 500s de SPEI (validateCheckoutFields protege).
- **2026-07-08** — 🟡 PROPUESTA PASO 4 (discusión): quitar muro email-first → formulario completo deferred desde inicio + upgrade a client_secret (MSI) al validar correo; correo re-inyectado vía defaultValues.
- **2026-07-08** — ✅ PASO 3 FIX (email-first, AHORA REEMPLAZADO por PASO 4): campo de correo nativo con gate `paymentUnlocked`.
- **2026-07-08** — 🐛 DIAGNÓSTICO PASO 3: correo se borraba por REMOUNT de `<Elements>` al hacer swap deferred→client_secret.
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
- **[VALIDAR EN PROD 2026-07-08] PASO 4 "best of both worlds"**: Confirmar que (a) el checkout carga completo sin muro, (b) el correo del LinkAuthenticationElement se autollena/recuerda (Stripe Link) y NO se borra tras el parpadeo, (c) el selector MSI inline aparece al validar correo, (d) SPEI/OXXO/express siguen funcionando, (e) sin 500s en consola, (f) el parpadeo único es tolerable en móvil.
- **[NUEVO 2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección. Puede ser quirk de preview. VALIDAR en prod. Si afecta prod → escalar a Lovivo.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` quedó sin uso tras quitar el gate (inofensivo, tree-shaken). Limpiar si se toca el archivo.
- **Failed to fetch en consola**: extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** Validar PASO 4 en prod (ver Known Issues checklist a-f).
- **[ALTA]** ThankYou muestra el plan MSI ("Pagado en {count} meses sin intereses" + last4). RLS sobre `orders`.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).