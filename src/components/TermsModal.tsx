import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, AlertTriangle, ExternalLink, Mail } from 'lucide-react';
import { DEVELOPER_NAME, DEVELOPER_EMAIL } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
          aria-labelledby="terms-dialog-title"
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
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="terms-dialog-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Terms and Conditions
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
                aria-label="Close Terms and Conditions"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  <span>1. Agreement to Terms</span>
                </h3>
                <p>
                  By accessing and browsing the personal developer portfolio of {DEVELOPER_NAME}, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of this website.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  2. Intellectual Property and Source Code
                </h3>
                <p>
                  All portfolio visual layouts, text copy, graphic assets, and portfolio code are the intellectual property of {DEVELOPER_NAME} unless otherwise noted.
                </p>
                <p>
                  Public code repositories showcased on this site are hosted on GitHub and are subject to their respective open-source or proprietary licenses specified within each repository.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>3. Acceptable Use</span>
                </h3>
                <p>
                  When interacting with this portfolio, you agree not to:
                </p>
                <ul className="list-disc list-outside pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Use the contact form or chat assistant to transmit unsolicited spam, advertising, or abusive communications.</li>
                  <li>Attempt to compromise, disrupt, probe, or overwhelm the website server infrastructure.</li>
                  <li>Misrepresent yourself as an affiliate, partner, or representative of {DEVELOPER_NAME}.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-cyan-500" />
                  <span>4. External Links and Services</span>
                </h3>
                <p>
                  This portfolio contains links to external websites, including GitHub, live project deployments, and community platforms. These external destinations are owned and operated by independent third parties. {DEVELOPER_NAME} is not responsible for the contents, availability, or policies of external websites.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  5. Disclaimer of Warranties
                </h3>
                <p>
                  This portfolio website is provided on an "as is" and "as available" basis for professional evaluation, showcase, and inquiry purposes. While every effort is made to maintain complete accuracy, no express or implied guarantees of uninterrupted operation are made.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>6. Contact Information</span>
                </h3>
                <p>
                  Questions regarding these Terms and Conditions should be directed to:
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
                Close Terms
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
