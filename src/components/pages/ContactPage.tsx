import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, X } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { getThemeColors } from "../../styles/colors";
import { supabase } from "../../lib/supabaseClient";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website?: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactPage(): JSX.Element {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const successTimeoutRef = useRef<number | null>(null);

  // Helpers: validation
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v: string) => /^\+?[0-9\s-]{7,15}$/.test(v);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    if (name === "website") return undefined; // honeypot
    if (!value.trim()) return "This field is required.";
    if (name === "email" && !isValidEmail(value)) return "Enter a valid email address.";
    if (name === "phone" && !isValidPhone(value)) return "Enter a valid phone number.";
    if (name === "message" && value.trim().length < 10) return "Message must be at least 10 characters.";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((k) => {
      const err = validateField(k, formData[k] ?? "");
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prefill user info when logged in
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const user = (userData as any)?.user;
        if (!mounted || !user) return;
        setUserId(user.id);

        const { data, error } = await supabase
          .from("profiles")
          .select("email, first_name, last_name, phone")
          .eq("id", user.id)
          .single();

        if (error) {
          // silently ignore — profile might not exist
          console.debug("No profile found or error fetching profile", error);
          return;
        }

        if (data) {
          setFormData((prev) => ({
            ...prev,
            email: data.email ?? prev.email,
            name: data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : prev.name,
            phone: data.phone ?? prev.phone,
          }));
        }
      } catch (err) {
        console.error("Error pre-filling profile:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      // clear any outstanding timeouts on unmount
      if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // live-validate the field
    setErrors((prev) => {
      const copy = { ...prev } as FormErrors;
      const fieldErr = validateField(name as keyof FormData, value);
      if (fieldErr) copy[name as keyof FormData] = fieldErr;
      else delete copy[name as keyof FormData];
      return copy;
    });

    // clear global submit error if user edits
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const err = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, ...(err ? { [name]: err } : {}) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check to reduce spam
    if (formData.website && formData.website.trim() !== "") {
      console.warn("Bot detected via honeypot");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        user_id: userId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        status: "new",
      };

      const { data, error } = await supabase.from("contact_messages").insert([payload]).select();
      if (error) throw error;

      setSubmitSuccess(true);
      setFormData(initialForm);

      // auto-hide success
      successTimeoutRef.current = window.setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setSubmitError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.subject && formData.message;

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
                  <div role="status" aria-live="polite" className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: themeColors.accent.green }}>
                    <CheckCircle className="w-6 h-6 text-green-800" />
                    <div>
                      <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you soon.</p>
                    </div>
                    <button aria-label="dismiss" onClick={() => setSubmitSuccess(false)} className="ml-auto">
                      <X />
                    </button>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div role="alert" className="mb-6 p-4 rounded-xl" style={{ backgroundColor: themeColors.accent.red }}>
                    <p className="text-red-800">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                      style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.lightGray, color: themeColors.text.primary }}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-sm text-red-700">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                      style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.lightGray, color: themeColors.text.primary }}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-700">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                      style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.lightGray, color: themeColors.text.primary }}
                      placeholder="Enter your phone number (with country code)"
                    />
                    {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-700">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                      style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.lightGray, color: themeColors.text.primary }}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-700">{errors.subject}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block font-semibold mb-2 text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={isSubmitting}
                      rows={6}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors resize-y text-sm sm:text-base disabled:opacity-50"
                      style={{ backgroundColor: themeColors.background.white, borderColor: themeColors.primary.lightGray, color: themeColors.text.primary }}
                      placeholder="Tell us more about how we can help you..."
                    />
                    {errors.message && <p id="message-error" className="mt-1 text-sm text-red-700">{errors.message}</p>}
                  </div>

                  {/* Honeypot field (hidden from real users) */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" value={formData.website} onChange={handleInputChange} />
                  </div>

                  <div className="md:col-span-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="py-3 sm:py-4 px-6 sm:px-10 rounded-xl font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                      style={{ backgroundColor: themeColors.primary.w2, color: themeColors.primary.w }}
                      aria-disabled={isSubmitting || !isFormValid}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: themeColors.text.primary }}>
                    Get In Touch
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: themeColors.text.secondary }}>
                    Ready to start your learning journey with us? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.blueLight }}>
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.blue }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Email</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                        <a href="mailto:deecobyrishika@gmail.com" className="underline">deecobyrishika@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.green }}>
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.pink }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Phone</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                        <a href="tel:+919903996663" className="underline">+91 9903996663</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: themeColors.accent.purple }}>
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: themeColors.accent.pink }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: themeColors.text.primary }}>Address</h4>
                      <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>6/1A Moira Street</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: themeColors.primary.lightGray }}>
                  <p className="text-sm sm:text-base" style={{ color: themeColors.text.secondary }}>
                    Follow us:
                  </p>
                  <div className="flex gap-3 mt-3">
                    {/* WhatsApp */}
                    <a
                      aria-label="WhatsApp Community"
                      href="https://chat.whatsapp.com/FzCODHVaAnFEoYgKjMEgM7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-md transition hover:scale-110 hover:opacity-90"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <i className="fa-brands fa-whatsapp text-base" />
                    </a>

                    {/* Instagram */}
                    <a
                      aria-label="Instagram"
                      href="https://www.instagram.com/deeco.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-md transition hover:scale-110 hover:opacity-90"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <i className="fa-brands fa-instagram text-base" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      aria-label="LinkedIn"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-md transition hover:scale-110 hover:opacity-90"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <i className="fa-brands fa-linkedin-in text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
