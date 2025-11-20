import { Check } from 'lucide-react';

export const About = () => (
  <section id="about" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-2">Sobre nosotros</h2>
      <div className="w-24 h-1 bg-[#0a4a8e] mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Conozca porque somos su mejor opción.</h3>
          <p className="text-gray-600">Sabemos lo frustrante que es lidiar con un calefón roto. Calefon.UY nació para cambiar eso, ofreciendo un servicio rápido, profesional y que respeta su tiempo y tranquilidad.</p>
          <p className="text-gray-600">Somos la única empresa en Uruguay 100% especializada en calefones eléctricos, con técnicos expertos en todas las principales marcas. Usamos repuestos originales y respaldamos cada reparación con una garantía real.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4">Calefon.UY</h4>
            <ul className="space-y-2">
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Agenda inmediata</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Servicio a domicilio</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Técnicos profesionales</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Repuestos originales</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Varios métodos de pago</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" /> Trabajos con garantía</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">Empresa inscrita en BPS y DGI.</p>
        </div>
      </div>
    </div>
  </section>
);