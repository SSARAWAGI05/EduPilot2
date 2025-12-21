import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';
import { supabase } from '../../supabaseClient';

export const ContactPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);


  // Get user ID if logged in
  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Pre-fill email if user is logged in
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, first_name, last_name, phone')
          .eq('id', user.id)
          .single();

        if (profile) {
          setFormData(prev => ({
            ...prev,
            email: profile.email || prev.email,
            name: profile.first_name && profile.last_name 
              ? `${profile.first_name} ${profile.last_name}` 
              : prev.name,
            phone: profile.phone || prev.phone
          }));
        }
      }
    };

    getUserId();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Insert contact message into database
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            user_id: userId, // Will be null if user is not logged in
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ])
        .select();

      if (error) throw error;

      // Success!
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: themeColors.accent.green }}>
                    <CheckCircle className="w-6 h-6 text-green-800" />
                    <div>
                      <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: themeColors.accent.red }}>
                    <p className="text-red-800">{submitError}</p>
                  </div>
                )}

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
                      disabled={isSubmitting}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
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
                      disabled={isSubmitting}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
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
                      htmlFor="phone"
                      className="block font-semibold mb-2 text-sm sm:text-base"
                      style={{ color: themeColors.text.secondary }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                      style={{
                        backgroundColor: themeColors.background.white,
                        borderColor: themeColors.primary.lightGray,
                        color: themeColors.text.primary
                      }}
                      placeholder="Enter your phone number"
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
                      disabled={isSubmitting}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
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
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors resize-vertical text-sm sm:text-base disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                    style={{
                      backgroundColor: themeColors.primary.w2,
                      color: themeColors.primary.w
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
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
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>sarawagirishika748@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.green }}>
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.red }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Phone</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>+91 9903996663</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.purple }}>
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.pink }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Address</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>6/1A Moira Street</p>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}></p>
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
    </div>
  );
};