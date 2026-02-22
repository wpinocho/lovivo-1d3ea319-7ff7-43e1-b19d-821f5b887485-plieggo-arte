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

### ✅ COMPLETADO: Upsell post-compra en ThankYou page
- Sección "Otras piezas que te podrían interesar" agregada en `src/pages/ThankYou.tsx`
- Fetch de hasta 4 productos activos del store, excluyendo los ya comprados
- Grid responsive: 2 columnas en móvil, 4 columnas en desktop
- Cards: imagen aspect-square, título, precio, "Ver pieza →" link al producto
- Silent fail si el fetch falla (no rompe la página)
- Aparece entre los detalles del pedido y el botón "Seguir Comprando"

---

## Contexto del negocio (para referencia)
- Precio mínimo productos: ~$2,500 MXN
- Envío gratis en CDMX incluido en todos los productos
- Productos son arte premium hecho a mano (origami arquitectónico)
- Audiencia: compradores de regalo, decoradores, amantes del arte
- Ángulo de marca: exclusividad y artesanía, NO descuentos masivos