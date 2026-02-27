import React from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Youtube, 
  ArrowRight
} from "lucide-react";

// --- NAVIGATION LINKS ---
const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Web Services", path: "/web-services" },
  { name: "Digital Marketing", path: "/digital-marketing" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" }
];

// --- SOCIAL LINKS ---
const socialLinks = [
  {
    icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    href: "https://x.com/isodigital21634",
    color: "hover:bg-black border-white/20 hover:border-white"
  },
  { 
    icon: <Facebook className="w-5 h-5" />, 
    href: "https://www.facebook.com/profile.php?id=61585435236717", 
    color: "hover:bg-blue-600" 
  },
  { 
    icon: <Youtube className="w-5 h-5" />, 
    href: "https://www.youtube.com/@ihodigital-p2p", 
    color: "hover:bg-red-600" 
  },
  { 
    icon: <Instagram className="w-5 h-5" />, 
    href: "https://www.instagram.com/iho_digital/", 
    color: "hover:bg-pink-600" 
  },
  { 
    icon: <Linkedin className="w-5 h-5" />, 
    href: "https://www.linkedin.com/in/ihodigital/", 
    color: "hover:bg-blue-700" 
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-black pt-32 pb-10 overflow-hidden font-sans">
      
      {/* 1. 3D MOVING GRID FLOOR */}
      <div className="absolute inset-0 pointer-events-none perspective-normal">
        <motion.div
            animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                transform: "rotateX(60deg) scale(2)",
                transformOrigin: "top center",
                maskImage: "linear-gradient(to bottom, transparent, black)"
            }}
        />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-black to-transparent z-10" />
      </div>

      {/* 2. GIANT BACKGROUND WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[20vw] font-black text-white/3 leading-none tracking-tighter">
            IHO
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-20">
        
        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Link to="/" onClick={() => window.scrollTo(0,0)} className="block mb-6">
                    <img 
                      src="/img/logo.png" 
                      alt="IHO Digital" 
                      className="h-40 w-auto object-contain" 
                    />
                </Link>

                <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                    Empowering ambitious businesses with high-performance technology and data-driven marketing strategies.
                </p>

                {/* HOLOGRAPHIC SOCIAL ORBS */}
                <div className="flex gap-4">
                    {socialLinks.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.1 }}
                            className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md group`}
                        >
                            <span className="relative z-10">{social.icon}</span>
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
          </div>

          {/* NAVIGATION COLUMN */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                Explore
            </h3>
            <ul className="space-y-4">
                {footerLinks.map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link 
                            to={item.path} 
                            onClick={() => window.scrollTo(0,0)} 
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" />
                            <span className="group-hover:translate-x-2 transition-transform duration-300">
                                {item.name}
                            </span>
                        </Link>
                    </motion.li>
                ))}
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div className="md:col-span-4">
              <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                Get In Touch
            </h3>
            
            <div className="space-y-6 mb-8">
                {/* Address */}
                <div className="flex items-start gap-4 text-gray-400">
                    <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-medium">Headquarters</p>
                        <p className="text-sm mt-1 leading-relaxed">
                          402, 4th Floor, H-47 Sector-63 RD,<br />
                          H Block, Noida-201309
                        </p>
                    </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start gap-4 text-gray-400">
                    <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-medium">Phone</p>
                        <a href="https://wa.me/917678592968" target="_blank" rel="noopener noreferrer" className="text-sm mt-1 hover:text-cyan-400 cursor-pointer transition-colors block">
                          +91 8291589861
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 text-gray-400">
                      <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-medium">Email Us</p>
                        <a href="mailto:info@ihodigital.com" className="text-sm mt-1 hover:text-cyan-400 cursor-pointer transition-colors block">
                          info@ihodigital.com
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT BAR (REAL LINKS NOW) --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p>© 2024 IHO Digital. Built for the future.</p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                <Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/legal/cookies" className="hover:text-white transition-colors">Cookies</Link>
                <Link to="/legal/help" className="hover:text-white transition-colors">Help</Link>
                <Link to="/legal/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
        </div>

      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/918291589861"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 animate-bounce-slow"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

    </footer>
  );
};

export default Footer;