import React, { useState, useEffect } from 'react';
import SEO from "../components/SEO.jsx";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronDown, Sparkles, ArrowRight, Zap, CheckCircle2, Star, 
  LayoutGrid, Rocket, Globe, Shield, Target, Award, ArrowUpRight,
  BarChart3, X, ChevronRight 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import LiveBackground from "../components/LiveBackground";
import { industriesData } from "../Data/industriesData";

// --- THEME ENGINE ---
const getTheme = (color) => {
  const themes = {
    blue: { text: "text-blue-400", bg: "bg-blue-600", border: "border-blue-500/30", glow: "shadow-blue-500/20", gradient: "from-blue-500 via-cyan-400 to-white" },
    purple: { text: "text-purple-400", bg: "bg-purple-600", border: "border-purple-500/30", glow: "shadow-purple-500/20", gradient: "from-purple-500 via-fuchsia-400 to-white" },
    teal: { text: "text-teal-400", bg: "bg-teal-600", border: "border-teal-500/30", glow: "shadow-teal-500/20", gradient: "from-teal-500 via-emerald-400 to-white" },
    orange: { text: "text-orange-400", bg: "bg-orange-600", border: "border-orange-500/30", glow: "shadow-orange-500/20", gradient: "from-orange-500 via-amber-400 to-white" },
    default: { text: "text-slate-400", bg: "bg-slate-600", border: "border-slate-500/30", glow: "shadow-slate-500/20", gradient: "from-slate-400 to-white" }
  };
  return themes[color] || themes.default;
};

// --- COMPONENT: 3D TILT CARD ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 10 });
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (left + width / 2));
        y.set(e.clientY - (top + height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const MotionLink = motion(Link);

// --- COMPONENT: CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose }) => {
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState('idle');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSending(true);
      setTimeout(() => { setIsSending(false); setStatus('success'); setTimeout(() => { setStatus('idle'); onClose(); }, 3000); }, 1500);
    };

    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="relative w-full max-w-lg bg-[#0f1117] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex justify-between px-8 py-5 border-b border-white/10 bg-white/5">
                    <h3 className="text-white font-bold flex items-center gap-2"><Rocket className="w-5 h-5 text-blue-400" /> Start Your Project</h3>
                    <button onClick={onClose}><X className="w-6 h-6 text-slate-400 hover:text-white transition-colors" /></button>
                </div>
                <div className="p-8 bg-gradient-to-b from-white/[0.02] to-transparent">
                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50"><CheckCircle2 size={32} className="text-green-500" /></div>
                            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input required placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none" />
                            <input required type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none" />
                            <textarea required placeholder="Message" rows="3" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none" />
                            <button type="submit" disabled={isSending} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all">{isSending ? "Sending..." : "Send Request"}</button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const Industries = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Digital Marketing for Industries | IHO Digital";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0c14] text-slate-200 overflow-x-hidden font-sans selection:bg-white/20">
      <SEO 
        title="Digital Marketing Services for Multiple Industries in Delhi NCR | IHO Digital" 
        description="Customized digital marketing strategies tailored to different industries across Delhi NCR, Noida, and nearby regions." 
        url="/industries" 
      />
      <LiveBackground />

      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[150px] bg-blue-600" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 blur-[150px] bg-purple-600" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 container mx-auto max-w-7xl">
        
        {/* --- 1. HERO SECTION --- */}
        <div className="text-center mb-32 relative">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-white shadow-lg backdrop-blur-md"
            >
                <Sparkles size={12} className="text-blue-400" /> Specialized Growth
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter leading-tight mb-8 drop-shadow-2xl"
            >
                Digital Marketing for <br/> <span className="text-blue-500">Every Industry</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }} 
                className="text-xl md:text-2xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed"
            >
                At IHO Digital, we specialize in providing customized digital marketing strategies tailored to different industries across Delhi NCR, Noida, and nearby regions.
            </motion.p>
        </div>

        {/* --- 2. WHY INDUSTRY SPECIFIC MATTERS (3D Grid) --- */}
        <div className="mb-32">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Why Industry-Specific Marketing Matters</h3>
                <p className="text-slate-400 max-w-2xl mx-auto">A generic strategy cannot deliver the same results. We understand your unique needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { text: "Reach the right audience effectively", icon: Target },
                    { text: "Improve search rankings in niche markets", icon: Globe },
                    { text: "Generate high-quality industry leads", icon: Zap },
                    { text: "Increase conversions & ROI", icon: BarChart3 }, 
                    { text: "Build authority within your sector", icon: Shield },
                    { text: "Stay ahead of competitors", icon: Award },
                ].map((item, i) => (
                    <TiltCard key={i} className="h-full">
                        <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 h-full flex flex-col items-start gap-4 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 group-hover:scale-110 transition-transform shadow-lg z-10">
                                <item.icon size={24} />
                            </div>
                            <p className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors z-10 leading-snug">
                                {item.text}
                            </p>
                        </div>
                    </TiltCard>
                ))}
            </div>
        </div>

        {/* --- 3. INDUSTRIES WE SERVE (Bento Grid) --- */}
        <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-white/10 flex-1" />
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">Industries We Serve</h2>
                <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industriesData.map((ind, i) => {
                    const theme = getTheme(ind.color);
                    return (
                        <MotionLink
                            key={ind.id}
                            to={`/industries/${ind.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`group cursor-pointer relative p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-[#0f1117] to-black hover:border-white/20 transition-all duration-500 ${theme.glow} hover:-translate-y-2`}
                        >
                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2rem]`} />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${theme.text} group-hover:scale-110 transition-transform duration-300`}>
                                        <ind.icon size={32} />
                                    </div>
                                    <div className="p-2 rounded-full bg-white/5 text-slate-500 group-hover:text-white transition-colors">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{ind.name}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{ind.desc}</p>
                            </div>
                        </MotionLink>
                    );
                })}
            </div>
        </div>

        {/* --- 4. OUR SERVICES (Tag Cloud Layout) --- */}
        <div className="mb-32">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Our Industry-Based Services</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        "Search Engine Optimization (SEO)", "Google Ads & PPC Advertising", 
                        "Social Media Marketing", "Website Design & Development", 
                        "Conversion Optimization", "Content Marketing", 
                        "Email Marketing", "LinkedIn & B2B Marketing", 
                        "Local SEO Services", "Online Reputation Management"
                    ].map((service, i) => (
                        <div key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-blue-500/50 transition-all cursor-default">
                            {service}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- 5. WHY CHOOSE IHO (Feature Grid) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {[
                { title: "Customized Strategies", desc: "Tailored plans for your specific industry needs." },
                { title: "Local SEO Expertise", desc: "Dominate Delhi NCR & Noida markets." },
                { title: "Data-Driven Approach", desc: "Decisions backed by analytics, not guesswork." },
                { title: "Industry Experts", desc: "Experienced team focused on your sector." },
                { title: "Transparent Reporting", desc: "Measurable results you can see." },
                { title: "Complete Solutions", desc: "All digital services under one roof." }
            ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* --- 6. CTA SECTION --- */}
        <div className="relative py-20 text-center border-t border-white/5">
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Let's Build Your Success Story</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Looking for the best industry-focused digital marketing agency in Delhi NCR? We are here to help.
            </p>
            {/* UPDATED: Navigates to Contact Page */}
            <button onClick={() => navigate('/contact')} className="px-10 py-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg flex items-center gap-3 mx-auto hover:scale-105 transition-transform shadow-2xl shadow-blue-900/20">
                Partner With Us <ChevronRight />
            </button>
        </div>

      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Industries;
