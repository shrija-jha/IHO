import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { Brain, TrendingUp, Share2, ShieldCheck, Image as ImageIcon, Cpu, Zap, Fingerprint, Scan, Grip } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 } 
  }
};

const InnovationLab = () => {
  const innovations = [
    { 
      id: "01",
      title: "Cognitive SEO", 
      desc: "Intent-based optimization.", 
      icon: Brain,
      color: "cyan",
      code: "A-99"
    },
    { 
      id: "02",
      title: "Predictive ROI", 
      desc: "ML forecast models.", 
      icon: TrendingUp,
      color: "emerald",
      code: "B-42"
    },
    { 
      id: "03",
      title: "Omni-Presence", 
      desc: "Syncing TikTok/Google/Meta.", 
      icon: Share2,
      color: "violet",
      code: "C-12"
    },
    { 
      id: "04",
      title: "Privacy Data", 
      desc: "Future-proof protocols.", 
      icon: ShieldCheck,
      color: "amber",
      code: "D-88"
    },
    { 
      id: "05",
      title: "Gen-AI Assets", 
      desc: "Synthetic video/image generation.", 
      icon: ImageIcon,
      color: "rose",
      code: "E-05"
    },
    { 
      id: "06",
      title: "Neural Analytics", 
      desc: "Tracking emotional heatmaps.", 
      icon: Cpu,
      color: "indigo",
      code: "F-33"
    },
  ];

  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden">
      
      {/* --- Background: Cyber Grid --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 relative"
          >
            {/* Spinning Ring */}
            <div className="absolute inset-0 rounded-full border border-blue-500/30 border-t-transparent animate-spin-slow" />
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
               <Fingerprint className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 text-center">
             Innovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Lab</span>
          </h2>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">
             <span>System Status: Online</span>
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span>V.2026</span>
          </div>
        </div>

        {/* --- The HUD Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {innovations.map((item, i) => (
            <motion.div key={i} variants={cardVariants} className="relative group">
              <TiltCard>
                
                {/* --- THE SHAPE: Chamfered HUD Plate --- */}
                {/* We use clip-path to cut the corners (Top-Left & Bottom-Right) */}
                <div 
                  className="relative h-64 bg-slate-900 overflow-hidden transition-all duration-300 group-hover:-translate-y-2"
                  style={{ 
                    clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" 
                  }}
                >
                  
                  {/* 1. Animated Border Gradient (Behind) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-blue-500 transition-all duration-700" />
                  
                  {/* 2. Inner Content Plate (Slightly smaller to show border) */}
                  <div 
                    className="absolute inset-[1px] bg-slate-950/90 backdrop-blur-sm flex flex-col p-6"
                    style={{ 
                      clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" 
                    }}
                  >
                    
                    {/* Background Grid Pattern inside card */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[size:30px_30px]" />

                    {/* Holographic Scanner Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />

                    {/* --- Content Layout --- */}
                    
                    {/* Top Row: Code & Scanner */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className={`font-mono text-[10px] text-${item.color}-400 border border-${item.color}-500/30 px-2 py-0.5 rounded bg-${item.color}-500/10`}>
                        ID: {item.code}
                      </span>
                      <Grip className="w-4 h-4 text-slate-700 group-hover:text-white/50 transition-colors" />
                    </div>

                    {/* Middle: Floating Icon */}
                    <div className="grow flex flex-col justify-center items-center relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
                      <div className={`p-4 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-2xl group-hover:border-${item.color}-500/50 group-hover:shadow-${item.color}-500/50 transition-all duration-500`}>
                        <item.icon className={`w-8 h-8 text-slate-400 group-hover:text-${item.color}-400 transition-colors`} />
                      </div>
                      <div className={`mt-4 h-1 w-12 bg-slate-800 rounded-full blur-sm group-hover:bg-${item.color}-500/50 group-hover:blur-md transition-all duration-500`} />
                    </div>

                    {/* Bottom: Text Info */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:tracking-wider transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono group-hover:text-slate-400">
                        {item.desc}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Decorative "Connectors" outside the clip-path */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-800 rounded-tr-xl group-hover:border-blue-500 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-800 rounded-bl-xl group-hover:border-purple-500 transition-colors duration-500" />

              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationLab;