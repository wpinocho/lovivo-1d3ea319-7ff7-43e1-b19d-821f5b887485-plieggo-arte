import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'

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

  const header = (
    <div className={`py-4 bg-background/95 backdrop-blur ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/all-products" 
              className="font-body text-base text-muted-foreground hover:text-secondary transition-colors"
            >
              Todos los Cuadros
            </Link>
            <Link 
              to="/top-sellers" 
              className="font-body text-base text-muted-foreground hover:text-secondary transition-colors"
            >
              Más Vendidos
            </Link>
            <Link 
              to="/coleccion-acordeon" 
              className="font-body text-base text-muted-foreground hover:text-secondary transition-colors"
            >
              Acordeón
            </Link>
            <Link 
              to="/coleccion-espacio" 
              className="font-body text-base text-muted-foreground hover:text-secondary transition-colors"
            >
              Espacio
            </Link>
            <Link 
              to="/about" 
              className="font-body text-base text-muted-foreground hover:text-secondary transition-colors"
            >
              Sobre Nosotros
            </Link>
          </nav>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative hover:bg-primary/10"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
            <div className="mb-4">
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
              <SocialLinks />
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
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}