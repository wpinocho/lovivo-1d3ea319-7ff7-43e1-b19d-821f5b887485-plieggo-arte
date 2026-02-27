# Plan: Texturas sutiles y degradados para fondos premium (DETALLADO)

## Qué quiere el usuario
Los fondos sólidos se ven planos y genéricos. Quiere algo más premium y con carácter, pero sutil y profesional. Se implementará: textura de grano/papel + degradados sutiles coordinados en todos los fondos clave.

## Estado actual (revisado en código)
- **`src/index.css`**: `body` tiene `bg-background` (crema #F2EFE4 plano). Sin ninguna textura ni gradiente.
- **`src/components/AnnouncementBar.tsx` línea 45**: usa clase `bg-secondary` → vino #5D2A38 100% plano
- **`src/templates/EcommerceTemplate.tsx` línea 83**: navbar scrolled usa `bg-background/95 backdrop-blur border-b border-border` → crema plano con transparencia
- **`src/templates/EcommerceTemplate.tsx` línea 207**: footer usa `bg-secondary text-secondary-foreground` → vino #5D2A38 100% plano

## Implementación paso a paso

### PASO 1 — `src/index.css`: Textura de grano de papel global

Añadir al final del archivo, fuera de `@layer`, un bloque CSS puro para `body::after`:

```css
/* ===== GRAIN TEXTURE - Arte en papel premium ===== */
body {
  position: relative;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}
```

También añadir un degradado radial sutil al fondo del body:
```css
body {
  background-image: radial-gradient(
    ellipse at 50% 0%,
    #F7F4EA 0%,
    #F2EFE4 40%,
    #EAE6D6 100%
  );
  background-attachment: fixed;
}
```

**IMPORTANTE**: Esto va a nivel de `body {}` nuevo bloque FUERA de @layer base, al final del archivo, para no alterar los tokens CSS. Agregar ambas reglas juntas en un solo bloque body.

### PASO 2 — `src/components/AnnouncementBar.tsx`: Degradado vino en el banner

**Línea 45**: Cambiar la clase `bg-secondary` por un `style` inline con degradado:

De:
```tsx
className="relative bg-secondary text-secondary-foreground h-10 flex items-center justify-center overflow-hidden"
```

A:
```tsx
className="relative text-secondary-foreground h-10 flex items-center justify-center overflow-hidden"
style={{ background: 'linear-gradient(135deg, #3d1a27 0%, #5D2A38 45%, #7a3a4f 100%)' }}
```

El degradado va de un vino más oscuro/profundo (#3d1a27) al color base (#5D2A38) y luego a uno ligeramente más claro/rosado (#7a3a4f). Crea un efecto de profundidad sutil.

### PASO 3 — `src/templates/EcommerceTemplate.tsx`: Navbar y Footer con degradados

#### 3a. Navbar scrolled (línea 83):

De:
```tsx
`py-4 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur border-b border-border' : 'bg-transparent border-b border-transparent'}`
```

A:
```tsx
`py-4 transition-all duration-300 ${scrolled ? 'backdrop-blur-md border-b border-border/50' : 'bg-transparent border-b border-transparent'}`
```
Y añadir inline style condicional al div:
```tsx
style={scrolled ? { background: 'linear-gradient(180deg, rgba(247,244,234,0.97) 0%, rgba(242,239,228,0.95) 100%)' } : undefined}
```

El gradiente va de un crema levemente más cálido arriba (#F7F4EA) al crema base abajo (#F2EFE4). Con `backdrop-blur-md` se funde mejor con el contenido debajo.

#### 3b. Footer (línea 207):

De:
```tsx
<div className={`bg-secondary text-secondary-foreground py-16 ${footerClassName}`}>
```

A:
```tsx
<div 
  className={`text-secondary-foreground py-16 ${footerClassName}`}
  style={{ background: 'linear-gradient(160deg, #3d1a27 0%, #5D2A38 40%, #6b2f41 70%, #4a2232 100%)' }}
>
```

El footer usa un degradado diagonal con 4 stops: más oscuro arriba-izquierda, vino base en el centro, ligeramente más cálido, y de vuelta oscuro abajo-derecha. Crea una sensación de profundidad envolvente.

## Archivos a modificar
- `src/index.css`: Añadir textura de grano SVG en `body::after` + degradado radial en body
- `src/components/AnnouncementBar.tsx`: Reemplazar `bg-secondary` por gradient inline en el div raíz
- `src/templates/EcommerceTemplate.tsx`: 
  - Navbar scrolled: gradient vertical crema + backdrop-blur-md
  - Footer: gradient diagonal vino profundo

## Notas técnicas
- La textura SVG usa `feTurbulence` tipo `fractalNoise`, `baseFrequency="0.65"`, `numOctaves="4"`, `stitchTiles="stitch"` para que sea seamless/continua
- El grano está en `position: fixed` para que no se mueva con el scroll (más premium)
- `z-index: 9998` — por debajo de modals/popups pero encima del contenido visual
- `opacity: 0.035` — casi imperceptible en pantalla pero se nota al comparar con vs sin
- Los colores hex usados en gradientes son los equivalentes exactos de los tokens CSS:
  - `--background` = `#F2EFE4` (crema)
  - `--secondary` = `#5D2A38` (vino)
- NO modificar los tokens CSS para mantener compatibilidad con componentes Radix/shadcn
- El `background-attachment: fixed` en el gradiente radial del body hace que sea estático al hacer scroll (más premium, evita el efecto de "fondo que se mueve")