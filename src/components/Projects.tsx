import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Folder, 
  Smartphone, 
  Cpu, 
  CloudSun, 
  Layers, 
  ArrowUpRight, 
  Star, 
  RefreshCw, 
  Search, 
  X, 
  Clock, 
  ExternalLink, 
  Globe, 
  BookOpen,
  Sparkles,
  CheckCircle2,
  Code,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Project } from '../types';
import { LIVE_DEPLOYMENTS, GITHUB_PROFILE_URL } from '../data/portfolioData';
import { getEstimatedReadingTime } from '../utils/readingTime';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsProps {
  onOpenCaseStudy: (project: Project) => void;
}

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  index: number;
  getIcon: (iconName: string) => React.ReactNode;
  onOpenCaseStudy: (project: Project) => void;
}

function getTechBadgeStyle(tech: string) {
  const lower = tech.toLowerCase();
  if (lower.includes('typescript') || lower === 'ts') {
    return {
      dotBg: 'bg-blue-500',
      badgeClass: 'bg-blue-500/10 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800/60',
      label: 'TypeScript'
    };
  }
  if (lower.includes('javascript') || lower === 'js') {
    return {
      dotBg: 'bg-amber-400',
      badgeClass: 'bg-amber-500/10 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60',
      label: 'JavaScript'
    };
  }
  if (lower.includes('kotlin')) {
    return {
      dotBg: 'bg-purple-500',
      badgeClass: 'bg-purple-500/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800/60',
      label: 'Kotlin'
    };
  }
  if (lower.includes('react')) {
    return {
      dotBg: 'bg-cyan-400 animate-pulse',
      badgeClass: 'bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800/60',
      label: 'React'
    };
  }
  if (lower.includes('python')) {
    return {
      dotBg: 'bg-emerald-500',
      badgeClass: 'bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60',
      label: 'Python'
    };
  }
  if (lower.includes('gemini') || lower.includes('ai')) {
    return {
      dotBg: 'bg-indigo-400',
      badgeClass: 'bg-indigo-500/10 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/60',
      label: tech
    };
  }
  if (lower.includes('tailwind')) {
    return {
      dotBg: 'bg-sky-400',
      badgeClass: 'bg-sky-500/10 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800/60',
      label: 'Tailwind'
    };
  }
  if (lower.includes('android')) {
    return {
      dotBg: 'bg-green-500',
      badgeClass: 'bg-green-500/10 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-800/60',
      label: tech
    };
  }
  if (lower.includes('html') || lower.includes('css')) {
    return {
      dotBg: 'bg-orange-500',
      badgeClass: 'bg-orange-500/10 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800/60',
      label: tech
    };
  }
  return {
    dotBg: 'bg-slate-400 dark:bg-slate-500',
    badgeClass: 'bg-slate-100 dark:bg-[#161b2e] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800',
    label: tech
  };
}

function ProjectShowcase({ project, index, onOpenCaseStudy }: { project: Project, index: number, onOpenCaseStudy: (project: Project) => void, key?: React.Key }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111422] border border-slate-200/90 dark:border-slate-800 shadow-sm dark:shadow-2xl flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 lg:gap-12 items-center relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40`}
    >
      {/* Visual / Image Side */}
      <motion.div 
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full lg:w-1/2 group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/70 dark:from-[#0b0e1a] dark:to-[#161c2f] aspect-video border border-slate-200/90 dark:border-slate-800 shadow-xs cursor-pointer"
        onClick={() => onOpenCaseStudy(project)}
      >
        {/* Ambient glow inside visual card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-500/10 opacity-20 dark:opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />
        
        {/* Decorative graphic & tech watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 dark:text-slate-200 transform group-hover:scale-105 transition-transform duration-700 ease-out z-0">
          <div className="text-2xl sm:text-5xl font-black font-mono opacity-25 tracking-tighter text-slate-700 dark:text-slate-300">
            {project.displayName.split(' ')[0]}
          </div>
          <div className="mt-3 flex items-center gap-3 text-cyan-600 dark:text-cyan-400 opacity-60">
            <Code className="w-5 h-5 sm:w-6 sm:h-6" />
            <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Top Floating Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(() => {
            const langStyle = getTechBadgeStyle(project.language);
            return (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold border shadow-xs backdrop-blur-md ${langStyle.badgeClass}`}>
                <span className={`w-2 h-2 rounded-full ${langStyle.dotBg}`} />
                <span>{project.language}</span>
              </span>
            );
          })()}
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-live-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-live-pulse" />
              </span>
              <span>Live</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-sm backdrop-blur-sm" title="Estimated Reading Time">
            <Clock className="w-3 h-3 text-cyan-500" />
            <span>{getEstimatedReadingTime(project)}</span>
          </span>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex justify-between items-end gap-2">
          <div className="flex-1 min-w-0 pr-2">
            <div className="text-white font-bold text-sm sm:text-lg mb-1 drop-shadow-sm truncate">{project.displayName}</div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-slate-900/80 text-cyan-300 border border-cyan-500/30 truncate">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="text-slate-400 dark:text-slate-500 font-bold">PROJECT {(index + 1).toString().padStart(2, '0')}</span>
            <div className="h-px w-6 sm:w-8 bg-slate-300 dark:bg-slate-700" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{project.category}</span>
            <div className="h-px w-6 sm:w-8 bg-slate-300 dark:bg-slate-700" />
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium" title="Estimated reading time">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>{getEstimatedReadingTime(project)}</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {project.displayName}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech, i) => {
            const style = getTechBadgeStyle(tech);
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border shadow-2xs ${style.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`} />
                <span>{tech}</span>
              </span>
            );
          })}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-50 dark:bg-[#181d33] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="group/btn inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-[0.98] shadow-md cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 active:scale-[0.98] transition-all shadow-md"
              >
                <Globe className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#161b2e] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-500 active:scale-[0.98] transition-colors shadow-xs" 
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ onOpenCaseStudy }: ProjectsProps) {
  const { t } = useLanguage();
  const { projects, isSyncing, lastSynced, refreshRepos } = useGitHubRepos();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'live', label: 'Live Deployments' },
    { id: 'web', label: 'Web Platforms' },
    { id: 'mobile', label: 'Mobile (Kotlin)' },
    { id: 'ai', label: 'AI & Tools' }
  ];

  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (activeCategory === 'live' && !project.liveUrl) return false;
    if (activeCategory === 'mobile' && !project.category.toLowerCase().includes('mobile') && project.language !== 'Kotlin') return false;
    if (activeCategory === 'web' && (!project.category.toLowerCase().includes('web') || project.language === 'Kotlin')) return false;
    if (activeCategory === 'ai' && !project.category.toLowerCase().includes('ai') && !project.technologies.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'))) return false;

    // Search filter
    const term = searchTerm.toLowerCase();
    const matchName = project.displayName.toLowerCase().includes(term) || project.name.toLowerCase().includes(term);
    const matchDesc = project.description.toLowerCase().includes(term);
    const matchLang = project.language.toLowerCase().includes(term);
    const matchTech = project.technologies.some((tech) => tech.toLowerCase().includes(term));
    return matchName || matchDesc || matchLang || matchTech;
  });

  // Limit default display to 5 curated selected projects when browsing all without active search
  const INITIAL_DISPLAY_LIMIT = 5;
  const isConstrained = !showAll && !searchTerm && activeCategory === 'all' && filteredProjects.length > INITIAL_DISPLAY_LIMIT;
  const displayedProjects = isConstrained ? filteredProjects.slice(0, INITIAL_DISPLAY_LIMIT) : filteredProjects;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-blue-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'Github':
        return <Github className="w-5 h-5 text-cyan-500" />;
      default:
        return <Folder className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <section id="projects" className="py-14 sm:py-20 md:py-28 relative border-t border-b dark:border-slate-800/80 border-slate-200/90 bg-slate-100/50 dark:bg-[#0a0c14]/85 backdrop-blur-[2px]">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header with Live Sync Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <Folder className="w-3.5 h-3.5" />
                <span>{t.projects.badge}</span>
              </span>

              <button
                onClick={refreshRepos}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#111422] border border-slate-200/90 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors shadow-xs cursor-pointer min-h-[32px]"
                title="Sync with GitHub API"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-500' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : lastSynced ? `Synced ${lastSynced}` : 'Sync with GitHub'}</span>
              </button>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.projects.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.projects.subtitle}
            </p>
          </div>

          <a
            href={`${GITHUB_PROFILE_URL}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#111422] border border-slate-200/90 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors group shadow-xs shrink-0 self-start md:self-auto"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Highlighted Live Deployments Bar */}
        <div className="mb-10 sm:mb-14 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111422] border border-slate-200/90 dark:border-cyan-500/30 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm tracking-wide uppercase font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" />
              <span>Direct Live Deployments</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#161a2e] border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-live-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 animate-live-pulse" />
                      </span>
                      <span>{deploy.badge}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {deploy.type}
                    </span>
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1 group-hover:text-cyan-500 transition-colors">
                    {deploy.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 line-clamp-2">
                    {deploy.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                  <a
                    href={deploy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center min-h-[44px] gap-1.5 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Site</span>
                  </a>
                  <a
                    href={deploy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white dark:bg-[#0e111d] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mb-8 sm:mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer inline-flex items-center justify-center ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-[#111422] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-[#111422] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyan-500 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="flex flex-col gap-10 sm:gap-14 pb-8">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                index={index}
                onOpenCaseStudy={onOpenCaseStudy}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Progressive Disclosure Toggle */}
        {!searchTerm && activeCategory === 'all' && filteredProjects.length > INITIAL_DISPLAY_LIMIT && (
          <div className="flex justify-center pb-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#111422] hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-mono font-semibold transition-all shadow-sm hover:border-cyan-500/50 cursor-pointer min-h-[44px]"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 text-cyan-500" />
                  <span>Show Selected Projects ({INITIAL_DISPLAY_LIMIT})</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 text-cyan-500" />
                  <span>View All Projects ({filteredProjects.length})</span>
                </>
              )}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-[#111422] border border-slate-200 dark:border-slate-800 shadow-lg">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No projects found matching "<span className="text-cyan-500">{searchTerm}</span>" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
