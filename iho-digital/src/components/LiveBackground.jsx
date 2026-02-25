import React from 'react';
import { motion } from 'framer-motion';

const LiveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      
      {/* 1. Deep Atmospheric Blobs (The Base) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.3, 0.5, 0.3], 
          x: [0, 30, 0], 
          y: [0, 20, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2], 
          x: [0, -30, 0], 
          y: [0, -20, 0] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen" 
      />

      {/* 2. Neural Dust (Tiny, drifting particles) */}
      {[...Array(40)].map((_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const duration = Math.random() * 20 + 20; // Very slow drift

        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white/20"
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`, 
              opacity: 0,
            }}
            animate={{ 
              y: [`${randomY}vh`, `${randomY - 10}vh`, `${randomY}vh`], 
              x: [`${randomX}vw`, `${randomX + 5}vw`, `${randomX}vw`], 
              opacity: [0, 0.4, 0], // Subtle opacity
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              width: '1px', // Tiny dust size
              height: '1px',
            }}
          />
        );
      })}

      {/* 3. Little Fireflies (Small, glowing, slightly faster) */}
      {[...Array(15)].map((_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const size = Math.random() * 2 + 1; // 1px to 3px
        const duration = Math.random() * 10 + 5; 

        return (
          <motion.div
            key={`firefly-${i}`}
            className="absolute rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(165,243,252,0.6)]" // Soft cyan glow
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`, 
              opacity: 0,
            }}
            animate={{ 
              y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`], 
              x: [`${randomX}vw`, `${randomX + (Math.random() * 10 - 5)}vw`, `${randomX}vw`], 
              opacity: [0, 0.8, 0], 
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        );
      })}

      {/* 4. Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
    </div>
  );
};

export default LiveBackground;