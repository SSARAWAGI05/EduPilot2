// src/styles/colors.ts

export const colors = {
  // Light Mode Colors - SOFT PASTELS & NEUTRALS
  lightMonochrome: {
    primary: {
      w: '#ffffff',
      black: '#1a1a1a',
      darkGray: '#333333',
      mediumGray: '#666666',
      lightGray: '#bfbfbf',
      lG: '#e3e3e3ff',
      offWhite: '#f7f7f7',
      beige: '#f2f2f2',
    },
    accent: {
      blue: '#9ca3af',
      br: '#9ca3af',
      blueLight: '#d1d5db',
      yellow: '#f3e8b0',
      yellowBright: '#f1c40f',
      red: '#d1a1a1',
      pink: '#e6cbd3',
      pinkLight: '#f3e9ec',
      orange: '#e7d6c8',
      green: '#cfe8d8',
      purple: '#d9cfe6',
      orangeSection: '#ece6de',
      brown: '#d4c4b0',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#343a40',
      tertiary: '#4b5563',
      light: '#6b7280',
      lighter: '#889096',
      lightest: '#a3a3a3',
      white: '#ffffff',
      dark: '#000000',
      muted: '#6b7280',
    },
    background: {
      white: '#ffffff',
      offWhite: '#f7f7f7',
      lightGray: '#f2f2f2',
      beige: '#fbf8f6',
      black: '#000000',
      darkSection: '#efefef',
      elevated: '#fafafa',
    },
    card: {
      bg: '#cfe8d8',
      border: '#bfbfbf',
    },
    priority: {
      high: '#ffd6d6',
      medium: '#fff4cc',
      low: '#d6ebff',
      default: '#f8f9fa',
    },
    status: {
      success: '#d1f7e0',
      warning: '#fff4d6',
      error: '#ffd6d6',
      info: '#e6f2ff',
    },
  },

  // Dark Monochrome Mode - Minimal & Muted for focus
  darkMonochrome: {
    primary: {
      w: '#000000ff',
      black: '#ffffff',
      darkGray: '#d4d4d4',
      mediumGray: '#9ca3af',
      lightGray: '#6b7280',
      lG: '#aaa9a9ff',
      offWhite: '#0b0b0b',
      beige: '#141414',
    },
    accent: {
      blue: '#606060ff',
      br: '#9ca3af',
      blueLight: '#3e424bff',
      yellow: '#b4a0a0ff',
      yellowBright: '#a3a3a3',
      red: '#bfbfbf',
      pink: '#b8b8b8',
      pinkLight: '#7d7d7d',
      orange: '#9ca3af',
      green: '#9ca3af',
      purple: '#9ca3af',
      orangeSection: '#525252',
      brown: '#5a5a5a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e6e6e6',
      tertiary: '#bfbfbf',
      light: '#9ca3af',
      lighter: '#80838f',
      lightest: '#6b7280',
      white: '#0a0909ff',
      dark: '#0a0a0a',
      muted: '#9ca3af',
    },
    background: {
      white: '#0a0a0a',
      offWhite: '#050505',
      lightGray: '#111111',
      beige: '#1a1a1a',
      black: '#000000',
      darkSection: '#0d0d0d',
      elevated: '#1a1a1a',
    },
    card: {
      bg: '#9ca3af',
      border: '#4b4b4b',
    },
    priority: {
      high: '#4b4b4b',
      medium: '#6b6b6b',
      low: '#8c8c8c',
      default: '#bfbfbf',
    },
    status: {
      success: '#2f855a',
      warning: '#d69e2e',
      error: '#e53e3e',
      info: '#3182ce',
    },
  },

  // Light Theme - Friendly Pastels & Clear Contrast
  light: {
    primary: {
      w: '#ffffff',
      black: '#1e1e1e',
      darkGray: '#495057',
      mediumGray: '#6c757d',
      lightGray: '#e9ecef',
      lG: '#bfbfbf',
      offWhite: '#f8f9fa',
      beige: '#f6f2f0',
    },

    accent: {
      blue: '#7cc0ff',
      br: '#7cc0ff',
      blueLight: '#e6f6ff',
      yellow: '#ffecb5',
      yellowBright: '#ffd43b',
      red: '#ffc9c9',
      pink: '#ff8fa3',
      pinkLight: '#fde7ef',
      orange: '#fff4e6',
      green: '#bbf7d0',
      purple: '#e9d5ff',
      orangeSection: '#fed8aa',
      brown: '#d4a574',
    },

    text: {
      primary: '#0f1724',
      secondary: '#374151',
      tertiary: '#6c757d',
      light: '#4b5563',
      lighter: '#6b7280',
      lightest: '#9ca3af',
      white: '#ffffff',
      dark: '#0b1220',
      muted: '#6b7280',
    },

    background: {
      white: '#ffffff',
      offWhite: '#f8f9fa',
      lightGray: '#f1f5f9',
      beige: '#fbf7f5',
      black: '#000000',
      darkSection: '#f3f4f6',
      elevated: '#f8f9fa',
    },

    card: {
      bg: '#bbf7d0',
      border: '#e9ecef',
    },

    priority: {
      high: '#ffc9c9',
      medium: '#ffec99',
      low: '#a5d8ff',
      default: '#fff4e6',
    },

    status: {
      success: '#34d399',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#60a5fa',
    },
  },

  // Dark Theme - High contrast, consistent accent hues
  dark: {
    primary: {
      w: '#000000ff',
      black: '#000000',
      darkGray: '#e6e6e6',
      mediumGray: '#bdbdbd',
      lightGray: '#1f2937',
      lG: '#E5E7EB',
      offWhite: '#0b0b0b',
      beige: '#121212',
    },

    accent: {
      blue: '#163591',
      br: '#163591',
      blueLight: '#164e63',
      yellow: '#f59e0b',
      yellowBright: '#fbbf24',
      red: '#ef4444',
      pink: '#ec4899',
      pinkLight: '#ef4444',
      orange: '#fb923c',
      green: '#10b981',
      purple: '#7c3aed',
      orangeSection: '#f59e0b',
      brown: '#78350f',
    },

    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
      light: '#9ca3af',
      lighter: '#6b7280',
      lightest: '#4b5563',
      white: '#ffffff',
      dark: '#000000',
      muted: '#9ca3af',
    },

    background: {
      white: '#0b0b0b',
      offWhite: '#000000',
      lightGray: '#0f1724',
      beige: '#0b1220',
      black: '#000000',
      darkSection: '#060606',
      elevated: '#1f2937',
    },

    card: {
      bg: '#10b981',
      border: '#374151',
    },

    priority: {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#0ea5e9',
      default: '#374151',
    },

    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // Gradients
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

  // Activity Type Colors
  activity: {
    course: 'text-blue-600 dark:text-blue-400',
    community: 'text-green-600 dark:text-emerald-400',
    assignment: 'text-red-600 dark:text-red-400',
    session: 'text-purple-600 dark:text-purple-400',
    achievement: 'text-yellow-600 dark:text-amber-400',
    default: 'text-gray-600 dark:text-gray-400',
  },

  // Event Type Colors
  eventTypes: {
    liveClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
    assignment: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700',
    community: 'bg-green-100 text-green-800 border-green-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
    workshop: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700',
    default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
  },

  // Rating
  rating: {
    filled: 'fill-current text-yellow-500 dark:text-amber-400',
    empty: 'text-gray-300 dark:text-gray-700',
  },

  // Chatbot
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

// Helper function to get theme-aware colors with focus mode support
export const getThemeColors = (isDark: boolean, isFocusMode: boolean = false) => {
  if (isFocusMode) {
    return isDark ? colors.darkMonochrome : colors.lightMonochrome;
  }
  return isDark ? colors.dark : colors.light;
};

// Helper function to get priority color - theme-aware
export const getPriorityColor = (priority: string, isDark?: boolean): string => {
  const theme = isDark ? colors.dark : colors.light;
  switch (priority) {
    case 'high': return theme.priority.high;
    case 'medium': return theme.priority.medium;
    case 'low': return theme.priority.low;
    default: return theme.priority.default;
  }
};

// Helper function to get status color - theme-aware
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