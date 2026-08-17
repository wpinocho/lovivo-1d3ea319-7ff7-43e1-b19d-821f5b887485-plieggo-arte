# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- **OJO B2B:** el tráfico de `/proyectos` NO es el mismo perfil. Interioristas/compradores corporativos entran más desde desktop y en horario laboral.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE:** medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Flujo por WhatsApp. ALTA DEMANDA.
  - Solo estilos de colecciones existentes (Luna, Acordeón, Acordeón Prisma). Color limitado a paleta del proveedor de opalina.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** **ENTREGA: 5–7 días hábiles** (piezas estándar).
- **Best-sellers reales: `verde-salvia` y `acorden-beige-sutil`.** **Rating: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS. **PRECIO MÍNIMO PERSONALIZADOS: $3,500 MXN.**

### FICHA TÉCNICA CONFIRMADA POR EL DUEÑO (2026-08-17) — datos publicables
- **Medidas:** desde **20 × 20 cm** hasta piezas de **más de 1 metro**. Las del sitio son las estándar.
- **Material:** opalina libre de ácidos hasta ~100 × 70 cm; **lino** en formatos mayores.
- **Marco:** madera, color y acabado a elegir. Con o sin acrílico.
- **Montaje:** **llega con soporte ya montado atrás.** Se cuelga directo, sin instalador ni herrajes extra.
- **Peso:** varía con la medida; siempre ligera (papel + marco, sin cristal). NO publicar cifras.
- **Humedad:** **sí aguanta**, mejor con acrílico. **NO recomendar en baños** ni con agua directa.
- **Capacidad de producción:** **SIN TOPE.** En proyectos grandes contrata gente por proyecto. NO publicar un número de piezas/mes.
- **B2B:** precio preferencial desde 5 piezas (% caso por caso). Factura con IVA SÍ. Correo: julian.ruiz.loza@gmail.com. Plazo de lotes: se define en el brief, NO inventar.

### PENDIENTES DE RESPUESTA DEL DUEÑO
- ¿Autoriza publicar "desde $3,500 MXN por pieza" en `/proyectos`? (aún sin respuesta → NO publicado)
- ¿Hay proyecto B2B entregado que se pueda mostrar como caso?
- ¿Kit físico de muestras de color para despachos?
- Política de reposición si una pieza llega dañada.
- Cómo se limpia/mantiene una pieza (dato aún no dado → no publicado).

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens (primary/secondary), nunca text-white/bg-white.
- **Formato de dinero**: `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts`.
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.
- **Base URL imágenes subidas por el dueño**: `.../message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/<file>.webp`.
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`.
- **Default variante PDP:** Prisma → 50x50; resto → 30x90. **Deep-link talla:** `?talla=30x90`.

---

## 3. Active Plan — `/proyectos` B2B: Tanda 1+2 EJECUTADAS

**Hecho (2026-08-17):** ficha técnica, FAQs de durabilidad/montaje/volumen, cotizador de 4 campos con doble salida (WhatsApp + correo), sección "Pide una muestra", captions de galería, macro del pliegue, copy fixes.

### Queda pendiente (bloqueado por datos o imágenes)
- **Ancla de precio en `/proyectos`** — esperando OK del dueño para publicar "desde $3,500 MXN por pieza".
- **Prueba social B2B real** — hoy se usa el fallback honesto (H2 "Cientos de piezas colgadas. Ninguna repetida." + franja de 3 datos duros). Sustituir en cuanto haya 1-2 testimonios de proyecto o logos con permiso.
- **Cara y nombre del fundador** (P1.3) — requiere foto de Julián.
- **One-pager PDF de proyectos** (P1.6) — lead magnet para despachos.
- **Bloque comparativo** (P2.2) y **CTA "prefiero que me llamen"** (P2.3).
- **SEO `/proyectos`**: añadir `Service`/`Organization` JSON-LD y og:title/description/image (hoy solo FAQPage).
- **Analytics**: scroll-depth y apertura de FAQs para saber qué duda pesa más.

### Imágenes aún pedidas al dueño (NO disponibles en esta versión)
taller/manos doblando (4:5) · serie grande de 5+ piezas (16:9) · empaque profesional (4:5) · retrato del fundador (1:1).

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-17** — ✅ **TANDA 1+2 B2B EJECUTADA en `/proyectos`**:
  - Nueva sección **FICHA TÉCNICA** (`SPECS`, 8 campos, `dl/dt/dd` 2 columnas sobre `bg-muted/30`) entre "Por qué funciona" y el cotizador. Solo datos confirmados por el dueño.
  - **DETAIL_IMAGE → macro real del pliegue** (`1787007863112-8rzvvao3e74.webp`, acordeón azul medianoche con luz rasante). H2 cambiado a "No es un póster. Es relieve real que cambia con la luz." La foto del pasillo/elevador se movió a la galería (`HALLWAY_IMAGE`) sustituyendo la foto de estudio.
  - **4 FAQs nuevas**: alto tránsito, zonas húmedas, cómo se cuelga (soporte incluido), sin tope de piezas. FAQ de medidas actualizada con el rango 20×20 → +1 m.
  - **Cotizador**: nuevo campo "¿Para cuándo la necesitas?" (`DATE_OPTIONS`), grid 2×2, y **botón secundario "Enviar por correo"** (mailto pre-llenado con los 4 datos) que dispara `Lead` con `b2b-cotizador-email`.
  - Nueva sección **"Toca una pieza antes de pedir el lote"** (bg-secondary) entre galería y regalo corporativo, con 2 CTAs.
  - **Captions en las 6 fotos de galería** (espacio · pieza).
  - REASONS: "Ligera y sin cristal" → "Sin cristal que se rompa" + nueva razón "Llega lista para colgar".
  - Hero: 5º check "Respuesta el mismo día hábil". FAQ H2 → "Preguntas frecuentes de proyectos". Prueba social H2 → "Cientos de piezas colgadas. Ninguna repetida." + franja de 3 datos duros.
- **2026-08-13** — 📋 Auditoría completa de `/proyectos` (código + screenshots).
- **2026-08-13** — ✅ Landing B2B `/proyectos` construida (alias `/b2b`) + imágenes reales integradas.
- **2026-08-05** — ✅ GIFT_IMAGE de `/personalizados` reemplazada por foto real del comedor.
- **2026-07-17** — ✅ Deep-link de talla en `HeadlessProduct.tsx`.
- **2026-07-10** — ✅ `/personalizados` lista: sticky CTA, ancla $3,500, FAQ, sección regalo.
- **2026-07-09** — ✅ `lead()` en `FacebookPixelService`; fixes StripePayment, galería por variante, 404 post-pago.

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `.../message-images/.../1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique 16:9.
- **DETAIL_IMAGE `/proyectos`** (NUEVA): `1787007863112-8rzvvao3e74.webp` — macro del pliegue, acordeón azul medianoche, luz rasante. ✅ resuelto.
- **Galería B2B `/proyectos`** (4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel, serie de 3
  - `1786658786579-6h8j8g0ewdc.webp` — recepción de oficina, Luna
  - `1786658786579-7h75oomjxf.webp` — sala de juntas, acordeón azul
  - `1786658786579-hqtofonof9o.webp` — restaurante nocturno, burdeos
  - `1786659699632-3gh24xwrus4.webp` — acceso a elevadores, acordeón beige (antes DETAIL_IMAGE)
  - `1786659699632-nw9w0w6g6b.webp` — lounge residencial, acordeón negro
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp` — Luna en sala/dining con olivo.
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige.

## 6. Known Issues
- **[PENDIENTE DUEÑO]** OK para publicar ancla de precio en `/proyectos`; caso B2B mostrable; kit de muestras; política de reposición; instrucciones de limpieza.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos` (incl. nuevo `b2b-cotizador-email`).
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[CERRADO]** Precio botón sin formato y bug correo (el dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[ALTA]** Conseguir OK de precio ancla → publicar en `/proyectos` (ficha técnica + cotizador).
- **[ALTA]** Testimonio o caso B2B real para sustituir el fallback de prueba social.
- **[ALTA]** Validar evento Lead en prod (WhatsApp + correo).
- **[MEDIA]** Imágenes pendientes: taller, serie grande, empaque, retrato del fundador.
- **[MEDIA]** One-pager PDF de proyectos.
- **[MEDIA]** SEO `/proyectos`: Service/Organization JSON-LD + og tags.
- **[MEDIA]** Esquema concreto de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).