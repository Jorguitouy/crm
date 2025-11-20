import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  { text: "Mi calefón no encendía... Me atendieron amablemente y me dieron una estimación de los costos... vinieron a mi domicilio y efectivamente era uno de los problemas que me habían mencionado. El precio me pareció acorde.", author: "María Faúndez" },
  { text: "No dude en llamar en el momento que leí que se dedican únicamente al servicio técnico de termotanques. Cambiaron una pieza y quedo solucionado. Demoraron muy poco y demostraron que son verdaderos profesionales.", author: "Fernando Bazo" },
  { text: "Me comunique y vinieron a la hora y me repararon el termotanque... Anteriormente un particular me dijo que no tenia solución. Buscando en Google encontré a calefon.uy que rápidamente me lo dejaron funcionando. Totalmente recomendable.", author: "Mario Martínez" },
];

export const Testimonials = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <p className="font-bold text-right">- {testimonial.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);