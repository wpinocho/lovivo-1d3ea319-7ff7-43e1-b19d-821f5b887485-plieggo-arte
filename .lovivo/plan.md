# Rediseño del Hover en ProductCardUI

## Problema
El overlay de hover cubre toda la imagen (`inset-0`) con `justify-between`, lo que pone las variantes en el CENTRO de la foto, tapando el arte. Además el label "Tamaño" es innecesario y el fondo del overlay es muy claro.

## Solución
Anclar todos los elementos interactivos al FONDO de la imagen. El gradiente cubre solo la parte inferior. El arte queda visible en la parte superior.

## Cambios en `src/components/ui/ProductCardUI.tsx`

### 1. Rediseño del overlay completo
Cambiar de `justify-between` (distribuye de arriba a abajo) a `justify-end` (todo al fondo).

**Gradiente actual:** `bg-gradient-to-t from-background/30 via-background/10 to-transparent`  
**Gradiente nuevo:** `bg-gradient-to-t from-black/80 via-black/40 to-transparent`  
→ Más oscuro en el fondo, invisible en la parte superior. Preserva la imagen arriba.

### 2. Eliminar el bloque "Top: Badges de descuento" del overlay
Los badges de descuento y "Agotado" ya existen en otros lugares (badge top-right, precio con tachado). Eliminar este bloque duplicado del overlay.

### 3. Eliminar el label de opción (`{opt.name}`)
Quitar la línea:
```tsx
<div className="font-body text-xs font-medium text-foreground mb-1">{opt.name}</div>
```
Los botones de tamaño son auto-explicativos.

### 4. Rediseño de los botones de variante
**Actual:** `border-2 rounded-sm px-2 py-1 text-xs bg-background text-foreground`  
**Nuevo:** Pills con backdrop-blur y fondo semi-transparente para look premium:
- Estado normal: `bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs px-2 py-1 rounded-full`
- Estado seleccionado: `bg-white text-foreground border-white`
→ Look más elegante y acorde al arte mexicano de la marca

### 5. Nueva estructura del overlay (de arriba a abajo):
```
[imagen del producto — visible y sin obstrucción]
[gradiente solo en la parte inferior]
  → [fila de variante pills — justo arriba del botón]
  → [botón "Agregar al carrito" — pegado al fondo]
```

### 6. Ajuste de padding y spacing
- Reducir padding del overlay de `p-6` a `p-4`
- `gap-2` entre las variantes y el botón
- `mb-2` entre pills para que queden compactas

## Estructura final del overlay
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 gap-2 translate-y-4 group-hover:translate-y-0">
  
  {/* Variantes — solo si las hay, sin label */}
  {logic.hasVariants && logic.options && (
    <div className="flex flex-col gap-2">
      {logic.options.map((opt) => (
        <div key={opt.id} className="flex flex-wrap gap-1.5">
          {opt.values.filter(...).map((val) => {
            // Color swatches: círculos pequeños con ring blanco cuando seleccionado
            // Texto (tallas): pills con bg blanco translúcido
          })}
        </div>
      ))}
    </div>
  )}

  {/* Botón */}
  <Button ... className="btn-hero w-full">
    {logic.inStock ? 'Agregar al carrito' : 'Agotado'}
  </Button>
</div>
```

## Resultado esperado
- Top de la imagen: completamente limpio, sin overlay (arte visible)
- Bottom de la imagen: gradiente oscuro elegante con pills de variante + botón CTA
- Las dos cards (Espacio cuadrada y Acordeón rectangular) se benefician igual
- Look premium similar a tiendas de arte/diseño de alto nivel