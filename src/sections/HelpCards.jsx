import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaHeart, FaBrain, FaShieldAlt, FaUsers, FaStar } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function HelpCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { language } = useLanguage()
  const t = useTranslation(language)

  const helpIcons = [
    { icon: FaBrain, color: 'from-blue-500 to-cyan-500', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { icon: FaHeart, color: 'from-purple-500 to-pink-500', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { icon: FaShieldAlt, color: 'from-orange-500 to-red-500', gradient: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { icon: FaUsers, color: 'from-green-500 to-emerald-500', gradient: 'bg-gradient-to-br from-green-500 to-emerald-500' }
  ]

  const helpItems = t.helpCards.cards.map((card, index) => ({
    ...card,
    ...helpIcons[index],
    delay: 0.1 * (index + 1)
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
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        duration: 0.8
      }
    }
  }

  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      className="w-full py-20 px-4  relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 bg-primary/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-8 h-8 bg-primary-light/20 rounded-full"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-4 h-4 bg-primary/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Artistic Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-neutral-border mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FaStar className="text-yellow-500 text-lg" />
            <span className="font-semibold text-[#1A1D29]">{t.helpCards.badge}</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-primary-hover to-white bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.helpCards.title}
          </motion.h2>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary via-primary-light to-primary mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 128, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          />
          
          <motion.blockquote
            className="text-xl italic text-white/90 max-w-2xl mx-auto pl-6 py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {t.helpCards.quote}
          </motion.blockquote>
        </motion.div>

        {/* Artistic Cards Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {helpItems.map((item, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }
              }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
              
              {/* Main Card */}
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-primary overflow-hidden">
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <div className={`absolute -inset-1 ${item.gradient} opacity-5 rounded-2xl`} />
                </div>

                {/* Floating Icon Container */}
                <motion.div
                  className={`relative z-10 w-20 h-20 rounded-2xl ${item.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl mx-auto`}
                  variants={iconVariants}
                  whileHover="float"
                >
                  <motion.div
                    variants={floatVariants}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <item.icon className="text-3xl text-white" />
                  </motion.div>
                  
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500`} />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-4 text-center">
                  <motion.h3
                    className="text-2xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent group-hover:from-primary-light group-hover:to-primary transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  >
                    {item.desc}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="pt-4 border-t border-neutral-border group-hover:border-primary transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.features.map((feature, featureIndex) => (
                        <motion.span
                          key={featureIndex}
                          className="px-3 py-1 bg-[#f8fafc] text-[#1A1D29]/70 rounded-full text-xs font-medium group-hover:bg-[#e2e8f0] transition-colors duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            delay: 0.9 + (index * 0.1) + (featureIndex * 0.1),
                            duration: 0.4 
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6"
                          }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 w-0 h-1 ${item.gradient} group-hover:w-full group-hover:left-0 transition-all duration-700 rounded-full`}
                />

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Artistic Footer Note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.p
            className="text-[#1A1D29]/70 italic max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            {t.helpCards.quote}
          </motion.p>
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-neutral-border to-primary mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}