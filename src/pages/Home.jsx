
import About from '../sections/About'
import Qualifications from '../sections/Qualifications'
import Benefits from '../sections/Benefits'
// import HelpCards from '../sections/HelpCards'
import Services from '../sections/Services'
import BlogShowcase from '../sections/BlogShowcase'
import ContactForm from '../sections/ContactForm'
import SEO from '../components/SEO'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function Home(){
  const location = useLocation()
  useEffect(()=>{
    // if navigated here with a target, scroll to it
    if (location?.state?.scrollTo) {
      const id = location.state.scrollTo
      // small timeout to allow layout stabilization
      setTimeout(()=>{
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // optional: clear state so back button doesn't re-trigger
        window.history.replaceState({}, document.title, window.location.pathname)
      }, 80)
    }
  }, [location])
  return (
    <>
      <SEO />
      <div className='pt-24'>
      <section id='about' className='max-w-6xl mx-auto px-6 py-12'>
        <About />
      </section>
      <section className='max-w-6xl mx-auto px-6 py-6'>
        <Qualifications />
      </section>
      
      {/* Benefits section - temporarily hidden */}
      {/* <section className='max-w-6xl mx-auto px-6 py-6'>
        <Benefits />
      </section> */}
      
      {/* HELPCards section - temporarily hidden */}
      {/* <section className='max-w-6xl mx-auto px-6 py-6'>
        <HelpCards />
      </section> */}
      
      <section id='services' className='max-w-6xl mx-auto px-6 py-6'>
        <Services />
      </section> 
      {/* BlogShowcase section - temporarily hidden */}
      {/*<section className='max-w-6xl mx-auto px-6 py-6'>
        <BlogShowcase />
      </section>*/}
      <section id='contact' className='max-w-6xl mx-auto px-6 py-6'>
        <ContactForm />
      </section>
    </div>
    </>
  )
}
