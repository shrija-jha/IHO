import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ContactCard = ({ icon: Icon, title, value, color, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      className="perspective-1000 h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className={`group relative p-6 h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-${color}-500/50 transition-colors duration-500`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative z-10 flex items-start gap-4" style={{ transform: "translateZ(20px)" }}>
          <div className={`p-3 rounded-xl bg-slate-800/50 border border-white/5 text-${color}-400 group-hover:bg-${color}-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-${color}-500/20`}>
            <Icon size={24} />
          </div>
          <div>
            <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-white font-medium text-lg leading-relaxed">{value}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;