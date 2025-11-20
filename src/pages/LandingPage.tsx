import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Services } from '@/components/landing/Services';
import { Faq } from '@/components/landing/Faq';
import { About } from '@/components/landing/About';
import { Footer } from '@/components/landing/Footer';
import { Testimonials } from '@/components/landing/Testimonials';
import { CommonProblems } from '@/components/landing/CommonProblems';
import { WhatWeDo } from '@/components/landing/WhatWeDo';
import { Stats } from '@/components/landing/Stats';
import { FloatingCta } from '@/components/landing/FloatingCta';
import { ContactForm } from '@/components/landing/ContactForm';

const structuredData = [ /* ... tu JSON-LD ... */ ];

const LandingPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* ... tus meta tags ... */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="bg-slate-50 text-slate-800 font-sans">
        <Header />
        <main>
          <Hero />
          <Services />
          <CommonProblems />
          <WhatWeDo />
          <About />
          <Testimonials />
          <Faq />
          <ContactForm />
          <Stats />
        </main>
        <Footer />
        <FloatingCta />
      </div>
    </HelmetProvider>
  );
};

export default LandingPage;