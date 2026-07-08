# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **PDP CTA**: "Agregar al carrito" PRIMARIO terracota (h-14); "Comprar ahora" SECUNDARIO outline (h-12); express TERCIARIO.
- **Sticky bar**: una fila, un botón terracota. Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm
- **ProductCard aspect-ratio: 4:5 SIEMPRE** (todas las colecciones, todas las páginas). Se ignora el prop `aspectRatio`. object-cover en imagen principal. Skeletons también 4:5.
- **ProductCard hover: SIEMPRE muestra `product.images[1]`** (2ª imagen general), sin importar variante. El dueño la controla reordenando imágenes en el dashboard. Se ignora el prop `hoverImageIndex`.
- **PDP variant buttons**: h-8 px-3 text-xs rounded-sm
- **Galería móvil PDP**: carrusel con peek (basis-[86%]) + counter chip + dots (activo terracota). object-cover en 4:5.
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350px).** Contenedor PDP es aspect-[4/5]. Todas las imágenes deben exportarse a 4:5 para llenar sin recorte ni letterbox.
- **"Arte vivo" (LightShadowFeature) tiene 2 variantes**: `triptych` (3 fotos reales a distinta hora, SOLO best-sellers con set real) y `single` (1 foto lifestyle + copy honesto sin claim de "3 horas", resto del catálogo).
- **CHECKOUT trust signals (nuevo estándar 2026-07-08)**: iconos SVG line terracota (NO emojis). Sello de seguridad discreto arriba del pago. Fila de garantías + logos de pago debajo del CTA. Sin glow naranja. Copy sobrio premium.

## 3. Active Plan
**OBJETIVO: Subir conversión initiate_checkout → purchase (hoy ~30%).** Dos frentes:

### FRENTE A — Meses sin intereses (MSI) — DEPENDE DE BACKEND
**Diagnóstico:** MSI está "Habilitado" en el panel de Stripe del dueño, pero NO aparece en el checkout. Motivo real: Stripe exige que el **PaymentIntent** se cree con `payment_method_options.card.installments.enabled = true`. Eso pasa server-side en la edge function `payments-create-intent` (llamada en `StripePayment.tsx` líneas 344 y 607). El `buildPayload` (líneas 217-274) NO envía `payment_method_options`. Esa edge function es infraestructura compartida de Lovivo — NO editable desde Craft Mode ni desde el Supabase del usuario.
- Acordeón $4,500 MXN SÍ cumple el monto mínimo de Stripe MX para al menos 3 MSI.
- Moneda MXN ✅, ya cumple.

**Pasos:**
1. **[Craft Mode — intento de bajo riesgo]** En `src/components/StripePayment.tsx`, dentro de `buildPayload`, agregar:
   ```
   payment_method_options: { card: { installments: { enabled: true } } }
   ```
   Si la edge function `payments-create-intent` reenvía params arbitrarios a Stripe, los MSI aparecerán solos en el PaymentElement (Stripe los muestra automáticamente cuando el PI los habilita). Probar en preview con tarjeta MX elegible.
2. **[Escalación]** Si tras el paso 1 los MSI NO aparecen → la edge function NO soporta installments. Reportado a Lovivo vía agent-feedback (2026-07-08). Requiere que el equipo de plataforma habilite `installments` en `payments-create-intent`.
3. **[Copy]** Una vez que aparezcan, considerar micro-copy en PDP/checkout: "Paga a 3, 6 o 12 meses sin intereses" para capturar la intención antes del pago.

### FRENTE B — Señales de confianza en checkout — 100% FRONTEND (Craft Mode)
**Diagnóstico:** El checkout actual (`CheckoutUI.tsx` + `StripePayment.tsx`) casi no tiene señales de confianza. Referencia del dueño (rodata.mx) tiene: banner "Pago 100% seguro · SSL · Stripe", rating con reseñas, fila de garantías (envío gratis / pago seguro / garantía) y logos de pago (Visa/MC/Amex/Apple Pay/G Pay/OXXO). Falta TODO eso en Plieggo.

**Elementos a agregar (respetando design system: iconos SVG line terracota, NO emojis, sin glow):**
1. **Banner de seguridad** arriba del bloque de pago (dentro de `StripePayment.tsx`, antes del ExpressCheckout, o en `CheckoutUI.tsx` encabezando la `<section>` de Pago): icono candado SVG + "Pago 100% seguro · Cifrado SSL · Procesado por Stripe". Fondo sutil `bg-muted/60`, texto `text-muted-foreground` xs.
2. **Fila de garantías** debajo del botón "Completar Compra" en `StripePayment.tsx` (después del Button, línea ~959): 3 ítems con icono line terracota — "Envío gratis a todo México" · "Pago seguro" · "Devolución/garantía [confirmar política]". Layout flex wrap, centrado, text-xs.
3. **Logos de métodos de pago** debajo de la fila de garantías: chips o SVGs monocromo de Visa, Mastercard, Amex, Apple Pay, Google Pay, OXXO. Grises/discretos para no competir con la marca.
4. **Prueba social (rating)** cerca del CTA: "4.9 ★ · +[N] clientes felices" usando el rating REAL del catálogo (ver `src/data/plieggo-general-reviews.ts` para número honesto). Estrellas terracota, no amarillas chillonas.
5. **Estimación de entrega** en el resumen (desktop línea ~486-490 y móvil ~582-587): "Llega aprox. en [X] días" — PERO PRIMERO unificar el tiempo de entrega (ver Known Issues: 5–7 vs 10–15 días). No mostrar fecha hasta confirmar con dueño.
6. **Micro-branding**: en `StripePayment.tsx` línea 940, `business.name` dice `'Lovivo'` → cambiar a `'Plieggo Arte'` para que Stripe muestre el nombre correcto.

**Archivos a modificar (Frente B):**
- `src/components/StripePayment.tsx`: banner de seguridad, fila de garantías + logos de pago debajo del CTA, rating opcional, fix `business.name`.
- `src/pages/ui/CheckoutUI.tsx`: estimación de entrega en resumen desktop y móvil (tras unificar plazo). Opcional: sello de confianza en el header del checkout.
- Posible nuevo componente `src/components/CheckoutTrustBadges.tsx` para reutilizar la fila de garantías + logos.
- Antes de escribir copy final → cargar skill `craft.copywriting`.

## 4. Recent Changes
- **2026-07-08** — 🔎 Diagnóstico checkout CRO. (1) MSI no aparecen porque `payments-create-intent` (edge Lovivo) no manda `payment_method_options.card.installments.enabled`; buildPayload no lo incluye. Escalado a Lovivo. (2) Checkout sin señales de confianza vs referencia rodata.mx. Plan de trust badges + logos de pago + rating + banner SSL definido.
- **2026-07-07** — ✅ "Arte vivo" honesto implementado. `LightShadowFeature.tsx` con prop `variant`: `triptych` (3 fotos) y `single` (1 foto lifestyle + copy honesto). `ProductPageUI.tsx` elige según best-seller.
- **2026-07-07** — 🔎 Decisión "Arte vivo" no-best-sellers: NO simular luz con filtro CSS. Variante `single` para los 14; triptych real solo best-sellers.
- **2026-07-07** — ✅ ProductCard estandarizado a 4:5 en TODAS las páginas. Hover siempre product.images[1].
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. `src/data/light-shadow-sets.ts`. Pendiente aprobación dueño.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots.
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. Azul Coral 4→12 reseñas. CTA reorder.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%.
- **2026-06-24** — ✅ Order Tracking: OrderTrack.tsx + rutas /orders/track.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo.
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico.
- **2026-06-03** — AllProducts/TopSellers: grid primero + trust strip → hero abajo.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych) — 2026-07-07**:
  - beige-sutil: mañana=`product-images/.../beige-sutil-manana.webp`, tarde=`message-images/.../1783465455514-erl7cp2ex7h.webp` (foto dueño), atardecer=`product-images/.../beige-sutil-atardecer.webp`
  - verde-salvia: mañana=`product-images/.../verde-salvia-manana.webp`, tarde=`message-images/.../1783465455514-6789ry46yfb.webp` (foto dueño), atardecer=`product-images/.../verde-salvia-atardecer.webp`
  - URLs completas y map en `src/data/light-shadow-sets.ts`.
- No-best-sellers: variante `single` usa `product.images[1]` (lifestyle padre) como única foto del bloque.
- **verde-salvia** (id 16782cd1-...): imágenes producto en /product-images/products/: cydjtdr71j7, jf3z6pes9v, fwf6yok6qvw, vq9ybpu5tj, r449lwaje3h, vscfxbcjx8.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.
- **Referencia checkout (rodata.mx)** — subida por dueño 2026-07-08 (`https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783523267899-632zgr9bxz.webp`): patrón de trust signals a imitar. Panel Stripe MSI habilitado (`...i9t70el5a6.webp`).

## 6. Known Issues
- **MSI depende de edge function Lovivo** (`payments-create-intent`) — no controlable desde storefront. Escalado 2026-07-08.
- **Inconsistencia tiempo de entrega**: announcement/FAQ dicen "5–7 días", trust strip PDP dice "10–15 días". Unificar ANTES de mostrar estimación de entrega en checkout (confirmar con dueño).
- **Verificar tarifa de envío Dashboard = $0 todo México** para no contradecir copy en checkout.
- `business.name: 'Lovivo'` en StripePayment.tsx L940 → debería ser 'Plieggo Arte'.
- **Imágenes con aspect ratio mixto (1:1 vs 4:5)**: dueño reporta que YA subió todo a 4:5. Verificar en preview.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** Craft Mode: intentar habilitar MSI vía `payment_method_options` en buildPayload; si falla, esperar fix de plataforma.
- **[ALTA]** Craft Mode: implementar trust signals en checkout (banner SSL, garantías, logos de pago, rating real, fix business.name).
- **[ALTA]** Unificar tiempo de entrega (5–7 vs 10–15 días) antes de mostrar estimación en checkout.
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[ALTA]** Verificar en preview que la variante `single` se vea premium en móvil.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.
- **[MEDIA]** Video del producto mostrando luz y sombra.