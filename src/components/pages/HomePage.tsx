import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  X,
  TrendingUp,
  Calendar,
  Clock,
  BookOpen,
  Target,
  Award,
  Users,
  Play,
  Activity,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  CheckCircle, MessageSquare,
  Plus,
  Instagram,
  Linkedin,
  Timer,
  ChevronRight,
  PenTool,
  Map,
  ListChecks,
  FileText
} from 'lucide-react';
import { supabase } from "../../supabaseClient";
import { colors, getActivityIconColor, getEventColorClasses, getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';

export const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [jiggle, setJiggle] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typedName, setTypedName] = useState('');
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);
  // Focus Timer States
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  // Daily Planner States (same as old todo)
  const [newTask, setNewTask] = useState('');
  const [dailyTasks, setDailyTasks] = useState<{ 
    id: string; 
    title: string; 
    status: string; 
    created_at?: string;
  }[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [activeTaskTab, setActiveTaskTab] = useState<'incomplete' | 'completed'>('incomplete');

  const aiToolsData = [
  {
    id: 1,
    title: 'Chat with Document',
    description: 'Upload any document and have intelligent conversations about its content. Ask questions, get summaries, and extract key insights instantly.',
    icon: MessageSquare,
    color: '#14b8a6',
    features: ['PDF Support', 'Real-time Analysis', 'Multi-language']
  },
  {
    id: 2,
    title: 'Essay Writer',
    description: 'Generate well-structured, original essays on any topic. Perfect for research papers, assignments, and creative writing projects.',
    icon: PenTool,
    color: '#f87171',
    features: ['Multiple Styles', 'Citation Support', 'Plagiarism Free']
  },
  {
    id: 3,
    title: 'Learning Roadmap',
    description: 'Create personalized learning paths tailored to your goals. Get step-by-step guidance from beginner to expert level.',
    icon: Map,
    color: '#a78bfa',
    features: ['Personalized Plans', 'Progress Tracking', 'Resource Links']
  },
  {
    id: 4,
    title: 'Quiz Generator',
    description: 'Automatically create quizzes from any topic or document. Perfect for self-assessment and exam preparation.',
    icon: ListChecks,
    color: '#fbbf24',
    features: ['Multiple Choice', 'True/False', 'Instant Feedback']
  },
  {
    id: 5,
    title: 'Smart Study Planner',
    description: 'AI-powered study schedules that adapt to your learning style and availability. Optimize your study time effectively.',
    icon: Target,
    color: '#34d399',
    features: ['Auto-scheduling', 'Break Reminders', 'Goal Setting']
  },
  {
    id: 6,
    title: 'Content Summarizer',
    description: 'Condense long articles, papers, and documents into concise summaries. Save time while retaining key information.',
    icon: FileText,
    color: '#fb923c',
    features: ['Quick Summaries', 'Key Points', 'Adjustable Length']
  }
];

  const [courses] = useState([
  {
    id: 1,
    title: 'React Advanced Patterns',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    students: 1234,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'JavaScript ES6+',
    instructor: 'Mike Chen',
    duration: '6 weeks',
    students: 2341,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Node.js Mastery',
    instructor: 'Emma Wilson',
    duration: '10 weeks',
    students: 987,
    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'TypeScript Deep Dive',
    instructor: 'David Park',
    duration: '7 weeks',
    students: 1567,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop'
  }
]);



  useEffect(() => {
    const interval = setInterval(() => {
      setJiggle(true);
      setTimeout(() => setJiggle(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setUserName(data.first_name);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!loading && userName) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedName(userName.slice(0, index + 1));
        index++;
        if (index === userName.length) clearInterval(interval);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [loading, userName]);

  // Focus Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isFocusRunning) {
      interval = setInterval(() => {
        if (focusSeconds === 0) {
          if (focusMinutes === 0) {
            setIsFocusRunning(false);
            // Timer completed - could add notification here
          } else {
            setFocusMinutes(focusMinutes - 1);
            setFocusSeconds(59);
          }
        } else {
          setFocusSeconds(focusSeconds - 1);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusRunning, focusMinutes, focusSeconds]);

  // Fetch Daily Tasks
  useEffect(() => {
    const fetchDailyTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('todos')
        .select('id, title, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setDailyTasks(data);
      }
    };

    fetchDailyTasks();
  }, []);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const addDailyTask = async () => {
  if (!newTask.trim()) return;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title: newTask, user_id: user.id, status: 'pending' }])
    .select()
    .single();

  if (!error && data) {
    setDailyTasks(prev => [data, ...prev]);
    setNewTask('');
  }
};

const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
  const newStatus = currentStatus === 'done' ? 'pending' : 'done';
  
  const { error } = await supabase
    .from('todos')
    .update({ status: newStatus })
    .eq('id', taskId);

  if (!error) {
    setDailyTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  }
};

const deleteTask = async (taskId: string) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', taskId);

  if (!error) {
    setDailyTasks(prev => prev.filter(t => t.id !== taskId));
  }
};

const resetFocusTimer = () => {
  setFocusMinutes(25);
  setFocusSeconds(0);
  setIsFocusRunning(false);
};

  const featuredCourses = [
    { id: 1, title: 'React Basics', color: themeColors.accent.blue },
    { id: 2, title: 'JavaScript ES6', color: themeColors.accent.green },
    { id: 3, title: 'Node.js', color: themeColors.accent.purple },
    { id: 4, title: 'TypeScript', color: themeColors.accent.orange }
  ];

  const aiTools = [
    { id: 1, title: 'Chat AI', color: themeColors.accent.green },
    { id: 2, title: 'Essay Writer', color: themeColors.accent.pink },
    { id: 3, title: 'Quiz Gen', color: themeColors.accent.purple },
    { id: 4, title: 'Roadmap', color: themeColors.accent.yellowBright }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary.lightGray }}>
      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16 md:h-20 lg:h-24"></div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Top Welcome Section - KEPT SAME */}
        <div className="border-2 rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black }}>
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-5 lg:py-6 xl:py-6">
            <div className="flex items-stretch gap-3 sm:gap-4 lg:gap-6 w-full">
              <div className="flex-[2] flex flex-col items-center justify-center text-center px-2 sm:px-4">
                <div className={`flex justify-center items-center mb-4 ${jiggle ? 'animate-pulse' : ''}`}>
                  <span className="text-sm sm:text-base lg:text-lg font-medium" style={{ color: themeColors.text.secondary }}>
                    {getCurrentGreeting()}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4" style={{ color: themeColors.text.primary }}>
                  Welcome back
                  {typedName || userName ? ',' : ''}{' '}
                  {(typedName || userName) && (
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                      {typedName || userName}!
                    </span>
                  )}
                </h1>

                <p className="text-xs sm:text-base lg:text-lg italic text-center leading-relaxed mb-2" style={{ color: themeColors.text.secondary }}>
                  "The beautiful thing about learning is that no one can take it away from you."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Section - Improved Design */}
<div className="mb-6 sm:mb-8">
  {/* Main Container Card */}
  <div 
  className="rounded-3xl shadow-xl border-0 p-6 sm:p-8 lg:p-10"
  style={{
    backgroundColor: themeColors.primary.lG,
    borderColor: themeColors.primary.black
  }}
>


    {/* Stats Grid - 4 Cards in a row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      
      {/* Current Streak */}
      <div 
        className="rounded-2xl p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        style={{
          backgroundColor: themeColors.accent.purple,
          borderColor: themeColors.primary.black
        }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: themeColors.text.primary, transform: 'translate(30%, -30%)' }}></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-3">
            <Activity className="w-7 h-7" style={{ color: themeColors.text.primary }} />
            </div>
          <p className="text-5xl font-bold mb-1" style={{ color: themeColors.text.primary }}>12</p>
          <p className="text-sm font-semibold" style={{ color: themeColors.text.primary, opacity: 0.8 }}>Day Streak 🔥</p>
        </div>
      </div>

      {/* Courses Registered */}
      <div 
        className="rounded-2xl p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        style={{
          backgroundColor: themeColors.accent.blue,
          borderColor: themeColors.primary.black
        }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: themeColors.text.primary, transform: 'translate(30%, -30%)' }}></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-3">
            <BookOpen className="w-7 h-7" style={{ color: themeColors.text.primary }} />
          </div>
          <p className="text-5xl font-bold mb-1" style={{ color: themeColors.text.primary }}>7</p>
          <p className="text-sm font-semibold" style={{ color: themeColors.text.primary, opacity: 0.8 }}>Active Courses 📚</p>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div 
        className="rounded-2xl p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        style={{
          backgroundColor: themeColors.accent.yellow,
          borderColor: themeColors.primary.black
        }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: themeColors.text.primary, transform: 'translate(30%, -30%)' }}></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-3">
            <Calendar className="w-7 h-7" style={{ color: themeColors.text.primary }} />
          </div>
          <p className="text-5xl font-bold mb-1" style={{ color: themeColors.text.primary }}>3</p>
          <p className="text-sm font-semibold" style={{ color: themeColors.text.primary, opacity: 0.8 }}>Classes Today 📅</p>
        </div>
      </div>

      {/* Focus Timer */}
      <div 
        className="rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl"
        style={{
          backgroundColor: themeColors.accent.red,
          borderColor: themeColors.primary.black
        }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: themeColors.text.primary, transform: 'translate(30%, -30%)' }}></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-2">
            <Timer className="w-7 h-7" style={{ color: themeColors.text.primary }} />
            <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: themeColors.text.primary }}>{isFocusRunning ? 'Running' : 'Idle'}</span>
          </div>
          <p className="text-4xl font-bold tabular-nums mb-2" style={{ color: themeColors.text.primary }}>
            {String(focusMinutes).padStart(2, '0')}:{String(focusSeconds).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFocusRunning(!isFocusRunning)}
              className="flex-1 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: themeColors.primary.black,
                color: themeColors.text.white
              }}
            >
              {isFocusRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetFocusTimer}
              className="px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: themeColors.primary.black,
                color: themeColors.text.white
              }}
            >
              ↻
            </button>
          </div>
        </div>
      </div>

    </div>

    {/* Daily Planner Section */}
    <div 
      className="rounded-2xl p-6 sm:p-7 border-2 shadow-lg"
      style={{
        backgroundColor: themeColors.background.white,
        borderColor: themeColors.primary.black
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${themeColors.accent.orange}, ${themeColors.accent.yellowBright})`
            }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: themeColors.text.primary }} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: themeColors.text.primary }}>
              Daily Planner
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: themeColors.text.secondary }}>
              {dailyTasks.filter(t => t.status === 'pending').length} pending · {dailyTasks.filter(t => t.status === 'done').length} completed
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border-2" style={{ backgroundColor: themeColors.accent.green, borderColor: themeColors.primary.black }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <span className="text-sm font-bold" style={{ color: themeColors.text.primary }}>
              {dailyTasks.length > 0 ? Math.round((dailyTasks.filter(t => t.status === 'done').length / dailyTasks.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Add Task Input */}
      <div className="flex gap-3 mb-6">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addDailyTask(); }}
          placeholder="✨ What's on your agenda today?"
          className="flex-1 px-5 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 border-2 transition-all shadow-sm"
          style={{
            backgroundColor: themeColors.background.white,
            borderColor: themeColors.primary.lightGray,
            color: themeColors.text.primary
          }}
        />
        <button
          onClick={async () => {
            if (!newTask.trim()) return;
            setIsAddingTask(true);
            await addDailyTask();
            setIsAddingTask(false);
          }}
          disabled={isAddingTask || !newTask.trim()}
          className="px-5 sm:px-7 py-3.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
          style={{ 
            backgroundColor: themeColors.accent.yellowBright,
            color: themeColors.text.primary,
            opacity: (!newTask.trim() || isAddingTask) ? 0.5 : 1,
            borderWidth: '2px',
            borderColor: themeColors.primary.black
          }}
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>

      {/* Two Column Layout - NO FIXED HEIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Assigned Tasks Column */}
        <div 
          className="rounded-xl p-5"
          style={{
            backgroundColor: themeColors.accent.orange,
            borderColor: themeColors.primary.black
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: themeColors.text.primary }} />
            <h4 className="text-lg font-bold" style={{ color: themeColors.text.primary }}>
              Assigned ({dailyTasks.filter(t => t.status === 'pending').length})
            </h4>
          </div>
          
          {dailyTasks.filter(t => t.status === 'pending').length === 0 ? (
            <div className="text-center py-0">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <CheckCircle className="w-7 h-7" style={{ color: themeColors.text.primary, opacity: 0.3 }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {dailyTasks.filter(t => t.status === 'pending').map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-md group"
                  style={{
                    backgroundColor: themeColors.background.white,
                    borderColor: themeColors.primary.black
                  }}
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className="flex-shrink-0 w-5 h-5 rounded border-2 transition-all hover:scale-110"
                    style={{
                      borderColor: themeColors.accent.blue
                    }}
                  ></button>
                  <span 
                    className="flex-1 text-sm font-medium"
                    style={{ color: themeColors.text.primary }}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:scale-110"
                    style={{ color: themeColors.accent.red }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks Column */}
        <div 
          className="rounded-xl p-5"
          style={{
            backgroundColor: themeColors.accent.green,
            borderColor: themeColors.primary.black
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" style={{ color: themeColors.text.primary }} />
            <h4 className="text-lg font-bold" style={{ color: themeColors.text.primary }}>
              Completed ({dailyTasks.filter(t => t.status === 'done').length})
            </h4>
          </div>
          
          {dailyTasks.filter(t => t.status === 'done').length === 0 ? (
            <div className="text-center py-0">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <Activity className="w-7 h-7" style={{ color: themeColors.text.primary, opacity: 0.3 }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {dailyTasks.filter(t => t.status === 'done').map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-md group"
                  style={{
                    backgroundColor: themeColors.background.white,
                    borderColor: themeColors.primary.black
                  }}
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      backgroundColor: themeColors.accent.blue,
                      borderColor: themeColors.accent.blue
                    }}
                  >
                    <CheckCircle size={12} style={{ color: themeColors.text.white }} />
                  </button>
                  <span 
                    className="flex-1 text-sm font-medium line-through opacity-60"
                    style={{ color: themeColors.text.primary }}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:scale-110"
                    style={{ color: themeColors.accent.red }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>

  </div>
</div>

        {/* Featured Courses Section */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8" style={{ backgroundColor: themeColors.accent.yellow }}>
          <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 inline-block" style={{ color: themeColors.text.primary }}>
                  Featured Courses
                </h2>
                <svg className="w-80 h-3 mt-1" viewBox="0 0 250 8" preserveAspectRatio="none">
                  <path d="M0,4 Q60,2 120,5 T250,4" stroke={themeColors.text.primary} strokeWidth="3" fill="none" />
                </svg>
              </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                style={{ backgroundColor: themeColors.background.white }}
              >
                {/* Course Image */}
                <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/4F46E5/ffffff?text=Course';
                    }}
                  />
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: themeColors.text.primary }}>
                    {course.title}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: themeColors.text.secondary }}>
                    by {course.instructor}
                  </p>
                  <div className="flex items-center gap-3 text-xs mb-3" style={{ color: themeColors.text.tertiary }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}
                    </span>
                  </div>
                  
                  <button className="w-full py-2 rounded-lg font-bold text-sm transition-transform transform hover:scale-105" style={{ backgroundColor: themeColors.accent.blue, color: '#ffffff' }}>
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Classes Section */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8" style={{ backgroundColor: themeColors.accent.red }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 inline-block" style={{ color: themeColors.text.primary }}>
                  Live Classes
                </h2>
                <svg className="w-56 h-3 mt-1" viewBox="0 0 250 8" preserveAspectRatio="none">
                  <path d="M0,4 Q60,2 120,5 T250,4" stroke={themeColors.text.primary} strokeWidth="3" fill="none" />
                </svg>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: themeColors.text.primary }}>
                  Join interactive live sessions with expert instructors from around the world.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: themeColors.text.primary }}>
                  Get real-time feedback, ask questions, and collaborate with peers in our virtual classroom.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: themeColors.text.primary }}>
                  Access recordings and transcripts after each session for future reference.
                </p>
              </div>
              
              <button className="px-8 py-4 rounded-xl font-bold text-lg transition-transform transform hover:scale-105 shadow-lg inline-block w-fit" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
                Register Now
              </button>
            </div>

            {/* Right - Video Placeholder */}
            <div className="flex items-center justify-center rounded-2xl cursor-pointer transition-transform transform hover:scale-105" style={{ backgroundColor: themeColors.primary.black, minHeight: '300px' }}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform transform hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Play className="w-10 h-10" style={{ color: themeColors.text.white }} fill="white" />
                </div>
                <p className="text-sm" style={{ color: themeColors.text.white }}>Watch Demo</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Hub Section */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8" style={{ backgroundColor: themeColors.accent.blue }}>
          <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 inline-block" style={{ color: themeColors.text.primary }}>
                  AI Hub
                </h2>
                <svg className="w-36 h-3 mt-1" viewBox="0 0 250 8" preserveAspectRatio="none">
                  <path d="M0,4 Q60,2 120,5 T250,4" stroke={themeColors.text.primary} strokeWidth="3" fill="none" />
                </svg>
          </div>
          
          {/* Horizontally Scrollable Container */}
<div className="overflow-x-auto pb-4">
  <div className="flex gap-4 sm:gap-6" style={{ minWidth: 'max-content' }}>
    {aiToolsData.map((tool, index) => {
      // Assign colors from themeColors in a rotating pattern
      const colorOptions = [
        themeColors.accent.yellow,
        themeColors.accent.green,
        themeColors.accent.purple,
        themeColors.accent.orange,
        themeColors.accent.yellow,
        themeColors.accent.red
      ];
      const toolColor = colorOptions[index % colorOptions.length];
      
      return (
        <div
          key={tool.id}
          className="rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer p-6 flex-shrink-0"
          style={{ 
            backgroundColor: toolColor, 
            width: '320px',
          }}
        >
          {/* Icon */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" 
            style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
          >
            <tool.icon className="w-7 h-7" style={{ color: themeColors.text.primary }} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3" style={{ color: themeColors.text.primary }}>
            {tool.title}
          </h3>

          {/* Description */}
          <p className="text-sm mb-4 line-clamp-3" style={{ color: themeColors.text.primary, opacity: 0.85 }}>
            {tool.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.15)', 
                  color: themeColors.text.primary 
                }}
              >
                <CheckCircle className="w-3 h-3" />
                {feature}
              </span>
            ))}
          </div>

          {/* Launch Button */}
          <button 
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 border-2" 
            style={{ 
              backgroundColor: themeColors.primary.black, 
              color: themeColors.text.white,
              borderColor: themeColors.primary.black
            }}
          >
            Launch Tool
            <ChevronRight size={16} />
          </button>
        </div>
      );
    })}
  </div>
</div>

          {/* Scroll Indicator */}
          <p className="text-center text-sm mt-4 text-gray-400">← Scroll to see more tools →</p>
        </div>
      </div>

      {/* Footer - KEPT SAME */}
      <footer className="bg-black text-white border-2 border-black rounded-3xl shadow-2xl mx-6 mb-6 mt-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 xl:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">DE-ECO</h3>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-sm">
                Empowering learners worldwide with innovative educational experiences and cutting-edge technology.
              </p>
              <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition" />
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Courses</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Certificates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Help Center</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Technical Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4">Contact</h4>
              <div className="space-y-1 sm:space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-sm">
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                  <span className="text-gray-300">support@learnhub.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 LearnHub. All rights reserved.
            </p>
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 xl:bottom-8 xl:right-8 z-40">
        {!isChatbotOpen ? (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-white p-2 sm:p-3 lg:p-4 border shadow-xl rotate-45"
            style={{ width: '40px', height: '40px', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          >
            <div className="-rotate-45 flex items-center justify-center">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
          </button>
        ) : (
          <div className="p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-2xl w-64 sm:w-72 lg:w-80 border max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)]" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.mediumGray }}>
            <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
              <h3 className="font-bold text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Chat Bot</h3>
              <button onClick={() => setIsChatbotOpen(false)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
            <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 lg:mb-4">
              <div className="p-2 sm:p-3 rounded text-xs sm:text-sm" style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.primary }}>Hello! How can I help you?</div>
              <div className="p-2 sm:p-3 rounded ml-3 sm:ml-4 lg:ml-6 text-xs sm:text-sm" style={{ backgroundColor: themeColors.accent.green, color: themeColors.text.primary }}>Hi! I need help with my courses.</div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type message..."
                className="flex-1 border p-1 sm:p-2 rounded mr-1 sm:mr-2 text-xs sm:text-sm"
                style={{
                  borderColor: themeColors.primary.mediumGray,
                  backgroundColor: themeColors.background.white,
                  color: themeColors.text.primary
                }}
              />
              
              <button className="p-1 sm:p-2 rounded flex-shrink-0 hover:opacity-90 transition" style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}>
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};