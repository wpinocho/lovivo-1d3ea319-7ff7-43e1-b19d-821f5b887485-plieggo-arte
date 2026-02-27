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
- **Navbar scrolled gradient suavizado** — Cambiado de `rgba(251,248,238,0.99) → rgba(216,211,188,0.97)` (muy café) a `rgba(255,252,245,0.98) → rgba(242,239,228,0.95)` (blanco cálido a crema suave). Fluye de arriba hacia abajo sin el tono marrón pronunciado.
- **Secciones completamente transparentes** — Removidos todos los `bg-muted/30`, `bg-muted`, `bg-accent`, `bg-secondary` y `bg-primary` de los paneles de texto en secciones split de IndexUI, AllProducts, CollectionEspacio, CollectionAcordeon y TopSellers.
- **Colores de texto ajustados** — En secciones que usaban fondos oscuros, se cambió el texto de `text-*-foreground` a `text-foreground` / `text-muted-foreground`.
- **Bug fix: gradiente de body oculto** — El `PageTemplate` tenía `bg-background` (sólido) tapando el gradiente radial del `body`. Quitado.
- **Degradado radial en body** intensificado: `#FBF8EE 0%` → `#F2EFE4 45%` → `#D8D3BC 100%`
- **AnnouncementBar** — `linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)`
- **Footer** — `linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)`

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad