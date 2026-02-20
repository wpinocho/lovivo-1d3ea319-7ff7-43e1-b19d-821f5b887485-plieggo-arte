# Store Plan — Plieggo

## Current State
Tienda funcional con colecciones (Espacio, Acordeon, etc.)
Sistema de reseñas con modal de scroll corregido
CartContext, checkout, useOrderItems, useCheckout funcionando
UI de Plieggo intacta (diseño propio, no tocar)
Bundles implementados: BundleCard, MixMatchBundleCard, BundlePicker en IndexUI

## User Preferences
No es programador — necesita guía paso a paso muy clara
Quiere ir en chunks testeables, no todo de golpe

---

## Migración Bundles + Price Rules — COMPLETADO ✅
Todo el Paso 7 (UI Integration) está implementado.

## Feature: Mix & Match Bundles — COMPLETADO ✅

---

## Feature: Bundle Card Redesign + Bundle Page — PENDIENTE 🔧

### Problemas detectados:
1. BundleCard y MixMatchBundleCard tienen diseño plano, sin hover effects
2. Badge de descuento usa `bg-destructive` (rojo) — debe usar `bg-secondary text-secondary-foreground` (Vino Burdeos #5D2A38 del banner)
3. Botón "Agregar" en BundleCard desactivado porque `bundle_items` vacío en DB + porque la solución correcta es navegar a página de bundle
4. No existe página `/bundles/:slug` — no está en App.tsx ni como archivo

### Colores del sistema (index.css):
- `--secondary: 343 37% 26%` = Vino Burdeos #5D2A38 (banner superior)
- `--secondary-foreground: 48 33% 92%` = Crema (texto blanco sobre vino)
- `--destructive: 0 84.2% 60.2%` = Rojo a eliminar en badges de descuento

### Archivos con `bg-destructive` que son badges de descuento (cambiar a secondary):
- `src/components/ui/BundleCard.tsx` línea 71
- `src/components/MixMatchBundleCard.tsx` línea 56
- `src/components/BundlePicker.tsx` línea 109 (badge "Ahorras $X")
- `src/components/ui/ProductCardUI.tsx` línea 96 (badge `-X%` en hover overlay)
- NO tocar: FloatingCart (badge contador), CheckoutUI, MyOrdersUI (estados de error/status)

### ProductCardUI design patterns a replicar en BundleCard:
- Card: `border-2 border-transparent hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:-translate-y-2 group cursor-pointer transition-all duration-500`
- Badge position: `absolute top-3 right-3 z-10`
- Typography title: `font-heading font-semibold text-foreground text-base md:text-lg line-clamp-2`
- Price: `font-heading text-foreground font-bold text-xl md:text-2xl`
- Compare price: `font-body text-muted-foreground text-xs line-through`
- Bottom button: `variant="outline"` que navegue a la página, NO que agregue directo

### Implementation Steps:

#### Step 1: Cambiar colores rojo → vino (4 archivos)
- `src/components/ui/BundleCard.tsx`: `bg-destructive text-destructive-foreground` → `bg-secondary text-secondary-foreground` en el badge -X%
- `src/components/MixMatchBundleCard.tsx`: mismo cambio
- `src/components/BundlePicker.tsx`: badge "Ahorras $X": cambiar a `bg-secondary/10 text-secondary`
- `src/components/ui/ProductCardUI.tsx`: badge `-X%` en hover overlay → `bg-secondary text-secondary-foreground`

#### Step 2: Rediseñar BundleCard (src/components/ui/BundleCard.tsx)
Nueva estructura inspirada en ProductCardUI:
- Card con `border-2 border-transparent hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:-translate-y-2 group cursor-pointer transition-all duration-500`
- `onClick={() => navigate('/bundles/' + bundle.slug)}` en la Card
- Imagen con `group-hover:scale-105` transition
- Badge "Paquete" arriba derecha (como ProductBadge position) con bg-secondary
- Badge descuento `bg-secondary text-secondary-foreground`
- En hover overlay: mostrar items del paquete y botón "Ver paquete →"
- Info section: título font-heading, precio font-heading bold, compare price tachado
- Botón CTA: `variant="outline"` → navega a `/bundles/${bundle.slug}` (NO addBundle desde la card)
- Usar `useNavigate` de react-router-dom

#### Step 3: Rediseñar MixMatchBundleCard (src/components/MixMatchBundleCard.tsx)
Mismos hover effects que BundleCard:
- Card con mismos estilos de hover
- Badge "Arma tu paquete" usa `bg-secondary text-secondary-foreground` con icono Sparkles
- Badge descuento → secondary
- Botón "Armar" sigue abriendo el BundlePicker (este comportamiento se mantiene)
- Mejorar tipografía para que coincida con ProductCardUI

#### Step 4: Crear Bundle Page UI (src/pages/ui/BundlePageUI.tsx)
Componente nuevo. Layout tipo página de producto de Shopify:
- Sección hero: imagen grande a la izquierda (md:w-1/2), info a la derecha
- Badge "Paquete especial" / "Arma tu paquete" según tipo
- Título grande (font-heading text-4xl font-bold)
- Precio destacado + precio tachado + badge "Ahorras $X" con bg-secondary
- Descripción completa
- Para bundle_type 'fixed': lista de productos incluidos con imagen thumb + nombre + precio cada uno
- Para bundle_type 'collection_fixed': texto explicativo "El descuento se aplica automáticamente cuando agregues los productos de esta colección"
- Para bundle_type 'mix_match' / 'mix_match_variant': integrar BundlePicker inline (sin Dialog, como sección de la página)
- CTA principal grande para fixed: "Agregar paquete al carrito" (con lógica de useBundleItems)
- Breadcrumb simple: "Inicio > Paquetes > {titulo}"
- Wrap en EcommerceTemplate

#### Step 5: Crear Bundle Page Route (src/pages/Bundle.tsx)
- Fetch bundle by slug de Supabase usando useEffect
- Pasar bundle a BundlePageUI
- Loading state y not found state
- Query: `supabase.from('bundles').select('...todos los campos...').eq('slug', slug).eq('store_id', STORE_ID).single()`

#### Step 6: Registrar ruta en App.tsx
- Agregar import: `const Bundle = lazy(() => import('./pages/Bundle'))`
- Agregar route: `<Route path="/bundles/:slug" element={<Bundle />} />`

### Known Issues
- El bundle "Paquete acordeon" tiene `bundle_price = 0` en Supabase → el usuario debe editarlo manualmente en el dashboard de Supabase
- El bundle "Paquete acordeon" probablemente no tiene items en `bundle_items` table → DB issue, no código

## Próximos pasos opcionales
- Página `/paquetes` listando todos los bundles (SEO)
- Tests end-to-end del flujo completo: picker → carrito → checkout → applied_rules