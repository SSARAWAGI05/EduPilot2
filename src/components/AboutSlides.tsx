import React, { useState, useEffect, useRef, useMemo } from 'react'; // Add useRef here
import { Play, Plus, Star, ChevronRight, Globe, Users, Video, Brain, FileText, Sparkles, TrendingUp, Award, Zap } from 'lucide-react'; // Add ChevronLeft here
import { colors, getPriorityColor, getThemeColors } from '../styles/colors';
import { useTheme } from '../contexts/ThemeContext';


interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
}


interface AboutSlidesProps {
  onLogin: () => void;
  heroVideoUrl?: string;
  testimonialVideos?: Video[]; // 👈 ADD THIS LINE
  testimonialVideoUrl?: string; // Keep this for backward compatibility
  thumbnailUrl?: string;
}
// 👇 ADD THIS ENTIRE COMPONENT HERE (before AboutSlides)
interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [mutedStates, setMutedStates] = useState<boolean[]>(videos.map(() => true));
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Auto-play all videos on mount
    videoRefs.current.forEach(video => {
      if (video) {
        video.play().catch(err => console.log('Auto-play prevented:', err));
      }
    });
  }, []);

  const toggleMute = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();

      const actualIndex = index % videos.length;
      const isCurrentlyMuted = mutedStates[actualIndex];

      if (isCurrentlyMuted) {
        // Unmute ONLY this specific video (not its duplicate)
        videoRefs.current.forEach((video, i) => {
          if (video) {
            if (i === index) {
              // Restart and unmute only THIS specific video
              video.currentTime = 0;
              video.muted = false;
              video.play().catch(err => console.log('Play error:', err));
            } else {
              // Mute everything else (including the duplicate)
              video.muted = true;
            }
          }
        });
      
      const newMutedStates = mutedStates.map(() => true);
      newMutedStates[actualIndex] = false;
      
      setMutedStates(newMutedStates);
      setActiveVideoIndex(index);
      setSelectedIndex(index);
    } else {
      // Mute all videos of this type
      videoRefs.current.forEach((video, i) => {
        if (video && i % videos.length === actualIndex) {
          video.muted = true;
        }
      });
      
      const newMutedStates = [...mutedStates];
      newMutedStates[actualIndex] = true;
      setMutedStates(newMutedStates);
      setActiveVideoIndex(null);
      setSelectedIndex(null);
    }
  };

  const handleVideoClick = (index: number) => {
    const actualIndex = index % videos.length;
    
    if (selectedIndex === index) {
      // Clicking selected video - mute and deselect
      videoRefs.current.forEach((video, i) => {
        if (video && i % videos.length === actualIndex) {
          video.muted = true;
        }
      });
      
      const newMutedStates = [...mutedStates];
      newMutedStates[actualIndex] = true;
      setMutedStates(newMutedStates);
      setActiveVideoIndex(null);
      setSelectedIndex(null);
    } else {
    // Select and unmute ONLY this specific video
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          // Restart and unmute only THIS specific video
          video.currentTime = 0;
          video.muted = false;
          video.play().catch(err => console.log('Play error:', err));
        } else {
          // Mute everything else
          video.muted = true;
        }
      }
    });
      
      const newMutedStates = mutedStates.map(() => true);
      newMutedStates[actualIndex] = false;
      setMutedStates(newMutedStates);
      setActiveVideoIndex(index);
      setSelectedIndex(index);
    }
  };

          // Add this BEFORE the return statement in VideoCarousel component
  const duplicatedVideos = useMemo(() => [...videos, ...videos], [videos]);

  return (
    <div className="relative overflow-visible py-8">
      {/* Auto-scrolling Video Container */}
      <div className="overflow-visible">
        <div 
          className={`flex gap-4 animate-slide-horizontal-smooth ${selectedIndex !== null ? 'paused' : ''}`}
          style={{ width: `${videos.length * 2 * 224}px` }}
        >
          {/* Duplicate videos for seamless loop */}
          {duplicatedVideos.map((video, index) => {
            const actualIndex = index % videos.length;
            const isSelected = selectedIndex === index;
            
            return (
              <div
                key={index}
                className={`relative flex-shrink-0 w-[220px] transition-transform duration-300
    ${isSelected ? 'scale-110 z-[60]' : 'scale-100 z-[10]'}`}
                style={{ position: 'relative' }}
              >
                {/* Active indicator */}
                {activeVideoIndex === index && (
                  <div className="absolute -top-2 -right-2 z-50 bg-green-500 rounded-full p-1.5 shadow-lg animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 cursor-pointer transition-all duration-300"
                  style={{
                      borderColor: activeVideoIndex === index
                        ? '#10b981'  // Green border for active video
                        : (isDark ? themeColors.primary.lightGray : themeColors.primary.black)
                    }}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="aspect-[9/16] bg-black">
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-full object-cover relative z-10"
                      src={video.url}
                      loop
                      playsInline
                      muted
                      autoPlay
                    />

                    {/* Mute/Unmute Button */}
                    <button
                      onClick={(e) => toggleMute(actualIndex, e)}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all hover:scale-110 z-20"
                    >
                      {mutedStates[actualIndex] ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Video Title Overlay */}
                    {video.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 
                bg-gradient-to-t from-black/80 to-transparent
                z-30 pointer-events-none">
                        <p className="text-white text-sm font-semibold whitespace-pre-line">
                          {video.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 👇 THEN YOUR EXISTING AboutSlides STARTS HERE
export const AboutSlides: React.FC<AboutSlidesProps> = ({ onLogin, heroVideoUrl, testimonialVideos, testimonialVideoUrl, thumbnailUrl }) => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = "Hi! I am Rishika!";
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const defaultHeroVideoUrl = "/graphics/deeco_small.mp4";
  const defaultTestimonialVideoUrl = "/graphics/rs.mp4";

  const finalHeroVideoUrl = heroVideoUrl || defaultHeroVideoUrl;
  const finalTestimonialVideoUrl = testimonialVideoUrl || defaultTestimonialVideoUrl;

  const defaultTestimonialVideos: Video[] = [
  { url: "/graphics/testimonial1.mp4", title: "Ananya\nUSA" },
  { url: "/graphics/testimonial2.mp4", title: "Tanisha\nSt. Xaviers, Mumbai" },
  { url: "/graphics/testimonial3.mp4", title: "Amir\nAustralia" },
  { url: "/graphics/testimonial4.mp4", title: "Rhea\nNMIMS, Mumbai" },
  { url: "/graphics/testimonial5.mp4", title: "Saanvi\nModern High, Kolkata" },
  { url: "/graphics/testimonial6.mp4", title: "Harshitha\nSymbiosis, Pune" },
];


  const finalTestimonialVideos = testimonialVideos || defaultTestimonialVideos;

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Typing animation effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentSlide === 0 && typedText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
    }
    return () => clearTimeout(timeoutId);
  }, [typedText, currentSlide, fullText]);

  useEffect(() => {
    if (currentSlide === 0) {
      setTypedText('');
    }
  }, [currentSlide]);

  const testimonials = useMemo(() => [
  { 
    text: "Rishika explains maths concepts in such a simple way. Even tough topics feel easy after her classes.", 
    rating: 4, 
    highlight: "simple way",
    name: "Aditi Mehra",
    institute: "Delhi University"
  },
  { 
    text: "Her economics lectures are very structured. She breaks down complex theories into small, clear steps.", 
    rating: 5, 
    highlight: "breaks down complex theories",
    name: "Rohan Iyer",
    institute: "St. Xavier’s College, Mumbai"
  },
  { 
    text: "Statistics was always scary for me, but Rishika’s teaching made it logical and manageable.", 
    rating: 5, 
    highlight: "logical and manageable",
    name: "Sneha Kulkarni",
    institute: "NMIMS Mumbai"
  },
  { 
    text: "The mock tests are very close to actual exam level and helped me gain confidence.", 
    rating: 4, 
    highlight: "mock tests",
    name: "Arpit Jain",
    institute: "Christ University, Bangalore"
  }
], []);

const testimonialsRow3 = useMemo(() => [
  { 
    text: "I am a working professional and her flexible teaching style made it easy to learn alongside my job.", 
    rating: 5, 
    highlight: "flexible teaching style",
    name: "Vikas Agarwal",
    institute: "Self-employed (Stock Trader)"
  },
  { 
    text: "Rishika connects finance concepts with real-life examples, which makes learning very practical.", 
    rating: 5, 
    highlight: "real-life examples",
    name: "Nidhi Bansal",
    institute: "IIM Indore"
  },
  { 
    text: "Her step-by-step approach helped me finally understand macroeconomics properly.", 
    rating: 4, 
    highlight: "step-by-step approach",
    name: "Kunal Saxena",
    institute: "Hansraj College, DU"
  },
  { 
    text: "I am an entrepreneur and her finance sessions helped me understand cash flow and basic economics clearly.", 
    rating: 4.5, 
    highlight: "finance sessions",
    name: "Pooja Shah",
    institute: "Startup Founder"
  }
], []);

  const services = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "Pre-Recorded Courses",
    description: "Comprehensive courses on latest technologies and tools with lifetime access and regular updates.",
    color: themeColors.accent.blue,
    gradient: colors.gradient.blueGradient
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Access",
    description:
      "Be part of a focused learning community to discuss ideas, share insights, ask questions, and grow together through meaningful conversations and collaborative learning.",
    color: themeColors.accent.green
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Hub Access",
    description: "Cutting-edge AI tools to maximize your learning and boost productivity with exclusive features.",
    color: themeColors.accent.red,
    gradient: colors.gradient.redGradient
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Study Resources",
    description: "Access to PYQs, cheatsheets, and comprehensive materials for your field of study.",
    color: themeColors.accent.orange,
    gradient: colors.gradient.orangeGradient
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Live Classes",
    description: "One-on-one or group learning options, flexible scheduling, access to curated class notes, session recordings, transcripts, daily interactive quizzes, and many more engaging learning features.",
    color: themeColors.accent.yellow,
    gradient: colors.gradient.yellowGradient
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Market Pulse",
    description:
      "One curated pulse every day covering global finance and economics. Complex news, policies, and market movements explained simply—so you stay informed without feeling overwhelmed.",
    color: themeColors.accent.purple
  }
];

  const stats = [
     { icon: <Users className="w-6 h-6" />, value: "3000+", label: "Hours", color: themeColors.accent.yellow },
     { icon: <Globe className="w-6 h-6" />, value: "7+", label: "Countries", color: themeColors.accent.red },
     { icon: <TrendingUp className="w-6 h-6" />, value: "95%", label: "Success Rate", color: themeColors.accent.blue },
     { icon: <Zap className="w-6 h-6" />, value: "24/7", label: "AI Support", color: themeColors.accent.orange }
   ];

  const faqs = [
  {
    id: "courses-live",
    question: "When will the courses be live?",
    answer:
      "Our courses are launching very soon. We’re currently putting the final touches in place to ensure a high-quality learning experience. Stay tuned for the official announcement!"
  },
  {
    id: "ai-hub",
    question: "When will the AI Hub tools be available?",
    answer:
      "The AI Hub tools will be going live very soon. We’re actively working on deploying powerful and easy-to-use tools—keep an eye out for updates!"
  },
  {
    id: "register-live",
    question: "How can I register for live classes?",
    answer:
      "You can register for live classes by contacting us directly at +91 9903996663, emailing us at saragirishika748@gmail.com, or by using the Contact Us section on our website. Simply drop your message there and our team will get back to you shortly."
  },
  {
    id: "subjects-live",
    question: "What subjects are covered in the live classes?",
    answer:
      "Our live classes cover a wide range of subjects including Mathematics, Statistics, Economics, Business, and Finance, designed to build both conceptual clarity and practical understanding."
  },
  {
    id: "market-pulse",
    question: "What is Market Pulse?",
    answer:
    "Market Pulse delivers one curated pulse every day, focusing on important global finance and economics news. Each daily pulse breaks down complex events, policies, and market movements into simple, easy-to-understand insights so that anyone can stay informed without feeling overwhelmed."
},
  {
    id: "features-live",
    question: "What features are included in live classes?",
    answer:
      "Live classes offer one-on-one or group learning options, flexible scheduling, access to curated class notes, session recordings, transcripts, daily interactive quizzes, and many more engaging learning features."
  },
  {
    id: "age-group",
    question: "Which age group are these courses suitable for?",
    answer:
      "Our programs are suitable for learners of all age groups who are interested in understanding global trends, economics, and finance—whether for exams, interviews, career growth, or general knowledge."
  },
  {
    id: "why-deeco",
    question: "Why should I choose De-Eco by Rishika?",
    answer:
      "De-Eco focuses on simplifying complex concepts through practical examples, real-world applications, and interactive learning. Our goal is to help learners gain clarity, confidence, and a strong understanding of global economics and finance."
  }
];


  const toggleFAQ = (id: string) => {
    setOpenFAQ(prev => (prev === id ? null : id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-all duration-300 ${i < rating ? 'fill-current text-yellow-500 scale-110' : 'text-gray-300'}`}
      />
    ));
  };

  const switchToFullVideo = () => {
  if (!videoRef) return;

  videoRef.pause();
  videoRef.innerHTML = ""; // remove small source

  const source = document.createElement("source");
  source.src = "/graphics/deeco_fast.mp4";
  source.type = "video/mp4";

  videoRef.appendChild(source);
  videoRef.load();

  videoRef.currentTime = 0;
  videoRef.muted = false;
  videoRef.play();

  setIsMuted(false);
};


  return (
    <div className="min-h-screen overflow-y-auto scroll-smooth bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Slide 1: Hero Section with Enhanced Design */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: themeColors.background.beige }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-200 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: Enhanced Video Section */}
            <div className="w-full max-w-sm lg:max-w-none lg:w-2/5 transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 backdrop-blur-sm"
                  style={{ backgroundColor: themeColors.background.black }}
                >
                  <div className="aspect-[9/16] relative">
                    {finalHeroVideoUrl ? (
                      <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!videoRef) return;

                          if (videoRef.muted) {
                            // Switch to full-quality video on first interaction
                            switchToFullVideo();
                          } else {
                            videoRef.muted = true;
                            setIsMuted(true);
                          }
                        }}

                      >
                        <video
                          ref={setVideoRef}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          poster="/graphics/deeco_post.jpg"
                        >
                          <source src="/graphics/deeco_small.mp4" type="video/mp4" />
                        </video>

                        {/* Unmute / Activate Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!videoRef) return;

                            if (videoRef.muted) {
                              // Muted → unmute & restart
                              videoRef.currentTime = 0;
                              videoRef.muted = false;
                              videoRef.play();
                              setIsMuted(false);
                            } else {
                              // Playing → mute
                              videoRef.muted = true;
                              setIsMuted(true);
                            }
                          }}

                          className="absolute bottom-20 right-4 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all hover:scale-110 z-20 shadow-xl"
                        >
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
                          </svg>
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-md border border-white/20 dark:border-gray-600/20 bg-black/80 dark:bg-gray-900/80"
                  >
                    <button
                      className="w-full text-sm font-semibold text-white dark:text-gray-100 hover:text-pink-300 transition-colors cursor-pointer"
                      onClick={finalHeroVideoUrl ? onLogin : undefined}
                    >
                      {finalHeroVideoUrl ? "🚀 Log In / Sign Up" : "Add video URL to display"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enhanced Content */}
            <div className="w-full lg:w-3/5">
              {/* Floating EduPilot Branding */}
                <div className="flex items-center justify-center mb-6 animate-fade-in-down">
                  <div className="bg-white rounded-full p-3 shadow-xl border-gray-900 dark:border-gray-100 transform hover:rotate-12 transition-transform duration-300 relative">
                    <img
                      src="/logo/De-Eco-logo.png"
                      alt="DE-ECO Logo"
                      className="w-20 h-20 object-contain"
                    />
                </div>
              </div>

              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border-4 border-white dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 min-h-[3rem]">
                  {typedText}
                  <span className="animate-pulse text-pink-500">|</span>
                </h2>

                <div className="space-y-6">
                  {/* About Section with Gradient Border */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative p-6 rounded-2xl" style={{ backgroundColor: themeColors.accent.blue }}>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        About Me
                      </h3>
                      <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                        Welcome to DE-ECO, where learning meets the real world. With an Economics Honours degree, an MBA in Marketing, and professional experience at Mastercard, I created DE-ECO to bridge the gap between academic knowledge and practical skills. My goal is to help students think independently, apply concepts with confidence, and excel in exams, interviews, and beyond.
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.slice(0, 2).map((stat, index) => (
                      <div 
                        key={index}
                        className="relative group text-center p-4 rounded-2xl transform hover:scale-110 hover:-rotate-2 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: stat.color }}
                      >
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative">
                          <div className="flex items-center justify-center mb-2">
                            {stat.icon}
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={onLogin}
                      className="flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
                      style={{ backgroundColor: themeColors.primary.black, color: themeColors.text.white }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button
                      onClick={onLogin}
                      className="
                        flex-1 px-8 py-4 rounded-xl font-bold text-lg border-3 transition-all duration-300 
                        hover:scale-105 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group

                        bg-black text-white border-black               // Light mode
                        dark:bg-white dark:text-black dark:border-white // Dark mode
                      "
                    >
                      <span className="relative z-10">Learn More</span>
                      <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* ================= WHAT WE OFFER ================= */}
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: themeColors.background.white }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 dark:bg-gray-700/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-200/30 dark:bg-gray-600/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* ================= MOBILE VIEW ================= */}
        <div className="lg:hidden flex flex-col items-center gap-10">

          {/* Hub */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-full blur-xl opacity-60 animate-pulse" />

            <div
              className="relative w-44 h-44 rounded-full border-4 flex items-center justify-center text-center shadow-2xl"
              style={{
                backgroundColor: isDark ? "#ffffff" : "#000000",
                color: isDark ? "#000000" : "#ffffff",
                borderColor: themeColors.primary.black,
              }}
            >
              <h3 className="text-xl font-black">What We Offer</h3>
            </div>
          </div>

          {/* Cards */}
          <div className="w-full flex flex-col gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 shadow-lg border-2"
                style={{ backgroundColor: service.color }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-800">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP HUB & SPOKE ================= */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[900px]">

          {/* -------- Center Hub -------- */}
          <div className="absolute z-20">
            <div className="relative">
              <div className="absolute -inset-5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-full blur-xl opacity-60 animate-pulse" />

              <div
                className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl"
                style={{
                  backgroundColor: isDark ? "#ffffff" : "#000000",
                  color: isDark ? "#000000" : "#ffffff",
                  borderColor: themeColors.primary.black,
                  transform: "translateY(-4px)"
                }}
              >
                <h3 className="text-3xl font-black leading-none text-center">
                  What We <br />
                  Offer
                </h3>
                <div className="w-10 h-1 bg-gradient-to-r from-pink-500 to-red-500 mt-4 rounded-full" />
              </div>
            </div>
          </div>

          {/* -------- SERVICE CARDS -------- */}
          {services.map((service, idx) => {
            const angle = (idx / services.length) * 2 * Math.PI;
            const radius = 360;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={idx}
                className="absolute z-10"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className="w-64 p-6 rounded-3xl border-4 border-white dark:border-gray-700 shadow-xl transition-all duration-300 hover:scale-110 hover:-rotate-2"
                  style={{ backgroundColor: service.color }}
                >
                  <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-800">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center mt-14">
          <button
            onClick={onLogin}
            className="px-12 py-4 rounded-xl font-bold text-lg transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              backgroundColor: themeColors.primary.w2,
              color: isDark ? "#000000" : "#ffffff",
            }}
          >
            Explore All Services <ChevronRight className="inline w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>




      {/* Slide 3: Enhanced Video Testimonials */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" 
          style={{ backgroundColor: themeColors.primary.lightGray }}>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-2.5 shadow-lg border-2" style={{ borderColor: themeColors.primary.black }}>
                <img
                  src="/logo/De-Eco-logo.png"
                  alt="DE-ECO Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Student <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers
            </p>
          </div>

          {/* Top 2 Horizontal Rows */}
          <div className="space-y-6 mb-8">
            {/* Top Row 1 - Scrolling Right */}
            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="flex animate-slide-horizontal space-x-4">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[280px] p-5 rounded-2xl shadow-xl border-3 border-white dark:border-gray-700"
                    style={{ 
                      backgroundColor: index % 3 === 0 
                        ? themeColors.accent.yellow 
                        : index % 3 === 1 
                        ? themeColors.accent.blueLight
                        : themeColors.accent.red 
                    }}
                  >
                    <div className="flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 mb-3 italic text-sm leading-relaxed line-clamp-3">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="text-gray-800 dark:text-gray-300 font-bold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {testimonial.institute}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Carousel */}
            <div className="mb-8">
            <VideoCarousel videos={finalTestimonialVideos} />
          </div>

            {/* Bottom Row  - Scrolling Right */}
            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="flex animate-slide-horizontal space-x-4">
                {[...testimonialsRow3, ...testimonialsRow3, ...testimonialsRow3].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-[280px] p-5 rounded-2xl shadow-xl border-3 border-white dark:border-gray-700"
                    style={{ 
                      backgroundColor: index % 3 === 0 
                        ? themeColors.accent.yellow 
                        : index % 3 === 1 
                        ? themeColors.accent.blueLight
                        : themeColors.accent.red 
                    }}
                  >
                    <div className="flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 mb-3 italic text-sm leading-relaxed line-clamp-3">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="text-gray-800 dark:text-gray-300 font-bold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {testimonial.institute}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button 
              onClick={onLogin}
              className="px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
              style={{ backgroundColor: themeColors.primary.black, color: themeColors.text.white }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join Our Community 
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>


      {/* Enhanced FAQ Section */}
      <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: themeColors.background.white }}>
        <div className="w-full max-w-7xl px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-3 shadow-lg border-2" style={{ borderColor: themeColors.primary.black }}>
                <img
                  src="/logo/De-Eco-logo.png"
                  alt="DE-ECO Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
                    
                    <h2 className="text-4xl lg:text-6xl font-black mb-4 text-gray-900 dark:text-gray-100">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Everything you need to know about our courses and services
                    </p>
                  </div>
      
                  <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">
                    {faqs.map((faq, index) => (
                    <div
                      key={faq.id}
                        className={`group transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border-4 hover:scale-[1.02] ${
                          openFAQ === faq.id
                            ? 'shadow-2xl border-white dark:border-gray-700' 
                            : 'shadow-lg border-white dark:border-gray-700 hover:shadow-xl'
                        }`}
                        style={{ 
                          backgroundColor: isDark
                            ? themeColors.primary.lightGray
                            : (
                                index % 4 === 0
                                  ? themeColors.accent.blue
                                  : index % 4 === 1
                                  ? themeColors.accent.yellow
                                  : index % 4 === 2
                                  ? themeColors.accent.red
                                  : themeColors.accent.orange
                              )
                        }}
                        onClick={() => toggleFAQ(faq.id)}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start gap-4 mb-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex-1 leading-snug">
                              {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 transition-all duration-300 transform ${
                              openFAQ === faq.id ? 'rotate-45' : 'group-hover:rotate-90'
                            } w-10 h-10 rounded-xl flex items-center justify-center shadow-md`}
                            // Update the backgroundColor calculation:
                            style={{ 
                              backgroundColor: index % 4 === 0 ? themeColors.accent.blue : 
                                              index % 4 === 1 ? themeColors.accent.yellow : 
                                              index % 4 === 2 ? themeColors.accent.red : 
                                              themeColors.accent.orange
                            }}>
                              <Plus className="w-6 h-6" />
                            </div>
                          </div>
                          
                          <div className={`overflow-hidden transition-all duration-500 ${
                            openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="pt-4 border-t-2 border-white/50">
                              <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
      
                  <div className="text-center mt-16">
                    <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-4 border-white dark:border-gray-700">
                      <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 font-semibold">Still have questions?</p>
                      <button 
                        onClick={onLogin}
                        className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ backgroundColor: themeColors.primary.black, color: themeColors.text.white }}
                      >
                        Contact Support <ChevronRight className="w-5 h-5 inline ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide-vertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes slide-vertical-reverse {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          @keyframes slide-horizontal {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slide-horizontal-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes slide-horizontal-smooth {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-slide-vertical {
            animation: slide-vertical 20s linear infinite;
          }
          .animate-slide-vertical-reverse {
            animation: slide-vertical-reverse 25s linear infinite;
          }
          .animate-slide-horizontal {
            animation: slide-horizontal 25s linear infinite;
          }
          .animate-slide-horizontal-reverse {
            animation: slide-horizontal-reverse 30s linear infinite;
          }
          .animate-slide-horizontal-smooth {
            animation: slide-horizontal-smooth 40s linear infinite;
          }
          .animate-slide-horizontal-smooth.paused {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
};