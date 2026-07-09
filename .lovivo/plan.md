# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home). **Número: 525531215386.**
- **PERSONALIZACIÓN SÍ SE OFRECE (confirmado dueño 2026-07-09):** las medidas del sitio son ESTÁNDAR pero se pueden cambiar tamaños y color. Ese flujo se atiende 100% por WhatsApp. ALTA DEMANDA. YA IMPLEMENTADO EN PDP.
  - **RESTRICCIONES REALES (NO publicar en landing — filtrar en WhatsApp):** solo se personalizan los estilos de las colecciones existentes (Luna, Acordeón, Acordeón Prisma), NO cualquier diseño. Color limitado a la paleta del proveedor de opalina. Tamaño máx opalina ~100×70 cm; arriba de eso se cambia a material lino. Se puede elegir con/sin acrílico y color/material del marco.
- **ENVÍO: GRATIS EN TODO MÉXICO Y FIJO.** El total NO cambia durante el checkout (clave para MSI up-front).
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado 2026-07-08).
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.**
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas.**
- **MSI ACTIVO EN DASHBOARD.** Backend inyecta installments server-side. SPEI (customer_balance) y OXXO ACTIVOS.
- **Tienda hermana de referencia: rodata.mx** (mismo template). Crear el PaymentIntent LO MÁS TARDE posible.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts` (generales, campo `photoUrl`) y `src/data/product-reviews-content.ts` (por producto).
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.

## 3. Active Plan — LANDING CUADROS PERSONALIZADOS (para Meta Ads)

### Objetivo de negocio
Nueva landing dedicada para tráfico FRÍO de un anuncio de Meta enfocado en cuadros personalizados. CTA único = WhatsApp (lead). NO es una PDP de compra directa. Cada clic al CTA debe disparar el evento `Lead` de Meta para que el pixel optimice hacia conversiones.

### DECISIÓN ESTRATÉGICA CLAVE (confirmada con dueño)
La landing NO menciona: límites de paleta, máximo 100×70, opalina vs lino, ni specs de acrílico/marco. Todo eso se filtra en WhatsApp. La landing solo comunica de forma POSITIVA:
- Personalizamos NUESTROS estilos (Luna, Acordeón, Acordeón Prisma) — esto acota expectativas sin sonar restrictivo (se muestra visualmente con 3 cards de estilos).
- Puedes elegir tu **color** y tu **tamaño** para tu espacio.
Objetivo: maximizar mensajes de WhatsApp calificados, no explicar el proceso técnico.

### Ruta
Nueva ruta `/personalizados` (registrar en `src/App.tsx`, lazy import). Página nueva `src/pages/Personalizados.tsx`.
- Usar un layout LIGERO (menos distracción que EcommerceTemplate completo): header minimal (logo + botón WhatsApp), SIN nav de tienda completa, para no fugar el tráfico de ads. Footer minimal opcional. Reutilizar componentes existentes donde aplique.

### Estructura de secciones (mobile-first, orden vertical)
1. **HERO (above the fold)** — imagen lifestyle full-bleed con overlay oscuro (patrón de `CollectionEspacio` hero). Headline outcome-led: p.ej. "Tu cuadro, en tu color y tu medida". Subhead: "Arte en papel hecho a mano, personalizado para tu espacio." Mini trust row (Hecho a mano · Envío gratis · 4.8★ · 196 reseñas). CTA primario WhatsApp grande.
2. **QUÉ PERSONALIZAMOS (3 pasos simples)** — íconos line terracota: "Elige un estilo" · "Elige tu color" · "Elige tu tamaño". Framing positivo, cero restricciones.
3. **ESTILOS DISPONIBLES (3 cards)** — comunica sutilmente que son NUESTROS estilos:
   - Acordeón → usar Verde Salvia lifestyle
   - Acordeón Prisma → usar Azul Coral lifestyle
   - Luna → usar Luna Llena lifestyle
   Texto: "Personalizamos cualquiera de nuestros estilos en el color y tamaño para ti." Cada card puede llevar CTA WhatsApp con el estilo pre-cargado en el mensaje.
4. **GALERÍA LIFESTYLE** — grid 2 col (mobile) con las fotos lifestyle (índice 1 de cada producto) para generar deseo. Mezclar colores/estilos.
5. **ARTE QUE CAMBIA CON LA LUZ** — sección diferenciador (reutilizar concepto de `LightShadowFeature` o editorial split como en CollectionEspacio).
6. **SOCIAL PROOF** — 2-3 reseñas con foto de `plieggoGeneralReviews`.
7. **CÓMO ES EL PROCESO (por WhatsApp)** — 3 pasos: "1. Escríbenos por WhatsApp → 2. Te asesoramos y cotizamos → 3. La hacemos a mano y te llega en 5–7 días con envío gratis." Aquí se fija la expectativa de que el flujo es por WhatsApp.
8. **FAQ ligera (accordion Radix)** — máx 4-5 preguntas, todas en tono positivo:
   - ¿Qué puedo personalizar? → "El color y el tamaño de cualquiera de nuestros estilos."
   - ¿Cuánto tarda? → "5–7 días hábiles, hecha a mano para ti."
   - ¿Cuánto cuesta? → "Desde $4,500. Te damos el precio exacto por WhatsApp según tu personalización."
   - ¿Hacen envíos? → "Envío gratis a todo México."
   - ¿Hay límite de tamaño? → "Trabajamos varios tamaños; cuéntanos tu medida y te decimos la mejor opción." (soft, NO menciona 100×70 ni lino)
9. **CTA FINAL** — bloque grande centrado con botón WhatsApp.
10. **STICKY MOBILE CTA** — barra fija inferior en móvil con botón WhatsApp siempre visible (crítico, 96% móvil). En desktop puede quedar el FloatingWhatsApp normal.

### Evento Lead de Meta (tracking)
- `Lead` SÍ es un evento estándar de Meta. Agregar método `lead(parameters?)` a `FacebookPixelService` en `src/lib/facebook-pixel.ts` → `this.track('Lead', parameters)`.
- Crear un handler único `handleWhatsAppLead(styleName?)` en la landing que: (1) llame `facebookPixel.lead({ content_name: 'cuadro-personalizado', ... })`, (2) abra `wa.me/525531215386?text=...` en nueva pestaña.
- Usar ese handler en TODOS los CTA de la landing (hero, cards de estilo, proceso, CTA final, sticky bar).
- El pixel ya se inicializa vía `PixelProvider` + `usePixel()` (fbp/fbc ya se capturan). No requiere setup extra.
- Mensaje WhatsApp base: "¡Hola! Vi su anuncio de cuadros personalizados y quiero cotizar uno en mi color y medida. ¿Me ayudan?" — si viene de una card de estilo, anteponer el estilo: "...quiero un [Luna/Acordeón/Prisma] en mi color y medida...".

### Imágenes a usar (índice 1 = foto lifestyle "pro" de cada producto)
- Verde Salvia (acordeón, best seller): `.../products/etdkr375s4e.webp`
- Beige Sutil (acordeón, best seller): `.../products/551yd2x4ryw.webp`
- Acordeón Prisma Azul Coral: `.../products/87qtowj61fv.webp`
- Acordeón Prisma Onyx Opal: `.../products/f53ej22pcj.webp`
- Luna Llena (favorita): `.../products/glo0f69xdqg.webp`
- Luna Negra: `.../products/2n4coxjoz8c.webp`
- Luna Azul: `.../products/19yuabxobu1.webp`
- Acordeón Burdeos Intenso: `.../products/exq1zzkmnqt.webp`
- Acordeón Blanco Puro: `.../products/u5scxlsp37.webp`
- (base URL: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/`)
- **Imágenes subidas por el dueño (candidatas a HERO / lifestyle):** `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783623900317-r5caqic950d.webp`, `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783623900317-xr483oxme8p.webp`, `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783622578635-s1ovzkstlm.webp` (verde salvia en pasillo). En Craft: `lov-copy` a `public/` y usar la URL resultante. Revisar visualmente cuál funciona mejor de hero.

### Pasos de implementación (Craft Mode)
1. Agregar método `lead()` en `src/lib/facebook-pixel.ts`.
2. Crear `src/pages/Personalizados.tsx` con las 10 secciones de arriba (mobile-first, paleta y tipografías Plieggo, íconos lucide line terracota).
3. Handler `handleWhatsAppLead(styleName?)` que dispara `facebookPixel.lead()` + abre WhatsApp.
4. Sticky bottom bar móvil con CTA WhatsApp.
5. Registrar ruta `/personalizados` en `src/App.tsx` (lazy import).
6. `lov-copy` de las imágenes subidas si se usan de hero; verificar con screenshot mobile.
7. NO tocar el checkout ni las PDPs existentes.

### Verificación
- Screenshot mobile de `/personalizados`.
- Confirmar en consola que `fbq('track','Lead')` se dispara al hacer clic (o browser-test).

## 4. Recent Changes
- **2026-07-09** — 🟡 PLAN GUARDADO: Landing de cuadros personalizados `/personalizados` para Meta Ads (CTA WhatsApp + evento Lead). Pendiente de construir en Craft.
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP: eliminado 2º enlace WhatsApp genérico; padding `mt-16`→`mt-10`; `CustomSizeCTA.tsx` reescrito (título "¿No queda en tu pared?...", body corto, sin chips de medidas, sin prop `sizes`).
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP (nota bajo selector, CustomSizeCTA, FAQ "¿otra medida?").
- **2026-07-09** — ✅ FIX foto reseña Mónica A. (`plieggo-general-reviews.ts` id g4).
- **2026-07-09** — ✅ FIX A + FIX B en `StripePayment.tsx` (botón formatMoney + badge MSI benefit-led).
- **2026-07-09** — ✅ Dueño CIERRA bug correo (solo con cuenta Stripe Link guardada).
- **2026-07-09** — ✅ Bug 2 (cantidad) CONFIRMADO RESUELTO por el dueño.
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE (estilo Shopify) en `HeadlessProduct.tsx`.
- **2026-07-09** — ✅ FIX 404 POST-PAGO PENDIENTE: `PagoPendiente.tsx` + ruta.
- **2026-07-08** — ✅ PASO 4: quitado gate `paymentUnlocked` de `CheckoutUI.tsx`.
- **2026-07-08** — ✅ PASO 2: `StripePayment.tsx` a client_secret UP-FRONT (selector MSI inline).
- **2026-07-08** — ✅ PASO 1: `StripePayment.tsx` reescrito a deferred limpio.

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: URLs y map en `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto**: ver lista completa en sección 3 (Imágenes a usar) — para la landing de personalizados.
- **Foto lifestyle verde salvia en pasillo**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783622578635-s1ovzkstlm.webp` (también en Inventory previo). Disponible.
- **Imágenes subidas 2026-07-09 (para landing personalizados)**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783623900317-r5caqic950d.webp`, `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1783623900317-xr483oxme8p.webp`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[CERRADO 2026-07-09] Precio botón sin formato**: RESUELTO con `formatMoney`.
- **[CERRADO 2026-07-09] Bug correo**: dueño lo deja así.
- **NOTA:** import `CheckoutSecurityBanner` en `CheckoutUI.tsx` sin uso directo. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido de extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA · CRAFT]** Construir landing `/personalizados` (plan en sección 3).
- **[BAJA · DUEÑO]** Definir política de garantía concreta. NO inventar.
- **[MEDIA · DUEÑO]** Si quiere más meses MSI (12/18/24) ajustar `installments_max_plan` en Dashboard.
- **[ALTA · DUEÑO/PROD]** Validar PagoPendiente en prod (SPEI + OXXO).
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).