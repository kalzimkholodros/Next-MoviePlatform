'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TheatersIcon from '@mui/icons-material/Theaters';

const AuthModal = dynamic(() => import('./modals/AuthModal'), {
  ssr: false,
  loading: () => null,
});

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and after any auth action
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/check-auth', {
        credentials: 'include'
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Scroll handler
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Initial auth check
    checkAuthStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setMounted(false);
    };
  }, []);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        setIsOpen(false); // Close mobile menu if open
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    setIsOpen(false); // Close mobile menu if open
    checkAuthStatus(); // Double check auth status
  };

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'h-16 bg-black/90 backdrop-blur-sm' : 'h-20 bg-gradient-to-b from-black via-black/70 to-transparent'
      }`}>
        <div className="w-full h-full px-4 lg:px-8">
          <div className={`flex items-center justify-between h-full max-w-[1920px] mx-auto`}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <TheatersIcon className="text-white text-4xl relative" />
              </div>
              <div className="relative">
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 group-hover:from-purple-400 group-hover:via-red-400 group-hover:to-orange-400 transition-all duration-300">
                  Joker
                </span>
                <span className="text-3xl font-black text-white group-hover:text-gray-200 transition-colors duration-300">
                  Film
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center flex-1 justify-center space-x-6 lg:space-x-8">
              <Link href="/" className={`nav-link group relative px-4 py-2 ${isActivePath('/') ? 'active' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-xl transition-all duration-300 blur-sm ${isActivePath('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-black/50 rounded-xl transition-all duration-300 ${isActivePath('/') ? 'bg-black/0' : 'group-hover:bg-black/0'}`}></div>
                <div className={`relative flex items-center space-x-2 transition-all duration-300 ${isActivePath('/') ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-red-600/50 rounded-full blur transition-all duration-300 ${isActivePath('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                    <HomeIcon className={`relative transition-colors duration-300 ${isActivePath('/') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  </div>
                  <span className={`font-medium transition-colors duration-300 relative ${isActivePath('/') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    <span className={`absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-red-600/50 blur transition-all duration-300 ${isActivePath('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <span className="relative">Home</span>
                  </span>
                </div>
              </Link>

              <Link href="/movies" className={`nav-link group relative px-4 py-2 ${isActivePath('/movies') ? 'active' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-xl transition-all duration-300 blur-sm ${isActivePath('/movies') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-black/50 rounded-xl transition-all duration-300 ${isActivePath('/movies') ? 'bg-black/0' : 'group-hover:bg-black/0'}`}></div>
                <div className={`relative flex items-center space-x-2 transition-all duration-300 ${isActivePath('/movies') ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-red-600/50 to-purple-600/50 rounded-full blur transition-all duration-300 ${isActivePath('/movies') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                    <WhatshotIcon className={`relative transition-colors duration-300 ${isActivePath('/movies') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  </div>
                  <span className={`font-medium transition-colors duration-300 relative ${isActivePath('/movies') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    <span className={`absolute -inset-1 bg-gradient-to-r from-red-600/50 to-purple-600/50 blur transition-all duration-300 ${isActivePath('/movies') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <span className="relative">Movies</span>
                  </span>
                </div>
              </Link>

              <Link href="/series" className={`nav-link group relative px-4 py-2 ${isActivePath('/series') ? 'active' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-xl transition-all duration-300 blur-sm ${isActivePath('/series') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-black/50 rounded-xl transition-all duration-300 ${isActivePath('/series') ? 'bg-black/0' : 'group-hover:bg-black/0'}`}></div>
                <div className={`relative flex items-center space-x-2 transition-all duration-300 ${isActivePath('/series') ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-red-600/50 rounded-full blur transition-all duration-300 ${isActivePath('/series') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                    <LiveTvIcon className={`relative transition-colors duration-300 ${isActivePath('/series') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  </div>
                  <span className={`font-medium transition-colors duration-300 relative ${isActivePath('/series') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    <span className={`absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-red-600/50 blur transition-all duration-300 ${isActivePath('/series') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <span className="relative">TV Series</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="relative group overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative flex items-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                    <AccountCircleIcon className="text-purple-500 group-hover:text-red-500 transition-colors duration-300" />
                    <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Logout</span>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="relative group overflow-hidden rounded-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative flex items-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                      <AccountCircleIcon className="text-purple-500 group-hover:text-red-500 transition-colors duration-300" />
                      <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Sign In</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="relative group overflow-hidden rounded-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative flex items-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                      <PersonAddIcon className="text-red-500 group-hover:text-purple-500 transition-colors duration-300" />
                      <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Sign Up</span>
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="relative bg-black hover:bg-gray-900 m-[1px] p-2 rounded-lg transition-colors duration-300">
                  {isOpen ? (
                    <CloseIcon className="h-6 w-6 text-white" />
                  ) : (
                    <MenuIcon className="h-6 w-6 text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-black/95 backdrop-blur-sm rounded-2xl mt-2`}>
            <div className="py-4 space-y-4 px-4">
              <Link
                href="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative group ${
                  isActivePath('/') 
                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-red-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <HomeIcon className={isActivePath('/') ? 'text-red-500' : ''} />
                <span>Home</span>
                {isActivePath('/') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-red-600/10 rounded-lg animate-pulse"></div>
                )}
              </Link>

              <Link
                href="/movies"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative group ${
                  isActivePath('/movies') 
                    ? 'text-white bg-gradient-to-r from-red-600/20 to-purple-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <WhatshotIcon className={isActivePath('/movies') ? 'text-red-500' : ''} />
                <span>Movies</span>
                {isActivePath('/movies') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-lg animate-pulse"></div>
                )}
              </Link>

              <Link
                href="/series"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 relative group ${
                  isActivePath('/series') 
                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-red-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <LiveTvIcon className={isActivePath('/series') ? 'text-red-500' : ''} />
                <span>TV Series</span>
                {isActivePath('/series') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-red-600/10 rounded-lg animate-pulse"></div>
                )}
              </Link>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>
              
              <div className="flex flex-col space-y-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="relative group overflow-hidden rounded-full w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                      <AccountCircleIcon className="text-purple-500 group-hover:text-red-500 transition-colors duration-300" />
                      <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Logout</span>
                    </div>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        setIsOpen(false);
                      }}
                      className="relative group overflow-hidden rounded-full w-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                      <div className="relative flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                        <AccountCircleIcon className="text-purple-500 group-hover:text-red-500 transition-colors duration-300" />
                        <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Sign In</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsOpen(false);
                      }}
                      className="relative group overflow-hidden rounded-full w-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 transition-transform duration-300 group-hover:scale-105"></div>
                      <div className="relative flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 m-[1px] px-4 py-2 rounded-full transition-colors duration-300">
                        <PersonAddIcon className="text-red-500 group-hover:text-purple-500 transition-colors duration-300" />
                        <span className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">Sign Up</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar; 