# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale

## 3. Active Plan
**OBJETIVO**: Replicar el esquema editorial de /top-sellers en las otras 3 páginas de colección:
- `/all-products` → AllProducts.tsx
- `/coleccion-acordeon` → CollectionAcordeon.tsx
- `/coleccion-espacio` → CollectionEspacio.tsx

**Estructura a replicar (igual que TopSellers.tsx):**
1. Hero editorial compacto (`clamp(340px, 55vh, 520px)`) — imagen de fondo + overlay degradado + badge estrellas + H1 + subline + CTA "Ver cuadros"
2. Trust strip — 4 íconos (Hand, Sparkles, Truck, RotateCcw) — mismos que TopSellers
3. Productos grid (`id="productos"`) — con título de sección centrado, grid 2 cols en móvil
4. Mini social proof — 2 reviews de `plieggoGeneralReviews` (usar índices [0] y [2] para variar)
5. Editorial split — imagen + eyebrow text + H2 + 3 bullets (contenido único por colección)
6. CTA final — WhatsApp + link a otra sección
7. InspirationCarousel

---

### AllProducts.tsx — Implementación detallada

**Hero:**
- Imagen: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp`
- Alt: "Todos los cuadros Plieggo"
- H1: `Arte hecho a mano<br>que transforma tu espacio`
- Subline: `Explora toda la colección — piezas únicas en papel con técnica de pliegue artesanal.`
- Badge: `4.9 · +50 hogares transformados`
- CTA: `Ver cuadros` → scroll a `#productos`

**Sección título grid:** `Toda la colección`

**Editorial split:**
- Imagen (lado izquierdo): `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/all-products.webp`
- Eyebrow: `Arte artesanal mexicano`
- H2: `¿Qué hace único a cada cuadro?`
- Bullets:
  1. **Sin producción en serie** — "Ningún cuadro es igual a otro. Cada pieza se dobla a mano, una por una, desde cero."
  2. **Vivos con la luz** — "Las sombras cambian según la hora del día. El cuadro que ves en la mañana es diferente al de la tarde."
  3. **Listo para colgar** — "Llega enmarcado y listo para instalar. Sin compras adicionales ni sorpresas."

**CTA final:**
- Título: `¿Tienes alguna pregunta?`
- Subline: `Estamos aquí para ayudarte a encontrar la pieza perfecta.`
- Botón 1 (primario): WhatsApp — `https://wa.me/525531215386?text=%C2%A1Hola!%20Tengo%20una%20pregunta%20sobre%20los%20cuadros%20de%20Plieggo`
- Botón 2 (secundario): `Ver los más vendidos` → `/top-sellers`

---

### CollectionAcordeon.tsx — Implementación detallada

**Hero:**
- Imagen: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1i4gabj0it4.webp`
- Alt: "Colección Acordeón Plieggo"
- H1: `Pliegues que crean<br>ritmo visual`
- Subline: `La Colección Acordeón explora la geometría del papel — ritmo, simetría y dinamismo en cada doblez.`
- Badge: `4.9 · +50 hogares transformados`
- CTA: `Ver cuadros` → scroll a `#productos`

**Sección título grid:** `Colección Acordeón`

**Editorial split:**
- Imagen: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon.webp`
- Eyebrow: `Colección Acordeón`
- H2: `Geometría en cada pliegue`
- Bullets:
  1. **Patrón rítmico** — "Los pliegues se repiten como notas en una partitura. La regularidad crea calma visual sin aburrimiento."
  2. **Sombras cambiantes** — "Con la luz del día las sombras se mueven y transforman la pieza. Cada hora la ves diferente."
  3. **Hecho en México** — "Producción artesanal local, en papel de alta calidad. Ningún cuadro sale igual al anterior."

**CTA final:**
- Título: `¿Te gustó la colección Acordeón?`
- Subline: `Escríbenos para encontrar la pieza ideal para tu espacio.`
- Botón 1 (primario): WhatsApp — `https://wa.me/525531215386?text=%C2%A1Hola!%20Me%20interes%C3%B3%20la%20Colecci%C3%B3n%20Acorde%C3%B3n`
- Botón 2 (secundario): `Ver todos los cuadros` → `/all-products`

---

### CollectionEspacio.tsx — Implementación detallada

**Hero:**
- Imagen: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1ra0u85wh3j.webp`
- Alt: "Colección Espacio Plieggo"
- H1: `Profundidad e ilusión<br>en cada pliegue`
- Subline: `La Colección Espacio juega con el vacío y el volumen — piezas que crean profundidad tridimensional en papel.`
- Badge: `4.9 · +50 hogares transformados`
- CTA: `Ver cuadros` → scroll a `#productos`

**Sección título grid:** `Colección Espacio`

**Editorial split:**
- Imagen: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/espacio.webp`
- Eyebrow: `Colección Espacio`
- H2: `Un universo en papel`
- Bullets:
  1. **Ilusión de profundidad** — "Los pliegues crean capas que parecen tener fondo. El ojo busca el espacio que hay detrás."
  2. **Minimalismo con carácter** — "Perfecta para espacios que quieren un punto focal sin saturar. Una pieza que habla sola."
  3. **Luz como coautor** — "La luz natural activa la pieza. Por las mañanas aparecen sombras que desaparecen al mediodía."

**CTA final:**
- Título: `¿Te gustó la Colección Espacio?`
- Subline: `Escríbenos para encontrar la pieza ideal para tu espacio.`
- Botón 1 (primario): WhatsApp — `https://wa.me/525531215386?text=%C2%A1Hola!%20Me%20interes%C3%B3%20la%20Colecci%C3%B3n%20Espacio`
- Botón 2 (secundario): `Ver todos los cuadros` → `/all-products`

---

### Notas de implementación comunes
- Imports necesarios en los 3 archivos: `{ Link }` de react-router-dom, `{ Hand, Sparkles, Truck, RotateCcw, Star, MessageCircle, ArrowRight }` de lucide-react, `{ plieggoGeneralReviews, getInitials }` de `@/data/plieggo-general-reviews`
- Featured reviews: usar `[plieggoGeneralReviews[0], plieggoGeneralReviews[2]]` (diferentes a TopSellers que usa [1] y [3])
- Trust strip: idéntico al de TopSellers — copiar exacto
- Grid móvil: cambiar a `grid-cols-2` en todos (igual que TopSellers)
- Eliminar la "Bottom CTA Section" con bg-primary/bg-secondary que existe actualmente — reemplazar con el "CTA final" estilo TopSellers
- La sección "Hero Split" actual de AllProducts y ColeccionAcordeon/Espacio se reemplaza completamente por el editorial split con bullets
- Skeleton de loading: mantener pero con `aspect-[24/43]` en grid-cols-2

## 4. Recent Changes
- **2026-05-20 Plan: páginas colección editorial** — Plan para replicar esquema TopSellers en AllProducts, CollectionAcordeon, CollectionEspacio
- **2026-05-20 Product card aspect-ratio** — Cambiado `aspect-square md:aspect-[1/2]` a `aspect-[24/43]` en ProductCardUI.tsx para que coincida exactamente con imágenes 768×1376 px de Acordeón. Aplica igual en móvil y desktop.
- **2026-05-20 Collection cards rediseño** — Nuevo orden Más Vendidos→Acordeón→Espacio→Todos. Nuevas imágenes editoriales lifestyle. Aspecto cambiado a `aspect-[3/4]` (más premium). Cards más angostas en móvil (65vw). Eyebrow text añadido.
- **2026-05-20 hoverImageIndex global** — AllProducts, TopSellers, IndexUI ahora pasan `hoverImageIndex={product.collectionType === 'espacio' ? 1 : 2}` a ProductCard. Espacio → imagen 2, todo lo demás → imagen 3, en TODAS las rutas.
- **2026-05-20 hoverImageIndex prop** — ProductCardUI/ProductCard aceptan `hoverImageIndex`. CollectionEspacio pasa `1` (imagen 2); default `2` (imagen 3) en todo lo demás.
- **2026-05-20 Fix CollectionAcordeon handle** — Corregido handle `coleccion-acordeon` → `coleccin-acorden` para que los productos aparezcan en /coleccion-acordeon
- **2026-05-20 ProductCard hover imagen 3** — Hover muestra images[2] (3ª imagen) con object-cover para llenar el alto completo. Condición actualizada a length > 2.
- **2026-05-20 Orden por colección COMPLETO** — AllProducts, TopSellers e IndexUI ordenan Espacio→Acordeón→Prisma. Fix bug handle `coleccin-acorden` (typo real en DB). Prisma usa aspectRatio='rectangle'.
- **2026-05-20 Galería por variante** — `getDisplayImages()` en HeadlessProduct.tsx ahora devuelve SOLO las imágenes de la variante activa. Fallback seguro a imágenes del producto si la variante no tiene fotos.
- **2026-05-19 Hero editorial redesign COMPLETO** — Layout bottom-left, headline sm/font-semibold, CTA limpio sin glow, gradiente reposicionado to-top, dots discretos bottom-right, scroll indicator eliminado
- **2026-05-19 Tipografía global** — fontFamily registrada en tailwind.config.ts: font-sans=DM Sans, font-serif=Crimson Pro, font-heading, font-body. Ahora consistente en todo el sitio.
- **2026-05-19 WhatsApp completo** — Número real 525531215386 en TopSellers; link inline terracota en PDP; botón WhatsApp en footer con ícono SVG oficial
- **2026-05-19 TopSellers REDISEÑO COMPLETO** — Hero editorial compacto 55vh, trust strip, grid 2-cols móvil, skeleton correcto, mini social proof 2 reviews, editorial 3 bullets, CTA final dual
- **2026-05-19 ProductCard cleanup** — Badge compacto móvil, quitadas reseñas, precio más chico, CTA "Ver más" discreto
- **2026-05-19 Homepage Redesign COMPLETO** — 6 cambios CRO en IndexUI.tsx, HeroCarousel.tsx, InspirationCarousel.tsx

## 5. Image Inventory
- Hero images: 2 imágenes Supabase storage (acordeon, espacio) + video
- Collections hero (nuevas, 2026-05-20):
  - Más Vendidos: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069342-nd9nl70mgv.webp`
  - Colección Acordeón: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1i4gabj0it4.webp`
  - Colección Espacio: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1ra0u85wh3j.webp`
  - Todos los cuadros: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp`
- Top-sellers hero: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.webp`
- AllProducts editorial: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/all-products.webp`
- Acordeón editorial: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon.webp`
- Espacio editorial: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/espacio.webp`
- Inspiration: green-office.webp, black-dining.webp, purple-office.webp, burgundy-kitchen.webp, large-dining.webp
- Gift banner: black-dining.webp ✅ (en uso)
- Logo: `/public/logo.svg`
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` (no `coleccion-acordeon`) — corregido en CollectionAcordeon.tsx y en ordenamiento
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip