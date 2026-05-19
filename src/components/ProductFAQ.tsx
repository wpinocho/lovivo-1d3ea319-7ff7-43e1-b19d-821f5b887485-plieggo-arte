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
      question: "¿Cuánto tarda el envío?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p><span className="font-medium text-foreground">CDMX:</span> 10–15 días hábiles (GRATIS)</p>
          <p><span className="font-medium text-foreground">Nacional:</span> 10–15 días hábiles ($200 MXN)</p>
          <p className="text-xs mt-1 italic">Cada pieza se elabora especialmente para ti ✦</p>
        </div>
      )
    },
    {
      question: "¿Puedo personalizarlo?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>¡Sí! Contáctanos para diseños a color, tamaños especiales o paletas personalizadas.</p>
        </div>
      )
    },
    {
      question: "¿Cómo cuido mi obra?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>Tu pieza está hecha para durar décadas con cuidados simples:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Colócala en un lugar fresco y seco, lejos de luz solar directa</li>
            <li>Limpia con un paño seco suave — sin productos químicos ni humedad</li>
            <li>Maneja con cuidado para preservar los pliegues y texturas del papel</li>
          </ul>
        </div>
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