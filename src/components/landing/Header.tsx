import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-[#0a4a8e] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-2 text-xs sm:text-sm">
          <p>¡Reparación en el día y en el acto!</p>
          <div className="flex items-center gap-2">
            <a href="tel:096758200" className="flex items-center gap-2 bg-[#ffc400] text-[#0a4a8e] font-bold py-1 px-3 rounded-full">
              <Phone size={14} />
              <span>Llamar: 096 758 200</span>
            </a>
            <a href="https://wa.me/59896758200?text=Hola" className="flex items-center gap-2 bg-[#25d366] text-white font-bold py-1 px-3 rounded-full">
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-black text-[#0a4a8e]">Calefon.UY</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="font-bold text-sm hover:underline">SERVICE DE CALEFONES</a>
            <a href="#faq" className="font-bold text-sm hover:underline">FALLAS FRECUENTES</a>
            <a href="#about" className="font-bold text-sm hover:underline">SOBRE NOSOTROS</a>
            <a href="https://wa.me/59896758200?text=Hola" className="bg-[#25d366] text-white font-bold py-2 px-4 rounded-full text-sm">CONTACTO</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-[#0a4a8e]" /> : <Menu className="text-[#0a4a8e]" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 px-4 space-y-2 pb-4 border-t">
            <a href="#services" className="block font-bold text-sm py-2" onClick={() => setIsMenuOpen(false)}>SERVICE DE CALEFONES</a>
            <a href="#faq" className="block font-bold text-sm py-2" onClick={() => setIsMenuOpen(false)}>FALLAS FRECUENTES</a>
            <a href="#about" className="block font-bold text-sm py-2" onClick={() => setIsMenuOpen(false)}>SOBRE NOSOTROS</a>
            <a href="https://wa.me/59896758200?text=Hola" className="block bg-[#25d366] text-white font-bold py-2 px-4 rounded-full text-sm text-center" onClick={() => setIsMenuOpen(false)}>CONTACTO</a>
          </div>
        )}
      </nav>
    </header>
  );
};