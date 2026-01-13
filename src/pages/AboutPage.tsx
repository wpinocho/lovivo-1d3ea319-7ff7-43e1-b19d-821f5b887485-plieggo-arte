import { useEffect } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <EcommerceTemplate showCart={true}>
      {/* Background con cuadro en transparencia */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.03] rotate-12">
          <img 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon-blanco-puro.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-20 -left-40 w-[500px] h-[500px] opacity-[0.03] -rotate-12">
          <img 
            src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/acordeon-rosa-sereno.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section con Quote */}
        <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Quote */}
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight tracking-tight">
                "El arte es la mentira que nos hace ver la verdad"
              </h1>
              <p className="font-body text-xl text-muted-foreground">
                — Pablo Picasso
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-sm bg-muted shadow-lg">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485/luna-llena.png"
                alt="Luna Llena - Arte en papel"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Nuestra Visión Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative overflow-hidden rounded-sm bg-muted shadow-lg aspect-[4/5]">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998705943-f6l1fn0din8.png"
                alt="Proceso artesanal de doblado de papel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Right */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
                Nuestra Visión
              </h2>
              <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  En <span className="font-heading font-semibold text-foreground">Plieggo</span>, creemos que el arte debe ser accesible y transformador. Cada pieza es un pliegue en el tiempo, una exploración de la forma y el espacio a través del papel.
                </p>
                
                <p>
                  Nuestro estilo <span className="font-semibold text-foreground">"Moderno Mexicano"</span> fusiona la precisión arquitectónica con el carácter juguetón del arte contemporáneo. Cada cuadro es hecho a mano en México, celebrando la tradición artesanal con una visión moderna.
                </p>
                
                <p>
                  Los pliegues no son solo decoración - son esculturas que transforman espacios. La luz juega con cada doblez, creando sombras dinámicas que cambian con el día.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier Section - Vertical Text */}
        <section className="py-24 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Vertical Text Left */}
            <div className="relative flex items-center justify-center lg:justify-start">
              <h2 
                className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                Atelier
              </h2>
            </div>

            {/* Image Right */}
            <div className="relative overflow-hidden rounded-sm bg-muted shadow-lg aspect-[4/5]">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998705944-1jqlftasxmfi.png"
                alt="Manos trabajando composición en papel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Proceso Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-12 tracking-tight">
              Nuestro Proceso Artesanal
            </h2>
            
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-16">
              Cada pieza comienza con papel de alta calidad seleccionado por su textura y capacidad de mantener el pliegue. Los dobleces se realizan a mano con precisión milimétrica, creando geometrías que desafían la percepción. El proceso puede tomar días, pero el resultado es una obra de arte única que captura luz y sombra de forma extraordinaria.
            </p>

            <div className="inline-block">
              <p className="font-heading text-xl font-semibold text-primary">
                Es arquitectura en papel, arte que respira con tu espacio.
              </p>
            </div>
          </div>
        </section>
      </div>
    </EcommerceTemplate>
  )
}

export default AboutPage