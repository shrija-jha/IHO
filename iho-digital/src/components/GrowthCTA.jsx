import React from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";

// --- MAIN CTA SECTION ---
const GrowthCTA = () => {

  // --- TRIGGER THE NAVBAR FORM ---
  const handleOpenForm = () => {
    // 1. Dispatch global event
    window.dispatchEvent(new Event('open-contact-modal'));

    // 2. Fallback: Click hidden Navbar button
    const btn = document.getElementById('open-contact-form-btn');
    if (btn) btn.click();
  };

  return (
    <section className="relative py-32 z-10">
      <div className="container mx-auto px-6 text-center">
        
        <TiltCard>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 to-black border border-white/10 p-12 md:p-20 backdrop-blur-xl group">
            
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.15),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.25),transparent_70%)] transition-all duration-1000" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-widest mb-8"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                System Ready
              </motion.div>

              {/* Heading */}
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
              >
                Architect Your <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                  Digital Legacy
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12"
              >
                Stop competing. Start dominating. Initiate your custom growth protocol today and leave the competition in the loading screen.
              </motion.p>

              {/* The "Launch" Button - LINKED TO NAVBAR FORM */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenForm}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black text-lg font-bold uppercase tracking-wide rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10">Initialize Audit</span>
                <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                
                {/* Button Glint Effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
                </div>
              </motion.button>
            </div>

            {/* Decorative Corner Borders */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 rounded-br-3xl" />
          </div>
        </TiltCard>

      </div>
    </section>
  );
};

export default GrowthCTA;