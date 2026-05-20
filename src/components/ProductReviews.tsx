import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getProductReview } from "@/data/product-reviews"
import { getProductReviewsContent, type Review } from "@/data/product-reviews-content"
import {
  plieggoGeneralReviews,
  getInitials,
  type GeneralReview,
} from "@/data/plieggo-general-reviews"

/* ── Helpers ─────────────────────────────────────────────── */

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number
  size?: "sm" | "md" | "lg"
}) {
  const cls = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-6 w-6" }[size]
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={cn(
            cls,
            s <= Math.round(rating) ? "text-amber-500" : "text-muted-foreground/25"
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
  })
}

/* ── Review Card — producto específico ───────────────────── */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/35 transition-colors overflow-hidden">
      {/* Foto del cliente — ocupa todo el ancho, buen tamaño */}
      {review.photoUrl && (
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={review.photoUrl}
            alt={`Foto de ${review.author}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium leading-tight">{review.author}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{formatDate(review.date)}</p>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Comment */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
          "{review.comment}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          {review.verified && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Compra verificada</span>
            </div>
          )}
          {review.variant && (
            <span className="text-xs text-muted-foreground ml-auto">{review.variant}</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── General Review Card — con foto o avatar ─────────────── */

function GeneralReviewCard({ review }: { review: GeneralReview }) {
  const initials = getInitials(review.author)

  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-border/40 bg-background hover:bg-muted/20 transition-colors min-w-[260px] max-w-[320px] shrink-0">
      {/* Author + Stars */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {review.photoUrl ? (
          <img
            src={review.photoUrl}
            alt={review.author}
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-border/40"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#C16648]/15 border border-[#C16648]/25 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-[#C16648]">{initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium leading-tight truncate">{review.author}</p>
          <p className="text-[11px] text-muted-foreground/70 truncate">{review.product}</p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Comment */}
      <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">
        "{review.comment}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Compra verificada</span>
        </div>
        {review.variant && (
          <span className="text-[11px] text-muted-foreground">{review.variant}</span>
        )}
      </div>
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────── */

interface ProductReviewsProps {
  productSlug: string
}

export function ProductReviews({ productSlug }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  const summary = getProductReview(productSlug)
  const reviews = getProductReviewsContent(productSlug)

  // No ocultar la sección si no hay reseñas específicas — mostrar solo generales
  const hasSpecific = summary.reviewCount > 0 && reviews.length > 0

  const distribution = hasSpecific
    ? [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length
        return { star, count, pct: Math.round((count / reviews.length) * 100) }
      })
    : []

  // Ordenar: reviews con foto primero
  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.photoUrl && !b.photoUrl) return -1
    if (!a.photoUrl && b.photoUrl) return 1
    return 0
  })
  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3)

  return (
    <section id="reviews" className="border-t border-border/60 pt-16 space-y-16">

      {/* ── SECCIÓN 1: Reseñas del producto actual ── */}
      {hasSpecific && (
        <div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-10">
            Lo que dicen de este cuadro
          </h2>

          {/* Summary grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Hero rating */}
            <div className="flex items-end gap-5">
              <span className="text-8xl font-light tracking-tighter leading-none tabular-nums">
                {summary.rating.toFixed(1)}
              </span>
              <div className="pb-2 space-y-1.5">
                <StarRating rating={summary.rating} size="lg" />
                <p className="text-sm text-muted-foreground">
                  {summary.reviewCount} reseñas verificadas
                </p>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2.5 self-center">
              {distribution.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-3 text-right shrink-0 tabular-nums">
                    {star}
                  </span>
                  <svg
                    className="h-3 w-3 text-amber-500 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex-1 bg-muted/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-amber-500/70 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-5 shrink-0 tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Ver todas / Ver menos */}
          {reviews.length > 3 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll((v) => !v)}
                className="px-8 rounded-full"
              >
                {showAll
                  ? "Ver menos reseñas"
                  : `Ver todas las reseñas (${reviews.length})`}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── SECCIÓN 2: Más experiencias Plieggo (todas las PDPs) ── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Más experiencias Plieggo
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Lo que opinan quienes ya transformaron su espacio
            </p>
          </div>
          {/* Overall brand rating */}
          <div className="flex items-center gap-2 shrink-0">
            <StarRating rating={4.9} size="md" />
            <span className="text-sm font-semibold tabular-nums">4.9</span>
            <span className="text-xs text-muted-foreground">· +100 reseñas</span>
          </div>
        </div>

        {/* Horizontal scroll en móvil, grid en desktop */}
        <div className="flex gap-4 overflow-x-auto pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
          {plieggoGeneralReviews.map((review) => (
            <GeneralReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}