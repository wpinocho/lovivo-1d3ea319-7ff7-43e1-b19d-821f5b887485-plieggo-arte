# Plan - Tienda Acordeones de Papel

## Current State
Tienda ecommerce con productos de acordeones de papel, bundles, variantes y múltiples colecciones.

## Recent Changes
- **ProductCardUI hover redesign** (`src/components/ui/ProductCardUI.tsx`):
  - Overlay ahora está anclado al **fondo** (`absolute inset-x-0 bottom-0`) en lugar de cubrir toda la imagen
  - Gradiente `from-black/70 via-black/30 to-transparent` — el arte queda completamente visible en la parte superior
  - Todo el contenido (variantes + botón) está en `flex-col gap-2.5` en la parte inferior
  - Se **eliminó el label "Tamaño"** de los botones de variante
  - Pills de variante con **estilo glassmorphism**: `bg-white/15 text-white border-white/30 backdrop-blur-sm`
  - Seleccionado: `bg-white text-foreground border-white` (sólido blanco)
  - Badges de descuento/agotado movidos a **siempre visibles** (top-left, fuera del overlay)

- **Imágenes de variantes corregidas** en múltiples componentes: prioridad `variant.image_urls[0]` → `variant.image` → `product.images[0]`

## User Preferences
- Diseño premium/minimalista
- Dos tipos de tarjetas: cuadradas (Espacio) y rectangulares (Acordeón)
- Idioma: Español

## Known Issues
- Ninguno activo