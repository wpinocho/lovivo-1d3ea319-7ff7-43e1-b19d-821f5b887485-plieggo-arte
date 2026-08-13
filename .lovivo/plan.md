# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE:** medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Flujo 100% por WhatsApp. ALTA DEMANDA. YA EN PDP + landing dedicada.
  - **RESTRICCIONES REALES (filtrar en WhatsApp):** solo estilos de colecciones existentes (Luna, Acordeón, Acordeón Prisma). Color limitado a paleta del proveedor de opalina. Tamaño máx opalina ~100×70 cm; arriba se cambia a lino. Con/sin acrílico y color/material del marco.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.**
- **TIEMPO DE ENTREGA: 5–7 días hábiles** (piezas estándar).
- **Best-sellers reales: `verde-salvia` y `acorden-beige-sutil`.**
- **Rating agregado real: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS.
- **PRECIO MÍNIMO PERSONALIZADOS: $3,500 MXN.**
- **B2B (confirmado por el dueño 2026-08-13):**
  - Precio preferencial **desde 5 piezas**; el % exacto se define caso por caso en la cotización (no publicar cifra).
  - **Factura con IVA: SÍ.**
  - **Plazo para lotes 20–40 pzas: no hay dato histórico** (nunca han hecho uno). Sin problema de sourcing. Copy acordado: "definimos la fecha contigo desde el brief y queda por escrito en la cotización". NO publicar un plazo inventado.
  - **Correo para cotizaciones formales: julian.ruiz.loza@gmail.com**

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens (primary/secondary), nunca text-white/bg-white.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts` (campo `photoUrl`).
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.
- **Base URL imágenes subidas por el dueño**: `.../message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/<file>.webp`.
- **Menú global** en `src/templates/EcommerceTemplate.tsx`. `/proyectos` NO va en el menú (solo footer).
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`, NUNCA aspect-square.
- **Default de variante PDP (`HeadlessProduct.tsx`):** Prisma abre en 50x50; el resto en 30x90.
- **DEEP-LINK DE TALLA:** `?talla=30x90` (alias `?size=`) preselecciona talla.

## 3. Active Plan — SWAP DE IMÁGENES B2B en `/proyectos`

La landing B2B **ya está construida y en producción** (`src/pages/Proyectos.tsx`).
Lo único pendiente es **reemplazar 3 imágenes temporales** por material B2B real que el dueño enviará.

### Cómo hacer el swap (rápido)
Las constantes están al inicio de `src/pages/Proyectos.tsx` (líneas ~55-62), marcadas con `TODO B2B-n`:
- `HERO_IMAGE` → **B2B-1: lobby / recepción de hotel boutique** (hoy usa la foto de la pared con cuadros del home)
- `GIFT_IMAGE` → **B2B-6: cajas de empaque premium apiladas** (hoy usa la foto del comedor)
- `GALLERY[]` (6 slots, líneas ~135-142) → sustituir por: pasillo de hotel con serie de 3 piezas, recepción de oficina, sala de juntas, restaurante nocturno, showroom/retail, detalle de instalación.
- `DETAIL_IMAGE` (detalle de pliegues) **NO se cambia**, funciona tal cual.

### Especificación de las 6 tomas que faltan (para generar o fotografiar)
1. **Lobby / recepción de hotel boutique** — pieza 30×90 vertical sobre muro de estuco claro, mueble de madera, luz natural lateral que marque la sombra de los pliegues. Formato 16:9 o 3:2. → HERO.
2. **Pasillo de hotel con serie de 3 piezas** iguales en distinto color (beige, verde salvia, blanco) — comunica "producción por lote". 4:5.
3. **Recepción de oficina / despacho** — pieza 50×50 detrás del mostrador, tono neutro beige-blanco, iluminación de acento. 4:5.
4. **Sala de juntas** — pieza 30×90 en el muro corto, mesa larga y sillas. Blanco puro u onyx. 4:5.
5. **Restaurante / café de diseño** — pieza burdeos u onyx, luz cálida de noche (contraste con las diurnas). 4:5.
6. **Regalo corporativo** — cajas de empaque premium apiladas con una pieza a la vista. 4:5.
Reglas: lenguaje visual Zara Home / Muji, paleta crema-terracota-azul medianoche, luz natural marcando la sombra, SIN personas de frente, SIN logos de marcas reales. Si se generan con IA: `imagegen--generate_image` + `reference_images` con la foto REAL del producto (cargar antes skill `media.product-imagery`).

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-13** — ✅ **LANDING B2B `/proyectos` CONSTRUIDA** (`src/pages/Proyectos.tsx`, ~700 líneas). Alias `/b2b`. 11 secciones: hero (2 CTAs + chips + 4.8★), 4 tarjetas de segmento clicables a WhatsApp, "por qué funciona en espacios comerciales", **cotizador de 3 campos** (espacio/cantidad/ciudad → mensaje estructurado de WhatsApp, sin backend), proceso de 4 pasos, galería 6 fotos, regalo corporativo, 3 estilos, prueba social, FAQ de 8 preguntas + JSON-LD FAQPage, CTA final con mailto, sticky móvil con IntersectionObserver. Todos los CTA disparan `facebookPixel.lead({content_category:'b2b', content_name:'b2b-<origen>'})`. Datos reales del dueño: precio preferencial desde 5 pzas, factura con IVA, correo julian.ruiz.loza@gmail.com. Rutas en `App.tsx` + enlace "Proyectos y mayoreo" en el footer de `EcommerceTemplate.tsx`. `/personalizados` NO se tocó. **Imágenes temporales (residenciales) marcadas con `TODO B2B-n`.**
- **2026-08-13** — 📋 PLAN LANDING B2B: buyer personas definidos (hotelería boutique, interioristas/arquitectos, corporativo, restaurantes/retail, regalo corporativo, desarrolladores).
- **2026-08-05** — ✅ Reemplazada GIFT_IMAGE en `/personalizados` por foto real del comedor (`1785956439043-14bbt12y522l.webp`).
- **2026-07-17** — ✅ DEEP-LINK DE TALLA en `HeadlessProduct.tsx`: `?talla=30x90`.
- **2026-07-10** — ✅ /personalizados LISTA: sticky CTA, ancla precio "desde $3,500", FAQ alineado, sección regalo.
- **2026-07-09** — ✅ LANDING `/personalizados` construida y ajustada (EcommerceTemplate, menú, 4:5).
- **2026-07-09** — ✅ Método `lead()` agregado a `FacebookPixelService`.
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP + CustomSizeCTA reescrito.
- **2026-07-09** — ✅ FIX A + FIX B en StripePayment.tsx (formatMoney + badge MSI).
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE en HeadlessProduct.tsx.
- **2026-07-09** — ✅ FIX 404 POST-PAGO: PagoPendiente.tsx + ruta.

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2 (pared con cuadros): ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero landing /personalizados** = slide 2 del home: ...1779296069343-2ifge8n87sv.webp
- **Hero landing /proyectos** = TEMPORAL, mismo slide 2. Pendiente B2B-1 (lobby de hotel).
- **GIFT_IMAGE**: `.../message-images/.../1785956439043-14bbt12y522l.webp` (comedor con cuadro real). Usada en `/personalizados` (definitiva) y en `/proyectos` (TEMPORAL, pendiente B2B-6).
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **FALTAN (B2B): 6 tomas de espacios comerciales** — especificación completa en sección 3.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[PENDIENTE]** Reemplazar las 3 imágenes temporales de `/proyectos` (`TODO B2B-1`, `TODO B2B-6`, array `GALLERY`).
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara en `/personalizados` y `/proyectos` (hero, tarjetas de segmento, cotizador, regalo, estilos, sticky, CTA final).
- **[PENDIENTE VERIF]** Revisar `/proyectos` con screenshot en móvil Y desktop tras el deploy.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en pedidos B2B grandes:** revisar si $0 sigue siendo rentable en lotes de 20+ piezas.

## 7. Pending / Future Sessions
- **[ALTA]** Swap de las 6 imágenes B2B en `/proyectos` cuando el dueño las envíe.
- **[ALTA]** Validar evento Lead en prod (CTAs de `/proyectos` y `/personalizados`).
- **[ALTA]** Screenshot QA de `/proyectos` móvil + desktop.
- **[MEDIA]** Definir esquema concreto de descuento por volumen (5-15 / 16-40 / 40+) para poder publicarlo y aumentar conversión B2B.
- **[MEDIA]** Considerar un one-pager PDF de proyectos para mandar por correo a despachos.
- **[MEDIA]** Añadir `?ref=b2b` a analytics para medir tráfico de la landing al catálogo.
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA · DUEÑO]** Política de garantía / reposición concreta. NO inventar.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).