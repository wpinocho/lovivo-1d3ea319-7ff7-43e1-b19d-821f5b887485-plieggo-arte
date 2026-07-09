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
**✅ RUTA /pago-pendiente CREADA (2026-07-09): fix del 404 post-SPEI/OXXO. PENDIENTE VALIDAR EN PROD.**

### Flujo pago pendiente (nueva arquitectura vigente)
- `StripePayment.tsx` (SIN cambios): en `requires_action` de SPEI/OXXO y en `processing`, guarda `sessionStorage.pending_payment` (method, orderId, amount, currency, + SPEI: hostedUrl/clabe/bankName, + OXXO: voucherUrl/number/expiresAfter) y hace `navigate('/pago-pendiente/${orderId}')`.
- ANTES esa ruta NO existía → caía en NotFound (404). El dueño lo detectó al cerrar la ficha SPEI.
- **NUEVO**: `src/pages/PagoPendiente.tsx` lee `sessionStorage.pending_payment` y muestra instrucciones (SPEI: CLABE/banco/beneficiario con copy-to-clipboard + link hostedUrl; OXXO: referencia + botón ficha). Fallback si no hay sesión (dice "te enviamos instrucciones por correo"). Registrada en `App.tsx` (`/pago-pendiente/:orderId` y `/pago-pendiente`).

### Checkout "best of both worlds" (vigente desde 2026-07-08)
- `CheckoutUI.tsx`: sin gate `paymentUnlocked`. `StripePayment` monta completo. Correo vía `LinkAuthenticationElement` (autollenado Link). MSI aparece al validar correo (deferred→client_secret). Protegido por `validateCheckoutFields`.

### ThankYou — mostrar plan MSI (pendiente ALTA)
En `/gracias/:orderId` ya lee `payment_method_details.installments` y muestra "Pagado en {count} meses sin intereses" + last4 (implementado, verificar RLS en prod).

## 4. Recent Changes
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx` `getDisplayImages()`. ANTES devolvía SIEMPRE todas las `product.images` → ambas tallas mostraban todos los thumbnails y no cambiaban al cambiar de talla. AHORA: con variante seleccionada muestra `variant.image_urls` + imágenes globales (las del producto no asignadas a NINGUNA variante), sin duplicar. Sin variante o variante sin imágenes → fallback a todas. La UI (`ProductPageUI.tsx` L95-98) ya reseteaba selectedImage + carousel al cambiar `matchingVariant`, así que la imagen principal también cambia. Datos Prisma: cada variante tiene `image_urls` propias + 1 compartida que ya está en ambas.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: creado `src/pages/PagoPendiente.tsx` (instrucciones SPEI/OXXO estilo Shopify, copy-to-clipboard de CLABE, monto, link ficha, fallback correo) y registrada ruta `/pago-pendiente/:orderId` (+ `/pago-pendiente`) en `App.tsx`. StripePayment ya navegaba ahí; solo faltaba la ruta.
- **2026-07-08** — ✅ PASO 4 IMPLEMENTADO ("best of both worlds"): quitado el gate `paymentUnlocked` de `CheckoutUI.tsx`. Checkout monta completo; correo vía LinkAuthenticationElement; MSI al validar correo. Sin muro, sin 500s de SPEI.
- **2026-07-08** — ✅ PASO 2 IMPLEMENTADO: `StripePayment.tsx` a modo client_secret UP-FRONT (activa selector MSI inline). MSI FUNCIONA.
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
- **[VALIDAR EN PROD 2026-07-09] PagoPendiente**: hacer una compra SPEI y otra OXXO en prod; confirmar que (a) NO cae en 404 al cerrar la ficha, (b) se muestran CLABE/banco/monto/referencia correctos, (c) copy-to-clipboard funciona en móvil, (d) el fallback aparece si se abre la URL sin sesión.
- **[VALIDAR EN PROD 2026-07-08] Checkout "best of both worlds"**: correo se autollena/recuerda (Link) y no se borra tras el parpadeo; MSI aparece; SPEI/OXXO/express OK; sin 500s.
- **[2026-07-08] Error 400 `checkout-update` "Order not found or cannot be updated"** al guardar dirección. Puede ser quirk de preview. VALIDAR en prod.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso (inofensivo). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO, ver checklist Known Issues).
- **[ALTA · DUEÑO/PROD]** Validar checkout "best of both worlds" en prod.
- **[MEDIA]** Investigar/validar error 400 `checkout-update` (dirección de envío).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[BAJA]** Limpiar import sin uso `CheckoutSecurityBanner` en CheckoutUI.tsx.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).