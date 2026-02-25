import React, { useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Megaphone, Smartphone, Search, BarChart, Globe, Share2, Rocket, Code } from 'lucide-react';

const services = [
  { id: 1, title: 'Branding', icon: <Rocket size={24} />, color: 'bg-indigo-600', shadow: 'shadow-indigo-500/50' },
  { id: 2, title: 'Mobile', icon: <Smartphone size={24} />, color: 'bg-orange-600', shadow: 'shadow-orange-500/50' },
  { id: 3, title: 'Analytics', icon: <BarChart size={24} />, color: 'bg-teal-600', shadow: 'shadow-teal-500/50' },
  { id: 4, title: 'Web', icon: <Globe size={24} />, color: 'bg-blue-600', shadow: 'shadow-blue-500/50' },
  { id: 5, title: 'SEO', icon: <Search size={24} />, color: 'bg-purple-600', shadow: 'shadow-purple-500/50' },
  { id: 6, title: 'Ads', icon: <Megaphone size={24} />, color: 'bg-red-600', shadow: 'shadow-red-500/50' },
  { id: 7, title: 'Social', icon: <Share2 size={24} />, color: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' },
  { id: 8, title: 'Dev', icon: <Code size={24} />, color: 'bg-pink-600', shadow: 'shadow-pink-500/50' },
];

const SpecialitySection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[600px] md:min-h-[900px]">
      
      {/* --- 1. NEW Ultra-Glowing Firefly Background --- */}
      <GlowingFirefliesBackground />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        
        {/* --- 2. Animated Header (Glowing Blue) --- */}
        <div className="mb-12 md:mb-20 relative">
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-blue-400 tracking-tighter drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] font-sans"
          >
            CORE SERVICES
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-blue-300/60 mt-2 md:mt-4 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
          >
            <span className="hidden md:inline">&lt; Drag Modules to Explore /&gt;</span>
            <span className="md:hidden">&lt; Tap to Explore /&gt;</span>
          </motion.p>
        </div>

        {/* --- 3. Responsive Layout: Desktop (Draggable Circle) vs Mobile (Grid) --- */}
        
        {/* Desktop/Tablet: Draggable Hexagon Hive */}
        <div className="hidden md:block">
          <div className="relative w-full max-w-5xl mx-auto h-[500px] lg:h-[600px] flex items-center justify-center mt-10">
            
            {/* Center "Reactor" Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 lg:w-40 lg:h-40 rounded-full border border-blue-500/20 bg-blue-900/10 backdrop-blur-sm flex items-center justify-center z-0 pointer-events-none">
              <div className="w-full h-full rounded-full border-t border-blue-400/50 animate-[spin_8s_linear_infinite]" />
              <div className="absolute w-16 h-16 lg:w-24 lg:h-24 rounded-full border-b border-cyan-400/50 animate-[spin_12s_linear_infinite_reverse]" />
              <div className="absolute text-blue-300 font-bold text-lg lg:text-2xl tracking-widest drop-shadow-[0_0_15px_rgba(59,130,246,1)] font-sans">IHO</div>
            </div>

            {/* The Cards Wrapper */}
            <div className="relative w-full h-full">
              {services.map((service, index) => (
                <DraggableHexCard key={service.id} service={service} index={index} total={services.length} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Simple Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
          {services.map((service) => (
            <MobileServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component: Ultra-Glowing Fireflies Background ---
const GlowingFirefliesBackground = () => {
  const particles = useMemo(() => [...Array(30)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? '#3b82f6' : '#22d3ee',
  })), []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#000000_100%)] opacity-60" />
       
       {particles.map((p, i) => (
         <motion.div
           key={i}
           className="absolute rounded-full"
           initial={{ 
             left: `${p.x}%`, 
             top: `${p.y}%`, 
             width: p.size, 
             height: p.size,
             opacity: 0 
           }}
           animate={{ 
             x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0], 
             y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
             opacity: [0, 1, 0],
             scale: [0.5, 1.5, 0.5] 
           }}
           transition={{ 
             duration: p.duration, 
             repeat: Infinity, 
             delay: p.delay,
             ease: "easeInOut"
           }}
           style={{
             backgroundColor: p.color,
             boxShadow: `0 0 ${p.size * 4}px ${p.size}px ${p.color}`,
             filter: 'blur(1px)'
           }}
         />
       ))}

       <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.15),transparent_70%)]"
       />
    </div>
  );
};

// --- Component: Mobile Service Card (Simple Static Card) ---
const MobileServiceCard = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.95 }}
      className={`${service.color} relative group transition-all duration-300 rounded-2xl overflow-hidden`}
      style={{ 
        filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.5))"
      }}
    >
      <div className="relative bg-black/90 p-6 flex flex-col items-center justify-center text-center min-h-[140px] hover:bg-gray-900 transition-colors duration-300">
        
        <div className={`absolute inset-0 ${service.color} opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-500`} />

        <div className="mb-3 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transform group-hover:scale-110 transition-all duration-300 relative z-10">
          {service.icon}
        </div>

        <h3 className="text-xs font-bold text-gray-300 tracking-wider uppercase group-hover:text-white relative z-10 font-sans">
          {service.title}
        </h3>
      </div>
    </motion.div>
  );
};

// --- Component: Draggable Hex Card (Responsive for Tablet/Desktop) ---
const DraggableHexCard = ({ service, index, total }) => {
  // Responsive radius based on screen size
  const radius = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 260 : 200; 
  const angle = (index / total) * 2 * Math.PI + (Math.PI / 8); 
  
  const initialX = Math.cos(angle) * radius;
  const initialY = Math.sin(angle) * radius;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], ["30deg", "-30deg"]);
  const rotateY = useTransform(x, [-100, 100], ["-30deg", "30deg"]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.2, zIndex: 50, cursor: "grabbing" }}
      
      className="absolute top-1/2 left-1/2"
      style={{ 
        x, y, 
        marginLeft: "calc(-2.5rem - 10px)", 
        marginTop: "calc(-2.75rem - 10px)", 
        rotateX, 
        rotateY,
        cursor: "grab",
        perspective: 1000
      }}
      
      animate={{
        x: [initialX, initialX + (Math.random() * 15 - 7.5), initialX],
        y: [initialY, initialY + (Math.random() * 15 - 7.5), initialY],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.2
      }}
    >
      <div 
        className={`w-28 h-32 lg:w-36 lg:h-40 ${service.color} relative group transition-all duration-300`}
        style={{ 
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))"
        }}
      >
        <div className="absolute inset-[2px] bg-black/90 clip-hexagon flex flex-col items-center justify-center p-3 lg:p-4 text-center z-20 hover:bg-gray-900 transition-colors duration-300"
             style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
          
          <div className={`absolute top-0 w-full h-full ${service.color} opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-500`} />

          <div className="mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {service.icon}
          </div>

          <h3 className="text-[10px] lg:text-xs font-bold text-gray-300 tracking-wider uppercase group-hover:text-white relative z-10 font-sans">
            {service.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialitySection;