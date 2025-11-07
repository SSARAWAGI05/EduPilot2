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
  Star,
  ArrowRight,
  Activity,
  Sparkles,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { supabase } from "../../supabaseClient";
import { colors, getActivityIconColor, getEventColorClasses, getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';  // ← ADD THIS LINE

export const HomePage: React.FC = () => {
  const { isDark } = useTheme();  // ← ADD THIS
  const themeColors = getThemeColors(isDark);  // ← ADD THIS
  const [userName, setUserName] = useState<string | null>(null);
  const [jiggle, setJiggle] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [typedName, setTypedName] = useState('');
  const [newTodo, setNewTodo] = useState('');
  
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
        setLoading(false);  // stop loading even if no user
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

      setLoading(false);  // done loading
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('todos')
        .select('id, title, description, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setTodoItems(data);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, content, is_active')
        .eq('is_active', true) // only active announcements
        .order('created_at', { ascending: false }); // latest first

      if (!error && data) {
        setAnnouncements(data);
      }
    };

    fetchAnnouncements();
  }, []);


  useEffect(() => {
    if (!loading && userName) { // start only if we have a userName
      let index = 0;
      const interval = setInterval(() => {
        setTypedName(userName.slice(0, index + 1));
        index++;
        if (index === userName.length) clearInterval(interval);
      }, 150); // adjust typing speed here
      return () => clearInterval(interval);
    }
  }, [loading, userName]);


  const addTodo = async () => {
    if (!newTodo.trim()) return;  // don't allow empty tasks

    // Get current user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) return;

    // Insert new todo into the DB
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title: newTodo, user_id: user.id }])
      .select()
      .single(); // return the inserted row

    if (!error && data) {
      setTodoItems(prev => [...prev, data]);  // update UI
      setNewTodo('');  // clear input field
    }
  };

  const [todoItems, setTodoItems] = useState<{ id: string; title: string; description: string | null; status: string; }[]>([]);

  const recentActivities = [
    { title: 'Completed JavaScript Basics', time: '2 hours ago', type: 'course' },
    { title: 'Joined AI Study Group', time: '1 day ago', type: 'community' },
  ];

  const upcomingEvents = [
    { title: 'React Advanced Concepts', date: 'Tomorrow', time: '10:00 AM', type: 'Live Class' },
    { title: 'AI Project Presentation', date: 'Dec 15', time: '2:00 PM', type: 'Assignment' },
  ];

  const getActivityIcon = (type: string) => {
    const colorClass = getActivityIconColor(type);

    switch (type) {
      case 'course':
        return <BookOpen className={`w-4 h-4 ${colorClass}`} />;
      case 'community':
        return <Users className={`w-4 h-4 ${colorClass}`} />;
      case 'assignment':
        return <Target className={`w-4 h-4 ${colorClass}`} />;
      case 'session':
        return <Play className={`w-4 h-4 ${colorClass}`} />;
      case 'achievement':
        return <Award className={`w-4 h-4 ${colorClass}`} />;
      default:
        return <Activity className={`w-4 h-4 ${colorClass}`} />;
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) {
      // Remove the deleted todo from the UI
      setTodoItems(prev => prev.filter(t => t.id !== id));
    }
  };


  const getEventColor = (type: string) => {
     return getEventColorClasses(type);
   };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const [announcements, setAnnouncements] = useState<{ 
    id: string; 
    title: string; 
    content: string; 
    is_active: boolean; 
  }[]>([]);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16 md:h-20 lg:h-24"></div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Improved Greeting Section */}
        <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8">
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-5 lg:py-6 xl:py-6">
            <div className="flex items-stretch gap-3 sm:gap-4 lg:gap-6 w-full">
              {/* Left Button - Continue Learning */}
              {/*
              <button
                className="flex-1 flex flex-col items-center justify-center text-black dark:text-white font-bold border-2 border-black dark:border-white rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90 text-sm sm:text-base lg:text-lg"
                style={{ backgroundColor: themeColors.accent.yellowBright }}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-2" />
                <span className="text-center leading-tight">Continue<br />Learning</span>
              </button>
              */}

              {/* Center - Welcome and Quote */}
              <div className="flex-[2] flex flex-col items-center justify-center text-center px-2 sm:px-4">
                {/* Greeting */}
                <div
                  className={`flex justify-center items-center mb-4 ${jiggle ? 'animate-pulse' : ''}`}
                >
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300">
                    {getCurrentGreeting()}
                  </span>
                </div>

                {/* Welcome Back Heading */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                  Welcome back
                  {typedName || userName ? ',' : ''}{' '}
                  {(typedName || userName) && (
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                      {typedName || userName}!
                    </span>
                  )}
                </h1>

                {/* Quote of the Day */}
                  <p className="text-xs sm:text-base lg:text-lg italic text-center leading-relaxed mb-2 text-gray-700 dark:text-gray-300">
                    "The beautiful thing about learning is that no one can take it away from you."
                  </p>
              </div>

              {/* Right Button - Take Platform Tour */}
              {/*<button className="flex-1 flex flex-col items-center justify-center bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-2xl sm:rounded-3xl font-bold transition-all duration-300 transform hover:scale-105 hover:bg-white dark:hover:bg-gray-800 hover:text-black dark:hover:text-white text-sm sm:text-base lg:text-lg shadow-lg">
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mb-2" />
                <span className="text-center leading-tight">Take<br />Platform<br />Tour</span>
              </button>*/}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-pink-200 dark:bg-gray-800 py-3 sm:py-4 lg:py-6 rounded-lg sm:rounded-xl shadow mb-4 sm:mb-6">
          {/* Header */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Announcements
          </h2>

          {/* Horizontal Scrollable Container */}
          <div className="relative px-2 sm:px-3 lg:px-4">
            <div 
              className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {announcements.length === 0 ? (
                <div className="w-full text-center py-8">
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    No announcements at the moment.
                  </p>
                </div>
              ) : (
                announcements.map(a => (
                  <div
                    key={a.id}
                    className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-5 rounded-lg shadow flex flex-col justify-between text-center flex-shrink-0"
                    style={{ 
                      minWidth: '220px',
                      maxWidth: '280px',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-gray-100 mb-1">
                      {a.title}
                    </h3>

                    {/* Content */}
                    <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                      {a.content}
                    </p>

                    {/* Optional Active Badge */}
                    {a.is_active && (
                      <span className="text-xs bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full font-medium mt-2 inline-block">
                        Active
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Dashboard + To-Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-200 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl shadow text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 dark:text-gray-100">Dashboard</h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
              Includes graphs, details about study time, upcoming classes, etc.
            </p>
          </div>
          <div className="bg-green-200 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl shadow text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900 dark:text-gray-100">To Do List</h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addTodo}
                  className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              {todoItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 sm:p-3 rounded-lg shadow-sm text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.status === 'done'}
                      onChange={async () => {
                        const newStatus = item.status === 'done' ? 'pending' : 'done';
                        const { error } = await supabase
                          .from('todos')
                          .update({ status: newStatus })
                          .eq('id', item.id);
                        if (!error) {
                          setTodoItems(prev =>
                            prev.map(t => t.id === item.id ? { ...t, status: newStatus } : t)
                          );
                        }
                      }}
                      className="mr-2 sm:mr-3 flex-shrink-0"
                    />
                    <span className={`${item.status === 'done' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'} text-xs sm:text-sm lg:text-base`}>
                      {item.title}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2 text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity + Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-purple-200 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <Activity className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> Recent Activity
            </h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="bg-white dark:bg-gray-700 p-2 sm:p-3 rounded-lg flex items-start shadow-sm">
                  <div className="mr-2 sm:mr-3 flex-shrink-0">{getActivityIcon(a.type)}</div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm lg:text-base text-gray-900 dark:text-gray-100">{a.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-200 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <Calendar className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> Upcoming Events
            </h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {upcomingEvents.map((e, i) => (
                <div key={i} className="bg-white dark:bg-gray-700 p-2 sm:p-3 rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                    <p className="font-medium text-xs sm:text-sm lg:text-base text-gray-900 dark:text-gray-100">{e.title}</p>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getEventColor(e.type)} self-start`}>
                      {e.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {e.date} at {e.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e1e1e] text-white border-2 border-black rounded-3xl shadow-2xl mx-6 my-10">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 xl:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">LearnHub</h3>
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
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-2xl w-64 sm:w-72 lg:w-80 border border-gray-200 dark:border-gray-700 max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)]">
            <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">Chat Bot</h3>
              <button onClick={() => setIsChatbotOpen(false)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
            <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 lg:mb-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-2 sm:p-3 rounded text-xs sm:text-sm text-gray-900 dark:text-gray-100">Hello! How can I help you?</div>
              <div className="bg-green-50 dark:bg-green-900 p-2 sm:p-3 rounded ml-3 sm:ml-4 lg:ml-6 text-xs sm:text-sm text-gray-900 dark:text-gray-100">Hi! I need help with my courses.</div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 p-1 sm:p-2 rounded mr-1 sm:mr-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              
              <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white p-1 sm:p-2 rounded flex-shrink-0">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};