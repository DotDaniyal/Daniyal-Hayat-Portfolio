import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, Server, Mail } from 'lucide-react';
import { DEVELOPER_NAME, DEVELOPER_EMAIL } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundManager.playClick();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="privacy-dialog-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Privacy Policy
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Last updated: October 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-500" />
                  <span>1. Overview and Scope</span>
                </h3>
                <p>
                  This personal developer portfolio is maintained by {DEVELOPER_NAME}. This policy details how information is handled when you visit this website, submit an inquiry through the contact form, or communicate with the portfolio assistant.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-500" />
                  <span>2. Information Collected</span>
                </h3>
                <p>
                  This website does not utilize commercial marketing cookies, advertising trackers, or fingerprinting scripts. The only information processed includes:
                </p>
                <ul className="list-disc list-outside pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Contact Submissions:</strong> When you voluntarily submit a message through the contact form, your name, email address, subject line, and message are forwarded directly to {DEVELOPER_NAME} to reply to your inquiry.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Chat Conversations:</strong> Messages sent to the Dnyl AI assistant are processed securely on the server to generate relevant portfolio answers. Sessions are cached locally in your browser storage so you can review recent conversation history.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Basic Server Logs:</strong> Standard request metadata (IP address and timestamp) is temporarily retained solely for rate limiting, DDoS mitigation, and spam prevention.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-500" />
                  <span>3. Third-Party Services</span>
                </h3>
                <p>
                  The portfolio connects to select verified services to function:
                </p>
                <ul className="list-disc list-outside pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>
                    <strong className="text-slate-900 dark:text-white">GitHub API:</strong> Public repository counts and commit status are fetched directly from GitHub's official public API to display verified software repositories.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Hosting and Edge Delivery:</strong> The site is hosted on Vercel and Google Cloud infrastructure, complying with standard cloud security and data handling protocols.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">AI Inference:</strong> Queries to Dnyl AI are processed through server-side proxy routes using Google AI Gemini models. API keys are kept strictly on the backend.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  4. Data Retention and User Rights
                </h3>
                <p>
                  Inquiry emails are retained only for normal professional communication. You may request the review, update, or deletion of any correspondence sent to this portfolio at any time by sending an email.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>5. Contact for Privacy Matters</span>
                </h3>
                <p>
                  For any privacy inquiries or data requests, contact {DEVELOPER_NAME} directly at:
                </p>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-cyan-600 dark:text-cyan-400">
                  <a href={`mailto:${DEVELOPER_EMAIL}`} className="hover:underline">
                    {DEVELOPER_EMAIL}
                  </a>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
