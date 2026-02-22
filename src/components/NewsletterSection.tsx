import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { ArrowRight, Check } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection (Plieggo)
 * 
 * Diseño editorial premium — fondo Azul Medianoche, layout asimétrico
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section
          className="relative overflow-hidden"
          style={{ background: 'hsl(var(--foreground))' }}
        >
          {/* Fondo decorativo — líneas geométricas sutiles */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            {/* Línea diagonal izquierda */}
            <div
              className="absolute top-0 left-0 h-full w-px opacity-10"
              style={{
                background: 'hsl(var(--primary))',
                transform: 'translateX(15vw) rotate(8deg)',
                transformOrigin: 'top center',
                height: '140%',
              }}
            />
            {/* Línea diagonal derecha */}
            <div
              className="absolute top-0 right-0 h-full w-px opacity-10"
              style={{
                background: 'hsl(var(--primary))',
                transform: 'translateX(-15vw) rotate(-8deg)',
                transformOrigin: 'top center',
                height: '140%',
              }}
            />
            {/* Círculo decorativo grande */}
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-5"
              style={{ background: 'hsl(var(--primary))' }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-28">
            {logic.success ? (
              /* --- Estado éxito --- */
              <div className="flex flex-col items-center justify-center text-center gap-6 py-8">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: 'hsl(var(--primary) / 0.2)' }}
                >
                  <Check className="w-8 h-8" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <h3
                  className="font-heading text-4xl md:text-5xl font-bold tracking-tight"
                  style={{ color: 'hsl(var(--primary-foreground))' }}
                >
                  ¡Bienvenido al Club!
                </h3>
                <p
                  className="font-body text-xl"
                  style={{ color: 'hsl(var(--primary-foreground) / 0.6)' }}
                >
                  Serás el primero en conocer nuevas piezas de Plieggo.
                </p>
              </div>
            ) : (
              /* --- Estado formulario --- */
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16">

                {/* — Bloque de copy — */}
                <div className="flex-1 max-w-xl">
                  {/* Eyebrow */}
                  <p
                    className="font-heading text-xs tracking-[0.3em] uppercase mb-4 font-semibold"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    Club Plieggo
                  </p>

                  {/* Headline grande */}
                  <h2
                    className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6"
                    style={{ color: 'hsl(var(--primary-foreground))' }}
                  >
                    Sé el primero
                    <br />
                    <span
                      className="italic font-normal"
                      style={{
                        fontFamily: "'Crimson Pro', serif",
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      en ver.
                    </span>
                  </h2>

                  {/* Subtexto */}
                  <p
                    className="font-body text-lg leading-relaxed"
                    style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}
                  >
                    Acceso exclusivo a nuevas colecciones antes de que salgan al público.
                    <br className="hidden md:block" />
                    Solo para miembros.
                  </p>
                </div>

                {/* — Bloque de formulario — */}
                <div className="flex-1 max-w-md w-full">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      logic.handleSubscribe();
                    }}
                    className="flex flex-col gap-4"
                  >
                    {/* Input con estilo underline */}
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={logic.email}
                        onChange={(e) => logic.setEmail(e.target.value)}
                        disabled={logic.isSubmitting}
                        required
                        className="w-full bg-transparent font-body text-lg pb-3 pt-1 border-b-2 outline-none transition-colors duration-300 placeholder:opacity-40"
                        style={{
                          color: 'hsl(var(--primary-foreground))',
                          borderColor: 'hsl(var(--primary-foreground) / 0.25)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'hsl(var(--primary))';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'hsl(var(--primary-foreground) / 0.25)';
                        }}
                      />
                    </div>

                    {/* Error */}
                    {logic.error && (
                      <p className="font-body text-sm" style={{ color: 'hsl(var(--destructive))' }}>
                        {logic.error}
                      </p>
                    )}

                    {/* Botón */}
                    <Button
                      type="submit"
                      disabled={logic.isSubmitting}
                      size="lg"
                      className="group w-full mt-2 flex items-center justify-between gap-3 rounded-none font-heading font-bold tracking-wide text-base h-14 transition-all duration-300"
                      style={{
                        background: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                      }}
                    >
                      <span>{logic.isSubmitting ? 'Enviando...' : 'Unirme al Club Plieggo'}</span>
                      <ArrowRight
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Button>

                    {/* Tagline */}
                    <p
                      className="font-body text-xs text-center tracking-widest uppercase mt-1"
                      style={{ color: 'hsl(var(--primary-foreground) / 0.3)' }}
                    >
                      Sin spam. Solo arte.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};