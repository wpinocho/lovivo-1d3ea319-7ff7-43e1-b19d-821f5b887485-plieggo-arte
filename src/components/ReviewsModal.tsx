import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Star, CheckCircle, X } from 'lucide-react'
import { getProductReviewsContent, type Review } from '@/data/product-reviews-content'
import { getProductReview } from '@/data/product-reviews'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

/**
 * EDITABLE UI COMPONENT - ReviewsModal
 * 
 * Modal profesional para mostrar todas las reseñas de un producto.
 * Diseño inspirado en Amazon/Etsy con colores Plieggo.
 */

interface ReviewsModalProps {
  isOpen: boolean
  onClose: () => void
  productSlug: string
  productTitle: string
}

export const ReviewsModal = ({ isOpen, onClose, productSlug, productTitle }: ReviewsModalProps) => {
  const reviews = getProductReviewsContent(productSlug)
  const { rating, reviewCount } = getProductReview(productSlug)

  if (!reviews || reviews.length === 0) {
    return null
  }

  // Renderizar estrellas
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating
                ? 'fill-primary text-primary'
                : 'fill-none text-border'
            }`}
          />
        ))}
      </div>
    )
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Avatar con inicial
  const Avatar = ({ name }: { name: string }) => {
    const initial = name.charAt(0).toUpperCase()
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-heading font-semibold text-lg">
          {initial}
        </span>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="font-heading text-2xl font-bold text-foreground mb-2">
                Reseñas: {productTitle}
              </DialogTitle>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(rating, 'lg')}
                  <span className="font-heading text-3xl font-bold text-foreground">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Basado en {reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Reviews List */}
        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-6">
            {reviews.map((review, index) => (
              <div key={review.id}>
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start gap-4">
                    <Avatar name={review.author} />
                    
                    <div className="flex-1 min-w-0">
                      {/* Name and Stars */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h4 className="font-heading font-semibold text-foreground">
                          {review.author}
                        </h4>
                        {renderStars(review.rating)}
                      </div>

                      {/* Comment */}
                      <p className="font-body text-base text-foreground/90 leading-relaxed mb-3">
                        "{review.comment}"
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {review.verified && (
                          <div className="flex items-center gap-1.5 text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-medium">Compra verificada</span>
                          </div>
                        )}
                        
                        {review.variant && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <span>{review.variant}</span>
                          </>
                        )}
                        
                        <span className="text-muted-foreground/50">•</span>
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator between reviews */}
                {index < reviews.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer con info adicional */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <p className="font-body text-sm text-muted-foreground text-center">
            Las reseñas son de clientes verificados que compraron este producto
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}