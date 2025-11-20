import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { CtaBar } from '@/components/landing/CtaBar';
import { Services } from '@/components/landing/Services';
import { Faq } from '@/components/landing/Faq';
import { About } from '@/components/landing/About';
import { Footer } from '@/components/landing/Footer';
import { Testimonials } from '@/components/landing/Testimonials';
import { CommonProblems } from '@/components/landing/CommonProblems';
import { WhatWeDo } from '@/components/landing/WhatWeDo';
import { Stats } from '@/components/landing/Stats';

const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "Calefon.UY",
        "image": "https://calefon.uy/assets/images/banner-desktop.webp",
        "@id": "https://calefon.uy/",
        "url": "https://calefon.uy",
        "telephone": "+59896758200",
        "priceRange": "$",
        "address": { "@type": "PostalAddress", "addressLocality": "Montevideo", "addressCountry": "UY" },
        "areaServed": { "@type": "City", "name": "Montevideo" },
        "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "07:30", "closes": "21:30" },
        "serviceType": "Reparación de calefones eléctricos"
      }
];

const LandingPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="es" />
        <title>Técnico de Calefones a Domicilio en Montevideo - Presupuestos Gratis</title>
        <meta name="description" content="Service y reparación de calefones en el día. Expertos en Bronx, Orion, Sirium y más. Solución garantizada. ¡Presupuestos gratis!" />
        <link rel="canonical" href="https://calefon.uy" />
        <meta property="og:title" content="Técnico de Calefones a Domicilio en Montevideo" />
        <meta property="og:description" content="Service y reparación de calefones en el día. Expertos en Bronx, Orion, James y más. Solución garantizada. ¡Consulte gratis!" />
        <meta property="og:image" content="https://calefon.uy/assets/images/banner-desktop.webp" />
        <meta property="og:url" content="https://calefon.uy" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_UY" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div className="bg-white text-[#333] font-sans">
        <Header />
        <main>
          <Hero />
          <CtaBar />
          <Services />
          <Faq />
          <CommonProblems />
          <About />
          <WhatWeDo />
          <Testimonials />
          {/* Aquí iría la segunda sección de FAQ si tuviera contenido diferente */}
          {/* Aquí iría el Footer CTA si fuera un componente separado */}
          <Stats />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default LandingPage;