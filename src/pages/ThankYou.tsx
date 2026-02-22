import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Mail, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react'
import { formatMoney } from '@/lib/money'
import { useToast } from '@/hooks/use-toast'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { supabase } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import type { Product } from '@/lib/supabase'

interface OrderDetails {
  id: string
  order_number: string
  total_amount: number
  subtotal?: number
  discount_amount?: number
  discount_code?: string
  currency_code: string
  status: string
  shipping_address?: any
  billing_address?: any
  order_items: any[]
  created_at: string
}

const ThankYou = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [upsellProducts, setUpsellProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }

    const loadOrder = () => {
      try {
        // Try to get order from localStorage (saved from successful payment)
        const completedOrderJson = localStorage.getItem('completed_order')
        if (completedOrderJson) {
          const completedOrder = JSON.parse(completedOrderJson)
          setOrder(completedOrder)
          // Clean up localStorage
          localStorage.removeItem('completed_order')
          
          // Restaurar carrito backup si existía (buy_now preserva el carrito original)
          try {
            const cartBackup = sessionStorage.getItem('cart_backup')
            if (cartBackup) {
              sessionStorage.setItem('cart', cartBackup)
              sessionStorage.removeItem('cart_backup')
              console.log('Cart restored after buy_now purchase')
            }
          } catch (e) {
            console.error('Error restoring cart backup:', e)
          }
        } else {
          setOrder(null)
        }
      } catch (error) {
        console.error('Error loading order:', error)
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  // Fetch upsell products after order is loaded
  useEffect(() => {
    if (!order) return

    const loadUpsell = async () => {
      try {
        // Get IDs of products already purchased to exclude them
        const purchasedIds = order.order_items
          .map(item => item.product_id)
          .filter(Boolean)

        let query = supabase
          .from('products')
          .select('*')
          .eq('store_id', STORE_ID)
          .eq('status', 'active')
          .limit(4)

        if (purchasedIds.length > 0) {
          query = query.not('id', 'in', `(${purchasedIds.join(',')})`)
        }

        const { data, error } = await query
        if (!error && data) {
          setUpsellProducts(data)
        }
      } catch (e) {
        // Silent fail — upsell is non-critical
      }
    }

    loadUpsell()
  }, [order])

  if (loading) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!order) {
    return (
      <EcommerceTemplate showCart={true}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="border-dashed">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-muted p-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">No se encontró el pedido</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Parece que aún no has completado una compra, o este enlace de pedido ha expirado.
                  </p>
                </div>
                <Button 
                  size="lg"
                  asChild
                  className="mt-4"
                >
                  <Link to="/">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Comenzar a Comprar
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate pageTitle="Confirmación de Pedido" showCart={true}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Pago Confirmado!
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>
          <Badge variant="secondary" className="text-sm">
            Pedido #{order.order_number}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {order.order_items.filter(item => item.quantity > 0).map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Product Image */}
                    {item.product_images && item.product_images.length > 0 && (
                      <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.product_images[0]} 
                          alt={item.product_name || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p className="font-medium">{item.product_name || 'Product'}</p>
                      {item.variant_name && (
                        <p className="text-sm text-muted-foreground">
                          {item.variant_name}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatMoney(item.price * item.quantity, order.currency_code)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                {order.subtotal !== undefined && (
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatMoney(order.subtotal, order.currency_code)}</span>
                  </div>
                )}
                
                {order.discount_amount && order.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento{order.discount_code ? ` (${order.discount_code})` : ''}</span>
                    <span>- {formatMoney(order.discount_amount, order.currency_code)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{formatMoney(order.total_amount, order.currency_code)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Información de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.shipping_address ? (
                <div>
                  <h4 className="font-medium mb-2">Dirección de Envío:</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{order.shipping_address.first_name || ''} {order.shipping_address.last_name || ''}</p>
                    <p>{order.shipping_address.line1 || order.shipping_address.address1 || ''}</p>
                    {(order.shipping_address.line2 || order.shipping_address.address2) && <p>{order.shipping_address.line2 || order.shipping_address.address2}</p>}
                    <p>{order.shipping_address.city || ''}, {order.shipping_address.state || order.shipping_address.province || ''}</p>
                    <p>{order.shipping_address.postal_code || order.shipping_address.zip || ''} {order.shipping_address.country || ''}</p>
                    {order.shipping_address.phone && <p>Teléfono: {order.shipping_address.phone}</p>}
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium mb-2">Método de Entrega:</h4>
                  <p className="text-sm text-muted-foreground">Recoger en Tienda</p>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Próximos Pasos:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Recibirás un correo de confirmación</li>
                  <li>• Te notificaremos cuando tu pedido esté listo</li>
                  <li>• Puedes rastrear tu pedido con el número #{order.order_number}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upsell Section */}
        {upsellProducts.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Mientras esperas tu pedido</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Otras piezas que te podrían interesar
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {upsellProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="group block"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {/* Image */}
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-3 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-300">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-semibold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {product.title}
                  </h3>
                  <p className="font-bold text-base md:text-lg">
                    {formatMoney(product.price || 0, order!.currency_code)}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 group-hover:gap-2 transition-all">
                    Ver pieza
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Seguir Comprando
            </Link>
          </Button>
        </div>
      </div>
    </EcommerceTemplate>
  )
}

export default ThankYou