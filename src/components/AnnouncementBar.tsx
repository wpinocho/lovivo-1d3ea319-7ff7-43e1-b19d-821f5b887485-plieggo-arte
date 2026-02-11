import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * EDITABLE COMPONENT - AnnouncementBar
 * 
 * Barra de anuncios superior con rotación automática
 * Completamente editable: mensajes, colores, tiempos, animaciones
 */

const MESSAGES = [
  'Envío gratis en CDMX • Entrega 3-5 días',
  'Cada pieza es única • Arte hecho a mano',
  '🇲🇽 100% Diseño Mexicano • Listo para colgar'
]

const AUTO_ROTATE_INTERVAL = 5000 // 5 segundos

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)
    }, AUTO_ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)
  }

  return (
    <div 
      className="relative bg-secondary text-secondary-foreground h-10 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 hover:bg-secondary-foreground/10 rounded-sm transition-colors z-10"
        aria-label="Mensaje anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 hover:bg-secondary-foreground/10 rounded-sm transition-colors z-10"
        aria-label="Siguiente mensaje"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Messages Container */}
      <div className="relative w-full h-full flex items-center justify-center px-12 md:px-16">
        {MESSAGES.map((message, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
              index === currentIndex 
                ? "opacity-100 translate-x-0" 
                : index < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            )}
          >
            <p className="font-body text-sm md:text-base font-medium text-center">
              {message}
            </p>
          </div>
        ))}
      </div>

      {/* Dots Indicator - Mobile */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
        {MESSAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-secondary-foreground w-4" 
                : "bg-secondary-foreground/40"
            )}
            aria-label={`Ir al mensaje ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}