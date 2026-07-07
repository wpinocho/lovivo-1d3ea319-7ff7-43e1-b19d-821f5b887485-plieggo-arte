# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente principal: Instagram (~5,300 visitas) + Facebook (~1,450). Casi todo tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal de venta paralelo: WhatsApp (link en PDP + FloatingWhatsApp en home).
- **ENVÍO (actualizado 2026-07-07): GRATIS EN TODO MÉXICO.** Ya NO se cobra $200 al interior. Todo el copy debe reflejarlo.
- **Best-sellers reales (dato del dueño 2026-07-07): `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización de PDP.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif).
- Fondo continuo sin bandas de color. Estilo Zara Home / Muji. Iconos SVG line en terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Botones limpios.
- **PDP CTA hierarchy**: "Agregar al carrito" PRIMARIO sólido terracota (bg-[#C16648], h-14); "Comprar ahora" SECUNDARIO outline (h-12); express checkout TERCIARIO con separador "o paga directo".
- **Sticky bar**: una fila, un botón terracota. Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm bg-[#C16648]
- **PDP variant buttons**: h-8 px-3 text-xs tracking-wide rounded-sm
- **Review photos**: aspect-[4/5]
- **FloatingWhatsApp**: solo en home.

## 3. Active Plan
**GOAL: Corregir copy de envío (ahora gratis en todo México) + optimizar las 2 PDP best-seller (galería móvil + primera imagen) para subir ATC.**

### TAREA A — Envío gratis en todo México (3 ubicaciones exactas)
1. `src/components/AnnouncementBar.tsx` línea 13: `'Envío gratis en CDMX • Entrega 5-7 días hábiles'` → `'Envío gratis a todo México • Entrega 5–7 días hábiles'`.
2. `src/pages/ui/ProductPageUI.tsx` líneas 703-704 (trust strip bajo CTA):
   - `<p className="font-semibold ...">Envío gratis CDMX</p>` → `Envío gratis`
   - `<p>$200 MXN al resto de México</p>` → `A todo México`
3. `src/components/ProductFAQ.tsx` líneas 43-44 (FAQ "¿Cuánto tarda el envío?"): reemplazar las dos líneas CDMX/Nacional por una sola: `<p><span className="font-medium text-foreground">Todo México:</span> 5–7 días hábiles (GRATIS)</p>`. Mantener la línea itálica "Cada pieza se elabora especialmente para ti ✦".
   - NOTA: el FAQ actual dice "10–15 días" en el trust strip PDP (línea 710) pero "5–7 días" en announcement/FAQ. Unificar tiempo de entrega — confirmar con dueño cuál es el correcto; por ahora dejar "5–7" en copy nuevo salvo el trust strip que ya dice 10–15 (revisar consistencia).
4. Verificar que no haya otras menciones de "CDMX"/"$200" de envío (grep ya confirmó solo estos 3 archivos + PriceRuleBadge línea 38 que es otro contexto — revisar).

### TAREA B — Galería de imágenes móvil (afford­ance tipo rodata.mx)
Archivo: `src/pages/ui/ProductPageUI.tsx`, bloque "Mobile: carousel" (líneas 285-312). Hoy solo tiene flechas, sin indicación de que hay más imágenes.
1. Añadir **peek de la siguiente imagen**: en el `<Carousel>` usar `opts={{ align: 'start' }}` y en `<CarouselItem>` usar `className="basis-[86%] pl-2"` (o similar) para que se asome ~14% de la siguiente imagen → señal visual de "hay más, desliza".
2. Añadir **contador de posición** tipo "2 / 6": usar `carouselApi` (ya existe `setCarouselApi`) para leer `selectedScrollSnap()` y `scrollSnapList().length`. Mostrar chip pequeño abajo-derecha sobre la imagen: `absolute bottom-3 right-3 bg-foreground/70 text-background text-xs px-2 py-0.5 rounded-full`.
3. Alternativa/complemento: **dots de paginación** centrados debajo del carrusel (mapear `scrollSnapList()`), dot activo terracota (#C16648), inactivos muted. Elegir contador O dots (recomendado: dots + peek; el contador es opcional).
4. Mantener las flechas actuales.
5. NO tocar la galería desktop (thumbnails funcionan bien).

### TAREA C — Primera imagen = lifestyle (juego de luz/sombra)
Recomendación: para tráfico social frío móvil, la PDP debe abrir con la foto **en contexto (en pared, con sombras)** — es el gancho emocional y muestra el diferenciador de luz/sombra al instante. El packshot limpio pasa a segunda posición.
- Esto se hace **reordenando las imágenes del producto** (mover la foto lifestyle al índice 0 de la variante default). La galería lee de `variant.image_urls` (por variante). Para `verde-salvia` la default es 50×50 (variant `79bc67a5...`, image_urls: jf3z6pes9v [packshot square], vq9ybpu5tj, vscfxbcjx8). Poner primero la que muestra la pieza en pared con sombras.
- Herramienta: `update-product` (Craft Mode) reordenando `images` y `variant.image_urls`, o desde el Dashboard (editor de producto → arrastrar imágenes).
- Aplicar mismo criterio a `acorden-beige-sutil` (variant default 50×50 `2d5b8b59...`).
- **PENDIENTE**: confirmar con el dueño CUÁL de las fotos existentes es la lifestyle con sombras para cada producto (o si las 3 .webp subidas hoy son esas). El dueño subió en este mensaje: 1783455743797-m7gioxa1zpn.webp, 1783455743798-u3rt67kar6p.webp, 1783455743798-bvj4lmefws.webp (posibles nuevas fotos lifestyle). Revisar/copiar con lov-copy y ver contenido antes de asignar.
- Es reversible y idealmente A/B testeable (lifestyle-first vs packshot-first) más adelante.

### TAREA D — Maximizar ATC en las 2 best-seller (finos)
La jerarquía de CTA ya está bien (ATC primario). Optimizaciones adicionales de bajo riesgo:
1. Galería (Tarea B) es la palanca #1 aquí: más gente que ve las fotos lifestyle/sombra → más deseo → más ATC.
2. Considerar micro-urgencia sutil o social proof cercano al CTA (ej. mini-línea "★ 4.9 · 14 reseñas" ya está arriba del precio — ok).
3. Confirmar que el sticky bar aparece correctamente al hacer scroll (ya implementado).

### TAREA E — Verificación operativa (Dashboard, NO código)
- Confirmar que la **tarifa de envío real en Dashboard** esté en $0 para todo México, para que el copy "gratis" no se contradiga en el checkout. Avisar al dueño: esto se ajusta en Dashboard > Configuración de envíos.

## 4. Recent Changes
- **2026-07-07** — 🔎 Diagnóstico + PLAN: corregir envío (gratis todo México, 3 archivos: AnnouncementBar 13, ProductPageUI 703-704, ProductFAQ 43-44), mejorar galería móvil (peek + dots/contador), y evaluar primera imagen lifestyle en verde-salvia y acorden-beige-sutil (best-sellers reales). Pendiente construir en Craft Mode.
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium para los 12 productos activos. Azul Coral 4→12 reseñas. CTA reorder (ATC primario). Nuevo `LightShadowFeature.tsx`. Prisma default 50x50 en `HeadlessProduct.tsx`. Creado `.lovivo/cro-log.md`.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%. Hallazgo: desc vacías = 0.56% vs con desc 2.6%.
- **2026-06-24** — ✅ Order Tracking COMPLETO: OrderTrack.tsx + OrderTrackUI.tsx, rutas /orders/track(/:token).
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo de buildElementsPaymentMethodTypes
- **2026-06-22** — ✅ Fix tracking-utils: formatCurrency mayúsculas (MXN)
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico + sessionStorage guard
- **2026-06-18** — ✅ CheckoutUI: línea "Descuento" desktop para link de pago
- **2026-06-09** — PixelContext: fix fbc timestamp a segundos
- **2026-06-03** — AllProducts/TopSellers/CollectionEspacio: grid primero + trust strip → hero abajo
- **2026-06-03** — EcommerceTemplate: FloatingWhatsApp solo en home

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · **slide 2**: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **verde-salvia** (best-seller): 6 imgs. Default 50×50 usa [jf3z6pes9v (packshot square), vq9ybpu5tj, vscfxbcjx8]. Decidir cuál es la lifestyle-con-sombra para ponerla primera.
- **acorden-beige-sutil** (best-seller): 6 imgs. Default 50×50 usa [h6u4ch708qj, vr5zan9zjca, sw1091x93ui].
- **Subidas 2026-07-07 (mensaje actual)**: 1783455743797-m7gioxa1zpn.webp, 1783455743798-u3rt67kar6p.webp, 1783455743798-bvj4lmefws.webp — posibles fotos lifestyle/luz-sombra de verde-salvia. REVISAR con lov-copy antes de asignar como primera imagen.
- **PENDIENTE previo**: 3 imágenes review-1..3.webp de sesión anterior sin identificar.

## 6. Known Issues
- **Inconsistencia tiempo de entrega**: announcement/FAQ dicen "5–7 días", trust strip PDP dice "10–15 días". Unificar (confirmar con dueño).
- **Verificar tarifa de envío en Dashboard = $0 todo México** para no contradecir el copy en checkout.
- `inventory_quantity: 0` en casi todas las variantes con track_inventory:false (siguen comprables).
- Handle Colección Acordeón en DB con typo coleccin-acorden (corregido en código).
- Video play error recurrente en hero (race condition) — no afecta funcionalidad.
- plieggo-general-reviews.ts con photoUrl vacío en g1,g2,g3,g5,g6,g7,g8.
- Stripe Link NO activado; ECE (Apple/Google Pay) no aparece en preview (esperado).
- Reseñas nuevas de Azul Coral (ids 5-12) están a validación del dueño.

## 7. Pending / Future Sessions
- **[ALTA]** Construir TAREA A-D del Active Plan en Craft Mode.
- **[ALTA]** Identificar las 3 fotos .webp subidas hoy y decidir primera imagen lifestyle para verde-salvia y beige-sutil.
- **[ALTA]** Unificar tiempo de entrega (5–7 vs 10–15 días).
- **[ALTA]** FASE 3 CRO: lanzar encuesta exit-intent en /products/ (mobile).
- **[ALTA]** Medición viewcontent→addtocart antes/después (~30d) en PostHog, foco azul-coral + best-sellers.
- **[MEDIA]** A/B test lifestyle-first vs packshot-first como primera imagen.
- **[MEDIA]** Video del producto mostrando el juego de luz y sombra.
- **[MEDIA]** Subir fotos reales de reseñas generales (g1..g8).