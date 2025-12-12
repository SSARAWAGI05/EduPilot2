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
  Instagram,
  MessageSquare,
  FileText,
  Server
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: React.ComponentType<any>;
};

// AI Hub focused on tools (Essay Writer, ChatWithDoc, etc.) — readable layout, clear CTAs, simple demo links
export const AIHubPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const tools: Tool[] = [
    {
      id: 'essay-writer',
      name: 'Essay Writer',
      description: 'Generate structured, citation-ready essays in seconds. Pick a tone and length.',
      category: 'Writing',
      icon: FileText
    },
    {
      id: 'chat-with-doc',
      name: 'ChatWithDoc',
      description: 'Upload documents (PDF/DOCX) and ask questions — ideal for research and onboarding.',
      category: 'Assistant',
      icon: MessageSquare
    },
    {
      id: 'code-runner',
      name: 'Notebook Runner',
      description: 'Execute small code snippets in a sandboxed environment and inspect outputs.',
      category: 'Developer',
      icon: Cpu
    },
    {
      id: 'model-playground',
      name: 'Model Playground',
      description: 'Compare model outputs side-by-side with adjustable temperature and context length.',
      category: 'Experiment',
      icon: Zap
    },
    {
      id: 'data-hub',
      name: 'Dataset Explorer',
      description: 'Search and preview curated datasets ready for training and evaluation.',
      category: 'Data',
      icon: Server
    }
  ];

  const quickLinks = [
    { title: 'Getting Started', desc: 'Quick onboarding guide and best practices.' },
    { title: 'Integrations', desc: 'How to plug tools into your workflow (API & webhooks).' },
    { title: 'Community', desc: 'Showcase and contribute templates and prompts.' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.primary.lightGray }}>
      <div className="h-14 sm:h-16 md:h-20" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO: concise and clear */}
        <section
          className="mx-auto rounded-2xl shadow-md mb-8 overflow-hidden border"
          style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, maxWidth: 1100 }}
        >
          <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3" style={{ color: themeColors.text.primary }}>
              AI Hub — Tools & Playgrounds
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 leading-relaxed" style={{ color: themeColors.text.secondary }}>
              Try practical AI tools built for writing, research, coding and data exploration. Each tool is designed to help you ship faster — demo instantly or integrate via API.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium shadow-sm"
                style={{ backgroundColor: themeColors.accent.blue, color: themeColors.text.white }}
                aria-label="Try ChatWithDoc"
              >
                <MessageSquare size={16} />
                Try ChatWithDoc
              </button>

              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium border-2"
                style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}
                aria-label="Explore tools"
              >
                <Search size={16} />
                Explore Tools
              </button>
            </div>
          </div>
        </section>

        {/* Tools grid + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Popular Tools</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((t) => (
                <article
                  key={t.id}
                  className="p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  style={{ backgroundColor: themeColors.background.white }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: themeColors.accent.blue }}>
                      {t.icon ? React.createElement(t.icon, { className: 'w-5 h-5', color: '#fff' }) : <BookOpen className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold" style={{ color: themeColors.text.primary }}>{t.name}</h3>
                        <span className="text-xs font-medium" style={{ color: themeColors.text.tertiary }}>{t.category}</span>
                      </div>
                      <p className="text-sm mt-2" style={{ color: themeColors.text.secondary }}>{t.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-md font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>
                        Try
                      </button>
                      <button className="px-3 py-1 rounded-md font-medium border-2" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}>
                        Demo
                      </button>
                    </div>

                    <button className="text-sm font-semibold flex items-center gap-2" style={{ color: themeColors.accent.blue }}>
                      Learn more
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar: quick links + onboarding */}
          <aside>
            <div className="sticky top-24">
              <h3 className="text-lg font-bold mb-3" style={{ color: themeColors.text.primary }}>Quick Links</h3>
              <div className="grid grid-cols-1 gap-3">
                {quickLinks.map((q) => (
                  <div key={q.title} className="p-3 rounded-lg shadow-sm" style={{ backgroundColor: themeColors.background.white }}>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: themeColors.text.primary }}>{q.title}</h4>
                    <p className="text-xs" style={{ color: themeColors.text.tertiary }}>{q.desc}</p>
                  </div>
                ))}

                <div className="p-3 mt-2 rounded-lg text-center" style={{ backgroundColor: themeColors.accent.purple }}>
                  <p className="text-sm font-semibold" style={{ color: themeColors.text.primary }}>Integrations</p>
                  <p className="text-xs mt-1" style={{ color: themeColors.text.secondary }}>API keys, webhooks and SDKs to quickly embed tools in your product.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Events & Workshops */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Events & Demos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg shadow-sm flex items-start justify-between" style={{ backgroundColor: themeColors.background.white }}>
              <div>
                <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>Live Demo: ChatWithDoc</h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Dec 18, 2024 · Online · 45 mins</p>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 rounded-md font-semibold" style={{ backgroundColor: themeColors.accent.yellowBright, color: themeColors.text.primary }}>Register</button>
              </div>
            </div>

            <div className="p-4 rounded-lg shadow-sm flex items-start justify-between" style={{ backgroundColor: themeColors.background.white }}>
              <div>
                <h3 className="text-base font-semibold" style={{ color: themeColors.text.primary }}>Workshop: Prompt Engineering</h3>
                <p className="text-xs sm:text-sm" style={{ color: themeColors.text.tertiary }}>Jan 12, 2025 · Hybrid · 90 mins</p>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 rounded-md font-semibold border-2" style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.black, color: themeColors.text.primary }}>Learn more</button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="p-6 rounded-2xl shadow-md mb-8" style={{ backgroundColor: themeColors.accent.blue }}>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#fff' }}>Get tool updates & new launches</h3>
            <p className="text-sm sm:text-base mb-4" style={{ color: '#fff' }}>Be first to try new tools, templates and playgrounds.</p>

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
              <p className="text-gray-300 text-xs">Tools, demos and integrations for AI-powered products.</p>
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
                <li><a href="#" className="text-gray-300 hover:text-white">Tools</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Integrations</a></li>
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
