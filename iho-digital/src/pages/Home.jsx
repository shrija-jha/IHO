import React from 'react';
import SEO from "../components/SEO.jsx";
import { seoData } from "../Data/seoData"; // This path must match Step 2
import Hero from "../components/Hero";
import ClientMarquee from "../components/ClientMarquee";
import TechMarquee from "../components/TechMarquee";
import CompanyDetails from "../components/CompanyDetails";
import StatsSection from "../components/StatsSection";
import ProcessTimeline from "../components/ProcessTimeline";
import SpecialitySection from "../components/SpecialitySection"; 
import Services from "../components/Services";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import Packages from "../components/Packages"; 
import DigitalEcosystem from "../components/DigitalEcosystem"; 

function Home() {
  // Use "home" key from the file we just created
  const meta = seoData['home']; 

  return (
    <div 
      className="bg-black min-h-screen text-white selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* Dynamic SEO */}
      <SEO 
        title={meta?.title} 
        description={meta?.description}
      />
      <Hero />
      <ClientMarquee />
      <TechMarquee />
      <CompanyDetails />
      <StatsSection />
      <ProcessTimeline />
      <SpecialitySection />
      <DigitalEcosystem />
      <Services />
      <ServicesSection />
      <PortfolioSection />
      <Packages />
    </div>
  );
}

export default Home;
