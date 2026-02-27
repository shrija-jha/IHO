import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Menu, User, Mail, MessageSquare, Briefcase, 
  ChevronDown, ArrowRight, Rocket, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';

// --- IMPORT DATA ---
import { webServicesData } from "../Data/webServicesData";
import { digitalMarketingData } from "../Data/digitalMarketingData";
import { industriesData } from "../Data/industriesData";

// --- HELPER COMPONENT: MEGA MENU ---
const MegaMenu = ({ items, prefix, queryParam, closeMenu }) => {
  const location = useLocation(); 

  const handleItemClick = (e, path) => {
    closeMenu(); 
    if (location.pathname === path) {
        e.preventDefault(); 
        window.scrollTo(0, 0); 
        window.location.reload(); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 top-[80px] w-full bg-black border-t border-white/10 shadow-2xl z-[998] py-10"
    >
      <div className="w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {items.map((item, index) => {
            const path = queryParam 
              ? `${prefix}?id=${item.id}` 
              : `${prefix}/${item.id}`;

            return (
              <Link 
                key={index} 
                to={path}
                onClick={(e) => handleItemClick(e, path)} 
                className="flex items-center gap-3 group p-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="p-1.5 bg-white/5 rounded-md text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon ? <item.icon size={16} /> : <ArrowRight size={16} />}
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {item.title || item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: CONTACT MODAL (GET QUOTE) ---
const ContactModal = ({ isOpen, onClose, onToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('idle'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  // Expanded comprehensive list based on typical agency offerings
  const servicesList = [
    'Web Design',
    'Web Development', 
    'E-Commerce Development',
    'Shopify Development',
    'WordPress Development',
    'Custom Web Applications',
    'Mobile App Development',
    'Digital Marketing',
    'Search Engine Optimization (SEO)',
    'Social Media Marketing (SMM)',
    'Pay Per Click (PPC) / Ads',
    'Content Marketing',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Strict Validation for Name: Only Alphabets and Spaces allowed
    if (name === 'name') {
      const alphabetOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({ ...formData, [name]: alphabetOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('idle');

    // Strict Validation for Email format before submitting
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
        if (onToast) onToast({ type: 'error', message: 'Please enter a valid email address.' });
        setIsSending(false);
        return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@ihodigital.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            service: formData.service || 'Not Selected',
            message: formData.message,
            _subject: `Get Quote Request: ${formData.name} - ${formData.service || 'General'}`,
            _template: "table", 
            _captcha: "false" 
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      setStatus('success');
      
      if (onToast) onToast({ type: 'success', message: 'Quote request sent successfully!' });

      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', service: '', message: '' }); 
        onClose();
        window.location.reload(); 
      }, 3000);

    } catch (err) {
      console.error("Error", err);
      setStatus('error');
      if (onToast) onToast({ type: 'error', message: 'Failed to send. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => {
              setIsDropdownOpen(false); 
              onClose();
            }} 
            className="absolute inset-0 bg-black/95 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }} 
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-visible shadow-2xl z-[2001]"
          >
            <div className="flex justify-between px-6 py-4 border-b border-white/10 bg-white/5 rounded-t-2xl overflow-hidden">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-500" /> Get Your Quote
              </h3>
              <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-white transition-colors" /></button>
            </div>
            
            <div className="p-8">
                {status === 'success' ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                        <p className="text-slate-400">Refreshing page...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-3 top-3.5 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                name="name" 
                                value={formData.name} 
                                required 
                                onChange={handleChange} 
                                placeholder="Name (Alphabets only)" 
                                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" 
                            />
                        </div>
                        
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                name="email" 
                                value={formData.email} 
                                required 
                                type="email" 
                                onChange={handleChange} 
                                placeholder="Email" 
                                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" 
                            />
                        </div>
                        
                        {/* CUSTOM SERVICE DROPDOWN */}
                        <div className="relative group">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full bg-black border ${isDropdownOpen ? 'border-blue-500 rounded-t-lg border-b-0' : 'border-white/10 rounded-lg'} py-3 pl-10 pr-4 text-left text-white focus:outline-none transition-colors flex items-center justify-between relative z-20`}
                          >
                            <Briefcase className={`absolute left-3 top-3.5 w-4 h-4 transition-colors ${isDropdownOpen ? 'text-blue-500' : 'text-slate-500 group-hover:text-blue-500'}`} />
                            <span className={formData.service ? 'text-white' : 'text-slate-600'}>
                              {formData.service || 'Select a Service'}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.15 }}
                                // Added max height and vertical scrolling for long lists
                                className="absolute top-full left-0 w-full bg-black border border-white/10 border-t-0 rounded-b-lg z-30 max-h-56 overflow-y-auto overflow-x-hidden shadow-2xl"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#3b82f6 transparent'
                                }}
                              >
                                {servicesList.map((svc, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => handleServiceSelect(svc)}
                                    className={`px-10 py-3 cursor-pointer text-sm transition-colors ${
                                      formData.service === svc
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {svc}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <div className="relative group">
                            <MessageSquare className="absolute left-3 top-3.5 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                            <textarea 
                                name="message" 
                                value={formData.message} 
                                required 
                                onChange={handleChange} 
                                placeholder="Project Details" 
                                rows="3" 
                                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600 resize-none" 
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSending} 
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSending ? (
                                <>Sending <Loader2 className="w-4 h-4 animate-spin" /></>
                            ) : "Send Request"}
                        </button>
                    </form>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [toast, setToast] = useState({ type: null, message: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenModalSignal = () => setIsModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModalSignal);

    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('open-contact-modal', handleOpenModalSignal);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const handleNavigation = (e, path) => {
    closeAll();
    if (location.pathname === path) {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.location.reload();
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeAll();
    if (location.pathname === '/') {
        window.scrollTo(0, 0);
        window.location.reload();
    } else {
        navigate('/');
    }
  };

  const handleToast = (newToast) => {
    setToast(newToast);
    setTimeout(() => setToast({ type: null, message: '' }), 3500);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1000] bg-black border-b border-white/10 h-[80px]">
        <div className="w-full h-full flex items-center justify-between px-6">
          <a href="/" onClick={handleLogoClick} className="flex items-center z-[1001] cursor-pointer">
             <img src="/img/logo.png" alt="IHO Digital" className="h-46 w-auto object-contain hover:opacity-90 transition-opacity" />
          </a>

          <div className="hidden lg:flex items-center gap-8 h-full">
            <Link to="/" onClick={(e) => handleNavigation(e, '/')} className="text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">Home</Link>
            <Link to="/about" onClick={(e) => handleNavigation(e, '/about')} className="text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">About Us</Link>

            <div onMouseEnter={() => setActiveDropdown('web')} onMouseLeave={() => setActiveDropdown(null)} className="h-full flex items-center relative">
              <Link to="/web-services" onClick={(e) => handleNavigation(e, '/web-services')} className="flex items-center gap-1 text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors py-8 cursor-pointer">
                Web Services <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'web' ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-opacity ${activeDropdown === 'web' ? 'opacity-100' : 'opacity-0'}`} />
              </Link>
              <AnimatePresence>
                {activeDropdown === 'web' && <MegaMenu items={webServicesData} prefix="/web-services" closeMenu={() => setActiveDropdown(null)} />}
              </AnimatePresence>
            </div>

            <div onMouseEnter={() => setActiveDropdown('marketing')} onMouseLeave={() => setActiveDropdown(null)} className="h-full flex items-center relative">
              <Link to="/digital-marketing" onClick={(e) => handleNavigation(e, '/digital-marketing')} className="flex items-center gap-1 text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors py-8 cursor-pointer">
                Digital Marketing <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'marketing' ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-opacity ${activeDropdown === 'marketing' ? 'opacity-100' : 'opacity-0'}`} />
              </Link>
              <AnimatePresence>
                {activeDropdown === 'marketing' && <MegaMenu items={digitalMarketingData} prefix="/digital-marketing" closeMenu={() => setActiveDropdown(null)} />}
              </AnimatePresence>
            </div>

            <div onMouseEnter={() => setActiveDropdown('industries')} onMouseLeave={() => setActiveDropdown(null)} className="h-full flex items-center relative">
              <Link to="/industries" onClick={(e) => handleNavigation(e, '/industries')} className="flex items-center gap-1 text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors py-8 cursor-pointer">
                Industries <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-opacity ${activeDropdown === 'industries' ? 'opacity-100' : 'opacity-0'}`} />
              </Link>
              <AnimatePresence>
               {activeDropdown === 'industries' && <MegaMenu items={industriesData} prefix="/industries" closeMenu={() => setActiveDropdown(null)} />}
              </AnimatePresence>
            </div>

            <Link to="/portfolio" onClick={(e) => handleNavigation(e, '/portfolio')} className="text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">Portfolio</Link>
            <Link to="/contact" onClick={(e) => handleNavigation(e, '/contact')} className="text-sm font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">Contact Us</Link>

            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-500 transition-all rounded-md shadow-lg shadow-blue-600/20">GET QUOTE</button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white ml-auto">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-0 z-[999] bg-black pt-24 px-6 overflow-y-auto lg:hidden">
            <div className="flex flex-col gap-6 text-center">
              <Link to="/" onClick={(e) => handleNavigation(e, '/')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Home</Link>
              <Link to="/about" onClick={(e) => handleNavigation(e, '/about')} className="text-xl font-bold text-white border-b border-white/10 pb-4">About Us</Link>
              <Link to="/web-services" onClick={(e) => handleNavigation(e, '/web-services')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Web Services</Link>
              <Link to="/digital-marketing" onClick={(e) => handleNavigation(e, '/digital-marketing')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Digital Marketing</Link>
              <Link to="/industries" onClick={(e) => handleNavigation(e, '/industries')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Industries</Link>
              <Link to="/portfolio" onClick={(e) => handleNavigation(e, '/portfolio')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Portfolio</Link>
              <Link to="/contact" onClick={(e) => handleNavigation(e, '/contact')} className="text-xl font-bold text-white border-b border-white/10 pb-4">Contact Us</Link>
              <button onClick={() => { setIsModalOpen(true); closeAll(); }} className="mt-4 w-full py-4 bg-blue-600 text-white font-bold rounded-lg uppercase tracking-widest">GET QUOTE</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification Container (High Z-Index) */}
      <AnimatePresence>
        {toast.type && (
          <motion.div 
            initial={{ opacity: 0, y: -20, right: 24 }}
            animate={{ opacity: 1, y: 0, right: 24 }}
            exit={{ opacity: 0, y: -20, right: 24 }}
            className={`fixed top-24 z-[3000] px-6 py-4 rounded-xl shadow-2xl text-white flex items-center gap-3 border ${toast.type === 'success' ? 'bg-green-600/90 border-green-500' : 'bg-red-600/90 border-red-500'} backdrop-blur-md`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onToast={handleToast}
      />
      
      {/* Hidden button for triggering modal from other components */}
      <button id="open-contact-form-btn" className="hidden" onClick={() => setIsModalOpen(true)} aria-hidden="true" />
    </>
  );
};

export default Navbar;