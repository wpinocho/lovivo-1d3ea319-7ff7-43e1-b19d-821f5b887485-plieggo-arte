import { useEffect, useRef, useState } from 'react'
import {
  MessageCircle,
  Palette,
  Ruler,
  Sparkles,
  Hand,
  Truck,
  Star,
  Check,
  Gift,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { plieggoGeneralReviews, getInitials } from '@/data/plieggo-general-reviews'
import { facebookPixel } from '@/lib/facebook-pixel'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

/* ─────────────────────────────────────────────────────────
   LANDING CUADROS PERSONALIZADOS — Tráfico frío Meta Ads
   CTA único = WhatsApp (evento Lead). Mobile-first (96% móvil).
   ───────────────────────────────────────────────────────── */

const PHONE = '525531215386'
const IMG = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/products/'
const HERO_IMAGE =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp'
const GIFT_IMAGE =
  'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/black-dining.webp'

const STYLES = [
  {
    name: 'Acordeón',
    desc: 'Pliegues que juegan con la luz. Tu color, tu medida.',
    image: `${IMG}etdkr375s4e.webp`,
  },
  {
    name: 'Acordeón Prisma',
    desc: 'Dos colores en un mismo pliegue. Elígelos a tu gusto.',
    image: `${IMG}87qtowj61fv.webp`,
  },
  {
    name: 'Luna',
    desc: 'Textura mineral y relieve. Personalízala para tu pared.',
    image: `${IMG}glo0f69xdqg.webp`,
  },
]

const GALLERY = [
  { src: `${IMG}551yd2x4ryw.webp`, alt: 'Cuadro Acordeón beige en sala' },
  { src: `${IMG}2n4coxjoz8c.webp`, alt: 'Cuadro Luna negra decorativo' },
  { src: `${IMG}exq1zzkmnqt.webp`, alt: 'Cuadro Acordeón burdeos en pared' },
  { src: `${IMG}19yuabxobu1.webp`, alt: 'Cuadro Luna azul con textura mineral' },
  { src: `${IMG}f53ej22pcj.webp`, alt: 'Cuadro Acordeón Prisma onyx' },
  { src: `${IMG}u5scxlsp37.webp`, alt: 'Cuadro Acordeón blanco escultural' },
]

const REVIEWS = plieggoGeneralReviews.filter((r) =>
  ['g4', 'g10', 'g12'].includes(r.id)
)

const STEPS = [
  {
    icon: Palette,
    title: 'Elige un estilo',
    desc: 'Acordeón, Acordeón Prisma o Luna. Tú decides la personalidad.',
  },
  {
    icon: Sparkles,
    title: 'Elige tu color',
    desc: 'Lo adaptamos a la paleta de tu espacio para que combine perfecto.',
  },
  {
    icon: Ruler,
    title: 'Elige tu tamaño',
    desc: 'Ajustamos la medida a tu pared, del tamaño que necesites.',
  },
]

const PROCESS = [
  {
    step: '1',
    title: 'Escríbenos por WhatsApp',
    desc: 'Cuéntanos el estilo, el color y el espacio que quieres vestir.',
  },
  {
    step: '2',
    title: 'Te asesoramos y cotizamos',
    desc: 'Definimos juntos los detalles y te damos el precio exacto.',
  },
  {
    step: '3',
    title: 'La hacemos a mano',
    desc: 'La creamos pieza por pieza y te llega en 5–7 días con envío gratis.',
  },
]

const FAQS = [
  {
    q: '¿Qué puedo personalizar?',
    a: 'El color y el tamaño de cualquiera de nuestros estilos: Acordeón, Acordeón Prisma o Luna. La creamos a tu medida.',
  },
  {
    q: '¿Cuánto tarda?',
    a: '5 a 7 días hábiles. Cada pieza se dobla y arma a mano especialmente para ti.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Desde $3,500. Te damos el precio exacto por WhatsApp según el estilo, color y tamaño que elijas.',
  },
  {
    q: '¿Hacen envíos?',
    a: 'Sí, envío gratis a todo México. El cuadro llega enmarcado y listo para colgar.',
  },
  {
    q: '¿Hay límite de tamaño?',
    a: 'Trabajamos varios tamaños para adaptarnos a tu pared. Cuéntanos tu medida por WhatsApp y te decimos la mejor opción.',
  },
]

const Personalizados = () => {
  const heroCtaRef = useRef<HTMLButtonElement>(null)
  const [showSticky, setShowSticky] = useState(false)

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
    document.title = 'Cuadros personalizados a tu color y medida | Plieggo'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Arte en papel hecho a mano, personalizado en tu color y tu medida. Elige tu estilo y escríbenos por WhatsApp. Envío gratis a todo México.'
      )
    }
  }, [])

  const handleWhatsAppLead = (styleName?: string) => {
    // Dispara el evento Lead de Meta para optimizar el anuncio
    facebookPixel.lead({
      content_name: styleName ? `cuadro-personalizado-${styleName}` : 'cuadro-personalizado',
      content_category: 'personalizados',
    })

    const base = styleName
      ? `¡Hola! Vi su anuncio de cuadros personalizados y quiero cotizar un cuadro estilo ${styleName} en mi color y medida. ¿Me ayudan?`
      : '¡Hola! Vi su anuncio de cuadros personalizados y quiero cotizar uno en mi color y medida. ¿Me ayudan?'

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(base)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <EcommerceTemplate showCart={true} layout="full-width">
      <div className="pb-20 lg:pb-0">
      {/* ─── HERO ─── */}
      <section className="relative flex items-end overflow-hidden" style={{ height: 'clamp(460px, 82vh, 640px)' }}>
        <img
          src={HERO_IMAGE}
          alt="Cuadro Plieggo personalizado en un espacio"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 pb-9 md:pb-14 max-w-3xl">
          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-body text-xs text-primary-foreground/90 ml-1">4.8 · +196 reseñas</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-[1.1] tracking-tight mb-3">
            Tu cuadro, en tu color<br className="hidden sm:block" /> y tu medida
          </h1>

          <p className="font-body text-base sm:text-lg text-primary-foreground/85 mb-5 max-w-md">
            Arte en papel hecho a mano, personalizado para tu espacio.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-primary-foreground/85">
            {['Hecho a mano', 'Envío gratis', 'Listo para colgar'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm">
                <Check className="w-3.5 h-3.5 text-primary-foreground" /> {t}
              </span>
            ))}
          </div>

          <p className="font-body text-xs sm:text-sm text-primary-foreground/70 mb-6">
            Piezas personalizadas desde $3,500 MXN · a tu color y medida
          </p>

          <button
            ref={heroCtaRef}
            onClick={() => handleWhatsAppLead()}
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            Personaliza el tuyo por WhatsApp
          </button>
        </div>
      </section>

      {/* ─── QUÉ PERSONALIZAMOS (3 pasos) ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">Fácil y a tu gusto</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              Lo hacemos como lo imaginas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1.5">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[16rem]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ESTILOS DISPONIBLES ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
              Elige tu estilo favorito
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
              Personalizamos cualquiera de nuestros estilos en el color y tamaño que quieras.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
            {STYLES.map((style) => (
              <div key={style.name} className="group flex flex-col">
                <div className="rounded-sm overflow-hidden aspect-[4/5] mb-4">
                  <img
                    src={style.image}
                    alt={`Estilo ${style.name} Plieggo`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-1">{style.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{style.desc}</p>
                <button
                  onClick={() => handleWhatsAppLead(style.name)}
                  className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-primary hover:gap-3 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Personalizar {style.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERÍA LIFESTYLE ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
              Piezas que transforman una pared
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
              Así se ven en casas reales. La tuya, en el color y tamaño que elijas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((img) => (
              <div key={img.src} className="rounded-sm overflow-hidden aspect-[4/5]">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTE QUE CAMBIA CON LA LUZ ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-sm overflow-hidden aspect-[4/5] order-2 lg:order-1">
            <img
              src={`${IMG}etdkr375s4e.webp`}
              alt="Detalle de los pliegues de un cuadro Plieggo"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-body text-xs uppercase tracking-widest text-secondary-foreground/70 mb-4">
              Lo que hace único tu cuadro
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-5">
              Arte que cambia con la luz
            </h2>
            <p className="font-body text-base md:text-lg leading-relaxed text-secondary-foreground/85 mb-6">
              Los pliegues atrapan la luz a lo largo del día. En la mañana proyecta unas sombras;
              por la tarde, otras. Tu cuadro nunca se ve igual dos veces: es una pieza viva en tu pared.
            </p>
            <ul className="space-y-3">
              {['Doblado a mano, pieza única', 'Papel libre de ácidos que dura décadas', 'Llega enmarcado y listo para colgar'].map((t) => (
                <li key={t} className="flex items-start gap-2.5 font-body text-sm md:text-base">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-secondary-foreground" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── ARTE PARA REGALO ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="rounded-sm overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
            <img
              src={GIFT_IMAGE}
              alt="Cuadro Plieggo personalizado como regalo en un comedor"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
              Un regalo inolvidable
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-5">
              Un regalo que nadie más tendrá
            </h2>
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-md">
              Una pieza única, hecha a mano en el color favorito de quien más quieres.
              Imposible de repetir y hecha para durar años en su pared.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Único e irrepetible, en su color favorito',
                'Empaque premium incluido',
                'Dedicatoria personalizada gratis',
                'Envío gratis en 5–7 días hábiles',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 font-body text-sm md:text-base text-foreground">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleWhatsAppLead('regalo')}
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-7 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Cotiza tu regalo por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-xs uppercase tracking-widest text-primary text-center mb-3">
            Clientes felices
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
            Lo que dicen de sus cuadros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-muted/40 rounded-sm border border-border/50 p-5 flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed mb-4 flex-1">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  {review.photoUrl ? (
                    <img src={review.photoUrl} alt={review.author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-xs font-bold text-primary">{getInitials(review.author)}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{review.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESO POR WHATSAPP ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
              Así de fácil es pedir el tuyo
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
              Todo empieza con un mensaje. Nosotros te guiamos en cada paso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {PROCESS.map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1.5">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[16rem] mx-auto">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-12">
            {[
              { icon: Hand, t: 'Hecho a mano en México' },
              { icon: Truck, t: 'Envío gratis a todo el país' },
              { icon: Gift, t: 'Regalo con carácter' },
            ].map((b) => (
              <span key={b.t} className="inline-flex items-center gap-2 font-body text-sm text-foreground">
                <b.icon className="w-4 h-4 text-primary" strokeWidth={1.5} /> {b.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
            Preguntas frecuentes
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
            Empecemos tu cuadro
          </h2>
          <p className="font-body text-base md:text-lg text-secondary-foreground/85 mb-8">
            Cuéntanos tu estilo, color y medida. Te asesoramos y cotizamos sin compromiso.
          </p>
          <button
            onClick={() => handleWhatsAppLead()}
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-base px-8 py-4 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            Personaliza el tuyo por WhatsApp
          </button>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA (aparece al scrollear, cuando el botón del hero sale de vista) ─── */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border/60 px-4 py-3 transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={() => handleWhatsAppLead()}
          className="inline-flex items-center justify-center gap-2 w-full font-heading font-semibold text-base px-6 py-3.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Personaliza el tuyo por WhatsApp
        </button>
      </div>
      </div>
    </EcommerceTemplate>
  )
}

export default Personalizados