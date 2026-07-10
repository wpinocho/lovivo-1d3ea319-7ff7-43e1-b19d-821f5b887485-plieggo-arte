# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE:** medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Flujo 100% por WhatsApp. ALTA DEMANDA. YA EN PDP + landing dedicada.
  - **RESTRICCIONES REALES (NO publicar en landing — filtrar en WhatsApp):** solo estilos de colecciones existentes (Luna, Acordeón, Acordeón Prisma). Color limitado a paleta del proveedor de opalina. Tamaño máx opalina ~100×70 cm; arriba se cambia a lino. Con/sin acrílico y color/material del marco.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.**
- **TIEMPO DE ENTREGA: 5–7 días hábiles.**
- **Best-sellers reales: `verde-salvia` y `acorden-beige-sutil`.**
- **Rating agregado real: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS.
- **[POR CONFIRMAR] Precio mínimo personalizados:** dueño mencionó "$3,500" como mínimo, pero productos activos arrancan en $4,500 (acordeón) / $5,000 (luna) y el FAQ de la landing dice "Desde $4,500". Aclarar cuál es el ancla real antes de publicar precio.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens (primary/secondary), nunca text-white/bg-white.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts` (campo `photoUrl`) y `src/data/product-reviews-content.ts`.
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.
- **Menú global** en `src/templates/EcommerceTemplate.tsx` (desktop array + mobile Sheet). Incluye `/personalizados` ("Personalízalo", destacado en primary).
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`, NUNCA aspect-square.

## 3. Active Plan — AUDITORÍA /personalizados PRE-LANZAMIENTO 📋 (2026-07-10)

Objetivo: dejar la landing lista para lanzar campaña Meta, optimizada a conversión WhatsApp (evento Lead). Estado actual = sólida (10 secciones, template global, sticky CTA, Lead en todos los CTA, aspect ratios 4:5 OK). Screenshot móvil verificado ✓. Logo "Your Logo" era glitch de carga, en vivo sale "Plieggo" ✓.

### DECISIONES DE CONVERSIÓN (respuestas a preguntas del dueño)

**A) Filtro de precio ("desde $X") → SÍ, agregarlo (recomendado).**
- Razón CRO: en lead-gen frío de Meta, mostrar precio ancla PRE-CALIFICA. Reduce leads basura (quien espera un póster de $500), sube la calidad del lead y ahorra tiempo en WhatsApp. Refuerza posicionamiento premium.
- Riesgo: baja volumen bruto de leads, pero sube tasa de cierre → mejor ROI. Meta optimiza sobre el evento Lead igual.
- Implementación:
  - Añadir microcopy de precio en el HERO, discreto, junto a los trust badges: p. ej. "Piezas personalizadas desde $X" (usar `formatMoney()`).
  - Mantener/alinear el FAQ "¿Cuánto cuesta?" al MISMO número.
  - **BLOQUEADO hasta confirmar número real ($3,500 vs $4,500).** No publicar hasta que el dueño confirme.
  - Framing como VALOR, no barrera: "hecho a mano, a tu medida, desde $X — envío gratis".

**B) Sección de marcos personalizados / materiales → NO agregar (recomendado).**
- Razón: contradice la estrategia de NO publicar restricciones técnicas (paleta, lino, acrílico, marco). Añade fricción/decisión en una página de lead-gen. Se resuelve mejor en WhatsApp.
- Mantener las 3 palancas limpias: estilo → color → tamaño (sección "Lo hacemos como lo imaginas").
- Opcional mínimo (si el dueño insiste): UNA línea suave en el paso 2 del proceso ("También afinamos el marco contigo"), sin sección dedicada.

**C) Traer secciones de la home:**
- **"Galería de ambientes" → NO duplicar.** La landing YA tiene galería lifestyle ("Piezas que transforman una pared"). Redundante. Dejar como está.
- **"Arte para regalo" → SÍ, agregar (recomendado, alto valor).** El regalo personalizado es un disparador emocional potente y amplía la audiencia (para sí mismo + para regalar). Adaptar copy a personalización.
  - Nueva sección tipo "Un regalo que nadie más tendrá": copy enfocado en unicidad + dedicatoria + empaque premium.
  - Reusar imagen lifestyle de regalo de la home (comedor con ventanal, ver Image Inventory) o una de galería.
  - Beneficios (bullets, benefit-first): "Único e irrepetible — en su color favorito", "Empaque premium incluido", "Dedicatoria personalizada gratis", "Envío gratis en 5–7 días".
  - CTA WhatsApp con Lead: content_name `cuadro-personalizado-regalo`.
  - Colocar entre "Arte que cambia con la luz" y las reseñas, O justo antes del proceso.
  - NOTA: producto es hecho a la orden → NO copiar "Garantía 30 días / devolución" de la home (custom no aplica devolución). Enfatizar "cotización sin compromiso" en su lugar.

### AJUSTES CRO ADICIONALES (menores, recomendados)
1. **Expectativa de respuesta WhatsApp** (opcional, solo si es cierto): microcopy bajo el CTA del hero y CTA final: "Te respondemos rápido, Lun–Sáb". Sube confianza del clic.
2. **Alinear FAQ precio** con el ancla confirmada.
3. Revisar que el evento Lead siga disparando en prod (pendiente heredado).

### Archivos a modificar (Craft Mode)
- `src/pages/Personalizados.tsx`:
  - Hero: agregar microcopy precio "desde $X" junto a trust badges (usar formatMoney o string fijo).
  - Nueva sección "Arte para regalo personalizado" (const con bullets + imagen + CTA con `handleWhatsAppLead('regalo')`).
  - FAQ precio: alinear número.
  - (Opcional) microcopy de tiempo de respuesta bajo CTAs.
- Sin cambios de estructura del template.

## 4. Recent Changes
- **2026-07-10** — 📋 AUDITORÍA PRE-LANZAMIENTO /personalizados: screenshot móvil verificado (sólida). Decisiones: (A) SÍ agregar ancla de precio "desde $X" [bloqueado por confirmar número], (B) NO sección de marcos/materiales, (C) NO duplicar galería pero SÍ agregar sección "Arte para regalo personalizado". Ajustes menores: microcopy tiempo de respuesta + alinear FAQ precio.
- **2026-07-09** — ✅ LANDING `/personalizados` AJUSTADA: envuelta en `EcommerceTemplate` (menú global + banner + footer), agregada al menú desktop+móvil ("Personalízalo"), hero cambiado al 2º slide del home, aspect ratios a 4:5.
- **2026-07-09** — ✅ LANDING `/personalizados` CONSTRUIDA: página nueva mobile-first (10 secciones), CTA único WhatsApp, evento `Lead` Meta.
- **2026-07-09** — ✅ Método `lead()` agregado a `FacebookPixelService` (facebook-pixel.ts).
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP: eliminado 2º enlace WhatsApp; padding mt-10; CustomSizeCTA reescrito.
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP (nota selector, CustomSizeCTA, FAQ).
- **2026-07-09** — ✅ FIX foto reseña Mónica A. (plieggo-general-reviews id g4).
- **2026-07-09** — ✅ FIX A + FIX B en StripePayment.tsx (formatMoney + badge MSI).
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE en HeadlessProduct.tsx.
- **2026-07-09** — ✅ FIX 404 POST-PAGO: PagoPendiente.tsx + ruta.
- **2026-07-08** — ✅ Checkout MSI up-front (StripePayment deferred, sin gate paymentUnlocked).

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2 (pared con cuadros, "Encuentra tu pieza perfecta"): ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero landing /personalizados** = slide 2 del home: ...1779296069343-2ifge8n87sv.webp
- **Imagen "regalo" home** (comedor con ventanal, sección "Arte que nunca falla como regalo") → candidata para nueva sección regalo en /personalizados. Ubicar URL en Index.tsx al construir.
- Logo: /public/logo.svg
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[POR CONFIRMAR] Precio ancla personalizados:** $3,500 (dueño) vs $4,500 (FAQ/productos). Aclarar antes de publicar.
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara al clic en /personalizados.
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA]** Confirmar precio ancla → luego agregar "desde $X" en hero + FAQ de /personalizados.
- **[ALTA]** Construir sección "Arte para regalo personalizado" en /personalizados.
- **[ALTA]** Validar evento Lead en prod.
- **[BAJA · DUEÑO]** Definir política de garantía concreta. NO inventar. (OJO: custom no aplica devolución).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).