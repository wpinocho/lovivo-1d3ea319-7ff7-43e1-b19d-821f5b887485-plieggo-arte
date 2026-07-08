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

### FRENTE A — Meses sin intereses (MSI) — ⛔ SIGUE BLOQUEADO POR BACKEND (re-verificado 2026-07-08)

**FRONTEND: CORRECTO Y SEGURO.** `StripePayment.tsx` intenta crear el PaymentIntent temprano (para que el Payment Element renderice el selector 3/6/9/12) y, si el edge falla, cae limpio a deferred (badge sí, selector no). El checkout NUNCA se rompe.

**RE-VERIFICACIÓN 2026-07-08 (2ª ronda):** El dueño reportó que "ya se hicieron los cambios en el back de Lovivo" pero el selector SIGUE sin aparecer. Consola en prod (tarjeta crédito Visa MX, $4,500) muestra el MISMO error, sin cambio:
```
POST .../payments-create-intent 500 (Internal Server Error)
Direct fetch error: {"error":"Payment intent creation failed","validation_errors":{"stripe_error":"Received unknown parameter: payment_method_options[card][installments][available_plans]"}}
[Installments] early intent create failed — falling back to deferred
```
CONCLUSIÓN: el fix del edge NO está desplegado a prod para este store, o no eliminó `available_plans` del payload de CREATE. El bug persiste 100% en el edge compartido. NADA que hacer en Craft Mode.

**ACCIÓN TOMADA (2026-07-08, 2ª):** RE-ESCALADO a Lovivo vía agent-feedback (tool_error, HIGH), seguimiento del ID previo 546d0603. Pedido: (1) confirmar despliegue real a prod para store 1d3ea319; (2) enviar SOLO `installments[enabled]=true`, ELIMINAR `available_plans`; (3) darnos un ID de verificación para re-probar.

**MIENTRAS TANTO:** badge "Paga hasta en 6 meses sin intereses" SÍ se muestra. Selector NO aparecerá hasta que el edge se corrija de verdad. NO revertir el frontend (ya listo).

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — ⛔ MSI RE-VERIFICADO: el dueño dice que Lovivo aplicó el fix, pero la consola en prod muestra el MISMO error 500 (`available_plans` sigue en el payload de create). El fix NO llegó a prod o no removió el parámetro. RE-ESCALADO a Lovivo (agent-feedback HIGH, seguimiento de 546d0603). Frontend intacto y correcto.
- **2026-07-08** — ⛔ MSI BLOQUEADO POR BACKEND. Consola en prod reveló causa raíz REAL: edge compartido `payments-create-intent` manda `available_plans` (campo response-only) a Stripe → 500. Debe mandar `installments.enabled=true`. Frontend correcto (cae a deferred). REPORTADO a Lovivo (feedback ID 546d0603, HIGH). No arreglable en Craft Mode.
- **2026-07-08** — ✅ FIX MSI IMPLEMENTADO en `StripePayment.tsx`: deferred → client_secret temprano. Nuevos `InstallmentsElements` + `DeferredElements`; helpers módulo; `handlePayment` confirma intent pre-creado; ECE oculto en MSI mode; fallback a deferred si algo falla. (El fix es correcto pero queda inerte hasta que Lovivo arregle el edge.)
- **2026-07-08** — 🎯 DIAGNÓSTICO MSI: crédito Visa a $4,500, badge sí, selector no.
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

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **DATO CLAVE**: varios productos tienen `variant.image_urls` que NO coinciden 1:1 con `product.images`. El fix de galería garantiza que product.images siempre lidere.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **⛔ MSI selector — SIGUE BLOQUEADO POR EDGE COMPARTIDO (re-verificado 2026-07-08):** Aunque Lovivo dijo haber aplicado el fix, la consola en prod muestra el MISMO 500 con `payment_method_options[card][installments][available_plans]`. El fix no llegó a prod o no quitó el parámetro. RE-ESCALADO (seguimiento feedback 546d0603). Hasta que se corrija de verdad: badge sí, selector no. Frontend ya listo.
- **Intent temprano**: cuando el edge funcione, se creará un PaymentIntent al cargar /pagar en MXN con MSI on (por diseño). Verificar en Stripe Dashboard que no genere ruido.
- **Remount al cambiar monto**: en client_secret mode, si el monto cambia, Elements se remonta y limpia el input. Bajo riesgo en Plieggo (envío gratis fijo MX).
- **Failed to fetch en consola**: proviene de extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/about/redirect"**: ruido de Google Pay en el navegador, NO afecta el checkout. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Stripe Link NO activado; ECE no aparece en preview (esperado). En MSI mode ECE se oculta a propósito.

## 7. Pending / Future Sessions
- **[CRÍTICA · ESPERANDO A LOVIVO]** Confirmar con Lovivo que el fix del edge `payments-create-intent` REALMENTE se desplegó a prod para el store 1d3ea319 (quitar `available_plans`, usar `installments.enabled=true`). Al confirmarse, RE-PROBAR en prod: crédito MX a $4,500 → selector 3/6/9/12 dentro del form antes del clic; pago completo; ThankYou muestra el plan.
- **[ALTA]** Verificar que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.