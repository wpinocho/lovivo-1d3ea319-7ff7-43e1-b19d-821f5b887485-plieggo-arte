# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE (confirmado dueño 2026-07-09):** las medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños (y color/paleta). Ese flujo se atiende 100% por WhatsApp. ALTA DEMANDA: muchos clientes ya preguntan por esto → oportunidad de conversión (remueve objeción "no me queda en mi pared"). **YA IMPLEMENTADO EN PDP 2026-07-09 (ver sección 4).**
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend (`payments-create-intent`) inyecta payment_method_options[card][installments] server-side leyendo `store_settings.payment_methods.installments`. El máximo de meses lo define `paymentMethods.installments_max_plan` (config del Dashboard). Stripe SOLO muestra los plazos DESPUÉS de que el cliente ingresa una tarjeta de crédito mexicana participante (docs: docs.stripe.com/payments/mx-installments).
- **SPEI (customer_balance) y OXXO ACTIVOS.** SPEI EXIGE un customer con EMAIL VÁLIDO al crear el intent.
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio que funciona). PRINCIPIO CLAVE: crear el PaymentIntent LO MÁS TARDE posible (con la orden aún editable).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx` (CheckoutSecurityBanner, CheckoutRating, CheckoutGuarantees, CheckoutPaymentLogos).
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement en `StripePayment.tsx` ~978-990). Este badge SIEMPRE se muestra cuando `paymentMethods.installments` y currency==='mxn'; el selector inline de MSI aparece cuando existe el intent.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts` (es-MX, narrowSymbol, 0 decimales → "$10,000"). NUNCA construir montos a mano con `.toFixed(2)`.
- **Reseñas con foto**: DOS archivos distintos. (1) `src/data/product-reviews-content.ts` — reseñas específicas del producto ("Lo que dicen de este cuadro"). (2) `src/data/plieggo-general-reviews.ts` — reseñas GENERALES ("Más experiencias Plieggo", aparecen en todas las PDPs). Campo `photoUrl` en ambos. OJO: verificar en cuál archivo está la reseña antes de editar.
- **CTA WhatsApp personalización** (texto pre-cargado estándar): `wa.me/525531215386?text=¡Hola! Vi un cuadro de Plieggo y lo quiero en otra medida. ¿Me ayudan a cotizarlo?`

## 3. Active Plan
Ninguno abierto. Última feature (personalización PDP) COMPLETADA — ver sección 4.

## 4. Recent Changes
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP COMPLETADA (4 partes):
  1. Nota "¿Otra medida? La hacemos a tu medida por WhatsApp" pegada bajo el selector de tamaño en `ProductPageUI.tsx` (dentro del bloque Product Options, tras `<SizeGuide>`). Texto discreto terracota + `MessageCircle`.
  2. NUEVO `src/components/CustomSizeCTA.tsx` — mini-sección "Hecho a tu medida" (ícono Ruler, título "¿No te queda en tu pared? La ajustamos a tu espacio", muestra medidas estándar como chips, CTA outline terracota "Diséñalo a tu medida por WhatsApp"). Insertado en secciones Plieggo DESPUÉS de InspirationCarousel y antes de ProductFAQ. Recibe `sizes` desde la opción tamaño/medida del producto.
  3. Mejorado enlace WhatsApp genérico en `ProductPageUI.tsx` → "¿Quieres otra medida o tienes dudas? Escríbenos por WhatsApp" + texto pre-cargado.
  4. FAQ `ProductFAQ.tsx`: reescrita "¿Puedo personalizarlo?" → "¿Lo pueden hacer en otra medida?", respuesta concreta (tamaño/color/paleta) con link WhatsApp; subida de orden (antes de envío).
- **2026-07-09** — 📋 PLAN comunicar PERSONALIZACIÓN en PDP (ya ejecutado, ver arriba).
- **2026-07-09** — ✅ FIX REAL foto reseña Mónica A. La reseña visible ("Más experiencias Plieggo", primera card en /products/verde-salvia) estaba en `plieggo-general-reviews.ts` (id g4, línea 77), NO en product-reviews-content.ts. Reemplazada photoUrl por la foto correcta (cuadro verde salvia en pasillo con sala al fondo).
- **2026-07-09** — Reemplazada foto de reseña de Mónica Aguilar en `product-reviews-content.ts` (id '17', acorden-verde-salvia) — resultó ser el archivo equivocado; la foto visible era la general.
- **2026-07-09** — ✅ EJECUTADO FIX A + FIX B en `StripePayment.tsx`. Botón ahora "Completar Compra · $10,000 MXN" (formatMoney). Badge MSI reescrito a 2 líneas benefit-led con mensualidad "Desde {monthly}/mes, hasta {N} meses. Ingresa tu tarjeta para ver los plazos de tu banco".
- **2026-07-09** — ✅ Dueño CIERRA bug correo: solo se reponía con cuenta de Stripe Link guardada; sin ella funciona. Decide dejarlo así.
- **2026-07-09** — ✅ Bug 2 (cantidad) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ EJECUTADO FIX BUG 2 en `useOrderItems.ts`: listener `checkout:updated` con guard + `overlayPending()`.
- **2026-07-09** — ✅ EJECUTADO fix 2 bugs checkout. `StripePayment.tsx`: prop `canCreateIntent` + gate. `CheckoutUI.tsx`: estado `emailConfirmed`, `canCreateIntent`, `defaultAddress`.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4 "best of both worlds": quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Foto reseña Mónica A. (verde-salvia, GENERAL/g4)**: …1783621985376-t2q2r43fz0h.webp (actualizada 2026-07-09, ESTA es la visible en la PDP).
- **Foto lifestyle verde salvia en pasillo** (subida 2026-07-09): https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783622578635-s1ovzkstlm.webp — disponible para futura sección/galería (NO usada aún en CustomSizeCTA; la sección es solo texto+CTA por ahora).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[CERRADO 2026-07-09] Precio del botón sin formato de miles**: RESUELTO con `formatMoney` (FIX A).
- **[CERRADO 2026-07-09] Bug correo**: solo pasaba con cuenta Stripe Link guardada; dueño lo deja así.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso directo (se usa dentro de StripePayment). Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones/Google Pay. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[MEDIA · OPCIONAL]** Considerar agregar una foto lifestyle (verde salvia en pasillo) a `CustomSizeCTA` si el dueño quiere hacerla más visual. Hoy es solo texto+CTA (mobile-first, ligera).
- **[BAJA · DUEÑO]** Definir política de garantía concreta para reemplazar "Garantía de satisfacción". NO inventar.
- **[MEDIA · DUEÑO]** Si quiere más meses (12/18/24) ajustar `installments_max_plan` en Dashboard.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[BAJA]** Confirmar con dueño el wording exacto del texto pre-cargado de WhatsApp de personalización (hoy: "¡Hola! Vi un cuadro de Plieggo y lo quiero en otra medida. ¿Me ayudan a cotizarlo?").