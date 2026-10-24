import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Wrench, 
  Cpu, 
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project && isOpen !== false) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, isOpen, onClose]);

  const activeProjectRef = useRef<Project | null>(project);
  if (project) {
    activeProjectRef.current = project;
  }
  const displayProject = project || activeProjectRef.current;

  const caseStudy = displayProject?.caseStudy || {
    overview: displayProject?.description || '',
    problem: "Bridging real-time user needs with responsive, accessible software architectures.",
    idea: `Develop ${displayProject?.displayName || 'Project'} with modern development frameworks and structured design patterns.`,
    design: "High-contrast typographic hierarchy, tactile feedback, and intuitive navigation.",
    development: `Built using ${displayProject?.technologies?.join(', ') || ''} with strict attention to modular component structures.`,
    technology: displayProject?.technologies?.join(', ') || '',
    challenges: "Ensuring zero layout shifts and high-speed data handling across all viewports.",
    solution: "Leveraged optimized asset loading and defensive exception handling routines.",
    screenshots: "",
    liveDemo: displayProject?.liveUrl || "",
    github: displayProject?.githubUrl || "",
    lessonsLearned: "",
    result: "Deployed and verified live, delivering responsive functionality and clean user interactions."
  } as any;

  return (
    <AnimatePresence>
      {isOpen && displayProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
          >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {displayProject.category}
              </span>
              {displayProject.liveUrl && (
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-live-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-live-pulse" />
                  </span>
                  <span>Live App</span>
                </span>
              )}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-500" />
                <span>{displayProject.readingTime || '2 min read'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 text-slate-700 dark:text-slate-300">
            {/* Title & Introduction */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {displayProject.displayName}
              </h2>
              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {displayProject.description}
              </p>
            </div>

            {/* Quick Metrics Bar if available */}
            {displayProject.metrics && displayProject.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
                {displayProject.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Structured Case Study Sections */}
            <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* 01. Overview */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  <span>01. Project Overview</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {caseStudy.overview}
                </p>
              </div>

              {/* 02. Problem */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>02. The Problem</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {caseStudy.problem}
                </p>
              </div>

              {/* 03. Idea & Architecture */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>03. Idea & Core Architecture</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {caseStudy.idea}
                </p>
              </div>

              {/* 04. Design & UI Philosophy */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>04. Design & UI Philosophy</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {caseStudy.design}
                </p>
              </div>

              {/* 05. Development & Engineering */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>05. Development & Engineering</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {caseStudy.development}
                </p>
              </div>

              {/* 06. Technology Stack */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                  <span>06. Technology Stack</span>
                </div>
                {caseStudy.technology ? (
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {caseStudy.technology}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {displayProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 07. Key Challenges & Solution */}
              <div className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    <span>07. Technical Challenge</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {caseStudy.challenges}
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>08. Engineered Solution</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* 09. Screenshots */}
              {caseStudy.screenshots && (
                <div className="pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    <span>09. Visual Architecture</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {caseStudy.screenshots}
                  </p>
                </div>
              )}

              {/* 10. Live Demo & 11. GitHub (Handled in footer typically, but let's add text if exists) */}
              {(caseStudy.liveDemo || caseStudy.github) && (
                <div className="pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span>10 & 11. Live Demo & Repository</span>
                  </div>
                  <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
                    {caseStudy.liveDemo && <p>Live: <a href={caseStudy.liveDemo} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">{caseStudy.liveDemo}</a></p>}
                    {caseStudy.github && <p>GitHub: <a href={caseStudy.github} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">{caseStudy.github}</a></p>}
                  </div>
                </div>
              )}

              {/* 12. Lessons Learned */}
              {caseStudy.lessonsLearned && (
                <div className="pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>12. Lessons Learned</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {caseStudy.lessonsLearned}
                  </p>
                </div>
              )}

              {/* Results & Impact */}
              {caseStudy.result && (
                <div className="pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Outcome & Impact</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {caseStudy.result}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features Checklist */}
            {displayProject.features && displayProject.features.length > 0 && (
              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Key Technical Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {displayProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA Bar */}
          <div className="px-5 py-4 sm:px-6 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-500">
              <span>Repository:</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[150px] sm:max-w-none">{displayProject.name}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {displayProject.liveUrl && (
                <a
                  href={displayProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm shadow-cyan-500/20 active:scale-[0.98]"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href={displayProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-xs sm:text-sm transition-all active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
