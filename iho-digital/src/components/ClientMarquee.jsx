import React from 'react';
import { motion } from 'framer-motion';

// --- CLIENT DATA ---
const clients = [
  { name: "Ambusafe", img: "/img/ambusafe.png" },
  { name: "Sipani", img: "/img/sipani.png" },
  { name: "Binay", img: "/img/binay.png" },
  { name: "Naiyar", img: "/img/naiyar.jpg" },
  { name: "SoftwaresBazar", img: "/img/softwaresbazar.png" },
  { name: "PKS", img: "/img/pks-logo.png" },
  { name: "Al Uzaan", img: "/img/aluzaann.png" },
  { name: "Dome Moda", img: "/img/Domemoda.png" },
  { name: "GC Global", img: "/img/GCGlobal.png" },
  { name: "Fort", img: "/img/fort.webp" },
  { name: "Falconn", img: "/img/falconn.webp" },
];

const ClientMarquee = () => {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      
      {/* 1. Header Text */}
      <div className="text-center mb-12 relative z-10">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">
          Trusted By Industry Leaders
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>

      {/* 2. Marquee Track Container */}
      <div className="relative flex w-full overflow-hidden mask-gradient">
        
        {/* Gradient Masks for Fade In/Out Effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* 3. The Scrolling Track */}
        <motion.div
          className="flex items-center gap-8 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {[...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              className="relative w-40 h-24 md:w-52 md:h-32 group perspective-1000"
              whileHover={{ scale: 1.1, zIndex: 10, rotateZ: 2 }}
            >
              {/* Glass Card */}
              <div className="w-full h-full bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-xl flex items-center justify-center p-4 transition-all duration-300 group-hover:bg-slate-800/60 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                
                {/* Logo Image - UPDATED: Removed 'filter grayscale opacity-60' */}
                <img 
                  src={client.img} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain group-hover:opacity-100 transition-all duration-500"
                />
              </div>

              {/* Neon Glow on Hover */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientMarquee;