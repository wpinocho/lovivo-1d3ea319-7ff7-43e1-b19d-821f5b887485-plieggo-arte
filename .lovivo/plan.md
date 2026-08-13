# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- **OJO B2B:** el tráfico de `/proyectos` NO es el mismo perfil. Interioristas/compradores corporativos entran más desde desktop y en horario laboral. La landing debe funcionar bien en AMBOS.
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
- **Menú global** en `src/templates/EcommerceTemplate.tsx`. `/proyectos` YA APARECE en el menú desktop (verificado por screenshot 2026-08-13).
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`, NUNCA aspect-square.
- **Default de variante PDP (`HeadlessProduct.tsx`):** Prisma abre en 50x50; el resto en 30x90.
- **DEEP-LINK DE TALLA:** `?talla=30x90` (alias `?size=`) preselecciona talla.

---

## 3. Active Plan — AUDITORÍA B2B `/proyectos` (2026-08-13)

**Estado de la página hoy:** 11 secciones, bien diseñada, imágenes reales, copy sólido, CTA WhatsApp consistente en 7 puntos, FAQ + JSON-LD, sticky móvil. Base muy buena. Los huecos son de **contenido de decisión B2B**, no de diseño.

**Diagnóstico central:** la landing hoy convence emocionalmente (se ve hermosa) pero **no le da al especificador lo que necesita para especificar**: no hay ficha técnica, no hay precio ancla, no hay prueba de proyectos reales, no hay ruta de muestra, y no responde la objeción #1 ("¿papel, en un espacio comercial de alto tránsito?"). Además el único camino de contacto real es WhatsApp; un comprador corporativo en desktop y en horario laboral muchas veces no puede/no quiere usarlo.

---

### P0 — ALTA PRIORIDAD (impacto directo en leads calificados)

#### P0.1 — Nueva sección: FICHA TÉCNICA / ESPECIFICACIONES
Ubicación: justo después de "Por qué funciona en espacios comerciales" (sección burdeos), antes del cotizador.
Un especificador (arquitecto/interiorista/compras de hotel) no puede meter un producto a un proyecto sin datos duros. Hoy no hay ninguno.

Formato: bloque de 2 columnas (desktop) / lista apilada (móvil), sobre `bg-muted/30`, tipo tabla ligera con `dt/dd`, sin bordes pesados.

Campos a publicar (⚠️ **PENDIENTE CONFIRMAR CON EL DUEÑO** — ver sección 6):
- **Material:** opalina libre de ácidos (hasta ~100 × 70 cm) · lino en formatos mayores
- **Marco:** madera; color y acabado a elegir
- **Protección:** con o sin acrílico (recomendado acrílico en zonas de alto tránsito / cocina)
- **Medidas estándar:** 30 × 90 · 50 × 50 · [completar lista real]
- **Medida a proyecto:** sí, hasta [máx real]
- **Peso aproximado:** [PENDIENTE]
- **Montaje:** [herraje/sistema — PENDIENTE]
- **Limpieza y mantenimiento:** [PENDIENTE — plumero seco / no líquidos, etc.]
- **Producción:** hecha a mano en México
- **Capacidad de producción:** [PENDIENTE — piezas/mes]

Encabezado propuesto: "Ficha técnica" · H2: "Los datos que tu proyecto necesita"
Subtítulo: "Todo lo que te van a preguntar en obra, en un solo lugar."

#### P0.2 — Responder la objeción #1: durabilidad en espacio comercial
Hoy nadie contesta "¿papel en un pasillo de hotel con gente, humedad y limpieza?". Esa duda mata la venta en silencio.
Añadir 2 FAQs nuevas + reforzar el bloque de razones:
- **"¿Aguanta un espacio de alto tránsito?"** → acrílico protector opcional, marco cerrado, sin cristal que se rompa, papel libre de ácidos que no amarillea. [CONFIRMAR detalle real con dueño]
- **"¿Cómo se limpia?"** → [PENDIENTE dato real]
- **"¿Qué pasa si una pieza se daña?"** → política de reposición. [PENDIENTE — el dueño aún no la define. NO INVENTAR.]

También cambiar la razón 3 de REASONS:
- Actual: "Ligera y sin cristal / Se instala y se transporta sin riesgo, incluso en volumen."
- Nueva: "**Sin cristal que se rompa** — llega y se instala sin riesgo, y con acrílico opcional para zonas de alto tránsito."

#### P0.3 — Ancla de precio (auto-calificación)
Hoy la página no tiene NI UN número de precio. Consecuencia doble: (a) el prospecto con presupuesto pequeño escribe y quema tiempo, (b) el prospecto serio no escribe porque asume que es carísimo o teme el "llámanos para precio".
Acción: añadir línea de precio ancla debajo del H2 del cotizador y en la ficha técnica:
> "Piezas de proyecto **desde $3,500 MXN por pieza**. Precio preferencial desde 5 piezas; el descuento exacto sale en tu cotización."
⚠️ Requiere OK explícito del dueño antes de publicar.

#### P0.4 — Segunda vía de contacto real (no solo WhatsApp)
El cotizador de 3 campos solo abre WhatsApp. Si el usuario está en una laptop de oficina sin WhatsApp Web logueado, el lead se pierde.
Acción (sin backend, 100% frontend):
- Añadir bajo el botón principal un **botón secundario "Enviar por correo"** que abra `mailto:` con **el mismo mensaje pre-llenado** (espacio, cantidad, ciudad, fecha) en el body y asunto "Cotización de proyecto — Plieggo".
- Disparar `facebookPixel.lead({content_name:'b2b-cotizador-email', content_category:'b2b'})` también en ese click.
- Nota futura: cuando se conecte Supabase, convertir el cotizador en formulario real que guarde el lead en tabla `b2b_leads` (hoy imposible: Supabase no conectado).

#### P0.5 — Añadir campo "¿Para cuándo la necesitas?" al cotizador
El paso 1 del proceso pide "fecha en la que las necesitas" pero el cotizador no la pregunta. Es el campo que más califica un lead B2B.
Nuevo `Select` con opciones: "Lo antes posible" · "En 1 mes" · "En 2-3 meses" · "Más de 3 meses" · "Aún explorando".
Layout: el grid pasa de 3 a 4 campos → `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.
Incluir la fecha en el texto de WhatsApp y en el mailto.

#### P0.6 — Sección "Pide una muestra" (de-risker)
Hoy está enterrada como FAQ #7. En B2B la muestra física es EL paso que desbloquea el pedido grande; debe ser una sección visible con su propio CTA.
Ubicación: entre la galería y "Regalo corporativo".
- Encabezado: "Antes de comprometerte" · H2: "**Toca una pieza antes de pedir el lote**"
- Copy: "Compra una sola pieza del catálogo, valida el acabado y el color en tu espacio, y a partir de ahí armamos la serie completa. Si el proyecto se cierra, ese primer pedido cuenta." *(⚠️ la última frase solo si el dueño confirma que lo acredita)*
- Dos CTAs: "Ver catálogo" (link a `/all-products?ref=b2b-muestra`) + "Pedir muestra de color por WhatsApp".
- 💡 **Oportunidad grande:** ofrecer un **kit físico de muestras de color/papel** para despachos de interiorismo. Es estándar en la industria y ningún competidor de arte en papel lo hace. ⚠️ Confirmar con el dueño si es viable.

---

### P1 — MEDIA PRIORIDAD (credibilidad y calidad de lead)

#### P1.1 — Captions en la galería
Las 6 fotos son preciosas pero se leen como stock. Añadir un caption debajo de cada imagen con tipo de espacio + serie + medida:
Ej. "Pasillo de hotel · Serie de 3 · 40 × 120 cm" / "Recepción corporativa · Pieza Luna · 60 × 60 cm".
⚠️ Solo datos descriptivos y verdaderos de lo que se ve. NO inventar nombres de clientes ni ciudades.
Implementación: añadir campo `caption` a cada item de `GALLERY` y renderizarlo en `font-body text-xs text-muted-foreground mt-2`.

#### P1.2 — Prueba social B2B (hoy es 100% B2C)
Las 3 reseñas que se muestran (`g1`, `g6`, `g8`) son de compradores individuales con nombre de producto residencial. A un gerente de compras de hotel eso no le mueve nada.
Opciones, en orden de preferencia:
1. **Ideal:** 1-2 testimonios reales de proyecto (hotel, despacho, oficina) con nombre y cargo. ⚠️ PEDIR AL DUEÑO.
2. **Sin testimonios B2B:** franja de logos "Han especificado Plieggo" ⚠️ requiere permiso de los clientes.
3. **Fallback si no hay nada:** reformular el H2 de "Ya cuelgan en cientos de paredes" a "**Cientos de piezas colgadas. Ninguna repetida.**" y añadir una franja de 3 datos duros: "196 reseñas · 4.8★ promedio" · "Hecho a mano en México" · "Envío gratis a todo el país". Es honesto y suena mejor que reseñas residenciales en contexto B2B.

#### P1.3 — Cara y nombre del fundador
Un despacho compra a una persona, no a un formulario. Hoy la página es anónima.
Añadir bloque compacto en el cotizador (o al final): foto del fundador + "Julián, fundador · Responde él mismo" + "Respondemos el mismo día hábil".
⚠️ Requiere foto del dueño y su OK.

#### P1.4 — Mover "Respondemos el mismo día hábil" a un lugar visible
Hoy vive en `text-xs text-muted-foreground` bajo el cotizador. Es una promesa de servicio fuerte: subirla al hero (junto a los checks) y repetirla en el CTA final.

#### P1.5 — Copy fixes puntuales
- FAQ H2: "Preguntas de compradores" → "**Preguntas frecuentes de proyectos**" (más específico al contexto B2B).
- Sección burdeos: el H2 dice "Es una pieza que la gente toca con la mirada" pero la imagen es un pasillo, no un detalle. O cambia la imagen (ver P2.1) o cambia el H2 a: "**No es un póster. Es relieve real que cambia con la luz.**"
- Hero: los 4 checks están bien; añadir un 5º: "Respuesta el mismo día hábil".
- Alt del DETAIL_IMAGE dice "Detalle de los pliegues hechos a mano" pero muestra un pasillo con elevador → corregir alt (SEO + accesibilidad).
- Comentario obsoleto en el código (líneas 53-56) dice "Único pendiente: GIFT_IMAGE" — ya no aplica. Limpiar.

#### P1.6 — One-pager PDF de proyectos (lead magnet)
Los interioristas necesitan un PDF para meterlo en su presentación al cliente. Añadir CTA "Descargar ficha de proyectos (PDF)" en el hero secundario y en la ficha técnica. Sin gate (fricción cero), solo tracking del click como Lead.
⚠️ Requiere que se produzca el PDF (contenido: estilos, medidas, materiales, proceso, 6 fotos, datos de contacto).

---

### P2 — BAJA PRIORIDAD / OPORTUNIDADES

#### P2.1 — Imágenes a solicitar al dueño
Las 9 imágenes actuales son todas "pieza colgada en interior cálido". Falta variedad narrativa. Pedirle:
1. **Macro del pliegue** (4:5) — detalle cerrado del papel doblado con luz rasante, sombra marcada. Para la sección burdeos. **La más importante: es la prueba visual de que no es un póster impreso.**
2. **Taller / manos doblando papel** (4:5) — autenticidad artesanal. Va en el paso 3 del proceso o como banda completa.
3. **Serie grande instalada** (16:9 apaisada) — 5+ piezas juntas en un mismo muro/pasillo. Es la prueba de capacidad de volumen; hoy la foto de "serie de 3" es lo máximo que muestra.
4. **Empaque profesional** (4:5) — cajas apiladas / pieza embalada lista para envío. Refuerza logística B2B y regalo corporativo.
5. **Foto del fundador** (cuadrada) — para P1.3.

#### P2.2 — Bloque comparativo
Tabla ligera de 3 columnas: "Cuadro de catálogo · Obra de galería · **Plieggo**" comparando precio, exclusividad, medida a proyecto, tiempos, factura. Ayuda a justificar el gasto internamente. Opcional.

#### P2.3 — CTA de menor compromiso
Añadir junto al WhatsApp un "Prefiero que me llamen" que mande un mensaje de WhatsApp distinto pidiendo llamada + horario. Baja la barrera para quien no quiere chatear.

#### P2.4 — SEO
- Añadir `Service` / `Organization` JSON-LD además del `FAQPage` actual.
- Añadir `og:title` / `og:description` / `og:image` dinámicos (hoy no se sobreescriben) — importante porque el link se comparte por WhatsApp entre despachos.

#### P2.5 — Analytics
`?ref=b2b` ya está en los links al catálogo. Falta medir el embudo: eventos de scroll-depth y de apertura de cada FAQ para saber qué duda pesa más.

---

### ORDEN DE EJECUCIÓN SUGERIDO EN CRAFT MODE
**Tanda 1 (sin datos nuevos, se puede hacer ya):** P0.4 (mailto), P0.5 (campo fecha), P0.6 (sección muestra), P1.1 (captions), P1.4 (promesa de respuesta), P1.5 (copy fixes + alt + comentario).
**Tanda 2 (requiere respuestas del dueño):** P0.1 (ficha técnica), P0.2 (objeción durabilidad), P0.3 (precio ancla), P1.2 (prueba social B2B), P1.3 (fundador).
**Tanda 3:** imágenes nuevas (P2.1), PDF (P1.6), comparativa (P2.2), SEO (P2.4).

### Archivos a modificar
- `src/pages/Proyectos.tsx` — TODO lo anterior vive aquí (arrays `REASONS`, `FAQS`, `GALLERY`, `SPACE_OPTIONS`, nuevo `DATE_OPTIONS`, nuevo `SPECS`, nuevas secciones JSX).
- `src/lib/facebook-pixel.ts` — sin cambios (ya tiene `lead()`).
- `public/` — futuro PDF de proyectos.

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-13 (v3)** — 📋 **AUDITORÍA COMPLETA DE `/proyectos`** (código + screenshots móvil y desktop). Se detectaron 6 huecos P0: falta ficha técnica, no se responde la objeción de durabilidad en espacio comercial, cero ancla de precio, único canal de contacto es WhatsApp, el cotizador no pregunta fecha, y la muestra física está enterrada en el FAQ. Plan priorizado P0/P1/P2 arriba.
- **2026-08-13 (v2)** — ✅ **3 IMÁGENES B2B REEMPLAZADAS en `/proyectos`**: galería item 6 → sala de estar con acordeón negro (`1786659699632-nw9w0w6g6b.webp`); DETAIL_IMAGE → acordeón beige en pasillo junto a elevador (`1786659699632-3gh24xwrus4.webp`); GIFT_IMAGE → pieza Luna en sala/dining con olivo (`1786659699632-92ykhoixt85.webp`).
- **2026-08-13** — ✅ **IMÁGENES B2B REALES INTEGRADAS en `/proyectos`**. HERO_IMAGE → lobby de hotel boutique 16:9 (`1786658786579-tv4ym4zokz.webp`) + `loading="eager"` / `fetchPriority="high"`.
- **2026-08-13** — ✅ **LANDING B2B `/proyectos` CONSTRUIDA** (`src/pages/Proyectos.tsx`, ~890 líneas). Alias `/b2b`. 11 secciones.
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
- **Galería B2B `/proyectos`** (todas 4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel, serie de 3 piezas (beige / verde salvia / blanco)
  - `1786658786579-6h8j8g0ewdc.webp` — recepción de oficina, pieza Luna cuadrada
  - `1786658786579-7h75oomjxf.webp` — sala de juntas, acordeón azul medianoche
  - `1786658786579-hqtofonof9o.webp` — restaurante nocturno, acordeón burdeos
  - `u5scxlsp37.webp` (base products/) — acordeón blanco escultural
  - `1786659699632-nw9w0w6g6b.webp` — sala de estar residencial, acordeón negro, credenza de madera
- **DETAIL_IMAGE (sección "por qué funciona")**: `1786659699632-3gh24xwrus4.webp` — acordeón beige en pasillo junto a elevador. ⚠️ El H2 promete "detalle" pero la foto es de espacio → sustituir por macro de pliegue (ver P2.1) o cambiar el H2.
- **GIFT_IMAGE (sección "regalo corporativo")**: `1786659699632-92ykhoixt85.webp` — pieza Luna en sala/dining con olivo.
- **IMÁGENES PEDIDAS AL DUEÑO (2026-08-13, pendientes):** macro del pliegue (4:5) · taller/manos doblando (4:5) · serie grande de 5+ piezas (16:9) · empaque profesional (4:5) · retrato del fundador (1:1).
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[DATOS FALTANTES · BLOQUEA P0.1 y P0.2]** Preguntas abiertas al dueño para poder publicar la ficha técnica:
  1. Lista completa de medidas estándar disponibles.
  2. Peso aproximado por pieza (30×90 y 50×50).
  3. Sistema de montaje/herraje con el que llegan.
  4. Cómo se limpia y mantiene una pieza.
  5. ¿Aguanta zona húmeda (cocina de restaurante, baño de hotel)? ¿Se recomienda acrílico obligatorio ahí?
  6. Capacidad de producción real: ¿cuántas piezas puede sacar el taller al mes?
  7. ¿Autorizas publicar "desde $3,500 MXN por pieza" en /proyectos?
  8. ¿Existe algún proyecto B2B ya entregado que podamos mostrar (con o sin nombre)?
  9. ¿Es viable mandar un kit físico de muestras de color a despachos?
  10. Política de reposición si una pieza llega dañada.
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en pedidos B2B grandes:** revisar si $0 sigue siendo rentable en lotes de 20+ piezas. Considerar cambiar el copy a "envío incluido en pedidos de proyecto" y manejarlo caso por caso.

## 7. Pending / Future Sessions
- **[ALTA]** Ejecutar Tanda 1 de la auditoría B2B (mailto, campo fecha, sección muestra, captions, copy fixes).
- **[ALTA]** Conseguir del dueño las 10 respuestas de la sección 6 → desbloquea Tanda 2.
- **[ALTA]** Validar evento Lead en prod (CTAs de `/proyectos` y `/personalizados`).
- **[MEDIA]** Recibir las 5 imágenes nuevas pedidas (macro, taller, serie grande, empaque, fundador).
- **[MEDIA]** One-pager PDF de proyectos para despachos.
- **[MEDIA]** Definir esquema concreto de descuento por volumen (5-15 / 16-40 / 40+) para poder publicarlo.
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA · DUEÑO]** Política de garantía / reposición concreta. NO inventar.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).