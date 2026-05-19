# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio promedio: $1,500–$6,000 MXN. Uso frecuente como regalo (confirmado por reseñas). Producto diferenciador: el juego de luz y sombra que crean los pliegues, que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis (Hand, Layers, Sparkles, Truck, Clock, RotateCcw de lucide-react)

## 3. Active Plan
**CRO Round 6 — COMPLETADO (2026-05-19)**

### ✅ Implementado:
1. **SizeGuide** — `src/components/SizeGuide.tsx` — link "¿Cómo se ve en tu pared?" colapsable debajo del selector de medidas, SVG proporcional a escala con silueta humana de referencia (165 cm). Solo aparece cuando los valores tienen formato NxNcm.
2. **Reviews doble sección** — `ProductReviews.tsx` renovado con:
   - Sección 1: "Lo que dicen de este cuadro" (reviews específicas del producto)
   - Sección 2: "Más experiencias Plieggo" — scroll horizontal móvil / grid desktop, 8 mejores citas de toda la colección con avatar de iniciales en terracota. `src/data/plieggo-general-reviews.ts` con campo `photoUrl` listo para cuando el usuario suba fotos.
3. **Arte vivo** en craftsmanship block — Package/Empaque seguro → Sparkles/"Arte vivo" con copy: "Los pliegues crean sombras que cambian con la luz del día"

### 🟡 Pendiente:
- Subir fotos reales de clientes al `plieggo-general-reviews.ts` (llenar campo `photoUrl`)
- Agregar más fotos a Luna Beige desde Dashboard

## 4. Recent Changes
- **2026-05-19 CRO Round 6** — SizeGuide proporcional, doble sección reviews (específicas + Plieggo general), Arte vivo en craftsmanship
- **2026-05-19 AUDIT PDP Round 5** — 6 oportunidades identificadas
- **2026-05-19 CRO Round 4** — PDP móvil UX: "Seguir comprando" oculto en móvil, qty pill, CTAs reposicionados, trust strip debajo de CTAs
- **2026-05-19 CRO Round 3 COMPLETO** — 6 mejoras UX/visual en 3 archivos
- **2026-05-19 CRO Round 2** — InspirationCarousel, CrossSellSection, ProductFAQ, ProductPageUI
- **2026-05-19 BUG FIX** — ReferenceError `product` antes de declaración
- **2026-05-19 CRO PDP** — Badge urgencia, star rating inline, craftsmanship story, ProductReviews.tsx
- **2026-05-18 BUG FIX** — `useSettings()` movido al top de ProductPageUI

## 5. Image Inventory
- Hero video: `/public/videos/hero-paper-folding.mp4`
- Logo: `/public/logo.svg`
- Inspiration images: supabase storage (green-office, black-dining, purple-office, burgundy-kitchen, large-dining)
- Fotos reales de clientes: PENDIENTE — llenar `photoUrl` en `src/data/plieggo-general-reviews.ts`

## 6. Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío — avatares con iniciales hasta que se suban fotos reales

## 7. Pending / Future Sessions
- **[ALTA]** Subir fotos reales de clientes y llenar `photoUrl` en `plieggo-general-reviews.ts`
- **[ALTA]** Añadir más fotos a Luna Beige (detalle, textura, en sala) — desde Dashboard
- **[MEDIA]** WhatsApp link discreto cerca de CTAs (pa.me/ link)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra (requiere grabación)
- Fecha estimada de entrega concreta en trust strip