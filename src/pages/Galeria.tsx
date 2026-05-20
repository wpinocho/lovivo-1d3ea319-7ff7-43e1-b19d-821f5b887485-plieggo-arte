import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { InteractiveGalleryModal } from '@/components/InteractiveGalleryModal'

/**
 * Página de Galería Interactiva — Plieggo
 * Ruta: /galeria
 * 
 * Página fullscreen sin header/footer.
 * Botón X pequeño arriba-derecha regresa al inicio.
 */
export default function Galeria() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-40">
      {/* Close button — pequeño, top-right */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 hover:bg-muted/60 transition-colors rounded-sm group"
        aria-label="Volver al inicio"
      >
        <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
      </button>

      <InteractiveGalleryModal
        isOpen={true}
        onClose={() => navigate('/')}
        standalone={true}
      />
    </div>
  )
}