import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaPhone, FaEnvelope, FaWhatsapp, FaCopyright } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Footer(){
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const t = useTranslation(language)
  
  const contactItems = [
    {
      icon: FaPhone,
      text: '+34 684 78 12 25',
      href: 'tel:+34684781225',
      delay: 0.1
    },
    {
      icon: FaEnvelope,
      text: 'lorenacebrianpsicologia@hotmail.com',
      href: 'mailto:lorenacebrianpsicologia@hotmail.com',
      delay: 0.2
    },
    {
      icon: FaWhatsapp,
      text: 'WhatsApp',
      href: 'https://wa.me/34684781225',
      delay: 0.3
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <motion.footer 
      className="relative mt-20 py-16 bg-footer-bg overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
      <div className="absolute bottom-20 right-16 w-6 h-6 bg-primary-light/30 rounded-full blur-sm"></div>
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-white/25 rounded-full blur-sm"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Contact Information */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-footer-hover hover:bg-white"
              variants={itemVariants}
              whileHover={{ y: -2 }}
              target={item.href.startsWith('http') ? '_blank' : '_self'}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              <motion.div
                className="p-2 bg-primary rounded-lg text-white shadow-md"
                variants={iconVariants}
                whileHover="hover"
              >
                <item.icon className="text-sm" />
              </motion.div>
              <span className="font-medium text-[#1A1D29] group-hover:text-primary transition-colors duration-300">
                {item.text}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Professional Services Note */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <p className="text-footer-text text-center leading-relaxed">
              <strong className="text-white">{t.footer.professionalNote}</strong> • 
              {t.footer.services}
            </p>
          </div>
        </motion.div>

        {/* Copyright & Branding */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Made with love */}
          <motion.div
            className="flex items-center justify-center gap-2 text-white/70 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-sm">{t.footer.craftedWith}</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaHeart className="text-footer-hover text-sm" />
            </motion.div>
            <span className="text-sm">{t.footer.forWellbeing}</span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex items-center justify-center gap-2 text-footer-text font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaCopyright className="text-white/60 text-xs" />
            <span>{currentYear} Lorena Psychology</span>
            <span className="text-white/30 mx-2">•</span>
            <span>{t.footer.allRights}</span>
          </motion.div>

          {/* Professional Credentials */}
          <motion.div
            className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
              {t.footer.licensedPsychologist}
            </span>
            <span className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
              PD-12345
            </span>
            <span className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
              {t.footer.confidentialSecure}
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-white/40 to-footer-hover rounded-full mx-auto mt-8"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          transition={{ delay: 1.2, duration: 1 }}
          viewport={{ once: true }}
        />
      </div>

      {/* Floating Particles */}
      <motion.div
        className="absolute bottom-4 left-1/4 w-1 h-1 bg-white/40 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.div
        className="absolute bottom-8 right-1/3 w-1 h-1 bg-footer-hover/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1
        }}
      />
    </motion.footer>
  )
}