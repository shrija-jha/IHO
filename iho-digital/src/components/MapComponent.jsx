import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const MapComponent = () => {
  // 1. Google Maps Embed (Red Marker on IHO Digital)
  // We use the exact query for your business to ensure the red pin appears.
  const mapSrc = "https://maps.google.com/maps?q=IHO%20Digital%20Noida%20Sector%2063&t=&z=15&ie=UTF8&iwloc=&output=embed";

  // 2. Functional Directions Link (Opens Google Maps App/Site)
  // Uses your specific Place ID for precision navigation
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=IHO+Digital+Noida&destination_place_id=ChIJN7odJF7lDDkRvFhls0yr3SQ";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group mt-20"
    >
      {/* MAP IFRAME */}
      <iframe 
        src={mapSrc}
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%)' }} // Dark Mode Map
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="IHO Digital Location"
        className="group-hover:filter-none transition-all duration-700"
      />

      {/* OVERLAY CARD */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">IHO Digital HQ</h4>
            <p className="text-slate-400 text-sm leading-relaxed mt-1">
              402, 4th Floor, H-47,<br/>
              Sector-63 RD, H Block,<br/>
              Noida - 201309
            </p>
          </div>
        </div>

        <a 
          href={directionsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-600/30"
        >
          <Navigation size={18} /> Get Directions
        </a>
      </div>
    </motion.div>
  );
};

export default MapComponent;