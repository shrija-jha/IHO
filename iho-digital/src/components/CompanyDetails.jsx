import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { Cpu, Network, Zap, Globe, ShieldCheck } from "lucide-react";

// --- THE 3D REACTOR CORE (Right Side Animation) ---
const ReactorCore = () => {
  return (
    <div className="relative w-full h-125 flex items-center justify-center perspective-[1000px]">
      
      {/* 1. OUTER ORBITAL RINGS */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
          transition={{
            duration: 10 + i * 5, // Different speeds
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          style={{
            width: `${300 + i * 60}px`,
            height: `${300 + i * 60}px`,
            borderStyle: i % 2 === 0 ? "solid" : "dashed", // Alternating styles
          }}
        />
      ))}

      {/* 2. THE INNER CUBE (The "Processor") */}
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative w-32 h-32"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cube Faces */}
        {["translateZ(64px)", "translateZ(-64px) rotateY(180deg)", "rotateY(90deg) translateZ(64px)", "rotateY(-90deg) translateZ(64px)", "rotateX(90deg) translateZ(64px)", "rotateX(-90deg) translateZ(64px)"].map((transform, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/50 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center"
            style={{ transform }}
          >
            <Cpu className="w-12 h-12 text-cyan-300 opacity-80" />
          </div>
        ))}
      </motion.div>

      {/* 3. CORE ENERGY BALL */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-16 h-16 bg-white rounded-full blur-[20px] z-0"
      />
      <div className="absolute w-12 h-12 bg-cyan-400 rounded-full blur-[10px] z-10" />

      {/* 4. FLOATING PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// --- STATS CARD COMPONENT ---
const StatCard = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, x: 10, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer group"
  >
    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold text-white font-mono">{value}</h4>
      <p className="text-xs text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  </motion.div>
);

const CompanyDetails = () => {
  const navigate = useNavigate();

  // --- NAVIGATE TO CONTACT PAGE ---
  const handleInitiateContact = () => {
    navigate('/contact');
  };

  return (
    <section className="relative py-32 bg-neutral-950 overflow-hidden font-sans">
      
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: COMPANY HUD INTERFACE --- */}
          <div className="space-y-10">
            
            {/* Header with Glitch Effect Idea */}
            <div>
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: "100px" }} 
                className="h-1 bg-cyan-500 mb-4" 
              />
              <h2 className="text-sm font-bold text-cyan-400 tracking-[0.3em] uppercase mb-2">
                System Identity
              </h2>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                IHO <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">DIGITAL</span>
              </h1>
            </div>

            {/* Typing Terminal Description */}
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-900/5 font-mono text-sm md:text-base text-cyan-100/80 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
              <p className="mb-4">
                Initializing corporate profile sequence...
              </p>
              <p className="leading-relaxed">
                IHO Digital is not just an agency; we are a <span className="text-white font-bold">digital foundry</span>. 
                We engineer high-performance ERP architectures, immersive web experiences, and algorithmic marketing strategies. 
                Our mission is to decode complexity and compile success for the modern enterprise.
              </p>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-cyan-500 ml-1 translate-y-1"
              />
            </div>

            {/* 3D Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard 
                icon={<Globe />} 
                value="Global" 
                label="Reach" 
                delay={0.2} 
              />
              <StatCard 
                icon={<ShieldCheck />} 
                value="100%" 
                label="Security" 
                delay={0.4} 
              />
              <StatCard 
                icon={<Zap />} 
                value="24/7" 
                label="Uptime" 
                delay={0.6} 
              />
              <StatCard 
                icon={<Network />} 
                value="20+" 
                label="Partners" 
                delay={0.8} 
              />
            </div>

            {/* Action Button - NAVIGATES TO CONTACT PAGE */}
            <motion.button
              onClick={handleInitiateContact}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/20"
            >
              Initiate Contact
            </motion.button>

          </div>

          {/* --- RIGHT SIDE: 3D REACTOR CORE ANIMATION --- */}
          <div className="relative">
            {/* Background Glow behind the reactor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/10 rounded-full blur-[80px] -z-10" />
            
            <ReactorCore />
            
            {/* Overlay Text Floating in 3D */}
            <motion.div 
              className="absolute bottom-10 right-10 text-right pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-white font-bold text-xl">CORE STATUS</h3>
              <p className="text-cyan-400 font-mono text-sm">OPERATIONAL</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;