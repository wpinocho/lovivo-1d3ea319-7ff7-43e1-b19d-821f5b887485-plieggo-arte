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
**GOAL: Hacer REAL la sección "Arte vivo — La misma pieza, distinta a cada hora" (LightShadowFeature) generando fotos que muestren el cambio de luz/sombra a lo largo del día.**

### Contexto del componente
- `src/components/LightShadowFeature.tsx` recibe `images?: string[]` y muestra hasta 3 (grid-cols-3, aspect-[3/4]) con captions FIJOS: `["Luz de mañana", "Media tarde", "Al anochecer"]`.
- Se renderiza en `src/pages/ui/ProductPageUI.tsx` (import línea 43). Actualmente recibe las MISMAS fotos del producto, que NO reflejan cambio de luz → la promesa del copy no se cumple.

### Decisión estratégica (acordada con el dueño 2026-07-07)
- **Solo hacerlo en los 2 best-sellers primero**: `verde-salvia` y `acorden-beige-sutil`. NO los 16 productos (demasiado trabajo + riesgo). Medir conversión y expandir si funciona.
- **Regla clave de consistencia**: misma pared, mismo encuadre, mismo cuadro. SOLO cambian la luz y la dirección/longitud de las sombras. Si cambia el cuarto, se rompe la ilusión.
- 3 variantes por pieza que mapeen a los captions existentes: mañana (luz fría/suave), media tarde (neutra), atardecer (cálida, sombras largas y dramáticas).

### Implementación (Craft Mode)
1. `ecommerce--list-data(type='products', search='...')` para obtener URLs reales de cada best-seller.
   - Verde Salvia (`verde-salvia`, id 16782cd1-1729-47f8-840e-0ae1e07b08a5): elegir la MEJOR foto lifestyle (en pared/cuarto) como referencia única. Candidatas: vq9ybpu5tj.webp / fwf6yok6qvw.webp / r449lwaje3h.webp (1122×1402, ya verticales).
   - Beige Sutil: listar producto `acorden-beige-sutil` y elegir su mejor lifestyle.
2. `screenshot-preview(url=<referencia>)` para VER la foto antes de usarla como referencia.
3. `imagegen--generate_image` con `model='gemini'`, `reference_images=[UNA sola URL lifestyle]`, aspect 4:5 (1080×1350). Generar 3 tomas por pieza. Prompt describe SOLO la escena/luz (no el producto, ya viene de la referencia):
   - Mañana: "same wall, same framing, cool soft morning light from the side, gentle short shadows on the folds, airy calm mood, 4:5 vertical"
   - Media tarde: "same wall, same framing, neutral balanced midday light, even illumination, 4:5 vertical"
   - Atardecer: "same wall, same framing, warm golden-hour light raking across the surface, long dramatic shadows along the pleats, intimate cozy mood, 4:5 vertical"
4. Opcional: `image--optimize` para asegurar 1080×1350 y peso bajo.
5. Guardar las 3 URLs por producto y pasarlas a LightShadowFeature SOLO para esos 2 productos (condicional por slug), o subirlas al producto como imágenes dedicadas y filtrar cuáles alimentan la sección.
6. Verificar en móvil que el trío se vea coherente (misma escena, luz distinta).

### Archivos a tocar (Craft Mode)
- `src/pages/ui/ProductPageUI.tsx`: pasar las 3 imágenes de luz correctas a `<LightShadowFeature images={...} />` (por slug de best-seller). Posible fallback: si el producto no tiene set de luz, no forzar la sección con fotos que no aplican.
- Posiblemente `src/components/LightShadowFeature.tsx` si se quiere prop dedicada `lightImages` separada de la galería.

### Pendiente de confirmar con el dueño
- Aprobar las imágenes generadas antes de publicar (¿se ve creíble el mismo cuarto con distinta luz?).
- A futuro: A/B test / medir ATC de las 2 PDPs con la sección "real" vs. estado anterior.

## 4. Recent Changes
- **2026-07-07** — 🔎 Definida estrategia "Arte vivo" REAL: generar 3 fotos luz/sombra (mañana/tarde/atardecer) SOLO para verde-salvia y beige-sutil, misma escena, con gemini + reference lifestyle. Plan guardado. Pendiente ejecutar en Craft.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel (CarouselPrevious/Next) — ahora solo peek + dots. Quitado botón "Seguir comprando" superior para mejor pantallazo inicial. Imports ArrowLeft/CarouselPrevious/CarouselNext removidos.
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
- **verde-salvia** (best-seller, id 16782cd1-...): imágenes producto en /product-images/products/: cydjtdr71j7, jf3z6pes9v, fwf6yok6qvw, vq9ybpu5tj, r449lwaje3h, vscfxbcjx8. Lifestyle verticales candidatas para referencia luz: vq9ybpu5tj / fwf6yok6qvw / r449lwaje3h (1122×1402). Dueño va a poner lifestyle primera + estandarizar 4:5.
- **acorden-beige-sutil** (best-seller): igual, lifestyle primera + 4:5. Listar URLs en Craft.
- **PENDIENTE generar (Craft)**: 3 tomas luz/sombra por best-seller (mañana/tarde/atardecer, misma escena, 4:5).
- **Subidas 2026-07-07 (candidatas lifestyle, sin identificar)**: 1783458689994-5uesfw8dz0c.webp, 1783456522625-s9mtnrmllo.webp, 1783456522625-q8vm6pjvzbl.webp, 1783455743797-m7gioxa1zpn.webp, u3rt67kar6p.webp, bvj4lmefws.webp.

## 6. Known Issues
- **Sección "Arte vivo" NO muestra luz real**: captions dicen mañana/tarde/atardecer pero las fotos no cambian de luz. Pendiente generar imágenes reales (ver Active Plan).
- **Inconsistencia tiempo de entrega**: announcement/FAQ dicen "5–7 días", trust strip PDP dice "10–15 días". Unificar (confirmar con dueño).
- **Verificar tarifa de envío Dashboard = $0 todo México** para no contradecir copy en checkout.
- **Imágenes con aspect ratio mixto (1:1 vs 4:5)**: con object-cover las 1:1 se recortan. Dueño debe re-exportar TODAS a 4:5.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** Craft: generar 3 fotos luz/sombra por best-seller (verde-salvia + beige-sutil) y alimentarlas a LightShadowFeature por slug. Aprobar con dueño antes de publicar.
- **[ALTA]** Dueño: reordenar imágenes (lifestyle primera) + estandarizar a 4:5 en verde-salvia y beige-sutil.
- **[ALTA]** Unificar tiempo de entrega (5–7 vs 10–15 días).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[ALTA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** Si el efecto luz funciona en best-sellers → expandir al resto de productos.
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.
- **[MEDIA]** Video del producto mostrando luz y sombra.