# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.
- **MSI ACTIVO EN DASHBOARD (dueño lo prendió 2026-07-08).** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`. Frontend YA cableado (badges + tipos).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **PDP CTA**: "Agregar al carrito" PRIMARIO terracota (h-14); "Comprar ahora" SECUNDARIO outline (h-12); express TERCIARIO.
- **Sticky bar**: una fila, un botón terracota. Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm
- **ProductCard aspect-ratio: 4:5 SIEMPRE**. Hover: SIEMPRE `product.images[1]`.
- **PDP variant buttons**: h-8 px-3 text-xs rounded-sm
- **Galería móvil PDP**: carrusel con peek (basis-[86%]) + counter chip + dots (activo terracota). object-cover 4:5.
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350 / 1122×1402px).**
- **GALERÍA PDP — REGLA (fix 2026-07-08)**: `getDisplayImages()` en `HeadlessProduct.tsx` MERGEA `product.images` + extras de variante deduped.
- **"Arte vivo" (LightShadowFeature)**: variantes `triptych` (best-sellers) y `single` (resto).
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`. Iconos SVG line terracota, sin emojis, sin glow.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge**: leyenda sutil (border-primary/20, bg-primary/5, text-primary). NO glow. Checkout: "Paga hasta en X meses sin intereses". PDP: "o X meses sin intereses de $Y" (text-xs muted).

## 3. Active Plan
**OBJETIVO: Subir conversión initiate_checkout → purchase (baseline ~30%).**

### FRENTE A — Meses sin intereses (MSI) — ✅ DIAGNÓSTICO CONFIRMADO 2026-07-08 · FIX PENDIENTE (Craft Mode)

**PRUEBA DEFINITIVA DEL DUEÑO (captura 2026-07-08):** tarjeta Visa de **crédito** 4815…1638, total **$4,500** (por encima del mínimo), badge "Paga hasta en 6 meses sin intereses" SÍ se muestra, PERO el **selector de meses NO aparece dentro del PaymentElement**. Esto descarta las causas previas (débito/wallet/monto mínimo) y confirma la causa técnica de raíz.

**CAUSA RAÍZ CONFIRMADA — DEFERRED MODE sin client_secret:**
- `StripePayment.tsx` (default export, líneas ~996-1019) inicializa `<Elements>` en **deferred mode**: `elementsOptions = { mode: 'payment', amount, currency, paymentMethodTypes, appearance }` (línea ~1007). NO se pasa `clientSecret`.
- El PaymentIntent (que el backend crea CON `payment_method_options[card][installments][enabled]=true` según el toggle del Dashboard) se genera SOLO al hacer clic en "Completar Compra" → `handlePayment` → `callEdge('payments-create-intent')` (línea ~348) → luego `stripe.confirmPayment({ elements, clientSecret })` (línea ~358).
- **Documentación oficial Stripe (docs.stripe.com/payments/meses-sin-intereses/accept-a-payment):** *"Initializing Stripe Elements with the client secret lets the Payment Element know that installments are in use."* → En deferred mode NO hay client_secret al renderizar, por eso el PaymentElement NO sabe que hay MSI y NO muestra el selector de meses antes del clic. Confirmado también por GitHub stripe/stripe-js#454.

**FIX RECOMENDADO (Craft Mode) — crear el intent temprano y pasar client_secret al Elements:**
1. Cuando MSI está activo + moneda MXN + monto ≥ mínimo, crear el PaymentIntent ANTES de renderizar el PaymentElement (en `StripePayment.tsx`), llamando a `payments-create-intent` (mismo edge, ya inyecta installments) para obtener `client_secret`.
2. Inicializar `<Elements>` con `options={{ clientSecret, appearance }}` en lugar del deferred `{ mode, amount, currency, paymentMethodTypes }`. Con client_secret presente, el PaymentElement leerá que installments está habilitado y renderizará el selector de meses ANTES del clic.
3. **Manejar el cambio de monto (envío/cantidad):** en modo client_secret NO funciona `elements.update({ amount })` (eso es solo deferred, ver useEffect línea ~165-172). Al cambiar `amountCents` hay que **actualizar el PaymentIntent server-side** (recrear vía `payments-create-intent` o un `payments-update-intent`) y re-montar Elements con el nuevo client_secret. Debounce como el actual de shipping (500ms) para no crear intents en cada tecla.
4. En el submit usar `stripe.confirmPayment({ elements, clientSecret, confirmParams })` (ya está así; solo asegurar que use el client_secret creado en el paso 1, no crear uno nuevo).
5. Mantener el deferred mode como fallback cuando MSI NO esté activo (para no cambiar el flujo estable del resto de tiendas / métodos como customer_balance/SPEI que en client-side no soportan customer_balance).

**RIESGO / DECISIÓN:** este cambio toca el core del checkout (creación de intent + manejo de cambios de monto). Alto valor pero alto riesgo. Si al implementar aparece que el edge `payments-create-intent` no permite crear/actualizar el intent temprano de forma limpia (p. ej. requiere estado de orden ya persistida, o falla al recrear), **ESCALAR a Lovivo backend** para que expongan un endpoint de create/update-intent idempotente con installments. Validar SIEMPRE contra docs.stripe.com/payments/accept-a-payment-deferred + /payments/meses-sin-intereses/accept-a-payment.

**PLAN DE PRUEBA POST-FIX:**
- Producto a $4,500 sin descuento, tarjeta de CRÉDITO mexicana (test: tarjetas de prueba MSI de Stripe; prod: crédito MX real).
- Verificar que el selector 3/6/9/12 aparece DENTRO del formulario de tarjeta ANTES de dar clic.
- Cambiar cantidad/envío y confirmar que el intent se actualiza y el pago se completa correctamente.
- Verificar que `ThankYou.tsx` muestra el plan elegido (`orders.payment_method_details`).

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — 🎯 DIAGNÓSTICO MSI CONFIRMADO CON PRUEBA REAL: dueño probó con tarjeta de CRÉDITO Visa a $4,500; el badge sale pero el selector de meses NO. Causa raíz = DEFERRED MODE sin client_secret (Elements no sabe que hay installments). Confirmado con docs Stripe ("Initializing Elements with the client secret lets the Payment Element know that installments are in use") + stripe-js#454. FIX definido: crear intent temprano y pasar client_secret al Elements (ver Frente A). El error "Failed to fetch" de la consola es de una extensión de Chrome (frame_ant.js), NO es bug de la tienda.
- **2026-07-08** — 🔎 DIAGNÓSTICO MSI previo: se descartó débito/wallets/monto mínimo tras la nueva prueba con crédito real.
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): (1) `supabase.ts` tipos `PaymentMethods` + `installments`/`installments_max_plan` y `OrderPaymentMethodDetails`. (2) `StripePayment.tsx` quitado hardcode installments + badge MSI. (3) `ProductPageUI.tsx` badge "o X MSI de $Y". (4) `ThankYou.tsx` fetch de `orders.payment_method_details`.
- **2026-07-08** — 📋 Plan MSI validado contra código. Direct charges es el modo correcto.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes. Trust strip "10–15 días" → "Entrega 5–7 días hábiles".
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS" siempre.
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5 en TODAS las páginas. Hover product.images[1].
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. `light-shadow-sets.ts`.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots.
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. CTA reorder.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **DATO CLAVE**: varios productos tienen `variant.image_urls` que NO coinciden 1:1 con `product.images`. El fix de galería garantiza que product.images siempre lidere.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta). Fix verificado en preview.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **MSI — CAUSA RAÍZ = deferred mode (2026-07-08, CONFIRMADO)**: El selector de meses no aparece porque `<Elements>` se inicializa sin client_secret (deferred mode). Stripe requiere client_secret para que el PaymentElement sepa que installments está en uso. Fix definido en Frente A. NO es problema de tarjeta/monto (ya probado con crédito real a $4,500).
- **Failed to fetch en consola**: proviene de extensión de Chrome (`frame_ant.js` / chrome-extension), NO de la tienda. Los logs muestran clients-upsert y checkout-update exitosos. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso). Si no muestra plan MSI, verificar permisos lectura `orders.payment_method_details` o usar edge function `order-get`.
- **Imágenes variant-only no-4:5** (ej. verde-salvia): pueden aparecer recortadas en posiciones posteriores.
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[CRÍTICA]** Implementar FIX MSI deferred→client_secret en `StripePayment.tsx` (Frente A): crear intent temprano con installments + pasar client_secret al Elements + manejar cambios de monto server-side. Si el edge no lo permite limpio → escalar a Lovivo backend.
- **[ALTA]** Probar post-fix: selector 3/6/9/12 aparece antes del clic con crédito real; pago se completa; ThankYou muestra el plan.
- **[ALTA]** VERIFICAR que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.