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

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens (primary/secondary), nunca text-white/bg-white.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts` (campo `photoUrl`) y `src/data/product-reviews-content.ts`.
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.

## 3. Active Plan — (sin plan activo grande; landing personalizados YA CONSTRUIDA)

### Landing /personalizados — CONSTRUIDA ✅ (2026-07-09)
- Ruta `/personalizados` registrada en `src/App.tsx` (lazy). Página: `src/pages/Personalizados.tsx`.
- Layout ligero propio (header minimal logo + botón WhatsApp, SIN nav completa), sticky mobile CTA bottom.
- Secciones: Hero → Qué personalizamos (3 pasos) → Estilos (3 cards) → Galería lifestyle (6 img) → Arte que cambia con la luz → Social proof (g4/g10/g12) → Proceso WhatsApp → FAQ → CTA final → sticky mobile.
- **Evento Lead Meta**: método `lead()` agregado a `FacebookPixelService` (`src/lib/facebook-pixel.ts`). Handler `handleWhatsAppLead(styleName?)` dispara `facebookPixel.lead()` + abre WhatsApp. Usado en TODOS los CTA (header, hero, cards, CTA final, sticky).
- NO menciona restricciones (paleta/100×70/lino/acrílico) — se filtra en WhatsApp.
- Hero image: verde salvia en pasillo (message-images ...1783622578635-s1ovzkstlm.webp).

### PENDIENTE DE VALIDAR (próxima sesión)
- Screenshot mobile de `/personalizados` (no se pudo verificar en mismo run por staging).
- Confirmar en prod que `fbq('track','Lead')` dispara al clic.

## 4. Recent Changes
- **2026-07-09** — ✅ LANDING `/personalizados` CONSTRUIDA: página nueva mobile-first (10 secciones), CTA único WhatsApp, evento `Lead` Meta en todos los botones. Ruta registrada en App.tsx.
- **2026-07-09** — ✅ Método `lead()` agregado a `FacebookPixelService` (facebook-pixel.ts).
- **2026-07-09** — 🟡 (superado) Plan landing guardado.
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP: eliminado 2º enlace WhatsApp; padding mt-10; CustomSizeCTA reescrito.
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP (nota selector, CustomSizeCTA, FAQ).
- **2026-07-09** — ✅ FIX foto reseña Mónica A. (plieggo-general-reviews id g4).
- **2026-07-09** — ✅ FIX A + FIX B en StripePayment.tsx (formatMoney + badge MSI).
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE en HeadlessProduct.tsx.
- **2026-07-09** — ✅ FIX 404 POST-PAGO: PagoPendiente.tsx + ruta.
- **2026-07-08** — ✅ Checkout MSI up-front (StripePayment deferred, sin gate paymentUnlocked).

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **Hero landing personalizados**: verde salvia en pasillo `message-images/.../1783622578635-s1ovzkstlm.webp`.
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara al clic en /personalizados.
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**.

## 7. Pending / Future Sessions
- **[ALTA]** Screenshot mobile de `/personalizados` + validar evento Lead en prod.
- **[MEDIA · DUEÑO]** Considerar imagen hero dedicada más "wow" para la landing (generar lifestyle propia si el pasillo no convence).
- **[BAJA · DUEÑO]** Definir política de garantía concreta. NO inventar.
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).