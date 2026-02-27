# Plan: Hero Section Full Screen

## Qué quiere el usuario
La hero section debe cubrir exactamente toda la pantalla (100vh) tanto en desktop como en móvil. Actualmente usa `h-[70vh] md:aspect-video md:max-h-[85vh]` lo cual deja espacio sobrante y no se ve tan pro.

## Estado actual
- `HeroCarousel.tsx`: `className="relative w-full h-[70vh] md:aspect-video md:max-h-[85vh] overflow-hidden bg-background"`
- `PageTemplate.tsx`: el header es `sticky top-0 z-40 bg-background/95 backdrop-blur`
- `EcommerceTemplate.tsx`: el header es `py-4 bg-background/95 backdrop-blur` (no tiene transparencia)
- Layout en `IndexUI.tsx`: usa `layout='full-width'`

## Enfoque premium: Hero 100dvh + Navbar overlay transparente

### Cambio 1: HeroCarousel.tsx
Cambiar la altura del hero:
- De: `h-[70vh] md:aspect-video md:max-h-[85vh]`
- A: `h-[100dvh]` (dvh es mejor que vh en móvil porque respeta la barra del browser)

### Cambio 2: EcommerceTemplate.tsx — Navbar con transparencia en scroll
Agregar un `useState` + `useEffect` con scroll listener en `EcommerceTemplate`:
```tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

Usar `scrolled` para cambiar el className del header div:
- Cuando NO scrolled (sobre el hero): `bg-transparent border-transparent`
- Cuando scrolled: `bg-background/95 backdrop-blur border-b border-border`
- Añadir `transition-all duration-300` para la transición suave

El logo y los links del nav también deben cambiar de color cuando están sobre el hero:
- Links: `text-white/90` (no scrolled) → `text-muted-foreground` (scrolled)
- Logo texto "Plieggo": `text-white` (no scrolled) → `text-foreground` (scrolled)
- Cart icon: `text-white` (no scrolled) → default (scrolled)
- Hamburger menu: `text-white` (no scrolled) → default (scrolled)

### Cambio 3: PageTemplate.tsx — Quitar border fijo del sticky header
El `<header>` en PageTemplate tiene `border-b` fijo. Necesitamos que EcommerceTemplate pueda controlar ese border dinámicamente. La solución más simple: pasar una prop o mover el control de styles al header content (que viene de EcommerceTemplate).

En PageTemplate, el `<header>` wrapper quitar el `border-b` fijo:
```tsx
<header className="sticky top-0 z-40">
  {header}
</header>
```
Y dejar que EcommerceTemplate maneje el bg y border con la clase dinámica.

## Resultado visual esperado
- En home: al cargar la página, la hero ocupa 100% de la pantalla. La navbar flota sobre la imagen con fondo transparente y texto blanco. Al hacer scroll, la navbar se vuelve sólida (Crema con blur). Se ve igual a marcas premium como Zara Home, HAY, etc.
- En otras páginas (AllProducts, Product, etc.): la navbar comienza en estado "scrolled" (sólida) porque no hay hero debajo, lo que se logra con un check de `scrollY > 20` — pero como la página carga con scroll en 0, arranca transparente 1 segundo. Para evitar esto se puede inicializar el estado según la ruta: si no es home (`/`), iniciar `scrolled = true`.

### Fix para otras páginas
En EcommerceTemplate, detectar si estamos en home:
```tsx
const isHome = location.pathname === '/'
const [scrolled, setScrolled] = useState(!isHome) // En otras páginas, empieza como scrolled
```

## Archivos a modificar
1. `src/components/HeroCarousel.tsx` — cambiar altura a `h-[100dvh]`
2. `src/templates/EcommerceTemplate.tsx` — añadir scroll listener + clases dinámicas para navbar transparent/solid
3. `src/templates/PageTemplate.tsx` — quitar `bg-background/95 backdrop-blur border-b` del wrapper `<header>` para que EcommerceTemplate lo controle