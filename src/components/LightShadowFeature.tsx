/**
 * LightShadowFeature — Bloque editorial que vende el diferenciador de Plieggo:
 * los pliegues hechos a mano proyectan sombras que cambian con la luz del día.
 * Usa las fotos reales de la pieza para mostrar el efecto en contexto.
 */

interface LightShadowFeatureProps {
  images?: string[]
  title?: string
}

const CAPTIONS = ["Luz de mañana", "Media tarde", "Al anochecer"]

export const LightShadowFeature = ({ images = [], title }: LightShadowFeatureProps) => {
  // Tomamos hasta 3 imágenes distintas de la pieza
  const shots = Array.from(new Set(images)).slice(0, 3)
  if (shots.length < 2) return null

  return (
    <section aria-label="Juego de luz y sombra" className="scroll-mt-24">
      <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C16648] mb-3">
          Arte vivo
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight mb-3">
          La misma pieza, distinta a cada hora
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Cada pliegue se dobla a mano para atrapar la luz. Por la mañana la pieza
          vibra; al atardecer sus sombras se alargan y se vuelve íntima.
          {title ? ` ${title} ` : " Tu cuadro "}
          nunca se ve igual dos veces.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {shots.map((img, i) => (
          <figure key={i} className="space-y-2 md:space-y-3">
            <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted/30">
              <img
                src={img}
                alt={`${title ?? "Pieza"} — ${CAPTIONS[i] ?? "detalle"}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-[11px] md:text-xs text-center uppercase tracking-wider text-muted-foreground">
              {CAPTIONS[i] ?? "Detalle"}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}