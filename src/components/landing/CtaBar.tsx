import { Phone } from 'lucide-react';

export const CtaBar = () => (
  <section className="bg-[#ffc400] py-5 text-[#0a4a8e]">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-4">
      <p className="text-lg font-bold">
        Tenemos el precio más competitivo de Montevideo. <br className="md:hidden" />
        <strong className="text-xl">¡LLÁMENOS YA!</strong>
      </p>
      <a href="tel:096758200" className="flex items-center gap-2 text-lg font-bold">
        <Phone />
        <span>096 758 200</span>
      </a>
    </div>
  </section>
);