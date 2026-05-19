# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) o vino (#5D2A38) — NO emojis

## 3. Active Plan — PDP CRO Round 3: UX/Visual Polish

### Qué se construirá (próxima sesión Craft Mode)

#### Archivo: `src/pages/ui/ProductPageUI.tsx`

1. **Star rating → mover ARRIBA del precio**
   - Actualmente: vendor > urgency > title > price > promo badges > star rating
   - Nuevo orden: vendor > urgency > title > star rating > price > promo badges

2. **Descripción → mover ARRIBA del craftsmanship story**
   - Actualmente: descripción está debajo de los CTAs (línea 682–688) — se ve muy raro
   - Moverla a justo DESPUÉS del star rating + precio, ANTES del craftsmanship story
   - Solo si description existe

3. **Iconos craftsmanship story → SVG line icons en terracota**
   - Reemplazar 🤲📐📦 con SVG line icons de lucide-react o SVG inline
   - Color: text-[#C16648] (terracota Plieggo)
   - Sugeridos: `Hand` (lucide), `Layers` o `Square` (papel), `Package` (lucide)
   - Reducir padding de `py-5` a `py-3` para menos espacio desperdiciado

4. **Iconos trust strip → SVG line icons en terracota**
   - Reemplazar 🚚📅↩️ con SVG line icons (Truck, Clock, RotateCcw de lucide-react)
   - Color: text-[#C16648] (terracota Plieggo)
   - El trust strip también tiene demasiado padding vertical — reducir

#### Archivo: `src/components/ProductFAQ.tsx`

5. **Reducir FAQs de 9 → 5 (las más importantes)**
   - MANTENER: ¿El marco viene incluido?, ¿Cómo se cuelga?, ¿Cuánto tarda el envío?, ¿Puedo personalizarlo?, ¿Cómo cuido mi obra?
   - ELIMINAR: ¿Es resistente al sol? (cubierto en Cómo cuido), ¿Cómo se limpia? (cubierto en Cómo cuido), ¿Tiene garantía? (ya en trust strip), ¿Hacen envíos internacionales?

#### Archivo: `src/components/CrossSellSection.tsx`

6. **Imágenes de productos → object-contain (no cortadas)**
   - Cambiar `object-cover` → `object-contain` en la imagen de cada tarjeta
   - Los cuadros de Plieggo son arte vertical — object-cover los recorta
   - Mantener `bg-muted/40` para el fondo neutro

### Nota para el usuario (comunicar en chat):
- La DESCRIPCIÓN del producto ("Delicado acordeón en tonos rosa...") se edita desde el **Dashboard**, no desde código. Si quiere mejorar el texto, puede hacerlo ahí.

## 4. Recent Changes
- **2026-05-19 CRO Round 3 PLANEADO** — 6 mejoras UX/visual: rating arriba precio, descripción posición, icons SVG, FAQs 9→5, CrossSell object-contain
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI: 5 mejoras CRO
- **2026-05-19 BUG FIX** — `const product = logic.product` declarada ANTES de usarse. ReferenceError corregido
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx
- **2026-05-18 ANÁLISIS** — PDP CRO audit completo. Reviews existen en data files pero NO se muestran.
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI (antes de early returns)
- **2026-05-18 BUG FIX** — CrossSellSection recibía props incorrectos
- **Ronda 3 completa** — CheckoutUI y ProductPageUI integrados con nueva arquitectura Stripe
- **ProductPageUI** — secciones Plieggo restauradas (FAQ, Inspiración, CrossSell), tiempos 10-15 días hábiles
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
- **[ALTA]** Descripción del producto — mejorar copy desde Dashboard (no es código)
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Evaluar A/B test del badge de urgencia vs. sin badge (cuando haya volumen suficiente)
- Contador de visitas "👁 127 personas vieron esto" (mencionado en conversación anterior)