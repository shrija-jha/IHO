import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layers } from 'lucide-react';

const PortfolioCard = ({ project, index }) => {
  // --- 1. 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Increased rotation for more dramatic 3D effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // --- 2. Spotlight Logic ---
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Tilt Calculation
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);

    // Spotlight Calculation
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  }

  // Dynamic background gradient based on mouse position
  const spotlight = useMotionTemplate`radial-gradient(
    650px circle at ${spotlightX}px ${spotlightY}px,
    rgba(59, 130, 246, 0.15),
    transparent 80%
  )`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="perspective-1000 w-full h-full"
    >
      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        className="h-full"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          className="group relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)]"
        >
          {/* MOUSE SPOTLIGHT LAYER */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-duration-300"
            style={{ background: spotlight }}
          />

          {/* IMAGE LAYER (Pushed back slightly) */}
          <div className="relative h-60 overflow-hidden border-b border-white/5" style={{ transform: "translateZ(0px)" }}>
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-700" />
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* 3D Floating Badge */}
            <div 
                className="absolute top-4 left-4 z-20 shadow-xl" 
                style={{ transform: "translateZ(40px)" }} // Pops out
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-blue-500/50 text-blue-400 rounded-full">
                <Layers size={10} /> {project.category}
              </span>
            </div>
          </div>

          {/* CONTENT LAYER (Pops out significantly) */}
          <div className="p-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
              {project.title}
            </h3>
            
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors">
              {project.desc}
            </p>

            {/* Decorative Line that glows on hover */}
            <div className="mt-6 h-1 w-12 bg-white/10 rounded-full group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500" />
          </div>

        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioCard;