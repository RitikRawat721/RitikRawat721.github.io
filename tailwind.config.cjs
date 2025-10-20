module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Purple Brand Colors for Light Theme
        'primary': '#8B7CB8',
        'primary-hover': '#9D8FC9',
        'primary-light': '#6A4A9C',
        'primary-dark': '#52418F',
        'primary-extra-dark': '#433878',
        
        // Secondary Purple Colors
        'secondary': '#4A5FA6',
        'secondary-hover': '#5B6FB8',
        'secondary-dark': '#2A4480',
        
        // Light Theme Backgrounds
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F7FF',
        'bg-tertiary': '#E8E6F0',
        
        // Light Theme Text Colors
        'text-primary': '#1A1D29',
        'text-secondary': '#4A4A5A',
        'text-muted': '#6B6B7B',
        
        // Light Theme Borders
        'neutral-border': '#E2E5ED',
        'border-light': '#F0F0F5',
        
        // Light Theme Alert Colors
        'alert-success-bg': '#E8F5F0',
        'alert-success-text': '#2E7D5F',
        'alert-success-icon': '#4CAF93',
        
        'alert-warning-bg': '#FDF4E3',
        'alert-warning-text': '#8A6118',
        'alert-warning-icon': '#E6B357',
        
        'alert-error-bg': '#FBECEA',
        'alert-error-text': '#C53929',
        'alert-error-icon': '#D87A6A',
        
        'alert-info-bg': '#E8F2F4',
        'alert-info-text': '#2A5863',
        'alert-info-icon': '#5A9AA8',
        
        // Footer Colors
        'footer-bg': '#433878',
        'footer-text': '#E8E6F0',
        'footer-hover': '#C4B7CB'
      }
    }
  },
  plugins: [],
}
