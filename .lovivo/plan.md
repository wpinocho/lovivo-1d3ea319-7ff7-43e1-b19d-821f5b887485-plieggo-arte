# Plan Activo — Sprint 1 Plieggo

## Decisiones tomadas en conversación

### ❌ DESCARTADO: Barra de progreso de envío gratis
- Los productos de Plieggo son mínimo $2,500 y YA incluyen envío gratis
- Un threshold artificial de $3k se siente forzado
- Descartado por no aplicar al modelo de negocio

### ✅ COMPLETADO: Newsletter en home
- Activado `NewsletterSection` en `IndexUI.tsx` después de `InspirationCarousel`
- Rediseñada visualmente: fondo Azul Medianoche (`bg-foreground`), texto Crema (`text-background`), acento Terracota (`text-primary`/`bg-primary`)
- Elementos decorativos: brackets de esquina (origami feel), líneas terracota arriba y abajo, eyebrow con separadores
- Fix: color de texto del input corregido (`text-foreground` en vez de `text-background`)
- Copy "Club Plieggo" (exclusividad, sin descuento)

### ✅ COMPLETADO: Upsell post-compra en ThankYou page
- Sección "Mientras esperas tu pedido" agregada en `src/pages/ThankYou.tsx`
- Fetch de hasta 4 productos activos del store, excluyendo los ya comprados
- Grid responsive: 2 columnas en móvil, 4 columnas en desktop
- Silent fail si el fetch falla

### ✅ COMPLETADO: Luna Beige — reseñas e imagen de inspiración
- 8 reseñas con rating 4.9★ agregadas en `product-reviews.ts` y `product-reviews-content.ts`
- Imagen de inspiración (sala escandinava con sofá beige) agregada en `product-inspiration.ts`
- La imagen aparece al lado de la Guía de Tamaños en la página de producto

---

## Contexto del negocio (para referencia)
- Precio mínimo productos: ~$2,500 MXN
- Envío gratis en CDMX incluido en todos los productos
- Productos son arte premium hecho a mano (origami arquitectónico)
- Audiencia: compradores de regalo, decoradores, amantes del arte
- Ángulo de marca: exclusividad y artesanía, NO descuentos masivos