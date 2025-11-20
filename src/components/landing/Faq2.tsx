import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData2 = [
    { question: "¿Hacen instalación de calefones?", answer: "¡Absolutamente! Realizamos instalaciones y reemplazos de calefones de todas las marcas, garantizando una instalación prolija y segura cumpliendo con todas las normas técnicas." },
    { question: "¿Trabajan con todas las marcas de calefones eléctricos?", answer: "Sí, contamos con amplia experiencia en la reparación e instalación de todas las marcas de calefones eléctricos que se comercializan en Uruguay." },
    { question: "¿Cuales son las formas de pago disponibles?", answer: "Aceptamos Efectivo, Transferencia bancaria, Mercado Pago, y tarjetas de débito y crédito hasta en 12 cuotas." },
    { question: "¿Las reparaciones tienen garantía?", answer: "Sí. Ofrecemos una garantía específica para el trabajo realizado que cubre integralmente la mano de obra y los repuestos de alta calidad utilizados." },
];

export const Faq2 = () => (
  <section id="faq2" className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Más Preguntas Frecuentes</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData2.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);