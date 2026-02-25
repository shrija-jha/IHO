import React from 'react';
import SEO from "../components/SEO.jsx";
import { seoData } from "../Data/seoData";
import Navbar from "../components/Navbar"; 
import LiveBackground from "../components/LiveBackground"; 

// Page Components
import AboutBanner from "../components/AboutBanner"; // <--- IMPORT THE NEW BANNER
import AboutHero from "../components/AboutHero";     // <--- KEPT YOUR ORIGINAL HERO
import AboutIntro from "../components/AboutIntro";
import OurStory from "../components/OurStory";
import MissionStats from "../components/MissionStats";
import Vision2026 from "../components/Vision2026"; 
import TrendSolutions from "../components/TrendSolutions"; 
import GrowthEngine from "../components/GrowthEngine";
import InnovationLab from "../components/InnovationLab";
import GrowthCTA from "../components/GrowthCTA";

const About = () => {
  // Safe check for SEO data
  const meta = seoData['about'] || { title: "About IHO Digital", description: "About Us" };

  return (
    <div className="relative min-h-screen bg-black text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      
      <SEO 
        title={meta?.title}
        description={meta?.description}
        ogTitle={meta?.ogTitle}
        ogDescription={meta?.ogDescription}
        ogType={meta?.ogType}
        instagramTitle={meta?.instagramTitle}
        instagramDescription={meta?.instagramDescription}
        schemaType={meta?.schemaType}
        schemaName={meta?.schemaName}
        schemaDescription={meta?.schemaDescription}
      />
      
      {/* 3. LIVE BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <LiveBackground />
      </div>
      
      {/* 4. Navigation */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* 5. Main Page Content */}
      <main className="relative z-10 flex flex-col gap-0 pb-20 pt-0">
        
        {/* NEW 3D ANIMATED BANNER (Placed Above) */}
        <AboutBanner />

        {/* YOUR ORIGINAL HERO (Kept as requested) */}
        <AboutHero />
        
        {/* Intro Section */}
        <AboutIntro />
        
        {/* Story Section - ID for scroll targeting */}
        <div id="our-story">
            <OurStory />
        </div>

        <MissionStats />
        
        {/* Vision Section - ID for scroll targeting */}
        <div id="vision">
            <Vision2026 />
        </div>

        <TrendSolutions />
        <GrowthEngine />
        <InnovationLab />
        <GrowthCTA />
      </main>

    </div>
  );
};

export default About;
