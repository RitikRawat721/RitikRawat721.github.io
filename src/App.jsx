import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Resources from './pages/Resources'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { LanguageProvider } from './context/LanguageContext'

export default function App(){
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <HelmetProvider>
      <LanguageProvider>
        <div className='min-h-screen bg-calm'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </HelmetProvider>
  )
}
