import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import emailjs from "@emailjs/browser";
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations/translations';

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const formRef = useRef(null);
  const { language } = useLanguage();
  const t = useTranslation(language);

  const steps = [
    { 
      id: 1, 
      title: t.contact.step1Title, 
      subtitle: t.contact.step1Subtitle,
      field: 'name' 
    },
    { 
      id: 2, 
      title: t.contact.step2Title, 
      subtitle: t.contact.step2Subtitle,
      field: 'email' 
    },
    { 
      id: 3, 
      title: t.contact.step3Title, 
      subtitle: t.contact.step3Subtitle,
      field: 'message' 
    },
    { 
      id: 4, 
      title: t.contact.step4Title, 
      subtitle: t.contact.step4Subtitle,
      field: 'submit' 
    }
  ];

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = t.contact.errors.nameRequired;
        } else if (value.trim().length < 2) {
          error = t.contact.errors.nameTooShort;
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = t.contact.errors.emailRequired;
        } else if (!isValidEmail(value)) {
          error = t.contact.errors.emailInvalid;
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = t.contact.errors.messageRequired;
        } else if (value.trim().length < 10) {
          error = t.contact.errors.messageTooShort;
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleNext = () => {
    const currentField = steps[currentStep - 1].field;
    const error = validateField(currentField, formData[currentField]);
    
    if (error) {
      setFormErrors(prev => ({ ...prev, [currentField]: error }));
      return;
    }
    
    // Clear error for current field
    setFormErrors(prev => ({ ...prev, [currentField]: '' }));
    
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field, value) => {
    const error = validateField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  // Function to get formatted timestamp for EmailJS
  const getFormattedTimestamp = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return `${date} at ${time} (${timezone})`;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields before submission
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setFormErrors(errors);
    
    // Check if there are any errors - FIXED: Only show error status if there are actual validation errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      // Don't set submitStatus to 'error' here - that's for submission failures
      // Instead, just return and let the validation errors show
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // CORRECTED: Use template parameters that match the EmailJS template
      const templateParams = {
        name: formData.name, // Changed from from_name
        email: formData.email, // Changed from from_email
        message: formData.message,
        date: getFormattedTimestamp(), // Changed from submission_time
        to_name: 'Lorena'
      };
      
      console.log('Sending email with params:', templateParams);
      
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email sent successfully!');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setCurrentStep(1);
    } catch (err) {
      console.error('EmailJS Error:', err);
      console.error('Error status:', err.status);
      console.error('Error text:', err.text);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.6
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    })
  };

  const progressVariants = {
    initial: { width: '0%' },
    animate: { 
      width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      y: -1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.contact.title}
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}
                  whileHover={{ scale: currentStep >= step.id ? 1.1 : 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {step.id}
                </motion.div>
                <motion.span 
                  className={`text-xs mt-2 font-medium text-center ${
                    currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {step.title.split(' ')[0]}
                </motion.span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div className="h-0.5 bg-gray-200 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-primary"
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: currentStep > step.id ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>

        {/* Current Step Header */}
        <motion.div
          key={`header-${currentStep}`}
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {currentStepData.subtitle}
          </p>
        </motion.div>

        {/* Form Steps */}
        <div className="relative min-h-[200px] overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="space-y-4">
                  <motion.input
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={(e) => handleInputBlur('name', e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200 placeholder-gray-500 text-[#1A1D29] text-base"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                    autoFocus
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p
                        className="text-red-600 text-sm font-medium"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 2: Email */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="space-y-4">
                  <motion.input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => handleInputBlur('email', e.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200 placeholder-gray-500 text-[#1A1D29] text-base"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                    autoFocus
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p
                        className="text-red-600 text-sm font-medium"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 3: Message - FIXED: No automatic error on empty field */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="space-y-4">
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={(e) => handleInputBlur('message', e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200 placeholder-gray-500 text-[#1A1D29] text-base resize-none"
                    rows="4"
                    required
                    variants={inputVariants}
                    whileFocus="focus"
                    autoFocus
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.p
                        className="text-red-600 text-sm font-medium"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {formErrors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={1}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-2">{language === 'es' ? 'NOMBRE' : 'NAME'}</p>
                      <p className="text-gray-900 font-medium">{formData.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-2">{language === 'es' ? 'CORREO' : 'EMAIL'}</p>
                      <p className="text-gray-900 font-medium">{formData.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-2">{language === 'es' ? 'MENSAJE' : 'MESSAGE'}</p>
                      <p className="text-gray-900 leading-relaxed">{formData.message}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-between pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={handleBack}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            disabled={currentStep === 1}
          >
            ← {language === 'es' ? 'Atrás' : 'Back'}
          </motion.button>

          {currentStep < steps.length - 1 ? (
            <motion.button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // FIXED: Only disable if there's an actual error, not just empty field
              disabled={!!formErrors[steps[currentStep - 1].field]}
            >
              {language === 'es' ? 'Continuar' : 'Continue'} →
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  {t.contact.sending}
                </div>
              ) : (
                t.contact.sendButton
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Status Messages - Only show for actual submission success/error */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              className={`mt-6 p-4 rounded-xl border text-sm ${
                submitStatus === 'success' 
                  ? 'bg-alert-success-bg border-alert-success-icon text-alert-success-text' 
                  : 'bg-alert-error-bg border-alert-error-icon text-alert-error-text'
              }`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="flex items-center gap-3 font-medium">
                <div className={`w-3 h-3 rounded-full ${
                  submitStatus === 'success' ? 'bg-alert-success-icon' : 'bg-alert-error-icon'
                }`}></div>
                <span>
                  {submitStatus === 'success' 
                    ? t.contact.successMessage
                    : t.contact.errorMessage
                  }
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}