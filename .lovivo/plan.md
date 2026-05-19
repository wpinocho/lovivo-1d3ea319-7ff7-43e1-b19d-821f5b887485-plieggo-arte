# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis (Hand, Layers, Package, Truck, Clock, RotateCcw de lucide-react)

## 3. Active Plan
**CRO Round 5 — PDP Audit Completa → 6 mejoras priorizadas por impacto en ventas**

### Hallazgos del audit (2026-05-19)
**Lo que ya está bien:**
- Sticky bottom CTA bar ✅
- Urgency badge Edición Limitada ✅
- Estrellas arriba del precio ✅
- Express checkout (Apple Pay / Google Pay) ✅
- Trust strip con 3 ítems ✅
- FAQ + CrossSell + Reviews ✅

**Lo que falta (priorizado):**

### 🔴 ALTA PRIORIDAD (impacto directo en conversión)

**1. Guía de tamaños visual cerca del selector de tallas**
- Actualmente: botones de texto (20x20cm, 50x50cm, 30x90cm) sin referencia visual
- Problema: el cliente no sabe cómo se ve 50x50 en una pared real → NO compra
- Solución: añadir debajo del selector un tooltipo o línea de texto con referencia: "50x50 cm — equivale a 2 folios A4 juntos" o un mini SVG de silueta de persona + cuadro a escala
- Archivo: `src/pages/ui/ProductPageUI.tsx` → sección de Product Options

**2. Review destacada cerca de los CTAs (social proof en el momento de decisión)**
- Actualmente: reseñas están al fondo de la página (post-scroll). El usuario puede decidir sin haberlas visto
- Las mejores citas del archivo product-reviews-content.ts:
  - "Fernando L.: 'Todas mis visitas preguntan dónde lo compré'"
  - "Roberto D.: 'Es como tener una escultura viva en la pared'"
  - "Elena F.: 'Tercer cuadro de Plieggo en mi casa'"
- Solución: añadir 1 cita rotativa (o fija, la mejor) justo ENCIMA de los botones CTA, en itálica sutil sin borde
- Archivo: `src/pages/ui/ProductPageUI.tsx` → antes del div `ref={ctaRef}`

**3. "Ideal para regalo" callout cerca del CTA**
- Datos: +8 reseñas mencionan que lo compraron como regalo ("Lo regalé en cumpleaños", "Regalo para mi mamá")
- Actualmente: NO hay ninguna mención de regalo en la PDP
- Solución: pequeña línea de texto con icono Gift debajo de "Agregar al carrito":
  `🎁 ¿Es un regalo? Incluimos presentación especial sin costo`
  O en diseño de marca: icono Gift terracota + texto sutil
- Archivo: `src/pages/ui/ProductPageUI.tsx` → después del botón "Agregar al carrito"

### 🟡 MEDIA PRIORIDAD

**4. Mention de "la pieza cambia con la luz" en craftsmanship block**
- Actualmente: "Hecho a mano / Papel de calidad / Empaque seguro"
- Los 3 datos son sobre el PROCESO. Falta uno sobre la EXPERIENCIA del producto en el hogar
- Dato real de reseñas: "Los pliegues crean sombras hermosas con la luz natural" / "Arte vivo que cambia con la luz"
- Solución: cambiar ícono Package (empaque) por Sun/Sparkles + "Arte vivo" con texto "Los pliegues crean sombras que cambian con la luz del día"
- O bien agregar un 4to bloque (en 2x2 grid mobile) con este diferenciador
- Archivo: `src/pages/ui/ProductPageUI.tsx` → div craftsmanship story

**5. WhatsApp link cerca de CTAs**
- Para productos premium ($1,500+), muchos compradores mexicanos quieren preguntar antes
- Existe FloatingWhatsApp pero se pierde visualmente
- Solución: añadir texto pequeño bajo los botones: `¿Tienes dudas? [Escríbenos por WhatsApp →]` con link a wa.me/
- Archivo: `src/pages/ui/ProductPageUI.tsx` → después del trust strip

**6. Indicador de stock "Solo X disponibles" en Edición Limitada**
- Actualmente: solo hay el badge pulsante "Edición Limitada · Pocas piezas disponibles"
- Más específico = más urgencia real
- Solución: si es edición limitada, mostrar "Solo 4 disponibles" (hardcoded por ahora, o leer stock del variant)
- Archivo: `src/pages/ui/ProductPageUI.tsx` → sección isEdicionLimitada badge

### 🟠 BAJA PRIORIDAD (requieren assets o Dashboard)
- Video del producto mostrando el juego de luz (requiere grabación)
- Más fotos de Luna Beige (Dashboard > productos)
- Fecha estimada de entrega concreta ("Lo recibirías entre el 3 y el 10 de junio")

## 4. Recent Changes
- **2026-05-19 AUDIT PDP Round 5** — 6 oportunidades identificadas: guía tamaños, review near CTA, regalo callout, "arte vivo" craftsmanship, WhatsApp link, stock indicator
- **2026-05-19 CRO Round 4** — PDP móvil UX:
  1. "Seguir comprando" ocultado en móvil (solo desktop)
  2. Selector de cantidad rediseñado — pill/rounded compacto, menos prominente
  3. CTAs (Comprar ahora + Agregar al carrito) movidos justo después de cantidad
  4. Trust strip reposicionada debajo de los CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos:
  1. ProductPageUI: rating arriba del precio (confianza antes del precio)
  2. ProductPageUI: descripción movida encima del craftsmanship story
  3. ProductPageUI: emojis 🤲📐📦 → Hand/Layers/Package SVG terracota (#C16648)
  4. ProductPageUI: emojis 🚚📅↩️ → Truck/Clock/RotateCcw SVG terracota (#C16648)
  5. ProductFAQ: reducido de 9 → 5 FAQs (marco, colgar, envío, personalización, cuidados)
  6. CrossSellSection: object-cover → object-contain (cuadros no recortados)
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI
- **Ronda 3 checkout** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell)
- **SEO component** — JSON-LD schema.org/Product + BreadcrumbList en PDP

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`
- Inspiration images: supabase storage (green-office, black-dining, purple-office, burgundy-kitchen, large-dining)

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- Descripción del producto (copy) se edita desde Dashboard, no desde código

## 7. Pending / Future Sessions
- **[ALTA]** Implementar las 6 mejoras del CRO Round 5 en Craft Mode
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[ALTA]** Mejorar copy de descripción de productos desde Dashboard
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Evaluar A/B test del badge de urgencia vs. sin badge (cuando haya volumen suficiente)
- Contador de visitas "👁 127 personas vieron esto"
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip