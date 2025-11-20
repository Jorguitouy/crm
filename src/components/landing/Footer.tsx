import { Phone, Clock, MapPin } from 'lucide-react';

export const Footer = () => (
  <footer id="contacto" className="bg-[#0a4a8e] text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-xl font-black mb-2">Calefon.UY</h3>
          <p className="text-gray-300">Servicio técnico profesional, seguro y confiable, especializado exclusivamente en la reparación de calefones.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">ENLACES ÚTILES</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#services" className="hover:underline">Servicios</a></li>
            <li><a href="#faq" className="hover:underline">Fallas Frecuentes</a></li>
            <li><a href="#about" className="hover:underline">Sobre Nosotros</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">CONTÁCTANOS</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><Clock size={16} /> Lunes a Sábado 07:30 a 21:30</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Montevideo, Uruguay</li>
            <li className="flex items-center gap-2"><Phone size={16} /> <a href="tel:096758200" className="hover:underline">096 758 200</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-800 mt-8 pt-6 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Calefon.UY. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);