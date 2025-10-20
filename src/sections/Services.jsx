
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaUser, FaUsers, FaHandshake, FaStar, FaClock, FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { language } = useLanguage()
  const t = useTranslation(language)

  const serviceIcons = [
    { icon: FaUser, color: 'from-blue-500 to-cyan-500', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500', popular: false },
    { icon: FaUsers, color: 'from-purple-500 to-pink-500', gradient: 'bg-gradient-to-br from-purple-500 to-pink-500', popular: true },
    { icon: FaHandshake, color: 'from-orange-500 to-amber-500', gradient: 'bg-gradient-to-br from-orange-500 to-amber-500', external: true, link: 'https://example-doctor.com' }
  ]

  const services = t.services.cards.map((card, index) => ({
    ...card,
    ...serviceIcons[index],
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
        duration: 0.8
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
      className="w-full py-20 px-4  relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-light/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Artistic Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-[#1A1D29]/70 mb-6 border border-neutral-border shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FaStar className="text-yellow-500" />
            <span>{t.services.badge}</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-primary-hover to-white bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {t.services.title}
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary via-primary-light to-primary mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.9 }}
          />
          
          <motion.p 
            className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    <FaStar className="text-xs" />
                    <span>{t.services.mostPopular}</span>
                  </div>
                </motion.div>
              )}

              {/* Background Glow */}
              <div className={`absolute inset-0 ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Main Card */}
              <motion.div
                className={`relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 overflow-hidden ${
                  service.popular 
                    ? 'border-primary shadow-2xl' 
                    : 'border-neutral-border shadow-xl'
                } group-hover:shadow-2xl group-hover:border-transparent`}
                whileHover={{ scale: 1.02 }}
              >
                
                {/* Animated Background */}
                <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-2xl ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl`}
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <service.icon className="text-2xl text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Title */}
                  <div>
                    <motion.h3
                      className="text-2xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {service.title}
                    </motion.h3>
                    {service.subtitle && (
                      <motion.p
                        className="text-lg font-semibold text-[#1A1D29]/70 mt-1"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      >
                        {service.subtitle}
                      </motion.p>
                    )}
                  </div>

                  {/* Description */}
                  <motion.p
                    className="text-[#1A1D29] leading-relaxed group-hover:text-[#1A1D29]/70 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Duration */}
                  <motion.div
                    className="flex items-center gap-2 text-[#1A1D29]/70"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <FaClock className="text-sm" />
                    <span className="text-sm">{service.duration || ''}</span>
                  </motion.div>

                  {/* Features */}
                  <motion.ul className="space-y-2 pt-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-[#1A1D29]/70"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          delay: 0.7 + (index * 0.1) + (featureIndex * 0.1),
                          duration: 0.4 
                        }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${service.gradient}`} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Price or CTA */}
                  <motion.div
                    className="pt-4 border-t border-neutral-border group-hover:border-primary transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  >
                    {service.external ? (
                      <motion.a
                        href={service.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-3 w-full justify-center bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#1A1D29] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{t.services.visitReferral}</span>
                        <FaArrowUpRightFromSquare className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </motion.a>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                            {service.price}
                          </div>
                          <div className="text-sm text-[#1A1D29]/70">{t.services.perSession}</div>
                        </div>
                        <motion.button
                          className="group/btn inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{t.services.bookNow}</span>
                          <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 w-0 h-1 ${service.gradient} group-hover:w-full transition-all duration-700 rounded-full`}
                />

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-lg max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.p
            className="text-gray-800 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            💫 <strong>{t.services.insuranceNote}</strong> {t.services.insuranceText}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}