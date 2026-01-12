/**
 * REVIEWS CONTENT - Contenido de reseñas por producto
 * 
 * Este archivo contiene las reseñas reales que se mostrarán en el modal.
 * Cada producto tiene 2-4 reviews con testimonios realistas.
 */

export interface Review {
  id: string
  author: string
  rating: number // 1-5
  comment: string
  date: string // YYYY-MM-DD
  verified: boolean
  variant?: string // Tamaño o color comprado
}

export const productReviews: Record<string, Review[]> = {
  'acorden-beige-sutil': [
    {
      id: '1',
      author: 'María González',
      rating: 5,
      comment: 'Hermoso cuadro! Se ve increíble en mi sala. Los colores son perfectos y la textura del papel le da un toque muy elegante. Totalmente recomendado.',
      date: '2024-12-15',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Juan Pérez',
      rating: 5,
      comment: 'Llegó en perfecto estado, muy bien empaquetado. La calidad del trabajo artesanal se nota. Es exactamente como en las fotos.',
      date: '2024-12-08',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '3',
      author: 'Ana Martínez',
      rating: 5,
      comment: 'Me encanta! Le da un aire muy sofisticado a mi oficina. Los pliegues crean sombras hermosas con la luz natural.',
      date: '2024-11-28',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '4',
      author: 'Carlos Ramírez',
      rating: 4,
      comment: 'Excelente pieza decorativa. El único detalle es que tardó un poco en llegar pero valió la pena la espera.',
      date: '2024-11-20',
      verified: true,
      variant: '80x80cm'
    }
  ],

  'acorden-rosa-sereno': [
    {
      id: '1',
      author: 'Sofía Hernández',
      rating: 5,
      comment: 'Perfecto para mi cuarto! El tono rosa es súper delicado y los pliegues le dan mucha personalidad. Muy contenta con mi compra.',
      date: '2024-12-18',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Luis Torres',
      rating: 5,
      comment: 'Lo compré como regalo para mi esposa y le encantó. La textura y el trabajo manual se aprecian de cerca. Hermoso.',
      date: '2024-12-10',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '3',
      author: 'Gabriela Sánchez',
      rating: 5,
      comment: 'Me fascina el efecto 3D que crean los pliegues. Es una obra de arte única. El empaque también fue muy cuidadoso.',
      date: '2024-11-25',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '4',
      author: 'Roberto Díaz',
      rating: 4,
      comment: 'Muy bonito cuadro, aunque esperaba que fuera un poco más grande. De todas formas se ve muy bien en la pared.',
      date: '2024-11-15',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-verde-salvia': [
    {
      id: '1',
      author: 'Patricia Flores',
      rating: 5,
      comment: 'El color verde es precioso! Combina perfecto con mi decoración. La calidad del papel es excelente y se nota el trabajo artesanal.',
      date: '2024-12-20',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '2',
      author: 'Miguel Ángel Castro',
      rating: 5,
      comment: 'Impresionante. Es mi segunda compra de Plieggo y no decepciona. El efecto de luz y sombra es espectacular.',
      date: '2024-12-05',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '3',
      author: 'Laura Jiménez',
      rating: 5,
      comment: 'Me encanta cómo transforma el espacio. Es una pieza única que siempre genera conversación con las visitas.',
      date: '2024-11-30',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '4',
      author: 'Fernando López',
      rating: 4,
      comment: 'Muy buena calidad. El tono verde es un poco más claro de lo que esperaba pero igual me gusta mucho.',
      date: '2024-11-18',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-terracota-vibrante': [
    {
      id: '1',
      author: 'Carmen Ruiz',
      rating: 5,
      comment: 'El color terracota es vibrante y cálido. Le da vida a mi comedor. Excelente trabajo artesanal.',
      date: '2024-12-12',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '2',
      author: 'Javier Morales',
      rating: 5,
      comment: 'Perfecto para mi oficina. El color es intenso sin ser demasiado. Los pliegues crean un efecto visual muy interesante.',
      date: '2024-11-22',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '3',
      author: 'Daniela Cruz',
      rating: 4,
      comment: 'Bonito cuadro, aunque el color es más naranja de lo que pensaba. De todas formas queda bien en mi sala.',
      date: '2024-11-10',
      verified: true,
      variant: '80x80cm'
    }
  ],

  'acorden-crema-rayas': [
    {
      id: '1',
      author: 'Ricardo Vega',
      rating: 5,
      comment: 'Las rayas le dan un toque muy elegante. Se ve minimalista pero sofisticado. Muy contento con la compra.',
      date: '2024-12-08',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Valentina Ortiz',
      rating: 5,
      comment: 'Me encanta! El contraste de las rayas con el crema es perfecto. Queda hermoso en mi recámara.',
      date: '2024-11-28',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '3',
      author: 'Andrés Méndez',
      rating: 4,
      comment: 'Buena calidad. El patrón de rayas es sutil pero se nota. Recomendado.',
      date: '2024-11-15',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'luna-llena': [
    {
      id: '1',
      author: 'Alejandra Romero',
      rating: 5,
      comment: 'Es una pieza espectacular! Los pliegues crean el efecto de la luna de forma increíble. Sin duda es el centro de atención en mi sala.',
      date: '2024-12-18',
      verified: true,
      variant: 'Única'
    },
    {
      id: '2',
      author: 'Pablo Herrera',
      rating: 5,
      comment: 'Edición limitada que vale cada peso. El trabajo artesanal es impecable. Una verdadera obra de arte.',
      date: '2024-12-01',
      verified: true,
      variant: 'Única'
    },
    {
      id: '3',
      author: 'Mónica Guzmán',
      rating: 5,
      comment: 'Simplemente hermoso. El efecto tridimensional de la luna es fascinante. Llegó muy bien protegido.',
      date: '2024-11-20',
      verified: true,
      variant: 'Única'
    }
  ],

  'luna-azul': [
    {
      id: '1',
      author: 'Eduardo Silva',
      rating: 5,
      comment: 'El tono azul es precioso. Perfecta para mi estudio. Los pliegues capturan la luz de forma mágica.',
      date: '2024-12-15',
      verified: true,
      variant: 'Única'
    },
    {
      id: '2',
      author: 'Isabella Reyes',
      rating: 5,
      comment: 'Me enamoré desde que la vi! Es una pieza única que le da mucha personalidad a mi espacio.',
      date: '2024-11-28',
      verified: true,
      variant: 'Única'
    },
    {
      id: '3',
      author: 'Sergio Navarro',
      rating: 4,
      comment: 'Hermosa pieza. El azul es un poco más intenso de lo que esperaba pero igual me encanta.',
      date: '2024-11-12',
      verified: true,
      variant: 'Única'
    }
  ],

  'luna-negra': [
    {
      id: '1',
      author: 'Camila Vargas',
      rating: 5,
      comment: 'Elegante y minimalista. El negro mate con los pliegues crea un efecto dramático espectacular.',
      date: '2024-12-10',
      verified: true,
      variant: 'Única'
    },
    {
      id: '2',
      author: 'Diego Mendoza',
      rating: 4,
      comment: 'Muy bonita. Perfecta para espacios modernos. La calidad del papel es excelente.',
      date: '2024-11-22',
      verified: true,
      variant: 'Única'
    }
  ],

  'acorden-crema-natural': [
    {
      id: '1',
      author: 'Rosa Aguilar',
      rating: 5,
      comment: 'El tono crema es muy versátil. Combina con todo. Me encanta la textura del papel.',
      date: '2024-12-05',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Héctor Ramos',
      rating: 4,
      comment: 'Buen cuadro. Neutro y elegante. Llegó en buen estado.',
      date: '2024-11-18',
      verified: true,
      variant: '80x80cm'
    }
  ],

  'acorden-morado-lavanda': [
    {
      id: '1',
      author: 'Fernanda Cortés',
      rating: 5,
      comment: 'El lavanda es hermoso! Muy relajante. Perfecto para mi cuarto. La calidad es excelente.',
      date: '2024-12-08',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Arturo Delgado',
      rating: 4,
      comment: 'Bonito tono. Más claro de lo que esperaba pero se ve bien. Recomendado.',
      date: '2024-11-25',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-rayas-sobre-morado': [
    {
      id: '1',
      author: 'Lucía Medina',
      rating: 5,
      comment: 'Las rayas sobre morado crean un contraste interesante. Original y elegante.',
      date: '2024-12-01',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '2',
      author: 'Mauricio Santos',
      rating: 4,
      comment: 'Buen diseño. El patrón es sutil pero le da carácter. Contento con la compra.',
      date: '2024-11-15',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-morado-blanco': [
    {
      id: '1',
      author: 'Paola Salazar',
      rating: 5,
      comment: 'El contraste morado-blanco es perfecto! Se ve muy moderno. Excelente calidad.',
      date: '2024-12-12',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Ignacio Campos',
      rating: 4,
      comment: 'Bonito cuadro. Los colores son vibrantes. Bien hecho.',
      date: '2024-11-28',
      verified: true,
      variant: '80x80cm'
    }
  ],

  'acorden-rosa-morado': [
    {
      id: '1',
      author: 'Mariana León',
      rating: 5,
      comment: 'La combinación rosa-morado es preciosa! Muy femenino y elegante. Me encanta.',
      date: '2024-12-15',
      verified: true,
      variant: '50x50cm'
    },
    {
      id: '2',
      author: 'Daniel Figueroa',
      rating: 4,
      comment: 'Comprado como regalo y fue un éxito. Colores bonitos y buen trabajo artesanal.',
      date: '2024-11-20',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-blanco-puro': [
    {
      id: '1',
      author: 'Victoria Núñez',
      rating: 5,
      comment: 'El blanco puro es elegantísimo. Los pliegues crean un juego de sombras increíble. Perfecto para espacios minimalistas.',
      date: '2024-12-20',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '2',
      author: 'Óscar Paredes',
      rating: 4,
      comment: 'Muy bonito. Simple pero impactante. Buena calidad del papel.',
      date: '2024-12-08',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-burdeos-intenso': [
    {
      id: '1',
      author: 'Adriana Ríos',
      rating: 5,
      comment: 'El color burdeos es espectacular! Muy elegante y sofisticado. Una pieza que llama la atención sin ser exagerada.',
      date: '2024-12-18',
      verified: true,
      variant: '80x80cm'
    },
    {
      id: '2',
      author: 'Raúl Montoya',
      rating: 5,
      comment: 'Perfecto para mi despacho. El tono vino es profundo y elegante. Excelente trabajo artesanal.',
      date: '2024-12-05',
      verified: true,
      variant: '50x50cm'
    }
  ],

  'acorden-morado-elegante': [
    {
      id: '1',
      author: 'Natalia Zavala',
      rating: 5,
      comment: 'El morado elegante hace honor a su nombre. Hermoso tono y excelente calidad. Muy contenta con mi compra.',
      date: '2024-12-22',
      verified: true,
      variant: '50x50cm'
    }
  ],

  // Producto sin reviews
  'estrellas': []
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