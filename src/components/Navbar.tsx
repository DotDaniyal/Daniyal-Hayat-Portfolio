import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Terminal, 
  Sun, 
  Moon, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Search,
  Github,
  Globe
} from 'lucide-react';
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenEasterEgg: () => void;
  onOpenCommandPalette: () => void;
}

export function Navbar({ 
  activeSection, 
  isDarkMode, 
  onToggleTheme,
  onOpenResume,
  onOpenEasterEgg,
  onOpenCommandPalette,
}: NavbarProps) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    soundManager.playClick();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoClicks(0);
      onOpenEasterEgg();
    } else {
      const homeElem = document.getElementById('home');
      if (homeElem) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, options?: Record<string, unknown>) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(homeElem, { offset: 0, duration: 1.1 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  const handleToggleSound = () => {
    const next = soundManager.toggle();
    setSoundEnabled(next);
  };

  const handleToggleLanguage = () => {
    soundManager.playClick();
    toggleLanguage();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    soundManager.playClick();
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, options?: Record<string, unknown>) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.1 });
        } else {
          const navOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const navItems = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: t.nav.journey, href: '#journey', id: 'journey' },
    { name: t.nav.creativeLab, href: '#creative-lab', id: 'creative-lab' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'dark:bg-[#090a0f]/85 bg-white/85 backdrop-blur-xl dark:border-b dark:border-slate-800/80 border-b border-slate-200/80 py-2.5 shadow-lg dark:shadow-black/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with 5-click easter egg */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            data-cursor="pointer"
            className="group flex items-center gap-2.5 text-slate-900 dark:text-white focus:outline-none rounded px-1 text-left cursor-pointer"
            title="Click logo 5 times to reveal developer terminal"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white font-sans tracking-wider">
                DANIYAL
              </span>
              <span className="leading-none text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400 font-sans tracking-wider mt-0.5">
                HAYAT
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Floating Navigation */}
        <nav className="hidden lg:flex items-center gap-1 dark:bg-slate-900/80 bg-slate-100/90 dark:border-slate-800/80 border border-slate-200 rounded-full px-3 py-1.5 backdrop-blur-md shadow-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                data-cursor="pointer"
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-3.5 py-1 text-xs font-medium transition-colors rounded-full ${
                  isActive
                    ? 'dark:text-cyan-300 text-cyan-700 font-semibold'
                    : 'dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 dark:bg-cyan-500/20 bg-cyan-500/25 border dark:border-cyan-500/40 border-cyan-500/40 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2">
          
          {/* Language Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-xl dark:bg-slate-900/90 bg-slate-100 border dark:border-slate-800 border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => {
                if (language !== 'en') {
                  soundManager.playClick();
                  setLanguage('en');
                }
              }}
              data-cursor="pointer"
              className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => {
                if (language !== 'ur') {
                  soundManager.playClick();
                  setLanguage('ur');
                }
              }}
              data-cursor="pointer"
              className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                language === 'ur'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="اردو زبان منتخب کریں"
              aria-label="Switch to Urdu"
            >
              اردو
            </button>
          </div>

          {/* Command Palette Trigger (Cmd+K) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCommandPalette();
            }}
            data-cursor="pointer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors text-xs font-mono cursor-pointer"
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[9px] font-semibold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor="pointer"
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors cursor-pointer"
            title={soundEnabled ? "Mute UI sounds" : "Enable UI micro-sounds"}
            aria-label="Toggle Sound"
          >
            <AnimatePresence mode="wait">
              {soundEnabled ? (
                <motion.div
                  key="enabled"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="disabled"
                  initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <VolumeX className="w-4 h-4 text-slate-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Resume CV Modal Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            data-cursor="pointer"
            aria-label="View Daniyal Hayat Resume PDF"
            title="View Daniyal Hayat Resume PDF"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-xs font-medium dark:text-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span>CV</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleTheme();
            }}
            data-cursor="pointer"
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* GitHub Profile */}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="external"
            onClick={() => soundManager.playClick()}
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-colors"
            title="Daniyal's GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Actions & Hamburger (Compact: logo left, 44x44px icons right) */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <button
            onClick={handleToggleLanguage}
            className="w-11 h-11 flex items-center justify-center rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-slate-700 dark:text-slate-200 hover:text-cyan-500 cursor-pointer transition-colors active:scale-95 font-mono text-xs font-bold"
            aria-label="Toggle language"
            title="Switch Language"
          >
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400">{language === 'en' ? 'UR' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenCommandPalette}
            className="w-11 h-11 flex items-center justify-center rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 cursor-pointer transition-colors active:scale-95"
            aria-label="Search and command palette"
          >
            <Search className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
          </button>

          <button
            onClick={onToggleTheme}
            className="w-11 h-11 flex items-center justify-center rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 cursor-pointer transition-colors active:scale-95"
            aria-label="Toggle light or dark theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-cyan-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-slate-600 dark:text-slate-300 hover:text-cyan-500 cursor-pointer transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden border-b dark:border-slate-800 border-slate-200 dark:bg-[#090a0f]/98 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, item.href);
                }}
                className="flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-base font-medium dark:text-slate-200 text-slate-800 hover:text-cyan-500 dark:hover:bg-slate-900/80 hover:bg-slate-100 active:bg-cyan-500/10 transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t dark:border-slate-800 border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleToggleLanguage();
                }}
                className="flex items-center justify-between min-h-[44px] px-4 py-3 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>{t.nav.langToggle}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold uppercase text-[10px]">
                  {language === 'en' ? 'اردو (Urdu)' : 'English'}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.viewResume}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEasterEgg();
                }}
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{t.nav.openTerminal}</span>
              </button>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 active:scale-[0.98] transition-transform"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub (@{GITHUB_USERNAME})</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
