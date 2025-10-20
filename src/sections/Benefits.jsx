import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaHeart, 
  FaFaceSmile, 
  FaUsers, 
  FaShield,
  FaStar
} from 'react-icons/fa6'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const { language } = useLanguage()
  const t = useTranslation(language)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const benefitIcons = [
    { icon: FaHeart, color: 'from-blue-500 to-cyan-500', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { icon: FaFaceSmile, color: 'from-green-500 to-emerald-500', gradient: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { icon: FaUsers, color: 'from-purple-500 to-pink-500', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { icon: FaShield, color: 'from-orange-500 to-red-500', gradient: 'bg-gradient-to-br from-orange-500 to-red-500' }
  ]

  const benefits = t.benefits.cards.map((card, index) => ({
    ...card,
    ...benefitIcons[index],
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
        duration: 0.7
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

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      className="w-full py-20 px-4"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#f8fafc] text-primary px-4 py-2 rounded-full mb-6 border border-neutral-border"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-sm">{t.benefits.badge}</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-primary-hover to-white bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.benefits.title}
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t.benefits.subtitle}
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Main Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-transparent overflow-hidden">
                
                {/* Animated Background */}
                <div className={`absolute inset-0 ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-2xl ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl`}
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <benefit.icon className="text-2xl text-white" />
                </motion.div>

                
                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <motion.h3
                    className="text-2xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {benefit.title}
                  </motion.h3>

                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    {benefit.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.ul className="space-y-2 pt-4">
                    {benefit.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-[#1A1D29]/70"
                        variants={featureVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.6 + (index * 0.1) + (featureIndex * 0.1) }}
                      >
                        <div className={`w-2 h-2 ${benefit.gradient} rounded-full`} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Progress Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 w-0 h-1 ${benefit.gradient} group-hover:w-full transition-all duration-700`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="group bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t.benefits.cta}</span>
            
          </motion.button>
          
          <motion.p
            className="text-[#1A1D29]/70 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {t.benefits.ctaSubtext}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}