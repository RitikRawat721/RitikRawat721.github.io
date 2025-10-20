import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function BlogShowcase(){
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { language } = useLanguage()
  const t = useTranslation(language)

  useEffect(()=>{
    async function fetchPosts() {
      try {
        setLoading(true)
        const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"), limit(2))
        const snap = await getDocs(q)
        const docs = snap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          readTime: Math.ceil((doc.data().content?.length || 0) / 200) || 3,
          category: doc.data().category || 'Mental Health'
        }))
        setPosts(docs)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
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

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Recent"
    const date = timestamp.toDate()
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <motion.section
      ref={ref}
      className="w-full py-16 px-4  relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary-light/10 rounded-full blur-lg"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-primary-hover to-white bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t.blogShowcase.title}
          </motion.h2>
          
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary via-primary-light to-primary mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
          />
          
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {t.blogShowcase.subtitle}
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {loading ? (
            // Loading Skeleton
            <>
              {[1, 2].map((item) => (
                <motion.div
                  key={item}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg overflow-hidden"
                  variants={cardVariants}
                >
                  <div className="relative overflow-hidden">
                    <div className="w-3/4 h-8 bg-[#f8fafc] rounded-lg mb-4 animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-[#f8fafc] rounded mb-2 animate-pulse"></div>
                    <div className="w-full h-4 bg-[#f8fafc] rounded mb-1 animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-[#f8fafc] rounded mb-6 animate-pulse"></div>
                    <div className="w-1/3 h-3 bg-[#f8fafc] rounded animate-pulse"></div>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>
              ))}
            </>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group relative cursor-pointer"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onClick={() => navigate('/blog')}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-2xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500" />
                
                {/* Main Card */}
                <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-transparent overflow-hidden">
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light opacity-0 group-hover:opacity-3 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <motion.span
                    className="inline-block px-4 py-1 bg-[#f8fafc] text-primary rounded-full text-sm font-medium mb-4 border border-neutral-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {post.category}
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    {post.title}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300 mb-6 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    {post.content?.substring(0, 120)}{post.content?.length > 120 ? '...' : ''}
                  </motion.p>

                  {/* Meta Information */}
                  <motion.div
                    className="flex items-center justify-between pt-4 border-t border-neutral-border group-hover:border-primary transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 text-sm text-[#1A1D29]/70">
                      <span className="bg-[#f8fafc] px-2 py-1 rounded-md group-hover:bg-[#e2e8f0] transition-colors duration-300">
                        {formatDate(post.timestamp)}
                      </span>
                      <span className="bg-[#f8fafc] px-2 py-1 rounded-md group-hover:bg-[#e2e8f0] transition-colors duration-300">
                        {post.readTime} {t.blogShowcase.minRead}
                      </span>
                    </div>
                    
                    {/* Read More Indicator */}
                    <motion.span
                      className="text-primary font-semibold text-sm group-hover:text-primary-hover transition-colors duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {t.blogShowcase.readMore} →
                    </motion.span>
                  </motion.div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-light group-hover:w-full transition-all duration-700 rounded-full"
                  />

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.article>
            ))
          ) : (
            // Empty State
            <>
              {[1, 2].map((item) => (
                <motion.div
                  key={item}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg text-center group"
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-6xl mb-4 opacity-20">📝</div>
                  <h3 className="text-xl font-semibold text-[#1A1D29]/70 mb-2">{t.blogShowcase.comingSoon}</h3>
                  <p className="text-[#1A1D29]/50">{t.blogShowcase.comingSoonDesc}</p>
                  <motion.div
                    className="w-0 h-1 bg-gradient-to-r from-primary to-primary-light group-hover:w-full transition-all duration-700 rounded-full mt-4 mx-auto"
                  />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate('/blog')}
            className="group bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t.blogShowcase.viewAll}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}