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
      className="relative w-full aspect-video max-h-[85vh] overflow-hidden bg-background"
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
            
            {/* Gradient overlay para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          {/* Eyebrow */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showText
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: showText ? '0ms' : '0ms' }}
          >
            <p className="font-body text-sm md:text-base text-white/90 mb-4 tracking-wider uppercase">
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
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
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
              className="font-body text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
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
            <Link to={currentSlideData.cta.link}>
              <Button
                size="lg"
                className="btn-hero group relative overflow-hidden shadow-[0_0_30px_rgba(193,102,72,0.4)] hover:shadow-[0_0_50px_rgba(193,102,72,0.6)] transition-all duration-500 hover:scale-105 hover:-translate-y-1 text-lg px-10 py-7 h-auto"
              >
                <span className="relative z-10 flex items-center gap-3 font-bold tracking-wide text-xl">
                  {currentSlideData.cta.text}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 text-2xl">→</span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Desktop */}
      <div className="hidden md:block">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-10 h-3'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1.5 h-2 bg-white/70 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  )
}