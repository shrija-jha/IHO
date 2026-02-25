import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  { icon: Lightbulb, title: "Discovery", desc: "We analyze market vectors to find your unique edge." },
  { icon: PenTool, title: "Design", desc: "Crafting visual systems that convert visitors into users." },
  { icon: Code2, title: "Develop", desc: "Clean, scalable code built on modern MERN stacks." },
  { icon: Rocket, title: "Deploy", desc: "Seamless launch with automated testing and optimization." },
];

const WorkProcess = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How We Build Magic</h2>
          <p className="text-slate-400">Our proven methodology for digital excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-slate-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center group hover:border-blue-500/50 transition-colors"
            >
              <div className="w-16 h-16 mx-auto bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;