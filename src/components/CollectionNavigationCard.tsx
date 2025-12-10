import { Link } from 'react-router-dom'

interface CollectionNavigationCardProps {
  title: string
  image: string
  link: string
  onClick?: () => void
}

export const CollectionNavigationCard = ({ 
  title, 
  image, 
  link, 
  onClick 
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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
      </div>
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-background tracking-tight leading-tight">
          {title}
        </h3>
      </div>
    </Link>
  )
}