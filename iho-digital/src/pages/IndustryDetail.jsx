import React, { useEffect, useState } from 'react';
import SEO from "../components/SEO.jsx";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, MessageCircle, Sparkles, 
  X, User, Mail, Briefcase, Rocket, ChevronRight, Star, ChevronDown,
  Zap, Activity, Target, Cpu, Layers, Globe, Shield, Award, Terminal, HardDrive, BarChart3, Hexagon, LayoutGrid
} from 'lucide-react';
import LiveBackground from "../components/LiveBackground";

// --- IMPORT YOUR DATA ---
import { industriesData } from "../Data/industriesData"; 
import { seoData } from "../Data/seoData";

const INDUSTRY_SEO_ALIASES = {
  'food-beverage': 'food-&-beverage',
  'real-estate': 'real-estete',
  'beauty-personal-care': 'beauty-&-personal-care'
};

// --- THEME ENGINE ---
const getTheme = (color) => {
  const themes = {
    blue: { text: "text-blue-400", bg: "bg-blue-600", border: "border-blue-500/30", glow: "shadow-[0_0_50px_rgba(59,130,246,0.5)]", gradient: "from-blue-500 via-cyan-400 to-white", light: "bg-blue-500/20" },
    red: { text: "text-red-400", bg: "bg-red-600", border: "border-red-500/30", glow: "shadow-[0_0_50px_rgba(239,68,68,0.5)]", gradient: "from-red-500 via-orange-400 to-white", light: "bg-red-500/20" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-600", border: "border-cyan-500/30", glow: "shadow-[0_0_50px_rgba(6,182,212,0.5)]", gradient: "from-cyan-400 via-teal-300 to-white", light: "bg-cyan-500/20" },
    green: { text: "text-green-400", bg: "bg-green-600", border: "border-green-500/30", glow: "shadow-[0_0_50px_rgba(34,197,94,0.5)]", gradient: "from-green-500 via-emerald-400 to-white", light: "bg-green-500/20" },
    purple: { text: "text-purple-400", bg: "bg-purple-600", border: "border-purple-500/30", glow: "shadow-[0_0_50px_rgba(168,85,247,0.5)]", gradient: "from-purple-500 via-fuchsia-400 to-white", light: "bg-purple-500/20" },
    orange: { text: "text-orange-400", bg: "bg-orange-600", border: "border-orange-500/30", glow: "shadow-[0_0_50px_rgba(249,115,22,0.5)]", gradient: "from-orange-500 via-amber-400 to-white", light: "bg-orange-500/20" },
    indigo: { text: "text-indigo-400", bg: "bg-indigo-600", border: "border-indigo-500/30", glow: "shadow-[0_0_50px_rgba(99,102,241,0.5)]", gradient: "from-indigo-500 via-violet-400 to-white", light: "bg-indigo-500/20" },
    teal: { text: "text-teal-400", bg: "bg-teal-600", border: "border-teal-500/30", glow: "shadow-[0_0_50px_rgba(20,184,166,0.5)]", gradient: "from-teal-500 via-emerald-400 to-white", light: "bg-teal-500/20" },
    pink: { text: "text-pink-400", bg: "bg-pink-600", border: "border-pink-500/30", glow: "shadow-[0_0_50px_rgba(236,72,153,0.5)]", gradient: "from-pink-500 via-rose-400 to-white", light: "bg-pink-500/20" },
    yellow: { text: "text-yellow-400", bg: "bg-yellow-600", border: "border-yellow-500/30", glow: "shadow-[0_0_50px_rgba(234,179,8,0.5)]", gradient: "from-yellow-500 via-amber-300 to-white", light: "bg-yellow-500/20" },
    lime: { text: "text-lime-400", bg: "bg-lime-600", border: "border-lime-500/30", glow: "shadow-[0_0_50px_rgba(132,204,22,0.5)]", gradient: "from-lime-500 via-green-400 to-white", light: "bg-lime-500/20" },
    fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-600", border: "border-fuchsia-500/30", glow: "shadow-[0_0_50px_rgba(217,70,239,0.5)]", gradient: "from-fuchsia-500 via-purple-400 to-white", light: "bg-fuchsia-500/20" },
  };
  return themes[color] || themes.blue;
};

// --- NAVIGATION SWITCHER ---
const IndustrySwitcher = ({ currentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left mb-8 md:mb-0 z-50">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-56 px-5 py-2.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md transition-all shadow-lg"
      >
        <span className="flex items-center gap-2"><LayoutGrid size={14} /> Switch Industry</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 origin-top-right bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto z-50"
          >
            <div className="py-2">
              {industriesData.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => { 
                    navigate(`/industries/${ind.id}`); 
                    setIsOpen(false); 
                  }}
                  className={`flex items-center w-full px-5 py-3 text-sm transition-colors ${ind.id === currentId ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <ind.icon size={14} className="mr-3 opacity-70" />
                  {ind.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 3D FLIP ICON ---
const FlipIcon = ({ Icon, theme }) => (
  <motion.div
    whileHover={{ rotateY: 180, scale: 1.1, translateZ: 20 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`p-3.5 rounded-2xl bg-white/10 border border-white/20 ${theme.text} shadow-[0_0_25px_-5px_currentColor] transition-all group-hover:bg-white/20 shrink-0`}
  >
    <Icon size={24} />
  </motion.div>
);

// --- TILT HERO ---
const TiltText = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 200, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 10 });
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// --- CONTENT PARSER ---
const ContentParser = ({ text, theme }) => {
  if (!text) return null;
  const blocks = text.split('\n\n');
  const iconPool = [Zap, Activity, Target, Cpu, Layers, Globe, Shield, Award, Terminal, HardDrive, BarChart3];

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        // --- GRID FOR SINGLE SENTENCE TEXTS (Bulletins) ---
        if (block.includes('•') || block.trim().startsWith('-') || block.match(/^\d+\./)) {
          const items = block.split(/\n|•/).filter(item => item.trim().length > 0);
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              {items.map((item, i) => {
                const cleanText = item.replace(/^\d+\.\s*/, '').replace(/^-/, '').trim();
                const SelectedIcon = iconPool[i % iconPool.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="group relative p-8 rounded-[2.5rem] bg-white/[0.05] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl"
                  >
                    <div className={`absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${theme.gradient} blur-2xl`} />
                    <div className="relative z-10 flex items-center gap-6">
                      <FlipIcon Icon={SelectedIcon} theme={theme} />
                      <span className="text-slate-200 text-lg leading-relaxed font-light">{cleanText}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        }
        
        // --- HEADINGS ---
        if (block.trim().endsWith('?') || (block.length < 60 && !block.includes('.'))) {
          return (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className={`text-2xl font-bold text-white mt-16 mb-8 flex items-center gap-5 group`}>
                <motion.div
                    animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`p-2.5 rounded-xl bg-white/10 border border-white/20 ${theme.text} shadow-[0_0_25px_-5px_currentColor] group-hover:shadow-[0_0_35px_currentColor] transition-all`}
                >
                    <Hexagon size={22} fill="currentColor" className="opacity-30" />
                </motion.div>
                <span className="group-hover:translate-x-3 transition-transform duration-300 uppercase tracking-wide">{block}</span>
              </h3>
            </motion.div>
          );
        }

        // --- PARAGRAPHS ---
        return (
          <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent shadow-lg">
            <p className="text-slate-200 text-lg leading-8 tracking-wide text-justify font-light">
              {block}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

// --- CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Industry Solutions', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setStatus('success'); setTimeout(() => { setStatus('idle'); onClose(); }, 3000); }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg bg-[#0f1117] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between px-8 py-5 border-b border-white/10 bg-white/5">
              <h3 className="text-white font-bold flex items-center gap-2 tracking-tight"><Rocket className="w-5 h-5 text-blue-400" /> Start Your Project</h3>
              <button onClick={onClose}><X className="w-6 h-6 text-slate-400 hover:text-white transition-colors" /></button>
            </div>
            <div className="p-10 bg-gradient-to-b from-white/[0.02] to-transparent">
                {status === 'success' ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50"><CheckCircle2 size={32} className="text-green-500" /></div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-400 font-light">We'll be in touch shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative"><User className="absolute left-4 top-4 text-slate-500 w-4 h-4" /><input name="name" required onChange={handleChange} placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 text-white focus:border-blue-500 outline-none transition-all" /></div>
                        <div className="relative"><Mail className="absolute left-4 top-4 text-slate-500 w-4 h-4" /><input name="email" required type="email" onChange={handleChange} placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 text-white focus:border-blue-500 outline-none transition-all" /></div>
                        <div className="relative"><Briefcase className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                            <select name="service" onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 text-slate-300 focus:border-blue-500 outline-none appearance-none transition-all">
                                <option>Web Development</option><option>Digital Marketing</option><option>Industry Solutions</option><option>App Dev</option>
                            </select>
                        </div>
                        <div className="relative"><MessageCircle className="absolute left-4 top-4 text-slate-500 w-4 h-4" /><textarea name="message" required onChange={handleChange} placeholder="Message" rows="3" className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 text-white focus:border-blue-500 outline-none transition-all" /></div>
                        <button type="submit" disabled={isSending} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all">{isSending ? "Sending..." : "Send Request"}</button>
                    </form>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN PAGE COMPONENT ---
const IndustryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const industry = industriesData.find((item) => item.id === id);
  const seoKey = INDUSTRY_SEO_ALIASES[id] || id;
  const meta = seoData[id] || seoData[seoKey] || {};
  const specificSeo = {
    title: meta.title || `${industry?.name} Solutions - IHO Digital`,
    description: meta.description || industry?.desc
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, industry]); 

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0a0c14] flex items-center justify-center text-white">
        <SEO
          title="Industry Not Found - IHO Digital"
          description="The requested industry page could not be found."
          noindex
          nofollow
        />
        Industry Not Found
      </div>
    );
  }
  const theme = getTheme(industry.color);

  return (
    <div key={location.pathname} className="relative min-h-screen bg-[#0a0c14] text-slate-200 overflow-x-hidden font-sans selection:bg-white/20">
      <SEO
        title={specificSeo.title}
        description={specificSeo.description}
        canonical={`/industries/${industry.id}`}
        ogTitle={meta.ogTitle}
        ogDescription={meta.ogDescription}
        ogType={meta.ogType || "website"}
        instagramTitle={meta.instagramTitle}
        instagramDescription={meta.instagramDescription}
        schemaType={meta.schemaType}
        schemaName={meta.schemaName || industry.name}
        schemaDescription={meta.schemaDescription || industry.desc}
      />
      <LiveBackground />

      {/* Floating Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className={`absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-40 blur-[160px] ${theme.bg}`} />
         <div className={`absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-20 blur-[140px] bg-slate-500`} />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 container mx-auto max-w-5xl">
        
        {/* NAV & SWITCHER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <motion.button initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onClick={() => navigate('/industries')} className="group flex items-center gap-4 text-sm font-bold text-slate-400 hover:text-white mb-4 md:mb-0 transition-all uppercase tracking-widest">
                <div className="p-2.5 rounded-full border border-white/20 group-hover:border-white/50 transition-all bg-white/10 backdrop-blur-md"><ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /></div>
                Back to Industries
            </motion.button>
            <IndustrySwitcher currentId={id} />
        </div>

        {/* HERO SECTION */}
        <div className="text-center mb-24 relative perspective-[1200px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black tracking-[0.2em] uppercase mb-10 shadow-lg`}><Sparkles size={16} className={theme.text} />{industry.name} Solutions</motion.div>
            <div className="flex justify-center mb-10">
              <TiltText>
                {/* --- FIX APPLIED HERE: Changed leading-none to leading-tight and added pb-4 --- */}
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }} 
                    className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} tracking-tighter leading-tight pb-4 whitespace-nowrap overflow-visible drop-shadow-2xl`}
                >
                    {industry.name}
                </motion.h1>
              </TiltText>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">{industry.desc}</motion.p>
        </div>

        {/* MAIN CONTENT (FULL WIDTH) */}
        <div className="mb-32">
            <div className="prose prose-invert prose-lg max-w-none">
                <ContentParser text={industry.fullDescription} theme={theme} />
            </div>
        </div>

        {/* --- BOTTOM GRID CARDS --- */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Card 1: Expertly Crafted (Icon) */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative bg-gradient-to-br from-slate-900 to-black border border-white/20 hover:border-white/40 rounded-[3rem] p-12 flex flex-col items-center text-center justify-center transition-all duration-300 ${theme.glow} hover:-translate-y-3 overflow-hidden shadow-2xl`}
            >
                <div className={`absolute inset-0 ${theme.bg} opacity-10 group-hover:opacity-20 blur-[120px] transition-opacity duration-700 pointer-events-none`} />
                <div className={`w-32 h-32 rounded-[2rem] flex items-center justify-center mb-10 bg-white/10 border border-white/20 ${theme.text} shadow-[0_0_60px_-10px_currentColor] group-hover:scale-110 transition-transform duration-500`}>
                    {industry.icon && <industry.icon size={64} />}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 relative z-10 tracking-tight">Industry Leaders</h3>
                <p className="text-slate-300 text-xl relative z-10 font-light leading-relaxed">Specialized digital strategies designed to maximize growth in the {industry.name} sector.</p>
            </motion.div>

            {/* Card 2: Key Benefits (List from Solutions) */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`group relative bg-[#0f111a] border border-white/20 hover:border-white/40 rounded-[3rem] p-12 transition-all duration-300 ${theme.glow} hover:-translate-y-3 overflow-hidden shadow-2xl`}
            >
                <div className={`absolute inset-0 ${theme.bg} opacity-10 group-hover:opacity-20 blur-[120px] transition-opacity duration-700 pointer-events-none`} />
                <div className="flex items-center gap-5 mb-10 border-b border-white/10 pb-8 relative z-10">
                    <div className={`p-4 rounded-2xl bg-white/10 ${theme.text} shadow-[0_0_25px_-5px_currentColor]`}><Star size={30} fill="currentColor" /></div>
                    <h3 className="text-3xl font-black text-white tracking-tight">Key Solutions</h3>
                </div>
                <div className="space-y-6 relative z-10">
                    {industry.solutions.map((feature, i) => (
                        <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/10 transition-all group/item">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white/20 ${theme.text} group-hover/item:scale-125 transition-all shadow-inner`}><CheckCircle2 size={16} /></div>
                            <span className="text-xl text-slate-200 font-medium group-hover/item:text-white transition-colors">{feature}</span>
                        </div>
                    ))}
                </div>
                {/* Integrated CTA Button in the card */}
                <button onClick={() => setIsModalOpen(true)} className={`mt-8 w-full py-4 rounded-2xl ${theme.bg} text-white font-bold shadow-lg hover:brightness-110 transition-all text-lg tracking-wide`}>
                    Get Custom Quote
                </button>
            </motion.div>
        </div>

      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default IndustryDetail;
