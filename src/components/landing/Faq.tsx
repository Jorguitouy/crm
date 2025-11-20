import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
    {
        question: "¿Porque mi calefón enciende pero no calienta?",
        answer: "Este es un problema común que puede deberse a una resistencia quemada o un termostato defectuoso. Nuestros técnicos pueden diagnosticar y reemplazar la pieza afectada rápidamente."
    },
    {
        question: "¿Porque mi calefón hace saltar la llave?",
        answer: "Generalmente, esto indica un cortocircuito en la resistencia eléctrica. Es una falla de seguridad importante que debe ser atendida por un profesional para evitar riesgos eléctricos."
    },
    // ... (resto de tus preguntas y respuestas)
];

export const Faq = () => (
  <section id="faq" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);