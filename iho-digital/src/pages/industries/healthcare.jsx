import React, { useEffect, useRef, useState } from 'react';
import SEO from "../../components/SEO.jsx";
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, 
  Rocket, Home, ArrowRight, Mail as MailIcon,
  Sparkles, Car, Star, Grid, ArrowLeft, ChevronDown
} from 'lucide-react';

// --- 1. THEME PALETTE ---
const themePalette = {
  indigo: { 
    gradient: "from-[#050510] via-[#0a0a1a] to-[#050510]", 
    accent: "bg-[#5c4fff]", 
    text: "text-indigo-400", 
    border: "border-indigo-500/20",
    hex: "#6366f1",
    titleGradient: "from-[#818cf8] via-[#a5b4fc] to-[#e0e7ff]"
  }
};

const theme = themePalette.indigo;

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
        style={{
          transform: "translateZ(30px)",
          dropShadow: "0px 10px 30px rgba(99,102,241,0.5)"
        }}
        className={`text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} tracking-tight`}
      >
        {text}
      </motion.h1>
      {/* Heavy glowing effects matching the screenshot */}
      <div className={`absolute inset-0 bg-indigo-500/30 blur-[100px] opacity-80 -z-10 animate-pulse`} />
      <div className={`absolute inset-0 bg-purple-500/20 blur-[150px] opacity-50 -z-20`} />
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
          return <h3 key={index} className={`text-2xl md:text-3xl font-extrabold ${theme.text} mt-12 mb-4 drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]`}>{item.content}</h3>;
        }
        if (item.type === 'feature_card') {
          return (
            <div key={index} className="my-6 p-6 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.1)] backdrop-blur-md">
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
const HealthcarePage = () => {
  const pageTitle = "Healthcare";
  const pageCategory = "HEALTHCARE SOLUTIONS";
  const pageDescription = "Modernize healthcare delivery with technology";

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

  const pageFullDescription = `Healthcare Digital Marketing Services in Delhi NCR & Noida - IHO Digital
In today's digital era, patients search online before choosing hospitals, clinics, or healthcare services. IHO Digital offers advanced healthcare digital marketing and website solutions in Delhi NCR and Noida to help medical professionals improve online visibility, attract local patients, and build trust.

Whether you run a clinic, diagnostic center, hospital, wellness brand, or medical startup, our expert team delivers customized healthcare marketing strategies focused on patient engagement, local search rankings, and conversion growth. As a leading healthcare digital marketing agency near you, we combine technology, SEO, and creative content to help healthcare brands dominate Google search results.

Why Healthcare Businesses Need Digital Marketing in Delhi NCR:
The healthcare industry is becoming more competitive, especially in metro cities like Delhi and Noida. Patients rely on Google search, social media, and online reviews to make healthcare decisions. With the right digital presence, your clinic or hospital can attract targeted patients from nearby locations.

Our healthcare digital solutions help you:
- Increase online appointment bookings
- Rank higher in local searches like "doctor near me" or "best clinic in Noida"
- Improve patient trust through professional branding
- Generate quality leads from Delhi NCR audiences
- Build a strong digital reputation for your healthcare brand

Our Healthcare Digital Marketing & Web Services:
IHO Digital provides a full range of healthcare-focused digital services tailored to medical businesses in Delhi NCR and Noida.

1. Healthcare Website Design & Development
We design responsive, mobile-friendly healthcare websites that build trust and provide seamless user experiences. From hospital portals to doctor profile websites, our designs are fast, secure, and SEO-optimized for local searches.

2. Local SEO for Doctors & Clinics
Our Local SEO strategies help your healthcare practice rank on Google Maps and local searches such as "best dentist near me in Delhi NCR" or "top hospital in Noida." We optimize your Google Business Profile, local keywords, and online listings to increase patient visits.

3. Healthcare Content Marketing
Educational blog posts, treatment guides, and health awareness content help build authority and trust. We create SEO-friendly healthcare content that improves search rankings and attracts organic traffic from patients searching online.

4. Google Ads for Healthcare Services
We run high-converting Google Ads campaigns targeting local patients in Delhi NCR and Noida. Our strategies focus on relevant medical keywords to increase appointment bookings and maximize ROI.

5. Social Media Marketing for Healthcare Brands
We manage your Facebook, Instagram, and LinkedIn presence with engaging health content, patient success stories, and awareness campaigns to boost brand visibility and credibility.

6. Performance Tracking & Analytics
Using tools like Google Analytics and conversion tracking, we monitor patient inquiries, website traffic, and marketing performance to continuously improve your healthcare campaigns.

Benefits of Choosing IHO Digital for Healthcare Marketing:
- Experienced healthcare digital marketing team in Delhi NCR
- Customized marketing strategies for hospitals & clinics
- Local SEO expertise for Noida and Delhi healthcare businesses
- Mobile-friendly website development
- Data-driven marketing campaigns
- Transparent reporting and analytics

Our goal is to help healthcare providers grow digitally while maintaining professionalism, trust, and compliance with industry standards.

Healthcare Businesses We Serve:
- Hospitals & Multispecialty Clinics
- Dentists & Dental Clinics
- Dermatologists & Cosmetic Clinics
- Diagnostic Centers & Labs
- Physiotherapy & Rehabilitation Centers
- Wellness & Ayurveda Clinics
- Medical Startups & Healthcare Platforms

Whether you are a new clinic startup or an established healthcare brand in Delhi NCR, IHO Digital provides scalable digital solutions tailored to your needs.

Why IHO Digital is the Best Healthcare Digital Agency Near You?

At IHO Digital, we understand the sensitivity and professionalism required in healthcare marketing. Our approach focuses on patient trust, accurate information, and ethical promotion while delivering measurable growth.

We combine modern design, advanced SEO techniques, and targeted advertising strategies to ensure your healthcare business stands out in the highly competitive Delhi NCR market. From building a strong online presence to generating real patient leads, we help healthcare brands achieve long-term digital success.

Get Started with Healthcare Digital Marketing Today:

If you are searching for the best healthcare digital marketing agency in Delhi NCR or Noida, IHO Digital is your trusted partner. Let us help you build a powerful online presence, attract more local patients, and grow your healthcare practice with smart digital solutions.

Contact IHO Digital today to discuss your healthcare marketing goals and start your digital growth journey.`;

  const pageFeatures = [
    "Patient Management Systems",
    "Telemedicine Platforms",
    "Healthcare SEO & Online Presence",
    "Medical Practice Websites"
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const allBlocks = pageFullDescription.split('\n\n');

  const openContactModal = () => {
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
    const navbarFormTrigger = document.getElementById('open-contact-form-btn');
    if (navbarFormTrigger) navbarFormTrigger.click();
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 overflow-x-hidden relative font-sans selection:bg-indigo-500/30">
      <SEO title={`${pageTitle} - IHO Digital`} description={pageDescription} canonical="/industries/healthcare" />

      {/* --- 1. LIVE ANIMATED MERGE BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#090a15] to-[#050510]" />
        <motion.div 
          animate={{ x: [0, 40, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.2]" 
          style={{ background: `radial-gradient(circle, #4f46e5 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
        />
        <motion.div 
          animate={{ x: [0, -50, 40, 0], y: [0, 60, -20, 0], scale: [1, 0.95, 1.05, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[0%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15]" 
          style={{ background: `radial-gradient(circle, #6366f1 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
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
              className={`absolute right-0 mt-3 w-56 rounded-xl bg-[#0b0c16] border border-indigo-500/20 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.5)] overflow-hidden z-50 ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="py-2 flex flex-col bg-white/5 backdrop-blur-xl">
                <Link to="/industries/healthcare" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500">Healthcare</Link>
                <Link to="/industries/real-estate" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500">Real Estate</Link>
                <Link to="/industries/ecommerce" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500">E-Commerce</Link>
                <Link to="/industries/education" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500">Education</Link>
                <Link to="/industries/finance" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors border-l-2 border-transparent hover:border-indigo-500">Finance</Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- 2. HERO SECTION --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_#818cf8]" />
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
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 lg:p-14 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-15px_rgba(99,102,241,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-80" />
            
            <div className="w-20 h-20 rounded-3xl bg-[#16182d] border border-indigo-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Car className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_8px_#818cf8]" />
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-6 relative z-10 drop-shadow-md">Industry Leaders</h3>
            <p className="text-slate-400 leading-relaxed max-w-sm relative z-10">
              Specialized digital strategies designed to maximize growth in the Healthcare sector.
            </p>
          </div>

          {/* Card 2: Key Solutions */}
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 flex flex-col shadow-[0_0_50px_-15px_rgba(99,102,241,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-80" />
            
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#16182d] border border-indigo-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Star className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_#818cf8]" />
              </div>
              <h3 className="text-2xl font-extrabold text-white drop-shadow-md">Key Solutions</h3>
            </div>
            
            <hr className="border-white/10 mb-8 relative z-10" />
            
            <div className="space-y-6 mb-10 flex-1 relative z-10">
              {pageFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                     <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-[15px] font-semibold text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={openContactModal} 
              className="w-full py-4 rounded-xl bg-[#5c4fff] hover:bg-[#4f43de] text-white font-bold text-lg transition-colors shadow-[0_10px_30px_-10px_rgba(92,79,255,0.6)] relative z-10"
            >
              Get Custom Quote
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HealthcarePage;
