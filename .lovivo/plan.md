# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Este es el estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.

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
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350px).**
- **"Arte vivo" (LightShadowFeature)**: variantes `triptych` (best-sellers) y `single` (resto).
- **CHECKOUT trust signals (implementado 2026-07-08)**: componente reutilizable `src/components/CheckoutTrustBadges.tsx` con 4 bloques: `CheckoutSecurityBanner` (candado SSL/Stripe), `CheckoutRating` (rating real calculado del catálogo), `CheckoutGuarantees` (envío gratis / pago seguro / garantía), `CheckoutPaymentLogos` (chips monocromo Visa/MC/Amex/Apple Pay/G Pay/OXXO). Iconos SVG line terracota, sin emojis, sin glow.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto** (`MobileOrderSummary` useState(true)).

## 3. Active Plan
**OBJETIVO: Subir conversión initiate_checkout → purchase (baseline ~30%).**

### FRENTE A — Meses sin intereses (MSI)
**Intento Craft Mode APLICADO (2026-07-08):** En `StripePayment.tsx buildPayload` se agregó `payment_method_options: { card: { installments: { enabled: true } } }`. Si la edge `payments-create-intent` reenvía el param a Stripe, los MSI aparecen solos en el PaymentElement en tarjetas MX elegibles ($4,500 califica).
- **PENDIENTE VERIFICAR EN PREVIEW** con tarjeta MX elegible tras el deploy.
- Si NO aparecen → la edge no soporta `installments`. Ya escalado a Lovivo. Esperar fix de plataforma.
- Copy futuro cuando aparezcan: "Paga a 3, 6 o 12 meses sin intereses" en PDP/checkout.

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
Todo en frontend (Craft Mode). Hecho:
1. ✅ Banner SSL arriba del bloque de pago.
2. ✅ Fila de garantías debajo del CTA.
3. ✅ Logos de métodos de pago debajo de garantías.
4. ✅ Rating real (~4.8★ · +196) antes del CTA.
5. ✅ Estimación de entrega "Envío gratis · Llega en 5-7 días hábiles" en resumen desktop y móvil.
6. ✅ Fix `business.name` 'Lovivo' → 'Plieggo Arte'.
7. ✅ Resumen móvil abierto por defecto.

## 4. Recent Changes
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen ahora 4:5 (móvil w-12 h-[60px], desktop w-16 h-20, +bg-muted) para no recortar imágenes 4:5. Envío en resumen móvil muestra "GRATIS" siempre (antes "Pendiente" cuando shippingCost=0).
- **2026-07-08** — ✅ CHECKOUT CRO implementado. Nuevo `CheckoutTrustBadges.tsx` (banner SSL, rating real calculado, garantías, logos de pago). Integrado en `StripePayment.tsx`: banner arriba, rating antes del CTA, garantías+logos debajo, fix business.name→'Plieggo Arte', MSI vía `payment_method_options` en buildPayload. `CheckoutUI.tsx`: resumen móvil abierto por defecto + estimación 5-7 días en resumen desktop y móvil.
- **2026-07-08** — 🔎 Diagnóstico checkout CRO. MSI no aparecen porque edge `payments-create-intent` no mandaba installments. Escalado a Lovivo.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5 en TODAS las páginas. Hover product.images[1].
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. `light-shadow-sets.ts`.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots.
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. CTA reorder.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%.
- **2026-06-24** — ✅ Order Tracking: OrderTrack.tsx + rutas /orders/track.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo.
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico.
- **2026-06-03** — AllProducts/TopSellers: grid primero + trust strip → hero abajo.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs completas y map en `src/data/light-shadow-sets.ts`.
- No-best-sellers: variante `single` usa `product.images[1]`.
- **verde-salvia** (id 16782cd1-...): imágenes en /product-images/products/.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.
- **Referencia checkout (rodata.mx)** — patrón de trust signals imitado 2026-07-08.

## 6. Known Issues
- **MSI depende de edge function Lovivo** (`payments-create-intent`). Intento Craft Mode aplicado; VERIFICAR en preview. Si falla, esperar fix de plataforma.
- **Verificar tarifa de envío Dashboard = $0 todo México** para no contradecir copy en checkout.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** VERIFICAR en preview: (a) MSI aparecen con tarjeta MX elegible; (b) trust badges se ven premium en móvil.
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Si MSI funcionan: agregar micro-copy "3/6/12 meses sin intereses" en PDP.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.
- **[MEDIA]** Video del producto mostrando luz y sombra.