# Plan Activo — Sprint 1 Plieggo

## Decisiones tomadas en conversación

### ❌ DESCARTADO: Barra de progreso de envío gratis
- Los productos de Plieggo son mínimo $2,500 y YA incluyen envío gratis
- Un threshold artificial de $3k se siente forzado
- Descartado por no aplicar al modelo de negocio

### ✅ A IMPLEMENTAR AHORA:

---

## Feature 1: Upsell post-compra en ThankYou page

### Qué hace
Después del resumen del pedido en `/thank-you/:orderId`, agregar una sección "Piezas que podrían interesarte" con 3-4 productos. El cliente acaba de comprar → está en su momento de mayor confianza y apertura.

### Estado actual
`src/pages/ThankYou.tsx` — solo tiene un botón "Seguir Comprando" al final. Sin ninguna recomendación de producto.

### Implementación
1. En `ThankYou.tsx`, importar `supabase` y `STORE_ID`
2. Agregar un `useEffect` que haga fetch de productos activos (excluir los que ya compró en la orden)
3. Renderizar una sección debajo del grid de "Detalles del Pedido" y "Información de Entrega", antes de los botones de acción
4. Usar el componente `ProductCard` ya existente para mostrar los cuadros
5. Título de la sección: "Otras piezas que podrían interesarte"
6. Mostrar máximo 4 productos en grid responsive (2 cols móvil, 4 cols desktop)
7. Excluir del listado los productos que ya compraron (filtrar por `order.order_items`)

### Archivos a modificar
- `src/pages/ThankYou.tsx` — agregar fetch de productos + sección de upsell

---

## Feature 2: Newsletter en home con copy premium (sin descuento)

### Qué hace
Activar el componente `NewsletterSection` que ya existe pero NO está en la home. Con copy premium de "acceso VIP / exclusividad" — NO descuento (eso baratearía la marca Plieggo a $2,500+).

### Estado actual
- Componente `src/components/NewsletterSection.tsx` existe y está completo
- `src/pages/ui/IndexUI.tsx` — NO incluye este componente. La sección vendría después de `<InspirationCarousel />` y antes de `<FloatingCart />`

### Implementación

**En `NewsletterSection.tsx`, cambiar el copy:**
- Título actual: "¿Quieres estar al día?" → **"Sé el primero en ver nuevas piezas"**
- Subtítulo actual: "Suscríbete y recibe ofertas exclusivas y nuevas colecciones" → **"Acceso exclusivo a nuevas colecciones antes de que salgan al público. Solo para miembros del Club Plieggo."**
- Botón: "Suscribirse" → **"Unirme al Club"**
- Estado de éxito: "¡Gracias por suscribirte! Pronto recibirás nuestras mejores ofertas y novedades." → **"¡Bienvenido al Club Plieggo! Serás el primero en conocer nuevas piezas."**
- Agregar un pequeño texto debajo del form: `Sin spam. Solo arte.`

**En `IndexUI.tsx`, agregar el componente:**
```tsx
import { NewsletterSection } from '@/components/NewsletterSection'
// ...
<InspirationCarousel />
<NewsletterSection />  {/* ← AGREGAR AQUÍ */}
<FloatingCart />
```

### Diseño/estética
El componente actual ya tiene un diseño limpio con `bg-muted/30 py-20 border-y`. El cambio es solo de copy, no de estructura visual. Mantener el mismo estilo — es apropiado para una marca premium.

### Archivos a modificar
- `src/components/NewsletterSection.tsx` — cambiar copy
- `src/pages/ui/IndexUI.tsx` — agregar import + componente

---

## Orden de implementación recomendado

1. **Primero**: Newsletter en home (más fácil, 2 archivos, solo copy + import)
2. **Segundo**: Upsell en ThankYou (requiere fetch de datos + nuevo componente visual)

Ambos se pueden hacer en el mismo Craft Mode session.

---

## Contexto del negocio (para referencia)
- Precio mínimo productos: ~$2,500 MXN
- Envío gratis en CDMX incluido en todos los productos
- Productos son arte premium hecho a mano (origami arquitectónico)
- Audiencia: compradores de regalo, decoradores, amantes del arte
- Ángulo de marca: exclusividad y artesanía, NO descuentos masivos