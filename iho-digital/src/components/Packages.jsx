import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown } from "lucide-react";

// --- DATA CONFIGURATION ---
// Note: Explicitly mapped Tailwind classes to prevent production purging bugs
const packages = [
  {
    name: "Startup",
    price: "₹10,000",
    description: "Essential digital footprint.",
    icon: <Zap className="w-6 h-6" />,
    features: ["5 Page Website", "Mobile Responsive", "Basic SEO", "Fast Loading Speed"],
    linear: "from-cyan-400 to-blue-600",
    colorTheme: {
      shadow: "text-cyan-500",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "#06b6d4"
    },
    delay: 0,
  },
  {
    name: "Business",
    price: "₹20,000*",
    description: "Growth & automation engine.",
    icon: <Crown className="w-6 h-6" />,
    features: ["15 Pages + CMS", "Advanced Analytics", "3D Hero Section", "1 Month Support", "Chatbot Integration"],
    linear: "from-violet-400 to-fuchsia-600",
    colorTheme: {
      shadow: "text-violet-500",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      border: "#8b5cf6"
    },
    popular: true,
    delay: 0.2,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale digital ecosystem.",
    icon: <Shield className="w-6 h-6" />,
    features: ["Full ERP Solution", "Custom React Dashboard", "Database Architecture", "AI Integration", "24/7 Priority Support"],
    linear: "from-amber-400 to-orange-600",
    colorTheme: {
      shadow: "text-amber-500",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "#f59e0b"
    },
    delay: 0.4,
  },
];

// --- MAIN PACKAGES COMPONENT ---
const Packages = () => {

  // Function to Trigger Navbar Contact Form
  const handleOpenNavbarForm = () => {
    const event = new Event('open-contact-modal');
    window.dispatchEvent(event);
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden font-sans perspective-[2000px]">
      
      {/* 1. DEEP SPACE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[20%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter"
          >
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 animate-pulse">
              Power Core
            </span>
          </motion.h2>
        </div>

        {/* --- 3D PRICING GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {packages.map((pkg, index) => (
            <div key={index} className="relative group perspective-[1000px] h-full">
              
              {/* VOLUMETRIC LIGHT BEAM (Kept outside the moving wrapper) */}
              {pkg.popular && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "150%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-gradient-to-t from-violet-600/20 via-transparent to-transparent blur-2xl -z-10 pointer-events-none"
                />
              )}

              {/* LAYER 1: ENTRANCE ANIMATION */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: pkg.delay }}
                className="h-full"
              >
                {/* LAYER 2: CONTINUOUS FLOATING ANIMATION (Separated to prevent transform conflicts) */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full"
                >
                  {/* LAYER 3: 3D HOVER INTERACTION */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      rotateX: 5, 
                      rotateY: 5,
                      z: 50
                    }}
                    transition={{ duration: 0.3 }}
                    className={`relative h-full bg-[#0a0a0a] rounded-3xl p-[1px] overflow-hidden transition-shadow duration-500 ${pkg.popular ? 'shadow-[0_0_50px_rgba(139,92,246,0.3)]' : ''}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    
                    {/* LIQUID BORDER */}
                    <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${pkg.colorTheme.border} 360deg)`
                          }}
                    />
                    
                    {/* INNER CARD BODY */}
                    <div className="relative h-full bg-[#0f0f0f]/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col items-center text-center overflow-hidden z-10">
                      
                      {/* SCANNER EFFECT */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/50 blur-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />

                      {/* POPULAR BADGE */}
                      {pkg.popular && (
                        <div className="absolute top-0 right-0">
                            <div className="bg-violet-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow-[0_0_15px_#8b5cf6]">
                                Recommended
                            </div>
                        </div>
                      )}

                      {/* ICON & NAME */}
                      <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${pkg.linear} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {pkg.icon}
                      </div>

                      <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest mb-2">
                        {pkg.name}
                      </h3>
                      
                      {/* PRICE */}
                      <div className="relative mb-6">
                        <h2 className="text-5xl font-black text-white relative z-10">{pkg.price}</h2>
                        <h2 className={`text-5xl font-black ${pkg.colorTheme.shadow} absolute top-0 left-0 blur-sm opacity-50`}>{pkg.price}</h2>
                      </div>

                      <p className="text-gray-500 text-sm mb-8 font-medium">{pkg.description}</p>

                      {/* FEATURES */}
                      <div className="w-full space-y-4 mb-8 text-left flex-grow">
                        {pkg.features.map((feature, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors"
                          >
                            <div className={`p-1 rounded-full ${pkg.colorTheme.bg} ${pkg.colorTheme.text}`}>
                                <Check className="w-3 h-3" />
                            </div>
                            {feature}
                          </motion.div>
                        ))}
                      </div>

                      {/* ACTION BUTTON */}
                      <button 
                        onClick={handleOpenNavbarForm}
                        className="w-full mt-auto relative py-4 rounded-xl overflow-hidden group/btn cursor-pointer"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${pkg.linear} opacity-20 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${pkg.linear}`} />
                        
                        <span className="relative z-10 font-bold text-white tracking-widest uppercase text-sm group-hover:text-white transition-colors flex items-center justify-center gap-2">
                          Initialize
                          <Zap className="w-4 h-4 fill-white" />
                        </span>
                      </button>

                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes scan {
          0% { top: -20%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
      `}</style>
      
    </section>
  );
};

export default Packages;