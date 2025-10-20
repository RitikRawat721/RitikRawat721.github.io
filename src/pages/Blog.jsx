import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'

export default function Blog() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
        const snap = await getDocs(q);
        const docs = snap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          readTime: Math.ceil((doc.data().content?.length || 0) / 200) || 3
        }));
        setPosts(docs);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Recent";
    const date = timestamp.toDate();
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const postVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const skeletonVariants = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 0.7,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  const seoMeta = {
    es: {
      title: 'Blog de Psicología - Lorena Cebrián García | Artículos sobre Salud Mental',
      description: 'Lee artículos profesionales sobre psicología, salud mental, terapia cognitivo conductual, ansiedad, depresión y bienestar emocional. Consejos prácticos de una psicóloga clínica en Madrid.',
      keywords: 'blog psicología, artículos salud mental, consejos psicológicos, terapia cognitivo conductual, ansiedad consejos, depresión ayuda, bienestar emocional, psicología Madrid'
    },
    en: {
      title: 'Psychology Blog - Lorena Cebrián García | Mental Health Articles',
      description: 'Read professional articles about psychology, mental health, cognitive behavioral therapy, anxiety, depression, and emotional wellbeing. Practical advice from a clinical psychologist in Madrid.',
      keywords: 'psychology blog, mental health articles, psychological advice, cognitive behavioral therapy, anxiety tips, depression help, emotional wellbeing, psychology Madrid'
    }
  }

  return (
    <>
      <SEO 
        title={seoMeta[language]?.title}
        description={seoMeta[language]?.description}
        keywords={seoMeta[language]?.keywords}
      />
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white/30 py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Therapy Insights
          </motion.h1>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          
          <motion.p
            className="text-xl text-[#1A1D29]/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Professional insights, mental health guidance, and therapeutic perspectives
          </motion.p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="space-y-8"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg overflow-hidden"
                  variants={skeletonVariants}
                >
                  <div className="space-y-4">
                    <div className="w-3/4 h-8 bg-[#f8fafc] rounded-xl animate-pulse"></div>
                    <div className="flex gap-4">
                      <div className="w-24 h-6 bg-[#f8fafc] rounded-full animate-pulse"></div>
                      <div className="w-20 h-6 bg-[#f8fafc] rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-[#f8fafc] rounded animate-pulse"></div>
                      <div className="w-full h-4 bg-[#f8fafc] rounded animate-pulse"></div>
                      <div className="w-2/3 h-4 bg-[#f8fafc] rounded animate-pulse"></div>
                    </div>
                    <div className="w-32 h-6 bg-[#f8fafc] rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && !loading && (
            <motion.div
              className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Unable to Load Posts</h3>
              <p className="text-red-500 text-lg">{error}</p>
              <motion.button
                className="mt-4 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && !error && posts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-8xl mb-6 opacity-20">📝</div>
              <h3 className="text-3xl font-bold text-[#1A1D29]/70 mb-4">No Posts Yet</h3>
              <p className="text-[#1A1D29]/70 text-lg max-w-md mx-auto">
                Check back soon for professional insights and mental health guidance from our therapy practice.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Grid */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={!loading ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                variants={postVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                layout
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-2xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6">
                    <motion.h2 
                      className="text-2xl md:text-3xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300 mb-3 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    >
                      {post.title}
                    </motion.h2>
                    
                    {/* Meta Information */}
                    <motion.div 
                      className="flex flex-wrap items-center gap-4 text-sm text-[#1A1D29]/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    >
                      <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-1 rounded-full group-hover:bg-[#e2e8f0] transition-colors duration-300">
                        <span>📅</span>
                        <span>{formatDate(post.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-1 rounded-full group-hover:bg-[#e2e8f0] transition-colors duration-300">
                        <span>⏱️</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#f8fafc] text-primary px-3 py-1 rounded-full group-hover:bg-[#e2e8f0] transition-colors duration-300">
                        <span>👤</span>
                        <span className="font-medium">{post.author}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    className="prose prose-lg max-w-none text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  >
                    {post.content.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  {/* Footer */}
                  <motion.div
                    className="mt-6 pt-6 border-t border-[#e2e8f0] group-hover:border-[#3b82f6] transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>💫</span>
                        <span>Professional insight</span>
                      </div>
                      <motion.div
                        className="text-sm text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Mental Health • Therapy
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 rounded-full"
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More / Footer */}
        {posts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">
                {posts.length} professional article{posts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
    </>
  );
}