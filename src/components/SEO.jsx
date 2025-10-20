import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'

export default function SEO({ 
  title, 
  description, 
  keywords,
  type = 'website',
  image,
  article = false,
  noindex = false
}) {
  const { language } = useLanguage()
  
  // Base information
  const siteName = 'Lorena Cebrián García - Psicóloga en Madrid'
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  // Default metadata by language
  const defaultMeta = {
    es: {
      title: 'Lorena Cebrián García - Psicóloga Clínica en Madrid | Terapia Cognitivo Conductual',
      description: 'Psicóloga clínica licenciada en Madrid especializada en Terapia Cognitivo Conductual (TCC), ansiedad, depresión, trauma y terapia de pareja. Más de 10 años de experiencia. Consulta gratuita de 15 minutos.',
      keywords: 'psicóloga Madrid, psicóloga clínica Madrid, terapia cognitivo conductual Madrid, TCC Madrid, psicólogo ansiedad Madrid, psicólogo depresión Madrid, terapia trauma Madrid, terapia pareja Madrid, psicóloga centro Madrid, psicoterapia Madrid, salud mental Madrid, tratamiento ansiedad, tratamiento depresión, EMDR Madrid, mindfulness Madrid, psicóloga licenciada Madrid, consulta psicológica Madrid, terapia online Madrid'
    },
    en: {
      title: 'Lorena Cebrián García - Clinical Psychologist in Madrid | Cognitive Behavioral Therapy',
      description: 'Licensed clinical psychologist in Madrid specializing in Cognitive Behavioral Therapy (CBT), anxiety, depression, trauma, and couples therapy. Over 10 years of experience. Free 15-minute consultation.',
      keywords: 'psychologist Madrid, clinical psychologist Madrid, cognitive behavioral therapy Madrid, CBT Madrid, anxiety therapist Madrid, depression therapist Madrid, trauma therapy Madrid, couples therapy Madrid, psychotherapy Madrid, mental health Madrid, anxiety treatment, depression treatment, EMDR Madrid, mindfulness Madrid, licensed psychologist Madrid, psychological consultation Madrid, online therapy Madrid'
    }
  }
  
  const meta = defaultMeta[language] || defaultMeta.es
  
  const finalTitle = title || meta.title
  const finalDescription = description || meta.description
  const finalKeywords = keywords || meta.keywords
  const finalImage = image || `${siteUrl}/doctor.jpg`
  
  // Structured data for local business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Psychologist',
    '@id': `${siteUrl}/#psychologist`,
    name: 'Lorena Cebrián García',
    image: finalImage,
    url: siteUrl,
    telephone: '+34-XXX-XXX-XXX', // Add real phone number
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Example', // Add real address
      addressLocality: 'Madrid',
      addressRegion: 'Comunidad de Madrid',
      postalCode: '28XXX', // Add real postal code
      addressCountry: 'ES'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168, // Madrid coordinates - update with exact location
      longitude: -3.7038
    },
    areaServed: {
      '@type': 'City',
      name: 'Madrid'
    },
    availableLanguage: ['Spanish', 'English'],
    description: finalDescription,
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'MSc Clinical Psychology'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'Licensed Psychologist'
      }
    ],
    knowsAbout: [
      'Cognitive Behavioral Therapy',
      'Anxiety Disorders',
      'Depression',
      'Trauma Recovery',
      'Couples Counseling',
      'EMDR',
      'Mindfulness'
    ],
    medicalSpecialty: 'Clinical Psychology',
    sameAs: [
      // Add social media profiles here
      // 'https://www.linkedin.com/in/lorena-cebrian',
      // 'https://www.instagram.com/lorenacebrian_psicologa'
    ]
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'es' ? 'en_US' : 'es_ES'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:author" content="Lorena Cebrián García" />
          <meta property="article:section" content="Psychology" />
        </>
      )}
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="ES-MD" />
      <meta name="geo.placename" content="Madrid" />
      <meta name="geo.position" content="40.4168;-3.7038" />
      <meta name="ICBM" content="40.4168, -3.7038" />
      
      {/* Additional SEO */}
      <meta name="author" content="Lorena Cebrián García" />
      <meta name="language" content={language === 'es' ? 'Spanish' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
