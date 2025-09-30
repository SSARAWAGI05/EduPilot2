import React from 'react';
import { Cpu, FileText, Image, MessageSquare } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
export const AIHubPage: React.FC = () => {
  const aiTools = [
    {
      id: 1,
      name: 'Code Assistant',
      description: 'AI-powered coding help and debugging',
      icon: <Cpu className="w-12 h-12" />,
      color: 'bg-green-200',
    },
    {
      id: 2,
      name: 'Essay Writer',
      description: 'Generate and improve written content',
      icon: <FileText className="w-12 h-12" />,
      color: 'bg-yellow-200',
    },
    {
      id: 3,
      name: 'Image Generator',
      description: 'Create images from text descriptions',
      icon: <Image className="w-12 h-12" />,
      color: 'bg-pink-200',
    },
    {
      id: 4,
      name: 'Chat Assistant',
      description: 'Conversational AI for learning support',
      icon: <MessageSquare className="w-12 h-12" />,
      color: 'bg-orange-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add padding so content does not overlap with navbar */}
      <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 px-4">
          AI Hub
        </h1>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className={`${tool.color} p-6 sm:p-8 rounded-3xl hover:shadow-lg transition-shadow cursor-pointer group`}
            >
              <div className="text-center">
                <div className="text-gray-700 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{tool.name}</h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{tool.description}</p>
              </div>

              <div className="mt-6 sm:mt-8">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 sm:py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base">
                  Launch Tool
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Unlock Your Potential with AI-Powered Learning
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
              Our AI Hub provides cutting-edge tools to enhance your learning experience. 
              From code assistance to content creation, these tools are designed to boost 
              your productivity and help you master new skills faster than ever before.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                24/7 Available
              </span>
              <span className="px-3 sm:px-4 py-1 sm:py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                Free for Students
              </span>
              <span className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm">
                Regular Updates
              </span>
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
};
