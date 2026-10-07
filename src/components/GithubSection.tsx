import { motion } from 'motion/react';
import { 
  Github, 
  GitBranch, 
  Star, 
  ExternalLink, 
  Code2, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useLanguage } from '../context/LanguageContext';

export function GithubSection() {
  const { t } = useLanguage();
  const { projects } = useGitHubRepos();
  const { activity } = useGitHubActivity();
  const repoCount = projects.length || 7;

  // Select pinned repositories
  const pinnedRepos = projects.slice(0, 4);

  return (
    <section id="github" className="py-14 sm:py-20 md:py-24 relative border-t dark:border-slate-800/80 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.github.badge}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-sm shrink-0">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.github.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.github.subtitle}
          </p>
        </div>

        {/* Live Activity Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Most Recent GitHub Event:
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                {activity.actionText} <span className="text-xs font-normal text-slate-500">({activity.timeAgo})</span>
              </p>
            </div>
          </div>

          <a
            href={activity.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium transition-colors"
          >
            <span>Inspect Commit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Pinned Repositories Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {pinnedRepos.map((repo, idx) => (
            <motion.a
              key={repo.id}
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-xs hover:shadow-cyan-500/5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {repo.displayName}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  {repo.stars !== undefined && repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{repo.stars}</span>
                    </span>
                  )}
                  <span>public</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* GitHub Stats Summary Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Direct Contribution & Codebase Auditing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Interested in reviewing pull requests, architecture diagrams, or cloning local development builds? Browse Daniyal's complete GitHub profile.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-wrap items-center justify-center gap-4">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Github className="w-4 h-4" />
              <span>github.com/{GITHUB_USERNAME}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
