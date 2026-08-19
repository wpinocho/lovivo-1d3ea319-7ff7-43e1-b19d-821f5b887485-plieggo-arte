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
- **MSI ACTIVO.** SPEI (customer_balance) y OXXO ACTIVOS. **PayPal Express integrado (2026-08-18).** **PRECIO MÍNIMO PERSONALIZADOS: $3,500 MXN.**
- **✅ ANCLA DE PRECIO B2B AUTORIZADA (2026-08-17):** publicar "desde $3,500 MXN por pieza" en `/proyectos`. Constante `PRICE_FROM` en `Proyectos.tsx`.

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
- ¿Hay proyecto B2B entregado que se pueda mostrar como caso?
- ¿Kit físico de muestras de color para despachos?
- **Política de reposición si una pieza llega dañada.** ← AHORA ES BLOQUEANTE (ver §3, la PDP ya promete "Garantía 30 días" sin respaldo)
- Cómo se limpia/mantiene una pieza (dato aún no dado → no publicado).
- Esquema concreto de % de descuento por rango de volumen (hoy es "caso por caso").
- **NUEVO:** ¿tiene 3-5 fotos de clientes reales (rostro) con permiso para el avatar strip? Si no → usar fotos de piezas colgadas.

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
- **RUTA PDP CANÓNICA: `/products/:slug`** (App.tsx línea 66). NO existe `/productos/`.

---

## 3. Active Plan — AUDITORÍA PDP + TRUST STRIP (2026-08-19)

**Contexto:** ticket alto ($4,500–$5,000 MXN), 96% móvil, tráfico social frío desde IG/FB.
En ticket alto la conversión NO se gana con urgencia ni descuentos; se gana **eliminando el riesgo percibido**:
(1) ¿es real y de calidad? (2) ¿me va a quedar bien de tamaño? (3) ¿llegará roto? (4) ¿qué pasa si no me gusta? (5) ¿puedo pagarlo a plazos?
Todo el plan está ordenado por ese marco.

### SLUGS REALES EN DB (verificado 2026-08-19 con ecommerce--list-data, 12 productos activos)
`acorden-prisma-onyx-opal` · `acordeon-prisma-beige-blanco` · `acordeon-prisma-azul-coral` ·
`luna-beige` · `luna-azul` · `luna-llena` · `luna-negra` ·
**`verde-salvia`** (título: "Acordón Verde Salvia") · **`acorden-morado-blanco`** (título: "Acordeón Prisma Burdeos Blanco") ·
`acorden-burdeos-intenso` · `acorden-blanco-puro` · `acorden-beige-sutil`

---

### 🔴 P0 — BUGS QUE ESTÁN COSTANDO VENTAS HOY (arreglar primero, son gratis)

#### P0.1 — El best-seller #1 no muestra NI UNA estrella
`src/data/product-reviews.ts` tiene la key `'acorden-verde-salvia'`, pero el slug real en DB es **`verde-salvia`**.
`getProductReview('verde-salvia')` → `{rating: 0, reviewCount: 0}`.
Consecuencia doble en `/products/verde-salvia` (verificado por screenshot móvil):
- No se renderiza el rating inline arriba del precio (`productReview.reviewCount > 0` es false).
- `ProductReviews` oculta TODA la sección "Lo que dicen de este cuadro" (`hasSpecific` es false).
→ El producto que más se vende es el que menos prueba social muestra.

**Fix:** añadir a `REVIEW_SLUG_ALIASES` en `src/data/product-reviews.ts`:
```
'verde-salvia': 'acorden-verde-salvia',
'acorden-morado-blanco': 'acorden-morado-blanco',   // ya resuelve, verificar contenido
'acordeon-prisma-azul-coral': 'acordeon-prisma-azul-coral',
```
Y **auditar los 12 slugs uno por uno** contra `product-reviews.ts` y `product-reviews-content.ts`.
Cualquier slug sin entrada → PDP sin estrellas. Añadir un fallback de marca (4.8★) en vez de 0 sería peor que arreglar los datos: arreglar los datos.

#### P0.2 — Canonical y breadcrumb SEO apuntan a una URL 404
`ProductPageUI.tsx` líneas ~204 y ~196:
- `canonicalPath={`/productos/${product.slug}`}` → esa ruta NO existe (comprobado: devuelve 404).
- `breadcrumbJsonLd([... { name: product.title, path: `/productos/${product.slug}` }])` → mismo error.
Google está recibiendo un canonical roto en TODAS las PDPs. Cambiar a **`/products/${product.slug}`**.
Bonus del mismo bloque: el breadcrumb intermedio "Productos" apunta a `/` — debería ir a `/all-products`.

#### P0.3 — Tres números de reseñas distintos en la MISMA página
- Inline arriba del precio: `20 reseñas verificadas` (por producto).
- Sección "Lo que dicen de este cuadro": `4.9 · 20 reseñas verificadas`.
- Sección "Más experiencias Plieggo": **hardcodeado `4.9` y `+100 reseñas`** (`ProductReviews.tsx` líneas 273-275).
- Dato real confirmado por el dueño: **4.8★ · 196 reseñas**.
En ticket alto, una inconsistencia numérica visible destruye la credibilidad de todo el bloque.
**Fix:** crear una constante única de marca (p.ej. `BRAND_RATING = 4.8`, `BRAND_REVIEW_COUNT = 196`) en `src/data/product-reviews.ts` y consumirla en TODOS los puntos de marca. El número por producto se queda como está (es otra cosa y está bien diferenciado).

#### P0.4 — Se promete "Garantía 30 días" sin ninguna página ni FAQ que la respalde
Búsqueda en `src/**`: el string "Garantía 30 días" existe SOLO en el trust strip de `ProductPageUI.tsx`. No hay página de política, no hay FAQ, no hay detalle en checkout.
En una compra de $4,500 el cliente SÍ va a buscar la letra chica. No encontrarla = abandono.
**Bloqueado por el dueño**: necesitamos la política real (¿devolución con reembolso? ¿reposición? ¿quién paga el envío de retorno? ¿aplica a piezas personalizadas?).
Mientras tanto, mínimo: una FAQ nueva en `ProductFAQ` que explique el proceso en 3 líneas.

---

### 🟠 P1 — EL TRUST STRIP QUE PIDIÓ EL DUEÑO (+ lo que le falta al bloque de CTA)

#### P1.1 — Avatar social-proof strip (referencia: "Jason R. ✓ and +1,000 riders love the Rodata One")
**Veredicto: SÍ, es una muy buena idea para este negocio.** Es el patrón de social proof con mejor relación impacto/espacio en ticket alto, y hoy la PDP tiene la prueba social enterrada a 3 scrolls del botón.

**Ubicación recomendada: DEBAJO de los botones (después de "Comprar ahora" / express checkout, ANTES del trust strip de envío/entrega/garantía).**
Razón: en móvil el usuario decide en el momento en que ve el botón. Ponerlo arriba empuja el CTA fuera del fold. Ponerlo debajo funciona como el "empujón" justo después de ver el precio. (La referencia que mandó el dueño también lo tiene debajo, después del accordion de shipping.)

**Contenido (mobile-first, una sola línea, altura ~56px):**
- 3 avatares circulares solapados (`-space-x-3`, borde del color de fondo `#F2EFE4`, 32px).
- Texto: `**Mónica A.** ✓ y **+190 clientes** ya colgaron su Plieggo` — el nombre en negrita, el badge verificado en terracota (#C16648), NO azul de Twitter.
- Fondo: `bg-muted/30` con `rounded-xl`, sin borde duro. Estilo Muji, no estilo "widget de reviews".
- Todo el bloque es un `<a href="#reviews">` → hace scroll a las reseñas. Medible.

**⚠️ De dónde salen las caras — decisión importante:**
NO usar fotos de stock de personas. En una marca artesanal se detecta y quema la confianza justo donde queríamos construirla.
- **Opción A (default, se puede hacer YA):** usar las 5 fotos reales que ya existen con `photoUrl` en `plieggo-general-reviews.ts` (piezas colgadas en casas de clientes: Mónica A., Valentina S., Sebastián M., Daniela R., Andrés V.). Círculos con la pieza en su espacio real. Honesto y muy on-brand.
- **Opción B (mejor, requiere al dueño):** 3 fotos reales de clientes con permiso. Upgrade directo cuando lleguen.
Componente nuevo sugerido: `src/components/SocialProofAvatars.tsx`, con las fuentes desacopladas para poder cambiar A→B sin tocar la PDP.

#### P1.2 — Faltan los logos de pago junto al CTA
La PDP no muestra ni un solo método de pago. En México eso pesa mucho, y más ahora que hay **PayPal, MSI, OXXO y SPEI** activos y nadie se entera hasta el checkout.
Añadir bajo el CTA una fila discreta en escala de grises: Visa · Mastercard · Amex · PayPal · OXXO · SPEI. Ya existe `CheckoutTrustBadges.tsx` como referencia de estilo.

#### P1.3 — Los MSI están escondidos en gris chiquito
Hoy: `<p className="text-xs text-muted-foreground">o 6 meses sin intereses de $750</p>`.
Para un cuadro de $4,500, "$750 al mes" es probablemente el argumento #1 de conversión en México, y está tratado como letra chica.
**Fix:** badge propio con fondo suave (`bg-[#C16648]/8`), borde sutil, el monto en negrita del color foreground y el texto "6 meses sin intereses" legible. Justo debajo del precio.

#### P1.4 — CTA de duda para ticket alto
Hoy el único WhatsApp en la zona de decisión dice "¿Otra medida?". Falta la salida para el que duda por otras razones (color, si combina, si es regalo).
Añadir bajo el trust strip: `¿Dudas antes de comprar? Escríbenos por WhatsApp · te respondemos en minutos`. Mismo número, mensaje pre-llenado con el nombre de la pieza.

---

### 🟡 P2 — LA OBJECIÓN #1 DEL ARTE DE PARED: "¿DE QUÉ TAMAÑO SE VE REALMENTE?"

#### P2.1 — Referencia de escala visual
`SizeGuide` existe y ayuda, pero es texto. En arte de pared, la duda de escala es la causa #1 de no comprar y la #1 de devolución.
Añadir en la galería (o justo bajo el selector de talla) un diagrama simple: silueta de sofá/persona a escala con la pieza al lado y las medidas en cm. Un SVG basta, no hace falta foto.
Bonus alto impacto si el dueño manda foto: la misma pieza colgada sobre un sillón, con la medida sobreimpresa.

#### P2.2 — La galería no comunica el relieve
El diferenciador de Plieggo es que **es relieve real, no una impresión**. En `/proyectos` eso ya se resolvió con la macro del pliegue (`1787007863112-8rzvvao3e74.webp`) y funciona muy bien.
La PDP no tiene ninguna macro. Un cliente que llega frío desde Instagram no puede distinguir esto de un póster de $400.
**Fix:** asegurar que cada producto tenga en la galería (posición 2 o 3) una macro del pliegue con luz rasante. Varios ya tienen 5-8 imágenes; hay que revisar producto por producto cuál falta.

#### P2.3 — Nadie explica cómo llega empacado
Objeción específica de este producto: *"es papel, ¿no llega aplastado?"*.
Hay una FAQ, pero enterrada. Añadir una línea al trust strip o al bloque de craftsmanship: "Empaque rígido reforzado · llega listo para colgar, con soporte montado".
La foto de empaque sigue pendiente del dueño (ver §7).

---

### 🟢 P3 — AJUSTES MENORES DE FRICCIÓN MÓVIL
- **Selector de cantidad** ocupa una fila entera arriba del CTA. En arte, >95% compra 1. Comprimirlo (inline junto al CTA o colapsado tras un "+ Agregar otra").
- **Badge "Edición Limitada"** se dispara con `product.title.toLowerCase().includes('luna')` → aplica a las 4 Lunas por título, no por dato real. Funciona, pero es frágil: si el dueño crea "Luna" en otra colección heredará urgencia falsa. Migrar a tag real.
- **Import muerto**: `ArrowLeft` se usa en el bloque `notFound` (línea ~149) pero NO está importado en el bloque de imports de lucide-react. Si un usuario llega a un slug inválido → pantalla en blanco por ReferenceError. **Esto es en realidad un P0 encubierto**, verificar y añadir el import.
- **Breadcrumb "Productos"** → `/all-products` en vez de `/`.

---

### ORDEN DE EJECUCIÓN SUGERIDO EN CRAFT MODE
1. P0.1 slugs de reseñas + P3 import `ArrowLeft` (bugs, minutos, impacto inmediato)
2. P0.2 canonical + breadcrumb
3. P0.3 constante única de rating de marca
4. P1.1 `SocialProofAvatars.tsx` (opción A) montado bajo los CTAs
5. P1.3 badge MSI + P1.2 logos de pago
6. P1.4 CTA de dudas por WhatsApp
7. P2.1 referencia de escala
8. P0.4 + P2.3 (bloqueados hasta que el dueño dé política de garantía y foto de empaque)

### MEDICIÓN
Después de desplegar P0+P1: comparar en PostHog el ratio `viewcontent → addtocart` en `/products/*` móvil, 14 días antes vs 14 días después. Registrar en `.lovivo/cro-log.md`.
Si el dueño quiere certeza estadística sobre el avatar strip → montarlo como A/B (cargar skill `workflow.ab-experiments`), pero con el volumen actual (~6,800 sesiones/2 meses) probablemente conviene más shippear directo y medir en agregado.

---

### `/proyectos` B2B — pendiente (bloqueado por datos o imágenes)
- **Prueba social B2B real** — hoy fallback honesto. Sustituir con 1-2 testimonios o logos con permiso.
- **Cara y nombre del fundador** (P1.3) · **One-pager PDF** (P1.6) · **Bloque comparativo** (P2.2) · **CTA "prefiero que me llamen"** (P2.3).
- **SEO `/proyectos`**: añadir `Service`/`Organization` JSON-LD, og tags y `Offer` con `lowPrice: 3500` (hoy solo FAQPage).
- **Analytics**: scroll-depth y apertura de FAQs.

### PayPal Express — referencia técnica (implementado 2026-08-18)
Ruta post-pago canónica: **`/gracias/:orderId`**. Flujo obligatorio en cualquier método de pago nuevo:
1. `localStorage.setItem('completed_order', ...)` → 2. `trackPurchase()` con guardia `purchase_tracked_${orderId}` → 3. `clearCart()` → 4. `navigate('/gracias/'+orderId)` → 5. toast.
`ThankYou.tsx` lee la orden SOLO de `localStorage.completed_order`. Persistir ANTES de navegar es obligatorio.
Atribución: `captureAttribution()` / `getAttributionPayload()` en `src/lib/tracking-utils.ts`. Todo flujo de pago nuevo debe enviar `attribution: getAttributionPayload()`.
Requisito operativo: PayPal conectado desde Dashboard → Configuración de Tienda → Pagos, o la RPC devuelve null y el botón queda oculto.

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-19** — 📋 **AUDITORÍA COMPLETA DE PDP** (código + screenshot móvil + datos reales de 12 productos). Hallazgos P0: rating ausente en `verde-salvia` por mismatch de slug, canonical apuntando a `/productos/` (404), 3 conteos de reseñas distintos en la misma página, "Garantía 30 días" sin respaldo, posible `ArrowLeft` sin importar. Plan de trust strip con avatares aprobado con fuente de imágenes honesta.
- **2026-08-18** — ✅ **ATRIBUCIÓN META + FLUJO `/gracias` EN PAYPAL**. Portado `captureAttribution()` y `getAttributionPayload()` a `tracking-utils.ts`; `PixelContext` persiste atribución en cada carga; los dos payloads de PayPal la envían. Redirect corregido `/thank-you` → `/gracias/:orderId`, añadido `clearCart()` + toast, orden fusionada con `checkout_token` y `payment_method`, y `ThankYou` ya no dice "Recoger en Tienda" en órdenes PayPal.
- **2026-08-18** — ✅ **PAYPAL EXPRESS EN CHECKOUT**. Dependencia, campos en SettingsContext vía RPC `get_public_paypal_account`, componente `PaypalExpressButton.tsx`, montado arriba de StripePayment.
- **2026-08-17** — ✅ **ANCLA DE PRECIO B2B PUBLICADA en `/proyectos`**: constante `PRICE_FROM = '$3,500 MXN'` en 6 puntos + nueva FAQ #1 + meta description con precio.
- **2026-08-17** — ✅ **TANDA 1+2 B2B en `/proyectos`**: ficha técnica (SPECS), DETAIL_IMAGE macro del pliegue, 4 FAQs nuevas, campo de fecha + botón "Enviar por correo", sección "Toca una pieza antes de pedir el lote", captions en galería.
- **2026-08-13** — 📋 Auditoría completa de `/proyectos` (código + screenshots).
- **2026-08-13** — ✅ Landing B2B `/proyectos` construida (alias `/b2b`) + imágenes reales.
- **2026-08-05** — ✅ GIFT_IMAGE de `/personalizados` reemplazada por foto real del comedor.
- **2026-07-17** — ✅ Deep-link de talla en `HeadlessProduct.tsx`.
- **2026-07-10** — ✅ `/personalizados` lista: sticky CTA, ancla $3,500, FAQ, sección regalo.
- **2026-07-09** — ✅ `lead()` en `FacebookPixelService`; fixes StripePayment, galería por variante, 404 post-pago.

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero `/personalizados`** = slide 2 del home.
- **Hero `/proyectos`**: `.../message-images/.../1786658786579-tv4ym4zokz.webp` — lobby de hotel boutique 16:9.
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue, acordeón azul medianoche, luz rasante. ✅ resuelto. **Candidata a reutilizar en PDP (P2.2).**
- **Galería B2B `/proyectos`** (4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel, serie de 3
  - `1786658786579-6h8j8g0ewdc.webp` — recepción de oficina, Luna
  - `1786658786579-7h75oomjxf.webp` — sala de juntas, acordeón azul
  - `1786658786579-hqtofonof9o.webp` — restaurante nocturno, burdeos
  - `1786659699632-3gh24xwrus4.webp` — acceso a elevadores, acordeón beige
  - `1786659699632-nw9w0w6g6b.webp` — lounge residencial, acordeón negro
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp` — Luna en sala/dining con olivo.
- **Fotos de clientes con `photoUrl`** (5, base message-images `4458f31d-.../`) — fuente del avatar strip P1.1:
  - `1783621985376-t2q2r43fz0h.webp` — Mónica A. / Verde Salvia
  - `1779311693322-f14snp6bxfa.webp` — Valentina S. / Prisma Onyx
  - `1779311693322-kcwn5zoehb.webp` — Sebastián M. / Prisma Azul Coral
  - `1779311693322-4f7n3rqv0pj.webp` — Daniela R. / Burdeos
  - `1779311693322-8vbqa3p7c55.webp` — Andrés V. / Luna Negra
- **Referencia visual del trust strip que mandó el dueño (2026-08-19)**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1787161413399-ojozzfal57o.webp` — patrón "3 avatares + Jason R. ✓ and +1,000 riders love the Rodata One", fondo oscuro. Copiar la ESTRUCTURA, no el estilo (Plieggo es claro/crema).
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige.

## 6. Known Issues
- **[P0 · PDP · 2026-08-19]** `verde-salvia` (best-seller) sin estrellas ni sección de reseñas por mismatch de slug en `product-reviews.ts`.
- **[P0 · SEO · 2026-08-19]** Canonical y breadcrumb JSON-LD de TODAS las PDPs apuntan a `/productos/:slug`, que devuelve 404. La ruta real es `/products/:slug`.
- **[P0 · PDP · 2026-08-19]** `ArrowLeft` usado en el bloque `notFound` de `ProductPageUI.tsx` sin aparecer en los imports de lucide-react → posible pantalla en blanco en slugs inválidos. VERIFICAR.
- **[P0 · CONFIANZA · 2026-08-19]** Tres conteos de reseñas distintos en la misma PDP (por producto / 4.9 hardcodeado / "+100"). Dato real: 4.8★ · 196.
- **[P0 · LEGAL/CONFIANZA · 2026-08-19]** "Garantía 30 días" prometida en la PDP sin política, página ni FAQ que la respalde. Bloqueado por el dueño.
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod con carrito real: botón visible, MXN aceptado, orden en `paid`, aterrizaje en `/gracias/:orderId` con items, carrito vacío, Purchase no duplicado.
- **[PENDIENTE VERIF · ATRIBUCIÓN]** Confirmar en Events Manager que las órdenes PayPal lleguen con `fbp`/`fbc`/UTMs. Requiere que las edge functions consuman el campo `attribution`.
- **[OPORTUNIDAD]** `checkout-create` (flujo Stripe) todavía NO envía `attribution`.
- **[PENDIENTE DUEÑO]** Caso B2B mostrable; kit de muestras; política de reposición; instrucciones de limpieza; % de descuento por volumen; fotos de clientes con rostro.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos`.
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen de leads pero subir calidad. Revisar en 2-3 semanas.
- **[CERRADO]** Precio botón sin formato y bug correo (el dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[URGENTE]** Ejecutar P0 de la auditoría PDP (slugs de reseñas, canonical, `ArrowLeft`, rating unificado).
- **[ALTA]** P1: avatar strip + logos de pago + badge MSI + CTA de dudas WhatsApp.
- **[ALTA]** Verificar PayPal end-to-end en prod incluyendo atribución.
- **[ALTA · DUEÑO]** Política de garantía/reposición real → desbloquea P0.4.
- **[ALTA]** Testimonio o caso B2B real para sustituir el fallback de prueba social.
- **[MEDIA]** P2: referencia de escala, macro del pliegue en cada PDP, mensaje de empaque.
- **[MEDIA]** Enviar `attribution: getAttributionPayload()` también en `checkout-create` (Stripe).
- **[MEDIA]** Imágenes pendientes: taller, serie grande, **empaque profesional**, retrato del fundador, **3 fotos de clientes con rostro**.
- **[MEDIA]** One-pager PDF de proyectos.
- **[MEDIA]** SEO `/proyectos`: Service/Organization JSON-LD + og tags + `Offer` lowPrice 3500.
- **[MEDIA]** Esquema concreto de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA]** P3: cantidad compacta, tag real de edición limitada, breadcrumb a `/all-products`.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).