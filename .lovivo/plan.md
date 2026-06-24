# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (precio único para todas las variantes, tachado $6,000). Precio Luna: por variantes (revisar en DB). Uso frecuente como regalo. Producto diferenciador: juego de luz y sombra que cambia según la hora del día.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings/sans) + Crimson Pro (body/serif)
- `font-sans` = DM Sans, `font-serif` = Crimson Pro, `font-heading` = DM Sans, `font-body` = Crimson Pro (registradas en tailwind.config.ts)
- Fondo continuo sin bandas de color entre secciones
- Estilo Zara Home / Muji — nada genérico
- Iconos: SVG line icons en color terracota (#C16648) — NO emojis
- CTAs: NUNCA usar glow/sombra naranja gigante. Botones limpios, elegantes.
- Hero CTA standard: `inline-flex gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#1B2A41] text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-none` — sin shadow, sin scale
- Review photos: `aspect-[4/5]` (ReviewCard y GeneralReviewCard) — menos alto que 3/4
- AboutPage: editorial split-screen (no rounded corners, full-bleed images, pilares 3-col, dark proceso section)
- **PDP variant buttons**: `h-8 px-3 text-xs tracking-wide rounded-sm` — compactos, estilo editorial
- **Sticky bar**: una sola fila compacta, un solo botón terracota. Left: solo thumbnail. Botón: icono carrito + "Agregar al carrito" + precio actual + precio tachado. Fondo crema #F2EFE4/95
- **ProductCard CTA**: botón terracota sólido `w-full h-8 px-3 text-xs tracking-wide uppercase rounded-sm bg-[#C16648]` — full width, debajo de los precios
- **ProductCard price layout**: precio y precio tachado en la MISMA fila horizontal (`flex-row items-center gap-2`), botón en línea separada abajo ✅ APLICADO
- **FloatingWhatsApp**: solo en home (`/`) — eliminado de colecciones y demás páginas
- **Collection page layout**: Grid primero (h1 + badges) → Trust strip (dentro del mismo section) → Hero editorial → Reviews → Editorial split → CTA → Carousel ✅ APLICADO EN TODAS

## 3. Active Plan
**Estado:** 🔧 LISTO PARA CONSTRUIR — Página pública de rastreo de pedidos (Order Tracking)

### Objetivo de negocio
Dar al cliente una página propia de rastreo (estilo Shopify) para reducir los "¿dónde está mi pedido?" por WhatsApp y dar confianza post-compra. Backend YA desplegado (edge function `order-track`). Solo falta el frontend del template.

### Contexto del backend (ya listo, NO tocar)
- Edge function `order-track` acepta `{ token }` o `{ store_id, order_number, email }`.
- Devuelve: `timeline` con `steps[]` (4 pasos), `current_step`, `cancelled`, `carrier`, `tracking_number`, `tracking_url`, `estimated_delivery_at`, `events[]` (`occurred_at`, `status_detail`, `location`) y `display_mode` (`detailed` | `masked`).
- Emails de envío enlazan a `https://{dominio}/orders/track/{checkout_token}`. POR ESO la ruta DEBE ser `/orders/track/...` (NO traducir a español).
- Llamar con el helper existente `callEdge('order-track', payload)` de `src/lib/edge.ts`. Es público, NO requiere auth.

### Hallazgos de la inspección del código
- `src/lib/edge.ts`: `callEdge(functionName, body)` existe y funciona (invoke + fallback fetch). ✅
- `src/lib/config.ts`: exporta `STORE_ID` (usado en ThankYou y otros). ✅
- `src/App.tsx`: rutas con lazy loading. Hay que agregar `/orders/track` y `/orders/track/:token`.
- `src/adapters/MyOrdersAdapter.tsx` (TIPO C, no editar lógica): YA usa `.select('*')` en `orders`, así que `checkout_token`, `tracking_number`, `tracking_url`, `shipping_carrier`, `estimated_delivery_at`, `shipped_at`, `paid_at` YA llegan si existen en la tabla. **NO hace falta tocar el adapter.**
- `src/lib/supabase.ts` → `interface Order` (editable): tiene `checkout_token` pero NO los campos de tracking. Hay que AGREGAR al tipo: `tracking_number?`, `tracking_url?`, `shipping_carrier?`, `estimated_delivery_at?`, `shipped_at?`, `paid_at?` para evitar errores de TypeScript en MyOrdersUI.
- `src/pages/ui/MyOrdersUI.tsx` (TIPO B, editable): cards de pedido. Agregar CTA "Rastrear pedido" + chip de tracking + entrega estimada dentro de cada `CardContent` (después del bloque de Envío).
- `src/pages/ThankYou.tsx` (editable): carga la orden desde `localStorage('completed_order')`. Si el objeto incluye `checkout_token`, agregar CTA "Rastrear mi pedido". Verificar que `completed_order` guarde `checkout_token` (el `CheckoutResponse` sí lo trae); si no está, leerlo de ahí.
- `EcommerceTemplate` acepta `pageTitle` y `showCart`. NO maneja noindex por sí mismo → usar un `useEffect` que inyecte `<meta name="robots" content="noindex">` (patrón ligero, como hacen otras páginas transaccionales) o documentar que SEO maneja noindex aparte.

### Pasos de implementación (Craft Mode)

**1. Extender el tipo Order** — `src/lib/supabase.ts`
Agregar campos opcionales a `interface Order`:
```ts
tracking_number?: string | null
tracking_url?: string | null
shipping_carrier?: string | null
estimated_delivery_at?: string | null
shipped_at?: string | null
paid_at?: string | null
```

**2. Crear `src/pages/OrderTrack.tsx`** (Tipo B, página delgada)
- Lee `:token` de `useParams()`.
- `useEffect` para inyectar meta `robots = noindex` (transaccional por cliente).
- Monta `<OrderTrackUI token={token} />` dentro de `EcommerceTemplate`.

**3. Crear `src/pages/ui/OrderTrackUI.tsx`** (Tipo B, UI editable — el grueso del trabajo)
Dos modos:
- **Modo token** (`/orders/track/:token`): al montar, `callEdge('order-track', { token })`.
- **Modo lookup** (`/orders/track` sin token): formulario con `order_number` + `email` → `callEdge('order-track', { store_id: STORE_ID, order_number, email })`. (Puede ir inline o en subcomponente `OrderTrackLookupForm.tsx`.)

UI del timeline (estilo Shopify horizontal):
- 4 pasos de `steps[]`; `current_step` pinta el progreso (círculos llenos ● para completados, ● actual, ○ pendientes; conectores `━`).
- Etiqueta + fecha bajo cada paso (formato `d MMM` con `date-fns` + locale `es`).
- Si `cancelled: true` → banner rojo "Pedido cancelado" (usar tono destructive, NO terracota).
- Bloque destacado **"Entrega estimada"** con `estimated_delivery_at` (formato `d MMM yyyy`, `date-fns/locale/es`).
- Bloque carrier (SOLO si `display_mode === 'detailed'`): nombre del carrier, `tracking_number` copiable (botón copiar), botón "Rastrear con la paquetería" → `tracking_url` (target _blank).
- Lista `events[]` colapsable (Accordion shadcn): `occurred_at` + `status_detail` + `location`.
- Si `display_mode === 'masked'`: ocultar carrier/tracking/eventos; mostrar solo timeline + entrega estimada (marca blanca).
- Estados: loading skeleton (usar `Skeleton`), error 404 ("No encontramos tu pedido. Verifica tu número de pedido y correo."), error genérico.
- Estilo: seguir componentes shadcn que ya usa MyOrdersUI (Card, Badge, Button, Skeleton, Accordion). Aplicar design system Plieggo (terracota #C16648 para acentos/iconos, NO emojis, line icons de lucide).

**4. Registrar rutas** — `src/App.tsx`
```ts
const OrderTrack = lazy(() => import('./pages/OrderTrack'));
// dentro de <Routes>:
<Route path="/orders/track" element={<OrderTrack />} />
<Route path="/orders/track/:token" element={<OrderTrack />} />
```

**5. Conectar MyOrdersUI** — `src/pages/ui/MyOrdersUI.tsx`
Dentro de cada `<CardContent>` del map de orders, después del bloque "Envío":
- Si `order.checkout_token` → botón principal terracota "Rastrear pedido" → `navigate('/orders/track/' + order.checkout_token)`.
- Si además `order.tracking_number` → chip secundario con el número; si hay `order.tracking_url`, link externo "Ver en la paquetería".
- Si `order.estimated_delivery_at` → línea "Entrega estimada: {fecha}" (formato `d MMM yyyy`, locale es).

**6. ThankYou CTA (opcional, recomendado)** — `src/pages/ThankYou.tsx`
- Después del resumen / botones de acción, si `order.checkout_token` disponible → CTA "Rastrear mi pedido" → `/orders/track/{checkout_token}`.
- Verificar que el objeto guardado en `localStorage('completed_order')` incluya `checkout_token` (viene en `CheckoutResponse.checkout_token`). Si no está, asegurarlo donde se guarda `completed_order` (StripePayment / checkout flow).

### Consideraciones técnicas
- i18n: todo en español (México).
- SEO: `noindex` en OrderTrack (contenido transaccional por cliente). Cargar skill `workflow.seo` antes de tocar meta tags.
- NO tocar `HeadlessMyOrders.tsx`. El adapter `MyOrdersAdapter.tsx` ya hace `select('*')` → no necesita cambios.
- NO requiere migración, ni tablas, ni edge functions nuevas.

### Verificación end-to-end
1. Generar etiqueta de Envia en dashboard → confirmar email `order_shipped` con link `/orders/track/{token}`.
2. Abrir link → ver timeline en "Enviado", carrier, tracking, entrega estimada.
3. Simular webhook de Envia → recargar → eventos nuevos + avance de paso.
4. `/mis-pedidos` (autenticado) → card con botón "Rastrear pedido" + entrega estimada.
5. `/orders/track` sin token con order_number + email → lookup funciona.
6. Cambiar `store_settings.tracking_display_mode` a `'masked'` → recargar → sin carrier/tracking/eventos.

### Archivos a crear / modificar
- `src/pages/OrderTrack.tsx` — CREAR
- `src/pages/ui/OrderTrackUI.tsx` — CREAR
- `src/pages/ui/OrderTrackLookupForm.tsx` — CREAR (opcional, subcomponente)
- `src/App.tsx` — agregar 2 rutas lazy
- `src/lib/supabase.ts` — extender `interface Order` con campos de tracking
- `src/pages/ui/MyOrdersUI.tsx` — CTA "Rastrear pedido" + chip + entrega estimada
- `src/pages/ThankYou.tsx` — (opcional) CTA "Rastrear mi pedido"

## 4. Recent Changes
- **2026-06-24** — 🔧 Plan guardado: Página pública de Order Tracking (`/orders/track/:token` + lookup, CTA en MyOrders/ThankYou). Backend `order-track` ya desplegado.
- **2026-06-22** — ✅ Fix StripePayment.tsx: excluir `oxxo` de `buildElementsPaymentMethodTypes` (causaba 400 en deferred mode)
- **2026-06-22** — ✅ Fix tracking-utils.ts: `formatCurrency` devuelve mayúsculas (MXN) — fix warning Meta Pixel
- **2026-06-22** — 🔧 Diagnóstico: checkout token OXXO causa 400 en Stripe Elements deferred init → formulario en blanco
- **2026-06-18** — ✅ Fix deduplicación Meta: event_id determinístico + sessionStorage guard en los 3 call sites de trackPurchase
- **2026-06-18** — ✅ CheckoutUI.tsx: línea "Descuento" en desktop para descuentos de link de pago (sin cupón)
- **2026-06-18** — 🔧 Diagnóstico: checkout token muestra total correcto ($8,100) pero falta línea "Descuento" — fix en CheckoutUI.tsx condición de descuento manual
- **2026-06-18** — 🔧 Diagnóstico: token checkout no muestra discount_amount porque res.order tapa el fallback
- **2026-06-18** — ✅ Fix checkout descuento manual: manualDiscountAmount en useCheckout + fallback cascada en CheckoutAdapter
- **2026-06-09** — PixelContext.tsx: fix fbc timestamp `Date.now()` → `Math.floor(Date.now() / 1000)` (milisegundos → segundos para Meta)
- **2026-06-03** — AllProducts.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — TopSellers.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — CollectionEspacio.tsx: grid primero + badges + trust strip dentro → hero abajo (layout unificado)
- **2026-06-03** — EcommerceTemplate.tsx: FloatingWhatsApp solo en home (`/`) — quitado de colecciones y otras páginas
- **2026-06-03** — CollectionAcordeon.tsx: h1 ahora es "Colección Acordeón" (encabezado del grid), hero usa h2

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- **CollectionAcordeon HERO_IMAGE**: `...1779296069343-1i4gabj0it4.webp`
- **CollectionAcordeon EDITORIAL_IMAGE**: `...1780499559157-3zjpthekjcj.webp`
- **AllProducts HERO_IMAGE**: `...1779296069343-2ifge8n87sv.webp`
- **CollectionEspacio HERO_IMAGE**: `...1779296069343-1ra0u85wh3j.webp`
- Logo: `/public/logo.svg`
- **About Studio 1**: `...1779325504866-5bg4llquutd.webp`
- **About Studio 2**: `...1779325504867-4wurhzmqhfg.webp`
- **Review photos generales (plieggo-general-reviews.ts)** — 5 con foto (g4, g9, g10, g11, g12)

## 6. Known Issues
- Handle de Colección Acordeón en DB tiene typo: `coleccin-acorden` — corregido en código
- Video play error recurrente en hero (play/pause race condition) — no afecta funcionalidad
- Luna Beige tiene solo 1 imagen en galería — necesita fotos de detalle y lifestyle
- `plieggo-general-reviews.ts` tiene `photoUrl` vacío en g1, g2, g3, g5, g6, g7, g8 — pendiente
- Slugs en code sin producto activo en DB: `acorden-terracota-vibrante`, `acorden-crema-natural`, `acorden-morado-lavanda`, `acorden-morado-elegante`, `estrellas`
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente
- Confirmar que `completed_order` en localStorage incluya `checkout_token` para el CTA de ThankYou (viene en CheckoutResponse)

## 7. Pending / Future Sessions
- **[ALTA]** Construir página de Order Tracking (ver Active Plan) — Craft Mode
- **[ALTA]** Performance móvil: 3 fixes pendientes (mover fuentes Google a HTML, lazy-load InspirationCarousel, fetchpriority en hero image)
- **[ALTA]** Fix clients-upsert: nombre/apellido/teléfono no llegan (CheckoutAdapter + CheckoutUI)
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Medir impacto en PostHog de los cambios del 2026-06-03
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip