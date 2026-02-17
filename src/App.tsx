import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { trackPageView } from "@/lib/tracking-utils";
import { CartProvider } from "@/contexts/CartContext";
import { CartUIProvider } from "@/components/CartProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { PixelProvider } from "@/contexts/PixelContext";
import { PostHogProvider } from "@/contexts/PostHogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PageLoader } from "@/components/PageLoader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load routes for better performance
const Product = lazy(() => import('./pages/Product'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Cart = lazy(() => import('./pages/Cart'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const CollectionAcordeon = lazy(() => import('./pages/CollectionAcordeon'));
const CollectionEspacio = lazy(() => import('./pages/CollectionEspacio'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const TopSellers = lazy(() => import('./pages/TopSellers'));

const queryClient = new QueryClient();

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <PixelProvider>
        <PostHogProvider>
          <AuthProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <CartUIProvider>
                    <PageViewTracker />
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products/:slug" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/thank-you/:orderId" element={<ThankYou />} />
                        <Route path="/my-orders" element={<MyOrders />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/coleccion-acordeon" element={<CollectionAcordeon />} />
                        <Route path="/coleccion-espacio" element={<CollectionEspacio />} />
                        <Route path="/all-products" element={<AllProducts />} />
                        <Route path="/top-sellers" element={<TopSellers />} />
                        {/* Aquí puedes agregar/modificar rutas */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </CartUIProvider>
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </AuthProvider>
        </PostHogProvider>
      </PixelProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;