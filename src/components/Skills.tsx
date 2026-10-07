import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Palette, 
  Cpu, 
  Server, 
  Globe, 
  Sparkles, 
  Terminal,
  GitBranch,
  Network,
  LayoutGrid,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  icon: string;
  badge: string;
  connections: string[];
}

function OrbitVisualizer({ 
  skills, 
  hoveredSkill, 
  setHoveredSkill, 
  getIcon, 
  activeSkillObj 
}: { 
  skills: SkillNode[], 
  hoveredSkill: string | null, 
  setHoveredSkill: (id: string | null) => void,
  getIcon: (name: string) => React.ReactNode,
  activeSkillObj: SkillNode | undefined
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Distribute skills across orbits: by domain when viewing All, or balanced across rings when filtered
  const isFiltered = skills.length < 10;
  const orbit1 = !isFiltered
    ? skills.filter(s => s.category === 'Frontend')
    : skills.slice(0, Math.ceil(skills.length / 2));
  const orbit2 = !isFiltered
    ? skills.filter(s => s.category === 'Backend / Data' || s.category.includes('AI'))
    : skills.slice(Math.ceil(skills.length / 2));
  const orbit3 = !isFiltered
    ? skills.filter(s => s.category === 'Tools / Platforms')
    : [];

  const radii = [140, 240, 340];

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <div className="relative w-full h-[600px] sm:h-[800px] flex items-center justify-center overflow-hidden hidden md:flex">
      {/* Center Node */}
      <div className="absolute z-30 w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md">
        <span className="text-sm font-bold text-cyan-400 font-mono">DANIYAL</span>
        <span className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase mt-1">Core</span>
      </div>

      {/* Orbits & Nodes */}
      {[orbit1, orbit2, orbit3].map((orbitGroup, orbitIdx) => {
        const radius = radii[orbitIdx];
        
        return (
          <div key={`orbit-${orbitIdx}`} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Orbit Ring */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: orbitIdx * 0.2 }}
              className="absolute rounded-full border border-slate-300/30 dark:border-slate-700/30"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            
            {/* Nodes */}
            {orbitGroup.map((node, i) => {
              const pos = getPosition(i, orbitGroup.length, radius);
              const isHovered = hoveredSkill === node.id;
              const isConnected = hoveredSkill 
                  ? (activeSkillObj?.connections.includes(node.name) || activeSkillObj?.name === node.name)
                  : false;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x: pos.x, y: pos.y }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100, delay: orbitIdx * 0.2 + i * 0.05 }}
                  className="absolute pointer-events-auto"
                  onMouseEnter={() => {
                    setHoveredSkill(node.id);
                    soundManager.playHover();
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ left: '50%', top: '50%', margin: '-24px 0 0 -24px' }}
                >
                  <div className={`relative flex flex-col items-center group cursor-pointer`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                      isHovered 
                        ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] border-2 border-white scale-125 z-50' 
                        : isConnected
                          ? 'bg-blue-500/80 border-2 border-blue-300 scale-110 z-40'
                          : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:scale-110'
                    }`}>
                      <div className={isHovered || isConnected ? 'text-white' : 'text-slate-600 dark:text-slate-400'}>
                        {getIcon(node.icon)}
                      </div>
                    </div>
                    
                    <div className={`absolute top-full mt-2 text-center transition-all duration-300 whitespace-nowrap px-2 py-1 rounded bg-slate-900/90 text-white text-[10px] font-mono pointer-events-none ${isHovered || isConnected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      {node.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function Skills() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'ecosystem' | 'grid'>('ecosystem');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];

  const allSkills: SkillNode[] = SKILL_GROUPS.flatMap((group) =>
    group.skills.map((skill) => {
      // Connect logically related technologies
      let related: string[] = [];
      if (skill.name.includes('React') || skill.name.includes('Next.js')) {
        related = ['TypeScript', 'Tailwind CSS', 'Responsive UI Design', 'Motion Animations'];
      } else if (skill.name.includes('TypeScript')) {
        related = ['React & Next.js', 'Node.js & Express', 'RESTful API Design'];
      } else if (skill.name.includes('Kotlin') || skill.name.includes('Android')) {
        related = ['Kotlin & Java', 'Android SDK & Jetpack', 'RESTful API Design'];
      } else if (skill.name.includes('Gemini') || skill.name.includes('AI') || group.category.includes('AI')) {
        related = ['Google AI Studio', 'Google Gemini AI SDK', 'TypeScript', 'Server-Side AI Proxying'];
      } else if (skill.name.includes('Tailwind')) {
        related = ['React & Next.js', 'Responsive UI Design', 'Motion Animations'];
      } else {
        related = ['TypeScript', 'Git & GitHub'];
      }

      return {
        id: skill.name,
        name: skill.name,
        category: group.category,
        level: skill.level,
        description: skill.description,
        icon: skill.icon,
        badge: skill.badge,
        connections: related,
      };
    })
  );

  const displayedSkills = selectedCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === selectedCategory);

  const activeSkillObj = allSkills.find(s => s.id === hoveredSkill);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-500" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-sky-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-teal-500" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-500" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'server':
        return <Server className="w-5 h-5 text-amber-500" />;
      case 'github':
        return <GitBranch className="w-5 h-5 text-rose-500" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <section id="skills" className="py-14 sm:py-20 md:py-24 relative border-t dark:border-slate-800/80 border-slate-200 bg-transparent dark:bg-slate-900/40 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.skills.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.skills.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.skills.subtitle}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs self-start md:self-auto">
            <button
              onClick={() => {
                setViewMode('ecosystem');
                soundManager.playClick();
              }}
              className={`min-h-[40px] flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                viewMode === 'ecosystem'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Ecosystem Nodes</span>
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                soundManager.playClick();
              }}
              className={`min-h-[40px] flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  soundManager.playClick();
                }}
                className={`min-h-[40px] inline-flex items-center justify-center px-3.5 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
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

        {/* Interactive Ecosystem Mode */}
        {viewMode === 'ecosystem' ? (
          <div className="rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-10 backdrop-blur-xl relative overflow-hidden">
            
            {/* Active Node Detail Banner */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 block">
                  {activeSkillObj ? 'INSPECTING NODE' : 'INTERACTIVE TIP'}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                  {activeSkillObj ? (
                    <>
                      <span>{activeSkillObj.name}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-normal">
                        {activeSkillObj.level}
                      </span>
                    </>
                  ) : (
                    <span>Hover or tap any node to trace relationships</span>
                  )}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  {activeSkillObj ? activeSkillObj.description : 'Technologies connect across frontend rendering, state layers, mobile native bridges, and AI inference engines.'}
                </p>
              </div>

              {activeSkillObj && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start md:self-auto">
                  <span className="text-[11px] font-mono text-slate-400">Interlinked with:</span>
                  {activeSkillObj.connections.map((conn) => (
                    <span
                      key={conn}
                      className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    >
                      {conn}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Nodes Ecosystem Grid / Orbit */}
            <div className="hidden md:block">
              <OrbitVisualizer 
                skills={displayedSkills} 
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                getIcon={getIcon}
                activeSkillObj={activeSkillObj}
              />
            </div>

            <div className="grid md:hidden grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
              {displayedSkills.map((node) => {
                const isHovered = hoveredSkill === node.id;
                const isConnected = hoveredSkill 
                  ? (activeSkillObj?.connections.includes(node.name) || activeSkillObj?.name === node.name)
                  : false;

                return (
                  <motion.div
                    key={node.id}
                    onMouseEnter={() => {
                      setHoveredSkill(node.id);
                      soundManager.playHover();
                    }}
                    onClick={() => {
                      setHoveredSkill(node.id);
                      soundManager.playClick();
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                      isHovered
                        ? 'bg-cyan-500/15 border-cyan-500 dark:border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : isConnected
                          ? 'bg-blue-500/10 border-blue-400/80 dark:border-blue-500/80 shadow-xs'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800">
                          {getIcon(node.icon)}
                        </div>
                        <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full truncate max-w-[80px] ${
                          isHovered || isConnected
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {node.badge}
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-bold transition-colors line-clamp-1 ${
                        isHovered ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {node.name}
                      </h4>
                    </div>

                    <div className="mt-2 sm:mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
                      <span className="truncate">{node.category.split(' ')[0]}</span>
                      {isConnected && (
                        <span className="text-cyan-500 font-semibold shrink-0">LINKED</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Grid View Mode */
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill, idx) => (
                <motion.div
                  key={skill.id || `${skill.name}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-xs hover:shadow-cyan-500/5 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {getIcon(skill.icon)}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                          {skill.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{skill.level}</span>
                    </span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                      Verified Stack
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
