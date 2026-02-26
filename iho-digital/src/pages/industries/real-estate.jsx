import React, { useEffect, useRef, useState, useMemo } from 'react';
import SEO from "../../components/SEO.jsx";
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, 
  Rocket, Home, Layers, ArrowRight, Mail as MailIcon
} from 'lucide-react';
import { Building2 } from 'lucide-react';

// --- 1. THEME PALETTE ---
const themePalette = {
  amber: { 
    gradient: "from-amber-950 via-slate-900 to-black", 
    accent: "bg-amber-600", 
    text: "text-amber-400", 
    border: "border-amber-500/30",
    glow: "bg-amber-500/20",
    hex: "#f59e0b",
    titleGradient: "from-amber-300 via-amber-500 to-orange-400"
  }
};

const theme = themePalette.amber;

// --- 2. TILT HEADING COMPONENT ---
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
      <motion.h2 
        style={{ transform: "translateZ(30px)" }}
        className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} uppercase leading-tight drop-shadow-2xl text-center tracking-tight`}
      >
        {text}
      </motion.h2>
      <div className={`absolute inset-0 ${theme.glow} blur-[120px] opacity-60 -z-10 animate-pulse`} />
      <div className={`absolute inset-0 ${theme.glow} blur-[200px] opacity-30 -z-20`} />
    </motion.div>
  );
};

// --- 3. CONTENT PARSER ---
const ContentParser = ({ blocks, theme }) => {
  if (!blocks || blocks.length === 0) return null;

  const isShortFeatureHeading = (line, nextLine) => {
    const trimmed = line.trim();
    const words = trimmed.split(/\s+/);
    if (
      words.length >= 1 && 
      words.length <= 3 && 
      !trimmed.endsWith('.') && 
      !trimmed.endsWith(',') &&
      !trimmed.endsWith(';') &&
      !trimmed.endsWith('?') &&
      !trimmed.endsWith(':') &&
      nextLine && 
      nextLine.trim().length > 0 &&
      !nextLine.trim().startsWith('-') &&
      !(nextLine.trim().split(/\s+/).length <= 5 && !nextLine.trim().endsWith('.'))
    ) {
      return true;
    }
    return false;
  };

  const isSimpleListSequence = (lines, startIndex) => {
    if (startIndex >= lines.length) return false;
    let listItemCount = 0;
    for (let i = startIndex; i < Math.min(startIndex + 5, lines.length); i++) {
      const line = lines[i].trim();
      const words = line.split(/\s+/);
      if (words.length <= 6 && !line.endsWith('.') && !line.endsWith('?') && !line.endsWith(':')) {
        listItemCount++;
      } else {
        break;
      }
    }
    return listItemCount >= 2;
  };

  const isSectionHeading = (line) => {
    const trimmed = line.trim();
    return trimmed.endsWith('?') || trimmed.endsWith(':');
  };

  const isCompanySubheading = (line, isFirstInBlock) => {
    const trimmed = line.trim();
    const words = trimmed.split(/\s+/);
    if (
      isFirstInBlock &&
      (trimmed.includes('– IHO Digital') || 
       trimmed.includes('- IHO Digital') ||
       (trimmed.includes('Company') && words.length < 20 && !trimmed.endsWith('.')) ||
       (trimmed.includes('Services') && words.length < 20 && !trimmed.endsWith('.')) ||
       (trimmed.includes('Solutions') && words.length < 20 && !trimmed.endsWith('.')))
    ) {
      return true;
    }
    return false;
  };

  const processedBlocks = [];
  blocks.forEach((block, blockIndex) => {
    if (block.includes('•') || block.trim().startsWith('-')) {
      processedBlocks.push({ type: 'bullets', content: block });
      return;
    }

    const lines = block.split('\n').filter(line => line.trim().length > 0);
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i].trim();
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : null;
      const isFirstLine = blockIndex === 0 && i === 0;
      
      if (isCompanySubheading(line, isFirstLine)) {
        processedBlocks.push({ type: 'company_subheading', content: line });
        i++;
      }
      else if (isSectionHeading(line)) {
        if (isSimpleListSequence(lines, i + 1)) {
          const listItems = [line];
          i++;
          while (i < lines.length) {
            const itemLine = lines[i].trim();
            const words = itemLine.split(/\s+/);
            if (words.length <= 6 && !itemLine.endsWith('.') && !itemLine.endsWith('?') && !itemLine.endsWith(':')) {
              listItems.push(itemLine);
              i++;
            } else {
              break;
            }
          }
          processedBlocks.push({ type: 'simple_list', heading: listItems[0], items: listItems.slice(1) });
        } else {
          processedBlocks.push({ type: 'section_heading', content: line });
          i++;
        }
      }
      else if (isShortFeatureHeading(line, nextLine)) {
        processedBlocks.push({ 
          type: 'feature_card', 
          heading: line,
          content: nextLine
        });
        i += 2;
      }
      else {
        const lastItem = processedBlocks[processedBlocks.length - 1];
        if (lastItem && lastItem.type === 'paragraph') {
          lastItem.content += ' ' + line;
        } else {
          processedBlocks.push({ type: 'paragraph', content: line });
        }
        i++;
      }
    }
  });

  return (
    <div className="space-y-8 text-slate-300">
      {processedBlocks.map((item, index) => {
        if (item.type === 'company_subheading') {
          return (
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={index}
              className={`text-2xl md:text-3xl font-extrabold ${theme.text} mb-6 leading-tight`}
            >
              {item.content}
            </motion.h2>
          );
        }

        if (item.type === 'bullets') {
          const items = item.content.split(/\n|•/).filter(line => line.trim().length > 0);
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((line, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    className={`flex items-start gap-3 text-base text-slate-300 bg-slate-900/40 p-5 rounded-xl border border-white/5 shadow-lg backdrop-blur-sm group hover:border-amber-500/30 transition-all duration-300`}
                  >
                    <div className={`mt-1 p-1 rounded-full bg-white/5 ${theme.text}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="leading-relaxed group-hover:text-slate-200 transition-colors">{line.replace(/^-/, '').trim()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
        
        if (item.type === 'simple_list') {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-8"
            >
              <h3 className={`text-2xl md:text-3xl font-extrabold ${theme.text} mb-6`}>
                {item.heading}
              </h3>
              <ul className="space-y-3 ml-6">
                {item.items.map((listItem, idx) => (
                  <li key={idx} className="text-base md:text-lg text-slate-300/90 flex items-start gap-3">
                    <span className={`mt-2 w-2 h-2 rounded-full ${theme.accent} flex-shrink-0`} />
                    <span className="leading-relaxed">{listItem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        }

        if (item.type === 'section_heading') {
          return (
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              key={index} 
              className={`text-2xl md:text-3xl font-extrabold ${theme.text} mt-14 mb-6 pb-3 border-b border-white/5 inline-block`}
            >
              {item.content}
            </motion.h3>
          );
        }

        if (item.type === 'feature_card') {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-amber-500/30 shadow-lg backdrop-blur-sm group transition-all duration-300 my-6`}
            >
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${theme.hex}60, transparent 70%)` }}
              />
              <div className="relative z-10">
                <h4 className={`text-xl md:text-2xl font-bold ${theme.text} mb-3 flex items-center gap-3`}>
                  <span 
                    className={`w-1.5 h-1.5 rounded-full ${theme.accent}`}
                    style={{ boxShadow: `0 0 10px ${theme.hex}` }}
                  />
                  {item.heading}
                </h4>
                <p className="text-base text-slate-300/90 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </motion.div>
          );
        }

        return (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            key={index} 
            className="text-base md:text-lg leading-relaxed text-slate-300/90"
          >
            {item.content}
          </motion.p>
        );
      })}
    </div>
  );
};

// --- 4. MAIN PAGE COMPONENT ---
const RealEstatePage = () => {
  const pageTitle = "Real Estate";
  const pageCategory = "Industries";
  const pageImage = "/img/Services/istockphoto-1209989349-612x612.jpg";
  const pageDescription = "Transform real estate business with digital marketing";
  const pageFullDescription = `Best Real Estate Digital Marketing Services – IHO Digital
The real estate industry is highly competitive, and property buyers, sellers, and investors now search online for properties, agents, and developers. IHO Digital provides result-driven real estate digital marketing services in Noida and Delhi NCR, helping real estate businesses increase visibility, generate quality leads, and close more deals through powerful online strategies.
Whether you run a real estate agency, property development company, individual agent, or property management firm, our tailored marketing solutions help you connect with serious property buyers and renters at the right time. If you are searching for the best real estate digital marketing agency near me, IHO Digital delivers measurable growth with data-driven campaigns.
Why Digital Marketing is Essential for Real Estate Business
Property seekers search online before buying, selling, or renting properties. A strong digital presence ensures your real estate business appears when potential clients search for properties or real estate services.
Key reasons real estate businesses need digital marketing:
Increase online visibility in competitive property markets

Generate qualified property buyer and seller leads

Build trust and credibility through professional branding

Showcase property listings to targeted audiences

Reach local property seekers in Noida, Delhi NCR, and nearby areas

Improve engagement through social media platforms

With professional marketing strategies, your real estate business can attract more clients and close more deals.
Our Real Estate Digital Marketing Services
As a leading real estate marketing agency in Noida & Delhi NCR, IHO Digital offers comprehensive solutions tailored to real estate businesses.
1. Real Estate SEO Services
We optimize your website to rank higher on Google for relevant keywords like:
best properties in Noida

real estate agents near me in Delhi NCR

apartments for sale in Delhi NCR

real estate marketing agency near me

Our SEO strategies include keyword research, technical optimization, content creation, and local SEO to improve rankings and traffic.
2. Google Ads & Paid Advertising
Promote property listings with targeted paid ads. Our Google Ads campaigns help:
Generate high-quality buyer and renter inquiries

Increase property viewings and site visits

Target specific locations like Noida and Delhi NCR

Showcase new project launches and developments

3. Social Media Marketing
We manage social media platforms like Facebook, Instagram, and YouTube to:
Showcase property listings and virtual tours

Share client testimonials and success stories

Engage with potential buyers and investors

Increase brand awareness in the property market

4. Content Marketing & Property Blogs
Quality content builds authority and trust in the real estate market. We create:
Property market updates and trends

Neighborhood guides and location features

Investment advice and property tips

SEO-friendly landing pages for listings

5. Website Design & Lead Generation
We design user-friendly real estate websites that:
Showcase property listings with high-quality images

Improve lead capture through inquiry forms

Enhance mobile experience for property seekers

Increase conversion rates

6. Lead Generation & Remarketing
Our remarketing campaigns help reconnect with users who visited your property listings but didn't make an inquiry, improving conversion and deal closure rates.
Types of Real Estate Businesses We Serve
IHO Digital provides specialized marketing solutions for:
Real Estate Agencies & Brokers

Property Developers & Builders

Individual Real Estate Agents

Property Management Companies

Commercial Real Estate Firms

Residential Property Consultants

Landlords & Property Investors

Benefits of Digital Marketing for Real Estate Industry
Partnering with a professional real estate marketing company in Delhi NCR provides:
Higher Search Engine Rankings for Property Keywords

Increased Property Inquiries & Client Leads

Stronger Brand Reputation in Local Markets

Local Visibility in Noida & Delhi NCR

Better Engagement with Buyers & Sellers

Measurable Marketing ROI

With targeted campaigns, real estate businesses can attract serious clients while maximizing marketing budgets.
Why Choose IHO Digital – Real Estate Marketing Agency Near You
IHO Digital is a trusted digital marketing company for real estate sector in Noida and Delhi NCR with proven expertise in generating leads and building strong property brands.
What makes us the best choice:
Deep Understanding of Real Estate Industry Trends

Local SEO Expertise for Delhi NCR Market

Data-Driven Marketing Strategies

Creative Content & Campaign Management

Transparent Reporting & Analytics

Customized Marketing Plans for Real Estate Businesses

Our team focuses on long-term growth, helping real estate businesses stand out in a highly competitive online property market.
Our Marketing Process for Real Estate Businesses
Understand your real estate goals and target audience

Conduct in-depth keyword and competitor research

Develop customized marketing strategies

Launch SEO, social media, and paid campaigns

Monitor performance and optimize regularly

Provide detailed reports and continuous improvements

This structured approach ensures consistent results and improved client engagement.
Local SEO for Real Estate Businesses in Noida & Delhi NCR
Local SEO is essential for attracting property seekers searching for real estate services near their location. We optimize:
Google Business Profile listings for real estate

Location-based keywords for property searches

Local citations and directories

Reviews and reputation management

This helps your real estate business appear in "near me" searches and local Google results.
Property Types We Promote
Residential Apartments & Flats

Commercial Buildings & Offices

Luxury Villas & Penthouses

Plots & Land Development

Retail Spaces & Shopping Complex

Industrial Properties

Partner with the Best Real Estate Digital Marketing Agency in Noida & Delhi NCR
If you are looking for the best real estate digital marketing services near me, IHO Digital helps real estate businesses increase visibility, generate more property inquiries, and close more deals through effective online strategies.
Contact IHO Digital today to discuss your real estate marketing goals and start your digital growth journey.`;

  const pageFeatures = [
    "Real Estate Websites",
    "Property Listing Pages", 
    "Lead Generation",
    "Real Estate SEO",
    "Virtual Property Tours",
    "Real Estate Social Media Marketing"
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fullText = pageFullDescription || "";
  const allBlocks = fullText.split('\n\n');
  
  let introBlocks = [];
  let mainBodyBlocks = [];
  
  const firstBlockLength = allBlocks[0] ? allBlocks[0].length : 0;
  const introCount = firstBlockLength < 300 && allBlocks.length > 1 ? 2 : 1;
  
  introBlocks = allBlocks.slice(0, introCount);
  mainBodyBlocks = allBlocks.slice(introCount);

  const openContactModal = () => {
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
    const navbarFormTrigger = document.getElementById('open-contact-form-btn');
    if (navbarFormTrigger) navbarFormTrigger.click();
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 overflow-x-hidden selection:bg-white/20 selection:text-white">
      <SEO 
        title={`${pageTitle} - IHO Digital`} 
        description={pageDescription}
        canonical="/industries/real-estate"
      />

      {/* --- BREADCRUMB HEADER --- */}
      <div className={`pt-28 pb-6 border-b border-white/5 bg-gradient-to-r ${theme.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-20 -left-32 w-[900px] h-[900px] rounded-full blur-[180px] opacity-90 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}95 0%, ${theme.hex}50 40%, transparent 70%)`
            }} 
          />
          <div 
            className="absolute top-0 -left-20 w-[800px] h-[800px] rounded-full blur-[160px] opacity-75"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}85 0%, ${theme.hex}40 50%, transparent 70%)`,
              animationDelay: '0.7s'
            }} 
          />
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-60"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}70 0%, ${theme.hex}30 50%, transparent 70%)`
            }} 
          />
        </div>
        <div className="container mx-auto max-w-7xl px-6 flex items-center gap-2 text-sm opacity-80 relative z-10">
          <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors"><Home className="w-3.5 h-3.5" /> Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/industries" className={`${theme.text} hover:text-white transition-colors`}>{pageCategory}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200">{pageTitle}</span>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="bg-gradient-to-b from-slate-900 via-black to-slate-950 py-16 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 -left-32 w-[1200px] h-[1200px] rounded-full blur-[200px] opacity-80 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}90 0%, ${theme.hex}40 40%, transparent 70%)`
            }} 
          />
          <div 
            className="absolute top-[300px] -left-20 w-[1000px] h-[1000px] rounded-full blur-[180px] opacity-70"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}80 0%, ${theme.hex}30 50%, transparent 70%)`,
              animationDelay: '1s'
            }} 
          />
          <div 
            className="absolute top-[600px] -left-24 w-[900px] h-[900px] rounded-full blur-[160px] opacity-65 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}70 0%, ${theme.hex}25 50%, transparent 70%)`,
              animationDelay: '0.5s'
            }} 
          />
          <div 
            className="absolute top-[900px] -left-16 w-[800px] h-[800px] rounded-full blur-[150px] opacity-60"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}60 0%, ${theme.hex}20 50%, transparent 70%)`
            }} 
          />
          <div 
            className="absolute bottom-0 -left-20 w-[700px] h-[700px] rounded-full blur-[140px] opacity-55 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.hex}50 0%, ${theme.hex}15 50%, transparent 70%)`,
              animationDelay: '1.5s'
            }} 
          />
        </div>

        {/* CONTAINER 1: HEADER & INTRO */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center relative"
          >
            <div 
              className="absolute inset-0 rounded-full blur-[30px] opacity-70 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${theme.hex}80 0%, ${theme.hex}40 50%, transparent 100%)`
              }}
            />
            <div 
              className="absolute inset-0 rounded-full blur-[20px] opacity-60"
              style={{ 
                background: `radial-gradient(circle, ${theme.hex}70 0%, ${theme.hex}30 50%, transparent 100%)`,
                animationDelay: '0.5s'
              }}
            />
            <div 
              className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border ${theme.border}`}
              style={{
                boxShadow: `0 0 30px ${theme.hex}60, 0 0 15px ${theme.hex}40, inset 0 0 20px ${theme.hex}10`
              }}
            >
              <Building2 className={`${theme.text}`} />
              <span className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}>{pageCategory}</span>
            </div>
          </motion.div>

          <div className="mb-16 flex justify-center text-center">
            <TiltHeading text={pageTitle} theme={theme} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-slate-300 leading-relaxed">
               <ContentParser blocks={introBlocks} theme={theme} />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative w-full group perspective-1000">
              <div className={`p-3 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl backdrop-blur-sm ${theme.glow} shadow-[0_0_40px_${theme.hex}40]`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  className="relative rounded-xl overflow-hidden aspect-video cursor-zoom-in" 
                >
                  <img src={pageImage} alt={pageTitle} className="w-full h-full object-cover" />
                  <div className={`${theme.glow} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTAINER 2: BODY CONTENT */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="w-full" 
          >
            <ContentParser blocks={mainBodyBlocks} theme={theme} />
          </motion.div>
        </div>

      </div>

      {/* --- FEATURES SECTION --- */}
      {pageFeatures.length > 0 && (
        <div className="bg-black py-20 border-t border-white/5 relative">
          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center mb-14">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Features & Benefits</h3>
              <div className={`h-1.5 w-24 ${theme.accent} rounded-full mx-auto shadow-[0_0_20px_${theme.hex}]`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageFeatures.map((feature, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8, boxShadow: `0 10px 30px -10px ${theme.hex}30` }} 
                  className={`bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 flex items-start gap-4 backdrop-blur-md group`}
                >
                  <div className={`p-3 rounded-xl bg-white/5 ${theme.text} group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-slate-300 font-medium leading-relaxed text-lg group-hover:text-white transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- CALL TO ACTION --- */}
      <div className="py-24 bg-gradient-to-b from-slate-950 to-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/3 left-1/3 w-[700px] h-[700px] ${theme.glow} rounded-full blur-[140px] opacity-40 animate-pulse`} />
          <div className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] ${theme.glow} rounded-full blur-[100px] opacity-30`} />
          <div className={`absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] ${theme.glow} rounded-full blur-[160px] opacity-25`} />
          <div className={`absolute top-1/2 -left-20 w-[600px] h-[600px] ${theme.glow} rounded-full blur-[150px] opacity-35`} />
        </div>
        <div className="container mx-auto max-w-7xl px-6 relative z-10 text-center">
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className={`inline-flex p-6 bg-white/5 rounded-full mb-8 ring-1 ring-white/10 shadow-[0_0_30px_${theme.hex}40] backdrop-blur-xl`}>
            <Rocket className={`${theme.text}`} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient}`}>Scale?</span></h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={openContactModal} className={`px-10 py-4 ${theme.accent} text-white font-bold text-lg rounded-xl shadow-[0_0_20px_${theme.hex}60] hover:shadow-[0_0_40px_${theme.hex}80] flex items-center gap-3 hover:-translate-y-1 transition-all`}>
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={openContactModal} className="px-10 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold text-lg rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-all">
              <MailIcon className="w-5 h-5" /> Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* --- RELATED INDUSTRIES --- */}
      <div className="py-24 bg-black container mx-auto max-w-7xl px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] ${theme.glow} rounded-full blur-[100px] opacity-25`} />
          <div className={`absolute bottom-1/4 right-1/4 w-[300px] h-[300px] ${theme.glow} rounded-full blur-[80px] opacity-20`} />
          <div className={`absolute top-1/2 -left-10 w-[500px] h-[500px] ${theme.glow} rounded-full blur-[120px] opacity-30`} />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-10">More Industry Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/industries/healthcare" className="group block h-full">
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl h-full flex flex-col hover:-translate-y-2 backdrop-blur-sm">
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img src="/img/Services/istockphoto-1167624088-612x612.jpg" alt="Healthcare" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                    <Layers className={`${theme.text}`} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text} transition-colors`}>Healthcare</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4">Modernize healthcare delivery with technology</p>
                  <span className={`${theme.text} text-sm font-bold flex items-center gap-2 mt-auto uppercase`}>Learn More <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
            <Link to="/industries/technology" className="group block h-full">
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl h-full flex flex-col hover:-translate-y-2 backdrop-blur-sm">
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img src="/img/Services/imgi_10_saas-development.webp" alt="Technology" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                    <Layers className={`${theme.text}`} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text} transition-colors`}>Technology</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4">Drive innovation with cutting-edge digital solutions</p>
                  <span className={`${theme.text} text-sm font-bold flex items-center gap-2 mt-auto uppercase`}>Learn More <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
            <Link to="/industries/education" className="group block h-full">
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl h-full flex flex-col hover:-translate-y-2 backdrop-blur-sm">
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img src="/img/Services/istockphoto-2218180281-612x612.jpg" alt="Education" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                    <Layers className={`${theme.text}`} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text} transition-colors`}>Education</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4">Transform learning experiences with digital solutions</p>
                  <span className={`${theme.text} text-sm font-bold flex items-center gap-2 mt-auto uppercase`}>Learn More <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
            <Link to="/industries/ecommerce" className="group block h-full">
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl h-full flex flex-col hover:-translate-y-2 backdrop-blur-sm">
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img src="/img/Services/istockphoto-542107030-612x612.webp" alt="E-commerce" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                    <Layers className={`${theme.text}`} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text} transition-colors`}>E-commerce</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4">Boost online sales with powerful e-commerce platforms</p>
                  <span className={`${theme.text} text-sm font-bold flex items-center gap-2 mt-auto uppercase`}>Learn More <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstatePage;
