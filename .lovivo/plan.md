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

## Pending: Intensificar degradados (usuario pidió más visible)

### `src/index.css` — Body background más intenso
Cambiar:
```css
body {
  background-image: radial-gradient(
    ellipse at 50% 0%,
    #F7F4EA 0%,
    #F2EFE4 40%,
    #EAE6D6 100%
  );
}
```
Por algo más dramático, con más contraste:
```css
body {
  background-image: radial-gradient(
    ellipse at 50% 10%,
    #FBF8EE 0%,
    #F2EFE4 45%,
    #DDD8C4 100%
  );
}
```
Centro más cálido/blanco (#FBF8EE), bordes más apagados/grises (#DDD8C4).

También subir textura de `opacity: 0.04` a `opacity: 0.07` para que el grano sea visible.

### `src/templates/EcommerceTemplate.tsx` — Navbar más visible
Cambiar:
```
linear-gradient(180deg, rgba(247,244,234,0.97) 0%, rgba(242,239,228,0.95) 100%)
```
Por gradiente con colores más diferenciados:
```
linear-gradient(180deg, rgba(251,248,238,0.98) 0%, rgba(221,216,196,0.96) 100%)
```
Tope más blanco-cálido, base más apagada/beige oscuro — diferencia visible.

## Known Issues
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad

## Files to Modify
- `src/index.css` — intensificar radial gradient + subir opacity del grano
- `src/templates/EcommerceTemplate.tsx` — navbar gradient más pronunciado