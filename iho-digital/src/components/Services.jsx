import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Code, Globe, BarChart3, Smartphone,
  Mail, MousePointer, Share2, MapPin, Award, 
  Layout, Search 
} from "lucide-react";

// --- CONFIGURATION ---
const services = [
  {
    title: "SEO Optimization",
    id: "seo",
    icon: <BarChart3 className="w-10 h-10 text-white" />,
    desc: "Boost your online presence with SEO strategies that improve search rankings and attract qualified visitors.",
    color: "#06b6d4", // Cyan
    gradient: "from-cyan-500 to-blue-600",
    link: "seo-optimization"
  },
  {
    title: "Web Design",
    id: "web-design",
    icon: <Layout className="w-10 h-10 text-white" />,
    desc: "Modern, responsive websites that enhance user experience, strengthen branding, and drive business growth.",
    color: "#a855f7", // Purple
    gradient: "from-purple-500 to-fuchsia-600",
    link: "web-design"
  },
  {
    title: "Social Media",
    id: "social-media",
    icon: <Share2 className="w-10 h-10 text-white" />,
    desc: "Grow brands, engage audiences, and increase sales through creative, data-driven social media strategies.",
    color: "#ec4899", // Pink
    gradient: "from-pink-500 to-rose-600",
    link: "social-media-marketing"
  },
  {
    title: "Email Marketing",
    id: "email",
    icon: <Mail className="w-10 h-10 text-white" />,
    desc: "Connect brands with customers through personalized messages that increase engagement and conversions.",
    color: "#f59e0b", // Amber
    gradient: "from-amber-500 to-orange-600",
    link: "email-marketing"
  },
  {
    title: "PPC Advertising",
    id: "ppc",
    icon: <MousePointer className="w-10 h-10 text-white" />,
    desc: "Boost sales with data-driven PPC campaigns optimized for performance, reach, and profitable growth.",
    color: "#ef4444", // Red
    gradient: "from-red-500 to-rose-600",
    link: "ppc-advertising"
  },
  {
    title: "App Development",
    id: "app-dev",
    icon: <Smartphone className="w-10 h-10 text-white" />,
    desc: "Powerful, user-friendly mobile apps that enhance experiences, improve performance, and grow businesses.",
    color: "#10b981", // Emerald
    gradient: "from-emerald-500 to-green-600",
    link: "app-development"
  },
  {
    title: "Affordable Marketing",
    id: "affordable",
    icon: <MapPin className="w-10 h-10 text-white" />,
    desc: "Premium digital marketing solutions tailored specifically for businesses across the Delhi NCR region.",
    color: "#3b82f6", // Blue
    gradient: "from-blue-500 to-indigo-600",
    link: "affordable-digital-marketing"
  },
  {
    title: "Best Agency Delhi",
    id: "best-agency",
    icon: <Award className="w-10 h-10 text-white" />,
    desc: "Recognized as the leading digital marketing partner for growth-focused brands in the capital.",
    color: "#eab308", // Yellow
    gradient: "from-yellow-400 to-amber-500",
    link: "best-digital-marketing-agency"
  },
  {
    title: "Local SEO",
    id: "local-seo",
    icon: <Search className="w-10 h-10 text-white" />,
    desc: "Dominate local search results. Find the best digital marketing agency near you in Delhi NCR.",
    color: "#8b5cf6", // Violet
    gradient: "from-violet-500 to-purple-600",
    link: "local-SEO-agency"
  },
  {
    title: "Custom Web Dev",
    id: "custom-web",
    icon: <Code className="w-10 h-10 text-white" />,
    desc: "Hire a top-rated website development company in Delhi NCR for your bespoke project needs.",
    color: "#6366f1", // Indigo
    gradient: "from-indigo-500 to-blue-600",
    link: "custom-web-development"
  },
  {
    title: "Design & Marketing",
    id: "design-marketing",
    icon: <Globe className="w-10 h-10 text-white" />,
    desc: "Integrated website design and marketing strategies designed to deliver maximum ROI.",
    color: "#14b8a6", // Teal
    gradient: "from-teal-500 to-cyan-600",
    link: "website-design-and-marketing"
  },
  {
    title: "Website Development",
    id: "web-dev-scale",
    icon: <Code className="w-10 h-10 text-white" />,
    desc: "Scale your business with the best website development company infrastructure in Delhi NCR.",
    color: "#f43f5e", // Rose
    gradient: "from-rose-500 to-pink-600",
    link: "website-development"
  },
];

// --- 3D HOLOGRAPHIC CARD COMPONENT ---
const HolographicCard = ({ service, index }) => {
  const ref = useRef(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      // Reduced height from h-[22rem] to h-[18rem] to fit content without the button
      className="group relative h-[18rem] w-full cursor-pointer perspective-[1000px]"
    >
      {/* CARD BODY */}
      <div 
        className="absolute inset-0 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ transform: "translateZ(0px)" }} 
      >
        
        {/* 1. NEON CORE IGNITION */}
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-out"
            style={{ 
                background: `radial-gradient(circle at center, ${service.color}, transparent 70%)` 
            }}
        />

        {/* 2. GRID TEXTURE */}
        <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        {/* 3. CONTENT CONTAINER */}
        <div className="relative h-full p-6 flex flex-col items-center text-center z-10" style={{ transform: "translateZ(50px)" }}>
            
            {/* ICON ORB */}
            <motion.div 
                className={`mb-4 w-14 h-14 rounded-full bg-gradient-to-br ${service.gradient} p-[2px] shadow-[0_0_30px_${service.color}40] group-hover:shadow-[0_0_50px_${service.color}80] transition-shadow duration-500`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center backdrop-blur-md">
                    {service.icon}
                </div>
            </motion.div>

            {/* TITLE */}
            <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {service.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                {service.desc}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- BOUNCING LETTER COMPONENT ---
const BouncingLetter = ({ children, delay }) => {
  return (
    <motion.span
      className="inline-block origin-bottom"
      animate={{
        scaleY: [1, 0.7, 1.1, 1],
        y: [0, 5, -2, 0],
        color: ["#ffffff", "#22d3ee", "#ffffff"],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
        times: [0, 0.05, 0.1, 0.2]
      }}
    >
      {children}
    </motion.span>
  );
};

const Services = () => {
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24 relative">
          <div className="relative inline-block w-full max-w-4xl">
            <h2 className="text-xl font-bold text-gray-500 tracking-[0.5em] mb-4">OUR</h2>
            
            <div className="relative inline-block">
                <motion.div
                  className="absolute -top-10 w-6 h-6 bg-cyan-400 rounded-full blur-[1px] shadow-[0_0_20px_#22d3ee] z-20"
                  animate={{
                    left: ["2%", "92%"], 
                    y: [0, -50, 0]     
                  }}
                  transition={{
                    left: { duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "linear" },
                    y: { duration: 2.5 / 8, repeat: Infinity, ease: "circOut", repeatType: "reverse" }
                  }}
                />
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-widest flex justify-center gap-2 md:gap-4">
                  {"EXPERTISE".split("").map((char, i) => (
                    <BouncingLetter key={i} delay={i * (2.5 / 8)}>
                      {char}
                    </BouncingLetter>
                  ))}
                </h2>
            </div>
            <h2 className="absolute top-full left-0 w-full text-5xl md:text-8xl font-black text-white/5 tracking-widest flex justify-center gap-2 md:gap-4 scale-y-[-1] blur-sm pointer-events-none select-none">
               EXPERTISE
            </h2>
          </div>
        </div>

        {/* --- HOLOGRAPHIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {services.map((service, index) => (
            <HolographicCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;