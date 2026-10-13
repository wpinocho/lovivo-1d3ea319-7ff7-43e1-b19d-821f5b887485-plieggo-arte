import { useEffect } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { RotateCcw, Package, Banknote, Ruler } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/525554588525?text=' +
  encodeURIComponent('¡Hola! Quiero devolver mi pieza de Plieggo. Mi número de pedido es: ')

const STEPS = [
  {
    icon: RotateCcw,
    title: 'Avísanos',
    text: 'Escríbenos por WhatsApp con tu número de pedido dentro de los 30 días después de recibir tu pieza.',
  },
  {
    icon: Package,
    title: 'Entréganos la pieza',
    text: 'Te compartimos la dirección de nuestro almacén y tú pasas a dejarla. Te pedimos que esté en buen estado y, si puedes, en su empaque original.',
  },
  {
    icon: Banknote,
    title: 'Te devolvemos tu dinero',
    text: 'En cuanto la recibimos, te reembolsamos el total de lo que pagaste. Sin costo y sin preguntas.',
  },
]

const PoliticaDevolucion = () => {
  useEffect(() => {
    document.title = 'Política de devolución | Plieggo'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute(
      'content',
      'Tienes 30 días después de recibir tu pieza Plieggo para devolverla sin costo. Aplica para piezas no personalizadas.'
    )
  }, [])

  return (
    <EcommerceTemplate>
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <header className="mb-12">
          <p className="font-body text-sm uppercase tracking-widest text-primary mb-3">
            Política de devolución
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            30 días para enamorarte
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Una pieza así hay que verla en tu pared, con tu luz. Si en 30 días no te convence, la puedes
            devolver gratis.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-6">Cómo funciona</h2>
          <ol className="space-y-6">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {i + 1}. {title}
                  </h3>
                  <p className="font-body text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12 rounded-sm border border-border/60 p-6">
          <div className="flex gap-4">
            <Ruler className="h-5 w-5 shrink-0 text-primary mt-1" aria-hidden="true" />
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
                Piezas personalizadas
              </h2>
              <p className="font-body text-muted-foreground">
                Las piezas hechas a tu medida o color no tienen devolución. Por eso aprobamos cada detalle
                contigo antes de empezar a plegarla.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">En resumen</h2>
          <ul className="font-body text-muted-foreground space-y-2 list-disc pl-5">
            <li>Tienes 30 días a partir de que recibes tu pieza.</li>
            <li>Aplica para todas las piezas que no son personalizadas.</li>
            <li>Tú la llevas a nuestro almacén; la devolución no tiene ningún costo.</li>
            <li>Te reembolsamos el 100% de lo que pagaste.</li>
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Iniciar una devolución por WhatsApp
          </a>
        </section>
      </article>
    </EcommerceTemplate>
  )
}

export default PoliticaDevolucion