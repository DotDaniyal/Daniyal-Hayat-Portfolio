import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Layers, 
  Cpu, 
  ExternalLink, 
  X, 
  Code2, 
  Eye, 
  ArrowUpRight,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { CREATIVE_LAB_ITEMS, CreativeLabItem } from '../data/creativeLabData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export function CreativeLab() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<CreativeLabItem | null>(null);

  const categories = ['All', 'UI Experiments', 'Visual Concepts', 'Motion & Canvas', 'Brand & Graphics'];

  const filteredItems = activeCategory === 'All'
    ? CREATIVE_LAB_ITEMS
    : CREATIVE_LAB_ITEMS.filter((item) => item.category === activeCategory);

  const getAccentClass = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'border-cyan-500/30 text-cyan-400 group-hover:border-cyan-500/60 bg-cyan-500/10';
      case 'purple':
        return 'border-purple-500/30 text-purple-400 group-hover:border-purple-500/60 bg-purple-500/10';
      case 'blue':
        return 'border-blue-500/30 text-blue-400 group-hover:border-blue-500/60 bg-blue-500/10';
      case 'emerald':
        return 'border-emerald-500/30 text-emerald-400 group-hover:border-emerald-500/60 bg-emerald-500/10';
      case 'amber':
        return 'border-amber-500/30 text-amber-400 group-hover:border-amber-500/60 bg-amber-500/10';
      default:
        return 'border-cyan-500/30 text-cyan-400 group-hover:border-cyan-500/60 bg-cyan-500/10';
    }
  };

  return (
    <section id="creative-lab" className="py-16 sm:py-24 md:py-28 relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/40 border-t border-slate-200/90 dark:border-slate-800/80">
      
      {/* Background ambient aesthetic */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-100" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none opacity-20 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.creativeLab.badge}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-cyan-500/15 border border-purple-500/25 flex items-center justify-center text-purple-500 dark:text-purple-400 shadow-sm shrink-0">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.creativeLab.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.creativeLab.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start md:self-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedItem(item);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-xs hover:shadow-cyan-500/5 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Badge & Year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${getAccentClass(item.accentColor)}`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Footer Tag Badges & Inspect Trigger */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Inspector for Creative Lab Item */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl bg-white dark:bg-[#101321] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${getAccentClass(selectedItem.accentColor)}`}>
                      {selectedItem.badge} • {selectedItem.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedItem.description}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Creative &amp; Technical Rationale:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {selectedItem.details}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Tools &amp; Exploration Technologies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 transition-colors cursor-pointer shadow-sm"
                  >
                    Close Inspector
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
