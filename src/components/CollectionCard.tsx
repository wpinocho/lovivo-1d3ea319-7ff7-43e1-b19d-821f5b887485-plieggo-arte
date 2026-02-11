import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
  eager?: boolean
}

export const CollectionCard = ({ collection, onViewProducts, eager }: CollectionCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-muted overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : undefined}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading text-foreground font-bold text-xl line-clamp-1">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm font-medium">
                Destacada
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full btn-hero-outline"
            onClick={() => onViewProducts(collection.id)}
          >
            Ver Productos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}