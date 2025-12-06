import { useEffect, useState } from 'react'

/**
 * InspirationCarousel
 * Carrusel automático lento de imágenes de inspiración
 */

const inspirationImages = [
  { src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998029362-6npxv15ojyr.png', alt: 'Cuadro Plieggo en cocina minimalista' },
  { src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998029362-rn00qz5co7c.png', alt: 'Cuadro Plieggo en oficina con luz natural' },
  { src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998029363-on4t7a5v2nt.png', alt: 'Cuadro Plieggo en espacio de trabajo contemporáneo' },
  { src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998029363-e9ggjodtnlk.png', alt: 'Cuadro Plieggo en comedor familiar' },
]

export const InspirationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % inspirationImages.length)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-12 tracking-tight">
          Inspiración
        </h2>

        <div className="relative overflow-hidden rounded-sm aspect-[16/9] md:aspect-[21/9] bg-muted">
          {inspirationImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {inspirationImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}