import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ur';

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    projects: string;
    journey: string;
    creativeLab: string;
    contact: string;
    viewResume: string;
    openTerminal: string;
    commandPalette: string;
    langToggle: string;
  };
  hero: {
    badge: string;
    greeting: string;
    role: string;
    tagline: string;
    viewProjects: string;
    downloadResume: string;
    exploreMatrix: string;
    statusLive: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    viewCv: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    viewCaseStudy: string;
    liveDemo: string;
    sourceCode: string;
  };
  journey: {
    badge: string;
    title: string;
    subtitle: string;
  };
  creativeLab: {
    badge: string;
    title: string;
    subtitle: string;
  };
  education: {
    badge: string;
    title: string;
    subtitle: string;
  };
  github: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    sendMessage: string;
    sendSuccess: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      journey: 'Journey',
      creativeLab: 'Creative Lab',
      contact: 'Contact',
      viewResume: 'View Resume / CV',
      openTerminal: 'Open Developer Terminal',
      commandPalette: 'Command Palette',
      langToggle: 'Language',
    },
    hero: {
      badge: 'Available Globally & Remote',
      greeting: "Hi, I'm Daniyal Hayat",
      role: 'Full-Stack Developer & Creative Builder',
      tagline: 'Architecting high-performance web platforms, cross-platform native Android mobile apps in Kotlin, and intelligent generative AI systems with Google AI Studio & Gemini.',
      viewProjects: 'Explore Production Work',
      downloadResume: 'Download Resume PDF',
      exploreMatrix: 'Architecture & Skills',
      statusLive: 'Open to High-Impact Opportunities',
    },
    about: {
      badge: 'Engineering Philosophy',
      title: 'Architecting Resilient & Scalable Software',
      subtitle: 'Combining clean architectural patterns, zero-bloat performance, native mobile engineering, and generative AI capabilities into impactful digital products.',
      viewCv: 'View Verified Resume',
    },
    skills: {
      badge: 'Interactive Ecosystem',
      title: 'Skills & Technology Matrix',
      subtitle: 'Explore my technical architecture as an interconnected ecosystem. Hover or tap any node to trace relationships and view implementation depth.',
    },
    services: {
      badge: 'Specialized Capabilities',
      title: 'What I Can Build & Deliver',
      subtitle: 'Focused engineering services backed by hands-on production code, from modern web applications to native Android mobile apps and AI pipelines.',
    },
    projects: {
      badge: 'Curated Software Portfolio',
      title: 'Featured Production Projects',
      subtitle: 'Explore flagship web platforms, algorithmic mobile games, weather telemetry tools, and computational AI suites built with production discipline.',
      viewCaseStudy: 'Deep-Dive Case Study',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
    },
    journey: {
      badge: 'Development Timeline',
      title: 'Engineering Journey & Milestones',
      subtitle: 'A chronological look at how I progressed from foundational web algorithms to architecting production web platforms, native Android mobile applications, and AI integrations.',
    },
    creativeLab: {
      badge: 'Experimental Playground',
      title: 'Creative Lab',
      subtitle: 'Where technical architecture meets visual experimentation. A curated showcase of UI prototypes, Canva & brand identities, kinetic motion physics, and canvas algorithms.',
    },
    education: {
      badge: 'Academic & Continuous Learning',
      title: 'Education & Core Foundations',
      subtitle: 'Rigorous foundations in computer science theory, algorithms, and practical software design combined with specialized masteries in full-stack web, mobile platforms, and AI engineering.',
    },
    github: {
      badge: 'Open Source & Version Control',
      title: 'GitHub Activity & Repository Stream',
      subtitle: 'All codebases, commits, and releases are maintained in public and accessible for inspection under @DotDaniyal.',
    },
    contact: {
      badge: 'Direct Transmission',
      title: "Let's Build Something Exceptional",
      subtitle: 'Have a project in mind, an architectural challenge, or a position opening? Send a message directly to my inbox.',
      sendMessage: 'Send Message',
      sendSuccess: 'Transmission Received! I will respond within 24 hours.',
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      messageLabel: 'Project Details / Message',
    },
    footer: {
      builtWith: 'Engineered with React, TypeScript, Tailwind CSS, Motion & Vite.',
      rights: 'All rights reserved.',
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      about: 'تعارف',
      skills: 'مہارتیں',
      services: 'خدمات',
      projects: 'پروجیکٹس',
      journey: 'سفرنامہ',
      creativeLab: 'تخلیقی لیب',
      contact: 'رابطہ',
      viewResume: 'سی وی / ریزیومے دیکھیں',
      openTerminal: 'ڈیولپر ٹرمینل کھولیں',
      commandPalette: 'کمانڈ پیلیٹ',
      langToggle: 'زبان',
    },
    hero: {
      badge: 'عالمی اور ریموٹ کام کے لیے دستیاب',
      greeting: 'السلام علیکم، میں دانیال حیات ہوں',
      role: 'فل اسٹیک ڈیولپر اور سافٹ ویئر انجینئر',
      tagline: 'اعلیٰ کارکردگی والی ویب سائٹس، کوٹلن میں نیٹو اینڈرائیڈ ایپس، اور گوگل جیمینائی اے آئی کے ساتھ جدید ڈیجیٹل سسٹمز کی تیاری۔',
      viewProjects: 'پروجیکٹس دیکھیں',
      downloadResume: 'ریزیومے ڈاؤن لوڈ کریں',
      exploreMatrix: 'تکنیکی مہارتیں',
      statusLive: 'نئے مواقع کے لیے دستیاب',
    },
    about: {
      badge: 'انجینئرنگ وژن',
      title: 'مضبوط اور پائیدار سافٹ ویئر کی تیاری',
      subtitle: 'صاف کوڈنگ، بہترین کارکردگی، نیٹو موبائل ایپس اور جدید مصنوعی ذہانت کو ملا کر اعلیٰ ڈیجیٹل مصنوعات بنانا۔',
      viewCv: 'سی وی کا معائنہ کریں',
    },
    skills: {
      badge: 'تکنیکی ماحولیاتی نظام',
      title: 'تکنیکی مہارتیں اور ٹیکنالوجی میٹرکس',
      subtitle: 'میری تکنیکی مہارتوں کا باہمی رابطہ دیکھیں۔ کسی بھی ٹیکنالوجی پر ٹیپ کر کے گہرائی میں جائزہ لیں۔',
    },
    services: {
      badge: 'خصوصی خدمات',
      title: 'میں کیا تیار اور ڈیلیور کر سکتا ہوں',
      subtitle: 'مکمل فل اسٹیک ویب ڈیولپمنٹ، کوٹلن نیٹو اینڈرائیڈ ایپس، اور گوگل اے آئی جیمینائی سسٹمز کی پروفیشنل خدمات۔',
    },
    projects: {
      badge: 'منتخب سافٹ ویئر پورٹ فولیو',
      title: 'نمایاں پروڈکشن پروجیکٹس',
      subtitle: 'دار الافتاء ارشاد السائلین، کورٹیکس آئی کیو اے آئی، ہمارا ویدر، اور مسٹک میچ جیسے مکمل فعال پروجیکٹس کا جائزہ لیں۔',
      viewCaseStudy: 'مکمل کیس اسٹڈی',
      liveDemo: 'لائیو ڈیمو',
      sourceCode: 'سورس کوڈ',
    },
    journey: {
      badge: 'ترقی کا سفرنامہ',
      title: 'انجینئرنگ کا سفر اور اہم سنگ میل',
      subtitle: 'بنیادی کوڈنگ اور الگورتھمز سے لے کر مکمل ویب پلیٹ فارمز، اینڈرائیڈ ایپس اور اے آئی انٹیگریشن تک کا سفر۔',
    },
    creativeLab: {
      badge: 'تجرباتی پلے گراؤنڈ',
      title: 'تخلیقی لیب اور ڈیزائن',
      subtitle: 'جہاں تکنیکی کوڈنگ بصری تجربات اور متحرک اینیمیشنز سے ملتی ہے۔ کینوس اور یو آئی ڈیزائن کے تجربات۔',
    },
    education: {
      badge: 'تعلیم و مسلسل تحقیق',
      title: 'تعلیم اور بنیادی بنیادیں',
      subtitle: 'کمپیوٹر سائنس تھیوری، ڈیٹا اسٹرکچرز، سسٹم ڈیزائن، اور گوگل اے آئی اسٹوڈیو میں باقاعدہ مہارت۔',
    },
    github: {
      badge: 'اوپن سورس اور گٹ ہب',
      title: 'گٹ ہب سرگرمیاں اور کوڈ اسٹریم',
      subtitle: 'تمام کوڈ بیسز، کمٹس اور ریلیزز پبلک طور پر معائنے کے لیے دستیاب ہیں۔',
    },
    contact: {
      badge: 'براہ راست رابطہ',
      title: 'آئیے مل کر کچھ شاندار بنائیں',
      subtitle: 'کیا آپ کے پاس کوئی پروجیکٹ یا آئیڈیا ہے؟ مجھے براہ راست میسج ارسال کریں۔',
      sendMessage: 'پیغام ارسال کریں',
      sendSuccess: 'پیغام موصول ہو گیا! میں 24 گھنٹوں میں جواب دوں گا۔',
      nameLabel: 'آپ کا نام',
      emailLabel: 'ای میل ایڈریس',
      messageLabel: 'پروجیکٹ کی تفصیلات / پیغام',
    },
    footer: {
      builtWith: 'ری ایکٹ، ٹائپ اسکرپٹ، ٹیل ونڈ اور وائٹ سے تیار کردہ۔',
      rights: 'جملہ حقوق محفوظ ہیں۔',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('daniyal_portfolio_lang');
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('daniyal_portfolio_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
