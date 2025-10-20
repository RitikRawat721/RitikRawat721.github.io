import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations/translations';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { language } = useLanguage();
  const t = useTranslation(language);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Creative grid animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const gridItemVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section ref={ref} className="w-full py-24 px-4 relative overflow-hidden" id="about">
      {/* Creative Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#433878 1px, transparent 1px),
              linear-gradient(90deg, #433878 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotate(-2deg) scale(1.1)'
          }}
        />
        
        {/* Floating Grid Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-lg"
          animate={{
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-24 h-24 border border-[#6A4A9C]/10 rounded-lg"
          animate={{
            rotate: [0, -3, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* Image Grid Area - Creative Placement */}
          <motion.div 
            className="lg:col-span-5 grid grid-cols-2 gap-6"
            variants={gridItemVariants}
          >
            {/* Main Image */}
            <div className="col-span-2 relative group">
              <motion.div 
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img 
                  src='/doctor.jpg' 
                  alt='Dr. Lorena, Licensed Psychologist' 
                  className="w-full h-auto object-cover aspect-[3/4]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            </div>

            {/* Credential Grid Items */}
            <motion.div
              className="bg-gradient-to-br from-primary to-[#52418F] text-white p-6 rounded-2xl shadow-xl"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">✓</div>
                <div className="text-sm font-semibold">{t.about.licensed}</div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 p-6 rounded-2xl shadow-xl border border-gray-200"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-sm font-semibold text-gray-700">{t.about.experience}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Grid Area */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-6 gap-8"
            variants={gridItemVariants}
          >
            
            {/* Header Section - Full Width */}
            <motion.div 
              className="lg:col-span-6 grid grid-cols-1 gap-6"
              variants={gridItemVariants}
            >
              <div>
                <motion.h1 
                  className="text-5xl lg:text-6xl font-black tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-white via-primary-hover to-white bg-clip-text text-transparent">
                    {t.about.name}
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/90 font-light mt-4 tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {t.about.title}
                </motion.p>
              </div>

              {/* Creative Divider */}
              <motion.div 
                className="grid grid-cols-3 gap-4 items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="h-0.5 bg-gradient-to-r from-transparent via-white/40 to-white/60 rounded-full"></div>
                <div className="flex justify-center">
                  <div className="w-3 h-3 bg-white/60 rounded-full rotate-45"></div>
                </div>
                <div className="h-0.5 bg-gradient-to-l from-transparent via-white/40 to-white/60 rounded-full"></div>
              </motion.div>
            </motion.div>

            {/* Description - Full Width */}
            <motion.div 
              className="lg:col-span-6"
              variants={gridItemVariants}
            >
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed tracking-wide bg-white/80 p-8 rounded-2xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {t.about.description.split(t.about.cbtHighlight)[0]}
                <span className="font-semibold text-transparent bg-gradient-to-r from-primary to-[#9D8FC9] bg-clip-text">
                  {t.about.cbtHighlight}
                </span>
                {t.about.description.split(t.about.cbtHighlight)[1]}
              </motion.p>
            </motion.div>

            {/* Approach Highlights - Creative 2x2 Grid */}
            <motion.div 
              className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {t.about.approaches.map((item, index) => (
                <motion.div
                  key={index}
                  className="group p-6 rounded-xl bg-white/80 border border-gray-200 hover:border-primary/50 transition-all duration-400 hover:shadow-lg"
                  variants={gridItemVariants}
                  whileHover={{ 
                    y: -6,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-[#6A4A9C] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Specialties - Creative Tag Cloud */}
            <motion.div 
              className="lg:col-span-6"
              variants={gridItemVariants}
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
              >
                {t.about.areasTitle}
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {t.about.specialties.map((specialty, index) => (
                  <motion.div
                    key={specialty}
                    className="bg-white/80 border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      delay: 1.1 + (index * 0.05),
                      duration: 0.4 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#8B7CB8",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                      {specialty}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section - Full Width */}
            <motion.div 
              className="lg:col-span-6"
              variants={gridItemVariants}
            >
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center p-8 rounded-3xl bg-gradient-to-r from-white/90 to-white/80 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="lg:col-span-3 text-center lg:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Start Your Healing Journey Today
                  </h4>
                  <p className="text-gray-700">
                    {t.about.ctaSubtext}
                  </p>
                </div>
                
                <div className="lg:col-span-2 flex justify-center lg:justify-end">
                  <motion.button
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-primary to-[#6A4A9C] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-500 w-full lg:w-auto min-w-[180px]"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.about.cta}
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}