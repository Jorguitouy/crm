import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md bg-white/80 backdrop-blur-lg' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="text-2xl font-black text-brand-blue">Calefon.UY</a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#services" className="hover:text-brand-blue">Servicios</a>
            <a href="#problems" className="hover:text-brand-blue">Problemas Comunes</a>
            <a href="#about" className="hover:text-brand-blue">Nosotros</a>
            <a href="#faq" className="hover:text-brand-blue">Preguntas</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:096758200" className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-blue">
              <Phone size={16} />
              <span>096 758 200</span>
            </a>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4 px-4 border-t">
            <nav className="flex flex-col gap-4 pt-4 text-center font-semibold">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Servicios</a>
              <a href="#problems" onClick={() => setIsMenuOpen(false)}>Problemas Comunes</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>Preguntas</a>
              <a href="https://wa.me/59896758200?text=Hola" className="bg-brand-whatsapp-green text-white py-2 px-4 rounded-md">Contactar por WhatsApp</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};