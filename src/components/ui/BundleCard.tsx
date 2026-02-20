import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import type { Bundle } from '@/lib/supabase'
import { useSettings } from '@/contexts/SettingsContext'
import { useNavigate } from 'react-router-dom'

interface BundleCardProps {
  bundle: Bundle
}

export const BundleCard = ({ bundle }: BundleCardProps) => {
  const { formatMoney } = useSettings()
  const navigate = useNavigate()

  const mainImage = bundle.images?.[0]
  const hasDiscount = bundle.compare_at_price && bundle.compare_at_price > bundle.bundle_price

  return (
    <Card
      className="bg-card border-2 border-transparent overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:-translate-y-2 group relative cursor-pointer"
      onClick={() => navigate(`/bundles/${bundle.slug}`)}
    >
      <CardContent className="p-0 relative">

        {/* Badges — top right, same pattern as ProductCardUI */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end transition-transform duration-300 group-hover:scale-110">
          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
            <Package className="w-3 h-3" />
            Paquete
          </span>
          {bundle.discount_percentage && bundle.discount_percentage > 0 && (
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded font-medium">
              -{bundle.discount_percentage}%
            </span>
          )}
        </div>

        {/* Image */}
        <div className="aspect-square bg-muted overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt={bundle.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/60 text-muted-foreground">
              <Package className="w-12 h-12 opacity-30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-base md:text-lg mb-1 line-clamp-2 leading-tight">
              {bundle.title}
            </h3>
            {bundle.description && (
              <p className="font-body text-muted-foreground text-xs line-clamp-2">
                {bundle.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-heading text-foreground font-bold text-xl md:text-2xl">
                {formatMoney(bundle.bundle_price)}
              </span>
              {hasDiscount && (
                <span className="font-body text-muted-foreground text-xs line-through">
                  {formatMoney(bundle.compare_at_price!)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 font-medium text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/bundles/${bundle.slug}`)
              }}
            >
              Ver paquete →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}