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
  - **Plazo para lotes 20–40 pzas: no hay dato histórico.** Copy acordado: "definimos la fecha contigo desde el brief y queda por escrito en la cotización". NO publicar un plazo inventado.
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

## 3. Active Plan — `/proyectos` (B2B) casi cerrada

La landing B2B está en producción (`src/pages/Proyectos.tsx`, alias `/b2b`).
Imágenes B2B reales YA integradas (2026-08-13). **Solo falta 1 imagen: B2B-6 (regalo corporativo).**

### Pendiente único de imagen
- `GIFT_IMAGE` (línea ~58, marcada `TODO B2B-6`) sigue usando la foto del comedor residencial.
  Spec: **cajas de empaque premium apiladas con una pieza a la vista**, 4:5, luz natural,
  paleta crema-terracota, sin personas de frente, sin logos. El dueño la sube.
  Al llegar: `lov-copy('user-uploads://...', 'products/b2b-regalo.webp')` → pegar URL en `GIFT_IMAGE`.

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-13** — ✅ **IMÁGENES B2B REALES INTEGRADAS en `/proyectos`**. HERO_IMAGE → lobby de hotel boutique 16:9 (`1786658786579-tv4ym4zokz.webp`) + `loading="eager"` / `fetchPriority="high"` / alt SEO B2B. GALLERY reordenada: 4 tomas comerciales nuevas primero (pasillo de hotel con serie de 3 colores `ckqrb8e8t9o`, recepción de oficina `6h8j8g0ewdc`, sala de juntas azul medianoche `7h75oomjxf`, restaurante burdeos nocturno `hqtofonof9o`) + 2 de producto existentes (blanco puro `u5scxlsp37`, prisma onyx `f53ej22pcj`). Alts descriptivos por contexto. Solo queda pendiente GIFT_IMAGE (B2B-6).
- **2026-08-13** — ✅ **LANDING B2B `/proyectos` CONSTRUIDA** (`src/pages/Proyectos.tsx`, ~700 líneas). Alias `/b2b`. 11 secciones: hero (2 CTAs + chips + 4.8★), 4 tarjetas de segmento clicables a WhatsApp, "por qué funciona en espacios comerciales", **cotizador de 3 campos** (espacio/cantidad/ciudad → mensaje estructurado de WhatsApp, sin backend), proceso de 4 pasos, galería 6 fotos, regalo corporativo, 3 estilos, prueba social, FAQ de 8 preguntas + JSON-LD FAQPage, CTA final con mailto, sticky móvil con IntersectionObserver. Todos los CTA disparan `facebookPixel.lead({content_category:'b2b', content_name:'b2b-<origen>'})`. Rutas en `App.tsx` + enlace "Proyectos y mayoreo" en el footer de `EcommerceTemplate.tsx`.
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
- **Hero landing /proyectos** (DEFINITIVO): `.../message-images/.../1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique, 16:9.
- **Galería B2B `/proyectos`** (DEFINITIVAS, todas 4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel, serie de 3 piezas (beige / verde salvia / blanco)
  - `1786658786579-6h8j8g0ewdc.webp` — recepción de oficina, pieza Luna cuadrada
  - `1786658786579-7h75oomjxf.webp` — sala de juntas, acordeón azul medianoche
  - `1786658786579-hqtofonof9o.webp` — restaurante nocturno, acordeón burdeos
- **GIFT_IMAGE**: `.../message-images/.../1785956439043-14bbt12y522l.webp` (comedor real). Definitiva en `/personalizados`; **TEMPORAL en `/proyectos`** (pendiente B2B-6).
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[PENDIENTE]** Reemplazar `GIFT_IMAGE` en `/proyectos` (`TODO B2B-6`, regalo corporativo).
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara en `/personalizados` y `/proyectos` (hero, tarjetas de segmento, cotizador, regalo, estilos, sticky, CTA final).
- **[PENDIENTE VERIF]** Revisar `/proyectos` con screenshot en móvil Y desktop tras el deploy (sobre todo el crop del hero nuevo en móvil).
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en pedidos B2B grandes:** revisar si $0 sigue siendo rentable en lotes de 20+ piezas.

## 7. Pending / Future Sessions
- **[ALTA]** Swap de `GIFT_IMAGE` en `/proyectos` cuando el dueño mande la foto de regalo corporativo.
- **[ALTA]** Validar evento Lead en prod (CTAs de `/proyectos` y `/personalizados`).
- **[ALTA]** Screenshot QA de `/proyectos` móvil + desktop con las imágenes nuevas.
- **[MEDIA]** Definir esquema concreto de descuento por volumen (5-15 / 16-40 / 40+) para poder publicarlo y aumentar conversión B2B.
- **[MEDIA]** Considerar un one-pager PDF de proyectos para mandar por correo a despachos.
- **[MEDIA]** Añadir `?ref=b2b` a analytics para medir tráfico de la landing al catálogo.
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA · DUEÑO]** Política de garantía / reposición concreta. NO inventar.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).