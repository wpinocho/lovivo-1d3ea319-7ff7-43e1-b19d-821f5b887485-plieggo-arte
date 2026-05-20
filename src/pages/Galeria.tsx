import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { InteractiveGalleryModal } from '@/components/InteractiveGalleryModal'

/**
 * Página de Galería Interactiva — Plieggo
 * Ruta: /galeria
 * 
 * La galería se muestra en modo standalone (sin modal overlay):
 * - No hay botón de cerrar
 * - Ocupa el espacio de la página debajo del header
 * - Header y footer de EcommerceTemplate al rededor
 */
export default function Galeria() {
  return (
    <EcommerceTemplate>
      <InteractiveGalleryModal
        isOpen={true}
        onClose={() => {}}
        standalone={true}
      />
    </EcommerceTemplate>
  )
}