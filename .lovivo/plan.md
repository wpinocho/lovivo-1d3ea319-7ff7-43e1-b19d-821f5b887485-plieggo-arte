# Plieggo — Estado del Proyecto

## Current State
Tienda ecommerce de arte en papel (cuadros de origami) con diseño premium implementado. Layout: AnnouncementBar fijo en header, hero section 100dvh, diseño tipo Zara Home / Muji.

## User Preferences
- Diseño premium, sutil y profesional — nada genérico
- On-brand con arte en papel / origami
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)
- Fondo continuo sin bandas de color entre secciones

## Recent Changes
- **Secciones completamente transparentes** — Removidos todos los `bg-muted/30`, `bg-muted`, `bg-accent`, `bg-secondary` y `bg-primary` de los paneles de texto en secciones split de IndexUI, AllProducts, CollectionEspacio, CollectionAcordeon y TopSellers. Ahora el gradiente del body fluye sin interrupciones.
- **Colores de texto ajustados** — En secciones que usaban fondos oscuros (bg-secondary, bg-accent, bg-primary), se cambió el texto de `text-*-foreground` a `text-foreground` / `text-muted-foreground` para mantener legibilidad sobre el fondo claro.
- **Bug fix: gradiente de body oculto** — El `PageTemplate` tenía `bg-background` (sólido) en el div raíz, tapando completamente el gradiente radial del `body`. Quitado para que el fondo sea transparente.
- **Degradado radial en body** intensificado: `#FBF8EE 0%` → `#F2EFE4 45%` → `#D8D3BC 100%` — más contraste entre centro cálido y bordes apagados
- **AnnouncementBar** — `linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)`
- **Footer** — `linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)`

## Pending: Navbar scrolled gradient adjustment
- El usuario quiere suavizar el gradiente del navbar cuando está en scroll (actualmente se ve muy café)
- Propuesta: cambiar de `linear-gradient(180deg, rgba(251,248,238,0.99) 0%, rgba(216,211,188,0.97) 100%)` a algo más sutil
- Opción sugerida: `linear-gradient(180deg, rgba(255,252,245,0.98) 0%, rgba(242,239,228,0.95) 100%)` — blanco cálido a crema suave, sin el tono café pronunciado
- Pendiente confirmación del usuario antes de aplicar

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad