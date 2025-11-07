import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Menu, 
  X, 
  Play, 
  FileText, 
  BookOpen, 
  Users, 
  Download,
  Bell,
  Video,
  Home,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { colors, getPriorityColor, getStatusColor, getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';

type SidebarSection = 'home' | 'upcoming' | 'notes' | 'recordings' | 'schedule';

export const LiveClassesPage: React.FC = () => {
  const { isDark } = useTheme();
  const themeColors = getThemeColors(isDark);
  const [currentSection, setCurrentSection] = useState<SidebarSection>('home');
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          return prev;
        }

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sidebarItems = [
    { id: 'home' as SidebarSection, label: 'Home', icon: <Home className="w-5 h-5" />, color: themeColors.accent.blue },
    { id: 'upcoming' as SidebarSection, label: 'Upcoming Classes', icon: <Calendar className="w-5 h-5" />, color: themeColors.accent.yellow },
    { id: 'notes' as SidebarSection, label: 'Class Notes', icon: <BookOpen className="w-5 h-5" />, color: themeColors.accent.red },
    { id: 'recordings' as SidebarSection, label: 'Recordings & Transcripts', icon: <Video className="w-5 h-5" />, color: themeColors.accent.orange },
    { id: 'schedule' as SidebarSection, label: 'Week Schedule', icon: <Clock className="w-5 h-5" />, color: themeColors.accent.blueLight },
  ];


  const announcements = [
    { 
      id: 1, 
      title: 'Next Class: Advanced React Patterns', 
      message: 'Tomorrow at 3:00 PM - Don\'t forget to review the pre-class materials',
      time: '2 hours ago',
      priority: 'high',
      type: 'class'
    },
    { 
      id: 2, 
      title: 'Assignment Deadline Reminder', 
      message: 'Your React project is due in 3 days. Submit via the portal.',
      time: '1 day ago',
      priority: 'medium',
      type: 'assignment'
    },
    { 
      id: 3, 
      title: 'New Course Materials Available', 
      message: 'Check your dashboard for the latest JavaScript resources',
      time: '2 days ago',
      priority: 'low',
      type: 'material'
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Rishika',
      date: 'Tomorrow',
      time: '3:00 PM - 5:00 PM',
      duration: '2 hours',
      participants: 24,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Features',
      instructor: 'Rishika',
      date: 'Dec 16',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      participants: 18,
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Node.js Fundamentals',
      instructor: 'Rishika',
      date: 'Dec 18',
      time: '2:00 PM - 4:00 PM',
      duration: '2 hours',
      participants: 22,
      status: 'pending'
    },
  ];

  const recentNotes = [
    { id: 1, title: 'React Hooks Deep Dive', date: 'Dec 10', size: '2.4 MB', downloads: 45 },
    { id: 2, title: 'State Management Patterns', date: 'Dec 8', size: '1.8 MB', downloads: 38 },
    { id: 3, title: 'Component Lifecycle', date: 'Dec 5', size: '3.1 MB', downloads: 52 },
  ];

  const recentRecordings = [
    { id: 1, title: 'React Context API Session', date: 'Dec 10', duration: '1h 45m', views: 67 },
    { id: 2, title: 'Custom Hooks Workshop', date: 'Dec 8', duration: '2h 15m', views: 54 },
    { id: 3, title: 'Performance Optimization', date: 'Dec 5', duration: '1h 30m', views: 71 },
  ];

  const renderHomeContent = () => (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 shadow-lg border-2 border-white dark:border-gray-700">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
            Live Classes Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg">
            Your central hub for all live learning activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div style={{ backgroundColor: themeColors.accent.blue }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-gray-100">12</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Classes Attended</div>
          </div>
          <div style={{ backgroundColor: colors.accent.yellow }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#1e1e1e]">3</div>
            <div className="text-xs sm:text-sm text-[#495057]">Upcoming</div>
          </div>
          <div style={{ backgroundColor: colors.accent.red }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#1e1e1e]">8</div>
            <div className="text-xs sm:text-sm text-[#495057]">Notes Available</div>
          </div>
          <div style={{ backgroundColor: colors.accent.orange }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#1e1e1e]">15</div>
            <div className="text-xs sm:text-sm text-[#495057]">Recordings</div>
          </div>
        </div>
      </div>

      {/* Next Class Countdown */}
      <div style={{ backgroundColor: themeColors.accent.blue }} className="p-3 sm:p-4 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Next Class Starting In</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base">Advanced React Patterns</p>
          </div>
          <button
          onClick={() => window.open("https://meet.google.com/yyd-tpdv-mek", "_blank")}
          className="bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-md transition hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Join Class
        </button>
        </div>


        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-6">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-700 rounded-xl px-3 sm:px-5 py-3 sm:py-4 shadow-md text-center">
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements & Reminders */}
      <div style={{ backgroundColor: themeColors.accent.orange }} className="p-3 sm:p-4 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-gray-100" />
            Announcements & Reminders
          </h3>
          className="p-3 sm:p-4 rounded-xl shadow-sm border border-white dark:border-gray-700"
            View All
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-3 sm:p-4 rounded-xl shadow-sm border border-white dark:border-gray-700"
              style={{ backgroundColor: getPriorityColor(announcement.priority) }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.priority === 'high' && <AlertCircle className="w-4 h-4 text-gray-900 dark:text-gray-100" />}
                    {announcement.priority === 'medium' && <Clock className="w-4 h-4 text-gray-900 dark:text-gray-100" />}
                    {announcement.priority === 'low' && <CheckCircle className="w-4 h-4 text-gray-900 dark:text-gray-100" />}
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{announcement.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2">{announcement.message}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{announcement.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Recent Classes */}
        <div style={{ backgroundColor: themeColors.accent.red }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Recent Classes
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {upcomingClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{cls.title}</h4>
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: getStatusColor(cls.status), color: isDark ? '#f8fafc' : '#1e1e1e' }}
                  >
                    {cls.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{cls.date} • {cls.time}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setCurrentSection('upcoming')}
            className="w-full mt-3 sm:mt-4 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            View All Classes
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: themeColors.accent.blueLight }} className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <button 
              onClick={() => setCurrentSection('notes')}
              className="w-full bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm text-left hover:shadow-md transition flex items-center gap-3"
            >
              <Calendar className="w-5 h-5 text-gray-900 dark:text-gray-100" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">View Schedule</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">This week's classes</div>
              </div>
            </button>
            <button 
              onClick={() => setCurrentSection('recordings')}
              className="w-full bg-white p-3 rounded-xl shadow-sm text-left hover:shadow-md transition flex items-center gap-3"
            >
              <Video className="w-5 h-5 text-[#1e1e1e]" />
              <div>
                <div className="font-medium text-[#1e1e1e] text-sm">Watch Recordings</div>
                <div className="text-xs text-[#495057]">{recentRecordings.length} videos available</div>
              </div>
            </button>
            <button 
              onClick={() => setCurrentSection('schedule')}
              className="w-full bg-white p-3 rounded-xl shadow-sm text-left hover:shadow-md transition flex items-center gap-3"
            >
              <Calendar className="w-5 h-5 text-[#1e1e1e]" />
              <div>
                <div className="font-medium text-[#1e1e1e] text-sm">View Schedule</div>
                <div className="text-xs text-[#495057]">This week's classes</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpcomingClasses = () => (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-white dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 lg:mb-6">Upcoming Classes</h2>
        
        <div className="space-y-4">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} style={{ backgroundColor: themeColors.accent.blue }} className="p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">{cls.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">with {cls.instructor}</p>
                </div>
                <div className="flex gap-2">
                  <span 
                    className="px-3 py-1 text-xs rounded-full font-medium"
                    style={{ backgroundColor: getStatusColor(cls.status), color: isDark ? '#f8fafc' : '#1e1e1e' }}
                  >
                    {cls.status}
                  </span>
                  <button className="bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                    Join Class
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-gray-900 dark:text-gray-100" />
                  <div className="text-xs text-gray-600 dark:text-gray-400">Date</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{cls.date}</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-[#1e1e1e]" />
                  <div className="text-xs text-[#495057]">Time</div>
                  <div className="font-medium text-[#1e1e1e] text-sm">{cls.time}</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-[#1e1e1e]" />
                  <div className="text-xs text-[#495057]">Participants</div>
                  <div className="font-medium text-[#1e1e1e] text-sm">{cls.participants}</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-[#1e1e1e]" />
                  <div className="text-xs text-[#495057]">Duration</div>
                  <div className="font-medium text-[#1e1e1e] text-sm">{cls.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClassNotes = () => (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-white dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 lg:mb-6">Class Notes</h2>
        
        <div className="grid gap-4">
          {recentNotes.map((note) => (
            <div key={note.id} style={{ backgroundColor: themeColors.accent.red }} className="p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{note.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Uploaded on {note.date}</p>
                  </div>
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span>Size: {note.size}</span>
                <span>{note.downloads} downloads</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecordings = () => (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-white dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 lg:mb-6">Recordings & Transcripts</h2>
        
        <div className="grid gap-4">
          {recentRecordings.map((recording) => (
            <div key={recording.id} style={{ backgroundColor: themeColors.accent.orange }} className="p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{recording.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Recorded on {recording.date}</p>
                  </div>
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition text-xs sm:text-sm font-medium">
                  Watch
                </button>
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span>Duration: {recording.duration}</span>
                <span>{recording.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-white dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 lg:mb-6">This Week's Schedule</h2>
        
        <div style={{ backgroundColor: themeColors.accent.blueLight }} className="p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={i} className="text-center font-bold text-gray-900 dark:text-gray-100 text-sm p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNumber = i < 30 ? i + 1 : '';
              const hasClass = [15, 16, 18].includes(i + 1);
              
              return (
                <div
                  key={i}
                  className={`p-2 sm:p-3 rounded-lg text-center text-sm cursor-pointer transition ${
                    hasClass 
                      ? 'bg-blue-400 dark:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold' 
                      : 'hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Legend:</h4>
            <div className="flex items-center gap-2 text-sm">
              <div style={{ backgroundColor: themeColors.accent.blue }} className="w-4 h-4 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Class scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'upcoming':
        return renderUpcomingClasses();
      case 'notes':
        return renderClassNotes();
      case 'recordings':
        return renderRecordings();
      case 'schedule':
        return renderSchedule();
      default:
        return renderHomeContent();
    }
  };

  return (
    <div style={{ backgroundColor: themeColors.primary.lightGray }} className="min-h-screen text-gray-900 dark:text-gray-100">
      {/* Floating Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ backgroundColor: themeColors.accent.blue }}
        className="fixed left-3 sm:left-4 lg:left-6 top-20 sm:top-24 md:top-28 lg:top-32 z-50 text-gray-900 dark:text-gray-100 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Floating Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 sm:w-72 lg:w-80 overflow-y-auto`}
      >
        <div className="p-3 sm:p-4 lg:p-6 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 mt-6 sm:mt-8">Live Classes</h2>

          <div className="space-y-2 sm:space-y-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer text-left ${
                  currentSection === item.id ? 'ring-2 ring-gray-900 dark:ring-gray-100' : ''
                }`}
                style={{ backgroundColor: item.color }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {item.icon}
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">{item.label}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Stats in Sidebar */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-sm sm:text-base">Quick Stats</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Classes This Week:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Total Hours:</span>
                <span className="font-medium">24h</span>
              </div>
              <div className="flex justify-between">
                <span>Attendance Rate:</span>
                <span className="font-medium">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-6 sm:pb-8 lg:pb-12">
        {/* Header */}
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 pl-12 sm:pl-16 md:pl-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 px-2 sm:px-4">
            {currentSection === 'home' ? 'Live Classes' : sidebarItems.find(item => item.id === currentSection)?.label}
          </h1>
          {currentSection === 'home' && (
            <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg px-2 sm:px-4">
              Your comprehensive learning dashboard
            </p>
          )}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: themeColors.primary.black }} className="text-white dark:text-gray-100 border-2 border-black dark:border-gray-700 rounded-3xl shadow-2xl mx-3 sm:mx-6 my-6 sm:my-10">
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
    </div>
  );
};