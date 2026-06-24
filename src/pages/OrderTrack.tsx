import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import OrderTrackUI from './ui/OrderTrackUI'

/**
 * Página pública de rastreo de pedidos.
 * Página delgada (Tipo B): lee :token de la URL, inyecta noindex y monta la UI.
 */
const OrderTrack = () => {
  const { token } = useParams()

  // Contenido transaccional por cliente: no indexar en buscadores.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <EcommerceTemplate pageTitle="Rastrea tu pedido" showCart={true}>
      <OrderTrackUI token={token} />
    </EcommerceTemplate>
  )
}

export default OrderTrack