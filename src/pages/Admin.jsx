import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../translations/translations'

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rTitle, setRTitle] = useState("");
  const [rUrl, setRUrl] = useState("");
  const [rDesc, setRDesc] = useState("");
  const [submitting, setSubmitting] = useState({ blog: false, resource: false });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'manage'

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBlogs();
      fetchResources();
    }
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
      const snap = await getDocs(q);
      const docs = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data()
      }));
      setBlogs(docs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showNotification(t.admin.notifications.failedLoadBlogs, "error");
    }
  };

  const fetchResources = async () => {
    try {
      const q = query(collection(db, "resources"), orderBy("timestamp", "desc"));
      const snap = await getDocs(q);
      const docs = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data()
      }));
      setResources(docs);
    } catch (error) {
      console.error("Error fetching resources:", error);
      showNotification(t.admin.notifications.failedLoadResources, "error");
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  async function handleAddBlog(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showNotification(t.admin.notifications.fillAllFields, "error");
      return;
    }
    
    setSubmitting(prev => ({ ...prev, blog: true }));
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        author: user.email,
        timestamp: serverTimestamp()
      });
      setTitle(""); 
      setContent("");
      await fetchBlogs(); // Refresh the list
      showNotification(t.admin.notifications.blogPublished);
    } catch (error) {
      console.error("Error adding blog:", error);
      showNotification(t.admin.notifications.blogPublishFailed, "error");
    } finally {
      setSubmitting(prev => ({ ...prev, blog: false }));
    }
  }

  async function handleAddResource(e) {
    e.preventDefault();
    if (!rTitle.trim() || !rUrl.trim() || !rDesc.trim()) {
      showNotification(t.admin.notifications.fillAllFields, "error");
      return;
    }
    
    setSubmitting(prev => ({ ...prev, resource: true }));
    try {
      await addDoc(collection(db, "resources"), {
        title: rTitle,
        url: rUrl,
        description: rDesc,
        timestamp: serverTimestamp()
      });
      setRTitle(""); 
      setRUrl(""); 
      setRDesc("");
      await fetchResources(); // Refresh the list
      showNotification(t.admin.notifications.resourceSaved);
    } catch (error) {
      console.error("Error adding resource:", error);
      showNotification(t.admin.notifications.resourceSaveFailed, "error");
    } finally {
      setSubmitting(prev => ({ ...prev, resource: false }));
    }
  }

  async function handleDeleteBlog(blogId) {
    if (!window.confirm(t.admin.notifications.confirmDeleteBlog)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "blogs", blogId));
      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
      showNotification(t.admin.notifications.blogDeleted);
    } catch (error) {
      console.error("Error deleting blog:", error);
      showNotification(t.admin.notifications.blogDeleteFailed, "error");
    }
  }

  async function handleDeleteResource(resourceId) {
    if (!window.confirm(t.admin.notifications.confirmDeleteResource)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "resources", resourceId));
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
      showNotification(t.admin.notifications.resourceDeleted);
    } catch (error) {
      console.error("Error deleting resource:", error);
      showNotification(t.admin.notifications.resourceDeleteFailed, "error");
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Recent";
    return timestamp.toDate().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      y: -1,
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

  const notificationVariants = {
    hidden: {
      opacity: 0,
      y: -50,
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
      y: -50,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white/30 flex items-center justify-center pt-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-[#1A1D29]/60 text-lg font-medium">{t.admin.loading}</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white/30 py-8 px-4 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t.admin.dashboard}
          </motion.h1>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            className="text-[#1A1D29]/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {t.admin.subtitle}
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-neutral-border shadow-lg">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'create'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-[#1A1D29]/70 hover:text-primary hover:bg-[#f8fafc]'
                }`}
              >
                {t.admin.createTab}
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'manage'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-[#1A1D29]/70 hover:text-primary hover:bg-[#f8fafc]'
                }`}
              >
                {t.admin.manageTab} ({blogs.length + resources.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification.show && (
            <motion.div
              className={`fixed top-24 right-6 z-50 p-4 rounded-2xl border-2 shadow-2xl max-w-sm ${
                notification.type === 'error' 
                  ? 'bg-alert-error-bg border-alert-error-icon text-alert-error-text' 
                  : 'bg-alert-success-bg border-alert-success-icon text-alert-success-text'
              }`}
              variants={notificationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  notification.type === 'error' ? 'bg-alert-error-icon' : 'bg-alert-success-icon'
                }`}></div>
                <span className="font-medium">{notification.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Content Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="grid lg:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Blog Form */}
                <motion.form 
                  onSubmit={handleAddBlog} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-xl hover:shadow-2xl transition-all duration-500"
                  variants={formVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6">
                    <motion.h3 
                      className="text-2xl font-bold text-primary mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {t.admin.createBlogTitle}
                    </motion.h3>
                    <motion.div
                      className="w-12 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>

                  <div className="space-y-4">
                    <motion.input 
                      value={title} 
                      onChange={e=>setTitle(e.target.value)} 
                      placeholder={t.admin.blogTitlePlaceholder}
                      className="w-full px-4 py-3 bg-[#f8fafc]/80 border-2 border-neutral-border rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50"
                      required
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.textarea 
                      value={content} 
                      onChange={e=>setContent(e.target.value)} 
                      placeholder={t.admin.blogContentPlaceholder}
                      className="w-full px-4 py-3 bg-[#f8fafc]/80 border-2 border-neutral-border rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50 resize-none"
                      rows="8"
                      required
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.button 
                      type="submit"
                      disabled={submitting.blog}
                      className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                        submitting.blog 
                          ? 'bg-[#1A1D29]/40 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary-hover'
                      }`}
                      variants={buttonVariants}
                      whileHover={submitting.blog ? {} : "hover"}
                      whileTap="tap"
                      animate={submitting.blog ? "loading" : "initial"}
                    >
                      {submitting.blog ? (
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t.admin.publishing}
                        </div>
                      ) : (
                        t.admin.publishButton
                      )}
                    </motion.button>
                  </div>
                </motion.form>

                {/* Resource Form */}
                <motion.form 
                  onSubmit={handleAddResource} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-xl hover:shadow-2xl transition-all duration-500"
                  variants={formVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6">
                    <motion.h3 
                      className="text-2xl font-bold text-primary mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {t.admin.addResourceTitle}
                    </motion.h3>
                    <motion.div
                      className="w-12 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </div>

                  <div className="space-y-4">
                    <motion.input 
                      value={rTitle} 
                      onChange={e=>setRTitle(e.target.value)} 
                      placeholder={t.admin.resourceTitlePlaceholder}
                      className="w-full px-4 py-3 bg-[#f8fafc]/80 border-2 border-neutral-border rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50"
                      required
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.input 
                      value={rUrl} 
                      onChange={e=>setRUrl(e.target.value)} 
                      type="url"
                      placeholder={t.admin.resourceUrlPlaceholder}
                      className="w-full px-4 py-3 bg-[#f8fafc]/80 border-2 border-neutral-border rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50"
                      required
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.textarea 
                      value={rDesc} 
                      onChange={e=>setRDesc(e.target.value)} 
                      placeholder={t.admin.resourceDescPlaceholder}
                      className="w-full px-4 py-3 bg-[#f8fafc]/80 border-2 border-neutral-border rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-[#1A1D29]/50 resize-none"
                      rows="4"
                      required
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    <motion.button 
                      type="submit"
                      disabled={submitting.resource}
                      className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                        submitting.resource 
                          ? 'bg-[#1A1D29]/40 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary-hover'
                      }`}
                      variants={buttonVariants}
                      whileHover={submitting.resource ? {} : "hover"}
                      whileTap="tap"
                      animate={submitting.resource ? "loading" : "initial"}
                    >
                      {submitting.resource ? (
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t.admin.saving}
                        </div>
                      ) : (
                        t.admin.saveButton
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manage Content Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Blogs Section */}
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{t.admin.manageBlogsTitle}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"></div>
                </div>

                <AnimatePresence>
                  {blogs.length === 0 ? (
                    <motion.div
                      className="text-center py-8 text-[#64748b]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-4xl mb-4">📝</div>
                      <p>{t.admin.noBlogsMessage}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {blogs.map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-neutral-border hover:bg-white transition-all duration-300"
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary mb-1">{blog.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-[#1A1D29]/70">
                              <span>{t.admin.by} {blog.author}</span>
                              <span>•</span>
                              <span>{formatDate(blog.timestamp)}</span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-300"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {t.admin.deleteButton}
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Resources Section */}
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-border shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{t.admin.manageResourcesTitle}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"></div>
                </div>

                <AnimatePresence>
                  {resources.length === 0 ? (
                    <motion.div
                      className="text-center py-8 text-[#64748b]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-4xl mb-4">🔗</div>
                      <p>{t.admin.noResourcesMessage}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resources.map((resource, index) => (
                        <motion.div
                          key={resource.id}
                          className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-neutral-border hover:bg-white transition-all duration-300"
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary mb-1">{resource.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-[#1A1D29]/70">
                              <span className="truncate max-w-xs">{resource.url}</span>
                              <span>•</span>
                              <span>{formatDate(resource.timestamp)}</span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleDeleteResource(resource.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-300"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {t.admin.deleteButton}
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-neutral-border shadow-lg">
            <div className="w-3 h-3 bg-alert-success-icon rounded-full animate-pulse"></div>
            <span className="text-[#1A1D29] font-medium">{t.admin.loggedInAs} {user.email}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}