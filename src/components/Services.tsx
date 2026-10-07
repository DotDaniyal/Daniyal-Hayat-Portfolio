import { SERVICES_DATA } from '../data/portfolioData';
import { Layers, Smartphone, Cpu, Palette, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { t } = useLanguage();
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-emerald-500" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-rose-500" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-500" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 relative bg-transparent dark:bg-slate-900/30 backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.services.badge}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shadow-sm shrink-0">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.services.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5 group flex flex-col justify-between"
            >
              <div className="space-y-4 sm:space-y-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(service.icon)}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-3 sm:pt-4 space-y-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <a
                  href="#contact"
                  className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors group-hover:translate-x-1"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
