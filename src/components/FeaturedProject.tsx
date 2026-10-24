import { motion } from 'motion/react';
import { Cpu, Github, ExternalLink, Sparkles, Check, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { getEstimatedReadingTime } from '../utils/readingTime';
import { Project } from '../types';

interface FeaturedProjectProps {
  onOpenCaseStudy: (project: Project) => void;
}

export function FeaturedProject({ onOpenCaseStudy }: FeaturedProjectProps) {
  // Find the first project marked as featured with a live URL, defaulting to the specific ID if live, or just the first live project
  const liveProjects = PROJECTS.filter(p => p.liveUrl);
  const featured = liveProjects.find((p) => p.featured === true) || liveProjects.find((p) => p.id === 'cortexiq-by-dnyl') || liveProjects[0] || PROJECTS[0];

  return (
    <section id="featured-project" className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-slate-100/60 dark:bg-[#0a0c14] border-t dark:border-slate-800/80 border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-3 max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture Spotlight</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Flagship Build: {featured.displayName}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A deep-dive showcase into the computational intelligence suite, highlighting reactive state, type safety, and real-time processing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111422] dark:border-slate-800 border border-slate-200/90 p-5 sm:p-8 md:p-12 shadow-sm dark:shadow-2xl overflow-hidden group"
        >
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none opacity-20 dark:opacity-100 group-hover:bg-violet-600/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none opacity-20 dark:opacity-100" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-300 text-xs font-mono font-medium">
                  {featured.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-medium">
                  {featured.language}
                </span>
                {featured.liveUrl && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-live-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-live-pulse" />
                    </span>
                    <span>Live Deployment</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-slate-900/90 bg-white border dark:border-slate-700/80 border-slate-200 dark:text-slate-300 text-slate-700 text-xs font-mono shadow-xs" title="Estimated Reading Time">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{getEstimatedReadingTime(featured)}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {featured.displayName}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {featured.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-semibold">
                  Architectural Pillars:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featured.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featured.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg dark:bg-slate-950/80 bg-slate-200/80 dark:border-slate-800 border-slate-300 text-xs font-mono dark:text-slate-300 text-slate-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenCaseStudy(featured)}
                  className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live App</span>
                  </a>
                )}

                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl dark:bg-slate-950 bg-white hover:dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-800 border-slate-200 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all shadow-xs active:scale-[0.98]"
                >
                  <Github className="w-4 h-4 text-slate-500" />
                  <span>Inspect Source</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Mockup Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl dark:bg-slate-950 bg-slate-900 border dark:border-slate-800 border-slate-700 p-4 sm:p-5 shadow-2xl space-y-4 font-mono text-xs text-slate-300 overflow-hidden">
                {/* Simulated window header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-slate-500">cortexiq.runtime.ts</span>
                </div>

                <div className="space-y-2 text-slate-400 overflow-x-auto break-all">
                  <p className="text-cyan-400 font-semibold">CortexIQ Runtime Pipeline: Active</p>
                  <p><span className="text-purple-400">const</span> intelligence = <span className="text-yellow-400">new</span> CortexIQ({`{\n  mode: "reactive",\n  framework: "TypeScript",\n  rateLimitSafety: true\n}`});</p>
                  <p className="text-emerald-400">✓ Token weighting calculated in 4.2ms</p>
                  <p className="text-blue-400">✓ Model pipeline active with 0 layout shift</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Cpu className="w-4 h-4 text-violet-400" />
                    <span>Status: High Priority Active</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">VERIFIED</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
