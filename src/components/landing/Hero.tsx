export const Hero = () => (
  <section id="hero" className="relative bg-white">
    <div className="container mx-auto px-4 py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-black text-brand-blue leading-tight mb-6">
        Service de Calefones en Montevideo
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8">
        Reparación e instalación en el día. Técnicos expertos en todas las marcas. <br/>
        <span className="font-semibold">Pida su presupuesto GRATIS por WhatsApp y reciba un diagnóstico al instante.</span>
      </p>
      <a href="https://wa.me/59896758200?text=Hola" className="inline-flex items-center gap-3 bg-brand-yellow text-brand-blue font-bold py-4 px-8 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg">
        <span>Pedir Presupuesto Gratis</span>
      </a>
    </div>
  </section>
);