// src/components/ThemeToggle.tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  const themeColors = getThemeColors(isDark);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[60] p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2"
      style={{
        backgroundColor: themeColors.background.white,
        borderColor: themeColors.primary.lightGray
      }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.yellowBright }} />
      ) : (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.primary.black }} />
      )}
    </button>
  );
};