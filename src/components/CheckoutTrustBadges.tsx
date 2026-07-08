import { productReviews } from "@/data/product-reviews";

/**
 * CheckoutTrustBadges — Señales de confianza para el checkout de Plieggo.
 *
 * Design system: iconos SVG line terracota (text-primary), sin emojis,
 * sin glow naranja, copy sobrio premium. Todo mobile-first.
 *
 * Exporta bloques independientes para colocarlos donde más convierten:
 *  - CheckoutSecurityBanner  → arriba del bloque de pago (candado + SSL + Stripe)
 *  - CheckoutRating          → prueba social (rating real del catálogo)
 *  - CheckoutGuarantees      → fila de garantías debajo del CTA
 *  - CheckoutPaymentLogos    → logos de métodos de pago debajo de las garantías
 */

/* ── Rating real del catálogo (calculado, no inventado) ── */
function getAggregateReview() {
  const entries = Object.values(productReviews).filter((r) => r.reviewCount > 0);
  const totalCount = entries.reduce((sum, r) => sum + r.reviewCount, 0);
  const weighted = entries.reduce((sum, r) => sum + r.rating * r.reviewCount, 0);
  const avg = totalCount > 0 ? weighted / totalCount : 0;
  return { avg: Math.round(avg * 10) / 10, totalCount };
}

/* ── Banner de seguridad ── */
export function CheckoutSecurityBanner() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/60 px-4 py-2.5 text-center">
      <LockIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="text-xs text-muted-foreground">
        Pago 100% seguro · Cifrado SSL · Procesado por Stripe
      </span>
    </div>
  );
}

/* ── Prueba social: rating real ── */
export function CheckoutRating() {
  const { avg, totalCount } = getAggregateReview();
  if (totalCount === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-3.5 w-3.5 text-primary" />
        ))}
      </div>
      <span className="font-semibold text-foreground">{avg.toFixed(1)}</span>
      <span className="text-muted-foreground">
        · +{totalCount} clientes felices
      </span>
    </div>
  );
}

/* ── Fila de garantías ── */
export function CheckoutGuarantees() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <TruckIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
        Envío gratis a todo México
      </span>
      <span className="flex items-center gap-1.5">
        <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
        Pago seguro
      </span>
      <span className="flex items-center gap-1.5">
        <BadgeCheckIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
        Garantía de satisfacción
      </span>
    </div>
  );
}

/* ── Logos de métodos de pago (chips monocromo discretos) ── */
export function CheckoutPaymentLogos() {
  const methods = ["Visa", "Mastercard", "Amex", "Apple Pay", "G Pay", "OXXO"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {methods.map((m) => (
        <span
          key={m}
          className="rounded border border-border bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
        >
          {m}
        </span>
      ))}
    </div>
  );
}

/* ── Iconos SVG line ── */
type IconProps = { className?: string };

function LockIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.55 6.75L12 17.27 5.85 20.74 7.4 13.99 2.2 9.46l6.9-.6z" />
    </svg>
  );
}

function TruckIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
      <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" />
      <circle cx="7.5" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}