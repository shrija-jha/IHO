import React, { useEffect, useRef, useState } from 'react';
import SEO from "../../components/SEO.jsx";
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, 
  Rocket, Home, ArrowRight, Mail as MailIcon,
  Sparkles, Star, Grid, ArrowLeft, ChevronDown
} from 'lucide-react';

// --- 1. THEME PALETTE ---
const themePalette = {
  yellow: { 
    gradient: "from-[#050510] via-[#0a0a1a] to-[#050510]", 
    accent: "bg-[#eab308]", 
    text: "text-yellow-400", 
    border: "border-yellow-500/20",
    hex: "#eab308",
    titleGradient: "from-[#fde047] via-[#facc15] to-[#fbbf24]"
  }
};

const theme = themePalette.yellow;

// --- 2. GLOWING TILT HEADING COMPONENT ---
const TiltHeading = ({ text, theme }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 inline-block cursor-default py-4 relative z-10"
    >
      <motion.h1 
        style={{ transform: "translateZ(30px)", dropShadow: "0px 10px 30px rgba(234,179,8,0.5)" }}
        className={`text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} tracking-tight`}
      >
        {text}
      </motion.h1>
      {/* Heavy glowing effects matching the screenshot */}
      <div className={`absolute inset-0 bg-yellow-500/30 blur-[100px] opacity-80 -z-10 animate-pulse`} />
      <div className={`absolute inset-0 bg-amber-500/20 blur-[150px] opacity-50 -z-20`} />
    </motion.div>
  );
};

// --- 3. CONTENT PARSER (Full Width) ---
const ContentParser = ({ blocks, theme }) => {
  if (!blocks || blocks.length === 0) return null;

  const isShortFeatureHeading = (line, nextLine) => {
    const trimmed = line.trim();
    const words = trimmed.split(/\s+/);
    return (
      words.length >= 1 && words.length <= 3 && 
      !trimmed.endsWith('.') && !trimmed.endsWith(',') && !trimmed.endsWith(';') && !trimmed.endsWith('?') && !trimmed.endsWith(':') &&
      nextLine && nextLine.trim().length > 0 && !nextLine.trim().startsWith('-')
    );
  };

  const processedBlocks = [];
  blocks.forEach((block, blockIndex) => {
    const lines = block.split('\n').filter(line => line.trim().length > 0);
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : null;

      if (line.startsWith('-') || line.startsWith('•')) {
        const listItems = [];
        while (i < lines.length && (lines[i].trim().startsWith('-') || lines[i].trim().startsWith('•'))) {
          listItems.push(lines[i].trim().replace(/^[-•]\s*/, ''));
          i++;
        }
        processedBlocks.push({ type: 'card_list', items: listItems });
        continue;
      }
      
      if (line.endsWith('?') || line.endsWith(':') || line.match(/^\d+\.\s/)) {
        processedBlocks.push({ type: 'section_heading', content: line.replace(/^\d+\.\s*/, '') });
        i++;
        continue;
      }
      
      if (isShortFeatureHeading(line, nextLine)) {
        processedBlocks.push({ type: 'feature_card', heading: line, content: nextLine });
        i += 2;
        continue;
      }
      
      const lastItem = processedBlocks[processedBlocks.length - 1];
      if (lastItem && lastItem.type === 'paragraph') {
        lastItem.content += ' ' + line;
      } else {
        processedBlocks.push({ type: 'paragraph', content: line });
      }
      i++;
    }
  });

  return (
    <div className="space-y-6 text-slate-300 relative z-10 w-full">
      {processedBlocks.map((item, index) => {
        if (item.type === 'card_list') {
          return (
            <ul key={index} className="my-6 space-y-3 pl-4">
              {item.items.map((listItem, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme.text} drop-shadow-[0_0_8px_${theme.hex}]`} />
                  <span className="text-base leading-relaxed text-slate-300">{listItem}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (item.type === 'section_heading') {
          return <h3 key={index} className={`text-2xl md:text-3xl font-extrabold ${theme.text} mt-12 mb-4 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]`}>{item.content}</h3>;
        }
        if (item.type === 'feature_card') {
          return (
            <div key={index} className="my-6 p-6 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.1)] backdrop-blur-md">
              <h4 className={`text-xl font-bold ${theme.text} mb-2`}>{item.heading}</h4>
              <p className="text-slate-300 leading-relaxed">{item.content}</p>
            </div>
          );
        }
        return (
          <p key={index} className="text-lg leading-relaxed text-slate-300/90 text-justify md:text-left">
            {item.content}
          </p>
        );
      })}
    </div>
  );
};

// --- 4. MAIN PAGE COMPONENT ---
const RealEstatePage = () => {
  const pageTitle = "Real Estate";
  const pageCategory = "REAL ESTATE SOLUTIONS";
  const pageDescription = "Accelerate property sales with digital marketing";

  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageFullDescription = `Grow Your Real Estate Business with Smart Digital Solutions
The real estate industry has shifted heavily toward online platforms. Buyers and investors now search for properties, compare prices, explore virtual tours, and contact agents through digital channels before making decisions. Without a strong online presence, real estate businesses risk losing valuable leads to competitors who appear first in search results.

At IHO Digital, we provide professional real estate website development and digital marketing services in Delhi NCR & Noida designed to help builders, real estate agents, property consultants, and developers generate high-quality leads and close more deals. As a trusted real estate digital marketing agency near you, we combine creative design, advanced SEO strategies, and targeted advertising campaigns to help your business stand out in a competitive market.

Why Digital Marketing Is Essential for Real Estate Businesses:
Modern property buyers rely on online research to find homes, commercial spaces, and investment opportunities. A strong digital strategy ensures your listings reach the right audience at the right time.

Our real estate digital solutions help you:

- Generate property inquiries and site visit bookings
- Improve visibility on Google and "property near me" searches
- Showcase projects through high-quality visuals and virtual tours
- Build trust through reviews and professional branding
- Promote new launches and exclusive offers
- Capture leads through optimized landing pages

With the right digital presence, real estate businesses can connect with serious buyers and investors more effectively.

Our Real Estate Digital Services in Delhi NCR & Noida:

1. Real Estate Website Design & Development
We design modern, mobile-friendly real estate websites that highlight property listings, project details, and booking options. Our websites focus on clean design, fast loading speed, and conversion-focused layouts.

Features include:

- Property listing management
- Search & filter options
- Virtual tour & gallery integration
- Online inquiry & booking forms
- Mobile-responsive layouts
- CRM integration for lead tracking

2. SEO for Real Estate Businesses
Our SEO strategies help your business rank for searches like "property dealers near me," "flats in Noida," and "real estate developers Delhi NCR." We optimize content, technical SEO, and local listings to increase organic traffic and visibility.

3. Social Media Marketing for Real Estate Brands
We create engaging content including project highlights, property videos, testimonials, and investment tips on platforms like Instagram, Facebook, and LinkedIn. Social media marketing helps build brand trust and attract new buyers.

4. Google Ads & PPC Campaigns
Our PPC advertising campaigns target high-intent property buyers actively searching for real estate services. We design lead-focused ad campaigns that drive inquiries, calls, and website visits instantly.

5. Real Estate Lead Generation & Landing Pages
We build optimized landing pages designed to capture leads for specific projects or locations. Clear CTAs and persuasive content help convert visitors into potential buyers.

6. Online Reputation & Brand Management
Customer reviews and brand image influence real estate decisions. We help manage online feedback, improve ratings, and maintain a professional online presence that builds credibility.

Benefits of Choosing IHO Digital for Real Estate Marketing:

- Custom real estate website development
- Local SEO strategies for Delhi NCR & Noida
- Property lead generation campaigns
- Social media marketing for real estate brands
- Google Ads & PPC advertising
- Conversion-focused landing pages
- Transparent performance reporting

Our goal is to help real estate businesses attract serious buyers and generate consistent sales opportunities.

Real Estate Businesses We Serve:

- Real Estate Agents & Brokers
- Property Developers & Builders
- Commercial Property Consultants
- Real Estate Investment Firms
- Rental & Leasing Agencies
- Luxury Property Companies
- Real Estate Startups

Whether you manage residential properties, commercial projects, or luxury developments, our digital solutions help you grow faster.

Why Choose IHO Digital for Real Estate Digital Solutions?

At IHO Digital, we understand how property buyers research and make decisions online. Our team builds visually impressive websites, optimized landing pages, and targeted ad campaigns that attract serious buyers and investors.

We focus on user experience, fast website performance, and conversion optimization to ensure your property listings get maximum visibility. Our integrated digital marketing strategies help real estate businesses generate high-quality leads and build strong online brands.

Grow Your Real Estate Business with IHO Digital:

If you are looking for the best real estate digital marketing and website development company in Delhi NCR or Noida, IHO Digital offers complete digital solutions tailored to your business goals.

From real estate website design and SEO to PPC advertising and social media marketing, we help you increase visibility, generate leads, and grow your real estate business successfully.

Contact IHO Digital today and transform your real estate brand with powerful digital strategies.`;

  const pageFeatures = [
    "Property Listing Websites",
    "Virtual Tours & 3D Showcases",
    "Lead Management Systems",
    "Real Estate SEO & PPC"
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const allBlocks = pageFullDescription.split('\n\n');

  const openContactModal = () => {
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
    const navbarFormTrigger = document.getElementById('open-contact-form-btn');
    if (navbarFormTrigger) navbarFormTrigger.click();
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 overflow-x-hidden relative font-sans selection:bg-yellow-500/30">
      <SEO title={`${pageTitle} - IHO Digital`} description={pageDescription} canonical="/industries/real-estate" />

      {/* --- 1. LIVE ANIMATED MERGE BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#090a15] to-[#050510]" />
        <motion.div 
          animate={{ x: [0, 40, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.2]" 
          style={{ background: `radial-gradient(circle, #eab308 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
        />
        <motion.div 
          animate={{ x: [0, -50, 40, 0], y: [0, 60, -20, 0], scale: [1, 0.95, 1.05, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[0%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15]" 
          style={{ background: `radial-gradient(circle, #facc15 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
        />
      </div>

      {/* --- TOP HEADER (With Working Dropdown) --- */}
      <div className="relative z-50 pt-28 pb-8 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link to="/industries" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-300" />
            </div>
            <span className="text-xs font-bold tracking-[0.15em] text-slate-300 uppercase">Back to Industries</span>
          </Link>

          {/* Working Dropdown Wrapper */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-[#1e1b4b]/40 hover:bg-[#1e1b4b]/60 transition-colors backdrop-blur-md"
            >
              <Grid className="w-4 h-4 text-slate-300" />
              <span className="text-sm font-semibold text-slate-200">Switch Industry</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: isDropdownOpen ? 1 : 0, y: isDropdownOpen ? 0 : -10, scale: isDropdownOpen ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-3 w-56 rounded-xl bg-[#0b0c16] border border-yellow-500/20 shadow-[0_15px_40px_-10px_rgba(234,179,8,0.5)] overflow-hidden z-50 ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="py-2 flex flex-col bg-white/5 backdrop-blur-xl">
                <Link to="/industries/healthcare" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-l-2 border-transparent hover:border-yellow-500">Healthcare</Link>
                <Link to="/industries/automotive" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-l-2 border-transparent hover:border-yellow-500">Automotive</Link>
                <Link to="/industries/ecommerce" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-l-2 border-transparent hover:border-yellow-500">E-Commerce</Link>
                <Link to="/industries/education" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-l-2 border-transparent hover:border-yellow-500">Education</Link>
                <Link to="/industries/technology" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors border-l-2 border-transparent hover:border-yellow-500">Technology</Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- 2. HERO SECTION --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_#fde047]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">{pageCategory}</span>
          </div>
        </motion.div>

        <TiltHeading text={pageTitle} theme={theme} />

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-300 font-light tracking-wide mt-6"
        >
          {pageDescription}
        </motion.p>
      </div>

      {/* --- MAIN FULL WIDTH TEXT CONTENT --- */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ContentParser blocks={allBlocks} theme={theme} />
          </motion.div>
        </div>
      </div>

      {/* --- 3. THE TWO SPECIFIC BOTTOM CARDS --- */}
      <div className="relative z-20 px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Industry Leaders */}
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 lg:p-14 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-15px_rgba(234,179,8,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-80" />
            
            <div className="w-20 h-20 rounded-3xl bg-[#16182d] border border-yellow-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)] mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Home className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_#fde047]" />
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-6 relative z-10 drop-shadow-md">Industry Leaders</h3>
            <p className="text-slate-400 leading-relaxed max-w-sm relative z-10">
              Specialized digital strategies designed to maximize growth in the Real Estate sector.
            </p>
          </div>

          {/* Card 2: Key Solutions */}
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 flex flex-col shadow-[0_0_50px_-15px_rgba(234,179,8,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/10 to-transparent opacity-80" />
            
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#16182d] border border-yellow-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Star className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_#fde047]" />
              </div>
              <h3 className="text-2xl font-extrabold text-white drop-shadow-md">Key Solutions</h3>
            </div>
            
            <hr className="border-white/10 mb-8 relative z-10" />
            
            <div className="space-y-6 mb-10 flex-1 relative z-10">
              {pageFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                     <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <span className="text-[15px] font-semibold text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={openContactModal} 
              className="w-full py-4 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-white font-bold text-lg transition-colors shadow-[0_10px_30px_-10px_rgba(234,179,8,0.6)] relative z-10"
            >
              Get Custom Quote
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RealEstatePage;
