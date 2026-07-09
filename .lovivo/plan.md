# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE (confirmado dueño 2026-07-09):** las medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Ese flujo se atiende 100% por WhatsApp. ALTA DEMANDA. **YA IMPLEMENTADO EN PDP 2026-07-09 (ver sección 4).**
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend (`payments-create-intent`) inyecta payment_method_options[card][installments] server-side leyendo `store_settings.payment_methods.installments`. El máximo de meses lo define `paymentMethods.installments_max_plan`. Stripe SOLO muestra los plazos DESPUÉS de que el cliente ingresa una tarjeta de crédito mexicana participante.
- **SPEI (customer_balance) y OXXO ACTIVOS.** SPEI EXIGE un customer con EMAIL VÁLIDO al crear el intent.
- **Tienda hermana de referencia: rodata.mx** (mismo template, checkout deferred limpio). PRINCIPIO CLAVE: crear el PaymentIntent LO MÁS TARDE posible.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge marketing** (encima del PaymentElement en `StripePayment.tsx` ~978-990).
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts` (es-MX, narrowSymbol, 0 decimales → "$10,000"). NUNCA construir montos a mano con `.toFixed(2)`.
- **Reseñas con foto**: DOS archivos. (1) `src/data/product-reviews-content.ts` — reseñas específicas del producto. (2) `src/data/plieggo-general-reviews.ts` — reseñas GENERALES. Campo `photoUrl` en ambos. Verificar en cuál está antes de editar.
- **CTA WhatsApp personalización** (texto pre-cargado estándar): `wa.me/525531215386?text=¡Hola! Vi un cuadro de Plieggo y lo quiero en otra medida. ¿Me ayudan a cotizarlo?`

## 3. Active Plan
Ninguno abierto. Última feature (ajustes personalización PDP) COMPLETADA — ver sección 4.

## 4. Recent Changes
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP (feedback dueño):
  1. ELIMINADO el segundo enlace WhatsApp genérico ("¿Quieres otra medida o tienes dudas? Escríbenos por WhatsApp") de `ProductPageUI.tsx` (estaba tras el trust strip, sobraba). Se conserva SOLO la nota bajo el selector de tamaño ("¿Otra medida? La hacemos a tu medida por WhatsApp").
  2. Reducido padding: `mt-16` → `mt-10` en el contenedor de secciones Plieggo → "Arte Vivo"/LightShadowFeature empieza más arriba.
  3. `CustomSizeCTA.tsx` reescrito: título "¿No queda en tu pared? La ajustamos a tu espacio" (quitado "te"); body más corto ("...podemos cambiar el tamaño y el color para tu espacio.", sin la línea de "Cuéntanos tu medida..."); QUITADO el bloque de chips de medidas (30cm x 90cm) — ahora es ícono + título + párrafo + CTA directo. Se eliminó la prop `sizes` (componente ya no la recibe).
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP (versión inicial, luego ajustada arriba): nota bajo selector, CustomSizeCTA, FAQ "¿Lo pueden hacer en otra medida?".
- **2026-07-09** — ✅ FIX REAL foto reseña Mónica A. (`plieggo-general-reviews.ts` id g4, línea 77).
- **2026-07-09** — ✅ EJECUTADO FIX A + FIX B en `StripePayment.tsx` (botón formatMoney + badge MSI benefit-led).
- **2026-07-09** — ✅ Dueño CIERRA bug correo (solo con cuenta Stripe Link guardada).
- **2026-07-09** — ✅ Bug 2 (cantidad) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `src/pages/PagoPendiente.tsx` + ruta `/pago-pendiente/:orderId`.
- **2026-07-08** — ✅ PASO 4: quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a modo client_secret UP-FRONT (selector MSI inline).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio (paridad rodata).

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Foto reseña Mónica A. (verde-salvia, GENERAL/g4)**: …1783621985376-t2q2r43fz0h.webp (visible en la PDP).
- **Foto lifestyle verde salvia en pasillo**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783622578635-s1ovzkstlm.webp — disponible, NO usada aún.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[CERRADO 2026-07-09] Precio del botón sin formato de miles**: RESUELTO con `formatMoney`.
- **[CERRADO 2026-07-09] Bug correo**: dueño lo deja así.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso directo. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[BAJA · DUEÑO]** Definir política de garantía concreta para reemplazar "Garantía de satisfacción". NO inventar.
- **[MEDIA · DUEÑO]** Si quiere más meses (12/18/24) ajustar `installments_max_plan` en Dashboard.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).