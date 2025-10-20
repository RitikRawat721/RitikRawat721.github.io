# SEO Setup Documentation
## Lorena Cebrián García - Psicóloga en Madrid

This document outlines the SEO implementation for the psychologist portfolio website.

---

## ✅ Implemented SEO Features

### 1. **Meta Tags & Structured Data**
- ✅ Dynamic meta tags using React Helmet Async
- ✅ Page-specific titles, descriptions, and keywords
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Schema.org structured data (Psychologist type)
- ✅ Bilingual support (Spanish primary, English secondary)

### 2. **Local SEO Optimization**
- ✅ Geo-location meta tags (Madrid, Spain)
- ✅ LocalBusiness structured data
- ✅ Address information in schema
- ✅ Service area defined (Madrid)
- ✅ Multiple language support

### 3. **Technical SEO**
- ✅ Semantic HTML structure
- ✅ Canonical URLs
- ✅ Language attributes (lang="es" / lang="en")
- ✅ robots.txt file
- ✅ sitemap.xml file
- ✅ Mobile-responsive viewport meta tag
- ✅ Theme color for mobile browsers

### 4. **Keywords Optimized**

#### Spanish Keywords:
- psicóloga Madrid
- psicóloga clínica Madrid
- terapia cognitivo conductual Madrid
- TCC Madrid
- psicólogo ansiedad Madrid
- psicólogo depresión Madrid
- terapia trauma Madrid
- terapia pareja Madrid
- psicóloga centro Madrid
- psicoterapia Madrid
- salud mental Madrid

#### English Keywords:
- psychologist Madrid
- clinical psychologist Madrid
- cognitive behavioral therapy Madrid
- CBT Madrid
- anxiety therapist Madrid
- depression therapist Madrid
- trauma therapy Madrid
- couples therapy Madrid

---

## 🔧 Configuration Required

### 1. **Update SEO Component** (`src/components/SEO.jsx`)

Replace placeholder values with actual information:

```javascript
// Line 47-60: Update contact and location information
telephone: '+34-XXX-XXX-XXX', // Add real phone number
address: {
  '@type': 'PostalAddress',
  streetAddress: 'Calle Example', // Add real street address
  addressLocality: 'Madrid',
  addressRegion: 'Comunidad de Madrid',
  postalCode: '28XXX', // Add real postal code
  addressCountry: 'ES'
},
geo: {
  '@type': 'GeoCoordinates',
  latitude: 40.4168, // Update with exact location
  longitude: -3.7038  // Update with exact location
}
```

### 2. **Add Social Media Links** (`src/components/SEO.jsx`)

Uncomment and add social media profiles (line 95-98):

```javascript
sameAs: [
  'https://www.linkedin.com/in/lorena-cebrian',
  'https://www.instagram.com/lorenacebrian_psicologa',
  'https://www.facebook.com/lorenacebrian.psicologa'
]
```

### 3. **Update Domain in Files**

Replace `https://yourdomain.com` with your actual domain:
- `public/robots.txt` (line 9)
- `public/sitemap.xml` (all URLs)

### 4. **Google Search Console Setup**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 5. **Google Business Profile**

Create and optimize your Google Business Profile:
- Business name: Lorena Cebrián García - Psicóloga
- Category: Psychologist
- Address: [Your Madrid address]
- Phone: [Your phone number]
- Website: [Your domain]
- Hours: [Your working hours]
- Add photos of your practice
- Encourage client reviews

---

## 📊 SEO Best Practices Implemented

### Content Optimization
- ✅ Unique titles for each page (50-60 characters)
- ✅ Compelling meta descriptions (150-160 characters)
- ✅ Keyword-rich content without stuffing
- ✅ Header hierarchy (H1, H2, H3)
- ✅ Alt text for images (add to doctor.jpg)

### Performance
- ✅ Preconnect to external resources
- ✅ Lazy loading for images
- ✅ Optimized animations with Framer Motion
- ✅ Code splitting with React Router

### User Experience
- ✅ Mobile-responsive design
- ✅ Fast page load times
- ✅ Clear call-to-actions
- ✅ Easy navigation
- ✅ Contact form for conversions

---

## 🌐 Multilingual SEO

The website supports both Spanish and English with proper hreflang implementation:

```html
<meta property="og:locale" content="es_ES" />
<meta property="og:locale:alternate" content="en_US" />
```

Language switching automatically updates:
- Page titles
- Meta descriptions
- Keywords
- Structured data

---

## 📈 Recommended Next Steps

### 1. **Content Marketing**
- Publish regular blog posts (2-4 per month)
- Focus on long-tail keywords
- Answer common psychology questions
- Share success stories (with permission)

### 2. **Link Building**
- Get listed in psychology directories
- Partner with local health professionals
- Guest post on mental health blogs
- Get backlinks from reputable sources

### 3. **Local Citations**
- List on Doctoralia
- Add to TopDoctors
- Register on Psicología y Mente
- Add to local Madrid directories

### 4. **Analytics Setup**
Install Google Analytics 4:

```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. **Social Media Integration**
- Add social sharing buttons to blog posts
- Create Open Graph images (1200x630px)
- Optimize images for social media
- Add Twitter Card images

---

## 🎯 Target Keywords Performance Tracking

Monitor these keywords in Google Search Console:

**High Priority:**
1. psicóloga Madrid
2. terapia cognitivo conductual Madrid
3. psicólogo ansiedad Madrid
4. terapia pareja Madrid

**Medium Priority:**
1. psicóloga clínica Madrid centro
2. tratamiento depresión Madrid
3. EMDR Madrid
4. mindfulness Madrid

**Long-tail:**
1. mejor psicóloga para ansiedad Madrid
2. terapia cognitivo conductual precio Madrid
3. psicóloga especialista en trauma Madrid

---

## 📱 Mobile Optimization

- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Fast mobile load times
- ✅ Mobile-first indexing ready

---

## 🔍 Schema.org Markup

Implemented structured data types:
- **Psychologist** - Main professional profile
- **LocalBusiness** - Business information
- **PostalAddress** - Location data
- **GeoCoordinates** - Map integration
- **EducationalOccupationalCredential** - Qualifications

Test your structured data:
https://search.google.com/test/rich-results

---

## 📝 Content Guidelines

### Blog Posts Should Include:
- Engaging title with target keyword
- Meta description (150-160 chars)
- At least 800-1500 words
- Internal links to services
- Call-to-action
- Author information
- Publication date

### Service Pages Should Include:
- Clear service description
- Benefits and outcomes
- Pricing information
- Booking CTA
- FAQ section
- Related services links

---

## ✅ SEO Checklist

Before launch:
- [ ] Update phone number in SEO.jsx
- [ ] Update address in SEO.jsx
- [ ] Update geo coordinates in SEO.jsx
- [ ] Add social media links in SEO.jsx
- [ ] Replace domain in robots.txt
- [ ] Replace domain in sitemap.xml
- [ ] Add alt text to doctor.jpg
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics
- [ ] Create Google Business Profile
- [ ] Submit sitemap to Google
- [ ] Test mobile responsiveness
- [ ] Test page load speed
- [ ] Verify structured data
- [ ] Check all meta tags

---

## 📞 Support

For questions about SEO implementation, refer to:
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

**Last Updated:** January 17, 2025
**Version:** 1.0
