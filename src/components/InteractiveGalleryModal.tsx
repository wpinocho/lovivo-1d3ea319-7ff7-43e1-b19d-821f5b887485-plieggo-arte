import { motion, useMotionValue, useSpring } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { useIsMobile } from '@/hooks/use-mobile'

interface InteractiveGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  standalone?: boolean
}

export const InteractiveGalleryModal = ({ isOpen, onClose, standalone = false }: InteractiveGalleryModalProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Desktop only: spring-based parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gridX = useSpring(mouseX, { damping: 80, stiffness: 40 })
  const gridY = useSpring(mouseY, { damping: 80, stiffness: 40 })

  useEffect(() => {
    if (isOpen || standalone) {
      fetchProducts()
    }
  }, [isOpen, standalone])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', STORE_ID)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Desktop only: mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const mousePercentX = (e.clientX - rect.left) / rect.width
    const mousePercentY = (e.clientY - rect.top) / rect.height
    mouseX.set(-(mousePercentX * 1.8 * rect.width))
    mouseY.set(-(mousePercentY * 2.8 * rect.height))
  }

  // Convertir productos + variantes en items "planos" para el grid
  const getGalleryItems = () => {
    interface GalleryItem {
      id: string
      slug: string
      title: string
      price: number
      image: string
    }

    const items: GalleryItem[] = []
    const seenUrls = new Set<string>()

    products.forEach((product) => {
      if (product.images && product.images.length > 0) {
        const mainImage = product.images[0]
        if (!seenUrls.has(mainImage)) {
          seenUrls.add(mainImage)
          items.push({
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price as number,
            image: mainImage
          })
        }
      }

      const variants = (product as any).variants
      if (variants && Array.isArray(variants)) {
        variants.forEach((variant: any, vIndex: number) => {
          if (variant.image_urls && Array.isArray(variant.image_urls) && variant.image_urls.length > 0) {
            const firstImage = variant.image_urls[0]
            if (!seenUrls.has(firstImage)) {
              seenUrls.add(firstImage)
              items.push({
                id: `${product.id}-variant-${vIndex}`,
                slug: product.slug,
                title: `${product.title}${variant.title ? ` - ${variant.title}` : ''}`,
                price: (variant.price || product.price) as number,
                image: firstImage
              })
            }
          }
        })
      }
    })

    return items
  }

  // Desktop only: chaos positions
  const generateChaosPositions = (itemCount: number) => {
    const positions: { top: number; left: number }[] = []
    const rows = 5
    const itemsPerRow = Math.ceil(itemCount / rows)

    for (let row = 0; row < rows; row++) {
      const remainingItems = itemCount - positions.length
      const itemsInThisRow = Math.min(itemsPerRow, remainingItems)
      const topBase = 5 + (row * 20)

      for (let col = 0; col < itemsInThisRow; col++) {
        const leftBase = (col / itemsInThisRow) * 84 + 8
        positions.push({
          top: topBase + (Math.random() * 4 - 2),
          left: leftBase + (Math.random() * 3 - 1.5)
        })
      }
    }

    return positions
  }

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`)
  }

  if (!isOpen && !standalone) return null

  const galleryItems = getGalleryItems()

  // ─────────────────────────────────────────────────────────
  // MOBILE: CSS Grid — 3 columnas, scroll natural de página
  // ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        className={standalone
          ? "relative w-full min-h-screen bg-transparent overflow-y-auto"
          : "fixed inset-0 z-50 bg-transparent overflow-y-auto"
        }
      >
        {/* Close button — fixed para que sea visible al scrollear */}
        {!standalone && (
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 p-3 bg-background/80 backdrop-blur-sm hover:bg-secondary/10 transition-colors rounded-sm group"
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6 text-foreground group-hover:text-secondary transition-colors" strokeWidth={1.5} />
          </button>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <p className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Cargando Galería...
            </p>
          </div>
        ) : (
          <div className="pt-20 pb-32 px-3">
            {/* Grid 3 columnas, espaciado generoso para scroll discovery */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-10">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleProductClick(item.slug)}
                  style={{ marginTop: index % 3 === 1 ? '2rem' : index % 3 === 2 ? '0.75rem' : '0' }}
                  className="relative overflow-hidden bg-card shadow-sm active:scale-95 transition-transform duration-150 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions — fixed en la parte de abajo */}
        <div className="fixed bottom-4 left-0 right-0 text-center z-40 pointer-events-none">
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Toca para ver el producto
          </p>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────
  // DESKTOP: Chaos layout con parallax — sin cambios
  // ─────────────────────────────────────────────────────────
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={standalone
        ? "relative w-full h-screen bg-transparent overflow-hidden"
        : "fixed inset-0 z-50 bg-transparent overflow-hidden"
      }
      onMouseMove={handleMouseMove}
    >
      {/* Close Button */}
      {!standalone && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-3 hover:bg-secondary/10 transition-colors rounded-sm group"
          aria-label="Cerrar galería"
        >
          <X className="h-6 w-6 text-foreground group-hover:text-secondary transition-colors" strokeWidth={1.5} />
        </button>
      )}

      {/* Parallax Grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 relative w-[280%] h-[380%]"
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Cargando Galería...
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {(() => {
              const chaosPositions = generateChaosPositions(galleryItems.length)

              return galleryItems.map((item, index) => {
                const position = chaosPositions[index]
                if (!position) return null

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleProductClick(item.slug)}
                    className="group relative overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    style={{
                      position: 'absolute',
                      top: `${position.top}%`,
                      left: `${position.left}%`,
                      width: '240px'
                    }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain"
                    />
                  </motion.button>
                )
              })
            })()}
          </div>
        )}
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Mueve el cursor para explorar
        </p>
      </div>
    </motion.div>
  )
}