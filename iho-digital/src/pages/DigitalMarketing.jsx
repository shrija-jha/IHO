import React from 'react';
import { motion } from 'framer-motion';
import SEO from "../components/SEO.jsx";
import SpotlightCard from "../components/SpotlightCard";
import { digitalMarketingData } from "../Data/digitalMarketingData";

const DigitalMarketing = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-purple-500/30">
      <SEO 
        title="Digital Marketing Strategies"
        description="Data-driven digital marketing services including SEO, PPC, Social Media, and Content Strategy to accelerate your business growth."
        url="/digital-marketing"
      />
      {/* --- ANIMATED BACKGROUND (Purple Theme) --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-black to-black opacity-80" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[130px]"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTAINER --- */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/10 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
          >
            Growth & Strategy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Marketing</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Data-driven strategies that dominate markets. We combine creative storytelling with analytical precision.
          </motion.p>
        </div>

        {/* --- 3D GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
          {digitalMarketingData.map((service, index) => (
            <SpotlightCard 
              key={service.id} 
              service={service} 
              index={index} 
              theme="purple" 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DigitalMarketing;
