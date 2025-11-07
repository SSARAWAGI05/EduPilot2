// src/styles/colors.ts

export const colors = {
  // Light Mode Colors
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
      blueLight: '#e7f5ff',
      yellow: '#ffec99',
      yellowBright: '#ffd43b',
      red: '#ffc9c9',
      pink: '#ff8787',
      pinkLight: 'pink-200',
      orange: '#fff4e6',
      green: 'green-200',
      purple: 'purple-200',
      orangeSection: 'orange-200',
    },

    // Text Colors
    text: {
      primary: '#1e1e1e',
      secondary: '#495057',
      tertiary: '#6c757d',
      light: 'text-gray-600',
      lighter: 'text-gray-500',
      lightest: 'text-gray-400',
      white: '#ffffff',
      dark: 'text-gray-900',
      muted: 'text-gray-700',
    },

    // Background Colors
    background: {
      white: '#ffffff',
      offWhite: '#f8f9fa',
      lightGray: '#e9ecef',
      beige: '#efe9e9ff',
      black: '#000000ff',
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

  // Dark Mode Colors - PREMIUM & REFINED
  // Dark Mode Colors - POLISHED & VISUALLY BALANCED
dark: {
  // Primary Brand Colors
  primary: {
    black: '#f8fafc',         // near-white text
    darkGray: '#cbd5e1',      // subtle secondary text
    mediumGray: '#94a3b8',    // tertiary text
    lightGray: '#2a3342',     // elevated surfaces
    offWhite: '#0b0f17',      // base background
    beige: '#1a1f2b',         // soft neutral surface
  },

  // Accent Colors - balanced vibrancy
  accent: {
    blue: '#60a5fa',          // calm blue (blue-400)
    blueLight: '#1e3a8a',     // deep blue background
    yellow: '#facc15',        // bright warm gold
    yellowBright: '#eab308',  // richer amber
    red: '#f87171',           // soft coral-red
    pink: '#f472b6',          // soft magenta
    pinkLight: '#9d174d',     // muted deep rose
    orange: '#fb923c',        // gentle orange
    green: '#34d399',         // emerald green
    purple: '#a78bfa',        // elegant violet
    orangeSection: '#ea580c', // deep orange
  },

  // Text Colors
  text: {
    primary: '#f8fafc',       // crisp white
    secondary: '#d1d5db',     // clear gray
    tertiary: '#9ca3af',      // subdued
    light: 'text-slate-400',
    lighter: 'text-slate-500',
    lightest: 'text-slate-600',
    white: '#0b0f17',         // inverted bg text
    dark: 'text-slate-100',
    muted: 'text-slate-400',
  },

  // Background Colors
  background: {
    white: '#1e2532',         // card surface
    offWhite: '#0b0f17',      // main background
    lightGray: '#151b26',     // sections
    beige: '#1d2433',         // alt surface
    black: '#f8fafc',         // inverted text
    darkSection: '#0a0e14',   // deepest area
  },

  // Priority Colors (Dark Mode)
  priority: {
    high: '#b91c1c',     // vivid dark red
    medium: '#b45309',   // amber brown
    low: '#2563eb',      // vibrant blue
    default: '#c2410c',  // rich orange
  },

  // Status Colors (Dark Mode)
  status: {
    success: '#16a34a',  // green-600
    warning: '#b45309',  // amber-700
    error: '#b91c1c',    // red-700
    info: '#2563eb',     // blue-600
  },
},


  // Gradients (work in both modes)
  gradient: {
    pinkToRed: 'from-pink-500 to-red-500',
    pinkToRedBg: 'from-pink-400 to-red-400',
    yellowToOrange: 'from-yellow-400 to-orange-400',
    redToPink: 'from-red-400 to-pink-400',
    blueGradient: 'from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-700',
    yellowGradient: 'from-yellow-200 to-yellow-300 dark:from-amber-600 dark:to-amber-700',
    redGradient: 'from-red-200 to-red-300 dark:from-red-600 dark:to-red-700',
    orangeGradient: 'from-orange-100 to-orange-200 dark:from-orange-700 dark:to-orange-800',
    pinkPurpleBlue: 'from-pink-300 via-purple-300 to-blue-300 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600',
    grayGradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    darkGrayGradient: 'from-gray-800 to-gray-900',
  },

  // UI Element Colors (mode-agnostic with Tailwind dark: classes)
  ui: {
    border: {
      black: 'border-black dark:border-slate-600',
      white: 'border-white dark:border-slate-700',
      gray: 'border-gray-300 dark:border-slate-600',
      lightGray: 'border-gray-200 dark:border-slate-700',
    },
    shadow: 'shadow-lg dark:shadow-slate-900/50',
    shadowXl: 'shadow-xl dark:shadow-slate-900/60',
    shadow2xl: 'shadow-2xl dark:shadow-slate-900/70',
  },

  // Activity Type Colors with dark mode support
  activity: {
    course: 'text-blue-600 dark:text-blue-400',
    community: 'text-green-600 dark:text-green-400',
    assignment: 'text-red-600 dark:text-red-400',
    session: 'text-purple-600 dark:text-purple-400',
    achievement: 'text-yellow-600 dark:text-amber-400',
    default: 'text-gray-600 dark:text-gray-400',
  },

  // Event Type Colors with dark mode support
  eventTypes: {
    liveClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
    assignment: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
    community: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
    workshop: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
    default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600',
  },

  // Star/Rating Colors
  rating: {
    filled: 'fill-current text-yellow-500 dark:text-amber-400',
    empty: 'text-gray-300 dark:text-slate-600',
  },

  // Chatbot Colors
  chatbot: {
    user: 'bg-green-50 dark:bg-green-900/20',
    bot: 'bg-blue-50 dark:bg-blue-900/20',
    button: 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500',
  },

  // Footer Social Icons
  social: {
    icon: 'text-gray-400 dark:text-slate-400',
    iconHover: 'hover:text-white dark:hover:text-slate-200',
  },
} as const;

// Helper function to get theme-aware colors
export const getThemeColors = (isDark: boolean) => {
  return isDark ? colors.dark : colors.light;
};

// Helper function to get priority color - NOW THEME-AWARE
export const getPriorityColor = (priority: string, isDark: boolean): string => {
  const theme = isDark ? colors.dark : colors.light;
  switch (priority) {
    case 'high': return theme.priority.high;
    case 'medium': return theme.priority.medium;
    case 'low': return theme.priority.low;
    default: return theme.priority.default;
  }
};

// Helper function to get status color - NOW THEME-AWARE
export const getStatusColor = (status: string, isDark: boolean): string => {
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