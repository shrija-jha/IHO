import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discovery Phase",
    desc: "We dive deep into your business ecosystem to identify goals, target audience, and market gaps.",
    icon: <Search />, // Removed hardcoded classes here to handle them in the component
    number: "01",
  },
  {
    id: 2,
    title: "Strategic Blueprint",
    desc: "Crafting a data-driven roadmap and digital strategy to ensure high-impact ROI.",
    icon: <Lightbulb />,
    number: "02",
  },
  {
    id: 3,
    title: "High-End Dev",
    desc: "Executing the vision with cutting-edge stacks (MERN, Next.js) for speed and scalability.",
    icon: <Code />,
    number: "03",
  },
  {
    id: 4,
    title: "Launch & Scale",
    desc: "Deploying with precision and monitoring real-time metrics for continuous growth.",
    icon: <Rocket />,
    number: "04",
  },
];

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden perspective-1000">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_center,var(--tw-linear-stops))] from-blue-900/10 via-black to-black opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            How We <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-white">Execute</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-blue-200/50 text-xl max-w-2xl mx-auto"
          >
            A seamless journey from abstract concept to digital reality.
          </motion.p>
        </div>

        {/* --- The Timeline Spine --- */}
        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 rounded-full" />
          
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-5 md:left-1/2 top-0 w-0.5 bg-linear-to-b from-blue-500 via-cyan-400 to-blue-600 -translate-x-1/2 rounded-full shadow-[0_0_20px_#3b82f6] z-10"
          />

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <Timeline3DCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Animation Variants ---
const cardVariants = {
  hidden: (isEven) => ({
    opacity: 0,
    x: isEven ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: (isEven) => ({
    opacity: 0,
    x: isEven ? -20 : 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Timeline3DCard = ({ step, index }) => {
  const isEven = index % 2 === 0;

  // --- 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative flex items-center ${isEven ? "md:justify-start" : "md:justify-end"} md:pl-0 pl-16`}>
      
      {/* Center Connector Dot */}
      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-blue-500 rounded-full z-20 shadow-[0_0_15px_#3b82f6]">
        <div className="w-full h-full bg-blue-400 rounded-full animate-ping opacity-50" />
      </div>

      {/* Horizontal Connector Line (Desktop Only) */}
      <div className={`hidden md:block absolute top-1/2 h-px bg-linear-to-r from-blue-500/50 to-transparent w-25 -z-10
         ${isEven ? "left-1/2" : "right-1/2 scale-x-[-1]"}`} 
      />

      {/* --- Main 3D Container --- */}
      <motion.div
        custom={isEven}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`relative w-full md:w-[45%] perspective-1000 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-xl cursor-pointer"
        >
          {/* Floating Depth Elements */}
          <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
            
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-4 mb-4">
              
              {/* --- 1. The Icon Box with Hover Effects --- */}
              <motion.div 
                 variants={textVariants} 
                 custom={isEven}
                 className="relative p-3 bg-blue-950/30 rounded-xl border border-blue-500/20 
                            group-hover:bg-blue-600 group-hover:border-blue-400 
                            group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] 
                            group-hover:scale-110
                            transition-all duration-500 ease-out"
              >
                {/* Clone icon to add specific classNames for rotation and color */}
                {React.cloneElement(step.icon, { 
                    className: "w-6 h-6 text-blue-400 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 ease-in-out" 
                })}
              </motion.div>
              
              <motion.h3 
                variants={textVariants}
                custom={isEven}
                className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors"
              >
                {step.title}
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p 
              variants={textVariants}
              custom={isEven}
              className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-200 transition-colors"
            >
              {step.desc}
            </motion.p>
          </div>

          {/* Background Giant Number */}
          <motion.div 
             variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 1 } }
             }}
             style={{ transform: "translateZ(10px)" }}
             className="absolute -bottom-4 -right-4 text-9xl font-black text-white/5 z-0 select-none group-hover:text-blue-500/10 transition-colors duration-500"
          >
            {step.number}
          </motion.div>
          
          {/* Glossy Reflection Effect */}
          <div 
            className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" 
            style={{ transform: "translateZ(1px)" }} 
          />
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProcessTimeline;