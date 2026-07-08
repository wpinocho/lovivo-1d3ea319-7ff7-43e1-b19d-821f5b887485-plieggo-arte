# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.
- **MSI ACTIVO EN DASHBOARD (dueño lo prendió 2026-07-08).** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`. Frontend YA cableado (ver Recent Changes).

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

### FRENTE A — Meses sin intereses (MSI) — ⚠️ CABLEADO, PERO VERIFICACIÓN CRÍTICA PENDIENTE (2026-07-08)
**DIAGNÓSTICO 2026-07-08 (por qué el dueño NO veía el selector):**
1. **CAUSA PRINCIPAL CONFIRMADA — probó con tarjeta de DÉBITO + wallets.** Sus capturas muestran Visa **Débito** …3831, Link y Google Pay. Docs Stripe (docs.stripe.com/payments/mx-installments): *"El método de pago debe ser una tarjeta de CRÉDITO emitida en México."* Débito NUNCA muestra meses. Wallets (Link, Google Pay, Apple Pay) **NO soportan MSI**. Solo tarjeta de CRÉDITO mexicana tecleada directo en el campo "Tarjeta".
2. **FLUJO UX correcto (confirmado docs):** el selector de meses aparece DENTRO del PaymentElement en cuanto se teclea una tarjeta de crédito compatible, ANTES de dar "Completar compra" (igual que Mercado Pago). El checkout ya usa el `PaymentElement` unificado (correcto).

**RIESGO TÉCNICO A VERIFICAR — MODO DIFERIDO (deferred mode):**
- `StripePayment.tsx` inicializa Elements en **deferred mode** (`mode: 'payment'`, sin client_secret; ver `elementsOptions` línea ~1007). El PaymentIntent (con `payment_method_options[card][installments][enabled]=true` que inyecta el backend) se crea SOLO al dar clic en "Completar compra" (`handlePayment` → `payments-create-intent`).
- **DUDA:** en deferred mode el PaymentElement puede no conocer que installments está habilitado hasta que existe el intent → el selector podría no renderizarse ANTES del clic. Ver GitHub stripe/stripe-js#454: con "Automatic Payment Methods" no se muestran installments salvo enable explícito en el intent.
- **HIPÓTESIS OPTIMISTA:** como es Connect direct charge con `stripeAccount` de la cuenta conectada (que tiene MSI ON en su Dashboard), el PaymentElement diferido puede leer la config de installments de la cuenta conectada y mostrarlos igual. SOLO se sabe probando con crédito real.

**PLAN DE VERIFICACIÓN (hacer PRIMERO, antes de tocar código):**
1. Producto precio real ($4,500), SIN descuento de prueba.
2. En sección "Tarjeta" (NO Link, NO Google Pay), teclear tarjeta de **CRÉDITO** mexicana: en test → tarjeta de crédito de prueba de Stripe para MSI (ver docs.stripe.com/payments/meses-sin-intereses/accept-a-payment); en prod → tarjeta de crédito real MX.
3. Observar si el selector de meses (3/6/9/12) aparece dentro del formulario de tarjeta.

**SI CON CRÉDITO REAL NO APARECE EL SELECTOR → FIX NECESARIO (Craft Mode):**
- El deferred Elements necesita saber que installments está habilitado en el momento del render. Opciones a investigar/implementar en `StripePayment.tsx`:
  - (a) Pasar la configuración de installments en las opciones de `<Elements>` (deferred) para que el PaymentElement ofrezca meses antes del intent, O
  - (b) Cambiar a crear el PaymentIntent temprano (no-deferred) con `payment_method_options[card][installments][enabled]=true` y pasar el client_secret al PaymentElement, O
  - (c) Escalar a Lovivo backend si el edge `payments-create-intent` es el único punto donde se puede habilitar y no hay forma de exponerlo al Elements diferido.
- Validar contra docs.stripe.com/payments/accept-a-payment-deferred + mx-installments.

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — 🔎 DIAGNÓSTICO MSI FINAL: dueño no veía meses porque probó con tarjeta de DÉBITO (…3831) + Link + Google Pay. Confirmado con docs Stripe: MSI SOLO con tarjeta de CRÉDITO mexicana tecleada directo; débito y wallets NO. Además detectado RIESGO de deferred mode: verificar con crédito real que el selector aparece antes del clic; si no, requiere fix en `StripePayment.tsx`.
- **2026-07-08** — 🔎 Explicado al dueño flujo MSI + monto mínimo. Su prueba con $22.50 NO mostraba meses porque está por debajo del mínimo (~$100/mensualidad).
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): (1) `supabase.ts` tipos `PaymentMethods` + `installments`/`installments_max_plan` y nuevo `OrderPaymentMethodDetails`. (2) `StripePayment.tsx` QUITADO hardcode `payment_method_options.card.installments.enabled=true` (ahora backend lo inyecta según toggle Dashboard) + badge MSI sobre PaymentElement (solo si installments activo + MXN). (3) `ProductPageUI.tsx` badge "o X MSI de $Y" bajo precio (solo MXN + precio ≥ $4,500). (4) `ThankYou.tsx` fetch de `orders.payment_method_details` (poll 3x).
- **2026-07-08** — 📋 Plan MSI validado contra código + guía backend. Direct charges es el modo correcto.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes. Trust strip PDP "10–15 días" → "Entrega 5–7 días hábiles".
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS" siempre.
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`. Integrado en `StripePayment.tsx`.
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
- **MSI — probado con débito/wallets (2026-07-08)**: NO es bug. MSI solo con tarjeta de CRÉDITO mexicana tecleada directo. Débito, Link, Google Pay, Apple Pay NUNCA muestran meses.
- **MSI — DEFERRED MODE (riesgo abierto)**: el intent con installments se crea al dar clic. Verificar que el selector aparece ANTES del clic con crédito real. Si no aparece → fix en `StripePayment.tsx` (habilitar installments a nivel Elements diferido o crear intent temprano). Ver stripe-js#454 + docs accept-a-payment-deferred.
- **MSI — monto mínimo**: no aparece si total < ~$100/mensualidad. Probar con precio real ($4,500).
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso). Si no muestra plan MSI, verificar permisos lectura `orders.payment_method_details` o usar edge function `order-get`.
- **Imágenes variant-only no-4:5** (ej. verde-salvia): pueden aparecer recortadas en posiciones posteriores.
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[CRÍTICA]** VERIFICAR MSI con producto precio real ($4,500) + tarjeta de CRÉDITO mexicana (NO débito, NO wallet): ¿aparece el selector de meses DENTRO del formulario de tarjeta ANTES del clic? Documentar resultado.
- **[ALTA — condicional]** Si con crédito real NO aparece → implementar fix deferred-mode en `StripePayment.tsx` (habilitar installments a nivel Elements o crear intent temprano). Escalar a Lovivo si el backend es el único punto de habilitación.
- **[ALTA]** VERIFICAR que ThankYou muestra el plan MSI (RLS sobre `orders` + webhook). Si falla, usar edge function.
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.