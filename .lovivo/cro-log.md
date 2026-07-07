# Plieggo — CRO Log

Registro de cambios de conversión: baseline → hipótesis → cambio → resultado.
Métrica foco: **viewcontent → addtocart** (PDP → Agregar al carrito).

---

## 2026-07-07 — FASE 1 + 2: Descripciones, reseñas, jerarquía CTA, bloque luz/sombra

### Baseline (PostHog, 30d al 2026-07-07)
- viewcontent 4,909 → addtocart 87 → initiatecheckout 76 → purchase 12.
- **PDP → ATC global = 1.8%**. 96% tráfico móvil (IG/FB).
- Landing #1: `/products/acordeon-prisma-azul-coral` — 1,242 uniq móvil, ATC ≈ **0.56%** (descripción vacía).
- Comparación: `acorden-beige-sutil` (con descripción) ATC ≈ **2.6%** (~5x mejor).

### Hipótesis
1. Descripciones vacías en la línea Prisma + Verde Salvia son la mayor fuga. Escribir copy con gancho emocional + beneficios subirá el ATC hacia 4-6%.
2. El diferenciador "luz y sombra que cambia con el día" está enterrado como micro-bullet. Un bloque visual dedicado aumenta el deseo.
3. Jerarquía de CTAs invertida: "Comprar ahora" (alta fricción) era primario y "Agregar al carrito" (acción medida, baja fricción) secundario. Priorizar ATC debe subir la métrica.
4. Prueba social baja (4 reseñas) en la landing estrella para ticket $4,500.

### Cambios aplicados
- **Copy**: descripciones nuevas (gancho + bullets de beneficio + contexto/medidas) para los 12 productos activos. Prioridad: azul-coral, onyx-opal, beige-blanco, verde-salvia (estaban vacías). Vía `ecommerce update-product`.
- **Reseñas**: Azul Coral de 4 → 12 reseñas verificadas (nuevas ids 5-12 en `product-reviews-content.ts`, reviewCount actualizado en `product-reviews.ts`). Pendiente validación del dueño.
- **CTA reorder** (`ProductPageUI.tsx`): "Agregar al carrito" ahora PRIMARIO sólido terracota (igual que sticky bar); "Comprar ahora" secundario outline; express checkout terciario con separador "o paga directo".
- **Bloque luz/sombra** (`LightShadowFeature.tsx`): sección editorial "La misma pieza, distinta a cada hora" con 3 fotos reales de la pieza (object-cover, captions mañana/tarde/noche). Colocado antes de reseñas.
- **Default variante Prisma** (`HeadlessProduct.tsx`): Prisma abre en 50x50 en vez de 30x90 (resto sigue 30x90).

### Medición (pendiente)
- Comparar viewcontent→addtocart por producto ANTES/DESPUÉS (ventana equivalente ~30d) en PostHog. Foco en `acordeon-prisma-azul-coral`. Objetivo: de 0.56%/1.8% → 4-6%.
- No hay volumen para A/B (≈20 ATC/sem). Cambio secuencial: comparar 30d antes vs 30d después.

### Próximo (Fase 3)
- Lanzar encuesta exit-intent en `/products/` (mobile): "¿Qué te frenó de agregar este cuadro?" (precio, dudas calidad/tamaño, envío, prefiero verlo antes, solo miraba, otro).