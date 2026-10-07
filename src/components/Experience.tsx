import { EXPERIENCE_TIMELINE } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle, Sparkles, Terminal, Code2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Experience() {
  const { t } = useLanguage();
  return (
    <section id="journey" className="py-14 sm:py-20 md:py-24 relative bg-transparent dark:bg-slate-900/40 backdrop-blur-[2px]">
      <span id="experience" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.journey.badge}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-sm shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.journey.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.journey.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-5 sm:pl-10 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 sm:space-y-12">
          {EXPERIENCE_TIMELINE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[29px] sm:-left-[47px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-[#090a0f] border-2 border-cyan-500 flex items-center justify-center shadow-xs group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500 animate-pulse" />
              </div>

              {/* Milestone Card */}
              <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5">
                {/* Year & Role Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{item.year}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    {item.role}
                  </span>
                </div>

                {/* Title & Narrative */}
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                    >
                      <Terminal className="w-3 h-3 text-cyan-500" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
