import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { 
  Palette, 
  Code2, 
  Smartphone, 
  PenTool, 
  TrendingUp, 
  MapPin, 
  ArrowRight 
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for Tailwind classes ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Data from your image ---
const services = [
  {
    title: "Website Designing",
    description: "Obtain our professional web designing services to create an impressive business page and medium to interact with your customers and generate revenue.",
    icon: <Palette className="w-8 h-8" />,
    subServices: [
      "Static Website Designing",
      "Dynamic Website Designing",
      "Ecommerce Website Designing",
      "Business Website Design",
      "MLM Website Designing",
    ],
  },
  {
    title: "Website Development",
    description: "Build a robust online presence of your brand with our flawless website development services. We use truly advanced technologies and innovative strategies.",
    icon: <Code2 className="w-8 h-8" />,
    subServices: [
      "PHP Website Development",
      "Ecommerce Website Development",
      "Custom Website Development",
      "Payment Gateway Integration",
      "News Portal Development",
    ],
  },
  {
    title: "Mobile App Development",
    description: "Facilitate an easy and quick customer shopping experience with a one tap source. Reach out to us for top notch mobile app development services.",
    icon: <Smartphone className="w-8 h-8" />,
    subServices: [
      "Mobile App Development",
      "Android App development",
      "iOS App Development",
      "Native App development",
      "Hybrid App development",
    ],
  },
  {
    title: "Graphic Designing",
    description: "Grasp the attention of your target audience towards your business by sharing outstanding graphics and content on diverse social media platforms.",
    icon: <PenTool className="w-8 h-8" />,
    subServices: [
      "Graphic Designing",
      "Logo Designing",
      "Social Media Post Design",
      "Business Explainer Video",
    ],
  },
  {
    title: "Digital Marketing",
    description: "Enable your customers to know about your unique business or brand with the Best Digital Marketing Agency in India, including promotion via campaigns.",
    icon: <TrendingUp className="w-8 h-8" />,
    subServices: [
      "Search Engine Optimization",
      "Google Business Listing SEO",
      "E-Commerce SEO",
      "Google Ads",
    ],
  },
  {
    title: "Google Promotion",
    description: "Validate the authenticity of your business by listing it on Google to facilitate easy interaction & connection with your target audience.",
    icon: <MapPin className="w-8 h-8" />,
    subServices: [
      "Google Business Page",
      "Google Map Listing",
      "Google Listing Promotion",
      "Google Listing Ads",
    ],
  },
];

// --- 1. Background Fireflies Effect ---
const FirefliesBackground = () => {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500 blur-[1px] opacity-20"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -50, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
    </div>
  );
};

// --- 2. 3D Tilt Card Component ---
const TiltCard = ({ service, index }) => {
  const ref = useRef(null);

  // Mouse position logic for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 20); // Max rotation X
    y.set(yPct * -20); // Max rotation Y
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative w-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full w-full rounded-2xl bg-slate-900/40 border border-slate-800/60 p-6 backdrop-blur-sm transition-colors hover:border-blue-500/50 hover:bg-slate-900/60 shadow-xl"
      >
        {/* Floating Depth Elements (The "3D" pop) */}
        <div 
          style={{ transform: "translateZ(50px)" }} 
          className="absolute inset-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_80px_-20px_#3b82f6] pointer-events-none" 
        />

        {/* Card Content */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col items-center text-center">
          
          {/* Icon Container with Glow */}
          <div className="mb-4 relative">
            <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full" />
            <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-black border border-slate-700 text-blue-400 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
              {service.icon}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-blue-300 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            {service.description}
          </p>

          <div className="w-full bg-slate-800/50 h-[1px] mb-4" />

          {/* Sub Services List */}
          <ul className="text-left w-full space-y-2">
            {service.subServices.map((sub, i) => (
              <li key={i} className="flex items-start text-xs sm:text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 text-blue-500 shrink-0 mt-0.5" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. Main Exported Component ---
const ServicesSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* Live Background */}
      <FirefliesBackground />
      
      {/* Decorative Glow Spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 drop-shadow-sm"
          >
            Our Top-Of-The-Line Services
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;