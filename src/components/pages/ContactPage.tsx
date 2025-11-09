import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

export const ContactPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: themeColors.primary.lightGray }} className="min-h-screen text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: themeColors.text.primary }}>
          Contact Us
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="border-4 rounded-3xl p-6 sm:p-8 md:p-16 shadow-lg" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-semibold mb-2 text-sm sm:text-base"
                      style={{ color: themeColors.text.secondary }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base"
                      style={{
                        backgroundColor: themeColors.background.white,
                        borderColor: themeColors.primary.lightGray,
                        color: themeColors.text.primary
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-semibold mb-2 text-sm sm:text-base"
                      style={{ color: themeColors.text.secondary }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base"
                      style={{
                        backgroundColor: themeColors.background.white,
                        borderColor: themeColors.primary.lightGray,
                        color: themeColors.text.primary
                      }}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-semibold mb-2 text-sm sm:text-base"
                      style={{ color: themeColors.text.secondary }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base"
                      style={{
                        backgroundColor: themeColors.background.white,
                        borderColor: themeColors.primary.lightGray,
                        color: themeColors.text.primary
                      }}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold mb-2 text-sm sm:text-base"
                      style={{ color: themeColors.text.secondary }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors resize-vertical text-sm sm:text-base"
                      style={{
                        backgroundColor: themeColors.background.white,
                        borderColor: themeColors.primary.lightGray,
                        color: themeColors.text.primary
                      }}
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: themeColors.primary.black,
                      color: themeColors.text.white
                    }}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: themeColors.text.primary }}>
                    Get In Touch
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: themeColors.text.secondary }}>
                    Ready to start your learning journey with us? We'd love to hear
                    from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.blueLight }}>
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.blue }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Email</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>hello@rishika.edu</p>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>support@rishika.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.green }}>
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.red }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Phone</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>+1 (555) 123-4567</p>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.purple }}>
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.pink }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Address</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>123 Learning Street</p>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>Education City, EC 12345</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: themeColors.background.lightGray }}>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Office Hours</h4>
                  <div className="text-xs sm:text-sm space-y-1" style={{ color: themeColors.text.secondary }}>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      {/* Footer */}
      <footer className="border-2 rounded-3xl shadow-2xl mx-6 my-10" style={{ backgroundColor: themeColors.primary.black, color: themeColors.text.white, borderColor: themeColors.primary.black }}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 xl:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: themeColors.text.white }}>LearnHub</h3>
              <p className="text-xs sm:text-sm lg:text-sm" style={{ color: themeColors.text.secondary }}>
                Empowering learners worldwide with innovative educational experiences and cutting-edge technology.
              </p>
              <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition hover:text-white" style={{ color: themeColors.text.tertiary }} />
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition hover:text-white" style={{ color: themeColors.text.tertiary }} />
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition hover:text-white" style={{ color: themeColors.text.tertiary }} />
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition hover:text-white" style={{ color: themeColors.text.tertiary }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4" style={{ color: themeColors.text.white }}>Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm">
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Courses</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Community</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Certificates</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Help Center</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4" style={{ color: themeColors.text.white }}>Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm">
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>FAQ</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Technical Support</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition" style={{ color: themeColors.text.secondary }}>Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 lg:mb-4" style={{ color: themeColors.text.white }}>Contact</h4>
              <div className="space-y-1 sm:space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-sm">
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" style={{ color: themeColors.text.tertiary }} />
                  <span style={{ color: themeColors.text.secondary }}>support@learnhub.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" style={{ color: themeColors.text.tertiary }} />
                  <span style={{ color: themeColors.text.secondary }}>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" style={{ color: themeColors.text.tertiary }} />
                  <span style={{ color: themeColors.text.secondary }}>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 flex flex-col md:flex-row justify-between items-center text-center" style={{ borderColor: themeColors.text.tertiary }}>
            <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>
              © 2024 LearnHub. All rights reserved.
            </p>
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm mt-2 sm:mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition" style={{ color: themeColors.text.tertiary }}>Privacy</a>
              <a href="#" className="hover:text-white transition" style={{ color: themeColors.text.tertiary }}>Terms</a>
              <a href="#" className="hover:text-white transition" style={{ color: themeColors.text.tertiary }}>Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};