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
- **PRECIO MÍNIMO PERSONALIZADOS CONFIRMADO: $3,500 MXN** (pueden ser más chicos). Ya publicado en hero + FAQ de /personalizados.

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
- **Default de variante PDP (`HeadlessProduct.tsx`, useEffect líneas ~96-150):** Prisma abre en 50x50; el resto en 30x90. Normaliza formatos ("50x50cm", "50cm x 50cm", etc.).
- **DEEP-LINK DE TALLA (anuncios):** `?talla=30x90` (alias `?size=`) en la URL del producto preselecciona esa talla si está disponible, con PRIORIDAD sobre el default Prisma→50x50. Normaliza `30-90`, `30x90cm`, etc. Param inválido/agotado → cae al default sin romper.

## 3. Active Plan — (sin plan activo)
Todo lo pendiente de alto valor está en la sección 7.

## 4. Recent Changes
- **2026-07-17** — ✅ DEEP-LINK DE TALLA IMPLEMENTADO en `HeadlessProduct.tsx`: query param `?talla=30x90` (alias `?size=`) preselecciona la variante para anuncios Meta, con prioridad sobre el default Prisma→50x50. Normalización robusta (`30-90`, `30x90cm`). Fallback al default si el param es inválido/agotado. URL de ejemplo: `plieggo.com/products/acorden-prisma-onyx-opal?talla=30x90`.
- **2026-07-16** — 📋 PLAN deep-link de variante por URL (ya implementado 2026-07-17).
- **2026-07-10** — ✅ /personalizados LISTA: (1) fix sticky CTA con IntersectionObserver (solo on-scroll, no duplicado), (2) ancla precio "desde $3,500" en hero, (3) FAQ precio alineado a $3,500, (4) nueva sección "Un regalo que nadie más tendrá" con imagen black-dining + CTA WhatsApp Lead 'regalo'.
- **2026-07-10** — 📋 AUDITORÍA PRE-LANZAMIENTO /personalizados: screenshot móvil verificado. Precio mínimo confirmado $3,500.
- **2026-07-09** — ✅ LANDING `/personalizados` AJUSTADA: envuelta en `EcommerceTemplate` (menú global + banner + footer), agregada al menú, hero = 2º slide home, aspect ratios 4:5.
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
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2 (pared con cuadros): ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero landing /personalizados** = slide 2 del home: ...1779296069343-2ifge8n87sv.webp
- **GIFT_IMAGE (regalo /personalizados + home)**: `.../product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/black-dining.webp` (comedor con ventanal).
- Logo: /public/logo.svg
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara al clic en /personalizados (hero, tarjetas, regalo, sticky, CTA final).
- **[PENDIENTE VERIF]** Probar deep-link en prod: `?talla=30x90` abre en 30x90; sin param sigue en 50x50 (Prisma).
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA]** Validar evento Lead en prod (todos los CTA de /personalizados) antes/después de lanzar campaña.
- **[ALTA]** Validar deep-link `?talla=` en prod antes de lanzar el anuncio.
- **[BAJA · DUEÑO]** Definir política de garantía concreta. NO inventar. (custom no aplica devolución).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA]** Opcional: microcopy "Te respondemos rápido, Lun–Sáb" bajo CTAs (solo si es cierto — confirmar horario con dueño).
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).