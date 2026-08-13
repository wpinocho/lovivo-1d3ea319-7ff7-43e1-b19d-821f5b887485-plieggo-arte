import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Star,
  Check,
  Mail,
  ArrowRight,
  Hotel,
  Building2,
  UtensilsCrossed,
  Compass,
  Gift,
  FileText,
  Truck,
  Ruler,
  Package,
  Hammer,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { plieggoGeneralReviews, getInitials } from '@/data/plieggo-general-reviews'
import { facebookPixel } from '@/lib/facebook-pixel'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

/* ─────────────────────────────────────────────────────────
   LANDING B2B — /proyectos (alias /b2b)
   Público: hoteles boutique, interiorismo, corporativo,
   restaurantes y regalo corporativo.
   CTA único = WhatsApp (evento Lead, category 'b2b').
   CTA secundario = catálogo. Mobile-first + desktop cuidado.
   ───────────────────────────────────────────────────────── */

const PHONE = '525531215386'
const EMAIL = 'julian.ruiz.loza@gmail.com'
const IMG =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/'
const MSG =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/'

/* ── IMÁGENES ──────────────────────────────────────────────
   Material B2B definitivo (espacios comerciales).
   Único pendiente: GIFT_IMAGE (regalo corporativo).
   ───────────────────────────────────────────────────────── */
const HERO_IMAGE = `${MSG}1786658786579-tv4ym4zokz.webp` // B2B-1: lobby de hotel boutique
const GIFT_IMAGE = `${MSG}1785956439043-14bbt12y522l.webp` // TODO B2B-6: cajas de regalo corporativo
const DETAIL_IMAGE = `${IMG}etdkr375s4e.webp` // detalle de pliegues (sirve tal cual)

const SEGMENTS = [
  {
    icon: Hotel,
    name: 'Hoteles y hospedaje boutique',
    desc: 'Cada habitación con su propia pieza. Ninguna se repite.',
    waLabel: 'hoteles',
  },
  {
    icon: Building2,
    name: 'Oficinas y corporativo',
    desc: 'Recepciones y salas de juntas con un punto focal que se ve caro.',
    waLabel: 'oficinas',
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurantes y retail',
    desc: 'Un muro con textura que tus clientes quieren fotografiar.',
    waLabel: 'restaurantes',
  },
  {
    icon: Compass,
    name: 'Interiorismo y arquitectura',
    desc: 'Color y medida al moodboard. Precio preferencial para tu despacho.',
    waLabel: 'interiorismo',
  },
]

const REASONS = [
  {
    title: 'Ninguna pieza se repite',
    desc: 'Doblada a mano una por una. Cada habitación tiene la suya.',
  },
  {
    title: 'Cambia con la luz del día',
    desc: 'La sombra de los pliegues se mueve. El muro nunca sale igual en dos fotos.',
  },
  {
    title: 'Ligera y sin cristal',
    desc: 'Se instala y se transporta sin riesgo, incluso en volumen.',
  },
  {
    title: 'Papel libre de ácidos',
    desc: 'Mantiene el color por décadas. No amarillea con el tiempo.',
  },
]

const PROCESS = [
  {
    icon: MessageCircle,
    step: '1',
    title: 'Cuéntanos el proyecto',
    desc: 'Espacio, cantidad de piezas, medidas y fecha en la que las necesitas.',
  },
  {
    icon: Ruler,
    step: '2',
    title: 'Propuesta y cotización',
    desc: 'Te mandamos estilos, colores, precio por volumen y fecha de entrega por escrito.',
  },
  {
    icon: Hammer,
    step: '3',
    title: 'Producción en taller',
    desc: 'Doblamos y enmarcamos tu lote en México, con seguimiento por WhatsApp.',
  },
  {
    icon: Package,
    step: '4',
    title: 'Entrega lista para colgar',
    desc: 'Llegan enmarcadas y embaladas. Envío gratis a todo el país.',
  },
]

const STYLES = [
  {
    name: 'Acordeón',
    desc: 'El más pedido para lobbies y pasillos. Pliegue vertical, presencia sin gritar.',
    image: `${IMG}etdkr375s4e.webp`,
  },
  {
    name: 'Acordeón Prisma',
    desc: 'Dos colores en un mismo pliegue. Ideal para amarrar la paleta del proyecto.',
    image: `${IMG}87qtowj61fv.webp`,
  },
  {
    name: 'Luna',
    desc: 'Relieve mineral y formato circular. Funciona en recepciones y muros cortos.',
    image: `${IMG}glo0f69xdqg.webp`,
  },
]

const GALLERY = [
  {
    src: `${MSG}1786658786579-ckqrb8e8t9o.webp`,
    alt: 'Serie de tres cuadros Plieggo en distinto color en el pasillo de un hotel boutique',
  },
  {
    src: `${MSG}1786658786579-6h8j8g0ewdc.webp`,
    alt: 'Cuadro Luna sobre la recepción de una oficina corporativa',
  },
  {
    src: `${MSG}1786658786579-7h75oomjxf.webp`,
    alt: 'Cuadro Acordeón azul medianoche en la sala de juntas de un despacho',
  },
  {
    src: `${MSG}1786658786579-hqtofonof9o.webp`,
    alt: 'Cuadro Acordeón burdeos iluminado en un restaurante de diseño de noche',
  },
  { src: `${IMG}u5scxlsp37.webp`, alt: 'Cuadro Acordeón blanco escultural en muro neutro' },
  { src: `${IMG}f53ej22pcj.webp`, alt: 'Cuadro Acordeón Prisma onyx en pared oscura' },
]

const REVIEWS = plieggoGeneralReviews.filter((r) => ['g1', 'g6', 'g8'].includes(r.id))

const FAQS = [
  {
    q: '¿Desde cuántas piezas hay precio especial?',
    a: 'Desde 5 piezas aplicamos precio preferencial. El descuento exacto depende del estilo, la medida y el volumen total: te lo damos en la cotización, sin compromiso.',
  },
  {
    q: '¿Pueden hacer la medida exacta de mi muro?',
    a: 'Sí. Trabajamos medidas a proyecto. Hasta aproximadamente 100 × 70 cm usamos opalina; arriba de esa medida cambiamos a lino para mantener la rigidez. Mándanos las medidas por WhatsApp y te decimos la mejor opción.',
  },
  {
    q: '¿Manejan mi paleta de color?',
    a: 'Trabajamos dentro de la carta de color de nuestro proveedor de papel. Mándanos tu pantone o el código de tu moodboard y te confirmamos el más cercano con una foto real antes de producir.',
  },
  {
    q: '¿Cuánto tardan en un pedido grande?',
    a: 'Las piezas estándar salen en 5 a 7 días hábiles. Para pedidos por lote definimos la fecha contigo desde el brief y queda por escrito en la cotización: si tienes una fecha de apertura o de entrega, la trabajamos hacia atrás.',
  },
  {
    q: '¿Dan factura?',
    a: 'Sí, facturamos con IVA. Mándanos tu constancia de situación fiscal y emitimos el CFDI del pedido.',
  },
  {
    q: '¿Envían a todo el país?',
    a: 'Sí, envío gratis a todo México. Las piezas llegan enmarcadas, embaladas y listas para colgar, sin cristal que se pueda romper en el traslado.',
  },
  {
    q: '¿Puedo pedir una pieza de muestra antes del pedido grande?',
    a: 'Sí, y es lo que recomendamos. Puedes comprar una pieza del catálogo para validar acabado y color, y a partir de ahí armamos el lote.',
  },
  {
    q: '¿Trabajan con interioristas y despachos?',
    a: 'Sí. Si especificas Plieggo en varios proyectos al año, te damos precio preferencial y contacto directo con el taller. Escríbenos y lo definimos.',
  },
]

const SPACE_OPTIONS = [
  'Hotel u hospedaje',
  'Oficina o corporativo',
  'Restaurante, café o bar',
  'Retail o showroom',
  'Proyecto de interiorismo',
  'Regalo corporativo',
  'Otro',
]

const QTY_OPTIONS = ['1 a 5 piezas', '6 a 15 piezas', '16 a 40 piezas', 'Más de 40 piezas']

const Proyectos = () => {
  const heroCtaRef = useRef<HTMLButtonElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [espacio, setEspacio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [ciudad, setCiudad] = useState('')

  useEffect(() => {
    const el = heroCtaRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Arte en papel para hoteles, oficinas y proyectos | Plieggo'

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Cuadros de papel hechos a mano para hoteles boutique, oficinas y restaurantes. Color y medida a proyecto, precio preferencial desde 5 piezas, factura y envío gratis a todo México.'
      )
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const prevCanonical = canonical?.getAttribute('href') || null
    if (canonical) canonical.setAttribute('href', 'https://plieggo.com/proyectos')

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'proyectos-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    document.head.appendChild(script)

    return () => {
      document.getElementById('proyectos-jsonld')?.remove()
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical)
    }
  }, [])

  const openWhatsApp = (origin: string, text: string) => {
    facebookPixel.lead({
      content_name: `b2b-${origin}`,
      content_category: 'b2b',
    })
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleQuote = () => {
    const text =
      'Hola Plieggo, quiero cotizar un proyecto.\n\n' +
      `• Espacio: ${espacio || 'Por definir'}\n` +
      `• Cantidad: ${cantidad || 'Por definir'}\n` +
      `• Ciudad: ${ciudad.trim() || 'Por definir'}\n\n` +
      '¿Me pueden dar precio y tiempos de entrega?'
    openWhatsApp('cotizador', text)
  }

  return (
    <EcommerceTemplate showCart={true} layout="full-width">
      <div className="pb-20 lg:pb-0">
        {/* ─── HERO ─── */}
        <section
          className="relative flex items-end overflow-hidden"
          style={{ height: 'clamp(520px, 88vh, 700px)' }}
        >
          <img
            src={HERO_IMAGE}
            alt="Cuadro de papel Plieggo hecho a mano en el lobby de un hotel boutique"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />

          <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 pb-10 md:pb-16 max-w-4xl">
            <p className="font-body text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
              Proyectos y volumen
            </p>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.05] tracking-tight mb-4">
              Arte hecho a mano para hoteles,
              <br className="hidden md:block" /> oficinas y proyectos de diseño
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-primary-foreground/85 mb-6 max-w-xl leading-relaxed">
              Piezas únicas en papel, en el color y la medida de tu proyecto.
              Producción coordinada y envío a todo México.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-7 text-primary-foreground/85">
              {[
                'Precio preferencial desde 5 piezas',
                'Color y medida a proyecto',
                'Factura con IVA',
                'Envío gratis a todo México',
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm"
                >
                  <Check className="w-3.5 h-3.5 flex-shrink-0" /> {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                ref={heroCtaRef}
                onClick={() =>
                  openWhatsApp(
                    'hero',
                    'Hola Plieggo, quiero cotizar arte para un proyecto. ¿Me ayudan con precio y tiempos?'
                  )
                }
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar mi proyecto por WhatsApp
              </button>

              <Link
                to="/all-products?ref=b2b"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-body text-xs text-primary-foreground/80 ml-1">
                4.8 · 196 reseñas de clientes
              </span>
            </div>
          </div>
        </section>

        {/* ─── PARA QUIÉN ES ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                Para quién es
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Espacios que no pueden verse como todos
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Si compras arte para un espacio comercial, el problema es el mismo:
                lo que hay en catálogo lo tiene todo el mundo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {SEGMENTS.map((s) => (
                <button
                  key={s.name}
                  onClick={() =>
                    openWhatsApp(
                      s.waLabel,
                      `Hola Plieggo, busco arte para ${s.name.toLowerCase()}. ¿Me pueden cotizar?`
                    )
                  }
                  className="group text-left bg-muted/40 border border-border/60 rounded-sm p-6 hover:border-primary/50 hover:bg-muted/70 transition-colors flex flex-col"
                >
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-5">
                    <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 leading-snug">
                    {s.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {s.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-primary group-hover:gap-2.5 transition-all">
                    Cotizar
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── POR QUÉ FUNCIONA ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="rounded-sm overflow-hidden aspect-[4/5] order-2 lg:order-1">
              <img
                src={DETAIL_IMAGE}
                alt="Detalle de los pliegues hechos a mano de una pieza Plieggo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-body text-xs uppercase tracking-widest text-secondary-foreground/70 mb-4">
                Por qué funciona en espacios comerciales
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-8">
                No es un póster. Es una pieza que la gente toca con la mirada.
              </h2>

              <ul className="space-y-6">
                {REASONS.map((r) => (
                  <li key={r.title} className="flex items-start gap-3.5">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary-foreground" />
                    <div>
                      <p className="font-heading font-semibold text-base md:text-lg mb-1">
                        {r.title}
                      </p>
                      <p className="font-body text-sm md:text-base text-secondary-foreground/80 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── COTIZADOR RÁPIDO ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                Cotización sin compromiso
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Arma tu cotización en 30 segundos
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Tres datos y te respondemos por WhatsApp con precio, estilos y fecha de entrega.
              </p>
            </div>

            <div className="bg-muted/40 border border-border/60 rounded-sm p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block font-heading text-sm font-semibold text-foreground mb-2">
                    Tipo de espacio
                  </label>
                  <Select value={espacio} onValueChange={setEspacio}>
                    <SelectTrigger className="font-body bg-background">
                      <SelectValue placeholder="Elige uno" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPACE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o} className="font-body">
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-heading text-sm font-semibold text-foreground mb-2">
                    Cantidad aproximada
                  </label>
                  <Select value={cantidad} onValueChange={setCantidad}>
                    <SelectTrigger className="font-body bg-background">
                      <SelectValue placeholder="Elige una" />
                    </SelectTrigger>
                    <SelectContent>
                      {QTY_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o} className="font-body">
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-heading text-sm font-semibold text-foreground mb-2">
                    Ciudad
                  </label>
                  <Input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej. Ciudad de México"
                    className="font-body bg-background"
                  />
                </div>
              </div>

              <button
                onClick={handleQuote}
                className="inline-flex items-center justify-center gap-2 w-full font-heading font-semibold text-base px-7 py-4 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </button>

              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                Respondemos el mismo día hábil. También puedes escribirnos a{' '}
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Cotización de proyecto — Plieggo')}`}
                  className="text-primary underline underline-offset-2"
                >
                  {EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ─── CÓMO TRABAJAMOS ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                Cómo trabajamos
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Del brief al muro, en cuatro pasos
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Un solo contacto durante todo el proyecto. Sin intermediarios ni cadenas de correos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS.map((p) => (
                <div key={p.step} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg flex items-center justify-center flex-shrink-0">
                      {p.step}
                    </div>
                    <p.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-12 pt-10 border-t border-border/60">
              {[
                { icon: FileText, t: 'Facturamos con IVA' },
                { icon: Truck, t: 'Envío gratis a todo México' },
                { icon: Package, t: 'Llegan listas para colgar' },
              ].map((b) => (
                <span
                  key={b.t}
                  className="inline-flex items-center gap-2 font-body text-sm text-foreground"
                >
                  <b.icon className="w-4 h-4 text-primary" strokeWidth={1.5} /> {b.t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALERÍA ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Así se ven instaladas
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Mismo lenguaje, distintos colores y medidas. Coordinamos series completas para tu
                proyecto.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {GALLERY.map((img) => (
                <div key={img.src} className="rounded-sm overflow-hidden aspect-[4/5]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── REGALO CORPORATIVO ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="rounded-sm overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={GIFT_IMAGE}
                alt="Pieza Plieggo hecha a mano como regalo corporativo"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div>
              <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                Regalo corporativo
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-5">
                El regalo que no se queda en el cajón
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-md">
                Tus clientes ya recibieron vino y canastas. Una pieza hecha a mano se cuelga en su
                oficina y sigue ahí el año siguiente, con tu marca detrás.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Pieza única por persona, ninguna igual',
                  'Empaque premium y dedicatoria incluidos',
                  'Producción y entrega coordinadas a tu fecha',
                  'Factura con IVA y envío gratis a todo México',
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2.5 font-body text-sm md:text-base text-foreground"
                  >
                    <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  openWhatsApp(
                    'regalo-corporativo',
                    'Hola Plieggo, quiero cotizar regalos corporativos. ¿Me pasan precios por volumen y tiempos?'
                  )
                }
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
              >
                <Gift className="w-5 h-5" />
                Cotizar regalos corporativos
              </button>
            </div>
          </div>
        </section>

        {/* ─── ESTILOS ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Tres estilos, tu color y tu medida
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Elegimos juntos el estilo y lo producimos en la paleta y el tamaño que pide tu
                espacio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
              {STYLES.map((style) => (
                <div key={style.name} className="group flex flex-col">
                  <div className="rounded-sm overflow-hidden aspect-[4/5] mb-4">
                    <img
                      src={style.image}
                      alt={`Estilo ${style.name} de Plieggo para proyectos`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                    {style.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {style.desc}
                  </p>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        `estilo-${style.name.toLowerCase().replace(/\s+/g, '-')}`,
                        `Hola Plieggo, me interesa el estilo ${style.name} para un proyecto. ¿Me cotizan por volumen?`
                      )
                    }
                    className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-primary hover:gap-3 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Cotizar {style.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/all-products?ref=b2b"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Ver catálogo completo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PRUEBA SOCIAL ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-body text-sm text-muted-foreground ml-1">
                  4.8 · 196 reseñas de clientes
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Ya cuelgan en cientos de paredes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="bg-background rounded-sm border border-border/60 p-5 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-foreground leading-relaxed mb-4 flex-1">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    {review.photoUrl ? (
                      <img
                        src={review.photoUrl}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-xs font-bold text-primary">
                          {getInitials(review.author)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {review.author}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">{review.product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
              Preguntas de compradores
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="font-heading font-semibold text-left text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-3">
              Cuéntanos tu proyecto
            </h2>
            <p className="font-body text-base md:text-lg text-secondary-foreground/85 mb-8 leading-relaxed">
              Mándanos las medidas, la cantidad y la fecha en la que lo necesitas. Te respondemos
              con propuesta y precio, sin compromiso.
            </p>

            <button
              onClick={() =>
                openWhatsApp(
                  'cta-final',
                  'Hola Plieggo, quiero cotizar arte para un proyecto. ¿Me ayudan con precio y tiempos?'
                )
              }
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-8 py-4 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </button>

            <p className="font-body text-sm text-secondary-foreground/75 mt-6">
              ¿Necesitas cotización formal por correo?{' '}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('Cotización de proyecto — Plieggo')}`}
                className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-secondary-foreground"
              >
                <Mail className="w-3.5 h-3.5" />
                {EMAIL}
              </a>
            </p>
          </div>
        </section>

        {/* ─── STICKY MOBILE CTA ─── */}
        <div
          className={`fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border/60 px-4 py-3 transition-transform duration-300 ${
            showSticky ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={() =>
              openWhatsApp(
                'sticky',
                'Hola Plieggo, quiero cotizar arte para un proyecto. ¿Me ayudan con precio y tiempos?'
              )
            }
            className="inline-flex items-center justify-center gap-2 w-full font-heading font-semibold text-base px-6 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Cotizar mi proyecto
          </button>
        </div>
      </div>
    </EcommerceTemplate>
  )
}

export default Proyectos