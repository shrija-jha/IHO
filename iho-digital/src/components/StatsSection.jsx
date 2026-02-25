import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Users, Flag, CloudLightning, Award } from "lucide-react";

// --- Configuration ---
const stats = [
  {
    id: 1,
    label: "Active clients",
    value: 200,
    suffix: "+",
    // Changed icon color to Blue
    icon: <Users className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 2,
    label: "Projects Done",
    value: 250,
    suffix: "+",
    icon: <Flag className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 3,
    label: "Success Rate",
    value: 99,
    suffix: "%",
    icon: <CloudLightning className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 4,
    label: "Awards",
    value: 4,
    suffix: "+",
    icon: <Award className="w-8 h-8 text-blue-500" />,
  },
];

const StatsSection = () => {
  return (
    <section className="relative w-full py-24 bg-transparent text-white perspective-1000">
      
      {/* Background Floating Particles (Blue) */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sub-Component: 3D Tilt Card ---
const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center justify-center cursor-pointer"
    >
      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5, 
        }}
        className="relative flex flex-col items-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* Glass Box Background behind Icon */}
        <div 
          className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl mb-6 group-hover:border-blue-500/50 group-hover:bg-white/10 transition-all duration-300 relative"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Glowing dot effect - Blue */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2 group-hover:text-blue-400 transition-colors">
            {stat.label}
          </h3>
          
          {/* Animated Counter - Changed to Blue-500 */}
          <div className="text-4xl lg:text-5xl font-extrabold text-blue-500 drop-shadow-lg flex justify-center items-center gap-1">
            <Counter value={stat.value} />
            <span>{stat.suffix}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sub-Component: Number Counter ---
const Counter = ({ value }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const displayValue = useTransform(springValue, (current) => Math.round(current));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- Sub-Component: Background Floating Particles ---
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          // Changed to Blue particles
          className="absolute bg-blue-600/10 rounded-full blur-xl"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 200 + 50 + "px",
            height: Math.random() * 200 + 50 + "px",
          }}
        />
      ))}
    </div>
  );
};

export default StatsSection;