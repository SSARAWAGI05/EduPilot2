import React, { useState, useEffect, useRef, useMemo } from 'react'; // Add useRef here
import { Play, Plus, Star, ChevronRight, ChevronLeft, Users, Video, Brain, FileText, Sparkles, TrendingUp, Award, Zap } from 'lucide-react'; // Add ChevronLeft here
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
                className={`flex-shrink-0 w-[220px] transition-all duration-300 ${
                  isSelected ? 'scale-110 z-50' : 'scale-100 z-10'
                }`}
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
                      className="w-full h-full object-cover"
                      src={video.url}
                      loop
                      playsInline
                      muted={true}
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
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const defaultHeroVideoUrl = "/graphics/deeco.mp4";
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
  { text: "Amazing courses that helped me land my dream job!", rating: 5, highlight: "dream job" },
  { text: "The AI tools are incredibly helpful for learning.", rating: 5, highlight: "AI tools" },
  { text: "Rishika's teaching style is exceptional and engaging.", rating: 4, highlight: "exceptional" },
  { text: "Best investment I made for my career development.", rating: 5, highlight: "best investment" }
], []);

const testimonialsRow2 = useMemo(() => [
  { text: "The personalized mentoring changed my career path completely!", rating: 5, highlight: "career path" },
  { text: "Interactive coding environments made learning so much easier.", rating: 4, highlight: "much easier" },
  { text: "Live classes are engaging and well-structured.", rating: 5, highlight: "well-structured" },
  { text: "The community support is incredible and motivating.", rating: 4, highlight: "incredible" }
], []);

const testimonialsRow3 = useMemo(() => [
  { text: "Certificates helped me get recognition at my workplace.", rating: 5, highlight: "recognition" },
  { text: "The AI Hub tools boosted my productivity significantly.", rating: 4, highlight: "productivity" },
  { text: "Offline access feature is perfect for my schedule.", rating: 5, highlight: "perfect" },
  { text: "30-day guarantee shows confidence in their quality.", rating: 5, highlight: "confidence" }
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
    title: "Live Classes",
    description: "One-on-one or small group sessions tailored to your learning needs with expert instructors.",
    color: themeColors.accent.yellow,
    gradient: colors.gradient.yellowGradient
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
  }
];

  const stats = [
     { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Happy Students", color: themeColors.accent.yellow },
     { icon: <Award className="w-6 h-6" />, value: "50+", label: "Expert Courses", color: themeColors.accent.red },
     { icon: <TrendingUp className="w-6 h-6" />, value: "95%", label: "Success Rate", color: themeColors.accent.blue },
     { icon: <Zap className="w-6 h-6" />, value: "24/7", label: "AI Support", color: themeColors.accent.orange }
   ];

  const faqs = [
    {
      question: "How do I get started with the courses?",
      answer: "Getting started is easy! Simply sign up for an account, browse our course catalog, and enroll in the courses that interest you. All courses come with detailed prerequisites and learning paths."
    },
    {
      question: "What are the prerequisites for AI courses?",
      answer: "Most of our AI courses require basic programming knowledge in Python. We also offer beginner-friendly courses that start from the fundamentals. Check each course description for specific requirements."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes! Once you enroll, you can download course materials and videos for offline viewing. However, some interactive elements and live sessions require an internet connection."
    },
    {
      question: "Do you offer one-on-one mentoring?",
      answer: "Absolutely! We provide personalized mentoring sessions with industry experts. You can book one-on-one sessions or join small group mentoring programs based on your learning goals."
    },
    {
      question: "What's included in the AI Hub?",
      answer: "The AI Hub includes access to cutting-edge AI tools, interactive coding environments, project templates, and exclusive resources to boost your productivity and learning experience."
    },
    {
      question: "How often are live classes conducted?",
      answer: "Live classes are conducted weekly for most courses. We also offer intensive bootcamps with daily sessions. All live classes are recorded and available for later viewing."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your course within the first 30 days, we'll provide a full refund, no questions asked."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Yes! You'll receive a verified digital certificate upon successful completion of each course. These certificates are recognized by industry partners and can be shared on LinkedIn."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-all duration-300 ${i < rating ? 'fill-current text-yellow-500 scale-110' : 'text-gray-300'}`}
      />
    ));
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
                      <div className="relative w-full h-full">
                        <video
                          ref={setVideoRef}
                          className="w-full h-full object-cover"
                          controls={false}
                          autoPlay
                          muted={isMuted}
                          playsInline
                          webkit-playsinline="true"
                          loop
                          onClick={handlePlayPause}
                        >
                          <source src={finalHeroVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Enhanced Play/Pause Button */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                          onClick={handlePlayPause}
                        >
                          <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 shadow-2xl ${
                            isPlaying ? 'bg-black/70 dark:bg-white/70 backdrop-blur-md' : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md'
                          }`}>
                            {isPlaying ? (
                              <div className="flex gap-1.5">
                                <div className="w-2 h-8 bg-white rounded-full animate-pulse"></div>
                                <div className="w-2 h-8 bg-white rounded-full animate-pulse delay-75"></div>
                              </div>
                            ) : (
                              <Play className="w-10 h-10 ml-1 text-gray-900 dark:text-gray-100 group-hover:text-pink-500 transition-colors" />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-white dark:text-gray-100 p-8 flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-400 shadow-lg">
                          <Play className="w-10 h-10 ml-1" />
                        </div>
                        <p className="text-lg font-semibold mb-2">Welcome Video</p>
                        <p className="text-sm opacity-80">Custom video player</p>
                      </div>
                    )}
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
                        Welcome to my learning platform! I'm passionate about helping students master cutting-edge 
                        technologies and AI tools. With years of industry experience and a proven track record in 
                        education, I've created a comprehensive learning            ecosystem that combines theoretical knowledge 
                        with practical applications. passionate about helping students master cutting-edge.
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
  className="py-20"
  style={{ backgroundColor: themeColors.background.white }}
>
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

   {/* LEFT SIDE */}
<div className="lg:col-span-4 flex items-center justify-center">

  {/* Content */}
  <div className="flex flex-col items-center text-center gap-6 -translate-y-8">
    {/* ↑ adjust -translate-y-6 / -8 / -10 as needed */}

    {/* Logo Circle */}
    <div className="bg-white rounded-full p-2.5 shadow-lg border-2" style={{ borderColor: themeColors.primary.black }}>
      <img
        src="/logo/De-Eco-logo.png"
        alt="DE-ECO"
        className="w-20 h-20 object-contain"
      />
    </div>

    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              What We <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Offer</span>
            </h2>

  </div>
</div>





    {/* RIGHT SIDE – BLOCK GRID */}
    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {services.map((service, idx) => (
        <div
          key={idx}
          className="rounded-3xl p-8 flex flex-col gap-4"
          style={{
            backgroundColor: service.color,
            minHeight: 220,
          }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center">
            {service.icon}
          </div>

          {/* Text */}
          <h3 className="text-xl font-bold text-gray-900">
            {service.title}
          </h3>

          <p className="text-sm text-gray-900 leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-bold">
                        {(index % testimonials.length) + 1}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
                        Student {(index % testimonials.length) + 1}
                      </p>
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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold">
                        {(index % testimonialsRow3.length) + 9}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
                        Student {(index % testimonialsRow3.length) + 9}
                      </p>
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
      
                  <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className={`group transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border-4 hover:scale-[1.02] ${
                          openFAQ === index 
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
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start gap-4 mb-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex-1 leading-snug">
                              {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 transition-all duration-300 transform ${
                              openFAQ === index ? 'rotate-45' : 'group-hover:rotate-90'
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
                            openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
