import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Copy, Check, Landmark, Mail, ArrowLeft, Store, Info } from 'lucide-react'
import { formatMoney } from '@/lib/money'
import { useToast } from '@/hooks/use-toast'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

interface PendingPayment {
  method: 'spei' | 'oxxo'
  orderId: string
  amount: number
  currency: string
  // SPEI
  hostedUrl?: string
  clabe?: string
  bankName?: string
  // OXXO
  voucherUrl?: string
  number?: string
  expiresAfter?: number
}

const CopyRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast({ title: 'Copiado', description: `${label} copiado al portapapeles.` })
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast({ title: 'No se pudo copiar', description: 'Copia el dato manualmente.', variant: 'destructive' })
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-medium break-all">{value}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="shrink-0"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="ml-1.5">{copied ? 'Copiado' : 'Copiar'}</span>
      </Button>
    </div>
  )
}

const PagoPendiente = () => {
  const { orderId } = useParams()
  const [pending, setPending] = useState<PendingPayment | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    try {
      const raw = sessionStorage.getItem('pending_payment')
      if (raw) {
        const parsed = JSON.parse(raw) as PendingPayment
        setPending(parsed)
      }
    } catch {
      setPending(null)
    }
  }, [])

  const orderNumber = (pending?.orderId || orderId || '').slice(0, 8)
  const isSpei = pending?.method === 'spei'

  return (
    <EcommerceTemplate pageTitle="Pago pendiente" showCart={true}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Ya casi es tuyo!
          </h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto">
            Tu pedido está apartado. Solo falta completar el pago con las instrucciones de abajo
            para que preparemos tu envío.
          </p>
          {orderNumber && (
            <Badge variant="secondary" className="text-sm">
              Pedido #{orderNumber}
            </Badge>
          )}
        </div>

        {/* Payment instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isSpei ? <Landmark className="w-5 h-5" /> : <Store className="w-5 h-5" />}
              {isSpei ? 'Datos para tu transferencia' : 'Instrucciones de pago en OXXO'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount */}
            {pending?.amount != null && (
              <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">Monto a pagar</span>
                <span className="text-xl font-bold">
                  {formatMoney(pending.amount, pending.currency)}
                </span>
              </div>
            )}

            {isSpei ? (
              <div className="divide-y">
                <CopyRow label="Beneficiario" value="Plieggo Arte" />
                {pending?.clabe && <CopyRow label="CLABE" value={pending.clabe} />}
                {pending?.bankName && (
                  <div className="py-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Banco</p>
                    <p className="font-medium">{pending.bankName}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {pending?.number && <CopyRow label="Número de referencia" value={pending.number} />}
                {pending?.voucherUrl && (
                  <Button asChild className="w-full" size="lg">
                    <a href={pending.voucherUrl} target="_blank" rel="noopener noreferrer">
                      Ver e imprimir mi ficha OXXO
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Hosted instructions link (SPEI) */}
            {isSpei && pending?.hostedUrl && (
              <Button asChild variant="outline" className="w-full">
                <a href={pending.hostedUrl} target="_blank" rel="noopener noreferrer">
                  Ver instrucciones completas
                </a>
              </Button>
            )}

            <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                {isSpei ? (
                  <>Realiza la transferencia por el monto exacto. En cuanto recibamos el pago
                  (normalmente en minutos), confirmaremos tu pedido y comenzaremos a prepararlo.</>
                ) : (
                  <>Paga en cualquier tienda OXXO antes de la fecha de vencimiento. En cuanto
                  registremos tu pago confirmaremos tu pedido y comenzaremos a prepararlo.</>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fallback when no instructions in session */}
        {!pending && (
          <Card className="mt-4">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Tu pago quedó pendiente. Te enviamos las instrucciones de pago a tu correo.
                Revisa tu bandeja de entrada (y la carpeta de spam) para completar tu compra.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Next steps */}
        <div className="mt-6 rounded-lg border bg-card p-5">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            ¿Qué sigue?
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>• Te enviamos estos datos también por correo, por si necesitas pagar más tarde.</li>
            <li>• Cuando confirmemos tu pago, recibirás la confirmación de tu pedido.</li>
            <li>• Envío gratis a todo México. Entrega en 5 a 7 días hábiles tras confirmar el pago.</li>
          </ul>
        </div>

        <Separator className="my-8" />

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </EcommerceTemplate>
  )
}

export default PagoPendiente