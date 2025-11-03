// src/styles/colors.ts

export const colors = {
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
    pinkLight: 'pink-200', // for Tailwind classes
    orange: '#fff4e6',
    green: 'green-200', // for Tailwind classes
    purple: 'purple-200', // for Tailwind classes
    orangeSection: 'orange-200', // for Tailwind classes
  },

  // Gradients
  gradient: {
    pinkToRed: 'from-pink-500 to-red-500',
    pinkToRedBg: 'from-pink-400 to-red-400',
    yellowToOrange: 'from-yellow-400 to-orange-400',
    redToPink: 'from-red-400 to-pink-400',
    blueGradient: 'from-blue-200 to-blue-300',
    yellowGradient: 'from-yellow-200 to-yellow-300',
    redGradient: 'from-red-200 to-red-300',
    orangeGradient: 'from-orange-100 to-orange-200',
    pinkPurpleBlue: 'from-pink-300 via-purple-300 to-blue-300',
    grayGradient: 'from-gray-50 to-gray-100',
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

  // UI Element Colors
  ui: {
    border: {
      black: 'border-black',
      white: 'border-white',
      gray: 'border-gray-700',
      lightGray: 'border-gray-200',
    },
    shadow: 'shadow-lg',
    shadowXl: 'shadow-xl',
    shadow2xl: 'shadow-2xl',
  },

  // Status/State Colors
  status: {
    success: '#a5d8ff', // blue - confirmed
    warning: '#ffec99', // yellow - pending
    error: '#ffc9c9', // red - cancelled
    info: '#fff4e6', // orange - info
  },

  // Priority Colors
  priority: {
    high: '#ffc9c9',
    medium: '#ffec99',
    low: '#a5d8ff',
    default: '#fff4e6',
  },

  // Activity Type Colors
  activity: {
    course: 'text-blue-600',
    community: 'text-green-600',
    assignment: 'text-red-600',
    session: 'text-purple-600',
    achievement: 'text-yellow-600',
    default: 'text-gray-600',
  },

  // Event Type Colors (Background + Text + Border)
  eventTypes: {
    liveClass: 'bg-blue-100 text-blue-800 border-blue-200',
    assignment: 'bg-red-100 text-red-800 border-red-200',
    community: 'bg-green-100 text-green-800 border-green-200',
    workshop: 'bg-purple-100 text-purple-800 border-purple-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  },

  // Star/Rating Colors
  rating: {
    filled: 'fill-current text-yellow-500',
    empty: 'text-gray-300',
  },

  // Chatbot Colors
  chatbot: {
    user: 'bg-green-50',
    bot: 'bg-blue-50',
    button: 'bg-blue-500',
  },

  // Footer Social Icons
  social: {
    icon: 'text-gray-400',
    iconHover: 'hover:text-white',
  },
} as const;

// Helper function to get priority color
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high': return colors.priority.high;
    case 'medium': return colors.priority.medium;
    case 'low': return colors.priority.low;
    default: return colors.priority.default;
  }
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed': return colors.status.success;
    case 'pending': return colors.status.warning;
    case 'cancelled': return colors.status.error;
    default: return colors.status.info;
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