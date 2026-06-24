/**
 * EDITABLE UI COMPONENT - OrderTrackUI
 * TIPO B - El agente de IA puede editar libremente este componente
 *
 * Página de rastreo de pedidos (estilo Shopify).
 * - Modo token (/orders/track/:token): rastrea automáticamente al montar.
 * - Modo lookup (/orders/track): formulario con # de pedido + email.
 */

import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Copy,
  ExternalLink,
  Search,
  AlertCircle,
  CalendarClock,
  XCircle,
  ShoppingBag,
} from 'lucide-react'
import { callEdge } from '@/lib/edge'
import { STORE_ID } from '@/lib/config'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface TrackStep {
  label?: string
  key?: string
  at?: string | null
  date?: string | null
  occurred_at?: string | null
}

interface TrackEvent {
  occurred_at?: string | null
  status_detail?: string | null
  location?: string | null
}

interface TrackResponse {
  timeline?: {
    steps?: TrackStep[]
    current_step?: number
    cancelled?: boolean
  }
  steps?: TrackStep[]
  current_step?: number
  cancelled?: boolean
  carrier?: string | null
  tracking_number?: string | null
  tracking_url?: string | null
  estimated_delivery_at?: string | null
  events?: TrackEvent[]
  display_mode?: 'detailed' | 'masked'
  order_number?: string | null
  error?: string
}

const DEFAULT_STEP_LABELS = ['Confirmado', 'Preparando', 'Enviado', 'Entregado']

interface OrderTrackUIProps {
  token?: string
}

function safeFormat(value: string | null | undefined, pattern: string): string {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  return format(d, pattern, { locale: es })
}

export default function OrderTrackUI({ token }: OrderTrackUIProps) {
  const { toast } = useToast()
  const [data, setData] = useState<TrackResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'not_found' | 'generic' | null>(null)

  // Lookup form state
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')

  const track = useCallback(async (payload: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const res = (await callEdge('order-track', payload)) as TrackResponse
      if (!res || res.error) {
        setError('not_found')
        setData(null)
        return
      }
      setData(res)
    } catch (e) {
      console.error('order-track error:', e)
      setError('not_found')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      track({ token })
    }
  }, [token, track])

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) {
      toast({
        title: 'Faltan datos',
        description: 'Ingresa tu número de pedido y tu correo.',
        variant: 'destructive',
      })
      return
    }
    track({
      store_id: STORE_ID,
      order_number: orderNumber.trim(),
      email: email.trim(),
    })
  }

  const copyTracking = (value: string) => {
    navigator.clipboard?.writeText(value)
    toast({ title: 'Número de guía copiado' })
  }

  // ---- Loading ----
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  // ---- Error ----
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-muted p-6">
                <AlertCircle className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-xl">No encontramos tu pedido</h3>
              <p className="font-body text-muted-foreground max-w-sm mx-auto">
                Verifica que tu número de pedido y tu correo sean correctos e inténtalo de nuevo.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setError(null)
                setData(null)
              }}
            >
              Intentar de nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---- Lookup form (no token, no data yet) ----
  if (!data) {
    return (
      <div className="max-w-md mx-auto py-10">
        <Card>
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary/10 p-4">
                  <Search className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h2 className="font-heading text-xl font-bold">Rastrea tu pedido</h2>
              <p className="font-body text-sm text-muted-foreground">
                Ingresa tu número de pedido y el correo con el que compraste.
              </p>
            </div>

            <form onSubmit={handleLookup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order_number">Número de pedido</Label>
                <Input
                  id="order_number"
                  placeholder="Ej. 1024"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Rastrear pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---- Result ----
  const steps = data.timeline?.steps ?? data.steps ?? []
  const currentStep = data.timeline?.current_step ?? data.current_step ?? 0
  const cancelled = data.timeline?.cancelled ?? data.cancelled ?? false
  const isMasked = data.display_mode === 'masked'
  const carrier = data.carrier
  const trackingNumber = data.tracking_number
  const trackingUrl = data.tracking_url
  const events = data.events ?? []

  const stepIcons = [Package, Clock, Truck, CheckCircle2]

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      {data.order_number && (
        <p className="font-body text-sm text-muted-foreground text-center">
          Pedido <span className="font-semibold text-foreground">#{data.order_number}</span>
        </p>
      )}

      {/* Cancelled banner */}
      {cancelled && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="py-4 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-destructive shrink-0" />
            <p className="font-body text-sm text-destructive font-medium">
              Este pedido fue cancelado. Si tienes dudas, contáctanos.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Estimated delivery */}
      {!cancelled && data.estimated_delivery_at && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-5 flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3 shrink-0">
              <CalendarClock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                Entrega estimada
              </p>
              <p className="font-heading text-lg font-bold text-foreground">
                {safeFormat(data.estimated_delivery_at, "d 'de' MMMM, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      {steps.length > 0 && !cancelled && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-start justify-between">
              {steps.map((step, i) => {
                const completed = i < currentStep
                const current = i === currentStep
                const Icon = stepIcons[i] ?? CheckCircle2
                const label = step.label || DEFAULT_STEP_LABELS[i] || `Paso ${i + 1}`
                const dateValue = step.at || step.date || step.occurred_at
                return (
                  <div key={step.key || i} className="flex items-center flex-1 last:flex-none">
                    {/* Node */}
                    <div className="flex flex-col items-center text-center shrink-0 w-16">
                      <div
                        className={`flex items-center justify-center h-9 w-9 rounded-full border-2 transition-colors ${
                          completed
                            ? 'bg-primary border-primary text-primary-foreground'
                            : current
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-muted border-border text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`mt-2 text-[11px] leading-tight font-body ${
                          completed || current ? 'text-foreground font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        {label}
                      </span>
                      <span className="mt-0.5 text-[10px] text-muted-foreground h-3">
                        {current && !dateValue ? 'En curso' : safeFormat(dateValue, 'd MMM')}
                      </span>
                    </div>
                    {/* Connector */}
                    {i < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 -mt-6 mx-1 rounded-full ${
                          i < currentStep ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Carrier & tracking (only detailed mode) */}
      {!isMasked && !cancelled && (carrier || trackingNumber || trackingUrl) && (
        <Card>
          <CardContent className="py-6 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <h3 className="font-heading font-semibold">Información de envío</h3>
            </div>
            {carrier && (
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Paquetería</span>
                <span className="font-medium">{carrier}</span>
              </div>
            )}
            {trackingNumber && (
              <div className="flex justify-between items-center text-sm font-body">
                <span className="text-muted-foreground">Número de guía</span>
                <button
                  type="button"
                  onClick={() => copyTracking(trackingNumber)}
                  className="inline-flex items-center gap-1.5 font-medium hover:text-primary transition-colors"
                >
                  {trackingNumber}
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {trackingUrl && (
              <Button asChild variant="outline" className="w-full">
                <a href={trackingUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Rastrear con la paquetería
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Events history (only detailed mode) */}
      {!isMasked && events.length > 0 && (
        <Card>
          <CardContent className="py-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="events" className="border-none">
                <AccordionTrigger className="font-heading font-semibold hover:no-underline">
                  Historial de seguimiento
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="relative border-l border-border ml-2 space-y-5 py-2">
                    {events.map((ev, i) => (
                      <li key={i} className="ml-5">
                        <span className="absolute -left-[5px] mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        <p className="font-body text-sm font-medium text-foreground">
                          {ev.status_detail || 'Actualización'}
                        </p>
                        <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-0.5">
                          {ev.occurred_at && (
                            <span>{safeFormat(ev.occurred_at, "d MMM yyyy · HH:mm")}</span>
                          )}
                          {ev.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {ev.location}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Footer actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Button asChild variant="outline">
          <Link to="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Seguir explorando
          </Link>
        </Button>
      </div>
    </div>
  )
}