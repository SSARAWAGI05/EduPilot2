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

// Improved: tighter, more readable layout, consistent card heights, clearer CTAs, better form controls
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO: narrower content width, clear visual rhythm */}
        <section
          className="mx-auto rounded-2xl shadow-md mb-8 overflow-hidden border"
          style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, maxWidth: 1100 }}
        >
          <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3" style={{ color: themeColors.text.primary }}>
              AI Hub
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 leading-relaxed" style={{ color: themeColors.text.secondary }}>
              A focused space for learners, researchers and builders — explore practical courses, curated datasets, community projects, and hands-on events that help you ship real AI work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium shadow-sm transition transform hover:translate-y-0.5"
                style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}
                aria-label="Start learning"
              >
                <Play size={16} />
                Start Learning
              </button>

              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium border-2"
                style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}
                aria-label="Browse resources"
              >
                <Search size={16} />
                Browse Resources
              </button>
            </div>
          </div>
        </section>

        {/* Two-column area: Courses + Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Courses - spans two columns on large */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Featured Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredCourses.map((c) => (
                <article
                  key={c.id}
                  className="p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  style={{ backgroundColor: themeColors.background.white }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: themeColors.accent.blue }}>
                      {c.icon ? React.createElement(c.icon, { className: 'w-5 h-5', color: '#fff' }) : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: themeColors.text.primary }}>{c.title}</h3>
                      <div className="flex items-center gap-3 text-xs" style={{ color: themeColors.text.tertiary }}>
                        <span>{c.level}</span>
                        <span>·</span>
                        <span>{c.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mt-3 flex-1" style={{ color: themeColors.text.secondary }}>{c.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <button className="px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
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
          </div>

          {/* Resources column */}
          <aside>
            <div className="sticky top-24">
              <h3 className="text-lg font-bold mb-3" style={{ color: themeColors.text.primary }}>Resources</h3>
              <div className="grid grid-cols-1 gap-3">
                {resources.map((r) => (
                  <div key={r.title} className="p-3 rounded-lg shadow-sm" style={{ backgroundColor: themeColors.background.white }}>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: themeColors.text.primary }}>{r.title}</h4>
                    <p className="text-xs" style={{ color: themeColors.text.tertiary }}>{r.desc}</p>
                  </div>
                ))}

                <div className="p-3 mt-2 rounded-lg text-center" style={{ backgroundColor: themeColors.accent.purple }}>
                  <p className="text-sm font-semibold" style={{ color: themeColors.text.primary }}>Model Zoo</p>
                  <p className="text-xs mt-1" style={{ color: themeColors.text.secondary }}>Try pretrained checkpoints with a single click.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Events & Workshops */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg shadow-sm flex items-start justify-between" style={{ backgroundColor: themeColors.background.white }}>
              <div>
                <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>Hands-on Workshop: Fine-tuning LLMs</h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Dec 18, 2024 · Online · 2 hours</p>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 rounded-md font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>Register</button>
              </div>
            </div>

            <div className="p-4 rounded-lg shadow-sm flex items-start justify-between" style={{ backgroundColor: themeColors.background.white }}>
              <div>
                <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>AI Research Talks: Ethics and Safety</h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Jan 12, 2025 · Hybrid · 90 mins</p>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 rounded-md font-semibold border-2" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}>Learn more</button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA - clear form, accessible controls */}
        <section className="p-6 rounded-2xl shadow-md mb-8" style={{ backgroundColor: themeColors.accent.blue }}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#fff' }}>Stay updated with AI Hub</h3>
            <p className="text-sm sm:text-base mb-4" style={{ color: '#fff' }}>Get curated content, tutorials and event invites delivered to your inbox.</p>

            <form className="flex flex-col sm:flex-row items-center gap-2 mx-auto max-w-md" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="aihub-email" className="sr-only">Email address</label>
              <input
                id="aihub-email"
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 rounded-lg px-4 py-2 border-0 focus:outline-none"
                style={{ backgroundColor: themeColors.background.white }}
              />
              <button type="submit" className="px-4 py-2 rounded-lg font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer kept compact */}
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
