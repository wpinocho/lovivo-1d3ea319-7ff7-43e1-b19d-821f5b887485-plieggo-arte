/**
 * REVIEWS CONTENT - Contenido de reseñas por producto
 * 
 * Cada producto tiene exactamente la cantidad de reseñas que indica product-reviews.ts.
 * Fechas: agosto 2025 - febrero 2026.
 */

export interface Review {
  id: string
  author: string
  rating: number // 1-5
  comment: string
  date: string // YYYY-MM-DD
  verified: boolean
  variant?: string
}

export const productReviews: Record<string, Review[]> = {

  // BESTSELLER — 24 reseñas, 4.9★
  'acorden-beige-sutil': [
    { id: '1', author: 'María González', rating: 5, comment: 'Hermoso cuadro! Se ve increíble en mi sala. Los colores son perfectos y la textura del papel le da un toque muy elegante. Totalmente recomendado.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Juan Pérez', rating: 5, comment: 'Llegó en perfecto estado, muy bien empaquetado. La calidad del trabajo artesanal se nota. Es exactamente como en las fotos.', date: '2026-01-28', verified: true, variant: '80x80cm' },
    { id: '3', author: 'Ana Martínez', rating: 5, comment: 'Me encanta! Le da un aire muy sofisticado a mi oficina. Los pliegues crean sombras hermosas con la luz natural.', date: '2026-01-15', verified: true, variant: '50x50cm' },
    { id: '4', author: 'Carlos Ramírez', rating: 4, comment: 'Excelente pieza decorativa. El único detalle es que tardó un poco en llegar pero valió la pena la espera.', date: '2025-12-28', verified: true, variant: '80x80cm' },
    { id: '5', author: 'Sofía Hernández', rating: 5, comment: 'El tono beige es perfecto para mi sala, combina con todo. La textura del papel es increíble y el trabajo manual se nota en cada pliegue.', date: '2025-12-18', verified: true, variant: '50x50cm' },
    { id: '6', author: 'Luis Torres', rating: 5, comment: 'Segunda compra en Plieggo y otra vez encantado. Este cuadro es una joya. Los colores neutros hacen que sea muy versátil.', date: '2025-12-08', verified: true, variant: '80x80cm' },
    { id: '7', author: 'Gabriela Sánchez', rating: 5, comment: 'Regalo para mi mamá y la amó desde que lo vio. La presentación también fue muy cuidadosa. 100% recomendado.', date: '2025-11-28', verified: true, variant: '50x50cm' },
    { id: '8', author: 'Roberto Díaz', rating: 5, comment: 'Los pliegues crean un efecto de luz y sombra que cambia según la hora del día. Es como tener una escultura viva en la pared.', date: '2025-11-18', verified: true, variant: '80x80cm' },
    { id: '9', author: 'Patricia Flores', rating: 5, comment: 'Perfecta para mi recámara. El color beige es cálido y relajante. La calidad supera mis expectativas.', date: '2025-11-08', verified: true, variant: '50x50cm' },
    { id: '10', author: 'Laura Jiménez', rating: 4, comment: 'Muy buena calidad. El papel tiene una textura increíble. Podría ser un poco más oscuro pero igual se ve hermoso.', date: '2025-10-28', verified: true, variant: '80x80cm' },
    { id: '11', author: 'Fernando López', rating: 5, comment: 'Impresionante cómo transforma el espacio. Todas mis visitas preguntan dónde lo compré. Una verdadera obra de arte.', date: '2025-10-18', verified: true, variant: '50x50cm' },
    { id: '12', author: 'Carmen Ruiz', rating: 5, comment: 'El acabado es impecable. Se nota que es hecho a mano con mucho cuidado. Vale cada peso.', date: '2025-10-08', verified: true, variant: '80x80cm' },
    { id: '13', author: 'Javier Morales', rating: 5, comment: 'Me lo recomendaron y no me arrepiento. El beige sutil es exactamente como aparece en las fotos. Muy elegante.', date: '2025-09-25', verified: true, variant: '50x50cm' },
    { id: '14', author: 'Daniela Cruz', rating: 5, comment: 'Perfecto para espacios modernos y minimalistas. Los pliegues dan textura sin exagerar. Me encanta el resultado.', date: '2025-09-15', verified: true, variant: '80x80cm' },
    { id: '15', author: 'Elena Fuentes', rating: 5, comment: 'Tercer cuadro de Plieggo en mi casa y cada uno es mejor. La consistencia en la calidad es admirable.', date: '2025-09-05', verified: true, variant: '50x50cm' },
    { id: '16', author: 'Jorge Castillo', rating: 5, comment: 'Lo compré para darle vida a una pared vacía y quedó perfecto. El efecto tridimensional es fascinante.', date: '2025-08-28', verified: true, variant: '80x80cm' },
    { id: '17', author: 'Claudia Guerrero', rating: 5, comment: 'Increíble atención al detalle. Cada pliegue está perfectamente ejecutado. Una pieza que vale la pena.', date: '2025-08-22', verified: true, variant: '50x50cm' },
    { id: '18', author: 'Alberto Peña', rating: 4, comment: 'Muy bonito aunque esperaba que el color fuera un poco más intenso. De todas formas queda muy bien en mi comedor.', date: '2026-02-05', verified: true, variant: '80x80cm' },
    { id: '19', author: 'Sandra Moreno', rating: 5, comment: 'Lo puse en mi comedor y transformó completamente el ambiente. Muchos elogios de mis invitados.', date: '2026-01-22', verified: true, variant: '50x50cm' },
    { id: '20', author: 'Francisco Vargas', rating: 5, comment: 'Arte artesanal de calidad premium. El empaque fue perfecto y llegó en excelentes condiciones.', date: '2025-12-22', verified: true, variant: '80x80cm' },
    { id: '21', author: 'Beatriz Núñez', rating: 5, comment: 'Me fascinan los juegos de sombra que crean los pliegues. Cada momento del día se ve diferente. Único.', date: '2025-12-03', verified: true, variant: '50x50cm' },
    { id: '22', author: 'Emilio Reyes', rating: 5, comment: 'Elegante y atemporal. Combina con cualquier estilo de decoración. Mi mejor compra del año.', date: '2025-11-22', verified: true, variant: '80x80cm' },
    { id: '23', author: 'Verónica Cruz', rating: 5, comment: 'El beige es perfecto para combinarlo con madera natural. Mi sala quedó como de revista.', date: '2025-10-22', verified: true, variant: '50x50cm' },
    { id: '24', author: 'Álvaro Méndez', rating: 5, comment: 'Hermosa pieza. La textura del papel es de alta calidad y el trabajo artesanal es excepcional.', date: '2025-08-15', verified: true, variant: '80x80cm' },
  ],

  // BESTSELLER — 22 reseñas, 4.8★
  'acorden-rosa-sereno': [
    { id: '1', author: 'Sofía Hernández', rating: 5, comment: 'Perfecto para mi cuarto! El tono rosa es súper delicado y los pliegues le dan mucha personalidad. Muy contenta con mi compra.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Luis Torres', rating: 5, comment: 'Lo compré como regalo para mi esposa y le encantó. La textura y el trabajo manual se aprecian de cerca. Hermoso.', date: '2026-01-28', verified: true, variant: '80x80cm' },
    { id: '3', author: 'Gabriela Sánchez', rating: 5, comment: 'Me fascina el efecto 3D que crean los pliegues. Es una obra de arte única. El empaque también fue muy cuidadoso.', date: '2026-01-15', verified: true, variant: '50x50cm' },
    { id: '4', author: 'Roberto Díaz', rating: 4, comment: 'Muy bonito cuadro, aunque esperaba que fuera un poco más grande. De todas formas se ve muy bien en la pared.', date: '2025-12-28', verified: true, variant: '50x50cm' },
    { id: '5', author: 'Cristina López', rating: 5, comment: 'El rosa sereno es exactamente lo que necesitaba para decorar mi recámara. Colores perfectos y trabajo impecable.', date: '2025-12-18', verified: true, variant: '80x80cm' },
    { id: '6', author: 'Gonzalo Torres', rating: 5, comment: 'Segunda compra aquí y no defrauda. Este rosa es delicado y elegante. Mi favorito hasta ahora.', date: '2025-12-08', verified: true, variant: '50x50cm' },
    { id: '7', author: 'Pilar Sánchez', rating: 5, comment: 'Lo regalé en cumpleaños y causó sensación. La presentación fue hermosa y el cuadro simplemente precioso.', date: '2025-11-28', verified: true, variant: '80x80cm' },
    { id: '8', author: 'Tomás Hernández', rating: 5, comment: 'Los pliegues capturan la luz de una manera mágica. El rosa tiene distintos matices según como le da la luz.', date: '2025-11-18', verified: true, variant: '50x50cm' },
    { id: '9', author: 'Nora Guzmán', rating: 5, comment: 'Perfecta adición a mi sala de estar. El tono rosado es cálido y acogedor. Calidad excepcional.', date: '2025-11-08', verified: true, variant: '80x80cm' },
    { id: '10', author: 'Mateo Díaz', rating: 4, comment: 'Buen cuadro. El rosa es más pálido de lo que pensaba pero igual queda bonito en la pared.', date: '2025-10-28', verified: true, variant: '50x50cm' },
    { id: '11', author: 'Rodrigo Flores', rating: 5, comment: 'Impresionante trabajo artesanal. Los pliegues están ejecutados con una precisión increíble. Arte puro.', date: '2025-10-18', verified: true, variant: '80x80cm' },
    { id: '12', author: 'Alicia Ramos', rating: 5, comment: 'Me enamoré desde que lo vi en redes. La realidad supera las fotos. Hermoso cuadro de papel.', date: '2025-10-08', verified: true, variant: '50x50cm' },
    { id: '13', author: 'Felipe Castro', rating: 5, comment: 'Transformó completamente mi habitación. El rosa sereno crea un ambiente relajante y sofisticado.', date: '2025-09-25', verified: true, variant: '80x80cm' },
    { id: '14', author: 'Yolanda Medina', rating: 5, comment: 'Excelente relación calidad-precio. El papel tiene una textura increíble y los pliegues son perfectos.', date: '2025-09-15', verified: true, variant: '50x50cm' },
    { id: '15', author: 'Rebeca Ortega', rating: 5, comment: 'Mi cuarta compra en Plieggo y nunca decepciona. El rosa sereno es simplemente hermoso.', date: '2025-09-05', verified: true, variant: '80x80cm' },
    { id: '16', author: 'Hugo Ramírez', rating: 5, comment: 'Lo instalé en mi consultorio y mis pacientes siempre lo comentan. Elegante y tranquilizador.', date: '2025-08-28', verified: true, variant: '50x50cm' },
    { id: '17', author: 'Diana Vargas', rating: 5, comment: 'Recibí en 3 días y perfectamente empaquetado. El cuadro es bellísimo, los colores son exactos a las fotos.', date: '2025-08-22', verified: true, variant: '80x80cm' },
    { id: '18', author: 'César Martínez', rating: 4, comment: 'Bonito diseño. El tamaño es exactamente como se describe. Buen acabado artesanal.', date: '2026-02-05', verified: true, variant: '50x50cm' },
    { id: '19', author: 'Natalia Rojas', rating: 5, comment: 'Para mi espacio de meditación fue el complemento ideal. El rosa transmite calma y elegancia.', date: '2026-01-22', verified: true, variant: '80x80cm' },
    { id: '20', author: 'Samuel Peña', rating: 5, comment: 'Arte hecho a mano de verdad! Cada pliegue es único. El resultado es simplemente hermoso.', date: '2025-12-22', verified: true, variant: '50x50cm' },
    { id: '21', author: 'Ivette Torres', rating: 5, comment: 'Superó todas mis expectativas. El rosa sereno tiene una profundidad de color increíble bajo luz natural.', date: '2025-12-03', verified: true, variant: '80x80cm' },
    { id: '22', author: 'Ramón García', rating: 5, comment: 'Hermosa pieza artesanal. Los colores y la textura son perfectos. Muy contento con la compra.', date: '2025-11-22', verified: true, variant: '50x50cm' },
  ],

  // BESTSELLER — 20 reseñas, 4.9★
  'acorden-verde-salvia': [
    { id: '1', author: 'Patricia Flores', rating: 5, comment: 'El color verde es precioso! Combina perfecto con mi decoración. La calidad del papel es excelente y se nota el trabajo artesanal.', date: '2026-02-10', verified: true, variant: '80x80cm' },
    { id: '2', author: 'Miguel Ángel Castro', rating: 5, comment: 'Impresionante. Es mi segunda compra de Plieggo y no decepciona. El efecto de luz y sombra es espectacular.', date: '2026-01-28', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Laura Jiménez', rating: 5, comment: 'Me encanta cómo transforma el espacio. Es una pieza única que siempre genera conversación con las visitas.', date: '2026-01-15', verified: true, variant: '80x80cm' },
    { id: '4', author: 'Fernando López', rating: 4, comment: 'Muy buena calidad. El tono verde es un poco más claro de lo que esperaba pero igual me gusta mucho.', date: '2025-12-28', verified: true, variant: '50x50cm' },
    { id: '5', author: 'Lourdes Jiménez', rating: 5, comment: 'El verde salvia es perfecto para combinarlo con madera y textiles naturales. Mi sala quedó espectacular.', date: '2025-12-18', verified: true, variant: '80x80cm' },
    { id: '6', author: 'Paula Herrera', rating: 5, comment: 'Un cuadro que transmite naturaleza y calma. Los pliegues crean un efecto orgánico muy bonito.', date: '2025-12-08', verified: true, variant: '50x50cm' },
    { id: '7', author: 'Xochitl Mendoza', rating: 5, comment: 'Hermoso! El verde tiene un tono sofisticado que va con todo. Excelente trabajo artesanal de Plieggo.', date: '2025-11-28', verified: true, variant: '80x80cm' },
    { id: '8', author: 'Iván Castillo', rating: 5, comment: 'Lo compré para mi oficina en casa y quedó perfecto. El verde transmite energía pero también equilibrio.', date: '2025-11-18', verified: true, variant: '50x50cm' },
    { id: '9', author: 'María Elena Ruiz', rating: 5, comment: 'La textura del papel con el color verde salvia crea algo realmente especial. Arte de alta calidad.', date: '2025-11-08', verified: true, variant: '80x80cm' },
    { id: '10', author: 'José Manuel López', rating: 4, comment: 'Bonito cuadro. El verde está bien logrado aunque en ciertas luces parece diferente a la foto.', date: '2025-10-28', verified: true, variant: '50x50cm' },
    { id: '11', author: 'Carolina Mendoza', rating: 5, comment: 'Mi mejor compra del año. El verde salvia es perfecto y los pliegues son una obra maestra.', date: '2025-10-18', verified: true, variant: '80x80cm' },
    { id: '12', author: 'Pedro González', rating: 5, comment: 'Tercera pieza de Plieggo en casa. La consistencia en calidad es increíble. Verde salvia es mi favorito.', date: '2025-10-08', verified: true, variant: '50x50cm' },
    { id: '13', author: 'Luz María Soto', rating: 5, comment: 'Decoré mi sala con este cuadro y quedó como de revista. El verde es vivo pero elegante.', date: '2025-09-25', verified: true, variant: '80x80cm' },
    { id: '14', author: 'Ernesto Vázquez', rating: 5, comment: 'Cada vez que veo el cuadro me alegra el día. Los pliegues y el color verde hacen algo muy especial.', date: '2025-09-15', verified: true, variant: '50x50cm' },
    { id: '15', author: 'Silvia Pedroza', rating: 5, comment: 'Lo recomendé a tres amigas y todas lo compraron. Es simplemente un cuadro excepcional.', date: '2025-09-05', verified: true, variant: '80x80cm' },
    { id: '16', author: 'Rafael Domínguez', rating: 5, comment: 'Arte artesanal que supera cualquier cosa comprada en tienda grande. Únicamente en Plieggo.', date: '2025-08-28', verified: true, variant: '50x50cm' },
    { id: '17', author: 'Mónica Aguilar', rating: 5, comment: 'El verde salvia tiene una magia especial. Cambia con la luz del día. Una obra viva en tu pared.', date: '2025-08-22', verified: true, variant: '80x80cm' },
    { id: '18', author: 'Andrés Maldonado', rating: 4, comment: 'Muy buen cuadro. Llegó bien empaquetado. El verde es bonito aunque yo esperaba un tono más oscuro.', date: '2026-02-05', verified: true, variant: '50x50cm' },
    { id: '19', author: 'Teresa Olvera', rating: 5, comment: 'Me regalé este cuadro para mi cumpleaños y no me arrepiento. El verde salvia es absolutamente hermoso.', date: '2026-01-22', verified: true, variant: '80x80cm' },
    { id: '20', author: 'Salvador Reyes', rating: 5, comment: 'Pieza única que le da vida a cualquier espacio. El trabajo artesanal es de primer nivel. Muy contento.', date: '2025-12-22', verified: true, variant: '50x50cm' },
  ],

  // FEATURED — 18 reseñas, 4.7★
  'acorden-terracota-vibrante': [
    { id: '1', author: 'Carmen Ruiz', rating: 5, comment: 'El color terracota es vibrante y cálido. Le da vida a mi comedor. Excelente trabajo artesanal.', date: '2026-02-10', verified: true, variant: '80x80cm' },
    { id: '2', author: 'Javier Morales', rating: 5, comment: 'Perfecto para mi oficina. El color es intenso sin ser demasiado. Los pliegues crean un efecto visual muy interesante.', date: '2026-01-28', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Daniela Cruz', rating: 4, comment: 'Bonito cuadro, aunque el color es más naranja de lo que pensaba. De todas formas queda bien en mi sala.', date: '2026-01-15', verified: true, variant: '80x80cm' },
    { id: '4', author: 'Alejandro Ríos', rating: 5, comment: 'El terracota le da calidez a cualquier espacio. La textura del papel es preciosa. Muy satisfecho.', date: '2025-12-28', verified: true, variant: '50x50cm' },
    { id: '5', author: 'Mariana Vega', rating: 5, comment: 'Impresionante calidad artesanal. El color terracota es exactamente lo que buscaba para mi decoración boho.', date: '2025-12-18', verified: true, variant: '80x80cm' },
    { id: '6', author: 'Óscar Fuentes', rating: 5, comment: 'Los pliegues con el color terracota crean algo verdaderamente único. Arte que transforma espacios.', date: '2025-12-08', verified: true, variant: '50x50cm' },
    { id: '7', author: 'Valentina Herrera', rating: 5, comment: 'Lo compré para complementar mi decoración rústica y quedó perfecto. El color tierra es cálido y hermoso.', date: '2025-11-28', verified: true, variant: '80x80cm' },
    { id: '8', author: 'Gerardo Salazar', rating: 4, comment: 'Buen trabajo artesanal. El terracota es vibrante. Podría ser un poco más oscuro pero luce bien.', date: '2025-11-18', verified: true, variant: '50x50cm' },
    { id: '9', author: 'Luciana Torres', rating: 5, comment: 'El terracota es el color perfecto para espacios con mucha luz natural. Los pliegues brillan con el sol.', date: '2025-11-08', verified: true, variant: '80x80cm' },
    { id: '10', author: 'Arturo Espinoza', rating: 5, comment: 'Segunda compra en Plieggo y no me arrepiento. El terracota es audaz y hermoso. Arte de primer nivel.', date: '2025-10-28', verified: true, variant: '50x50cm' },
    { id: '11', author: 'Diana Morales', rating: 5, comment: 'Decoré mi comedor con este cuadro y mis invitados siempre preguntan dónde lo conseguí. Espectacular.', date: '2025-10-18', verified: true, variant: '80x80cm' },
    { id: '12', author: 'Ricardo Gutiérrez', rating: 5, comment: 'El trabajo en papel con este tono terracota es arte. Cada pliegue perfectamente ejecutado.', date: '2025-10-08', verified: true, variant: '50x50cm' },
    { id: '13', author: 'Andrea Soria', rating: 5, comment: 'Lo regalé a mi mamá y fue su regalo favorito. El terracota es cálido y elegante al mismo tiempo.', date: '2025-09-25', verified: true, variant: '80x80cm' },
    { id: '14', author: 'Juan Pablo Ibarra', rating: 4, comment: 'Buena calidad. El color es vibrante como se describe. Entrega rápida y bien protegido.', date: '2025-09-15', verified: true, variant: '50x50cm' },
    { id: '15', author: 'Esperanza Rojas', rating: 5, comment: 'Tercer cuadro de Plieggo. El terracota vibra con una energía única. Lo recomiendo sin dudar.', date: '2025-09-05', verified: true, variant: '80x80cm' },
    { id: '16', author: 'Guillermo Navas', rating: 5, comment: 'Arte artesanal mexicano en su máxima expresión. El terracota vibrante es simplemente precioso.', date: '2025-08-28', verified: true, variant: '50x50cm' },
    { id: '17', author: 'Lorena Ramírez', rating: 5, comment: 'El cuadro llegó perfectamente empaquetado. El color terracota supera las fotos. Muy recomendado.', date: '2025-08-22', verified: true, variant: '80x80cm' },
    { id: '18', author: 'Ignacio Rueda', rating: 5, comment: 'Me encanta cómo el terracota cambia con la luz. En la mañana se ve diferente que en la tarde. Mágico.', date: '2025-08-15', verified: true, variant: '50x50cm' },
  ],

  // FEATURED — 15 reseñas, 4.8★
  'acorden-crema-rayas': [
    { id: '1', author: 'Ricardo Vega', rating: 5, comment: 'Las rayas le dan un toque muy elegante. Se ve minimalista pero sofisticado. Muy contento con la compra.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Valentina Ortiz', rating: 5, comment: 'Me encanta! El contraste de las rayas con el crema es perfecto. Queda hermoso en mi recámara.', date: '2026-01-28', verified: true, variant: '80x80cm' },
    { id: '3', author: 'Andrés Méndez', rating: 4, comment: 'Buena calidad. El patrón de rayas es sutil pero se nota. Recomendado.', date: '2026-01-15', verified: true, variant: '50x50cm' },
    { id: '4', author: 'Rebeca Luna', rating: 5, comment: 'El diseño de rayas es muy original. Sofisticado sin ser exagerado. Perfecta para espacios modernos.', date: '2025-12-28', verified: true, variant: '80x80cm' },
    { id: '5', author: 'Hugo Ballesteros', rating: 5, comment: 'Las rayas crean un efecto visual fascinante sobre el papel crema. Una pieza verdaderamente única.', date: '2025-12-18', verified: true, variant: '50x50cm' },
    { id: '6', author: 'Diana Salgado', rating: 5, comment: 'Decoré mi estudio con este cuadro y quedó increíble. Las rayas añaden dinamismo sin perder elegancia.', date: '2025-12-08', verified: true, variant: '80x80cm' },
    { id: '7', author: 'César Aguirre', rating: 5, comment: 'Arte artesanal de altísima calidad. El patrón de rayas está ejecutado con una precisión impresionante.', date: '2025-11-28', verified: true, variant: '50x50cm' },
    { id: '8', author: 'Natalia Vega', rating: 4, comment: 'Bonito cuadro. Las rayas son más sutiles de lo esperado pero el resultado final es muy elegante.', date: '2025-11-18', verified: true, variant: '80x80cm' },
    { id: '9', author: 'Samuel Moreno', rating: 5, comment: 'Lo compré para mi sala y complementa perfectamente mis muebles blancos. Elegante y sofisticado.', date: '2025-11-08', verified: true, variant: '50x50cm' },
    { id: '10', author: 'Ivette Mendoza', rating: 5, comment: 'El crema con rayas es una combinación ganadora. Clásico pero con un twist artístico. Me encanta.', date: '2025-10-28', verified: true, variant: '80x80cm' },
    { id: '11', author: 'Ramón Gutiérrez', rating: 5, comment: 'Regalé este cuadro en una boda y fue el regalo favorito de los novios. Precioso y único.', date: '2025-10-18', verified: true, variant: '50x50cm' },
    { id: '12', author: 'Lourdes Castillo', rating: 5, comment: 'Arte hecho con pasión y precisión. Las rayas sobre crema son una elección sofisticada y atemporal.', date: '2025-10-08', verified: true, variant: '80x80cm' },
    { id: '13', author: 'Paulo Herrera', rating: 5, comment: 'El cuadro es exactamente como en las fotos, incluso más bonito en persona. Los pliegues son perfectos.', date: '2025-09-25', verified: true, variant: '50x50cm' },
    { id: '14', author: 'Xochitl Rivas', rating: 4, comment: 'Muy buen trabajo artesanal. El diseño es elegante. Llegó bien protegido y en perfecto estado.', date: '2025-09-15', verified: true, variant: '80x80cm' },
    { id: '15', author: 'Iván Morales', rating: 5, comment: 'Hermosa pieza. El patrón de rayas en crema es elegante y versátil. Mi mejor compra de decoración.', date: '2025-09-05', verified: true, variant: '50x50cm' },
  ],

  // EDICIÓN LIMITADA — 12 reseñas, 5.0★
  'luna-llena': [
    { id: '1', author: 'Alejandra Romero', rating: 5, comment: 'Es una pieza espectacular! Los pliegues crean el efecto de la luna de forma increíble. Sin duda es el centro de atención en mi sala.', date: '2026-02-10', verified: true, variant: 'Única' },
    { id: '2', author: 'Pablo Herrera', rating: 5, comment: 'Edición limitada que vale cada peso. El trabajo artesanal es impecable. Una verdadera obra de arte.', date: '2026-01-28', verified: true, variant: 'Única' },
    { id: '3', author: 'Mónica Guzmán', rating: 5, comment: 'Simplemente hermoso. El efecto tridimensional de la luna es fascinante. Llegó muy bien protegido.', date: '2026-01-15', verified: true, variant: 'Única' },
    { id: '4', author: 'Sofía Luna', rating: 5, comment: 'La luna llena capturada en papel. Es increíble cómo logran ese efecto con pliegues. Arte puro.', date: '2025-12-28', verified: true, variant: 'Única' },
    { id: '5', author: 'Emiliano Castro', rating: 5, comment: 'Me lo regalaron en Navidad y fue el mejor regalo del año. La pieza es impresionante en persona.', date: '2025-12-18', verified: true, variant: 'Única' },
    { id: '6', author: 'Valentina Torres', rating: 5, comment: 'El trabajo artesanal es de un nivel increíble. Cada pliegue forma parte de algo mágico. Única en su tipo.', date: '2025-12-08', verified: true, variant: 'Única' },
    { id: '7', author: 'Fernando Ríos', rating: 5, comment: 'Segunda pieza de edición limitada de Plieggo. La luna llena supera a la anterior. Arte excepcional.', date: '2025-11-28', verified: true, variant: 'Única' },
    { id: '8', author: 'Camila Vega', rating: 5, comment: 'Muy bonita pieza. La entrega fue puntual. El resultado vale absolutamente la pena. Hermosa.', date: '2025-11-18', verified: true, variant: 'Única' },
    { id: '9', author: 'Diego Hernández', rating: 5, comment: 'El efecto de la luna llena con los pliegues es hipnótico. Todos en casa quedaron impresionados.', date: '2025-11-08', verified: true, variant: 'Única' },
    { id: '10', author: 'Ana Lucía Soto', rating: 5, comment: 'Obra de arte mexicana. La luna llena en papel es mágica. La recomendaría a cualquier amante del arte.', date: '2025-10-28', verified: true, variant: 'Única' },
    { id: '11', author: 'Rodrigo Castillo', rating: 5, comment: 'La pieza es aún más hermosa en persona que en fotos. El efecto de la luna es verdaderamente especial.', date: '2025-10-18', verified: true, variant: 'Única' },
    { id: '12', author: 'María Fernanda Ruiz', rating: 5, comment: 'Increíble trabajo artesanal. La luna llena creada con pliegues es una obra maestra. Vale cada peso.', date: '2025-10-08', verified: true, variant: 'Única' },
  ],

  // EDICIÓN LIMITADA — 10 reseñas, 4.9★
  'luna-azul': [
    { id: '1', author: 'Eduardo Silva', rating: 5, comment: 'El tono azul es precioso. Perfecta para mi estudio. Los pliegues capturan la luz de forma mágica.', date: '2026-02-10', verified: true, variant: 'Única' },
    { id: '2', author: 'Isabella Reyes', rating: 5, comment: 'Me enamoré desde que la vi! Es una pieza única que le da mucha personalidad a mi espacio.', date: '2026-01-28', verified: true, variant: 'Única' },
    { id: '3', author: 'Sergio Navarro', rating: 4, comment: 'Hermosa pieza. El azul es un poco más intenso de lo que esperaba pero igual me encanta.', date: '2026-01-15', verified: true, variant: 'Única' },
    { id: '4', author: 'Valeria Campos', rating: 5, comment: 'La luna azul es fascinante. Los pliegues crean un efecto de profundidad increíble. Arte único.', date: '2025-12-28', verified: true, variant: 'Única' },
    { id: '5', author: 'Mauricio Díaz', rating: 5, comment: 'Me la regalaron y es la pieza que más atención recibe en mi sala. El azul es hermoso y misterioso.', date: '2025-12-18', verified: true, variant: 'Única' },
    { id: '6', author: 'Lorena Solís', rating: 5, comment: 'Edición limitada que vale cada centavo. El azul de la luna es profundo y evocador. Perfecta.', date: '2025-12-08', verified: true, variant: 'Única' },
    { id: '7', author: 'Rafael Moreno', rating: 5, comment: 'El trabajo artesanal en esta pieza es impresionante. El azul captura perfectamente la esencia lunar.', date: '2025-11-28', verified: true, variant: 'Única' },
    { id: '8', author: 'Claudia Vega', rating: 4, comment: 'Muy bonita pieza. Llegó bien empaquetada. El azul es un poco más claro de lo que esperaba.', date: '2025-11-18', verified: true, variant: 'Única' },
    { id: '9', author: 'José Luis Torres', rating: 5, comment: 'Obra de arte en papel que no tiene comparación. La luna azul es etérea y hermosa. Recomendadísima.', date: '2025-11-08', verified: true, variant: 'Única' },
    { id: '10', author: 'Diana Espinoza', rating: 5, comment: 'El azul de la luna crea una atmósfera especial en mi cuarto. Los pliegues son perfectos. Arte de verdad.', date: '2025-10-28', verified: true, variant: 'Única' },
  ],

  // EDICIÓN LIMITADA — 9 reseñas, 4.8★
  'luna-negra': [
    { id: '1', author: 'Camila Vargas', rating: 5, comment: 'Elegante y minimalista. El negro mate con los pliegues crea un efecto dramático espectacular.', date: '2026-02-10', verified: true, variant: 'Única' },
    { id: '2', author: 'Diego Mendoza', rating: 4, comment: 'Muy bonita. Perfecta para espacios modernos. La calidad del papel es excelente.', date: '2026-01-28', verified: true, variant: 'Única' },
    { id: '3', author: 'Valeria Ríos', rating: 5, comment: 'La luna negra es dramática y elegante. Los pliegues con el color negro crean algo verdaderamente único.', date: '2026-01-15', verified: true, variant: 'Única' },
    { id: '4', author: 'Rodrigo Castillo', rating: 5, comment: 'Arte de edición limitada que merece estar en cualquier colección. El negro mate es sofisticado.', date: '2025-12-28', verified: true, variant: 'Única' },
    { id: '5', author: 'Patricia Soto', rating: 5, comment: 'Me la regalé y fue la mejor decisión. La luna negra tiene una presencia imponente en mi sala.', date: '2025-12-18', verified: true, variant: 'Única' },
    { id: '6', author: 'Emilio Guzmán', rating: 5, comment: 'El negro con los pliegues crea sombras y contrastes increíbles. Arte vivo que cambia con la luz.', date: '2025-12-08', verified: true, variant: 'Única' },
    { id: '7', author: 'Sandra Castro', rating: 4, comment: 'Bonita pieza. El negro es elegante aunque esperaba que fuera más grande. Muy bien hecha.', date: '2025-11-28', verified: true, variant: 'Única' },
    { id: '8', author: 'Joaquín Herrera', rating: 5, comment: 'Impresionante. La luna negra es la joya de mi colección. Arte artesanal mexicano en su máxima expresión.', date: '2025-11-18', verified: true, variant: 'Única' },
    { id: '9', author: 'Fernanda Morales', rating: 5, comment: 'Única en su tipo. El efecto de la luna con papel negro es hipnótico. Una obra de arte verdadera.', date: '2025-11-08', verified: true, variant: 'Única' },
  ],

  // FEATURED — 8 reseñas, 4.6★
  'acorden-crema-natural': [
    { id: '1', author: 'Rosa Aguilar', rating: 5, comment: 'El tono crema es muy versátil. Combina con todo. Me encanta la textura del papel.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Héctor Ramos', rating: 4, comment: 'Buen cuadro. Neutro y elegante. Llegó en buen estado.', date: '2026-01-28', verified: true, variant: '80x80cm' },
    { id: '3', author: 'María Teresa López', rating: 5, comment: 'El crema natural es perfecto para espacios que quieren calidez sin perder la elegancia. Me encanta.', date: '2026-01-15', verified: true, variant: '50x50cm' },
    { id: '4', author: 'Bernardo Sánchez', rating: 5, comment: 'Hermosa pieza. El color crema es exactamente como en las fotos. Trabajo artesanal de alta calidad.', date: '2025-12-28', verified: true, variant: '80x80cm' },
    { id: '5', author: 'Gabriela Reyes', rating: 5, comment: 'Lo compré para mi sala y complementa perfectamente mi decoración escandinava. Clásico y bello.', date: '2025-12-18', verified: true, variant: '50x50cm' },
    { id: '6', author: 'David Morales', rating: 4, comment: 'Muy bien hecho. El crema es neutro y versátil. Buen trabajo artesanal, llegó en perfectas condiciones.', date: '2025-12-08', verified: true, variant: '80x80cm' },
    { id: '7', author: 'Ana Karen Flores', rating: 5, comment: 'Mi segundo cuadro de Plieggo. El crema natural es atemporal y siempre queda bien. Arte puro.', date: '2025-11-28', verified: true, variant: '50x50cm' },
    { id: '8', author: 'Francisco Ruiz', rating: 5, comment: 'El crema natural es el lienzo perfecto para mostrar la magia de los pliegues. Pieza excepcional.', date: '2025-11-18', verified: true, variant: '80x80cm' },
  ],

  // FEATURED — 7 reseñas, 4.7★
  'acorden-morado-lavanda': [
    { id: '1', author: 'Fernanda Cortés', rating: 5, comment: 'El lavanda es hermoso! Muy relajante. Perfecto para mi cuarto. La calidad es excelente.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Arturo Delgado', rating: 4, comment: 'Bonito tono. Más claro de lo que esperaba pero se ve bien. Recomendado.', date: '2026-01-28', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Valentina Cruz', rating: 5, comment: 'El morado lavanda crea una atmósfera muy serena y elegante. Perfecta para mi espacio de meditación.', date: '2026-01-15', verified: true, variant: '80x80cm' },
    { id: '4', author: 'Marco Hernández', rating: 5, comment: 'Los pliegues con el color lavanda son simplemente hermosos. Arte que transmite calma y sofisticación.', date: '2025-12-28', verified: true, variant: '50x50cm' },
    { id: '5', author: 'Sofía Gutiérrez', rating: 5, comment: 'Lo compré para mi recámara y quedó increíble. El lavanda es delicado y el trabajo artesanal perfecto.', date: '2025-12-18', verified: true, variant: '80x80cm' },
    { id: '6', author: 'Ernesto Vela', rating: 4, comment: 'Buen cuadro. El lavanda es muy suave y relajante. Me gusta aunque esperaba un tono más intenso.', date: '2025-12-08', verified: true, variant: '50x50cm' },
    { id: '7', author: 'Gloria Ramírez', rating: 5, comment: 'Pieza hermosa. El lavanda con los pliegues crea un efecto muy especial. Arte artesanal de calidad.', date: '2025-11-28', verified: true, variant: '80x80cm' },
  ],

  // FEATURED — 6 reseñas, 4.5★
  'acorden-rayas-sobre-morado': [
    { id: '1', author: 'Lucía Medina', rating: 5, comment: 'Las rayas sobre morado crean un contraste interesante. Original y elegante.', date: '2026-02-10', verified: true, variant: '80x80cm' },
    { id: '2', author: 'Mauricio Santos', rating: 4, comment: 'Buen diseño. El patrón es sutil pero le da carácter. Contento con la compra.', date: '2026-01-28', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Elena Vargas', rating: 5, comment: 'El morado con rayas es una combinación audaz pero elegante. Me encanta el resultado final.', date: '2026-01-15', verified: true, variant: '80x80cm' },
    { id: '4', author: 'Roberto Campos', rating: 5, comment: 'Diseño original que no encontrarías en ninguna tienda convencional. Arte artesanal único.', date: '2025-12-28', verified: true, variant: '50x50cm' },
    { id: '5', author: 'Paola Gutiérrez', rating: 5, comment: 'Las rayas sobre el morado crean un efecto visual fascinante. Calidad artesanal impecable.', date: '2025-12-18', verified: true, variant: '80x80cm' },
    { id: '6', author: 'Gerardo López', rating: 4, comment: 'Bonita combinación de colores. El morado es vibrante. Trabajo bien hecho. Lo recomendaría.', date: '2025-12-08', verified: true, variant: '50x50cm' },
  ],

  // FEATURED — 5 reseñas, 4.8★
  'acorden-morado-blanco': [
    { id: '1', author: 'Paola Salazar', rating: 5, comment: 'El contraste morado-blanco es perfecto! Se ve muy moderno. Excelente calidad.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Ignacio Campos', rating: 4, comment: 'Bonito cuadro. Los colores son vibrantes. Bien hecho.', date: '2026-01-28', verified: true, variant: '80x80cm' },
    { id: '3', author: 'Daniela Reyes', rating: 5, comment: 'El blanco y morado es una combinación atrevida que funciona perfectamente. Arte artesanal único.', date: '2026-01-15', verified: true, variant: '50x50cm' },
    { id: '4', author: 'Sebastián Torres', rating: 5, comment: 'Los colores son exactos a las fotos. El contraste es llamativo y elegante. Muy buen trabajo artesanal.', date: '2025-12-28', verified: true, variant: '80x80cm' },
    { id: '5', author: 'Cynthia Morales', rating: 5, comment: 'Pieza llamativa que se convirtió en el punto focal de mi sala. El morado y blanco son perfectos.', date: '2025-12-18', verified: true, variant: '50x50cm' },
  ],

  // FEATURED — 4 reseñas, 4.6★
  'acorden-rosa-morado': [
    { id: '1', author: 'Mariana León', rating: 5, comment: 'La combinación rosa-morado es preciosa! Muy femenino y elegante. Me encanta.', date: '2026-02-10', verified: true, variant: '50x50cm' },
    { id: '2', author: 'Daniel Figueroa', rating: 4, comment: 'Comprado como regalo y fue un éxito. Colores bonitos y buen trabajo artesanal.', date: '2026-01-28', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Valeria Hernández', rating: 5, comment: 'El rosa y morado juntos crean algo mágico. Los pliegues realzan los colores perfectamente.', date: '2026-01-15', verified: true, variant: '80x80cm' },
    { id: '4', author: 'Guillermo Sánchez', rating: 5, comment: 'Hermosa pieza. La combinación de colores es única y el trabajo artesanal es excelente.', date: '2025-12-28', verified: true, variant: '50x50cm' },
  ],

  // NUEVO — 3 reseñas, 4.9★
  'acorden-blanco-puro': [
    { id: '1', author: 'Victoria Núñez', rating: 5, comment: 'El blanco puro es elegantísimo. Los pliegues crean un juego de sombras increíble. Perfecto para espacios minimalistas.', date: '2026-02-10', verified: true, variant: '80x80cm' },
    { id: '2', author: 'Óscar Paredes', rating: 4, comment: 'Muy bonito. Simple pero impactante. Buena calidad del papel.', date: '2026-02-05', verified: true, variant: '50x50cm' },
    { id: '3', author: 'Brenda Morales', rating: 5, comment: 'El blanco puro con los pliegues es poesía visual. Arte minimalista en su máxima expresión.', date: '2026-01-22', verified: true, variant: '80x80cm' },
  ],

  // NUEVO — 2 reseñas, 5.0★
  'acorden-burdeos-intenso': [
    { id: '1', author: 'Adriana Ríos', rating: 5, comment: 'El color burdeos es espectacular! Muy elegante y sofisticado. Una pieza que llama la atención sin ser exagerada.', date: '2026-02-10', verified: true, variant: '80x80cm' },
    { id: '2', author: 'Raúl Montoya', rating: 5, comment: 'Perfecto para mi despacho. El tono vino es profundo y elegante. Excelente trabajo artesanal.', date: '2026-01-28', verified: true, variant: '50x50cm' },
  ],

  // NUEVO — 1 reseña, 4.7★
  'acorden-morado-elegante': [
    { id: '1', author: 'Natalia Zavala', rating: 5, comment: 'El morado elegante hace honor a su nombre. Hermoso tono y excelente calidad. Muy contenta con mi compra.', date: '2026-02-10', verified: true, variant: '50x50cm' },
  ],

  // EDICIÓN LIMITADA — 5 reseñas, 4.8★
  'estrellas': [
    { id: '1', author: 'Camila Estrella', rating: 5, comment: 'El cuadro Estrellas es mágico! Los pliegues crean un efecto de profundidad increíble, como si estuvieras mirando un cielo estrellado. Impresionante.', date: '2026-02-10', verified: true, variant: 'Única' },
    { id: '2', author: 'Pablo Montero', rating: 5, comment: 'Una pieza verdaderamente especial. Los pliegues capturan la esencia de las estrellas de una manera que ninguna foto puede reproducir. Arte puro.', date: '2026-02-05', verified: true, variant: 'Única' },
    { id: '3', author: 'Alejandra Fuentes', rating: 5, comment: 'Me enamoré de esta pieza desde la primera vez que la vi. Es perfecta para mi sala de estar y siempre genera conversación. Obra de arte única.', date: '2026-01-28', verified: true, variant: 'Única' },
    { id: '4', author: 'Jorge Ibáñez', rating: 4, comment: 'Hermosa pieza artesanal. El efecto estelar con los pliegues es muy original. Llegó en perfectas condiciones y bien protegida.', date: '2026-01-15', verified: true, variant: 'Única' },
    { id: '5', author: 'Sofía Ramos', rating: 5, comment: 'El cuadro Estrellas es simplemente precioso. El trabajo artesanal es de altísima calidad y el efecto visual es único. Me encanta cada día más.', date: '2025-12-28', verified: true, variant: 'Única' },
  ],
}

/**
 * Obtiene las reviews de un producto específico
 */
export const getProductReviewsContent = (productSlug: string): Review[] => {
  return productReviews[productSlug] || []
}

/**
 * Verifica si un producto tiene contenido de reviews
 */
export const hasReviewsContent = (productSlug: string): boolean => {
  const reviews = productReviews[productSlug]
  return reviews !== undefined && reviews.length > 0
}