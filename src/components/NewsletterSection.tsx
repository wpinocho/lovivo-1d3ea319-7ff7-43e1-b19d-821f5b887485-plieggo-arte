import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection (Plieggo)
 * 
 * Componente UI para suscripción a newsletter con estilo Moderno Mexicano
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-muted/30 py-20 border-y border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading text-3xl font-bold text-foreground">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="font-body text-lg text-muted-foreground">
                  Pronto recibirás nuestras mejores ofertas y novedades.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    ¿Quieres estar al día?
                  </h3>
                  <p className="font-body text-xl text-muted-foreground">
                    Suscríbete y recibe ofertas exclusivas y nuevas colecciones
                  </p>
                </div>
                
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
                    className="flex-1 font-body"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="btn-hero sm:w-auto"
                  >
                    {logic.isSubmitting ? 'Enviando...' : 'Suscribirse'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="font-body text-sm text-destructive">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};