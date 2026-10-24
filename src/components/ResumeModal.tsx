import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Copy, 
  Check, 
  Printer, 
  Eye, 
  Layers, 
  AlertCircle,
  Sparkles,
  Globe,
  CheckCircle2,
  ArrowDownToLine
} from 'lucide-react';
import { 
  DEVELOPER_NAME, 
  DEVELOPER_EMAIL, 
  DEVELOPER_ROLE,
  GITHUB_USERNAME, 
  GITHUB_PROFILE_URL,
  LIVE_PORTFOLIO_URL,
  PROJECTS,
  SKILL_GROUPS,
  EDUCATION_DATA,
  RESUME_PDF_PATH,
  RESUME_FILENAME
} from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'document' | 'raw_pdf' | 'ats'>('document');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownloadResume = (e?: React.MouseEvent) => {
    if (e) {
      // Allow default or programmatic trigger
    }
    soundManager.playClick();
    setIsDownloading(true);

    try {
      const link = document.createElement('a');
      link.href = RESUME_PDF_PATH;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    }

    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const copyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyFullTextResume = () => {
    soundManager.playClick();
    const text = `${DEVELOPER_NAME}
${DEVELOPER_ROLE}
Email: ${DEVELOPER_EMAIL}
GitHub: ${GITHUB_PROFILE_URL}
Portfolio: ${LIVE_PORTFOLIO_URL}
Resume PDF: ${LIVE_PORTFOLIO_URL}resume/${RESUME_FILENAME}

EXECUTIVE SUMMARY
Full-Stack Developer and Native Android Engineer specializing in modern web applications (React, Next.js, TypeScript), native mobile development in Kotlin, and intelligent generative AI pipelines with Google AI Studio and Gemini models. Committed to clean architecture, zero-bloat performance, accessible UX/UI craft, and resilient offline capabilities.

TECHNICAL CORE PROFICIENCIES
${SKILL_GROUPS.map(g => `${g.category.toUpperCase()}: ${g.skills.map(s => s.name).join(', ')}`).join('\n')}

SELECTED PRODUCTION PROJECTS
${PROJECTS.slice(0, 6).map(p => `• ${p.displayName} (${p.category})\n  ${p.description}\n  Tech: ${p.technologies.join(', ')}\n  GitHub: ${p.githubUrl}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}`).join('\n\n')}

EXPERIENCE & ENGINEERING MILESTONES
• Full-Stack Web & Native Android Developer (2025 - Present)
  Independent Software Engineer & Product Builder
• Mobile Application Developer (2024 - 2025)
  Native Android & Algorithmic Systems Focus
• Frontend Developer (2023 - 2024)
  Modern Web Engineering & React Foundations

EDUCATION & CONTINUOUS SPECIALIZATIONS
• Core Computer Science, Algorithms & Software Architecture: Continuous Academic & Applied Engineering Studies
• Google AI Studio & Gemini API SDK Specialization: Advanced AI Systems & Applied Verification (Google Developers & DeepMind)
`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const productionProjects = [
    {
      title: 'Official Darul Ifta Irshad us Saileen & Islamic AI',
      role: 'Lead Architect & Full-Stack Developer',
      tech: ['JavaScript', 'Tailwind CSS', 'Kotlin', 'Android SDK', 'Gemini AI', 'REST APIs'],
      liveUrl: 'https://darulifta-bkfbzf6u.manus.space/',
      githubUrl: 'https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-',
      bullets: [
        'Architected high-throughput responsive web platform and native Android mobile apps serving community religious consultation and fatwa archives.',
        'Engineered offline-first local caching in Kotlin to ensure reliable, uninterrupted guidance access in remote low-connectivity regions.',
        'Integrated Google Gemini AI intelligence pipeline for cited theology research grounded in authoritative archives.'
      ]
    },
    {
      title: 'CortexIQ AI Suite & AI Prompt Studio',
      role: 'Creator & Full-Stack Engineer',
      tech: ['TypeScript', 'React 19', 'Google Gemini SDK', 'Node.js', 'Express', 'Vite', 'Motion'],
      liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
      githubUrl: 'https://github.com/DotDaniyal/cortexiq-by-dnyl',
      bullets: [
        'Built full-stack computational intelligence dashboard pairing natural language queries with real-time reactive telemetry and token streaming.',
        'Implemented secure server-side Node.js proxy routes to isolate sensitive model credentials from client-side runtime environments.',
        'Achieved sub-100ms UI responsiveness while rendering live asynchronous token streams and analytical metrics.'
      ]
    },
    {
      title: 'Hamara Weather: Real-Time Meteorological Tracking',
      role: 'Frontend Engineer',
      tech: ['JavaScript (ES6+)', 'OpenWeather API', 'HTML5', 'CSS3', 'Vercel'],
      liveUrl: 'https://hamara-weather.vercel.app/',
      githubUrl: 'https://github.com/DotDaniyal/Hamara-Weather',
      bullets: [
        'Developed ad-free live atmospheric conditions tracking dashboard with precision humidity, wind speed, and meteorological telemetry.',
        'Designed lightweight asynchronous pipeline with defensive error handling for edge cases and location network interruptions.'
      ]
    },
    {
      title: 'Mystic Match: Algorithmic Mobile & Web Puzzle Game',
      role: 'Game & Mobile Engineer',
      tech: ['Kotlin', 'Android Canvas', '2D Matrix Algorithms', 'State Machines'],
      liveUrl: 'https://mystic-match-rho.vercel.app/',
      githubUrl: 'https://github.com/DotDaniyal/mystic-match-by-dnyl',
      bullets: [
        'Engineered bespoke match-3 algorithmic engine in Kotlin with cascading matrix replenishment and fluid touch ergonomics.',
        'Implemented deterministic state machines to eliminate infinite cascade loops and memory leaks on mobile viewports.'
      ]
    },
    {
      title: 'Faryal FC Digital Headquarters & DNYL Eyewear Showcase',
      role: 'Product & UI/UX Developer',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Responsive Design'],
      liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
      githubUrl: 'https://github.com/DotDaniyal',
      bullets: [
        'Crafted modern athletic sports platform with interactive rosters, matchday fixture schedules, and responsive fan drawer.',
        'Created luxury digital boutique showroom featuring 60 FPS motion transitions, fluid typography, and sub-second asset rendering.'
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md print:hidden"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[94vh] max-h-[960px] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden z-10 print:max-h-none print:h-auto print:shadow-none print:border-none print:m-0 print:bg-white"
          >
            {/* Top Control Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3 border-b border-slate-800 bg-[#0f121d] shrink-0 z-20 print:hidden gap-2">
              
              {/* Left Zone: Title & View Switcher */}
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block">
                    <h2 id="resume-dialog-title" className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                      {DEVELOPER_NAME} | Curriculum Vitae
                    </h2>
                    <span className="text-[10px] font-mono text-cyan-400 block">
                      Executive Portfolio Edition
                    </span>
                  </div>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('document');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      viewMode === 'document'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Resume View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('ats');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      viewMode === 'ats'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ATS Plain
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('raw_pdf');
                    }}
                    className={`hidden md:inline-flex px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      viewMode === 'raw_pdf'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PDF Embed
                  </button>
                </div>
              </div>

              {/* Right Zone: Primary Download Resume CTA + Tools */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                
                {/* Direct Open in New Tab Button */}
                <a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="hidden sm:inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-500/60 bg-slate-800/90 text-slate-200 text-xs font-medium transition-all shadow-xs active:scale-[0.98]"
                  title="Open original vector PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open Tab</span>
                </a>

                {/* Primary 'Download Resume' CTA Button (Prominent) */}
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  onClick={handleDownloadResume}
                  className="min-h-[36px] inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
                  title="Download Daniyal Hayat Official Resume PDF directly"
                  aria-label="Download Daniyal Hayat Resume PDF"
                >
                  <ArrowDownToLine className={`w-4 h-4 ${isDownloading ? 'animate-bounce text-slate-950' : ''}`} />
                  <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
                </a>

                {/* Copy Plain Text */}
                <button
                  type="button"
                  onClick={copyFullTextResume}
                  className="hidden lg:inline-flex min-h-[36px] items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 text-xs font-medium transition-all shadow-xs cursor-pointer"
                  title="Copy ATS formatted text to clipboard"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedText ? 'Copied' : 'Copy'}</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close resume viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto relative bg-[#07090e] p-3 sm:p-6 lg:p-8 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible">
              
              {/* VIEW 1: Aesthetic Executive Paper Document (Guaranteed 100% Rendering Everywhere) */}
              {viewMode === 'document' && (
                <div className="w-full max-w-3xl space-y-4">
                  
                  {/* Primary Download Resume Call-to-Action Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                    <div className="flex items-center gap-3.5 min-w-0 text-center sm:text-left">
                      <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                            Daniyal Hayat | Executive Resume
                          </h3>
                          <span className="hidden xs:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                            Vector PDF
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Polished, ATS-optimized 1-page curriculum vitae ready for hiring teams.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
                      <a
                        href={RESUME_PDF_PATH}
                        download={RESUME_FILENAME}
                        onClick={handleDownloadResume}
                        className="min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Resume PDF</span>
                      </a>
                    </div>
                  </div>

                  {/* Document Page Canvas */}
                  <div 
                    id="printable-resume-content"
                    className="w-full bg-white text-slate-900 rounded-xl shadow-2xl p-6 sm:p-10 md:p-12 space-y-6 sm:space-y-8 font-sans border border-slate-200 select-text print:shadow-none print:border-none print:p-0 print:rounded-none"
                  >
                    {/* Document Header */}
                    <div className="border-b border-slate-200 pb-5 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase font-sans">
                          {DEVELOPER_NAME}
                        </h1>
                        <span className="text-xs sm:text-sm font-mono font-bold text-sky-700 uppercase tracking-wide">
                          {DEVELOPER_ROLE}
                        </span>
                      </div>

                      {/* Contact & Active Links Row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 font-mono pt-1">
                        <a 
                          href={`mailto:${DEVELOPER_EMAIL}`} 
                          className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Mail className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>{DEVELOPER_EMAIL}</span>
                        </a>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <a 
                          href={GITHUB_PROFILE_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Github className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>github.com/{GITHUB_USERNAME}</span>
                        </a>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <a 
                          href={LIVE_PORTFOLIO_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Globe className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>Live Portfolio</span>
                        </a>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="text-slate-500">Available Globally / Remote</span>
                      </div>
                    </div>

                    {/* Section 1: Executive Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <h2 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase">
                          Executive Summary
                        </h2>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                        Full-Stack Developer and Native Android Engineer specializing in architecting modern, high-throughput web applications (React 19, Next.js, TypeScript), cross-platform mobile solutions in Kotlin, and intelligent generative AI systems with Google AI Studio and Gemini models. Dedicated to clean modular architecture, zero-bloat performance, accessible UX craft, and resilient offline capabilities.
                      </p>
                    </div>

                    {/* Section 2: Technical Core Proficiencies */}
                    <div className="space-y-2.5">
                      <div className="border-b border-slate-200 pb-1">
                        <h2 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase">
                          Technical Core Proficiencies
                        </h2>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div>
                          <strong className="text-slate-950 font-semibold">• Languages &amp; Runtimes: </strong>
                          <span>TypeScript, JavaScript (ES6+), Kotlin, Node.js, SQL, HTML5, CSS3</span>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-semibold">• Frontend &amp; UI Craft: </strong>
                          <span>React 19, Next.js, Tailwind CSS v4, Motion (Framer), Vite, Responsive UI, Component Systems</span>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-semibold">• Mobile &amp; Storage: </strong>
                          <span>Native Android SDK, Room/SQLite, Offline Caching, RESTful APIs, JSON Data Handling</span>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-semibold">• AI Engineering &amp; Cloud: </strong>
                          <span>Google AI Studio, Gemini API SDK (@google/genai), Prompt Architecture, Multimodal Grounding, Vercel</span>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-semibold">• Tooling &amp; DevOps: </strong>
                          <span>Git &amp; GitHub, Linux/Bash, Figma, Lighthouse Optimization, PWA Standards</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Selected Production Projects */}
                    <div className="space-y-3">
                      <div className="border-b border-slate-200 pb-1">
                        <h2 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase">
                          Selected Production Projects &amp; Open Source
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {productionProjects.map((p, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                              <h3 className="text-xs sm:text-[13px] font-bold text-slate-950">
                                {p.title} <span className="font-normal text-slate-500">| {p.role}</span>
                              </h3>
                              <div className="text-[11px] font-mono text-slate-600 flex items-center gap-2">
                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline font-semibold">Live Demo ↗</a>
                                <span>|</span>
                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline font-semibold">GitHub ↗</a>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                              <span className="font-semibold text-slate-500 mr-1">Stack:</span>
                              {p.tech.map((t, tIdx) => (
                                <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {t}
                                </span>
                              ))}
                            </div>

                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                              {p.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="leading-relaxed">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Experience & Engineering Milestones */}
                    <div className="space-y-2.5">
                      <div className="border-b border-slate-200 pb-1">
                        <h2 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase">
                          Experience &amp; Engineering Milestones
                        </h2>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline font-semibold text-slate-950">
                            <span>Full-Stack Web &amp; Native Android Developer: Independent Software Engineer</span>
                            <span className="font-mono text-slate-500 text-[11px]">2025 - Present</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            Architecting end-to-end production web platforms and native mobile apps with strict emphasis on performance, type safety, accessibility, and modern UI craft.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline font-semibold text-slate-950">
                            <span>Mobile Application Developer: Native Android &amp; Algorithmic Systems Focus</span>
                            <span className="font-mono text-slate-500 text-[11px]">2024 - 2025</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            Mastered Kotlin Android architecture, Room database, offline synchronization routines, and touch-optimized canvas engines.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline font-semibold text-slate-950">
                            <span>Frontend Developer: Modern Web Engineering &amp; React Foundations</span>
                            <span className="font-mono text-slate-500 text-[11px]">2023 - 2024</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            Built responsive web platforms, async RESTful API integrations, and component-driven design systems with strict Git version control.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: Education & Specializations */}
                    <div className="space-y-2.5">
                      <div className="border-b border-slate-200 pb-1">
                        <h2 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase">
                          Education &amp; Continuous Specializations
                        </h2>
                      </div>

                      <div className="space-y-2 text-xs text-slate-700">
                        <div>
                          <strong className="text-slate-950 font-semibold">• Core Computer Science, Algorithms &amp; Software Architecture</strong>
                          <span className="text-slate-500 font-mono text-[11px]"> (Continuous Academic Studies)</span>
                          <p className="text-slate-600 mt-0.5">Data Structures, Algorithm Complexity, OOP in Kotlin/TypeScript, System Design, and Caching.</p>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-semibold">• Google AI Studio &amp; Gemini API SDK Specialization</strong>
                          <span className="text-slate-500 font-mono text-[11px]"> (Applied Verification, Google Developers &amp; DeepMind)</span>
                          <p className="text-slate-600 mt-0.5">System instructions, structured JSON schemas, multimodal prompting, function calling, and server-side SDK proxying.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* VIEW 2: Raw PDF Embed (For browsers that support embedded native plugins) */}
              {viewMode === 'raw_pdf' && (
                <div className="w-full h-full flex flex-col items-center justify-center min-h-[600px] relative">
                  {!pdfLoadError ? (
                    <object
                      data={`${RESUME_PDF_PATH}#toolbar=0&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full min-h-[700px] rounded-xl border border-slate-800"
                      title="Daniyal Hayat PDF Document"
                      onError={() => setPdfLoadError(true)}
                    >
                      <iframe
                        src={`${RESUME_PDF_PATH}#toolbar=0&navpanes=0`}
                        className="w-full h-full min-h-[700px] rounded-xl border border-slate-800"
                        title="Daniyal Hayat PDF Iframe"
                      />
                    </object>
                  ) : (
                    <div className="p-8 text-center space-y-4 max-w-md bg-slate-900 rounded-2xl border border-slate-800">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="text-white font-bold">Embedded Viewer Blocked by Browser</h3>
                      <p className="text-xs text-slate-400">Your browser security settings prevent displaying embedded PDFs inside iframes. Switch to &quot;Resume View&quot; or open the PDF directly.</p>
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => setViewMode('document')} className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">Switch to Resume View</button>
                        <a href={RESUME_PDF_PATH} download={RESUME_FILENAME} onClick={handleDownloadResume} className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">Download Resume</a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 3: ATS Plain-Text Reader */}
              {viewMode === 'ats' && (
                <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 font-mono text-xs text-slate-300 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-cyan-400 font-bold text-sm">ATS PLAIN TEXT PARSER VIEW</span>
                    <button
                      type="button"
                      onClick={copyFullTextResume}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText ? 'Copied' : 'Copy All Text'}</span>
                    </button>
                  </div>

                  <pre className="whitespace-pre-wrap leading-relaxed font-mono text-xs text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-slate-800/80">
{`${DEVELOPER_NAME}
${DEVELOPER_ROLE}
Email: ${DEVELOPER_EMAIL}
GitHub: ${GITHUB_PROFILE_URL}
Portfolio: ${LIVE_PORTFOLIO_URL}

============================================================
EXECUTIVE SUMMARY
============================================================
Full-Stack Developer and Native Android Engineer specializing in modern web applications (React, Next.js, TypeScript), native mobile development in Kotlin, and intelligent generative AI pipelines with Google AI Studio and Gemini models. Committed to clean architecture, zero-bloat performance, accessible UX/UI craft, and resilient offline capabilities.

============================================================
TECHNICAL CORE PROFICIENCIES
============================================================
• Languages & Runtimes: TypeScript, JavaScript (ES6+), Kotlin, Node.js, SQL, HTML5, CSS3
• Frontend & UI Craft: React 19, Next.js, Tailwind CSS v4, Motion (Framer), Vite, Responsive Design
• Mobile & Storage: Native Android SDK, Room/SQLite, Offline Caching, RESTful APIs, JSON Data Handling
• AI Engineering & Cloud: Google AI Studio, Google Gemini SDK (@google/genai), Prompt Architecture, Multimodal Grounding, Vercel
• Tooling & DevOps: Git, GitHub, Linux/Bash, Figma, Lighthouse Optimization, PWA Standards

============================================================
SELECTED PRODUCTION PROJECTS & OPEN SOURCE
============================================================
• Official Darul Ifta Irshad us Saileen & Islamic AI (Web Platform & Android App)
  Tech: JavaScript, Tailwind CSS, Kotlin, Android SDK, Gemini AI, REST APIs
  Live: https://darulifta-bkfbzf6u.manus.space/
  GitHub: https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-

• CortexIQ AI Suite & AI Prompt Studio (Computational Intelligence)
  Tech: TypeScript, React 19, Google Gemini SDK, Node.js, Express, Vite, Motion
  Live: https://daniyal-hayat-portfolio.vercel.app/
  GitHub: https://github.com/DotDaniyal/cortexiq-by-dnyl

• Hamara Weather (Real-Time Meteorological Tracking)
  Tech: JavaScript (ES6+), OpenWeather API, Modern Flex/Grid, Vercel
  Live: https://hamara-weather.vercel.app/
  GitHub: https://github.com/DotDaniyal/Hamara-Weather

• Mystic Match (Algorithmic Mobile & Web Puzzle Game)
  Tech: Kotlin, Android Canvas, 2D Matrix Algorithms, State Machines
  Live: https://mystic-match-rho.vercel.app/
  GitHub: https://github.com/DotDaniyal/mystic-match-by-dnyl

• Faryal FC Digital Headquarters & DNYL Eyewear Showcase
  Tech: React, TypeScript, Tailwind CSS, Motion, Responsive Design
  Live: https://daniyal-hayat-portfolio.vercel.app/
  GitHub: https://github.com/DotDaniyal

============================================================
EXPERIENCE & ENGINEERING MILESTONES
============================================================
• Full-Stack Web & Native Android Developer: Independent Software Engineer (2025 - Present)
• Mobile Application Developer: Native Android & Algorithmic Systems Focus (2024 - 2025)
• Frontend Developer: Modern Web Engineering & React Foundations (2023 - 2024)

============================================================
EDUCATION & CONTINUOUS SPECIALIZATIONS
============================================================
• Core Computer Science, Algorithms & Software Architecture: Applied Engineering Studies
• Google AI Studio & Gemini API SDK Specialization: Applied Verification (Google Developers & DeepMind)`}
                  </pre>
                </div>
              )}

            </div>

            {/* Bottom Footer Bar */}
            <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-t border-slate-800 bg-[#0f121d] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 text-center sm:text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Verified Asset: /resume/{RESUME_FILENAME}</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-xs font-medium transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  title="Print or Save via Browser Print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>

                {/* Primary Bottom CTA */}
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  onClick={handleDownloadResume}
                  className="min-h-[38px] px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                  aria-label="Download Daniyal Hayat Resume PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
