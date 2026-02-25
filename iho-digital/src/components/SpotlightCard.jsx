import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ROTATION_RANGE = 20; // Degrees

const getServicePath = (service) => {
  const category = service?.category || "";
  const basePath = category.toLowerCase().includes("digital")
    ? "/digital-marketing"
    : "/web-services";
  return `${basePath}/${service.id}`;
};

const SpotlightCard = ({ service, theme = "blue", index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Position for Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const rX = (mouseYPos / height - 0.5) * ROTATION_RANGE * -1;
    const rY = (mouseXPos / width - 0.5) * ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Theme Colors
  const themeStyles = {
    blue: {
      glow: "rgba(56, 189, 248, 0.4)", // Sky blue glow
      gradient: "from-cyan-400 to-blue-600",
      borderHover: "group-hover:border-cyan-500/50",
      textAccent: "group-hover:text-cyan-400",
      iconBg: "bg-cyan-500/20 text-cyan-400"
    },
    purple: {
      glow: "rgba(168, 85, 247, 0.4)", // Purple glow
      gradient: "from-fuchsia-400 to-purple-600",
      borderHover: "group-hover:border-fuchsia-500/50",
      textAccent: "group-hover:text-fuchsia-400",
      iconBg: "bg-fuchsia-500/20 text-fuchsia-400"
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <Link to={getServicePath(service)} className="block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ transform: transform, transformStyle: "preserve-3d" }}
          className={`relative h-full bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden group transition-colors duration-500 ${currentTheme.borderHover} backdrop-blur-sm`}
        >
          {/* --- LIGHTBOX SPOTLIGHT EFFECT --- */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  ${currentTheme.glow},
                  transparent 80%
                )
              `,
            }}
          />

          {/* --- CONTENT CONTAINER --- */}
          <div className="relative h-full p-8 flex flex-col z-10">
            
            {/* Header: Icon & ID */}
            <div className="flex justify-between items-start mb-6 transform translate-z-10">
              
              {/* --- FLIPPING ICON EFFECT --- */}
              <motion.div 
                animate={{ 
                  rotateY: isHovered ? 360 : 0, 
                  scale: isHovered ? 1.1 : 1 
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                className={`p-4 rounded-2xl ${currentTheme.iconBg} shadow-lg`}
              >
                {service.icon && <service.icon size={32} />}
              </motion.div>

              <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-white transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Titles with Text Transformation */}
            <h3 className={`text-2xl font-black text-white mb-4 uppercase tracking-tight transition-all duration-300 ${currentTheme.textAccent}`}>
              {service.title}
            </h3>
            
            <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow font-light group-hover:text-slate-200 transition-colors duration-300">
              {service.desc}
            </p>

            {/* Bottom Action */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
              <div className="flex -space-x-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                 {/* Fake "Team" Avatars for visual interest */}
                 {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-900 flex items-center justify-center text-[10px] text-white">
                        <Sparkles size={10} />
                    </div>
                 ))}
              </div>
              
              <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 translate-x-0 group-hover:translate-x-1 ${currentTheme.textAccent}`}>
                <span>Explore</span>
                <ArrowRight size={16} />
              </div>
            </div>

          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default SpotlightCard;
