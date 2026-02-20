import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Sparkles } from 'lucide-react'
import type { Bundle } from '@/lib/supabase'
import { useSettings } from '@/contexts/SettingsContext'
import { BundlePicker } from '@/components/BundlePicker'

interface MixMatchBundleCardProps {
  bundle: Bundle
}

export const MixMatchBundleCard = ({ bundle }: MixMatchBundleCardProps) => {
  const { formatMoney } = useSettings()
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const mainImage = bundle.images?.[0]
  const pickQuantity = bundle.pick_quantity ?? 2
  const hasDiscount =
    bundle.compare_at_price && bundle.compare_at_price > bundle.bundle_price

  return (
    <>
      <Card className="border border-border overflow-hidden bg-card group cursor-pointer hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-0">

          {/* Imagen */}
          <div
            className="aspect-square bg-muted overflow-hidden relative"
            style={{ aspectRatio: '1/1' }}
          >
            {mainImage ? (
              <img
                src={mainImage}
                alt={bundle.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/60 text-muted-foreground">
                <Package className="w-12 h-12 opacity-30" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Arma tu paquete
              </span>
              {bundle.discount_percentage && bundle.discount_percentage > 0 && (
                <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded font-medium">
                  -{bundle.discount_percentage}%
                </span>
              )}
            </div>
          </div>

          {/* Contenido */}
          <div className="p-4">
            <h3 className="text-foreground font-medium text-sm mb-1 line-clamp-2">
              {bundle.title}
            </h3>

            <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
              {bundle.description ||
                `Elige ${pickQuantity} ${bundle.variant_filter ? `(${bundle.variant_filter}) ` : ''}y ahorra`}
            </p>

            <div className="flex items-center justify-between">
              {/* Precio */}
              <div className="flex flex-col">
                <span className="text-foreground font-semibold">
                  {formatMoney(bundle.bundle_price)}
                </span>
                {hasDiscount && (
                  <span className="text-muted-foreground text-xs line-through">
                    {formatMoney(bundle.compare_at_price!)}
                  </span>
                )}
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPickerOpen(true)}
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                Armar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Picker Dialog */}
      <BundlePicker
        bundle={bundle}
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
      />
    </>
  )
}