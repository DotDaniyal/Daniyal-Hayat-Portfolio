import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { About } from './components/About';
import { FeaturedProject } from './components/FeaturedProject';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { CreativeLab } from './components/CreativeLab';
import { Services } from './components/Services';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { RevealOnScroll } from './components/RevealOnScroll';
import { LayeredBackground } from './components/LayeredBackground';
import { PlexusWaveBackground } from './components/PlexusWaveBackground';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { CommandPalette } from './components/CommandPalette';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { EasterEggModal } from './components/EasterEggModal';
import { Project } from './types';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load the PortfolioChatbot component to prevent slowing down initial page loads
const PortfolioChatbot = React.lazy(() => import('./components/PortfolioChatbot').then(module => ({ default: module.PortfolioChatbot })));

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('daniyal_portfolio_theme');
      return saved ? saved === 'dark' : true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daniyal_portfolio_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Keyboard shortcut listener: Cmd+K opens CommandPalette, 5 clicks on logo opens CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sections = ['contact', 'github', 'education', 'creative-lab', 'journey', 'experience', 'projects', 'services', 'skills', 'about', 'home'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 120) {
            setActiveSection(sectionId === 'experience' ? 'journey' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
        <div className={`min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#090a0f] text-slate-100' : 'bg-[#f4f5f8] text-slate-800'
        }`}>
        
        {/* Fast (<750ms) cinematic preloader */}
        {!loadingComplete && (
          <Preloader onComplete={() => setLoadingComplete(true)} />
        )}

        {/* Interactive Custom Cursor with badge modes */}
        <CustomCursor />

        {/* 6-Layer Cinematic Background System */}
        <LayeredBackground isDarkMode={isDarkMode} />

        {/* Premium Plexus Wave Background Animation Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <PlexusWaveBackground isDarkMode={isDarkMode} />
        </div>

        {/* Top Scroll Indicator */}
        <ScrollProgress />

        {/* Navbar with Sound, Theme, CV, and Command Palette triggers */}
        <Navbar 
          activeSection={activeSection} 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenEasterEgg={() => setIsEasterEggOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main className="relative z-10">
          {/* Hero Section */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} isLoaded={loadingComplete} />

          {/* Continuous Dual Tech Stack Marquee */}
          <TechStack />

          {/* About Section */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <About onOpenResume={() => setIsResumeOpen(true)} />
          </RevealOnScroll>

          {/* Skills & Interconnected Technology Matrix */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Skills />
          </RevealOnScroll>

          {/* Services & Technical Capabilities */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Services />
          </RevealOnScroll>

          {/* Featured Flagship Project */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <FeaturedProject onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)} />
          </RevealOnScroll>

          {/* Projects Centerpiece Showcase */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Projects onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)} />
          </RevealOnScroll>

          {/* Engineering Journey & Milestones */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Experience />
          </RevealOnScroll>

          {/* Creative Lab (Visual concepts, UI experiments, Canva graphics) */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <CreativeLab />
          </RevealOnScroll>

          {/* Education & Foundations */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Education />
          </RevealOnScroll>

          {/* GitHub & Open Source Activity */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <GithubSection />
          </RevealOnScroll>

          {/* Contact Transmission Section */}
          <RevealOnScroll direction="up" distance={30} duration={600}>
            <Contact />
          </RevealOnScroll>
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />

        {/* Floating Scroll to Top button */}
        <ScrollToTop />

        {/* Command Palette (Cmd+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenEasterEgg={() => setIsEasterEggOpen(true)}
          onToggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />

        {/* Case Study Deep-Dive Modal */}
        <ProjectModal 
          project={selectedCaseStudy}
          isOpen={Boolean(selectedCaseStudy)}
          onClose={() => setSelectedCaseStudy(null)}
        />

        {/* Resume / CV Modal */}
        <ResumeModal 
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Tasteful CLI Easter Egg Terminal */}
        <EasterEggModal 
          isOpen={isEasterEggOpen}
          onClose={() => setIsEasterEggOpen(false)}
        />

        {/* Daniyal AI Portfolio Assistant Chatbot with Suspense fallback */}
        <React.Suspense fallback={null}>
          <PortfolioChatbot />
        </React.Suspense>
      </div>
    </SmoothScroll>
  </MotionConfig>
  </LanguageProvider>
  );
}
