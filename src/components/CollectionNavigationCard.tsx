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
      className="collection-card group relative block overflow-hidden rounded-sm bg-card aspect-[4/3]"
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      </div>
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading text-2xl font-bold text-background tracking-tight">
          {title}
        </h3>
      </div>
    </Link>
  )
}