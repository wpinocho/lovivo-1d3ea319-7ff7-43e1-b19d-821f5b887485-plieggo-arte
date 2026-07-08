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

### FRENTE A — Meses sin intereses (MSI) — ✅ IMPLEMENTADO (2026-07-08)
- Dueño activó MSI en Dashboard. Frontend cableado según guía backend.
- **CÓMO FUNCIONA EL FLUJO (investigado 2026-07-08, docs Stripe):** El selector de meses aparece DENTRO del PaymentElement automáticamente en cuanto el cliente teclea una tarjeta de CRÉDITO mexicana elegible — igual que Mercado Pago, ANTES de dar "Completar compra". No se cobra a meses salvo que el cliente lo elija. NO es post-clic.
- **MONTO MÍNIMO STRIPE: ~$100 MXN por mensualidad.** → 3 meses ≥ ~$300, 6 meses ≥ ~$600, 9 ≥ ~$900, 12 ≥ ~$1,200. Con precios reales ($4,500) salen todos los planes. Con montos bajos (ej. descuento de prueba $22.50) NO aparece ningún plan — comportamiento CORRECTO.
- Requisitos: tarjeta de crédito mexicana (no débito), banco participante, y en modo test usar tarjetas de prueba de Stripe para MSI.
- **PENDIENTE CRÍTICO: VERIFICAR en preview con producto de precio real ($4,500) + tarjeta MX de crédito elegible** que el selector de meses aparece en el PaymentElement, y que ThankYou muestra el plan.

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — 🔎 Explicado al dueño flujo MSI + monto mínimo. Su prueba con $22.50 NO mostraba meses porque está por debajo del mínimo (~$100/mensualidad). Implementación confirmada correcta; probar con precio real.
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): (1) `supabase.ts` tipos `PaymentMethods` + `installments`/`installments_max_plan` y nuevo `OrderPaymentMethodDetails`. (2) `StripePayment.tsx` QUITADO hardcode `payment_method_options.card.installments.enabled=true` (ahora backend lo inyecta según toggle Dashboard) + badge MSI sobre PaymentElement (solo si installments activo + MXN). (3) `ProductPageUI.tsx` badge "o X MSI de $Y" bajo precio (solo MXN + precio ≥ $4,500). (4) `ThankYou.tsx` fetch de `orders.payment_method_details` (poll 3x) para mostrar "Pagado en N meses sin intereses con tarjeta terminada en XXXX".
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
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **DATO CLAVE**: varios productos tienen `variant.image_urls` que NO coinciden 1:1 con `product.images`. El fix de galería garantiza que product.images siempre lidere.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta). Fix verificado en preview.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **MSI — monto mínimo**: no aparece el selector si el total < ~$100/mensualidad. NO es bug. Al probar usar precio real ($4,500).
- **MSI VERIFICACIÓN PENDIENTE**: tras quitar el hardcode, SI en preview MSI deja de aparecer con producto real + tarjeta MX de crédito elegible → señal de que el backend aún no inyecta → revertir el hardcode en `StripePayment.tsx` (buildPayload) y escalar a Lovivo.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso). Si no muestra el plan MSI aunque el pago fue a meses, verificar permisos de lectura de `orders.payment_method_details` desde el cliente / o usar edge function `order-get`.
- **Imágenes variant-only no-4:5** (ej. verde-salvia): pueden aparecer recortadas en posiciones posteriores. Depurar en dashboard.
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** VERIFICAR en preview con producto de precio real ($4,500) + tarjeta MX de crédito elegible que aparece el selector de meses en el PaymentElement + badge checkout + badge PDP.
- **[ALTA]** VERIFICAR que ThankYou muestra el plan MSI (depende de RLS sobre `orders` + webhook). Si falla, usar edge function.
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.