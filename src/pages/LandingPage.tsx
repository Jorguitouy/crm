import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Wrench, ShieldCheck, Star, Menu, X, MessageCircle, PhoneCall, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "¿Porque mi calefón enciende pero no calienta?",
    answer: "Este es un problema común que puede deberse a una resistencia quemada o un termostato defectuoso. Nuestros técnicos pueden diagnosticar y reemplazar la pieza afectada rápidamente."
  },
  {
    question: "¿Porque mi calefón hace saltar la llave?",
    answer: "Generalmente, esto indica un cortocircuito en la resistencia eléctrica. Es una falla de seguridad importante que debe ser atendida por un profesional para evitar riesgos eléctricos."
  },
  {
    question: "¿Porque mi calefón no enciende y no calienta?",
    answer: "La causa puede ser desde un problema en el suministro eléctrico hasta un fallo en el termostato o la resistencia. Realizamos un chequeo completo para encontrar y solucionar el origen del problema."
  },
  {
    question: "¿Por qué mi calefón gotea desde abajo?",
    answer: "Una pérdida de agua no siempre significa que el tanque esté roto. Muchas veces es una falla menor con una solución simple y de menor costo que comprar un calefón nuevo. Sin embargo, cualquier pérdida de agua es una señal de riesgo que debe ser revisada por un profesional. Contáctenos para obtener un presupuesto estimativo sin costo."
  },
  {
    question: "¿Por qué sale poca agua o sin presión de mi calefón?",
    answer: "Esto puede ser causado por acumulación de sarro en las tuberías o en el propio calefón. Una limpieza profesional puede restaurar la presión y el flujo de agua adecuados."
  },
  {
    question: "¿Por qué el agua de mi calefón siempre sale tibia?",
    answer: "Un termostato mal calibrado o una resistencia que no funciona a su máxima capacidad pueden ser los responsables. Ajustar o reemplazar estas piezas suele solucionar el problema."
  },
];

const moreFaqs = [
    {
        question: "¿Hacen instalación de calefones?",
        answer: "¡Absolutamente! Realizamos instalaciones y reemplazos de calefones de todas las marcas, garantizando una instalación prolija y segura cumpliendo con todas las normas técnicas."
    },
    {
        question: "¿Trabajan con todas las marcas de calefones eléctricos?",
        answer: "Sí, contamos con amplia experiencia en la reparación e instalación de todas las marcas de calefones eléctricos que se comercializan en Uruguay, como James, Bronx, Sirium, Orion, Delne, Thermor y muchas más."
    },
    {
        question: "¿Cuales son las formas de pago disponibles?",
        answer: "Aceptamos Efectivo, Transferencia bancaria (BROU, Itaú, Scotiabank), Mercado Pago, y tarjetas de débito y crédito (OCA, American Express, Visa, Mastercard, Diners Club, Líder Card) hasta en 12 cuotas. También aceptamos transferencias desde tarjetas prepago como Mi Dinero y Prex."
    },
    {
        question: "¿Las reparaciones tienen garantía?",
        answer: "Sí. Ofrecemos una garantía específica para el trabajo realizado que cubre integralmente la mano de obra y los repuestos de alta calidad utilizados. El técnico le detallará el período de cobertura en su presupuesto antes de iniciar la reparación."
    }
]

const testimonials = [
  {
    text: "Mi calefón no encendía... Me atendieron amablemente y me dieron una estimación de los costos... vinieron a mi domicilio y efectivamente era uno de los problemas que me habían mencionado. El precio me pareció acorde.",
    author: "María Faúndez"
  },
  {
    text: "No dude en llamar en el momento que leí que se dedican únicamente al servicio técnico de termotanques. Cambiaron una pieza y quedo solucionado. Demoraron muy poco y demostraron que son verdaderos profesionales.",
    author: "Fernando Bazo"
  },
  {
    text: "Me comunique y vinieron a la hora y me repararon el termotanque... Anteriormente un particular me dijo que no tenia solución. Buscando en Google encontré a calefon.uy que rápidamente me lo dejaron funcionando. Totalmente recomendable.",
    author: "Mario Martínez"
  }
];

const NavLinks = () => (
    <>
        <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
        <a href="#fallas" className="hover:text-primary transition-colors">Fallas Frecuentes</a>
        <a href="#nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</a>
        <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
    </>
);

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                    <p>¡Reparación en el día y en el acto!</p>
                    <div className="hidden md:flex items-center gap-4">
                        <a href="tel:096758200" className="flex items-center gap-2 hover:text-primary font-semibold">
                            <PhoneCall size={14} />
                            Llamar: 096 758 200
                        </a>
                        <Button size="sm" asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-1 text-xs">
                            <a href="https://wa.me/59896758200?text=Hola%2C%20estoy%20en%20Calefon.uy%20y%20necesito%20un%20service%20para%20mi%20calef%C3%B3n.">
                                <MessageCircle size={14} className="mr-2" />
                                WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100">
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <a href="#" className="text-2xl font-bold text-primary">Calefon.UY</a>
                    <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
                        <NavLinks />
                    </nav>
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <nav className="container mx-auto px-4 flex flex-col items-start gap-4 py-4 font-medium text-gray-700">
                        <NavLinks />
                         <a href="tel:096758200" className="flex items-center gap-2 hover:text-primary font-semibold">
                            <PhoneCall size={14} />
                            Llamar: 096 758 200
                        </a>
                        <Button size="sm" asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-1 text-xs w-full">
                            <a href="https://wa.me/59896758200?text=Hola%2C%20estoy%20en%20Calefon.uy%20y%20necesito%20un%20service%20para%20mi%20calef%C3%B3n.">
                                <MessageCircle size={14} className="mr-2" />
                                WhatsApp
                            </a>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
};

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white text-center py-20 md:py-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Service de Calefones en Montevideo
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-2">
              ¡Lo reparamos <strong>Hoy Mismo!</strong>
            </p>
            <p className="max-w-2xl mx-auto text-primary-foreground/90 mb-8">
              Atendemos todas las marcas. Pida su presupuesto <strong>GRATIS</strong> por WhatsApp y reciba un diagnóstico al instante.
            </p>
            <Button size="lg" asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full text-lg px-8 py-6">
              <a href="https://wa.me/59896758200?text=Hola,%20necesito%20un%20service%20para%20mi%20calefón.">
                <MessageCircle className="mr-3" />
                Pedir Presupuesto Gratis
              </a>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Servicio Técnico Especializado</h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto">Reparamos e instalamos todas las marcas de calefones eléctricos con repuestos originales y garantía.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {['Bronx', 'Sirium', 'James', 'Orion', 'Warners', 'Delne', 'Thompson', 'Thermor'].map(brand => (
                <div key={brand} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-semibold">{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems Section */}
        <section id="fallas" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">¿Su calefón presenta una de estas fallas?</h2>
              <p className="text-muted-foreground mt-2">Tenemos la solución para los problemas más comunes.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="nosotros" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Su tranquilidad es nuestra prioridad</h2>
                <p className="text-muted-foreground mb-4">
                  Nacimos para ofrecer un servicio de reparación de calefones que fuera rápido, profesional y que respetara su tiempo. Somos la única empresa en Uruguay 100% especializada en calefones eléctricos.
                </p>
                <div className="space-y-3">
                    <div className="flex items-start"><ShieldCheck className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" /><span><strong>Servicio Garantizado:</strong> Empresa registrada en BPS y DGI. Usamos repuestos originales.</span></div>
                    <div className="flex items-start"><Wrench className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" /><span><strong>Técnicos Expertos:</strong> Personal 100% especializado en todas las marcas de calefones eléctricos.</span></div>
                    <div className="flex items-start"><Phone className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" /><span><strong>Atención Inmediata:</strong> Presupuestos sin costo por WhatsApp y visitas coordinadas en el día.</span></div>
                </div>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg border">
                <img src="/placeholder.svg" alt="Técnico de Calefon.UY trabajando" className="rounded-lg shadow-md w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold text-right">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* More FAQs Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {moreFaqs.map((faq, index) => (
                  <AccordionItem value={`item-more-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">¿Listo para solucionar el problema?</h2>
                <p className="text-gray-300 mt-2">Contáctenos ahora. Tenemos el precio más competitivo de Montevideo.</p>
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                     <Button size="lg" asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full text-lg px-8 py-6">
                        <a href="https://wa.me/59896758200?text=Hola,%20necesito%20un%20service%20para%20mi%20calefón.">
                            <MessageCircle className="mr-3" />
                            ¡Envíenos un WhatsApp!
                        </a>
                    </Button>
                     <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-gray-800 rounded-full text-lg px-8 py-6">
                        <a href="tel:096758200">
                            <PhoneCall className="mr-3" />
                            Llamar: 096 758 200
                        </a>
                    </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 border-t border-gray-700 pt-8">
                <div>
                    <h3 className="font-bold text-lg mb-2">Calefon.UY</h3>
                    <p className="text-sm text-gray-400">Servicio técnico profesional, seguro y confiable, especializado exclusivamente en la reparación de calefones.</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2">Contacto</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li className="flex items-center"><Clock size={14} className="mr-2"/> Lunes a Sábado 07:30 a 21:30</li>
                        <li className="flex items-center"><MapPin size={14} className="mr-2"/> Montevideo, Uruguay</li>
                        <li className="flex items-center"><PhoneCall size={14} className="mr-2"/> <a href="tel:096758200" className="hover:underline">096 758 200</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2">Enlaces Útiles</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li><a href="#servicios" className="hover:underline">Servicios</a></li>
                        <li><a href="#fallas" className="hover:underline">Fallas Frecuentes</a></li>
                        <li><a href="#nosotros" className="hover:underline">Sobre Nosotros</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 border-t border-gray-700 mt-8 pt-6">
                <p>&copy; {new Date().getFullYear()} Calefon.UY. Todos los derechos reservados.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;