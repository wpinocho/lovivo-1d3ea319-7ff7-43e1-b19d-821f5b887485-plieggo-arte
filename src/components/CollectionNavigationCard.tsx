import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface CollectionNavigationCardProps {
  title: string
  image: string
  link: string
  onClick?: () => void
  eager?: boolean
}

export const CollectionNavigationCard = ({ 
  title, 
  image, 
  link, 
  onClick,
  eager 
}: CollectionNavigationCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Link 
      to={link} 
      onClick={handleClick}
      className="collection-card group relative block overflow-hidden rounded-sm bg-card aspect-square flex-shrink-0"
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
      </div>
      
      {/* Title y CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-background tracking-tight leading-tight">
          {title}
        </h3>
        
        {/* CTA Button - Siempre visible */}
        <Button 
          size="sm" 
          variant="secondary"
          className="bg-background text-foreground hover:bg-background/90 font-medium text-sm transition-all duration-300 group-hover:translate-x-1"
        >
          Explorar →
        </Button>
      </div>
    </Link>
  )
}