import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { CtaBar } from '@/components/landing/CtaBar';
import { Services } from '@/components/landing/Services';
import { Faq } from '@/components/landing/Faq';
import { Faq2 } from '@/components/landing/Faq2';
import { About } from '@/components/landing/About';
import { Footer } from '@/components/landing/Footer';
import { Testimonials } from '@/components/landing/Testimonials';
import { CommonProblems } from '@/components/landing/CommonProblems';
import { WhatWeDo } from '@/components/landing/WhatWeDo';
import { Stats } from '@/components/landing/Stats';

const structuredData = [ /* ... tu JSON-LD ... */ ];

const LandingPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* ... tus meta tags ... */}
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
          <Faq2 />
          {/* El Footer CTA y Stats están dentro del Footer en tu diseño original, así que se quedan ahí */}
        </main>
        <Stats />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default LandingPage;