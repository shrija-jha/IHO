import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, Sparkles, Globe, Cpu, Scan } from "lucide-react";
import TiltCard from "./TiltCard"; // Using your existing 3D wrapper

// --- 1. UNIQUE LIVE BACKGROUND: "Warp Speed Tunnel" ---
// This only activates when the modal is OPEN
const WarpBackground = () => {
  const stars = Array.from({ length: 50 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
      {/* Center Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full" />
      
      {/* Moving Stars */}
      {stars.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: (Math.random() - 0.5) * window.innerWidth * 1.5,
            y: (Math.random() - 0.5) * window.innerHeight * 1.5,
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 2 + 1]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
        />
      ))}
    </div>
  );
};

// --- 2. DECODING TEXT ANIMATION ---
const DecodedText = ({ text, trigger }) => {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; // Speed of decode
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span>{display}</span>;
};

// --- 3. MAIN COMPONENT ---
const Vision2026 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-20 z-20">
      <div className="container mx-auto px-6">
        
        {/* --- THE TRIGGER: "Vision Core" --- */}
        <TiltCard>
          <div 
            onClick={() => setIsOpen(true)}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/30 p-12 text-center cursor-pointer transition-all duration-500 hover:border-blue-400 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
          >
            {/* Background Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-60 animate-pulse" />
                <Eye className="w-16 h-16 text-blue-300 group-hover:text-white transition-colors duration-300 relative z-10" />
              </div>
              
              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  OUR 2026 VISION
                </h3>
                <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em] group-hover:text-blue-200">
                  [ Click to Initialize ]
                </p>
              </div>
            </div>

            {/* Scanning Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-full group-hover:animate-shine opacity-50" />
          </div>
        </TiltCard>
      </div>

      {/* --- THE "MODAL" OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop with Blur & Live Warp Background */}
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            >
               <WarpBackground />
            </motion.div>

            {/* Modal Content Card */}
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-slate-900/80 border border-blue-500/40 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.4)] backdrop-blur-2xl"
            >
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <Scan className="w-5 h-5 text-blue-400 animate-spin-slow" />
                  <span className="text-xs font-mono text-blue-300 uppercase tracking-widest">
                    Secure Transmission // V.2026
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-12 md:p-20 text-center relative">
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 text-white/5"><Globe size={120} /></div>
                <div className="absolute bottom-10 right-10 text-white/5"><Cpu size={120} /></div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">
                      GLOBAL CATALYST
                    </span>
                  </h2>
                  
                  <div className="text-xl md:text-3xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
                    <span className="text-blue-500 font-serif text-5xl">"</span>
                    To be the global catalyst for <span className="text-white font-semibold">digital transformation</span>, setting the standard for innovation and ethical, <span className="text-white font-semibold">results-based marketing</span>.
                    <span className="text-blue-500 font-serif text-5xl">"</span>
                  </div>

                  {/* Decoding Subtext */}
                  <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/20 border border-blue-500/20">
                     <Sparkles className="w-4 h-4 text-yellow-400" />
                     <span className="text-sm font-mono text-blue-300">
                       STATUS: <DecodedText text="VISION LOCKED & ACTIVE" trigger={isOpen} />
                     </span>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar Loader (Fake Loading Effect) */}
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Vision2026;