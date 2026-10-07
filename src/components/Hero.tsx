import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Mail, 
  ChevronDown, 
  GitBranch, 
  FileText,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../data/portfolioData';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useTypewriter } from '../hooks/useTypewriter';
import { MagneticButton } from './MagneticButton';
import { useLanguage } from '../context/LanguageContext';

const TYPEWRITER_WORDS = [
  "Full-Stack Web Developer",
  "Native Android Developer",
  "AI Systems Architect",
  "Creative UI/UX Builder"
];

function TypewriterText() {
  const { displayText } = useTypewriter({
    words: TYPEWRITER_WORDS,
    typingSpeed: 65,
    deletingSpeed: 30,
    pauseDuration: 2200,
  });

  return (
    <span className="inline-flex items-baseline min-h-[1.2em]">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400">
        {displayText}
      </span>
      <span 
        aria-hidden="true" 
        className="inline-block w-[3px] h-[0.75em] ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse rounded-full align-baseline shrink-0" 
      />
    </span>
  );
}

interface HeroProps {
  onOpenResume?: () => void;
  isLoaded?: boolean;
}

function ProfilePhotoCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] group ${className}`}>
      {/* Subtle ambient glow behind the image */}
      <div 
        className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-violet-500/20 dark:from-cyan-500/20 dark:via-blue-500/15 dark:to-indigo-500/20 rounded-3xl lg:rounded-[2.25rem] blur-2xl group-hover:blur-3xl group-hover:opacity-100 opacity-25 dark:opacity-70 transition-all duration-700 pointer-events-none animate-pulse-glow" 
      />
      
      {/* Premium Image Frame */}
      <div 
        className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden border border-slate-200/90 dark:border-cyan-500/30 shadow-lg dark:shadow-cyan-950/40 transition-all duration-500 ease-out md:group-hover:scale-[1.02] md:group-hover:-translate-y-1 bg-white dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10"
      >
        <img 
          src="/profile.jpeg" 
          alt="Daniyal Hayat, Full-Stack Web Developer" 
          className="w-full h-full object-cover [object-position:50%_0%] transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        
        {/* Subtle bottom gradient to gracefully blend suit edge */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

        {/* Subtle inner border for executive polish */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none" />
      </div>
    </div>
  );
}

export function Hero({ onOpenResume, isLoaded = true }: HeroProps) {
  const { t } = useLanguage();
  const { activity } = useGitHubActivity();
  const { projects } = useGitHubRepos();

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: easeCurve,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: easeCurve,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.2,
        ease: easeCurve,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        

        {/* Hero Grid with Profile Photo */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography, CTAs, Stats */}
          <div className="md:col-span-7 space-y-6">
            

            {/* 4. Cinematic Main Heading with Fluid clamp() Typography */}
            <div className="space-y-3">
              <motion.h1 
                id="hero-main-heading"
                variants={headingVariants}
                className="text-[clamp(2.4rem,7.5vw,4.8rem)] md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] break-words"
              >
                <span className="block font-bold">
                  DANIYAL <span className="font-normal text-slate-400 dark:text-slate-500">HAYAT</span>
                </span>
                <span 
                  className="block font-extrabold tracking-tight mt-1 leading-snug text-2xl sm:text-3xl lg:text-4xl"
                >
                  <TypewriterText />
                </span>
              </motion.h1>

              {/* 5. Role Line */}
              <motion.div
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg font-mono text-cyan-700 dark:text-cyan-400 font-semibold flex flex-wrap items-center gap-2 pt-1"
              >
                <span>{t.hero.role}</span>
                <span>•</span>
                <span>{t.hero.badge}</span>
              </motion.div>
            </div>

            {/* 6. Short Intro */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              {t.hero.tagline}
            </motion.p>

            {/* 7. Primary Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2"
            >
              <MagneticButton
                href="#projects"
                dataCursor="view"
                className="min-h-[44px] px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] hover:shadow-cyan-500/35"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                dataCursor="pointer"
                className="min-h-[44px] px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] hover:border-cyan-500/40"
              >
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t.nav.contact}</span>
              </MagneticButton>

              <div className="flex items-center gap-2">
                {onOpenResume && (
                  <MagneticButton
                    onClick={onOpenResume}
                    dataCursor="pointer"
                    aria-label="Download Daniyal Hayat Resume"
                    title="Download Daniyal Hayat Resume"
                    className="flex-1 sm:flex-none min-h-[44px] px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-mono transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] hover:border-cyan-500/40 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{t.hero.downloadResume}</span>
                  </MagneticButton>
                )}

                <MagneticButton
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dataCursor="external"
                  className="min-w-[44px] min-h-[44px] p-3.5 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 hover:border-cyan-500/40 shadow-xs"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>

            {/* 8. Quick Metrics / Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-lg border-t border-slate-200 dark:border-slate-800/80 font-mono text-xs"
            >
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">{projects.length > 0 ? projects.length : "7+"}</span>
                <span className="text-slate-500 dark:text-slate-400">Public Repos</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">Active</span>
                <span className="text-slate-500 dark:text-slate-400">GitHub Presence</span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-slate-500 dark:text-slate-400">Commitment</span>
              </div>
            </motion.div>

            {/* 9. Mobile Profile Photo (under 768px): Centered width of ~75vw below primary CTA buttons and stats */}
            <motion.div
              variants={photoVariants}
              className="flex md:hidden justify-center items-center pt-4 pb-2 my-2"
            >
              <ProfilePhotoCard className="w-[75vw] max-w-[340px]" />
            </motion.div>

          </div>

          {/* Right Column: Professional Profile Photo for Tablet & Desktop (>= 768px) */}
          <motion.div
            variants={photoVariants}
            className="hidden md:flex md:col-span-5 items-center justify-center relative mt-8 md:mt-0"
          >
            <ProfilePhotoCard className="w-full max-w-[320px] md:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px]" />
          </motion.div>

        </div>

      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="mt-14 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-mono"
      >
        <span className="text-[10px] tracking-widest uppercase">Explore Works</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-500" />
        </motion.div>
      </motion.div>

    </section>
  );
}
