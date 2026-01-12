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
    <section className="py-12 bg-muted/30 rounded-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">
            Inspiración
          </h2>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          Descubre cómo esta pieza transforma espacios reales
        </p>

        {/* Grid de imágenes de inspiración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inspirationImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-sm bg-muted aspect-[4/3] hover:shadow-lg transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay con contexto */}
              {image.context && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-background font-body text-sm">
                    {image.context}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}