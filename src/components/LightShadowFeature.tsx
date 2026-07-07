/**
 * LightShadowFeature — Bloque editorial que vende el diferenciador de Plieggo:
 * los pliegues hechos a mano proyectan sombras que cambian con la luz del día.
 *
 * Dos variantes:
 *  - "triptych": 3 fotos reales de la MISMA pieza a distinta hora (mañana/tarde/
 *    atardecer). Solo para best-sellers con set real. Requiere >=2 imágenes.
 *  - "single": UNA sola foto lifestyle + copy honesto del juego de luz y sombra,
 *    SIN prometer "3 momentos". Para el resto del catálogo.
 */

interface LightShadowFeatureProps {
  images?: string[]
  title?: string
  variant?: "triptych" | "single"
}

const CAPTIONS = ["Luz de mañana", "Media tarde", "Al anochecer"]

export const LightShadowFeature = ({
  images = [],
  title,
  variant = "triptych",
}: LightShadowFeatureProps) => {
  if (variant === "single") {
    const shot = images.find(Boolean)
    if (!shot) return null

    return (
      <section aria-label="Juego de luz y sombra" className="scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted/30 order-1 md:order-none">
            <img
              src={shot}
              alt={`${title ?? "Pieza"} — juego de luz y sombra`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C16648] mb-3">
              Arte vivo
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight mb-4">
              Luz y sombra que cobran vida
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Cada pliegue se dobla a mano para atrapar la luz. Según cómo le dé
              el sol a lo largo del día, sus sombras se acortan o se alargan y la
              pieza cambia de carácter.
              {title ? ` ${title} ` : " Tu cuadro "}
              se vuelve un objeto vivo, nunca plano.
            </p>
          </div>
        </div>
      </section>
    )
  }

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