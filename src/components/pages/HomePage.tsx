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

export const HomePage: React.FC = () => {
  const [userName] = useState('Rishika');
  const [jiggle, setJiggle] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setJiggle(true);
      setTimeout(() => setJiggle(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const todoItems = [
    { task: 'Complete React Module 3', completed: false },
    { task: 'Submit AI Project Proposal', completed: false },
    { task: 'Join Live Class Tomorrow', completed: false },
    { task: 'Review Course Materials', completed: true },
  ];

  const quickStats = [
    { label: 'Courses Completed', value: '12', icon: <Award className="w-6 h-6" />, color: 'bg-yellow-400' },
    { label: 'Current Streak', value: '15 days', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-400' },
    { label: 'Study Hours', value: '45h', icon: <Clock className="w-6 h-6" />, color: 'bg-blue-400' },
    { label: 'Certificates', value: '8', icon: <Star className="w-6 h-6" />, color: 'bg-purple-400' },
  ];

  const recentActivities = [
    { title: 'Completed JavaScript Basics', time: '2 hours ago', type: 'course' },
    { title: 'Joined AI Study Group', time: '1 day ago', type: 'community' },
  ];

  const upcomingEvents = [
    { title: 'React Advanced Concepts', date: 'Tomorrow', time: '10:00 AM', type: 'Live Class' },
    { title: 'AI Project Presentation', date: 'Dec 15', time: '2:00 PM', type: 'Assignment' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'community':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'assignment':
        return <Target className="w-4 h-4 text-red-600" />;
      case 'session':
        return <Play className="w-4 h-4 text-purple-600" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-yellow-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Live Class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assignment':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Community':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Workshop':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16 md:h-20 lg:h-24"></div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Improved Greeting Section */}
        <div className="bg-white border-2 border-black rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8">
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-10 xl:py-12 text-center">
            <div className={`inline-flex items-center mb-4 ${jiggle ? 'animate-pulse' : ''}`}>
              <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">{getCurrentGreeting()}</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 text-black">
              Welcome back, <span style={{ color: "#000000ff" }}>{userName}!</span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto px-2 sm:px-4">
              
            </p>
            
            <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:gap-4 justify-center">
              <button
                className="text-black hover:opacity-90 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-xs sm:text-sm lg:text-base"
                style={{ backgroundColor: "#ffd43b" }}
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                Continue Learning
              </button>
              <button className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-xs sm:text-sm lg:text-base">
                Take Platform Tour
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-pink-200 text-center py-6 sm:py-8 lg:py-12 xl:py-16 rounded-lg sm:rounded-xl shadow mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Announcements</h2>
        </div>

        {/* Dashboard + To-Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-200 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl shadow text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">Dashboard</h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-700">
              Includes graphs, details about study time, upcoming classes, etc.
            </p>
          </div>
          <div className="bg-green-200 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl shadow text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">To Do List</h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {todoItems.map((item, index) => (
                <div key={index} className="flex items-center bg-white p-2 sm:p-3 rounded-lg shadow-sm text-left">
                  <input type="checkbox" defaultChecked={item.completed} className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span className={`${item.completed ? 'line-through text-gray-500' : ''} text-xs sm:text-sm lg:text-base`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-6 sm:mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 p-3 sm:p-4 lg:p-5 xl:p-6 rounded-xl sm:rounded-2xl shadow-lg border hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-1 sm:mb-2 lg:mb-3">
                <div className={`${stat.color} p-1 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl text-white`}>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">{stat.icon}</div>
                </div>
                <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-gray-400" />
              </div>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-black mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity + Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-purple-200 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center">
              <Activity className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> Recent Activity
            </h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="bg-white p-2 sm:p-3 rounded-lg flex items-start shadow-sm">
                  <div className="mr-2 sm:mr-3 flex-shrink-0">{getActivityIcon(a.type)}</div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm lg:text-base">{a.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-200 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4 flex items-center">
              <Calendar className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" /> Upcoming Events
            </h2>
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              {upcomingEvents.map((e, i) => (
                <div key={i} className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                    <p className="font-medium text-xs sm:text-sm lg:text-base">{e.title}</p>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getEventColor(e.type)} self-start`}>
                      {e.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
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
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-2xl w-64 sm:w-72 lg:w-80 border max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)]">
            <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
              <h3 className="font-bold text-sm sm:text-base">Chat Bot</h3>
              <button onClick={() => setIsChatbotOpen(false)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
            <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 lg:mb-4">
              <div className="bg-blue-50 p-2 sm:p-3 rounded text-xs sm:text-sm">Hello! How can I help you?</div>
              <div className="bg-green-50 p-2 sm:p-3 rounded ml-3 sm:ml-4 lg:ml-6 text-xs sm:text-sm">Hi! I need help with my courses.</div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type message..."
                className="flex-1 border p-1 sm:p-2 rounded mr-1 sm:mr-2 text-xs sm:text-sm"
              />
              <button className="bg-blue-500 text-white p-1 sm:p-2 rounded flex-shrink-0">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};