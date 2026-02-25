import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, TrendingUp, Zap, Globe, MousePointerClick } from "lucide-react";
import TiltCard from "./TiltCard"; 

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// --- 3D Interactive Stack Component ---
const InteractiveTimelineStack = () => {
  // Default to 2 (Vision) being at the front
  const [activeCard, setActiveCard] = useState(2);

  const cards = [
    {
      id: 0,
      title: "Origin",
      subtitle: "Delhi NCR",
      icon: MapPin,
      // Updated to Premium Effects
      color: "text-cyan-300",
      bg: "bg-gradient-to-br from-cyan-950/90 to-slate-900/90",
      border: "border-cyan-500/40",
      shadow: "shadow-[0_0_40px_rgba(34,211,238,0.2)]",
      status: "ESTABLISHED" // Custom tag for this card
    },
    {
      id: 1,
      title: "Evolution",
      subtitle: "Digital Powerhouse",
      icon: TrendingUp,
      // Updated to Premium Effects
      color: "text-indigo-300",
      bg: "bg-gradient-to-br from-indigo-950/90 to-slate-900/90",
      border: "border-indigo-500/40",
      shadow: "shadow-[0_0_40px_rgba(99,102,241,0.2)]",
      status: "GROWTH PHASE"
    },
    {
      id: 2,
      title: "Current Vision",
      subtitle: "Global Impact",
      icon: Globe,
      // Existing Premium Effects
      color: "text-blue-300",
      bg: "bg-gradient-to-br from-blue-950/90 to-slate-900/90",
      border: "border-blue-500/40",
      shadow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
      status: "LIVE: SCALING",
      isPulse: true // Only this one pulses
    }
  ];

  // Helper to determine visual position based on active state
  const getPosition = (index) => {
    if (index === activeCard) return "front";
    const diff = (index - activeCard + 3) % 3;
    return diff === 2 ? "middle" : "back";
  };

  const variants = {
    front: { 
      zIndex: 30, 
      y: 0, 
      scale: 1, 
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)"
    },
    middle: { 
      zIndex: 20, 
      y: -45, 
      scale: 0.9, 
      opacity: 0.8,
      rotateX: -10, 
      filter: "blur(1px)"
    },
    back: { 
      zIndex: 10, 
      y: -90, 
      scale: 0.8, 
      opacity: 0.5,
      rotateX: -20, 
      filter: "blur(2px)"
    }
  };

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center perspective-1000">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full animate-pulse" />

      {/* Render Cards */}
      {cards.map((card) => {
        const position = getPosition(card.id);
        const isFront = position === "front";

        return (
          <motion.div
            key={card.id}
            layout 
            initial={false}
            animate={position}
            variants={variants}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setActiveCard(card.id)}
            className={`absolute w-72 h-48 cursor-pointer transform-style-3d ${!isFront ? 'hover:brightness-125' : ''}`}
            style={{ transformOrigin: "bottom center" }}
          >
            <div className={`w-full h-full ${card.bg} border ${card.border} rounded-2xl p-6 flex flex-col items-center justify-center ${card.shadow} backdrop-blur-xl transition-colors`}>
              
              {/* Top Highlight for Front Card */}
              {isFront && (
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-100" />
              )}
              
              {/* Click Hint (Only visible on back cards on hover) */}
              {!isFront && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 rounded-2xl transition-opacity z-50">
                    <MousePointerClick className="text-white w-8 h-8" />
                </div>
              )}

              <card.icon className={`${card.color} mb-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} size={40} />
              
              <h4 className={`${card.color} opacity-80 font-bold uppercase tracking-widest text-xs mb-1`}>
                {card.title}
              </h4>
              
              <span className={`text-white font-bold ${isFront ? 'text-2xl' : 'text-lg'} tracking-tight shadow-black drop-shadow-md`}>
                {card.subtitle}
              </span>

              {/* Status Tag (Visible on Front) */}
              {isFront && (
                <div className="mt-3 flex gap-2 items-center bg-black/20 px-3 py-1 rounded-full border border-white/5">
                   <span className={`w-1.5 h-1.5 rounded-full ${card.isPulse ? 'bg-green-400 animate-ping' : 'bg-slate-400'}`} />
                   <span className="text-[10px] text-white/70 font-mono tracking-wider">{card.status}</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const OurStory = () => {
  const points = [
    { title: "Client-Centric", desc: "Your goals are our blueprint.", icon: Zap },
    { title: "Transparency", desc: "No hidden costs, just results.", icon: CheckCircle2 },
    { title: "Innovation", desc: "Always ahead of the curve.", icon: TrendingUp },
    { title: "Global Quality", desc: "World-class standards.", icon: Globe },
  ];

  return (
    <section className="relative py-24 bg-slate-950/50 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: Interactive 3D Stack --- */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <TiltCard>
              <InteractiveTimelineStack />
            </TiltCard>
            <p className="text-center text-xs text-slate-500 mt-4 animate-pulse font-mono tracking-wide">
              [ CLICK STACK TO NAVIGATE TIMELINE ]
            </p>
          </motion.div>

          {/* --- RIGHT: Text Content --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div variants={textVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Our Journey
              </motion.div>
              
              <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                From Vision to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Digital Transformation
                </span>
              </motion.h2>
              
              <motion.p variants={textVariants} className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-800 pl-6">
                Founded with a passion for innovation, <span className="text-white font-semibold">IHO Digital</span> started as a small team of creators in Delhi NCR. Today, we have evolved into a full-scale digital powerhouse, bridging the gap between imagination and execution.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((item, i) => (
                <motion.div 
                  key={i}
                  variants={textVariants}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all group cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;