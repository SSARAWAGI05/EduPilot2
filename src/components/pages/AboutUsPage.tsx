import React from 'react';
import {
  Users,
  Target,
  Award,
  Heart,
  Lightbulb,
  Globe,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

// NOTE: colors & font styles are intentionally preserved as requested.
// This file focuses on spacing, scale, and layout so the section doesn't feel "zoomed in".

export const AboutUsPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const stats = [
    { icon: Users, label: 'Active Students', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '500+' },
    { icon: Globe, label: 'Countries Reached', value: '120+' },
    { icon: Award, label: 'Certifications Issued', value: '100,000+' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do, from course content to student support.'
    },
    {
      icon: Heart,
      title: 'Inclusivity',
      description: 'Education should be accessible to everyone, regardless of background or location.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology and teaching methods.'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards and transparency in all our interactions.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former educator with 15 years of experience in EdTech innovation.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'Tech visionary passionate about making education accessible through technology.',
      image: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Education',
      bio: 'Curriculum expert dedicated to creating engaging learning experiences.',
      image: '👩‍🏫'
    },
    {
      name: 'David Kim',
      role: 'Head of Community',
      bio: 'Building connections between learners worldwide and fostering collaboration.',
      image: '👨‍🎓'
    }
  ];

  const milestones = [
    { year: '2019', event: 'DE-ECO Founded', description: 'Started with a vision to revolutionize online learning' },
    { year: '2020', event: '10,000 Students', description: 'Reached our first major milestone in student enrollment' },
    { year: '2022', event: 'Global Expansion', description: 'Launched courses in 50+ countries worldwide' },
    { year: '2024', event: 'AI Integration', description: 'Introduced AI-powered personalized learning paths' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary.lightGray }}>
      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16 md:h-20 lg:h-24" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HERO - contained width and reduced headline scale */}
        <div
          className="mx-auto rounded-2xl shadow-lg mb-6 overflow-hidden border"
          style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, maxWidth: '1200px' }}
        >
          <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10 text-center">

            {/* Reduced heading sizes to avoid 'zoomed' look and added maxWidth to text */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3"
              style={{ color: themeColors.text.primary, lineHeight: 1.05, maxWidth: '820px', margin: '0 auto' }}
            >
              Empowering Learners{' '}
              <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-5 leading-relaxed"
              style={{ color: themeColors.text.secondary }}
            >
              At DE-ECO, we believe education is the key to unlocking human potential. Our mission is to provide world-class learning experiences that are accessible, engaging, and transformative for everyone, everywhere.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                className="px-5 py-2 rounded-xl font-bold shadow transition-transform transform hover:scale-102 flex items-center gap-2"
                style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}
              >
                <Users size={18} />
                Join Our Community
              </button>

              <button
                className="px-5 py-2 rounded-xl font-bold border-2 transition-transform transform hover:scale-102 flex items-center gap-2"
                style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}
              >
                <BookOpen size={18} />
                Explore Courses
              </button>
            </div>
          </div>
        </div>

        {/* STATS - slightly smaller icons/text and consistent card sizing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl shadow text-center flex flex-col items-center justify-center"
              style={{ backgroundColor: themeColors.background.white, minHeight: '128px' }}
            >
              <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 mb-2" style={{ color: themeColors.accent.blue }} />
              <p className="text-xl sm:text-2xl font-semibold mb-1" style={{ color: themeColors.text.primary }}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision - compress padding to avoid overly tall cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl shadow" style={{ backgroundColor: themeColors.accent.purple }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: themeColors.background.white }}>
                <Target className="w-6 h-6" style={{ color: themeColors.accent.blue }} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: themeColors.text.primary }}>Our Mission</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: themeColors.text.secondary }}>
              To democratize education by providing high-quality, accessible learning opportunities that empower individuals to achieve their goals and make a positive impact in the world.
            </p>
          </div>

          <div className="p-5 rounded-2xl shadow" style={{ backgroundColor: themeColors.accent.pinkLight }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: themeColors.background.white }}>
                <TrendingUp className="w-6 h-6" style={{ color: themeColors.accent.pink }} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: themeColors.text.primary }}>Our Vision</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: themeColors.text.secondary }}>
              To be the world's most trusted and innovative learning platform where every person can discover their potential and transform their future through education.
            </p>
          </div>
        </div>

        {/* Core Values - reduce inner padding and icon scale */}
        <div className="p-6 rounded-2xl shadow mb-6" style={{ backgroundColor: themeColors.accent.orangeSection }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center" style={{ color: themeColors.text.primary }}>Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div key={index} className="p-4 rounded-lg shadow text-center" style={{ backgroundColor: themeColors.background.white }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: themeColors.accent.blue }}>
                  <value.icon className="w-5 h-5" color="#fff" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: themeColors.text.primary }}>{value.title}</h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - narrower content so the year circles don't dominate */}
        <div className="p-5 rounded-2xl shadow mb-6" style={{ backgroundColor: themeColors.background.white }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center" style={{ color: themeColors.text.primary }}>Our Journey</h2>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>{m.year}</div>
                  {i < milestones.length - 1 && <div style={{ width: '2px', backgroundColor: themeColors.primary.lightGray, minHeight: '40px', marginTop: '8px' }} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1" style={{ color: themeColors.text.primary }}>{m.event}</h3>
                  <p className="text-sm" style={{ color: themeColors.text.tertiary }}>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team - smaller avatar scale and tighter cards */}
        <div className="p-5 rounded-2xl shadow mb-6" style={{ backgroundColor: themeColors.accent.green }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center" style={{ color: themeColors.text.primary }}>Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <div key={i} className="p-4 rounded-lg shadow text-center" style={{ backgroundColor: themeColors.background.white }}>
                <div className="text-4xl sm:text-5xl mb-2">{member.image}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: themeColors.text.primary }}>{member.name}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: themeColors.accent.blue }}>{member.role}</p>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - keep strong but slightly less tall */}
        <div className="p-6 sm:p-8 rounded-2xl shadow text-center border-2 mb-6" style={{ backgroundColor: themeColors.accent.blue, borderColor: themeColors.primary.black }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>Ready to Start Your Learning Journey?</h2>
          <p className="text-sm sm:text-base mb-4 max-w-2xl mx-auto" style={{ color: '#ffffff' }}>Join thousands of learners worldwide and unlock your potential with DE-ECO</p>
          <button className="px-6 py-2 rounded-xl font-bold shadow transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
            Get Started Today
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      {/* Footer - preserved style but less vertical padding so it reads denser on smaller screens */}
      <footer className="text-white rounded-2xl shadow-lg mx-4 mb-6 mt-8" style={{ backgroundColor: '#000', borderColor: '#000' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">DE-ECO</h3>
              <p className="text-gray-300 text-xs">Empowering learners worldwide with innovative educational experiences and cutting-edge technology.</p>
              <div className="flex space-x-3 justify-center sm:justify-start mt-2">
                <Facebook className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="text-gray-300 hover:text-white">Courses</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Certificates</a></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-2">Support</h4>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Technical Support</a></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-2">Contact</h4>
              <div className="text-xs">
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="text-gray-300">support@de-eco.com</span>
                </div>
                <p className="text-gray-300 mt-2">Join us in shaping the future of education</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-400 text-xs">© 2024 DE-ECO. All rights reserved.</p>
            <div className="flex space-x-3 text-xs text-gray-400 mt-2 md:mt-0">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
