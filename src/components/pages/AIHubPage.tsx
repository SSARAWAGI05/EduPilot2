import React, { useState } from 'react';
import {
  Brain,
  FileText,
  MessageSquare,
  Map,
  ListChecks,
  Sparkles,
  Zap,
  Target,
  BookOpen,
  PenTool,
  Search,
  ArrowRight,
  Stars,
  Wand2,
  GraduationCap,
  Lightbulb,
  CheckCircle,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

export const AIHubPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const aiTools = [
    {
      id: 'chat-with-doc',
      icon: MessageSquare,
      title: 'Chat with Document',
      description: 'Upload any document and have intelligent conversations about its content. Ask questions, get summaries, and extract key insights instantly.',
      color: themeColors.accent.blue,
      bgColor: themeColors.accent.blueLight,
      features: ['PDF Support', 'Real-time Analysis', 'Multi-language', 'Context Aware']
    },
    {
      id: 'essay-writer',
      icon: PenTool,
      title: 'Essay Writer',
      description: 'Generate well-structured, original essays on any topic. Perfect for research papers, assignments, and creative writing projects.',
      color: themeColors.accent.pink,
      bgColor: themeColors.accent.pinkLight,
      features: ['Multiple Styles', 'Citation Support', 'Plagiarism Free', 'Custom Length']
    },
    {
      id: 'roadmap-generator',
      icon: Map,
      title: 'Learning Roadmap',
      description: 'Create personalized learning paths tailored to your goals. Get step-by-step guidance from beginner to expert level.',
      color: themeColors.accent.purple,
      bgColor: themeColors.accent.purple,
      features: ['Personalized Plans', 'Progress Tracking', 'Resource Links', 'Time Estimates']
    },
    {
      id: 'quiz-generator',
      icon: ListChecks,
      title: 'Quiz Generator',
      description: 'Automatically create quizzes from any topic or document. Perfect for self-assessment and exam preparation.',
      color: themeColors.accent.orange,
      bgColor: themeColors.accent.orangeSection,
      features: ['Multiple Choice', 'True/False', 'Difficulty Levels', 'Instant Feedback']
    },
    {
      id: 'study-planner',
      icon: Target,
      title: 'Smart Study Planner',
      description: 'AI-powered study schedules that adapt to your learning style and availability. Optimize your study time effectively.',
      color: themeColors.accent.green,
      bgColor: themeColors.accent.green,
      features: ['Auto-scheduling', 'Break Reminders', 'Priority Management', 'Goal Setting']
    },
    {
      id: 'summarizer',
      icon: FileText,
      title: 'Content Summarizer',
      description: 'Condense long articles, papers, and documents into concise summaries. Save time while retaining key information.',
      color: themeColors.accent.yellowBright,
      bgColor: themeColors.accent.yellow,
      features: ['Quick Summaries', 'Key Points', 'Bullet Format', 'Adjustable Length']
    }
  ];

  const stats = [
    { icon: Sparkles, value: '1M+', label: 'AI Generations' },
    { icon: Zap, value: '99.9%', label: 'Accuracy Rate' },
    { icon: Brain, value: '24/7', label: 'Availability' },
    { icon: Stars, value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary.lightGray }}>
      {/* Spacer for fixed navbar */}
      <div className="h-20 sm:h-16 md:h-20 lg:h-32"></div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        
        {/* Hero Section */}
        <div 
          className="border-2 rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8 overflow-hidden relative"
          style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black }}
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Brain className="w-full h-full" style={{ color: themeColors.accent.blue }} />
          </div>
          
          <div className="relative px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-12 xl:py-16 text-center">
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: themeColors.text.primary }}
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                AI Hub
              </span>
            </h1>
            
            <p 
              className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
              style={{ color: themeColors.text.secondary }}
            >
              Supercharge your learning with cutting-edge AI tools. From intelligent document analysis 
              to personalized study plans, we've got everything you need to succeed.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <button 
                className="px-6 py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
                style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}
              >
                <Zap size={20} />
                Get Started Free
              </button>
              <button 
                className="px-6 py-3 rounded-xl font-bold border-2 transition-transform transform hover:scale-105 flex items-center gap-2"
                style={{ 
                  backgroundColor: themeColors.background.white, 
                  borderColor: themeColors.primary.black,
                  color: themeColors.text.primary 
                }}
              >
                <BookOpen size={20} />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105"
              style={{ backgroundColor: themeColors.background.white }}
            >
              <stat.icon 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3"
                style={{ color: themeColors.accent.purple }}
              />
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: themeColors.text.primary }}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* AI Tools Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
              style={{ color: themeColors.text.primary }}
            >
              Explore Our AI Tools
            </h2>
            <p className="text-sm sm:text-base lg:text-lg" style={{ color: themeColors.text.secondary }}>
              Choose from our suite of powerful AI-driven learning tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aiTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2"
                style={{ 
                  backgroundColor: tool.bgColor,
                  borderColor: selectedTool === tool.id ? tool.color : 'transparent'
                }}
              >
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: themeColors.background.white }}
                >
                  <tool.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: tool.color }} />
                </div>
                
                <h3 
                  className="text-lg sm:text-xl font-bold mb-2"
                  style={{ color: themeColors.text.primary }}
                >
                  {tool.title}
                </h3>
                
                <p 
                  className="text-xs sm:text-sm mb-4 leading-relaxed"
                  style={{ color: themeColors.text.secondary }}
                >
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                      style={{ 
                        backgroundColor: themeColors.background.white,
                        color: themeColors.text.tertiary 
                      }}
                    >
                      <CheckCircle className="w-3 h-3" style={{ color: tool.color }} />
                      {feature}
                    </span>
                  ))}
                </div>

                <button 
                  className="w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: themeColors.primary.black,
                    color: themeColors.text.white 
                  }}
                >
                  Coming Soon!
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div 
          className="p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg mb-6 sm:mb-8"
          style={{ backgroundColor: themeColors.accent.orangeSection }}
        >
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center"
            style={{ color: themeColors.text.primary }}
          >
            How AI Hub Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                step: '1',
                title: 'Choose Your Tool',
                description: 'Select from our range of AI-powered tools based on your learning needs'
              },
              {
                icon: Wand2,
                step: '2',
                title: 'Input Your Content',
                description: 'Upload documents, enter text, or describe your requirements'
              },
              {
                icon: Sparkles,
                step: '3',
                title: 'Get AI Results',
                description: 'Receive instant, high-quality results powered by advanced AI models'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg text-center"
                style={{ backgroundColor: themeColors.background.white }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                  style={{ backgroundColor: themeColors.accent.blue }}
                >
                  <item.icon className="w-8 h-8" color="#ffffff" />
                  <div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}
                  >
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: themeColors.text.primary }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div 
          className="p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg mb-6 sm:mb-8"
          style={{ backgroundColor: themeColors.accent.purple }}
        >
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center"
            style={{ color: themeColors.text.primary }}
          >
            Why Use AI Hub?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Get instant results in seconds' },
              { icon: Brain, title: 'Super Smart', desc: 'Powered by advanced AI models' },
              { icon: Target, title: 'Highly Accurate', desc: '99.9% accuracy on tasks' },
              { icon: Lightbulb, title: 'Always Learning', desc: 'Continuously improving AI' },
              { icon: GraduationCap, title: 'Educational Focus', desc: 'Designed for learners' },
              { icon: Stars, title: 'User Friendly', desc: 'Simple and intuitive interface' }
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-5 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105"
                style={{ backgroundColor: themeColors.background.white }}
              >
                <benefit.icon 
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: themeColors.accent.pink }}
                />
                <h3 className="text-base sm:text-lg font-bold mb-1" style={{ color: themeColors.text.primary }}>
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="p-8 sm:p-10 lg:p-12 rounded-2xl shadow-lg text-center border-2 mb-6 sm:mb-8"
          style={{ 
            backgroundColor: themeColors.accent.blue,
            borderColor: themeColors.primary.black 
          }}
        >
          <Brain className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" color="#ffffff" />
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            Ready to Experience AI-Powered Learning?
          </h2>
          <p 
            className="text-base sm:text-lg lg:text-xl mb-6 max-w-2xl mx-auto"
            style={{ color: '#ffffff' }}
          >
            Join thousands of students already using AI Hub to accelerate their learning journey
          </p>
          <button 
            className="px-8 py-4 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto"
            style={{ 
              backgroundColor: themeColors.accent.yellowBright,
              color: themeColors.text.primary 
            }}
          >
            <Sparkles size={20} />
            Start Using AI Hub Free
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Footer */}
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
                  <span className="text-gray-300">support@de-eco.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="text-gray-300">AI-powered learning at your fingertips</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 DE-ECO. All rights reserved.
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