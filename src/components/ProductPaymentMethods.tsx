import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ProductPaymentMethods — fila discreta de métodos de pago bajo el CTA.
 *
 * En México el método de pago es una objeción real: mucha gente no compra
 * con tarjeta pero sí en OXXO o por transferencia. Si no lo ve antes de
 * dar clic, no llega al checkout a descubrirlo.
 */

const METHODS = ["Visa", "Mastercard", "Amex", "PayPal", "OXXO", "SPEI"]

export const ProductPaymentMethods = ({ className }: { className?: string }) => (
  <div className={cn("space-y-2", className)}>
    <div className="flex flex-wrap items-center gap-1.5">
      {METHODS.map((m) => (
        <span
          key={m}
          className="rounded-[4px] border border-border/70 bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
        >
          {m}
        </span>
      ))}
    </div>
    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <Lock className="h-3 w-3 shrink-0" />
      Pago cifrado · tus datos nunca se guardan en nuestro sitio
    </p>
  </div>
)