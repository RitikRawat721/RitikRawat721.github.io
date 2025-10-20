import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      console.error("login error", error);
      setErr("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    },
    loading: {
      scale: 0.98,
    }
  }

  const errorVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  }

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const particleVariants = {
    animate: {
      y: [0, -30, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#f8fafc] via-white to-white/20 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Particles */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-primary/40 rounded-full"
        variants={particleVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-20 w-1 h-1 bg-primary/30 rounded-full"
        variants={particleVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/50 rounded-full"
        variants={particleVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 right-16 w-1.5 h-1.5 bg-primary/40 rounded-full"
        variants={particleVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      />

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-32 left-16 w-8 h-8 bg-primary/20 rounded-full blur-sm"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-40 right-24 w-12 h-12 bg-primary/15 rounded-full blur-sm"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/25 rounded-full blur-sm"
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 4 }}
      />

      <motion.form 
        onSubmit={handleSubmit} 
        className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-neutral-border shadow-2xl hover:shadow-3xl transition-all duration-500 z-10"
        variants={formVariants}
        whileHover={{ y: -5 }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            <motion.span 
              className="text-3xl text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔒
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Secure Access
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary via-primary-light to-primary-hover mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          
          <motion.p
            className="text-[#1A1D29]/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Admin portal for therapy practice management
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {/* Email Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.input 
              className="w-full px-5 py-4 bg-[#f8fafc]/70 border-2 border-neutral-border rounded-2xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50 text-[#1A1D29] font-medium backdrop-blur-sm"
              type="email" 
              placeholder="Enter your email address"
              value={email} 
              onChange={e=>setEmail(e.target.value)}
              onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
              required
              variants={inputVariants}
              whileFocus="focus"
            />
            <AnimatePresence>
              {isFocused.email && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.input 
              className="w-full px-5 py-4 bg-[#f8fafc]/70 border-2 border-neutral-border rounded-2xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50 text-[#1A1D29] font-medium backdrop-blur-sm"
              placeholder="Enter your password" 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
              required
              variants={inputVariants}
              whileFocus="focus"
            />
            <AnimatePresence>
              {isFocused.password && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {err && (
              <motion.div 
                className="p-4 bg-alert-error-bg backdrop-blur-sm border-2 border-alert-error-icon rounded-2xl text-alert-error-text font-medium"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-3 h-3 bg-alert-error-icon rounded-full flex-shrink-0"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span>{err}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-semibold text-white shadow-2xl transition-all duration-300 relative overflow-hidden group ${
              isLoading 
                ? 'bg-[#1A1D29]/40 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-hover'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover={isLoading ? {} : "hover"}
            whileTap="tap"
            animate={isLoading ? "loading" : "initial"}
          >
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Button Content */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="font-medium">Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="font-medium">Access Dashboard</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </div>

            {/* Loading Progress Bar */}
            {isLoading && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        </div>

        {/* Security Footer */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔒
            </motion.div>
            <span>Secure admin access • Encrypted connection</span>
          </div>
        </motion.div>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full"
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </motion.form>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}