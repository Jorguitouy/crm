import { Phone, Clock, MapPin } from 'lucide-react';

export const Footer = () => (
  <footer id="contacto" className="bg-slate-900 text-slate-300 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12 text-sm">
        <div>
          <h3 className="text-2xl font-black text-white mb-4">Calefon.UY</h3>
          <p className="text-slate-400">Servicio técnico profesional, seguro y confiable, especializado exclusivamente en la reparación de calefones en Montevideo.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Navegación</h4>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-white">Servicios</a></li>
            <li><a href="#problems" className="hover:text-white">Problemas Comunes</a></li>
            <li><a href="#about" className="hover:text-white">Sobre Nosotros</a></li>
            <li><a href="#faq" className="hover:text-white">Preguntas Frecuentes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Contacto</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><Clock size={16} className="mt-1" /> <span>Lunes a Sábado<br/>07:30 a 21:30</span></li>
            <li className="flex items-center gap-3"><MapPin size={16} /> <span>Montevideo, Uruguay</span></li>
            <li className="flex items-center gap-3"><Phone size={16} /> <a href="tel:096758200" className="hover:text-white">096 758 200</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Calefon.UY. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);