import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaUser, FaChevronDown, FaGlobe } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { language, toggleLanguage } = useLanguage()
  const t = useTranslation(language)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle scroll to section
  function goToSection(id) {
    if (location.pathname === '/') {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
    setOpen(false)
    setActiveDropdown(null)
  }

  // Navigation items
  const navItems = [
    { label: t.navbar.about, id: 'about' },
    { label: t.navbar.services, id: 'services' },
    { label: t.navbar.contact, id: 'contact' },
  ]

  const dropdownItems = [
    { label: t.navbar.blog, path: '/blog' },
    { label: t.navbar.resources, path: '/resources' },
  ]

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      x: -20 
    },
    open: { 
      opacity: 1, 
      x: 0 
    }
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6'>
        {/* Logo Section */}
        <motion.div 
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className={`rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg ${
              scrolled ? 'w-9 h-9' : 'w-12 h-12'
            } transition-all duration-300`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <img 
              src='/logo.svg' 
              alt='Mindful Therapy' 
              className={`${scrolled ? 'w-6 h-6' : 'w-8 h-8'} transition-all duration-300`}
            />
          </motion.div>
          <motion.div 
            className={`hidden md:block font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent ${
              scrolled ? 'text-lg' : 'text-xl'
            } transition-all duration-300`}
          >
            Lorena Cebrián Psicología
          </motion.div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-8'>
          {/* Main Nav Items */}
          <div className='flex items-center gap-8'>
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className='relative text-gray-900 hover:text-primary font-medium transition-colors duration-200'
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Dropdown Menu */}
          <motion.div 
            className='relative'
            onMouseEnter={() => setActiveDropdown('more')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <motion.button
              className='flex items-center gap-1 text-gray-900 hover:text-primary font-medium transition-colors duration-200'
              whileHover={{ y: -2 }}
            >
              {t.navbar.more} <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {activeDropdown === 'more' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 py-2"
                >
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Language Switcher */}
          <motion.button
            onClick={toggleLanguage}
            className='flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-all duration-300 border border-gray-300'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
          >
            <FaGlobe className="text-sm" />
            <span className="text-sm font-semibold">{language === 'en' ? 'ES' : 'EN'}</span>
          </motion.button>

          {/* Admin Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to='/login' 
              className='flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <FaUser className="text-sm" />
              <span>{t.navbar.admin}</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className='lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label='menu'
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <FaTimes className="text-gray-900" /> : <FaBars className="text-gray-900" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                  onClick={() => goToSection(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-900 hover:bg-gray-50 hover:text-primary font-medium transition-all duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
              
              {dropdownItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: (index + navItems.length) * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="block px-4 py-3 rounded-lg text-gray-900 hover:bg-gray-50 hover:text-primary font-medium transition-all duration-200"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: (navItems.length + dropdownItems.length) * 0.1 }}
                className="pt-2"
              >
                <button
                  onClick={() => {
                    toggleLanguage()
                    setOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold justify-center mb-2 border border-gray-300"
                >
                  <FaGlobe className="text-sm" />
                  <span>{language === 'en' ? 'Español' : 'English'}</span>
                </button>
                
                <Link
                  to='/login'
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold justify-center"
                  onClick={() => setOpen(false)}
                >
                  <FaUser className="text-sm" />
                  <span>{t.navbar.adminPortal}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}