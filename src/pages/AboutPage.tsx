import { useEffect } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <EcommerceTemplate showCart={true}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-heading text-5xl font-bold mb-8 text-foreground">
          Sobre Nosotros
        </h1>
        
        <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
          <p>
            En <span className="font-heading font-semibold text-foreground">Plieggo</span>, creemos que el arte debe ser accesible y transformador. Cada pieza es un pliegue en el tiempo, una exploración de la forma y el espacio a través del papel.
          </p>
          
          <p>
            Nuestro estilo <span className="font-semibold text-foreground">"Moderno Mexicano"</span> fusiona la precisión arquitectónica con el carácter juguetón del arte contemporáneo. Cada cuadro es hecho a mano en México, celebrando la tradición artesanal con una visión moderna.
          </p>
          
          <p>
            Los pliegues no son solo decoración - son esculturas que transforman espacios. La luz juega con cada doblez, creando sombras dinámicas que cambian con el día. Es arquitectura en papel, arte que respira con tu espacio.
          </p>
        </div>
      </div>

      {/* Process Images Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
            Nuestro Proceso Artesanal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image 1 */}
            <div className="relative overflow-hidden rounded-sm aspect-square bg-muted">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998705943-f6l1fn0din8.png"
                alt="Proceso artesanal de doblado de papel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="relative overflow-hidden rounded-sm aspect-square bg-muted">
              <img 
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1764998705944-1jqlftasxmfi.png"
                alt="Manos trabajando composición en papel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Cada pieza comienza con papel de alta calidad seleccionado por su textura y capacidad de mantener el pliegue. Los dobleces se realizan a mano con precisión milimétrica, creando geometrías que desafían la percepción. El proceso puede tomar días, pero el resultado es una obra de arte única que captura luz y sombra de forma extraordinaria.
            </p>
          </div>
        </div>
      </section>
    </EcommerceTemplate>
  )
}

export default AboutPage