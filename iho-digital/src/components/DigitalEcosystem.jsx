import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Share2, 
  ChevronRight,
  Activity,
  BarChart3,
  Code2,
  PenTool,
  Cpu,
  ScanLine
} from "lucide-react";

// --- 1. UTILITY: Hacker Text Scrambler ---
const TextScrambler = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

// --- 2. COMPONENT: Live Background "Cyber Nebula" ---
const LiveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950 -z-10 pointer-events-none">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 120, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -120, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-purple-600/10 rounded-full blur-[100px]" 
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
    </div>
  );
};

// --- 3. COMPONENT: The "Reactor" SEO Wheel ---
const SeoReactor = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  // Data for the 6 steps
  const steps = [
    { 
      id: 1, title: "Business Analysis", icon: Activity, desc: "Scanning market vectors to identify high-yield growth opportunities.", 
      color: "bg-amber-500", 
      styles: {
        border: "border-amber-500/30",
        shadow: "shadow-amber-500/30",
        text: "text-amber-400",
        btnBg: "bg-amber-500/10",
        btnBorder: "border-amber-500/50",
        btnHover: "hover:bg-amber-500",
        btnText: "text-amber-300"
      }
    },
    { 
      id: 2, title: "Keyword Research", icon: Search, desc: "Decoding user intent via high-value search term extraction.", 
      color: "bg-orange-500",
      styles: {
        border: "border-orange-500/30",
        shadow: "shadow-orange-500/30",
        text: "text-orange-400",
        btnBg: "bg-orange-500/10",
        btnBorder: "border-orange-500/50",
        btnHover: "hover:bg-orange-500",
        btnText: "text-orange-300"
      }
    },
    { 
      id: 3, title: "On-Page Setup", icon: Code2, desc: "Optimizing core architecture, meta-tags, and schema for crawler efficiency.", 
      color: "bg-rose-500",
      styles: {
        border: "border-rose-500/30",
        shadow: "shadow-rose-500/30",
        text: "text-rose-400",
        btnBg: "bg-rose-500/10",
        btnBorder: "border-rose-500/50",
        btnHover: "hover:bg-rose-500",
        btnText: "text-rose-300"
      }
    },
    { 
      id: 4, title: "Content Strategy", icon: PenTool, desc: "Deploying authority-building assets that convert visitors into leads.", 
      color: "bg-purple-500",
      styles: {
        border: "border-purple-500/30",
        shadow: "shadow-purple-500/30",
        text: "text-purple-400",
        btnBg: "bg-purple-500/10",
        btnBorder: "border-purple-500/50",
        btnHover: "hover:bg-purple-500",
        btnText: "text-purple-300"
      }
    },
    { 
      id: 5, title: "Link Building", icon: Share2, desc: "Establishing domain authority through high-quality backlink acquisition.", 
      color: "bg-blue-500",
      styles: {
        border: "border-blue-500/30",
        shadow: "shadow-blue-500/30",
        text: "text-blue-400",
        btnBg: "bg-blue-500/10",
        btnBorder: "border-blue-500/50",
        btnHover: "hover:bg-blue-500",
        btnText: "text-blue-300"
      }
    },
    { 
      id: 6, title: "Reporting", icon: BarChart3, desc: "Transparent data visualization of ROI and traffic acceleration.", 
      color: "bg-emerald-500",
      styles: {
        border: "border-emerald-500/30",
        shadow: "shadow-emerald-500/30",
        text: "text-emerald-400",
        btnBg: "bg-emerald-500/10",
        btnBorder: "border-emerald-500/50",
        btnHover: "hover:bg-emerald-500",
        btnText: "text-emerald-300"
      }
    },
  ];

  const activeData = steps.find(s => s.id === activeStep);

  // --- FORCE OPEN THE NAVBAR FORM ---
  const handleInitiateProtocol = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Method 1: Dispatch Event (Best Practice)
    window.dispatchEvent(new Event('open-contact-modal'));

    // Method 2: Click hidden ID (Fallback)
    const hiddenBtn = document.getElementById('open-contact-form-btn');
    if (hiddenBtn) hiddenBtn.click();

    // Method 3: Click the visible "GET QUOTE" or "GET STARTED" button in Navbar (Brute force fallback)
    if (!hiddenBtn) {
        const navButtons = Array.from(document.querySelectorAll('nav button, nav a'));
        const targetBtn = navButtons.find(b => 
            b.textContent.toUpperCase().includes('GET QUOTE') || 
            b.textContent.toUpperCase().includes('GET STARTED')
        );
        if (targetBtn) targetBtn.click();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 py-10 perspective-1000">
      
      {/* --- THE REACTOR WHEEL --- */}
      <div className="relative w-[20rem] h-[20rem] md:w-[26rem] md:h-[26rem] group">
        
        {/* Center Reactor Core */}
        <div className="absolute inset-0 m-auto w-40 h-40 z-20 flex flex-col items-center justify-center rounded-full bg-slate-950 border border-slate-800 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 rounded-full border border-blue-500/30 border-t-transparent animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border border-purple-500/30 border-b-transparent animate-reverse-spin" />
            
            <div className="relative z-10 flex flex-col items-center">
                <Cpu className="w-8 h-8 text-blue-400 mb-1 animate-pulse" />
                <h3 className="text-2xl font-black text-white tracking-tighter">CORE</h3>
                <span className="text-[10px] text-blue-400 font-mono tracking-widest">SYSTEM_ACTIVE</span>
            </div>
        </div>

        {/* Orbiting Segments */}
        <motion.div 
          className="w-full h-full rounded-full relative"
          animate={{ rotate: (activeStep - 1) * -60 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
        >
          {steps.map((step, index) => {
            const rotation = index * 60;
            const isActive = activeStep === step.id;
            
            return (
              <motion.div
                key={step.id}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ rotate: rotation }}
              >
                <motion.div
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.15 }}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 -mt-2 rounded-2xl pointer-events-auto
                    flex items-center justify-center cursor-pointer z-10 transition-all duration-500
                    ${step.color}
                    ${isActive 
                        ? `shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-110 opacity-100 ring-2 ring-white` 
                        : 'opacity-40 grayscale-[50%] hover:opacity-100 hover:grayscale-0 hover:scale-105'
                    }
                  `}
                  style={{ transformOrigin: "50% 180px" }}
                >
                  <span className={`text-2xl font-bold text-white drop-shadow-md`}>
                    0{step.id}
                  </span>
                </motion.div>
                
                {/* Connecting Line to Center */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: isActive ? 60 : 0 }}
                    className={`absolute top-20 left-1/2 w-[2px] -translate-x-1/2 bg-white/20`}
                />
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Background Glow Field */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      </div>

      {/* --- THE COLORED INFO CARD --- */}
      <div className="relative w-full max-w-lg perspective-1000 z-50">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative overflow-hidden bg-slate-900/90 backdrop-blur-xl border ${activeData.styles.border} p-8 md:p-10 rounded-3xl shadow-2xl`}
            >
              {/* Dynamic Glow Blob in Background */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 ${activeData.color} opacity-20 blur-[80px] rounded-full pointer-events-none`} />
              
              <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`p-4 rounded-xl ${activeData.color} shadow-lg ${activeData.styles.shadow} flex items-center justify-center`}>
                      <activeData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <div className={`text-xs font-mono ${activeData.styles.text} mb-1 tracking-widest`}>STEP 0{activeData.id}</div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            <TextScrambler text={activeData.title} />
                        </h2>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6" />
                  
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    {activeData.desc}
                  </p>

                  {/* Action Button - WIRED TO NAVBAR FORM */}
                  <button 
                    type="button"
                    onClick={handleInitiateProtocol}
                    className={`group flex items-center gap-3 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 cursor-pointer border relative z-50 pointer-events-auto
                      ${activeData.styles.btnBg} 
                      ${activeData.styles.btnBorder} 
                      ${activeData.styles.btnText}
                      ${activeData.styles.btnHover}
                      hover:text-white shadow-lg`}
                  >
                    <ScanLine className="w-4 h-4" />
                    <span>INITIATE_PROTOCOL</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
            </motion.div>
          </AnimatePresence>
      </div>
    </div>
  );
};

// --- 4. MAIN EXPORT: Digital Ecosystem ---
export default function DigitalEcosystem() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center text-slate-200 font-sans p-6 md:p-12 overflow-hidden bg-black">
      
      <LiveBackground />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* --- Section Title --- */}
        <div className="text-center mb-16 relative">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] mb-6">
                    <Activity className="w-3 h-3" /> SYSTEM ARCHITECTURE
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">
                    Strategic <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                        Expansion Engine
                    </span>
                </h2>
                
                <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                    A self-reinforcing growth loop designed to <span className="text-white font-medium">compound your digital authority</span> month over month.
                </p>
            </motion.div>
        </div>
        
        <SeoReactor />

      </div>
    </div>
  );
}