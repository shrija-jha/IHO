// src/pages/LegalPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SEO from "../components/SEO"; 

// --- SHARED CONTENT ---
const sharedContent = (
  <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
    <p>We believe that every business is unique, and so are its digital needs. That’s why we take a personalized approach to every project. Our process begins with understanding your business goals, target audience, and challenges. We then develop a customized strategy designed to deliver measurable results. Whether you are a startup seeking to build your online presence, a growing company aiming to optimize operations, or an established enterprise looking for digital transformation, IHO Digital provides scalable solutions tailored to your specific requirements.</p>
    
    <h4 className="text-white font-bold text-lg mt-4">Our Services</h4>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Web & App Development:</strong> We create responsive, user-friendly websites and mobile applications designed to enhance user experience, boost engagement, and increase conversions.</li>
      <li><strong>Digital Marketing:</strong> Our digital marketing strategies, including social media management, content marketing, SEO, and PPC campaigns, help brands grow, connect with audiences, and achieve tangible results.</li>
      <li><strong>Branding & Design:</strong> We craft visually compelling brand identities that reflect your company’s vision and resonate with your audience.</li>
      <li><strong>IT Solutions & Consulting:</strong> From cloud services to software solutions, we provide expert guidance and technical support to streamline your operations and improve efficiency.</li>
    </ul>

    <h4 className="text-white font-bold text-lg mt-4">Why Choose IHO Digital</h4>
    <p>Customer satisfaction is the cornerstone of our business. We pride ourselves on delivering high-quality, reliable, and innovative solutions that drive real results. Our commitment to excellence, combined with transparency, integrity, and professionalism, ensures a seamless experience for our clients.</p>
    <p>Innovation is at the heart of everything we do. We stay ahead of industry trends, leveraging the latest tools, technologies, and strategies to deliver forward-thinking solutions. Our team continuously refines its skills, ensuring that we provide solutions that are not only effective today but also future-ready.</p>

    <h4 className="text-white font-bold text-lg mt-4">Our Mission & Vision</h4>
    <p>Our mission is to empower businesses with the right digital solutions to unlock their full potential. We aim to create meaningful impact for our clients by enhancing their digital presence, increasing efficiency, and enabling growth. Our vision is to be a leading digital company recognized for innovation, excellence, and exceptional client service.</p>

    <h4 className="text-white font-bold text-lg mt-4">Partner with Us</h4>
    <p>At IHO Digital, we believe in building long-term partnerships based on trust, collaboration, and mutual growth. When you choose us, you’re not just hiring a digital service provider—you’re gaining a dedicated partner committed to your success. Let us help you navigate the digital world, transform your business, and achieve sustainable growth.</p>
    <p>Experience the difference of working with a digital company that is passionate, innovative, and client-focused. With IHO Digital, your vision becomes reality, and the possibilities are limitless.</p>
  </div>
);

// --- LEGAL CONTENT DATA ---
const legalContent = {
  terms: { title: "Terms of Service", text: sharedContent },
  privacy: { title: "Privacy Policy", text: sharedContent },
  cookies: { title: "Cookie Policy", text: sharedContent },
  help: { title: "Help Center", text: sharedContent },
  faq: { title: "Frequently Asked Questions", text: sharedContent }
};

const LegalPage = () => {
  // Grab the specific page name from the URL
  const { slug } = useParams();
  const navigate = useNavigate();
  const content = legalContent[slug];

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!content) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Page Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative font-sans">
      <SEO title={`${content.title} - IHO Digital`} description={`Read our ${content.title}`} />

      {/* Decorative background to look like a modal backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      {/* THE "MODAL" CARD (Centered on screen) */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
           <h1 className="text-xl font-bold text-white">{content.title}</h1>
           <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors" title="Go Back">
              <X size={24} />
           </button>
        </div>
        
        {/* Scrollable text area */}
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
           {content.text}
        </div>
        
        <div className="p-6 border-t border-white/10 bg-white/5 text-right">
           <button 
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
           >
              Go Back
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPage;