import { EDUCATION_DATA, AI_CERTIFICATIONS_DATA } from '../data/portfolioData';
import { GraduationCap, BookOpen, CheckCircle, Cpu, Layers, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Education() {
  const { t } = useLanguage();
  const getIcon = (id: string) => {
    if (id === 'edu-3') return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
    if (id === 'edu-2') return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />;
    return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
  };

  return (
    <section id="education" className="py-14 sm:py-20 relative bg-transparent dark:bg-slate-900/40 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.badge}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shadow-sm shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.education.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {item.program}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4">
                  {item.institution}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  {item.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Key Skills & Knowledge Gained:
                </span>
                {item.skillsGained.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dedicated AI Certifications & Workshops Subsection */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Credentials & Workshops</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI Certifications & Workshops</span>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Specialized certifications, practical workshops, and verified credentials in Google AI Studio, Gemini API engineering, prompt architecture, and agentic pipelines.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {AI_CERTIFICATIONS_DATA.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold">
                      {cert.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                    {cert.title}
                  </h4>

                  <p className="text-xs font-mono text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{cert.issuer}</span>
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
