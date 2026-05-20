import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Hand, Sparkles, Truck, RotateCcw, Check } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionNavigationCard } from '@/components/CollectionNavigationCard';
import { FloatingCart } from '@/components/FloatingCart';
import { InspirationCarousel } from '@/components/InspirationCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import type { HeroSlide } from '@/components/HeroCarousel';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Link } from 'react-router-dom';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { supabase, type Product } from '@/lib/supabase';
import { STORE_ID } from '@/lib/config';
import { useBundles } from '@/hooks/useBundles';
import { BundleCard } from '@/components/ui/BundleCard';
import { MixMatchBundleCard } from '@/components/MixMatchBundleCard';
import { NewsletterSection } from '@/components/NewsletterSection';

type ProductWithCollection = Product & { collectionType?: 'espacio' | 'acordeon' | 'prisma' }

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

  // Bundles
  const { bundles, loading: loadingBundles } = useBundles();

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
          .in('handle', ['coleccion-espacio', 'coleccin-acorden', 'acordeon-prisma']);

        const espacioCollectionId = collectionData?.find(c => c.handle === 'coleccion-espacio')?.id;
        const acordeonCollectionId = collectionData?.find(c => c.handle === 'coleccin-acorden')?.id;
        const prismaCollectionId = collectionData?.find(c => c.handle === 'acordeon-prisma')?.id;

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
          const isPrisma = productCollections.includes(prismaCollectionId);
          
          return {
            ...product,
            collectionType: isEspacio ? 'espacio' as const : isAcordeon ? 'acordeon' as const : isPrisma ? 'prisma' as const : undefined
          };
        });

        // Ordenar: Espacio → Acordeón → Prisma → otros
        const ORDER: Record<string, number> = { espacio: 1, acordeon: 2, prisma: 3 };
        enhanced.sort((a, b) => (ORDER[a.collectionType ?? ''] ?? 4) - (ORDER[b.collectionType ?? ''] ?? 4));

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
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779301620051-88tz4z58bt7.webp',
      eyebrow: 'Los favoritos de nuestros clientes',
      headline: 'Arte hecho a mano que transforma tu espacio',
      subheadline: 'Cada pliegue crea sombras únicas que cambian con la luz del día',
      cta: {
        text: 'Ver más vendidos',
        link: '/top-sellers'
      }
    },
    {
      type: 'image',
      src: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp',
      eyebrow: 'Toda la colección',
      headline: 'Encuentra tu pieza perfecta',
      subheadline: 'Explora cada formato, color y tamaño — hecho a mano en México',
      cta: {
        text: 'Ver todos los cuadros',
        link: '/all-products'
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
        link: '/galeria'
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
      <section className="py-12 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-8">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Encuentra tu estilo
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Explora nuestras colecciones
            </h2>
          </div>
          
          {loadingCollections ? (
            <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none scrollbar-hide pb-4 md:pb-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[65vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center bg-muted rounded-sm animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none scrollbar-hide pb-4 md:pb-0">

              {/* Card 1: Más Vendidos */}
              <div className="w-[65vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center">
                <CollectionNavigationCard 
                  title="Más Vendidos"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069342-nd9nl70mgv.webp"
                  link="/top-sellers"
                  eager={true}
                />
              </div>

              {/* Card 2: Colección Acordeón */}
              <div className="w-[65vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center">
                <CollectionNavigationCard 
                  title="Colección Acordeón"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1i4gabj0it4.webp"
                  link="/coleccion-acordeon"
                />
              </div>

              {/* Card 3: Colección Espacio */}
              <div className="w-[65vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center">
                <CollectionNavigationCard 
                  title="Colección Espacio"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-1ra0u85wh3j.webp"
                  link="/coleccion-espacio"
                />
              </div>

              {/* Card 4: Todos los cuadros */}
              <div className="w-[65vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center">
                <CollectionNavigationCard 
                  title="Todos los cuadros"
                  image="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1779296069343-2ifge8n87sv.webp"
                  link="/all-products"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Strip — 4 pilares de valor */}
      <section className="py-10 border-y border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Hand className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Hecho a mano en México</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Arte que cambia con la luz</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Envío asegurado</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-6 h-6 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Devoluciones sin preguntas</span>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    aspectRatio={
                      product.collectionType === 'espacio' 
                        ? 'square' 
                        : product.collectionType === 'acordeon' || product.collectionType === 'prisma'
                        ? 'rectangle'
                        : 'auto'
                    }
                    hoverImageIndex={product.collectionType === 'espacio' ? 1 : 2}
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

      {/* Bundles Section — solo visible si hay paquetes activos */}
      {(loadingBundles || bundles.length > 0) && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl font-bold text-foreground tracking-tight mb-2">
              Paquetes especiales
            </h2>
            <p className="font-body text-muted-foreground mb-10">
              Lleva varios cuadros juntos y ahorra
            </p>

            {loadingBundles ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="bg-muted rounded-sm aspect-square animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {bundles.map(bundle =>
                  bundle.bundle_type === 'mix_match' || bundle.bundle_type === 'mix_match_variant' ? (
                    <MixMatchBundleCard key={bundle.id} bundle={bundle} />
                  ) : (
                    <BundleCard key={bundle.id} bundle={bundle} />
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gift Ideas Section — Editorial Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm">
            {/* Imagen izquierda */}
            <div className="relative aspect-[4/3] md:aspect-auto min-h-[320px]">
              <img
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/black-dining.webp"
                alt="Cuadro Plieggo en comedor elegante"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Texto derecha */}
            <div className="bg-muted/50 px-8 py-12 md:px-14 md:py-16 flex flex-col justify-center">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Para ti o para regalar
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                Arte que nunca falla como regalo
              </h2>
              <p className="font-body text-muted-foreground mb-8 text-base leading-relaxed">
                Cada pieza llega lista para entregar, con empaque premium y dedicatoria personalizada.
              </p>

              {/* Bullets */}
              <ul className="space-y-2.5 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body">Empaque premium incluido</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body">Dedicatoria personalizada gratis</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body">Envío en 5-7 días hábiles</span>
                </li>
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/all-products">
                  <Button className="btn-hero w-full sm:w-auto">
                    Explorar cuadros →
                  </Button>
                </Link>
                <Link to="/galeria">
                  <Button
                    variant="outline"
                    className="btn-hero-outline w-full sm:w-auto"
                  >
                    Ver galería de espacios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <InspirationCarousel />

      {/* Newsletter Club Plieggo */}
      <NewsletterSection />

      <FloatingCart />


    </EcommerceTemplate>
  );
};