# Plan de Plieggo Store

## Estado actual
Hero section con navbar transparente fullscreen funcionando correctamente.

## Cambios recientes implementados

### Fix Navbar Transparente (sesión actual)
**Problema raíz:** El header `sticky` empujaba el hero hacia abajo, así que el fondo transparente quedaba sobre el `bg-background` claro (crema), no sobre la imagen oscura del hero → texto blanco invisible.

**Solución implementada:**
- **PageTemplate.tsx**: Añadido prop `headerFixed?: boolean`. Cuando true → `fixed top-0 left-0 right-0 z-40`; cuando false (default) → `sticky top-0 z-40`
- **EcommerceTemplate.tsx**: Pasa `headerFixed={isHome}` a PageTemplate. No renderiza `<AnnouncementBar />` cuando `isHome` (el hero cubre el viewport completo)
- **HeroCarousel.tsx**: Altura reducida de `h-[100dvh]` → `h-[85dvh]` (usuario pidió 85dvh para que no se corten las imágenes)

### Hero Fullscreen + Navbar Transparente (sesión anterior)
- **EcommerceTemplate.tsx**: 
  - Añadido `useEffect` con scroll listener
  - `isHome = location.pathname === '/'`
  - `scrolled` state: inicia en `false` (home) o `true` (otras páginas)
  - Header div: cambia dinámicamente entre `bg-transparent` y `bg-background/95 backdrop-blur border-b border-border`
  - Nav links: `text-white/90 hover:bg-white/10` (transparente) → `text-muted-foreground hover:bg-secondary` (scrolled)
  - Cart y hamburger: `text-white hover:bg-white/10` (transparente) → default (scrolled)
- **BrandLogoLeft.tsx**: Añadido prop `transparent?: boolean` que cambia texto "Plieggo" de `text-foreground` a `text-white`

## Sistema de Diseño
- **Paleta**: Azul Medianoche `#1B2A41` (fondo oscuro), Terracota `#C16648` (acento), Crema (texto)
- **Fuentes**: `font-heading` para títulos, `font-body` para textos
- **Tokens semánticos**: usar siempre (no hardcodear colores)

## Acciones completadas en sesiones anteriores
1. Newsletter rediseñado con identidad editorial Plieggo (fondo azul medianoche, brackets origami, botón terracota)
2. Fix visibilidad texto input newsletter
3. Reseñas producto "Luna Beige" — 8 reviews, rating 4.9★
4. Imagen inspiración en página de producto (sala escandinava)