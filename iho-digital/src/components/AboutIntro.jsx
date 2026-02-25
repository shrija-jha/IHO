import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Code, Globe, Cpu, ArrowRight } from "lucide-react";

// --- Animation Variants for Staggered Sliding Effect ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
};

// --- FAST GRID CARDS ---
const FastTechGrid = () => {
  const cards = [
    {
      id: "dev",
      label: "DEV",
      icon: <Code size={32} />,
      color: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/40",
      delay: 0.1
    },
    {
      id: "web",
      label: "WEB",
      icon: <Globe size={32} />,
      color: "from-cyan-500 to-blue-500",
      shadow: "shadow-cyan-500/40",
      delay: 0.2
    },
    {
      id: "ai",
      label: "AI",
      icon: <Cpu size={32} />,
      color: "from-purple-600 to-fuchsia-600",
      shadow: "shadow-purple-500/40",
      delay: 0.3
    },
    {
      id: "growth",
      label: "GROWTH",
      icon: <Rocket size={32} />,
      color: "from-orange-500 to-red-500",
      shadow: "shadow-orange-500/40",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: card.delay }}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square rounded-[2rem] bg-slate-900/50 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-4 group cursor-pointer relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-200`} />
          <div className={`relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-200 shadow-lg ${card.shadow}`}>
            {card.icon}
          </div>
          <span className="relative z-10 text-xs font-bold tracking-widest text-slate-400 group-hover:text-white transition-colors duration-200">
            {card.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const AboutIntro = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Smooth Scroll Function
  const scrollToVision = () => {
    const element = document.getElementById('vision');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Text Content Side --- */}
          <motion.div 
            style={{ y }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative pr-0 lg:pr-10" 
          >
            <motion.div variants={itemVariants} className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mb-6" />

            <motion.h2 variants={itemVariants} className="text-blue-400 font-mono tracking-[0.2em] uppercase text-sm mb-4">
              <span className="text-blue-500 mr-2">/</span>About IHO Digital
            </motion.h2>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Future-Ready <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                Innovation.
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-slate-300 relative pl-6 border-l border-slate-700">
              <p className="leading-relaxed">
                We don't just build websites; we engineer <span className="text-white font-semibold">digital ecosystems</span>. IHO Digital is a forward-thinking powerhouse dedicated to helping businesses dominate in a technology-driven world.
              </p>
              <p className="leading-relaxed">
                From high-performance <span className="text-blue-400">Web Development</span> to AI-driven <span className="text-purple-400">Marketing Strategies</span>, we merge creativity with technical excellence to exceed expectations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <motion.button
                  onClick={scrollToVision} // Added scroll handler here
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-10 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                Explore Our Vision 
                <ArrowRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform text-blue-600" />
                </motion.button>
            </motion.div>
          </motion.div>

          {/* --- 4 FAST ANIMATED CARDS --- */}
          <div className="flex justify-center items-center">
             <FastTechGrid />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutIntro;