# Plieggo — Estado del Proyecto

## Current State
Tienda ecommerce de arte en papel (cuadros de origami) con diseño premium implementado. Layout: AnnouncementBar fijo en header, hero section 100dvh, diseño tipo Zara Home / Muji.

## User Preferences
- Diseño premium, sutil y profesional — nada genérico
- On-brand con arte en papel / origami
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)

## Recent Changes
- **Bug fix: gradiente de body oculto** — El `PageTemplate` tenía `bg-background` (sólido) en el div raíz, tapando completamente el gradiente radial del `body`. Quitado para que el fondo sea transparente.
- **Secciones transparentes** — Removido `bg-background` sólido de secciones en IndexUI y AllProducts para que el gradiente del body sea visible.
- **Textura de grano de papel** subida a `opacity: 0.07` (era 0.04) — ahora visible
- **Degradado radial en body** intensificado: `#FBF8EE 0%` → `#F2EFE4 45%` → `#D8D3BC 100%` — más contraste entre centro cálido y bordes apagados
- **Navbar scrolled** gradient actualizado: `rgba(251,248,238,0.99) 0%` → `rgba(216,211,188,0.97) 100%` — diferencia clara entre la parte alta y baja
- **AnnouncementBar** — `linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)`
- **Footer** — `linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)`

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad