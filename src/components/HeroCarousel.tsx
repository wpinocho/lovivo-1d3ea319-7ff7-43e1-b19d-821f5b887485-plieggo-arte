import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * HeroCarousel - Carousel fullscreen profesional
 * 
 * Características:
 * - 100vh fullscreen
 * - Auto-advance cada 6s
 * - Animaciones profesionales (slide + fade)
 * - Pause on hover
 * - Controles manuales
 * - Lazy loading optimizado
 * - Responsive
 */

export interface HeroSlide {
  type: 'image' | 'video'
  src: string
  poster?: string
  eyebrow: string
  headline: string
  subheadline: string
  cta: {
    text: string
    link: string
    onClick?: () => void
  }
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  autoplayInterval?: number
  transitionDuration?: number
}

export const HeroCarousel = ({
  slides,
  autoplayInterval = 6000,
  transitionDuration = 700,
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showText, setShowText] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const totalSlides = slides.length

  // Auto-advance
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [currentSlide, isPaused])

  // Control video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      
      if (index === currentSlide) {
        // Play video when it's the current slide
        video.play().catch(err => console.log('Video play error:', err))
      } else {
        // Pause and reset other videos
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentSlide])

  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setShowText(false)

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
      setIsTransitioning(false)
      
      // Delay para animación de texto
      setTimeout(() => {
        setShowText(true)
      }, 200)
    }, transitionDuration)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setShowText(false)

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
      setIsTransitioning(false)
      
      setTimeout(() => {
        setShowText(true)
      }, 200)
    }, transitionDuration)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    
    setIsTransitioning(true)
    setShowText(false)

    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
      
      setTimeout(() => {
        setShowText(true)
      }, 200)
    }, transitionDuration)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section 
      className="relative w-full h-[80dvh] md:h-[100dvh] overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.headline}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <video
                ref={(el) => { videoRefs.current[index] = el }}
                src={slide.src}
                poster={slide.poster}
                loop
                muted
                playsInline
                preload={index === 2 ? 'metadata' : 'none'}
                className="w-full h-full object-cover object-center"
                aria-label={slide.headline}
              />
            )}
            
            {/* Gradient overlay — más oscuro abajo-izquierda donde está el texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-end justify-start px-6 md:px-12 lg:px-16 pb-16 md:pb-20">
        <div className="text-left max-w-lg">
          {/* Eyebrow */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showText
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: showText ? '0ms' : '0ms' }}
          >
            <p className="font-body text-xs text-white/60 mb-3 tracking-[0.2em] uppercase">
              {currentSlideData.eyebrow}
            </p>
          </div>

          {/* Headline */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showText
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: showText ? '150ms' : '0ms' }}
          >
            <h1 
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 tracking-tight leading-tight"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
            >
              {currentSlideData.headline}
            </h1>
          </div>

          {/* Subheadline */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showText
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: showText ? '300ms' : '0ms' }}
          >
            <p 
              className="font-body text-sm md:text-base text-white/80 mb-5 md:mb-7 max-w-sm leading-relaxed"
            >
              {currentSlideData.subheadline}
            </p>
          </div>

          {/* CTA */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showText
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: showText ? '450ms' : '0ms' }}
          >
            {currentSlideData.cta.onClick ? (
              <button
                onClick={currentSlideData.cta.onClick}
                className="btn-hero group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:border-white hover:text-[#1B2A41] text-white transition-all duration-300 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium rounded-none"
              >
                {currentSlideData.cta.text}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            ) : (
              <Link to={currentSlideData.cta.link}>
                <button
                  className="btn-hero group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white hover:border-white hover:text-[#1B2A41] text-white transition-all duration-300 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium rounded-none"
                >
                  {currentSlideData.cta.text}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>



      {/* Dots Indicator */}
      <div className="absolute bottom-5 right-6 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-6 h-1.5'
                : 'bg-white/40 hover:bg-white/60 w-1.5 h-1.5'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>


    </section>
  )
}