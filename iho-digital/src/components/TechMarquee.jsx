import React from "react";
import { motion } from "framer-motion";

const techStack = [
  "React", "Node.js", "Tailwind CSS", "MongoDB", "AWS", "Figma", 
  "Google Ads", "SEO Pro", "Shopify", "Python", "Docker", "Next.js 14",
  "Three.js", "Framer Motion", "AI Integration"
];

const TechMarquee = () => {
  return (
    <section className="py-32 bg-black overflow-hidden relative">
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-linear-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-blue-600/20 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* --- 3D Animated Header --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20 text-center perspective-1000">
        
        {/* Main Title with 3D Flip Effect */}
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <FlipText3D text="Our Digital" />
            <FlipText3D text="Tech Stack" highlight={true} />
        </div>

        {/* Subtitle with Fade Up */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-blue-200/60 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Powered by the industry's most robust technologies.
        </motion.p>
      </div>

      {/* --- Marquee Section --- */}
      <div className="relative w-full z-10">
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-black to-transparent z-20" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-black to-transparent z-20" />

        <div className="flex mb-8 overflow-hidden">
          <MarqueeTrack direction="left" speed={40}>
            {techStack.map((tech, index) => (
              <TechBadge key={`r1-${index}`} name={tech} />
            ))}
          </MarqueeTrack>
        </div>

        <div className="flex overflow-hidden">
          <MarqueeTrack direction="right" speed={40}>
            {techStack.reverse().map((tech, index) => (
              <TechBadge key={`r2-${index}`} name={tech} />
            ))}
          </MarqueeTrack>
        </div>
      </div>
    </section>
  );
};

// --- Component: 3D Flip Text ---
const FlipText3D = ({ text, highlight = false }) => {
  // Split text into individual characters
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      rotateX: 90, // Starts lying flat (90deg)
      y: 10,       // UPDATED: Reduced from 50 to 10 to prevent clipping of descenders like 'g'
    },
    visible: {
      opacity: 1,
      rotateX: 0,  // Flips up to standing (0deg)
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      // UPDATED: Added pb-4 to allow space for descenders and prevent clipping
      style={{ overflow: "hidden", display: "flex", justifyContent: "center", paddingBottom: "1rem" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`text-5xl md:text-7xl font-extrabold tracking-tight ${
        highlight ? "text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "text-white"
      }`}
    >
      {letters.map((letter, index) => (
        <motion.span 
            key={index} 
            variants={child}
            style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Marquee Track ---
const MarqueeTrack = ({ children, direction, speed }) => {
  return (
    <motion.div
      className="flex gap-6 flex-nowrap pl-6"
      animate={{
        x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      }}
      transition={{
        ease: "linear",
        duration: speed,
        repeat: Infinity,
      }}
    >
      {children}
      {children} 
      {children}
    </motion.div>
  );
};

// --- Tech Badge ---
const TechBadge = ({ name }) => {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 2 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
      className="relative group cursor-pointer"
    >
      <div 
        className="px-8 py-4 bg-black border border-white/10 rounded-xl 
                   shadow-[0_0_10px_rgba(0,0,0,0.5)]
                   group-hover:border-blue-500 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] 
                   group-hover:bg-blue-950/20 group-hover:-translate-y-1
                   transition-all duration-300 ease-out relative z-10 overflow-hidden"
      >
        <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

export default TechMarquee;