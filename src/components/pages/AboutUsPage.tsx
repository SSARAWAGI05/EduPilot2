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
  ArrowRight,Phone, MapPin, 
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

      {/* Footer */}
      <footer
        className="mx-6 my-10 rounded-3xl border shadow-2xl"
        style={{
          backgroundColor: themeColors.primary.black,
          borderColor: themeColors.primary.black,
          color: themeColors.text.white,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-2xl font-bold">LearnHub</h3>
              <p className="text-sm leading-relaxed" style={{ color: themeColors.text.secondary }}>
                Empowering learners worldwide through innovative education and
                cutting-edge technology.
              </p>

              {/* Socials */}
              <div className="flex items-center justify-center sm:justify-start gap-3">
              {[
                {
                  href: "https://chat.whatsapp.com/FzCODHVaAnFEoYgKjMEgM7",
                  icon: <i className="fa-brands fa-whatsapp text-sm" />,
                },
                {
                  href: "#",
                  icon: <Instagram className="w-4 h-4" />,
                },
                {
                  href: "#",
                  icon: <Linkedin className="w-4 h-4" />,
                },
              ].map(({ href, icon }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-md transition hover:scale-110"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  {icon}
                </a>
              ))}
              </div>

            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm" style={{ color: themeColors.text.secondary }}>
                {["Courses", "Dashboard", "Community", "Certificates", "Help Center"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm" style={{ color: themeColors.text.secondary }}>
                {["FAQ", "Contact Us", "Technical Support", "Privacy Policy", "Terms of Service"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left space-y-3">
              <h4 className="text-lg font-semibold mb-4">Contact</h4>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span style={{ color: themeColors.text.secondary }}>
                  support@learnhub.com
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span style={{ color: themeColors.text.secondary }}>
                  +1 (555) 123-4567
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span style={{ color: themeColors.text.secondary }}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ borderColor: themeColors.text.tertiary }}
          >
            <p style={{ color: themeColors.text.tertiary }}>
              © 2024 LearnHub. All rights reserved.
            </p>

            <div className="flex gap-6">
              {["Privacy", "Terms", "Accessibility"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition"
                  style={{ color: themeColors.text.tertiary }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
