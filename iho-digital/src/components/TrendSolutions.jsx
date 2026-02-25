import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { PieChart, Target, Rocket, Search, Layers, Zap, Smartphone, Cpu, ChevronsRight } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  }
};

const textRevealVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// --- 3D INTERACTION VARIANTS ---
const iconFlipVariants = {
  rest: { rotateY: 0 },
  hover: { 
    rotateY: 180,
    transition: { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }
  }
};

const contentLiftVariants = {
  rest: { z: 0, translateY: 0 },
  hover: { 
    z: 30, 
    translateY: -5,
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

const TrendSolutions = () => {
  const statsCards = [
    {
      value: "100%",
      label: "DATA-DRIVEN GROWTH",
      desc: "Precision targeting using advanced AI analytics.",
      icon: PieChart,
      // Cyan Theme
      theme: "cyan", 
      border: "hover:border-cyan-500/50",
      shadow: "hover:shadow-cyan-500/20",
      iconBox: "border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-400",
      textGradient: "from-cyan-400 to-blue-500"
    },
    {
      value: "Custom",
      label: "ROI FRAMEWORKS",
      desc: "Tailored strategies specifically designed for your niche.",
      icon: Target,
      // Purple Theme
      theme: "fuchsia",
      border: "hover:border-fuchsia-500/50",
      shadow: "hover:shadow-fuchsia-500/20",
      iconBox: "border-fuchsia-500/30 text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:border-fuchsia-400",
      textGradient: "from-fuchsia-400 to-purple-500"
    },
    {
      value: "24/7",
      label: "PERFORMANCE TRACKING",
      desc: "Real-time monitoring and instant scaling.",
      icon: Rocket,
      // Orange Theme
      theme: "amber",
      border: "hover:border-amber-500/50",
      shadow: "hover:shadow-amber-500/20",
      iconBox: "border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-400",
      textGradient: "from-amber-400 to-orange-500"
    }
  ];

  const trendList = [
    { title: "SGE Ready SEO", sub: "Gen-AI Optimization", icon: Search },
    { title: "Full-Funnel PPC", sub: "Buyer Journey Targeting", icon: Layers },
    { title: "Hyper-Speed Apps", sub: "2026 Core Web Vitals", icon: Zap },
    { title: "Social Commerce", sub: "In-App Brand Scaling", icon: Smartphone }
  ];

  // --- TRIGGER THE NAVBAR FORM ---
  const handleOpenForm = () => {
    // 1. Dispatch global event
    window.dispatchEvent(new Event('open-contact-modal'));

    // 2. Fallback: Click hidden Navbar button
    const btn = document.getElementById('open-contact-form-btn');
    if (btn) btn.click();
  };

  return (
    <section className="relative py-32 bg-transparent z-10 overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- PART 1: REFERENCE-MATCHED 3D CARDS --- */}
        <div className="mb-32">
          
          {/* Header Badge */}
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex justify-center mb-16"
          >
             <div className="px-6 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="text-slate-400 font-mono text-xs uppercase tracking-[0.4em] flex items-center gap-3">
                   <Cpu className="w-4 h-4 animate-spin-slow text-blue-500" /> System Metrics
                </span>
             </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10 items-stretch"
          >
            {statsCards.map((card, i) => (
              <motion.div key={i} variants={cardEntranceVariants} className="h-full">
                <TiltCard className="h-full" options={{ max: 12, scale: 1.02, speed: 1000 }}>
                  
                  <motion.div 
                    className={`group relative h-full flex flex-col bg-[#0B0F19] border border-slate-800 rounded-[2rem] p-10 overflow-hidden transition-all duration-500 ${card.border} hover:shadow-2xl ${card.shadow}`}
                    initial="rest"
                    whileHover="hover"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    
                    {/* 1. LIGHTBOX GLOW */}
                    <div className={`absolute -top-20 inset-x-0 h-64 bg-gradient-to-b from-${card.theme}-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                    {/* 2. ICON BOX */}
                    <div className="relative z-10 mb-10" style={{ transform: "translateZ(30px)" }}>
                      <motion.div
                        variants={iconFlipVariants}
                        className={`w-16 h-16 rounded-2xl border bg-slate-900/50 flex items-center justify-center transition-colors duration-500 ${card.iconBox}`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
                            <card.icon className="w-8 h-8" strokeWidth={2} />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                            <card.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                          </div>
                      </motion.div>
                    </div>

                    {/* 3. CONTENT */}
                    <motion.div 
                      className="relative z-10 flex-grow flex flex-col justify-start" 
                      variants={contentLiftVariants}
                    >
                      <h3 className={`text-6xl font-black mb-4 bg-gradient-to-r ${card.textGradient} bg-clip-text text-transparent tracking-tighter`}>
                        {card.value}
                      </h3>
                      
                      <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
                        {card.label}
                      </h4>
                      
                      <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors min-h-[3.5rem]">
                        {card.desc}
                      </p>
                    </motion.div>

                    {/* 4. DECORATIVE CORNER ACCENT */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-${card.theme}-500/5 blur-2xl rounded-full group-hover:bg-${card.theme}-500/10 transition-colors duration-500`} />

                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* --- PART 2: TREND-READY LIST --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:pl-16" 
          >
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-600 via-purple-600 to-transparent opacity-50 hidden lg:block" />
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.9]">
              TREND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-white animate-pulse">
                READY.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-sm leading-relaxed border-l-2 border-slate-800 pl-6">
              We stay ahead of the curve so you don't have to. Our stack is built for the web of tomorrow.
            </p>

            {/* BUTTON LINKED TO FORM */}
            <button 
                onClick={handleOpenForm}
                className="group relative px-8 py-4 bg-transparent border border-white/10 overflow-hidden rounded-lg cursor-pointer"
            >
               <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
               <span className="relative z-10 flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                 Initialize_Upgrade <ChevronsRight className="w-4 h-4 animate-pulse" />
               </span>
            </button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            {trendList.map((item, i) => (
              <motion.div key={i} variants={textRevealVariants} className="group relative">
                <div className="relative overflow-hidden bg-[#0B0F19] border border-slate-800 p-1 transition-all duration-300 hover:border-blue-500/50 hover:pl-4 rounded-xl">
                  <div className="flex items-center gap-6 p-5 rounded-lg relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="relative p-3 bg-slate-900 border border-slate-700 text-slate-500 group-hover:text-white group-hover:border-blue-400 transition-all duration-500 group-hover:rotate-12 rounded-lg">
                          <item.icon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h5 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider group-hover:text-slate-400">
                          {item.sub}
                        </p>
                    </div>
                    <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-500">
                        <ChevronsRight className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrendSolutions;