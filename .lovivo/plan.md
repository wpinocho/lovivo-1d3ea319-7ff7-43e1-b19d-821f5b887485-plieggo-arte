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
**COMPLETADO**: Limpieza total de referencias a `acorden-rosa-morado` en código.

### Resumen de la corrección
- El producto "Acordón Verde Salvia" en DB tenía slug `acorden-rosa-morado` (typo). El usuario lo corrigió a `acorden-verde-salvia`.
- En código se añadieron **alias de slug** en los 3 archivos de data para que si la DB devuelve el slug viejo, siga funcionando:
  - `product-reviews-content.ts` → alias + función normalizada
  - `product-reviews.ts` → alias + función normalizada  
  - `product-inspiration.ts` → alias + función normalizada
- Se eliminaron las entradas duplicadas bajo `acorden-rosa-morado` (reviews y datos de inspiración de rosa-morado que eran incorrectos para Verde Salvia)
- `g4` en `plieggo-general-reviews.ts` corregido: `productSlug` → `acorden-verde-salvia`
- Las 20 reseñas reales de Verde Salvia ya estaban bajo `acorden-verde-salvia` en `product-reviews-content.ts` ✓

## 4. Recent Changes
- **2026-05-20 Limpieza completa acorden-rosa-morado** — aliases en los 3 archivos data, g4 productSlug corregido a `acorden-verde-salvia`, entradas de rosa-morado eliminadas.
- **2026-05-20 Fix slug g4 Verde Salvia en general reviews** — `acorden-verde-salvia` para exclusión correcta en PDP.
- **2026-05-20 Sección "Más experiencias" — cuadro actual excluido** — `productSlug` añadido a `GeneralReview`, lógica de exclusión + priorización de colección + solo con foto implementada en `ProductReviews.tsx`.
- **2026-05-20 GeneralReviewCard rediseñado** — foto full-width aspect-[3/4], sin avatar circular.
- **2026-05-20 Sección "Más experiencias" con fotos + colección** — filtro a 5 reviews con foto, priorizando misma colección del producto actual.
- **2026-05-20 Fotos review Beige Sutil + Luna Llena** — `photoUrl` añadido a primera review de `acorden-beige-sutil` y `luna-llena`.
- **2026-05-20 Reviews acordeon-prisma-beige-blanco** — 4 reseñas creadas. Primera con foto.
- **2026-05-20 Foto review acorden-rosa-morado (Mariana León)** — ya obsoleta (producto eliminado).
- **2026-05-20 Reviews PDP con foto** — `photoUrl` añadido a interfaz `Review`. `ReviewCard` con foto full-width aspect-[3/4].
- **2026-05-20 Fix galería mobile solapamiento** — `rows` dinámico, `topBase` distribuido — InteractiveGalleryModal.tsx

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- Logo: `/public/logo.svg`
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12):
  - g4 Mónica A. (Verde Salvia): `...1779311693322-9f4ruvw5mpq.webp`
  - g9 Valentina S. (Prisma Onyx Opal): `...1779311693322-f14snp6bxfa.webp`
  - g10 Sebastián M. (Prisma Azul Coral): `...1779311693322-kcwn5zoehb.webp`
  - g11 Daniela R. (Burdeos Intenso): `...1779311693322-4f7n3rqv0pj.webp`
  - g12 Andrés V. (Luna Negra): `...1779311693322-8vbqa3p7c55.webp`

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- En PDPs de luna: solo 1 review con foto es de luna (g12), se rellena con 4 de acordeón — aceptable por ahora

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8 (ampliar pool de "Más experiencias")
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP (Rosa Sereno, Terracota, Luna Beige, etc.)
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip