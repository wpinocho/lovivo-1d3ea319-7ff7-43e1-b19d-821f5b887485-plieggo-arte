import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const IMG_STUDIO_1 = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779325504866-5bg4llquutd.webp'
const IMG_STUDIO_2 = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779325504867-4wurhzmqhfg.webp'

const PILLARS = [
  {
    num: '01',
    title: 'Hecho a mano',
    body: 'Cada pieza nace de manos artesanas. Sin maquinaria, sin atajos. Solo papel, paciencia y precisión milimétrica.',
  },
  {
    num: '02',
    title: 'Arte vivo',
    body: 'Nuestros cuadros cambian con la luz natural. Lo que ves al amanecer no es lo mismo que al atardecer.',
  },
  {
    num: '03',
    title: 'Diseño con intención',
    body: 'No hacemos decoración genérica. Cada serie tiene un concepto, una paleta y una geometría pensada.',
  },
]

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <EcommerceTemplate showCart={true}>

      {/* ── 1. HERO SPLIT ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 bg-background order-2 lg:order-1">
          <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-[#C16648] mb-12 block">
            Sobre Plieggo
          </span>

          <blockquote className="font-serif text-[2.6rem] md:text-5xl lg:text-[3rem] leading-[1.12] text-foreground tracking-tight mb-8">
            "El arte es la mentira que nos hace ver la verdad"
          </blockquote>

          <p className="font-body text-sm text-muted-foreground tracking-[0.2em] uppercase">
            — Pablo Picasso
          </p>

          <div className="mt-14 w-10 h-[1px] bg-[#C16648]" />
        </div>

        {/* Image */}
        <div className="relative overflow-hidden h-[65vw] lg:h-auto min-h-[480px] order-1 lg:order-2">
          <img
            src={IMG_STUDIO_1}
            alt="Artesana componiendo piezas de papel — taller Plieggo"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/30 to-transparent lg:hidden" />
        </div>
      </section>

      {/* ── 2. VISIÓN — image left, text right ───────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[80vh]">

        {/* Image */}
        <div className="relative overflow-hidden h-[70vw] lg:h-auto min-h-[500px] order-2 lg:order-1">
          <img
            src={IMG_STUDIO_2}
            alt="Manos plegando papel accordion — proceso artesanal Plieggo"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 bg-background order-1 lg:order-2">
          <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-[#C16648] mb-8 block">
            Nuestra Visión
          </span>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-10 tracking-tight leading-tight">
            Arte que cambia con<br className="hidden lg:block" /> la luz del día
          </h2>

          <div className="space-y-5 font-body text-[1.05rem] text-muted-foreground leading-relaxed">
            <p>
              En <span className="font-semibold text-foreground">Plieggo</span>, creemos que el arte debe ser accesible y transformador. Cada pieza es un pliegue en el tiempo, una exploración de la forma y el espacio a través del papel.
            </p>
            <p>
              Nuestro estilo <span className="font-semibold text-foreground">"Moderno Mexicano"</span> fusiona la precisión arquitectónica con el carácter juguetón del arte contemporáneo. Cada cuadro es hecho a mano en México, celebrando la tradición artesanal con una visión moderna.
            </p>
            <p>
              Los pliegues no son solo decoración — son esculturas que transforman espacios. La luz juega con cada doblez, creando sombras dinámicas que cambian con el día.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PILARES — editorial 3 col ─────────────────────────────── */}
      <section className="py-24 px-8 md:px-0 bg-[#F2EFE4]">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className={`py-14 px-8 ${i !== 2 ? 'md:border-r border-foreground/10' : ''} ${i !== 0 ? 'border-t md:border-t-0' : ''} border-foreground/10`}
              >
                <p className="font-heading text-[10px] tracking-[0.35em] text-[#C16648] mb-7">{p.num}</p>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 tracking-tight">{p.title}</h3>
                <p className="font-body text-[0.95rem] text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROCESO — dark full-width ─────────────────────────────── */}
      <section className="py-32 px-8 bg-[#1B2A41]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-heading text-[10px] tracking-[0.35em] uppercase text-[#C16648] mb-10 block">
            Nuestro Proceso Artesanal
          </span>

          <p className="font-body text-lg md:text-xl text-white/75 leading-relaxed mb-12">
            Cada pieza comienza con papel de alta calidad seleccionado por su textura y capacidad de mantener el pliegue. Los dobleces se realizan a mano con precisión milimétrica, creando geometrías que desafían la percepción. El proceso puede tomar días, pero el resultado es una obra de arte única que captura luz y sombra de forma extraordinaria.
          </p>

          <div className="w-10 h-[1px] bg-[#C16648] mx-auto mb-12" />

          <p className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Es arquitectura en papel,<br /> arte que respira con tu espacio.
          </p>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-background text-center">
        <span className="font-heading text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-6 block">
          Encuentra tu pieza
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-12 tracking-tight">
          Cada cuadro es único.
        </h2>
        <Link
          to="/all-products"
          className="inline-flex items-center gap-3 border border-foreground px-12 py-4 font-heading text-[10px] tracking-[0.25em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Explorar colección
        </Link>
      </section>

    </EcommerceTemplate>
  )
}

export default AboutPage