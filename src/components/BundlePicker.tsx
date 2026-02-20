import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Check, Package, ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useCartUI } from '@/components/CartProvider'
import { useSettings } from '@/contexts/SettingsContext'
import { useCollectionProducts } from '@/hooks/useCollectionProducts'
import type { Bundle, Product, ProductVariant } from '@/lib/supabase'

interface SelectedEntry {
  product: Product
  variant?: ProductVariant
}

interface BundlePickerProps {
  bundle: Bundle
  isOpen: boolean
  onClose: () => void
}

export const BundlePicker = ({ bundle, isOpen, onClose }: BundlePickerProps) => {
  const { products, loading } = useCollectionProducts(bundle.source_collection_id)
  const { addItem } = useCart()
  const { openCart } = useCartUI()
  const { formatMoney } = useSettings()

  const [selected, setSelected] = useState<SelectedEntry[]>([])

  const pickQuantity = bundle.pick_quantity ?? 2

  // Build the list of products available to pick, optionally filtering by variant_filter
  const availableItems = useMemo(() => {
    if (bundle.bundle_type === 'mix_match_variant' && bundle.variant_filter) {
      const filter = bundle.variant_filter
      return products
        .map(product => {
          const matchingVariant = product.variants?.find(v =>
            v.title?.includes(filter) ||
            Object.values(v.option_values || {}).some(val => String(val).includes(filter))
          )
          return matchingVariant ? { product, variant: matchingVariant } : null
        })
        .filter(Boolean) as { product: Product; variant: ProductVariant }[]
    }
    return products.map(product => ({ product, variant: undefined as ProductVariant | undefined }))
  }, [products, bundle.bundle_type, bundle.variant_filter])

  const isSelected = (productId: string) => selected.some(s => s.product.id === productId)

  const toggleProduct = (product: Product, variant?: ProductVariant) => {
    if (isSelected(product.id)) {
      setSelected(prev => prev.filter(s => s.product.id !== product.id))
    } else if (selected.length < pickQuantity) {
      setSelected(prev => [...prev, { product, variant }])
    }
  }

  const handleAddToCart = () => {
    selected.forEach(({ product, variant }) => {
      addItem(product, variant)
    })
    setSelected([])
    onClose()
    setTimeout(() => openCart(), 300)
  }

  const handleClose = () => {
    setSelected([])
    onClose()
  }

  const progress = (selected.length / pickQuantity) * 100
  const savings =
    bundle.compare_at_price && bundle.compare_at_price > bundle.bundle_price
      ? bundle.compare_at_price - bundle.bundle_price
      : null

  const remaining = pickQuantity - selected.length

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[88vh] flex flex-col p-0 gap-0 overflow-hidden">

        {/* Header */}
        <DialogHeader className="p-6 pb-5 border-b border-border shrink-0">
          <DialogTitle className="font-heading text-xl font-bold text-foreground">
            {bundle.title}
          </DialogTitle>
          {bundle.description && (
            <p className="text-sm text-muted-foreground mt-1">{bundle.description}</p>
          )}

          {/* Precio del paquete */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="font-heading text-2xl font-bold text-foreground">
              {formatMoney(bundle.bundle_price)}
            </span>
            {bundle.compare_at_price && bundle.compare_at_price > bundle.bundle_price && (
              <>
                <span className="text-muted-foreground line-through text-sm">
                  {formatMoney(bundle.compare_at_price)}
                </span>
                {savings && (
                  <span className="bg-secondary/15 text-secondary text-xs px-2 py-1 rounded font-semibold">
                    Ahorras {formatMoney(savings)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Progreso de selección */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Elegiste{' '}
                <span className="font-semibold text-foreground">{selected.length}</span>
                {' '}de{' '}
                <span className="font-semibold text-foreground">{pickQuantity}</span>
                {bundle.variant_filter ? ` (${bundle.variant_filter})` : ''}
              </span>
              {selected.length === pickQuantity && (
                <span className="text-green-600 font-semibold flex items-center gap-1 text-xs">
                  <Check className="w-3 h-3" />
                  ¡Listo para agregar!
                </span>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        {/* Grid de productos — scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-muted rounded-sm aspect-square animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          ) : availableItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-body">No hay productos disponibles en este paquete.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableItems.map(({ product, variant }) => {
                const sel = isSelected(product.id)
                const isDisabled = !sel && selected.length >= pickQuantity
                const price = variant?.price ?? product.price
                const image = variant?.image || product.images?.[0]

                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product, variant)}
                    disabled={isDisabled}
                    className={[
                      'relative text-left rounded-sm overflow-hidden border-2 transition-all duration-200',
                      sel
                        ? 'border-primary ring-2 ring-primary/25 scale-[0.98] shadow-md'
                        : isDisabled
                        ? 'border-border opacity-40 cursor-not-allowed'
                        : 'border-border hover:border-primary/50 hover:shadow-sm',
                    ].join(' ')}
                  >
                    {/* Imagen */}
                    <div className="aspect-square bg-muted overflow-hidden">
                      {image ? (
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Checkmark de selección */}
                    {sel && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}

                    {/* Datos del producto */}
                    <div className="p-3">
                      <p className="text-xs font-medium text-foreground line-clamp-2 mb-1 leading-snug">
                        {product.title}
                        {variant?.title && (
                          <span className="text-muted-foreground font-normal"> · {variant.title}</span>
                        )}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatMoney(price || 0)}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-6 pt-4 border-t border-border shrink-0 bg-background">
          <Button
            className="w-full h-12 text-base font-semibold"
            disabled={selected.length !== pickQuantity}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {selected.length === pickQuantity
              ? `Agregar ${pickQuantity} productos — ${formatMoney(bundle.bundle_price)}`
              : `Elige ${remaining} producto${remaining !== 1 ? 's' : ''} más`}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            El descuento se aplica automáticamente al finalizar tu pedido
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}