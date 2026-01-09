import { motion, useMotionValue, useSpring } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { useSettings } from '@/contexts/SettingsContext'

interface InteractiveGalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * INTERACTIVE GALLERY MODAL - Lusano-Style Parallax
 * 
 * Sistema de coordenadas inverso:
 * - Grid: 350% x 220% (overflow para parallax horizontal)
 * - Mouse en (50%, 50%) → Grid centrado en (-125%, -60%)
 * - Movimiento suave con spring physics
 * 
 * Optimizado para ~50-60 items (productos + variantes) en 5 filas asimétricas
 */
export const InteractiveGalleryModal = ({ isOpen, onClose }: InteractiveGalleryModalProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { formatMoney } = useSettings()

  // LUSANO-STYLE COORDINATE MAPPING
  // Canvas: Width 350% (3.5x), Height 220% (2.2x)
  // Mouse position directly maps to canvas position with smooth spring animation
  // Center (50%, 50%) → Canvas at (-125%, -60%)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for grid movement
  // Damping: 30 (more resistance = smoother)
  // Stiffness: 120 (lower = slower, more fluid)
  const gridX = useSpring(mouseX, { damping: 30, stiffness: 120 })
  const gridY = useSpring(mouseY, { damping: 30, stiffness: 120 })

  useEffect(() => {
    if (isOpen) {
      fetchProducts()
    }
  }, [isOpen])

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
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Get mouse position relative to viewport (0-1)
    const mousePercentX = (e.clientX - rect.left) / rect.width
    const mousePercentY = (e.clientY - rect.top) / rect.height

    // Map to canvas position
    // Canvas X: 350% (overflow 250%) → targetX = -(mousePercent * 2.5 * viewportSize)
    // Canvas Y: 220% (overflow 120%) → targetY = -(mousePercent * 1.2 * viewportSize)
    // When mouse at (50%, 50%) → canvas at (-125%, -60%) [CENTERED]
    const targetX = -(mousePercentX * 2.5 * rect.width)
    const targetY = -(mousePercentY * 1.2 * rect.height)

    // Update motion values (spring will animate smoothly)
    mouseX.set(targetX)
    mouseY.set(targetY)
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
    
    products.forEach((product) => {
      // 1. Agregar imagen principal del producto
      if (product.images && product.images.length > 0) {
        items.push({
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price as number,
          image: product.images[0]
        })
      }
      
      // 2. Agregar imágenes de variantes con image_urls
      const variants = (product as any).variants
      if (variants && Array.isArray(variants)) {
        variants.forEach((variant: any, vIndex: number) => {
          if (variant.image_urls && Array.isArray(variant.image_urls)) {
            variant.image_urls.forEach((imageUrl: string, imgIndex: number) => {
              items.push({
                id: `${product.id}-variant-${vIndex}-${imgIndex}`,
                slug: product.slug,
                title: `${product.title}${variant.title ? ` - ${variant.title}` : ''}`,
                price: (variant.price || product.price) as number,
                image: imageUrl
              })
            })
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
        const leftBase = (col / itemsInThisRow) * 95 + 2
        
        positions.push({
          top: topBase + (Math.random() * 4 - 2),  // ±2% variación vertical
          left: leftBase + (Math.random() * 3 - 1.5)  // ±1.5% variación horizontal
        })
      }
    }
    
    return positions
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Close Button - Estilo Plieggo */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 p-3 hover:bg-secondary/10 transition-colors rounded-sm group"
        aria-label="Cerrar galería"
      >
        <X className="h-6 w-6 text-foreground group-hover:text-secondary transition-colors" strokeWidth={1.5} />
      </button>

      {/* Asymmetric Masonry Grid - Moves in OPPOSITE direction of mouse */}
      <motion.div
        style={{
          x: gridX,
          y: gridY,
        }}
        className="absolute inset-0 w-[350%] h-[220%] relative"
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
                <Link
                  key={item.id}
                  to={`/products/${item.slug}`}
                  onClick={onClose}
                  className="group relative overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300"
                  style={{
                    position: 'absolute',
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    width: '120px',
                    maxHeight: '220px'
                  }}
                >
                  {/* Product Image - Respeta aspect ratio */}
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Overlay with info on hover - Estilo Plieggo */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-primary-foreground transition-opacity duration-300"
                  >
                    <h3 className="font-heading text-base font-bold mb-1 text-center px-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-heading text-xs tracking-[0.15em] uppercase mb-2 text-primary-foreground/60">
                      2025
                    </p>
                    <p className="font-body text-lg font-semibold text-primary">
                      {formatMoney(item.price)}
                    </p>
                  </motion.div>
                </Link>
              )
            })
            })()}
          </div>
        )}
      </motion.div>

      {/* Instructions at bottom - Estilo Plieggo */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="font-heading text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Mueve el cursor para explorar
        </p>
      </div>
    </motion.div>
  )
}