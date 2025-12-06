import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionNavigationCard } from '@/components/CollectionNavigationCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Link } from 'react-router-dom';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI (Plieggo)
 * 
 * Página principal con diseño Moderno Mexicano
 * Paleta: Crema Mantequilla, Azul Medianoche, Terracota, Vino Burdeos
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* SECCIÓN 1: Hero Section - Mitad de pantalla */}
      <section className="relative h-[50vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <video 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/store-videos/1d3ea319-7ff7-43e1-b19d-821f5b887485/hero-paper-folding.mp4"
            poster="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/hero-paper-folding-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Manos doblando papel artístico"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        
        <div className="relative h-full flex items-end justify-center pb-16">
          <div className="text-center">
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              Plieggo
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-md mx-auto">
              Arte en papel hecho a mano
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Statement de Marca - Con mucho padding */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            Pliegues que transforman espacios
          </h2>
          <p className="font-body text-2xl text-muted-foreground mb-12 leading-relaxed">
            Arte mexicano hecho a mano, accesible y con carácter arquitectónico.
          </p>
          
          <Link to="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="btn-hero-outline"
            >
              Conoce la historia
            </Button>
          </Link>
        </div>
      </section>

      {/* SECCIÓN 3: Navegación Visual / Carrusel de Colecciones */}
      <section className="py-16 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="carousel-container group">
            <div className="carousel-track">
              {/* Card 1: Todos los cuadros */}
              <CollectionNavigationCard 
                title="Todos los cuadros"
                image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764996809955-ayg66qfvgl.png"
                link="/all-products"
              />

              {/* Card 2: Top Sellers */}
              {!loadingCollections && collections.find(c => c.handle === 'top-sellers') && (
                <CollectionNavigationCard 
                  title="Top Sellers"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers.jpg"
                  link="/top-sellers"
                />
              )}

              {/* Card 3: Colección Acordeón */}
              {!loadingCollections && collections.find(c => c.handle === 'coleccion-acordeon') && (
                <CollectionNavigationCard 
                  title="Colección Acordeón"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon.jpg"
                  link="/coleccion-acordeon"
                />
              )}

              {/* Card 4: Colección Espacio */}
              {!loadingCollections && collections.find(c => c.handle === 'coleccion-espacio') && (
                <CollectionNavigationCard 
                  title="Colección Espacio"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764997368709-im0m2rvtb7.png"
                  link="/coleccion-espacio"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground tracking-tight">
              {selectedCollectionId 
                ? collections.find(c => c.id === selectedCollectionId)?.name || 'Productos'
                : 'Nuestros Cuadros'
              }
            </h2>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="btn-hero-outline"
              >
                Ver todos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-xl text-muted-foreground">
                No hay productos disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gift Ideas Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
            Explora ideas de regalo y accesorios de temporada
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-32 bg-border"></div>
            <Link 
              to="/top-sellers"
              className="font-body text-xl text-muted-foreground hover:text-secondary transition-colors"
            >
              Descubre regalos
            </Link>
            <div className="h-px w-32 bg-border"></div>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};