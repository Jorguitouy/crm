import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
    { question: "¿Porque mi calefón enciende pero no calienta?", answer: "Este es un problema común que puede deberse a una resistencia quemada o un termostato defectuoso." },
    { question: "¿Porque mi calefón hace saltar la llave?", answer: "Generalmente, esto indica un cortocircuito en la resistencia eléctrica. Es una falla de seguridad importante." },
    { question: "¿Porque mi calefón no enciende y no calienta?", answer: "La causa puede ser desde un problema en el suministro eléctrico hasta un fallo en el termostato o la resistencia." },
    { question: "¿Por qué mi calefón gotea desde abajo?", answer: "Una pérdida de agua no siempre significa que el tanque esté roto. Muchas veces es una falla menor con una solución simple." },
    { question: "¿Por qué sale poca agua o sin presión de mi calefón?", answer: "Esto puede ser causado por acumulación de sarro en las tuberías o en el propio calefón." },
    { question: "¿Por qué el agua de mi calefón siempre sale tibia?", answer: "Un termostato mal calibrado o una resistencia que no funciona a su máxima capacidad pueden ser los responsables." },
];

export const Faq = () => (
  <section id="faq" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Fallas Frecuentes</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);