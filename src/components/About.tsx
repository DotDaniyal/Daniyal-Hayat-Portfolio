import { motion } from 'motion/react';
import { DEVELOPER_NAME, GITHUB_USERNAME, LIVE_DEPLOYMENTS, RESUME_PDF_PATH, RESUME_FILENAME } from '../data/portfolioData';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Layers, 
  Globe, 
  Compass,
  ArrowRight,
  ShieldCheck,
  Cpu,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  onOpenResume?: () => void;
}

export function About({ onOpenResume }: AboutProps) {
  const { t } = useLanguage();
  const { projects } = useGitHubRepos();
  const repoCount = projects.length || 7;

  const timelineMilestones = [
    {
      year: "2023 — 2024",
      title: "Foundations & Web Architecture",
      desc: "Deep immersion in TypeScript, modern React, DOM rendering optimization, and REST API design patterns."
    },
    {
      year: "2024 — 2025",
      title: "Cross-Platform & Native Android",
      desc: "Expanded into native Android engineering with Kotlin, Jetpack Compose, Room database, and offline-first mobile synchronization."
    },
    {
      year: "2025 — 2026",
      title: "Flagship Deployments & AI Tooling",
      desc: "Architected Darul Ifta web and Android apps, CortexIQ AI workspace, and cloud-deployed production services."
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-500/[0.015] to-transparent">
      
      {/* Editorial Watermark Backdrop */}
      <div className="absolute top-12 -right-16 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] text-7xl sm:text-9xl font-extrabold font-mono tracking-tighter">
        DANIYAL
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              {t.about.badge}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Who is Daniyal?
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {t.about.title}
          </h2>
        </div>

        {/* Split Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Identity & Verified Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 shadow-sm dark:shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl opacity-20 dark:opacity-100 group-hover:bg-cyan-500/20 transition-all duration-500" />
              
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                    {DEVELOPER_NAME}
                  </h3>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                    @{GITHUB_USERNAME}
                  </span>
                </div>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-2 border-cyan-500 pl-4 mb-6">
                "Great software is where mathematical precision meets intuitive craftsmanship. If it doesn't feel instant, effortless, and accessible, the work isn't done."
              </blockquote>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                I build digital products that prioritize real user utility, zero bloat, and rock-solid code maintainability. Whether developing responsive web platforms or native Android applications, I treat every pixel and API request with deliberate intent.
              </p>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/80 text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                    {repoCount}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Public Repos
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/80 text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {LIVE_DEPLOYMENTS.length}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Web Apps
                  </span>
                </div>
              </div>

            </div>

            {/* Inspect Commits & Resume Callouts */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                    Curriculum Vitae / Resume
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Direct PDF &amp; ATS specifications
                  </span>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {onOpenResume ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        onOpenResume();
                      }}
                      aria-label="View Daniyal Hayat Resume PDF"
                      className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-[0.98] gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>
                  ) : (
                    <a
                      href={RESUME_PDF_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Daniyal Hayat Resume PDF"
                      className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-[0.98] gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </a>
                  )}
                  <a
                    href={RESUME_PDF_PATH}
                    download={RESUME_FILENAME}
                    aria-label="Download Daniyal Hayat Resume"
                    className="inline-flex items-center justify-center min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-300/80 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all shadow-xs active:scale-[0.98] gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  Want to review verified GitHub commits?
                </span>
                <MagneticButton
                  href="#github"
                  dataCursor="pointer"
                  className="inline-flex items-center justify-center min-h-[38px] px-3 gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors self-start sm:self-auto"
                >
                  <span>Inspect Activity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Visual Development Journey */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-slate-600 dark:text-slate-300 text-base leading-relaxed"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Engineering with Purpose, Craft, and Resilience
              </h3>
              <p>
                My engineering journey began with a passion for understanding how interactive digital systems behave under the hood. Over time, that curiosity crystallized into a disciplined practice of shipping production-grade web systems and native Android apps with Kotlin.
              </p>
              <p>
                I have built full-lifecycle platforms including <strong className="text-slate-900 dark:text-white font-semibold">Darul Ifta Irshad us Saileen</strong>, taking it from a community guidance initiative to a responsive live web platform and multiple iterations of native Android apps with offline caching.
              </p>
              <p>
                In the AI space, I designed and developed <strong className="text-slate-900 dark:text-white font-semibold">CortexIQ by DNYL</strong>, pairing real-time model inference with a clean, low-latency UI.
              </p>
            </div>

            {/* Visual Development Journey Timeline */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                Development Journey & Evolution
              </h4>

              <div className="space-y-3 sm:space-y-4">
                {timelineMilestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                          {m.title}
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                        {m.desc}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0 self-start sm:self-auto">
                      {m.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What Makes My Work Different - Pillars */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm pt-2">
              <div className="p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <span>Cross-Platform Depth</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-normal text-xs sm:text-sm">
                  Fluid in modern React/TypeScript web apps and native Android mobile apps in Kotlin.
                </p>
              </div>

              <div className="p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span>Verified & Honest</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-normal text-xs sm:text-sm">
                  No mock metrics or placeholder logos. All codebases are publicly accessible on GitHub.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
