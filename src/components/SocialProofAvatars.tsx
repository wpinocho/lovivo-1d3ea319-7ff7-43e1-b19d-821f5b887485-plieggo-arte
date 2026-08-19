import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { plieggoGeneralReviews } from "@/data/plieggo-general-reviews"
import { BRAND_REVIEW_COUNT } from "@/data/product-reviews"

/**
 * SocialProofAvatars — prueba social compacta justo debajo del CTA.
 *
 * Regla de honestidad: NUNCA fotos de stock de personas. Plieggo es una marca
 * artesanal; una cara de banco de imágenes se detecta y quema la confianza
 * exactamente donde queríamos construirla.
 *
 * Fuente actual (opción A): fotos REALES de clientes con su pieza colgada en
 * su espacio, que ya viven en `plieggoGeneralReviews`.
 * Upgrade futuro (opción B): retratos reales de clientes con permiso — basta
 * con cambiar `AVATAR_SOURCE` sin tocar la PDP.
 */

const AVATAR_SOURCE = plieggoGeneralReviews

/** Redondea a la decena inferior para no prometer de más: 196 → 190 */
const roundedClients = Math.floor((BRAND_REVIEW_COUNT - 1) / 10) * 10

export const SocialProofAvatars = ({ className }: { className?: string }) => {
  const withPhotos = AVATAR_SOURCE.filter((r) => r.photoUrl).slice(0, 3)

  if (withPhotos.length === 0) return null

  const lead = withPhotos[0].author

  return (
    <a
      href="#reviews"
      className={cn(
        "flex items-center gap-3 rounded-xl bg-muted/40 px-3 py-2.5 transition-colors hover:bg-muted/60",
        className,
      )}
      aria-label="Ver las reseñas de clientes de Plieggo"
    >
      {/* Avatares solapados */}
      <div className="flex -space-x-3 shrink-0">
        {withPhotos.map((r) => (
          <img
            key={r.id}
            src={r.photoUrl}
            alt={`${r.product} en casa de ${r.author}`}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
          />
        ))}
      </div>

      {/* Copy */}
      <p className="text-xs leading-snug text-muted-foreground">
        <span className="font-semibold text-foreground">{lead}</span>
        <span className="mx-1 inline-flex h-3.5 w-3.5 -mb-0.5 items-center justify-center rounded-full bg-[#C16648]">
          <Check className="h-2.5 w-2.5 text-background" strokeWidth={3.5} />
        </span>
        y{" "}
        <span className="font-semibold text-foreground">
          +{roundedClients} clientes
        </span>{" "}
        ya colgaron su Plieggo
      </p>
    </a>
  )
}