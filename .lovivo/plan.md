# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico

## 3. Active Plan — PDP CRO Upgrade 🔴 PENDIENTE

### Objetivo
Mejorar la tasa de conversión de la PDP. Se identificaron múltiples gaps de CRO críticos mediante revisión visual + análisis de código.

### Hallazgos clave
- `product-reviews.ts` y `product-reviews-content.ts` tienen datos ricos (Luna Beige: 4.9★, 8 reseñas) pero **CERO se muestran en la PDP** — este es el mayor gap
- No hay rating de estrellas visible bajo el título/precio
- No hay señales de urgencia/escasez para ediciones limitadas
- El selector de cantidad es estándar pero para arte de $5k resulta genérico
- No hay dimensiones destacadas visualmente (solo en el selector de variante)
- Sección de "proceso artesanal" ausente

### Plan de implementación en ProductPageUI.tsx

#### PRIORIDAD 1 — Social Proof (impacto más alto)
**A) Star rating inline bajo el precio**
- Justo debajo del bloque de precio, antes de los trust badges
- Usar `getProductReview(product.slug)` → mostrar estrellas (★ rellenas/vacías) + rating numérico + conteo
- Solo mostrar si `reviewCount > 0`
- Ejemplo: `★★★★★ 4.9 · 8 reseñas verificadas` — con anchor link `#reviews`
- Estilo: texto pequeño, color muted, estrellas en terracota (#C16648)

**B) Sección de reseñas completa (nuevo bloque en `mt-16 space-y-16`)**
- Crear componente `ProductReviews` en `src/components/ProductReviews.tsx`
- Props: `productSlug: string`
- Usa `getProductReview(slug)` para rating/count resumen
- Usa `getProductReviewsContent(slug)` para las reviews individuales
- Estructura:
  - Header: rating grande (4.9), estrellas, "X reseñas verificadas"
  - Barra de distribución (5★, 4★, etc.) — calcular del array
  - Grid de 2 columnas (desktop) / 1 columna (mobile) con máximo 3 reviews visibles
  - Botón "Ver todas las reseñas" si hay más de 3
  - Cada review card: nombre, fecha formateada, rating en estrellas, texto, badge "Compra verificada", variante (si tiene)
- Insertar ANTES de `CrossSellSection` en el bloque de secciones Plieggo
- NO mostrar sección si `reviewCount === 0`

#### PRIORIDAD 2 — Urgencia / Escasez
**C) Badge de edición limitada + urgencia**
- Detectar si el producto es "edición limitada" por: product.tags?.includes('edicion-limitada') || product.product_type === 'Edición Limitada' || product.title.includes('Luna') || product.title.includes('Estrella')
- Si es edición limitada, mostrar bajo el título (antes del precio):
  ```
  🔴 Edición Limitada · Pocas piezas disponibles
  ```
  Estilo: badge pequeño, color vino burdeos, texto blanco, dot animado (pulse)
- Esta señal va DESPUÉS del vendor label, ANTES del precio

#### PRIORIDAD 3 — Craftsmanship Story
**D) Bloque editorial "Hecho a mano"**
- Reemplazar los 4 trust badges actuales (grid 2x2 muy pequeño) con un bloque más visual
- Nuevo diseño: 3 columnas horizontales (desktop), scroll horizontal (mobile)
  - 🤲 **Hecho a mano** — "Cada pieza tarda 3–5 días en crearse"
  - 📐 **Papel de alta calidad** — "Papel libre de ácidos, dura décadas"
  - 📦 **Empaque seguro** — "Protección especial para que llegue perfecta"
- Mantener el border-y, mismo spacing
- Esto va en el mismo lugar que el grid actual (entre precio y CTAs)

#### PRIORIDAD 4 — Dimensiones destacadas
**E) Mostrar dimensiones prominentemente**
- Si el producto tiene la opción "Talla" o "Tamaño", mostrar el valor seleccionado como:
  `Tamaño: **60 × 60 cm**` en una línea visual cerca del title block
- Si no hay variante de tamaño, buscar en product.description o tags las dimensiones
- Mostrar como dato visual, no solo en el selector

#### PRIORIDAD 5 — Layout mobile
**F) Mejorar layout mobile**
- Ocultar el selector de cantidad en mobile para productos de $3,000+ (arte de colección)
- La sticky bar de mobile es buena, dejarla igual
- El carousel de mobile funciona bien si hay múltiples fotos

### Archivos a crear/modificar
- `src/components/ProductReviews.tsx` — CREAR (nuevo componente)
- `src/pages/ui/ProductPageUI.tsx` — MODIFICAR:
  - Añadir star rating inline bajo precio (líneas ~326-352)
  - Añadir badge urgencia bajo vendor label (línea ~316)
  - Reemplazar trust badges con craftsmanship story (líneas ~354-372)
  - Añadir `<ProductReviews productSlug={product.slug} />` en secciones Plieggo (línea ~644)

### Después de implementar
Crear `.lovivo/cro-log.md` con baseline y este cambio documentado.

## 4. Recent Changes
- **2026-05-18 ANÁLISIS** — PDP CRO audit completo. Reviews existen en data files pero NO se muestran. Plan guardado.
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI (antes de early returns); violaba Rules of Hooks → pantalla en blanco
- **2026-05-18 BUG FIX** — `CrossSellSection` recibía props incorrectos (`currentProductId`/`currentCollectionIds`); componente espera `currentProduct: Product` → error `Cannot read properties of undefined (reading 'id')`
- **2026-05-18 BUG FIX** — `ProductFAQ` e `InspirationCarousel` ya no reciben `productId` (no forma parte de su interfaz)
- **Ronda 3 completa** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell), tiempos 10-15 días hábiles
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP
- **6 archivos de apoyo nuevos** — subscription-utils, seo/jsonld, SEO, CartAppliedRules, VolumeBadge, BOGOLabel
- **react-intersection-observer** — instalado para useInView en ProductPageUI
- **Ronda 2 completa** — 5 archivos creados/actualizados para migración Stripe

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle para mejorar conversión

## 7. Pending / Future Sessions
- **[ALTA]** Implementar plan CRO PDP (reseñas, urgencia, craftsmanship story) — ver sección 3
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Considerar añadir reseñas/reviews section en ProductPageUI si se requiere ← YA INVESTIGADO, plan listo