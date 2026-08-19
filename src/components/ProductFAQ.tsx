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
      question: "¿Lo pueden hacer en otra medida?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Sí — lo hacemos a tu medida.</span> Las medidas de la tienda son nuestras estándar, pero podemos ajustar el <span className="font-medium text-foreground">tamaño, el color y la paleta</span> para tu espacio.
          </p>
          <p>
            Escríbenos por{" "}
            <a
              href="https://wa.me/525531215386?text=%C2%A1Hola!%20Vi%20un%20cuadro%20de%20Plieggo%20y%20lo%20quiero%20en%20otra%20medida.%20%C2%BFMe%20ayudan%20a%20cotizarlo%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
              style={{ color: "#C16648" }}
            >
              WhatsApp
            </a>{" "}
            con tu medida y te cotizamos sin compromiso.
          </p>
        </div>
      )
    },
    {
      question: "¿Y si al colgarlo no me convence?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Cuélgalo y vívelo 30 días.</span> Si no te enamora, escríbenos: pasamos por la pieza y te devolvemos tu dinero completo.
          </p>
          <p>
            Una pieza así hay que verla en <span className="font-medium text-foreground">tu pared, con tu luz, a tu hora del día</span>. Por eso el riesgo lo corremos nosotros, no tú.
          </p>
          <p>
            Y si la pediste a tu medida, la aprobamos contigo <span className="font-medium text-foreground">antes</span> de empezar a plegarla — trabajamos juntos hasta que quede como la imaginaste.
          </p>
        </div>
      )
    },
    {
      question: "¿Cómo llega empacada? Es papel…",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p>
            Llega en <span className="font-medium text-foreground">caja rígida reforzada</span>, con esquineros y protección interior: los pliegues viajan intactos.
          </p>
          <p>
            La abres, la sacas y la cuelgas. <span className="font-medium text-foreground">El soporte ya viene montado atrás</span> — no necesitas herrajes ni instalador.
          </p>
        </div>
      )
    },
    {
      question: "¿Cuánto tarda el envío?",
      answer: (
        <div className="space-y-2 text-muted-foreground">
          <p><span className="font-medium text-foreground">Todo México:</span> 5–7 días hábiles · <span className="font-medium text-foreground">Envío GRATIS</span></p>
          <p className="text-xs mt-1 italic">Cada pieza se elabora especialmente para ti ✦</p>
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