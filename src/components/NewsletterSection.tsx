import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { CheckCircle } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection (Plieggo)
 * 
 * Sección editorial con fondo Azul Medianoche, acento Terracota y texto Crema.
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="relative bg-foreground py-24 overflow-hidden">
          {/* Top & bottom terracota line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-primary/50" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/50" />

          {/* Corner bracket decorations — origami feel */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-primary/30 hidden sm:block" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-primary/30 hidden sm:block" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-primary/30 hidden sm:block" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-primary/30 hidden sm:block" />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {logic.success ? (
              <div className="space-y-6 py-4">
                <CheckCircle className="h-12 w-12 text-primary mx-auto" strokeWidth={1.5} />
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-background">
                  ¡Bienvenido al Club Plieggo!
                </h3>
                <p className="font-body text-lg text-background/60">
                  Serás el primero en conocer nuevas piezas.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-primary/50 inline-block" />
                  <span className="font-heading text-xs text-primary tracking-[0.3em] uppercase">
                    Club Plieggo
                  </span>
                  <span className="h-px w-8 bg-primary/50 inline-block" />
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-background leading-tight tracking-tight">
                    Sé el primero<br className="hidden sm:block" /> en ver nuevas piezas
                  </h3>
                  <p className="font-body text-lg text-background/55 max-w-md mx-auto">
                    Acceso exclusivo a nuevas colecciones antes de que salgan al público. Solo para miembros del Club.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    required
                    className="flex-1 font-body bg-background/8 border-background/20 text-background placeholder:text-background/35 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 rounded-lg"
                  />
                  <Button
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="btn-hero sm:w-auto whitespace-nowrap px-6"
                  >
                    {logic.isSubmitting ? 'Enviando...' : 'Unirme al Club'}
                  </Button>
                </form>

                {logic.error && (
                  <p className="font-body text-sm text-destructive">
                    {logic.error}
                  </p>
                )}

                {/* Tagline */}
                <p className="font-body text-xs text-background/30 tracking-[0.25em] uppercase">
                  Sin spam. Solo arte.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};