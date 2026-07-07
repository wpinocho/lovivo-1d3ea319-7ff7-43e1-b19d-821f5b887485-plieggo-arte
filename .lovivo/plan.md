# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente principal: Instagram (~5,300 visitas) + Facebook (~1,450). Casi todo tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal de venta paralelo: WhatsApp (link en PDP + FloatingWhatsApp en home). Parte del interés de tickets altos se captura por DM fuera del funnel on-site.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif). font-sans/heading = DM Sans, font-serif/body = Crimson Pro
- Fondo continuo sin bandas de color. Estilo Zara Home / Muji. Iconos SVG line en terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Botones limpios.
- **PDP CTA hierarchy (2026-07-07)**: "Agregar al carrito" PRIMARIO sólido terracota (bg-[#C16648], h-14); "Comprar ahora" SECUNDARIO outline (h-12); express checkout TERCIARIO con separador "o paga directo".
- **Sticky bar**: una fila, un botón terracota (carrito + "Agregar al carrito" + precio + tachado). Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm bg-[#C16648]
- **PDP variant buttons**: h-8 px-3 text-xs tracking-wide rounded-sm
- **Review photos**: aspect-[4/5]
- **FloatingWhatsApp**: solo en home. **Menú**: Todos los Cuadros, Más Vendidos, Acordeón, Espacio, Galería, Nosotros, Rastrear pedido.

## 3. Active Plan
**GOAL: Subir conversión PDP → ATC. FASE 1 (copy) + FASE 2 (UI) IMPLEMENTADAS 2026-07-07. Falta FASE 3 (encuesta) + medición.**
- Baseline: PDP→ATC global 1.8%; azul-coral 0.56% (era desc vacía). Objetivo 4-6%. Detalle completo en `.lovivo/cro-log.md`.
- **Próximo paso**: lanzar encuesta exit-intent en /products/ (mobile) y, en ~30 días, comparar viewcontent→addtocart antes/después en PostHog (foco azul-coral).

## 4. Recent Changes
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium (gancho+beneficios) para los 12 productos activos (4 estaban vacías: prisma azul-coral/onyx-opal/beige-blanco + verde-salvia). Azul Coral 4→12 reseñas verificadas. CTA reorder (ATC primario). Nuevo `LightShadowFeature.tsx` (bloque luz/sombra con fotos reales). Prisma default 50x50 en `HeadlessProduct.tsx`. Creado `.lovivo/cro-log.md`.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%. Hallazgo: desc vacías = 0.56% vs con desc 2.6%.
- **2026-06-24** — ✅ Order Tracking COMPLETO: OrderTrack.tsx + OrderTrackUI.tsx, rutas /orders/track(/:token), CTA en MyOrders + ThankYou.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo de buildElementsPaymentMethodTypes
- **2026-06-22** — ✅ Fix tracking-utils: formatCurrency mayúsculas (MXN)
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico + sessionStorage guard
- **2026-06-18** — ✅ CheckoutUI: línea "Descuento" desktop para link de pago
- **2026-06-09** — PixelContext: fix fbc timestamp a segundos
- **2026-06-03** — AllProducts/TopSellers/CollectionEspacio: grid primero + trust strip → hero abajo
- **2026-06-03** — EcommerceTemplate: FloatingWhatsApp solo en home

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp (lifestyle → /top-sellers) · **slide 2**: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- CollectionAcordeon HERO: ...1779296069343-1i4gabj0it4.webp · AllProducts HERO: ...1779296069343-2ifge8n87sv.webp
- Logo: /public/logo.svg
- **PENDIENTE REVISAR**: 3 imágenes subidas por el dueño (2026-07-07) — copiadas a public/uploads/review-1..3.webp; el visor no renderiza webp crudo, contenido desconocido. Preguntar al dueño qué son (posibles fotos de cliente o secuencia luz/sombra).
- **LightShadowFeature** usa las fotos propias de cada producto (displayImages), no requiere assets nuevos.

## 6. Known Issues
- `inventory_quantity: 0` en casi todas las variantes con track_inventory:false (siguen comprables). Limpiar si alguien activa tracking.
- Confirmar checkout_token en completed_order (localStorage) para CTA "Rastrear mi pedido" en ThankYou.
- Verificar shape response order-track en producción.
- Handle Colección Acordeón en DB con typo coleccin-acorden (corregido en código).
- Video play error recurrente en hero (race condition) — no afecta funcionalidad.
- plieggo-general-reviews.ts con photoUrl vacío en g1,g2,g3,g5,g6,g7,g8.
- Stripe Link NO activado; ECE (Apple/Google Pay) no aparece en preview (esperado).
- Reseñas nuevas de Azul Coral (ids 5-12) están a validación del dueño.

## 7. Pending / Future Sessions
- **[ALTA]** FASE 3 CRO: lanzar encuesta exit-intent en /products/ (mobile) y leer resultados.
- **[ALTA]** Medición: comparar viewcontent→addtocart antes/después (~30d) en PostHog, foco azul-coral.
- **[ALTA]** Preguntar al dueño qué son las 3 imágenes subidas (review-1..3.webp) y ubicarlas.
- **[ALTA]** Verificación end-to-end Order Tracking en producción + garantizar checkout_token en completed_order.
- **[ALTA]** Performance móvil: fuentes a HTML, lazy-load InspirationCarousel, fetchpriority en hero.
- **[ALTA]** Fix clients-upsert (nombre/apellido/teléfono).
- **[MEDIA]** Subir fotos reales de reseñas generales (g1..g8) y más reviews por producto.
- **[MEDIA]** Video del producto mostrando el juego de luz y sombra (para reforzar LightShadowFeature).
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada.