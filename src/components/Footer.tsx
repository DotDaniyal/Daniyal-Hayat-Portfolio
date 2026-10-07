import { useState, useEffect } from 'react';
import { DEVELOPER_NAME, DEVELOPER_ROLE, DEVELOPER_EMAIL, GITHUB_PROFILE_URL, LIVE_DEPLOYMENTS, RESUME_PDF_PATH, RESUME_FILENAME } from '../data/portfolioData';
import { Github, ExternalLink, ArrowUp, Clock, Globe, Mail, FileText, Download } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenResume?: () => void;
}

export function Footer({ onOpenResume }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 md:py-20 bg-slate-100 dark:bg-[#06070a] border-t border-slate-200/90 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-xs font-mono relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Status & Local Time Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-900">
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-medium tracking-wider uppercase text-[11px]">
                Available For Work
              </span>
            </div>

            {/* Live Local Clock */}
            <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>LOCAL TIME: <strong className="text-slate-900 dark:text-slate-200 font-semibold">{timeString || 'SYNCING...'}</strong></span>
            </div>
          </div>

          {/* Scroll to Top */}
          <MagneticButton
            onClick={scrollToTop}
            dataCursor="pointer"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
            title="Return to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </MagneticButton>

        </div>

        {/* Giant Typographic Editorial Signoff */}
        <div className="select-none py-4 sm:py-6">
          <h2 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-slate-300/60 dark:text-slate-800/40 hover:text-slate-400 dark:hover:text-slate-700/60 transition-colors uppercase leading-none break-words">
            {DEVELOPER_NAME}
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 sm:pt-4 text-xs font-mono text-slate-500">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">BUILD</span> • <span>CREATE</span> • <span>EXPLORE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ENGINEERED FOR PRODUCTION SPEED &amp; RIGOR</span>
          </div>
        </div>

        {/* Live Deployments Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
            <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Direct Deployments:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <a
                key={idx}
                href={deploy.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="min-h-[40px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200/90 dark:border-transparent text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-xs shadow-xs"
              >
                <span>{deploy.title}</span>
                <ExternalLink className="w-3 h-3 text-cyan-500/70" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-500 pt-6 border-t border-slate-200 dark:border-slate-900/60 text-[11px]">
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-300">{DEVELOPER_NAME}</span> — <span className="text-slate-500 dark:text-slate-400">{DEVELOPER_ROLE}</span>
            <div className="text-slate-500 text-[10px] mt-0.5">
              © {currentYear} {DEVELOPER_NAME}. {t.footer.rights}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${DEVELOPER_EMAIL}`}
              className="min-h-[44px] inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{DEVELOPER_EMAIL}</span>
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              className="min-h-[44px] inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            {onOpenResume ? (
              <button
                type="button"
                onClick={onOpenResume}
                aria-label="View Daniyal Hayat Resume PDF"
                className="min-h-[44px] inline-flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>Resume / CV</span>
              </button>
            ) : (
              <a
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Daniyal Hayat Resume PDF"
                className="min-h-[44px] inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>Resume PDF</span>
              </a>
            )}
            <a href="#projects" className="min-h-[44px] inline-flex items-center hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#creative-lab" className="min-h-[44px] inline-flex items-center hover:text-cyan-400 transition-colors">
              Creative Lab
            </a>
            <a href="#contact" className="min-h-[44px] inline-flex items-center hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
