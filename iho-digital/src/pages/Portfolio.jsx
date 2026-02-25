import React, { useState, useRef } from 'react'; // Added useRef
import SEO from "../components/SEO.jsx";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'; // Added motion hooks
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';

// Components
import Navbar from "../components/Navbar";
import LiveBackground from "../components/LiveBackground";
import PortfolioCard from "../components/PortfolioCard";
import WorkProcess from "../components/WorkProcess";
import { portfolioData } from "../Data/portfolioData";

const allCategories = ['All', ...new Set(portfolioData.map(item => item.category))];

// --- HELPER: 3D TILT CONTAINER ---
const Tilt3D = ({ children, className, intensity = 15 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === filter);

  return (
    <div className="relative min-h-screen bg-black text-slate-200 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <SEO 
        title="Digital Marketing Portfolio | IHO Digital Results Proven"
        description="Explore IHO Digital’s portfolio showcasing proven digital marketing results, real client success stories, and high-converting campaigns across industries."
        url="/portfolio"
        image="https://ihodigital.com/img/logo-bg.png"
        ogType="business.business"
        locale="en_US"
        ogTitle="Digital Marketing Portfolio | IHO Digital"
        ogDescription="See real results from our digital marketing campaigns."
      />
      
      {/* 1. Global Live Background */}
      <div className="fixed inset-0 z-0">
         <LiveBackground />
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- HERO SECTION (3D TILT & GLOW) --- */}
      <div className="relative z-10 pt-44 pb-20 text-center perspective-[1000px]">
        <div className="container mx-auto px-6 flex flex-col items-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-[0.2em] mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <Briefcase size={12} /> SELECTED WORKS
          </motion.div>
          
          {/* 3D Title */}
          <Tilt3D intensity={20} className="inline-block cursor-default">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl relative z-10"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
            >
              Digital 
              <span className="relative inline-block ml-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Excellence
                {/* Glow behind text */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10" />
              </span>
            </motion.h1>
          </Tilt3D>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed backdrop-blur-sm p-4 rounded-2xl bg-black/10 border border-white/5"
          >
            Explore our curated gallery of high-performance digital platforms, 
            where <span className="text-white font-medium">technical precision</span> meets <span className="text-white font-medium">creative brilliance</span>.
          </motion.p>
        </div>
      </div>

      {/* --- FILTER BAR (Glassmorphism) --- */}
      <div className="relative z-20 container mx-auto px-6 mb-20">
        <div className="flex flex-wrap justify-center gap-4 p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 w-fit mx-auto shadow-2xl">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group ${
                filter === cat 
                  ? 'text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {/* Button Background Animation */}
              {filter === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10"
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- PORTFOLIO GRID (Content Unchanged) --- */}
      <main className="relative z-10 container mx-auto px-6 pb-24">
        <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" 
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500 animate-pulse">
            No projects found in this category.
          </div>
        )}
      </main>

      {/* --- WORK PROCESS --- */}
      <div className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <WorkProcess />
      </div>

      {/* --- CTA SECTION (3D GLOWING BOX) --- */}
      <div className="relative z-10 py-32 container mx-auto px-6 flex justify-center perspective-[1000px]">
        
        <Tilt3D intensity={10} className="w-full max-w-4xl">
          <div className="relative group rounded-[2.5rem] bg-gradient-to-b from-slate-900/80 to-black border border-white/10 p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            
            {/* Animated Glow Border/Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 text-blue-400"
              >
                <Sparkles size={32} />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Ready to start your project?
              </h2>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg">
                Let's build something extraordinary together. Turn your vision into a digital reality.
              </p>
              
              <button 
                onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shine" />
              </button>
            </div>
          </div>
        </Tilt3D>

      </div>
    </div>
  );
};

export default Portfolio;
