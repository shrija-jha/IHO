import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag } from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveBackground from "../components/LiveBackground";
import BlogCard from "../components/BlogCard";

// Data
import { blogData } from "../Data/blogData";

const categories = ["All", "Growth", "SEO", "Development", "AI", "Design", "Security"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic (Category + Search)
  const filteredPosts = blogData.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-black text-slate-200 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <SEO 
        title="Digital Marketing Blog - SEO Tips & Industry Insights" 
        description="Explore IHO Digital's blog for latest insights on SEO, web development, digital marketing trends, AI, and business growth strategies."
        url="/blog"
      />
      
      {/* 1. GLOBAL LIVE BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <LiveBackground />
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* 2. MAIN CONTENT */}
      <main className="relative z-10 pt-32 pb-20 container mx-auto px-6">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Tag className="w-3 h-3" /> INTELLIGENCE HUB
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Insights & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-pulse">
              Technical Analysis
            </span>
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg max-w-2xl mx-auto mb-12"
          >
             Decoding the future of digital growth with data-driven strategies and engineering precision.
          </motion.p>
          
          {/* SEARCH & FILTER BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col md:flex-row gap-4 items-center shadow-2xl"
          >
             {/* Search Input */}
             <div className="relative w-full md:w-72 group">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
             </div>

             {/* Category Filter Pills */}
             <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      activeCategory === cat 
                        ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </motion.div>
        </div>

        {/* --- BLOG GRID --- */}
        <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
            <div className="text-center py-20">
                <div className="inline-block p-4 rounded-full bg-white/5 mb-4 text-slate-500">
                    <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">No articles found</h3>
                <p className="text-slate-500">Try adjusting your search or category.</p>
            </div>
        )}

      </main>

    </div>
  );
};

export default Blog;
