// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

// Reusable Input Component
const InputField = ({ icon: Icon, type, name, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 transition-opacity duration-500 ${isFocused ? 'opacity-20' : ''}`} />
      <div className="relative">
        <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-400 transition-colors">
          <Icon size={20} />
        </div>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required
            rows="4"
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition-all resize-none"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition-all"
          />
        )}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      // AJAX Request to FormSubmit Backend with your new email
      const response = await fetch("https://formsubmit.co/ajax/info@ihodigital.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New Lead from IHO Digital Website", 
            _template: "table", 
            _captcha: "false" 
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Refresh page after 5 seconds to reset state
        setTimeout(() => { window.location.reload(); }, 2000);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error("Error", err);
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      <div className="relative p-8 md:p-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        
        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
            <CheckCircle2 size={20} />
            <span className="font-bold">Message Sent Successfully!</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
            <XCircle size={20} />
            <span className="font-bold">{errorMsg}</span>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
          <p className="text-slate-400 text-sm">Tell us about your project, goals, and timeline.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
              icon={User} 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <InputField 
              icon={Mail} 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <InputField 
              icon={MessageSquare} 
              type="textarea" 
              name="message" 
              placeholder="Tell us about your project..." 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          
          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 relative overflow-hidden group ${
              status === 'success' 
                ? 'bg-green-600 cursor-default' 
                : status === 'error'
                ? 'bg-red-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02]'
            }`}
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              {status === 'idle' && (
                  <>Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
              {status === 'sending' && (
                  <>Sending <Loader2 size={18} className="animate-spin" /></>
              )}
              {status === 'success' && (
                  <>Sent! <CheckCircle2 size={18} /></>
              )}
              {status === 'error' && (
                  <>Failed <XCircle size={18} /></>
              )}
            </div>
          </button>
        </form>
      </div>
      
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] opacity-20 blur-2xl -z-10" />
    </motion.div>
  );
};

export default ContactForm;