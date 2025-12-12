import React from 'react';
import {
  Cpu,
  BookOpen,
  Calendar,
  Play,
  Globe,
  Zap,
  Search,
  ArrowRight,
  Users,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon?: React.ComponentType<any>;
};

export const AIHubPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const featuredCourses: Course[] = [
    {
      id: 'ai-101',
      title: 'Intro to AI & Machine Learning',
      description: 'Foundations of ML, supervised/unsupervised learning, and practical workflows.',
      duration: '6 weeks',
      level: 'Beginner',
      icon: Cpu
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning Fundamentals',
      description: 'Neural networks, training techniques, and hands-on model building.',
      duration: '8 weeks',
      level: 'Intermediate',
      icon: Zap
    },
    {
      id: 'nlp',
      title: 'NLP & Large Language Models',
      description: 'From tokenization to transformers: build and evaluate language models.',
      duration: '6 weeks',
      level: 'Intermediate',
      icon: BookOpen
    }
  ];

  const resources = [
    { title: 'Datasets', desc: 'Curated datasets for experimentation.' },
    { title: 'Model Zoo', desc: 'Pretrained models to jump-start projects.' },
    { title: 'Papers & Tutorials', desc: 'Handpicked reading list and guides.' },
    { title: 'Community Projects', desc: 'Open-source projects to contribute to.' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary.lightGray }}>
      <div className="h-14 sm:h-16 md:h-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <section
          className="mx-auto rounded-2xl shadow-lg mb-6 overflow-hidden border"
          style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, maxWidth: '1200px' }}
        >
          <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: themeColors.text.primary }}>
              AI Hub
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-5 leading-relaxed" style={{ color: themeColors.text.secondary }}>
              A dedicated space for learners, researchers and builders to explore artificial intelligence —
              courses, tools, datasets and community projects all in one place.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-5 py-2 rounded-xl font-bold shadow flex items-center gap-2" style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}>
                <Play size={16} />
                Start Learning
              </button>
              <button className="px-5 py-2 rounded-xl font-bold border-2 flex items-center gap-2" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}>
                <Search size={16} />
                Browse Resources
              </button>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCourses.map((c) => (
              <article
                key={c.id}
                className="p-4 rounded-lg shadow transition-transform hover:scale-105"
                style={{ backgroundColor: themeColors.background.white }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: themeColors.accent.blue }}>
                    {c.icon ? React.createElement(c.icon, { className: 'w-5 h-5', color: '#fff' }) : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold" style={{ color: themeColors.text.primary }}>{c.title}</h3>
                    <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>{c.level} · {c.duration}</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: themeColors.text.secondary }}>{c.description}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button className="px-4 py-2 rounded-md font-medium" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
                    Enroll
                  </button>
                  <button className="text-sm font-semibold flex items-center gap-2" style={{ color: themeColors.accent.blue }}>
                    View details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((r) => (
              <div key={r.title} className="p-4 rounded-lg shadow text-center" style={{ backgroundColor: themeColors.background.white }}>
                <h4 className="text-sm font-semibold mb-1" style={{ color: themeColors.text.primary }}>{r.title}</h4>
                <p className="text-xs" style={{ color: themeColors.text.tertiary }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Events & Workshops */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg shadow" style={{ backgroundColor: themeColors.background.white }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>Hands-on Workshop: Fine-tuning LLMs</h3>
                  <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Dec 18, 2024 · Online · 2 hours</p>
                </div>
                <div className="text-sm font-semibold text-right" style={{ color: themeColors.accent.blue }}>Register</div>
              </div>
            </div>

            <div className="p-4 rounded-lg shadow" style={{ backgroundColor: themeColors.background.white }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>AI Research Talks: Ethics and Safety</h3>
                  <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Jan 12, 2025 · Hybrid · 90 mins</p>
                </div>
                <div className="text-sm font-semibold text-right" style={{ color: themeColors.accent.blue }}>Learn more</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="p-6 rounded-2xl shadow mb-6 text-center" style={{ backgroundColor: themeColors.accent.blue }}>
          <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#fff' }}>Stay updated with AI Hub</h3>
          <p className="text-sm sm:text-base mb-4 max-w-2xl mx-auto" style={{ color: '#fff' }}>Get curated content, tutorials and event invites delivered to your inbox.</p>

          <div className="mx-auto max-w-md flex gap-2">
            <input className="flex-1 rounded-lg px-4 py-2" placeholder="Your email" style={{ border: 'none' }} />
            <button className="px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
              Subscribe
            </button>
          </div>
        </section>
      </div>

      {/* Footer matching site */}
      <footer className="text-white rounded-2xl shadow-lg mx-4 mb-6 mt-8" style={{ backgroundColor: '#000', borderColor: '#000' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">AI Hub · DE-ECO</h3>
              <p className="text-gray-300 text-xs">Resources, courses and community for AI learners and builders.</p>
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
                <li><a href="#" className="text-gray-300 hover:text-white">Resources</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Events</a></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-2">Support</h4>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold mb-2">Contact</h4>
              <div className="text-xs">
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="text-gray-300">aihub@de-eco.com</span>
                </div>
                <p className="text-gray-300 mt-2">Subscribe for updates and job opportunities</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-gray-400 text-xs">© 2024 DE-ECO · AI Hub. All rights reserved.</p>
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

export default AIHubPage;
