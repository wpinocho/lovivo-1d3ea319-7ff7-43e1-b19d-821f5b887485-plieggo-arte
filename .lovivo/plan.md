# Plieggo — Estado del Proyecto

## Current State
Tienda ecommerce de arte en papel (cuadros de origami) con diseño premium implementado. Layout: AnnouncementBar fijo en header, hero section 100dvh, diseño tipo Zara Home / Muji.

## User Preferences
- Diseño premium, sutil y profesional — nada genérico
- On-brand con arte en papel / origami
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body)

## Recent Changes
- **Textura de grano de papel** añadida globalmente en `body::after` — SVG fractalNoise, opacity 0.04, fixed, z-index 9998
- **Degradado radial en body** — crema cálido centro (#F7F4EA) → crema base (#F2EFE4) → crema frío bordes (#EAE6D6), background-attachment: fixed
- **AnnouncementBar** — reemplazado `bg-secondary` por `linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)`
- **Navbar scrolled** — reemplazado `bg-background/95` por gradient inline `linear-gradient(180deg, rgba(247,244,234,0.97) 0%, rgba(242,239,228,0.95) 100%)` + `backdrop-blur-md`
- **Footer** — reemplazado `bg-secondary` por `linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)`

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad

## Files Modified
- `src/index.css` — grain texture + radial gradient en body
- `src/components/AnnouncementBar.tsx` — gradient diagonal vino
- `src/templates/EcommerceTemplate.tsx` — navbar gradient crema + footer gradient vino profundo