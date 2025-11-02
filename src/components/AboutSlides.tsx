import React, { useState, useEffect } from 'react';
import { Play, Plus, Star, ChevronRight, Users, Video, Brain, FileText, Sparkles, TrendingUp, Award, Zap } from 'lucide-react';

interface AboutSlidesProps {
  onLogin: () => void;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export const AboutSlides: React.FC<AboutSlidesProps> = ({ onLogin, videoUrl, thumbnailUrl }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = "Hi! I am Rishika!";
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const defaultVideoUrl = "public/graphics/rs.mp4";
  
  const finalVideoUrl = videoUrl || defaultVideoUrl;

  // Mouse movement effect for subtle interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const testimonials = [
    { text: "Amazing courses that helped me land my dream job!", rating: 5, highlight: "dream job" },
    { text: "The AI tools are incredibly helpful for learning.", rating: 5, highlight: "AI tools" },
    { text: "Rishika's teaching style is exceptional and engaging.", rating: 4, highlight: "exceptional" },
    { text: "Best investment I made for my career development.", rating: 5, highlight: "best investment" }
  ];

  const testimonialsRow2 = [
    { text: "The personalized mentoring changed my career path completely!", rating: 5, highlight: "career path" },
    { text: "Interactive coding environments made learning so much easier.", rating: 4, highlight: "much easier" },
    { text: "Live classes are engaging and well-structured.", rating: 5, highlight: "well-structured" },
    { text: "The community support is incredible and motivating.", rating: 4, highlight: "incredible" }
  ];

  const testimonialsRow3 = [
    { text: "Certificates helped me get recognition at my workplace.", rating: 5, highlight: "recognition" },
    { text: "The AI Hub tools boosted my productivity significantly.", rating: 4, highlight: "productivity" },
    { text: "Offline access feature is perfect for my schedule.", rating: 5, highlight: "perfect" },
    { text: "30-day guarantee shows confidence in their quality.", rating: 5, highlight: "confidence" }
  ];

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Pre-Recorded Courses",
      description: "Comprehensive courses on latest technologies and tools with lifetime access and regular updates.",
      color: "#a5d8ff",
      gradient: "from-blue-200 to-blue-300"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Live Classes",
      description: "One-on-one or small group sessions tailored to your learning needs with expert instructors.",
      color: "#ffec99",
      gradient: "from-yellow-200 to-yellow-300"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Hub Access",
      description: "Cutting-edge AI tools to maximize your learning and boost productivity with exclusive features.",
      color: "#ffc9c9",
      gradient: "from-red-200 to-red-300"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Study Resources",
      description: "Access to PYQs, cheatsheets, and comprehensive materials for your field of study.",
      color: "#fff4e6",
      gradient: "from-orange-100 to-orange-200"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Happy Students", color: "#ffec99" },
    { icon: <Award className="w-6 h-6" />, value: "50+", label: "Expert Courses", color: "#ffc9c9" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "95%", label: "Success Rate", color: "#a5d8ff" },
    { icon: <Zap className="w-6 h-6" />, value: "24/7", label: "AI Support", color: "#fff4e6" }
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
    <div className="min-h-screen overflow-y-auto scroll-smooth bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Slide 1: Hero Section with Enhanced Design */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: '#efe9e9ff' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: Enhanced Video Section */}
            <div className="w-full max-w-sm lg:max-w-none lg:w-2/5 transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white backdrop-blur-sm"
                  style={{ backgroundColor: '#000000ff' }}
                >
                  <div className="aspect-[9/16] relative">
                    {finalVideoUrl ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={setVideoRef}
                          className="w-full h-full object-cover"
                          controls={false}
                          onClick={handlePlayPause}
                        >
                          <source src={finalVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Enhanced Play/Pause Button */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                          onClick={handlePlayPause}
                        >
                          <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 shadow-2xl ${
                            isPlaying ? 'bg-black/70 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
                          }`}>
                            {isPlaying ? (
                              <div className="flex gap-1.5">
                                <div className="w-2 h-8 bg-white rounded-full animate-pulse"></div>
                                <div className="w-2 h-8 bg-white rounded-full animate-pulse delay-75"></div>
                              </div>
                            ) : (
                              <Play className="w-10 h-10 ml-1 text-gray-900 group-hover:text-pink-500 transition-colors" />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-white p-8 flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-400 shadow-lg">
                          <Play className="w-10 h-10 ml-1" />
                        </div>
                        <p className="text-lg font-semibold mb-2">Welcome Video</p>
                        <p className="text-sm opacity-80">Custom video player</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                  >
                    <button
                      className="w-full text-sm font-semibold text-white hover:text-pink-300 transition-colors cursor-pointer"
                      onClick={finalVideoUrl ? onLogin : undefined}
                    >
                      {finalVideoUrl ? "🚀 Log In / Sign Up" : "Add video URL to display"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enhanced Content */}
            <div className="w-full lg:w-3/5">
              {/* Floating EduPilot Branding */}
              <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-down">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transform hover:rotate-12 transition-transform duration-300 bg-gradient-to-br from-pink-400 to-red-400">
                  <span className="text-white font-bold text-xl">R</span>
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">DE-ECO</span>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 min-h-[3rem]">
                  {typedText}
                  <span className="animate-pulse text-pink-500">|</span>
                </h2>

                <div className="space-y-6">
                  {/* About Section with Gradient Border */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative p-6 rounded-2xl" style={{ backgroundColor: '#a5d8ff' }}>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                        About Me
                      </h3>
                      <p className="text-sm lg:text-base text-gray-800 leading-relaxed">
                        Welcome to my learning platform! I'm passionate about helping students master cutting-edge 
                        technologies and AI tools. With years of industry experience and a proven track record in 
                        education, I've created a comprehensive learning            ecosystem that combines theoretical knowledge 
                        with practical applications. passionate about helping students master cutting-edge 
                        technologies and AI tools. With years of industry tools. With years of industry ecosystem that combines theoretical 
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
                        <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative">
                          <div className="flex items-center justify-center mb-2">
                            {stat.icon}
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={onLogin}
                      className="flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
                      style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button
                      onClick={onLogin}
                      className="flex-1 px-8 py-4 rounded-xl font-bold text-lg border-3 transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
                      style={{ borderColor: '#1e1e1e', color: '#1e1e1e', backgroundColor: 'white' }}
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

      {/* Slide 2: Services with Enhanced Cards */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-down">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-400 shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold" style={{ color: '#1e1e1e' }}>DE-ECO</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              What We <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning solutions designed to accelerate your career growth
            </p>
          </div>

          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 shadow-lg border-3 border-white transition-all duration-500 hover:scale-110 hover:-rotate-1 cursor-pointer"
                style={{ backgroundColor: service.color }}
              >
                {/* Hover glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-4 shadow-md transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
                  
                  {/* Floating indicator */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <div className="text-center">
            <button 
              onClick={onLogin}
              className="px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
              style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore All Courses 
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Slide 3: Enhanced Testimonials */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: '#e9ecef' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Header - Centered above everything */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-400 shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold" style={{ color: '#1e1e1e' }}>DE-ECO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Student <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers
            </p>
          </div>

          {/* Content - Video and Testimonials side by side */}
          <div className="flex flex-col lg:flex-row items-start gap-12 mb-12">
            {/* Left 1/3 - Vertical Video Card */}
            <div className="w-full lg:w-1/3 transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl blur-lg opacity-75"></div>
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white backdrop-blur-sm"
                  style={{ backgroundColor: '#000000ff' }}
                >
                  <div className="aspect-[9/16] relative">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={finalVideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                        <Play className="w-8 h-8 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 2/3 - Testimonials Content */}
            <div className="w-full lg:w-2/3 flex items-stretch">
              {/* Enhanced Testimonial Columns - Vertical Scrolling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-[600px]">
                {/* First Column */}
                <div className="overflow-hidden h-full relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                  <div className="flex flex-col animate-slide-vertical space-y-6 absolute w-full">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 bg-white p-6 rounded-2xl shadow-xl border-3 border-white hover:scale-105 transition-transform duration-300"
                      >
                        <div className="flex mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-800 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-bold">
                            {index % testimonials.length + 1}
                          </div>
                          <p className="text-gray-600 font-semibold text-sm">
                            Student {index % testimonials.length + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Column */}
                <div className="overflow-hidden h-full relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                  <div className="flex flex-col animate-slide-vertical-reverse space-y-6 absolute w-full">
                    {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 p-6 rounded-2xl shadow-xl border-3 border-white hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: '#ffec99' }}
                      >
                        <div className="flex mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-800 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold">
                            {index % testimonialsRow2.length + 5}
                          </div>
                          <p className="text-gray-600 font-semibold text-sm">
                            Student {index % testimonialsRow2.length + 5}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Third Column */}
                <div className="overflow-hidden h-full relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                  <div className="flex flex-col animate-slide-vertical space-y-6 absolute w-full">
                    {[...testimonialsRow3, ...testimonialsRow3].map((testimonial, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 p-6 rounded-2xl shadow-xl border-3 border-white hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: '#ffc9c9' }}
                      >
                        <div className="flex mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-800 mb-4 italic text-sm leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white font-bold">
                            {index % testimonialsRow3.length + 9}
                          </div>
                          <p className="text-gray-600 font-semibold text-sm">
                            Student {index % testimonialsRow3.length + 9}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA - Centered below both video and testimonials */}
          <div className="text-center">
            <button 
              onClick={onLogin}
              className="px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
              style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}
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
      <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="w-full max-w-7xl px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-pink-400 to-red-400">
                <span className="text-white font-bold text-xl">R</span>
              </div>
                      <span className="text-2xl font-bold" style={{ color: '#1e1e1e' }}>DE-ECO</span>
                    </div>
                    
                    <h2 className="text-4xl lg:text-6xl font-black mb-4 text-gray-900">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Everything you need to know about our courses and services
                    </p>
                  </div>
      
                  <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className={`group transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border-4 hover:scale-[1.02] ${
                          openFAQ === index 
                            ? 'shadow-2xl border-white' 
                            : 'shadow-lg border-white hover:shadow-xl'
                        }`}
                        style={{ 
                          backgroundColor: index % 4 === 0 ? '#a5d8ff' : index % 4 === 1 ? '#ffec99' : index % 4 === 2 ? '#ffc9c9' : '#fff4e6'
                        }}
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start gap-4 mb-4">
                            <h3 className="font-bold text-lg text-gray-900 flex-1 leading-snug">
                              {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 transition-all duration-300 transform ${
                              openFAQ === index ? 'rotate-45' : 'group-hover:rotate-90'
                            } w-10 h-10 rounded-xl flex items-center justify-center shadow-md`}
                            style={{ 
                              backgroundColor: openFAQ === index ? '#ff8787' : '#ffffff',
                              color: openFAQ === index ? '#ffffff' : '#1e1e1e'
                            }}>
                              <Plus className="w-6 h-6" />
                            </div>
                          </div>
                          
                          <div className={`overflow-hidden transition-all duration-500 ${
                            openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="pt-4 border-t-2 border-white/50">
                              <p className="text-gray-800 leading-relaxed font-medium">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
      
                  <div className="text-center mt-16">
                    <div className="inline-block bg-white rounded-2xl p-8 shadow-xl border-4 border-white">
                      <p className="text-gray-800 text-lg mb-4 font-semibold">Still have questions?</p>
                      <button 
                        onClick={onLogin}
                        className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ backgroundColor: '#000000ff', color: '#ffffff' }}
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
          .animate-slide-vertical {
            animation: slide-vertical 20s linear infinite;
          }
          .animate-slide-vertical-reverse {
            animation: slide-vertical-reverse 25s linear infinite;
          }
        `
      }} />
    </div>
  );
};