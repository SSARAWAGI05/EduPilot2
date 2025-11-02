import React, { useState, useEffect } from 'react';
import { Play, Plus, Star, Users, Video, Brain, FileText, Award, ChevronRight } from 'lucide-react';

interface AboutUsPageProps {
  onLogout?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onLogout }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hi! I am Rishika!";
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (typedText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
    }
    return () => clearTimeout(timeoutId);
  }, [typedText, fullText]);

  const testimonials = [
    { text: "Amazing courses that helped me land my dream job!", rating: 5, name: "Sarah M." },
    { text: "The AI tools are incredibly helpful for learning.", rating: 5, name: "David K." },
    { text: "Rishika's teaching style is exceptional and engaging.", rating: 4, name: "Priya S." },
    { text: "Best investment I made for my career development.", rating: 5, name: "Michael R." }
  ];

  const testimonialsRow2 = [
    { text: "The personalized mentoring changed my career path!", rating: 5, name: "Emma L." },
    { text: "Interactive coding environments made learning easier.", rating: 4, name: "James W." },
    { text: "Live classes are engaging and well-structured.", rating: 5, name: "Aisha P." },
    { text: "The community support is incredible and motivating.", rating: 4, name: "Carlos M." }
  ];

  const testimonialsRow3 = [
    { text: "Certificates helped me get recognition at work.", rating: 5, name: "Lisa T." },
    { text: "The AI Hub tools boosted my productivity significantly.", rating: 4, name: "Ryan B." },
    { text: "Offline access feature is perfect for my schedule.", rating: 5, name: "Nina G." },
    { text: "30-day guarantee shows confidence in their quality.", rating: 5, name: "Alex F." }
  ];

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Pre-Recorded Courses",
      description: "Comprehensive courses on latest technologies with lifetime access and regular updates.",
      color: "#a5d8ff"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Live Classes",
      description: "One-on-one or small group sessions tailored to your learning needs.",
      color: "#ffec99"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Hub Access",
      description: "Cutting-edge AI tools to maximize your learning and boost productivity.",
      color: "#ffc9c9"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Study Resources",
      description: "Access to PYQs, cheatsheets, and comprehensive materials.",
      color: "#fff4e6"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with the courses?",
      answer: "Getting started is easy! Simply browse our course catalog, choose your desired course, and start learning immediately. All materials are available 24/7."
    },
    {
      question: "What are the prerequisites for AI courses?",
      answer: "Basic programming knowledge is recommended. We offer beginner-friendly options and provide foundational courses to help you build the necessary skills."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes! Download course materials and videos for offline viewing, perfect for learning on the go without internet connectivity."
    },
    {
      question: "Do you offer one-on-one mentoring?",
      answer: "Absolutely! Personalized mentoring sessions are available with expert instructors to help accelerate your learning journey."
    },
    {
      question: "What's included in the AI Hub?",
      answer: "Access to cutting-edge AI tools, coding environments, project templates, exclusive resources, and a community of learners."
    },
    {
      question: "How often are live classes conducted?",
      answer: "Weekly sessions for most courses, with intensive bootcamps available. You can also request custom schedules for group sessions."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Yes, verified digital certificates are provided for all completed courses, which you can share on LinkedIn and with employers."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
      />
    ));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e9ecef' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: '#a5d8ff' }}></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#ffec99' }}></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: '#ffc9c9' }}></div>
          </div>
          
          <div className="w-full max-w-7xl px-4 relative z-10">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-white p-8 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Video Card */}
                <div className="order-2 lg:order-1 flex justify-center">
                  <div className="relative group w-full max-w-sm">
                    <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-25 group-hover:opacity-35 transition-opacity duration-500" style={{ backgroundColor: '#ff8787' }}></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#1e1e1e' }}>
                      <div className="aspect-[9/16] relative">
                        <video
                          ref={setVideoRef}
                          className="w-full h-full object-cover"
                          controls={false}
                          onClick={handlePlayPause}
                        >
                          <source src="public/graphics/rs.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                          onClick={handlePlayPause}
                        >
                          <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 shadow-2xl ${
                            isPlaying ? 'bg-black/60 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'
                          }`}>
                            {isPlaying ? (
                              <div className="flex gap-1.5">
                                <div className="w-1.5 h-7 rounded-full" style={{ backgroundColor: '#ff8787' }}></div>
                                <div className="w-1.5 h-7 rounded-full" style={{ backgroundColor: '#ff8787' }}></div>
                              </div>
                            ) : (
                              <Play className="w-9 h-9 ml-1" style={{ color: '#ff8787' }} fill="currentColor" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full shadow-lg mb-4" style={{ backgroundColor: '#ff8787' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                      <span className="font-bold" style={{ color: '#ff8787' }}>R</span>
                    </div>
                    <span className="text-lg font-bold text-white">DE-ECO</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                    {typedText}
                    <span className="animate-pulse" style={{ color: '#ff8787' }}>|</span>
                  </h1>

                  <div className="p-6 rounded-2xl border-4 border-white shadow-xl" style={{ backgroundColor: '#fff4e6' }}>
                    <h3 className="text-xl font-black mb-3 text-gray-900 flex items-center gap-2">
                      <Award className="w-5 h-5" style={{ color: '#ff8787' }} />
                      Your Learning Journey Starts Here
                    </h3>
                    <p className="text-gray-800 leading-relaxed">
                      Master cutting-edge technologies and AI tools with comprehensive courses, personalized mentoring, 
                      and a supportive community. Transform your career with practical, industry-relevant skills.
                      Master cutting-edge technologies and AI tools with comprehensive courses, personalized mentoring, 
                      and a supportive community. Transform your career with practical, industry-relevant skills.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-5 rounded-2xl shadow-lg border-4 border-white transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#a5d8ff' }}>
                      <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                        <Users className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="text-3xl font-black text-gray-900">10K+</div>
                      <div className="text-xs font-bold text-gray-700">Students</div>
                    </div>
                    <div className="text-center p-5 rounded-2xl shadow-lg border-4 border-white transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#ffec99' }}>
                      <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                        <Video className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="text-3xl font-black text-gray-900">50+</div>
                      <div className="text-xs font-bold text-gray-700">Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="min-h-screen flex items-center justify-center py-20 relative" style={{ backgroundColor: '#e9ecef' }}>
          <div className="w-full max-w-7xl px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full shadow-lg mb-6" style={{ backgroundColor: '#ff8787' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
                  <span className="font-bold" style={{ color: '#ff8787' }}>R</span>
                </div>
                <span className="text-lg font-bold text-white">DE-ECO</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-4 text-gray-900">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete learning ecosystem designed for your success
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white transform hover:scale-105 hover:-translate-y-2"
                  style={{ backgroundColor: service.color }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-5 text-gray-900 shadow-lg group-hover:rotate-12 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-800 leading-relaxed text-sm">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
                style={{ backgroundColor: '#ff8787', color: '#ffffff' }}
              >
                View All Services <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="min-h-screen flex items-center justify-center py-20 overflow-hidden" style={{ backgroundColor: '#e9ecef' }}>
          <div className="w-full">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#ff8787' }}>
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#1e1e1e' }}>DE-ECO</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Student Success Stories
              </h2>
              <p className="text-lg text-gray-600">Hear from our thriving community of learners</p>
            </div>
            
            <div className="space-y-6">
              {[testimonials, testimonialsRow2, testimonialsRow3].map((row, idxRow) => (
                <div key={idxRow} className="overflow-hidden">
                  <div className={`flex space-x-6 ${idxRow % 2 === 0 ? 'animate-slide' : 'animate-slide-reverse'}`}>
                    {[...row, ...row].map((testimonial, idx) => (
                      <div
                        key={idx}
                        className="w-96 flex-shrink-0 rounded-2xl p-8 shadow-xl border-2 border-white hover:shadow-2xl transition-shadow"
                        style={{ 
                          backgroundColor: idxRow === 1 ? '#ffec99' : idxRow === 2 ? '#ffc9c9' : '#ffffff'
                        }}
                      >
                        <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                        <p className="text-gray-800 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg" style={{ backgroundColor: '#ff8787' }}>
                            {testimonial.name.charAt(0)}
                          </div>
                          <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}
              >
                Join Our Community <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#e9ecef' }}>
          <div className="w-full max-w-7xl px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#ff8787' }}>
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
                  className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: '#000000ff', color: '#ffffff' }}
                >
                  Contact Support <ChevronRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Logout Button */}
        {onLogout && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={onLogout}
              className="px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#ff8787', color: '#ffffff' }}
            >
              Logout
            </button>
          </div>
        )}

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes slide-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-slide {
              animation: slide 40s linear infinite;
            }
            .animate-slide-reverse {
              animation: slide-reverse 35s linear infinite;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #ff8787;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #ff6b6b;
            }
          `
        }} />
      </div>
    </div>
  );
};