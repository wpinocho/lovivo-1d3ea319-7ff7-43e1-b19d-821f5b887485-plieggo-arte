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
- **Tiempos de envío actualizados a 10-15 días hábiles** — Cambiado en 3 lugares:
  1. `AnnouncementBar.tsx` → "Entrega 10-15 días hábiles"
  2. `ProductFAQ.tsx` → CDMX y Nacional: "10-15 días hábiles" + nota "Cada pieza se elabora especialmente para ti"
  3. `StripePayment.tsx` → `estimated_days: "10-15"`
  - Motivo: el usuario necesita más tiempo para cumplir los envíos sin estrés
  - Pendiente: el usuario mencionó que podría querer regresar a los tiempos anteriores (CDMX: 2-3, Nacional: 5-7)
- **Navbar scrolled gradient suavizado** — Cambiado a `rgba(255,252,245,0.98) → rgba(242,239,228,0.95)` (blanco cálido a crema suave).
- **Secciones completamente transparentes** — Removidos todos los bg-muted/30, bg-muted, etc.
- **Bug fix: gradiente de body oculto** — El PageTemplate tenía bg-background tapando el gradiente radial del body. Quitado.
- **Degradado radial en body** intensificado
- **AnnouncementBar** — `linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)`
- **Footer** — `linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)`

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad