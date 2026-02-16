import { ReactNode, useState } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  // No mostrar WhatsApp en checkout
  const showWhatsApp = !location.pathname.includes('/checkout')

  const header = (
    <div className={`py-4 bg-background/95 backdrop-blur ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10"
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/all-products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-lg text-foreground hover:text-primary py-3 border-b border-border"
                >
                  Todos los Cuadros
                </Link>
                <Link 
                  to="/top-sellers" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-lg text-foreground hover:text-primary py-3 border-b border-border"
                >
                  Más Vendidos
                </Link>
                <Link 
                  to="/coleccion-acordeon" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-lg text-foreground hover:text-primary py-3 border-b border-border"
                >
                  Acordeón
                </Link>
                <Link 
                  to="/coleccion-espacio" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-lg text-foreground hover:text-primary py-3 border-b border-border"
                >
                  Espacio
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-body text-lg text-foreground hover:text-primary py-3 border-b border-border"
                >
                  Nosotros
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/all-products" 
              className="font-body text-lg text-muted-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 px-2 py-1.5 rounded-sm whitespace-nowrap"
            >
              Todos los Cuadros
            </Link>
            <Link 
              to="/top-sellers" 
              className="font-body text-lg text-muted-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 px-2 py-1.5 rounded-sm whitespace-nowrap"
            >
              Más Vendidos
            </Link>
            <Link 
              to="/coleccion-acordeon" 
              className="font-body text-lg text-muted-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 px-2 py-1.5 rounded-sm whitespace-nowrap"
            >
              Acordeón
            </Link>
            <Link 
              to="/coleccion-espacio" 
              className="font-body text-lg text-muted-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 px-2 py-1.5 rounded-sm whitespace-nowrap"
            >
              Espacio
            </Link>
            <Link 
              to="/about" 
              className="font-body text-lg text-muted-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 px-2 py-1.5 rounded-sm whitespace-nowrap"
            >
              Nosotros
            </Link>
          </nav>

          {/* Cart */}
          <div className="flex items-center space-x-2 ml-auto">
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10 h-10 w-10 md:h-14 md:w-14"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-6 w-6 md:h-10 md:w-10" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs md:text-sm font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-secondary text-secondary-foreground py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1765330504462-dyr43cg78.png" 
                alt="Plieggo Logo" 
                className="w-[60px] h-[60px] object-contain"
              />
              <span className="font-heading text-3xl font-bold text-secondary-foreground">
                Plieggo
              </span>
            </div>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-md">
              Arte en papel hecho a mano. Pliegues que transforman espacios con carácter arquitectónico.
            </p>
          </div>

          {/* Links & Social */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-4 text-secondary-foreground">Navegación</h3>
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="block font-body text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Inicio
                </Link>
                <Link 
                  to="/about" 
                  className="block font-body text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-4 text-secondary-foreground">Síguenos</h3>
              <div className="flex items-center gap-4">
                <SocialLinks />
                <a
                  href="https://www.instagram.com/p_de_plieggo?igsh=MTYzbDRiZmNsemV2eQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                  title="Síguenos en Instagram"
                  className="opacity-70 hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary-foreground/50 rounded p-1 hover:scale-110"
                >
                  <img
                    src="/social-icons/instagram.svg"
                    alt="Instagram"
                    className="h-5 w-5 filter brightness-0 dark:invert"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 text-center">
          <p className="font-body text-sm text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Plieggo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <AnnouncementBar />
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
      {showWhatsApp && (
        <FloatingWhatsApp 
          phoneNumber="+52 55 3121 5386"
          message="¡Hola! Tengo una pregunta sobre los cuadros de Plieggo"
          tooltip="¿Necesitas ayuda?"
          showTooltip={true}
        />
      )}
    </>
  )
}