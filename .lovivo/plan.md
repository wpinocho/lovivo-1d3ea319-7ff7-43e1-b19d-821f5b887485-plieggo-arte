# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Precio Luna: por variantes (revisar en DB). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente principal: Instagram (~5,300 visitas) + Facebook (~1,450). Casi todo tráfico social pagado/orgánico frío. Optimizar SIEMPRE mobile-first.
- Canal de venta paralelo: WhatsApp (link en PDP + FloatingWhatsApp en home). Parte del "interés" de tickets altos se captura por DM/WhatsApp fuera del funnel on-site — tenerlo en cuenta al leer el ATC bajo.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale
- Review photos: `aspect-[4/5]` (ReviewCard y GeneralReviewCard)
- AboutPage: editorial split-screen (no rounded corners, full-bleed images, pilares 3-col, dark proceso section)
- **PDP variant buttons**: `h-8 px-3 text-xs tracking-wide rounded-sm` — compactos, estilo editorial
- **Sticky bar**: una sola fila compacta, un solo botón terracota (icono carrito + "Agregar al carrito" + precio + tachado). Fondo crema #F2EFE4/95
- **ProductCard CTA**: botón terracota sólido `w-full h-8 px-3 text-xs tracking-wide uppercase rounded-sm bg-[#C16648]`
- **ProductCard price layout**: precio y tachado en la MISMA fila horizontal, botón abajo
- **FloatingWhatsApp**: solo en home (`/`)
- **Collection page layout**: Grid primero → Trust strip → Hero editorial → Reviews → Editorial split → CTA → Carousel
- **Menú principal**: Todos los Cuadros, Más Vendidos, Acordeón, Espacio, Galería, Nosotros, Rastrear pedido.

## 3. Active Plan
**GOAL: Subir conversión PDP → Agregar al carrito (viewcontent → addtocart). Estado: PLAN LISTO PARA CRAFT MODE.**

### Baseline (PostHog, 30d al 2026-07-07)
- viewcontent 4,909 → addtocart 87 → initiatecheckout 76 → purchase 12.
- **PDP → ATC global = 1.8%** (fuga principal del funnel; ATC → checkout → compra ya convierte bien).
- 96% tráfico móvil. Landing de anuncios dominante: `/products/acordeon-prisma-azul-coral` (1,242 visitantes únicos móvil).

### HALLAZGO CLAVE (smoking gun)
Los productos con MÁS tráfico tienen la **descripción VACÍA** en la base de datos, y convierten dramáticamente peor:
- `acordeon-prisma-azul-coral` (landing #1): `description=''` → ATC ≈ **0.56%** (7 uniq / 1,242).
- `acorden-prisma-onyx-opal`: `description=''`.
- `acordeon-prisma-beige-blanco`: `description=''`.
- `verde-salvia`: `description='<p><br></p>'` (vacío efectivo).
- COMPARACIÓN: `acorden-beige-sutil` (descripción completa) → ATC ≈ **2.6%** (18 uniq / 696). ~5x mejor con descripción.
- Las Lunas y acordeones viejos SÍ tienen descripción decente.

### Problemas de PDP diagnosticados (mobile-first)
1. **Descripciones vacías** en línea Prisma + Verde Salvia (los de más tráfico). Mayor palanca. [ecommerce → update-product]
2. **Diferenciador enterrado**: el "juego de luz y sombra que cambia con el día" (el hook emocional de arte) aparece solo como micro-bullet con ícono. No hay visual/video que lo demuestre.
3. **Copy sin beneficios**: los 3 bullets de craftsmanship son genéricos e iguales en todos. Falta storytelling por pieza (qué inspira la pieza, cómo se ve en el espacio, para quién).
4. **Prueba social baja**: la landing #1 muestra solo "4 reseñas verificadas". Poco para ticket $4,500.
5. **Jerarquía de CTAs invertida para ticket alto**: el botón primario sólido es "Comprar ahora" (alta fricción/compromiso inmediato) y "Agregar al carrito" (la acción que medimos, más suave) es secundario/outline, además del express checkout arriba = 3 CTAs compitiendo. Para arte caro conviene priorizar el ATC de baja fricción.
6. **Imagen hero poco inmersiva en móvil**: `object-contain` sobre fondo `muted`, aspect 4/5; la pieza enmarcada se ve pequeña con mucho fondo vacío. Marcas de arte premium usan imagen grande/inmersiva y en contexto.
7. `inventory_quantity: 0` en casi todas las variantes pero `track_inventory: false` → siguen comprables (verificado en preview, CTAs activos). No bloquea, pero limpiar para evitar sustos futuros.

### Plan de implementación (orden por impacto)
**FASE 1 — Copy (mayor ROI, hacer primero) — vía ecommerce update-product (Dashboard AI o Craft):**
1. Escribir descripciones para: `acordeon-prisma-azul-coral`, `acorden-prisma-onyx-opal`, `acordeon-prisma-beige-blanco`, `verde-salvia` (y auditar el resto). Estructura por pieza:
   - 1 línea de gancho emocional (el outcome: cómo transforma la pared / la luz).
   - 2-4 bullets con **beneficio en negrita** + feature de respaldo (papel libre de ácidos → dura décadas; hecho a mano 3-5 días → pieza única; pliegues → sombras que cambian con la luz del día).
   - 1 línea de contexto/uso (regalo, sala, oficina, medidas).
   - Cargar skill `craft.copywriting` antes de redactar. Tono premium/editorial, tú/tu, sin relleno ("premium/lujo" sin prueba).

**FASE 2 — PDP UI (`src/pages/ui/ProductPageUI.tsx`):**
2. Añadir subtítulo/gancho de 1 línea bajo el `<h1>` (value prop) — visible arriba en móvil.
3. Elevar el diferenciador "luz y sombra": bloque visual dedicado (secuencia de fotos mañana/tarde/noche o video corto) mostrando cómo cambian las sombras. [requiere media: imagegen/videogen en Craft]
4. Revisar jerarquía de CTAs: testear "Agregar al carrito" como primario sólido terracota y "Comprar ahora" secundario (o quitar duplicidad). Mantener sticky bar. NO A/B aún si volumen < 500 ATC/sem (hoy ~20/sem) → hacer cambio secuencial y comparar antes/después.
5. Aumentar prueba social visible cerca del título (nº reseñas + fotos reales de clientes).
6. Considerar imagen hero más inmersiva en móvil (mayor, menos fondo vacío) — evaluar `object-cover` vs `contain` con recorte cuidado para no cortar el marco.

**FASE 3 — Entender el PORQUÉ (complementario):**
7. Lanzar encuesta exit-intent en `/products/` (PostHog popover, mobile): "¿Qué te frenó de agregar este cuadro?" con opciones (precio, dudas de calidad/tamaño, costo/tiempo de envío, prefiero verlo antes, solo estaba mirando, otro). Esperar días, leer resultados, iterar. [posthog-survey]

### Medición
- Comparar viewcontent→addtocart por producto ANTES/DESPUÉS (ventana equivalente) en PostHog. Foco en `acordeon-prisma-azul-coral`. Objetivo: de ~0.56%/1.8% hacia 4-6%.

### Archivos / recursos
- Copy: ecommerce `update-product` (description) para los 4 slugs prioritarios.
- UI: `src/pages/ui/ProductPageUI.tsx` (subtítulo, bloque luz/sombra, jerarquía CTA, prueba social, hero).
- Media: `imagegen--generate_image` / `videogen--generate_video` para secuencia luz/sombra (Craft).
- Reviews: `src/data/product-reviews.ts` / `product-reviews-content.ts` para subir conteo/fotos.

## 4. Recent Changes
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8% global. HALLAZGO: línea Prisma + Verde Salvia con descripción vacía; azul-coral (landing #1) 0.56% ATC vs beige-sutil (con desc) 2.6%. Plan de 3 fases (copy → UI → survey). 96% tráfico móvil, viene de IG/FB.
- **2026-06-24** — ✅ Order Tracking COMPLETO: OrderTrack.tsx + OrderTrackUI.tsx, rutas /orders/track(/:token), CTA en MyOrders + ThankYou, "Rastrear pedido" en menú y footer.
- **2026-06-22** — ✅ Fix StripePayment.tsx: excluir `oxxo` de `buildElementsPaymentMethodTypes`
- **2026-06-22** — ✅ Fix tracking-utils.ts: `formatCurrency` devuelve mayúsculas (MXN)
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico + sessionStorage guard
- **2026-06-18** — ✅ CheckoutUI.tsx: línea "Descuento" en desktop para descuentos de link de pago
- **2026-06-18** — ✅ Fix checkout descuento manual: manualDiscountAmount en useCheckout + fallback cascada
- **2026-06-09** — PixelContext.tsx: fix fbc timestamp `Date.now()` → `Math.floor(Date.now()/1000)` (fix creationTime inválido en Meta)
- **2026-06-03** — AllProducts/TopSellers/CollectionEspacio: grid primero + trust strip → hero abajo (layout unificado)
- **2026-06-03** — EcommerceTemplate.tsx: FloatingWhatsApp solo en home
- **2026-06-03** — CollectionAcordeon.tsx: h1 "Colección Acordeón", hero usa h2

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- CollectionAcordeon HERO: `...1779296069343-1i4gabj0it4.webp` · EDITORIAL: `...1780499559157-3zjpthekjcj.webp`
- AllProducts HERO: `...1779296069343-2ifge8n87sv.webp` · CollectionEspacio HERO: `...1779296069343-1ra0u85wh3j.webp`
- Logo: `/public/logo.svg` · About Studio 1/2: `...5bg4llquutd.webp` / `...4wurhzmqhfg.webp`
- **PDP más visitadas (para trabajar imágenes/luz-sombra)**: acordeon-prisma-azul-coral (6 imgs), acorden-beige-sutil, verde-salvia, luna-llena.

## 6. Known Issues
- **Descripciones vacías**: `acordeon-prisma-azul-coral`, `acorden-prisma-onyx-opal`, `acordeon-prisma-beige-blanco`, `verde-salvia` (`<p><br></p>`). Prioridad ALTA — afecta conversión directamente.
- `inventory_quantity: 0` en casi todas las variantes con `track_inventory: false` (siguen comprables). Limpiar para evitar riesgo si alguien activa tracking.
- Confirmar `checkout_token` en `completed_order` (localStorage) para CTA "Rastrear mi pedido" de ThankYou.
- Verificar shape real del response `order-track` en producción.
- Handle de Colección Acordeón en DB con typo `coleccin-acorden` — corregido en código.
- Video play error recurrente en hero (race condition) — no afecta funcionalidad.
- Luna Beige con pocas fotos; `plieggo-general-reviews.ts` con `photoUrl` vacío en g1,g2,g3,g5,g6,g7,g8.
- Stripe Link NO activado; ECE (Apple/Google Pay) no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** FASE 1 CRO: escribir descripciones de los 4 slugs Prisma/Verde Salvia (+ auditar resto) con `craft.copywriting`.
- **[ALTA]** FASE 2 CRO: subtítulo gancho, bloque visual luz/sombra, jerarquía CTA, prueba social en ProductPageUI.tsx.
- **[ALTA]** FASE 3 CRO: lanzar encuesta exit-intent en /products/ (mobile) y leer resultados.
- **[ALTA]** Crear `.lovivo/cro-log.md` al hacer los cambios (registrar baseline + hipótesis + resultado).
- **[ALTA]** Verificación end-to-end Order Tracking en producción.
- **[ALTA]** Garantizar `checkout_token` en `completed_order`.
- **[ALTA]** Performance móvil: fuentes a HTML, lazy-load InspirationCarousel, fetchpriority en hero.
- **[ALTA]** Fix clients-upsert (nombre/apellido/teléfono).
- **[MEDIA]** Subir fotos reales de reseñas (g1,g2,g3,g5,g6,g7,g8) y más reviews por producto.
- **[MEDIA]** Video del producto mostrando el juego de luz y sombra.
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada.