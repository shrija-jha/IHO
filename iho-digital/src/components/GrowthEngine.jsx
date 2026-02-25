import React from "react";
import { motion } from "framer-motion";
import { Search, Code2, Globe, Repeat, ArrowRight, Zap } from "lucide-react";
import TiltCard from "./TiltCard"; // Using your existing 3D wrapper

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  }
};

const GrowthEngine = () => {
  const steps = [
    { 
      id: "01", 
      title: "Deep Discovery", 
      text: "We dive into data to find hidden opportunities.", 
      icon: Search,
      color: "blue"
    },
    { 
      id: "02", 
      title: "Tech Alignment", 
      text: "Optimizing stack for SGE & Core Web Vitals.", 
      icon: Code2,
      color: "cyan"
    },
    { 
      id: "03", 
      title: "Omnichannel Blitz", 
      text: "Scaling across Meta, Google & Emerging Channels.", 
      icon: Globe,
      color: "indigo"
    },
    { 
      id: "04", 
      title: "Rapid Iteration", 
      text: "Continuous A/B testing to lower your CPA.", 
      icon: Repeat,
      color: "violet"
    },
  ];

  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      
      {/* --- Background Mechanics --- */}
      {/* A dark, technical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none" />
      
      {/* The Central "Energy Beam" connecting the cards (Visible on Desktop) */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 hidden md:block -translate-y-1/2">
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 blur-[4px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 mb-6">
            <Zap className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Process Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Growth Engine</span>
          </h2>
        </motion.div>

        {/* --- The Staggered Pipeline Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, i) => {
            // Logic for staggering: Evens go down, Odds stay up (on desktop)
            const isEven = i % 2 === 0;
            const staggerClass = isEven ? "md:-translate-y-12" : "md:translate-y-12";
            
            // Dynamic Color Maps
            const colorMap = {
              blue: "from-blue-600 to-blue-400 border-blue-500/30 text-blue-400 shadow-blue-500/20",
              cyan: "from-cyan-600 to-cyan-400 border-cyan-500/30 text-cyan-400 shadow-cyan-500/20",
              indigo: "from-indigo-600 to-indigo-400 border-indigo-500/30 text-indigo-400 shadow-indigo-500/20",
              violet: "from-violet-600 to-violet-400 border-violet-500/30 text-violet-400 shadow-violet-500/20",
            };

            const styles = colorMap[step.color];

            return (
              <motion.div 
                key={i} 
                variants={cardVariants}
                className={`relative ${staggerClass}`}
              >
                {/* Vertical Connector Line to the Central Beam */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-slate-800 hidden md:block -z-10
                  ${isEven ? 'h-12 top-full' : 'h-12 bottom-full'}
                `}>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ delay: 0.5 + (i * 0.2), duration: 0.5 }}
                    className={`w-full bg-${step.color}-500 shadow-[0_0_10px_currentColor]`}
                  />
                </div>

                <TiltCard className="h-full">
                  <div className={`group relative h-full bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-slate-800 hover:border-${step.color}-500/50 hover:shadow-2xl hover:${styles.split(' ').pop()}`}>
                    
                    {/* ID Background Watermark */}
                    <span className="absolute -right-4 -bottom-8 text-9xl font-black text-white/5 select-none font-mono group-hover:text-white/10 transition-colors">
                      {step.id}
                    </span>

                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${styles.split(' ').slice(0, 2).join(' ')} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    {/* Header */}
                    <div className="relative z-10 flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl bg-slate-950 border ${styles.split(' ')[2]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className={`w-6 h-6 ${styles.split(' ')[3]}`} />
                      </div>
                      
                      {/* Connection Indicator */}
                      <div className="flex gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-${step.color}-400 group-hover:animate-ping`} />
                        <span className={`w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-${step.color}-500 delay-75`} />
                        <span className={`w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-${step.color}-600 delay-150`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                      <span className="mr-2">INITIATE PHASE</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default GrowthEngine;