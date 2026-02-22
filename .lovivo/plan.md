# Plan Activo — Sprint 1 Plieggo

## Decisiones tomadas en conversación

### ❌ DESCARTADO: Barra de progreso de envío gratis
- Los productos de Plieggo son mínimo $2,500 y YA incluyen envío gratis
- Un threshold artificial de $3k se siente forzado
- Descartado por no aplicar al modelo de negocio

### ✅ COMPLETADO: Newsletter en home
- Activado `NewsletterSection` en `IndexUI.tsx` después de `InspirationCarousel`
- Copy actualizado a "Club Plieggo" (exclusividad, sin descuento):
  - Título: "Sé el primero en ver nuevas piezas"
  - Subtítulo: "Acceso exclusivo a nuevas colecciones antes de que salgan al público. Solo para miembros del Club Plieggo."
  - Botón: "Unirme al Club"
  - Estado de éxito: "¡Bienvenido al Club Plieggo! Serás el primero en conocer nuevas piezas."
  - Tagline: "Sin spam. Solo arte."

---

## Feature pendiente: Upsell post-compra en ThankYou page

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

## Contexto del negocio (para referencia)
- Precio mínimo productos: ~$2,500 MXN
- Envío gratis en CDMX incluido en todos los productos
- Productos son arte premium hecho a mano (origami arquitectónico)
- Audiencia: compradores de regalo, decoradores, amantes del arte
- Ángulo de marca: exclusividad y artesanía, NO descuentos masivos