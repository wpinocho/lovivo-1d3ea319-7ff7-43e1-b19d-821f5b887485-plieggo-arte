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
- **PDP variant buttons**: h-8 px-3 text-xs rounded-sm
- **Galería móvil PDP**: carrusel con peek (basis-[86%]) + counter chip + dots (activo terracota). object-cover en 4:5.
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350px).** Contenedor PDP es aspect-[4/5]. Todas las imágenes deben exportarse a 4:5 para llenar sin recorte ni letterbox.

## 3. Active Plan
**GOAL: PDP best-sellers listas para maximizar ATC en móvil.** Envío gratis corregido ✅. Galería móvil mejorada ✅. Pendiente: dueño reordena imágenes (lifestyle primera) + estandariza a 4:5.

## 4. Recent Changes
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios (AnnouncementBar 13, ProductPageUI trust strip, ProductFAQ). Grep confirma sin residuos "$200"/"CDMX".
- **2026-07-07** — ✅ Galería móvil PDP: peek de siguiente imagen (basis-[86%] + align start), counter chip "n/N", dots de paginación (activo terracota), object-contain→object-cover para eliminar whitespace lateral. Estados currentSlide/slideCount + effect sobre carouselApi.
- **2026-07-07** — 🔎 Recomendación al dueño: estandarizar TODAS las imágenes de producto a 4:5 (1080×1350); subir 5-6 por pieza (packshot, lifestyle luz/sombra, detalle textura, escala, ambiente).
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. Azul Coral 4→12 reseñas. CTA reorder. LightShadowFeature.tsx. Prisma default 50x50.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%. Hallazgo: desc vacías 0.56% vs con desc 2.6%.
- **2026-06-24** — ✅ Order Tracking: OrderTrack.tsx + rutas /orders/track.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo.
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico.
- **2026-06-03** — AllProducts/TopSellers: grid primero + trust strip → hero abajo.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **verde-salvia** (best-seller): dueño va a poner lifestyle (luz/sombra) como PRIMERA imagen. Estandarizar a 4:5.
- **acorden-beige-sutil** (best-seller): igual, lifestyle primera + 4:5.
- **Subidas 2026-07-07**: 1783456522625-s9mtnrmllo.webp, 1783456522625-q8vm6pjvzbl.webp (mensaje actual) + m7gioxa1zpn/u3rt67kar6p/bvj4lmefws (previo) — fotos lifestyle candidatas. Sin identificar aún.

## 6. Known Issues
- **Inconsistencia tiempo de entrega**: announcement/FAQ dicen "5–7 días", trust strip PDP dice "10–15 días". Unificar (confirmar con dueño).
- **Verificar tarifa de envío Dashboard = $0 todo México** para no contradecir copy en checkout.
- **Imágenes con aspect ratio mixto (1:1 vs 4:5)**: con object-cover las 1:1 se recortan. Dueño debe re-exportar TODAS a 4:5.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** Dueño: reordenar imágenes (lifestyle primera) + estandarizar a 4:5 en verde-salvia y beige-sutil.
- **[ALTA]** Unificar tiempo de entrega (5–7 vs 10–15 días).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[ALTA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.
- **[MEDIA]** Video del producto mostrando luz y sombra.