import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

/**
 * EDITABLE UI COMPONENT - ProductFAQ
 * 
 * Componente de preguntas frecuentes para página de producto
 * Mismo contenido para todos los productos
 */

export const ProductFAQ = () => {
  const faqs = [
    {
      question: "¿Cuánto tarda el envío?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p><span className="font-medium text-foreground">CDMX:</span> 2-3 días hábiles (GRATIS)</p>
          <p><span className="font-medium text-foreground">Nacional:</span> 5-7 días hábiles ($200 MXN)</p>
        </div>
      )
    },
    {
      question: "¿El marco viene incluido?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>Sí, todos los cuadros incluyen:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Marco de madera natural</li>
            <li>Protección de acrílico 3mm</li>
            <li>Sistema de montaje para colgar</li>
          </ul>
        </div>
      )
    },
    {
      question: "¿Cómo se cuelga?",
      answer: (
        <p className="text-muted-foreground">
          Viene listo para colgar con sistema de montaje incluido. Solo necesitas un clavo o taquete según tu tipo de pared.
        </p>
      )
    },
    {
      question: "¿Es resistente al sol?",
      answer: (
        <p className="text-muted-foreground">
          Recomendamos uso en interiores sin luz solar directa para preservar los colores originales del papel.
        </p>
      )
    },
    {
      question: "¿Puedo personalizarlo?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>¡Sí! Contáctanos para:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Diseños personalizados</li>
            <li>Tamaños especiales</li>
            <li>Colores específicos</li>
          </ul>
        </div>
      )
    },
    {
      question: "¿Cómo se limpia?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Pasar un paño seco suavemente</li>
            <li>No usar productos químicos</li>
            <li>No mojar el papel</li>
          </ul>
        </div>
      )
    },
    {
      question: "¿Tiene garantía?",
      answer: (
        <p className="text-muted-foreground">
          30 días de garantía de satisfacción total. Si no te encanta, te devolvemos tu dinero.
        </p>
      )
    },
    {
      question: "¿Hacen envíos internacionales?",
      answer: (
        <p className="text-muted-foreground">
          Por ahora solo enviamos dentro de México. Contáctanos para casos especiales.
        </p>
      )
    }
  ]

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <h3 className="font-heading text-2xl font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          Preguntas Frecuentes
        </h3>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}