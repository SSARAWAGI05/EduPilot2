// src/components/FocusModeToggle.tsx
import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

export const FocusModeToggle: React.FC = () => {
  const { isDark, isFocusMode, toggleFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  return (
    <button
      onClick={toggleFocusMode}
      className="fixed bottom-6 left-6 z-[60] p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2"
      style={{
        backgroundColor: themeColors.background.white,
        borderColor: themeColors.primary.lightGray
      }}
      aria-label="Toggle focus mode"
      title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
    >
      {isFocusMode ? (
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.primary.black }} />
      ) : (
        <Target className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.primary.black }} />
      )}
    </button>
  );
};