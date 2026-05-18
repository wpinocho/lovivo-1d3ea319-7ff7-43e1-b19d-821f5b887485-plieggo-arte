import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getProductReview } from "@/data/product-reviews"
import { getProductReviewsContent, type Review } from "@/data/product-reviews-content"

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
          className={cn(cls, s <= Math.round(rating) ? "text-amber-500" : "text-muted-foreground/25")}
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

/* ── Review Card ─────────────────────────────────────────── */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/35 transition-colors">
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

  if (summary.reviewCount === 0 || reviews.length === 0) return null

  // Distribution bars — 5 → 1
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    return { star, count, pct: Math.round((count / reviews.length) * 100) }
  })

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <section id="reviews" className="border-t border-border/60 pt-16">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-10">
        Lo que dicen nuestros clientes
      </h2>

      {/* ── Summary grid ── */}
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

      {/* ── Review cards grid ── */}
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
    </section>
  )
}