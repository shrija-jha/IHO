import React, { useEffect, useRef } from 'react';
import SEO from "../../components/SEO.jsx";
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, CheckCircle2, Rocket, Home, Layers, ArrowRight, Mail as MailIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

const themePalette = { rose: { gradient: "from-rose-950 via-slate-900 to-black", accent: "bg-rose-600", text: "text-rose-400", border: "border-rose-500/30", glow: "bg-rose-500/20", hex: "#f43f5e", titleGradient: "from-rose-300 via-rose-500 to-pink-400" } };
const theme = themePalette.rose;

const TiltHeading = ({ text, theme }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const handleMouseMove = (e) => { const rect = ref.current.getBoundingClientRect(); x.set((e.clientX - rect.left - rect.width / 2) / rect.width); y.set((e.clientY - rect.top - rect.height / 2) / rect.height); };
  return (<motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="perspective-1000 inline-block cursor-default py-4 relative z-10"><motion.h2 style={{ transform: "translateZ(30px)" }} className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} uppercase leading-tight drop-shadow-2xl text-center tracking-tight`}>{text}</motion.h2><div className={`absolute inset-0 ${theme.glow} blur-[120px] opacity-60 -z-10 animate-pulse`} /><div className={`absolute inset-0 ${theme.glow} blur-[200px] opacity-30 -z-20`} /></motion.div>);
};

const ContentParser = ({ blocks, theme }) => {
  if (!blocks || blocks.length === 0) return null;
  const processedBlocks = [];
  blocks.forEach((block, blockIndex) => {
    if (block.includes('•') || block.trim().startsWith('-')) { processedBlocks.push({ type: 'bullets', content: block }); return; }
    const lines = block.split('\n').filter(line => line.trim().length > 0);
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : null;
      if (line.includes('IHO Digital') || (line.length < 50 && blockIndex === 0 && i === 0)) { processedBlocks.push({ type: 'company_subheading', content: line }); i++; }
      else if (line.endsWith('?') || line.endsWith(':')) { processedBlocks.push({ type: 'section_heading', content: line }); i++; }
      else if (nextLine && nextLine.length > 30 && line.split(/\s+/).length <= 3) { processedBlocks.push({ type: 'feature_card', heading: line, content: nextLine }); i += 2; }
      else { const lastItem = processedBlocks[processedBlocks.length - 1]; if (lastItem && lastItem.type === 'paragraph') { lastItem.content += ' ' + line; } else { processedBlocks.push({ type: 'paragraph', content: line }); } i++; }
    }
  });
  return (<div className="space-y-8 text-slate-300">{processedBlocks.map((item, index) => { if (item.type === 'company_subheading') { return <motion.h2 initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={index} className={`text-2xl md:text-3xl font-extrabold ${theme.text} mb-6`}>{item.content}</motion.h2>; } if (item.type === 'bullets') { const items = item.content.split(/\n|•/).filter(line => line.trim().length > 0); return (<motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="my-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{items.map((line, i) => (<motion.div key={i} whileHover={{ y: -5 }} className={`flex items-start gap-3 text-base text-slate-300 bg-slate-900/40 p-5 rounded-xl border border-white/5 shadow-lg group hover:border-rose-500/30`}><div className={`mt-1 p-1 rounded-full bg-white/5 ${theme.text}`}><CheckCircle2 className="w-4 h-4" /></div><span>{line.replace(/^-/, '').trim()}</span></motion.div>))}</div></motion.div>); } if (item.type === 'section_heading') { return <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={index} className={`text-2xl font-extrabold ${theme.text} mt-14 mb-6`}>{item.content}</motion.h3>; } if (item.type === 'feature_card') { return (<motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-rose-500/30 my-6`}><h4 className={`text-xl font-bold ${theme.text} mb-3`}>{item.heading}</h4><p className="text-slate-300/90">{item.content}</p></motion.div>); } return <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} key={index} className="text-base text-slate-300/90">{item.content}</motion.p>; })})</div>);
};

const BeautyPersonalCarePage = () => {
  const pageTitle = "Beauty & Personal Care";
  const pageCategory = "Industries";
  const pageImage = "/img/Services/istockphoto-2150109091-612x612.jpg";
  const pageDescription = "Transform beauty business with digital marketing";
  const pageFullDescription = `Beauty & Personal Care Digital Marketing – IHO Digital
The beauty and personal care industry needs digital presence to reach customers. At IHO Digital, we provide beauty digital marketing services.
Why Digital Marketing Is Important for Beauty
Customers search for beauty products, salons, and spas online. Without digital presence, beauty businesses miss out on customers.
Our Beauty Digital Solutions
1. Beauty Website Design
We design professional websites for salons, spas, and beauty brands.
2. SEO for Beauty
We optimize for searches related to beauty services.`;

  const pageFeatures = ["Beauty Websites", "Spa & Salon Pages", "Product Marketing", "Beauty SEO"];

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const fullText = pageFullDescription || "";
  const allBlocks = fullText.split('\n\n');
  let introBlocks = allBlocks.slice(0, 1);
  let mainBodyBlocks = allBlocks.slice(1);

  const openContactModal = () => { window.dispatchEvent(new CustomEvent('open-contact-modal')); const navbarFormTrigger = document.getElementById('open-contact-form-btn'); if (navbarFormTrigger) navbarFormTrigger.click(); };

  return (
    <div className="min-h-screen bg-black text-slate-200 overflow-x-hidden">
      <SEO title={`${pageTitle} - IHO Digital`} description={pageDescription} canonical="/industries/beauty-personal-care" />
      <div className={`pt-28 pb-6 border-b border-white/5 bg-gradient-to-r ${theme.gradient}`}>
        <div className="container mx-auto max-w-7xl px-6 flex items-center gap-2 text-sm opacity-80">
          <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/industries" className={`${theme.text}`}>{pageCategory}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200">{pageTitle}</span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-900 via-black to-slate-950 py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-center">
            <div className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border ${theme.border}`}>
              <Sparkles className={`${theme.text}`} />
              <span className={`text-sm font-bold uppercase ${theme.text}`}>{pageCategory}</span>
            </div>
          </motion.div>
          <div className="mb-16 text-center"><TiltHeading text={pageTitle} theme={theme} /></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-lg text-slate-300"><ContentParser blocks={introBlocks} theme={theme} /></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full">
              <div className={`p-3 rounded-2xl bg-gradient-to-br from-white/10 border border-white/5 shadow-2xl backdrop-blur-sm ${theme.glow}`}>
                <div className="rounded-xl overflow-hidden aspect-video"><img src={pageImage} alt={pageTitle} className="w-full h-full object-cover" /></div>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><ContentParser blocks={mainBodyBlocks} theme={theme} /></motion.div>
        </div>
      </div>

      {pageFeatures.length > 0 && (<div className="bg-black py-20 border-t border-white/5"><div className="container mx-auto max-w-7xl px-6"><div className="text-center mb-14"><h3 className="text-3xl font-bold text-white mb-4">Key Features</h3><div className={`h-1.5 w-24 ${theme.accent} rounded-full mx-auto`} /></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{pageFeatures.map((feature, i) => (<div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl"><CheckCircle2 className={`w-6 h-6 ${theme.text} mb-3`} /><span className="text-slate-300">{feature}</span></div>))}</div></div></div>)}

      <div className="py-24 bg-gradient-to-b from-slate-950 to-black border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">Ready to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient}`}>Grow?</span></h2>
          <button onClick={openContactModal} className={`px-10 py-4 ${theme.accent} text-white font-bold rounded-xl`}>Get Started</button>
        </div>
      </div>

      <div className="py-24 bg-black container mx-auto max-w-7xl px-6">
        <h3 className="text-3xl font-bold text-white mb-10">More Industries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/industries/healthcare" className="bg-slate-900/40 border border-white/5 rounded-2xl p-6"><h4 className="text-white font-bold mb-2">Healthcare</h4><p className="text-slate-400 text-sm">Modernize healthcare</p></Link>
          <Link to="/industries/technology" className="bg-slate-900/40 border border-white/5 rounded-2xl p-6"><h4 className="text-white font-bold mb-2">Technology</h4><p className="text-slate-400 text-sm">Digital solutions</p></Link>
          <Link to="/industries/education" className="bg-slate-900/40 border border-white/5 rounded-2xl p-6"><h4 className="text-white font-bold mb-2">Education</h4><p className="text-slate-400 text-sm">Learning solutions</p></Link>
          <Link to="/industries/ecommerce" className="bg-slate-900/40 border border-white/5 rounded-2xl p-6"><h4 className="text-white font-bold mb-2">E-commerce</h4><p className="text-slate-400 text-sm">Online sales</p></Link>
        </div>
      </div>
    </div>
  );
};

export default BeautyPersonalCarePage;
