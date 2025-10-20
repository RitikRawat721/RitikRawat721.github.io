# Psychologist Portfolio - Codebase Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Pages & Components](#pages--components)
4. [Styling System](#styling-system)
5. [State Management](#state-management)
6. [Key Features](#key-features)

---

## 🎯 Project Overview

A modern, responsive psychologist portfolio website built with React, featuring:
- **Light purple & gray theme** for a calming, professional aesthetic
- **Bilingual support** (English/Spanish)
- **Animated UI** with Framer Motion
- **Admin panel** for content management
- **SEO optimized** with React Helmet

**Tech Stack:**
- React 18
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- React Router (navigation)
- Prisma (database ORM)

---

## 📁 File Structure

```
psychologist-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with language switcher
│   │   └── Footer.jsx       # Footer with contact info
│   ├── pages/               # Main page components
│   │   ├── Home.jsx         # Landing page (combines all sections)
│   │   ├── Blog.jsx         # Blog listing page
│   │   ├── Resources.jsx    # Resources page
│   │   ├── Login.jsx        # Admin login page
│   │   └── Admin.jsx        # Admin dashboard
│   ├── sections/            # Page sections for Home
│   │   ├── About.jsx        # About/Hero section
│   │   ├── Benefits.jsx     # Benefits of therapy section
│   │   ├── Services.jsx     # Services & pricing section
│   │   ├── Qualifications.jsx  # Professional credentials
│   │   ├── HelpCards.jsx    # Areas of specialization
│   │   ├── BlogShowcase.jsx # Featured blog posts
│   │   └── ContactForm.jsx  # Contact form with validation
│   ├── context/             # React Context for state
│   │   └── LanguageContext.jsx  # Language switching logic
│   ├── translations/        # Internationalization
│   │   └── translations.js  # English & Spanish text
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.js       # Authentication hook
│   ├── styles/              # Global styles
│   │   └── styles.css       # Custom CSS & Tailwind config
│   ├── App.jsx              # Main app component & routing
│   └── main.jsx             # App entry point
├── public/                  # Static assets
│   ├── logo.svg
│   └── doctor.jpg
├── tailwind.config.cjs      # Tailwind configuration
├── vite.config.js           # Vite build configuration
└── package.json             # Dependencies
```

---

## 📄 Pages & Components

### **1. App.jsx**
**Purpose:** Main application component with routing setup

**Functions:**
- Sets up React Router for navigation
- Implements scroll-to-top on route change
- Wraps app in HelmetProvider (SEO) and LanguageProvider
- Applies `.bg-calm` background class

**Key Code:**
```javascript
useEffect(() => {
  window.scrollTo(0, 0);  // Scroll to top on route change
}, [location.pathname]);
```

---

### **2. Pages**

#### **Home.jsx**
**Purpose:** Main landing page that combines all sections

**Sections Included:**
1. About (Hero)
2. Benefits
3. Services
4. Qualifications
5. Help Cards
6. Blog Showcase
7. Contact Form

**Functions:**
- Renders all sections in order
- Provides SEO metadata via Helmet
- Serves as the main entry point for visitors

---

#### **Blog.jsx**
**Purpose:** Displays all published blog posts

**Functions:**
- Fetches blog posts from backend API
- Displays posts in a grid layout
- Shows loading state while fetching
- Handles empty state (no posts)
- Each post shows: title, excerpt, author, date

**API Endpoint:** `GET /api/blogs`

---

#### **Resources.jsx**
**Purpose:** Lists helpful mental health resources

**Functions:**
- Fetches resources from backend
- Displays resources with title, description, and link
- Categorizes resources (optional)
- External links open in new tab

**API Endpoint:** `GET /api/resources`

---

#### **Login.jsx**
**Purpose:** Admin authentication page

**Functions:**
- Email/password login form
- Form validation
- Redirects to admin panel on success
- Stores auth token in localStorage
- Error handling for failed login

**API Endpoint:** `POST /api/auth/login`

---

#### **Admin.jsx**
**Purpose:** Admin dashboard for content management

**Functions:**
- **Create Blog Posts:** Rich text editor, title, content
- **Manage Blog Posts:** View all posts, delete posts
- **Add Resources:** Title, URL, description
- **Manage Resources:** View all resources, delete resources
- Protected route (requires authentication)
- Tab-based interface (Create/Manage)

**API Endpoints:**
- `POST /api/blogs` - Create blog post
- `GET /api/blogs` - List all blogs
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/resources` - Create resource
- `GET /api/resources` - List all resources
- `DELETE /api/resources/:id` - Delete resource

---

### **3. Components**

#### **Navbar.jsx**
**Purpose:** Top navigation bar

**Functions:**
- **Smooth scroll navigation** to page sections
- **Language switcher** (EN/ES toggle)
- **Dropdown menu** for Blog/Resources/Admin
- **Mobile responsive** with hamburger menu
- **Scroll detection** - changes style when scrolled
- **Logo** with click-to-home functionality

**Key Features:**
- Framer Motion animations
- Sticky positioning
- Backdrop blur effect
- Active section highlighting

---

#### **Footer.jsx**
**Purpose:** Bottom page footer

**Functions:**
- **Contact information:** Phone, Email, WhatsApp
- **Professional credentials** display
- **Copyright information**
- **Animated elements** (floating particles, pulsing heart)
- **Social proof** (licensed psychologist badge)

**Animations:**
- Stagger animation for contact items
- Floating particle effects
- Pulsing heart icon

---

### **4. Sections (Home Page)**

#### **About.jsx**
**Purpose:** Hero section with psychologist introduction

**Functions:**
- **Name & title** with gradient text effect
- **Professional description** with CBT highlight
- **Credentials badges** (Licensed, Safe Space)
- **Approach highlights** (4 key principles)
- **Specialties grid** (8 areas of focus)
- **CTA button** - scrolls to contact form

**Animations:**
- Staggered entrance animations
- Hover effects on cards
- Floating grid background elements

---

#### **Benefits.jsx**
**Purpose:** Showcases therapy benefits

**Functions:**
- **4 benefit cards:** Anxiety, Mood, Relationships, Trauma
- Each card includes:
  - Title & description
  - 3 key features
  - Icon/visual element
- **CTA button** to contact section

**Layout:** 2x2 grid on desktop, stacked on mobile

---

#### **Services.jsx**
**Purpose:** Displays services and pricing

**Functions:**
- **3 service cards:**
  1. Individual Therapy (€50/session)
  2. Couples Therapy (€50/session)
  3. Specialized Referral (Dr. María Martínez)
- **Insurance information**
- **"Book Now" buttons**
- **"Most Popular" badge** on featured service

**Features:**
- Transparent pricing
- Clear service descriptions
- External referral link

---

#### **Qualifications.jsx**
**Purpose:** Professional credentials display

**Functions:**
- **4 qualification cards:**
  1. MSc Clinical Psychology
  2. Licensed Psychologist (with license #)
  3. Certified CBT Practitioner
  4. Clinical Experience (10+ years)
- Each shows: title, institution, description, year
- **"Verified Professional" badge**

**Layout:** Horizontal timeline-style on desktop

---

#### **HelpCards.jsx**
**Purpose:** Areas of specialization

**Functions:**
- **4 help area cards:**
  1. Anxiety (panic, worry, mindfulness)
  2. Depression (mood tracking, activation)
  3. Trauma (trauma-informed care)
  4. Relationship Issues (communication, boundaries)
- Each includes 3 specific techniques/approaches
- **Inspirational quote** from therapist

---

#### **BlogShowcase.jsx**
**Purpose:** Featured blog posts on homepage

**Functions:**
- Displays **3 most recent** blog posts
- Shows: title, excerpt, read time, date
- **"Read more" button** for each post
- **"View All Articles" button** to Blog page
- **"Coming Soon" state** if no posts

**API:** Fetches from `/api/blogs?limit=3`

---

#### **ContactForm.jsx**
**Purpose:** Multi-step contact form

**Functions:**
- **4-step form:**
  1. Name input
  2. Email input
  3. Message textarea
  4. Review & submit
- **Real-time validation:**
  - Name: min 2 characters
  - Email: valid format
  - Message: min 10 characters
- **Progress indicator** (step dots)
- **Success/error messages**
- **Form submission** to backend

**API Endpoint:** `POST /api/contact`

**Validation Rules:**
```javascript
- Name: required, min 2 chars
- Email: required, valid email format
- Message: required, min 10 chars
```

---

### **5. Context & Hooks**

#### **LanguageContext.jsx**
**Purpose:** Global language state management

**Functions:**
- Provides current language (en/es)
- `toggleLanguage()` function
- Persists language in localStorage
- Wraps entire app

**Usage:**
```javascript
const { language, toggleLanguage } = useLanguage();
```

---

#### **useAuth.js**
**Purpose:** Authentication state hook

**Functions:**
- Checks if user is authenticated
- Validates auth token
- Provides logout functionality
- Redirects to login if unauthorized

**Usage:**
```javascript
const { isAuthenticated, logout } = useAuth();
```

---

### **6. Translations**

#### **translations.js**
**Purpose:** All text content in English & Spanish

**Structure:**
```javascript
{
  en: {
    navbar: { ... },
    about: { ... },
    services: { ... },
    contact: { ... },
    // ... all sections
  },
  es: {
    // Spanish translations
  }
}
```

**Usage:**
```javascript
const t = useTranslation(language);
<h1>{t.about.name}</h1>
```

---

## 🎨 Styling System

### **styles.css**
**Purpose:** Global styles and CSS variables

**Sections:**
1. **CSS Variables** - Color system
2. **Base Styles** - HTML/body defaults
3. **Background** - Animated gradient
4. **Components** - Card styles
5. **Utilities** - Helper classes
6. **Browser** - Scrollbar, selection, focus
7. **Forms** - Input styling

**Key Classes:**
- `.bg-calm` - Main animated background
- `.card` - Standard card component
- `.bg-purple-gradient` - Purple gradient utility
- `.text-purple-gradient` - Gradient text
- `.shadow-purple-glow` - Glow effect

---

### **tailwind.config.cjs**
**Purpose:** Tailwind CSS configuration

**Custom Colors:**
```javascript
primary: '#8B7CB8'        // Main purple
primary-hover: '#9D8FC9'  // Hover purple
bg-primary: '#FFFFFF'     // White
text-primary: '#1A1D29'   // Dark text
// ... all theme colors
```

---

## 🔑 Key Features

### **1. Smooth Scrolling**
- Enabled in CSS: `scroll-behavior: smooth`
- JavaScript scroll on navigation click
- Scroll-to-top on page load

### **2. Animations**
- **Framer Motion** for all animations
- Stagger effects on lists
- Hover animations on cards
- Page transition effects
- Floating background elements

### **3. Responsive Design**
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Hamburger menu on mobile
- Stacked layouts on small screens

### **4. SEO Optimization**
- React Helmet for meta tags
- Semantic HTML structure
- Alt text on images
- Proper heading hierarchy

### **5. Form Validation**
- Real-time error messages
- Visual feedback (red borders)
- Prevents submission if invalid
- Clear error descriptions

### **6. Accessibility**
- Focus outlines on interactive elements
- ARIA labels on buttons
- Keyboard navigation support
- Sufficient color contrast

---

## 🚀 Getting Started

### **Installation**
```bash
npm install
```

### **Development**
```bash
npm run dev
```

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

---

## 📝 Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:3000/api
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 🔐 Authentication Flow

1. User navigates to `/login`
2. Enters email & password
3. Frontend sends POST to `/api/auth/login`
4. Backend validates credentials
5. Returns JWT token
6. Token stored in localStorage
7. Protected routes check for valid token
8. Admin panel accessible if authenticated

---

## 📊 Database Schema (Prisma)

### **Blog Model**
```prisma
model Blog {
  id        String   @id @default(uuid())
  title     String
  content   String
  author    String
  createdAt DateTime @default(now())
}
```

### **Resource Model**
```prisma
model Resource {
  id          String @id @default(uuid())
  title       String
  url         String
  description String
}
```

---

## 🎯 Future Enhancements

- [ ] Blog post categories
- [ ] Search functionality
- [ ] Client testimonials section
- [ ] Appointment booking system
- [ ] Newsletter subscription
- [ ] Dark mode toggle
- [ ] More language options

---

## 📞 Support

For questions or issues, contact the development team.

---

**Last Updated:** October 2025
**Version:** 1.0.0
