import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Menu, X, Play, FileText, BookOpen, Users, Download } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const LiveClassesPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-[#e9ecef] text-[#1e1e1e]">
      {/* Floating Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-6 top-24 z-50 bg-[#a5d8ff] hover:bg-[#74c0fc] text-[#1e1e1e] p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Floating Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-80 overflow-y-auto`}
      >
        <div className="p-6 pt-20">
          <h2 className="text-2xl font-bold mb-6 text-[#1e1e1e]">Quick Access</h2>

          {/* Join Next Class */}
          <div className="bg-[#a5d8ff] p-4 rounded-2xl mb-3 shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-[#1e1e1e]" />
              <h3 className="font-bold text-base text-[#1e1e1e]">Join Next Class</h3>
            </div>
          </div>

          {/* Recordings & Transcripts */}
          <div className="bg-[#fff4e6] p-4 rounded-2xl mb-3 shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1e1e1e]" />
              <h3 className="font-bold text-base text-[#1e1e1e]">Recordings & Transcripts</h3>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-[#ffc9c9] p-4 rounded-2xl mb-3 shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1e1e1e]" />
              <h3 className="font-bold text-base text-[#1e1e1e]">My Notes</h3>
            </div>
          </div>

          {/* Class Participants */}
          <div className="bg-[#d0ebff] p-4 rounded-2xl mb-3 shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1e1e1e]" />
              <h3 className="font-bold text-base text-[#1e1e1e]">Participants</h3>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-[#e7f5ff] p-4 rounded-2xl mb-3 shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1e1e1e]" />
              <h3 className="font-bold text-base text-[#1e1e1e]">This Week's Schedule</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-8 sm:pb-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e1e1e] px-4">
            Live Classes
          </h1>
          <p className="text-[#495057] mt-2 text-base sm:text-lg px-4">
            Stay updated with schedules, announcements & requests
          </p>
        </div>

        {/* Upcoming Class */}
        <div className="bg-[#a5d8ff] p-6 sm:p-8 rounded-3xl mb-8 sm:mb-14 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold">Upcoming Class</h2>
            <button className="bg-[#ff8787] hover:bg-[#ffc9c9] text-white px-4 sm:px-6 py-2 rounded-xl font-semibold shadow-md transition text-sm sm:text-base">
              Join Now
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#1e1e1e]">
              Countdown to Start
            </h3>
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-6">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#fff4e6] rounded-xl px-3 sm:px-5 py-3 sm:py-4 shadow-md"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#1e1e1e]">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#495057]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Calendar */}
          <div className="bg-[#ffffff] p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff8787]" />
              Calendar
            </h3>
            <p className="text-xs sm:text-sm text-[#495057] mb-3 sm:mb-4">
              Click a date to see deadlines & to-dos
            </p>
            <div className="bg-[#f8f9fa] p-3 sm:p-4 rounded-xl border border-[#e9ecef]">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs text-center font-semibold">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="p-1 sm:p-2 text-[#1e1e1e]">{day}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-1 sm:p-2 rounded-lg hover:bg-[#ffd8a8] cursor-pointer text-xs"
                  >
                    {i < 30 ? i + 1 : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reschedule Request */}
          <div className="bg-[#fff4e6] p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#1e1e1e]">
              Request Reschedule
            </h3>
            <textarea
              className="w-full p-2 sm:p-3 border border-[#e9ecef] rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a5d8ff] resize-none"
              rows={3}
              placeholder="Provide reason for rescheduling..."
            />
            <button className="bg-[#a5d8ff] hover:bg-[#ffec99] text-[#1e1e1e] font-semibold px-4 sm:px-6 py-2 rounded-xl w-full transition text-sm sm:text-base">
              Submit Request
            </button>
          </div>

          {/* Announcements */}
          <div className="bg-[#ffc9c9] p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#1e1e1e]">
              Announcements
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { title: 'Next class: Advanced React Patterns', time: 'Tomorrow at 3:00 PM' },
                { title: 'Assignment deadline reminder', time: 'Due in 3 days' },
                { title: 'New course materials uploaded', time: 'Check your dashboard' },
              ].map((note, i) => (
                <div
                  key={i}
                  className="bg-[#ffffff] p-2 sm:p-3 rounded-xl shadow-sm border border-[#e9ecef]"
                >
                  <p className="text-xs sm:text-sm font-medium">{note.title}</p>
                  <p className="text-xs text-[#495057] mt-1">{note.time}</p>
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
    </div>
  );
}