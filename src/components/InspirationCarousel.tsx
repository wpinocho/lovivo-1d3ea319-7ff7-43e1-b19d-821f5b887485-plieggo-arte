import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * InspirationCarousel — "Así luce en tu espacio"
 * Manual navigation, no autoplay, object-cover for full visual impact.
 */

const inspirationImages = [
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301248170-7zdmlt3v6x9.webp',
    alt: 'Cuadro Plieggo verde salvia horizontal en estudio luminoso con escritorio de madera oscura y planta tropical',
    caption: 'Estudio con luz natural',
  },
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/black-dining.webp',
    alt: 'Cuadro Plieggo negro en comedor con ventanal luminoso',
    caption: 'Comedor con luz natural',
  },
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301248171-1gyve5g10np.webp',
    alt: 'Cuadro Plieggo blanco horizontal sobre cama de madera natural con ropa de cama beige y camel en recámara escandinava',
    caption: 'Recámara escandinava',
  },
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/burgundy-kitchen.webp',
    alt: 'Cuadro Plieggo burdeos en repisa de cocina',
    caption: 'Cocina contemporánea',
  },
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301248171-cor5cchqdk7.webp',
    alt: 'Cuadro Plieggo cuadrado en comedor mediterráneo con sillas pastel, mesa de roble y perro golden retriever',
    caption: 'Comedor mediterráneo',
  },
  {
    src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301248171-ckv1r5njeaa.webp',
    alt: 'Cuadro Plieggo azul marino vertical en oficina contemporánea oscura con escritorio de madera y laptop',
    caption: 'Oficina contemporánea',
  },
]

export const InspirationCarousel = () => {
  const [current, setCurrent] = useState(0)
  const total = inspirationImages.length

  const prev = () => setCurrent((i) => (i - 1 + total) % total)
  const next = () => setCurrent((i) => (i + 1) % total)

  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
          Galería de ambientes
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-light tracking-tight">
          Así luce en tu espacio
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Cada pieza transforma el ambiente que la rodea
        </p>
      </div>

      {/* Imagen principal */}
      <div className="relative group overflow-hidden rounded-sm">
        {/* Slides */}
        <div className="relative aspect-[16/9] md:aspect-[21/8] bg-muted overflow-hidden">
          {inspirationImages.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                'absolute inset-0 transition-opacity duration-700 ease-in-out',
                idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none',
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-6 py-5">
                <p className="text-white/90 text-sm font-light tracking-wide">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnails navegables */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-1 snap-x">
        {inspirationImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ver ${img.caption}`}
            className={cn(
              'shrink-0 snap-start w-20 h-14 md:w-28 md:h-20 rounded-sm overflow-hidden border-2 transition-all duration-200',
              idx === current
                ? 'border-foreground'
                : 'border-transparent opacity-60 hover:opacity-90',
            )}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  )
}