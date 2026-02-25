import React from 'react';
import { motion } from 'framer-motion';
import SEO from "../components/SEO.jsx";
import SpotlightCard from "../components/SpotlightCard";
import { webServicesData } from "../Data/webServicesData";

const WebServices = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-cyan-500/30">
      <SEO 
        title="Web Services & Development"
        description="Expert web development services including custom websites, CMS solutions, e-commerce platforms, and high-performance frontend architectures."
        url="/web-services"
      />
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80" />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTAINER (Fixes spacing issues) --- */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
          >
            Digital Architecture
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
          >
            Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            We engineer high-performance digital ecosystems. From immersive frontend designs to robust backend architectures.
          </motion.p>
        </div>

        {/* --- 3D GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
          {webServicesData.map((service, index) => (
            <SpotlightCard 
              key={service.id} 
              service={service} 
              index={index} 
              theme="blue" 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default WebServices;
