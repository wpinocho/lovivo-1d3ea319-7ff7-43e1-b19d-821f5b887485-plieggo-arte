# Plan: Texturas sutiles y degradados para fondos premium

## Qué quiere el usuario
Los fondos sólidos (crema del body/navbar, vino del AnnouncementBar, footer) se ven demasiado planos y genéricos. Quiere algo más premium y con carácter, pero sutil y profesional. Sugerencia: degradado sutil + textura de papel/grano (muy on-brand para marca de arte en papel).

## Solución propuesta
Tres cambios coordinados:

### 1. Textura de grano/papel en el fondo global (src/index.css)
- Añadir un pseudo-elemento `body::after` con una textura SVG de ruido (feTurbulence) fija en pantalla
- Opacidad muy baja (3-5%) para que sea casi imperceptible pero dé profundidad
- `pointer-events: none` y `z-index: 9999` para no interferir con nada
- También añadir un degradado radial sutil al fondo del body: crema más cálida en el centro, ligeramente más fría en bordes

### 2. AnnouncementBar con degradado (src/components/AnnouncementBar.tsx)
- Cambiar `bg-secondary` (vino plano) por un degradado CSS inline:
  `background: linear-gradient(90deg, #4d2231 0%, #5D2A38 45%, #6b3245 100%)`
- Opcional: añadir un sutil brillo/highlight con `::before` pseudo-elemento en CSS o usar tailwind gradient
- Usar `style={{ background: 'linear-gradient(135deg, #4d2231 0%, #5D2A38 50%, #7a3a50 100%)' }}`

### 3. Navbar scrolled con degradado sutil (src/templates/EcommerceTemplate.tsx)
- Cambiar la clase del navbar cuando está scrolled de:
  `bg-background/95 backdrop-blur border-b border-border`
- A algo con degradado vertical sutil:
  `bg-gradient-to-b from-[#F5F2E7]/98 to-[#EDE9D8]/95 backdrop-blur-md border-b border-border/50`
- Esto crea sensación de profundidad y se funde mejor con el contenido debajo

## Archivos a modificar
- `src/index.css`: textura de grano global en body, degradado radial suave
- `src/components/AnnouncementBar.tsx`: degradado en el banner superior
- `src/templates/EcommerceTemplate.tsx`: degradado en navbar scrolled

## Notas técnicas
- La textura SVG de ruido se genera con `feTurbulence` tipo `fractalNoise`, `baseFrequency="0.65"`, `numOctaves="4"` con `stitchTiles="stitch"` para que sea seamless
- El SVG se embebe como data URL en el CSS para no necesitar archivo externo
- Opacidad del grano: entre 0.025 y 0.04 para que sea sutil
- NO cambiar los tokens de color CSS (`--background`, etc.) porque afectaría toda la app - usar valores hex directos donde se necesite el matiz diferente
- El footer (bg-secondary) también puede recibir el mismo tratamiento de degradado que el AnnouncementBar para coherencia visual