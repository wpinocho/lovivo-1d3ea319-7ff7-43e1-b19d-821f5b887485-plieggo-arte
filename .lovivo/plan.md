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

### FRENTE A — Meses sin intereses (MSI) — 🟡 AVANCE: error cambió, nuevo bloqueo es de TIMING (arreglable en Craft Mode) — 2026-07-08 (3ª ronda)

**CONTEXTO NUEVO:** El error en prod YA NO es el de `available_plans` (installments). Ahora es:
```
POST payments-create-intent 500
"You must provide a customer when creating or updating a PaymentIntent with a `customer_balance` PaymentMethod."
[Installments] early intent create failed — falling back to deferred
```
INTERPRETACIÓN: el fix del edge para MSI (`available_plans` → `installments.enabled`) MUY PROBABLEMENTE YA se desplegó, porque Stripe ahora pasa esa validación y falla en la SIGUIENTE (customer_balance/SPEI). Es progreso.

**CAUSA RAÍZ DEL NUEVO ERROR (100% del lado del storefront, arreglable por nosotros):**
`InstallmentsElements.createIntent()` (en `StripePayment.tsx`) crea el PaymentIntent EN EL MOUNT del checkout MSI, ANTES de que el cliente escriba su email. El payload usa `buildPaymentMethodTypes()` que INCLUYE `customer_balance` (SPEI) cuando `pm.spei===true`. SPEI exige un Stripe Customer con email → como el email va vacío al montar, el edge no puede crear el customer → Stripe rechaza (400) → edge responde 500 → cae a deferred → el selector MSI nunca aparece.

**Nota de arquitectura:** el flujo DEFERRED (no-MSI) NO sufre esto porque crea el intent al hacer clic en "Completar Compra", cuando el email YA existe; y su init de Elements excluye customer_balance/oxxo (`buildElementsPaymentMethodTypes`). El bug solo vive en el flujo MSI de creación temprana.

**SOLUCIÓN (best-practice tipo Shopify: contacto ANTES de pago) — implementar en Craft Mode:**
Gatear la creación del intent temprano de MSI a que exista un EMAIL VÁLIDO, mostrando mientras tanto el flujo deferred (que ya trae el campo de email de Link + form de tarjeta + badge MSI), y solo cuando el email es válido crear el intent (con el customer ya presente) y hacer swap a modo client_secret (selector MSI).

Pasos concretos en `src/components/StripePayment.tsx` → componente `InstallmentsElements`:
1. Añadir validación simple de email válido (regex mínima o reutilizar helper existente).
2. En `createIntent()`: `return` temprano si `props.email` NO es un email válido (además de los guards actuales de amount/orderId).
3. Mientras NO haya email válido O aún no exista `clientSecret`, RENDERIZAR `<DeferredElements {...props} />` en lugar del spinner "Preparando opciones de pago…". Esto es clave: el spinner actual esconde el campo de email (LinkAuthenticationElement vive dentro de Elements) → sin deferred visible el usuario no puede escribir su correo (deadlock). Deferred es seguro: no crea intent temprano y excluye customer_balance del init.
4. Disparar la creación del intent MSI preferentemente en el BLUR del email válido (usar el prop `onEmailBlur` / callback ya existente) para evitar remount a media escritura. Al escribir email → blur → crear intent → swap a Elements con client_secret (comportamiento actual keyed en clientSecret).
5. Mantener el fallback a deferred si el edge falla por cualquier motivo (ya existe) — el checkout NUNCA se rompe.
6. Verificar que el email que se manda en el payload temprano es el email en vivo (props.email fluye desde onEmailChange del LinkAuthenticationElement del deferred).

**RIESGO/EDGE CASES a validar tras implementar:**
- Que el swap deferred→MSI ocurra ANTES de que el usuario escriba la tarjeta (email va arriba, tarjeta abajo → ok en la mayoría). Si escribe tarjeta en deferred y hace clic antes del swap, paga sin MSI esa vez (no se rompe, solo no aplica MSI). Aceptable como fallback.
- Evitar flip-flop deferred↔MSI: una vez que hay clientSecret, quedarse en MSI (la recreación por cambio de monto ya está debounced).
- Tras el fix, RE-PROBAR si el selector MSI aparece o si resurge el error `available_plans` (para confirmar de una vez si el edge de installments ya quedó bien).

### FRENTE B — Señales de confianza en checkout — ✅ IMPLEMENTADO (2026-07-08)
### FRENTE C — Integridad de galería PDP — ✅ IMPLEMENTADO (2026-07-08)

## 4. Recent Changes
- **2026-07-08** — 🟡 MSI: el error en prod CAMBIÓ de `available_plans` (installments) a `customer_balance` (SPEI) → el fix del edge de MSI probablemente YA llegó. Nuevo bloqueo diagnosticado: `InstallmentsElements` crea el intent en el mount (email vacío) e incluye customer_balance, que exige customer con email → 500 → fallback deferred. SOLUCIÓN definida: gatear la creación temprana del intent al email válido (estilo Shopify), mostrando deferred mientras tanto. ARREGLABLE EN CRAFT MODE (no depende de Lovivo).
- **2026-07-08** — ⛔ MSI RE-VERIFICADO: el dueño dice que Lovivo aplicó el fix, pero la consola mostraba el MISMO error `available_plans`. RE-ESCALADO (feedback 546d0603).
- **2026-07-08** — ⛔ MSI BLOQUEADO POR BACKEND. Edge mandaba `available_plans` (response-only) → 500. REPORTADO a Lovivo (feedback ID 546d0603).
- **2026-07-08** — ✅ FIX MSI IMPLEMENTADO en `StripePayment.tsx`: deferred → client_secret temprano. `InstallmentsElements` + `DeferredElements`; ECE oculto en MSI mode; fallback a deferred.
- **2026-07-08** — 🎯 DIAGNÓSTICO MSI: crédito Visa a $4,500, badge sí, selector no.
- **2026-07-08** — ✅ MSI CABLEADO (4 cambios): tipos `PaymentMethods`, badge MSI checkout/PDP, ThankYou fetch payment_method_details.
- **2026-07-08** — ✅ FIX galería PDP: `getDisplayImages()` mergea product.images + variantes. Trust strip "Entrega 5–7 días hábiles".
- **2026-07-08** — ✅ Fix checkout: miniaturas resumen 4:5. Envío resumen móvil "GRATIS" siempre.
- **2026-07-08** — ✅ CHECKOUT CRO. Nuevo `CheckoutTrustBadges.tsx`.
- **2026-07-07** — ✅ "Arte vivo" honesto (`LightShadowFeature.tsx` triptych/single).
- **2026-07-07** — ✅ ProductCard estandarizado 4:5 en TODAS las páginas. Hover product.images[1].
- **2026-07-07** — ✅ "Arte vivo" REAL en 2 best-sellers. `light-shadow-sets.ts`.
- **2026-07-07** — ✅ PDP móvil: eliminadas flechas del carrusel — solo peek + dots.
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
- **🟡 MSI selector — nuevo bloqueo es de TIMING en el storefront (2026-07-08, 3ª ronda):** el error pasó de `available_plans` a `customer_balance`. El intent MSI se crea en el mount con email vacío e incluye SPEI (customer_balance), que exige customer con email → 500. FIX: gatear creación al email válido (ver FRENTE A). Arreglable en Craft Mode. Tras el fix, confirmar si el selector aparece o si resurge `available_plans`.
- **Intent temprano**: cuando el edge funcione, se creará un PaymentIntent al tener email válido en /pagar en MXN con MSI on (por diseño). Verificar en Stripe Dashboard que no genere ruido.
- **Remount al cambiar monto / al swap deferred→MSI**: en client_secret mode Elements se remonta; puede limpiar inputs. Mitigar disparando el swap en el blur del email (antes de escribir tarjeta). Bajo riesgo (envío gratis fijo MX).
- **Failed to fetch en consola**: proviene de extensión de Chrome (`frame_ant.js`), NO de la tienda. Ignorar.
- **"Unable to download payment manifest pay.google.com/about/redirect"**: ruido de Google Pay en el navegador, NO afecta el checkout. Ignorar.
- **ThankYou fetch a `orders`**: puede fallar por RLS (fallback silencioso).
- **Verificar tarifa de envío Dashboard = $0 todo México**.
- `inventory_quantity: 0` con track_inventory:false (comprables).
- Stripe Link NO activado; ECE no aparece en preview (esperado). En MSI mode ECE se oculta a propósito.

## 7. Pending / Future Sessions
- **[CRÍTICA · CRAFT MODE]** Implementar el gating del intent temprano MSI al email válido en `InstallmentsElements` (ver FRENTE A). Luego RE-PROBAR en prod: escribir email → aparece selector 3/6/9/12 en el form de tarjeta; pagar con crédito MX; SPEI también debe funcionar (customer ya presente). Confirmar si `available_plans` ya quedó resuelto en el edge.
- **[ALTA]** Verificar que ThankYou muestra el plan MSI (RLS sobre `orders`).
- **[ALTA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Sugerir al dueño limpiar imágenes variant-only no-4:5 en dashboard.
- **[ALTA]** Dueño: aprobar las 4 imágenes de "Arte vivo" (triptych).
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).
- **[MEDIA]** A/B test lifestyle-first vs packshot-first primera imagen.