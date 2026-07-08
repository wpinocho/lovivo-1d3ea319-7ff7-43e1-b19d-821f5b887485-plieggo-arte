# Plieggo — Estado del Proyecto

## 1. Brand & Context
Tienda de arte en papel (cuadros de acordeón/origami hechos a mano). Marca premium, sutil y artesanal. Vende a coleccionistas y amantes del diseño en México. Precio acordeón: $4,500 MXN (tachado $6,000). Lunas $5,000 (tachado $7,500). Uso frecuente como regalo. Diferenciador: juego de luz y sombra que cambia según la hora.
- **Tráfico (jun-jul 2026): 96% MÓVIL.** Fuente: Instagram (~5,300) + Facebook (~1,450). Tráfico social frío. Optimizar SIEMPRE mobile-first.
- Canal paralelo: WhatsApp (PDP + FloatingWhatsApp en home).
- **ENVÍO: GRATIS EN TODO MÉXICO.** Ya NO se cobra $200. Copy actualizado 2026-07-07.
- **TIEMPO DE ENTREGA OFICIAL: 5–7 días hábiles** (confirmado por dueño 2026-07-08). Estándar único; corregir cualquier "10–15 días".
- **Best-sellers reales: `acorden-beige-sutil` y `verde-salvia`.** Foco de optimización PDP.
- **Rating agregado real del catálogo: ~4.8★ · 196 reseñas** (sumadas de `src/data/product-reviews.ts`). Usar SIEMPRE datos reales.
- **MSI ACTIVO EN DASHBOARD (dueño lo prendió 2026-07-08).** Backend inyecta payment_method_options server-side leyendo `store_settings.payment_methods.installments`. Frontend cableado (badges + tipos) + FIX del selector implementado 2026-07-08.
- **SPEI (customer_balance) y OXXO ACTIVOS en payment_methods.** SPEI requiere OBLIGATORIAMENTE un Stripe Customer con email en el PaymentIntent.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4), vino burdeos (#5D2A38), terracota (#C16648), azul medianoche (#1B2A41)
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja.
- **PDP CTA**: "Agregar al carrito" PRIMARIO terracota (h-14); "Comprar ahora" SECUNDARIO outline (h-12); express TERCIARIO.
- **Sticky bar**: una fila, un botón terracota. Fondo #F2EFE4/95
- **ProductCard CTA**: terracota sólido w-full h-8 rounded-sm
- **ProductCard aspect-ratio: 4:5 SIEMPRE**. Hover: SIEMPRE `product.images[1]`.
- **PDP variant buttons**: h-8 px-3 text-xs rounded-sm
- **Galería móvil PDP**: carrusel con peek (basis-[86%]) + counter chip + dots (activo terracota). object-cover 4:5.
- **FORMATO IMAGEN PRODUCTO CANÓNICO: 4:5 vertical (1080×1350 / 1122×1402px).**
- **GALERÍA PDP — REGLA (fix 2026-07-08)**: `getDisplayImages()` en `HeadlessProduct.tsx` MERGEA `product.images` + extras de variante deduped.
- **"Arte vivo" (LightShadowFeature)**: variantes `triptych` (best-sellers) y `single` (resto).
- **CHECKOUT trust signals**: `src/components/CheckoutTrustBadges.tsx`. Iconos SVG line terracota, sin emojis, sin glow.
- **Resumen de pedido móvil (checkout): ABIERTO por defecto**.
- **MSI badge**: leyenda sutil (border-primary/20, bg-primary/5, text-primary). NO glow. Checkout: "Paga hasta en X meses sin intereses". PDP: "o X meses sin intereses de $Y" (text-xs muted).

## 3. Active Plan
**OBJETIVO: Subir conversión initiate_checkout → purchase (baseline ~30%).**

### FRENTE A — Meses sin intereses (MSI) — ✅ FIX DE TIMING IMPLEMENTADO — PENDIENTE PROBAR EN PROD (2026-07-08, 4ª ronda)

**QUÉ SE IMPLEMENTÓ (`src/components/StripePayment.tsx` → `InstallmentsElements`):**
Gating estilo Shopify ("contacto antes de pago"). Se resuelve el error `customer_balance` (SPEI exige customer con email) y el DEADLOCK del spinner que escondía el campo de email.
1. Helper `isValidEmail()` + regex mínima (arriba del archivo, junto a `shouldUseInstallmentsMode`).
2. `createIntent()` ahora hace `return` temprano si el email NO es válido (además de guards de amount/orderId).
3. Mientras NO hay `clientSecret` (o en fallback), se renderiza `<DeferredElements>` en lugar del spinner → el campo de email es visible y escribible. (El spinner viejo causaba deadlock.)
4. Se interceptan `onEmailChange`/`onEmailBlur` del deferred: en el BLUR con email válido → `createIntent()` (customer ya presente) → set `clientSecret` → SWAP a Elements MSI (selector de meses). Evita remount a media escritura.
5. `liveEmail` local + `emailForIntent` para no depender del lag de props.email. `initialEmailValidRef` → auto-create en mount SOLO si el email ya venía válido (returning customer / Link).
6. Recreación por cambio de monto solo cuando ya hay `clientSecret` (debounced 500ms). Fallback a deferred intacto (nunca rompe el checkout).

**PENDIENTE (dueño / prod):** probar en prod → escribir email → salir del campo (blur) → debe aparecer el selector 3/6/9/12 en el form de tarjeta. Pagar con crédito MX. Confirmar que SPEI también funciona (customer ya presente) y que NO resurge `available_plans` (confirmaría que el edge de installments quedó bien).

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — ✅ FIX MSI (timing) IMPLEMENTADO en `StripePayment.tsx`: gating estilo Shopify. `InstallmentsElements` ya NO crea el intent en el mount con email vacío; renderiza `DeferredElements` (email visible) hasta que el cliente escribe email válido, y en el blur crea el intent (customer presente) y hace swap al selector MSI. Resuelve el 500 de `customer_balance` y el deadlock del spinner. Fallback a deferred intacto. PENDIENTE probar en prod.
- **2026-07-08** — 🟡 MSI: el error en prod CAMBIÓ de `available_plans` a `customer_balance` (SPEI) → el fix del edge de MSI probablemente YA llegó. Diagnóstico del nuevo bloqueo (intent temprano con email vacío + customer_balance).
- **2026-07-08** — ⛔ MSI RE-VERIFICADO / RE-ESCALADO (feedback 546d0603).
- **2026-07-08** — ⛔ MSI BLOQUEADO POR BACKEND (`available_plans`). REPORTADO (feedback 546d0603).
- **2026-07-08** — ✅ FIX MSI previo en `StripePayment.tsx`: deferred → client_secret temprano. `InstallmentsElements` + `DeferredElements`.
- **2026-07-08** — 🎯 DIAGNÓSTICO MSI: crédito Visa a $4,500, badge sí, selector no.
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): tipos `PaymentMethods`, badge MSI checkout/PDP, ThankYou fetch payment_method_details.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes.
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS".
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5. Hover product.images[1].
- **2026-07-07** — ✅ Envío gratis todo México corregido en 3 sitios.
- **2026-07-07** — ✅ Galería móvil PDP: peek, counter chip, dots, object-cover.

## 5. Image Inventory
- **Hero slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2: ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- Logo: /public/logo.svg
- **Light-shadow sets (Arte vivo triptych)**: URLs y map en `src/data/light-shadow-sets.ts`.
- **DATO CLAVE**: varios productos tienen `variant.image_urls` que NO coinciden 1:1 con `product.images`. El fix de galería garantiza que product.images siempre lidere.
- **verde-salvia** (id 16782cd1-...): product.images[0]=aic3ta4yru (4:5 correcta).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **🟡 MSI selector — fix de timing implementado, PENDIENTE confirmar en prod (2026-07-08, 4ª ronda):** el flujo ahora espera email válido antes de crear el intent. Probar: email → blur → selector 3/6/9/12. Si tras el fix resurge `available_plans`, el edge de installments seguiría mal (re-escalar). Si aparece el selector, cerrado.
- **Swap deferred→MSI en el blur**: al pasar a client_secret mode Elements se remonta; el email persiste vía `defaultValues` (props.email). Si el usuario llena tarjeta en deferred y hace clic ANTES del swap, paga sin MSI esa vez (fallback aceptable, no se rompe).
- **Intent temprano**: cuando el edge funcione, se creará un PaymentIntent al blur del email válido en /pagar en MXN con MSI on (por diseño). Verificar en Stripe Dashboard que no genere ruido.
- **Failed to fetch en consola**: proviene de extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/..."**: ruido de Google Pay, NO afecta checkout. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Stripe Link NO activado; ECE no aparece en preview (esperado). En MSI mode ECE se oculta a propósito.

## 7. Pending / Future Sessions
- **[CRÍTICA · DUEÑO]** Probar MSI en prod tras el fix de timing: email → blur → selector 3/6/9/12 en el form de tarjeta; pagar con crédito MX; SPEI también debe funcionar. Confirmar si `available_plans` ya quedó resuelto en el edge.
- **[ALTA]** Verificar que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.