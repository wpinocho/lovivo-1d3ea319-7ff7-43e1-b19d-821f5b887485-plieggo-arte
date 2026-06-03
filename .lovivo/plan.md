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

## 3. Active Plan
**Estado:** 🔧 Pendiente — Rediseño sticky add-to-cart bar (inspirado en Desenio)

### Objetivo
Simplificar el sticky bar de la PDP a una sola fila compacta con UN solo botón que incluya ambos precios.

### Cambios en `src/pages/ui/ProductPageUI.tsx` (líneas 733–790)

#### Diseño actual (problema)
- Móvil: 2 filas — thumbnail+nombre+precio arriba, dos botones (Comprar ahora | Agregar) abajo → demasiado alto
- Desktop: thumbnail+nombre+precio a la izquierda, dos botones a la derecha

#### Diseño nuevo (inspirado en Desenio)
- **Una sola fila** tanto en móvil como en desktop
- **Un único botón**: "Agregar al carrito" con los dos precios inline
  - Formato: `Agregar al carrito — $4,500 <s>$6,000</s>`
  - El precio tachado se hace con `<span className="line-through opacity-60 ml-1">$6,000</span>` dentro del botón
  - Solo mostrar el precio tachado si `logic.currentCompareAt` existe y es mayor al precio actual
- **Barra más compacta**: `py-2.5` (actualmente `py-3`)
- Mantener thumbnail pequeño (w-10 h-10) + nombre del producto
- Eliminar el layout de `space-y-2` en móvil — todo en una sola fila `flex items-center gap-3`
- Color del botón: terracota (#C16648) — mantener el estilo Plieggo, no negro como Desenio
- La acción del botón: `logic.handleAddToCart` (agregar al carrito, no comprar ahora)

#### Estructura nueva (ambas versiones mobile y desktop comparten el mismo layout):
```
[ 🖼️ ] [ Nombre producto ] [ $4,500 $6,000 ] → [ Agregar al carrito — $4,500 $6,000 ]
```
- El precio también se muestra en el lado izquierdo (nombre + precios) para que el usuario sepa el valor
- Botón a la derecha (desktop) o abajo en una fila separada compacta (mobile si no cabe)

#### Implementación técnica
Reemplazar el bloque completo del sticky bar (líneas 733–790) con:

```tsx
{/* Sticky Add-to-Cart Bar */}
{logic.inStock && (
  <div
    className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-[#F2EFE4]/95 backdrop-blur-sm border-t border-border/40 shadow-md transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
      ctaInView ? "translate-y-full" : "translate-y-0",
    )}
  >
    <div className="max-w-7xl mx-auto px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        {/* Left: thumbnail + info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-sm overflow-hidden bg-muted/30 shrink-0">
            <img src={displayImage} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0 hidden sm:block">
            <p className="text-xs font-medium truncate text-foreground/70">{logic.product.title}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm font-semibold">{logic.formatMoney(logic.currentPrice)}</span>
            {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
              <span className="text-xs text-muted-foreground line-through">{logic.formatMoney(logic.currentCompareAt)}</span>
            )}
          </div>
        </div>
        {/* Right: single CTA */}
        <Button
          onClick={logic.handleAddToCart}
          size="sm"
          className="shrink-0 h-9 px-4 text-xs tracking-wide"
        >
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          Agregar al carrito
        </Button>
      </div>
    </div>
  </div>
)}
```

**Nota:** En mobile el nombre se oculta con `hidden sm:block` para ahorrar espacio, pero los precios siempre se muestran.

## 4. Recent Changes
- **2026-06-03** — Plan: Rediseño sticky bar → una sola fila, un botón, precios inline (inspiración Desenio)
- **2026-06-03** — ProductPageUI.tsx: PDP spacing comprimido + variant buttons más compactos (h-8, rounded-sm)
- **2026-06-03** — Plan PDP: spacing fix + variant buttons compactos (decidido mantener orden precio→bullets→tamaño)
- **2026-06-03** — CollectionAcordeon.tsx: EDITORIAL_IMAGE actualizada a nueva foto lifestyle (recámara con cuadro acordeón en pared)
- **2026-06-01** — Diagnóstico performance móvil /coleccion-acordeon: score 67. Plan de 5 fixes identificado.
- **2026-05-29** — Fix carousel móvil (ProductPageUI.tsx): `setApi`, `carouselApi?.scrollTo(0)` en useEffect al cambiar variante
- **2026-05-29** — Identificado bug: carrusel móvil en PDP no resetea a imagen 1 al cambiar variante
- **2026-05-28** — Diagnóstico: nombre/apellido/teléfono llegan null en clients-upsert (stale state bug en onAddressChange)
- **2026-05-28** — Fix clients-upsert keystroke: blur pattern en CheckoutAdapter + CheckoutUI + StripePayment
- **2026-05-26** — AnnouncementBar.tsx + ProductFAQ.tsx: Entrega cambiada de 10-15 a 5-7 días hábiles
- **2026-05-26** — ProductFAQ.tsx: Eliminado "Protección de acrílico 3mm" de FAQ "¿El marco viene incluido?"
- **2026-05-25** — ThankYou.tsx: Fix 1 variant_name con URLs → cleanVariantName() aplicado
- **2026-05-25** — ThankYou.tsx: Fix 2 upsell → ahora usa colección top-sellers en lugar de productos genéricos
- **2026-05-25** — App.tsx: agregadas rutas `/gracias` y `/gracias/:orderId` → ThankYou (fix 404 post-pago)
- **2026-05-25** — `link` removido de `buildPaymentMethodTypes` en StripePayment.tsx. Payload ahora: `["card", "oxxo", "customer_balance"]` (sin link)

## 5. Image Inventory
- **Hero slide 1**: `...1779301620051-88tz4z58bt7.webp` (lifestyle 7 cuadros en pared cálida → CTA /top-sellers)
- **Hero slide 2**: `...1779296069343-2ifge8n87sv.webp` (toda la colección → CTA /all-products)
- Hero slide 3: video hero-paper-folding.mp4 (CTA → /galeria)
- TopSellers HERO_IMAGE + EDITORIAL_IMAGE: misma imagen que hero slide 1
- **CollectionAcordeon HERO_IMAGE**: `...1779296069343-1i4gabj0it4.webp`
- **CollectionAcordeon EDITORIAL_IMAGE**: `...1780499559157-3zjpthekjcj.webp` (recámara lifestyle con cuadro acordeón en pared — actualizada 2026-06-03)
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
- ECE (Apple Pay / Google Pay) no aparece en el preview (esperado: preview usa iframe sin HTTPS real)
- Stripe Link NO está activado en la cuenta — `link` removido del payload permanentemente

## 7. Pending / Future Sessions
- **[ALTA]** Performance móvil: 3 fixes pendientes (mover fuentes Google a HTML, lazy-load InspirationCarousel, fetchpriority en hero image)
- **[ALTA]** Fix clients-upsert: nombre/apellido/teléfono no llegan (CheckoutAdapter + CheckoutUI)
- **[ALTA]** Probar checkout en producción (plieggo.com) — verificar thank you page carga con info de la orden
- **[ALTA]** Probar Google Pay / Apple Pay en producción en Chrome/Safari con tarjeta guardada
- **[ALTA]** Verificar domain verification para Apple Pay en Stripe Dashboard
- **[ALTA]** Verificar precios de Lunas en DB — confirmar variantes con precio correcto
- **[ALTA]** Subir fotos reales para reseñas g1, g2, g3, g5, g6, g7, g8
- **[MEDIA]** Agregar fotos a más reviews específicas en PDP
- **[MEDIA]** Añadir más fotos a Luna Beige (detalle, textura, en sala)
- **[MEDIA]** Indicador de stock "Solo X disponibles" para Edición Limitada
- Revisar comportamiento de ExpressCheckout en Safari/iOS (Apple Pay)
- Video del producto mostrando el juego de luz y sombra
- Fecha estimada de entrega concreta en trust strip