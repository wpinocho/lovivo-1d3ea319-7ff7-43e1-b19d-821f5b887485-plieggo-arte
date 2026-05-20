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

/**
 * INTERACTIVE GALLERY MODAL - Lusano-Style Parallax
 * 
 * Sistema de coordenadas inverso:
 * - Grid: 240% x 220% (overflow para parallax horizontal)
 * - Mouse en (50%, 50%) → Grid centrado en (-70%, -60%)
 * - Movimiento suave con spring physics
 * 
 * Optimizado para ~50-60 items (productos + variantes) en 5 filas asimétricas
 */
export const InteractiveGalleryModal = ({ isOpen, onClose, standalone = false }: InteractiveGalleryModalProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // LUSANO-STYLE COORDINATE MAPPING
  // Canvas: Width 240% (2.4x), Height 220% (2.2x)
  // Mouse position directly maps to canvas position with smooth spring animation
  // Center (50%, 50%) → Canvas at (-70%, -60%)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for grid movement (Lusano-style ~3-4s delay)
  // Damping: 80 (very high resistance = very slow, heavy motion)
  // Stiffness: 40 (very low stiffness = spring-like bounce)
  const gridX = useSpring(mouseX, { damping: 80, stiffness: 40 })
  const gridY = useSpring(mouseY, { damping: 80, stiffness: 40 })

  useEffect(() => {
    if (isOpen || standalone) {
      fetchProducts()
      
      // MOBILE: Empezar centrado
      if (isMobile && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Centro: mouse en (50%, 50%) → grid en (-70%, -60%)
        const centerX = -(0.5 * 1.4 * rect.width)
        const centerY = -(0.5 * 1.2 * rect.height)
        mouseX.set(centerX)
        mouseY.set(centerY)
      }
    }
  }, [isOpen, standalone, isMobile])

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

  // LUSANO-STYLE COORDINATE MAPPING
  // Maps mouse position to fixed canvas coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return // No procesar en mobile
    
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Get mouse position relative to viewport (0-1)
    const mousePercentX = (e.clientX - rect.left) / rect.width
    const mousePercentY = (e.clientY - rect.top) / rect.height

    // Map to canvas position
    // Canvas X: 240% (overflow 140%) → targetX = -(mousePercent * 1.4 * viewportSize)
    // Canvas Y: 220% (overflow 120%) → targetY = -(mousePercent * 1.2 * viewportSize)
    // When mouse at (50%, 50%) → canvas at (-70%, -60%) [CENTERED]
    const targetX = -(mousePercentX * 1.4 * rect.width)
    const targetY = -(mousePercentY * 1.2 * rect.height)

    // Update motion values (spring will animate smoothly)
    mouseX.set(targetX)
    mouseY.set(targetY)
  }

  // MOBILE: Drag constraints dinámicos
  const getDragConstraints = () => {
    if (!containerRef.current) return { top: 0, left: 0, right: 0, bottom: 0 }
    
    const rect = containerRef.current.getBoundingClientRect()
    return {
      top: -(1.2 * rect.height), // -120% del viewport
      left: -(1.4 * rect.width),  // -140% del viewport
      right: 0,
      bottom: 0
    }
  }

  // Convertir productos + variantes en items "planos" para el grid
  // Deduplicación: Solo URLs únicas (evita repetir 20x20 = 50x50)
  const getGalleryItems = () => {
    interface GalleryItem {
      id: string
      slug: string
      title: string
      price: number
      image: string
    }

    const items: GalleryItem[] = []
    const seenUrls = new Set<string>()  // Track URLs únicas
    
    products.forEach((product) => {
      // 1. Agregar imagen principal del producto (si es única)
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
      
      // 2. Agregar SOLO la primera imagen de cada variante (una por variante)
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

  // Generar posiciones dinámicas según número de items
  const generateChaosPositions = (itemCount: number) => {
    const positions: { top: number; left: number }[] = []
    const rows = 5
    const itemsPerRow = Math.ceil(itemCount / rows)
    
    for (let row = 0; row < rows; row++) {
      // Cuántos items faltan por colocar
      const remainingItems = itemCount - positions.length
      const itemsInThisRow = Math.min(itemsPerRow, remainingItems)
      
      // Base vertical para esta fila
      const topBase = 10 + (row * 22)  // 22% separación entre filas
      
      for (let col = 0; col < itemsInThisRow; col++) {
        // Distribuir horizontalmente con variación caótica
        const leftBase = (col / itemsInThisRow) * 84 + 8
        
        positions.push({
          top: topBase + (Math.random() * 4 - 2),  // ±2% variación vertical
          left: leftBase + (Math.random() * 3 - 1.5)  // ±1.5% variación horizontal
        })
      }
    }
    
    return positions
  }

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`)
  }

  if (!isOpen && !standalone) return null

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={standalone
        ? "relative w-full h-screen bg-background overflow-hidden"
        : "fixed inset-0 z-50 bg-background overflow-hidden"
      }
      onMouseMove={handleMouseMove}
    >
      {/* Close Button - Solo visible en modo modal */}
      {!standalone && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-3 hover:bg-secondary/10 transition-colors rounded-sm group"
          aria-label="Cerrar galería"
        >
          <X className="h-6 w-6 text-foreground group-hover:text-secondary transition-colors" strokeWidth={1.5} />
        </button>
      )}

      {/* Asymmetric Masonry Grid - Desktop: Spring animation, Mobile: Drag */}
      <motion.div
        drag={isMobile} // Solo drag en mobile
        dragConstraints={isMobile ? getDragConstraints() : undefined}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
        style={isMobile ? {} : {
          x: gridX,
          y: gridY,
        }}
        className="absolute inset-0 w-[240%] h-[220%] relative"
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
              const galleryItems = getGalleryItems()
              const chaosPositions = generateChaosPositions(galleryItems.length)
              
              return galleryItems.map((item, index) => {
                const position = chaosPositions[index % chaosPositions.length]

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleProductClick(item.slug)}
                  className="group relative overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  style={{
                    position: 'absolute',
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    width: isMobile ? '100px' : '120px' // Más pequeño en mobile
                  }}
                  whileHover={{ scale: isMobile ? 1.2 : 1.5 }} // Menos zoom en mobile
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Product Image - Respeta aspect ratio */}
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

      {/* Instructions at bottom - Dinámicas según dispositivo */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">
          {isMobile ? 'Arrastra para explorar' : 'Mueve el cursor para explorar'}
        </p>
      </div>


    </motion.div>
  )
}