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
- **PRECIO MÍNIMO PERSONALIZADOS CONFIRMADO: $3,500 MXN** (pueden ser más chicos). Ya publicado en hero + FAQ de /personalizados.
- **NUEVO CANAL B2B (2026-08-13):** el dueño quiere una ruta dedicada a ventas empresariales (hoteles boutique, oficinas, restaurantes, despachos de interiorismo, regalo corporativo). La landing `/personalizados` (B2C) se MANTIENE tal cual, sin cambios.

## 2. Design System
- Paleta: crema mantequilla (#F2EFE4 bg), azul medianoche (#1B2A41 foreground), terracota (#C16648 primary), vino burdeos (#5D2A38 secondary).
- Tipografías: DM Sans (headings) + Crimson Pro (body).
- Fondo continuo sin bandas. Estilo Zara Home / Muji. Iconos SVG line terracota. NO emojis.
- CTAs: NUNCA glow/sombra naranja. Usar tokens (primary/secondary), nunca text-white/bg-white.
- **Formato de dinero**: usar SIEMPRE `formatMoney()` de `src/lib/money.ts`.
- **Reseñas con foto**: `src/data/plieggo-general-reviews.ts` (campo `photoUrl`) y `src/data/product-reviews-content.ts`.
- **CTA WhatsApp estándar**: `wa.me/525531215386?text=...`.
- **Base URL imágenes producto**: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/<file>.webp`.
- **Menú global** en `src/templates/EcommerceTemplate.tsx` (desktop array + mobile Sheet). Incluye `/personalizados` ("Personalízalo", destacado en primary).
- **Imágenes producto son 4:5** (portrait). Usar `aspect-[4/5]`, NUNCA aspect-square.
- **Default de variante PDP (`HeadlessProduct.tsx`, useEffect líneas ~96-150):** Prisma abre en 50x50; el resto en 30x90.
- **DEEP-LINK DE TALLA (anuncios):** `?talla=30x90` (alias `?size=`) en la URL del producto preselecciona esa talla.

## 3. Active Plan — LANDING B2B `/proyectos` (arte para hoteles, oficinas y proyectos)

### Objetivo de negocio
Canal de mayor ticket (pedidos de 3–30+ piezas). El link se comparte en frío: DM de Instagram, correo a despachos, LinkedIn, tarjeta de presentación. Objetivo primario = **lead calificado por WhatsApp**, secundario = **explorar catálogo**.

### Decisiones tomadas
- **Ruta:** `/proyectos` (principal, se comparte así: `plieggo.com/proyectos`). Agregar **alias `/b2b`** que renderiza el mismo componente (por si el dueño lo escribe así).
- **NO se toca `/personalizados`.** Son públicos distintos (B2C emocional vs B2B racional/volumen).
- **Navegación:** NO agregar al menú principal (diluye el flujo B2C, 96% móvil consumidor). Sí agregar un enlace discreto en el **footer**: "Proyectos y mayoreo". La landing vive principalmente de link directo.
- **Tono:** más racional que `/personalizados`. Menos emoción, más: capacidad, plazos, factura, volumen, coordinación de proyecto. Seguir `craft.copywriting`: beneficios primero, bullets ≤15 palabras, cifras concretas, cero jerga corporativa ("soluciones integrales", "excelencia" = PROHIBIDO).
- **Responsive:** mobile-first (WhatsApp abre en móvil) PERO con layout desktop cuidado — los despachos y compradores corporativos abren en laptop. Grids de 2–3 columnas en lg.
- **Honestidad:** NO inventar logos de clientes, ni casos de éxito, ni "+50 hoteles". Usar solo hechos reales: 4.8★ · 196 reseñas, hecho a mano en México, envío gratis, 5–7 días hábiles (estándar).

### BUYER PERSONAS B2B (priorizados)
1. **Hotelería boutique / hospitality** (hoteles boutique, spas, hostales de diseño, Airbnb premium gestionados).
   - Dolor: habitaciones que se vean únicas y "fotografiables"; arte genérico de proveedor mata el concepto.
   - Gancho: piezas hechas a mano → ninguna igual; ligeras y sin cristal → fáciles de instalar y transportar; series coordinadas por piso/tipo de habitación.
   - Volumen típico: 10–60 piezas.
2. **Interioristas, arquitectos y despachos de diseño (specifiers)** — el persona de mayor LTV: recompran en cada proyecto.
   - Dolor: necesitan medida exacta a la pared, paleta que empate con el moodboard, plazo confiable y factura.
   - Gancho: color y medida a proyecto, precio especial para profesionales, contacto directo con el taller.
3. **Corporativo / oficinas / coworkings / consultorios** (despachos de abogados, notarías, clínicas, salas de juntas, recepciones).
   - Dolor: recepción y sala de juntas vacías y frías; presupuesto asignado; requieren factura y OC.
   - Gancho: punto focal con presencia sin gritar; se ve caro; instalación simple.
4. **Restaurantes, cafés, bares y retail/showrooms.**
   - Dolor: quieren un muro "instagrameable" que diferencie el local.
   - Gancho: textura y sombra que cambia con la luz → el muro se ve distinto en cada foto.
5. **Regalo corporativo / relaciones públicas** (fin de año oct–dic, clientes VIP, brokers inmobiliarios, entregas de depto).
   - Dolor: regalo memorable que no sea vino ni canasta; volumen y empaque cuidado.
   - Gancho: pieza única hecha a mano + empaque premium + dedicatoria. Sección propia en la landing.
6. **Desarrolladores inmobiliarios / home staging / depas amueblados** (secundario, mencionar solo en la lista de "para quién es").

### ESTRUCTURA DE LA LANDING (orden exacto)
1. **HERO** (imagen lifestyle B2B, overlay oscuro como en `/personalizados`).
   - Eyebrow: "Proyectos y volumen"
   - H1: "Arte hecho a mano para hoteles, oficinas y proyectos de diseño"
   - Sub: "Piezas únicas en papel, en el color y la medida de tu proyecto. Producción coordinada y envío a todo México."
   - Chips: `Precio por volumen` · `Color y medida a proyecto` · `Factura` · `Envío gratis a todo México`
   - CTA primario: **"Cotizar mi proyecto por WhatsApp"**
   - CTA secundario (ghost/outline): **"Ver catálogo"** → `/all-products?ref=b2b`
   - Prueba social discreta: 4.8★ · 196 reseñas.
2. **"¿Para quién es?"** — 4 tarjetas con icono line (Hotel, Oficina/Corporativo, Restaurante/Retail, Despacho de diseño). 1 línea de beneficio cada una. Cada tarjeta abre WhatsApp con mensaje pre-cargado con ese segmento (evento Lead con `content_category: 'b2b'`, `content_name: 'b2b-<segmento>'`).
3. **"Por qué funciona en espacios comerciales"** — 4 bullets con beneficio en negritas:
   - **Ninguna pieza se repite** — doblada a mano, cada habitación tiene la suya.
   - **Cambia con la luz del día** — el muro nunca se ve igual en dos fotos.
   - **Ligera y sin cristal** — se instala y se transporta sin riesgo.
   - **Papel libre de ácidos** — mantiene el color por décadas, sin amarillear.
4. **COTIZADOR RÁPIDO (diferenciador clave vs /personalizados)** — 3 selects, sin backend: `Tipo de espacio` (hotel / oficina / restaurante / despacho / regalo corporativo) + `Cantidad aproximada` (1–5 / 6–15 / 16–40 / 40+) + `Ciudad`. El botón arma un mensaje estructurado de WhatsApp con esas 3 respuestas. Beneficio: leads pre-calificados, cero fricción, cero base de datos.
   - Título: "Arma tu cotización en 30 segundos"
   - CTA: "Enviar por WhatsApp"
5. **CÓMO TRABAJAMOS (4 pasos)** — Brief → Propuesta y cotización → Producción en taller → Entrega e instalación simple. Esto responde la objeción "¿me van a cumplir?".
6. **GALERÍA DE PROYECTO** — 6 imágenes en grid 2 col (móvil) / 3 col (desktop), aspect-[4/5]. Ver sección de imágenes abajo.
7. **REGALO CORPORATIVO** — bloque de 2 columnas (imagen + texto). Bullets: pieza única por persona, empaque premium, dedicatoria, entrega coordinada, factura. CTA: "Cotizar regalos corporativos". Estacional (oct–dic) pero permanente en la página.
8. **ESTILOS DISPONIBLES** — reutilizar el bloque `STYLES` de `/personalizados` (Acordeón, Acordeón Prisma, Luna) con copy B2B. CTA de cada tarjeta → WhatsApp con estilo pre-cargado.
9. **PRUEBA SOCIAL** — 3 reseñas reales de `plieggo-general-reviews.ts` (usar ids distintos a los de `/personalizados` si hay disponibles) + línea "4.8★ · 196 reseñas de clientes".
10. **FAQ B2B (acordeón)** — ver preguntas abajo.
11. **CTA FINAL** (fondo `bg-secondary`, mismo patrón que `/personalizados`).
12. **STICKY CTA MÓVIL** — copiar EXACTAMENTE el patrón con `IntersectionObserver` sobre el botón del hero de `Personalizados.tsx` (líneas ~126-138 + ~499-517). Solo aparece al scrollear.

### ESTRATEGIA DE CTA (decisión)
- **CTA principal ÚNICO = WhatsApp** en toda la página (el B2B mexicano cotiza por WhatsApp; un formulario sin backend no aporta y añade fricción).
- **CTA secundario = "Ver catálogo"** → `/all-products?ref=b2b`, presente SOLO en el hero y en el bloque de estilos. Sirve al comprador que quiere ver piezas y precios antes de escribir. No poner "Agregar al carrito" en esta landing.
- **Correo alternativo** (para despachos/compras que exigen correo formal): enlace `mailto:` discreto en el FAQ y en el CTA final. ⚠️ CONFIRMAR CON EL DUEÑO qué correo usar.
- Todos los CTA de WhatsApp disparan `facebookPixel.lead({ content_category: 'b2b', content_name: 'b2b-<origen>' })` para poder separar leads B2B de leads B2C en Meta.
- Mensajes de WhatsApp pre-cargados distintos por origen (hero, tarjeta de segmento, cotizador, regalo, estilo, CTA final) para saber qué sección convierte.

### IMÁGENES — qué usar y qué generar
**Reutilizables ya existentes (base `products/`):**
- Detalle de pliegues / textura: `etdkr375s4e.webp` (verde salvia), `f53ej22pcj.webp` (prisma onyx), `u5scxlsp37.webp` (blanco puro).
- Estilos: Acordeón `etdkr375s4e`, Prisma `87qtowj61fv`, Luna `glo0f69xdqg`.
- Neutros que funcionan en corporativo: `551yd2x4ryw` (beige sutil), `6gpaobcgtcc` (prisma beige-blanco), `hgpuedhniqa` (luna llena).
**Problema:** TODO el material actual es residencial (salas, comedores, recámaras). Un hotelero u oficina no se ve reflejado.
**Generar en Craft Mode con `imagegen--generate_image` usando `reference_images` con las fotos REALES del producto (cargar antes skill `media.product-imagery`). 6 tomas prioritarias:**
1. **Lobby / recepción de hotel boutique** — pieza grande 30×90 vertical (usar `etdkr375s4e` o `551yd2x4ryw` como referencia) sobre muro de estuco claro, mueble de madera, luz natural lateral marcando la sombra de los pliegues. → HERO.
2. **Pasillo de hotel con serie de 3 piezas** iguales en distinto color (beige, verde salvia, blanco) — comunica "producción por lote".
3. **Recepción de oficina / despacho** — pieza 50×50 detrás del logo/mostrador, tono neutro beige-blanco, iluminación de acento.
4. **Sala de juntas** — pieza 30×90 en el muro corto, mesa larga, sillas. Tono blanco puro u onyx.
5. **Restaurante / café de diseño** — muro de textura con la pieza burdeos u onyx, luz cálida de noche (contraste con las tomas diurnas).
6. **Regalo corporativo** — varias cajas de empaque premium apiladas con una pieza a la vista (para la sección 7).
Reglas: mismo lenguaje visual que el sitio (Zara Home / Muji), paleta crema-terracota-azul medianoche, luz natural que marque la sombra, SIN personas de frente, SIN logos falsos de marcas reales. Formato 4:5 para grid; hero 16:9 o 3:2.

### FAQ B2B (redactar así — NO inventar lo marcado ⚠️)
- ¿Cuántas piezas mínimo? → Desde 1. El precio especial por volumen aplica a partir de ⚠️CONFIRMAR piezas.
- ¿Pueden hacer la medida de mi muro? → Sí. Medidas a proyecto; arriba de ~100×70 cm cambiamos a lino. Cuéntanos la medida por WhatsApp.
- ¿Manejan mi paleta de color? → Trabajamos dentro de la carta de color de nuestro proveedor. Mándanos tu código/pantone y te decimos el más cercano.
- ¿Cuánto tardan en un pedido grande? → Piezas estándar 5–7 días hábiles. Proyectos por lote ⚠️CONFIRMAR plazo.
- ¿Dan factura? → ⚠️CONFIRMAR (asumir sí, pero no publicar hasta confirmar).
- ¿Envían a todo el país? → Sí, envío gratis a todo México, enmarcado y listo para colgar.
- ¿Qué pasa si una pieza llega dañada? → ⚠️CONFIRMAR política de reposición.
- ¿Tienen precio especial para interioristas? → ⚠️CONFIRMAR esquema (descuento fijo % vs escalonado por volumen anual, tipo trade program).

### SEO (cargar skill `workflow.seo` antes de escribir el head)
- `<title>`: "Arte en papel para hoteles, oficinas y proyectos | Plieggo"
- meta description: "Cuadros de papel hechos a mano para hoteles boutique, oficinas y restaurantes. Color y medida a proyecto, precio por volumen y envío gratis a todo México."
- H1 único, jerarquía H2 por sección, `alt` descriptivo por imagen.

### Implementación técnica
1. Crear `src/pages/Proyectos.tsx` — partir de la estructura de `src/pages/Personalizados.tsx` (envuelto en `<EcommerceTemplate showCart={true} layout="full-width">`, constantes `PHONE`/`IMG` arriba, arrays de datos fuera del componente, sticky con `IntersectionObserver`).
2. Registrar en `src/App.tsx`: `const Proyectos = lazy(() => import('./pages/Proyectos'))` + `<Route path="/proyectos" element={<Proyectos />} />` + `<Route path="/b2b" element={<Proyectos />} />`.
3. Cotizador: `useState` local con 3 campos (`espacio`, `cantidad`, `ciudad`) usando `Select` de shadcn; el handler arma el texto y abre `wa.me`. Sin backend, sin Supabase.
4. Tracking: `facebookPixel.lead()` en cada CTA (ya existe el método en `src/lib/facebook-pixel.ts`).
5. Footer: agregar enlace "Proyectos y mayoreo" → `/proyectos` en `src/templates/EcommerceTemplate.tsx` (footer, NO en el menú principal).
6. Verificar con `screenshot-preview` en móvil Y desktop antes de cerrar.

### Preguntas abiertas al dueño (bloquean copy final)
1. ¿Desde cuántas piezas hay precio especial y de cuánto? (o se cotiza caso por caso)
2. ¿Facturan con IVA / CFDI?
3. ¿Plazo real para un pedido de 20–40 piezas?
4. ¿Correo para cotizaciones formales? ¿Política si llega dañado?

## 4. Recent Changes
- **2026-08-13** — 📋 PLAN LANDING B2B `/proyectos`: personas definidos (hotelería boutique, interioristas/arquitectos, corporativo/oficinas, restaurantes/retail, regalo corporativo, desarrolladores). 12 secciones, CTA único WhatsApp + secundario a catálogo, cotizador de 3 pasos sin backend, 6 imágenes B2B a generar. `/personalizados` NO se toca. Pendiente confirmar con el dueño: volumen mínimo, facturación, plazos de lote, política de daño.
- **2026-08-05** — ✅ Reemplazada GIFT_IMAGE en `/personalizados` (sección "Un regalo que nadie más tendrá") por foto real del comedor con el cuadro Plieggo → `.../message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1785956439043-14bbt12y522l.webp`, `object-cover object-center`.
- **2026-07-17** — ✅ DEEP-LINK DE TALLA en `HeadlessProduct.tsx`: `?talla=30x90` (alias `?size=`) preselecciona variante para anuncios Meta.
- **2026-07-16** — 📋 PLAN deep-link de variante por URL (implementado 2026-07-17).
- **2026-07-10** — ✅ /personalizados LISTA: sticky CTA con IntersectionObserver, ancla precio "desde $3,500", FAQ alineado, sección "Un regalo que nadie más tendrá".
- **2026-07-10** — 📋 AUDITORÍA PRE-LANZAMIENTO /personalizados. Precio mínimo confirmado $3,500.
- **2026-07-09** — ✅ LANDING `/personalizados` AJUSTADA: envuelta en `EcommerceTemplate`, agregada al menú, hero = 2º slide home, aspect ratios 4:5.
- **2026-07-09** — ✅ LANDING `/personalizados` CONSTRUIDA (10 secciones, CTA WhatsApp, evento `Lead`).
- **2026-07-09** — ✅ Método `lead()` agregado a `FacebookPixelService`.
- **2026-07-09** — ✅ AJUSTES PERSONALIZACIÓN PDP + CustomSizeCTA reescrito.
- **2026-07-09** — ✅ FEATURE PERSONALIZACIÓN EN PDP (nota selector, CustomSizeCTA, FAQ).
- **2026-07-09** — ✅ FIX foto reseña Mónica A.
- **2026-07-09** — ✅ FIX A + FIX B en StripePayment.tsx (formatMoney + badge MSI).
- **2026-07-09** — ✅ FIX GALERÍA POR VARIANTE en HeadlessProduct.tsx.
- **2026-07-09** — ✅ FIX 404 POST-PAGO: PagoPendiente.tsx + ruta.

## 5. Image Inventory
- **Hero home slide 1**: ...1779301620051-88tz4z58bt7.webp · slide 2 (pared con cuadros): ...1779296069343-2ifge8n87sv.webp · slide 3: hero-paper-folding.mp4
- **Hero landing /personalizados** = slide 2 del home: ...1779296069343-2ifge8n87sv.webp
- **GIFT_IMAGE (regalo /personalizados)**: `.../message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1785956439043-14bbt12y522l.webp` (comedor con cuadro real, subida por el dueño 2026-08-05). Reemplazó a black-dining.webp (deprecada).
- Logo: /public/logo.svg
- **Light-shadow sets**: `src/data/light-shadow-sets.ts`.
- **Fotos lifestyle (índice 1) por producto** (base products/): verde salvia etdkr375s4e · beige sutil 551yd2x4ryw · prisma azul coral 87qtowj61fv · prisma onyx f53ej22pcj · luna llena glo0f69xdqg · luna negra 2n4coxjoz8c · luna azul 19yuabxobu1 · burdeos exq1zzkmnqt · blanco puro u5scxlsp37 · prisma beige-blanco 6gpaobcgtcc.
- **FALTA (B2B):** 0 imágenes de espacios comerciales. Generar las 6 tomas listadas en la sección 3 (lobby hotel, pasillo con serie, recepción oficina, sala de juntas, restaurante nocturno, regalo corporativo).
- **Faltan reseñas (fotos)**: Beige Sutil y Luna Beige — el dueño las subirá.

## 6. Known Issues
- **[PENDIENTE VERIF]** Validar en prod que evento `Lead` dispara al clic en /personalizados (hero, tarjetas, regalo, sticky, CTA final).
- **[PENDIENTE VERIF]** Probar deep-link en prod: `?talla=30x90` abre en 30x90; sin param sigue en 50x50 (Prisma).
- **[CERRADO] Precio botón sin formato** y **Bug correo** (dueño lo deja así).
- **NOTA:** import `CheckoutSecurityBanner` en CheckoutUI.tsx sin uso. Limpiar si se toca.
- **Failed to fetch / manifest pay.google.com**: ruido extensiones. Ignorar.
- **Verificar tarifa de envío Dashboard = $0 todo México**. ⚠️ Para pedidos B2B grandes revisar si $0 sigue siendo rentable.

## 7. Pending / Future Sessions
- **[ALTA]** Construir landing `/proyectos` (plan completo en sección 3). Bloqueado parcialmente por las 4 preguntas al dueño.
- **[ALTA]** Generar las 6 imágenes B2B (lobby hotel, pasillo serie, recepción oficina, sala de juntas, restaurante, regalo corporativo) con `imagegen--generate_image` + `reference_images` reales.
- **[ALTA]** Validar evento Lead en prod (CTAs de /personalizados y después /proyectos).
- **[ALTA]** Validar deep-link `?talla=` en prod antes de lanzar el anuncio.
- **[MEDIA]** Definir esquema de precio por volumen / trade program para interioristas (descuento escalonado tipo 10/15/20%).
- **[BAJA · DUEÑO]** Definir política de garantía concreta. NO inventar. (custom no aplica devolución).
- **[MEDIA · DUEÑO]** Más meses MSI (12/18/24) → ajustar installments_max_plan en Dashboard.
- **[MEDIA]** Verificar tarifa envío Dashboard = $0.
- **[MEDIA]** Dueño subir fotos de reseñas de Beige Sutil y Luna Beige.
- **[MEDIA]** FASE 3 CRO: encuesta exit-intent en /products/ (mobile).