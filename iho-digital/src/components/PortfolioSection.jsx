import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import { portfolioData } from "../Data/portfolioData";

const PortfolioSection = () => {
  // Select first 9 projects to display
  const displayedProjects = portfolioData.slice(0, 9);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-md"
          >
            <Briefcase size={12} /> SELECTED WORKS
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
          >
            Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Masterpieces</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A curated selection of high-performance websites and digital platforms built for industry leaders.
          </motion.p>
        </div>

        {/* --- Project Grid (3x3 Layout) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* --- View All Button --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            View All Projects <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default PortfolioSection;