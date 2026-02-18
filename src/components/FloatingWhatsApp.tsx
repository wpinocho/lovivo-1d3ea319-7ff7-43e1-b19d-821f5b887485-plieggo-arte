import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

/**
 * FloatingWhatsApp - Botón flotante de WhatsApp
 * 
 * Best Practices implementadas:
 * - Bottom-right corner (estándar universal)
 * - Color verde WhatsApp oficial (#25D366)
 * - Animación de entrada suave
 * - Tooltip opcional
 * - Click to WhatsApp Web/App
 * - Responsive (mobile + desktop)
 * - Z-index 50 (sobre contenido, debajo de modales)
 */

interface FloatingWhatsAppProps {
  phoneNumber: string // Formato: +52 55 3121 5386
  message?: string // Mensaje pre-rellenado opcional
  tooltip?: string
  showTooltip?: boolean
  /** Oculta el botón en móvil (< lg). Útil en página de producto para no tapar el CTA de compra */
  hideOnMobile?: boolean
}

export const FloatingWhatsApp = ({
  phoneNumber,
  message = '¡Hola! Tengo una pregunta sobre los productos',
  tooltip = 'Chatea con nosotros',
  showTooltip = true,
  hideOnMobile = false,
}: FloatingWhatsAppProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // Animación de entrada después de 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      
      // Mostrar tooltip por 3s después de aparecer
      if (showTooltip) {
        setTimeout(() => {
          setIsTooltipVisible(true)
          
          // Ocultar tooltip después de 5s
          setTimeout(() => {
            setIsTooltipVisible(false)
          }, 5000)
        }, 500)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [showTooltip])

  // Formatear número para WhatsApp (remover espacios y caracteres especiales)
  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\s+/g, '').replace(/[-()+]/g, '')
  }

  const handleClick = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (!isVisible) return null

  return (
    <div className={`fixed z-50 items-center gap-3 bottom-5 right-5 lg:bottom-[88px] lg:right-6 ${hideOnMobile ? 'hidden lg:flex' : 'flex'}`}>
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="hidden md:flex items-center gap-2 animate-in slide-in-from-right-5 fade-in duration-500">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 font-medium text-sm whitespace-nowrap">
            {tooltip}
          </div>
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Cerrar tooltip"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Botón de WhatsApp */}
      <Button
        onClick={handleClick}
        size="lg"
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-0 animate-in zoom-in-50 fade-in duration-700"
        aria-label="Contactar por WhatsApp"
      >
        {/* Icono de WhatsApp */}
        <img 
          src="/social-icons/whatsapp.svg" 
          alt="WhatsApp" 
          className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
      </Button>

      {/* Tooltip mobile (solo en hover/touch) */}
      {showTooltip && (
        <div className="md:hidden absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-xs whitespace-nowrap">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}