import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, CheckCircle2 } from 'lucide-react';
import Navbar from "../components/Navbar";
import LiveBackground from "../components/LiveBackground";
import SEO from "../components/SEO.jsx";
import { blogData } from "../Data/blogData";

const BlogDetail = () => {
  const { slug } = useParams();
  
  // Find post by slug
  const post = blogData.find((p) => p.slug === slug);
  const routeCanonical = `/blog/${slug}`;
  const canonicalFromData = post?.seo?.canonical;
  const canonicalUrl = canonicalFromData && canonicalFromData.includes('/blog/')
    ? canonicalFromData
    : routeCanonical;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- FIX 2: Handle "Not Found" properly so the page doesn't crash ---
  if (!post) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-bold text-2xl relative z-50">
            <SEO
              title="Blog Post Not Found - IHO Digital"
              description="The requested blog post could not be found."
              noindex
              nofollow
            />
            <p>Post Not Found</p>
            <Link to="/blog" className="mt-4 px-6 py-2 bg-blue-600 rounded-full text-sm hover:bg-blue-500 transition-colors">
                Back to Blog
            </Link>
        </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30">
      <SEO 
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        canonical={canonicalUrl}
        ogTitle={post.seo?.ogTitle}
        ogDescription={post.seo?.ogDescription}
        ogType="article"
        schemaType={post.seo?.schemaType}
        schemaName={post.seo?.schemaName}
        schemaDescription={post.seo?.schemaDescription}
      />
      
      {/* 1. PROGRESS BAR */}
      <motion.div className={`fixed top-0 left-0 right-0 h-1 bg-${post.color || 'blue'}-500 origin-left z-[100]`} style={{ scaleX }} />

      <div className="fixed inset-0 z-0">
         <LiveBackground />
      </div>

      <div className="relative z-50"><Navbar /></div>

      {/* 2. HERO SECTION */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
            <span className={`px-4 py-2 rounded-full bg-${post.color || 'blue'}-600/20 border border-${post.color || 'blue'}-500/50 text-${post.color || 'blue'}-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md`}>
              {post.category}
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight max-w-4xl mx-auto drop-shadow-2xl">
            {post.title}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <User size={14} className={`text-${post.color || 'blue'}-400`} /> {post.author}
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Calendar size={14} className={`text-${post.color || 'blue'}-400`} /> {post.date}
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Clock size={14} className={`text-${post.color || 'blue'}-400`} /> {post.readTime}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      <main className="relative z-20 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Back to Insights</span>
          </Link>

          {/* Article Body 
             FIX: Added 'blog-content' class to ensure visibility even if Tailwind fails.
             Restored ALL your original Tailwind prose classes as requested.
          */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="blog-content prose prose-lg prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-white prose-headings:mb-6 prose-headings:mt-12
              prose-h2:text-3xl prose-h2:tracking-tight prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-6
              prose-h3:text-xl prose-h3:text-blue-200
              prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-6
              prose-ul:list-disc prose-ul:text-slate-300 prose-ul:pl-6 prose-ul:mb-6
              prose-li:mb-2 prose-li:marker:text-blue-500
              prose-strong:text-white prose-strong:font-bold
            "
          >
            {/* Injecting the HTML Content */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.article>

          {/* Share / Footer of Article */}
          <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
             <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm font-bold uppercase">
                  {copied ? "Link Copied!" : "Share this article"}
                </span>
                <button 
                  onClick={handleShare}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    copied ? "bg-green-500 text-white" : "bg-white/5 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                   {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
                </button>
             </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default BlogDetail;
