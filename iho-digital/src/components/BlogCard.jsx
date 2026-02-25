import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post, index }) => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 h-full"
    >
      <Link to={`/blog/${post.slug}`} className="block h-full" aria-label={`Read ${post.title}`}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative h-full flex flex-col bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]"
        >
          {/* IMAGE SECTION */}
          <div className="relative h-52 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500" />
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Floating Category */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-black/60 border border-${post.color}-500/50 text-${post.color}-400 backdrop-blur-md shadow-lg`}>
                {post.category}
              </span>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="p-8 flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(30px)" }}>
            {/* Meta Data */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-mono">
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-blue-500" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-purple-500" /> {post.readTime}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-slate-300">
                  <User size={12} />
                </div>
                <span className="text-xs text-slate-400 font-medium">{post.author}</span>
              </div>

              <span className={`flex items-center gap-1 text-xs font-bold text-${post.color}-400 uppercase tracking-widest group-hover:gap-2 transition-all`}>
                Read <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* GLOW EFFECT */}
          <div
            className={`absolute -inset-2 bg-gradient-to-r from-${post.color}-500/0 via-${post.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none`}
            style={{ transform: "translateZ(-10px)" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
