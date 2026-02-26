import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import Navbar from "../components/Navbar";
import LiveBackground from "../components/LiveBackground";
import SEO from "../components/SEO.jsx";

// Import our new components
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import MapComponent from "../components/MapComponent";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-black text-slate-200 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* 1. SEO META TAGS */}
      <SEO 
        title="Contact Us - Start Your Project" 
        description="Ready to grow? Contact IHO Digital for a free consultation. Located in Noida & Gurugram, serving clients globally with 24/7 support."
        url="/contact"
      />
      
      {/* 2. BACKGROUND & NAVBAR */}
      <div className="fixed inset-0 z-0"><LiveBackground /></div>
      <div className="relative z-50"><Navbar /></div>

      {/* 3. MAIN CONTENT */}
      <main className="relative z-10 pt-32 pb-20 container mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> CONTACT US
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Legendary</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Ready to transform your digital presence? We're currently accepting new projects. 
            Drop us a line and our team will get back to you within 24 hours.
          </motion.p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-20">
          
          {/* LEFT: INFO CARDS */}
          <div className="space-y-6 relative">
            <ContactCard 
              icon={Mail} 
              title="Email Us" 
              value="info@ihodigital.com" 
              color="blue" 
              delay={0.1} 
            />
            <ContactCard 
              icon={Phone} 
              title="Call Us" 
              value="+91 8291589861" 
              color="purple" 
              delay={0.2} 
            />
            <ContactCard 
              icon={MapPin} 
              title="Visit HQ" 
              value="402, 4th Floor, H-47 Sector-63 RD,
                     H Block, Noida-201309" 
              color="green" 
              delay={0.3} 
            />
            <ContactCard
              icon={Globe}
              title="24/7 Support"
              value="Always Available"
              color="orange"
              delay={0.4}
            />
          </div>

          {/* RIGHT: CONTACT FORM */}
          <ContactForm />
        </div>

        {/* BOTTOM: MAP SECTION */}
        <MapComponent />

      </main>

      
    </div>
  );
};

export default Contact;
