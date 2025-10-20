import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaAward, FaCertificate, FaUserTie } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Qualifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const { language } = useLanguage()
  const t = useTranslation(language)

  const qualificationIcons = [
    { icon: FaGraduationCap, color: 'from-blue-500 to-cyan-500' },
    { icon: FaAward, color: 'from-green-500 to-emerald-500' },
    { icon: FaCertificate, color: 'from-purple-500 to-pink-500' },
    { icon: FaUserTie, color: 'from-orange-500 to-red-500' }
  ]

  const qualifications = t.qualifications.cards.map((card, index) => ({
    ...card,
    ...qualificationIcons[index]
  }))

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
        duration: 0.6
      }
    }
  }

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      className="w-full py-16 px-4"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-primary-hover to-white bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.qualifications.title}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p 
            className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.qualifications.subtitle}
          </motion.p>
        </motion.div>

        {/* Qualifications Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {qualifications.map((qual, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${qual.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-transparent overflow-hidden">
                
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${qual.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${qual.color} flex items-center justify-center mb-6 shadow-lg`}
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <qual.icon className="text-2xl text-white" />
                </motion.div>

                {/* Year Badge */}
                <motion.div
                  className="absolute top-6 right-6 bg-[#f8fafc] text-[#1A1D29]/70 px-3 py-1 rounded-full text-sm font-semibold"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  {qual.year}
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <motion.h3
                    className="text-2xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {qual.title}
                  </motion.h3>

                  <motion.p
                    className="text-lg font-semibold text-[#1A1D29]/70 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    {qual.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    {qual.description}
                  </motion.p>
                </div>

                {/* Hover Line Indicator */}
                <motion.div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${qual.color} group-hover:w-full transition-all duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-neutral-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-[#f8fafc] text-primary px-6 py-3 rounded-full border border-neutral-border"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="font-semibold">{t.qualifications.badge}</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}