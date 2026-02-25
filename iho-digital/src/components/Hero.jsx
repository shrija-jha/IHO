import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const navigate = useNavigate();

  // --- FUNCTION TO TRIGGER NAVBAR MODAL ---
  const openNavbarForm = () => {
    // This dispatches the event that Navbar.jsx is listening for
    const event = new Event('open-contact-modal');
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden font-sans w-full">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ x: [0, 400, -200, 0], y: [0, 300, -100, 0], scale: [1, 1.4, 0.8, 1], rotate: [0, 180, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-64 h-64 sm:w-125 sm:h-125 bg-cyan-500 rounded-full mix-blend-screen filter blur-[40px] sm:blur-[60px] opacity-40 sm:opacity-60" />
          <motion.div animate={{ x: [0, -400, 200, 0], y: [0, 400, -200, 0], scale: [1, 0.8, 1.2, 1], rotate: [0, -180, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[10%] right-[-10%] w-72 h-72 sm:w-150 sm:h-150 bg-purple-600 rounded-full mix-blend-screen filter blur-[50px] sm:blur-[70px] opacity-40 sm:opacity-60" />
          <motion.div animate={{ x: [0, 300, -300, 0], y: [0, -400, 200, 0], scale: [1, 1.5, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[-20%] left-[20%] w-80 h-80 sm:w-175 sm:h-175 bg-blue-600 rounded-full mix-blend-screen filter blur-[50px] sm:blur-[70px] opacity-40 sm:opacity-60" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-2 sm:px-6 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            
            <div className="flex justify-center mb-6 sm:mb-8">
              <span className="px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border border-cyan-500/50 bg-cyan-900/20 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.4)] whitespace-nowrap">
                Future Ready Agency
              </span>
            </div>

            {/* FLUID TEXT FIX */}
            <h1 className="text-[12vw] md:text-7xl lg:text-8xl font-black text-white leading-[1.1] sm:leading-tight md:leading-[0.9] tracking-tighter mb-4 sm:mb-6">
              WE DESIGN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
                TOMORROW
              </span>
            </h1>

            <p className="mt-4 sm:mt-8 text-sm sm:text-lg md:text-xl text-gray-300 max-w-[90%] md:max-w-2xl mx-auto font-light leading-relaxed px-2">
              IHO Digital transforms businesses with high-performance <span className="text-white font-medium">ERP systems</span>, real estate dashboards, and strategic <span className="text-white font-medium">digital marketing</span>.
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center w-full px-2 sm:px-0">
              
              {/* --- LINKED GET STARTED BUTTON --- */}
              {/* This now calls openNavbarForm which triggers the Navbar listener */}
              <motion.button 
                onClick={openNavbarForm} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-full sm:w-48 py-3.5 sm:py-4 bg-white text-black font-black rounded-full text-xs sm:text-sm tracking-widest uppercase hover:bg-gray-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                Get Started
              </motion.button>

              <motion.button 
                onClick={() => navigate('/portfolio')} 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
                whileTap={{ scale: 0.95 }} 
                className="w-full sm:w-48 py-3.5 sm:py-4 border border-white/30 bg-white/5 backdrop-blur-lg text-white font-bold rounded-full text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2"
              >
                View Work
              </motion.button>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;