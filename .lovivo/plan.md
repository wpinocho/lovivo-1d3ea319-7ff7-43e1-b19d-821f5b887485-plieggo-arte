# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.
- **MSI ACTIVO EN DASHBOARD (dueño lo prendió 2026-07-08).** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`. Frontend cableado (badges + tipos) + FIX del selector implementado 2026-07-08.

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

### FRENTE A — Meses sin intereses (MSI) — ✅ FIX IMPLEMENTADO 2026-07-08 · PENDIENTE PROBAR EN PROD

**Causa raíz (confirmada):** `<Elements>` se inicializaba en deferred mode sin `client_secret`, por eso el PaymentElement no sabía que había installments y NO mostraba el selector de meses (aunque sí el badge). Docs Stripe: "Initializing Elements with the client secret lets the Payment Element know that installments are in use."

**FIX aplicado en `src/components/StripePayment.tsx`:**
- Helpers a nivel módulo: `shouldUseInstallmentsMode(pm, currency)`, `buildPaymentItemsFrom()`, `buildCreateIntentPayload()` (extraídos de PaymentForm para reusarlos).
- Nuevo componente **`InstallmentsElements`**: cuando MSI activo + MXN, crea el PaymentIntent TEMPRANO (`payments-create-intent`, mismo edge que ya inyecta installments) → obtiene `client_secret` → monta `<Elements options={{ clientSecret, appearance }} key={clientSecret}>`. Así el selector 3/6/9/12 aparece DENTRO del form ANTES del clic.
- **Cambio de monto**: en client_secret mode `elements.update({amount})` no aplica; el intent se RE-CREA (debounce 500ms) y Elements se remonta (keyed en clientSecret).
- **Fallback a `DeferredElements` (flujo estable actual)** si: hay suscripción en carrito, el edge falla, no hay `client_secret`, o no hay monto. → El checkout NUNCA se rompe.
- `PaymentForm` recibe `preCreatedIntent` → en `handlePayment` confirma ESE intent (sin `elements.submit()`, sin crear otro). También recibe `hideExpressCheckout` (wallets no hacen MSI y romperían confirm en client_secret mode → se ocultan en MSI mode).
- Guard: el effect `elements.update({amount})` se salta si `preCreatedIntent`.
- El default export decide: `shouldUseInstallmentsMode` → `<InstallmentsElements>`, si no → `<DeferredElements>`.

**PLAN DE PRUEBA POST-FIX (en producción, tras deploy):**
- Producto a $4,500 sin descuento, tarjeta de CRÉDITO mexicana.
- Verificar que el selector 3/6/9/12 aparece DENTRO del form de tarjeta ANTES de dar clic.
- Completar pago y confirmar que `ThankYou.tsx` muestra el plan elegido.
- Verificar en Stripe Dashboard que no se crean intents huérfanos problemáticos (se crea uno temprano por carga de /pagar en MXN con MSI on).

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — ✅ FIX MSI IMPLEMENTADO en `StripePayment.tsx`: deferred → client_secret temprano. Nuevos `InstallmentsElements` + `DeferredElements`; helpers módulo (`buildCreateIntentPayload`, `buildPaymentItemsFrom`, `shouldUseInstallmentsMode`); `handlePayment` confirma intent pre-creado; ECE oculto en MSI mode; fallback a deferred si algo falla (checkout nunca se rompe). Confirmado contra docs Stripe + stripe-js#454.
- **2026-07-08** — 🎯 DIAGNÓSTICO MSI CONFIRMADO CON PRUEBA REAL: crédito Visa a $4,500, badge sí, selector no. Causa = deferred sin client_secret.
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): tipos `PaymentMethods`, badge MSI checkout/PDP, ThankYou fetch payment_method_details.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes. Trust strip "Entrega 5–7 días hábiles".
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
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **MSI post-fix**: pendiente PROBAR en prod con crédito MX real que el selector aparezca antes del clic. Si el edge `payments-create-intent` no permite crear el intent temprano de forma limpia (p.ej. requiere orden ya persistida), el fallback deferred se activará (badge sí, selector no) — en ese caso ESCALAR a Lovivo backend para endpoint create/update-intent idempotente con installments.
- **Intent temprano**: se crea un PaymentIntent al cargar /pagar en MXN con MSI on (por diseño). Verificar en Stripe Dashboard que no genere ruido; los intents no confirmados expiran solos.
- **Remount al cambiar monto**: si el monto cambia estando en /pagar, Elements se remonta y se limpia el input de tarjeta. Bajo riesgo en Plieggo (envío gratis fijo MX).
- **Failed to fetch en consola**: proviene de extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Stripe Link NO activado; ECE no aparece en preview (esperado). En MSI mode ECE se oculta a propósito.

## 7. Pending / Future Sessions
- **[CRÍTICA]** Probar el FIX MSI en prod: crédito MX real a $4,500 → selector 3/6/9/12 aparece antes del clic; pago se completa; ThankYou muestra el plan.
- **[ALTA]** Verificar en Stripe Dashboard que los intents tempranos no generen problemas.
- **[ALTA]** VERIFICAR que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.