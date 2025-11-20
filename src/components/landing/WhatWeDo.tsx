import { Wrench, ShieldCheck, HardHat, MessageCircle } from 'lucide-react';

const services = [
  { icon: <HardHat className="h-8 w-8 text-white" />, title: "Instalación", description: "Instalamos su calefón nuevo o de reemplazo con la precisión y seguridad que exige la normativa." },
  { icon: <ShieldCheck className="h-8 w-8 text-white" />, title: "Mantenimiento", description: "Anticípese a las averías y alargue la vida útil de su calefón con nuestro mantenimiento preventivo." },
  { icon: <Wrench className="h-8 w-8 text-white" />, title: "Reparación", description: "Somos especialistas dedicados exclusivamente a la reparación de calefones. Diagnosticamos y solucionamos en el acto." },
  { icon: <MessageCircle className="h-8 w-8 text-white" />, title: "Asesoramiento", description: "Le brindamos asesoramiento experto y honesto para que invierta en el equipo ideal para su hogar." },
];

export const WhatWeDo = () => (
  <section id="what-we-do" className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-2">¿Qué hacemos?</h2>
      <div className="w-24 h-1 bg-[#0a4a8e] mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="bg-[#0a4a8e] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              {service.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);