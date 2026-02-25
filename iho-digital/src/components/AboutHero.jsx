import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Target, Briefcase, Zap } from 'lucide-react';

// --- 3D TILT CONTAINER ---
const HeroTilt = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

const AboutHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Floating Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: TEXT CONTENT --- */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Who We Are
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              We Architect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Digital Realities.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-lg leading-relaxed font-light"
            >
              IHO Digital is more than an agency. We are a collective of visionaries, engineers, and strategists dedicated to transforming brands through high-performance technology and data-driven storytelling.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* BUTTON 1: Scrolls to "Our Story" */}
              <button 
                onClick={() => scrollToSection('our-story')}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Explore Our Story <ArrowRight size={18} />
              </button>
              
              {/* BUTTON 2: Scrolls to "Vision" */}
              <button 
                onClick={() => scrollToSection('vision')}
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
              >
                View Our Vision
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: 3D VISUAL COMPOSITION --- */}
          <div className="relative perspective-1000">
            <HeroTilt>
              <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900/90 to-black/90 border border-white/10 shadow-2xl backdrop-blur-xl">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

                {/* Content Inside Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                  
                  {/* Stat Card 1: Success Rate */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                      <Target size={24} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-1">99%</h3>
                    <p className="text-sm text-slate-400">Success Rate</p>
                  </motion.div>

                  {/* Stat Card 2: Partner Brands */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-1">20+</h3>
                    <p className="text-sm text-slate-400">Partner Brands</p>
                  </motion.div>

                  {/* Stat Card 3: Execution Speed */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Fast Execution</span>
                      </div>
                      <p className="text-xs text-slate-400">We ship products 2x faster than market average.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </motion.div>

                </div>

              </div>
            </HeroTilt>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;