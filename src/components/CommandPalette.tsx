import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Folder, 
  User, 
  Cpu, 
  Mail, 
  Github, 
  FileText, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  CornerDownLeft, 
  X, 
  Clock, 
  ExternalLink,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { GITHUB_PROFILE_URL, GITHUB_USERNAME, DEVELOPER_EMAIL, RESUME_PDF_PATH, RESUME_FILENAME } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenEasterEgg: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
  onOpenResume,
  onOpenEasterEgg,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, options?: Record<string, unknown>) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -70, duration: 1.1 });
        } else {
          const navOffset = 70;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 150);
  };

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Navigate: Home',
      category: 'Navigation',
      shortcut: 'H',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      action: () => scrollToSection('home'),
    },
    {
      id: 'about',
      title: 'Navigate: About & Philosophy',
      category: 'Navigation',
      shortcut: 'A',
      icon: <User className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'skills',
      title: 'Navigate: Skills & Architecture',
      category: 'Navigation',
      shortcut: 'S',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'services',
      title: 'Navigate: Services & Capabilities',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => scrollToSection('services'),
    },
    {
      id: 'projects',
      title: 'Navigate: Projects & Case Studies',
      category: 'Navigation',
      shortcut: 'P',
      icon: <Folder className="w-4 h-4 text-violet-400" />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'journey',
      title: 'Navigate: Engineering Journey & Milestones',
      category: 'Navigation',
      shortcut: 'J',
      icon: <Clock className="w-4 h-4 text-amber-400" />,
      action: () => scrollToSection('journey'),
    },
    {
      id: 'creative-lab',
      title: 'Navigate: Creative Lab & Design Showcase',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      action: () => scrollToSection('creative-lab'),
    },
    {
      id: 'contact',
      title: 'Navigate: Contact & Inquiries',
      category: 'Navigation',
      shortcut: 'C',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'resume',
      title: 'Open Curriculum Vitae / Resume Viewer',
      category: 'Actions',
      shortcut: 'R',
      icon: <FileText className="w-4 h-4 text-cyan-500" />,
      action: () => {
        onClose();
        setTimeout(onOpenResume, 150);
      },
    },
    {
      id: 'view-resume-pdf',
      title: 'View Daniyal Hayat Resume PDF (Open in New Tab)',
      category: 'Actions',
      icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        window.open(RESUME_PDF_PATH, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'download-resume-pdf',
      title: 'Download Daniyal Hayat Resume PDF',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        const link = document.createElement('a');
        link.href = RESUME_PDF_PATH;
        link.download = RESUME_FILENAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
    {
      id: 'cli',
      title: 'Open Developer Terminal Easter Egg',
      category: 'Developer',
      shortcut: 'T',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        setTimeout(onOpenEasterEgg, 150);
      },
    },
    {
      id: 'theme',
      title: `Toggle Theme (Currently ${isDarkMode ? 'Dark' : 'Light'})`,
      category: 'Settings',
      shortcut: 'M',
      icon: isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'sound',
      title: `Toggle Audio UI Clicks (Currently ${soundManager.isEnabled() ? 'Enabled' : 'Muted'})`,
      category: 'Settings',
      icon: soundManager.isEnabled() ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />,
      action: () => {
        soundManager.toggle();
        onClose();
      },
    },
    {
      id: 'github',
      title: `Open GitHub Profile (@${GITHUB_USERNAME})`,
      category: 'External',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => {
        window.open(GITHUB_PROFILE_URL, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'email',
      title: `Copy Direct Email (${DEVELOPER_EMAIL})`,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => {
        navigator.clipboard.writeText(DEVELOPER_EMAIL);
        soundManager.playSuccess();
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.shortcut && cmd.shortcut.toLowerCase() === q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        soundManager.playHover();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length));
        soundManager.playHover();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          soundManager.playClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans mx-auto"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/80">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, or action..."
                className="w-full min-h-[44px] bg-transparent text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto p-2 space-y-1">
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      soundManager.playClick();
                    }}
                    onMouseEnter={() => {
                      setSelectedIndex(idx);
                      soundManager.playHover();
                    }}
                    className={`w-full flex items-center justify-between min-h-[56px] px-3.5 py-3 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-200 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                        {item.icon}
                      </div>
                      <div>
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.shortcut && (
                        <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {item.shortcut}
                        </kbd>
                      )}
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      )}
                    </div>
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400 font-mono">
                  No matching commands found for "{query}".
                </div>
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-cyan-500 dark:text-cyan-400">CMD + K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
