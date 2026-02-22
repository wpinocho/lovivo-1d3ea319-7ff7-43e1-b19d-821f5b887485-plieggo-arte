# Auditoría Completa Plieggo — Ecommerce Best Practices

## Lo que YA tiene Plieggo ✅
- Announcement bar rotativa
- WhatsApp flotante (oculto en móvil en página de producto para no tapar CTA)
- Trust badges (4) bajo el botón de compra
- Cross-sell "Combina Bien Con..."
- FAQ de producto (8 preguntas)
- Reviews/ratings (hardcoded en `src/data/product-reviews.ts`)
- Product badges (Edición Limitada, etc.)
- Cart sidebar
- Mobile sticky CTA bar (Comprar/Comprar ahora)
- Hero carousel (3 slides + video)
- Collection navigation cards
- Bundles/paquetes section
- InspirationCarousel
- Interactive Gallery Modal (regalo)
- Scarcity indicators ("Últimas X unidades")
- Size guide (image)
- Product inspiration gallery (context shots)
- Stripe checkout
- Thank You page (funcional)
- Discount codes en checkout
- "Comprar ahora" → direct checkout (fixed)
- Multi-image con thumbnails
- Quantity selector + stock tracking
- Newsletter section (existe como componente pero NO está en IndexUI.tsx)
- About page con historia de marca

---

## Gaps detectados — Matriz Esfuerzo × Impacto

### 🔴 QUICK WINS (Alto impacto + Bajo esfuerzo) — IMPLEMENTAR PRIMERO

#### QW1: Barra de progreso de envío gratis en el carrito
- **Dónde**: `CartSidebar.tsx` — encima del botón "Pagar"
- **Qué**: "¡Solo te faltan $X para envío gratis en CDMX!" con barra de progreso visual
- **Threshold**: Si el total < $X (definir umbral, ej. $800 o $1,000 MXN), mostrar barra de progreso
- **Impacto**: Aumenta AOV (Average Order Value). Best practice confirmada por Shopify
- **Esfuerzo**: Bajo — solo editar CartSidebar.tsx

#### QW2: Newsletter en la home (el componente existe pero no se usa)
- **Dónde**: `src/pages/ui/IndexUI.tsx` — entre InspirationCarousel y FloatingCart
- **Qué**: Agregar `<NewsletterSection />` a la home con incentivo de descuento ("Suscríbete y obtén 10% en tu primera compra")
- **Mejora**: Cambiar el copy en `NewsletterSection.tsx` para incluir incentivo
- **Impacto**: Captura emails para marketing futuro. Los emails son el canal con mejor ROI
- **Esfuerzo**: Muy bajo — solo agregar import + componente en IndexUI

#### QW3: Compartir en redes sociales en producto
- **Dónde**: `ProductPageUI.tsx` — cerca del botón de compra o al final
- **Qué**: Botones para compartir en WhatsApp, Instagram Stories, Pinterest, link copy
- **Copy**: "¿Te gustó? Compártelo con alguien especial"
- **Impacto**: Tráfico viral gratuito. Para productos visuales de arte, esto es especialmente efectivo
- **Esfuerzo**: Bajo — son simples links con URL codificada

#### QW4: Post-purchase upsell en la página ThankYou
- **Dónde**: `src/pages/ThankYou.tsx` — después de la sección de "Próximos Pasos"
- **Qué**: Sección "Otros cuadros que podrían interesarte" — mostrar 3 productos del mismo collection
- **Impacto**: Captura buyers satisfechos en el momento de mayor confianza
- **Esfuerzo**: Bajo — reutilizar lógica del CrossSellSection

#### QW5: Mensaje de regalo (gift note) en checkout
- **Dónde**: `CheckoutUI.tsx` — agregar campo opcional "¿Es un regalo? Escribe un mensaje"
- **Qué**: Checkbox "Es un regalo" + textarea para mensaje personal
- **Impacto**: Los cuadros de Plieggo son regalos premium. Este campo reduce devoluciones y aumenta percepción de valor
- **Esfuerzo**: Bajo — campo adicional en el form del checkout

---

### 🟠 ALTO IMPACTO / ESFUERZO MEDIO — IMPLEMENTAR DESPUÉS

#### HM1: Pop-up de captura de email (exit-intent / time delay)
- **Qué**: Pop-up que aparece después de 45 segundos o cuando el usuario mueve el cursor hacia cerrar la pestaña
- **Copy**: "Antes de irte... ¿quieres 10% de descuento en tu primera pieza?" + campo email
- **Archivo nuevo**: `src/components/EmailCapturePopup.tsx`
- **Dónde**: Importar en `EcommerceTemplate.tsx` (se verá en todas las páginas)
- **Condición**: Solo mostrar si el email no fue capturado antes (localStorage flag)
- **Impacto**: Para tickets altos ($2k-5k), el buyer considera mucho antes de comprar. Capturar email = poder hacer follow up
- **Esfuerzo**: Medio

#### HM2: Páginas legales (Privacidad, Términos, Devoluciones)
- **Qué**: 3 páginas nuevas con contenido legal básico
- **Rutas**: `/politica-privacidad`, `/terminos-condiciones`, `/politica-devoluciones`
- **Dónde linkar**: Footer en `EcommerceTemplate.tsx`
- **Impacto**: Legal requerido en México (LFPDPPP). También aumenta confianza. Google penaliza tiendas sin estas páginas
- **Esfuerzo**: Medio (redactar contenido + crear páginas)

#### HM3: Breadcrumbs en página de producto
- **Qué**: Inicio > Colección Espacio > Luna Azul (con schema markup para SEO)
- **Dónde**: `ProductPageUI.tsx` — encima del título del producto
- **Impacto**: Mejora navegación + SEO (Google muestra breadcrumbs en resultados de búsqueda)
- **Esfuerzo**: Bajo-Medio

#### HM4: Social proof dinámico en producto
- **Qué**: "🔥 12 personas han visto este producto hoy" o "⚡ Última venta hace 3 horas"
- **Dónde**: `ProductPageUI.tsx` — cerca del precio
- **Implementación**: Números fijos pero que rotan/simulan actividad real (ético si los rangos son reales)
- **Impacto**: Prueba social en tiempo real. Especialmente importante para reducir la parálisis de decisión en tickets altos
- **Esfuerzo**: Bajo (solo UI, sin backend real necesario)

---

### 🟡 IMPACTO MEDIO / BAJO ESFUERZO

#### MM1: WhatsApp contextual en carrito vacío
- **Qué**: Cuando el carrito está vacío, mostrar "¿Tienes dudas? Escríbenos por WhatsApp antes de comprar"
- **Dónde**: `CartSidebar.tsx` en el estado de carrito vacío
- **Impacto**: Para productos de $2k-5k, muchos compradores quieren hablar antes de comprar

#### MM2: Countdown para ediciones limitadas
- **Qué**: Si el producto tiene badge "Edición Limitada", mostrar un countdown de oferta
- **Dónde**: `ProductPageUI.tsx` — condicionado por `product.badge === 'limited'`
- **Impacto**: Crea urgencia real. Complementa perfectamente el badge de Edición Limitada

---

### 🟢 PROYECTOS ESTRATÉGICOS (Alto impacto pero alto esfuerzo)

#### PE1: Email marketing con abandoned cart
- **Qué**: Integración con Klaviyo o Brevo para:
  - Carrito abandonado (3 emails: 1h, 24h, 72h después)
  - Secuencia post-compra (review request, cuidado del cuadro, recompra)
  - Newsletter segmentado por colección
- **Impacto**: Puede recuperar 15-25% de ventas perdidas. El canal con mejor ROI en ecommerce
- **Esfuerzo**: Alto (requiere setup de herramienta externa)

#### PE2: SEO por producto
- **Qué**: Meta tags únicos (title, description, og:image) por producto
- **Schema markup**: Product schema para Google Shopping
- **Dónde**: `HeadlessProduct.tsx` + `index.html` (react-helmet o similar)
- **Impacto**: Tráfico orgánico gratuito a largo plazo
- **Esfuerzo**: Alto

#### PE3: Búsqueda interna
- **Qué**: Barra de búsqueda en el header
- **Impacto**: Importante cuando hay 15+ productos
- **Esfuerzo**: Medio-Alto

---

## PRIORIZACIÓN RECOMENDADA

### Sprint 1 (Quick Wins — hacer ahora):
1. QW2: Agregar NewsletterSection a home con incentivo de descuento
2. QW1: Barra de progreso de envío gratis en CartSidebar
3. QW3: Botones de compartir en WhatsApp/Pinterest en producto
4. QW4: Post-purchase upsell en ThankYou
5. QW5: Gift note en checkout

### Sprint 2:
6. HM4: Social proof dinámico en producto
7. MM1: WhatsApp contextual en carrito vacío
8. HM3: Breadcrumbs en producto
9. HM2: Páginas legales

### Sprint 3 (Estratégico):
10. HM1: Exit-intent popup de email
11. MM2: Countdown para ediciones limitadas
12. PE1: Email marketing (Klaviyo/Brevo)
13. PE2: SEO meta tags

---

## Notas de implementación

### QW1 - Envío gratis threshold
```tsx
// En CartSidebar.tsx, después de "Order Summary"
const FREE_SHIPPING_THRESHOLD = 1500 // MXN - ajustar según negocio
const progressPercent = Math.min((state.total / FREE_SHIPPING_THRESHOLD) * 100, 100)
const remaining = FREE_SHIPPING_THRESHOLD - state.total

// UI: mostrar solo si total < threshold
{state.total < FREE_SHIPPING_THRESHOLD && (
  <div className="mb-3 p-3 bg-primary/5 rounded-lg">
    <p className="text-sm text-center mb-2">
      ¡Te faltan <strong>{formatMoney(remaining, currencyCode)}</strong> para envío gratis en CDMX
    </p>
    <div className="w-full bg-muted rounded-full h-2">
      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
    </div>
  </div>
)}
```

### QW2 - Newsletter en home
En `IndexUI.tsx`, antes del `<FloatingCart />`:
```tsx
import { NewsletterSection } from '@/components/NewsletterSection'
// ...
<NewsletterSection />
<FloatingCart />
```

Update copy en `NewsletterSection.tsx`:
- Título: "Suscríbete y recibe 10% en tu primera compra"
- Subtítulo: "Sé el primero en conocer nuevas piezas y colecciones exclusivas"

### QW3 - Compartir en redes
Agregar cerca del precio en ProductPageUI:
```tsx
const shareUrl = encodeURIComponent(window.location.href)
const shareText = encodeURIComponent(`Mira este cuadro de Plieggo: ${logic.product.title}`)
// WhatsApp: https://wa.me/?text=${shareText}%20${shareUrl}
// Pinterest: https://pinterest.com/pin/create/button/?url=${shareUrl}
// Copy link: navigator.clipboard.writeText(window.location.href)
```

### QW4 - Post-purchase upsell en ThankYou
Importar CrossSellSection (o crear un componente similar) y usarlo con un producto dummy o los primeros 3 productos activos de la tienda.

### QW5 - Gift note
En CheckoutUI.tsx, agregar campo opcional al formulario:
```
[ ] ¿Es un regalo?
  Si es así, escribe un mensaje personal:
  [textarea]
```
Guardar como campo de nota en la orden.