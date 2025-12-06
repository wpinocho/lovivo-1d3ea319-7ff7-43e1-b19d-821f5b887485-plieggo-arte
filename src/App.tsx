import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking-utils";
import { CartProvider } from "@/contexts/CartContext";
import { CartUIProvider } from "@/components/CartProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { PixelProvider } from "@/contexts/PixelContext";
import { PostHogProvider } from "@/contexts/PostHogContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import CollectionAcordeon from "./pages/CollectionAcordeon";
import CollectionEspacio from "./pages/CollectionEspacio";
import AllProducts from "./pages/AllProducts";
import TopSellers from "./pages/TopSellers";

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