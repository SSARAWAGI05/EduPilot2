import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'live-classes', label: 'Live Classes' },
    { id: 'ai-hub', label: 'AI Hub' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'about', label: 'About Us' },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 z-50 hidden md:block">
        <div className="flex items-center justify-between">
          {/* Site Logo and Name - Left Side */}
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${
            isScrolled ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
            <span className="text-gray-900 text-sm lg:text-base xl:text-lg font-bold">EduPilot</span>
          </div>

          {/* Navigation Pills - Right Side */}
          <nav className={`rounded-full px-3 lg:px-4 xl:px-6 py-2 lg:py-3 shadow-lg transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-900/70 backdrop-blur-md border border-gray-700/50' 
              : 'bg-gray-900'
          }`}>
            <div className="flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`px-2 lg:px-3 xl:px-4 py-1 lg:py-2 text-xs lg:text-sm font-bold rounded-full transition-all duration-200 ${
                    currentPage === item.id
                      ? isScrolled
                        ? 'bg-white/90 text-gray-900'
                        : 'bg-white text-gray-900'
                      : isScrolled
                        ? 'text-white/90 hover:bg-white/20'
                        : 'text-white hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={onLogout}
                className={`px-2 lg:px-3 xl:px-4 py-1 lg:py-2 text-xs lg:text-sm font-bold rounded-full transition-all duration-200 ${
                  isScrolled
                    ? 'text-white/90 hover:bg-white/20'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-50 md:hidden">
        <div
          className={`rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg transition-all duration-300 ${
            isScrolled
              ? 'bg-gray-900/80 backdrop-blur-md border border-gray-700/30'
              : 'bg-gray-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-2 sm:gap-3 transition-opacity duration-300 ${
                isScrolled ? 'opacity-80' : 'opacity-100'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
              </div>
              <span
                className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-white/90' : 'text-white'
                }`}
              >
                EduPilot
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? 'text-white/90' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className={`mt-1 sm:mt-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg transition-all duration-300 ${
              isScrolled
                ? 'bg-gray-900/90 backdrop-blur-md'
                : 'bg-gray-900'
            }`}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`block w-full text-left px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? isScrolled
                        ? 'bg-white/90 text-gray-900'
                        : 'bg-white text-gray-900'
                      : isScrolled
                        ? 'text-white/90 hover:bg-white/20'
                        : 'text-white hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={onLogout}
                className={`block w-full text-left px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-white/90 hover:bg-white/20'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for mobile floating navbar */}
      <div className="h-16 sm:h-18 md:hidden"></div>
    </>
  );
};