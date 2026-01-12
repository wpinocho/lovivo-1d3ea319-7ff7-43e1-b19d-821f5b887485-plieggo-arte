import { getProductInspiration, hasProductInspiration } from '@/data/product-inspiration'
import { Lightbulb } from 'lucide-react'

/**
 * ProductInspirationGallery
 * 
 * Muestra imágenes del producto en contexto real (colgado en casas)
 * Solo se muestra si el producto tiene imágenes de inspiración configuradas
 */

interface ProductInspirationGalleryProps {
  productSlug: string
}

export const ProductInspirationGallery = ({ productSlug }: ProductInspirationGalleryProps) => {
  // Si no hay imágenes de inspiración, no renderizar nada
  if (!hasProductInspiration(productSlug)) {
    return null
  }

  const inspirationImages = getProductInspiration(productSlug)

  return (
    <section className="py-8">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">
            Inspiración
          </h2>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          Descubre cómo esta pieza transforma espacios reales
        </p>
      </div>

      {/* Imagen grande de inspiración */}
      <div className="w-full">
        {inspirationImages.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-lg bg-muted hover:shadow-xl transition-all duration-300"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            
            {/* Overlay con contexto */}
            {image.context && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-secondary-foreground font-body text-lg font-medium">
                  {image.context}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}