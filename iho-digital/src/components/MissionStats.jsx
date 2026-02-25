import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Quote, Rocket, Target, Trophy, ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard"; // Using your existing 3D wrapper

// --- FIXED: High Performance Counter ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  // Trigger animation when element is 20% in view
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to value
      const controls = animate(0, value, {
        duration: 2.5, // How long the count takes (seconds)
        ease: "easeOut",
        onUpdate: (latest) => {
          // Directly update DOM text content for performance
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MissionStats = () => {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      
      {/* Background Decor: Digital Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: Stats & Text --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-blue-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                // Performance Metrics
              </span>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Choosing Us Leads to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Measurable Success.
                </span>
              </h2>
              <p className="text-slate-400 text-lg border-l-2 border-slate-800 pl-6">
                Our approach is built on trust, creativity, and a focus on delivering outcomes for companies in IT, Finance, and Digital Marketing.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              
              {/* Stat 1: Experience */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-baseline gap-1 text-5xl font-bold text-white mb-2">
                    <span className="text-blue-500 text-2xl">+</span>
                    {/* Fixed Counter Usage */}
                    <Counter value={5} />
                  </div>
                  <h5 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Years Experience</h5>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Stat 2: Projects */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -inset-4 bg-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                   <div className="flex items-baseline gap-1 text-5xl font-bold text-white mb-2">
                    {/* Fixed Counter Usage */}
                    <Counter value={250} suffix="+" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Projects Completed</h5>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* --- RIGHT: 3D Mission Card --- */}
          <div className="relative">
            <TiltCard className="w-full">
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl">
                
                {/* Radar Scan Effect Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                    <Target size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Our Mission</h4>
                    <span className="text-xs text-blue-400 font-mono uppercase tracking-widest">Target: Excellence</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Quote className="w-8 h-8 text-slate-600 mb-4 opacity-50 rotate-180" />
                  <p className="text-lg text-slate-200 leading-relaxed font-light italic mb-8">
                    "We aim to become the ally that businesses count on to transform <span className="text-blue-400 font-semibold not-italic">challenges into chances</span> and create a route towards lasting prosperity."
                  </p>
                  
                  {/* Action Line */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Rocket className="w-4 h-4 text-purple-400" />
                      High-Productivity Solutions
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                  </div>
                </div>

                {/* Animated Scanner Line */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent w-full pointer-events-none"
                />
              </div>
            </TiltCard>

            {/* Decorative Floating Icon Behind */}
            <motion.div 
               animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="absolute -top-10 -right-10 z-0 opacity-20 text-blue-500"
            >
               <Trophy size={120} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionStats;