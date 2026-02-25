import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const getServicePath = (service) => {
  const category = service?.category || "";
  const basePath = category.toLowerCase().includes("digital")
    ? "/digital-marketing"
    : "/web-services";
  return `${basePath}/${service.id}`;
};

const ServiceFilter = ({ title, services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 mb-12 z-40" ref={dropdownRef}>
      <div className="flex items-center justify-between bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">
        <div>
          <span className="text-slate-400 text-xs font-bold tracking-widest uppercase block mb-1">Filter Services</span>
          <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          <Monitor size={20} />
          <span className="hidden md:block">View Services</span>
          <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 bg-slate-950/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden mx-6 z-50"
          >
            <div className="max-h-[60vh] overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {services.map((service, i) => (
                  <Link 
                    key={i} 
                    to={getServicePath(service)}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-blue-600/10 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                      {service.icon && <service.icon size={18} />}
                    </div>
                    <h4 className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                        {service.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceFilter;
