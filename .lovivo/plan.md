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
- Política de reposición si una pieza llega dañada.
- Cómo se limpia/mantiene una pieza (dato aún no dado → no publicado).
- Esquema concreto de % de descuento por rango de volumen (hoy es "caso por caso").

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

## 3. Active Plan — PayPal Express en checkout (2026-08-18)

**Implementado (basado en repo de referencia que ya funciona):**
1. Dependencia `@paypal/react-paypal-js` añadida.
2. `SettingsContext.tsx`: nueva query `['paypal-account', STORE_ID]` con RPC `get_public_paypal_account` → expone `paypalEnabled`, `paypalClientId`, `paypalEnvironment`. Si la RPC devuelve null, `paypalEnabled = false` y nada se renderiza.
3. `src/components/PaypalExpressButton.tsx` (nuevo): copy en español, tokens de diseño (`bg-border`, `text-muted-foreground`), botón gold horizontal 45px, `fundingSource="paypal"`. Edge functions: `paypal-create-order` + `paypal-capture-order`. Escribe `completed_order` en localStorage y navega a `/thank-you/:orderId` (ruta confirmada en App.tsx). Purchase con guardia `purchase_tracked_${ordId}` en sessionStorage.
4. `src/pages/ui/CheckoutUI.tsx`: botón montado ARRIBA de `<StripePayment>` dentro de un fragment, con `showDivider={false}`, `shippingCost={logic.shippingFromCheckout || logic.shippingCost}`.

**DIFERENCIA vs el repo de referencia:** Plieggo NO tiene `getAttributionPayload()` en `src/lib/tracking-utils.ts` (el archivo termina en `trackSearch`). Por eso los payloads de PayPal se envían SIN `attribution` — igual que hace `checkout-create` en Plieggo hoy. Si se quiere atribución de Meta en órdenes PayPal, hay que portar esa función + los writes de localStorage en `PixelContext`.

### Requisito operativo
PayPal debe estar conectado desde el Dashboard (Configuración de Tienda → Pagos). Sin eso la RPC devuelve null y el botón queda oculto (comportamiento intencional, no es bug).

### `/proyectos` B2B — pendiente (bloqueado por datos o imágenes)
- **Prueba social B2B real** — hoy fallback honesto. Sustituir con 1-2 testimonios o logos con permiso.
- **Cara y nombre del fundador** (P1.3) · **One-pager PDF** (P1.6) · **Bloque comparativo** (P2.2) · **CTA "prefiero que me llamen"** (P2.3).
- **SEO `/proyectos`**: añadir `Service`/`Organization` JSON-LD, og tags y `Offer` con `lowPrice: 3500` (hoy solo FAQPage).
- **Analytics**: scroll-depth y apertura de FAQs.

### Imágenes aún pedidas al dueño
taller/manos doblando (4:5) · serie grande de 5+ piezas (16:9) · empaque profesional (4:5) · retrato del fundador (1:1).

### Referencias de producto reutilizables (base `products/`)
Acordeón `etdkr375s4e` (verde salvia) · beige sutil `551yd2x4ryw` · prisma azul coral `87qtowj61fv` · prisma onyx `f53ej22pcj` · prisma beige-blanco `6gpaobcgtcc` · luna llena `glo0f69xdqg` / `hgpuedhniqa` · luna negra `2n4coxjoz8c` · luna azul `19yuabxobu1` · burdeos `exq1zzkmnqt` · blanco puro `u5scxlsp37`.

## 4. Recent Changes
- **2026-08-18** — ✅ **PAYPAL EXPRESS EN CHECKOUT**. Portado desde repo de referencia del dueño: dependencia, campos en SettingsContext vía RPC `get_public_paypal_account`, componente `PaypalExpressButton.tsx` en español con tokens de Plieggo, montado arriba de StripePayment. Sin `attribution` (Plieggo no tiene `getAttributionPayload`).
- **2026-08-17** — ✅ **ANCLA DE PRECIO B2B PUBLICADA en `/proyectos`**: constante `PRICE_FROM = '$3,500 MXN'` en 6 puntos (hero, check del hero, ficha técnica campo "Inversión", cotizador, CTA final, sticky mobile) + nueva FAQ #1 "¿Cuánto cuesta cada pieza para proyecto?" (entra al JSON-LD FAQPage) + meta description con precio.
- **2026-08-17** — ✅ **TANDA 1+2 B2B en `/proyectos`**: ficha técnica (SPECS), DETAIL_IMAGE → macro real del pliegue, 4 FAQs nuevas, campo de fecha + botón "Enviar por correo" en cotizador, sección "Toca una pieza antes de pedir el lote", captions en galería.
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
- **DETAIL_IMAGE `/proyectos`**: `1787007863112-8rzvvao3e74.webp` — macro del pliegue, acordeón azul medianoche, luz rasante. ✅ resuelto.
- **Galería B2B `/proyectos`** (4:5, base message-images):
  - `1786658786579-ckqrb8e8t9o.webp` — pasillo de hotel, serie de 3
  - `1786658786579-6h8j8g0ewdc.webp` — recepción de oficina, Luna
  - `1786658786579-7h75oomjxf.webp` — sala de juntas, acordeón azul
  - `1786658786579-hqtofonof9o.webp` — restaurante nocturno, burdeos
  - `1786659699632-3gh24xwrus4.webp` — acceso a elevadores, acordeón beige
  - `1786659699632-nw9w0w6g6b.webp` — lounge residencial, acordeón negro
- **GIFT_IMAGE**: `1786659699632-92ykhoixt85.webp` — Luna en sala/dining con olivo.
- Logo: /public/logo.svg · logo footer: `.../1765330504462-dyr43cg78.png`
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige.

## 6. Known Issues
- **[PENDIENTE VERIF · PAYPAL]** Probar en prod con carrito real: (1) que el botón aparezca (requiere PayPal conectado en Dashboard), (2) que la moneda MXN se acepte, (3) que la orden quede en `paid` y llegue a `/thank-you/:orderId`, (4) que Purchase no se duplique.
- **[NOTA PAYPAL]** Órdenes vía PayPal NO llevan atribución de Meta (falta `getAttributionPayload` en este repo). No rompe nada, pero el ROAS de esas órdenes no se atribuye.
- **[PENDIENTE DUEÑO]** Caso B2B mostrable; kit de muestras; política de reposición; instrucciones de limpieza; % de descuento por volumen.
- **[PENDIENTE VERIF]** Validar en prod que `Lead` dispara en `/personalizados` y `/proyectos` (incl. `b2b-cotizador-email`).
- **[PENDIENTE VERIF]** Probar deep-link `?talla=30x90` en prod.
- **[VIGILAR]** El ancla de $3,500 en `/proyectos` puede bajar volumen de leads pero subir calidad. Revisar en 2-3 semanas.
- **[CERRADO]** Precio botón sin formato y bug correo (el dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **⚠️ Envío gratis en lotes B2B grandes:** revisar rentabilidad en pedidos de 20+ piezas.

## 7. Pending / Future Sessions
- **[ALTA]** Verificar PayPal end-to-end en prod (ver Known Issues).
- **[ALTA]** Testimonio o caso B2B real para sustituir el fallback de prueba social.
- **[ALTA]** Validar evento Lead en prod (WhatsApp + correo).
- **[MEDIA]** Portar `getAttributionPayload()` a `tracking-utils.ts` + writes en `PixelContext` para atribuir órdenes PayPal.
- **[MEDIA]** Imágenes pendientes: taller, serie grande, empaque, retrato del fundador.
- **[MEDIA]** One-pager PDF de proyectos.
- **[MEDIA]** SEO `/proyectos`: Service/Organization JSON-LD + og tags + `Offer` lowPrice 3500.
- **[MEDIA]** Esquema concreto de descuento por volumen (5-15 / 16-40 / 40+).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24). Verificar tarifa envío = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[BAJA]** Bloque comparativo, CTA "prefiero que me llamen", scroll-depth analytics.
- **[BAJA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).