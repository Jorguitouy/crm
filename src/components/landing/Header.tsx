import { useState } from 'react';
import { Phone, Menu } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="bg-[#0a4a8e] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap text-sm">
          <p>¡Reparación en el día y en el acto!</p>
          <div className="flex items-center gap-2">
            <a href="tel:096758200" className="flex items-center gap-2 bg-[#ffc400] text-[#0a4a8e] font-bold py-2 px-4 rounded-full text-xs">
              <Phone size={14} />
              <span>Llamar: 096 758 200</span>
            </a>
            <a href="https://wa.me/59896758200?text=Hola" className="flex items-center gap-2 bg-[#25d366] text-white font-bold py-2 px-4 rounded-full text-xs">
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 bg-white z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-black text-[#0a4a8e]">Calefon.UY</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="font-bold text-sm">SERVICE DE CALEFONES</a>
            <a href="#faq" className="font-bold text-sm">FALLAS FRECUENTES</a>
            <a href="#about" className="font-bold text-sm">SOBRE NOSOTROS</a>
            <a href="https://wa.me/59896758200?text=Hola" className="bg-[#25d366] text-white font-bold py-2 px-4 rounded-full text-sm">CONTACTO</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-[#0a4a8e]" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 px-4 space-y-2">
            <a href="#services" className="block font-bold text-sm py-2">SERVICE DE CALEFONES</a>
            <a href="#faq" className="block font-bold text-sm py-2">FALLAS FRECUENTES</a>
            <a href="#about" className="block font-bold text-sm py-2">SOBRE NOSOTROS</a>
            <a href="https://wa.me/59896758200?text=Hola" className="block bg-[#25d366] text-white font-bold py-2 px-4 rounded-full text-sm text-center">CONTACTO</a>
          </div>
        )}
      </nav>
    </header>
  );
};