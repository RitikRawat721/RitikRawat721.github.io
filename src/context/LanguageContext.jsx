import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'es'
    return localStorage.getItem('language') || 'es'
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isSpanish: language === 'es'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
