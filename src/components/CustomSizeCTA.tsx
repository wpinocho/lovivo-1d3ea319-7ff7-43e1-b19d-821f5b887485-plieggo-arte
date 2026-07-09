import { Ruler, MessageCircle } from "lucide-react"

/**
 * EDITABLE UI COMPONENT - CustomSizeCTA
 *
 * Mini-sección "Hecho a tu medida" para la PDP.
 * Comunica que las medidas del sitio son estándar pero se pueden
 * ajustar tamaño y color — flujo atendido por WhatsApp.
 * Objeción #1 (¿me queda en mi pared?) → lead a WhatsApp.
 */

const WHATSAPP_URL =
  "https://wa.me/525531215386?text=%C2%A1Hola!%20Vi%20un%20cuadro%20de%20Plieggo%20y%20lo%20quiero%20en%20otra%20medida.%20%C2%BFMe%20ayudan%20a%20cotizarlo%3F"

export const CustomSizeCTA = () => {
  return (
    <section className="max-w-2xl mx-auto text-center px-4">
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#C16648]/30">
          <Ruler className="h-5 w-5 text-[#C16648]" />
        </span>
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-[#C16648] mb-3">
        Hecho a tu medida
      </p>

      <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-4">
        ¿No queda en tu pared? La ajustamos a tu espacio
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-6">
        Las medidas de la tienda son nuestras <span className="font-medium text-foreground">estándar</span>,
        pero cada pieza se hace a mano y podemos cambiar el
        <span className="font-medium text-foreground"> tamaño y el color</span> para tu espacio.
      </p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border border-[#C16648] text-[#C16648] text-sm font-medium tracking-wide transition-colors hover:bg-[#C16648] hover:text-white"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        Diséñalo a tu medida por WhatsApp
      </a>
    </section>
  )
}