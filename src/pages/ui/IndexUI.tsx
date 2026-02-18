import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionNavigationCard } from '@/components/CollectionNavigationCard';
import { FloatingCart } from '@/components/FloatingCart';
import { InspirationCarousel } from '@/components/InspirationCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import type { HeroSlide } from '@/components/HeroCarousel';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { InteractiveGalleryModal } from '@/components/InteractiveGalleryModal';
import { Link } from 'react-router-dom';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { supabase, type Product } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';

type ProductWithCollection = Product & { collectionType?: 'espacio' | 'acordeon' }

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

  // Estado para controlar si mostrar todos los productos o solo 2 líneas (8 productos)
  const [showAllProducts, setShowAllProducts] = useState(false);
  const PRODUCTS_PER_ROW = 4;
  const INITIAL_ROWS = 2;
  const initialProductCount = PRODUCTS_PER_ROW * INITIAL_ROWS; // 8 productos

  // Estado para controlar la galería interactiva
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Estado para productos con información de colección
  const [productsWithCollection, setProductsWithCollection] = useState<ProductWithCollection[]>([]);

  // Fetch collection info for products
  useEffect(() => {
    const fetchCollectionInfo = async () => {
      if (filteredProducts.length === 0) {
        setProductsWithCollection([]);
        return;
      }

      try {
        // Get Espacio and Acordeon collection IDs
        const { data: collectionData } = await supabase
          .from('collections')
          .select('id, handle')
          .eq('store_id', STORE_ID)
          .in('handle', ['coleccion-espacio', 'coleccion-acordeon']);

        const espacioCollectionId = collectionData?.find(c => c.handle === 'coleccion-espacio')?.id;
        const acordeonCollectionId = collectionData?.find(c => c.handle === 'coleccion-acordeon')?.id;

        // Get all collection_products relationships
        const { data: allCollectionProducts } = await supabase
          .from('collection_products')
          .select('product_id, collection_id')
          .in('product_id', filteredProducts.map(p => p.id));

        // Map products with their collection type
        const enhanced: ProductWithCollection[] = filteredProducts.map(product => {
          const productCollections = allCollectionProducts?.filter(cp => cp.product_id === product.id).map(cp => cp.collection_id) || [];
          const isEspacio = productCollections.includes(espacioCollectionId);
          const isAcordeon = productCollections.includes(acordeonCollectionId);
          
          return {
            ...product,
            collectionType: isEspacio ? 'espacio' as const : isAcordeon ? 'acordeon' as const : undefined
          };
        });

        setProductsWithCollection(enhanced);
      } catch (error) {
        console.error('Error fetching collection info:', error);
        setProductsWithCollection(filteredProducts);
      }
    };

    fetchCollectionInfo();
  }, [filteredProducts]);

  // Productos a mostrar según el estado
  const displayedProducts = showAllProducts 
    ? productsWithCollection 
    : productsWithCollection.slice(0, initialProductCount);

  // Hero slides configuration
  const heroSlides: HeroSlide[] = [
    {
      type: 'image',
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1770920004212-qzo0zur4y1s.jpg',
      eyebrow: 'Nueva Colección 2026',
      headline: 'Colección Acordeón',
      subheadline: 'Pliegues rítmicos que transforman paredes en esculturas de luz',
      cta: {
        text: 'Ver Colección',
        link: '/coleccion-acordeon'
      }
    },
    {
      type: 'image',
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1770920004212-kmwss797mgr.jpg',
      eyebrow: 'Bestseller',
      headline: 'Colección Espacio',
      subheadline: 'Geometría tridimensional que desafía tu percepción del espacio',
      cta: {
        text: 'Explorar Espacio',
        link: '/coleccion-espacio'
      }
    },
    {
      type: 'video',
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/store-videos/1d3ea319-7ff7-43e1-b19d-821f5b887485/hero-paper-folding.mp4',
      poster: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/hero-paper-folding-poster.jpg',
      eyebrow: '100% Hecho a Mano',
      headline: 'Arte que respira',
      subheadline: 'Cada pieza es única, cada pliegue cuenta una historia',
      cta: {
        text: 'Descubre regalos',
        link: '/about',
        onClick: () => setIsGalleryOpen(true)
      }
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset showAllProducts cuando cambian los productos filtrados
  useEffect(() => {
    setShowAllProducts(false);
  }, [selectedCollectionId, filteredProducts.length]);

  return (
    <EcommerceTemplate 
      showCart={true}
      layout='full-width'
    >
      {/* HERO CAROUSEL - Fullscreen con 3 slides */}
      <HeroCarousel slides={heroSlides} />

      {/* Navegación Visual / Carrusel de Colecciones */}
      <section className="py-8 bg-muted/30 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título de sección */}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 text-center tracking-tight">
            Explora nuestras colecciones
          </h2>
          
          {loadingCollections ? (
            <div className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] bg-muted rounded-sm animate-pulse aspect-square flex-shrink-0 snap-center" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {/* Touch scrollable carousel - Peek optimizado */}
              <div className="w-[78vw] sm:w-[320px] flex-shrink-0 snap-center">
                <CollectionNavigationCard 
                  title="Todos los cuadros"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/all-products-hero.webp"
                  link="/all-products"
                  eager={true}
                />
              </div>

              {/* Card 2: Más Vendidos */}
              {collections.find(c => c.handle === 'top-sellers') && (
                <div className="w-[78vw] sm:w-[320px] flex-shrink-0 snap-center">
                  <CollectionNavigationCard 
                    title="Más Vendidos"
                    image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/top-sellers-hero.webp"
                    link="/top-sellers"
                  />
                </div>
              )}

              {/* Card 3: Colección Acordeón */}
              {collections.find(c => c.handle === 'coleccion-acordeon') && (
                <div className="w-[78vw] sm:w-[320px] flex-shrink-0 snap-center">
                  <CollectionNavigationCard 
                    title="Colección Acordeón"
                    image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon-hero.webp"
                    link="/coleccion-acordeon"
                  />
                </div>
              )}

              {/* Card 4: Colección Espacio */}
              {collections.find(c => c.handle === 'coleccion-espacio') && (
                <div className="w-[78vw] sm:w-[320px] flex-shrink-0 snap-center">
                  <CollectionNavigationCard 
                    title="Colección Espacio"
                    image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/espacio-hero.webp"
                    link="/coleccion-espacio"
                  />
                </div>
              )}
            </div>
          )}
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
                <div key={i} className="space-y-3">
                  <div className="bg-muted rounded-sm aspect-square animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          ) : productsWithCollection.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    aspectRatio={
                      product.collectionType === 'espacio' 
                        ? 'square' 
                        : product.collectionType === 'acordeon'
                        ? 'rectangle'
                        : 'auto'
                    }
                  />
                ))}
              </div>
              
              {/* Botón "Ver más" - Solo se muestra si hay más de 8 productos y no están todos visibles */}
              {productsWithCollection.length > initialProductCount && !showAllProducts && (
                <div className="flex justify-center mt-12">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowAllProducts(true)}
                    className="btn-hero-outline"
                  >
                    Ver más
                  </Button>
                </div>
              )}
            </>
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
          
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => setIsGalleryOpen(true)}
              size="lg"
              className="btn-hero group relative overflow-hidden shadow-[0_0_30px_rgba(193,102,72,0.4)] hover:shadow-[0_0_50px_rgba(193,102,72,0.6)] transition-all duration-500 hover:scale-105 hover:-translate-y-1 text-lg px-10 py-7 h-auto"
            >
              <span className="relative z-10 flex items-center gap-3 font-bold tracking-wide text-xl">
                Descubre regalos
                <span className="transition-transform duration-300 group-hover:translate-x-1 text-2xl">→</span>
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <InspirationCarousel />

      <FloatingCart />

      {/* Interactive Gallery Modal */}
      <InteractiveGalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </EcommerceTemplate>
  );
};