const brands = ['Bronx', 'Sirium', 'James', 'Orion', 'Warners', 'Delne', 'Thompson', 'Thermor'];

export const Services = () => (
  <section id="services" className="py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Servicio técnico de calefones</h2>
      <div className="w-24 h-1 bg-[#0a4a8e] mx-auto mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {brands.map(brand => (
          <div key={brand} className="border border-gray-200 rounded-lg p-4 font-semibold shadow-sm hover:shadow-md transition-shadow">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </section>
);