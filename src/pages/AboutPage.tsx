import { EcommerceTemplate } from '@/templates/EcommerceTemplate'

const AboutPage = () => {
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
          
          <div className="pt-8 border-t border-border">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              Nuestro Proceso
            </h2>
            <p>
              Cada pieza comienza con papel de alta calidad seleccionado por su textura y capacidad de mantener el pliegue. Los dobleces se realizan a mano con precisión milimétrica, creando geometrías que desafían la percepción.
            </p>
          </div>
        </div>
      </div>
    </EcommerceTemplate>
  )
}

export default AboutPage