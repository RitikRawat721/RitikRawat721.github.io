import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'

export default function Resources() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        const q = query(collection(db, "resources"), orderBy("timestamp", "desc"));
        const snap = await getDocs(q);
        const resources = snap.docs.map(d => ({ 
          id: d.id, 
          ...d.data(),
          domain: new URL(d.data().url).hostname.replace('www.', '')
        }));
        setItems(resources);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Recently added";
    const date = timestamp.toDate();
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Added yesterday';
    if (diffDays < 7) return `Added ${diffDays} days ago`;
    if (diffDays < 30) return `Added ${Math.floor(diffDays / 7)} weeks ago`;
    return `Added on ${date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })}`;
  };

  const getDomainColor = (domain) => {
    const colors = {
      'youtube.com': 'from-red-500 to-red-600',
      'psychologytoday.com': 'from-primary to-primary-hover',
      'apa.org': 'from-purple-500 to-pink-500',
      'nimh.nih.gov': 'from-green-500 to-emerald-500',
      'who.int': 'from-primary to-primary-light',
      'default': 'from-[#1A1D29]/70 to-[#1A1D29]/50'
    };
    
    for (const [key, value] of Object.entries(colors)) {
      if (domain.includes(key)) return value;
    }
    return colors.default;
  };

  const getDomainIcon = (domain) => {
    const icons = {
      'youtube.com': '🎬',
      'psychologytoday.com': '🧠',
      'apa.org': '📚',
      'nimh.nih.gov': '🏥',
      'who.int': '🌍',
      'default': '🔗'
    };
    
    for (const [key, value] of Object.entries(icons)) {
      if (domain.includes(key)) return value;
    }
    return icons.default;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }

  const seoMeta = {
    es: {
      title: 'Recursos de Psicología - Lorena Cebrián García | Herramientas y Enlaces Útiles',
      description: 'Recursos recomendados de psicología y salud mental. Herramientas, artículos y enlaces útiles seleccionados por una psicóloga clínica en Madrid para tu bienestar emocional.',
      keywords: 'recursos psicología, herramientas salud mental, enlaces psicología, recursos terapia, ayuda psicológica, bienestar emocional recursos, psicología Madrid recursos'
    },
    en: {
      title: 'Psychology Resources - Lorena Cebrián García | Useful Tools and Links',
      description: 'Recommended psychology and mental health resources. Tools, articles, and useful links curated by a clinical psychologist in Madrid for your emotional wellbeing.',
      keywords: 'psychology resources, mental health tools, psychology links, therapy resources, psychological help, emotional wellbeing resources, psychology Madrid resources'
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
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
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
            Mental Health Resources
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
            Curated collection of professional resources, research, and helpful tools for mental wellbeing
          </motion.p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-border shadow-lg overflow-hidden"
                  variants={skeletonVariants}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f8fafc] rounded-xl animate-pulse"></div>
                      <div className="w-24 h-4 bg-[#f8fafc] rounded animate-pulse"></div>
                    </div>
                    <div className="w-3/4 h-6 bg-[#f8fafc] rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-[#f8fafc] rounded animate-pulse"></div>
                      <div className="w-2/3 h-3 bg-[#f8fafc] rounded animate-pulse"></div>
                    </div>
                    <div className="w-32 h-8 bg-[#f8fafc] rounded-lg animate-pulse"></div>
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
              className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Connection Issue</h3>
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <motion.button
                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => window.location.reload()}
              >
                Retry Loading
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && !error && items.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-8xl mb-6 opacity-20">📚</div>
              <h3 className="text-3xl font-bold text-[#1A1D29]/70 mb-4">Resources Coming Soon</h3>
              <p className="text-[#1A1D29]/70 text-lg max-w-md mx-auto mb-6">
                We're curating a collection of valuable mental health resources and tools for you.
              </p>
              <motion.div
                className="inline-flex items-center gap-2 bg-[#f8fafc] text-primary px-4 py-2 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>🕒</span>
                <span className="text-sm font-medium">Check back soon</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resources Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={!loading ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {items.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-border shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col"
                variants={cardVariants}
                whileHover={{ 
                  y: -6,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                layout
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getDomainColor(resource.domain)} rounded-2xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`} />
                
                {/* Domain Badge */}
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDomainColor(resource.domain)} flex items-center justify-center text-white text-lg shadow-md`}>
                    {getDomainIcon(resource.domain)}
                  </div>
                  <div className="text-xs text-[#1A1D29]/70 bg-[#f8fafc] px-2 py-1 rounded-full font-medium">
                    {resource.domain}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <motion.h3 
                    className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300 mb-3 leading-tight flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  >
                    {resource.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300 mb-4 text-sm flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  >
                    {resource.description}
                  </motion.p>

                  {/* Action Button */}
                  <motion.a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-between w-full mt-auto p-3 bg-[#f8fafc] rounded-xl hover:bg-[#e2e8f0] transition-all duration-300 border border-neutral-border"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                  >
                    <span className="font-semibold text-gray-700 group-hover/btn:text-gray-900 transition-colors duration-300">
                      Visit Resource
                    </span>
                    <motion.span
                      className="text-lg"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      ↗
                    </motion.span>
                  </motion.a>

                  {/* Timestamp */}
                  <motion.div
                    className="mt-3 pt-3 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                  >
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>📅</span>
                      <span>{formatDate(resource.timestamp)}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <motion.div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${getDomainColor(resource.domain)} group-hover:w-full transition-all duration-700 rounded-full`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Resources Count */}
        {items.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">
                {items.length} curated resource{items.length !== 1 ? 's' : ''} available
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
    </>
  );
}