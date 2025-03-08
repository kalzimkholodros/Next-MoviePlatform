'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TheatersIcon from '@mui/icons-material/Theaters';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }: AuthModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (mounted) {
      setMode(initialMode);
    }
  }, [initialMode, mounted]);

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Clear form
      setEmail('');
      setPassword('');
      
      // Call onSuccess callback
      onSuccess?.();
      
      // Close modal
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay with animated gradient */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,240,0.1),transparent_70%)] animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,0,0,0.1),transparent_70%)] animate-[spin_15s_linear_infinite_reverse]"></div>
          </motion.div>

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20,
              transition: {
                duration: 0.2
              }
            }}
          >
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl w-full max-w-md pointer-events-auto relative overflow-hidden border border-gray-800">
              {/* Animated Background Effects */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-red-500/5 pointer-events-none"></div>
              
              {/* Logo and Close Button */}
              <div className="relative p-8 pb-0 flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <TheatersIcon className="text-red-500 text-3xl animate-pulse" />
                  <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500">
                    JokerFilm
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Content */}
              <div className="relative p-8">
                <motion.h2 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {mode === 'login' ? 'Welcome Back!' : 'Join JokerFilm'}
                </motion.h2>
                <motion.p 
                  className="text-gray-400 mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {mode === 'login' ? 'Sign in to continue watching' : 'Create your account to start watching'}
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div 
                    className="space-y-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {mode === 'signup' && (
                      <motion.div variants={inputVariants} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-red-600/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative">
                          <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                          <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    <motion.div variants={inputVariants} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-red-600/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
                      <div className="relative">
                        <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={inputVariants} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-red-600/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full relative group mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    disabled={isLoading}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
                    <div className="relative bg-gray-900 text-white px-6 py-3 rounded-lg group-hover:bg-gray-800 transition-all duration-200 text-lg font-semibold flex items-center justify-center">
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        mode === 'login' ? 'Sign In' : 'Create Account'
                      )}
                    </div>
                  </motion.button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <motion.div 
                    className="grid grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
                      <GoogleIcon className="text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
                      <FacebookIcon className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
                      <GitHubIcon className="text-gray-400 group-hover:text-white transition-colors duration-200" />
                    </button>
                  </motion.div>
                </form>

                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-gray-400">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="ml-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-400 hover:to-red-400 transition-all duration-200"
                    >
                      {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
};

export default AuthModal; 