import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Copy, 
  Check, 
  MessageSquare,
  Clock,
  Sparkles,
  RefreshCw,
  User,
  AtSign,
  Tag
} from 'lucide-react';
import { DEVELOPER_EMAIL, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { ContactFormState } from '../types';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateField = (fieldName: keyof ContactFormState, value: string): string | undefined => {
    const trimmed = (value || '').trim();

    if (fieldName === 'name') {
      if (!trimmed) return 'Name cannot be empty.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      if (trimmed.length > 100) return 'Name cannot exceed 100 characters.';
    }

    if (fieldName === 'email') {
      if (!trimmed) return 'Email cannot be empty.';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
      if (trimmed.length > 150) return 'Email cannot exceed 150 characters.';
    }

    if (fieldName === 'subject') {
      if (!trimmed) return 'Subject cannot be empty.';
      if (trimmed.length < 2) return 'Subject must be at least 2 characters.';
      if (trimmed.length > 200) return 'Subject cannot exceed 200 characters.';
    }

    if (fieldName === 'message') {
      if (!trimmed) return 'Message cannot be empty.';
      if (trimmed.length < 10) return 'Message must be at least 10 characters.';
      if (trimmed.length > 5000) return 'Message cannot exceed 5000 characters.';
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const subjectErr = validateField('subject', formData.subject);
    if (subjectErr) newErrors.subject = subjectErr;

    const messageErr = validateField('message', formData.message);
    if (messageErr) newErrors.message = messageErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof ContactFormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field] || '');
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (status === 'error') {
      setStatus('idle');
      setServerErrorMessage('');
    }
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    // Mark all fields as touched for inline validation feedback
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Run full validation
    const isValid = validateForm();
    if (!isValid) {
      soundManager.playError();
      setStatus('error');
      setServerErrorMessage('Please correct the highlighted fields before submitting.');
      
      // Auto-focus first invalid field
      const firstErrorKey = Object.keys(errors)[0] || 'name';
      const el = document.getElementById(`contact-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setStatus('loading');
    setServerErrorMessage('');

    try {
      // Send real API request to server endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot || '',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        soundManager.playSuccess();
        setStatus('success');
        // Reset form on verified success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
        setTouched({});
      } else {
        soundManager.playError();
        setStatus('error');
        setServerErrorMessage(data.error || 'Your message could not be sent. Please try again.');
        // Note: formData is PRESERVED so user doesn't re-type
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      soundManager.playError();
      setStatus('error');
      setServerErrorMessage('Your message could not be sent. Please try again.');
      // Note: formData is PRESERVED
    }
  };

  const handleResetForm = () => {
    soundManager.playClick();
    setStatus('idle');
    setServerErrorMessage('');
    setErrors({});
    setTouched({});
  };

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-28 relative border-t dark:border-slate-800/80 border-slate-200 bg-transparent dark:bg-slate-900/40 backdrop-blur-[2px]">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              {t.contact.badge}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Initiate Transmission
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111422] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Direct Inbox
                </span>
                <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 gap-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                    <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="truncate">{DEVELOPER_EMAIL}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer shrink-0 border select-none ${
                      copied
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-200/70 hover:bg-cyan-500/10 border-slate-300/80 dark:bg-slate-800 dark:hover:bg-cyan-500/10 dark:border-slate-700 hover:border-cyan-500/30 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400'
                    }`}
                    title={copied ? "Email copied!" : "Copy email address to clipboard"}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${DEVELOPER_EMAIL}?subject=Portfolio%20Inquiry%20for%20Daniyal%20Hayat`}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-all text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Open in Default Mail App</span>
                </a>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Response Time</strong>
                    Typically responds within 24 hours on business days.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Project Scope</strong>
                    Open for modern web platforms, native Android apps, and intelligent AI integrations.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111422] border border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* SUCCESS STATE */
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 sm:py-10 text-center space-y-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Message sent successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Your message has been delivered. Thanks for reaching out.
                    </p>
                  </div>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* FORM VIEW */
                <form 
                  key="contact-form-view"
                  id="contact-form" 
                  onSubmit={handleSubmit} 
                  noValidate
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Global Error Banner */}
                  {status === 'error' && (
                    <div 
                      className="p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-700 dark:text-red-400 text-xs font-mono"
                      role="alert"
                      aria-live="assertive"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                      <div className="space-y-0.5">
                        <strong className="block font-bold">Something went wrong</strong>
                        <p>{serverErrorMessage || 'Your message could not be sent. Please try again.'}</p>
                      </div>
                    </div>
                  )}

                  {/* Honeypot Spam Field (Hidden from real visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                    />
                  </div>

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="contact-name" 
                        className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between"
                      >
                        <span>Full Name <span className="text-cyan-500" aria-hidden="true">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          disabled={status === 'loading'}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="e.g. Alex Chen"
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`w-full min-h-[44px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                            errors.name 
                              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p id="name-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="contact-email" 
                        className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between"
                      >
                        <span>Email Address <span className="text-cyan-500" aria-hidden="true">*</span></span>
                      </label>
                      <div className="relative">
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          disabled={status === 'loading'}
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="e.g. alex@company.com"
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full min-h-[44px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                            errors.email 
                              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-subject" 
                      className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between"
                    >
                      <span>Subject <span className="text-cyan-500" aria-hidden="true">*</span></span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        disabled={status === 'loading'}
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        placeholder="e.g. Web Platform &amp; Android App Collaboration"
                        aria-invalid={errors.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`w-full min-h-[44px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                          errors.subject 
                            ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.subject && (
                      <p id="subject-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 3: Message Details */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-message" 
                      className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between"
                    >
                      <span>Message <span className="text-cyan-500" aria-hidden="true">*</span></span>
                      <span className="text-[10px] font-normal text-slate-400">
                        {formData.message.length}/5000
                      </span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        maxLength={5000}
                        disabled={status === 'loading'}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Describe your project, timeline, engineering requirements, or opportunity..."
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                          errors.message 
                            ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-[11px] font-mono text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
