# SEO Quick Reference Guide
## Lorena Cebrián García - Psicóloga en Madrid

---

## 🚀 Quick Start: What You MUST Update

### 1. **Contact Information** (PRIORITY 1)
📁 File: `src/components/SEO.jsx`

```javascript
// Line 47: Add your phone number
telephone: '+34-XXX-XXX-XXX', // ← UPDATE THIS

// Lines 50-56: Add your real address
address: {
  '@type': 'PostalAddress',
  streetAddress: 'Calle Example', // ← UPDATE THIS
  addressLocality: 'Madrid',
  addressRegion: 'Comunidad de Madrid',
  postalCode: '28XXX', // ← UPDATE THIS
  addressCountry: 'ES'
}

// Lines 58-62: Add exact location coordinates
// Get from Google Maps: Right-click location → "What's here?"
geo: {
  '@type': 'GeoCoordinates',
  latitude: 40.4168, // ← UPDATE THIS
  longitude: -3.7038  // ← UPDATE THIS
}
```

### 2. **Domain Name** (PRIORITY 1)
📁 Files to update:
- `public/robots.txt` - Line 9
- `public/sitemap.xml` - All URLs (lines 7, 13, 20, 27)

Replace `https://yourdomain.com` with your actual domain.

### 3. **Social Media** (PRIORITY 2)
📁 File: `src/components/SEO.jsx` - Lines 95-98

```javascript
sameAs: [
  'https://www.linkedin.com/in/your-profile',
  'https://www.instagram.com/your-handle',
  'https://www.facebook.com/your-page'
]
```

---

## 📝 How to Update SEO for New Content

### Adding a New Blog Post
The SEO is automatic! Just create the blog post and it will:
- ✅ Auto-generate meta description from content
- ✅ Use blog title as page title
- ✅ Include proper keywords
- ✅ Add article schema

### Changing Page Titles/Descriptions
📁 Files to edit:

**Home Page:** `src/pages/Home.jsx`
- Uses default from `src/components/SEO.jsx`

**Blog Page:** `src/pages/Blog.jsx` - Lines 103-114
```javascript
const seoMeta = {
  es: {
    title: 'Your Spanish Title',
    description: 'Your Spanish Description',
    keywords: 'keyword1, keyword2, keyword3'
  },
  en: {
    title: 'Your English Title',
    description: 'Your English Description',
    keywords: 'keyword1, keyword2, keyword3'
  }
}
```

**Resources Page:** `src/pages/Resources.jsx` - Lines 148-159

---

## 🎯 SEO Best Practices Checklist

### For Every Page:
- [ ] Title: 50-60 characters
- [ ] Description: 150-160 characters
- [ ] Include location "Madrid" in title
- [ ] Include main service in title
- [ ] Use natural language (not keyword stuffing)

### For Blog Posts:
- [ ] Title includes target keyword
- [ ] First paragraph includes keyword
- [ ] Use H2 and H3 headings
- [ ] Include internal links
- [ ] Add call-to-action at end
- [ ] Minimum 800 words

---

## 🔍 Testing Your SEO

### 1. **Test Structured Data**
Visit: https://search.google.com/test/rich-results
Enter your URL and check for errors.

### 2. **Test Meta Tags**
Visit: https://metatags.io/
Enter your URL to preview social shares.

### 3. **Test Mobile Friendliness**
Visit: https://search.google.com/test/mobile-friendly
Enter your URL.

### 4. **Test Page Speed**
Visit: https://pagespeed.web.dev/
Enter your URL.

---

## 📊 Monitoring SEO Performance

### Google Search Console
1. Add property: https://search.google.com/search-console
2. Verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`
4. Monitor:
   - Search queries
   - Click-through rate
   - Average position
   - Indexing status

### Key Metrics to Track:
- **Impressions** - How many times your site appears in search
- **Clicks** - How many people click through
- **CTR** - Click-through rate (aim for >3%)
- **Position** - Average ranking (aim for top 10)

---

## 🌐 Language Switching

The site automatically updates SEO based on selected language:
- Spanish (es) = Primary language
- English (en) = Secondary language

All meta tags, titles, and descriptions change automatically!

---

## 💡 Quick SEO Tips

### DO:
✅ Write for humans first, search engines second
✅ Use your location (Madrid) in titles
✅ Answer common questions in blog posts
✅ Update content regularly
✅ Get reviews on Google Business Profile
✅ Build local citations

### DON'T:
❌ Keyword stuff
❌ Copy content from other sites
❌ Use hidden text
❌ Buy backlinks
❌ Ignore mobile users
❌ Forget to update sitemap

---

## 🆘 Common Issues & Solutions

### Issue: Pages not appearing in Google
**Solution:** 
1. Check robots.txt isn't blocking pages
2. Submit sitemap to Google Search Console
3. Wait 2-4 weeks for indexing

### Issue: Wrong meta description showing
**Solution:**
1. Check SEO component is imported
2. Verify description length (150-160 chars)
3. Request re-indexing in Search Console

### Issue: Low click-through rate
**Solution:**
1. Improve meta descriptions (make them compelling)
2. Add numbers/dates to titles
3. Include call-to-action in description

---

## 📞 Need Help?

### Resources:
- **Google Search Central:** https://developers.google.com/search
- **Schema.org Docs:** https://schema.org/
- **SEO Starter Guide:** https://developers.google.com/search/docs/beginner/seo-starter-guide

### Local SEO Resources:
- **Google Business Profile:** https://business.google.com
- **Doctoralia:** https://www.doctoralia.es
- **TopDoctors:** https://www.topdoctors.es

---

**Remember:** SEO is a long-term strategy. Results typically take 3-6 months to show significant improvement. Focus on creating quality content and providing value to your visitors!

---

**Last Updated:** January 17, 2025
