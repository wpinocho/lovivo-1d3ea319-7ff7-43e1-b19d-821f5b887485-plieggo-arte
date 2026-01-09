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
 * - Grid: 180% x 220% (overflow para parallax)
 * - Mouse en (50%, 50%) → Grid centrado en (-40%, -60%)
 * - Movimiento suave con spring physics
 * 
 * Optimizado para 17 productos Plieggo en 5 filas asimétricas
 */
export const InteractiveGalleryModal = ({ isOpen, onClose }: InteractiveGalleryModalProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { formatMoney } = useSettings()

  // LUSANO-STYLE COORDINATE MAPPING
  // Canvas: Width 180% (1.8x), Height 220% (2.2x)
  // Mouse position directly maps to canvas position with smooth spring animation
  // Center (50%, 50%) → Canvas at (-40%, -60%)
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
    // Canvas X: 180% (overflow 80%) → targetX = -(mousePercent * 0.8 * viewportSize)
    // Canvas Y: 220% (overflow 120%) → targetY = -(mousePercent * 1.2 * viewportSize)
    // When mouse at (50%, 50%) → canvas at (-40%, -60%) [CENTERED]
    const targetX = -(mousePercentX * 0.8 * rect.width)
    const targetY = -(mousePercentY * 1.2 * rect.height)

    // Update motion values (spring will animate smoothly)
    mouseX.set(targetX)
    mouseY.set(targetY)
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
        className="absolute inset-0 w-[180%] h-[220%] relative"
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Cargando Galería...
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {products.map((product, index) => {
              // OPTIMIZED DISTRIBUTION FOR 17 PRODUCTS (180% width x 220% height)
              // Productos reducidos para mejor visualización al 100% zoom
              // Área segura: X [10-85%], Y [8-90%] (padding adecuado)
              // Separación vertical: ~18-22% entre filas (sin encimados)
              // Cobertura COMPLETA: 5 filas x distribución asimétrica
              const chaosPositions = [
                // FILA 1 - Superior (top 10-15%) - 4 productos
                { top: 10, left: 12 },   // 1️⃣ Izquierda
                { top: 12, left: 35 },   // 2️⃣ Centro-izq
                { top: 14, left: 58 },   // 3️⃣ Centro-der
                { top: 15, left: 82 },   // 4️⃣ Derecha
                
                // FILA 2 - Media-alta (top 32-38%) - 4 productos
                { top: 32, left: 18 },   // 5️⃣ Izquierda
                { top: 35, left: 42 },   // 6️⃣ Centro-izq
                { top: 37, left: 65 },   // 7️⃣ Centro-der
                { top: 38, left: 88 },   // 8️⃣ Derecha
                
                // FILA 3 - Centro (top 54-60%) - 3 productos
                { top: 54, left: 10 },   // 9️⃣ Izquierda
                { top: 58, left: 45 },   // 🔟 Centro
                { top: 60, left: 75 },   // 1️⃣1️⃣ Derecha
                
                // FILA 4 - Media-baja (top 76-82%) - 3 productos
                { top: 76, left: 22 },   // 1️⃣2️⃣ Izquierda
                { top: 80, left: 52 },   // 1️⃣3️⃣ Centro
                { top: 82, left: 78 },   // 1️⃣4️⃣ Derecha
                
                // FILA 5 - Inferior (top 96-102%) - 3 productos
                { top: 96, left: 15 },   // 1️⃣5️⃣ Izquierda
                { top: 98, left: 48 },   // 1️⃣6️⃣ Centro
                { top: 100, left: 80 },  // 1️⃣7️⃣ Derecha
              ]
              
              // Heights variadas para 17 productos (155-195px) - Ciclo de 8
              const heights = [165, 185, 155, 175, 195, 160, 180, 170]
              
              const position = chaosPositions[index % chaosPositions.length]
              const height = heights[index % heights.length]

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group relative overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300"
                  style={{
                    position: 'absolute',
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    width: '100px',
                    height: `${height}px`
                  }}
                >
                  {/* Product Image */}
                  <motion.img
                    src={product.images?.[0] || ''}
                    alt={product.title}
                    className="w-full h-full object-cover"
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
                      {product.title}
                    </h3>
                    <p className="font-heading text-xs tracking-[0.15em] uppercase mb-2 text-primary-foreground/60">
                      2025
                    </p>
                    <p className="font-body text-lg font-semibold text-primary">
                      {formatMoney(product.price)}
                    </p>
                  </motion.div>
                </Link>
              )
            })}
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