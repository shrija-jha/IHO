import React, { useEffect, useRef, useState } from 'react';
import SEO from "../../components/SEO.jsx";
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, 
  Rocket, Home, ArrowRight, Mail as MailIcon,
  Sparkles, Star, Grid, ArrowLeft, ChevronDown
} from 'lucide-react';

// --- 1. THEME PALETTE (Warm Orange/Red for Food) ---
const themePalette = {
  orange: { 
    gradient: "from-[#050510] via-[#0a0a1a] to-[#050510]", 
    accent: "bg-[#ea580c]", 
    text: "text-orange-400", 
    border: "border-orange-500/20",
    hex: "#ea580c",
    titleGradient: "from-[#fb923c] via-[#ea580c] to-[#c2410c]"
  }
};

const theme = themePalette.orange;

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
        style={{ transform: "translateZ(30px)", dropShadow: "0px 10px 30px rgba(234,88,12,0.5)" }}
        className={`text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} tracking-tight`}
      >
        {text}
      </motion.h1>
      <div className={`absolute inset-0 bg-orange-500/30 blur-[100px] opacity-80 -z-10 animate-pulse`} />
      <div className={`absolute inset-0 bg-red-500/20 blur-[150px] opacity-50 -z-20`} />
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
          return <h3 key={index} className={`text-2xl md:text-3xl font-extrabold ${theme.text} mt-12 mb-4 drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]`}>{item.content}</h3>;
        }
        if (item.type === 'feature_card') {
          return (
            <div key={index} className="my-6 p-6 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.1)] backdrop-blur-md">
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
const FoodBeveragePage = () => {
  const pageTitle = "Food & Beverage";
  const pageCategory = "FOOD & BEVERAGE SOLUTIONS";
  const pageDescription = "Elevate F&B business with digital presence";

  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageFullDescription = `Grow Your Food & Beverage Business with Smart Digital Solutions
The food and beverage industry is highly competitive and constantly evolving. From restaurants and cafes to cloud kitchens, bakeries, and beverage brands, businesses need a strong digital presence to attract customers and increase orders. At IHO Digital, we provide professional Food & Beverage website development and digital marketing services in Delhi NCR & Noida designed to help brands grow online, increase visibility, and boost sales.

As a food & beverage digital marketing agency near you, we help businesses create engaging websites, improve search engine rankings, and run high-converting advertising campaigns that attract more customers.

Why Digital Marketing Matters for Food & Beverage Brands:
Today's customers search online before deciding where to eat or what to order. Without a strong digital strategy, food businesses miss valuable opportunities. Our digital solutions help restaurants, cafes, and beverage companies connect with customers effectively.

Key benefits include:

- Increase online orders and reservations
- Improve local search visibility
- Build brand awareness and loyalty
- Promote new menus and offers
- Engage customers through social media
- Generate consistent leads and revenue

With the right marketing approach, your business can reach customers exactly when they are searching for food or dining options near them.

Our Food & Beverage Digital Services in Delhi NCR & Noida:

1. Restaurant & Food Website Design
We design modern, responsive, and visually appealing websites that showcase your menu, brand story, and services. Our websites include online ordering systems, reservation forms, location maps, and mobile-friendly layouts to enhance user experience.

2. Local SEO for Restaurants & Food Businesses
Our SEO strategies help your business rank higher on Google for searches like "restaurant near me," "best cafe in Noida," and "food delivery Delhi NCR." We optimize your website, Google Business Profile, and local listings to attract nearby customers.

3. Social Media Marketing for Food Brands
Food businesses thrive on visual content. We create engaging Instagram, Facebook, and YouTube campaigns that showcase your dishes, promotions, and customer experiences to build strong brand engagement.

4. Google Ads & PPC Campaigns
Our PPC advertising services target customers searching for specific cuisines, offers, or dining locations. We create campaigns that drive website visits, calls, and online orders quickly.

5. Online Reputation & Review Management
Customer reviews influence dining decisions. We help manage online reviews, improve ratings, and build trust through professional reputation management strategies.

6. Food Photography & Content Marketing
High-quality visuals and engaging content play a huge role in food marketing. Our team helps create SEO-friendly blogs, menu descriptions, and promotional content that attract and convert customers.

Benefits of Choosing IHO Digital for Food & Beverage Marketing:

- Professional restaurant website development
- Local SEO strategies for Delhi NCR & Noida
- Online ordering & booking integration
- Targeted advertising campaigns
- Creative social media strategies
- Conversion-focused landing pages
- Data-driven performance tracking

We help food brands not only look good online but also generate real business growth.

Food & Beverage Businesses We Work With:

- Restaurants & Fine Dining Chains
- Cafes & Coffee Shops
- Cloud Kitchens & Delivery Brands
- Bakeries & Dessert Shops
- Beverage & Juice Brands
- Catering & Event Food Services
- Fast Food & QSR Brands

Whether you are launching a new restaurant or scaling an established food brand, our customized digital solutions help you grow faster.

Why Choose IHO Digital as Your Food Marketing Partner?
IHO Digital understands the unique challenges of the food and beverage industry. We combine creative design, advanced SEO strategies, and targeted advertising campaigns to help your business stand out in crowded markets.

Our approach focuses on customer experience, mobile optimization, and conversion-driven marketing that turns visitors into loyal customers. We ensure your website loads fast, looks visually appealing, and provides a seamless ordering experience.

Start Growing Your Food & Beverage Business with IHO Digital:
If you are searching for the best food & beverage digital marketing and website development company in Delhi NCR or Noida, IHO Digital provides tailored solutions that help restaurants and food brands succeed online.

From restaurant website design and SEO to social media marketing and PPC advertising, we deliver complete digital growth strategies for your business.

Contact IHO Digital today and take your food & beverage brand to the next level with powerful digital solutions.`;

  const pageFeatures = [
    "Restaurant Website & Ordering Systems",
    "Food Delivery Integration",
    "Menu Management",
    "Social Media Marketing for F&B"
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const allBlocks = pageFullDescription.split('\n\n');

  const openContactModal = () => {
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
    const navbarFormTrigger = document.getElementById('open-contact-form-btn');
    if (navbarFormTrigger) navbarFormTrigger.click();
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 overflow-x-hidden relative font-sans selection:bg-orange-500/30">
      <SEO title={`${pageTitle} - IHO Digital`} description={pageDescription} canonical="/industries/food-beverage" />

      {/* --- 1. LIVE ANIMATED MERGE BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#090a15] to-[#050510]" />
        <motion.div 
          animate={{ x: [0, 40, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.2]" 
          style={{ background: `radial-gradient(circle, #ea580c 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
        />
        <motion.div 
          animate={{ x: [0, -50, 40, 0], y: [0, 60, -20, 0], scale: [1, 0.95, 1.05, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[0%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.15]" 
          style={{ background: `radial-gradient(circle, #c2410c 0%, transparent 70%)`, mixBlendMode: 'screen' }} 
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

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-[#1e1b4b]/40 hover:bg-[#1e1b4b]/60 transition-colors backdrop-blur-md"
            >
              <Grid className="w-4 h-4 text-slate-300" />
              <span className="text-sm font-semibold text-slate-200">Switch Industry</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: isDropdownOpen ? 1 : 0, y: isDropdownOpen ? 0 : -10, scale: isDropdownOpen ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-3 w-56 rounded-xl bg-[#0b0c16] border border-orange-500/20 shadow-[0_15px_40px_-10px_rgba(234,88,12,0.5)] overflow-hidden z-50 ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="py-2 flex flex-col bg-white/5 backdrop-blur-xl">
                <Link to="/industries/healthcare" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-2 border-transparent hover:border-orange-500">Healthcare</Link>
                <Link to="/industries/automotive" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-2 border-transparent hover:border-orange-500">Automotive</Link>
                <Link to="/industries/real-estate" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-2 border-transparent hover:border-orange-500">Real Estate</Link>
                <Link to="/industries/technology" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-2 border-transparent hover:border-orange-500">Technology</Link>
                <Link to="/industries/travel-tourism" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm font-medium text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-2 border-transparent hover:border-orange-500">Travel & Tourism</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- 2. HERO SECTION --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-6 pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-8">
            <Sparkles className="w-4 h-4 text-orange-400 drop-shadow-[0_0_8px_#fb923c]" />
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
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 lg:p-14 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-15px_rgba(234,88,12,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-80" />
            
            <div className="w-20 h-20 rounded-3xl bg-[#16182d] border border-orange-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.4)] mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Rocket className="w-8 h-8 text-orange-400 drop-shadow-[0_0_8px_#fb923c]" />
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-6 relative z-10 drop-shadow-md">Industry Leaders</h3>
            <p className="text-slate-400 leading-relaxed max-w-sm relative z-10">
              Specialized digital strategies designed to maximize growth in the Food & Beverage sector.
            </p>
          </div>

          {/* Card 2: Key Solutions */}
          <div className="bg-[#0b0c16] border border-white/5 rounded-[2rem] p-10 flex flex-col shadow-[0_0_50px_-15px_rgba(234,88,12,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/10 to-transparent opacity-80" />
            
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#16182d] border border-orange-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                <Star className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_#fb923c]" />
              </div>
              <h3 className="text-2xl font-extrabold text-white drop-shadow-md">Key Solutions</h3>
            </div>
            
            <hr className="border-white/10 mb-8 relative z-10" />
            
            <div className="space-y-6 mb-10 flex-1 relative z-10">
              {pageFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30 shadow-[0_0_10px_rgba(234,88,12,0.2)]">
                     <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <span className="text-[15px] font-semibold text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={openContactModal} 
              className="w-full py-4 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-lg transition-colors shadow-[0_10px_30px_-10px_rgba(234,88,12,0.6)] relative z-10"
            >
              Get Custom Quote
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FoodBeveragePage;
