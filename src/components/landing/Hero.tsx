export const Hero = () => (
  <section id="hero" className="bg-gradient-to-br from-[#0a4a8e] to-[#1c5d9f] text-white py-20 md:py-32 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
        Service de Calefones en Montevideo. ¡Lo reparamos Hoy Mismo!
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-4">
        Atendemos todas las marcas. <strong className="text-[#ffc400]">Pida su presupuesto GRATIS por WhatsApp y reciba un diagnóstico al instante.</strong>
      </p>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
        <strong>Nuestro equipo de técnicos está en su zona para darle una solución rápida y garantizada en el día.</strong>
      </p>
      <a href="https://wa.me/59896758200?text=Hola" className="inline-flex items-center gap-3 bg-[#25d366] text-white font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105">
        <span>Pedir Presupuesto Gratis</span>
      </a>
    </div>
  </section>
);