// src/styles/colors.ts

export const colors = {
  // Light Mode Colors - ORIGINAL PASTELS
  light: {
    // Primary Brand Colors
    primary: {
      black: '#1e1e1e',
      darkGray: '#495057',
      mediumGray: '#6c757d',
      lightGray: '#e9ecef',
      offWhite: '#f8f9fa',
      beige: '#efe9e9ff',
    },

    // Accent Colors (Pastels)
    accent: {
      blue: '#a5d8ff',
      br:'#a5d8ff',
      blueLight: '#e7f5ff',
      yellow: '#ffec99',
      yellowBright: '#ffd43b',
      red: '#ffc9c9',
      pink: '#ff8787',
      pinkLight: '#fbcfe8',
      orange: '#fff4e6',
      green: '#bbf7d0',        // green-200 equivalent
      purple: '#e9d5ff',       // purple-200 equivalent
      orangeSection: '#fed8aa', // orange-200 equivalent
    },

    // Text Colors
    text: {
      primary: '#1e1e1e',
      secondary: '#495057',
      tertiary: '#6c757d',
      light: '#4b5563',
      lighter: '#6b7280',
      lightest: '#9ca3af',
      white: '#ffffff',
      dark: '#111827',
      muted: '#374151',
    },

    // Background Colors
    background: {
      white: '#ffffff',
      offWhite: '#f8f9fa',
      lightGray: '#e9ecef',
      beige: '#efe9e9ff',
      black: '#000000',
      darkSection: '#1e1e1e',
    },

    // Priority Colors (Light Mode)
    priority: {
      high: '#ffc9c9',      // Light red
      medium: '#ffec99',    // Light yellow
      low: '#a5d8ff',       // Light blue
      default: '#fff4e6',   // Light orange
    },

    // Status Colors (Light Mode)
    status: {
      success: '#a5d8ff',   // Light blue
      warning: '#ffec99',   // Light yellow
      error: '#ffc9c9',     // Light red
      info: '#fff4e6',      // Light orange
    },
  },

  // Dark Mode Colors - VIBRANT on BLACK
  dark: {
    // Primary Brand Colors - Pure Black Foundation
    primary: {
      black: '#ffffff',           // Pure white for text
      darkGray: '#e0e0e0',        // Light gray for secondary
      mediumGray: '#b0b0b0',      // Medium gray for tertiary
      lightGray: '#1a1a1a',       // Very dark gray for cards
      offWhite: '#000000',        // Pure black for background
      beige: '#121212',           // Near-black for sections
    },

    // Accent Colors - VIBRANT & COLORFUL on Black
    accent: {
      blue: '#3b82f6',            // Vibrant blue (blue-500)
      br:'#f59e0b',
      blueLight: '#1e3a8a',       // Deep blue for backgrounds
      yellow: '#fbbf24',          // Rich gold (amber-400)
      yellowBright: '#f59e0b',    // Warm amber (amber-500)
      red: '#ef4444',             // Bright red (red-500)
      pink: '#ec4899',            // Hot pink (pink-500)
      pinkLight: '#3b82f6',       // Deep pink (pink-900)
      orange: '#f97316',          // Vibrant orange (orange-500)
      green: '#ef4444',           // Emerald green (green-500)
      purple: '#a855f7',          // Rich purple (purple-500)
      orangeSection: '#ea580c',   // Deep orange (orange-600)
    },

    // Text Colors - High Contrast on Black
    text: {
      primary: '#ffffff',         // Pure white
      secondary: '#e0e0e0',       // Light gray
      tertiary: '#b0b0b0',        // Medium gray
      light: '#9ca3af',
      lighter: '#6b7280',
      lightest: '#4b5563',
      white: '#000000',           // Black for inverted
      dark: '#f9fafb',
      muted: '#9ca3af',
    },

    // Background Colors - Black Base with Dark Layers
    background: {
      white: '#000000ff',           // Very dark gray for cards
      offWhite: '#000000',        // Pure black for main bg
      lightGray: '#121212',       // Near-black for sections
      beige: '#1a1a1a',           // Very dark gray
      black: '#ffffff',           // White for inverted
      darkSection: '#0a0a0a',     // Deepest black
    },

    // Priority Colors - Vibrant & Distinguishable
    priority: {
      high: '#dc2626',       // Bright red (red-600)
      medium: '#f59e0b',     // Amber (amber-500)
      low: '#3b82f6',        // Blue (blue-500)
      default: '#f97316',    // Orange (orange-500)
    },

    // Status Colors - Clear & Colorful
    status: {
      success: '#10b981',    // Emerald green (green-500)
      warning: '#f59e0b',    // Amber (amber-500)
      error: '#ef4444',      // Red (red-500)
      info: '#3b82f6',       // Blue (blue-500)
    },
  },

  // Gradients - Vibrant in dark mode
  gradient: {
    pinkToRed: 'from-pink-500 to-red-500 dark:from-pink-600 dark:to-red-600',
    pinkToRedBg: 'from-pink-400 to-red-400 dark:from-pink-500 dark:to-red-500',
    yellowToOrange: 'from-yellow-400 to-orange-400 dark:from-amber-500 dark:to-orange-500',
    redToPink: 'from-red-400 to-pink-400 dark:from-red-500 dark:to-pink-500',
    blueGradient: 'from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-700',
    yellowGradient: 'from-yellow-200 to-yellow-300 dark:from-amber-600 dark:to-amber-700',
    redGradient: 'from-red-200 to-red-300 dark:from-red-600 dark:to-red-700',
    orangeGradient: 'from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-800',
    pinkPurpleBlue: 'from-pink-300 via-purple-300 to-blue-300 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600',
    grayGradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    darkGrayGradient: 'from-gray-800 to-gray-900',
  },

  // UI Element Colors
  ui: {
    border: {
      black: 'border-black dark:border-gray-800',
      white: 'border-white dark:border-gray-800',
      gray: 'border-gray-300 dark:border-gray-800',
      lightGray: 'border-gray-200 dark:border-gray-800',
    },
    shadow: 'shadow-lg dark:shadow-black/80',
    shadowXl: 'shadow-xl dark:shadow-black/90',
    shadow2xl: 'shadow-2xl dark:shadow-black',
  },

  // Activity Type Colors - Colorful in dark mode
  activity: {
    course: 'text-blue-600 dark:text-blue-400',
    community: 'text-green-600 dark:text-emerald-400',
    assignment: 'text-red-600 dark:text-red-400',
    session: 'text-purple-600 dark:text-purple-400',
    achievement: 'text-yellow-600 dark:text-amber-400',
    default: 'text-gray-600 dark:text-gray-400',
  },

  // Event Type Colors - Vibrant badges
  eventTypes: {
    liveClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
    assignment: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700',
    community: 'bg-green-100 text-green-800 border-green-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
    workshop: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700',
    default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
  },

  // Star/Rating Colors
  rating: {
    filled: 'fill-current text-yellow-500 dark:text-amber-400',
    empty: 'text-gray-300 dark:text-gray-700',
  },

  // Chatbot Colors
  chatbot: {
    user: 'bg-green-50 dark:bg-emerald-900/30',
    bot: 'bg-blue-50 dark:bg-blue-900/30',
    button: 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500',
  },

  // Footer Social Icons
  social: {
    icon: 'text-gray-400 dark:text-gray-500',
    iconHover: 'hover:text-white dark:hover:text-gray-300',
  },
} as const;

// Helper function to get theme-aware colors
export const getThemeColors = (isDark: boolean) => {
  return isDark ? colors.dark : colors.light;
};

// Helper function to get priority color - NOW THEME-AWARE
export const getPriorityColor = (priority: string, isDark?: boolean): string => {
  const theme = isDark ? colors.dark : colors.light;
  switch (priority) {
    case 'high': return theme.priority.high;
    case 'medium': return theme.priority.medium;
    case 'low': return theme.priority.low;
    default: return theme.priority.default;
  }
};

// Helper function to get status color - NOW THEME-AWARE
export const getStatusColor = (status: string, isDark?: boolean): string => {
  const theme = isDark ? colors.dark : colors.light;
  switch (status) {
    case 'confirmed': return theme.status.success;
    case 'pending': return theme.status.warning;
    case 'cancelled': return theme.status.error;
    default: return theme.status.info;
  }
};

// Helper function to get activity icon color class
export const getActivityIconColor = (type: string): string => {
  switch (type) {
    case 'course': return colors.activity.course;
    case 'community': return colors.activity.community;
    case 'assignment': return colors.activity.assignment;
    case 'session': return colors.activity.session;
    case 'achievement': return colors.activity.achievement;
    default: return colors.activity.default;
  }
};

// Helper function to get event color classes
export const getEventColorClasses = (type: string): string => {
  switch (type) {
    case 'Live Class': return colors.eventTypes.liveClass;
    case 'Assignment': return colors.eventTypes.assignment;
    case 'Community': return colors.eventTypes.community;
    case 'Workshop': return colors.eventTypes.workshop;
    default: return colors.eventTypes.default;
  }
};