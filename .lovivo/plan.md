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

## 3. Active Plan
**GOAL: ✅ HECHO (pendiente aprobación del dueño) — Sección "Arte vivo" REAL en los 2 best-sellers.**

- Componente `src/components/LightShadowFeature.tsx`: recibe `images?: string[]`, muestra hasta 3 con captions FIJOS `["Luz de mañana", "Media tarde", "Al anochecer"]` (grid-cols-3, aspect-[3/4], object-cover).
- Ahora `ProductPageUI.tsx` (línea ~765) usa `getLightShadowSet(product.slug)` de `src/data/light-shadow-sets.ts`. Si el slug tiene set real de luz, lo usa; si no, cae al comportamiento anterior (galería del producto).
- **Sets reales creados**: beige-sutil y verde-salvia. Cada set = [mañana generada, media-tarde (foto real del dueño), atardecer generada]. Misma escena, solo cambia luz.
- Imágenes generadas con gemini + reference lifestyle del dueño (1 URL por pieza), 3:4, ~1200×1600.

### Pendiente
- **Dueño debe aprobar** las 4 imágenes generadas (mañana/atardecer × 2). Ver en las PDPs de verde-salvia y acorden-beige-sutil tras el deploy.
- Los otros 14 productos SIGUEN mostrando la sección con fotos del producto (no cambian de luz) — sigue "mintiendo". Decidir: quitarla de no-best-sellers o expandir el efecto. Ver Known Issues.
- Medir ATC de estas 2 PDPs vs antes; si sube, expandir efecto al resto.

## 4. Recent Changes
- **2026-07-07** — ✅ ProductCard estandarizado a 4:5 en TODAS las páginas (ProductCardUI ignora prop aspectRatio, usa aspect-[4/5] + object-cover). Skeletons a 4:5 en Index/TopSellers/AllProducts/CollectionAcordeon/CollectionEspacio. Hover ahora SIEMPRE muestra product.images[1] (2ª imagen general), sin importar variante ni colección (se ignora hoverImageIndex).
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. Creado `src/data/light-shadow-sets.ts` (map slug→[mañana, tarde, atardecer]). Generadas 4 imágenes (gemini + reference lifestyle del dueño): beige-sutil-manana/atardecer, verde-salvia-manana/atardecer. Media tarde = fotos reales subidas por el dueño. ProductPageUI ahora pasa el set por slug con fallback. Pendiente aprobación dueño.
- **2026-07-07** — 🔎 Definida estrategia "Arte vivo" REAL (mañana/tarde/atardecer) SOLO para verde-salvia y beige-sutil, misma escena.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots. Quitado botón "Seguir comprando" superior.
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios (AnnouncementBar, ProductPageUI trust strip, ProductFAQ).
- **2026-07-07** — ✅ Galería móvil PDP: peek (basis-[86%]), counter chip, dots, object-cover.
- **2026-07-07** — 🔎 Recomendación: estandarizar TODAS las imágenes de producto a 4:5 (1080×1350).
- **2026-07-07** — ✅ FASE 1+2 CRO. Descripciones premium 12 productos. Azul Coral 4→12 reseñas. CTA reorder. LightShadowFeature.tsx.
- **2026-07-07** — 🔎 Diagnóstico CRO PDP→ATC. Baseline 1.8%. Desc vacías 0.56% vs con desc 2.6%.
- **2026-06-24** — ✅ Order Tracking: OrderTrack.tsx + rutas /orders/track.
- **2026-06-22** — ✅ Fix StripePayment: excluir oxxo.
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico.
- **2026-06-03** — AllProducts/TopSellers: grid primero + trust strip → hero abajo.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo) — 2026-07-07**:
  - beige-sutil: mañana=`product-images/.../beige-sutil-manana.webp`, tarde=`message-images/.../1783465455514-erl7cp2ex7h.webp` (foto dueño), atardecer=`product-images/.../beige-sutil-atardecer.webp`
  - verde-salvia: mañana=`product-images/.../verde-salvia-manana.webp`, tarde=`message-images/.../1783465455514-6789ry46yfb.webp` (foto dueño), atardecer=`product-images/.../verde-salvia-atardecer.webp`
  - URLs completas y map en `src/data/light-shadow-sets.ts`.
- **verde-salvia** (id 16782cd1-...): imágenes producto en /product-images/products/: cydjtdr71j7, jf3z6pes9v, fwf6yok6qvw, vq9ybpu5tj, r449lwaje3h, vscfxbcjx8.
- **acorden-beige-sutil**: lifestyle primera + 4:5 pendiente por dueño.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **Sección "Arte vivo" en los 14 NO best-sellers sigue sin luz real**: usa fotos del producto que no cambian de luz. Decidir con dueño: (a) ocultarla para productos sin set, o (b) generar sets. Ahora mismo se mantiene por defecto para no reducir contenido sin datos.
- **Inconsistencia tiempo de entrega**: announcement/FAQ dicen "5–7 días", trust strip PDP dice "10–15 días". Unificar (confirmar con dueño).
- **Verificar tarifa de envío Dashboard = $0 todo México** para no contradecir copy en checkout.
- **Imágenes con aspect ratio mixto (1:1 vs 4:5)**: con object-cover las 1:1 se recortan. Dueño debe re-exportar TODAS a 4:5.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Video play error recurrente en hero (race condition) — no afecta.
- Stripe Link NO activado; ECE no aparece en preview (esperado).

## 7. Pending / Future Sessions
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" tras el deploy en verde-salvia y beige-sutil.
- **[ALTA]** Decidir qué hacer con "Arte vivo" en los no best-sellers (ocultar vs expandir).
- **[ALTA]** Dueño: reordenar imágenes (lifestyle primera) + estandarizar a 4:5.
- **[ALTA]** Unificar tiempo de entrega (5–7 vs 10–15 días).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[ALTA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** Si el efecto luz funciona en best-sellers → expandir al resto.
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.
- **[MEDIA]** Video del producto mostrando luz y sombra.